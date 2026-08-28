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
function mdEscape(text) {
  return String(text || '').replace(/([\\`*_{}\[\]()#+\-.!|>])/g, '\\$1');
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
    for (const obj of objects) {
      const role = obj.semantic?.role || 'text';

      if (obj.type === 'text' && obj.semantic?.text) {
        const text = String(obj.semantic.text).replace(/\s+/g, ' ').trim();
        if (!text) continue;
        switch (role) {
          case 'heading': {
            const level = Math.min(6, Math.max(2, obj.semantic.level || 2));
            out.push(`${'#'.repeat(level)} ${mdEscape(text)}`);
            out.push('');
            break;
          }
          case 'list':
            // fall through: handled as plain text since list grouping is in content graph
          default:
            out.push(mdEscape(text));
            out.push('');
            break;
        }
      } else if (obj.type === 'image') {
        const alt = obj.accessibility?.alt || obj.semantic?.caption || 'Image';
        out.push(`![${mdEscape(alt)}](${obj.raw?.src ? '' : ''})`);
        if (obj.semantic?.caption) {
          out.push(`*${mdEscape(obj.semantic.caption)}*`);
        }
        out.push('');
      } else if (role === 'separator') {
        out.push('---');
        out.push('');
      }
    }
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
    const text = (page.content || [])
      .map(id => ir.objects[id])
      .filter(o => o && o.type === 'text' && o.semantic?.text)
      .map(o => String(o.semantic.text).replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n\n');
    return { page: page.num, text };
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
 */
function byReadingOrder(a, b) {
  const ay = a.bbox?.[1] || 0;
  const by = b.bbox?.[1] || 0;
  if (Math.abs(ay - by) > 10) return ay - by;
  return (a.bbox?.[0] || 0) - (b.bbox?.[0] || 0);
}

export default {
  buildRAGContext,
  toMarkdown,
  toReflowedText,
  toFullJSON,
};
