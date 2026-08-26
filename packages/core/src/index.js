/**
 * @codbdocs/core
 *
 * Browser document-processing engine with offline AI understanding.
 * 3-layer architecture:
 *   Layer 1: PDF-aware    — native text, fonts, vectors, images, links
 *   Layer 2: Vision-aware — OCR, layout, tables, handwriting
 *   Layer 3: Content-aware — semantic objects, entities, relationships
 *
 * No server. No CDN. No external APIs. Pure browser JavaScript.
 *
 * Usage:
 *   const doc = await CodbDocs.load(file);
 *   const graph = await doc.analyze({ ocr: true });
 *
 *   // Spatial + semantic search
 *   graph.find("invoice number")
 *   graph.find({ type: "currency" })
 *
 *   // AI-like Q&A
 *   graph.ask("What is the total amount?")
 *
 *   // Content graph
 *   graph.toJSON()
 */

import {
  analyzeSpatialLayout,
  detectStructure,
  extractMetadata,
  classifyPage,
  analyzeVisualRegions,
} from './brain.js';

import {
  DocumentGraph,
} from './layers.js';

import {
  analyzeContent,
  classifyDocumentType,
  DocumentContentGraph,
  PageContentGraph,
} from './content.js';

import {
  executeQuery,
  executeAsk,
  highlightResults,
  createHighlightAnnotations,
} from './query.js';

import {
  extractImages,
  extractAllImages,
  createChunks,
  buildCrossPageContext,
  createRAGOutput,
  createRAGOutputWithEmbeddings,
  exportAsJSONL,
  exportAsCSV,
  ChunkStrategies,
  EmbeddingProvider,
  OpenAIEmbeddingProvider,
  LocalEmbeddingProvider,
  CustomEmbeddingProvider,
} from './rag.js';

import {
  canUseWorkers,
  createRenderWorker,
  createBrainWorker,
  terminateWorker,
} from './workers.js';

/**
 * Track PDF graphics state (CTM) through operator list to compute
 * accurate image bounding boxes.
 */
function trackImageBboxes(pageOps) {
  const imageBboxes = new Map();
  const ctmStack = [];
  let ctm = [1, 0, 0, 1, 0, 0]; // identity matrix

  for (const op of pageOps) {
    if (op.fn === 'save') {
      ctmStack.push([...ctm]);
    } else if (op.fn === 'restore') {
      ctm = ctmStack.pop() || [1, 0, 0, 1, 0, 0];
    } else if (op.fn === 'transform' && op.args?.length === 6) {
      const [a, b, c, d, e, f] = op.args;
      ctm = multiplyMatrix(ctm, [a, b, c, d, e, f]);
    } else if (op.fn === 'concatMatrix' && op.args?.length === 6) {
      ctm = [...op.args];
    } else if (op.fn === 'doXObject' && op.args?.[0]) {
      const name = op.args[0];
      imageBboxes.set(name, {
        bbox: applyMatrixToRect(ctm, [0, 0, 1, 1]),
        ctm: [...ctm],
        name,
      });
    }
  }

  return imageBboxes;
}

function multiplyMatrix(m1, m2) {
  const [a1, b1, c1, d1, e1, f1] = m1;
  const [a2, b2, c2, d2, e2, f2] = m2;
  return [
    a1 * a2 + c1 * b2,
    b1 * a2 + d1 * b2,
    a1 * c2 + c1 * d2,
    b1 * c2 + d1 * d2,
    a1 * e2 + c1 * f2 + e1,
    b1 * e2 + d1 * f2 + f1,
  ];
}

function applyMatrixToRect(ctm, [x1, y1, x2, y2]) {
  const [a, b, c, d, e, f] = ctm;
  const corners = [
    [x1, y1], [x2, y1], [x1, y2], [x2, y2],
  ];
  const transformed = corners.map(([x, y]) => [
    a * x + c * y + e,
    b * x + d * y + f,
  ]);
  const xs = transformed.map(p => p[0]);
  const ys = transformed.map(p => p[1]);
  return [
    Math.min(...xs),
    Math.min(...ys),
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
  ];
}

import {
  createIR,
  addPage,
  addTextObject,
  addVectorObject,
  addObject,
  extractVectors,
  extractStructureTree,
  extractAnnotations,
  extractFormFields,
  detectReadingOrder,
  getReadingOrderSequence,
  validateReadingOrder,
  auditAccessibility,
  generateAccessibilityTree,
  exportHTML,
} from './pdfir.js';

import {
  extractDocumentMetadata,
  extractOutline,
  extractNamedDestinations,
  extractPageLabels,
  extractSecurity,
  extractMarkedContent,
  extractArtifacts,
  extractGlyphs,
  generateRemediations,
} from './extended.js';

import {
  extractGraphicsState,
  buildGraphicsStateSummary,
  parseBlendMode,
  createTransparencyGroup,
  createSoftMask,
  createTilingPattern,
  createGradientShading,
  parseShading,
  ColorSpaceTypes,
  toRgb,
  cmykToRgb,
  rgbToCmyk,
  labToRgb,
} from './graphics.js';

import {
  PDFCreator,
  createPDF,
  createTextPDF,
} from './pdfcreator.js';

import {
  extractSignatures,
  buildSignatureSummary,
  extractOCGs,
  buildOCGSummary,
  extractEmbeddedFiles,
  buildEmbeddedFilesSummary,
  extractActions,
  buildActionsSummary,
  extractAppearanceStreams,
  buildAppearanceStreamsSummary,
  trackXObjectReuse,
  buildXObjectSummary,
  extractRevisions,
  buildRevisionsSummary,
} from './advanced.js';

import {
  analyzeTextQuality,
  compareVisualInternal,
  detectRepeatedElements,
  normalizeText,
  detectRedactions,
  validateTags,
  calculateRAGReadiness,
  reconstructTable,
  diagnoseDocument,
  normalizeDocument,
} from './quality.js';

import {
  detectRotationSkew,
  detectGlyphIssues,
  detectOutlinedText,
  detectFlattenedForms,
  detectCheckboxes,
  detectCrossPageTables,
  associateCaptionsWithImages,
  detectFootnotes,
  detectLanguage,
  detectMalformedPDF,
} from './edgecases.js';

import {
  ConceptGraph,
  ConceptNode,
  ConceptEdge,
  extractRelationships,
  CodbFingerprint,
  hybridSearch,
  detectIntent,
  decomposeQuery,
  rankResults,
  QueryIntent,
  executeReasoning,
  operatorCount,
  operatorSum,
  operatorMax,
  operatorMin,
} from './concepts.js';

import {
  wcagAudit,
  exportAccessibleHTML,
  remediateAccessibility,
  generateAccessibilityReport,
} from './docaccess.js';

import {
  expandQuery,
  stem,
  fuzzyScore,
  detectAcronyms,
  detectDefinitions,
  learnTerminology,
  fuzzySearch,
} from './expansion.js';

import {
  buildTableObjects,
  queryTable,
  rerankResults,
  operatorAvg,
  operatorBefore,
  operatorAfter,
  operatorBetween,
  operatorGroupBy,
} from './concepts.js';

import { createWorkspace } from './workspace.js';
import { saveToCache, loadFromCache, clearCache, getCacheStats } from './persistence.js';

// ─── Configuration ───────────────────────────────────────────────────────────

const DEFAULTS = {
  nativeTextMinLength: 20,
  ocrScale: 2,
  ocrLang: 'eng',
  enableVisual: false,
  enableBrain: true,
  enableContent: true,
  useWorkers: true,
  concurrency: 1,
  qualityThreshold: 0.5,
  memory: {
    maxMB: 512,
    canvasCache: 5,
    pageCache: 25,
  },
};

let config = { ...DEFAULTS };

function configure(opts = {}) {
  // Deep merge memory config
  if (opts.memory) {
    opts.memory = { ...config.memory, ...opts.memory };
  }
  config = { ...config, ...opts };
}

// ─── Library Detection ───────────────────────────────────────────────────────

function getPdfjs() {
  const lib = (typeof window !== 'undefined') &&
    (window['pdfjs-dist/build/pdf'] || window.pdfjsLib);
  if (!lib) {
    throw new Error(
      '[codbdocs] pdfjsLib not found. Load PDF.js before calling CodbDocs.load().\n' +
      '  <script src="vendor/pdf.js/pdf.min.js"></script>'
    );
  }
  return lib;
}

function getTesseract() {
  const lib = (typeof window !== 'undefined') && window.Tesseract;
  if (!lib) {
    throw new Error(
      '[codbdocs] Tesseract not found. Load Tesseract.js before calling doc.analyze({ ocr: true }).\n' +
      '  <script src="vendor/tesseract.js/tesseract.min.js"></script>'
    );
  }
  return lib;
}

// ─── Load ────────────────────────────────────────────────────────────────────

async function load(source) {
  const pdfjsLib = getPdfjs();

  let data;
  if (typeof source === 'string') {
    data = { url: source };
  } else if (source instanceof ArrayBuffer) {
    data = { data: source };
  } else if (source instanceof Uint8Array) {
    data = { data: source.buffer };
  } else if (source && typeof source.arrayBuffer === 'function') {
    data = { data: await source.arrayBuffer() };
  } else {
    throw new Error('[codbdocs] Unsupported source. Pass a File, Blob, ArrayBuffer, Uint8Array, or URL string.');
  }

  const pdf = await pdfjsLib.getDocument(data).promise;
  return new CodbDoc(pdf);
}

// ─── CodbDoc ─────────────────────────────────────────────────────────────────

class CodbDoc {
  constructor(pdf) {
    this._pdf = pdf;
    this.pageCount = pdf.numPages;
  }

  /**
   * Run the full analysis pipeline.
   * Returns a DocumentGraph with spatial search, content graph, and ask().
   */
  async analyze(opts = {}) {
    const {
      ocr = true,
      visual = false,
      extractVectors: extractVecs = true,
      extractExtended = true,
      onPageComplete,
      onProgress,
      onLayer,
    } = opts;

    const graph = new DocumentGraph();
    const contentGraph = new DocumentContentGraph();
    const ir = createIR();

    // Event emitter for incremental indexing
    const listeners = {};
    graph.on = (event, fn) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(fn);
    };
    graph.emit = (event, data) => {
      (listeners[event] || []).forEach(fn => fn(data));
    };

    // Extract document-level metadata (once, not per-page)
    if (extractExtended) {
      try {
        onProgress && onProgress({ page: 0, total: this.pageCount, status: 'metadata' });
        ir.document.metadata = await extractDocumentMetadata(this._pdf);
        onProgress && onProgress({ page: 0, total: this.pageCount, status: 'navigation' });
        ir.document.navigation = {
          outline: await extractOutline(this._pdf),
          destinations: await extractNamedDestinations(this._pdf),
          labels: await extractPageLabels(this._pdf),
        };
        onProgress && onProgress({ page: 0, total: this.pageCount, status: 'security' });
        ir.document.security = await extractSecurity(this._pdf);
        
        // Extract OCGs (Optional Content Groups / layers)
        onProgress && onProgress({ page: 0, total: this.pageCount, status: 'ocgs' });
        ir.document.ocgs = await extractOCGs(this._pdf);
        
        // Extract embedded files
        onProgress && onProgress({ page: 0, total: this.pageCount, status: 'embedded' });
        ir.document.embeddedFiles = await extractEmbeddedFiles(this._pdf);
        
        // Extract actions
        onProgress && onProgress({ page: 0, total: this.pageCount, status: 'actions' });
        ir.document.actions = await extractActions(this._pdf);
        
        // Extract revisions
        onProgress && onProgress({ page: 0, total: this.pageCount, status: 'revisions' });
        ir.document.revisions = await extractRevisions(this._pdf);
      } catch (e) {
        console.error('[codbdocs] Document-level extraction error:', e);
      }
    }

    // Store page results and content items for repeated elements detection
    graph._pageResults = {};
    graph._allContentItems = {};
    graph._allImages = {};

    try {
      for (let num = 1; num <= this.pageCount; num++) {
        onProgress && onProgress({ page: num, total: this.pageCount, status: 'reading' });

        const page = await this._pdf.getPage(num);
        const viewport = page.getViewport({ scale: 1 });
        const pageSize = { width: viewport.width, height: viewport.height };
        const content = await page.getTextContent();
        const nativeText = content.items
          .map(it => it.str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        let text = nativeText;
        let source = 'native';
        let confidence = null;
        let canvas = null;

        // Quality-based OCR decision with native/OCR fusion
        const qualityScore = computeTextQuality(content.items, pageSize);
        if (qualityScore < config.qualityThreshold && ocr) {
          onProgress && onProgress({ page: num, total: this.pageCount, status: 'ocr', progress: 0 });
          try {
            canvas = await renderPageToCanvas(page, config.ocrScale);
            const Tesseract = getTesseract();
            const { data } = await Tesseract.recognize(canvas, config.ocrLang, {
              logger: (m) => {
                if (m.status === 'recognizing text') {
                  onProgress && onProgress({ page: num, total: this.pageCount, status: 'ocr', progress: m.progress });
                }
              },
            });
            const ocrText = (data.text || '').trim();
            // Fuse native and OCR text, preserving best evidence from both
            text = fuseNativeOCR(nativeText, ocrText, content.items, pageSize);
            source = text === ocrText ? 'ocr' : 'fusion';
            confidence = data.confidence;
          } catch (err) {
            source = 'error';
            text = '';
          }
        } else if (qualityScore < config.qualityThreshold && !ocr) {
          source = 'skipped';
          text = '';
        }

        // Brain analysis (Layer 2: Vision-aware)
        let spatial = null;
        let structures = null;
        let metadata = null;
        let classification = null;
        let visualRegions = null;

        if (config.enableBrain) {
          onProgress && onProgress({ page: num, total: this.pageCount, status: 'analyzing' });
          spatial = analyzeSpatialLayout(content.items, pageSize);
          structures = detectStructure(spatial, pageSize);
          metadata = extractMetadata(text);
          classification = classifyPage(text, spatial);
        }

        // Visual analysis
        if (visual || config.enableVisual) {
          if (!canvas) canvas = await renderPageToCanvas(page, config.ocrScale);
          try { visualRegions = analyzeVisualRegions(canvas); } catch (e) {}
        }

        // Content-aware analysis (Layer 3)
        let contentPageGraph = null;
        if (config.enableContent) {
          onProgress && onProgress({ page: num, total: this.pageCount, status: 'content' });
          contentPageGraph = analyzeContent(num, text, spatial, metadata);
          contentGraph.addPageGraph(contentPageGraph);
        }

        // Extract vectors from PDF
        let vectors = [];
        if (extractVecs) {
          onProgress && onProgress({ page: num, total: this.pageCount, status: 'vectors' });
          try {
            vectors = await extractVectors(page);
          } catch (e) { /* vector extraction may fail on some PDFs */ }
        }

        // Extract structure tree (tagged PDF)
        let structureTree = null;
        try {
          structureTree = await extractStructureTree(page);
        } catch (e) { /* not all PDFs have structure trees */ }

        // Extract annotations
        let annotations = [];
        try {
          annotations = await extractAnnotations(page);
        } catch (e) { /* annotations extraction may fail */ }

        // Build PDF-IR page
        const irPage = addPage(ir, num, {
          width: pageSize.width,
          height: pageSize.height,
          rotation: page.rotate,
          mediaBox: page.mediaBox,
          cropBox: page.cropBox,
          labels: page.labels || null,
        });

        // Add vectors to IR
        for (const vec of vectors) {
          addVectorObject(ir, `page_${num}`, vec);
        }

        // Add text objects to IR
        for (const item of content.items) {
          if (item.str && item.str.trim()) {
            addTextObject(ir, `page_${num}`, {
              text: item.str,
              bbox: [item.transform[4], item.transform[5], item.width, item.height],
              font: item.fontName,
              fontSize: Math.abs(item.transform[0]) || 12,
              transform: item.transform,
            });
          }
        }

        // Add annotations to IR
        if (annotations.length > 0) {
          irPage.annotations = annotations;
          ir.annotations[`page_${num}`] = annotations;
        }

        // Add structure tree to IR
        if (structureTree) {
          ir.structure[`page_${num}`] = structureTree;
        }

        // Extract extended per-page features (merged into main loop)
        if (extractExtended) {
          try {
            irPage.markedContent = await extractMarkedContent(page);
          } catch (e) { /* marked content extraction may fail */ }
          
          try {
            irPage.artifacts = await extractArtifacts(page);
          } catch (e) { /* artifact extraction may fail */ }
          
          try {
            irPage.glyphs = await extractGlyphs(page);
          } catch (e) { /* glyph extraction may fail */ }
          
          // Extract digital signatures
          try {
            irPage.signatures = await extractSignatures(page, this._pdf);
          } catch (e) { /* signature extraction may fail */ }
          
          // Extract appearance streams
          try {
            irPage.appearanceStreams = await extractAppearanceStreams(page);
          } catch (e) { /* appearance stream extraction may fail */ }
          
          // Extract graphics states
          try {
            const pageOps = await page.getOperatorList();
            irPage.graphicsStates = extractGraphicsState(pageOps);
          } catch (e) { /* graphics state extraction may fail */ }
          
          // Analyze text quality
          try {
            irPage.textQuality = analyzeTextQuality(irPage, content.items, pageSize);
          } catch (e) { /* text quality analysis may fail */ }
          
          // Compare visual vs internal
          if (visualRegions) {
            try {
              irPage.visualComparison = compareVisualInternal(irPage, visualRegions, content.items);
            } catch (e) { /* visual comparison may fail */ }
          }
          
          // Detect redactions
          if (vectors.length > 0) {
            try {
              irPage.redactions = detectRedactions(vectors, content.items);
            } catch (e) { /* redaction detection may fail */ }
          }
          
          // Validate tags
          if (structureTree) {
            try {
              irPage.tagValidation = validateTags(irPage, structureTree, content.items);
            } catch (e) { /* tag validation may fail */ }
          }
          
          // Detect rotation and skew
          try {
            irPage.rotationSkew = detectRotationSkew(irPage, content.items, vectors);
          } catch (e) { /* rotation/skew detection may fail */ }
          
          // Detect glyph issues
          try {
            irPage.glyphIssues = detectGlyphIssues(irPage, content.items);
          } catch (e) { /* glyph issue detection may fail */ }
          
          // Detect outlined text
          if (vectors.length > 0) {
            try {
              irPage.outlinedText = detectOutlinedText(vectors, content.items);
            } catch (e) { /* outlined text detection may fail */ }
          }
          
          // Detect flattened forms
          try {
            irPage.flattenedForms = detectFlattenedForms(vectors, content.items, annotations);
          } catch (e) { /* flattened form detection may fail */ }
          
          // Detect checkboxes and radio buttons
          if (vectors.length > 0) {
            try {
              irPage.checkboxes = detectCheckboxes(vectors, content.items);
            } catch (e) { /* checkbox detection may fail */ }
          }
          
          // Detect footnotes
          try {
            irPage.footnotes = detectFootnotes(content.items, pageSize);
          } catch (e) { /* footnote detection may fail */ }
          
          // Detect language
          try {
            irPage.language = detectLanguage(content.items);
          } catch (e) { /* language detection may fail */ }
        }

        // Extract images from this page
        let pageImages = [];
        try {
          // Track CTM for accurate image bounding boxes
          let imageBboxesByName = new Map();
          try {
            const pageOps = page._opTree || [];
            imageBboxesByName = trackImageBboxes(pageOps);
          } catch (e) { /* CTM tracking may fail */ }

          pageImages = await extractImages(page);
          // Enrich images with semantic context
          for (const img of pageImages) {
            // Apply CTM-based bounding box if available
            if (img.name && imageBboxesByName.has(img.name)) {
              const ctmData = imageBboxesByName.get(img.name);
              img.bbox = ctmData.bbox;
              img.ctm = ctmData.ctm;
            }
            // Infer role from nearby text and position
            img.role = inferImageRole(img, content.items, pageSize);
            // Find nearest caption (text below the image)
            img.caption = findNearestCaption(img, content.items, pageSize);
            // Extract nearby text for context
            img.nearbyText = extractNearbyText(img, content.items, pageSize);
            // Store in IR
            if (!irPage.images) irPage.images = [];
            irPage.images.push(img);
          }
        } catch (e) { /* image extraction may fail */ }

        // Detect reading order
        let readingOrder = [];
        try {
          readingOrder = detectReadingOrder(ir, num);
        } catch (e) { /* reading order detection may fail */ }

        // Detect repeated elements (watermarks, headers, footers)
        let repeatedElements = null;
        if (num === this.pageCount) {
          // Only run on last page to collect all pages' data
          try {
            repeatedElements = detectRepeatedElements(graph._pageResults || {}, graph._allContentItems || {});
          } catch (e) { /* repeated element detection may fail */ }
        }

        // Build page result
        const pageResult = {
          num, text, source, confidence, pageSize,
          spatial, structures, metadata, classification,
          visual: visualRegions,
          images: pageImages.length,
          imageRoles: pageImages.map(img => img.role),
          contentBlocks: contentPageGraph ? contentPageGraph.blocks.length : 0,
          contentEntities: contentPageGraph ? contentPageGraph.entities.length : 0,
          vectors: vectors.length,
          annotations: annotations.length,
          hasStructureTree: !!structureTree,
          readingOrder: readingOrder.length,
          textQuality: irPage.textQuality,
          visualComparison: irPage.visualComparison,
          redactions: irPage.redactions,
          tagValidation: irPage.tagValidation,
          rotationSkew: irPage.rotationSkew,
          glyphIssues: irPage.glyphIssues,
          outlinedText: irPage.outlinedText,
          flattenedForms: irPage.flattenedForms,
          checkboxes: irPage.checkboxes,
          footnotes: irPage.footnotes,
          language: irPage.language,
          repeatedElements,
        };

        graph.addPageResult(pageResult);
        graph._pageResults[`page_${num}`] = pageResult;
        graph._allContentItems[`page_${num}`] = content.items;
        graph._allImages[`page_${num}`] = pageImages;
        onPageComplete && onPageComplete(pageResult);
        // Emit incremental indexing event
        graph.emit('indexed', {
          page: num,
          total: this.pageCount,
          pageResult,
        });
        onLayer && onLayer({
          page: num,
          spatial: !!spatial,
          structure: !!structures,
          metadata: !!metadata,
          classification: classification?.type,
          contentBlocks: pageResult.contentBlocks,
          contentEntities: pageResult.contentEntities,
          vectors: pageResult.vectors,
        });

        // Cleanup: release PDF.js page resources
        try {
          page.cleanup();
        } catch (e) { /* cleanup may not be available */ }
      }
    } catch (e) {
      console.error('[codbdocs] Analysis error:', e);
    }

    // Classify document type
    if (config.enableContent) {
      contentGraph.documentType = classifyDocumentType(contentGraph);
    }

    // Build concept graph and CODB fingerprint
    const conceptGraph = new ConceptGraph();
    if (config.enableContent) {
      extractRelationships(contentGraph, conceptGraph);
    }
    const fingerprint = CodbFingerprint.fromGraph(graph, ir);

    // Attach content graph and query methods to the document graph
    graph._contentGraph = contentGraph;
    graph._doc = this;
    graph._ir = ir;
    graph._conceptGraph = conceptGraph;
    graph._fingerprint = fingerprint;

    // Add content-aware methods
    graph.find = (query) => executeQuery(contentGraph, query, graph);
    graph.findOne = (query) => {
      const results = contentGraph.find(query);
      return results.length > 0 ? results[0] : null;
    };
    graph.ask = (question) => executeAsk(contentGraph, question, graph);
    graph.getEntities = (type) => contentGraph.getEntities(type);
    graph.getBlocks = (type) => contentGraph.getBlocks(type);
    graph.getDocumentType = () => contentGraph.documentType;
    graph.highlight = (canvas, query, options) => {
      const results = contentGraph.find(query);
      return highlightResults(canvas, results, options);
    };
    graph.getHighlights = (query, options) => {
      const results = contentGraph.find(query);
      return createHighlightAnnotations(results, options);
    };

    // Add PDF-IR methods
    graph.getIR = () => ir;
    graph.auditAccessibility = () => auditAccessibility(ir);
    graph.getAccessibilityTree = () => generateAccessibilityTree(ir);
    graph.toHTML = (options) => exportHTML(ir, options);
    graph.getVectors = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.vectors?.map(id => ir.vectors[id]) || [];
    };
    graph.getStructureTree = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.structure[pageId] || null;
    };
    graph.getAnnotations = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.annotations[pageId] || [];
    };
    graph.getFormFields = () => ir.forms?.fields || [];
    graph.getReadingOrder = (pageNum) => detectReadingOrder(ir, pageNum);
    graph.getReadingOrderSequence = (pageNum) => getReadingOrderSequence(ir, pageNum);

    // Add RAG methods
    graph.getImages = (pageNum) => {
      if (pageNum) return graph._allImages[`page_${pageNum}`] || [];
      // Flatten all images
      const all = [];
      for (const pageImages of Object.values(graph._allImages)) {
        all.push(...pageImages);
      }
      return all;
    };
    graph._images = (() => {
      const all = [];
      for (const pageImages of Object.values(graph._allImages)) {
        all.push(...pageImages);
      }
      return all;
    })();
    graph.extractAllImages = (options) => extractAllImages(this._pdf, options);
    graph.createChunks = (options) => createChunks(graph, options);
    graph.getCrossPageContext = () => buildCrossPageContext(graph);
    graph.toRAG = (options) => createRAGOutput(graph, options);
    graph.toRAGWithEmbeddings = (embeddingProvider, options) => 
      createRAGOutputWithEmbeddings(graph, embeddingProvider, options);
    graph.toJSONL = (options) => exportAsJSONL(createRAGOutput(graph, options));
    graph.toCSV = (options) => exportAsCSV(createRAGOutput(graph, options));

    // Add extended features methods
    graph.getMetadata = () => ir.document.metadata;
    graph.getOutline = () => ir.document.navigation.outline || [];
    graph.getNamedDestinations = () => ir.document.navigation.destinations || {};
    graph.getPageLabels = () => ir.document.navigation.labels || [];
    graph.getSecurity = () => ir.document.security;
    graph.getMarkedContent = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.markedContent || [];
    };
    graph.getArtifacts = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.artifacts || [];
    };
    graph.getGlyphs = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.glyphs || [];
    };
    graph.getRemediations = () => {
      const audit = graph.auditAccessibility();
      return generateRemediations(audit, ir);
    };

    // Add advanced features methods
    graph.getSignatures = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.signatures || [];
    };
    graph.getSignatureSummary = () => {
      const allSignatures = [];
      for (const pageId of Object.keys(ir.pages)) {
        if (ir.pages[pageId]?.signatures) {
          allSignatures.push(...ir.pages[pageId].signatures);
        }
      }
      return buildSignatureSummary(allSignatures);
    };
    graph.getOCGs = () => ir.document.ocgs || [];
    graph.getOCGSummary = () => buildOCGSummary(ir.document.ocgs || []);
    graph.getEmbeddedFiles = () => ir.document.embeddedFiles || [];
    graph.getEmbeddedFilesSummary = () => buildEmbeddedFilesSummary(ir.document.embeddedFiles || []);
    graph.getActions = () => ir.document.actions || [];
    graph.getActionsSummary = () => buildActionsSummary(ir.document.actions || []);
    graph.getAppearanceStreams = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.appearanceStreams || [];
    };
    graph.getAppearanceStreamsSummary = () => {
      const allAppearances = [];
      for (const pageId of Object.keys(ir.pages)) {
        if (ir.pages[pageId]?.appearanceStreams) {
          allAppearances.push(...ir.pages[pageId].appearanceStreams);
        }
      }
      return buildAppearanceStreamsSummary(allAppearances);
    };
    graph.getXObjectReuse = () => trackXObjectReuse(ir);
    graph.getXObjectSummary = () => buildXObjectSummary(trackXObjectReuse(ir));
    graph.getRevisions = () => ir.document.revisions || [];
    graph.getRevisionsSummary = () => buildRevisionsSummary(ir.document.revisions || []);

    // Add graphics state methods
    graph.getGraphicsStateSummary = (pageNum) => {
      const pageId = `page_${pageNum}`;
      const states = ir.pages[pageId]?.graphicsStates || [];
      return buildGraphicsStateSummary(states);
    };

    // Add document access methods
    graph.wcagAudit = () => wcagAudit(ir);
    graph.toAccessibleHTML = (options) => exportAccessibleHTML(ir, options);
    graph.remediateAccessibility = (options) => {
      const result = remediateAccessibility(ir, options);
      return result.report;
    };
    graph.getAccessibilityReport = () => generateAccessibilityReport(ir);

    // Add PDF creation methods
    graph.toPDF = (options) => createPDF(ir, options);
    graph.createTextPDF = (options) => createTextPDF(
      Object.values(ir.pages).map(p => p.content?.join('\n') || ''),
      options
    );

    // Add quality and health methods
    graph.diagnose = () => diagnoseDocument(pageResults, graph);
    graph.normalize = (options) => normalizeDocument(graph, options);
    graph.getTextQuality = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.textQuality || null;
    };
    graph.getVisualComparison = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.visualComparison || null;
    };
    graph.getRepeatedElements = () => {
      return pageResults[0]?.repeatedElements || { watermarks: [], headers: [], footers: [], pageNumbers: [] };
    };
    graph.getRedactions = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.redactions || [];
    };
    graph.getTagValidation = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.tagValidation || { valid: false, issues: [] };
    };
    graph.getRAGReadiness = () => {
      const readiness = calculateRAGReadiness(pageResults, null, null, pageResults[0]?.repeatedElements || {});
      return {
        score: Math.round(readiness.score * 100),
        factors: readiness.factors,
        recommendations: readiness.recommendations,
      };
    };

    // Add edge case methods
    graph.getRotationSkew = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.rotationSkew || { rotation: 0, skewAngle: 0, isRotated: false, isSkewed: false };
    };
    graph.getGlyphIssues = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.glyphIssues || { issues: [], hasGlyphIssues: false };
    };
    graph.getOutlinedText = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.outlinedText || { hasOutlinedText: false, candidates: [], count: 0 };
    };
    graph.getFlattenedForms = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.flattenedForms || { hasFlattenedForms: false, candidates: [], recoveredFields: [] };
    };
    graph.getCheckboxes = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.checkboxes || { count: 0, checkboxes: [], checked: 0, unchecked: 0 };
    };
    graph.getFootnotes = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.footnotes || { footnotes: [], footnoteRefs: [], associations: [], count: 0 };
    };
    graph.getLanguage = (pageNum) => {
      const pageId = `page_${pageNum}`;
      return ir.pages[pageId]?.language || { language: 'unknown', confidence: 0 };
    };
    graph.getCrossPageTables = () => detectCrossPageTables(pageResults, ir);
    graph.associateCaptions = (pageNum) => {
      const pageId = `page_${pageNum}`;
      const pageData = ir.pages[pageId];
      const images = pageData?.images || [];
      const contentItems = (pageData?.content || []).map(id => ir.objects?.[id]).filter(Boolean).map(obj => obj.raw);
      return associateCaptionsWithImages(pageData, contentItems, images);
    };

    // Add concept graph and retrieval engine methods
    graph.getConceptGraph = () => conceptGraph;
    graph.getFingerprint = () => fingerprint;
    graph.getConcepts = (type) => type ? conceptGraph.findByType(type) : [...conceptGraph.nodes.values()];
    graph.getConceptNeighbors = (nodeId, depth) => conceptGraph.getNeighbors(nodeId, depth);
    graph.getConceptPath = (sourceId, targetId) => conceptGraph.findPath(sourceId, targetId);
    graph.getConceptHubs = (limit) => conceptGraph.getHubs(limit);
    graph.getCommunities = () => conceptGraph.getCommunities();
    graph.getRelationships = (nodeId) => conceptGraph.getRelationships(nodeId);

    // Hybrid search (replaces or augments simple text search)
    graph.hybridSearch = (query, options) => hybridSearch(graph, query, options);

    // Query planning
    graph.detectIntent = (query) => detectIntent(query);
    graph.decomposeQuery = (query) => decomposeQuery(query);

    /**
     * Plan a query: extract intent, subject, expected entities, anchors, relations, operation.
     * Returns a structured plan for retrieval.
     */
    graph.planQuery = (question) => {
      const lower = question.toLowerCase().trim();
      const intent = detectIntent(lower);

      // Extract subject (the main thing being asked about)
      const subjectPatterns = [
        /(?:about|for|of|regarding)\s+(?:the\s+)?(\w[\w\s]*?)(?:\?|$)/i,
        /(?:what|which|who)\s+(?:is|are|was|were)\s+(?:the\s+)?(\w[\w\s]*?)(?:\?|$)/i,
        /(\w+)\s+(?:amount|cost|price|value|total|budget)/i,
      ];
      let subject = [];
      for (const pat of subjectPatterns) {
        const m = lower.match(pat);
        if (m && m[1]) {
          subject.push(m[1].trim());
        }
      }

      // Extract anchors (specific values mentioned)
      const anchors = [];
      const currencyMatch = lower.match(/\$[\d,]+(?:\.\d{2})?/g);
      if (currencyMatch) anchors.push(...currencyMatch.map(v => ({ type: 'currency', value: v })));

      const dateMatch = lower.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g);
      if (dateMatch) anchors.push(...dateMatch.map(v => ({ type: 'date', value: v })));

      // Extract expected entity type
      const expected = [];
      if (/who|person|people|name|author|approved?\s+by|signed?\s+by/i.test(lower)) {
        expected.push('person');
      }
      if (/how\s+much|amount|cost|price|total|budget|fund|\$/i.test(lower)) {
        expected.push('currency');
      }
      if (/when|date/i.test(lower)) {
        expected.push('date');
      }
      if (/where|address|location/i.test(lower)) {
        expected.push('address');
      }

      // Extract relations
      const relations = [];
      const relationPatterns = [
        { pattern: /approved?\s+by/i, relation: 'approvedBy' },
        { pattern: /signed?\s+by/i, relation: 'signedBy' },
        { pattern: /funded?\s+by/i, relation: 'fundedBy' },
        { pattern: /authored?\s+by/i, relation: 'authoredBy' },
        { pattern: /submitted?\s+by/i, relation: 'submittedBy' },
        { pattern: /created?\s+by/i, relation: 'createdBy' },
      ];
      for (const { pattern, relation } of relationPatterns) {
        if (pattern.test(lower)) relations.push(relation);
      }

      // Determine operation
      let operation = null;
      if (/total|sum|add\s+up|combined|aggregate/i.test(lower)) {
        operation = 'SUM';
      } else if (/how\s+many|count|number\s+of/i.test(lower)) {
        operation = 'COUNT';
      } else if (/average|avg|mean/i.test(lower)) {
        operation = 'AVG';
      } else if (/highest|most|maximum|max|largest|biggest/i.test(lower)) {
        operation = 'MAX';
      } else if (/lowest|least|minimum|min|smallest/i.test(lower)) {
        operation = 'MIN';
      } else if (/before|prior\s+to|earlier\s+than/i.test(lower)) {
        operation = 'BEFORE';
      } else if (/after|since|later\s+than/i.test(lower)) {
        operation = 'AFTER';
      } else if (/between|from.*to/i.test(lower)) {
        operation = 'BETWEEN';
      } else if (/group\s+by|per|each|every/i.test(lower)) {
        operation = 'GROUP_BY';
      }

      return {
        query: question,
        intent,
        subject,
        expected,
        anchors,
        relations,
        operation,
      };
    };

    // Deterministic reasoning operators
    graph.count = (criteria) => operatorCount(graph, criteria);
    graph.sum = (criteria) => operatorSum(graph, criteria);
    graph.max = (criteria) => operatorMax(graph, criteria);
    graph.min = (criteria) => operatorMin(graph, criteria);
    graph.reason = (query) => executeReasoning(graph, query);

    // Enhanced ask() — now uses reasoning operators + concept graph
    graph.askEnhanced = (question) => {
      // First try deterministic reasoning
      const reasoningResult = executeReasoning(graph, question);
      if (reasoningResult) return reasoningResult;

      // Then try hybrid search with evidence ranking
      const searchResults = hybridSearch(graph, question, { maxResults: 10 });
      const ranked = rankResults(searchResults, question);

      if (ranked.length === 0) {
        return {
          answer: `No results found for "${question}".`,
          confidence: 0.9,
          evidence: [],
          reasoning: { intent: detectIntent(question), searchResults: 0 },
        };
      }

      // Build answer from top results
      const top = ranked[0];
      let answer = '';
      if (top.entities && top.entities.length > 0) {
        const entitySummary = top.entities.slice(0, 5).map(e => `${e.type}: ${e.value}`).join(', ');
        answer = `Found relevant content on page ${top.page}: ${entitySummary}`;
      } else {
        answer = `Found relevant content on page ${top.page}.`;
      }

      return {
        answer,
        confidence: top.confidence,
        evidence: top.evidence || [],
        reasoning: {
          intent: top.intent,
          searchResults: ranked.length,
          topScore: top.score,
          explanation: top.explanation,
          reasons: top.reasons,
        },
      };
    };

    // New operators
    graph.avg = (criteria) => operatorAvg(graph, criteria);
    graph.before = (criteria) => operatorBefore(graph, criteria);
    graph.after = (criteria) => operatorAfter(graph, criteria);
    graph.between = (criteria) => operatorBetween(graph, criteria);
    graph.groupBy = (criteria) => operatorGroupBy(graph, criteria);

    // First-class table objects
    graph.getTables = () => buildTableObjects(graph._contentGraph, conceptGraph);
    graph.queryTable = (tableId, conditions) => {
      const tables = buildTableObjects(graph._contentGraph, conceptGraph);
      const table = tables.find(t => t.id === tableId);
      return table ? queryTable(table, conditions) : [];
    };

    // Concept expansion
    graph.expandQuery = (query, options) => expandQuery(query, options);

    // Fuzzy search
    graph.fuzzySearch = (query, options) => {
      const pages = graph.text?.pages || [];
      return fuzzySearch(query, pages, options);
    };

    // Document knowledge graph
    graph.getTerminology = () => graph._terminology || { aliases: {}, acronyms: {}, definitions: {} };
    graph.getAcronyms = () => {
      const allAcronyms = [];
      for (const page of graph.text?.pages || []) {
        const text = page.text || '';
        allAcronyms.push(...detectAcronyms(text));
      }
      return allAcronyms;
    };
    graph.getDefinitions = () => {
      const allDefs = [];
      for (const page of graph.text?.pages || []) {
        const text = page.text || '';
        allDefs.push(...detectDefinitions(text));
      }
      return allDefs;
    };

    // Workspace support
    graph.createWorkspace = (options) => createWorkspace(options);

    // Persistence
    graph.saveCache = async (pdfBuffer) => saveToCache(pdfBuffer, graph.toJSON());
    graph.loadCache = async (pdfBuffer) => loadFromCache(pdfBuffer);

    /**
     * Create a headless accessible view of the document.
     * Returns semantic HTML structure without UI/design decisions.
     * The consuming app (React/Lovable/JS) decides presentation.
     */
    graph.createAccessibleView = (options = {}) => {
      const {
        mode = 'accessible',
        includeDataAttributes = true,
        enforceHeadingHierarchy = true,
        wrapImagesInFigures = true,
      } = options;

      // Get the IR from the graph
      const ir = graph._ir || {};

      // Use docaccess.js to generate accessible HTML
      return exportAccessibleHTML(ir, {
        mode,
        includeDataAttributes,
        enforceHeadingHierarchy,
        wrapImagesInFigures,
      });
    };

    /**
     * Run a WCAG 2.1 AA accessibility audit on the document.
     */
    graph.auditAccessibility = () => {
      const ir = graph._ir || {};
      return wcagAudit(ir);
    };

    /**
     * Auto-remediate common accessibility issues.
     */
    graph.remediateAccessibility = () => {
      const ir = graph._ir || {};
      return remediateAccessibility(ir);
    };

    /**
     * Generate a full accessibility report (HTML + text).
     */
    graph.getAccessibilityReport = () => {
      const ir = graph._ir || {};
      return generateAccessibilityReport(ir);
    };

    return graph;
  }

  /**
   * Batteries-included analysis: runs the full pipeline and returns
   * a document ready for hybrid search, reasoning, and concept queries.
   *
   * Usage:
   *   const doc = await CodbDocs.load(file);
   *   await doc.prepare();
   *   const result = await doc.askEnhanced("Who approved the $425,000 contract?");
   */
  async prepare(opts = {}) {
    return this.analyze({
      ocr: true,
      visual: false,
      extractVectors: true,
      extractExtended: true,
      ...opts,
    });
  }

  /**
   * Quick text-only extraction (no analysis).
   */
  async extractText(opts = {}) {
    const { ocr = true, onProgress } = opts;
    const pages = [];

    for (let num = 1; num <= this.pageCount; num++) {
      onProgress && onProgress({ page: num, total: this.pageCount, status: 'reading' });
      const page = await this._pdf.getPage(num);
      const content = await page.getTextContent();
      const nativeText = content.items.map(it => it.str).join(' ').replace(/\s+/g, ' ').trim();

      let text = nativeText;
      let source = 'native';

      const qualityScore = computeTextQuality(content.items, page.getViewport({ scale: 1 }));
      if (qualityScore < config.qualityThreshold && ocr) {
        onProgress && onProgress({ page: num, total: this.pageCount, status: 'ocr' });
        try {
          const canvas = await renderPageToCanvas(page, config.ocrScale);
          const Tesseract = getTesseract();
          const { data } = await Tesseract.recognize(canvas, config.ocrLang);
          text = (data.text || '').trim();
          source = 'ocr';
        } catch { text = ''; source = 'error'; }
      } else if (qualityScore < config.qualityThreshold) {
        source = 'skipped'; text = '';
      }
      pages.push({ num, text, source });
    }

    return {
      pageCount: this.pageCount, pages,
      fullText: pages.map(p => `--- page ${p.num} (${p.source}) ---\n${p.text}`).join('\n\n'),
    };
  }

  async renderPage(pageNum, scale = 1.5) {
    const page = await this._pdf.getPage(pageNum);
    return renderPageToCanvas(page, scale);
  }

  /**
   * Process pages in batches for large PDFs (900+ pages).
   * This reduces memory usage by processing pages in chunks.
   */
  async analyzeBatched(opts = {}) {
    const {
      batchSize = 50,
      ocr = true,
      visual = false,
      extractVectors: extractVecs = true,
      extractExtended = true,
      onPageComplete,
      onProgress,
      onLayer,
      onBatchComplete,
    } = opts;

    const graph = new DocumentGraph();
    const contentGraph = new DocumentContentGraph();
    const ir = createIR();

    // Extract document-level metadata
    if (extractExtended) {
      try {
        ir.document.metadata = await extractDocumentMetadata(this._pdf);
        ir.document.navigation = {
          outline: await extractOutline(this._pdf),
          destinations: await extractNamedDestinations(this._pdf),
          labels: await extractPageLabels(this._pdf),
        };
        ir.document.security = await extractSecurity(this._pdf);
      } catch (e) {
        console.error('[codbdocs] Document-level extraction error:', e);
      }
    }

    // Process in batches
    const totalPages = this.pageCount;
    for (let batchStart = 1; batchStart <= totalPages; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize - 1, totalPages);
      
      onProgress && onProgress({ 
        page: batchStart, 
        total: totalPages, 
        status: 'batch',
        batch: { start: batchStart, end: batchEnd, total: Math.ceil(totalPages / batchSize) }
      });

      for (let num = batchStart; num <= batchEnd; num++) {
        // (Same processing as analyze() but with batch awareness)
        const page = await this._pdf.getPage(num);
        const viewport = page.getViewport({ scale: 1 });
        const pageSize = { width: viewport.width, height: viewport.height };
        const content = await page.getTextContent();
        const nativeText = content.items.map(it => it.str).join(' ').replace(/\s+/g, ' ').trim();

        let text = nativeText;
        let source = 'native';
        let confidence = null;

        // Use quality scoring instead of crude text length check
        const qualityScore = computeTextQuality(content.items, pageSize);
        if (qualityScore < config.qualityThreshold && ocr) {
          try {
            const canvas = await renderPageToCanvas(page, config.ocrScale);
            const Tesseract = getTesseract();
            const { data } = await Tesseract.recognize(canvas, config.ocrLang);
            text = (data.text || '').trim();
            source = 'ocr';
            confidence = data.confidence;
          } catch (err) { source = 'error'; text = ''; }
        }

        let spatial = null;
        let structures = null;
        let metadata = null;
        let classification = null;

        if (config.enableBrain) {
          spatial = analyzeSpatialLayout(content.items, pageSize);
          structures = detectStructure(spatial, pageSize);
          metadata = extractMetadata(text);
          classification = classifyPage(text, spatial);
        }

        let contentPageGraph = null;
        if (config.enableContent) {
          contentPageGraph = analyzeContent(num, text, spatial, metadata);
          contentGraph.addPageGraph(contentPageGraph);
        }

        let vectors = [];
        if (extractVecs) {
          try { vectors = await extractVectors(page); } catch (e) {}
        }

        let structureTree = null;
        try { structureTree = await extractStructureTree(page); } catch (e) {}

        let annotations = [];
        try { annotations = await extractAnnotations(page); } catch (e) {}

        const irPage = addPage(ir, num, {
          width: pageSize.width,
          height: pageSize.height,
          rotation: page.rotate,
          mediaBox: page.mediaBox,
          cropBox: page.cropBox,
        });

        for (const vec of vectors) addVectorObject(ir, `page_${num}`, vec);
        for (const item of content.items) {
          if (item.str && item.str.trim()) {
            addTextObject(ir, `page_${num}`, {
              text: item.str,
              bbox: [item.transform[4], item.transform[5], item.width, item.height],
              font: item.fontName,
              fontSize: Math.abs(item.transform[0]) || 12,
              transform: item.transform,
            });
          }
        }

        if (annotations.length > 0) {
          irPage.annotations = annotations;
          ir.annotations[`page_${num}`] = annotations;
        }
        if (structureTree) ir.structure[`page_${num}`] = structureTree;

        if (extractExtended) {
          try { irPage.markedContent = await extractMarkedContent(page); } catch (e) {}
          try { irPage.artifacts = await extractArtifacts(page); } catch (e) {}
          try { irPage.glyphs = await extractGlyphs(page); } catch (e) {}
        }

        let readingOrder = [];
        try { readingOrder = detectReadingOrder(ir, num); } catch (e) {}

        const pageResult = {
          num, text, source, confidence, pageSize,
          spatial, structures, metadata, classification,
          contentBlocks: contentPageGraph ? contentPageGraph.blocks.length : 0,
          contentEntities: contentPageGraph ? contentPageGraph.entities.length : 0,
          vectors: vectors.length,
          annotations: annotations.length,
          hasStructureTree: !!structureTree,
          readingOrder: readingOrder.length,
        };

        graph.addPageResult(pageResult);
        onPageComplete && onPageComplete(pageResult);

        try { page.cleanup(); } catch (e) {}
      }

      onBatchComplete && onBatchComplete({ 
        batchStart, 
        batchEnd, 
        completed: batchEnd,
        total: totalPages 
      });
    }

    if (config.enableContent) {
      contentGraph.documentType = classifyDocumentType(contentGraph);
    }

    graph._contentGraph = contentGraph;
    graph._doc = this;
    graph._ir = ir;

    graph.find = (query) => executeQuery(contentGraph, query, graph);
    graph.findOne = (query) => {
      const results = contentGraph.find(query);
      return results.length > 0 ? results[0] : null;
    };
    graph.ask = (question) => executeAsk(contentGraph, question, graph);
    graph.getEntities = (type) => contentGraph.getEntities(type);
    graph.getBlocks = (type) => contentGraph.getBlocks(type);
    graph.getDocumentType = () => contentGraph.documentType;
    graph.getIR = () => ir;
    graph.auditAccessibility = () => auditAccessibility(ir);
    graph.getAccessibilityTree = () => generateAccessibilityTree(ir);
    graph.toHTML = (options) => exportHTML(ir, options);
    graph.getVectors = (pageNum) => ir.pages[`page_${pageNum}`]?.vectors?.map(id => ir.vectors[id]) || [];
    graph.getStructureTree = (pageNum) => ir.structure[`page_${pageNum}`] || null;
    graph.getAnnotations = (pageNum) => ir.annotations[`page_${pageNum}`] || [];
    graph.getFormFields = () => ir.forms?.fields || [];
    graph.getReadingOrder = (pageNum) => detectReadingOrder(ir, pageNum);
    graph.getReadingOrderSequence = (pageNum) => getReadingOrderSequence(ir, pageNum);
    graph.getMetadata = () => ir.document.metadata;
    graph.getOutline = () => ir.document.navigation.outline || [];
    graph.getNamedDestinations = () => ir.document.navigation.destinations || {};
    graph.getPageLabels = () => ir.document.navigation.labels || [];
    graph.getSecurity = () => ir.document.security;
    graph.getMarkedContent = (pageNum) => ir.pages[`page_${pageNum}`]?.markedContent || [];
    graph.getArtifacts = (pageNum) => ir.pages[`page_${pageNum}`]?.artifacts || [];
    graph.getGlyphs = (pageNum) => ir.pages[`page_${pageNum}`]?.glyphs || [];
    graph.getRemediations = () => generateRemediations(graph.auditAccessibility(), ir);
    graph.wcagAudit = () => wcagAudit(ir);
    graph.toAccessibleHTML = (options) => exportAccessibleHTML(ir, options);
    graph.remediateAccessibility = (options) => {
      const result = remediateAccessibility(ir, options);
      return result.report;
    };
    graph.getAccessibilityReport = () => generateAccessibilityReport(ir);
    graph.createChunks = (options) => createChunks(graph, options);
    graph.getCrossPageContext = () => buildCrossPageContext(graph);
    graph.toRAG = (options) => createRAGOutput(graph, options);

    return graph;
  }

  destroy() {
    if (this._pdf) this._pdf.destroy();
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Compute text quality score for OCR decision.
 * Returns 0.0 (poor, needs OCR) to 1.0 (good, skip OCR).
 * Replaces the crude text-length check with multi-signal scoring.
 */
function computeTextQuality(contentItems, pageSize) {
  if (!contentItems || contentItems.length === 0) return 0;

  let score = 1.0;
  const allText = contentItems.map(i => i.str || '').join(' ');
  const wordCount = allText.split(/\s+/).filter(w => w.length > 0).length;

  // 1. Text volume (very short = likely scanned image)
  if (wordCount < 5) score -= 0.4;
  else if (wordCount < 15) score -= 0.2;

  // 2. Non-printable character ratio
  const nonPrintable = allText.replace(/[\x20-\x7E\n\r\t]/g, '').length;
  const nonPrintRatio = allText.length > 0 ? nonPrintable / allText.length : 0;
  if (nonPrintRatio > 0.3) score -= 0.3;

  // 3. Outside-bounds text ratio (invisible text)
  const outsideBounds = contentItems.filter(item => {
    const x = item.transform?.[4] || 0;
    const y = item.transform?.[5] || 0;
    return x < 0 || x > pageSize.width || y < 0 || y > pageSize.height;
  }).length;
  const outsideRatio = contentItems.length > 0 ? outsideBounds / contentItems.length : 0;
  if (outsideRatio > 0.5) score -= 0.3;

  // 4. Average word length (too short or too long suggests garbage)
  const words = allText.split(/\s+/).filter(w => w.length > 0);
  const avgWordLen = words.length > 0 ? words.reduce((s, w) => s + w.length, 0) / words.length : 0;
  if (avgWordLen < 1.5 || avgWordLen > 25) score -= 0.2;

  // 5. Duplicate text fragment ratio
  const fragments = contentItems.map(i => (i.str || '').trim()).filter(t => t.length > 3);
  const uniqueFragments = new Set(fragments.map(f => f.toLowerCase()));
  const duplicateRatio = fragments.length > 0 ? 1 - uniqueFragments.size / fragments.length : 0;
  if (duplicateRatio > 0.5) score -= 0.15;

  // 6. Character variety (too few unique characters suggests OCR failure)
  const uniqueChars = new Set(allText.replace(/\s/g, '')).size;
  if (uniqueChars < 10 && wordCount > 10) score -= 0.15;

  return Math.max(0, Math.min(1, score));
}

/**
 * Infer the semantic role of an image based on its content and context.
 */
function inferImageRole(img, contentItems, pageSize) {
  if (!img.bbox) return 'unknown';

  const imgY = img.bbox.y || 0;
  const imgCenterY = imgY + (img.bbox.height || 0) / 2;
  const normalizedY = imgCenterY / pageSize.height;

  // Header image (top 15%)
  if (normalizedY < 0.15) return 'header';

  // Footer image (bottom 15%)
  if (normalizedY > 0.85) return 'footer';

  // Check if it's a logo (small, near top)
  if (normalizedY < 0.3 && img.originalWidth < 300 && img.originalHeight < 150) return 'logo';

  // Check if it's a chart/diagram (large, centered)
  if (img.originalWidth > 400 && img.originalHeight > 300) {
    const centerX = (img.bbox.x || 0) + (img.bbox.width || 0) / 2;
    if (centerX > pageSize.width * 0.2 && centerX < pageSize.width * 0.8) return 'chart';
  }

  // Check if it's an icon (very small)
  if (img.originalWidth < 50 && img.originalHeight < 50) return 'icon';

  // Check for figure reference in nearby text
  const nearbyText = contentItems
    .filter(item => {
      const y = item.transform?.[5] || 0;
      return Math.abs(y - imgY) < 100;
    })
    .map(item => item.str || '')
    .join(' ');

  if (/figure|fig\.|chart|graph|diagram|image|photo|picture/i.test(nearbyText)) return 'figure';
  if (/logo|emblem|seal|crest|badge/i.test(nearbyText)) return 'logo';

  return 'content';
}

/**
 * Fuse native PDF text with OCR results, preserving the best evidence from both.
 */
function fuseNativeOCR(nativeText, ocrText, contentItems, pageSize) {
  if (!nativeText || !ocrText) return nativeText || ocrText || '';

  // If native text is high quality, use it as primary
  const nativeQuality = computeTextQuality(contentItems, pageSize);
  if (nativeQuality > 0.8) {
    return nativeText;
  }

  // If OCR is much longer, it likely captured more content
  if (ocrText.length > nativeText.length * 1.5) {
    return ocrText;
  }

  // Fusion: use native text but patch gaps with OCR
  const nativeWords = new Set(nativeText.toLowerCase().split(/\s+/));
  const ocrWords = ocrText.split(/\s+/);
  const missingWords = ocrWords.filter(w => !nativeWords.has(w.toLowerCase()));

  if (missingWords.length > 0 && missingWords.length < ocrWords.length * 0.3) {
    // Native is mostly complete, return it
    return nativeText;
  }

  // Otherwise return the longer text (usually more complete)
  return nativeText.length >= ocrText.length ? nativeText : ocrText;
}

/**
 * Find the nearest caption text for an image (typically below it).
 */
function findNearestCaption(img, contentItems, pageSize) {
  if (!img.bbox) return null;

  const imgY = img.bbox.y || 0;
  const imgBottom = imgY;
  const imgLeft = img.bbox.x || 0;
  const imgRight = imgLeft + (img.bbox.width || 0);

  // Look for text immediately below the image
  const candidates = contentItems
    .filter(item => {
      const y = item.transform?.[5] || 0;
      const x = item.transform?.[4] || 0;
      // Text below the image but within 100px and horizontally overlapping
      const below = y < imgBottom && y > imgBottom - 100;
      const overlap = x >= imgLeft - 50 && x <= imgRight + 50;
      return below && overlap && item.str && item.str.trim().length > 5;
    })
    .sort((a, b) => {
      // Closest to image bottom first
      const distA = imgBottom - (a.transform?.[5] || 0);
      const distB = imgBottom - (b.transform?.[5] || 0);
      return distA - distB;
    });

  if (candidates.length === 0) return null;

  // Check if first candidate looks like a caption (starts with "Figure", "Fig.", etc.)
  const firstText = candidates[0].str.trim();
  if (/^(figure|fig\.|chart|graph|diagram|table|photo|image|picture)/i.test(firstText)) {
    return firstText;
  }

  return firstText;
}

/**
 * Extract nearby text context for an image (text within 150px in any direction).
 */
function extractNearbyText(img, contentItems, pageSize) {
  if (!img.bbox) return '';
  const imgX = img.bbox[0] || 0;
  const imgY = img.bbox[1] || 0;
  const imgW = img.bbox[2] || 0;
  const imgH = img.bbox[3] || 0;
  const margin = 150;

  const nearby = contentItems
    .filter(item => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      const inX = x >= imgX - margin && x <= imgX + imgW + margin;
      const inY = y >= imgY - margin && y <= imgY + imgH + margin;
      return inX && inY && item.str && item.str.trim().length > 0;
    })
    .sort((a, b) => {
      const aDist = Math.abs((a.transform?.[4] || 0) - imgX) + Math.abs((a.transform?.[5] || 0) - imgY);
      const bDist = Math.abs((b.transform?.[4] || 0) - imgX) + Math.abs((b.transform?.[5] || 0) - imgY);
      return aDist - bDist;
    })
    .slice(0, 20)
    .map(item => item.str.trim())
    .join(' ');

  return nearby;
}

async function renderPageToCanvas(page, scale) {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export { load, configure, canUseWorkers };
export const CodbDocs = { load, configure, canUseWorkers };
export default CodbDocs;

// Export classes for advanced usage
export { DocumentGraph } from './layers.js';
export { DocumentContentGraph, PageContentGraph, ContentBlock, BlockTypes, EntityTypes } from './content.js';
export { analyzeSpatialLayout, detectStructure, extractMetadata, classifyPage, analyzeVisualRegions } from './brain.js';
export { executeQuery, executeAsk, highlightResults, createHighlightAnnotations } from './query.js';
export {
  extractImages,
  extractAllImages,
  createChunks,
  buildCrossPageContext,
  createRAGOutput,
  createRAGOutputWithEmbeddings,
  exportAsJSONL,
  exportAsCSV,
  ChunkStrategies,
  EmbeddingProvider,
  OpenAIEmbeddingProvider,
  LocalEmbeddingProvider,
  CustomEmbeddingProvider,
  hydrateGraph,
} from './rag.js';

export {
  extractDocumentMetadata,
  extractOutline,
  extractNamedDestinations,
  extractPageLabels,
  extractSecurity,
  extractMarkedContent,
  extractArtifacts,
  extractGlyphs,
  generateRemediations,
} from './extended.js';

export {
  extractGraphicsState,
  buildGraphicsStateSummary,
  parseBlendMode,
  createTransparencyGroup,
  createSoftMask,
  createTilingPattern,
  createGradientShading,
  parseShading,
  ColorSpaceTypes,
  toRgb,
  cmykToRgb,
  rgbToCmyk,
  labToRgb,
} from './graphics.js';

export {
  PDFCreator,
  createPDF,
  createTextPDF,
} from './pdfcreator.js';

export {
  extractSignatures,
  buildSignatureSummary,
  extractOCGs,
  buildOCGSummary,
  extractEmbeddedFiles,
  buildEmbeddedFilesSummary,
  extractActions,
  buildActionsSummary,
  extractAppearanceStreams,
  buildAppearanceStreamsSummary,
  trackXObjectReuse,
  buildXObjectSummary,
  extractRevisions,
  buildRevisionsSummary,
} from './advanced.js';

export {
  analyzeTextQuality,
  compareVisualInternal,
  detectRepeatedElements,
  normalizeText,
  detectRedactions,
  validateTags,
  calculateRAGReadiness,
  reconstructTable,
  diagnoseDocument,
  normalizeDocument,
} from './quality.js';

export {
  detectRotationSkew,
  detectGlyphIssues,
  detectOutlinedText,
  detectFlattenedForms,
  detectCheckboxes,
  detectCrossPageTables,
  associateCaptionsWithImages,
  detectFootnotes,
  detectLanguage,
  detectMalformedPDF,
} from './edgecases.js';

export {
  ConceptGraph,
  ConceptNode,
  ConceptEdge,
  extractRelationships,
  CodbFingerprint,
  hybridSearch,
  detectIntent,
  decomposeQuery,
  rankResults,
  QueryIntent,
  executeReasoning,
  operatorCount,
  operatorSum,
  operatorMax,
  operatorMin,
} from './concepts.js';

export {
  wcagAudit,
  exportAccessibleHTML,
  remediateAccessibility,
  generateAccessibilityReport,
  normalizeIR,
} from './docaccess.js';

export {
  expandQuery,
  stem,
  charNGrams,
  wordNGrams,
  levenshtein,
  fuzzyScore,
  bestFuzzyMatch,
  detectAcronyms,
  detectDefinitions,
  learnTerminology,
  fuzzySearch,
} from './expansion.js';

export {
  buildTableObjects,
  queryTable,
  rerankResults,
} from './concepts.js';

export { createWorkspace } from './workspace.js';
export { saveToCache, loadFromCache, clearCache, getCacheStats } from './persistence.js';
