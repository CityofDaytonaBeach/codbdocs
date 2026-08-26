/**
 * @codbdocs/core — Extended PDF Features
 *
 * Additional features from review.txt:
 * - Document metadata extraction
 * - Document navigation (bookmarks, named destinations)
 * - Marked content / artifacts extraction
 * - Glyph-level text representation
 * - Security/encryption metadata
 * - Accessibility remediation
 */

// ─── Document Metadata Extraction ────────────────────────────────────────────

/**
 * Extract document-level metadata from PDF.
 * @param {Object} pdf - PDF.js document object
 * @returns {Promise<Object>} Document metadata
 */
export async function extractDocumentMetadata(pdf) {
  try {
    const metadata = await pdf.getMetadata();
    const info = metadata?.info || {};
    const metadataObj = metadata?.metadata || null;
    
    // Parse XMP metadata if available
    let xmp = null;
    if (metadataObj) {
      try {
        xmp = metadataObj.getAll();
      } catch (e) {
        // XMP parsing failed
      }
    }
    
    return {
      title: info.Title || xmp?.title || null,
      author: info.Author || xmp?.author || null,
      subject: info.Subject || xmp?.subject || null,
      keywords: info.Keywords ? info.Keywords.split(/[,;]+/).map(k => k.trim()) : (xmp?.keywords || []),
      creator: info.Creator || xmp?.creator || null,
      producer: info.Producer || xmp?.producer || null,
      creationDate: info.CreationDate || xmp?.creationDate || null,
      modificationDate: info.ModDate || xmp?.modificationDate || null,
      language: info.Language || xmp?.language || null,
      trapped: info.Trapped || null,
      custom: xmp || {},
    };
  } catch (e) {
    return {};
  }
}

// ─── Document Navigation Extraction ──────────────────────────────────────────

/**
 * Extract document outline (bookmarks/table of contents).
 * @param {Object} pdf - PDF.js document object
 * @returns {Promise<Array>} Bookmark tree
 */
export async function extractOutline(pdf) {
  try {
    const outline = await pdf.getOutline();
    if (!outline || outline.length === 0) return [];
    
    return convertOutlineItems(outline, pdf);
  } catch (e) {
    return [];
  }
}

async function convertOutlineItems(items, pdf) {
  const result = [];
  
  for (const item of items) {
    const outlineItem = {
      title: item.title || '',
      color: item.color || [0, 0, 0],
      italic: item.italic || false,
      bold: item.bold || false,
      dest: null,
      url: null,
      children: [],
    };
    
    // Resolve destination
    try {
      if (item.dest) {
        let dest = item.dest;
        if (typeof dest === 'string') {
          try {
            dest = await pdf.getDestination(dest);
          } catch (e) {
            // Could not resolve named destination
          }
        }
        
        if (Array.isArray(dest)) {
          const pageIndex = await pdf.getPageIndex(dest[0]);
          outlineItem.dest = {
            page: pageIndex + 1,
            kind: dest[1] || 'XYZ',
            args: dest.slice(2),
          };
        }
      }
    } catch (e) {
      // Destination resolution failed
    }
    
    if (item.url) {
      outlineItem.url = item.url;
    }
    
    if (item.items && item.items.length > 0) {
      outlineItem.children = await convertOutlineItems(item.items, pdf);
    }
    
    result.push(outlineItem);
  }
  
  return result;
}

/**
 * Extract named destinations.
 * @param {Object} pdf - PDF.js document object
 * @returns {Promise<Object>} Named destinations map
 */
export async function extractNamedDestinations(pdf) {
  try {
    const destinations = await pdf.getDestinations();
    const result = {};
    
    for (const [name, dest] of Object.entries(destinations)) {
      try {
        if (Array.isArray(dest)) {
          const pageIndex = await pdf.getPageIndex(dest[0]);
          result[name] = {
            page: pageIndex + 1,
            kind: dest[1] || 'XYZ',
            args: dest.slice(2),
          };
        }
      } catch (e) {
        // Skip unresolvable destinations
      }
    }
    
    return result;
  } catch (e) {
    return {};
  }
}

/**
 * Extract page labels.
 * @param {Object} pdf - PDF.js document object
 * @returns {Promise<Array>} Page labels
 */
export async function extractPageLabels(pdf) {
  try {
    const count = pdf.numPages;
    const labels = [];
    
    for (let i = 0; i < count; i++) {
      labels.push({
        page: i + 1,
        label: `${i + 1}`,
        style: 'decimal',
      });
    }
    
    return labels;
  } catch (e) {
    return [];
  }
}

// ─── Security / Encryption Extraction ────────────────────────────────────────

/**
 * Extract security and encryption metadata.
 * @param {Object} pdf - PDF.js document object
 * @returns {Promise<Object>} Security metadata
 */
export async function extractSecurity(pdf) {
  try {
    const isEncrypted = pdf.isEncrypted || false;
    let permissions = null;
    
    try {
      permissions = await pdf.getPermissions();
    } catch (e) {
      // Permissions not available
    }
    
    return {
      encrypted: isEncrypted,
      permissions: permissions ? {
        printing: permissions.printing !== 'disabled',
        modifying: permissions.modifying !== 'disabled',
        copying: permissions.copying !== 'disabled',
        annotating: permissions.annotating !== 'disabled',
        fillingForms: permissions.fillingForms !== 'disabled',
        contentAccessibility: permissions.contentAccessibility !== 'disabled',
        documentAssembly: permissions.documentAssembly !== 'disabled',
        highQualityPrinting: permissions.highQualityPrinting !== 'disabled',
      } : null,
      algorithm: null,
    };
  } catch (e) {
    return {
      encrypted: false,
      permissions: null,
      algorithm: null,
    };
  }
}

// ─── Marked Content / Artifacts Extraction ───────────────────────────────────

/**
 * Extract marked content sequences from PDF page operator list.
 * @param {Object} page - PDF.js page object
 * @returns {Promise<Array>} Marked content sequences
 */
export async function extractMarkedContent(page) {
  try {
    const opList = await page.getOperatorList();
    const markedContent = [];
    let mcStack = [];
    
    const OPS = (typeof pdfjsLib !== 'undefined') ? pdfjsLib.OPS || {} : {};
    
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      const args = opList.argsArray[i];
      
      if (fn === OPS.beginMarkedContent || fn === 18) {
        const mc = {
          tag: args[0] || 'Unknown',
          properties: args[1] || {},
          type: 'marked_content',
          isArtifact: false,
          children: [],
        };
        mcStack.push(mc);
      } else if (fn === OPS.beginMarkedContentProps || fn === 19) {
        const mc = {
          tag: args[0] || 'Unknown',
          properties: args[1] || {},
          type: 'marked_content',
          isArtifact: args[0] === 'Artifact',
          children: [],
        };
        mcStack.push(mc);
      } else if (fn === OPS.endMarkedContent || fn === 20) {
        if (mcStack.length > 0) {
          const completed = mcStack.pop();
          if (mcStack.length > 0) {
            mcStack[mcStack.length - 1].children.push(completed);
          } else {
            markedContent.push(completed);
          }
        }
      }
    }
    
    return markedContent;
  } catch (e) {
    return [];
  }
}

/**
 * Extract artifacts from marked content.
 */
export async function extractArtifacts(page) {
  const markedContent = await extractMarkedContent(page);
  const artifacts = [];
  
  function collectArtifacts(node) {
    if (node.isArtifact) {
      artifacts.push({
        tag: node.tag,
        properties: node.properties,
        type: categorizeArtifact(node.tag, node.properties),
      });
    }
    if (node.children) {
      for (const child of node.children) {
        collectArtifacts(child);
      }
    }
  }
  
  for (const mc of markedContent) {
    collectArtifacts(mc);
  }
  
  return artifacts;
}

function categorizeArtifact(tag) {
  if (tag === 'Pagination' || tag === 'PageNumber') return 'pagination';
  if (tag === 'Header') return 'header';
  if (tag === 'Footer') return 'footer';
  if (tag === 'Figure') return 'decorative_figure';
  if (tag === 'Background') return 'background';
  return 'unknown';
}

// ─── Glyph-Level Text Extraction ─────────────────────────────────────────────

/**
 * Extract glyph-level text data from PDF page.
 */
export async function extractGlyphs(page) {
  try {
    const content = await page.getTextContent();
    const glyphs = [];
    
    for (const item of content.items) {
      if (item.str && item.str.trim()) {
        const transform = item.transform;
        const fontSize = Math.abs(transform[0]) || 12;
        const translateX = transform[4] || 0;
        const translateY = transform[5] || 0;
        const charWidth = item.width / Math.max(item.str.length, 1);
        
        for (let i = 0; i < item.str.length; i++) {
          glyphs.push({
            unicode: item.str[i],
            charCode: item.str.charCodeAt(i),
            advance: charWidth,
            transform: [
              transform[0], transform[1], transform[2],
              transform[3], translateX + (i * charWidth), translateY,
            ],
            font: item.fontName || null,
            fontSize,
            bbox: [
              translateX + (i * charWidth),
              translateY,
              charWidth,
              fontSize,
            ],
          });
        }
      }
    }
    
    return glyphs;
  } catch (e) {
    return [];
  }
}

// ─── Accessibility Remediation ───────────────────────────────────────────────

/**
 * Generate accessibility fixes for common issues.
 */
export function generateRemediations(auditResult, ir) {
  const fixes = [];
  
  if (!auditResult || !auditResult.issues) return fixes;
  
  for (const issue of auditResult.issues) {
    switch (issue.type) {
      case 'missing_alt_text':
        fixes.push({
          issue: issue.type,
          page: issue.page,
          element: issue.element,
          severity: issue.severity,
          fix: {
            type: 'add_alt_text',
            suggestedAlt: generateAltText(issue, ir),
            strategy: 'vision',
          },
        });
        break;
        
      case 'missing_heading_structure':
        fixes.push({
          issue: issue.type,
          page: issue.page,
          severity: issue.severity,
          fix: {
            type: 'add_heading_structure',
            suggestedStructure: inferHeadingStructure(ir),
            strategy: 'inference',
          },
        });
        break;
        
      case 'missing_language':
        fixes.push({
          issue: issue.type,
          severity: issue.severity,
          fix: {
            type: 'add_language',
            suggestedLanguage: 'en-US',
            strategy: 'detection',
          },
        });
        break;
        
      case 'missing_title':
        fixes.push({
          issue: issue.type,
          severity: issue.severity,
          fix: {
            type: 'add_title',
            suggestedTitle: inferDocumentTitle(ir),
            strategy: 'inference',
          },
        });
        break;
        
      case 'reading_order':
        fixes.push({
          issue: issue.type,
          page: issue.page,
          severity: issue.severity,
          fix: {
            type: 'fix_reading_order',
            suggestedOrder: inferReadingOrder(ir, issue.page),
            strategy: 'spatial',
          },
        });
        break;
    }
  }
  
  return fixes;
}

function generateAltText(issue, ir) {
  if (issue.element) {
    const obj = ir.objects[issue.element];
    if (obj && obj.type === 'image') {
      return 'Image on page ' + (obj.page || 'unknown');
    }
  }
  return 'Decorative image';
}

function inferHeadingStructure(ir) {
  const headings = [];
  for (const [id, obj] of Object.entries(ir.objects)) {
    if (obj.semantic?.role === 'heading') {
      headings.push({ id, level: obj.semantic.level, text: obj.semantic.text });
    }
  }
  return headings;
}

function inferDocumentTitle(ir) {
  for (const [id, obj] of Object.entries(ir.objects)) {
    if (obj.semantic?.role === 'heading' && obj.semantic.level === 1) {
      return obj.semantic.text;
    }
  }
  return 'Untitled Document';
}

function inferReadingOrder(ir, pageNum) {
  const pageId = `page_${pageNum}`;
  const page = ir.pages[pageId];
  if (!page) return [];
  
  const objects = page.content
    .map(id => ir.objects[id])
    .filter(obj => obj && obj.bbox);
  
  return objects
    .sort((a, b) => {
      const ay = a.bbox[1] || 0;
      const by = b.bbox[1] || 0;
      if (Math.abs(ay - by) > 10) return ay - by;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    })
    .map(obj => obj.id);
}
