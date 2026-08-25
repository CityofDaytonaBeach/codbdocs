/**
 * @codbdocs/core
 *
 * Browser document-processing engine with offline AI understanding.
 * Uses PDF.js for text extraction, Tesseract.js for OCR fallback,
 * and a built-in Document Brain for semantic analysis.
 *
 * No server. No CDN. No external APIs. Pure browser JavaScript.
 *
 * Architecture:
 *   CodbDocs.load(source)
 *     → CodbDoc
 *       → doc.analyze({ ocr, visual })
 *         → DocumentGraph (queryable)
 *           → .query("what dates are mentioned?")
 *           → .toJSON()
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
  canUseWorkers,
  createRenderWorker,
  createBrainWorker,
  sendToWorker,
  terminateWorker,
} from './workers.js';

// ─── Configuration ───────────────────────────────────────────────────────────

const DEFAULTS = {
  nativeTextMinLength: 20,
  ocrScale: 2,
  ocrLang: 'eng',
  enableVisual: false,       // enable canvas-based visual analysis
  enableBrain: true,         // enable document brain (structure, metadata)
  useWorkers: true,          // use OffscreenCanvas + Workers when available
  concurrency: 1,            // parallel page processing (1 = sequential)
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
    this._workers = [];
  }

  /**
   * Run the full analysis pipeline.
   *
   * @param {Object} opts
   * @param {boolean} opts.ocr - Enable OCR for scan-only pages (default: true)
   * @param {boolean} opts.visual - Enable visual analysis (default: false)
   * @param {Function} opts.onPageComplete - Called when each page is done
   * @param {Function} opts.onProgress - Called with progress updates
   * @param {Function} opts.onLayer - Called when each semantic layer is updated
   *
   * @returns {Promise<DocumentGraph>} Rich, queryable document graph
   */
  async analyze(opts = {}) {
    const {
      ocr = true,
      visual = false,
      onPageComplete,
      onProgress,
      onLayer,
    } = opts;

    const graph = new DocumentGraph();
    const useWorkers = config.useWorkers && canUseWorkers();
    let renderWorker = null;
    let brainWorker = null;

    // Set up workers if available
    if (useWorkers) {
      try {
        renderWorker = createRenderWorker();
        brainWorker = createBrainWorker();
      } catch (e) {
        // Workers not available, fall back to main thread
      }
    }

    try {
      for (let num = 1; num <= this.pageCount; num++) {
        onProgress && onProgress({ page: num, total: this.pageCount, status: 'reading' });

        // Get PDF page
        const page = await this._pdf.getPage(num);
        const viewport = page.getViewport({ scale: 1 });
        const pageSize = { width: viewport.width, height: viewport.height };

        // Extract text content
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

        // OCR fallback for scan pages
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

        // Run Document Brain analysis
        let spatial = null;
        let structures = null;
        let metadata = null;
        let classification = null;
        let visualRegions = null;

        if (config.enableBrain) {
          onProgress && onProgress({ page: num, total: this.pageCount, status: 'analyzing' });

          // Spatial analysis
          spatial = analyzeSpatialLayout(content.items, pageSize);

          // Structure detection
          structures = detectStructure(spatial, pageSize);

          // Metadata extraction
          metadata = extractMetadata(text);

          // Page classification
          classification = classifyPage(text, spatial);
        }

        // Visual analysis (requires rendering)
        if (visual || config.enableVisual) {
          if (!canvas) {
            canvas = await renderPageToCanvas(page, config.ocrScale);
          }
          try {
            visualRegions = analyzeVisualRegions(canvas);
          } catch (e) {
            // Visual analysis failed, skip
          }
        }

        // Build page result
        const pageResult = {
          num,
          text,
          source,
          confidence,
          pageSize,
          spatial,
          structures,
          metadata,
          classification,
          visual: visualRegions,
        };

        // Add to graph
        graph.addPageResult(pageResult);

        // Callbacks
        onPageComplete && onPageComplete(pageResult);
        onLayer && onLayer({
          page: num,
          spatial: !!spatial,
          structure: !!structures,
          metadata: !!metadata,
          classification: classification?.type,
        });
      }
    } finally {
      // Clean up workers
      terminateWorker(renderWorker);
      terminateWorker(brainWorker);
    }

    return graph;
  }

  /**
   * Quick text-only extraction (no brain analysis).
   * Faster than analyze() when you just need raw text.
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
        } catch {
          text = '';
          source = 'error';
        }
      } else if (nativeText.length <= config.nativeTextMinLength) {
        source = 'skipped';
        text = '';
      }

      pages.push({ num, text, source });
    }

    return {
      pageCount: this.pageCount,
      pages,
      fullText: pages.map(p => `--- page ${p.num} (${p.source}) ---\n${p.text}`).join('\n\n'),
    };
  }

  /**
   * Render a page to a canvas element (for display).
   */
  async renderPage(pageNum, scale = 1.5) {
    const page = await this._pdf.getPage(pageNum);
    return renderPageToCanvas(page, scale);
  }

  /**
   * Clean up resources.
   */
  destroy() {
    if (this._pdf) {
      this._pdf.destroy();
    }
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

// Also export classes for advanced usage
export { DocumentGraph, TextLayer, LayoutLayer, StructureLayer, MetadataLayer, VisualLayer } from './layers.js';
export { analyzeSpatialLayout, detectStructure, extractMetadata, classifyPage, analyzeVisualRegions } from './brain.js';
