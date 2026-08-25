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

// ─── PDF-IR Core ─────────────────────────────────────────────────────────────

/**
 * Create a fresh PDF-IR document model.
 */
export function createIR() {
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
    resources: {},
    structure: {},
    annotations: {},
    forms: {},
    assets: {},
    vectors: {},
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
  const { mode = 'accessible', includeDataAttributes = true } = options;

  let html = '<!DOCTYPE html>\n<html lang="' + (ir.document.metadata?.language || 'en') + '">\n<head>\n';
  html += '<meta charset="UTF-8">\n';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '<title>' + escapeHTML(ir.document.metadata?.title || 'Document') + '</title>\n';

  if (mode === 'visual') {
    html += generateVisualStyles(ir);
  } else {
    html += generateAccessibleStyles();
  }

  html += '</head>\n<body>\n';

  if (mode === 'accessible' || mode === 'intelligent') {
    html += '<main role="document">\n';
  }

  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;

    const attrs = includeDataAttributes
      ? ` data-pdf-page="${page.num}" data-pdf-page-id="${pageId}"`
      : '';

    if (mode === 'visual') {
      html += `<div class="pdf-page"${attrs} style="width:${page.width}px;height:${page.height}px;position:relative;">\n`;
      html += renderPageVisual(page, ir, attrs);
      html += '</div>\n';
    } else {
      html += `<section class="pdf-page"${attrs} aria-label="Page ${page.num}">\n`;
      html += renderPageAccessible(page, ir, attrs, mode);
      html += '</section>\n';
    }
  }

  if (mode === 'accessible' || mode === 'intelligent') {
    html += '</main>\n';
  }

  html += '</body>\n</html>';
  return html;
}

function renderPageVisual(page, ir, attrs) {
  let html = '';

  // Render vectors first (background)
  for (const vecId of page.vectors || []) {
    const vec = ir.vectors[vecId];
    if (!vec) continue;
    html += renderVectorVisual(vec, attrs);
  }

  // Render content
  for (const objId of page.content) {
    const obj = ir.objects[objId];
    if (!obj) continue;

    if (obj.type === 'text') {
      html += `<div class="pdf-text"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${obj.bbox?.[0] || 0}px;top:${obj.bbox?.[1] || 0}px;font-size:${obj.raw?.fontSize || 12}px;">${escapeHTML(obj.semantic?.text || '')}</div>\n`;
    } else if (obj.type === 'image') {
      html += `<div class="pdf-image"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${obj.bbox?.[0] || 0}px;top:${obj.bbox?.[1] || 0}px;width:${obj.bbox?.[2] || 0}px;height:${obj.bbox?.[3] || 0}px;background:#eee;display:flex;align-items:center;justify-content:center;color:#999;">[Image]</div>\n`;
    }
  }

  return html;
}

function renderPageAccessible(page, ir, attrs, mode) {
  let html = '';

  for (const objId of page.content) {
    const obj = ir.objects[objId];
    if (!obj) continue;

    const dataAttr = includeDataAttributes(objId, attrs);
    const role = obj.semantic?.role || 'paragraph';

    if (role === 'heading') {
      const level = obj.semantic?.level || 2;
      html += `<h${level}${dataAttr}>${escapeHTML(obj.semantic?.text || '')}</h${level}>\n`;
    } else if (role === 'table') {
      html += `<table${dataAttr}>\n`;
      html += `<caption>${escapeHTML(obj.semantic?.caption || 'Table')}</caption>\n`;
      // Table rendering would go here
      html += '</table>\n';
    } else if (role === 'list') {
      html += `<ul${dataAttr}>\n`;
      // List items would go here
      html += '</ul>\n';
    } else if (obj.type === 'image') {
      const alt = obj.accessibility?.alt || (mode === 'intelligent' ? 'AI-generated description' : 'Image');
      const src = obj.raw?.src || '';
      html += `<figure${dataAttr}>\n`;
      html += `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}">\n`;
      if (obj.semantic?.caption) {
        html += `<figcaption>${escapeHTML(obj.semantic.caption)}</figcaption>\n`;
      }
      if (mode === 'intelligent' && obj.provenance?.method === 'vision') {
        html += `<small class="ai-generated">AI-generated description</small>\n`;
      }
      html += '</figure>\n';
    } else {
      html += `<p${dataAttr}>${escapeHTML(obj.semantic?.text || '')}</p>\n`;
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

  return html;
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
    .pdf-page { background: white; margin: 20px auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
    .pdf-text { white-space: pre-wrap; }
    .pdf-image { border: 1px dashed #ccc; }
    .pdf-rect { border: 1px solid #000; }
    .ai-generated { color: #999; font-style: italic; }
  </style>\n`;
}

function generateAccessibleStyles() {
  return `<style>
    body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 800px; margin: 0 auto; }
    .pdf-page { margin: 40px 0; padding: 20px 0; border-bottom: 1px solid #eee; }
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
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
    @media (prefers-contrast: high) { body { background: #000; color: #fff; } a { color: #ff0; } }
  </style>\n`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

let idCounter = 0;
function generateId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
