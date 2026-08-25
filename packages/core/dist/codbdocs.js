/**
 * @codbdocs/core — browser build (UMD-style global)
 * Drop this in after PDF.js and Tesseract.js are loaded:
 *
 *   <script src=".../pdf.min.js"></script>
 *   <script src=".../tesseract.min.js"></script>
 *   <script src="codbdocs.js"></script>
 *   <script>
 *     const doc = await CodbDocs.load(file);
 *     const result = await doc.analyze({ ocr: true });
 *   </script>
 *
 * No React. No build step. No server.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodbDocs = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DEFAULTS = {
    nativeTextMinLength: 20,
    ocrScale: 2,
    ocrLang: 'eng',
  };
  var config = Object.assign({}, DEFAULTS);

  function configure(opts) {
    config = Object.assign({}, config, opts || {});
  }

  function getPdfjs() {
    var lib = (typeof window !== 'undefined') &&
      (window['pdfjs-dist/build/pdf'] || window.pdfjsLib);
    if (!lib) throw new Error('[codbdocs] pdfjsLib not found. Load PDF.js before calling CodbDocs.load().');
    return lib;
  }

  function getTesseract() {
    var lib = (typeof window !== 'undefined') && window.Tesseract;
    if (!lib) throw new Error('[codbdocs] Tesseract not found. Load Tesseract.js before calling doc.analyze({ ocr: true }).');
    return lib;
  }

  function renderPageToCanvas(page, scale) {
    var viewport = page.getViewport({ scale: scale });
    var canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    var ctx = canvas.getContext('2d');
    return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
      return canvas;
    });
  }

  function CodbDoc(pdf) {
    this._pdf = pdf;
    this.pageCount = pdf.numPages;
  }

  CodbDoc.prototype.analyze = async function (opts) {
    opts = opts || {};
    var ocr = opts.ocr !== false;
    var onPageComplete = opts.onPageComplete;
    var onProgress = opts.onProgress;
    var pages = [];

    for (var num = 1; num <= this.pageCount; num++) {
      if (onProgress) onProgress({ page: num, status: 'reading' });
      var page = await this._pdf.getPage(num);
      var content = await page.getTextContent();
      var nativeText = content.items.map(function (it) { return it.str; }).join(' ').replace(/\s+/g, ' ').trim();

      var result;
      if (nativeText.length > config.nativeTextMinLength) {
        result = { num: num, text: nativeText, source: 'native', confidence: null };
      } else if (ocr) {
        if (onProgress) onProgress({ page: num, status: 'ocr', progress: 0 });
        try {
          var canvas = await renderPageToCanvas(page, config.ocrScale);
          var Tesseract = getTesseract();
          var res = await Tesseract.recognize(canvas, config.ocrLang, {
            logger: function (m) {
              if (m.status === 'recognizing text' && onProgress) {
                onProgress({ page: num, status: 'ocr', progress: m.progress });
              }
            },
          });
          result = { num: num, text: (res.data.text || '').trim(), source: 'ocr', confidence: res.data.confidence };
        } catch (err) {
          result = { num: num, text: '', source: 'error', confidence: null, error: String(err) };
        }
      } else {
        result = { num: num, text: '', source: 'skipped', confidence: null };
      }

      pages.push(result);
      if (onPageComplete) onPageComplete(result);
    }

    var fullText = pages.map(function (p) {
      return '--- page ' + p.num + ' (' + p.source + ') ---\n' + p.text;
    }).join('\n\n');
    var wordCount = pages.reduce(function (sum, p) {
      return sum + (p.text ? p.text.split(/\s+/).filter(Boolean).length : 0);
    }, 0);

    return {
      pageCount: this.pageCount,
      pages: pages,
      fullText: fullText,
      stats: {
        nativeCount: pages.filter(function (p) { return p.source === 'native'; }).length,
        ocrCount: pages.filter(function (p) { return p.source === 'ocr'; }).length,
        wordCount: wordCount,
      },
    };
  };

  async function load(source) {
    var pdfjsLib = getPdfjs();
    var data;
    if (typeof source === 'string') {
      data = { url: source };
    } else if (source instanceof ArrayBuffer) {
      data = { data: source };
    } else if (source && typeof source.arrayBuffer === 'function') {
      data = { data: await source.arrayBuffer() };
    } else {
      throw new Error('[codbdocs] Unsupported source. Pass a File, Blob, ArrayBuffer, or URL string.');
    }
    var pdf = await pdfjsLib.getDocument(data).promise;
    return new CodbDoc(pdf);
  }

  return { load: load, configure: configure };
});
