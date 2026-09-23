import { buildAccessibleHtml } from 'https://cdn.jsdelivr.net/gh/CityofDaytonaBeach/codbdocs@main/packages/core/src/index.js';

const params = new URLSearchParams(location.search);
const elements = {
  title: document.getElementById('documentTitle'),
  sourceLink: document.getElementById('sourceLink'),
  empty: document.getElementById('emptyState'),
  loading: document.getElementById('loadingState'),
  loadingMessage: document.getElementById('loadingMessage'),
  progress: document.getElementById('loadingProgress'),
  error: document.getElementById('errorState'),
  errorMessage: document.getElementById('errorMessage'),
  errorSourceLink: document.getElementById('errorSourceLink'),
  frame: document.getElementById('documentFrame'),
  fileInput: document.getElementById('fileInput'),
  errorFileInput: document.getElementById('errorFileInput'),
};

let frameObjectUrl = null;

function canonicalUrl(value, base = location.href) {
  if (!value) return null;
  try {
    const url = new URL(value, base);
    if (!/^https?:$/.test(url.protocol)) return null;
    url.hash = '';
    return url.href;
  } catch {
    return null;
  }
}

function show(name) {
  elements.empty.hidden = name !== 'empty';
  elements.loading.hidden = name !== 'loading';
  elements.error.hidden = name !== 'error';
  elements.frame.hidden = name !== 'frame';
}

function setSourceLink(url) {
  for (const link of [elements.sourceLink, elements.errorSourceLink]) {
    link.hidden = !url;
    if (url) link.href = url;
  }
}

async function loadManifest(url) {
  if (!url) return null;
  const response = await fetch(url, { credentials: 'same-origin', headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Manifest request failed with ${response.status}.`);
  const manifest = await response.json();
  return manifest?.version === 1 ? manifest : null;
}

function findDocument(manifest, sourceUrl, id) {
  if (!manifest?.documents) return null;
  if (id) {
    const byId = manifest.documents.find((entry) => entry.id === id);
    if (byId) return byId;
  }
  return manifest.documents.find((entry) => canonicalUrl(entry.url, manifest.site?.baseUrl || location.href) === sourceUrl) || null;
}

async function readRemotePdf(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) throw new Error(`PDF request failed with ${response.status}.`);
  const contentType = response.headers.get('content-type') || '';
  if (contentType && !contentType.includes('pdf') && !contentType.includes('octet-stream')) {
    console.warn(`[codbdocs] Expected a PDF response but received ${contentType}.`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

function viewerOptions(sourceUrl, source, manifest, entry) {
  const site = manifest?.site || {};
  const title = entry?.title || params.get('title') || source?.name || 'Document';
  const language = entry?.language || site.language || 'en';
  return {
    title,
    language,
    name: source?.name || title,
    ocr: entry?.ocr ?? 'auto',
    dpi: entry?.dpi || 150,
    includeOriginal: true,
    onProgress(info) {
      elements.progress.value = info.percent || 0;
      elements.loadingMessage.textContent = `Processing page ${info.page} of ${info.total}...`;
    },
    html: {
      title,
      lang: language,
      documentId: entry?.id || null,
      originalUrl: sourceUrl,
      sourceUrl,
      permalink: location.href,
      translate: site.translation === true,
      priorityLanguages: site.priorityLanguages || [],
      qaEndpoint: site.qaEndpoint || null,
      aiEndpoint: site.aiEndpoint || null,
      feedbackEmail: site.feedbackEmail || null,
      airaUrl: site.airaUrl || null,
    },
  };
}

async function openDocument(source, context = {}) {
  const sourceUrl = typeof source === 'string' ? canonicalUrl(source) : null;
  const title = context.entry?.title || params.get('title') || source?.name || 'Document';
  document.title = `${title} - CodbDocs`;
  elements.title.textContent = title;
  elements.loadingMessage.textContent = sourceUrl ? 'Loading PDF...' : 'Reading PDF...';
  elements.progress.value = 0;
  setSourceLink(sourceUrl);
  show('loading');

  try {
    const bytes = sourceUrl ? await readRemotePdf(sourceUrl) : new Uint8Array(await source.arrayBuffer());
    elements.loadingMessage.textContent = 'Analyzing document structure...';
    const result = await buildAccessibleHtml(bytes, viewerOptions(sourceUrl, source, context.manifest, context.entry));

    if (frameObjectUrl) URL.revokeObjectURL(frameObjectUrl);
    frameObjectUrl = URL.createObjectURL(new Blob([result.html], { type: 'text/html' }));
    elements.frame.title = `${title} accessible document`;
    elements.frame.src = frameObjectUrl;
    show('frame');
  } catch (error) {
    console.error('[codbdocs] viewer failed:', error);
    const corsHint = sourceUrl && error instanceof TypeError
      ? ' The PDF host may need to allow cross-origin browser requests, or the viewer can be hosted on the same domain as the PDF.'
      : '';
    elements.errorMessage.textContent = `${error.message || 'The document could not be processed.'}${corsHint}`;
    show('error');
  }
}

async function start() {
  const sourceUrl = canonicalUrl(params.get('document'));
  if (!sourceUrl) {
    show('empty');
    return;
  }

  let manifest = null;
  let entry = null;
  try {
    const manifestUrl = canonicalUrl(params.get('manifest'));
    manifest = await loadManifest(manifestUrl);
    entry = findDocument(manifest, sourceUrl, params.get('id'));
  } catch (error) {
    console.warn('[codbdocs] manifest settings were not loaded:', error);
  }
  await openDocument(sourceUrl, { manifest, entry });
}

for (const input of [elements.fileInput, elements.errorFileInput]) {
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (file) openDocument(file);
  });
}

window.addEventListener('beforeunload', () => {
  if (frameObjectUrl) URL.revokeObjectURL(frameObjectUrl);
});

start();
