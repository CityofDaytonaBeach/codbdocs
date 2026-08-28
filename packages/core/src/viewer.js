// Self-contained offline viewer chrome for the generated visual HTML.
//
// Everything here is pure HTML/CSS/JS that ships inside the exported page and
// runs fully offline in the browser. It layers a documents/PDF-style viewer on
// top of CodbDocs' own extracted IR + RAG data:
//   - PDF / Text / Both view modes
//   - page navigation + zoom (fit / 100% / custom)
//   - outline navigation (from the embedded RAG outline)
//   - offline search over the positioned text runs with jump + highlight
//   - high-contrast accessibility toggle + keyboard shortcuts

export function generateViewerChrome(ragPayload) {
  const outline = (ragPayload && ragPayload.outline) || [];
  return {
    toolbar: viewerToolbarHTML(),
    sidebar: viewerSidebarHTML(outline),
    script: viewerScript(),
    styles: viewerStyles(),
  };
}

function viewerToolbarHTML() {
  return `
  <div class="codbdocs-toolbar" role="group" aria-label="Document viewer controls">
    <div class="codbdocs-searchbox">
      <input type="search" id="codbdocs-search-input" aria-label="Search this document"
        placeholder="Search document\u2026" autocomplete="off">
      <span id="codbdocs-search-count" class="codbdocs-search-count" role="status" aria-live="polite"></span>
    </div>
    <div class="codbdocs-sep" aria-hidden="true"></div>
    <button type="button" class="codbdocs-toggle" id="codbdocs-view-pdf" data-codbdocs-view="pdf" aria-pressed="true">PDF</button>
    <button type="button" class="codbdocs-toggle" id="codbdocs-view-text" data-codbdocs-view="text" aria-pressed="false">Text</button>
    <button type="button" class="codbdocs-toggle" id="codbdocs-view-both" data-codbdocs-view="both" aria-pressed="false">Both</button>
    <div class="codbdocs-sep" aria-hidden="true"></div>
    <button type="button" class="codbdocs-btn" id="codbdocs-page-prev" aria-label="Previous page">\u2039</button>
    <span id="codbdocs-page-label" class="codbdocs-page-label" aria-live="polite">Page 1 / 1</span>
    <button type="button" class="codbdocs-btn" id="codbdocs-page-next" aria-label="Next page">\u203a</button>
    <div class="codbdocs-sep" aria-hidden="true"></div>
    <button type="button" class="codbdocs-btn" id="codbdocs-zoom-out" aria-label="Zoom out">\u2212</button>
    <button type="button" class="codbdocs-btn" id="codbdocs-zoom-fit" aria-label="Fit to width">Fit</button>
    <button type="button" class="codbdocs-btn" id="codbdocs-zoom-in" aria-label="Zoom in">+</button>
    <div class="codbdocs-sep" aria-hidden="true"></div>
    <button type="button" class="codbdocs-toggle" id="codbdocs-contrast" aria-pressed="false">High contrast</button>
    <button type="button" class="codbdocs-btn" id="codbdocs-outline-toggle" aria-expanded="true" aria-controls="codbdocs-outline">Outline</button>
  </div>
  `;
}

function viewerSidebarHTML(outline) {
  const lis = renderOutlineList(outline);
  return `
  <aside id="codbdocs-outline" class="codbdocs-outline" aria-label="Document outline">
    <section class="codbdocs-search-results-wrap" aria-label="Search results">
      <h2 class="codbdocs-panel-title">Search Results</h2>
      <div id="codbdocs-search-results" class="codbdocs-search-results" role="list"></div>
    </section>
    <section class="codbdocs-outline-wrap" aria-label="Outline">
      <h2 class="codbdocs-panel-title">Outline</h2>
    <div class="codbdocs-outline-inner">
      ${lis || '<p class="codbdocs-outline-empty">No outline in this document.</p>'}
    </div>
    </section>
  </aside>
  `;
}

function renderOutlineList(nodes, depth) {
  if (!Array.isArray(nodes) || nodes.length === 0) return '';
  const d = depth || 0;
  let html = '<ul class="codbdocs-outline-list">';
  for (const node of nodes) {
    const label = escapeHTML(node.title || 'Untitled');
    const page = node.page || node.pageNum || 0;
    const dest = encodeURIComponent(node.title || '');
    html += `<li class="codbdocs-outline-item" style="padding-left:${d * 14}px">` +
      `<a href="#codbdocs-search" class="codbdocs-outline-link" data-outline-dest="${dest}"
         data-outline-page="${page}">${label}</a></li>`;
    if (node.items && node.items.length) html += renderOutlineList(node.items, d + 1);
  }
  html += '</ul>';
  return html;
}

function viewerStyles() {
  return `
  <style id="codbdocs-viewer-styles">
    body { max-width: none; margin: 0; padding: 20px; }
    #codbdocs-viewer { display: flex; align-items: flex-start; gap: 16px; max-width: 1200px; margin: 0 auto; padding: 0 12px 40px; }
    #codbdocs-main { flex: 1 1 auto; min-width: 0; overflow: auto; }
    .pdf-page { width: fit-content; max-width: none; padding: 0; overflow: hidden; }
    .pdf-page-raster > img { display: block; position: relative; z-index: 1; width: auto; height: auto; max-width: none; }
    .pdf-text-layer { position: absolute; inset: 0; z-index: 3; }
    .codbdocs-sidebar { width: 240px; flex: 0 0 240px; }
    .codbdocs-outline { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.06); max-height: 70vh; overflow: auto; position: sticky; top: 12px; }
    .codbdocs-outline-list { list-style: none; margin: 0; padding: 0; }
    .codbdocs-outline-item { border-bottom: 1px solid #f0f0f0; }
    .codbdocs-outline-link { display: block; padding: 5px 6px; color: #334; text-decoration: none; font-size: 13px; border-radius: 4px; }
    .codbdocs-outline-link:hover, .codbdocs-outline-link.is-active { background: #eef1ff; color: #1c2b8a; }
    .codbdocs-outline-empty { color: #888; font-size: 13px; padding: 6px; margin: 0; }
    .codbdocs-panel-title { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: #667; margin: 2px 6px 8px; }
    .codbdocs-search-results-wrap { border-bottom: 1px solid #eee; margin-bottom: 10px; padding-bottom: 10px; }
    .codbdocs-search-result { display: block; width: 100%; text-align: left; border: 0; border-radius: 6px; background: transparent; padding: 7px 8px; margin: 2px 0; color: #334; cursor: pointer; font-size: 12px; }
    .codbdocs-search-result:hover, .codbdocs-search-result.is-active { background: #fff4cc; color: #222; }
    .codbdocs-search-result-page { display: block; font-weight: 700; margin-bottom: 2px; }
    .codbdocs-search-result-snippet { display: block; color: #667; line-height: 1.35; }
    .codbdocs-toolbar { display: flex; align-items: center; gap: 6px; background: #1f2430; color: #fff; padding: 8px 12px; border-radius: 8px; margin: 12px auto; flex-wrap: wrap; justify-content: center; position: sticky; top: 0; z-index: 40; box-shadow: 0 2px 6px rgba(0,0,0,.25); max-width: 1180px; }
    .codbdocs-toolbar .codbdocs-toggle, .codbdocs-toolbar .codbdocs-btn { background: #2b3140; color: #cfd6e6; border: 1px solid #40475a; border-radius: 6px; padding: 6px 10px; font-size: 13px; cursor: pointer; }
    .codbdocs-toolbar .codbdocs-toggle.is-active { background: #4361ee; color: #fff; border-color: #4361ee; }
    .codbdocs-toolbar .codbdocs-btn:hover, .codbdocs-toolbar .codbdocs-toggle:hover { background: #394159; }
    .codbdocs-searchbox { display: flex; align-items: center; gap: 8px; }
    .codbdocs-searchbox input { padding: 6px 10px; border: 1px solid #40475a; border-radius: 6px; background: #0d1117; color: #eee; font-size: 13px; width: 220px; }
    .codbdocs-searchbox input:focus { outline: 2px solid #4361ee; }
    .codbdocs-search-count { font-size: 12px; color: #9aa4bd; min-width: 28px; text-align: center; white-space: nowrap; }
    .codbdocs-page-label { color: #cfd6e6; font-size: 13px; min-width: 90px; text-align: center; }
    .codbdocs-sep { width: 1px; height: 22px; background: #3a4155; margin: 0 2px; }
    .codbdocs-viewer-hint { color: #9aa4bd; font-size: 11px; text-align: center; margin: 8px auto 0; max-width: 1180px; }

    body[data-codbdocs-view="text"] .pdf-page-raster { display: none; }
    body[data-codbdocs-view="text"] .pdf-embedded-image { display: none; }
    body[data-codbdocs-view="pdf"] .pdf-text-layer { visibility: hidden; }
    body[data-codbdocs-view="pdf"] .pdf-text-layer { pointer-events: none; }
    body[data-codbdocs-view="pdf"][data-codbdocs-searching="true"] .pdf-text-layer { visibility: visible; pointer-events: auto; }
    body[data-codbdocs-view="pdf"][data-codbdocs-searching="true"] .pdf-text { color: transparent !important; }
    body[data-codbdocs-view="pdf"][data-codbdocs-searching="true"] .pdf-text.sr-highlight { color: #000 !important; }

    .pdf-text.sr-highlight { background: rgba(255, 213, 79, 0.9); color: #000; border-radius: 2px; }
    .pdf-text.sr-highlight.is-current { background: #ff8c1a; color: #000; }
    .codbdocs-zoom-wrap { position: relative; margin: 20px auto; transform-origin: top center; transition: width .15s ease, height .15s ease; }

    body[data-codbdocs-contrast="high"] { background: #000; color: #fff; }
    body[data-codbdocs-contrast="high"] .pdf-page { box-shadow: 0 0 0 1px #777; }
    body[data-codbdocs-contrast="high"] .codbdocs-outline { border-color: #555; }
    :focus-visible { outline: 3px solid #4361ee; outline-offset: 1px; }
    .skip-link { position: absolute; left: -999px; top: 0; background: #4361ee; color: #fff; padding: 8px 12px; border-radius: 0 0 6px 0; z-index: 100; }
    .skip-link:focus { left: 0; }
    @media (max-width: 900px) { #codbdocs-viewer { flex-direction: column; } .codbdocs-sidebar { width: 100%; flex: 1 1 auto; } .codbdocs-outline { position: static; max-height: none; } }
  </style>
  `;
}

function viewerScript() {
  return `
  <script>
  (function () {
    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

    var body = document.body;
    var pages = $$('.pdf-page');
    var currentPage = 1;
    var zoom = 1;
    var fitMode = true;
    var rag = {};
    var ragEl = $('#codbdocs-rag');
    if (ragEl) {
      try { rag = JSON.parse(ragEl.textContent || '{}') || {}; } catch (e) { rag = {}; }
    }
    var pageTextIndex = (rag.pages || []).map(function (p) {
      return { page: p.page || 1, text: normalize(p.text || ''), raw: p.text || '' };
    });

    // Wrap each page so zoom scales raster + text together and keeps alignment.
    pages.forEach(function (pg) {
      var wrap = document.createElement('div');
      wrap.className = 'codbdocs-zoom-wrap';
      pg.parentNode.insertBefore(wrap, pg);
      wrap.appendChild(pg);
      pg.style.margin = '0 auto';
    });
    var wraps = $$('.codbdocs-zoom-wrap');
    function applyZoom() {
      wraps.forEach(function (w) {
        var pg = $('.pdf-page', w);
        if (!pg) return;
        w.style.width = (pg.offsetWidth * zoom) + 'px';
        w.style.height = (pg.offsetHeight * zoom) + 'px';
        pg.style.transform = 'scale(' + zoom + ')';
        pg.style.transformOrigin = 'top center';
      });
    }
    function fitWidth() {
      var main = $('#codbdocs-main') || document.body;
      var first = pages[0];
      if (!main || !first || !first.offsetWidth) return;
      var available = Math.max(280, main.clientWidth - 24);
      zoom = Math.max(0.35, Math.min(2, +(available / first.offsetWidth).toFixed(2)));
      fitMode = true;
      applyZoom();
    }

    function updatePageLabel(n) {
      var total = pages.length;
      currentPage = Math.max(1, Math.min(total || 1, n || 1));
      var label = $('#codbdocs-page-label');
      if (label) label.textContent = 'Page ' + currentPage + ' / ' + (total || 1);
    }

    function setView(v) {
      body.dataset.codbdocsView = v;
      var states = { pdf: false, text: false, both: false };
      states[v] = true;
      ['pdf', 'text', 'both'].forEach(function (k) {
        var b = $('#codbdocs-view-' + k);
        if (b) { b.classList.toggle('is-active', states[k]); b.setAttribute('aria-pressed', states[k] ? 'true' : 'false'); }
      });
    }

    function gotoPage(n, opts) {
      opts = opts || {};
      var total = pages.length;
      if (!total) return;
      n = Math.max(1, Math.min(total, n));
      updatePageLabel(n);
      var el = pages[n - 1];
      if (el) {
        var wrap = el.closest('.codbdocs-zoom-wrap');
        var target = wrap || el;
        if (opts.smooth) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else target.scrollIntoView({ block: 'start' });
      }
    }

    var prevBtn = $('#codbdocs-page-prev'), nextBtn = $('#codbdocs-page-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { gotoPage(currentPage - 1, { smooth: true }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { gotoPage(currentPage + 1, { smooth: true }); });

    var zi = $('#codbdocs-zoom-in'), zo = $('#codbdocs-zoom-out'), zf = $('#codbdocs-zoom-fit');
    if (zi) zi.addEventListener('click', function () { fitMode = false; zoom = Math.min(3, +(zoom + 0.25).toFixed(2)); applyZoom(); });
    if (zo) zo.addEventListener('click', function () { fitMode = false; zoom = Math.max(0.35, +(zoom - 0.25).toFixed(2)); applyZoom(); });
    if (zf) zf.addEventListener('click', fitWidth);
    window.addEventListener('resize', function () { if (fitMode) fitWidth(); });

    $$('#codbdocs-viewer [data-codbdocs-view]').forEach(function (b) {
      b.addEventListener('click', function () { setView(b.getAttribute('data-codbdocs-view')); });
    });

    // Toggles (binding after view-mode handlers since the layout is re-generated).
    var views = { pdf: $('#codbdocs-view-pdf'), text: $('#codbdocs-view-text'), both: $('#codbdocs-view-both') };
    if (views.pdf) views.pdf.addEventListener('click', function () { setView('pdf'); });
    if (views.text) views.text.addEventListener('click', function () { setView('text'); });
    if (views.both) views.both.addEventListener('click', function () { setView('both'); });

    // High contrast
    var contrastBtn = $('#codbdocs-contrast');
    if (contrastBtn) contrastBtn.addEventListener('click', function () {
      var on = body.dataset.codbdocsContrast !== 'high';
      body.dataset.codbdocsContrast = on ? 'high' : 'normal';
      contrastBtn.classList.toggle('is-active', on);
      contrastBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    // Outline toggle
    var outlineToggle = $('#codbdocs-outline-toggle');
    var outline = $('#codbdocs-outline');
    if (outlineToggle && outline) {
      outlineToggle.addEventListener('click', function () {
        var open = outline.style.display !== 'none';
        outline.style.display = open ? 'none' : 'block';
        outlineToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
      $$('.codbdocs-outline-link', outline).forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var page = parseInt(a.getAttribute('data-outline-page'), 10) || 1;
          gotoPage(page, { smooth: true });
          $$('.codbdocs-outline-link').forEach(function (x) { x.classList.remove('is-active'); });
          a.classList.add('is-active');
        });
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var page = parseInt(entry.target.getAttribute('data-pdf-page'), 10);
          if (page) updatePageLabel(page);
        });
      }, { threshold: 0.45 });
      pages.forEach(function (pg) { observer.observe(pg); });
    }

    // ---- Offline search over positioned text runs ----
    function normalize(s) { return String(s || '').toLowerCase().replace(/\\s+/g, ' ').trim(); }

    // Index: every positioned text run -> {el, page, text}
    var index = [];
    var root = $('#codbdocs-root');
    $$('.pdf-text', root).forEach(function (el) {
      var t = (el.textContent || '').trim();
      if (!t) return;
      var pg = parseInt(el.getAttribute('data-pdf-page'), 10) || 1;
      index.push({ el: el, page: pg, text: normalize(t) });
    });

    var searchInput = $('#codbdocs-search-input');
    var countEl = $('#codbdocs-search-count');
    var resultsEl = $('#codbdocs-search-results');
    var matches = [];
    var cursor = -1;

    function clearHighlights() {
      matches.forEach(function (m) {
        m.el.classList.remove('sr-highlight', 'is-current');
      });
      matches = [];
      cursor = -1;
    }

    function snippet(text, query) {
      text = String(text || '').replace(/\s+/g, ' ').trim();
      var lower = text.toLowerCase();
      var pos = lower.indexOf(query);
      if (pos < 0) return text.slice(0, 160) + (text.length > 160 ? '...' : '');
      var start = Math.max(0, pos - 60);
      var end = Math.min(text.length, pos + query.length + 90);
      return (start ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
    }

    function renderResults(query, pageMatches) {
      if (!resultsEl) return;
      resultsEl.textContent = '';
      if (!query) return;
      if (!pageMatches.length) {
        var empty = document.createElement('p');
        empty.className = 'codbdocs-outline-empty';
        empty.textContent = 'No RAG page matches.';
        resultsEl.appendChild(empty);
        return;
      }
      pageMatches.slice(0, 40).forEach(function (p, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'codbdocs-search-result';
        btn.setAttribute('role', 'listitem');
        btn.setAttribute('data-result-page', p.page);
        var label = document.createElement('span');
        label.className = 'codbdocs-search-result-page';
        label.textContent = 'Page ' + p.page;
        var snip = document.createElement('span');
        snip.className = 'codbdocs-search-result-snippet';
        snip.textContent = snippet(p.raw, query);
        btn.appendChild(label);
        btn.appendChild(snip);
        btn.addEventListener('click', function () {
          $$('.codbdocs-search-result').forEach(function (x) { x.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var matchIndex = matches.findIndex(function (m) { return m.page === p.page; });
          if (matchIndex >= 0) goMatch(matchIndex, false);
          else gotoPage(p.page, { smooth: true });
        });
        if (i === 0) btn.classList.add('is-active');
        resultsEl.appendChild(btn);
      });
    }

    function runSearch(query) {
      clearHighlights();
      query = normalize(query);
      if (!query) {
        body.dataset.codbdocsSearching = 'false';
        renderResults('', []);
        if (countEl) countEl.textContent = '';
        return;
      }
      body.dataset.codbdocsSearching = 'true';
      matches = index.filter(function (m) { return m.text.indexOf(query) !== -1; });
      var pageMatches = pageTextIndex.filter(function (p) { return p.text.indexOf(query) !== -1; });
      renderResults(query, pageMatches);
      if (countEl) countEl.textContent = matches.length + ' run' + (matches.length === 1 ? '' : 's') + ' / ' + pageMatches.length + ' page' + (pageMatches.length === 1 ? '' : 's');
      if (!matches.length) {
        if (pageMatches.length) gotoPage(pageMatches[0].page, { smooth: true });
        return;
      }
      matches.forEach(function (m, i) {
        m.el.classList.add('sr-highlight');
        m.el.setAttribute('data-sr-index', i);
      });
      goMatch(0, true);
    }

    function goMatch(i, first) {
      if (!matches.length) return;
      if (i < 0) i = matches.length - 1;
      if (i >= matches.length) i = 0;
      cursor = i;
      matches.forEach(function (m, k) { m.el.classList.toggle('is-current', k === i); });
      gotoPage(matches[i].page, { smooth: !first });
      matches[i].el.scrollIntoView({ block: 'center', behavior: first ? 'auto' : 'smooth' });
    }

    if (searchInput) {
      var timer = null;
      searchInput.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { runSearch(searchInput.value); }, 220);
      });
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (matches.length) goMatch(e.shiftKey ? cursor - 1 : cursor + 1, false);
        }
      });
    }

    // Keyboard shortcuts: f=search, p/n=page, c=contrast, o=outline
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      var k = (e.key || '').toLowerCase();
      if (k === 'f') { e.preventDefault(); if (searchInput) { searchInput.focus(); searchInput.select(); } }
      else if (k === 'p') gotoPage(currentPage - 1, { smooth: true });
      else if (k === 'n') gotoPage(currentPage + 1, { smooth: true });
      else if (k === 'c' && contrastBtn) contrastBtn.click();
      else if (k === 'o' && outlineToggle) outlineToggle.click();
    });

    // init
    setView('pdf');
    fitWidth();
    gotoPage(1);
  })();
  </script>
  `;
}

function escapeHTML(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
