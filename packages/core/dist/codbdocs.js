/**
 * @codbdocs/core — browser build (UMD-style global)
 *
 * Complete browser-ready build with Document Brain, semantic layers,
 * and worker support. Drop in after PDF.js and Tesseract.js:
 *
 *   <script src="vendor/pdf.js/pdf.min.js"></script>
 *   <script src="vendor/tesseract.js/tesseract.min.js"></script>
 *   <script src="codbdocs.js"></script>
 *   <script>
 *     const doc = await CodbDocs.load(file);
 *     const graph = await doc.analyze({ ocr: true });
 *     console.log(graph.query("what dates are mentioned?"));
 *   </script>
 *
 * No React. No build step. No server. No CDN.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodbDocs = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ─── Configuration ───────────────────────────────────────────────────────

  var DEFAULTS = {
    nativeTextMinLength: 20,
    ocrScale: 2,
    ocrLang: 'eng',
    enableVisual: false,
    enableBrain: true,
    useWorkers: true,
    concurrency: 1,
  };

  var config = Object.assign({}, DEFAULTS);

  function configure(opts) {
    config = Object.assign({}, config, opts || {});
  }

  // ─── Library Detection ─────────────────────────────────────────────────

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

  function canUseWorkersFn() {
    return typeof OffscreenCanvas !== 'undefined' && typeof Worker !== 'undefined';
  }

  // ─── Brain: Spatial Analysis ───────────────────────────────────────────

  function analyzeSpatialLayout(items, pageSize) {
    if (!items || items.length === 0) return { columns: 0, rows: [], headings: [], flow: 'unknown' };

    var boxes = items.map(function (item) {
      var tx = item.transform;
      return {
        text: item.str,
        x: tx[4], y: tx[5],
        width: item.width, height: item.height,
        fontSize: Math.abs(tx[0]) || Math.abs(tx[3]) || 12,
        fontName: item.fontName || '',
      };
    }).filter(function (b) { return b.text.trim(); });

    var columns = detectColumns(boxes, pageSize.width);
    var rows = groupIntoRows(boxes);
    var headings = detectHeadings(boxes);
    var flow = detectFlow(rows);

    return { columns: columns, rows: rows, headings: headings, flow: flow, boxes: boxes };
  }

  function detectColumns(boxes, pageWidth) {
    if (boxes.length === 0) return 0;
    var xPositions = boxes.map(function (b) { return b.x; }).sort(function (a, b) { return a - b; });
    var clusters = [];
    var currentCluster = [xPositions[0]];

    for (var i = 1; i < xPositions.length; i++) {
      if (xPositions[i] - xPositions[i - 1] > pageWidth * 0.15) {
        clusters.push(currentCluster);
        currentCluster = [xPositions[i]];
      } else {
        currentCluster.push(xPositions[i]);
      }
    }
    clusters.push(currentCluster);
    return Math.min(clusters.length, 4);
  }

  function groupIntoRows(boxes) {
    if (boxes.length === 0) return [];
    var sorted = boxes.slice().sort(function (a, b) { return b.y - a.y; });
    var rows = [];
    var currentRow = [sorted[0]];

    for (var i = 1; i < sorted.length; i++) {
      var avgHeight = currentRow.reduce(function (s, b) { return s + b.height; }, 0) / currentRow.length;
      if (Math.abs(sorted[i].y - currentRow[0].y) < avgHeight * 1.5) {
        currentRow.push(sorted[i]);
      } else {
        currentRow.sort(function (a, b) { return a.x - b.x; });
        rows.push(currentRow);
        currentRow = [sorted[i]];
      }
    }
    currentRow.sort(function (a, b) { return a.x - b.x; });
    rows.push(currentRow);
    return rows;
  }

  function detectHeadings(boxes) {
    if (boxes.length === 0) return [];
    var sizes = boxes.map(function (b) { return b.fontSize; }).sort(function (a, b) { return a - b; });
    var medianSize = sizes[Math.floor(sizes.length / 2)];
    return boxes
      .filter(function (b) { return b.fontSize > medianSize * 1.3 && b.text.trim().length > 2; })
      .map(function (b) {
        return {
          text: b.text,
          level: b.fontSize > medianSize * 2 ? 1 : b.fontSize > medianSize * 1.5 ? 2 : 3,
          y: b.y, fontSize: b.fontSize,
        };
      });
  }

  function detectFlow(rows) {
    if (rows.length < 2) return 'single';
    var leftEdges = rows.map(function (r) { return r[0] ? r[0].x : 0; });
    var variance = leftEdges.reduce(function (s, x) { return s + Math.pow(x - leftEdges[0], 2); }, 0) / leftEdges.length;
    if (variance < 100) return 'left-aligned';
    if (variance < 500) return 'mixed';
    return 'complex';
  }

  // ─── Brain: Structure Detection ────────────────────────────────────────

  function detectStructure(spatialResult) {
    var rows = spatialResult.rows || [];
    var structures = [];

    // Tables
    var tableStart = -1;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].length >= 2) {
        if (tableStart === -1) tableStart = i;
        continue;
      }
      if (tableStart !== -1 && i - tableStart >= 2) {
        structures.push({
          type: 'table', y: rows[tableStart][0] ? rows[tableStart][0].y : 0,
          rowCount: i - tableStart,
          colCount: Math.max.apply(null, rows.slice(tableStart, i).map(function (r) { return r.length; })),
        });
      }
      tableStart = -1;
    }

    // Lists
    var bulletRe = /^[\u2022\-\*]\s/;
    var numberRe = /^(\d+[\.\)]\s)/;
    var listStart = -1;
    var listType = null;

    for (var j = 0; j < rows.length; j++) {
      var text = rows[j].map(function (b) { return b.text; }).join(' ').trim();
      var isBullet = bulletRe.test(text);
      var isNumbered = numberRe.test(text);

      if (isBullet || isNumbered) {
        if (listStart === -1) { listStart = j; listType = isBullet ? 'bullet' : 'numbered'; }
      } else {
        if (listStart !== -1 && j - listStart >= 2) {
          structures.push({ type: 'list', listType: listType, y: rows[listStart][0] ? rows[listStart][0].y : 0, itemCount: j - listStart });
        }
        listStart = -1;
      }
    }

    // Form fields
    var fieldRe = /^([A-Z][A-Za-z\s]{2,30}):\s*/;
    for (var k = 0; k < rows.length; k++) {
      var rowText = rows[k].map(function (b) { return b.text; }).join(' ');
      var match = rowText.match(fieldRe);
      if (match) {
        structures.push({ type: 'formField', label: match[1].trim(), y: rows[k][0] ? rows[k][0].y : 0 });
      }
    }

    return structures;
  }

  // ─── Brain: Metadata Extraction ────────────────────────────────────────

  function extractMetadata(text) {
    return {
      dates: extractEntities(text, /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12]\d|3[01])[\/\-](\d{4})\b/g),
      phones: extractEntities(text, /\b(?:\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})\b/g),
      emails: extractEntities(text, /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g),
      addresses: extractEntities(text, /\b\d{1,5}\s+[\w\s]{2,40}(?:Street|St|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Road|Rd|Lane|Ln|Court|Ct)\b/gi),
      amounts: extractEntities(text, /\$[\d,]+(?:\.\d{2})?/g).map(function (e) {
        e.value = parseFloat(e.raw.replace(/[$,]/g, ''));
        return e;
      }),
    };
  }

  function extractEntities(text, pattern) {
    var results = [];
    var match;
    while ((match = pattern.exec(text)) !== null) {
      results.push({ raw: match[0], position: match.index });
    }
    return results;
  }

  // ─── Brain: Page Classification ────────────────────────────────────────

  function classifyPage(text) {
    if (text.length < 10) return { type: 'blank', confidence: 1.0, summary: 'Blank page' };

    var patterns = {
      cover: /title|cover|report|annual|city of daytona/i,
      letter: /dear|sincerely|regards|attention|re:/i,
      memo: /memo|memorandum|from:|to:|subject:|date:/i,
      form: /application|form|permit|license|registration/i,
      legal: /ordinance|resolution|charter|section \d|article \d/i,
      budget: /budget|appropriation|expenditure|revenue|fiscal/i,
      report: /report|analysis|review|assessment/i,
      contract: /agreement|contract|party|parties|hereby/i,
      minutes: /minutes|meeting|council|commission/i,
      policy: /policy|procedure|guideline|regulation/i,
    };

    var bestType = 'document';
    var bestConfidence = 0.3;

    for (var type in patterns) {
      var match = text.match(patterns[type]);
      if (match) {
        var confidence = Math.min(0.9, 0.5 + (match[0].length / text.length) * 5);
        if (confidence > bestConfidence) { bestType = type; bestConfidence = confidence; }
      }
    }

    return { type: bestType, confidence: bestConfidence, summary: '[' + bestType + '] ' + text.substring(0, 200) + '...' };
  }

  // ─── Brain: Visual Analysis ────────────────────────────────────────────

  function analyzeVisualRegions(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    var imageData = ctx.getImageData(0, 0, w, h);
    var data = imageData.data;
    var bandHeight = Math.floor(h / 20);
    var bands = [];

    for (var y = 0; y < h; y += bandHeight) {
      var dark = 0, total = 0;
      for (var py = y; py < Math.min(y + bandHeight, h); py++) {
        for (var px = 0; px < w; px++) {
          var idx = (py * w + px) * 4;
          var brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          total++;
          if (brightness < 128) dark++;
        }
      }
      var density = dark / total;
      bands.push({ y: y, type: density < 0.02 ? 'white' : density > 0.15 ? 'image' : 'text' });
    }

    return {
      header: bands.slice(0, Math.floor(bands.length * 0.15)).some(function (b) { return b.type === 'text'; }),
      footer: bands.slice(Math.floor(bands.length * 0.85)).some(function (b) { return b.type === 'text'; }),
      hasImages: bands.some(function (b) { return b.type === 'image'; }),
    };
  }

  // ─── Semantic Layers ───────────────────────────────────────────────────

  function DocumentGraph() {
    this.pages = [];
    this.pageCount = 0;
    this.fullText = '';
    this.wordCount = 0;
    this.classifications = [];
    this.allDates = [];
    this.allPhones = [];
    this.allEmails = [];
    this.allAddresses = [];
    this.allAmounts = [];
    this.allHeadings = [];
    this.allTables = [];
    this.allForms = [];
    this.allLists = [];
  }

  DocumentGraph.prototype.addPageResult = function (r) {
    this.pageCount++;
    this.pages.push(r);
    this.fullText += '--- page ' + r.num + ' (' + r.source + ') ---\n' + r.text + '\n\n';
    this.wordCount += (r.text ? r.text.split(/\s+/).filter(Boolean).length : 0);

    if (r.classification) this.classifications.push({ page: r.num, type: r.classification.type });
    if (r.metadata) {
      (r.metadata.dates || []).forEach(function (e) { e.page = r.num; this.allDates.push(e); }.bind(this));
      (r.metadata.phones || []).forEach(function (e) { e.page = r.num; this.allPhones.push(e); }.bind(this));
      (r.metadata.emails || []).forEach(function (e) { e.page = r.num; this.allEmails.push(e); }.bind(this));
      (r.metadata.addresses || []).forEach(function (e) { e.page = r.num; this.allAddresses.push(e); }.bind(this));
      (r.metadata.amounts || []).forEach(function (e) { e.page = r.num; this.allAmounts.push(e); }.bind(this));
    }
    if (r.spatial) {
      (r.spatial.headings || []).forEach(function (h) { h.page = r.num; this.allHeadings.push(h); }.bind(this));
    }
    if (r.structures) {
      r.structures.forEach(function (s) { s.page = r.num; if (s.type === 'table') this.allTables.push(s); else if (s.type === 'formField') this.allForms.push(s); else if (s.type === 'list') this.allLists.push(s); }.bind(this));
    }
  };

  DocumentGraph.prototype.query = function (q) {
    var lower = q.toLowerCase();
    if (/date|when|what day/.test(lower)) return { type: 'dates', results: this.allDates };
    if (/phone|call|contact/.test(lower)) return { type: 'phones', results: this.allPhones };
    if (/email/.test(lower)) return { type: 'emails', results: this.allEmails };
    if (/address|location|street/.test(lower)) return { type: 'addresses', results: this.allAddresses };
    if (/money|amount|cost|budget|\$/.test(lower)) return { type: 'amounts', results: this.allAmounts };
    if (/table|data/.test(lower)) return { type: 'tables', results: this.allTables };
    if (/list|items/.test(lower)) return { type: 'lists', results: this.allLists };
    if (/form|field|application/.test(lower)) return { type: 'forms', results: this.allForms };
    if (/heading|title|section|outline/.test(lower)) return { type: 'headings', results: this.allHeadings };
    if (/summary|overview/.test(lower)) return { type: 'summary', results: this.getSummary() };

    // Text search
    var self = this;
    var results = [];
    this.pages.forEach(function (p) {
      if (p.text.toLowerCase().indexOf(lower) !== -1) {
        results.push({ page: p.num, text: p.text.substring(0, 300) });
      }
    });
    return { type: 'text-search', query: q, results: results };
  };

  DocumentGraph.prototype.getSummary = function () {
    var typeCounts = {};
    this.classifications.forEach(function (c) { typeCounts[c.type] = (typeCounts[c.type] || 0) + 1; });

    return {
      pageCount: this.pageCount,
      wordCount: this.wordCount,
      pageTypes: typeCounts,
      dates: this.allDates.length,
      phones: this.allPhones.length,
      emails: this.allEmails.length,
      addresses: this.allAddresses.length,
      amounts: this.allAmounts.length,
      headings: this.allHeadings.map(function (h) { return h.text; }),
      tables: this.allTables.length,
      forms: this.allForms.length,
      lists: this.allLists.length,
    };
  };

  DocumentGraph.prototype.toJSON = function () {
    return {
      pageCount: this.pageCount,
      summary: this.getSummary(),
      fullText: this.fullText,
      pages: this.pages.map(function (p) {
        return {
          num: p.num, text: p.text, source: p.source,
          classification: p.classification || null,
          headings: p.spatial ? p.spatial.headings : [],
          structures: p.structures || [],
          metadata: p.metadata || {},
        };
      }),
    };
  };

  // ─── Canvas Rendering ──────────────────────────────────────────────────

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

  // ─── CodbDoc Class ─────────────────────────────────────────────────────

  function CodbDoc(pdf) {
    this._pdf = pdf;
    this.pageCount = pdf.numPages;
  }

  CodbDoc.prototype.analyze = async function (opts) {
    opts = opts || {};
    var ocr = opts.ocr !== false;
    var visual = opts.visual === true;
    var onPageComplete = opts.onPageComplete;
    var onProgress = opts.onProgress;

    var graph = new DocumentGraph();

    for (var num = 1; num <= this.pageCount; num++) {
      if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'reading' });

      var page = await this._pdf.getPage(num);
      var viewport = page.getViewport({ scale: 1 });
      var pageSize = { width: viewport.width, height: viewport.height };
      var content = await page.getTextContent();
      var nativeText = content.items.map(function (it) { return it.str; }).join(' ').replace(/\s+/g, ' ').trim();

      var text = nativeText;
      var source = 'native';
      var confidence = null;
      var canvas = null;

      // OCR fallback
      if (nativeText.length <= config.nativeTextMinLength && ocr) {
        if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'ocr', progress: 0 });
        try {
          canvas = await renderPageToCanvas(page, config.ocrScale);
          var Tesseract = getTesseract();
          var res = await Tesseract.recognize(canvas, config.ocrLang, {
            logger: function (m) {
              if (m.status === 'recognizing text' && onProgress) {
                onProgress({ page: num, total: this.pageCount, status: 'ocr', progress: m.progress });
              }
            }.bind(this),
          });
          text = (res.data.text || '').trim();
          source = 'ocr';
          confidence = res.data.confidence;
        } catch (err) {
          source = 'error';
          text = '';
        }
      } else if (nativeText.length <= config.nativeTextMinLength && !ocr) {
        source = 'skipped';
        text = '';
      }

      // Brain analysis
      var spatial = null, structures = null, metadata = null, classification = null, visualRegions = null;

      if (config.enableBrain) {
        if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'analyzing' });
        spatial = analyzeSpatialLayout(content.items, pageSize);
        structures = detectStructure(spatial);
        metadata = extractMetadata(text);
        classification = classifyPage(text);
      }

      // Visual analysis
      if (visual || config.enableVisual) {
        if (!canvas) canvas = await renderPageToCanvas(page, config.ocrScale);
        try { visualRegions = analyzeVisualRegions(canvas); } catch (e) {}
      }

      graph.addPageResult({
        num: num, text: text, source: source, confidence: confidence,
        pageSize: pageSize, spatial: spatial, structures: structures,
        metadata: metadata, classification: classification, visual: visualRegions,
      });

      if (onPageComplete) onPageComplete(graph.pages[graph.pages.length - 1]);
    }

    return graph;
  };

  CodbDoc.prototype.extractText = async function (opts) {
    opts = opts || {};
    var ocr = opts.ocr !== false;
    var onProgress = opts.onProgress;
    var pages = [];

    for (var num = 1; num <= this.pageCount; num++) {
      if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'reading' });
      var page = await this._pdf.getPage(num);
      var content = await page.getTextContent();
      var nativeText = content.items.map(function (it) { return it.str; }).join(' ').replace(/\s+/g, ' ').trim();
      var text = nativeText, source = 'native';

      if (nativeText.length <= config.nativeTextMinLength && ocr) {
        if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'ocr' });
        try {
          var canvas = await renderPageToCanvas(page, config.ocrScale);
          var Tesseract = getTesseract();
          var res = await Tesseract.recognize(canvas, config.ocrLang);
          text = (res.data.text || '').trim();
          source = 'ocr';
        } catch (e) { text = ''; source = 'error'; }
      } else if (nativeText.length <= config.nativeTextMinLength) {
        source = 'skipped'; text = '';
      }
      pages.push({ num: num, text: text, source: source });
    }

    return {
      pageCount: this.pageCount, pages: pages,
      fullText: pages.map(function (p) { return '--- page ' + p.num + ' (' + p.source + ') ---\n' + p.text; }).join('\n\n'),
    };
  };

  CodbDoc.prototype.renderPage = async function (pageNum, scale) {
    var page = await this._pdf.getPage(pageNum);
    return renderPageToCanvas(page, scale || 1.5);
  };

  CodbDoc.prototype.destroy = function () {
    if (this._pdf) this._pdf.destroy();
  };

  // ─── Load Function ─────────────────────────────────────────────────────

  async function load(source) {
    var pdfjsLib = getPdfjs();
    var data;

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

    var pdf = await pdfjsLib.getDocument(data).promise;
    return new CodbDoc(pdf);
  }

  // ─── Public API ────────────────────────────────────────────────────────

  return {
    load: load,
    configure: configure,
    canUseWorkers: canUseWorkersFn,
  };
});
