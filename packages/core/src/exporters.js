/**
 * @codbdocs/core — Multi-format exporters
 *
 * Companion exporters that consume the PDF-IR (and optional content graph) and
 * produce consumable artifacts:
 *   - Markdown            (semantic, reflowed)
 *   - Reflowed text       (plain, paginated)
 *   - Full JSON           (all geometry: text runs, images, vectors, annotations,
 *                         structure, entities, reading order, tables)
 *   - RAG context         (offline machine-readable context for AI)
 *   - JSONL / CSV         (streamable RAG lines)
 *
 * All functions are pure (no DOM) and run fully offline in the browser.
 */

/**
 * Escape simple markdown special characters in plain text so user content
 * doesn't get misinterpreted as structure when it shouldn't be.
 */
/**
 * Escape bare user text for safe Markdown output WITHOUT mangling ordinary
 * punctuation (numbers like "$697,000.00", dates, ordinance "2025-63"). Only
 * backslashes/backticks and line-leading structure markers are escaped, so
 * flowing paragraphs and tabular figures stay readable.
 */
function mdEscape(text) {
  return String(text || '')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/^([#>*+\-]|\d+\.)\s*/gm, '\\$&');
}

/**
 * Build a shared full-context payload describing one document.
 * Used by both the RAG export and the HTML exporters.
 */
export function buildRAGContext(ir, contentGraph) {
  const pages = (ir.document.pages || []).map(pageId => {
    const page = ir.pages[pageId];
    if (!page) return null;

    const blocks = [];
    const objects = (page.content || [])
      .map(id => ir.objects[id])
      .filter(Boolean);

    for (const obj of objects) {
      if (obj.type === 'text' && obj.semantic?.text) {
        blocks.push({
          type: obj.semantic.role || 'text',
          text: obj.semantic.text,
          bbox: obj.bbox || null,
          fontSize: obj.raw?.fontSize || null,
          font: obj.raw?.font || null,
          color: obj.raw?.color || null,
        });
      } else if (obj.type === 'image') {
        blocks.push({
          type: 'image',
          alt: obj.accessibility?.alt || obj.semantic?.caption || '',
          caption: obj.semantic?.caption || '',
          bbox: obj.bbox || null,
          width: obj.raw?.width || null,
          height: obj.raw?.height || null,
        });
      } else if (obj.type === 'link') {
        blocks.push({
          type: 'link',
          text: obj.semantic?.text || '',
          url: obj.raw?.url || null,
          dest: obj.raw?.dest || null,
          bbox: obj.bbox || null,
        });
      }
    }

    const text = objects
      .filter(o => o.type === 'text' && o.semantic?.text)
      .map(o => o.semantic.text)
      .join(' ');

    // Map entities/reading-order from the content graph when available.
    const pageEntities = contentGraph
      ? (contentGraph.pages || []).find(pg => pg.page === page.num)?.entities || []
      : [];

    return {
      page: page.num,
      size: { width: page.width, height: page.height },
      text,
      blocks,
      entities: pageEntities,
    };
  }).filter(Boolean);

  const entityTypes = {};
  const blockTypes = {};
  const content = contentGraph || {};
  (content.allBlocks || []).forEach(b => { blockTypes[b.type] = (blockTypes[b.type] || 0) + 1; });
  (content.allEntities || []).forEach(e => { entityTypes[e.type] = (entityTypes[e.type] || 0) + 1; });

  return {
    format: 'codbdocs-rag-v2',
    source: ir.document.metadata?.title || 'PDF document',
    title: ir.document.metadata?.title || null,
    author: ir.document.metadata?.author || null,
    createdAt: ir.document.metadata?.creationDate || ir.document.metadata?.modDate || null,
    documentType: content.documentType || ir.document.type || null,
    pageCount: (ir.document.pages || []).length,
    pages,
    fullText: pages.map(p => `[Page ${p.page}]\n${p.text}`).join('\n\n'),
    blockTypes,
    entityTypes,
    tables: content.allTables ? content.allTables.map(t => t.toJSON ? t.toJSON() : t) : [],
    relationships: content.allRelationships || [],
    metadata: ir.document.metadata || {},
    security: ir.document.security ? summarizeSecurity(ir.document.security) : null,
    outline: ir.document.navigation?.outline || [],
  };
}

function summarizeSecurity(security) {
  if (!security) return null;
  const out = {};
  for (const [k, v] of Object.entries(security)) {
    if (typeof v === 'boolean' || typeof v === 'string' || typeof v === 'number') {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Group text objects into visual lines (same baseline) and then into
 * paragraphs, preserving reading order. Joins words on a line with spaces
 * so per-glyph/word text runs reassemble into real sentences.
 * bbox format is [x, y, w, h] with top-left origin (y grows downward).
 */
function flowLines(objects, { lineTolerance = 1.0 } = {}) {
  const texts = objects
    .filter(o => o && o.type === 'text' && o.semantic?.text)
    .map(o => {
      const b = o.bbox || [0, 0, 0, 0];
      return { o, x: b[0], y: b[1], w: b[2], h: b[3] || 0, cy: b[1] + (b[3] || 0) / 2 };
    });
  if (!texts.length) return [];

  const medianH = texts.map(t => t.h).sort((a, b) => a - b)[Math.floor(texts.length / 2)] || 1;
  const tol = Math.max(2, medianH * 0.45 * lineTolerance);

  // Cluster into lines by y-center. In PDF space y grows upward, so the
  // topmost lines have the largest y-center — process descending to keep
  // top-to-bottom reading order.
  const lines = [];
  const sortedByY = [...texts].sort((a, b) => b.cy - a.cy);
  for (const t of sortedByY) {
    let placed = null;
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      const lineY = line.reduce((s, x) => s + x.cy, 0) / line.length;
      if (Math.abs(t.cy - lineY) <= tol) { placed = line; break; }
    }
    if (placed) placed.push(t);
    else lines.push([t]);
  }

  // Within each line, sort left-to-right, join with spaces (collapse excess).
  const lineTexts = lines
    .map(line => line
      .sort((a, b) => a.x - b.x)
      .map(t => String(t.o.semantic.text).replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' '))
    .filter(t => t.length);

  // Group lines into paragraphs by vertical gap to respect blank lines.
  const paragraphs = [];
  for (const lt of lineTexts) paragraphs.push([lt]);
  return paragraphs;
}

/**
 * Export to Markdown — semantically structured, reflowed, IA-friendly.
 */
export function toMarkdown(ir, contentGraph) {
  const out = [];
  const title = ir.document.metadata?.title || 'Document';
  const author = ir.document.metadata?.author || '';

  out.push(`# ${title}`);
  if (author) out.push(`\n_By ${author}_`);
  out.push('');

  for (const pageId of ir.document.pages || []) {
    const page = ir.pages[pageId];
    if (!page) continue;

    const objects = (page.content || [])
      .map(id => ir.objects[id])
      .filter(Boolean)
      .sort(byReadingOrder);

    let inTable = false;
    let pending = [];
    const flush = () => {
      if (pending.length) {
        for (const par of flowLines(pending)) {
          out.push(mdEscape(par.join(' ')));
          out.push('');
        }
        pending = [];
      }
    };
    for (const obj of objects) {
      const role = obj.semantic?.role || 'text';

      if (obj.type === 'text' && obj.semantic?.text) {
        const text = String(obj.semantic.text).replace(/\s+/g, ' ').trim();
        if (!text) continue;
        switch (role) {
          case 'heading': {
            flush();
            const level = Math.min(6, Math.max(2, obj.semantic.level || 2));
            out.push(`${'#'.repeat(level)} ${mdEscape(text)}`);
            out.push('');
            break;
          }
          case 'list':
            // fall through: handled as plain text since list grouping is in content graph
          default:
            pending.push(obj);
            break;
        }
      } else if (obj.type === 'image') {
        flush();
        const alt = obj.accessibility?.alt || obj.semantic?.caption || 'Image';
        out.push(`![${mdEscape(alt)}](${obj.raw?.src ? '' : ''})`);
        if (obj.semantic?.caption) {
          out.push(`*${mdEscape(obj.semantic.caption)}*`);
        }
        out.push('');
      } else if (obj.type === 'link') {
        flush();
        const text = obj.semantic?.text || obj.raw?.url || 'link';
        const href = obj.raw?.url || obj.raw?.href || '#';
        out.push(`[${mdEscape(text)}](${href})`);
        out.push('');
      } else if (role === 'separator') {
        flush();
        out.push('---');
        out.push('');
      }
    }
    flush();
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

/**
 * Export to plain reflowed text, paginated.
 */
export function toReflowedText(ir) {
  const pages = (ir.document.pages || []).map(pageId => {
    const page = ir.pages[pageId];
    if (!page) return null;
    const objs = (page.content || [])
      .map(id => ir.objects[id])
      .filter(o => o && (o.type === 'text' || o.type === 'link') && (o.semantic?.text || o.raw?.url));
    const paragraphs = flowLines(objs).map(par => par.join(' '));
    return { page: page.num, text: paragraphs.join('\n\n') };
  }).filter(Boolean);

  return {
    pageCount: pages.length,
    pages,
    fullText: pages.map(p => `--- page ${p.page} ---\n${p.text}`).join('\n\n'),
  };
}

/**
 * Full geometric JSON dump — every object corner-to-corner, usable for
 * re-layout, search, or RAG. Includes embedded image data URLs.
 */
export function toFullJSON(ir, contentGraph) {
  const pages = (ir.document.pages || []).map(pageId => {
    const page = ir.pages[pageId];
    if (!page) return null;
    return {
      id: pageId,
      page: page.num,
      size: { width: page.width, height: page.height },
      rotation: page.rotation || 0,
      mediaBox: page.mediaBox || null,
      cropBox: page.cropBox || null,
      labels: page.labels || null,
      background: page.background || null,
      textObjects: (page.content || [])
        .map(id => ir.objects[id])
        .filter(o => o && o.type === 'text')
        .map(o => ({
          id: o.id,
          text: o.semantic?.text || '',
          role: o.semantic?.role || 'text',
          level: o.semantic?.level || null,
          bbox: o.bbox || null,
          font: o.raw?.font || null,
          fontSize: o.raw?.fontSize || null,
          color: o.raw?.color || null,
          transform: o.raw?.transform || null,
        })),
      images: (page.content || [])
        .map(id => ir.objects[id])
        .filter(o => o && o.type === 'image')
        .map(o => ({
          id: o.id,
          bbox: o.bbox || null,
          width: o.raw?.width || null,
          height: o.raw?.height || null,
          alt: o.accessibility?.alt || '',
          caption: o.semantic?.caption || '',
          src: o.raw?.src || null,
        })),
      links: (page.content || [])
        .map(id => ir.objects[id])
        .filter(o => o && o.type === 'link')
        .map(o => ({
          id: o.id,
          bbox: o.bbox || null,
          text: o.semantic?.text || '',
          url: o.raw?.url || null,
          dest: o.raw?.dest || null,
        })),
      vectors: (page.vectors || []).map(id => ir.vectors[id]).filter(Boolean),
      annotations: page.annotations || [],
      markedContent: page.markedContent || [],
      artifacts: page.artifacts || [],
    };
  }).filter(Boolean);

  const payload = {
    format: 'codbdocs-full-json',
    version: ir.version || '1.0',
    document: {
      id: ir.document.id || null,
      title: ir.document.metadata?.title || null,
      author: ir.document.metadata?.author || null,
      type: contentGraph?.documentType || ir.document.type || null,
      metadata: ir.document.metadata || {},
      security: ir.document.security || {},
      outline: ir.document.navigation?.outline || [],
      labels: ir.document.navigation?.labels || [],
    },
    pageCount: pages.length,
    pages,
  };

  // Include content-graph entities/tables/relationships if available.
  if (contentGraph) {
    payload.content = {
      documentType: contentGraph.documentType || null,
      blocks: contentGraph.allBlocks ? contentGraph.allBlocks.map(b => b.toJSON ? b.toJSON() : b) : [],
      entities: contentGraph.allEntities || [],
      tables: contentGraph.allTables ? contentGraph.allTables.map(t => t.toJSON ? t.toJSON() : t) : [],
      relationships: contentGraph.allRelationships || [],
      summary: contentGraph.getSummary ? contentGraph.getSummary() : null,
    };
  }

  return payload;
}

/**
 * Default reading-order sort (top-to-bottom, left-to-right).
 * bbox is [x, y, w, h] in PDF page space where y grows upward,
 * so "top of page" has the largest y — sort descending by y.
 */
function byReadingOrder(a, b) {
  const ay = a.bbox?.[1] || 0;
  const by = b.bbox?.[1] || 0;
  if (Math.abs(ay - by) > 10) return by - ay;
  return (a.bbox?.[0] || 0) - (b.bbox?.[0] || 0);
}

export default {
  buildRAGContext,
  toMarkdown,
  toReflowedText,
  toFullJSON,
};
