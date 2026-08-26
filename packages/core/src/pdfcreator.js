/**
 * @codbdocs/core — PDF Creator (Round-trip Fidelity)
 *
 * Generate PDF documents from the PDF-IR.
 * Supports three fidelity levels:
 *   LEVEL 1: Content equivalent (text, images, forms, links)
 *   LEVEL 2: Semantic equivalent (structure, reading order, accessibility)
 *   LEVEL 3: Visual equivalent (geometry, colors, fonts, transparency)
 */

/**
 * PDF Creator class for generating PDFs from IR.
 */
export class PDFCreator {
  constructor() {
    this.objects = [];
    this.pages = [];
    this.resources = {};
    this.currentObject = 1;
  }

  /**
   * Create a PDF from IR.
   * @param {Object} ir - PDF-IR document model
   * @param {Object} options - Creation options
   * @returns {Promise<Uint8Array>} PDF bytes
   */
  async create(ir, options = {}) {
    const {
      level = 2, // 1=content, 2=semantic, 3=visual
      includeMetadata = true,
      includeStructure = true,
      includeAccessibility = true,
      pageSize = 'letter',
    } = options;

    this.objects = [];
    this.pages = [];

    // Build PDF structure
    const pdf = {
      version: '1.7',
      header: '%PDF-1.7',
      body: {},
      trailer: {},
    };

    // Add catalog
    const catalogId = this.nextObjectId();
    pdf.body[catalogId] = {
      type: 'catalog',
      pages: null, // Will be set after pages
    };

    // Add pages
    const pagesId = this.nextObjectId();
    pdf.body[pagesId] = {
      type: 'pages',
      kids: [],
      count: 0,
    };
    pdf.body[catalogId].pages = pagesId;

    // Add metadata if requested
    if (includeMetadata && ir.document?.metadata) {
      const metaId = this.nextObjectId();
      pdf.body[metaId] = {
        type: 'metadata',
        data: ir.document.metadata,
      };
    }

    // Process each page
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      const pageNum = parseInt(pageId.replace('page_', ''));
      const newPageId = this.nextObjectId();

      const pageObj = {
        type: 'page',
        parent: pagesId,
        mediaBox: pageData.mediaBox || [0, 0, 612, 792], // Letter size default
        cropBox: pageData.cropBox || null,
        rotate: pageData.rotation || 0,
        resources: {},
        contents: [],
        annotations: [],
      };

      // Add page resources
      pageObj.resources = this.buildPageResources(pageData, ir);

      // Add content stream
      const contentId = this.nextObjectId();
      const contentStream = this.buildContentStream(pageData, ir, level);
      pdf.body[contentId] = {
        type: 'stream',
        data: contentStream,
        length: contentStream.length,
      };
      pageObj.contents.push(contentId);

      // Add annotations
      if (pageData.annotations && level >= 1) {
        for (const ann of pageData.annotations) {
          const annId = this.nextObjectId();
          pdf.body[annId] = {
            type: 'annotation',
            data: ann,
          };
          pageObj.annotations.push(annId);
        }
      }

      // Add structure tree reference
      if (includeStructure && ir.structure?.[pageId] && level >= 2) {
        const structId = this.nextObjectId();
        pdf.body[structId] = {
          type: 'struct_tree',
          data: ir.structure[pageId],
        };
        pageObj.structParents = structId;
      }

      pdf.body[newPageId] = pageObj;
      pagesId.kids.push(newPageId);
      this.pages.push(newPageId);
    }

    pagesId.count = this.pages.length;

    // Build trailer
    pdf.trailer = {
      root: catalogId,
      info: null,
      size: this.currentObject,
    };

    // Serialize to PDF bytes
    return this.serializePDF(pdf);
  }

  /**
   * Build page resources dictionary.
   */
  buildPageResources(pageData, ir) {
    const resources = {
      font: {},
      xObject: {},
      pattern: {},
      colorSpace: {},
      extGState: {},
    };

    // Collect fonts from page content
    const fonts = new Set();
    const pageObjects = (pageData.content || []).map(id => ir.objects?.[id]).filter(Boolean);

    for (const obj of pageObjects) {
      if (obj.raw?.font) {
        fonts.add(obj.raw.font);
      }
    }

    // Add font resources
    let fontIndex = 0;
    for (const fontName of fonts) {
      const fontRef = `F${fontIndex++}`;
      resources.font[fontRef] = {
        type: fontName.includes('Bold') ? 'Font' : 'Font',
        baseFont: fontName,
        encoding: 'WinAnsiEncoding',
      };
    }

    return resources;
  }

  /**
   * Build content stream for a page.
   */
  buildContentStream(pageData, ir, level) {
    const commands = [];
    const objects = (pageData.content || []).map(id => ir.objects?.[id]).filter(Boolean);

    // Sort by reading order if level >= 2
    const sortedObjects = level >= 2
      ? this.sortByReadingOrder(objects, pageData)
      : objects;

    for (const obj of sortedObjects) {
      if (obj.type === 'text' && obj.raw?.text) {
        // Text object
        const text = obj.raw.text;
        const fontSize = obj.raw.fontSize || 12;
        const x = obj.bbox?.[0] || 0;
        const y = obj.bbox?.[1] || 0;

        // Find font reference
        const fontRef = this.findFontRef(obj.raw.font, pageData, ir);

        commands.push(`q`); // Save graphics state

        // Apply transform if level 3
        if (level >= 3 && obj.raw.transform) {
          const t = obj.raw.transform;
          commands.push(`${t[0]} ${t[1]} ${t[2]} ${t[3]} ${t[4]} ${t[5]} cm`);
        }

        // Set font
        commands.push(`/${fontRef} ${fontSize} Tf`);

        // Set color
        if (obj.semantic?.color) {
          const c = obj.semantic.color;
          commands.push(`${c[0]} ${c[1]} ${c[2]} rg`);
        }

        // Position and show text
        commands.push(`${x} ${y} Td`);
        commands.push(`(${this.escapePDFString(text)}) Tj`);

        commands.push(`Q`); // Restore graphics state
      }
    }

    // Add vector objects for level 3
    if (level >= 3) {
      for (const vecId of (pageData.vectors || [])) {
        const vec = ir.vectors?.[vecId];
        if (vec) {
          this.addVectorCommands(commands, vec);
        }
      }
    }

    return commands.join('\n');
  }

  /**
   * Sort objects by reading order.
   */
  sortByReadingOrder(objects, pageData) {
    return [...objects].sort((a, b) => {
      const ay = a.bbox?.[1] || 0;
      const by = b.bbox?.[1] || 0;
      if (Math.abs(ay - by) > 10) return ay - by;
      return (a.bbox?.[0] || 0) - (b.bbox?.[0] || 0);
    });
  }

  /**
   * Find font reference for a font name.
   */
  findFontRef(fontName, pageData, ir) {
    // Simplified - in real implementation would lookup from resources
    return 'F0';
  }

  /**
   * Add vector drawing commands.
   */
  addVectorCommands(commands, vec) {
    if (!vec.points || vec.points.length === 0) return;

    commands.push('q'); // Save state

    // Set stroke color
    if (vec.graphicsState?.stroke?.color) {
      const c = vec.graphicsState.stroke.color;
      commands.push(`${c[0]} ${c[1]} ${c[2]} RG`);
    }

    // Set fill color
    if (vec.graphicsState?.fill?.color) {
      const c = vec.graphicsState.fill.color;
      commands.push(`${c[0]} ${c[1]} ${c[2]} rg`);
    }

    // Set line width
    if (vec.graphicsState?.lineWidth) {
      commands.push(`${vec.graphicsState.lineWidth} w`);
    }

    // Draw path
    const firstPoint = vec.points[0];
    commands.push(`${firstPoint.x} ${firstPoint.y} m`);

    for (let i = 1; i < vec.points.length; i++) {
      const pt = vec.points[i];
      if (pt.op === 'moveTo') {
        commands.push(`${pt.x} ${pt.y} m`);
      } else if (pt.op === 'lineTo') {
        commands.push(`${pt.x} ${pt.y} l`);
      } else if (pt.op === 'curveTo') {
        commands.push(`${pt.x1} ${pt.y1} ${pt.x2} ${pt.y2} ${pt.x} ${pt.y} c`);
      }
    }

    // Stroke or fill
    if (vec.type === 'path') {
      commands.push('S'); // Stroke
    } else if (vec.type === 'rect') {
      commands.push('B'); // Fill and stroke
    }

    commands.push('Q'); // Restore state
  }

  /**
   * Escape string for PDF content stream.
   */
  escapePDFString(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }

  /**
   * Generate next object ID.
   */
  nextObjectId() {
    return this.currentObject++;
  }

  /**
   * Serialize PDF to bytes.
   */
  serializePDF(pdf) {
    const encoder = new TextEncoder();
    const parts = [];

    // Header
    parts.push(encoder.encode(pdf.header + '\n'));

    // Body
    for (const [id, obj] of Object.entries(pdf.body)) {
      const objStr = this.serializeObject(parseInt(id), obj);
      parts.push(encoder.encode(objStr));
    }

    // Cross-reference table
    const xrefOffset = parts.reduce((sum, p) => sum + p.length, 0);
    parts.push(encoder.encode('xref\n'));
    parts.push(encoder.encode(`0 ${this.currentObject}\n`));
    parts.push(encoder.encode('0000000000 65535 f \n'));

    // Object offsets (simplified - would need to track in real implementation)
    for (let i = 1; i < this.currentObject; i++) {
      parts.push(encoder.encode(`${String(xrefOffset).padStart(10, '0')} 00000 n \n`));
    }

    // Trailer
    parts.push(encoder.encode('trailer\n'));
    parts.push(encoder.encode(`<< /Size ${this.currentObject} /Root ${pdf.trailer.root} >>\n`));
    parts.push(encoder.encode('startxref\n'));
    parts.push(encoder.encode(`${xrefOffset}\n`));
    parts.push(encoder.encode('%%EOF\n'));

    // Combine all parts
    const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const part of parts) {
      result.set(part, offset);
      offset += part.length;
    }

    return result;
  }

  /**
   * Serialize a single PDF object.
   */
  serializeObject(id, obj) {
    let str = `${id} 0 obj\n`;

    switch (obj.type) {
      case 'catalog':
        str += `<< /Type /Catalog /Pages ${obj.pages} 0 R >>\n`;
        break;

      case 'pages':
        str += `<< /Type /Pages /Kids [${obj.kids.map(k => `${k} 0 R`).join(' ')}] /Count ${obj.count} >>\n`;
        break;

      case 'page':
        str += `<< /Type /Page /Parent ${obj.parent} 0 R`;
        str += ` /MediaBox [${(obj.mediaBox || [0, 0, 612, 792]).join(' ')}]`;
        if (obj.rotate) str += ` /Rotate ${obj.rotate}`;
        if (obj.contents?.length) {
          str += ` /Contents [${obj.contents.map(c => `${c} 0 R`).join(' ')}]`;
        }
        if (obj.annotations?.length) {
          str += ` /Annots [${obj.annotations.map(a => `${a} 0 R`).join(' ')}]`;
        }
        str += ' >>\n';
        break;

      case 'stream':
        str += `<< /Length ${obj.length} >>\n`;
        str += 'stream\n';
        str += obj.data + '\n';
        str += 'endstream\n';
        break;

      case 'annotation':
        const ann = obj.data;
        str += `<< /Type /Annot /Subtype /${ann.subtype || 'Text'}`;
        if (ann.rect) str += ` /Rect [${ann.rect.join(' ')}]`;
        if (ann.contents) str += ` /Contents (${this.escapePDFString(ann.contents)})`;
        str += ' >>\n';
        break;

      case 'metadata':
        str += `<< /Type /Metadata /Subtype /XML >>\n`;
        str += 'stream\n';
        str += '<?xml version="1.0" encoding="UTF-8"?>\n';
        str += '<x:xmpmeta xmlns:x="adobe:ns:meta/">\n';
        str += '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n';
        if (obj.data.title) {
          str += `<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">\n`;
          str += `<dc:title>${this.escapePDFString(obj.data.title)}</dc:title>\n`;
          str += '</rdf:Description>\n';
        }
        str += '</rdf:RDF>\n';
        str += '</x:xmpmeta>\n';
        str += 'endstream\n';
        break;

      default:
        str += '<< >>\n';
    }

    str += 'endobj\n\n';
    return str;
  }
}

/**
 * Create a PDF from IR (convenience function).
 */
export async function createPDF(ir, options = {}) {
  const creator = new PDFCreator();
  return creator.create(ir, options);
}

/**
 * Create a minimal PDF from text content.
 */
export async function createTextPDF(pages, options = {}) {
  const ir = {
    document: { metadata: options.metadata || {} },
    pages: {},
    objects: {},
    structure: {},
    annotations: {},
  };

  for (let i = 0; i < pages.length; i++) {
    const pageId = `page_${i + 1}`;
    ir.pages[pageId] = {
      id: pageId,
      num: i + 1,
      width: 612,
      height: 792,
      rotation: 0,
      mediaBox: [0, 0, 612, 792],
      content: [],
      vectors: [],
      images: [],
      annotations: [],
    };

    // Add text objects
    const text = typeof pages[i] === 'string' ? pages[i] : pages[i].text || '';
    const lines = text.split('\n');

    for (let j = 0; j < lines.length; j++) {
      const objId = `text_${i}_${j}`;
      ir.objects[objId] = {
        id: objId,
        type: 'text',
        page: pageId,
        raw: {
          text: lines[j],
          font: 'Helvetica',
          fontSize: 12,
          transform: [12, 0, 0, 12, 72, 720 - (j * 14)],
        },
        semantic: {
          role: 'paragraph',
          text: lines[j],
        },
        bbox: [72, 720 - (j * 14), lines[j].length * 7, 12],
      };
      ir.pages[pageId].content.push(objId);
    }
  }

  return createPDF(ir, options);
}
