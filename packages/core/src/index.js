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
  canUseWorkers,
  createRenderWorker,
  createBrainWorker,
  terminateWorker,
} from './workers.js';

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
};

let config = { ...DEFAULTS };

function configure(opts = {}) {
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
      onPageComplete,
      onProgress,
      onLayer,
    } = opts;

    const graph = new DocumentGraph();
    const contentGraph = new DocumentContentGraph();
    const ir = createIR();
    const useWorkers = config.useWorkers && canUseWorkers();
    let renderWorker = null;
    let brainWorker = null;

    if (useWorkers) {
      try {
        renderWorker = createRenderWorker();
        brainWorker = createBrainWorker();
      } catch (e) { /* fallback */ }
    }

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

        // OCR fallback
        if (nativeText.length <= config.nativeTextMinLength && ocr) {
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
            text = (data.text || '').trim();
            source = 'ocr';
            confidence = data.confidence;
          } catch (err) {
            source = 'error';
            text = '';
          }
        } else if (nativeText.length <= config.nativeTextMinLength && !ocr) {
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

        // Extract vectors from PDF (new)
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

        // Detect reading order
        let readingOrder = [];
        try {
          readingOrder = detectReadingOrder(ir, num);
        } catch (e) { /* reading order detection may fail */ }

        // Build page result
        const pageResult = {
          num, text, source, confidence, pageSize,
          spatial, structures, metadata, classification,
          visual: visualRegions,
          contentBlocks: contentPageGraph ? contentPageGraph.blocks.length : 0,
          contentEntities: contentPageGraph ? contentPageGraph.entities.length : 0,
          vectors: vectors.length,
          annotations: annotations.length,
          hasStructureTree: !!structureTree,
          readingOrder: readingOrder.length,
        };

        graph.addPageResult(pageResult);
        onPageComplete && onPageComplete(pageResult);
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
      }
    } finally {
      terminateWorker(renderWorker);
      terminateWorker(brainWorker);
    }

    // Classify document type
    if (config.enableContent) {
      contentGraph.documentType = classifyDocumentType(contentGraph);
    }

    // Attach content graph and query methods to the document graph
    graph._contentGraph = contentGraph;
    graph._doc = this;
    graph._ir = ir;

    // Add content-aware methods
    graph.find = (query) => executeQuery(contentGraph, query);
    graph.findOne = (query) => {
      const results = contentGraph.find(query);
      return results.length > 0 ? results[0] : null;
    };
    graph.ask = (question) => executeAsk(contentGraph, question);
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

    return graph;
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

      if (nativeText.length <= config.nativeTextMinLength && ocr) {
        onProgress && onProgress({ page: num, total: this.pageCount, status: 'ocr' });
        try {
          const canvas = await renderPageToCanvas(page, config.ocrScale);
          const Tesseract = getTesseract();
          const { data } = await Tesseract.recognize(canvas, config.ocrLang);
          text = (data.text || '').trim();
          source = 'ocr';
        } catch { text = ''; source = 'error'; }
      } else if (nativeText.length <= config.nativeTextMinLength) {
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

  destroy() {
    if (this._pdf) this._pdf.destroy();
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

export const CodbDocs = { load, configure, canUseWorkers };
export default CodbDocs;

// Export classes for advanced usage
export { DocumentGraph } from './layers.js';
export { DocumentContentGraph, PageContentGraph, ContentBlock, BlockTypes, EntityTypes } from './content.js';
export { analyzeSpatialLayout, detectStructure, extractMetadata, classifyPage, analyzeVisualRegions } from './brain.js';
export { executeQuery, executeAsk, highlightResults, createHighlightAnnotations } from './query.js';
