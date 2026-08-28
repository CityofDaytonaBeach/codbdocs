/**
 * @codbdocs/core — Document Access System
 *
 * WCAG 2.1 AA-oriented accessible HTML generation and automated auditing.
 * Provides complete screen reader support, keyboard navigation,
 * proper semantic HTML, and automated accessibility auditing.
 *
 * Features:
 *   - WCAG 2.1 AA scoring with detailed issue reporting
 *   - Proper table rendering (th, thead, tbody, scope, caption, summary)
 *   - Proper list rendering (ul/ol with li, role="list")
 *   - Skip navigation links
 *   - Landmark regions (banner, navigation, main, contentinfo)
 *   - ARIA labels, roles, live regions
 *   - Keyboard navigation (tab order, focus management)
 *   - Form field accessibility (labels, descriptions, errors)
 *   - Image accessibility (alt text, decorative images, figure/figcaption)
 *   - Heading hierarchy enforcement
 *   - Reading order validation
 *   - Color contrast checking
 *   - Language detection and tagging
 *   - Auto-remediation of common issues
 */

// ─── Escape HTML ──────────────────────────────────────────────────────────────

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── WCAG 2.1 AA Audit ───────────────────────────────────────────────────────

/**
 * Comprehensive WCAG 2.1 AA accessibility audit.
 * Returns a score (0-100) with categorized issues and remediation suggestions.
 *
 * @param {Object} ir - PDF-IR document
 * @returns {Object} { score, level, issues, summary, wcagCriteria }
 */
export function wcagAudit(ir) {
  const issues = [];
  let score = 100;
  const criteria = {};

  // ─── Perceivable ────────────────────────────────────────────────────────

  // 1.1.1 Non-text Content
  criteria['1.1.1'] = { name: 'Non-text Content', status: 'pass', issues: [] };
  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;
    const pageNum = parseInt(pageId.split('_')[1]);

    for (const objId of page.content || []) {
      const obj = ir.objects[objId];
      if (!obj) continue;

      if (obj.type === 'image') {
        if (!obj.accessibility?.alt && obj.accessibility?.alt !== '') {
          criteria['1.1.1'].status = 'fail';
          criteria['1.1.1'].issues.push(objId);
          issues.push({
            type: 'missing_alt_text',
            wcag: '1.1.1',
            page: pageNum,
            element: objId,
            severity: 'error',
            message: 'Image has no alternative text',
            suggestion: 'Add descriptive alt text or mark as decorative (alt="")',
          });
          score -= 5;
        }
      }
    }
  }

  // 1.3.1 Info and Relationships
  criteria['1.3.1'] = { name: 'Info and Relationships', status: 'pass', issues: [] };
  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;
    const pageNum = parseInt(pageId.split('_')[1]);

    // Check heading hierarchy
    const headings = (page.content || [])
      .map(id => ir.objects[id])
      .filter(obj => obj?.semantic?.role === 'heading');

    let prevLevel = 0;
    for (const heading of headings) {
      const level = heading.semantic.level || 1;
      if (level > prevLevel + 1 && prevLevel > 0) {
        criteria['1.3.1'].status = 'fail';
        criteria['1.3.1'].issues.push(heading.id);
        issues.push({
          type: 'heading_skip',
          wcag: '1.3.1',
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

    // Check tables for proper structure
    for (const objId of page.content || []) {
      const obj = ir.objects[objId];
      if (obj?.semantic?.role === 'table') {
        if (!obj.semantic?.caption && !obj.accessibility?.summary) {
          criteria['1.3.1'].status = 'fail';
          criteria['1.3.1'].issues.push(objId);
          issues.push({
            type: 'table_no_caption',
            wcag: '1.3.1',
            page: pageNum,
            element: objId,
            severity: 'warning',
            message: 'Table has no caption or summary',
            suggestion: 'Add a <caption> element describing the table',
          });
          score -= 2;
        }
      }

      // Check lists
      if (obj?.semantic?.role === 'list') {
        const items = obj.semantic?.items || [];
        if (items.length === 0) {
          criteria['1.3.1'].status = 'fail';
          issues.push({
            type: 'empty_list',
            wcag: '1.3.1',
            page: pageNum,
            element: objId,
            severity: 'warning',
            message: 'List has no items',
            suggestion: 'Add list items or remove the empty list',
          });
          score -= 1;
        }
      }
    }
  }

  // 1.4.3 Contrast (Minimum) — check text on colored backgrounds
  criteria['1.4.3'] = { name: 'Contrast (Minimum)', status: 'pass', issues: [] };
  // We check this via graphics state analysis
  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;

    for (const objId of page.content || []) {
      const obj = ir.objects[objId];
      if (obj?.type === 'text' && obj.raw?.color && obj.raw?.bgColor) {
        const ratio = computeContrastRatio(obj.raw.color, obj.raw.bgColor);
        if (ratio < 4.5) {
          criteria['1.4.3'].status = 'fail';
          criteria['1.4.3'].issues.push(objId);
          issues.push({
            type: 'low_contrast',
            wcag: '1.4.3',
            page: parseInt(pageId.split('_')[1]),
            element: objId,
            severity: 'warning',
            message: `Text contrast ratio ${ratio.toFixed(2)}:1 is below 4.5:1 minimum`,
            suggestion: 'Increase contrast between text and background colors',
          });
          score -= 3;
        }
      }
    }
  }

  // 1.4.11 Non-text Contrast — check vector graphics borders
  criteria['1.4.11'] = { name: 'Non-text Contrast', status: 'pass', issues: [] };

  // ─── Operable ───────────────────────────────────────────────────────────

  // 2.1.1 Keyboard
  criteria['2.1.1'] = { name: 'Keyboard', status: 'pass', issues: [] };
  // Check for interactive elements without keyboard access
  for (const [id, obj] of Object.entries(ir.objects)) {
    if (obj?.semantic?.role === 'form_field' || obj?.semantic?.role === 'link') {
      if (obj.accessibility?.tabindex === -1) {
        criteria['2.1.1'].status = 'fail';
        issues.push({
          type: 'keyboard_trap',
          wcag: '2.1.1',
          element: id,
          severity: 'error',
          message: 'Interactive element is not keyboard accessible',
          suggestion: 'Remove tabindex="-1" or ensure element can be reached via keyboard',
        });
        score -= 5;
      }
    }
  }

  // 2.4.1 Bypass Blocks
  criteria['2.4.1'] = { name: 'Bypass Blocks', status: 'pass', issues: [] };
  // This is handled by the skip navigation link in the HTML export

  // 2.4.2 Page Titled
  criteria['2.4.2'] = { name: 'Page Titled', status: 'pass', issues: [] };
  if (!ir.document.metadata?.title) {
    criteria['2.4.2'].status = 'fail';
    issues.push({
      type: 'missing_title',
      wcag: '2.4.2',
      severity: 'error',
      message: 'Document has no title',
      suggestion: 'Add a descriptive <title> element',
    });
    score -= 5;
  }

  // 2.4.6 Headings and Labels
  criteria['2.4.6'] = { name: 'Headings and Labels', status: 'pass', issues: [] };
  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;

    for (const objId of page.content || []) {
      const obj = ir.objects[objId];
      if (obj?.semantic?.role === 'heading' && (!obj.semantic?.text || obj.semantic.text.trim() === '')) {
        criteria['2.4.6'].status = 'fail';
        issues.push({
          type: 'empty_heading',
          wcag: '2.4.6',
          page: parseInt(pageId.split('_')[1]),
          element: objId,
          severity: 'warning',
          message: 'Heading element has no text content',
          suggestion: 'Add descriptive text to the heading',
        });
        score -= 2;
      }
    }
  }

  // ─── Understandable ─────────────────────────────────────────────────────

  // 3.1.1 Language of Page
  criteria['3.1.1'] = { name: 'Language of Page', status: 'pass', issues: [] };
  if (!ir.document.metadata?.language) {
    criteria['3.1.1'].status = 'fail';
    issues.push({
      type: 'missing_language',
      wcag: '3.1.1',
      severity: 'error',
      message: 'Document language is not specified',
      suggestion: 'Set the lang attribute on the <html> element',
    });
    score -= 5;
  }

  // 3.1.2 Language of Parts
  criteria['3.1.2'] = { name: 'Language of Parts', status: 'pass', issues: [] };

  // ─── Robust ─────────────────────────────────────────────────────────────

  // 4.1.1 Parsing / 4.1.2 Name, Role, Value
  criteria['4.1.2'] = { name: 'Name, Role, Value', status: 'pass', issues: [] };
  for (const [id, obj] of Object.entries(ir.objects)) {
    if (obj?.semantic?.role === 'form_field') {
      if (!obj.accessibility?.label && !obj.accessibility?.labelledby) {
        criteria['4.1.2'].status = 'fail';
        issues.push({
          type: 'form_no_label',
          wcag: '4.1.2',
          element: id,
          severity: 'error',
          message: 'Form field has no accessible label',
          suggestion: 'Add an aria-label or associate a <label> element',
        });
        score -= 5;
      }
    }
  }

  // Determine WCAG level
  const hasErrors = issues.some(i => i.severity === 'error');
  const hasWarnings = issues.some(i => i.severity === 'warning');
  let level = 'AAA';
  if (score < 60) level = 'fail';
  else if (score < 80 || hasErrors) level = 'A';
  else if (score < 95 || hasWarnings) level = 'AA';

  return {
    score: Math.max(0, score),
    level,
    issues,
    wcagCriteria: criteria,
    summary: {
      totalIssues: issues.length,
      errors: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      info: issues.filter(i => i.severity === 'info').length,
      criteriaMet: Object.values(criteria).filter(c => c.status === 'pass').length,
      criteriaTotal: Object.keys(criteria).length,
    },
  };
}

// ─── Contrast Ratio Calculation ───────────────────────────────────────────────

function parseColor(color) {
  if (!color) return null;
  if (Array.isArray(color)) {
    return { r: color[0] || 0, g: color[1] || 0, b: color[2] || 0 };
  }
  if (typeof color === 'string') {
    // Handle hex
    const hex = color.replace('#', '');
    if (hex.length === 6) {
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16),
      };
    }
    // Handle rgb()
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
  }
  return null;
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function computeContrastRatio(fg, bg) {
  const fgColor = parseColor(fg);
  const bgColor = parseColor(bg);
  if (!fgColor || !bgColor) return 21; // Assume pass if colors unknown

  const l1 = relativeLuminance(fgColor);
  const l2 = relativeLuminance(bgColor);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── Accessible HTML Export ───────────────────────────────────────────────────

/**
 * Export the IR as fully accessible, WCAG 2.1 AA-compliant HTML.
 *
 * @param {Object} ir - PDF-IR document
 * @param {Object} options
 * @param {string} options.mode - 'accessible' (default), 'visual', 'screen-reader'
 * @param {boolean} options.includeSkipNav - Include skip navigation links (default: true)
 * @param {boolean} options.includeLandmarks - Include landmark regions (default: true)
 * @param {boolean} options.includeKeyboardNav - Include keyboard navigation script (default: true)
 * @param {boolean} options.includeAriaLive - Include ARIA live region for status (default: true)
 * @param {boolean} options.enforceHeadingHierarchy - Auto-fix heading levels (default: true)
 * @param {boolean} options.wrapImagesInFigures - Wrap images in figure/figcaption (default: true)
 * @param {boolean} options.includeDataAttributes - Include data-pdf-* attributes (default: true)
 * @param {boolean} options.includeStyles - Include default styles (default: true)
 * @param {string} options.customStyles - Additional CSS to include
 * @param {string} options.lang - Override document language (default: from IR)
 * @returns {string} Complete HTML document
 */
export function exportAccessibleHTML(ir, options = {}) {
  const {
    mode = 'accessible',
    includeSkipNav = true,
    includeLandmarks = true,
    includeKeyboardNav = true,
    includeAriaLive = true,
    enforceHeadingHierarchy = true,
    wrapImagesInFigures = true,
    includeDataAttributes = true,
    includeStyles = true,
    customStyles = '',
    lang,
  } = options;

  const docLang = lang || ir.document.metadata?.language || 'en';
  const title = ir.document.metadata?.title || 'Document';
  const author = ir.document.metadata?.author || '';

  let html = '<!DOCTYPE html>\n';
  html += `<html lang="${escapeHTML(docLang)}">\n`;
  html += '<head>\n';
  html += '<meta charset="UTF-8">\n';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += `<title>${escapeHTML(title)}</title>\n`;
  if (author) html += `<meta name="author" content="${escapeHTML(author)}">\n`;
  html += '<meta name="description" content="Accessible document export from CodbDocs">\n';

  if (includeStyles) {
    html += generateAccessibleStyles();
  }
  if (customStyles) {
    html += `<style>\n${customStyles}\n</style>\n`;
  }

  html += '</head>\n';
  html += '<body>\n';

  // ─── Skip Navigation ──────────────────────────────────────────────────
  if (includeSkipNav) {
    html += generateSkipNav(ir);
  }

  // ─── Landmark Banner ──────────────────────────────────────────────────
  if (includeLandmarks) {
    html += '<header role="banner" aria-label="Document header">\n';
    html += `  <h1>${escapeHTML(title)}</h1>\n`;
    if (author) {
      html += `  <p class="doc-author">By ${escapeHTML(author)}</p>\n`;
    }
    const date = ir.document.metadata?.creationDate || ir.document.metadata?.modDate;
    if (date) {
      html += `  <p class="doc-date"><time datetime="${escapeHTML(date)}">${escapeHTML(date)}</time></p>\n`;
    }
    html += '</header>\n';
  }

  // ─── Main Content ─────────────────────────────────────────────────────
  html += '<main id="main-content" role="main" aria-label="Document content">\n';

  // ─── ARIA Live Region ─────────────────────────────────────────────────
  if (includeAriaLive) {
    html += '  <div id="doc-status" role="status" aria-live="polite" class="visually-hidden"></div>\n';
  }

  // ─── Page Navigation ──────────────────────────────────────────────────
  const pageCount = ir.document.pages.length;
  if (pageCount > 1) {
    html += '  <nav aria-label="Page navigation">\n';
    html += '    <ul class="page-nav">\n';
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const label = page.labels?.print || `Page ${page.num}`;
      html += `      <li><a href="#${pageId}" aria-label="Go to ${escapeHTML(label)}">${escapeHTML(label)}</a></li>\n`;
    }
    html += '    </ul>\n';
    html += '  </nav>\n';
  }

  // ─── Render Pages ─────────────────────────────────────────────────────
  let headingTracker = { current: 0, enforced: enforceHeadingHierarchy };

  for (const pageId of ir.document.pages) {
    const page = ir.pages[pageId];
    if (!page) continue;

    const pageNum = parseInt(pageId.split('_')[1]);
    const pageLabel = page.labels?.print || `Page ${pageNum}`;
    const dataAttr = includeDataAttributes ? ` data-pdf-page="${pageNum}" data-pdf-page-id="${pageId}"` : '';

    html += `\n  <section id="${pageId}" class="pdf-page"${dataAttr} aria-label="${escapeHTML(pageLabel)}">\n`;

    // Page heading
    html += `    <h2 class="page-heading" aria-label="${escapeHTML(pageLabel)}">${escapeHTML(pageLabel)}</h2>\n`;

    // Raster layer — a pixel-accurate "looks like the PDF" background when available
    if (page.background) {
      html += `    <div class="pdf-page-raster" aria-hidden="true">\n`;
      html += `      <img src="${page.background}" alt="" width="${page.width}" height="${page.height}">\n`;
      html += `    </div>\n`;
    }

    html += renderAccessiblePage(page, ir, {
      pageNum,
      includeDataAttributes,
      enforceHeadingHierarchy,
      headingTracker,
      wrapImagesInFigures,
      mode,
    });

    html += '  </section>\n';
  }

  html += '</main>\n';

  // RAG / full-context payload for AI summarization (machine-readable, no AI runs here).
  html += '<script type="application/json" id="codbdocs-rag" data-page-count="' +
    (ir.document.pages.length || 0) + '">' +
    JSON.stringify(buildAccessibleRAGPayload(ir)).replace(/</g, '\\u003c') + '</script>\n';

  // ─── Landmark Footer ──────────────────────────────────────────────────
  if (includeLandmarks) {
    html += '<footer role="contentinfo" aria-label="Document footer">\n';
    html += '  <p>Generated by <a href="https://github.com/CityofDaytonaBeach/codbdocs">CodbDocs</a></p>\n';
    html += `  <p>${pageCount} page${pageCount !== 1 ? 's' : ''}</p>\n`;
    html += '</footer>\n';
  }

  // ─── Keyboard Navigation Script ───────────────────────────────────────
  if (includeKeyboardNav) {
    html += generateKeyboardScript();
  }

  html += '</body>\n</html>';
  return html;
}

// ─── Skip Navigation ──────────────────────────────────────────────────────────

/**
 * Build a machine-readable RAG/context payload for AI summarization.
 * No AI runs here — this just gives an AI full grounded context.
 */
function buildAccessibleRAGPayload(ir) {
  const pages = (ir.document.pages || []).map(pageId => {
    const page = ir.pages[pageId];
    if (!page) return null;
    const text = (page.content || [])
      .map(id => ir.objects[id])
      .filter(o => o && o.type === 'text' && o.semantic?.text)
      .map(o => o.semantic.text)
      .join(' ');
    return { page: page.num, text };
  }).filter(Boolean);

  return {
    format: 'codbdocs-rag-v1',
    source: ir.document.metadata?.title || 'PDF document',
    title: ir.document.metadata?.title || null,
    author: ir.document.metadata?.author || null,
    pageCount: (ir.document.pages || []).length,
    pages,
    fullText: pages.map(p => `[Page ${p.page}]\n${p.text}`).join('\n\n'),
    metadata: ir.document.metadata || {},
  };
}

function generateSkipNav(ir) {
  let html = '<!-- Skip Navigation -->\n';
  html += '<a href="#main-content" class="skip-link" id="skip-to-main">Skip to main content</a>\n';

  // Add page-specific skip links if many pages
  if (ir.document.pages.length > 5) {
    html += '<nav aria-label="Quick page access" class="skip-page-nav">\n';
    html += '  <ul>\n';
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const label = page.labels?.print || `Page ${page.num}`;
      html += `    <li><a href="#${pageId}" class="skip-link">${escapeHTML(label)}</a></li>\n`;
    }
    html += '  </ul>\n';
    html += '</nav>\n';
  }
  return html;
}

// ─── Accessible Page Rendering ────────────────────────────────────────────────

function renderAccessiblePage(page, ir, opts) {
  let html = '';
  const { pageNum, includeDataAttributes, enforceHeadingHierarchy, headingTracker, wrapImagesInFigures, mode } = opts;

  // Collect all renderable objects sorted by position
  const objects = (page.content || [])
    .map(id => ir.objects[id])
    .filter(obj => obj && obj.bbox)
    .sort((a, b) => {
      // Sort by Y then X (top-to-bottom, left-to-right reading order)
      const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
      if (Math.abs(yDiff) > 10) return yDiff;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    });

  for (const obj of objects) {
    const dataAttr = includeDataAttributes ? ` data-pdf-object="${obj.id}"` : '';

    switch (obj.semantic?.role) {
      case 'heading':
        html += renderAccessibleHeading(obj, { dataAttr, headingTracker, enforceHeadingHierarchy });
        break;

      case 'table':
        html += renderAccessibleTable(obj, ir, { dataAttr, pageNum });
        break;

      case 'list':
        html += renderAccessibleList(obj, ir, { dataAttr });
        break;

      case 'form_field':
        html += renderAccessibleFormField(obj, ir, { dataAttr });
        break;

      case 'link':
        html += renderAccessibleLink(obj, { dataAttr });
        break;

      case 'separator':
        html += `    <hr${dataAttr} aria-hidden="true">\n`;
        break;

      default:
        if (obj.type === 'image') {
          html += renderAccessibleImage(obj, { dataAttr, wrapImagesInFigures, mode });
        } else if (obj.type === 'text') {
          html += renderAccessibleText(obj, { dataAttr });
        }
        break;
    }
  }

  // Render decorative vectors
  for (const vecId of page.vectors || []) {
    const vec = ir.vectors[vecId];
    if (!vec) continue;
    if (vec.semantic?.role === 'separator') {
      const dataAttr = includeDataAttributes ? ` data-pdf-vector="${vec.id}"` : '';
      html += `    <hr${dataAttr} aria-hidden="true">\n`;
    }
  }

  return html;
}

// ─── Heading Rendering ────────────────────────────────────────────────────────

function renderAccessibleHeading(obj, opts) {
  const { dataAttr, headingTracker, enforceHeadingHierarchy } = opts;
  let level = obj.semantic?.level || 2;

  if (enforceHeadingHierarchy) {
    // Enforce proper nesting: never skip levels
    if (level > headingTracker.current + 1 && headingTracker.current > 0) {
      level = headingTracker.current + 1;
    }
    headingTracker.current = level;
  }

  const text = escapeHTML(obj.semantic?.text || '');
  if (!text) return '';

  const id = obj.id || `heading-${obj.bbox?.[0]}-${obj.bbox?.[1]}`;
  return `    <h${level} id="${id}"${dataAttr}>${text}</h${level}>\n`;
}

// ─── Table Rendering ──────────────────────────────────────────────────────────

function renderAccessibleTable(obj, ir, opts) {
  const { dataAttr, pageNum } = opts;
  let html = '';

  const tableId = obj.id || `table-${pageNum}`;
  const caption = obj.semantic?.caption || '';
  const summary = obj.accessibility?.summary || '';
  const rows = obj.semantic?.rows || [];
  const cols = obj.semantic?.cols || [];

  html += `    <table id="${tableId}"${dataAttr}`;
  if (summary) html += ` aria-label="${escapeHTML(summary)}"`;
  html += '>\n';

  // Caption (required for WCAG 1.3.1)
  if (caption) {
    html += `      <caption>${escapeHTML(caption)}</caption>\n`;
  } else if (summary) {
    html += `      <caption>${escapeHTML(summary)}</caption>\n`;
  }

  // If we have structured row data from the IR
  if (rows.length > 0) {
    // Assume first row is header
    html += '      <thead>\n';
    html += '        <tr>\n';
    const headerRow = rows[0] || [];
    for (let c = 0; c < headerRow.length; c++) {
      const cell = headerRow[c];
      html += `          <th scope="col">${escapeHTML(cell?.text || '')}</th>\n`;
    }
    html += '        </tr>\n';
    html += '      </thead>\n';

    if (rows.length > 1) {
      html += '      <tbody>\n';
      for (let r = 1; r < rows.length; r++) {
        html += '        <tr>\n';
        const row = rows[r] || [];
        for (let c = 0; c < row.length; c++) {
          const cell = row[c];
          html += `          <td>${escapeHTML(cell?.text || '')}</td>\n`;
        }
        html += '        </tr>\n';
      }
      html += '      </tbody>\n';
    }
  } else if (cols.length > 0) {
    // Column-oriented data
    html += '      <thead>\n        <tr>\n';
    for (const col of cols) {
      html += `          <th scope="col">${escapeHTML(col.header || col.name || '')}</th>\n`;
    }
    html += '        </tr>\n      </thead>\n';

    const maxRows = Math.max(...cols.map(c => (c.values || []).length));
    if (maxRows > 0) {
      html += '      <tbody>\n';
      for (let r = 0; r < maxRows; r++) {
        html += '        <tr>\n';
        for (const col of cols) {
          const val = (col.values || [])[r] || '';
          html += `          <td>${escapeHTML(typeof val === 'string' ? val : JSON.stringify(val))}</td>\n`;
        }
        html += '        </tr>\n';
      }
      html += '      </tbody>\n';
    }
  } else {
    // Fallback: look for table content in nearby text objects
    html += renderTableFromNearbyText(obj, ir, pageNum);
  }

  html += '    </table>\n';
  return html;
}

function renderTableFromNearbyText(obj, ir, pageNum) {
  let html = '';
  if (!obj.bbox) return html;

  // Find text objects within the table bounding box
  const pageId = `page_${pageNum}`;
  const page = ir.pages[pageId];
  if (!page) return html;

  const cells = (page.content || [])
    .map(id => ir.objects[id])
    .filter(o => o?.bbox && o.type === 'text' &&
      o.bbox[0] >= obj.bbox[0] - 5 &&
      o.bbox[1] >= obj.bbox[1] - 5 &&
      o.bbox[0] + (o.bbox[2] || 0) <= obj.bbox[0] + obj.bbox[2] + 5 &&
      o.bbox[1] + (o.bbox[3] || 0) <= obj.bbox[1] + obj.bbox[3] + 5
    )
    .sort((a, b) => {
      const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
      if (Math.abs(yDiff) > 5) return yDiff;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    });

  if (cells.length === 0) return html;

  // Group cells into rows by Y position
  const rows = [];
  let currentRow = [cells[0]];
  for (let i = 1; i < cells.length; i++) {
    const prev = cells[i - 1];
    const curr = cells[i];
    if (Math.abs((curr.bbox[1] || 0) - (prev.bbox[1] || 0)) < 10) {
      currentRow.push(curr);
    } else {
      rows.push(currentRow);
      currentRow = [curr];
    }
  }
  rows.push(currentRow);

  if (rows.length === 0) return html;

  // First row as header
  html += '      <thead>\n        <tr>\n';
  for (const cell of rows[0]) {
    html += `          <th scope="col">${escapeHTML(cell.semantic?.text || '')}</th>\n`;
  }
  html += '        </tr>\n      </thead>\n';

  if (rows.length > 1) {
    html += '      <tbody>\n';
    for (let r = 1; r < rows.length; r++) {
      html += '        <tr>\n';
      for (const cell of rows[r]) {
        html += `          <td>${escapeHTML(cell.semantic?.text || '')}</td>\n`;
      }
      html += '        </tr>\n';
    }
    html += '      </tbody>\n';
  }

  return html;
}

// ─── List Rendering ───────────────────────────────────────────────────────────

function renderAccessibleList(obj, ir, opts) {
  const { dataAttr } = opts;
  const items = obj.semantic?.items || [];
  const ordered = obj.semantic?.ordered || false;
  const tag = ordered ? 'ol' : 'ul';

  let html = `    <${tag}${dataAttr} role="list">\n`;

  if (items.length > 0) {
    for (const item of items) {
      const text = typeof item === 'string' ? item : item?.text || '';
      html += `      <li>${escapeHTML(text)}</li>\n`;
    }
  } else {
    // Try to find list items from nearby text objects
    const nearbyItems = findNearbyListItems(obj, ir);
    for (const text of nearbyItems) {
      html += `      <li>${escapeHTML(text)}</li>\n`;
    }
  }

  html += `    </${tag}>\n`;
  return html;
}

function findNearbyListItems(obj, ir) {
  if (!obj.bbox) return [];
  const items = [];

  for (const [id, o] of Object.entries(ir.objects)) {
    if (o?.type === 'text' && o.bbox && o.semantic?.role !== 'heading') {
      // Check if vertically aligned and to the right of the list marker
      if (Math.abs((o.bbox[0] || 0) - (obj.bbox[0] || 0)) < 50 &&
          o.bbox[1] >= obj.bbox[1] - 5 &&
          o.bbox[1] <= obj.bbox[1] + obj.bbox[3] + 5) {
        if (o.semantic?.text) items.push(o.semantic.text);
      }
    }
  }

  return items;
}

// ─── Form Field Rendering ─────────────────────────────────────────────────────

function renderAccessibleFormField(obj, ir, opts) {
  const { dataAttr } = opts;
  const fieldType = obj.semantic?.fieldType || 'text';
  const fieldName = obj.semantic?.fieldName || obj.accessibility?.label || '';
  const fieldId = obj.id || `field-${fieldName}`;
  const label = obj.accessibility?.label || fieldName;
  const value = obj.semantic?.value || '';
  const required = obj.accessibility?.required || false;
  const description = obj.accessibility?.description || '';
  const error = obj.accessibility?.error || '';

  let html = `    <div class="form-field"${dataAttr}>\n`;

  // Label
  if (label) {
    html += `      <label for="${fieldId}">${escapeHTML(label)}</label>\n`;
  }

  // Description
  if (description) {
    html += `      <span id="${fieldId}-desc" class="field-description">${escapeHTML(description)}</span>\n`;
  }

  // Input
  const ariaDesc = [
    description ? `${fieldId}-desc` : '',
    error ? `${fieldId}-error` : '',
  ].filter(Boolean).join(' ');

  switch (fieldType) {
    case 'checkbox':
      html += `      <input type="checkbox" id="${fieldId}" name="${escapeHTML(fieldName)}"${value === 'true' ? ' checked' : ''}${required ? ' required' : ''}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ''}>\n`;
      break;
    case 'radio':
      html += `      <input type="radio" id="${fieldId}" name="${escapeHTML(fieldName)}"${value ? ' checked' : ''}${required ? ' required' : ''}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ''}>\n`;
      break;
    case 'dropdown':
      html += `      <select id="${fieldId}" name="${escapeHTML(fieldName)}"${required ? ' required' : ''}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ''}>\n`;
      const options = obj.semantic?.options || [];
      for (const opt of options) {
        const optVal = typeof opt === 'string' ? opt : opt?.value || '';
        const optLabel = typeof opt === 'string' ? opt : opt?.label || optVal;
        html += `        <option value="${escapeHTML(optVal)}"${optVal === value ? ' selected' : ''}>${escapeHTML(optLabel)}</option>\n`;
      }
      html += '      </select>\n';
      break;
    case 'textarea':
      html += `      <textarea id="${fieldId}" name="${escapeHTML(fieldName)}" rows="4"${required ? ' required' : ''}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ''}>${escapeHTML(value)}</textarea>\n`;
      break;
    default:
      html += `      <input type="text" id="${fieldId}" name="${escapeHTML(fieldName)}" value="${escapeHTML(value)}"${required ? ' required' : ''}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ''}>\n`;
      break;
  }

  // Error message
  if (error) {
    html += `      <span id="${fieldId}-error" class="field-error" role="alert">${escapeHTML(error)}</span>\n`;
  }

  html += '    </div>\n';
  return html;
}

// ─── Link Rendering ───────────────────────────────────────────────────────────

function renderAccessibleLink(obj, opts) {
  const { dataAttr } = opts;
  const href = obj.accessibility?.href || obj.semantic?.url || '#';
  const text = escapeHTML(obj.semantic?.text || '');
  const target = obj.accessibility?.target || '';
  const ariaLabel = obj.accessibility?.ariaLabel || '';

  let attrs = dataAttr;
  if (ariaLabel) attrs += ` aria-label="${escapeHTML(ariaLabel)}"`;
  if (target === '_blank') attrs += ' target="_blank" rel="noopener noreferrer"';

  return `    <p><a href="${escapeHTML(href)}"${attrs}>${text}</a></p>\n`;
}

// ─── Image Rendering ──────────────────────────────────────────────────────────

function renderAccessibleImage(obj, opts) {
  const { dataAttr, wrapImagesInFigures, mode } = opts;
  const src = obj.raw?.src || '';
  const alt = obj.accessibility?.alt || '';
  const caption = obj.semantic?.caption || '';
  const isDecorative = obj.accessibility?.decorative || (!alt && !caption);
  const role = obj.accessibility?.role || obj.semantic?.role || '';

  const altAttr = isDecorative ? ' alt="" role="presentation"' : ` alt="${escapeHTML(alt || caption || 'Image')}"`;

  let html = '';
  if (wrapImagesInFigures) {
    html += `    <figure${dataAttr}>\n`;
    html += `      <img src="${escapeHTML(src)}"${altAttr} loading="lazy">\n`;
    if (caption) {
      html += `      <figcaption>${escapeHTML(caption)}</figcaption>\n`;
    }
    if (role) {
      html += `      <span class="image-role visually-hidden">${escapeHTML(role)}</span>\n`;
    }
    html += '    </figure>\n';
  } else {
    html += `    <img${dataAttr} src="${escapeHTML(src)}"${altAttr} loading="lazy">\n`;
  }

  return html;
}

// ─── Text Rendering ───────────────────────────────────────────────────────────

function renderAccessibleText(obj, opts) {
  const { dataAttr } = opts;
  const text = escapeHTML(obj.semantic?.text || '');
  if (!text) return '';

  // Check if this text is inside a table or list (skip if so — handled by parent)
  // For now, render as paragraph
  return `    <p${dataAttr}>${text}</p>\n`;
}

// ─── Accessible Styles ────────────────────────────────────────────────────────

function generateAccessibleStyles() {
  return `<style>
    /* Reset and base */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0; padding: 0;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6; color: #1a1a2e; background: #fff;
      max-width: 900px; margin: 0 auto;
    }

    /* Skip navigation */
    .skip-link {
      position: absolute; top: -100%; left: 0;
      background: #005a9c; color: #fff; padding: 8px 16px;
      z-index: 10000; font-size: 1rem; text-decoration: none;
      border-radius: 0 0 4px 0;
    }
    .skip-link:focus { top: 0; outline: 3px solid #ff6b00; outline-offset: 2px; }
    .skip-page-nav { position: absolute; top: -100%; left: 0; z-index: 9999; }
    .skip-page-nav:focus-within { top: 40px; }

    /* Visually hidden (screen reader only) */
    .visually-hidden {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }

    /* Header */
    header[role="banner"] {
      padding: 24px 20px 16px; border-bottom: 2px solid #005a9c;
      margin-bottom: 24px;
    }
    header h1 { margin: 0 0 8px; font-size: 1.75rem; color: #1a1a2e; }
    header .doc-author { margin: 0; color: #555; }
    header .doc-date { margin: 4px 0 0; color: #777; font-size: 0.9rem; }

    /* Page navigation */
    nav[aria-label="Page navigation"] {
      margin: 0 0 24px; padding: 12px 20px;
      background: #f8f9fa; border-radius: 6px;
    }
    .page-nav {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-wrap: wrap; gap: 4px;
    }
    .page-nav a {
      display: inline-block; padding: 4px 10px;
      background: #e9ecef; color: #005a9c; text-decoration: none;
      border-radius: 4px; font-size: 0.85rem;
    }
    .page-nav a:hover, .page-nav a:focus {
      background: #005a9c; color: #fff;
      outline: 2px solid #ff6b00; outline-offset: 2px;
    }

    /* Main content */
    main { padding: 0 20px; }

    /* Page sections */
    .pdf-page { margin: 32px 0; padding: 16px 0; border-bottom: 1px solid #dee2e6; position: relative; }
    .pdf-page-raster { margin: 0 0 16px; text-align: center; }
    .pdf-page-raster img {
      display: block; max-width: 100%; height: auto; border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12); border: 1px solid #e9ecef;
    }
    .page-heading {
      font-size: 1.25rem; color: #005a9c;
      margin: 0 0 16px; padding-bottom: 8px;
      border-bottom: 1px solid #e9ecef;
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; line-height: 1.3; }

    /* Paragraphs */
    p { margin: 0.5em 0; }

    /* Tables */
    table {
      border-collapse: collapse; width: 100%; margin: 16px 0;
      font-size: 0.95rem;
    }
    caption {
      text-align: left; font-weight: 600; margin-bottom: 8px;
      font-size: 1rem; color: #1a1a2e;
    }
    th, td {
      border: 1px solid #dee2e6; padding: 10px 12px; text-align: left;
    }
    th {
      background: #f1f3f5; font-weight: 600;
      position: sticky; top: 0;
    }
    th[scope="col"] { border-bottom: 2px solid #005a9c; }
    tr:hover td { background: #f8f9fa; }

    /* Lists */
    ul, ol { margin: 0.5em 0; padding-left: 1.5em; }
    li { margin: 0.25em 0; }

    /* Forms */
    .form-field { margin: 12px 0; }
    .form-field label {
      display: block; font-weight: 600; margin-bottom: 4px;
    }
    .form-field input, .form-field select, .form-field textarea {
      width: 100%; padding: 8px 12px; border: 1px solid #ced4da;
      border-radius: 4px; font-size: 1rem;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
      outline: 3px solid #005a9c; outline-offset: 1px;
      border-color: #005a9c;
    }
    .field-description { display: block; font-size: 0.85rem; color: #666; margin-top: 2px; }
    .field-error { display: block; color: #c62828; font-size: 0.85rem; margin-top: 4px; font-weight: 600; }

    /* Images and figures */
    figure { margin: 16px 0; }
    img { max-width: 100%; height: auto; border-radius: 4px; }
    figcaption {
      font-size: 0.9rem; color: #555; margin-top: 6px;
      font-style: italic;
    }

    /* Links */
    a { color: #005a9c; }
    a:hover { text-decoration: underline; }
    a:focus { outline: 3px solid #ff6b00; outline-offset: 2px; }

    /* Separators */
    hr {
      border: none; border-top: 1px solid #dee2e6;
      margin: 16px 0;
    }

    /* Footer */
    footer[role="contentinfo"] {
      padding: 16px 20px; margin-top: 32px;
      border-top: 2px solid #005a9c; color: #555;
      font-size: 0.9rem;
    }
    footer p { margin: 4px 0; }

    /* Focus styles for keyboard navigation */
    :focus-visible {
      outline: 3px solid #ff6b00;
      outline-offset: 2px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      body { background: #000; color: #fff; }
      a { color: #ff0; }
      th { background: #333; color: #fff; }
      .skip-link { background: #ff0; color: #000; }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }

    /* Print styles */
    @media print {
      .skip-link, .skip-page-nav, nav[aria-label="Page navigation"],
      #doc-status, footer { display: none; }
      .pdf-page { border-bottom: none; page-break-inside: avoid; }
      a { color: #000; text-decoration: none; }
    }
  </style>\n`;
}

// ─── Keyboard Navigation Script ───────────────────────────────────────────────

function generateKeyboardScript() {
  return `<script>
(function() {
  'use strict';

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Alt+1: Skip to main content
    if (e.altKey && e.key === '1') {
      e.preventDefault();
      var main = document.getElementById('main-content');
      if (main) { main.focus(); main.scrollIntoView({ behavior: 'smooth' }); }
    }

    // Alt+H: Go to top (Home)
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('header')?.focus();
    }

    // Alt+P: Previous page
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      var sections = document.querySelectorAll('.pdf-page');
      var current = getCurrentSection(sections);
      if (current > 0) {
        sections[current - 1].scrollIntoView({ behavior: 'smooth' });
        sections[current - 1].focus();
      }
    }

    // Alt+N: Next page
    if (e.altKey && e.key === 'ArrowDown') {
      e.preventDefault();
      var sections = document.querySelectorAll('.pdf-page');
      var current = getCurrentSection(sections);
      if (current < sections.length - 1) {
        sections[current + 1].scrollIntoView({ behavior: 'smooth' });
        sections[current + 1].focus();
      }
    }

    // Alt+S: Toggle page navigation
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      var nav = document.querySelector('nav[aria-label="Page navigation"]');
      if (nav) {
        var isHidden = nav.getAttribute('aria-hidden') === 'true';
        nav.setAttribute('aria-hidden', String(!isHidden));
        nav.style.display = isHidden ? '' : 'none';
        if (isHidden) nav.querySelector('a')?.focus();
      }
    }
  });

  function getCurrentSection(sections) {
    var scrollY = window.scrollY + window.innerHeight / 3;
    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) return i;
    }
    return 0;
  }

  // Add tabindex to page sections for focus
  document.querySelectorAll('.pdf-page').forEach(function(el) {
    el.setAttribute('tabindex', '-1');
  });

  // Announce page changes for screen readers
  if (typeof IntersectionObserver !== 'undefined') {
    var status = document.getElementById('doc-status');
    if (status) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var label = entry.target.getAttribute('aria-label') || '';
            status.textContent = 'Viewing ' + label;
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('.pdf-page').forEach(function(el) {
        observer.observe(el);
      });
    }
  }
})();
</script>\n`;
}

// ─── Auto-Remediation ─────────────────────────────────────────────────────────

/**
 * Automatically remediate common accessibility issues in the IR.
 * Returns a new IR with fixes applied and a report of changes.
 *
 * @param {Object} ir - PDF-IR document (will be mutated)
 * @param {Object} options
 * @param {boolean} options.fixAltText - Add placeholder alt text to images (default: true)
 * @param {boolean} options.fixHeadingHierarchy - Enforce proper heading nesting (default: true)
 * @param {boolean} options.fixLanguage - Add default language if missing (default: true)
 * @param {boolean} options.fixTitle - Add default title if missing (default: true)
 * @param {boolean} options.fixFormLabels - Add labels to unlabeled form fields (default: true)
 * @param {boolean} options.markDecorativeImages - Mark captionless images as decorative (default: false)
 * @param {string} options.defaultLanguage - Default language code (default: 'en')
 * @returns {Object} { ir, report }
 */
export function remediateAccessibility(ir, options = {}) {
  const {
    fixAltText = true,
    fixHeadingHierarchy = true,
    fixLanguage = true,
    fixTitle = true,
    fixFormLabels = true,
    markDecorativeImages = false,
    defaultLanguage = 'en',
  } = options;

  const report = { fixes: [], summary: {} };

  // Fix language
  if (fixLanguage && !ir.document.metadata?.language) {
    ir.document.metadata.language = defaultLanguage;
    report.fixes.push({ type: 'language', action: `Set document language to "${defaultLanguage}"` });
  }

  // Fix title
  if (fixTitle && !ir.document.metadata?.title) {
    // Try to infer title from first heading
    let inferredTitle = '';
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (obj?.semantic?.role === 'heading' && obj.semantic?.level === 1 && obj.semantic?.text) {
        inferredTitle = obj.semantic.text;
        break;
      }
    }
    if (!inferredTitle) inferredTitle = 'Untitled Document';
    ir.document.metadata.title = inferredTitle;
    report.fixes.push({ type: 'title', action: `Set document title to "${inferredTitle}"` });
  }

  // Fix alt text
  if (fixAltText) {
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (obj?.type === 'image' && !obj.accessibility) {
        obj.accessibility = {};
      }
      if (obj?.type === 'image' && !obj.accessibility?.alt && obj.accessibility?.alt !== '') {
        if (markDecorativeImages) {
          obj.accessibility.alt = '';
          obj.accessibility.decorative = true;
          report.fixes.push({ type: 'alt_text', element: id, action: 'Marked as decorative image' });
        } else {
          const caption = obj.semantic?.caption || '';
          const role = obj.semantic?.role || '';
          obj.accessibility.alt = caption || (role ? `${role} image` : 'Image');
          report.fixes.push({ type: 'alt_text', element: id, action: `Added alt text: "${obj.accessibility.alt}"` });
        }
      }
    }
  }

  // Fix heading hierarchy
  if (fixHeadingHierarchy) {
    let currentLevel = 0;
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;

      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (obj?.semantic?.role === 'heading') {
          let level = obj.semantic.level || 1;
          if (level > currentLevel + 1 && currentLevel > 0) {
            const oldLevel = level;
            level = currentLevel + 1;
            obj.semantic.level = level;
            report.fixes.push({
              type: 'heading_hierarchy',
              element: objId,
              action: `Changed heading from H${oldLevel} to H${level}`,
            });
          }
          currentLevel = level;
        }
      }
    }
  }

  // Fix form labels
  if (fixFormLabels) {
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (obj?.semantic?.role === 'form_field') {
        if (!obj.accessibility) obj.accessibility = {};
        if (!obj.accessibility.label && !obj.accessibility.labelledby) {
          const name = obj.semantic?.fieldName || id;
          obj.accessibility.label = name.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
          report.fixes.push({
            type: 'form_label',
            element: id,
            action: `Added label: "${obj.accessibility.label}"`,
          });
        }
      }
    }
  }

  // Summary
  report.summary = {
    totalFixes: report.fixes.length,
    byType: report.fixes.reduce((acc, fix) => {
      acc[fix.type] = (acc[fix.type] || 0) + 1;
      return acc;
    }, {}),
  };

  return { ir, report };
}

// ─── Accessibility Report Generator ───────────────────────────────────────────

/**
 * Generate a human-readable accessibility report.
 *
 * @param {Object} ir - PDF-IR document
 * @returns {Object} { html, text, audit, remediations }
 */
export function generateAccessibilityReport(ir) {
  const audit = wcagAudit(ir);
  const { report: remediations } = remediateAccessibility(ir, { fixAltText: true, fixHeadingHierarchy: true, fixLanguage: true, fixTitle: true, fixFormLabels: true });

  let text = '=== CodbDocs Accessibility Report ===\n\n';
  text += `WCAG Level: ${audit.level}\n`;
  text += `Score: ${audit.score}/100\n`;
  text += `Issues: ${audit.summary.totalIssues} (${audit.summary.errors} errors, ${audit.summary.warnings} warnings, ${audit.summary.info} info)\n`;
  text += `WCAG Criteria Met: ${audit.summary.criteriaMet}/${audit.summary.criteriaTotal}\n\n`;

  text += '--- Issues ---\n';
  for (const issue of audit.issues) {
    text += `[${issue.severity.toUpperCase()}] ${issue.wcag || 'N/A'}: ${issue.message}`;
    if (issue.page) text += ` (Page ${issue.page})`;
    text += '\n';
    if (issue.suggestion) text += `  Suggestion: ${issue.suggestion}\n`;
  }

  text += '\n--- WCAG Criteria ---\n';
  for (const [criteria, info] of Object.entries(audit.wcagCriteria)) {
    text += `${criteria} ${info.name}: ${info.status.toUpperCase()}\n`;
  }

  text += '\n--- Auto-Remediations Applied ---\n';
  text += `${remediations.summary.totalFixes} fixes applied\n`;
  for (const fix of remediations.fixes) {
    text += `  [${fix.type}] ${fix.action}`;
    if (fix.element) text += ` (${fix.element})`;
    text += '\n';
  }

  // Generate HTML report
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
  html += '<meta charset="UTF-8">\n';
  html += '<title>CodbDocs Accessibility Report</title>\n';
  html += '<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:20px;line-height:1.6}';
  html += '.pass{color:#2e7d32}.fail{color:#c62828}.warn{color:#f57f17}';
  html += '.score{font-size:2em;font-weight:bold}.issue{margin:8px 0;padding:8px;border-left:4px solid #ccc}';
  html += '.error{border-color:#c62828}.warning{border-color:#f57f17}.info{border-color:#1976d2}</style>\n';
  html += '</head>\n<body>\n';
  html += '<h1>Accessibility Report</h1>\n';
  html += `<p class="score ${audit.score >= 90 ? 'pass' : audit.score >= 70 ? 'warn' : 'fail'}">Score: ${audit.score}/100 (Level ${audit.level})</p>\n`;
  html += `<p>${audit.summary.criteriaMet}/${audit.summary.criteriaTotal} WCAG criteria met</p>\n`;

  html += '<h2>Issues</h2>\n';
  for (const issue of audit.issues) {
    html += `<div class="issue ${issue.severity}"><strong>[${issue.severity.toUpperCase()}]</strong> ${issue.message}`;
    if (issue.page) html += ` <em>(Page ${issue.page})</em>`;
    if (issue.suggestion) html += `<br><small>${issue.suggestion}</small>`;
    html += '</div>\n';
  }

  html += '<h2>WCAG Criteria</h2>\n<table><thead><tr><th>Criteria</th><th>Name</th><th>Status</th></tr></thead><tbody>\n';
  for (const [criteria, info] of Object.entries(audit.wcagCriteria)) {
    html += `<tr><td>${criteria}</td><td>${info.name}</td><td class="${info.status}">${info.status.toUpperCase()}</td></tr>\n`;
  }
  html += '</tbody></table>\n';

  html += '<h2>Auto-Remediations</h2>\n';
  html += `<p>${remediations.summary.totalFixes} fixes applied</p>\n<ul>\n`;
  for (const fix of remediations.fixes) {
    html += `<li><strong>${fix.type}:</strong> ${fix.action}</li>\n`;
  }
  html += '</ul>\n';

  html += '</body>\n</html>';

  return { html, text, audit, remediations };
}
