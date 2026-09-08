/**
 * Serverless parity layer.
 *
 * Everything the DocAccess server pipeline could do that the browser SDK
 * could not: per-page SVG vectors, page raster renditions, embedded image
 * extraction, OCR for scanned pages, and a single data-only call that
 * returns exactly the server's `data.json` shape.
 *
 * Pure browser. No server required.
 */

import { processLargeDocument, createZip } from './large.js';
import { buildFidelityHtml } from './fidelity.js';

function getPdfjs() {
  const lib =
    typeof window !== 'undefined' && (window['pdfjs-dist/build/pdf'] || window.pdfjsLib);
  if (!lib) {
    throw new Error('[codbdocs] pdfjsLib not found. Load PDF.js before calling this API.');
  }
  return lib;
}

function makeCanvas(width, height) {
  const w = Math.max(1, Math.floor(width));
  const h = Math.max(1, Math.floor(height));
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h);
  const el = document.createElement('canvas');
  el.width = w;
  el.height = h;
  return el;
}

async function canvasToDataUri(canvas, type = 'image/png', quality = 0.85) {
  if (typeof canvas.convertToBlob === 'function') {
    const blob = await canvas.convertToBlob({ type, quality });
    const buf = new Uint8Array(await blob.arrayBuffer());
    return `data:${type};base64,${bytesToBase64(buf)}`;
  }
  return canvas.toDataURL(type, quality);
}

function bytesToBase64(bytes) {
  let bin = '';
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + step));
  }
  return btoa(bin);
}

/* ── 1. Per-page SVG vectors ─────────────────────────────────────── */

/**
 * Render one page to standalone SVG markup.
 * Uses PDF.js SVGGraphics when the loaded build ships it; otherwise
 * reconstructs path geometry from the operator list.
 */
export async function extractPageVector(page, options = {}) {
  const pdfjsLib = getPdfjs();
  const scale = options.scale ?? 1;
  const viewport = page.getViewport({ scale });
  const opList = await page.getOperatorList();

  if (typeof pdfjsLib.SVGGraphics === 'function') {
    try {
      const gfx = new pdfjsLib.SVGGraphics(page.commonObjs, page.objs);
      gfx.embedFonts = options.embedFonts !== false;
      const element = await gfx.getSVG(opList, viewport);
      if (typeof XMLSerializer !== 'undefined') {
        return new XMLSerializer().serializeToString(element);
      }
      if (element?.outerHTML) return element.outerHTML;
    } catch {
      /* fall through to the operator reconstruction below */
    }
  }
  return buildSvgFromOperators(opList, viewport, pdfjsLib);
}

function buildSvgFromOperators(opList, viewport, pdfjsLib) {
  const OPS = pdfjsLib.OPS || {};
  const parts = [];
  let current = [];
  let fill = '#000000';
  let stroke = '#000000';
  let lineWidth = 1;
  const ctm = [1, 0, 0, -1, 0, viewport.height];

  const pt = (x, y) => `${round(ctm[0] * x + ctm[2] * y + ctm[4])} ${round(ctm[1] * x + ctm[3] * y + ctm[5])}`;
  const round = (n) => Math.round(n * 100) / 100;

  for (let i = 0; i < opList.fnArray.length; i += 1) {
    const fn = opList.fnArray[i];
    const args = opList.argsArray[i] || [];
    if (fn === OPS.setFillRGBColor) fill = rgb(args);
    else if (fn === OPS.setStrokeRGBColor) stroke = rgb(args);
    else if (fn === OPS.setLineWidth) lineWidth = args[0] ?? 1;
    else if (fn === OPS.constructPath) {
      const ops = args[0] || [];
      const coords = args[1] || [];
      let c = 0;
      for (const op of ops) {
        if (op === OPS.moveTo) {
          current.push(`M ${pt(coords[c], coords[c + 1])}`);
          c += 2;
        } else if (op === OPS.lineTo) {
          current.push(`L ${pt(coords[c], coords[c + 1])}`);
          c += 2;
        } else if (op === OPS.curveTo) {
          current.push(
            `C ${pt(coords[c], coords[c + 1])} ${pt(coords[c + 2], coords[c + 3])} ${pt(coords[c + 4], coords[c + 5])}`,
          );
          c += 6;
        } else if (op === OPS.rectangle) {
          const [x, y, w, h] = coords.slice(c, c + 4);
          current.push(
            `M ${pt(x, y)} L ${pt(x + w, y)} L ${pt(x + w, y + h)} L ${pt(x, y + h)} Z`,
          );
          c += 4;
        } else if (op === OPS.closePath) {
          current.push('Z');
        }
      }
    } else if (fn === OPS.fill || fn === OPS.eoFill) {
      if (current.length) parts.push(`<path d="${current.join(' ')}" fill="${fill}"/>`);
      current = [];
    } else if (fn === OPS.stroke || fn === OPS.closeStroke) {
      if (current.length) {
        parts.push(
          `<path d="${current.join(' ')}" fill="none" stroke="${stroke}" stroke-width="${lineWidth}"/>`,
        );
      }
      current = [];
    } else if (fn === OPS.endPath) {
      current = [];
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(viewport.width)}" height="${Math.round(
    viewport.height,
  )}" viewBox="0 0 ${Math.round(viewport.width)} ${Math.round(viewport.height)}">${parts.join('')}</svg>`;
}

function rgb(args) {
  const [r = 0, g = 0, b = 0] = args;
  const to = (v) => Math.max(0, Math.min(255, Math.round(v <= 1 ? v * 255 : v)));
  return `rgb(${to(r)},${to(g)},${to(b)})`;
}

/* ── 2. Page raster renditions ───────────────────────────────────── */

/**
 * Render one page to a data URI at a chosen DPI (72 DPI = PDF points).
 */
export async function renderPageImage(page, options = {}) {
  const dpi = options.dpi ?? 150;
  const scale = options.scale ?? dpi / 72;
  const type = options.type ?? 'image/png';
  const viewport = page.getViewport({ scale });
  const canvas = makeCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  const dataUri = await canvasToDataUri(canvas, type, options.quality ?? 0.85);
  const width = canvas.width;
  const height = canvas.height;
  canvas.width = 0;
  canvas.height = 0;
  return { dataUri, width, height, type, dpi: Math.round(scale * 72) };
}

/* ── 3. Embedded image extraction ────────────────────────────────── */

/**
 * Pull every embedded raster image off a page, positioned in page space.
 */
export async function extractPageImages(page, options = {}) {
  const pdfjsLib = getPdfjs();
  const OPS = pdfjsLib.OPS || {};
  const viewport = page.getViewport({ scale: 1 });
  const opList = await page.getOperatorList();
  const out = [];
  const transforms = [];
  let ctm = [1, 0, 0, 1, 0, 0];

  for (let i = 0; i < opList.fnArray.length; i += 1) {
    const fn = opList.fnArray[i];
    const args = opList.argsArray[i] || [];
    if (fn === OPS.save) transforms.push(ctm.slice());
    else if (fn === OPS.restore) ctm = transforms.pop() || [1, 0, 0, 1, 0, 0];
    else if (fn === OPS.transform) ctm = multiply(ctm, args);
    else if (fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject) {
      const name = args[0];
      const img = await resolveImage(page, name);
      if (!img) continue;
      const width = Math.abs(ctm[0]);
      const height = Math.abs(ctm[3]);
      const x = ctm[4];
      const y = viewport.height - ctm[5] - height;
      let dataUri = '';
      if (options.embed !== false) dataUri = await imageToDataUri(img);
      out.push({
        name: String(name),
        x: Math.round(x * 100) / 100,
        y: Math.round(y * 100) / 100,
        width: Math.round(width * 100) / 100,
        height: Math.round(height * 100) / 100,
        pixelWidth: img.width,
        pixelHeight: img.height,
        data_uri: dataUri,
      });
    }
  }
  return out;
}

function multiply(a, b) {
  return [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5],
  ];
}

function resolveImage(page, name) {
  return new Promise((resolve) => {
    try {
      if (page.objs.has(name)) return resolve(page.objs.get(name));
      page.objs.get(name, (obj) => resolve(obj));
      setTimeout(() => resolve(null), 3000);
    } catch {
      resolve(null);
    }
  });
}

async function imageToDataUri(img) {
  try {
    if (img.bitmap && typeof createImageBitmap !== 'undefined') {
      const canvas = makeCanvas(img.width, img.height);
      canvas.getContext('2d').drawImage(img.bitmap, 0, 0);
      return await canvasToDataUri(canvas);
    }
    if (!img.data) return '';
    const canvas = makeCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(img.width, img.height);
    const src = img.data;
    const channels = src.length / (img.width * img.height);
    for (let i = 0, j = 0; i < out.data.length; i += 4) {
      if (channels >= 4) {
        out.data[i] = src[j];
        out.data[i + 1] = src[j + 1];
        out.data[i + 2] = src[j + 2];
        out.data[i + 3] = src[j + 3];
        j += 4;
      } else if (channels >= 3) {
        out.data[i] = src[j];
        out.data[i + 1] = src[j + 1];
        out.data[i + 2] = src[j + 2];
        out.data[i + 3] = 255;
        j += 3;
      } else {
        out.data[i] = out.data[i + 1] = out.data[i + 2] = src[j];
        out.data[i + 3] = 255;
        j += 1;
      }
    }
    ctx.putImageData(out, 0, 0);
    return await canvasToDataUri(canvas);
  } catch {
    return '';
  }
}

/* ── 4. OCR for scanned pages ────────────────────────────────────── */

const TESSERACT_CDN = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
let ocrWorkerPromise = null;

async function loadTesseract() {
  if (typeof window !== 'undefined' && window.Tesseract) return window.Tesseract;
  if (typeof document === 'undefined') throw new Error('[codbdocs] OCR requires a browser.');
  await new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${TESSERACT_CDN}"]`);
    if (existing) return resolve();
    const el = document.createElement('script');
    el.src = TESSERACT_CDN;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error('[codbdocs] failed to load tesseract.js'));
    document.head.appendChild(el);
  });
  if (!window.Tesseract) throw new Error('[codbdocs] tesseract.js unavailable.');
  return window.Tesseract;
}

async function getOcrWorker(language) {
  if (!ocrWorkerPromise) {
    ocrWorkerPromise = (async () => {
      const Tesseract = await loadTesseract();
      return Tesseract.createWorker(language || 'eng');
    })();
  }
  return ocrWorkerPromise;
}

/** Release the shared OCR worker (frees memory after a batch). */
export async function terminateOcr() {
  if (!ocrWorkerPromise) return;
  try {
    const worker = await ocrWorkerPromise;
    await worker.terminate();
  } catch {
    /* ignore */
  }
  ocrWorkerPromise = null;
}

/** OCR a single already-rendered page image (data URI, Blob or canvas). */
export async function ocrImage(image, options = {}) {
  const worker = await getOcrWorker(options.language ?? 'eng');
  const { data } = await worker.recognize(image);
  return {
    text: (data?.text || '').trim(),
    confidence: data?.confidence ?? null,
    words: data?.words?.length ?? 0,
  };
}

/** Render a page then OCR it. Used when a page has little or no native text. */
export async function ocrPage(page, options = {}) {
  const rendered = await renderPageImage(page, { dpi: options.dpi ?? 200 });
  const result = await ocrImage(rendered.dataUri, options);
  return { ...result, image: options.keepImage ? rendered : null };
}

/* ── 5. Data-only call with server-identical output ──────────────── */

/**
 * Produce the exact payload shape the DocAccess server returns from
 * `POST /api/v1/documents/data`, entirely in the browser.
 *
 * Options:
 *   title, language, aiContext
 *   includeLayout   (default true)  positioned text runs per page
 *   includeImages   (default true)  embedded images as data URIs
 *   includeVectors  (default true)  per-page SVG rendition
 *   includePageImages (default false) full-page PNG per page
 *   includeOriginal (default false) original PDF as base64
 *   ocr             (default "auto") "auto" | true | false
 *   ocrMinChars     (default 24) native chars below which a page is OCR'd
 *   dpi, chunkSize, chunkOverlap, pages, onProgress, signal
 */
export async function documentData(source, options = {}) {
  const {
    title = 'Document',
    language = 'en',
    aiContext = '',
    includeLayout = true,
    includeImages = true,
    includeVectors = true,
    includePageImages = false,
    includeOriginal = false,
    ocr = 'auto',
    ocrMinChars = 24,
    dpi = 150,
    chunkSize = 220,
    chunkOverlap = 40,
    onProgress,
    signal,
  } = options;

  const started = Date.now();
  const pdfjsLib = getPdfjs();
  const bytes = await sourceBytes(source);
  const loadingTask = pdfjsLib.getDocument({
    data: bytes ? bytes.slice(0) : undefined,
    url: !bytes && typeof source === 'string' ? source : undefined,
    disableAutoFetch: true,
  });
  const pdf = await loadingTask.promise;

  let metadata = {};
  try {
    const meta = await pdf.getMetadata();
    metadata = { ...(meta.info || {}) };
  } catch {
    /* ignore */
  }
  let outlineRaw = [];
  try {
    outlineRaw = flattenOutline(await pdf.getOutline());
  } catch {
    /* ignore */
  }

  const total = pdf.numPages;
  const numbers = resolvePages(options.pages, total);
  const pages = [];
  const layoutPages = [];
  const chunks = [];
  const headings = [];
  let ocrPages = 0;

  for (const num of numbers) {
    if (signal?.aborted) throw new Error('[codbdocs] aborted');
    const page = await pdf.getPage(num);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();

    const spans = [];
    let text = '';
    for (const item of content.items) {
      if (!item.str) continue;
      const t = item.transform || [1, 0, 0, 1, 0, 0];
      const size = Math.round(Math.hypot(t[2], t[3]) * 100) / 100;
      spans.push({
        text: item.str,
        x: Math.round(t[4] * 100) / 100,
        y: Math.round((viewport.height - t[5] - (item.height || size)) * 100) / 100,
        width: Math.round((item.width || 0) * 100) / 100,
        height: Math.round((item.height || size) * 100) / 100,
        font_size: size,
        font_family: item.fontName || '',
        direction: item.dir || 'ltr',
      });
      text += item.str + (item.hasEOL ? '\n' : ' ');
    }
    text = text.replace(/[ \t]+\n/g, '\n').trim();

    let pageOcr = false;
    const wantOcr = ocr === true || (ocr === 'auto' && text.replace(/\s+/g, '').length < ocrMinChars);
    if (wantOcr) {
      try {
        const result = await ocrPage(page, { language: options.ocrLanguage, dpi: Math.max(dpi, 200) });
        if (result.text) {
          text = result.text;
          pageOcr = true;
          ocrPages += 1;
        }
      } catch {
        /* OCR unavailable — keep native text */
      }
    }

    for (const span of spans) {
      if (span.font_size >= 14 && span.text.trim().length > 2) {
        headings.push({
          text: span.text.trim(),
          page: num,
          level: span.font_size >= 20 ? 1 : span.font_size >= 16 ? 2 : 3,
          font_size: span.font_size,
        });
      }
    }

    pages.push({
      page_number: num,
      width: Math.round(viewport.width * 100) / 100,
      height: Math.round(viewport.height * 100) / 100,
      text: text || `(No text could be extracted from page ${num})`,
      words: text ? text.split(/\s+/).filter(Boolean).length : 0,
      spans: spans.length,
      images: 0,
      ocr: pageOcr,
    });

    chunks.push(...chunkText(text, num, chunkSize, chunkOverlap, title));

    if (includeLayout) {
      const images = includeImages ? await extractPageImages(page) : [];
      pages[pages.length - 1].images = images.length;
      const entry = {
        page_number: num,
        width: Math.round(viewport.width * 100) / 100,
        height: Math.round(viewport.height * 100) / 100,
        spans,
        images,
        vector_svg: '',
        page_image: '',
      };
      if (includeVectors) {
        try {
          entry.vector_svg = await extractPageVector(page);
        } catch {
          entry.vector_svg = '';
        }
      }
      if (includePageImages) {
        try {
          entry.page_image = (await renderPageImage(page, { dpi })).dataUri;
        } catch {
          entry.page_image = '';
        }
      }
      layoutPages.push(entry);
    }

    try {
      page.cleanup();
    } catch {
      /* ignore */
    }
    onProgress?.({
      page: pages.length,
      total: numbers.length,
      percent: Math.round((pages.length / numbers.length) * 100),
    });
  }

  const transcript = pages.map((p) => `--- Page ${p.page_number} ---\n${p.text}`).join('\n\n');
  const outline = outlineRaw.length
    ? outlineRaw.map((o, i) => ({ text: o.title, level: o.level + 1, page: o.page ?? null, id: `o${i}` }))
    : headings;

  const payload = {
    document: {
      title,
      source: options.name || (source && source.name) || `${title}.pdf`,
      language,
      page_count: total,
      bytes: bytes ? bytes.length : 0,
      generated_at: new Date().toISOString(),
      metadata,
    },
    metrics: {
      pages: pages.length,
      headings: outline.length,
      rag_chunks: chunks.length,
      rag_words: chunks.reduce((sum, c) => sum + c.words, 0),
      total_spans: pages.reduce((sum, p) => sum + p.spans, 0),
      text_pages: pages.filter((p) => !p.text.startsWith('(')).length,
      ocr_pages: ocrPages,
      characters: pages.reduce((sum, p) => sum + p.text.length, 0),
      duration_ms: Date.now() - started,
      engine: 'codbdocs/browser',
    },
    outline,
    pages,
    chunks,
    transcript,
    ai_context: aiContext,
  };

  if (includeLayout) payload.layout = { pages: layoutPages };
  if (includeOriginal && bytes) payload.original_pdf_base64 = bytesToBase64(bytes);

  try {
    await pdf.destroy();
  } catch {
    /* ignore */
  }
  return payload;
}

/**
 * Everything in one ZIP: accessible HTML, original PDF, page images,
 * per-page SVG, transcript, rag.json, outline.json, data.json, manifest.
 */
export async function packageDocumentFull(source, options = {}) {
  const data = await documentData(source, {
    ...options,
    includeLayout: true,
    includeVectors: options.includeVectors !== false,
    includePageImages: options.pageBackgrounds !== false,
  });

  const entries = [];
  const pageFiles = [];
  const vectorFiles = [];
  const bytes = await sourceBytes(source);

  const html =
    options.html ||
    buildFidelityHtml(dataToIR(data, options), {
      title: data.document.title,
      lang: data.document.language || 'en',
      rag: { chunks: data.chunks },
      originalName: data.document.source,
      originalPdfSrc: options.includeOriginal !== false ? 'original.pdf' : undefined,
      ...(options.htmlOptions ?? {}),
    });
  entries.push({ name: 'index.html', data: html });
  entries.push({ name: 'transcript.txt', data: data.transcript });
  entries.push({ name: 'rag.json', data: JSON.stringify({ chunks: data.chunks }, null, 2) });
  entries.push({ name: 'outline.json', data: JSON.stringify(data.outline, null, 2) });

  if (options.includePageImages !== false) {
    const pdfjsLib = getPdfjs();
    const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
    for (const page of data.pages) {
      const p = await pdf.getPage(page.page_number);
      const rendered = await renderPageImage(p, { dpi: options.dpi ?? 150 });
      const name = `pages/page-${String(page.page_number).padStart(4, '0')}.png`;
      entries.push({ name, data: dataUriToBytes(rendered.dataUri) });
      pageFiles.push(name);
      try {
        p.cleanup();
      } catch {
        /* ignore */
      }
    }
    await pdf.destroy();
  }

  for (const page of data.layout?.pages ?? []) {
    if (!page.vector_svg) continue;
    const name = `vectors/page-${String(page.page_number).padStart(4, '0')}.svg`;
    entries.push({ name, data: page.vector_svg });
    vectorFiles.push(name);
  }

  entries.push({ name: 'data.json', data: JSON.stringify(data, null, 2) });
  if (options.includeOriginal !== false && bytes) {
    entries.push({ name: 'original.pdf', data: bytes });
  }

  const manifest = {
    generator: 'codbdocs/serverless',
    generatedAt: new Date().toISOString(),
    document: data.document,
    metrics: data.metrics,
    files: entries.map((e) => e.name).concat('manifest.json'),
    pageImages: pageFiles,
    vectors: vectorFiles,
  };
  entries.push({ name: 'manifest.json', data: JSON.stringify(manifest, null, 2) });

  return { blob: createZip(entries), manifest, data };
}

function dataUriToBytes(dataUri) {
  const b64 = dataUri.slice(dataUri.indexOf(',') + 1);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function chunkText(text, pageNumber, size, overlap, title) {
  const chunks = [];
  if (!text) return chunks;
  const words = text.split(/\s+/).filter(Boolean);
  const step = Math.max(1, size - overlap);
  for (let i = 0; i < words.length; i += step) {
    const slice = words.slice(i, i + size);
    if (!slice.length) break;
    chunks.push({
      id: `p${pageNumber}-c${chunks.length + 1}`,
      page: pageNumber,
      title,
      text: slice.join(' '),
      words: slice.length,
    });
    if (i + size >= words.length) break;
  }
  return chunks;
}

function resolvePages(pages, total) {
  if (!pages) return Array.from({ length: total }, (_, i) => i + 1);
  if (Array.isArray(pages) && pages.length === 2 && pages.every((n) => typeof n === 'number')) {
    const out = [];
    for (let n = Math.max(1, pages[0]); n <= Math.min(total, pages[1]); n += 1) out.push(n);
    return out;
  }
  if (Array.isArray(pages)) return pages.filter((n) => n >= 1 && n <= total);
  return Array.from({ length: total }, (_, i) => i + 1);
}

function flattenOutline(items, depth = 0, out = []) {
  for (const item of items || []) {
    out.push({ title: item.title, level: depth, dest: item.dest ?? null });
    if (item.items?.length) flattenOutline(item.items, depth + 1, out);
  }
  return out;
}

async function sourceBytes(source) {
  if (source instanceof Uint8Array) return source;
  if (source instanceof ArrayBuffer) return new Uint8Array(source);
  if (source && typeof source.arrayBuffer === 'function') {
    return new Uint8Array(await source.arrayBuffer());
  }
  if (typeof source === 'string') {
    try {
      const res = await fetch(source);
      return new Uint8Array(await res.arrayBuffer());
    } catch {
      return null;
    }
  }
  return null;
}



/* ── 6. Acrobat-grade accessible HTML, built in the browser ───────── */

/**
 * Convert a documentData() payload into the fidelity renderer's IR shape,
 * including rasterised page backgrounds, positioned text runs and embedded
 * images, so the browser output matches the server package exactly.
 */
export function dataToIR(data, options = {}) {
  const objects = {};
  const pages = {};
  const pageIds = [];
  const layout = data.layout?.pages ?? [];
  const byNumber = new Map(layout.map((p) => [p.page_number, p]));

  for (const page of data.pages) {
    const pid = `page-${page.page_number}`;
    pageIds.push(pid);
    const lay = byNumber.get(page.page_number);
    const content = [];

    (lay?.spans ?? []).forEach((run, i) => {
      if (!run.text || !run.text.trim()) return;
      const id = `${pid}-t${i}`;
      const size = run.font_size || run.height || 11;
      objects[id] = {
        id,
        type: 'text',
        bbox: [run.x, run.y, run.width, run.height || size],
        raw: {
          text: run.text,
          font: run.font_family || '',
          fontSize: size,
          bbox: [run.x, run.y, run.width, run.height || size],
        },
        semantic: { text: run.text, role: 'paragraph' },
      };
      content.push(id);
    });

    (lay?.images ?? []).forEach((img, i) => {
      if (!img.data_uri) return;
      const id = `${pid}-img${i}`;
      objects[id] = {
        id,
        type: 'image',
        bbox: [img.x, img.y, img.width, img.height],
        raw: { src: img.data_uri, bbox: [img.x, img.y, img.width, img.height] },
        semantic: { role: 'figure', caption: `Image on page ${page.page_number}` },
        accessibility: { alt: `Image on page ${page.page_number}` },
      };
      content.push(id);
    });

    pages[pid] = {
      id: pid,
      num: page.page_number,
      width: page.width,
      height: page.height,
      background: lay?.page_image || '',
      content,
    };
  }

  return {
    document: {
      title: options.title || data.document?.title || 'Document',
      pages: pageIds,
      metadata: { ...(data.document?.metadata ?? {}), title: data.document?.title, language: data.document?.language },
    },
    pages,
    objects,
  };
}

/**
 * One call: parse the PDF in the browser and return the same modern,
 * Acrobat-style accessible HTML the server pipeline produces (toolbar,
 * thumbnails, zoom, search, RAG, AI Q&A, original-PDF toggle).
 */
export async function buildAccessibleHtml(source, options = {}) {
  const data = await documentData(source, {
    ...options,
    includeLayout: true,
    includeImages: options.includeImages !== false,
    includePageImages: options.pageBackgrounds !== false,
    includeVectors: options.includeVectors === true,
    dpi: options.dpi ?? 150,
  });
  const ir = dataToIR(data, options);
  const html = buildFidelityHtml(ir, {
    title: data.document.title,
    lang: data.document.language || 'en',
    rag: { chunks: data.chunks },
    originalName: data.document.source,
    ...(options.html ?? {}),
  });
  return { html, data, ir };
}

/** True when the browser can do the whole job without a server. */
export function serverlessCapabilities() {
  return {
    text: true,
    layout: true,
    images: true,
    vectors: true,
    pageImages: true,
    ocr: typeof document !== 'undefined',
    rag: true,
    accessibleHtml: true,
    zipPackage: true,
    streamingLargeFiles: true,
    aiQnA: false,
    translation: false,
    note: 'AI Q&A and translation need a server-held key; everything else runs in the browser.',
  };
}

export { processLargeDocument };
