/**
 * @codbdocs/core — Worker Manager
 *
 * OffscreenCanvas + Web Workers for non-blocking PDF processing.
 * Falls back gracefully when OffscreenCanvas isn't available.
 */

const HAS_OFFSCREEN = typeof OffscreenCanvas !== 'undefined';
const HAS_WORKERS = typeof Worker !== 'undefined';

/**
 * Check if we can use the full worker pipeline.
 */
export function canUseWorkers() {
  return HAS_OFFSCREEN && HAS_WORKERS;
}

/**
 * Create a PDF rendering worker (inline blob).
 * Renders pages to OffscreenCanvas off the main thread.
 */
export function createRenderWorker(pdfjsWorkerSrc) {
  if (!canUseWorkers()) return null;

  const workerCode = `
    self.onmessage = async function(e) {
      const { id, type, data } = e.data;

      if (type === 'render-page') {
        try {
          const { pdfData, pageNum, scale } = data;

          // Import PDF.js in worker context
          importScripts(pdfjsWorkerSrc || '');

          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });

          const canvas = new OffscreenCanvas(viewport.width, viewport.height);
          const ctx = canvas.getContext('2d');

          await page.render({ canvasContext: ctx, viewport }).promise;

          // Extract text content
          const textContent = await page.getTextContent();

          // Transfer canvas back
          const bitmap = canvas.transferToImageBitmap();

          self.postMessage({
            id,
            type: 'page-rendered',
            data: {
              bitmap,
              width: viewport.width,
              height: viewport.height,
              textContent,
              pageNum,
            }
          }, [bitmap]);
        } catch (err) {
          self.postMessage({ id, type: 'error', data: { error: String(err) } });
        }
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  try {
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
  } catch (err) {
    URL.revokeObjectURL(url);
    return null;
  }
}

/**
 * Create an OCR worker (inline blob).
 * Runs Tesseract.js in a web worker.
 */
export function createOCRWorker() {
  if (!canUseWorkers()) return null;

  const workerCode = `
    self.onmessage = async function(e) {
      const { id, type, data } = e.data;

      if (type === 'ocr-page') {
        try {
          const { canvasOrBitmap, lang } = data;

          // Note: Tesseract.js manages its own workers internally
          // This worker receives the canvas and runs OCR synchronously
          const result = await Tesseract.recognize(canvasOrBitmap, lang || 'eng');

          self.postMessage({
            id,
            type: 'ocr-result',
            data: {
              text: result.data.text,
              confidence: result.data.confidence,
              words: result.data.words ? result.data.words.length : 0,
            }
          });
        } catch (err) {
          self.postMessage({ id, type: 'error', data: { error: String(err) } });
        }
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  try {
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
  } catch (err) {
    URL.revokeObjectURL(url);
    return null;
  }
}

/**
 * Create a Brain analysis worker.
 * Runs document understanding heuristics off the main thread.
 */
export function createBrainWorker() {
  if (!HAS_WORKERS) return null;

  const workerCode = `
    // Inline brain functions for worker context
    ${getBrainWorkerCode()}
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  try {
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
  } catch (err) {
    URL.revokeObjectURL(url);
    return null;
  }
}

function getBrainWorkerCode() {
  return `
    self.onmessage = function(e) {
      const { id, type, data } = e.data;

      if (type === 'analyze-page') {
        try {
          const { items, pageSize, text } = data;
          const result = analyzePage(items, pageSize, text);
          self.postMessage({ id, type: 'analysis-result', data: result });
        } catch (err) {
          self.postMessage({ id, type: 'error', data: { error: String(err) } });
        }
      }
    };

    function analyzePage(items, pageSize, text) {
      const boxes = (items || []).map(item => {
        const tx = item.transform;
        return {
          text: item.str,
          x: tx[4], y: tx[5],
          width: item.width, height: item.height,
          fontSize: Math.abs(tx[0]) || Math.abs(tx[3]) || 12,
        };
      }).filter(b => b.text.trim());

      const wordCount = (text || '').split(/\\s+/).filter(Boolean).length;

      // Quick structure detection
      const hasTable = boxes.some(b => boxes.some(b2 =>
        b !== b2 && Math.abs(b.y - b2.y) < 5 && Math.abs(b.x - b2.x) > 50
      ));

      const bulletPattern = /^[\\u2022\\-\\*\\d+\\.]/;
      const hasList = boxes.some(b => bulletPattern.test(b.text));

      // Entity extraction (basic)
      const dates = (text || '').match(/\\b\\d{1,2}[\\/\\-]\\d{1,2}[\\/\\-]\\d{2,4}\\b/g) || [];
      const phones = (text || '').match(/\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}/g) || [];
      const emails = (text || '').match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/g) || [];
      const amounts = (text || '').match(/\\$[\\d,]+(?:\\.\\d{2})?/g) || [];

      return {
        wordCount,
        hasTable,
        hasList,
        entities: { dates, phones, emails, amounts },
        columnCount: detectColumnCount(boxes, pageSize.width),
      };
    }

    function detectColumnCount(boxes, pageWidth) {
      if (boxes.length === 0) return 0;
      const xPositions = boxes.map(b => b.x).sort((a, b) => a - b);
      let clusters = 1;
      for (let i = 1; i < xPositions.length; i++) {
        if (xPositions[i] - xPositions[i-1] > pageWidth * 0.2) clusters++;
      }
      return Math.min(clusters, 4);
    }
  `;
}

/**
 * Promise-based worker message helper.
 */
export function sendToWorker(worker, type, data, transferables = []) {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2);

    const handler = (e) => {
      if (e.data.id === id) {
        worker.removeEventListener('message', handler);
        if (e.data.type === 'error') {
          reject(new Error(e.data.data.error));
        } else {
          resolve(e.data.data);
        }
      }
    };

    worker.addEventListener('message', handler);
    worker.postMessage({ id, type, data }, transferables);
  });
}

/**
 * Terminate a worker safely.
 */
export function terminateWorker(worker) {
  if (worker) {
    try { worker.terminate(); } catch (e) {}
  }
}

/**
 * Create an Intelligence worker for concept graph and relationship extraction.
 * Runs heavy analysis off the main thread.
 */
export function createIntelligenceWorker() {
  if (!HAS_WORKERS) return null;

  const workerCode = `
    self.onmessage = function(e) {
      const { id, type, data } = e.data;

      if (type === 'build-concept-graph') {
        try {
          const { entities, relationships } = data;
          const graph = buildConceptGraph(entities, relationships);
          self.postMessage({ id, type: 'concept-graph-result', data: graph });
        } catch (err) {
          self.postMessage({ id, type: 'error', data: { error: String(err) } });
        }
      } else if (type === 'extract-relationships') {
        try {
          const { text, entities, tables } = data;
          const relationships = extractRelationships(text, entities, tables);
          self.postMessage({ id, type: 'relationships-result', data: relationships });
        } catch (err) {
          self.postMessage({ id, type: 'error', data: { error: String(err) } });
        }
      }
    };

    function buildConceptGraph(entities, relationships) {
      const nodes = new Map();
      const edges = [];

      for (const entity of entities) {
        const id = entity.type + ':' + entity.value;
        if (!nodes.has(id)) {
          nodes.set(id, { id, type: entity.type, value: entity.value, count: 0 });
        }
        nodes.get(id).count++;
      }

      for (const rel of relationships) {
        edges.push({
          source: rel.source,
          target: rel.target,
          type: rel.type,
          weight: rel.weight || 1,
        });
      }

      return {
        nodes: Array.from(nodes.values()),
        edges,
      };
    }

    function extractRelationships(text, entities, tables) {
      const relationships = [];

      // Co-occurrence relationships
      for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
          const a = entities[i];
          const b = entities[j];
          if (a.page === b.page) {
            relationships.push({
              source: a.type + ':' + a.value,
              target: b.type + ':' + b.value,
              type: 'co-occurrence',
              weight: 1,
            });
          }
        }
      }

      // Table row relationships
      if (tables) {
        for (const table of tables) {
          for (const row of table.rows || []) {
            for (let i = 0; i < row.length; i++) {
              for (let j = i + 1; j < row.length; j++) {
                relationships.push({
                  source: String(row[i]),
                  target: String(row[j]),
                  type: 'same-row',
                  weight: 2,
                });
              }
            }
          }
        }
      }

      return relationships;
    }
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  try {
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
  } catch (err) {
    URL.revokeObjectURL(url);
    return null;
  }
}

/**
 * Create an Index worker for building search indices.
 */
export function createIndexWorker() {
  if (!HAS_WORKERS) return null;

  const workerCode = `
    self.onmessage = function(e) {
      const { id, type, data } = e.data;

      if (type === 'build-index') {
        try {
          const { pages, options } = data;
          const index = buildSearchIndex(pages, options);
          self.postMessage({ id, type: 'index-result', data: index });
        } catch (err) {
          self.postMessage({ id, type: 'error', data: { error: String(err) } });
        }
      }
    };

    function buildSearchIndex(pages, options = {}) {
      const index = {
        terms: new Map(),
        pages: [],
        totalTokens: 0,
      };

      for (const page of pages) {
        const tokens = tokenize(page.text || '');
        index.pages.push({
          id: page.id,
          tokens,
          length: tokens.length,
        });

        for (const token of tokens) {
          if (!index.terms.has(token)) {
            index.terms.set(token, []);
          }
          index.terms.get(token).push(page.id);
          index.totalTokens++;
        }
      }

      return {
        terms: Array.from(index.terms.entries()),
        pages: index.pages,
        totalTokens: index.totalTokens,
      };
    }

    function tokenize(text) {
      return text.toLowerCase()
        .replace(/[^a-z0-9\\s]/g, ' ')
        .split(/\\s+/)
        .filter(t => t.length > 1);
    }
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  try {
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
  } catch (err) {
    URL.revokeObjectURL(url);
    return null;
  }
}
