/**
 * @codbdocs/core - RAG Module
 * 
 * Retrieval-Augmented Generation features:
 * - Image extraction from PDFs
 * - Smart chunking for vector databases
 * - Cross-page context and relationships
 * - RAG-ready output format
 * - Embedding provider abstraction
 */

// ─── Image Extraction ────────────────────────────────────────────────────────

/**
 * Extract images from a PDF page.
 * @param {Object} page - PDF.js page object
 * @param {Object} options - Extraction options
 * @returns {Promise<Array>} Array of extracted images
 */
export async function extractImages(page, options = {}) {
  const {
    format = 'png',
    quality = 0.92,
    scale = 1,
    extractThumbnails = true,
    thumbnailSize = 150,
  } = options;

  const images = [];
  
  try {
    // Get page operator list to find image operations
    const opList = await page.getOperatorList();
    const pageNumber = page.pageNumber;
    
    let currentImage = null;
    let imageIndex = 0;
    
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      const args = opList.argsArray[i];
      
      // PDF.js OPS constants for image operations
      const OPS = {
        paintImageXObject: 85,
        paintJpegXObject: 86,
        paintImageXObjectRepeat: 88,
        paintImageMaskXObject: 89,
      };
      
      if (fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject) {
        const imgName = args[0];
        
        try {
          // Get image data from PDF.js
          const imgData = await new Promise((resolve, reject) => {
            page.objs.get(imgName, (data) => {
              if (data) resolve(data);
              else reject(new Error(`Image ${imgName} not found`));
            });
          });
          
          if (imgData && imgData.width && imgData.height) {
            // Create canvas for image extraction
            const canvas = document.createElement('canvas');
            canvas.width = imgData.width * scale;
            canvas.height = imgData.height * scale;
            const ctx = canvas.getContext('2d');
            
            // Draw image to canvas
            if (imgData.bitmap) {
              ctx.drawImage(imgData.bitmap, 0, 0, canvas.width, canvas.height);
            } else if (imgData.data) {
              // Create ImageData from raw data
              const imageData = new ImageData(
                new Uint8ClampedArray(imgData.data.buffer || imgData.data),
                imgData.width,
                imgData.height
              );
              ctx.putImageData(imageData, 0, 0);
            }
            
            // Get bounding box from transform matrix if available
            const bbox = args.length > 1 ? args[1] : null;
            
            const image = {
              id: `page_${pageNumber}_img_${imageIndex}`,
              name: imgName,
              pageNumber,
              width: canvas.width,
              height: canvas.height,
              originalWidth: imgData.width,
              originalHeight: imgData.height,
              bbox: bbox ? {
                x: bbox[4] || 0,
                y: bbox[5] || 0,
                width: bbox[0] || canvas.width,
                height: bbox[3] || canvas.height,
              } : null,
              format,
              dataUrl: canvas.toDataURL(`image/${format}`, quality),
              arrayBuffer: await new Promise((resolve) => {
                if (canvas.convertToBlob) {
                  canvas.convertToBlob({ type: `image/${format}`, quality })
                    .then(blob => resolve(blob.arrayBuffer()))
                    .catch(() => resolve(null));
                } else {
                  canvas.toBlob((blob) => {
                    resolve(blob ? blob.arrayBuffer() : null);
                  }, `image/${format}`, quality);
                }
              }),
            };
            
            // Create thumbnail if requested
            if (extractThumbnails) {
              const thumbCanvas = document.createElement('canvas');
              const aspectRatio = imgData.width / imgData.height;
              thumbCanvas.width = thumbnailSize;
              thumbCanvas.height = thumbnailSize / aspectRatio;
              const thumbCtx = thumbCanvas.getContext('2d');
              thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
              
              image.thumbnail = {
                dataUrl: thumbCanvas.toDataURL(`image/${format}`, quality),
                width: thumbCanvas.width,
                height: thumbCanvas.height,
              };
            }
            
            images.push(image);
            imageIndex++;
          }
        } catch (e) {
          // Skip images that can't be extracted
          console.warn(`[codbdocs] Could not extract image ${imgName}:`, e.message);
        }
      }
    }
  } catch (e) {
    console.warn('[codbdocs] Image extraction failed:', e.message);
  }
  
  return images;
}

/**
 * Extract all images from a document.
 * @param {Object} pdf - PDF.js document object
 * @param {Object} options - Extraction options
 * @returns {Promise<Array>} All extracted images
 */
export async function extractAllImages(pdf, options = {}) {
  const allImages = [];
  
  for (let num = 1; num <= pdf.numPages; num++) {
    const page = await pdf.getPage(num);
    const pageImages = await extractImages(page, options);
    allImages.push(...pageImages);
  }
  
  return allImages;
}

// ─── Smart Chunking ──────────────────────────────────────────────────────────

/**
 * Chunk strategies for different use cases
 */
export const ChunkStrategies = {
  FIXED: 'fixed',
  SEMANTIC: 'semantic',
  PAGE: 'page',
  SECTION: 'section',
  TABLE: 'table',
  HYBRID: 'hybrid',
};

/**
 * Create fixed-size chunks with overlap.
 */
function fixedChunking(text, options = {}) {
  const {
    chunkSize = 1000,
    chunkOverlap = 200,
    separators = ['\n\n', '\n', '. ', ' '],
  } = options;
  
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    let end = Math.min(start + chunkSize, text.length);
    
    // Try to break at a separator
    if (end < text.length) {
      for (const sep of separators) {
        const lastSep = text.lastIndexOf(sep, end);
        if (lastSep > start + chunkSize * 0.5) {
          end = lastSep + sep.length;
          break;
        }
      }
    }
    
    chunks.push({
      text: text.slice(start, end).trim(),
      start,
      end,
      index: chunks.length,
    });
    
    start = end - chunkOverlap;
    if (start >= text.length) break;
  }
  
  return chunks;
}

/**
 * Semantic chunking - split by natural boundaries.
 */
function semanticChunking(text, options = {}) {
  const {
    minChunkSize = 100,
    maxChunkSize = 2000,
  } = options;
  
  const chunks = [];
  const paragraphs = text.split(/\n\s*\n/);
  let currentChunk = '';
  let currentStart = 0;
  let position = 0;
  
  for (const para of paragraphs) {
    if (currentChunk.length + para.length > maxChunkSize && currentChunk.length >= minChunkSize) {
      chunks.push({
        text: currentChunk.trim(),
        start: currentStart,
        end: position,
        index: chunks.length,
        type: 'paragraph',
      });
      currentChunk = '';
      currentStart = position;
    }
    
    currentChunk += (currentChunk ? '\n\n' : '') + para;
    position += para.length + 2;
  }
  
  if (currentChunk.trim()) {
    chunks.push({
      text: currentChunk.trim(),
      start: currentStart,
      end: position,
      index: chunks.length,
      type: 'paragraph',
    });
  }
  
  return chunks;
}

/**
 * Section-based chunking using headings.
 */
function sectionChunking(text, sections = [], options = {}) {
  const {
    minChunkSize = 100,
    maxChunkSize = 3000,
  } = options;
  
  if (!sections || sections.length === 0) {
    return semanticChunking(text, options);
  }
  
  const chunks = [];
  let lastEnd = 0;
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const start = section.position || 0;
    const end = i + 1 < sections.length ? (sections[i + 1].position || text.length) : text.length;
    
    const sectionText = text.slice(start, end).trim();
    
    if (sectionText.length > maxChunkSize) {
      // Split large sections into smaller chunks
      const subChunks = fixedChunking(sectionText, { chunkSize: maxChunkSize, chunkOverlap: 200 });
      for (const sub of subChunks) {
        chunks.push({
          text: sub.text,
          start: start + sub.start,
          end: start + sub.end,
          index: chunks.length,
          type: 'section',
          heading: section.text,
          headingLevel: section.level || 1,
        });
      }
    } else if (sectionText.length >= minChunkSize) {
      chunks.push({
        text: sectionText,
        start,
        end,
        index: chunks.length,
        type: 'section',
        heading: section.text,
        headingLevel: section.level || 1,
      });
    }
    
    lastEnd = end;
  }
  
  return chunks;
}

/**
 * Table-aware chunking.
 */
function tableChunking(text, tables = [], options = {}) {
  const {
    minChunkSize = 100,
    maxChunkSize = 2000,
  } = options;
  
  const chunks = [];
  let lastEnd = 0;
  
  // Sort tables by position
  const sortedTables = [...tables].sort((a, b) => (a.position || 0) - (b.position || 0));
  
  for (const table of sortedTables) {
    const tableStart = table.position || 0;
    const tableEnd = tableStart + (table.length || 0);
    
    // Add text before table
    if (tableStart > lastEnd) {
      const beforeText = text.slice(lastEnd, tableStart).trim();
      if (beforeText.length >= minChunkSize) {
        chunks.push({
          text: beforeText,
          start: lastEnd,
          end: tableStart,
          index: chunks.length,
          type: 'text',
        });
      }
    }
    
    // Add table as its own chunk
    const tableText = text.slice(tableStart, tableEnd).trim();
    if (tableText.length >= minChunkSize) {
      chunks.push({
        text: tableText,
        start: tableStart,
        end: tableEnd,
        index: chunks.length,
        type: 'table',
        tableData: table,
      });
    }
    
    lastEnd = tableEnd;
  }
  
  // Add remaining text
  if (lastEnd < text.length) {
    const remainingText = text.slice(lastEnd).trim();
    if (remainingText.length >= minChunkSize) {
      chunks.push({
        text: remainingText,
        start: lastEnd,
        end: text.length,
        index: chunks.length,
        type: 'text',
      });
    }
  }
  
  return chunks;
}

/**
 * Create chunks from document graph.
 */
/**
 * Rebuild a graph-shaped facade from `graph.toJSON()` output.
 *
 * `createChunks` / `createRAGOutput` need the live DocumentGraph API
 * (getSummary, text.getPageText, layout.getHeadings, ...). Serialized graphs —
 * sent over HTTP, cached, or restored from disk — are plain objects and used to
 * throw `graph.getSummary is not a function`. This restores the accessor
 * surface those functions rely on.
 *
 * @param {Object} json - output of DocumentGraph.toJSON()
 * @returns {Object} graph-like object
 */
export function hydrateGraph(json) {
  if (!json || typeof json !== 'object') {
    throw new TypeError('codbdocs: a document graph (or graph.toJSON() output) is required');
  }
  if (typeof json.getSummary === 'function') return json;

  const pages = Array.isArray(json.pages) ? json.pages : [];
  const pageOf = (n) => pages.find(p => (p.num ?? p.pageNum) === n) || null;
  const listOf = (n, key) => {
    if (n == null) return pages.flatMap(p => p[key] || []);
    return pageOf(n)?.[key] || [];
  };
  const metaOf = (n, key) => {
    if (n == null) return pages.flatMap(p => p.metadata?.[key] || []);
    return pageOf(n)?.metadata?.[key] || [];
  };
  const pageCount = json.pageCount ?? pages.length;
  const summary = json.summary || {
    pageCount,
    wordCount: pages.reduce((acc, p) => acc + String(p.text || '').split(/\s+/).filter(Boolean).length, 0),
    pageTypes: {},
    metadata: {},
    headings: pages.flatMap(p => (p.headings || []).map(h => h.text)),
    tableCount: pages.reduce((acc, p) => acc + (p.tables?.length || 0), 0),
    formCount: pages.reduce((acc, p) => acc + (p.forms?.length || 0), 0),
    listCount: pages.reduce((acc, p) => acc + (p.lists?.length || 0), 0),
  };
  if (summary.pageCount == null) summary.pageCount = pageCount;

  return {
    ...json,
    pageCount,
    getSummary: () => summary,
    getDocumentType: () => json.documentType || null,
    classifications: json.classifications || pages.map(p => p.classification || null),
    text: {
      pages: pages.map(p => ({ pageNum: p.num ?? p.pageNum, text: p.text || '', source: p.source })),
      getPageText: (n) => pageOf(n)?.text || '',
    },
    layout: {
      getHeadings: (n) => listOf(n, 'headings'),
      getAllHeadings: () => listOf(null, 'headings'),
    },
    structure: {
      getTables: (n) => listOf(n, 'tables'),
      getForms: (n) => listOf(n, 'forms'),
      getLists: (n) => listOf(n, 'lists'),
      tables: listOf(null, 'tables'),
      forms: listOf(null, 'forms'),
      lists: listOf(null, 'lists'),
    },
    metadata: {
      getDates: (n) => metaOf(n, 'dates'),
      getPhones: (n) => metaOf(n, 'phones'),
      getEmails: (n) => metaOf(n, 'emails'),
      getAddresses: (n) => metaOf(n, 'addresses'),
      getAmounts: (n) => metaOf(n, 'amounts'),
      getSummary: () => summary.metadata || {},
    },
  };
}

export function createChunks(graph, options = {}) {
  graph = hydrateGraph(graph);
  const {
    strategy = ChunkStrategies.SEMANTIC,
    chunkSize = 1000,
    chunkOverlap = 200,
    minChunkSize = 100,
    maxChunkSize = 3000,
    includeMetadata = true,
    includeBoundingBoxes = true,
  } = options;
  
  const chunks = [];
  const summary = graph.getSummary();
  const headings = graph.layout?.getAllHeadings() || [];
  const tables = graph.structure?.getTables() || [];
  
  // Process each page
  for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
    const pageText = graph.text?.getPageText(pageNum) || '';
    const pageClassification = graph.classifications?.[pageNum - 1] || null;
    const pageHeadings = graph.layout?.getHeadings(pageNum) || [];
    const pageTables = graph.structure?.getTables(pageNum) || [];
    const pageForms = graph.structure?.getForms(pageNum) || [];
    const pageLists = graph.structure?.getLists(pageNum) || [];
    const pageMetadata = {
      dates: graph.metadata?.getDates(pageNum) || [],
      phones: graph.metadata?.getPhones(pageNum) || [],
      emails: graph.metadata?.getEmails(pageNum) || [],
      addresses: graph.metadata?.getAddresses(pageNum) || [],
      amounts: graph.metadata?.getAmounts(pageNum) || [],
    };
    
    // Get content blocks for this page
    const contentBlocks = graph._contentGraph?.blocks?.filter(b => b.page === pageNum) || [];
    const contentEntities = graph._contentGraph?.entities?.filter(e => e.page === pageNum) || [];
    
    let pageChunks = [];
    
    switch (strategy) {
      case ChunkStrategies.FIXED:
        pageChunks = fixedChunking(pageText, { chunkSize, chunkOverlap });
        break;
        
      case ChunkStrategies.SEMANTIC:
        pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
        break;
        
      case ChunkStrategies.PAGE:
        pageChunks = [{
          text: pageText,
          start: 0,
          end: pageText.length,
          index: 0,
          type: 'page',
        }];
        break;
        
      case ChunkStrategies.SECTION:
        pageChunks = sectionChunking(pageText, pageHeadings, { minChunkSize, maxChunkSize });
        break;
        
      case ChunkStrategies.TABLE:
        pageChunks = tableChunking(pageText, pageTables, { minChunkSize, maxChunkSize });
        break;
        
      case ChunkStrategies.HYBRID:
        // Use semantic chunking but keep tables separate
        pageChunks = tableChunking(pageText, pageTables, { minChunkSize, maxChunkSize });
        if (pageChunks.length === 0) {
          pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
        }
        break;
        
      default:
        pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
    }
    
    // Enrich chunks with metadata
    for (const chunk of pageChunks) {
      const enrichedChunk = {
        ...chunk,
        id: `page_${pageNum}_chunk_${chunk.index}`,
        pageNumber: pageNum,
        source: 'codbdocs',
      };
      
      if (includeMetadata) {
        enrichedChunk.metadata = {
          pageNumber: pageNum,
          pageCount: summary.pageCount,
          classification: pageClassification,
          documentType: graph.getDocumentType?.() || null,
          headings: pageHeadings.map(h => h.text),
          hasTables: pageTables.length > 0,
          hasForms: pageForms.length > 0,
          hasLists: pageLists.length > 0,
          entityTypes: [...new Set(contentEntities.map(e => e.type))],
          contentBlockTypes: [...new Set(contentBlocks.map(b => b.type))],
        };
        
        // Add relevant entities from this chunk's text range
        enrichedChunk.metadata.relevantEntities = contentEntities.filter(e => {
          const ePos = e.position || 0;
          return ePos >= chunk.start && ePos < chunk.end;
        });
      }
      
      if (includeBoundingBoxes) {
        // Find content blocks that overlap with this chunk
        enrichedChunk.boundingBoxes = contentBlocks
          .filter(b => b.start >= chunk.start && b.start < chunk.end)
          .map(b => b.bbox)
          .filter(Boolean);
      }
      
      chunks.push(enrichedChunk);
    }
  }
  
  // Renumber chunks
  chunks.forEach((chunk, i) => {
    chunk.index = i;
  });
  
  return chunks;
}

// ─── Cross-Page Context ──────────────────────────────────────────────────────

/**
 * Build cross-page relationships.
 */
export function buildCrossPageContext(graph) {
  graph = hydrateGraph(graph);
  const context = {
    documentType: graph.getDocumentType?.() || null,
    globalEntities: [],
    entityRelationships: [],
    topicFlow: [],
    crossPageReferences: [],
    documentStructure: {
      sections: [],
      tables: [],
      forms: [],
      lists: [],
    },
  };
  
  const summary = graph.getSummary();
  
  // Collect all entities across pages
  const entityMap = new Map();
  
  for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
    const entities = graph._contentGraph?.entities?.filter(e => e.page === pageNum) || [];
    
    for (const entity of entities) {
      const key = `${entity.type}:${entity.text?.toLowerCase()}`;
      if (entityMap.has(key)) {
        entityMap.get(key).occurrences.push({
          page: pageNum,
          position: entity.position,
          bbox: entity.bbox,
        });
      } else {
        entityMap.set(key, {
          type: entity.type,
          text: entity.text,
          occurrences: [{
            page: pageNum,
            position: entity.position,
            bbox: entity.bbox,
          }],
        });
      }
    }
  }
  
  context.globalEntities = Array.from(entityMap.values());
  
  // Find entity relationships (entities that appear together on pages)
  const pageEntityMap = new Map();
  for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
    const entities = graph._contentGraph?.entities?.filter(e => e.page === pageNum) || [];
    pageEntityMap.set(pageNum, entities.map(e => `${e.type}:${e.text?.toLowerCase()}`));
  }
  
  // Find co-occurring entities
  const relationshipMap = new Map();
  for (const [pageNum, entities] of pageEntityMap) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const key = [entities[i], entities[j]].sort().join(' <-> ');
        if (relationshipMap.has(key)) {
          relationshipMap.get(key).pages.push(pageNum);
        } else {
          relationshipMap.set(key, {
            entities: [entities[i], entities[j]],
            pages: [pageNum],
            type: 'co-occurrence',
          });
        }
      }
    }
  }
  
  context.entityRelationships = Array.from(relationshipMap.values())
    .filter(r => r.pages.length > 1); // Only keep relationships that span multiple pages
  
  // Build topic flow (page classifications in order)
  const classifications = graph.classifications || [];
  let currentTopic = null;
  let topicStart = 1;
  
  for (let i = 0; i < classifications.length; i++) {
    const classification = classifications[i];
    const pageType = classification?.type || 'unknown';
    
    if (pageType !== currentTopic) {
      if (currentTopic) {
        context.topicFlow.push({
          topic: currentTopic,
          startPage: topicStart,
          endPage: i,
          pageCount: i - topicStart + 1,
        });
      }
      currentTopic = pageType;
      topicStart = i + 1;
    }
  }
  
  // Add final topic
  if (currentTopic) {
    context.topicFlow.push({
      topic: currentTopic,
      startPage: topicStart,
      endPage: classifications.length,
      pageCount: classifications.length - topicStart + 1,
    });
  }
  
  // Build document structure
  const allHeadings = graph.layout?.getAllHeadings() || [];
  context.documentStructure.sections = allHeadings.map((h, i) => ({
    ...h,
    index: i,
    nextPageHeading: i + 1 < allHeadings.length ? allHeadings[i + 1] : null,
  }));
  
  // Get all tables, forms, lists
  for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
    const tables = graph.structure?.getTables(pageNum) || [];
    const forms = graph.structure?.getForms(pageNum) || [];
    const lists = graph.structure?.getLists(pageNum) || [];
    
    context.documentStructure.tables.push(...tables.map(t => ({ ...t, page: pageNum })));
    context.documentStructure.forms.push(...forms.map(f => ({ ...f, page: pageNum })));
    context.documentStructure.lists.push(...lists.map(l => ({ ...l, page: pageNum })));
  }
  
  // Find cross-page references (e.g., "continued on page X", "see page Y")
  const fullText = graph.text?.pages?.map(p => p.text).join(' ') || '';
  const crossPagePatterns = [
    /(?:continued|cont)\.?\s+(?:on\s+)?page\s+(\d+)/gi,
    /(?:see|refer\s+to)\s+page\s+(\d+)/gi,
    /page\s+(\d+)\s+(?:for|to\s+see)/gi,
  ];
  
  for (const pattern of crossPagePatterns) {
    let match;
    while ((match = pattern.exec(fullText)) !== null) {
      const referencedPage = parseInt(match[1]);
      if (referencedPage > 0 && referencedPage <= summary.pageCount) {
        context.crossPageReferences.push({
          text: match[0],
          fromPage: Math.ceil((match.index / fullText.length) * summary.pageCount),
          toPage: referencedPage,
          type: 'reference',
        });
      }
    }
  }
  
  return context;
}

// ─── RAG Output Format ───────────────────────────────────────────────────────

/**
 * Create RAG-ready output for vector databases and AI applications.
 */
export function createRAGOutput(graph, options = {}) {
  graph = hydrateGraph(graph);
  const {
    chunkStrategy = ChunkStrategies.SEMANTIC,
    chunkSize = 1000,
    chunkOverlap = 200,
    includeImages = false,
    includeVectors = false,
    includeMetadata = true,
    includeBoundingBoxes = true,
    includeCrossPageContext = true,
    embeddingProvider = null,
  } = options;
  
  const summary = graph.getSummary();
  const documentType = graph.getDocumentType?.() || null;
  
  // Create chunks
  const chunks = createChunks(graph, {
    strategy: chunkStrategy,
    chunkSize,
    chunkOverlap,
    includeMetadata,
    includeBoundingBoxes,
  });
  
  // Build cross-page context if requested
  const context = includeCrossPageContext ? buildCrossPageContext(graph) : null;
  
  // Build RAG output
  const ragOutput = {
    // Document metadata
    document: {
      type: documentType?.type || 'unknown',
      confidence: documentType?.confidence || 0,
      pageCount: summary.pageCount,
      wordCount: summary.wordCount,
      headings: summary.headings,
      metadata: summary.metadata,
    },
    
    // Content chunks for vector DB
    chunks: chunks.map(chunk => ({
      id: chunk.id,
      text: chunk.text,
      metadata: chunk.metadata || {},
      bbox: chunk.boundingBoxes || [],
      pageNumber: chunk.pageNumber,
      chunkIndex: chunk.index,
      chunkType: chunk.type,
    })),
    
    // Global entities
    entities: context?.globalEntities || [],
    
    // Entity relationships
    relationships: context?.entityRelationships || [],
    
    // Document structure
    structure: {
      headings: summary.headings,
      tables: summary.tableCount,
      forms: summary.formCount,
      lists: summary.listCount,
    },
    
    // Topic flow
    topicFlow: context?.topicFlow || [],
    
    // Cross-page references
    crossPageReferences: context?.crossPageReferences || [],
    
    // Full text for context
    fullText: graph.text?.pages?.map(p => p.text).join('\n\n') || '',
    
    // Page-by-page text
    pages: graph.text?.pages?.map(p => ({
      pageNumber: p.pageNum,
      text: p.text,
      source: p.source,
      classification: graph.classifications?.[p.pageNum - 1] || null,
    })) || [],
  };
  
  // Add images if requested
  if (includeImages) {
    ragOutput.images = graph._images || [];
  }
  
  // Add vectors if requested
  if (includeVectors) {
    ragOutput.vectors = [];
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const pageVectors = graph.getVectors?.(pageNum) || [];
      ragOutput.vectors.push(...pageVectors.map(v => ({
        ...v,
        pageNumber: pageNum,
      })));
    }
  }
  
  // Add embeddings if provider is available
  if (embeddingProvider) {
    ragOutput.embeddings = {
      provider: embeddingProvider.name,
      model: embeddingProvider.model,
      dimensions: embeddingProvider.dimensions,
      chunks: chunks.map(chunk => ({
        id: chunk.id,
        text: chunk.text,
        // Embedding will be added by the provider
      })),
    };
  }
  
  return ragOutput;
}

// ─── Embedding Providers ─────────────────────────────────────────────────────

/**
 * Base embedding provider interface.
 */
export class EmbeddingProvider {
  constructor(name, model, dimensions) {
    this.name = name;
    this.model = model;
    this.dimensions = dimensions;
  }
  
  async embed(texts) {
    throw new Error('embed() must be implemented by subclass');
  }
  
  async embedQuery(text) {
    const results = await this.embed([text]);
    return results[0];
  }
}

/**
 * OpenAI embedding provider.
 */
export class OpenAIEmbeddingProvider extends EmbeddingProvider {
  constructor(apiKey, options = {}) {
    super('openai', options.model || 'text-embedding-3-small', options.dimensions || 1536);
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://api.openai.com/v1';
  }
  
  async embed(texts) {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        input: texts,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Embedding failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data.map(d => d.embedding);
  }
}

/**
 * Local embedding provider (uses a small model in-browser).
 */
export class LocalEmbeddingProvider extends EmbeddingProvider {
  constructor(options = {}) {
    super('local', options.model || 'transformers.js', options.dimensions || 384);
    this.model = null;
    this.ready = false;
  }
  
  async initialize() {
    // This would integrate with @xenova/transformers or similar
    // For now, we'll use a simple hash-based embedding as placeholder
    this.ready = true;
  }
  
  async embed(texts) {
    if (!this.ready) {
      await this.initialize();
    }
    
    // Simple hash-based embedding (placeholder - replace with real model)
    return texts.map(text => {
      const embedding = new Array(this.dimensions).fill(0);
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        embedding[i % this.dimensions] += charCode;
        embedding[(i * 7 + 13) % this.dimensions] ^= charCode;
      }
      // Normalize
      const norm = Math.sqrt(embedding.reduce((sum, x) => sum + x * x, 0));
      return embedding.map(x => x / (norm || 1));
    });
  }
}

/**
 * Custom embedding provider for any API.
 */
export class CustomEmbeddingProvider extends EmbeddingProvider {
  constructor(name, embedFn, options = {}) {
    super(name, options.model || 'custom', options.dimensions || 1536);
    this.embedFn = embedFn;
  }
  
  async embed(texts) {
    return this.embedFn(texts);
  }
}

// ─── Convenience Functions ───────────────────────────────────────────────────

/**
 * Create RAG output with embeddings in one call.
 */
export async function createRAGOutputWithEmbeddings(graph, embeddingProvider, options = {}) {
  const ragOutput = createRAGOutput(graph, {
    ...options,
    embeddingProvider,
  });
  
  // Generate embeddings for all chunks
  const texts = ragOutput.chunks.map(c => c.text);
  const embeddings = await embeddingProvider.embed(texts);
  
  // Attach embeddings to chunks
  ragOutput.chunks = ragOutput.chunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
  }));
  
  return ragOutput;
}

/**
 * Export RAG output as JSONL for vector databases.
 */
export function exportAsJSONL(ragOutput) {
  return ragOutput.chunks.map(chunk => JSON.stringify({
    id: chunk.id,
    text: chunk.text,
    metadata: chunk.metadata,
    embedding: chunk.embedding || null,
  })).join('\n');
}

/**
 * Export RAG output as CSV for simple vector databases.
 */
export function exportAsCSV(ragOutput) {
  const headers = ['id', 'text', 'pageNumber', 'chunkType', 'embedding'];
  const rows = ragOutput.chunks.map(chunk => [
    chunk.id,
    `"${chunk.text.replace(/"/g, '""')}"`,
    chunk.pageNumber,
    chunk.chunkType,
    chunk.embedding ? `"${chunk.embedding.join(',')}"` : '',
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
