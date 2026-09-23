/**
 * Explicit browser-only runtime.
 *
 * These profiles never require a CodbDocs backend. PDF.js, Tesseract and any
 * optional model provider execute in the host page or its workers.
 */

import {
  buildAccessibleHtml,
  documentData,
  packageDocumentFull,
  serverlessCapabilities,
} from './serverless.js';
import { saveFilledPdf } from './forms.js';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'by', 'for', 'from', 'has',
  'have', 'how', 'i', 'in', 'is', 'it', 'do', 'does', 'of', 'on', 'or', 'that', 'the', 'this',
  'to', 'was', 'were', 'what', 'when', 'where', 'which', 'who', 'why', 'with',
]);

export const BROWSER_ONLY_PROFILES = Object.freeze({
  lite: Object.freeze({
    name: 'lite',
    description: 'Low-memory extraction, reflow, forms and local retrieval.',
    options: Object.freeze({
      includeLayout: true,
      includeImages: false,
      includeForms: true,
      enableXfa: true,
      includeVectors: false,
      includePageImages: false,
      pageBackgrounds: false,
      includeOriginal: false,
      ocr: false,
      dpi: 96,
    }),
  }),
  standard: Object.freeze({
    name: 'standard',
    description: 'Faithful accessible HTML with OCR, forms, XFA and local PDF saving.',
    options: Object.freeze({
      includeLayout: true,
      includeImages: true,
      includeForms: true,
      enableXfa: true,
      includeVectors: false,
      includePageImages: true,
      pageBackgrounds: true,
      includeOriginal: true,
      ocr: 'auto',
      dpi: 120,
    }),
  }),
  max: Object.freeze({
    name: 'max',
    description: 'Complete offline package with OCR, page images, vectors and the original PDF.',
    options: Object.freeze({
      includeLayout: true,
      includeImages: true,
      includeForms: true,
      enableXfa: true,
      includeVectors: true,
      includePageImages: true,
      pageBackgrounds: true,
      includeOriginal: true,
      ocr: 'auto',
      dpi: 150,
    }),
  }),
});

const REMOTE_OPTION_KEYS = Object.freeze([
  'aiEndpoint',
  'translationEndpoint',
  'feedbackEndpoint',
  'formSubmitEndpoint',
]);

function runtimeValue(name) {
  try {
    return globalThis[name];
  } catch {
    return undefined;
  }
}

function browserNavigator() {
  return typeof navigator !== 'undefined' ? navigator : {};
}

function providerMethod(provider, method) {
  if (typeof provider === 'function') return provider;
  if (provider && typeof provider[method] === 'function') return provider[method].bind(provider);
  return null;
}

function assertBrowserOnlyOptions(options) {
  const nested = [options.html, options.htmlOptions]
    .filter((value) => value && typeof value === 'object');
  for (const key of REMOTE_OPTION_KEYS) {
    if (options[key] || nested.some((value) => value[key])) {
      throw new Error(`[codbdocs] ${key} is not available in browser-only mode. Use a local provider or a DOM event.`);
    }
  }
  if (options.allowPdfSubmitActions === true || nested.some((value) => value.allowPdfSubmitActions === true)) {
    throw new Error('[codbdocs] PDF network submit actions are disabled in browser-only mode.');
  }
}

function processingOptions(profile, common, overrides = {}) {
  const requested = {
    ...profile.options,
    ...common,
    ...overrides,
  };
  assertBrowserOnlyOptions(requested);
  return {
    ...requested,
    formSubmitEndpoint: null,
    allowPdfSubmitActions: false,
  };
}

function sourceSize(source) {
  if (source instanceof Uint8Array || source instanceof ArrayBuffer) return source.byteLength;
  if (source && typeof source.size === 'number') return source.size;
  return 0;
}

function validateSource(source, localFilesOnly) {
  if (localFilesOnly && typeof source === 'string') {
    throw new Error('[codbdocs] URL sources are disabled because localFilesOnly is enabled.');
  }
  return source;
}

function terms(value) {
  return String(value || '')
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9'-]*/g)
    ?.filter((word) => word.length > 1 && !STOP_WORDS.has(word))
    .map((word) => {
      if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
      if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
      if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2);
      if (word.length > 3 && word.endsWith('s')) return word.slice(0, -1);
      return word;
    }) || [];
}

function chunksFromData(data) {
  if (Array.isArray(data?.chunks) && data.chunks.length) return data.chunks;
  return (data?.pages || []).map((page) => ({
    id: `page-${page.page_number || page.page || 1}`,
    page: page.page_number || page.page || 1,
    text: page.text || '',
  }));
}

/** Grounded lexical retrieval that remains useful when no local model is loaded. */
export function retrieveBrowserOnly(data, query, options = {}) {
  const queryTerms = terms(query);
  const phrase = String(query || '').trim().toLowerCase();
  const limit = Math.max(1, options.limit ?? 5);

  return chunksFromData(data)
    .map((chunk) => {
      const text = String(chunk.text || '');
      const lower = text.toLowerCase();
      const tokens = terms(text);
      const counts = new Map();
      for (const token of tokens) counts.set(token, (counts.get(token) || 0) + 1);
      let score = queryTerms.reduce((sum, token) => sum + Math.min(4, counts.get(token) || 0), 0);
      if (phrase.length > 2 && lower.includes(phrase)) score += 8;
      return { ...chunk, score };
    })
    .filter((chunk) => chunk.score > 0 || queryTerms.length === 0)
    .sort((a, b) => b.score - a.score || (a.page || 0) - (b.page || 0))
    .slice(0, limit);
}

/** Extractive summary for browsers that do not have a local language model. */
export function summarizeBrowserOnly(data, options = {}) {
  const maxSentences = Math.max(1, options.maxSentences ?? 5);
  const maxChars = Math.max(120, options.maxChars ?? 1200);
  const source = (data?.pages || []).map((page) => page.text || '').join(' ').replace(/\s+/g, ' ').trim();
  if (!source) return { answer: '', passages: [], offline: true, generated: false };

  const sentences = source.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [source];
  const frequency = new Map();
  for (const word of terms(source)) frequency.set(word, (frequency.get(word) || 0) + 1);

  const selected = sentences
    .map((sentence, index) => {
      const words = terms(sentence);
      const score = words.reduce((sum, word) => sum + (frequency.get(word) || 0), 0) / Math.sqrt(words.length || 1);
      return { sentence: sentence.trim(), index, score };
    })
    .filter((item) => item.sentence.length > 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.index - b.index);

  const passages = [];
  let answer = '';
  for (const item of selected) {
    const next = `${answer}${answer ? ' ' : ''}${item.sentence}`;
    if (next.length > maxChars && answer) break;
    answer = next.slice(0, maxChars);
    passages.push(item.sentence);
  }
  return { answer, passages, offline: true, generated: false };
}

/**
 * Inspect the current browser without starting a document job.
 * Optional providers must execute locally; the SDK never supplies an API key.
 */
export function browserOnlyCapabilities(options = {}) {
  const nav = browserNavigator();
  const providers = options.providers || {};
  const pdfjs = typeof window !== 'undefined' && (window['pdfjs-dist/build/pdf'] || window.pdfjsLib);
  const tesseract = typeof window !== 'undefined' && window.Tesseract;
  const ai = providerMethod(providers.ai, 'ask');
  const translation = providerMethod(providers.translation, 'translate');
  const vision = providerMethod(providers.vision, 'describe');
  const base = serverlessCapabilities();

  return {
    browserOnly: true,
    backendRequired: false,
    profileNames: Object.keys(BROWSER_ONLY_PROFILES),
    runtime: {
      browser: typeof window !== 'undefined' && typeof document !== 'undefined',
      pdfjs: Boolean(pdfjs),
      tesseract: Boolean(tesseract),
      webAssembly: typeof WebAssembly !== 'undefined',
      workers: typeof Worker !== 'undefined',
      offscreenCanvas: typeof OffscreenCanvas !== 'undefined',
      indexedDB: Boolean(runtimeValue('indexedDB')),
      webCrypto: Boolean(runtimeValue('crypto')?.subtle),
      webGPU: Boolean(nav.gpu),
      speech: typeof speechSynthesis !== 'undefined',
      fileSystemAccess: typeof showSaveFilePicker !== 'undefined',
      deviceMemoryGB: nav.deviceMemory || null,
      logicalProcessors: nav.hardwareConcurrency || null,
    },
    features: {
      ...base,
      offlineGroundedQnA: true,
      localGenerativeQnA: Boolean(ai),
      localTranslation: Boolean(translation),
      localImageDescription: Boolean(vision),
      remediatedPdfUaWriter: false,
      trustedCertificateSignatures: false,
      automaticCrossOriginCrawling: false,
      realtimeCollaboration: false,
    },
    limits: {
      xfa: 'PDF.js-compatible XFA plus CodbDocs browser rules; Acrobat-only services and arbitrary scripts are not executed.',
      crawling: 'Same-origin URLs, CORS-enabled URLs and user-selected files only while the browser application is running.',
      signatures: 'Typed, drawn and uploaded electronic signatures; certificate-backed PDF signatures need a local signing integration.',
      collaboration: 'Export/import review packages unless the host application supplies a synchronization provider.',
      localModels: 'Generative answers, translation and image descriptions depend on an optional WebGPU or WebAssembly model provider.',
      pdfUa: 'Accessibility auditing and HTML remediation are available; writing a fully tagged PDF/UA structure tree is not yet implemented.',
    },
  };
}

/** Heuristic profile selection; callers can always override the result. */
export function recommendBrowserOnlyProfile(input = {}) {
  const nav = browserNavigator();
  const bytes = input.bytes ?? input.size ?? 0;
  const pages = input.pages ?? 0;
  const memory = input.deviceMemoryGB ?? nav.deviceMemory ?? 4;
  const reasons = [];
  let profile = 'standard';

  if (memory <= 2 || bytes > 100 * 1024 * 1024 || pages > 500) {
    profile = 'lite';
    reasons.push('The document or device is resource constrained.');
  } else if (memory >= 8 && bytes <= 25 * 1024 * 1024 && pages <= 150) {
    profile = 'max';
    reasons.push('The device has enough memory for page images, vectors and an embedded original.');
  } else {
    reasons.push('Balanced fidelity and browser memory use.');
  }

  return { profile, reasons, bytes, pages, deviceMemoryGB: memory };
}

/**
 * Create a backend-free SDK facade.
 *
 * Providers are optional browser functions or objects:
 *   ai.ask({ question, passages, data })
 *   ai.summarize({ data, fallback })
 *   translation.translate({ text, target, sourceLanguage })
 *   vision.describe({ image, context })
 */
export function createBrowserOnlySDK(options = {}) {
  const selected = options.profile || 'standard';
  const profile = BROWSER_ONLY_PROFILES[selected];
  if (!profile) {
    throw new Error(`[codbdocs] Unknown browser-only profile "${selected}". Use lite, standard or max.`);
  }

  const providers = options.providers || {};
  const common = { ...(options.processing || {}) };
  const localFilesOnly = options.localFilesOnly === true;
  assertBrowserOnlyOptions(common);

  const api = {
    mode: 'browser-only',
    profile: profile.name,
    profileOptions: { ...profile.options },
    capabilities: () => browserOnlyCapabilities({ providers }),
    recommendProfile: (sourceOrMetrics = {}) => recommendBrowserOnlyProfile(
      sourceOrMetrics && (sourceOrMetrics.bytes != null || sourceOrMetrics.pages != null)
        ? sourceOrMetrics
        : { bytes: sourceSize(sourceOrMetrics) },
    ),
    process: (source, overrides = {}) => documentData(
      validateSource(source, localFilesOnly),
      processingOptions(profile, common, overrides),
    ),
    buildHtml: (source, overrides = {}) => buildAccessibleHtml(
      validateSource(source, localFilesOnly),
      processingOptions(profile, common, overrides),
    ),
    package: (source, overrides = {}) => packageDocumentFull(
      validateSource(source, localFilesOnly),
      processingOptions(profile, common, overrides),
    ),
    saveFilledPdf: (source, values, overrides = {}) => saveFilledPdf(
      validateSource(source, localFilesOnly),
      values,
      { enableXfa: true, ...overrides },
    ),
    retrieve: (data, query, overrides = {}) => retrieveBrowserOnly(data, query, overrides),
    ask: async (data, question, overrides = {}) => {
      const passages = retrieveBrowserOnly(data, question, overrides);
      const ask = providerMethod(providers.ai, 'ask');
      if (ask) return ask({ question, passages, data, options: overrides });
      const answer = passages[0]?.text || 'No matching passage was found in this document.';
      return {
        answer,
        passages,
        citations: passages.map((passage) => ({ page: passage.page, chunk: passage.id })),
        confidence: passages.length ? Math.min(1, 0.35 + passages[0].score / 20) : 0,
        offline: true,
        generated: false,
      };
    },
    summarize: async (data, overrides = {}) => {
      const fallback = summarizeBrowserOnly(data, overrides);
      const summarize = providerMethod(providers.ai, 'summarize');
      return summarize ? summarize({ data, fallback, options: overrides }) : fallback;
    },
    translate: async (text, target, overrides = {}) => {
      const translate = providerMethod(providers.translation, 'translate');
      if (!translate) {
        throw new Error('[codbdocs] Browser-only translation needs a local translation provider.');
      }
      return translate({ text, target, sourceLanguage: overrides.sourceLanguage || 'auto', options: overrides });
    },
    describeImage: async (image, context = {}, overrides = {}) => {
      const describe = providerMethod(providers.vision, 'describe');
      if (!describe) {
        throw new Error('[codbdocs] Browser-only image descriptions need a local vision provider.');
      }
      return describe({ image, context, options: overrides });
    },
  };

  return Object.freeze(api);
}
