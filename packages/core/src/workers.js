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
