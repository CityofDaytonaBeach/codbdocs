/**
 * @codbdocs/core — browser build (UMD)
 *
 * 3-layer architecture: PDF-aware → Vision-aware → Content-aware
 * No server. No CDN. No APIs. Pure browser JavaScript.
 *
 * Usage:
 *   <script src="vendor/pdf.js/pdf.min.js"></script>
 *   <script src="vendor/tesseract.js/tesseract.min.js"></script>
 *   <script src="codbdocs.js"></script>
 *   <script>
 *     const doc = await CodbDocs.load(file);
 *     const graph = await doc.analyze({ ocr: true });
 *     graph.find("invoice number")       // spatial + semantic search
 *     graph.ask("What is the total?")    // AI-like Q&A
 *   </script>
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CodbDocs = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ─── Configuration ─────────────────────────────────────────────────────

  var DEFAULTS = {
    nativeTextMinLength: 20,
    ocrScale: 2,
    ocrLang: 'eng',
    enableVisual: false,
    enableBrain: true,
    enableContent: true,
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
    if (!items || items.length === 0) return { columns: 0, rows: [], headings: [], flow: 'unknown', boxes: [] };

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
    var clusters = [], currentCluster = [xPositions[0]];
    for (var i = 1; i < xPositions.length; i++) {
      if (xPositions[i] - xPositions[i - 1] > pageWidth * 0.15) {
        clusters.push(currentCluster); currentCluster = [xPositions[i]];
      } else { currentCluster.push(xPositions[i]); }
    }
    clusters.push(currentCluster);
    return Math.min(clusters.length, 4);
  }

  function groupIntoRows(boxes) {
    if (boxes.length === 0) return [];
    var sorted = boxes.slice().sort(function (a, b) { return b.y - a.y; });
    var rows = [], currentRow = [sorted[0]];
    for (var i = 1; i < sorted.length; i++) {
      var avgH = currentRow.reduce(function (s, b) { return s + b.height; }, 0) / currentRow.length;
      if (Math.abs(sorted[i].y - currentRow[0].y) < avgH * 1.5) {
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
          bbox: [b.x, b.y, b.width, b.height],
        };
      });
  }

  function detectFlow(rows) {
    if (rows.length < 2) return 'single';
    var leftEdges = rows.map(function (r) { return r[0] ? r[0].x : 0; });
    var variance = leftEdges.reduce(function (s, x) { return s + Math.pow(x - leftEdges[0], 2); }, 0) / leftEdges.length;
    return variance < 100 ? 'left-aligned' : variance < 500 ? 'mixed' : 'complex';
  }

  // ─── Brain: Structure Detection ────────────────────────────────────────

  function detectStructure(spatialResult) {
    var rows = spatialResult.rows || [], structures = [];

    // Tables
    var tableStart = -1;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].length >= 2) { if (tableStart === -1) tableStart = i; continue; }
      if (tableStart !== -1 && i - tableStart >= 2) {
        structures.push({ type: 'table', y: rows[tableStart][0] ? rows[tableStart][0].y : 0, rowCount: i - tableStart });
      }
      tableStart = -1;
    }

    // Lists
    var listStart = -1;
    for (var j = 0; j < rows.length; j++) {
      var text = rows[j].map(function (b) { return b.text; }).join(' ').trim();
      if (/^[\u2022\-\*]\s|^\d+[\.\)]\s/.test(text)) {
        if (listStart === -1) listStart = j;
      } else {
        if (listStart !== -1 && j - listStart >= 2) {
          structures.push({ type: 'list', y: rows[listStart][0] ? rows[listStart][0].y : 0, itemCount: j - listStart });
        }
        listStart = -1;
      }
    }

    // Form fields
    for (var k = 0; k < rows.length; k++) {
      var rowText = rows[k].map(function (b) { return b.text; }).join(' ');
      var match = rowText.match(/^([A-Z][A-Za-z\s]{2,30}):\s*/);
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
        e.value = parseFloat(e.raw.replace(/[$,]/g, '')); return e;
      }),
    };
  }

  function extractEntities(text, pattern) {
    var results = [], match;
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
    var bestType = 'document', bestConfidence = 0.3;
    for (var type in patterns) {
      var match = text.match(patterns[type]);
      if (match) {
        var confidence = Math.min(0.9, 0.5 + (match[0].length / text.length) * 5);
        if (confidence > bestConfidence) { bestType = type; bestConfidence = confidence; }
      }
    }
    return { type: bestType, confidence: bestConfidence, summary: '[' + bestType + '] ' + text.substring(0, 200) };
  }

  // ─── Brain: Visual Analysis ────────────────────────────────────────────

  function analyzeVisualRegions(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    var imageData = ctx.getImageData(0, 0, w, h);
    var data = imageData.data;
    var bandHeight = Math.floor(h / 20), bands = [];
    for (var y = 0; y < h; y += bandHeight) {
      var dark = 0, total = 0;
      for (var py = y; py < Math.min(y + bandHeight, h); py++) {
        for (var px = 0; px < w; px++) {
          var idx = (py * w + px) * 4;
          total++;
          if ((data[idx] + data[idx + 1] + data[idx + 2]) / 3 < 128) dark++;
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

  // ─── Content-Aware Layer ───────────────────────────────────────────────

  var BlockTypes = {
    HEADING: 'heading', PARAGRAPH: 'paragraph', TABLE: 'table', LIST: 'list',
    FORM_FIELD: 'form_field', SIGNATURE: 'signature', CHECKBOX: 'checkbox',
    IMAGE: 'image', QUOTE: 'quote', CAPTION: 'caption',
  };

  var EntityTypes = {
    PERSON: 'person', ORGANIZATION: 'organization', DATE: 'date', CURRENCY: 'currency',
    PHONE: 'phone', EMAIL: 'email', ADDRESS: 'address', URL: 'url',
    INVOICE_NUMBER: 'invoice_number', PERMIT_NUMBER: 'permit_number',
    RESOLUTION_NUMBER: 'resolution_number', ORDINANCE_NUMBER: 'ordinance_number',
    CHECKBOX: 'checkbox', AGENDA_ITEM: 'agenda_item',
  };

  function ContentBlock(type, data) {
    this.type = type;
    this.text = data.text || '';
    this.bbox = data.bbox || null;
    this.page = data.page || 0;
    this.confidence = data.confidence || null;
    this.metadata = data.metadata || {};
    this.relationships = data.relationships || [];
  }

  ContentBlock.prototype.toJSON = function () {
    return {
      type: this.type, text: this.text, bbox: this.bbox, page: this.page,
      confidence: this.confidence, metadata: this.metadata,
    };
  };

  function PageContentGraph(pageNum) {
    this.page = pageNum;
    this.blocks = [];
    this.tables = [];
    this.entities = [];
    this.relationships = [];
  }

  PageContentGraph.prototype.addBlock = function (block) {
    this.blocks.push(block);
    if (block.type === 'table') this.tables.push(block);
  };

  PageContentGraph.prototype.addEntity = function (entity) {
    this.entities.push(entity);
  };

  PageContentGraph.prototype.find = function (query) {
    if (typeof query === 'string') return this._findByText(query);
    if (query.type) return this._findByType(query.type);
    return [];
  };

  PageContentGraph.prototype._findByText = function (text) {
    var lower = text.toLowerCase(), results = [];
    this.blocks.forEach(function (b) {
      if (b.text.toLowerCase().indexOf(lower) !== -1) results.push(b);
    });
    this.entities.forEach(function (e) {
      if ((e.value && e.value.toLowerCase().indexOf(lower) !== -1) ||
          (e.text && e.text.toLowerCase().indexOf(lower) !== -1)) results.push(e);
    });
    return results;
  };

  PageContentGraph.prototype._findByType = function (type) {
    return this.blocks.filter(function (b) { return b.type === type; })
      .concat(this.entities.filter(function (e) { return e.type === type; }));
  };

  function DocumentContentGraph() {
    this.pages = [];
    this.allBlocks = [];
    this.allEntities = [];
    this.allTables = [];
    this.documentType = null;
  }

  DocumentContentGraph.prototype.addPageGraph = function (pg) {
    this.pages.push(pg);
    this.allBlocks.push.apply(this.allBlocks, pg.blocks);
    this.allEntities.push.apply(this.allEntities, pg.entities);
    this.allTables.push.apply(this.allTables, pg.tables);
  };

  DocumentContentGraph.prototype.find = function (query) {
    var results = [];
    this.pages.forEach(function (pg) {
      pg.find(query).forEach(function (r) { r.page = pg.page; results.push(r); });
    });
    return results;
  };

  DocumentContentGraph.prototype.getEntities = function (type) {
    return this.allEntities.filter(function (e) { return e.type === type; });
  };

  DocumentContentGraph.prototype.getBlocks = function (type) {
    return this.allBlocks.filter(function (b) { return b.type === type; });
  };

  DocumentContentGraph.prototype.getSummary = function () {
    var blockTypes = {}, entityTypes = {};
    this.allBlocks.forEach(function (b) { blockTypes[b.type] = (blockTypes[b.type] || 0) + 1; });
    this.allEntities.forEach(function (e) { entityTypes[e.type] = (entityTypes[e.type] || 0) + 1; });
    return { blockTypes: blockTypes, entityTypes: entityTypes, tableCount: this.allTables.length };
  };

  // Content analysis
  function analyzeContent(pageNum, text, spatial, metadata) {
    var graph = new PageContentGraph(pageNum);
    if (!text || text.trim().length < 5) return graph;

    var boxes = (spatial && spatial.boxes) || [];

    // Headings
    (spatial && spatial.headings || []).forEach(function (h) {
      graph.addBlock(new ContentBlock('heading', {
        text: h.text, bbox: h.bbox || findBbox(h.text, boxes), page: pageNum,
        metadata: { level: h.level, fontSize: h.fontSize },
      }));
    });

    // Paragraphs
    text.split(/\n\s*\n/).forEach(function (para) {
      para = para.trim();
      if (para.length < 10) return;
      if (/^[\u2022\-\*]\s|^\d+[\.\)]\s/.test(para)) {
        graph.addBlock(new ContentBlock('list', { text: para, bbox: findBbox(para.split('\n')[0], boxes), page: pageNum }));
      } else {
        graph.addBlock(new ContentBlock('paragraph', { text: para, bbox: findBbox(para.substring(0, 30), boxes), page: pageNum }));
      }
    });

    // Entities from metadata
    if (metadata) {
      (metadata.dates || []).forEach(function (e) {
        graph.addEntity({ type: 'date', value: e.raw, text: e.raw, bbox: findBbox(e.raw, boxes), page: pageNum, confidence: 0.9 });
      });
      (metadata.phones || []).forEach(function (e) {
        graph.addEntity({ type: 'phone', value: e.raw, text: e.raw, bbox: findBbox(e.raw, boxes), page: pageNum, confidence: 0.85 });
      });
      (metadata.emails || []).forEach(function (e) {
        graph.addEntity({ type: 'email', value: e.raw, text: e.raw, bbox: findBbox(e.raw, boxes), page: pageNum, confidence: 0.95 });
      });
      (metadata.addresses || []).forEach(function (e) {
        graph.addEntity({ type: 'address', value: e.raw, text: e.raw, bbox: findBbox(e.raw, boxes), page: pageNum, confidence: 0.8 });
      });
      (metadata.amounts || []).forEach(function (e) {
        graph.addEntity({ type: 'currency', value: e.raw, numericValue: e.value, text: e.raw, bbox: findBbox(e.raw, boxes), page: pageNum, confidence: 0.9 });
      });
    }

    // Special content detection
    var lines = text.split('\n');
    lines.forEach(function (line) {
      var t = line.trim();

      // Ordinance/Resolution numbers
      var ordMatch = t.match(/(ordinance|resolution)\s*(?:no\.?|number|#)?\s*(\d+[\-\d]*)/i);
      if (ordMatch) {
        graph.addEntity({
          type: /ordinance/i.test(t) ? 'ordinance_number' : 'resolution_number',
          value: ordMatch[0], number: ordMatch[1], text: t,
          bbox: findBbox(t.substring(0, 30), boxes), page: pageNum, confidence: 0.9,
        });
      }

      // Permit numbers
      var permitMatch = t.match(/permit\s*(?:no\.?|number|#)?\s*([A-Z0-9\-]+)/i);
      if (permitMatch) {
        graph.addEntity({
          type: 'permit_number', value: permitMatch[0], number: permitMatch[1], text: t,
          bbox: findBbox(t.substring(0, 30), boxes), page: pageNum, confidence: 0.85,
        });
      }

      // Form fields
      var fieldMatch = t.match(/^([A-Z][A-Za-z\s]{2,30}):\s*(.*)/);
      if (fieldMatch) {
        graph.addBlock(new ContentBlock('form_field', {
          text: t, bbox: findBbox(t.substring(0, 30), boxes), page: pageNum,
          metadata: { label: fieldMatch[1].trim(), value: fieldMatch[2].trim(), hasValue: fieldMatch[2].trim().length > 0 },
        }));
      }

      // Person names
      var nameMatch = t.match(/^(?:prepared\s*by|author|name|employee|officer|director|commissioner|mayor|city\s*attorney)[:\s]+(.+)/i);
      if (nameMatch) {
        graph.addEntity({
          type: 'person', value: nameMatch[1].trim(), text: t,
          bbox: findBbox(t.substring(0, 30), boxes), page: pageNum, confidence: 0.7,
          metadata: { role: nameMatch[0].split(':')[0].trim() },
        });
      }

      // Organizations
      var orgMatch = t.match(/^(city\s*of\s*[a-z\s]+|department\s*of\s*[a-z\s]+)/i);
      if (orgMatch) {
        graph.addEntity({
          type: 'organization', value: orgMatch[0].trim(), text: t,
          bbox: findBbox(t.substring(0, 30), boxes), page: pageNum, confidence: 0.75,
        });
      }

      // Signatures
      if (/signature|signed|sign\s*here|\/s\//.test(t) && t.length < 50) {
        graph.addBlock(new ContentBlock('signature', {
          text: t, bbox: findBbox(t.substring(0, 30), boxes), page: pageNum, confidence: 0.6,
        }));
      }

      // Invoice hints
      if (/invoice|bill\s*to|amount\s*due|payment\s*due/i.test(t)) {
        graph.addBlock(new ContentBlock('invoice_hint', {
          text: t, bbox: findBbox(t.substring(0, 30), boxes), page: pageNum,
          metadata: { hint: 'invoice_content' },
        }));
      }
    });

    return graph;
  }

  function findBbox(text, boxes) {
    if (!boxes || !text) return null;
    var lower = text.toLowerCase().substring(0, 30);
    var match = boxes.find(function (b) { return b.text.toLowerCase().indexOf(lower) !== -1; });
    return match ? [match.x, match.y, match.width, match.height] : null;
  }

  function classifyDocumentType(cg) {
    var allText = cg.allBlocks.map(function (b) { return b.text; }).join(' ').toLowerCase();
    var scores = { invoice: 0, receipt: 0, form: 0, legal: 0, memo: 0, letter: 0, report: 0, minutes: 0, policy: 0, budget: 0, permit: 0, contract: 0 };

    if (/invoice|bill\s*to|amount\s*due/i.test(allText)) scores.invoice += 3;
    if (cg.getEntities('currency').length > 0) scores.invoice += 1;
    if (/receipt|subtotal|change/i.test(allText)) scores.receipt += 3;
    if (cg.getBlocks('form_field').length >= 3) scores.form += 3;
    if (/ordinance|resolution|charter/i.test(allText)) scores.legal += 3;
    if (/memo|memorandum|from:|to:|subject:/i.test(allText)) scores.memo += 3;
    if (/dear\s|sincerely|regards/i.test(allText)) scores.letter += 3;
    if (/report|annual\s*report|analysis/i.test(allText)) scores.report += 2;
    if (/minutes|meeting|council|commission/i.test(allText)) scores.minutes += 3;
    if (/policy|procedure|guideline/i.test(allText)) scores.policy += 3;
    if (/budget|appropriation|expenditure/i.test(allText)) scores.budget += 3;
    if (cg.getEntities('permit_number').length > 0) scores.permit += 3;
    if (/agreement|contract|party|parties/i.test(allText)) scores.contract += 3;

    var bestType = 'document', bestScore = 0;
    for (var type in scores) { if (scores[type] > bestScore) { bestType = type; bestScore = scores[type]; } }
    return { type: bestType, confidence: Math.min(0.95, bestScore / 8), scores: scores };
  }

  // ─── Query API ─────────────────────────────────────────────────────────

  var QUERY_PATTERNS = [
    { patterns: [/what\s+date|when|dates?\s+mentioned/i], entityType: 'date', label: 'dates' },
    { patterns: [/who|person|people|names?|author|prepared\s+by|signed\s+by/i], entityType: 'person', label: 'people' },
    { patterns: [/organization|company|department|city/i], entityType: 'organization', label: 'organizations' },
    { patterns: [/how\s+much|money|amount|cost|price|total|budget|fund|\$/i], entityType: 'currency', label: 'amounts' },
    { patterns: [/phone|call|contact|number|telephone/i], entityType: 'phone', label: 'phone numbers' },
    { patterns: [/email|e-mail/i], entityType: 'email', label: 'emails' },
    { patterns: [/address|location|where|street|avenue|zip/i], entityType: 'address', label: 'addresses' },
    { patterns: [/table|data|spreadsheet/i], blockType: 'table', label: 'tables' },
    { patterns: [/form|field|input|application|checkbox/i], blockType: 'form_field', label: 'form fields' },
    { patterns: [/heading|title|section|chapter|outline/i], blockType: 'heading', label: 'headings' },
    { patterns: [/list|items|bullet/i], blockType: 'list', label: 'lists' },
    { patterns: [/signature|signed|sign\s*here/i], blockType: 'signature', label: 'signatures' },
    { patterns: [/ordinance/i], entityType: 'ordinance_number', label: 'ordinances' },
    { patterns: [/resolution/i], entityType: 'resolution_number', label: 'resolutions' },
    { patterns: [/permit/i], entityType: 'permit_number', label: 'permits' },
    { patterns: [/invoice/i], blockType: 'invoice_hint', label: 'invoice content' },
    { patterns: [/summary|summarize|overview|what\s+is\s+this/i], special: 'summary', label: 'summary' },
  ];

  function executeQuery(cg, query) {
    var lower = query.toLowerCase().trim();
    for (var i = 0; i < QUERY_PATTERNS.length; i++) {
      var pat = QUERY_PATTERNS[i];
      for (var j = 0; j < pat.patterns.length; j++) {
        if (pat.patterns[j].test(lower)) {
          if (pat.special === 'summary') return { type: 'summary', label: pat.label, results: cg.getSummary(), query: query };
          if (pat.entityType) {
            var results = cg.getEntities(pat.entityType);
            return { type: pat.entityType, label: pat.label, results: results, query: query, count: results.length };
          }
          if (pat.blockType) {
            var results2 = cg.getBlocks(pat.blockType);
            return { type: pat.blockType, label: pat.label, results: results2, query: query, count: results2.length };
          }
        }
      }
    }
    var results3 = cg.find(query);
    return { type: 'text-search', label: 'text matches', results: results3, query: query, count: results3.length };
  }

  function executeAsk(cg, question) {
    var qr = executeQuery(cg, question);
    if (qr.results.length === 0) return { answer: 'No ' + qr.label + ' found in this document.', confidence: 0.9, evidence: [] };

    var answer = '', confidence = 0.8, evidence = [];

    if (qr.type === 'summary') {
      var s = qr.results;
      answer = 'Document Summary:\n' +
        Object.keys(s.blockTypes).map(function (k) { return '- ' + k + ': ' + s.blockTypes[k]; }).join('\n') + '\n' +
        Object.keys(s.entityTypes).map(function (k) { return '- ' + k + ': ' + s.entityTypes[k]; }).join('\n');
      confidence = 0.85;
    } else if (qr.type === 'date') {
      answer = 'Found ' + qr.results.length + ' date(s): ' + qr.results.map(function (r) { return r.value; }).join(', ');
      confidence = 0.9;
    } else if (qr.type === 'currency') {
      var amounts = qr.results.map(function (r) { return r.numericValue || 0; });
      var total = amounts.reduce(function (s, a) { return s + a; }, 0);
      answer = 'Found ' + qr.results.length + ' monetary value(s): ' + qr.results.map(function (r) { return r.value; }).join(', ');
      if (total > 0) answer += '\nTotal: $' + total.toLocaleString();
      confidence = 0.85;
    } else if (qr.type === 'person') {
      var people = [];
      qr.results.forEach(function (r) { if (people.indexOf(r.value) === -1) people.push(r.value); });
      answer = 'Found ' + people.length + ' person(s): ' + people.join(', ');
    } else if (qr.type === 'organization') {
      var orgs = [];
      qr.results.forEach(function (r) { if (orgs.indexOf(r.value) === -1) orgs.push(r.value); });
      answer = 'Found ' + orgs.length + ' organization(s): ' + orgs.join(', ');
    } else if (qr.type === 'phone') {
      answer = 'Found ' + qr.results.length + ' phone number(s): ' + qr.results.map(function (r) { return r.value; }).join(', ');
    } else if (qr.type === 'email') {
      answer = 'Found ' + qr.results.length + ' email(s): ' + qr.results.map(function (r) { return r.value; }).join(', ');
    } else if (qr.type === 'address') {
      answer = 'Found ' + qr.results.length + ' address(es): ' + qr.results.map(function (r) { return r.value; }).join('; ');
    } else if (qr.type === 'table') {
      answer = 'Found ' + qr.results.length + ' table(s) in the document.';
    } else if (qr.type === 'form_field') {
      var fields = qr.results.map(function (r) { return r.metadata ? r.metadata.label : r.text.substring(0, 30); });
      answer = 'Found ' + qr.results.length + ' form field(s): ' + fields.join(', ');
    } else if (qr.type === 'signature') {
      answer = 'Found ' + qr.results.length + ' signature(s) in the document.';
    } else if (qr.type === 'ordinance_number') {
      answer = 'Found ' + qr.results.length + ' ordinance(s): ' + qr.results.map(function (r) { return r.value; }).join(', ');
    } else if (qr.type === 'resolution_number') {
      answer = 'Found ' + qr.results.length + ' resolution(s): ' + qr.results.map(function (r) { return r.value; }).join(', ');
    } else if (qr.type === 'permit_number') {
      answer = 'Found ' + qr.results.length + ' permit(s): ' + qr.results.map(function (r) { return r.value; }).join(', ');
    } else {
      answer = 'Found ' + qr.results.length + ' result(s) for "' + qr.query + '".';
      confidence = 0.7;
    }

    evidence = qr.results.map(function (r) {
      return { text: (r.value || r.text || '').substring(0, 80), page: r.page, bbox: r.bbox };
    });

    return { answer: answer, confidence: confidence, evidence: evidence };
  }

  function highlightResults(canvas, results, options) {
    options = options || {};
    var ctx = canvas.getContext('2d');
    var scale = options.scale || 1;
    results.forEach(function (r) {
      if (!r.bbox) return;
      ctx.fillStyle = options.color || 'rgba(255, 255, 0, 0.3)';
      ctx.fillRect(r.bbox[0] * scale, r.bbox[1] * scale, r.bbox[2] * scale, r.bbox[3] * scale);
      ctx.strokeStyle = options.borderColor || 'rgba(255, 165, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(r.bbox[0] * scale, r.bbox[1] * scale, r.bbox[2] * scale, r.bbox[3] * scale);
    });
  }

  function createHighlightAnnotations(results) {
    return results.filter(function (r) { return r.bbox; }).map(function (r) {
      return { type: 'Highlight', rect: r.bbox, color: [1, 1, 0], contents: r.text || r.value || '', page: r.page };
    });
  }

  // ─── Semantic Layers (backward compat) ─────────────────────────────────

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
      r.structures.forEach(function (s) {
        s.page = r.num;
        if (s.type === 'table') this.allTables.push(s);
        else if (s.type === 'formField') this.allForms.push(s);
        else if (s.type === 'list') this.allLists.push(s);
      }.bind(this));
    }
  };

  DocumentGraph.prototype.query = function (q) {
    var lower = q.toLowerCase();
    if (/date|when/.test(lower)) return { type: 'dates', results: this.allDates };
    if (/phone|call|contact/.test(lower)) return { type: 'phones', results: this.allPhones };
    if (/email/.test(lower)) return { type: 'emails', results: this.allEmails };
    if (/address|street/.test(lower)) return { type: 'addresses', results: this.allAddresses };
    if (/money|amount|budget|\$/.test(lower)) return { type: 'amounts', results: this.allAmounts };
    if (/table|data/.test(lower)) return { type: 'tables', results: this.allTables };
    if (/list|items/.test(lower)) return { type: 'lists', results: this.allLists };
    if (/form|field/.test(lower)) return { type: 'forms', results: this.allForms };
    if (/heading|title|section/.test(lower)) return { type: 'headings', results: this.allHeadings };
    if (/summary|overview/.test(lower)) return { type: 'summary', results: this.getSummary() };

    var self = this, results = [];
    this.pages.forEach(function (p) {
      if (p.text.toLowerCase().indexOf(lower) !== -1) {
        results.push({ page: p.num, text: p.text.substring(0, 300) });
      }
    });
    return { type: 'text-search', query: q, results: results };
  };

  DocumentGraph.prototype.getSummary = function () {
    var tc = {};
    this.classifications.forEach(function (c) { tc[c.type] = (tc[c.type] || 0) + 1; });
    return {
      pageCount: this.pageCount, wordCount: this.wordCount, pageTypes: tc,
      dates: this.allDates.length, phones: this.allPhones.length, emails: this.allEmails.length,
      addresses: this.allAddresses.length, amounts: this.allAmounts.length,
      headings: this.allHeadings.map(function (h) { return h.text; }),
      tables: this.allTables.length, forms: this.allForms.length, lists: this.allLists.length,
    };
  };

  DocumentGraph.prototype.toJSON = function () {
    return {
      pageCount: this.pageCount, summary: this.getSummary(), fullText: this.fullText,
      pages: this.pages.map(function (p) {
        return {
          num: p.num, text: p.text, source: p.source, classification: p.classification || null,
          headings: p.spatial ? p.spatial.headings : [], structures: p.structures || [], metadata: p.metadata || {},
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
    return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () { return canvas; });
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
    var extractVecs = opts.extractVectors !== false;
    var onPageComplete = opts.onPageComplete;
    var onProgress = opts.onProgress;

    var graph = new DocumentGraph();
    var contentGraph = new DocumentContentGraph();
    var ir = createIR();

    for (var num = 1; num <= this.pageCount; num++) {
      if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'reading' });

      var page = await this._pdf.getPage(num);
      var viewport = page.getViewport({ scale: 1 });
      var pageSize = { width: viewport.width, height: viewport.height };
      var content = await page.getTextContent();
      var nativeText = content.items.map(function (it) { return it.str; }).join(' ').replace(/\s+/g, ' ').trim();

      var text = nativeText, source = 'native', confidence = null, canvas = null;

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
          text = (res.data.text || '').trim(); source = 'ocr'; confidence = res.data.confidence;
        } catch (err) { source = 'error'; text = ''; }
      } else if (nativeText.length <= config.nativeTextMinLength && !ocr) {
        source = 'skipped'; text = '';
      }

      var spatial = null, structures = null, metadata = null, classification = null, visualRegions = null;

      if (config.enableBrain) {
        if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'analyzing' });
        spatial = analyzeSpatialLayout(content.items, pageSize);
        structures = detectStructure(spatial);
        metadata = extractMetadata(text);
        classification = classifyPage(text);
      }

      if (visual || config.enableVisual) {
        if (!canvas) canvas = await renderPageToCanvas(page, config.ocrScale);
        try { visualRegions = analyzeVisualRegions(canvas); } catch (e) {}
      }

      // Content-aware analysis
      var contentPageGraph = null;
      if (config.enableContent) {
        if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'content' });
        contentPageGraph = analyzeContent(num, text, spatial, metadata);
        contentGraph.addPageGraph(contentPageGraph);
      }

      // Extract vectors
      var vectors = [];
      if (extractVecs) {
        if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'vectors' });
        try { vectors = await extractVectors(page); } catch (e) {}
      }

      // Extract structure tree
      var structureTree = null;
      try { structureTree = await extractStructureTree(page); } catch (e) {}

      // Extract annotations
      var annotations = [];
      try { annotations = await extractAnnotations(page); } catch (e) {}

      // Build PDF-IR page
      var irPage = addPage(ir, num, { width: pageSize.width, height: pageSize.height, rotation: page.rotate, mediaBox: page.mediaBox, cropBox: page.cropBox });
      vectors.forEach(function(vec) { addVectorObject(ir, 'page_' + num, vec); });
      content.items.forEach(function(item) {
        if (item.str && item.str.trim()) {
          addTextObject(ir, 'page_' + num, { text: item.str, bbox: [item.transform[4], item.transform[5], item.width, item.height], font: item.fontName, fontSize: Math.abs(item.transform[0]) || 12, transform: item.transform });
        }
      });

      // Add annotations to IR
      if (annotations.length > 0) {
        irPage.annotations = annotations;
        ir.annotations['page_' + num] = annotations;
      }

      // Add structure tree to IR
      if (structureTree) {
        ir.structure['page_' + num] = structureTree;
      }

      // Detect reading order
      var readingOrder = [];
      try { readingOrder = detectReadingOrder(ir, num); } catch (e) {}

      graph.addPageResult({
        num: num, text: text, source: source, confidence: confidence, pageSize: pageSize,
        spatial: spatial, structures: structures, metadata: metadata,
        classification: classification, visual: visualRegions, vectors: vectors.length,
        annotations: annotations.length, hasStructureTree: !!structureTree, readingOrder: readingOrder.length,
      });

      if (onPageComplete) onPageComplete(graph.pages[graph.pages.length - 1]);
    }

    // Classify document type
    if (config.enableContent) {
      contentGraph.documentType = classifyDocumentType(contentGraph);
    }

    // Attach content-aware methods
    graph._contentGraph = contentGraph;
    graph._doc = this;
    graph._ir = ir;

    graph.find = function (query) { return executeQuery(contentGraph, query); };
    graph.findOne = function (query) {
      var results = contentGraph.find(query);
      return results.length > 0 ? results[0] : null;
    };
    graph.ask = function (question) { return executeAsk(contentGraph, question); };
    graph.getEntities = function (type) { return contentGraph.getEntities(type); };
    graph.getBlocks = function (type) { return contentGraph.getBlocks(type); };
    graph.getDocumentType = function () { return contentGraph.documentType; };
    graph.highlight = function (canvas, query, options) {
      return highlightResults(canvas, contentGraph.find(query), options);
    };
    graph.getHighlights = function (query) {
      return createHighlightAnnotations(contentGraph.find(query));
    };
    graph.getIR = function () { return ir; };
    graph.auditAccessibility = function () { return auditAccessibility(ir); };
    graph.getAccessibilityTree = function () { return generateAccessibilityTree(ir); };
    graph.toHTML = function (options) { return exportHTML(ir, options); };
    graph.getVectors = function (pageNum) {
      var pageId = 'page_' + pageNum;
      return ir.pages[pageId] && ir.pages[pageId].vectors ? ir.pages[pageId].vectors.map(function(id) { return ir.vectors[id]; }) : [];
    };
    graph.getStructureTree = function (pageNum) {
      var pageId = 'page_' + pageNum;
      return ir.structure[pageId] || null;
    };
    graph.getAnnotations = function (pageNum) {
      var pageId = 'page_' + pageNum;
      return ir.annotations[pageId] || [];
    };
    graph.getReadingOrder = function (pageNum) { return detectReadingOrder(ir, pageNum); };
    graph.getReadingOrderSequence = function (pageNum) {
      return detectReadingOrder(ir, pageNum).map(function(item) { return item.id; });
    };

    return graph;
  };

  CodbDoc.prototype.extractText = async function (opts) {
    opts = opts || {};
    var ocr = opts.ocr !== false, onProgress = opts.onProgress, pages = [];
    for (var num = 1; num <= this.pageCount; num++) {
      if (onProgress) onProgress({ page: num, total: this.pageCount, status: 'reading' });
      var page = await this._pdf.getPage(num);
      var content = await page.getTextContent();
      var nativeText = content.items.map(function (it) { return it.str; }).join(' ').replace(/\s+/g, ' ').trim();
      var text = nativeText, source = 'native';
      if (nativeText.length <= config.nativeTextMinLength && ocr) {
        try {
          var canvas = await renderPageToCanvas(page, config.ocrScale);
          var Tesseract = getTesseract();
          var res = await Tesseract.recognize(canvas, config.ocrLang);
          text = (res.data.text || '').trim(); source = 'ocr';
        } catch (e) { text = ''; source = 'error'; }
      } else if (nativeText.length <= config.nativeTextMinLength) { source = 'skipped'; text = ''; }
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

  CodbDoc.prototype.destroy = function () { if (this._pdf) this._pdf.destroy(); };

  // ─── Load Function ─────────────────────────────────────────────────────

  async function load(source) {
    var pdfjsLib = getPdfjs(), data;
    if (typeof source === 'string') data = { url: source };
    else if (source instanceof ArrayBuffer) data = { data: source };
    else if (source instanceof Uint8Array) data = { data: source.buffer };
    else if (source && typeof source.arrayBuffer === 'function') data = { data: await source.arrayBuffer() };
    else throw new Error('[codbdocs] Unsupported source. Pass a File, Blob, ArrayBuffer, Uint8Array, or URL string.');
    var pdf = await pdfjsLib.getDocument(data).promise;
    return new CodbDoc(pdf);
  }

  // ─── PDF-IR (Intermediate Representation) ──────────────────────────────

  function createIR() {
    return {
      version: '1.0',
      document: {
        id: generateId('doc'),
        metadata: {},
        pages: [],
        structure: null,
        resources: {},
        navigation: {},
        security: {},
        provenance: { source: 'pdf', extraction: 'native' },
      },
      pages: {},
      objects: {},
      vectors: {},
      resources: {},
      structure: {},
      annotations: {},
      forms: {},
      assets: {},
    };
  }

  var idCounter = 0;
  function generateId(prefix) {
    return prefix + '_' + Date.now().toString(36) + '_' + (idCounter++).toString(36);
  }

  function addPage(ir, pageNum, data) {
    var pageId = 'page_' + pageNum;
    ir.pages[pageId] = {
      id: pageId,
      num: pageNum,
      width: data.width || 0,
      height: data.height || 0,
      rotation: data.rotation || 0,
      mediaBox: data.mediaBox || null,
      cropBox: data.cropBox || null,
      content: [],
      vectors: [],
      images: [],
      annotations: [],
      forms: [],
    };
    ir.document.pages.push(pageId);
    return ir.pages[pageId];
  }

  function addTextObject(ir, pageId, data) {
    var id = generateId('text');
    ir.objects[id] = {
      id: id,
      type: 'text',
      page: pageId,
      raw: {
        glyphs: data.glyphs || [],
        font: data.font || null,
        fontSize: data.fontSize || 12,
        transform: data.transform || [1, 0, 0, 1, 0, 0],
        text: data.text || '',
      },
      semantic: {
        role: data.role || 'paragraph',
        level: data.level || null,
        text: data.text || '',
      },
      accessibility: { role: data.accessRole || 'P' },
      provenance: { method: 'native', confidence: 1.0 },
      bbox: data.bbox || null,
    };
    if (ir.pages[pageId]) ir.pages[pageId].content.push(id);
    return ir.objects[id];
  }

  function addVectorObject(ir, pageId, data) {
    var id = generateId('vec');
    ir.vectors[id] = {
      id: id,
      type: data.type || 'path',
      page: pageId,
      points: data.points || [],
      from: data.from || null,
      to: data.to || null,
      bbox: data.bbox || null,
      graphicsState: {
        stroke: data.stroke || null,
        fill: data.fill || null,
        lineWidth: data.lineWidth || 1,
        lineCap: data.lineCap || 'butt',
        lineJoin: data.lineJoin || 'miter',
        dash: data.dash || null,
        opacity: data.opacity || 1,
        blendMode: data.blendMode || 'Normal',
        transform: data.transform || [1, 0, 0, 1, 0, 0],
        clip: data.clip || null,
      },
      semantic: { role: data.semanticRole || null },
      provenance: { method: 'native', confidence: 1.0 },
    };
    if (ir.pages[pageId]) ir.pages[pageId].vectors.push(id);
    return ir.vectors[id];
  }

  // Vector extraction from PDF.js operator list
  function extractVectors(page) {
    return page.getOperatorList().then(function(opList) {
      var vectors = [];
      var FN = (typeof pdfjsLib !== 'undefined' && pdfjsLib.OPS) || {};
      var currentStroke = null, currentFill = null, currentLineWidth = 1;
      var currentTransform = [1, 0, 0, 1, 0, 0];
      var pathPoints = [];

      for (var i = 0; i < opList.fnArray.length; i++) {
        var fn = opList.fnArray[i];
        var args = opList.argsArray[i];

        if (fn === (FN.transform || 8) && args) {
          currentTransform = args.slice(0, 6);
        } else if (fn === (FN.moveTo || 13) && args) {
          pathPoints.push({ op: 'moveTo', x: args[0], y: args[1] });
        } else if (fn === (FN.lineTo || 14) && args) {
          pathPoints.push({ op: 'lineTo', x: args[0], y: args[1] });
        } else if (fn === (FN.curveTo || 15) && args) {
          pathPoints.push({ op: 'curveTo', x1: args[0], y1: args[1], x2: args[2], y2: args[3], x3: args[4], y3: args[5] });
        } else if (fn === (FN.rectangle || 19) && args && args.length >= 4) {
          var w = args[2] - args[0], h = args[3] - args[1];
          vectors.push({
            type: 'rect', bbox: [args[0], args[1], w, h],
            stroke: currentStroke, fill: currentFill, lineWidth: currentLineWidth,
            transform: currentTransform,
            semanticRole: classifyVectorType('rect', w, h),
          });
        } else if (fn === (FN.closePath || 16)) {
          pathPoints.push({ op: 'closePath' });
        } else if ((fn === (FN.stroke || 20) || fn === (FN.fill || 21) || fn === (FN.fillStroke || 23)) && pathPoints.length > 0) {
          vectors.push({
            type: 'path', points: pathPoints.slice(),
            stroke: fn === (FN.fill || 21) ? null : currentStroke,
            fill: fn === (FN.stroke || 20) ? null : currentFill,
            lineWidth: currentLineWidth, transform: currentTransform,
            semanticRole: classifyVectorType('path', 0, 0),
          });
          pathPoints = [];
        } else if (fn === (FN.setStrokeRGBColor || 43) && args) {
          currentStroke = 'rgb(' + args[0] + ',' + args[1] + ',' + args[2] + ')';
        } else if (fn === (FN.setFillRGBColor || 44) && args) {
          currentFill = 'rgb(' + args[0] + ',' + args[1] + ',' + args[2] + ')';
        } else if (fn === (FN.setLineWidth || 40) && args) {
          currentLineWidth = args[0];
        }
      }
      return vectors;
    });
  }

  function classifyVectorType(type, w, h) {
    if (type === 'rect') {
      if (w > 8 && w < 20 && h > 8 && h < 20 && Math.abs(w - h) < 3) return 'checkbox';
      if (h < 2 && w > 20) return 'separator';
      if (w > 50 && h > 20) return 'table_border';
      return 'border';
    }
    return null;
  }

  // Accessibility Audit
  function auditAccessibility(ir) {
    var issues = [], score = 100;

    ir.document.pages.forEach(function(pageId) {
      var page = ir.pages[pageId];
      if (!page) return;
      var pageNum = parseInt(pageId.split('_')[1]);

      page.content.forEach(function(objId) {
        var obj = ir.objects[objId];
        if (obj && obj.type === 'image' && !(obj.accessibility && obj.accessibility.alt)) {
          issues.push({ type: 'missing_alt_text', page: pageNum, severity: 'error', message: 'Image has no alternative text' });
          score -= 5;
        }
      });

      var headings = page.content.map(function(id) { return ir.objects[id]; }).filter(function(o) { return o && o.semantic && o.semantic.role === 'heading'; });
      var prevLevel = 0;
      headings.forEach(function(h) {
        var level = (h.semantic && h.semantic.level) || 1;
        if (level > prevLevel + 1 && prevLevel > 0) {
          issues.push({ type: 'heading_skip', page: pageNum, severity: 'warning', message: 'Heading level skipped from H' + prevLevel + ' to H' + level });
          score -= 2;
        }
        prevLevel = level;
      });

      page.vectors.forEach(function(vecId) {
        var vec = ir.vectors[vecId];
        if (vec && vec.semantic && vec.semantic.role === 'table_border') {
          issues.push({ type: 'table_no_header', page: pageNum, severity: 'warning', message: 'Table may be missing header row' });
          score -= 2;
        }
      });
    });

    if (!ir.document.metadata.language) {
      issues.push({ type: 'missing_language', page: 1, severity: 'warning', message: 'Document language not specified' });
      score -= 3;
    }
    if (!ir.document.metadata.title) {
      issues.push({ type: 'missing_title', page: 1, severity: 'warning', message: 'Document has no title' });
      score -= 2;
    }

    return { score: Math.max(0, score), issues: issues, summary: { errors: issues.filter(function(i) { return i.severity === 'error'; }).length, warnings: issues.filter(function(i) { return i.severity === 'warning'; }).length } };
  }

  function generateAccessibilityTree(ir) {
    var tree = { type: 'Document', children: [] };
    ir.document.pages.forEach(function(pageId) {
      var page = ir.pages[pageId];
      if (!page) return;
      var pageNode = { type: 'Page', properties: { pageNumber: page.num }, children: [] };
      page.content.forEach(function(objId) {
        var obj = ir.objects[objId];
        if (!obj) return;
        var node = { type: (obj.accessibility && obj.accessibility.role) || (obj.semantic && obj.semantic.role) || 'Paragraph', children: [] };
        if (obj.semantic && obj.semantic.text) node.children.push({ type: 'Text', content: obj.semantic.text });
        pageNode.children.push(node);
      });
      tree.children.push(pageNode);
    });
    return tree;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function exportHTML(ir, options) {
    options = options || {};
    var mode = options.mode || 'accessible';
    var lang = (ir.document.metadata && ir.document.metadata.language) || 'en';
    var title = (ir.document.metadata && ir.document.metadata.title) || 'Document';

    var html = '<!DOCTYPE html>\n<html lang="' + lang + '">\n<head>\n';
    html += '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += '<title>' + escapeHTML(title) + '</title>\n';

    if (mode === 'visual') {
      html += '<style>body{margin:0;padding:20px;background:#f5f5f5;font-family:system-ui}.pdf-page{background:#fff;margin:20px auto;box-shadow:0 2px 8px rgba(0,0,0,.1);overflow:hidden;position:relative}.pdf-text{white-space:pre-wrap}.pdf-rect{border:1px solid #000}</style>\n';
    } else {
      html += '<style>body{margin:0;padding:20px;font-family:system-ui;line-height:1.6;max-width:800px;margin:0 auto}.pdf-page{margin:40px 0;padding:20px 0;border-bottom:1px solid #eee}h1,h2,h3{margin:1em 0 .5em}table{border-collapse:collapse;width:100%;margin:1em 0}th,td{border:1px solid #ddd;padding:8px}th{background:#f5f5f5}</style>\n';
    }

    html += '</head>\n<body>\n';

    if (mode !== 'visual') html += '<main role="document">\n';

    ir.document.pages.forEach(function(pageId) {
      var page = ir.pages[pageId];
      if (!page) return;
      var attrs = ' data-pdf-page="' + page.num + '"';

      if (mode === 'visual') {
        html += '<div class="pdf-page"' + attrs + ' style="width:' + page.width + 'px;height:' + page.height + 'px;">\n';
        page.content.forEach(function(objId) {
          var obj = ir.objects[objId];
          if (!obj) return;
          if (obj.type === 'text' && obj.bbox) {
            html += '<div class="pdf-text"' + attrs + ' style="position:absolute;left:' + obj.bbox[0] + 'px;top:' + obj.bbox[1] + 'px;font-size:' + (obj.raw ? obj.raw.fontSize : 12) + 'px;">' + escapeHTML(obj.semantic ? obj.semantic.text : '') + '</div>\n';
          }
        });
        html += '</div>\n';
      } else {
        html += '<section class="pdf-page"' + attrs + ' aria-label="Page ' + page.num + '">\n';
        page.content.forEach(function(objId) {
          var obj = ir.objects[objId];
          if (!obj || !obj.semantic) return;
          var role = obj.semantic.role || 'paragraph';
          if (role === 'heading') {
            var level = obj.semantic.level || 2;
            html += '<h' + level + '>' + escapeHTML(obj.semantic.text) + '</h' + level + '>\n';
          } else if (obj.type === 'image') {
            html += '<figure><img src="' + escapeHTML(obj.raw && obj.raw.src || '') + '" alt="' + escapeHTML(obj.accessibility && obj.accessibility.alt || 'Image') + '">';
            if (obj.semantic.caption) html += '<figcaption>' + escapeHTML(obj.semantic.caption) + '</figcaption>';
            html += '</figure>\n';
          } else {
            html += '<p>' + escapeHTML(obj.semantic.text) + '</p>\n';
          }
        });
        html += '</section>\n';
      }
    });

    if (mode !== 'visual') html += '</main>\n';
    html += '</body>\n</html>';
    return html;
  }

  // ─── Structure Tree Extraction ─────────────────────────────────────────

  function extractStructureTree(page) {
    return page.getStructTree().then(function(structTree) {
      if (!structTree) return null;
      return convertStructTreeNode(structTree);
    }).catch(function() { return null; });
  }

  function convertStructTreeNode(node) {
    if (!node) return null;
    var result = { type: node.type || 'Unknown', role: node.role || node.type, children: [] };
    if (node.alt) result.alt = node.alt;
    if (node.lang) result.lang = node.lang;
    if (node.altText) result.altText = node.altText;
    if (node.children) {
      node.children.forEach(function(child) {
        if (typeof child === 'string') {
          result.children.push({ type: 'Text', content: child });
        } else {
          var converted = convertStructTreeNode(child);
          if (converted) result.children.push(converted);
        }
      });
    }
    return result;
  }

  // ─── Annotations Extraction ────────────────────────────────────────────

  function extractAnnotations(page) {
    return page.getAnnotations().then(function(annotations) {
      if (!annotations || annotations.length === 0) return [];
      return annotations.map(function(ann) {
        return {
          id: ann.id, type: mapAnnotationType(ann.subtype), subtype: ann.subtype,
          rect: ann.rect, color: ann.color, contents: ann.contents || '',
          title: ann.title || '', fieldType: ann.fieldType, fieldValue: ann.fieldValue,
          url: ann.url, dest: ann.dest,
        };
      });
    }).catch(function() { return []; });
  }

  function mapAnnotationType(subtype) {
    var typeMap = {
      'Text': 'note', 'Link': 'link', 'FreeText': 'free_text', 'Line': 'line',
      'Square': 'square', 'Circle': 'circle', 'Highlight': 'highlight',
      'Underline': 'underline', 'Stamp': 'stamp', 'Ink': 'ink',
      'Widget': 'form_field', 'Popup': 'popup', 'FileAttachment': 'file_attachment',
    };
    return typeMap[subtype] || subtype || 'unknown';
  }

  // ─── Reading Order Detection ───────────────────────────────────────────

  function detectReadingOrder(ir, pageNum) {
    var pageId = 'page_' + pageNum;
    var page = ir.pages[pageId];
    if (!page) return [];

    var objects = [];
    page.content.forEach(function(objId) {
      var obj = ir.objects[objId];
      if (obj && obj.bbox) {
        objects.push({
          id: objId, type: obj.type, bbox: obj.bbox,
          text: (obj.semantic && obj.semantic.text) || '',
          centerX: obj.bbox[0] + obj.bbox[2] / 2,
          centerY: obj.bbox[1] + obj.bbox[3] / 2,
        });
      }
    });

    (page.vectors || []).forEach(function(vecId) {
      var vec = ir.vectors[vecId];
      if (vec && vec.bbox && vec.semantic && vec.semantic.role) {
        objects.push({
          id: vecId, type: 'vector', bbox: vec.bbox, text: vec.semantic.role,
          centerX: vec.bbox[0] + vec.bbox[2] / 2,
          centerY: vec.bbox[1] + vec.bbox[3] / 2,
        });
      }
    });

    if (objects.length === 0) return [];

    objects.sort(function(a, b) {
      var yDiff = a.centerY - b.centerY;
      if (Math.abs(yDiff) > 10) return yDiff;
      return a.centerX - b.centerX;
    });

    return objects.map(function(obj, index) {
      obj.readingOrder = index;
      return obj;
    });
  }

  function getReadingOrderSequence(ir, pageNum) {
    return detectReadingOrder(ir, pageNum).map(function(item) { return item.id; });
  }

  // ─── Public API ────────────────────────────────────────────────────────

  return {
    load: load,
    configure: configure,
    canUseWorkers: canUseWorkersFn,
    BlockTypes: BlockTypes,
    EntityTypes: EntityTypes,
    createIR: createIR,
    auditAccessibility: auditAccessibility,
    exportHTML: exportHTML,
    detectReadingOrder: detectReadingOrder,
  };
});
