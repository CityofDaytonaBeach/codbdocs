/**
 * @codbdocs/core — PDF-IR (Intermediate Representation)
 *
 * Universal document model that preserves PDF primitives while enabling
 * semantic understanding. Supports both fidelity and intelligence modes.
 *
 * Architecture:
 *   PDF → PDF-IR → { Fidelity Engine, Intelligence Engine }
 *   PDF-IR → HTML / Markdown / JSON / Accessible Document
 */

import { buildRAGContext } from './exporters.js';
import { generateViewerChrome } from './viewer.js';

function bytesToBase64(bytes) {
  if (typeof Buffer !== 'undefined') return Buffer.from(bytes).toString('base64');
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.slice(i, i + 0x8000));
  if (typeof btoa === 'function') return btoa(bin);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let out = '';
  for (let i = 0; i < bin.length; i += 3) {
    const a = bin.charCodeAt(i), b = bin.charCodeAt(i + 1), c = bin.charCodeAt(i + 2);
    out += alphabet[a >> 2] + alphabet[((a & 3) << 4) | (b >> 4)] + (Number.isNaN(b) ? '=' : alphabet[((b & 15) << 2) | (c >> 6)]) + (Number.isNaN(c) ? '=' : alphabet[c & 63]);
  }
  return out;
}

function textToBase64(text) {
  if (typeof TextEncoder !== 'undefined') return bytesToBase64(new TextEncoder().encode(String(text)));
  const encoded = unescape(encodeURIComponent(String(text)));
  const bytes = new Uint8Array(encoded.length);
  for (let i = 0; i < encoded.length; i++) bytes[i] = encoded.charCodeAt(i);
  return bytesToBase64(bytes);
}

function embeddedImageSrc(src) {
  src = String(src || '');
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(src) ? src : '';
}

// ─── PDF-IR Core ─────────────────────────────────────────────────────────────

/**
 * Create a fresh PDF-IR document model.
 */
export function createIR() {
  return {
    version: '1.0',
    document: {
      id: generateId('doc'),
      hash: null,
      title: null,
      type: 'unknown',
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
    entities: {},
    relationships: {},
    concepts: {},
    images: {},
    tables: {},
    forms: { fields: [], byName: {} },
    annotations: {},
    vectors: {},
    resources: {},
    structure: {},
    assets: {},
  };
}

/**
 * Add a page to the IR.
 */
export function addPage(ir, pageNum, data) {
  const pageId = `page_${pageNum}`;
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
    labels: data.labels || null,
  };
  ir.document.pages.push(pageId);
  return ir.pages[pageId];
}

/**
 * Add a text object to a page.
 */
export function addTextObject(ir, pageId, data) {
  const id = generateId('text');
  ir.objects[id] = {
    id,
    type: 'text',
    page: pageId,
    raw: {
      glyphs: data.glyphs || [],
      font: data.font || null,
      fontSize: data.fontSize || 12,
      color: data.color || null,
      transform: data.transform || [1, 0, 0, 1, 0, 0],
      text: data.text || '',
      encoding: data.encoding || null,
    },
    semantic: {
      role: data.role || 'paragraph',
      level: data.level || null,
      text: data.text || '',
    },
    accessibility: {
      role: data.accessRole || 'P',
    },
    provenance: {
      method: 'native',
      confidence: 1.0,
    },
    bbox: data.bbox || null,
  };
  ir.pages[pageId]?.content.push(id);
  return ir.objects[id];
}

/**
 * Materialize OCR (or native/OCR fusion) page text as a text object when a
 * page produced no native text objects. Scanned / "flat" PDFs have an empty
 * text layer, so without this the markdown/text/RAG/HTML exporters would emit
 * an empty page even though OCR recovered real content.
 *
 * Returns the created object, or null if there was nothing to materialize
 * (e.g. the page already has native text objects) or if no text was provided.
 */
export function materializeOCRObject(ir, pageId, { text, source, confidence, pageSize } = {}) {
  const body = (text || '').replace(/\s+/g, ' ').trim();
  if (!body) return null;
  const page = ir.pages[pageId];
  const hasTextObjects = (page?.content || []).some(id => ir.objects[id]?.type === 'text');
  if (hasTextObjects) return null;

  const size = pageSize || { width: page?.width || 0, height: page?.height || 0 };
  const obj = addTextObject(ir, pageId, {
    text: body,
    bbox: [0, 0, size.width, size.height],
    font: null,
    fontSize: null,
    color: null,
    transform: null,
  });
  if (obj) {
    obj.raw.source = source || 'ocr';
    obj.raw.textSource = source || 'ocr';
    obj.raw.confidence = confidence != null ? confidence : null;
    obj.provenance.method = source || 'ocr';
    obj.provenance.confidence = confidence != null ? confidence / 100 : 0.5;
  }
  return obj;
}

/**
 * Add a vector/path object to a page.
 */
export function addVectorObject(ir, pageId, data) {
  const id = generateId('vec');
  ir.vectors[id] = {
    id,
    type: data.type || 'path', // path, line, rect, circle, curve, arrow
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
    semantic: {
      role: data.semanticRole || null, // table_border, checkbox, form_field, separator, decoration
    },
    provenance: {
      method: 'native',
      confidence: 1.0,
    },
  };
  ir.pages[pageId]?.vectors.push(id);
  return ir.vectors[id];
}

/**
 * Add an image object to a page.
 */
export function addObject(ir, pageId, data) {
  const id = generateId(data.type || 'obj');
  ir.objects[id] = {
    id,
    type: data.type,
    page: pageId,
    raw: data.raw || {},
    semantic: data.semantic || {},
    accessibility: data.accessibility || {},
    provenance: data.provenance || { method: 'native', confidence: 1.0 },
    bbox: data.bbox || null,
  };
  ir.pages[pageId]?.content.push(id);
  return ir.objects[id];
}

function humanizeFieldName(name) {
  return String(name || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[._\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, char => char.toUpperCase());
}

function normalizeFieldOptions(options) {
  return (Array.isArray(options) ? options : []).map(option => {
    if (option && typeof option === 'object') {
      const value = option.exportValue ?? option.value ?? option.displayValue ?? option.label ?? '';
      const label = option.displayValue ?? option.label ?? option.exportValue ?? option.value ?? '';
      return { value: String(value), label: String(label) };
    }
    return { value: String(option ?? ''), label: String(option ?? '') };
  });
}

function normalizeFieldValue(value) {
  if (Array.isArray(value)) return value.map(item => String(item ?? ''));
  return value == null ? '' : String(value);
}

function normalizeFieldRect(rect) {
  if (!Array.isArray(rect) || rect.length < 4) return null;
  const x1 = Number(rect[0]) || 0;
  const y1 = Number(rect[1]) || 0;
  const x2 = Number(rect[2]) || 0;
  const y2 = Number(rect[3]) || 0;
  return [Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1)];
}

/** Normalize a PDF.js Widget annotation or getFieldObjects() entry. */
export function normalizeFormField(field, pageNumber = null) {
  if (!field || (field.subtype && field.subtype !== 'Widget' && field.type !== 'form_field')) return null;

  const pdfType = String(field.fieldType || field.type || '').toLowerCase();
  let fieldType = 'text';
  if (pdfType === 'tx' || pdfType === 'text') {
    fieldType = field.password ? 'password' : field.multiLine ? 'textarea' : 'text';
  } else if (pdfType === 'ch' || pdfType === 'choice' || pdfType === 'combobox' || pdfType === 'listbox') {
    fieldType = field.combo || pdfType === 'combobox' ? 'dropdown' : 'listbox';
  } else if (pdfType === 'btn' || pdfType === 'button' || pdfType === 'checkbox' || pdfType === 'radiobutton') {
    fieldType = field.pushButton ? 'button' : field.radioButton || pdfType === 'radiobutton' ? 'radio' : 'checkbox';
  } else if (pdfType === 'sig' || pdfType === 'signature') {
    fieldType = 'signature';
  }

  const fieldName = String(field.fieldName || field.name || field.id || 'field');
  const optionValue = String(field.buttonValue ?? field.exportValue ?? field.optionValue ?? 'On');
  const value = normalizeFieldValue(field.fieldValue ?? field.value);
  const defaultValue = normalizeFieldValue(field.defaultFieldValue ?? field.defaultValue);
  const scalarValue = Array.isArray(value) ? value[0] ?? '' : value;
  const checked = fieldType === 'radio'
    ? scalarValue === optionValue
    : fieldType === 'checkbox'
      ? Boolean(scalarValue && scalarValue !== 'Off' && (scalarValue === optionValue || /^(true|yes|on|1|x)$/i.test(scalarValue)))
      : false;
  const baseLabel = String(field.alternativeText || field.alternateFieldName || field.label || humanizeFieldName(fieldName));
  const label = fieldType === 'radio' && optionValue && !baseLabel.toLowerCase().includes(optionValue.toLowerCase())
    ? `${baseLabel}: ${humanizeFieldName(optionValue)}`
    : baseLabel;

  return {
    id: field.id || null,
    page: pageNumber ?? (Number.isInteger(field.page) ? field.page + 1 : null),
    name: fieldName,
    label,
    description: String(field.contents || field.description || ''),
    fieldType,
    pdfFieldType: field.fieldType || field.type || null,
    value,
    defaultValue,
    optionValue,
    checked,
    defaultChecked: fieldType === 'radio'
      ? String(Array.isArray(defaultValue) ? defaultValue[0] ?? '' : defaultValue) === optionValue
      : fieldType === 'checkbox'
        ? Boolean(defaultValue && defaultValue !== 'Off')
        : false,
    options: normalizeFieldOptions(field.options),
    multiple: Boolean(field.multiSelect),
    required: Boolean(field.required),
    readOnly: Boolean(field.readOnly),
    hidden: Boolean(field.hidden),
    maxLength: Number.isFinite(Number(field.maxLen ?? field.maxLength)) ? Number(field.maxLen ?? field.maxLength) : null,
    rect: Array.isArray(field.rect) ? field.rect.map(Number) : null,
    bbox: normalizeFieldRect(field.rect),
    actions: field.actions || null,
    url: field.url || null,
  };
}

/** Register a normalized PDF form widget as an interactive IR object. */
export function registerFormField(ir, pageId, field, pageNumber = null) {
  const normalized = normalizeFormField(field, pageNumber);
  if (!normalized) return null;

  const obj = addObject(ir, pageId, {
    type: 'form_field',
    raw: { ...normalized },
    semantic: {
      role: 'form_field',
      fieldType: normalized.fieldType,
      fieldName: normalized.name,
      value: normalized.value,
      defaultValue: normalized.defaultValue,
      optionValue: normalized.optionValue,
      checked: normalized.checked,
      defaultChecked: normalized.defaultChecked,
      options: normalized.options,
      multiple: normalized.multiple,
      maxLength: normalized.maxLength,
    },
    accessibility: {
      role: 'form',
      label: normalized.label,
      description: normalized.description,
      required: normalized.required,
      readOnly: normalized.readOnly,
    },
    bbox: normalized.bbox,
    provenance: { method: 'annotation', confidence: 1.0 },
  });

  if (!ir.forms || typeof ir.forms !== 'object') ir.forms = { fields: [], byName: {} };
  if (!Array.isArray(ir.forms.fields)) ir.forms.fields = [];
  if (!ir.forms.byName || typeof ir.forms.byName !== 'object') ir.forms.byName = {};
  const record = { ...normalized, objectId: obj.id, pageId };
  ir.forms.fields.push(record);
  if (!Array.isArray(ir.forms.byName[normalized.name])) ir.forms.byName[normalized.name] = [];
  ir.forms.byName[normalized.name].push(obj.id);
  if (ir.pages[pageId] && !ir.pages[pageId].forms.includes(obj.id)) ir.pages[pageId].forms.push(obj.id);
  return obj;
}

// ─── Vector Extraction ───────────────────────────────────────────────────────

/**
 * Extract vectors/shapes from PDF.js operator list.
 * PDF.js provides getOperatorList() which gives us the raw graphics commands.
 */
export async function extractVectors(page) {
  const opList = await page.getOperatorList();
  const vectors = [];
  let currentTransform = [1, 0, 0, 1, 0, 0];
  let currentStroke = null;
  let currentFill = null;
  let currentLineWidth = 1;
  let currentLineCap = 'butt';
  let currentLineJoin = 'miter';
  let currentDash = null;
  let currentClip = null;
  let pathPoints = [];
  let pathStart = null;

  const FN = pdfjsLib?.OPS || {};

  for (let i = 0; i < opList.fnArray.length; i++) {
    const fn = opList.fnArray[i];
    const args = opList.argsArray[i];

    switch (fn) {
      // Transform
      case FN.transform || 8:
        if (args && args.length >= 6) {
          currentTransform = args.slice(0, 6);
        }
        break;

      // Path operations
      case FN.moveTo || 13:
        if (args) {
          pathStart = { x: args[0], y: args[1] };
          pathPoints.push({ op: 'moveTo', x: args[0], y: args[1] });
        }
        break;

      case FN.lineTo || 14:
        if (args) {
          pathPoints.push({ op: 'lineTo', x: args[0], y: args[1] });
        }
        break;

      case FN.curveTo || 15:
        if (args) {
          pathPoints.push({ op: 'curveTo', x1: args[0], y1: args[1], x2: args[2], y2: args[3], x3: args[4], y3: args[5] });
        }
        break;

      case FN.rectangle || 19:
        if (args && args.length >= 4) {
          vectors.push(createVector('rect', page, {
            bbox: [args[0], args[1], args[2] - args[0], args[3] - args[1]],
            stroke: currentStroke,
            fill: currentFill,
            lineWidth: currentLineWidth,
            transform: currentTransform,
          }));
        }
        break;

      // Stroke
      case FN.stroke || 20:
        if (pathPoints.length > 0) {
          vectors.push(createVector('path', page, {
            points: [...pathPoints],
            stroke: currentStroke,
            fill: null,
            lineWidth: currentLineWidth,
            lineCap: currentLineCap,
            lineJoin: currentLineJoin,
            dash: currentDash,
            transform: currentTransform,
          }));
        }
        pathPoints = [];
        break;

      // Fill
      case FN.fill || 21:
      case FN.eoFill || 22:
        if (pathPoints.length > 0) {
          vectors.push(createVector('path', page, {
            points: [...pathPoints],
            stroke: null,
            fill: currentFill,
            lineWidth: currentLineWidth,
            transform: currentTransform,
          }));
        }
        pathPoints = [];
        break;

      // Fill and stroke
      case FN.fillStroke || 23:
      case FN.eoFillStroke || 24:
        if (pathPoints.length > 0) {
          vectors.push(createVector('path', page, {
            points: [...pathPoints],
            stroke: currentStroke,
            fill: currentFill,
            lineWidth: currentLineWidth,
            transform: currentTransform,
          }));
        }
        pathPoints = [];
        break;

      // Close path
      case FN.closePath || 16:
        pathPoints.push({ op: 'closePath' });
        break;

      // Graphics state
      case FN.save || 25:
        break;

      case FN.restore || 26:
        break;

      case FN.setStrokeRGBColor || 43:
        if (args) currentStroke = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
        break;

      case FN.setFillRGBColor || 44:
        if (args) currentFill = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
        break;

      case FN.setLineWidth || 40:
        if (args) currentLineWidth = args[0];
        break;

      case FN.setLineCap || 41:
        if (args) {
          const caps = ['butt', 'round', 'square'];
          currentLineCap = caps[args[0]] || 'butt';
        }
        break;

      case FN.setLineJoin || 42:
        if (args) {
          const joins = ['miter', 'round', 'bevel'];
          currentLineJoin = joins[args[0]] || 'miter';
        }
        break;

      case FN.setDash || 45:
        if (args) currentDash = args[0];
        break;

      // Clipping
      case FN.clip || 28:
      case FN.eoClip || 29:
        currentClip = [...pathPoints];
        break;
    }
  }

  return vectors;
}

function createVector(type, page, data) {
  return {
    type,
    ...data,
    semanticRole: classifyVector(type, data),
  };
}

function classifyVector(type, data) {
  // Classify vectors by their visual characteristics
  if (type === 'rect') {
    const [x, y, w, h] = data.bbox || [0, 0, 0, 0];
    const area = w * h;

    // Small square = checkbox
    if (w > 8 && w < 20 && h > 8 && h < 20 && Math.abs(w - h) < 3) {
      return 'checkbox';
    }

    // Very thin = line/separator
    if (h < 2 && w > 20) return 'separator';

    // Large rectangle with border = table cell or form field
    if (data.stroke && data.fill === null && area > 100) {
      return 'table_border';
    }

    return 'border';
  }

  if (type === 'path') {
    // Check if it's a line (2 points, both lineTo)
    if (data.points.length === 2 &&
        data.points[0].op === 'moveTo' &&
        data.points[1].op === 'lineTo') {
      const dx = data.points[1].x - data.points[0].x;
      const dy = data.points[1].y - data.points[0].y;
      if (Math.abs(dx) > 20 && Math.abs(dy) < 2) return 'horizontal_line';
      if (Math.abs(dy) > 20 && Math.abs(dx) < 2) return 'vertical_line';
      return 'line';
    }

    // Complex path = diagram or decoration
    if (data.points.length > 10) return 'complex_path';
  }

  return null;
}

// ─── Accessibility Audit ─────────────────────────────────────────────────────

/**
 * Audit document for accessibility issues.
 * Returns a score and list of issues.
 */
export function auditAccessibility(ir) {
  const issues = [];
  let score = 100;

  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;

    const pageNum = parseInt(pageId.split('_')[1]);

    // Check for images without alt text
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (obj?.type === 'image' && !obj.accessibility?.alt) {
        issues.push({
          type: 'missing_alt_text',
          page: pageNum,
          element: objId,
          severity: 'error',
          message: 'Image has no alternative text',
          suggestion: 'Add descriptive alt text for screen readers',
        });
        score -= 5;
      }
    }

    // Check heading structure
    const headings = page.content
      .map(id => ir.objects[id])
      .filter(obj => obj?.semantic?.role === 'heading');

    let prevLevel = 0;
    for (const heading of headings) {
      const level = heading.semantic.level || 1;
      if (level > prevLevel + 1 && prevLevel > 0) {
        issues.push({
          type: 'heading_skip',
          page: pageNum,
          element: heading.id,
          severity: 'warning',
          message: `Heading level skipped from H${prevLevel} to H${level}`,
          suggestion: `Use H${prevLevel + 1} instead`,
        });
        score -= 2;
      }
      prevLevel = level;
    }

    // Check for tables without headers
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (vec?.semantic?.role === 'table_border') {
        // Check if there's a header row
        const nearbyTexts = page.content
          .map(id => ir.objects[id])
          .filter(obj => obj?.bbox && isNear(vec.bbox, obj.bbox));

        const hasHeader = nearbyTexts.some(t =>
          t.raw?.fontSize > 12 || t.semantic?.role === 'heading'
        );

        if (!hasHeader) {
          issues.push({
            type: 'table_no_header',
            page: pageNum,
            element: vecId,
            severity: 'warning',
            message: 'Table may be missing header row',
            suggestion: 'Ensure first row contains column headers',
          });
          score -= 2;
        }
      }
    }

    // Check reading order
    if (page.content.length > 5) {
      const sorted = [...page.content]
        .map(id => ir.objects[id])
        .filter(obj => obj?.bbox)
        .sort((a, b) => a.bbox[1] - b.bbox[1]);

      // Check if visual order makes sense
      for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1];
        const curr = sorted[i];
        if (prev.bbox[1] > curr.bbox[1] + 50) {
          // Possible reading order issue
          issues.push({
            type: 'reading_order',
            page: pageNum,
            element: curr.id,
            severity: 'info',
            message: 'Element may be out of reading order',
            suggestion: 'Verify content reads correctly top-to-bottom',
          });
          score -= 1;
        }
      }
    }

    // Check for color contrast (basic heuristic)
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (obj?.type === 'text' && obj.raw?.color) {
        // Basic contrast check would go here
      }
    }

    // Check for language attribute
    if (!ir.document.metadata?.language) {
      issues.push({
        type: 'missing_language',
        page: 1,
        severity: 'warning',
        message: 'Document language not specified',
        suggestion: 'Set document.language for screen reader pronunciation',
      });
      score -= 3;
    }

    // Check for title
    if (!ir.document.metadata?.title) {
      issues.push({
        type: 'missing_title',
        page: 1,
        severity: 'warning',
        message: 'Document has no title',
        suggestion: 'Set document.metadata.title',
      });
      score -= 2;
    }
  }

  return {
    score: Math.max(0, score),
    issues,
    summary: {
      errors: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      info: issues.filter(i => i.severity === 'info').length,
    },
  };
}

/**
 * Generate an accessibility tree from the IR.
 */
export function generateAccessibilityTree(ir) {
  const tree = { type: 'Document', children: [] };

  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;

    const pageNode = { type: 'Page', properties: { pageNumber: page.num }, children: [] };

    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (!obj) continue;

      const node = {
        type: obj.accessibility?.role || mapRole(obj.semantic?.role),
        properties: {},
        children: [],
      };

      if (obj.semantic?.text) {
        node.children.push({ type: 'Text', content: obj.semantic.text });
      }

      if (obj.semantic?.role === 'heading') {
        node.properties.level = obj.semantic.level || 1;
      }

      pageNode.children.push(node);
    }

    tree.children.push(pageNode);
  }

  return tree;
}

function mapRole(role) {
  const map = {
    heading: 'Heading',
    paragraph: 'Paragraph',
    table: 'Table',
    list: 'List',
    image: 'Figure',
    form_field: 'Form',
    signature: 'Signature',
  };
  return map[role] || 'Paragraph';
}

function isNear(bbox1, bbox2, threshold = 100) {
  if (!bbox1 || !bbox2) return false;
  const cx1 = bbox1[0] + bbox1[2] / 2;
  const cy1 = bbox1[1] + bbox1[3] / 2;
  const cx2 = bbox2[0] + bbox2[2] / 2;
  const cy2 = bbox2[1] + bbox2[3] / 2;
  return Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2)) < threshold;
}

// ─── HTML Export ─────────────────────────────────────────────────────────────

/**
 * Export the IR as HTML.
 * @param {Object} ir - PDF-IR document
 * @param {Object} options - { mode: 'visual'|'accessible'|'intelligent', includeDataAttributes: true }
 */
export function exportHTML(ir, options = {}) {
  const {
    mode = 'visual', // 'visual' | 'accessible' | 'intelligent' | 'selectable'
    includeDataAttributes = true,
  } = options;

  // Build a RAG/context payload so an AI can summarize/answer with full context.
  const ragPayload = buildRAGPayload(ir);
  const viewer = generateViewerChrome(ragPayload);

  let html = '<!DOCTYPE html>\n<html lang="' + (ir.document.metadata?.language || 'en') + '">\n<head>\n';
  html += '<meta charset="UTF-8">\n';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '<title>' + escapeHTML(ir.document.metadata?.title || 'Document') + '</title>\n';

  html += generateVisualStyles(ir);
  html += generateAccessibleStyles();
  html += viewer.styles;

  html += '</head>\n<body data-codbdocs-view="pdf">\n';

  html += '<a class="skip-link" href="#codbdocs-root">Skip to document</a>\n';

  html += '<main role="document" id="codbdocs-root">\n';

  // Offline viewer chrome: toolbar + outline sidebar.
  html += '<div id="codbdocs-viewer">\n';
  html += '<aside class="codbdocs-sidebar">\n';
  html += viewer.sidebar;
  html += '</aside>\n';
  html += '<div id="codbdocs-main">\n';
  html += viewer.toolbar;
  html += '<div class="codbdocs-viewer-hint">Keyboard: <b>F</b> search &middot; <b>P</b>/<b>N</b> page &middot; <b>C</b> contrast &middot; <b>O</b> outline</div>\n';

  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;

    const nativeText = pageHasNativeText(page, ir);
    const attrs = (includeDataAttributes
      ? ` data-pdf-page="${page.num}" data-pdf-page-id="${pageId}"`
      : '') + ` data-native-text="${nativeText ? '1' : '0'}"`;

    const pageLabel = page.labels?.print || `Page ${page.num}`;

    // Always emit a page wrapper that carries both the raster ("looks like the PDF")
    // layer and the selectable accessible text layer on top.
    html += `<section class="pdf-page"${attrs} aria-label="${escapeHTML(pageLabel)}" role="region">\n`;

    html += renderPageVectorLayer(page, ir);

    // Raster layer — fallback for scanned/OCR-only pages and optional original preview.
    if (page.background) {
      html += `<div class="pdf-page-raster" aria-hidden="true">\n`;
      html += `<img src="${page.background}" alt="" width="${page.width}" height="${page.height}">\n`;
      // Embed extracted page images positioned over the raster so high-res images aren't lost.
      html += renderPageImages(page, ir, attrs);
      html += '</div>\n';
    } else {
      html += renderPageVisual(page, ir, attrs);
    }

    // Accessible / selectable text layer overlaid on the raster. When a raster
    // exists we position every run at its exact bbox so selection/highlight sits
    // precisely on the pixels (pixel-perfect "looks like the PDF" output).
    if (page.background) {
      html += renderPagePositionedText(page, ir, attrs);
    } else {
      html += renderPageAccessible(page, ir, attrs, mode);
    }

    html += '</section>\n';
  }

  html += '</div>\n'; // #codbdocs-main
  html += '</div>\n'; // #codbdocs-viewer
  html += '</main>\n';

  // Backend/search context is intentionally not embedded in viewer HTML.
  // Use getRAGContext(), toRAG(), or exportFull() to store backend data separately.

  // Offline viewer chrome (search / zoom / nav / outline / a11y).
  html += viewer.script;

  html += '</body>\n</html>';
  return html;
}

/**
 * Position embedded images over the page raster using their bounding boxes.
 * Image objects are real `ir.objects` entries (type = 'image').
 */
function renderPageImages(page, ir, attrs) {
  let html = '';
  for (const objId of page.content) {
    const obj = ir.objects[objId];
    if (!obj || obj.type !== 'image') continue;
    const src = embeddedImageSrc(obj.raw?.src);
    if (!src) continue;
    const [x = 0, y = 0, w = 0, h = 0] = obj.bbox || [];
    const top = cssTop(page, y, h);
    const alt = escapeHTML(obj.accessibility?.alt || obj.semantic?.caption || 'Image');
    html += `<img class="pdf-embedded-image"${attrs} data-pdf-object="${objId}" `;
    html += `src="${src}" alt="${alt}" style="position:absolute;left:${x}px;top:${top}px;width:${w}px;height:${h}px;" width="${w}" height="${h}">\n`;
  }
  return html;
}

/**
 * Build a machine-readable RAG payload with the full document context so an
 * AI can summarize, quote, and answer with grounded detail — no AI runs here.
 */
function buildRAGPayload(ir) {
  return buildRAGContext(ir, null);
}

function formFieldMarkup(obj, page, positioned = true) {
  const field = { ...(obj.raw || {}), ...(obj.semantic || {}) };
  const type = field.fieldType || 'text';
  const name = field.fieldName || field.name || obj.id || 'field';
  const label = obj.accessibility?.label || field.label || humanizeFieldName(name);
  const value = field.value ?? '';
  const values = Array.isArray(value) ? value.map(String) : [String(value ?? '')];
  const id = `pdf-form-${obj.id}`;
  const readOnly = obj.accessibility?.readOnly || field.readOnly;
  const required = obj.accessibility?.required || field.required;
  const common = ` id="${escapeHTML(id)}" name="${escapeHTML(name)}" aria-label="${escapeHTML(label)}"` +
    (required ? ' required aria-required="true"' : '') +
    (readOnly && !['text', 'password', 'textarea'].includes(type) ? ' disabled aria-readonly="true"' : '') +
    (readOnly && ['text', 'password', 'textarea'].includes(type) ? ' readonly aria-readonly="true"' : '');

  if (field.hidden) return `<input type="hidden"${common} value="${escapeHTML(values[0])}">`;

  let control = '';
  if (type === 'checkbox' || type === 'radio') {
    control = `<input type="${type}"${common} value="${escapeHTML(field.optionValue || 'On')}"${field.checked ? ' checked' : ''}>`;
  } else if (type === 'dropdown' || type === 'listbox') {
    const options = (field.options || []).map(option => {
      const optionValue = String(option?.value ?? option ?? '');
      const optionLabel = String(option?.label ?? optionValue);
      return `<option value="${escapeHTML(optionValue)}"${values.includes(optionValue) ? ' selected' : ''}>${escapeHTML(optionLabel)}</option>`;
    }).join('');
    control = `<select${common}${field.multiple ? ' multiple' : ''}${type === 'listbox' ? ` size="${Math.min(8, Math.max(2, (field.options || []).length || 2))}"` : ''}>${options}</select>`;
  } else if (type === 'textarea') {
    control = `<textarea${common}${field.maxLength ? ` maxlength="${Number(field.maxLength)}"` : ''}>${escapeHTML(values[0])}</textarea>`;
  } else if (type === 'button') {
    control = `<button type="button"${common} disabled>${escapeHTML(label)}</button>`;
  } else if (type === 'signature') {
    control = `<output${common} class="pdf-signature">${escapeHTML(values[0] || 'Unsigned')}</output>`;
  } else {
    control = `<input type="${type === 'password' ? 'password' : 'text'}"${common} value="${escapeHTML(values[0])}"${field.maxLength ? ` maxlength="${Number(field.maxLength)}"` : ''}>`;
  }

  const data = ` data-pdf-object="${escapeHTML(obj.id)}" data-form-name="${escapeHTML(name)}"`;
  if (!positioned) return `<div class="pdf-form-field"${data}><label for="${escapeHTML(id)}">${escapeHTML(label)}</label>${control}</div>\n`;
  const [x = 0, y = 0, w = 0, h = 0] = obj.bbox || [];
  return `<div class="pdf-form-field pdf-form-field-positioned"${data} style="left:${Number(x) || 0}px;top:${cssTop(page, y, h)}px;width:${Number(w) || 0}px;height:${Number(h) || 0}px"><label class="pdf-sr-only" for="${escapeHTML(id)}">${escapeHTML(label)}</label>${control}</div>\n`;
}

function renderPageVisual(page, ir, attrs) {
  let html = '<div class="pdf-text-canvas" style="position:relative;width:' + (page.width || 0) + 'px;height:' + (page.height || 0) + 'px;">\n';

  // Render content (text + images, positioned)
  for (const objId of page.content) {
    const obj = ir.objects[objId];
    if (!obj) continue;

    if (obj.type === 'text') {
      const bbox = obj.bbox || [];
      const style = textRunStyle(obj);
      html += `<div class="pdf-text"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${bbox[0] || 0}px;top:${cssTop(page, bbox[1], bbox[3] || obj.raw?.fontSize || 12)}px;font-size:${obj.raw?.fontSize || 12}px;${style}">${escapeHTML(obj.semantic?.text || '')}</div>\n`;
    } else if (obj.type === 'image') {
      const bbox = obj.bbox || [];
      const src = embeddedImageSrc(obj.raw?.src || '');
      if (src) {
        html += `<img class="pdf-image"${attrs} data-pdf-object="${objId}" src="${src}" alt="${escapeHTML(obj.accessibility?.alt || 'Image')}" style="position:absolute;left:${bbox[0] || 0}px;top:${cssTop(page, bbox[1], bbox[3])}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">\n`;
      } else {
        html += `<div class="pdf-image"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${bbox[0] || 0}px;top:${cssTop(page, bbox[1], bbox[3])}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;background:#eee;display:flex;align-items:center;justify-content:center;color:#999;">[Image]</div>\n`;
      }
    } else if (obj.type === 'link') {
      const bbox = obj.bbox || [];
      const href = escapeHTML(obj.raw?.href || '#');
      html += `<a class="pdf-link"${attrs} data-pdf-object="${objId}" href="${href}" target="_blank" rel="noopener" style="position:absolute;left:${bbox[0] || 0}px;top:${cssTop(page, bbox[1], bbox[3])}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">${escapeHTML(obj.semantic?.text || obj.raw?.url || 'link')}</a>\n`;
    }
  }

  html += '</div>\n';
  return html;
}

/**
 * Render the page's text as an absolutely-positioned selectable layer whose
 * run coordinates exactly match the HD raster shown behind it. This is what
 * makes the visual output "put back together dynamically": every text run sits
 * precisely on top of the pixels it came from, so selection/highlight align
 * with what you see. Used in place of the flowed accessible layer whenever a
 * raster (page.background) is present.
 */
function renderPagePositionedText(page, ir, attrs) {
  let html = '<div class="pdf-text-layer" aria-label="Selectable text">\n';

  for (const objId of page.content) {
    const obj = ir.objects[objId];
    if (!obj) continue;

    const dataAttr = includeDataAttributes(objId, attrs);
    const bbox = obj.bbox || [];

    if (obj.type === 'text' && obj.semantic?.text) {
      const style = textRunStyle(obj);
      html += `<div class="pdf-text"${dataAttr} data-pdf-object="${objId}" style="position:absolute;left:${bbox[0] || 0}px;top:${cssTop(page, bbox[1], bbox[3] || obj.raw?.fontSize || 12)}px;font-size:${obj.raw?.fontSize || 12}px;${style}">${escapeHTML(obj.semantic.text)}</div>\n`;
    } else if (obj.type === 'image') {
      const src = embeddedImageSrc(obj.raw?.src || '');
      const alt = escapeHTML(obj.accessibility?.alt || obj.semantic?.caption || 'Image');
      if (src) {
        html += `<img class="pdf-image"${dataAttr} data-pdf-object="${objId}" src="${src}" alt="${alt}" style="position:absolute;left:${bbox[0] || 0}px;top:${cssTop(page, bbox[1], bbox[3])}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">\n`;
      }
    } else if (obj.type === 'link') {
      const href = escapeHTML(obj.raw?.href || '#');
      const text = escapeHTML(obj.semantic?.text || obj.raw?.url || 'link');
      html += `<a class="pdf-link"${dataAttr} data-pdf-object="${objId}" href="${href}" target="_blank" rel="noopener" style="position:absolute;left:${bbox[0] || 0}px;top:${cssTop(page, bbox[1], bbox[3])}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">${text}</a>\n`;
    } else if (obj.type === 'form_field') {
      html += formFieldMarkup(obj, page, true);
    }
  }

  html += '</div>\n';
  return html;
}

function renderPageAccessible(page, ir, attrs, mode) {
  let html = '<div class="pdf-text-layer" aria-label="Selectable text">\n';

  for (const objId of page.content) {
    const obj = ir.objects[objId];
    if (!obj) continue;

    const dataAttr = includeDataAttributes(objId, attrs);
    const role = obj.semantic?.role || 'paragraph';

    if (obj.type === 'image') {
      const alt = obj.accessibility?.alt || obj.semantic?.caption || (mode === 'intelligent' ? 'AI-generated description' : 'Image');
        const src = embeddedImageSrc(obj.raw?.src || '');
      html += `<figure${dataAttr}>\n`;
      if (src) html += `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="lazy">\n`;
      if (obj.semantic?.caption) html += `<figcaption>${escapeHTML(obj.semantic.caption)}</figcaption>\n`;
      if (mode === 'intelligent' && obj.provenance?.method === 'vision') {
        html += `<small class="ai-generated">AI-generated description</small>\n`;
      }
      html += '</figure>\n';
    } else if (role === 'heading') {
      const level = obj.semantic?.level || 2;
      html += `<h${level}${dataAttr}>${escapeHTML(obj.semantic?.text || '')}</h${level}>\n`;
    } else if (role === 'table') {
      html += `<table${dataAttr}>\n`;
      html += `<caption>${escapeHTML(obj.semantic?.caption || 'Table')}</caption>\n`;
      html += '</table>\n';
    } else if (role === 'list') {
      html += `<ul${dataAttr}>\n`;
      html += '</ul>\n';
    } else if (obj.type === 'link') {
      const href = escapeHTML(obj.raw?.href || '#');
      html += `<a${dataAttr} href="${href}" target="_blank" rel="noopener">${escapeHTML(obj.semantic?.text || obj.raw?.url || 'link')}</a>\n`;
    } else if (obj.type === 'form_field') {
      html += formFieldMarkup(obj, page, true);
    } else if (obj.type === 'text' && obj.semantic?.text) {
      const style = textRunStyle(obj);
      html += `<p${dataAttr}${style ? ' style="' + style + '"' : ''}>${escapeHTML(obj.semantic.text)}</p>\n`;
    }
  }

  // Render vectors as decorative elements
  for (const vecId of page.vectors || []) {
    const vec = ir.vectors[vecId];
    if (!vec) continue;
    if (vec.semantic?.role === 'separator') {
      html += `<hr${attrs} data-pdf-vector="${vecId}">\n`;
    }
  }

  html += '</div>\n';
  return html;
}

/**
 * Build inline CSS (font family + color) for a text run so reconstructed
 * pages better match the source PDF's typography.
 */
function textRunStyle(obj) {
  let style = '';
  const font = obj.raw?.font;
  if (font) {
    // PDF font names often look like "ABCDEF+Helvetica". Use a readable fallback
    // that browsers can map reasonably while keeping a monospace/system fallback.
    style += `font-family:${sanitizeFontName(font)}, system-ui, sans-serif;`;
  }
  const color = obj.raw?.color;
  if (color) {
    style += `color:${escapeCSSColor(color)};`;
  }
  return style;
}

function cssTop(page, y, height = 0) {
  const pageHeight = Number(page?.height) || 0;
  const yy = Number(y) || 0;
  const hh = Number(height) || 0;
  return Math.max(0, pageHeight - yy - hh);
}

function sanitizeFontName(name) {
  return String(name)
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .replace(/^\d+\s?/, '')
    .trim() || 'sans-serif';
}

function escapeCSSColor(color) {
  return String(color).replace(/[^0-9A-Za-z#.,()% ]/g, '');
}

function renderVectorVisual(vec, attrs) {
  if (!vec.bbox) return '';

  if (vec.type === 'rect') {
    const style = `position:absolute;left:${vec.bbox[0]}px;top:${vec.bbox[1]}px;width:${vec.bbox[2]}px;height:${vec.bbox[3]}px;`;
    const stroke = vec.graphicsState?.stroke ? `border:1px solid ${vec.graphicsState.stroke};` : '';
    const fill = vec.graphicsState?.fill ? `background:${vec.graphicsState.fill};` : '';
    return `<div class="pdf-rect"${attrs} data-pdf-vector="${vec.id}" style="${style}${stroke}${fill}"></div>\n`;
  }

  if (vec.type === 'path' && vec.points?.length > 0) {
    // Convert path to SVG
    let d = '';
    for (const pt of vec.points) {
      if (pt.op === 'moveTo') d += `M${pt.x},${pt.y}`;
      else if (pt.op === 'lineTo') d += `L${pt.x},${pt.y}`;
      else if (pt.op === 'curveTo') d += `C${pt.x1},${pt.y1} ${pt.x2},${pt.y2} ${pt.x3},${pt.y3}`;
      else if (pt.op === 'closePath') d += 'Z';
    }
    const stroke = vec.graphicsState?.stroke || '#000';
    const fill = vec.graphicsState?.fill || 'none';
    return `<svg class="pdf-path"${attrs} data-pdf-vector="${vec.id}" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;"><path d="${d}" stroke="${stroke}" fill="${fill}" stroke-width="${vec.graphicsState?.lineWidth || 1}"/></svg>\n`;
  }

  return '';
}

function includeDataAttributes(objId, attrs) {
  return attrs ? `${attrs} data-pdf-object="${objId}"` : ` data-pdf-object="${objId}"`;
}

function generateVisualStyles(ir) {
  return `<style>
    body { margin: 0; padding: 20px; background: #f5f5f5; font-family: system-ui, sans-serif; }
    .pdf-page { background: white; margin: 20px auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; position: relative; width: fit-content; }
    .pdf-page-raster { position: relative; z-index: 0; }
    .pdf-page[data-native-text="1"] .pdf-page-raster { display: none; }
    .pdf-page-raster > img { display: block; position: relative; z-index: 1; width: auto; height: auto; max-width: none; }
    .pdf-embedded-image { position: absolute; z-index: 2; }
    .pdf-vector-layer { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
    /* The positioned text layer sits directly over the raster at the same
       coordinates, so it renders on top of the pixels and stays selectable.
       This makes the page look exactly like the source PDF while keeping
       every run precise and copyable. */
    .pdf-text-layer { position: absolute; inset: 0; z-index: 3; user-select: text; }
    body[data-codbdocs-view="text"] .pdf-page-raster { display: none; }
    .codbdocs-toolbar { max-width: 820px; margin: 12px auto; padding: 8px; display: flex; gap: 8px; justify-content: center; }
    .codbdocs-toggle { padding: 8px 16px; border: 1px solid #ccc; border-radius: 8px; background: #fff; cursor: pointer; font-size: 14px; }
    .codbdocs-toggle.is-active { background: #4361ee; color: #fff; border-color: #4361ee; }
    .pdf-text { position: absolute; white-space: pre; line-height: 1; transform-origin: 0 0; }
    body[data-codbdocs-view="pdf"] .pdf-page[data-native-text="0"] .pdf-text { color: transparent !important; }
    body[data-codbdocs-view="text"] .pdf-page[data-native-text="0"] .pdf-text { color: #111 !important; }
    .pdf-image { border: 1px dashed #ccc; }
    .pdf-rect { border: 1px solid #000; }
    .pdf-form-field-positioned { position: absolute; z-index: 5; }
    .pdf-form-field-positioned input:not([type="checkbox"]):not([type="radio"]),
    .pdf-form-field-positioned select,
    .pdf-form-field-positioned textarea,
    .pdf-form-field-positioned button,
    .pdf-form-field-positioned output { box-sizing: border-box; width: 100%; height: 100%; min-width: 0; margin: 0; font: inherit; }
    .pdf-form-field-positioned input[type="checkbox"],
    .pdf-form-field-positioned input[type="radio"] { width: 100%; height: 100%; margin: 0; }
    .pdf-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    .pdf-signature { display: flex; align-items: center; padding: 2px 4px; border: 1px solid #777; background: #f7f7f7; }
    .ai-generated { color: #999; font-style: italic; }
  </style>\n`;
}

function renderPageVectorLayer(page, ir) {
  if (!Array.isArray(page.vectors) || !page.vectors.length) return '';
  let body = '';
  for (const vecId of page.vectors) {
    const vec = ir.vectors[vecId];
    if (!vec) continue;
    const stroke = escapeHTML(vec.graphicsState?.stroke || '#000');
    const fill = escapeHTML(vec.graphicsState?.fill || 'none');
    const width = Number(vec.graphicsState?.lineWidth) || 1;
    if (vec.type === 'rect' && Array.isArray(vec.bbox)) {
      const [x = 0, y = 0, w = 0, h = 0] = vec.bbox;
      body += `<rect x="${Number(x) || 0}" y="${Number(y) || 0}" width="${Math.abs(Number(w) || 0)}" height="${Math.abs(Number(h) || 0)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
    } else if (vec.type === 'path' && Array.isArray(vec.points)) {
      let d = '';
      for (const p of vec.points) {
        if (p.op === 'moveTo') d += `M${Number(p.x) || 0} ${Number(p.y) || 0} `;
        else if (p.op === 'lineTo') d += `L${Number(p.x) || 0} ${Number(p.y) || 0} `;
        else if (p.op === 'curveTo') d += `C${Number(p.x1) || 0} ${Number(p.y1) || 0} ${Number(p.x2) || 0} ${Number(p.y2) || 0} ${Number(p.x3) || 0} ${Number(p.y3) || 0} `;
        else if (p.op === 'closePath') d += 'Z ';
      }
      if (d.trim()) body += `<path d="${escapeHTML(d.trim())}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
    }
  }
  if (!body) return '';
  const w = Number(page.width) || 0;
  const h = Number(page.height) || 0;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><g transform="matrix(1 0 0 -1 0 ${h})">${body}</g></svg>`;
  return `<img class="pdf-vector-layer" alt="" aria-hidden="true" src="data:image/svg+xml;base64,${textToBase64(svg)}">\n`;
}

function pageHasNativeText(page, ir) {
  return (page.content || []).some(id => {
    const obj = ir.objects[id];
    if (!obj || obj.type !== 'text' || !obj.semantic?.text) return false;
    const method = String(obj.provenance?.method || obj.raw?.source || obj.raw?.textSource || 'native').toLowerCase();
    return method !== 'ocr' && method !== 'fusion';
  });
}

function generateAccessibleStyles() {
  return `<style>
    body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 820px; margin: 0 auto; }
    .pdf-page { margin: 40px 0; padding: 10px 0; position: relative; }
    .pdf-page-raster { position: relative; }
    .pdf-page-raster > img { display: block; width: auto; height: auto; max-width: none; }
    .pdf-text-layer { position: absolute; inset: 10px 0 0; }
    h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; }
    p { margin: 0.5em 0; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    figure { margin: 1em 0; }
    img { max-width: 100%; height: auto; }
    figcaption { font-size: 0.9em; color: #666; margin-top: 4px; }
    .ai-generated { color: #999; font-size: 0.8em; font-style: italic; }
    hr { border: none; border-top: 1px solid #eee; margin: 1em 0; }
    .codbdocs-toolbar { max-width: 820px; margin: 12px auto; padding: 8px; display: flex; gap: 8px; justify-content: center; }
    .codbdocs-toggle { padding: 8px 16px; border: 1px solid #ccc; border-radius: 8px; background: #fff; cursor: pointer; font-size: 14px; }
    .codbdocs-toggle.is-active { background: #4361ee; color: #fff; border-color: #4361ee; }
    body[data-codbdocs-view="text"] .pdf-page-raster { display: none; }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
    @media (prefers-contrast: high) { body { background: #000; color: #fff; } a { color: #ff0; } }
  </style>\n`;
}

// ─── Structure Tree Extraction (Tagged PDF) ──────────────────────────────────

/**
 * Extract structure tree from a tagged PDF.
 * PDF.js provides getStructTree() for tagged PDFs.
 */
export async function extractStructureTree(page) {
  try {
    const structTree = await page.getStructTree();
    if (!structTree) return null;

    return convertStructTreeNode(structTree);
  } catch (e) {
    // PDF is not tagged or structure tree unavailable
    return null;
  }
}

function convertStructTreeNode(node) {
  if (!node) return null;

  const result = {
    type: node.type || 'Unknown',
    role: node.role || node.type,
    children: [],
  };

  // Add properties if available
  if (node.alt) result.alt = node.alt;
  if (node.lang) result.lang = node.lang;
  if (node.altText) result.altText = node.altText;

  // Recursively convert children
  if (node.children) {
    for (const child of node.children) {
      if (typeof child === 'string') {
        result.children.push({ type: 'Text', content: child });
      } else {
        const converted = convertStructTreeNode(child);
        if (converted) result.children.push(converted);
      }
    }
  }

  return result;
}

// ─── Annotations Extraction ──────────────────────────────────────────────────

/**
 * Extract annotations from a PDF page.
 */
export async function extractAnnotations(page) {
  try {
    const annotations = await page.getAnnotations({ intent: 'display' });
    if (!annotations || annotations.length === 0) return [];

    return annotations.map(ann => ({
      id: ann.id,
      type: mapAnnotationType(ann.subtype),
      subtype: ann.subtype,
      rect: ann.rect, // [x1, y1, x2, y2]
      color: ann.color,
      contents: ann.contents || '',
      title: ann.title || '',
      modificationDate: ann.modDate,
      creationDate: ann.creationDate,
      flags: ann.flags,
      // Form-specific
      fieldName: ann.fieldName,
      fieldType: ann.fieldType,
      fieldValue: ann.fieldValue,
      defaultFieldValue: ann.defaultFieldValue,
      alternativeText: ann.alternativeText,
      fieldFlags: ann.fieldFlags,
      readOnly: ann.readOnly,
      required: ann.required,
      hidden: ann.hidden,
      maxLen: ann.maxLen,
      multiLine: ann.multiLine,
      password: ann.password,
      comb: ann.comb,
      doNotScroll: ann.doNotScroll,
      combo: ann.combo,
      multiSelect: ann.multiSelect,
      checkBox: ann.checkBox,
      radioButton: ann.radioButton,
      pushButton: ann.pushButton,
      buttonValue: ann.buttonValue,
      exportValue: ann.exportValue,
      buttonWidgetType: ann.buttonWidgetType,
      options: ann.options,
      actions: ann.actions,
      // Link-specific
      url: ann.url,
      dest: ann.dest,
      // Markup-specific
      strokeWidth: ann.strokeWidth,
      strokeColor: ann.strokeColor,
      fillColor: ann.fillColor,
      opacity: ann.opacity,
    }));
  } catch (e) {
    return [];
  }
}

function mapAnnotationType(subtype) {
  const typeMap = {
    'Text': 'note',
    'Link': 'link',
    'FreeText': 'free_text',
    'Line': 'line',
    'Square': 'square',
    'Circle': 'circle',
    'Polygon': 'polygon',
    'PolyLine': 'polyline',
    'Highlight': 'highlight',
    'Underline': 'underline',
    'Squiggly': 'squiggly',
    'StrikeOut': 'strikeout',
    'Stamp': 'stamp',
    'Caret': 'caret',
    'Ink': 'ink',
    'Popup': 'popup',
    'FileAttachment': 'file_attachment',
    'Sound': 'sound',
    'Movie': 'movie',
    'Widget': 'form_field',
    'Screen': 'screen',
    'PrinterMark': 'printer_mark',
    'TrapNet': 'trap_net',
    'Watermark': 'watermark',
    '3D': '3d',
    'Redact': 'redact',
  };
  return typeMap[subtype] || subtype || 'unknown';
}

// ─── Forms Extraction ────────────────────────────────────────────────────────

/**
 * Extract form fields from the entire document.
 */
export async function extractFormFields(pdf) {
  try {
    if (typeof pdf.getFieldObjects !== 'function') return [];
    const fieldObjects = await pdf.getFieldObjects();
    if (!fieldObjects || typeof fieldObjects !== 'object') return [];

    const fields = [];
    for (const [name, widgets] of Object.entries(fieldObjects)) {
      for (const widget of Array.isArray(widgets) ? widgets : []) {
        const normalized = normalizeFormField({ ...widget, fieldName: widget.fieldName || name });
        if (normalized) fields.push(normalized);
      }
    }
    return fields;
  } catch (e) {
    // PDF has no AcroForm, or this PDF.js build does not expose field objects.
    return [];
  }
}

// ─── Reading Order Detection ─────────────────────────────────────────────────

/**
 * Detect reading order from content objects.
 * Uses spatial analysis to determine the logical reading sequence.
 */
export function detectReadingOrder(ir, pageNum) {
  const pageId = `page_${pageNum}`;
  const page = ir.pages[pageId];
  if (!page) return [];

  // Collect all content objects with bounding boxes
  const objects = [];
  for (const objId of page.content) {
    const obj = ir.objects[objId];
    if (obj && obj.bbox) {
      objects.push({
        id: objId,
        type: obj.type,
        bbox: obj.bbox,
        text: obj.semantic?.text || '',
        // Calculate center point for sorting
        centerX: obj.bbox[0] + obj.bbox[2] / 2,
        centerY: obj.bbox[1] + obj.bbox[3] / 2,
      });
    }
  }

  // Also include vectors with semantic roles
  for (const vecId of page.vectors || []) {
    const vec = ir.vectors[vecId];
    if (vec && vec.bbox && vec.semantic?.role) {
      objects.push({
        id: vecId,
        type: 'vector',
        bbox: vec.bbox,
        text: vec.semantic.role,
        centerX: vec.bbox[0] + vec.bbox[2] / 2,
        centerY: vec.bbox[1] + vec.bbox[3] / 2,
      });
    }
  }

  if (objects.length === 0) return [];

  // Sort by reading order (top-to-bottom, left-to-right)
  const sorted = objects.sort((a, b) => {
    // Primary sort: vertical position (top to bottom)
    const yDiff = a.centerY - b.centerY;
    if (Math.abs(yDiff) > 10) return yDiff;

    // Secondary sort: horizontal position (left to right)
    return a.centerX - b.centerX;
  });

  // Assign reading order indices
  return sorted.map((obj, index) => ({
    ...obj,
    readingOrder: index,
  }));
}

/**
 * Get the reading order as a simple sequence of object IDs.
 */
export function getReadingOrderSequence(ir, pageNum) {
  const order = detectReadingOrder(ir, pageNum);
  return order.map(item => item.id);
}

/**
 * Validate reading order against structure tree.
 * Returns issues where visual order differs from logical order.
 */
export function validateReadingOrder(ir, pageNum, structureTree) {
  const visualOrder = detectReadingOrder(ir, pageNum);
  const issues = [];

  if (!structureTree || !structureTree.children) return issues;

  // Flatten structure tree to get logical order
  const logicalOrder = flattenStructureTree(structureTree);

  // Compare orders
  for (let i = 0; i < Math.min(visualOrder.length, logicalOrder.length); i++) {
    const visualItem = visualOrder[i];
    const logicalItem = logicalOrder[i];

    if (visualItem.id !== logicalItem.id) {
      issues.push({
        type: 'reading_order_mismatch',
        visualIndex: i,
        logicalIndex: logicalItem.index,
        visualObject: visualItem,
        logicalObject: logicalItem,
        message: `Object "${visualItem.text.substring(0, 30)}" appears at visual position ${i} but logical position ${logicalItem.index}`,
      });
    }
  }

  return issues;
}

function flattenStructureTree(node, result = [], index = { value: 0 }) {
  if (!node) return result;

  if (node.type === 'Text' && node.content) {
    result.push({
      id: `struct_${index.value}`,
      text: node.content,
      index: index.value++,
    });
  }

  if (node.children) {
    for (const child of node.children) {
      flattenStructureTree(child, result, index);
    }
  }

  return result;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

let idCounter = 0;
function generateId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;
}

function escapeHTML(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
