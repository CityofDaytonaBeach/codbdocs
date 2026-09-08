/**
 * Streaming, bounded-memory pipeline for very large PDFs.
 * Runs entirely in the browser on top of PDF.js.
 */

// src/large.js
function getPdfjs() {
  const lib = typeof window !== "undefined" && (window["pdfjs-dist/build/pdf"] || window.pdfjsLib);
  if (!lib) {
    throw new Error(
      "[codbdocs] pdfjsLib not found. Load PDF.js before calling processLargeDocument()."
    );
  }
  return lib;
}
async function openStreaming(source, options = {}) {
  const pdfjsLib = getPdfjs();
  const { rangeChunkSize = 262144, password } = options;
  let params;
  let objectUrl = null;
  if (typeof source === "string") {
    params = { url: source };
  } else if (source && typeof Blob !== "undefined" && source instanceof Blob) {
    objectUrl = URL.createObjectURL(source);
    params = { url: objectUrl };
  } else if (source instanceof ArrayBuffer) {
    params = { data: source };
  } else if (source instanceof Uint8Array) {
    params = { data: source };
  } else if (source && typeof source.arrayBuffer === "function") {
    params = { data: await source.arrayBuffer() };
  } else {
    throw new Error("[codbdocs] Unsupported source for processLargeDocument().");
  }
  const task = pdfjsLib.getDocument({
    ...params,
    password,
    rangeChunkSize,
    disableAutoFetch: true,
    disableStream: false,
    // Keep PDF.js internal caches small on huge files.
    maxImageSize: options.maxImageSize ?? 16777216
  });
  const pdf = await task.promise;
  const release = async () => {
    try {
      await pdf.cleanup();
      await pdf.destroy();
    } catch {
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  };
  return { pdf, release };
}
async function extractPage(pdf, pageNumber, opts) {
  const page = await pdf.getPage(pageNumber);
  try {
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();
    const runs = [];
    let text = "";
    for (const item of textContent.items) {
      if (!item.str) continue;
      const t = item.transform || [1, 0, 0, 1, 0, 0];
      if (opts.layout) {
        runs.push({
          text: item.str,
          x: Math.round(t[4] * 100) / 100,
          y: Math.round((viewport.height - t[5]) * 100) / 100,
          width: Math.round((item.width || 0) * 100) / 100,
          height: Math.round((item.height || 0) * 100) / 100,
          fontName: item.fontName,
          fontSize: Math.round(Math.hypot(t[2], t[3]) * 100) / 100,
          dir: item.dir
        });
      }
      text += item.str;
      text += item.hasEOL ? "\n" : " ";
    }
    let image = null;
    if (opts.rasterize) {
      image = await rasterizePage(page, opts.rasterScale, opts.rasterType, opts.rasterQuality);
    }
    let annotations = null;
    if (opts.annotations) {
      const list = await page.getAnnotations({ intent: "display" });
      annotations = list.map((a) => ({
        subtype: a.subtype,
        rect: a.rect,
        url: a.url || a.unsafeUrl || null,
        contents: a.contents || null,
        fieldName: a.fieldName || null
      }));
    }
    return {
      page: pageNumber,
      width: Math.round(viewport.width * 100) / 100,
      height: Math.round(viewport.height * 100) / 100,
      rotation: viewport.rotation,
      text: text.replace(/[ \t]+\n/g, "\n").trim(),
      runs: opts.layout ? runs : void 0,
      annotations: annotations || void 0,
      image
    };
  } finally {
    try {
      page.cleanup();
    } catch {
    }
  }
}
async function rasterizePage(page, scale = 1.5, type = "image/png", quality = 0.85) {
  const viewport = page.getViewport({ scale });
  const width = Math.max(1, Math.floor(viewport.width));
  const height = Math.max(1, Math.floor(viewport.height));
  const canvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(width, height) : Object.assign(document.createElement("canvas"), { width, height });
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;
  let bytes;
  if (typeof canvas.convertToBlob === "function") {
    const blob = await canvas.convertToBlob({ type, quality });
    bytes = new Uint8Array(await blob.arrayBuffer());
  } else {
    const dataUrl = canvas.toDataURL(type, quality);
    bytes = base64ToBytes(dataUrl.slice(dataUrl.indexOf(",") + 1));
  }
  canvas.width = 0;
  canvas.height = 0;
  return { type, width, height, bytes };
}
function chunkPageText(text, pageNumber, size, overlap) {
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
      text: slice.join(" "),
      words: slice.length
    });
    if (i + size >= words.length) break;
  }
  return chunks;
}
async function processLargeDocument(source, options = {}) {
  const {
    batchSize = 2,
    layout = true,
    annotations = false,
    rasterize = false,
    rasterScale = 1.5,
    rasterType = "image/png",
    rasterQuality = 0.85,
    chunkSize = 220,
    chunkOverlap = 40,
    keepPages = true,
    keepImages = false,
    onPage,
    onProgress,
    signal
  } = options;
  const started = Date.now();
  const { pdf, release } = await openStreaming(source, options);
  try {
    const total = pdf.numPages;
    const numbers = resolvePageList(options.pages, total);
    let metadata = {};
    try {
      const meta = await pdf.getMetadata();
      metadata = { ...meta.info || {} };
    } catch {
    }
    let outline = [];
    try {
      outline = flattenOutline(await pdf.getOutline());
    } catch {
    }
    const pages = [];
    const chunks = [];
    const images = [];
    let characters = 0;
    let words = 0;
    let emptyPages = 0;
    const opts = {
      layout,
      annotations,
      rasterize,
      rasterScale,
      rasterType,
      rasterQuality
    };
    for (let i = 0; i < numbers.length; i += batchSize) {
      if (signal?.aborted) throw new Error("[codbdocs] aborted");
      const batch = numbers.slice(i, i + batchSize);
      const results = await Promise.all(batch.map((n) => extractPage(pdf, n, opts)));
      for (const result of results) {
        characters += result.text.length;
        words += result.text ? result.text.split(/\s+/).filter(Boolean).length : 0;
        if (!result.text) emptyPages += 1;
        const pageChunks = chunkPageText(result.text, result.page, chunkSize, chunkOverlap);
        chunks.push(...pageChunks);
        if (result.image && keepImages) {
          images.push({ page: result.page, ...result.image });
        }
        if (onPage) await onPage({ ...result, chunks: pageChunks });
        if (keepPages) {
          const { image, ...rest } = result;
          pages.push(rest);
        }
        result.image = null;
      }
      try {
        await pdf.cleanup();
      } catch {
      }
      onProgress?.({
        page: Math.min(i + batchSize, numbers.length),
        total: numbers.length,
        percent: Math.round(Math.min(i + batchSize, numbers.length) / numbers.length * 100)
      });
    }
    return {
      ok: true,
      mode: "streaming",
      pageCount: total,
      processedPages: numbers.length,
      metadata,
      outline,
      pages: keepPages ? pages : [],
      chunks,
      images: keepImages ? images : [],
      metrics: {
        characters,
        words,
        emptyPages,
        chunkCount: chunks.length,
        durationMs: Date.now() - started
      }
    };
  } finally {
    await release();
  }
}
function resolvePageList(pages, total) {
  if (!pages) return Array.from({ length: total }, (_, i) => i + 1);
  if (Array.isArray(pages) && pages.length === 2 && pages.every((n) => typeof n === "number")) {
    const [from, to] = pages;
    const out = [];
    for (let n = Math.max(1, from); n <= Math.min(total, to); n += 1) out.push(n);
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
var CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();
function crc32(bytes) {
  let c = 4294967295;
  for (let i = 0; i < bytes.length; i += 1) c = CRC_TABLE[(c ^ bytes[i]) & 255] ^ c >>> 8;
  return (c ^ 4294967295) >>> 0;
}
function toBytes(value) {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  return new TextEncoder().encode(String(value));
}
function createZip(entries) {
  const chunks = [];
  const central = [];
  let offset = 0;
  const encoder = new TextEncoder();
  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const data = toBytes(entry.data);
    const crc = crc32(data);
    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 67324752, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 2048, true);
    lv.setUint16(8, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, data.length, true);
    lv.setUint32(22, data.length, true);
    lv.setUint16(26, nameBytes.length, true);
    local.set(nameBytes, 30);
    chunks.push(local, data);
    const dir = new Uint8Array(46 + nameBytes.length);
    const dv = new DataView(dir.buffer);
    dv.setUint32(0, 33639248, true);
    dv.setUint16(4, 20, true);
    dv.setUint16(6, 20, true);
    dv.setUint16(8, 2048, true);
    dv.setUint16(10, 0, true);
    dv.setUint32(16, crc, true);
    dv.setUint32(20, data.length, true);
    dv.setUint32(24, data.length, true);
    dv.setUint16(28, nameBytes.length, true);
    dv.setUint32(42, offset, true);
    dir.set(nameBytes, 46);
    central.push(dir);
    offset += local.length + data.length;
  }
  const centralSize = central.reduce((sum, c) => sum + c.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 101010256, true);
  ev.setUint16(8, central.length, true);
  ev.setUint16(10, central.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  return new Blob([...chunks, ...central, end], { type: "application/zip" });
}
async function packageDocument(source, options = {}) {
  const {
    name = "document.pdf",
    html = null,
    includeOriginal = true,
    includePageImages = true,
    rasterScale = 1.5,
    rasterType = "image/png",
    onProgress
  } = options;
  const entries = [];
  const pageFiles = [];
  const result = await processLargeDocument(source, {
    ...options,
    rasterize: includePageImages,
    rasterScale,
    rasterType,
    keepImages: false,
    keepPages: true,
    onProgress,
    onPage: async (page) => {
      if (page.image) {
        const ext = page.image.type.split("/")[1].replace("jpeg", "jpg");
        const file = `pages/page-${String(page.page).padStart(4, "0")}.${ext}`;
        entries.push({ name: file, data: page.image.bytes });
        pageFiles.push(file);
      }
      await options.onPage?.(page);
    }
  });
  const transcript = result.pages.map((p) => `--- Page ${p.page} ---
${p.text}`).join("\n\n");
  const data = {
    document: { name, pageCount: result.pageCount, metadata: result.metadata },
    metrics: result.metrics,
    outline: result.outline,
    pages: result.pages,
    chunks: result.chunks
  };
  if (html) entries.push({ name: "index.html", data: html });
  entries.push({ name: "transcript.txt", data: transcript });
  entries.push({ name: "rag.json", data: JSON.stringify({ chunks: result.chunks }, null, 2) });
  entries.push({ name: "outline.json", data: JSON.stringify(result.outline, null, 2) });
  entries.push({ name: "data.json", data: JSON.stringify(data, null, 2) });
  if (includeOriginal) {
    const bytes = await sourceBytes(source);
    if (bytes) entries.push({ name: "original.pdf", data: bytes });
  }
  const manifest = {
    generator: "codbdocs/large",
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    document: name,
    pageCount: result.pageCount,
    files: entries.map((e) => e.name),
    pageImages: pageFiles,
    metrics: result.metrics
  };
  entries.push({ name: "manifest.json", data: JSON.stringify(manifest, null, 2) });
  return { blob: createZip(entries), manifest, data };
}
async function sourceBytes(source) {
  if (source instanceof Uint8Array) return source;
  if (source instanceof ArrayBuffer) return new Uint8Array(source);
  if (source && typeof source.arrayBuffer === "function") {
    return new Uint8Array(await source.arrayBuffer());
  }
  if (typeof source === "string") {
    try {
      const res = await fetch(source);
      return new Uint8Array(await res.arrayBuffer());
    } catch {
      return null;
    }
  }
  return null;
}
function base64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}
function shouldStream(input, { maxBytes = 25 * 1024 * 1024, maxPages = 60 } = {}) {
  const size = typeof input === "number" ? input : input?.size ?? 0;
  const pages = typeof input === "object" ? input?.pageCount ?? 0 : 0;
  return size > maxBytes || pages > maxPages;
}

export {
  processLargeDocument,
  packageDocument,
  createZip,
  shouldStream,
};
