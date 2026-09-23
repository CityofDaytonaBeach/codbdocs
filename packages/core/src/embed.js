/**
 * CodbDocs website helper.
 *
 * Loads a site manifest, upgrades exact enabled document links, and opens the
 * configured accessible viewer in a new tab or an accessible lightbox.
 * This file has no imports so it can be loaded directly from jsDelivr.
 */
(function installCodbDocsEmbed(global) {
  'use strict';

  const scriptAtLoad = typeof document !== 'undefined' ? document.currentScript : null;
  const managedAnchors = new Set();
  const state = {
    config: null,
    manifest: null,
    manifestUrl: null,
    documentIndex: new Map(),
    observer: null,
    overlay: null,
    lastFocus: null,
    inerted: [],
    styleNode: null,
  };

  function toBoolean(value, fallback) {
    if (value == null || value === '') return fallback;
    return !/^(false|0|no|off)$/i.test(String(value));
  }

  function resolveUrl(value, base) {
    if (!value) return null;
    try {
      return new URL(value, base || document.baseURI).href;
    } catch {
      return null;
    }
  }

  function canonicalUrl(value, base) {
    const resolved = resolveUrl(value, base);
    if (!resolved) return null;
    const url = new URL(resolved);
    url.hash = '';
    return url.href;
  }

  function emit(name, detail) {
    if (typeof document === 'undefined') return;
    document.dispatchEvent(new CustomEvent(`codbdocs:${name}`, { detail }));
  }

  function validateManifest(manifest) {
    if (!manifest || typeof manifest !== 'object') {
      throw new Error('Manifest must be a JSON object.');
    }
    if (manifest.version !== 1) {
      throw new Error(`Unsupported manifest version: ${manifest.version ?? 'missing'}.`);
    }
    if (!Array.isArray(manifest.documents)) {
      throw new Error('Manifest documents must be an array.');
    }
    return manifest;
  }

  function configFrom(script, manifest, overrides) {
    const data = script?.dataset || {};
    const site = manifest.site || {};
    const defaults = manifest.defaults || {};
    const manifestUrl = overrides.manifestUrl || data.manifest || '/codbdocs-manifest.json';
    const manifestAbsolute = resolveUrl(manifestUrl, document.baseURI);
    const scriptBase = script?.src ? new URL('.', script.src).href : document.baseURI;
    const baseUrl = resolveUrl(overrides.baseUrl || site.baseUrl, manifestAbsolute) || document.baseURI;
    const viewerValue = overrides.viewerUrl || data.viewer || site.viewerUrl;
    const viewerBase = overrides.viewerUrl || data.viewer ? document.baseURI : baseUrl;

    return {
      manifestUrl: manifestAbsolute,
      baseUrl,
      viewerUrl: resolveUrl(viewerValue, viewerBase),
      openMode: overrides.openMode || data.openMode || site.openMode || defaults.openMode || 'new-tab',
      selector: overrides.selector || data.selector || site.selector || 'a[href]',
      styleUrl: overrides.styleUrl === false
        ? null
        : resolveUrl(overrides.styleUrl || data.style || 'embed.css', scriptBase),
      defaultEnabled: toBoolean(defaults.enabled, false),
      debug: toBoolean(overrides.debug ?? data.debug, false),
    };
  }

  function indexDocuments(manifest, config) {
    const index = new Map();
    for (const entry of manifest.documents) {
      if (!entry || typeof entry !== 'object' || !entry.url) continue;
      const key = canonicalUrl(entry.url, config.baseUrl);
      if (key) index.set(key, entry);
    }
    return index;
  }

  function documentIsEnabled(entry) {
    return toBoolean(entry.enabled, state.config.defaultEnabled);
  }

  function viewerUrlFor(entry, sourceUrl) {
    const direct = resolveUrl(entry.accessibleUrl, state.config.baseUrl);
    if (direct) return direct;

    const viewerBase = resolveUrl(entry.viewerUrl, state.config.baseUrl) || state.config.viewerUrl;
    if (!viewerBase) return null;

    const viewer = new URL(viewerBase);
    viewer.searchParams.set('document', sourceUrl);
    if (entry.id) viewer.searchParams.set('id', entry.id);
    if (entry.title) viewer.searchParams.set('title', entry.title);
    if (state.config.manifestUrl) viewer.searchParams.set('manifest', state.config.manifestUrl);
    return viewer.href;
  }

  function ensureStyles() {
    if (!state.config.styleUrl || state.styleNode || typeof document === 'undefined') return;
    const existing = document.querySelector('link[data-codbdocs-styles]');
    if (existing) {
      state.styleNode = existing;
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = state.config.styleUrl;
    link.dataset.codbdocsStyles = 'true';
    document.head.appendChild(link);
    state.styleNode = link;
  }

  function closeLightbox() {
    if (!state.overlay) return;
    state.overlay.remove();
    state.overlay = null;
    for (const element of state.inerted) element.inert = false;
    state.inerted = [];
    document.documentElement.classList.remove('codbdocs-modal-open');
    state.lastFocus?.focus?.();
    state.lastFocus = null;
  }

  function openLightbox(url, title) {
    closeLightbox();
    ensureStyles();
    state.lastFocus = document.activeElement;

    const overlay = document.createElement('div');
    overlay.className = 'codbdocs-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title || 'Accessible document viewer');

    const panel = document.createElement('div');
    panel.className = 'codbdocs-modal';

    const bar = document.createElement('div');
    bar.className = 'codbdocs-modal-bar';

    const heading = document.createElement('strong');
    heading.className = 'codbdocs-modal-title';
    heading.textContent = title || 'Accessible document';

    const actions = document.createElement('div');
    actions.className = 'codbdocs-modal-actions';

    const external = document.createElement('a');
    external.href = url;
    external.target = '_blank';
    external.rel = 'noopener';
    external.textContent = 'Open in new tab';

    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close';
    close.addEventListener('click', closeLightbox);

    const frame = document.createElement('iframe');
    frame.className = 'codbdocs-frame';
    frame.src = url;
    frame.title = title || 'Accessible document viewer';
    frame.setAttribute('allow', 'clipboard-write');

    actions.append(external, close);
    bar.append(heading, actions);
    panel.append(bar, frame);
    overlay.append(panel);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeLightbox();
    });
    overlay.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
    });

    document.body.appendChild(overlay);
    state.inerted = [...document.body.children].filter((element) => element !== overlay && !element.inert);
    for (const element of state.inerted) element.inert = true;
    document.documentElement.classList.add('codbdocs-modal-open');
    state.overlay = overlay;
    close.focus();
  }

  function restoreAnchor(anchor) {
    if (!Object.prototype.hasOwnProperty.call(anchor.dataset, 'codbdocsOriginalHref')) return;
    anchor.setAttribute('href', anchor.dataset.codbdocsOriginalHref);
    if (anchor.dataset.codbdocsOriginalTarget) anchor.setAttribute('target', anchor.dataset.codbdocsOriginalTarget);
    else anchor.removeAttribute('target');
    if (anchor.dataset.codbdocsOriginalRel) anchor.setAttribute('rel', anchor.dataset.codbdocsOriginalRel);
    else anchor.removeAttribute('rel');
    if (anchor.dataset.codbdocsOriginalAriaLabel) anchor.setAttribute('aria-label', anchor.dataset.codbdocsOriginalAriaLabel);
    else anchor.removeAttribute('aria-label');
    delete anchor.dataset.codbdocsOriginalHref;
    delete anchor.dataset.codbdocsOriginalTarget;
    delete anchor.dataset.codbdocsOriginalRel;
    delete anchor.dataset.codbdocsOriginalAriaLabel;
    delete anchor.dataset.codbdocsManaged;
    delete anchor.dataset.codbdocsSource;
    delete anchor.dataset.codbdocsMode;
    anchor.classList.remove('codbdocs-link');
    if (anchor._codbdocsClick) {
      anchor.removeEventListener('click', anchor._codbdocsClick);
      delete anchor._codbdocsClick;
    }
    managedAnchors.delete(anchor);
  }

  function upgradeAnchor(anchor) {
    const sourceAttribute = anchor.dataset.codbdocsOriginalHref || anchor.getAttribute('href');
    const sourceUrl = canonicalUrl(sourceAttribute, document.baseURI);
    if (!sourceUrl) return false;

    const entry = state.documentIndex.get(sourceUrl);
    if (!entry || !documentIsEnabled(entry)) {
      if (anchor.dataset.codbdocsManaged) restoreAnchor(anchor);
      return false;
    }

    const accessibleUrl = viewerUrlFor(entry, sourceUrl);
    if (!accessibleUrl) return false;

    if (!anchor.dataset.codbdocsManaged) {
      anchor.dataset.codbdocsOriginalHref = anchor.getAttribute('href') || '';
      anchor.dataset.codbdocsOriginalTarget = anchor.getAttribute('target') || '';
      anchor.dataset.codbdocsOriginalRel = anchor.getAttribute('rel') || '';
      anchor.dataset.codbdocsOriginalAriaLabel = anchor.getAttribute('aria-label') || '';
    }

    const mode = entry.openMode || state.config.openMode;
    if (
      anchor.dataset.codbdocsManaged &&
      anchor.href === accessibleUrl &&
      anchor.dataset.codbdocsMode === mode
    ) return true;

    anchor.href = accessibleUrl;
    anchor.dataset.codbdocsManaged = 'true';
    anchor.dataset.codbdocsSource = sourceUrl;
    anchor.dataset.codbdocsMode = mode;
    anchor.classList.add('codbdocs-link');

    const currentLabel = anchor.dataset.codbdocsOriginalAriaLabel || anchor.textContent.trim() || entry.title || 'PDF document';
    anchor.setAttribute('aria-label', `${currentLabel} (accessible document viewer)`);

    if (anchor._codbdocsClick) anchor.removeEventListener('click', anchor._codbdocsClick);
    if (mode === 'lightbox') {
      anchor.removeAttribute('target');
      anchor._codbdocsClick = (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openLightbox(accessibleUrl, entry.title || anchor.textContent.trim());
      };
      anchor.addEventListener('click', anchor._codbdocsClick);
    } else {
      anchor.target = '_blank';
      anchor.rel = 'noopener';
    }

    managedAnchors.add(anchor);
    return true;
  }

  function scan(root) {
    if (!state.config || !root) return 0;
    const anchors = [];
    if (root.matches?.(state.config.selector)) anchors.push(root);
    anchors.push(...(root.querySelectorAll?.(state.config.selector) || []));
    let upgraded = 0;
    for (const anchor of anchors) {
      if (anchor instanceof HTMLAnchorElement && upgradeAnchor(anchor)) upgraded += 1;
    }
    return upgraded;
  }

  function watch() {
    state.observer?.disconnect();
    state.observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'attributes') scan(record.target);
        for (const node of record.addedNodes || []) {
          if (node.nodeType === Node.ELEMENT_NODE) scan(node);
        }
      }
    });
    state.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href'],
    });
  }

  async function init(overrides = {}) {
    try {
      const script = overrides.script || scriptAtLoad || document.querySelector('script[data-codbdocs]');
      const manifestUrl = resolveUrl(overrides.manifestUrl || script?.dataset.manifest || '/codbdocs-manifest.json', document.baseURI);
      const manifest = validateManifest(overrides.manifest || await fetch(manifestUrl, {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      }).then((response) => {
        if (!response.ok) throw new Error(`Manifest request failed with ${response.status}.`);
        return response.json();
      }));

      destroy({ keepStyles: true });
      state.manifestUrl = manifestUrl;
      state.manifest = manifest;
      state.config = configFrom(script, manifest, { ...overrides, manifestUrl });
      state.documentIndex = indexDocuments(manifest, state.config);
      ensureStyles();
      const upgraded = scan(document);
      watch();
      const detail = { documents: state.documentIndex.size, upgraded, manifestUrl };
      if (state.config.debug) console.info('[codbdocs] helper ready', detail);
      emit('ready', detail);
      return detail;
    } catch (error) {
      console.error('[codbdocs] helper failed:', error);
      emit('error', { error });
      throw error;
    }
  }

  function refresh() {
    return scan(document);
  }

  function destroy(options = {}) {
    state.observer?.disconnect();
    state.observer = null;
    closeLightbox();
    for (const anchor of [...managedAnchors]) restoreAnchor(anchor);
    state.documentIndex = new Map();
    state.manifest = null;
    state.manifestUrl = null;
    state.config = null;
    if (!options.keepStyles && state.styleNode?.dataset.codbdocsStyles) state.styleNode.remove();
    if (!options.keepStyles) state.styleNode = null;
  }

  function getState() {
    return {
      manifestUrl: state.manifestUrl,
      documentCount: state.documentIndex.size,
      managedLinkCount: managedAnchors.size,
      openMode: state.config?.openMode || null,
    };
  }

  global.CodbDocsEmbed = { init, refresh, destroy, closeLightbox, getState };

  if (scriptAtLoad && toBoolean(scriptAtLoad.dataset.auto, true)) {
    const start = () => init({ script: scriptAtLoad }).catch(() => {});
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else queueMicrotask(start);
  }
})(typeof window !== 'undefined' ? window : globalThis);
