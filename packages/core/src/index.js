/**
 * @codbdocs/core
 *
 * Framework-agnostic browser engine for turning a PDF into searchable text.
 * Uses PDF.js to pull embedded text layers, and falls back to Tesseract.js
 * OCR for any page that doesn't have one (scans, photographed pages, etc).
 *
 * This module does not bundle PDF.js or Tesseract.js. It expects them to be
 * present as globals (`window.pdfjsLib`, `window.Tesseract`) — load them via
 * <script> tags or your own bundler before calling CodbDocs.load().
 * This keeps @codbdocs/core small and lets consumers pin whichever versions
 * of those two libraries they want.
 */

const DEFAULTS = {
  nativeTextMinLength: 20, // below this, a page is treated as "no text layer"
  ocrScale: 2,              // render scale used before handing a page to Tesseract
  ocrLang: 'eng',
};

let config = { ...DEFAULTS };

/**
 * Override default behavior. Call before load() if you need to.
 * @param {Partial<typeof DEFAULTS>} opts
 */
function configure(opts = {}) {
  config = { ...config, ...opts };
}

function getPdfjs() {
  const lib = (typeof window !== 'undefined') &&
    (window['pdfjs-dist/build/pdf'] || window.pdfjsLib);
  if (!lib) {
    throw new Error(
      '[codbdocs] pdfjsLib not found. Load PDF.js before calling CodbDocs.load().'
    );
  }
  return lib;
}

function getTesseract() {
  const lib = (typeof window !== 'undefined') && window.Tesseract;
  if (!lib) {
    throw new Error(
      '[codbdocs] Tesseract not found. Load Tesseract.js before calling doc.analyze({ ocr: true }).'
    );
  }
  return lib;
}

/**
 * Load a PDF from a File, Blob, ArrayBuffer, or URL string.
 * @param {File|Blob|ArrayBuffer|string} source
 * @returns {Promise<CodbDoc>}
 */
async function load(source) {
  const pdfjsLib = getPdfjs();

  let data;
  if (typeof source === 'string') {
    data = { url: source };
  } else if (source instanceof ArrayBuffer) {
    data = { data: source };
  } else if (source && typeof source.arrayBuffer === 'function') {
    data = { data: await source.arrayBuffer() };
  } else {
    throw new Error('[codbdocs] Unsupported source. Pass a File, Blob, ArrayBuffer, or URL string.');
  }

  const pdf = await pdfjsLib.getDocument(data).promise;
  return new CodbDoc(pdf);
}

class CodbDoc {
  constructor(pdf) {
    this._pdf = pdf;
    this.pageCount = pdf.numPages;
  }

  /**
   * Run the extraction pipeline.
   * @param {{ ocr?: boolean, onPageComplete?: (page: PageResult) => void, onProgress?: (info: {page:number, status:string, progress?:number}) => void }} opts
   * @returns {Promise<DocumentGraph>}
   */
  async analyze(opts = {}) {
    const { ocr = true, onPageComplete, onProgress } = opts;
    const pages = [];

    for (let num = 1; num <= this.pageCount; num++) {
      onProgress && onProgress({ page: num, status: 'reading' });
      const page = await this._pdf.getPage(num);
      const content = await page.getTextContent();
      const nativeText = content.items.map((it) => it.str).join(' ').replace(/\s+/g, ' ').trim();

      /** @type {PageResult} */
      let result;

      if (nativeText.length > config.nativeTextMinLength) {
        result = { num, text: nativeText, source: 'native', confidence: null };
      } else if (ocr) {
        onProgress && onProgress({ page: num, status: 'ocr', progress: 0 });
        try {
          const canvas = await renderPageToCanvas(page, config.ocrScale);
          const Tesseract = getTesseract();
          const { data } = await Tesseract.recognize(canvas, config.ocrLang, {
            logger: (m) => {
              if (m.status === 'recognizing text') {
                onProgress && onProgress({ page: num, status: 'ocr', progress: m.progress });
              }
            },
          });
          result = { num, text: (data.text || '').trim(), source: 'ocr', confidence: data.confidence };
        } catch (err) {
          result = { num, text: '', source: 'error', confidence: null, error: String(err) };
        }
      } else {
        result = { num, text: '', source: 'skipped', confidence: null };
      }

      pages.push(result);
      onPageComplete && onPageComplete(result);
    }

    const fullText = pages.map((p) => `--- page ${p.num} (${p.source}) ---\n${p.text}`).join('\n\n');
    const wordCount = pages.reduce((sum, p) => sum + (p.text ? p.text.split(/\s+/).filter(Boolean).length : 0), 0);

    return {
      pageCount: this.pageCount,
      pages,
      fullText,
      stats: {
        nativeCount: pages.filter((p) => p.source === 'native').length,
        ocrCount: pages.filter((p) => p.source === 'ocr').length,
        wordCount,
      },
    };
  }
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

export const CodbDocs = { load, configure };
export default CodbDocs;

/**
 * @typedef {Object} PageResult
 * @property {number} num
 * @property {string} text
 * @property {'native'|'ocr'|'error'|'skipped'} source
 * @property {number|null} confidence
 *
 * @typedef {Object} DocumentGraph
 * @property {number} pageCount
 * @property {PageResult[]} pages
 * @property {string} fullText
 * @property {{nativeCount:number, ocrCount:number, wordCount:number}} stats
 */
