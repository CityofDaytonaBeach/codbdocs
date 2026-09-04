/**
 * @codbdocs/core — fidelity export
 *
 * buildFidelityHtml(ir, options) renders an Adobe-style, WCAG-friendly HTML
 * replica of a document IR: exact PDF-point page boxes with raster page
 * backgrounds, a selectable/semantic text layer, images, links, thumbnails,
 * zoom/search/print controls, a reflow view, high-contrast mode, landmarks,
 * keyboard navigation, WCAG findings + remediation panels, the tag tree and
 * an embedded RAG payload.
 *
 * Pure JavaScript — no DOM required, safe in Node/workers and the browser.
 */
const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const num = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};
function pageObjects(ir, page) {
  const ids = Array.isArray(page?.content) ? page.content : [];
  return ids.map((id) => typeof id === "string" ? ir.objects?.[id] : id).filter(Boolean).map((o) => o);
}
function objText(o) {
  return String(o?.semantic?.text ?? o?.raw?.text ?? "");
}
function cssTop(pageHeight, bbox, fontSize) {
  const y = num(bbox?.[1]);
  const h = num(bbox?.[3]) || fontSize;
  return Math.max(0, pageHeight - y - h);
}
function fontFamily(o) {
  const raw = String(o?.raw?.font ?? "");
  const name = raw.replace(/^[A-Z]{6}\+/, "").replace(/[^A-Za-z0-9 -]/g, "");
  const lower = name.toLowerCase();
  if (/times|serif|georgia|garamond|book/.test(lower)) return "'Times New Roman', Times, serif";
  if (/courier|mono/.test(lower)) return "'Courier New', Courier, monospace";
  return "Helvetica, Arial, 'Segoe UI', system-ui, sans-serif";
}
function renderTextLayer(ir, page) {
  const pageHeight = num(page.height, 792);
  let html = "";
  for (const o of pageObjects(ir, page)) {
    if (o.type === "image") {
      const src = o.raw?.src;
      const [x = 0, y = 0, w = 0, h = 0] = o.bbox ?? [];
      if (src && w && h) {
        html += `<img class="fx-img" src="${esc(src)}" alt="${esc(o.accessibility?.alt || o.semantic?.caption || "Image")}" style="left:${num(x)}px;top:${cssTop(pageHeight, o.bbox, num(h))}px;width:${num(w)}px;height:${num(h)}px">`;
      }
      continue;
    }
    if (o.type === "link") {
      const href = o.raw?.href || o.raw?.url;
      const rect = o.raw?.rect;
      if (href && Array.isArray(rect) && rect.length >= 4) {
        const x = Math.min(num(rect[0]), num(rect[2]));
        const y = Math.min(num(rect[1]), num(rect[3]));
        const w = Math.abs(num(rect[2]) - num(rect[0]));
        const h = Math.abs(num(rect[3]) - num(rect[1]));
        html += `<a class="fx-link" href="${esc(href)}" target="_blank" rel="noopener" style="left:${x}px;top:${Math.max(0, pageHeight - y - h)}px;width:${w}px;height:${h}px">${esc(objText(o) || href)}</a>`;
      }
      continue;
    }
    const text = objText(o);
    if (!text.trim()) continue;
    const bbox = Array.isArray(o.bbox) ? o.bbox : [];
    const fontSize = num(o.raw?.fontSize, 12) || 12;
    const left = num(bbox[0]);
    const top = cssTop(pageHeight, bbox, fontSize);
    const width = num(bbox[2]);
    const role = o.semantic?.role || "paragraph";
    const level = Math.min(6, Math.max(1, num(o.semantic?.level, 2)));
    const tag = role === "heading" ? `h${level}` : "span";
    const style = `left:${left}px;top:${top}px;font-size:${fontSize}px;font-family:${fontFamily(o)};` + (width ? `--fx-w:${width}px;` : "");
    html += `<${tag} class="fx-text" data-object="${esc(o.id ?? "")}" data-role="${esc(role)}" style="${style}">${esc(text)}</${tag}>`;
  }
  return html;
}
function renderReflow(ir, page) {
  let html = "";
  let openList = false;
  for (const o of pageObjects(ir, page)) {
    const role = o.semantic?.role || (o.type === "image" ? "image" : "paragraph");
    const text = objText(o);
    if (role === "list-item") {
      if (!openList) {
        html += "<ul>";
        openList = true;
      }
      html += `<li>${esc(text)}</li>`;
      continue;
    }
    if (openList) {
      html += "</ul>";
      openList = false;
    }
    if (o.type === "image") {
      const src = o.raw?.src;
      const alt = o.accessibility?.alt || o.semantic?.caption || "Image";
      html += `<figure>${src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : ""}<figcaption>${esc(alt)}</figcaption></figure>`;
      continue;
    }
    if (!text.trim()) continue;
    if (role === "heading") {
      const level = Math.min(6, Math.max(1, num(o.semantic?.level, 2)));
      html += `<h${level}>${esc(text)}</h${level}>`;
    } else if (o.type === "link") {
      html += `<p><a href="${esc(o.raw?.href || o.raw?.url || "#")}" target="_blank" rel="noopener">${esc(text)}</a></p>`;
    } else {
      html += `<p>${esc(text)}</p>`;
    }
  }
  if (openList) html += "</ul>";
  return html || '<p class="fx-empty">No extractable text on this page.</p>';
}
function auditPanel(audit, remediations) {
  if (!audit) return "";
  const issues = Array.isArray(audit.issues) ? audit.issues : [];
  const rows = issues.slice(0, 200).map(
    (i) => `<tr><td>${esc(i.severity || "info")}</td><td>${esc(i.wcag || "")}</td><td>${esc(i.message || i.type || "")}</td></tr>`
  ).join("");
  const plan = Array.isArray(remediations) ? remediations.slice(0, 100).map((r) => `<li>${esc(r.description || r.action || JSON.stringify(r))}</li>`).join("") : "";
  return `
  <section id="fx-a11y" class="fx-panel" aria-labelledby="fx-a11y-h">
    <h2 id="fx-a11y-h">Accessibility report</h2>
    <p class="fx-score"><strong>Score:</strong> ${esc(audit.score ?? "\u2014")} \xB7 <strong>WCAG level:</strong> ${esc(audit.level ?? "\u2014")} \xB7 <strong>Issues:</strong> ${issues.length}</p>
    ${rows ? `<table class="fx-table"><caption>WCAG 2.1 findings</caption><thead><tr><th scope="col">Severity</th><th scope="col">Criterion</th><th scope="col">Finding</th></tr></thead><tbody>${rows}</tbody></table>` : "<p>No WCAG issues detected.</p>"}
    ${plan ? `<h3>Remediation plan</h3><ol>${plan}</ol>` : ""}
  </section>`;
}
function tagPanel(tags) {
  if (!tags) return "";
  return `
  <section id="fx-tags" class="fx-panel" aria-labelledby="fx-tags-h">
    <h2 id="fx-tags-h">Document tags</h2>
    <pre class="fx-pre">${esc(JSON.stringify(tags, null, 2))}</pre>
  </section>`;
}
function buildFidelityHtml(ir, options = {}) {
  if (!ir || typeof ir !== "object") throw new Error("An IR object is required.");
  const pages = Array.isArray(ir.document?.pages) ? ir.document.pages : Object.keys(ir.pages ?? {});
  const lang = options.lang || ir.document?.metadata?.language || "en";
  const title = options.title || ir.document?.metadata?.title || ir.document?.title || "Document";
  const showThumbs = options.thumbnails !== false;
  const initialView = options.view === "reflow" ? "reflow" : "fidelity";
  let thumbs = "";
  let body = "";
  let nav = "";
  pages.forEach((pageId, index) => {
    const page = ir.pages?.[pageId];
    if (!page) return;
    const w = num(page.width, 612);
    const h = num(page.height, 792);
    const label = page.labels?.print || `Page ${page.num ?? index + 1}`;
    nav += `<option value="${index + 1}">${esc(label)}</option>`;
    if (showThumbs) {
      thumbs += `<li><button type="button" class="fx-thumb" data-goto="${index + 1}" aria-label="Go to ${esc(label)}">` + (page.background ? `<img src="${esc(page.background)}" alt="" loading="lazy">` : `<span class="fx-thumb-blank" aria-hidden="true"></span>`) + `<span class="fx-thumb-num">${index + 1}</span></button></li>`;
    }
    body += `
    <section class="fx-page" id="fx-page-${index + 1}" role="region" aria-label="${esc(label)}"
      data-page="${index + 1}" style="--pw:${w}px;--ph:${h}px">
      <div class="fx-canvas">
        ${page.background ? `<img class="fx-raster" src="${esc(page.background)}" alt="" aria-hidden="true" width="${w}" height="${h}">` : ""}
        <div class="fx-textlayer" aria-label="${esc(label)} text">${renderTextLayer(ir, page)}</div>
      </div>
      <div class="fx-reflow">${renderReflow(ir, page)}</div>
      <p class="fx-pagefoot" aria-hidden="true">${esc(label)}</p>
    </section>`;
  });
  const rag = options.includeRag === false ? "" : options.rag ?? null;
  return `<!DOCTYPE html>
<html lang="${esc(lang)}" data-view="${initialView}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
:root{--chrome:#323639;--chrome-2:#3d4245;--stage:#525659;--ink:#f1f3f4;--accent:#2f7ac9;--zoom:1}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{background:var(--stage);color:#111;font-family:'Segoe UI',system-ui,sans-serif}
.fx-skip{position:absolute;left:-9999px;top:0;z-index:50;background:#ffed4a;color:#000;padding:.6rem 1rem;font-weight:700}
.fx-skip:focus{left:.5rem;top:.5rem}
header.fx-bar{position:sticky;top:0;z-index:20;display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;
  background:var(--chrome);color:var(--ink);padding:.45rem .75rem;border-bottom:1px solid #000}
.fx-bar h1{font-size:.95rem;font-weight:600;margin:0 1rem 0 0;max-width:26rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fx-bar button,.fx-bar select,.fx-bar input{background:var(--chrome-2);color:var(--ink);border:1px solid #1c1f21;
  border-radius:4px;padding:.3rem .6rem;font-size:.82rem;cursor:pointer}
.fx-bar input{cursor:text;min-width:11rem}
.fx-bar button:hover{background:#4b5155}
.fx-bar button[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:#fff}
.fx-bar :focus-visible,.fx-thumb:focus-visible,.fx-textlayer :focus-visible{outline:3px solid #ffd400;outline-offset:2px}
.fx-shell{display:flex;min-height:calc(100vh - 3rem)}
.fx-rail{width:11rem;flex:none;background:#2b2f31;overflow:auto;max-height:calc(100vh - 3rem);position:sticky;top:3rem}
.fx-rail ul{list-style:none;margin:0;padding:.6rem;display:grid;gap:.6rem}
.fx-thumb{width:100%;background:none;border:2px solid transparent;padding:0;cursor:pointer;display:block}
.fx-thumb img{width:100%;display:block;background:#fff}
.fx-thumb-blank{display:block;width:100%;padding-top:129%;background:#fff}
.fx-thumb-num{display:block;color:#c9ced1;font-size:.72rem;padding:.15rem 0}
.fx-thumb[aria-current=true]{border-color:var(--accent)}
main.fx-stage{flex:1;padding:1.5rem;display:grid;justify-items:center;gap:1.5rem}
.fx-page{width:calc(var(--pw) * var(--zoom));}
.fx-canvas{position:relative;width:var(--pw);height:var(--ph);background:#fff;
  box-shadow:0 1px 4px rgba(0,0,0,.55),0 10px 24px rgba(0,0,0,.35);
  transform:scale(var(--zoom));transform-origin:top left;overflow:hidden}
.fx-page{height:calc(var(--ph) * var(--zoom))}
.fx-raster{position:absolute;inset:0;width:100%;height:100%;display:block}
.fx-textlayer{position:absolute;inset:0}
.fx-text{position:absolute;margin:0;white-space:pre;transform-origin:left top;color:transparent;
  line-height:1;font-weight:400;cursor:text}
.fx-text::selection{background:rgba(47,122,201,.4)}
.fx-img{position:absolute;object-fit:contain}
.fx-link{position:absolute;display:block;color:transparent;overflow:hidden;border-bottom:1px solid transparent}
.fx-link:hover,.fx-link:focus{border-bottom-color:var(--accent);background:rgba(47,122,201,.12)}
.fx-reflow{display:none}
.fx-pagefoot{color:#c9ced1;font-size:.75rem;text-align:center;margin:.4rem 0 0}
html[data-view=reflow] .fx-canvas{display:none}
html[data-view=reflow] .fx-page{width:min(52rem,100%);height:auto}
html[data-view=reflow] .fx-reflow{display:block;background:#fff;padding:2.5rem 3rem;border-radius:4px;
  box-shadow:0 6px 20px rgba(0,0,0,.35);line-height:1.65;font-size:1.02rem;color:#16181a}
html[data-view=reflow] .fx-reflow h1,html[data-view=reflow] .fx-reflow h2,html[data-view=reflow] .fx-reflow h3{line-height:1.25}
html[data-view=reflow] .fx-reflow img{max-width:100%;height:auto}
html.fx-contrast body,html.fx-contrast .fx-reflow{background:#000;color:#fff}
html.fx-contrast .fx-raster{filter:invert(1) hue-rotate(180deg)}
html.fx-contrast .fx-reflow a{color:#ffd400}
.fx-panel{background:#fff;border-radius:6px;padding:1.25rem 1.5rem;width:min(60rem,100%);color:#16181a}
.fx-table{border-collapse:collapse;width:100%;font-size:.88rem}
.fx-table caption{text-align:left;font-weight:600;padding-bottom:.4rem}
.fx-table th,.fx-table td{border:1px solid #d5d9dd;padding:.4rem .55rem;text-align:left;vertical-align:top}
.fx-table thead th{background:#eef1f4}
.fx-pre{background:#f5f7f9;padding:1rem;overflow:auto;max-height:22rem;font-size:.8rem}
.fx-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
mark.fx-hit{background:#ffd400;color:#000}
@media print{
  header.fx-bar,.fx-rail,.fx-panel{display:none!important}
  body{background:#fff}
  .fx-canvas{box-shadow:none;transform:none}
  .fx-page{page-break-after:always;width:auto;height:auto}
  @page{margin:0}
}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
</style>
</head>
<body>
<a class="fx-skip" href="#fx-content">Skip to document content</a>
<a class="fx-skip" href="#fx-a11y">Skip to accessibility report</a>
<header class="fx-bar" role="banner">
  <h1>${esc(title)}</h1>
  <nav aria-label="Page navigation" style="display:contents">
    <button type="button" id="fx-prev" aria-label="Previous page">&#8249; Prev</button>
    <label class="fx-status" for="fx-page-select">Jump to page</label>
    <select id="fx-page-select">${nav}</select>
    <button type="button" id="fx-next" aria-label="Next page">Next &#8250;</button>
  </nav>
  <button type="button" id="fx-zoom-out" aria-label="Zoom out">&#8722;</button>
  <span id="fx-zoom-label" aria-live="polite">100%</span>
  <button type="button" id="fx-zoom-in" aria-label="Zoom in">+</button>
  <button type="button" id="fx-fit">Fit width</button>
  <button type="button" id="fx-view-fidelity" aria-pressed="${initialView === "fidelity"}">PDF view</button>
  <button type="button" id="fx-view-reflow" aria-pressed="${initialView === "reflow"}">Reflow view</button>
  <button type="button" id="fx-contrast" aria-pressed="false">High contrast</button>
  <button type="button" id="fx-print">Print</button>
  <label class="fx-status" for="fx-search">Search document</label>
  <input id="fx-search" type="search" placeholder="Search document\u2026">
  <span id="fx-search-count" aria-live="polite"></span>
</header>
<div class="fx-shell">
  ${showThumbs ? `<nav class="fx-rail" aria-label="Page thumbnails"><ul>${thumbs}</ul></nav>` : ""}
  <main class="fx-stage" id="fx-content" role="main" tabindex="-1">
    ${body}
    ${auditPanel(options.audit, options.remediations)}
    ${tagPanel(options.tags)}
  </main>
</div>
<p class="fx-status" role="status" aria-live="polite" id="fx-live"></p>
${rag ? `<script type="application/json" id="codbdocs-rag">${JSON.stringify(rag).replace(/</g, "\\u003c")}<\/script>` : ""}
<script>
(function(){
  var root=document.documentElement, pages=[].slice.call(document.querySelectorAll('.fx-page'));
  var live=document.getElementById('fx-live'), sel=document.getElementById('fx-page-select');
  var zoom=1, current=1;
  function say(m){ if(live) live.textContent=m; }
  function setZoom(z){ zoom=Math.min(4,Math.max(.25,z)); root.style.setProperty('--zoom',String(zoom));
    document.getElementById('fx-zoom-label').textContent=Math.round(zoom*100)+'%'; }
  function goto(n){ var p=pages[n-1]; if(!p) return; current=n; p.scrollIntoView({behavior:'smooth',block:'start'});
    if(sel) sel.value=String(n);
    [].forEach.call(document.querySelectorAll('.fx-thumb'),function(t){
      t.setAttribute('aria-current', t.dataset.goto===String(n)?'true':'false'); });
    say('Page '+n+' of '+pages.length); }
  document.getElementById('fx-prev').onclick=function(){ goto(Math.max(1,current-1)); };
  document.getElementById('fx-next').onclick=function(){ goto(Math.min(pages.length,current+1)); };
  if(sel) sel.onchange=function(){ goto(Number(sel.value)); };
  document.getElementById('fx-zoom-in').onclick=function(){ setZoom(zoom+.15); };
  document.getElementById('fx-zoom-out').onclick=function(){ setZoom(zoom-.15); };
  document.getElementById('fx-fit').onclick=function(){
    var p=pages[current-1]; if(!p) return;
    var w=parseFloat(getComputedStyle(p).getPropertyValue('--pw'))||612;
    var avail=document.querySelector('.fx-stage').clientWidth-48; setZoom(avail/w); };
  document.getElementById('fx-print').onclick=function(){ window.print(); };
  function setView(v){ root.dataset.view=v;
    document.getElementById('fx-view-fidelity').setAttribute('aria-pressed', String(v==='fidelity'));
    document.getElementById('fx-view-reflow').setAttribute('aria-pressed', String(v==='reflow'));
    say(v==='reflow'?'Reflow reading view':'PDF fidelity view'); }
  document.getElementById('fx-view-fidelity').onclick=function(){ setView('fidelity'); };
  document.getElementById('fx-view-reflow').onclick=function(){ setView('reflow'); };
  var cbtn=document.getElementById('fx-contrast');
  cbtn.onclick=function(){ var on=!root.classList.contains('fx-contrast');
    root.classList.toggle('fx-contrast',on); cbtn.setAttribute('aria-pressed',String(on));
    say(on?'High contrast on':'High contrast off'); };
  [].forEach.call(document.querySelectorAll('.fx-thumb'),function(t){
    t.onclick=function(){ goto(Number(t.dataset.goto)); }; });
  document.addEventListener('keydown',function(e){
    if(/input|select|textarea/i.test((e.target&&e.target.tagName)||'')) return;
    if(e.key==='PageDown'||e.key==='ArrowRight'){ e.preventDefault(); goto(Math.min(pages.length,current+1)); }
    if(e.key==='PageUp'||e.key==='ArrowLeft'){ e.preventDefault(); goto(Math.max(1,current-1)); }
    if(e.key==='Home'){ e.preventDefault(); goto(1); }
    if(e.key==='End'){ e.preventDefault(); goto(pages.length); }
    if(e.key==='+'||e.key==='='){ setZoom(zoom+.15); }
    if(e.key==='-'){ setZoom(zoom-.15); }
  });
  var search=document.getElementById('fx-search'), count=document.getElementById('fx-search-count'), timer;
  search.addEventListener('input',function(){ clearTimeout(timer); timer=setTimeout(run,220); });
  function run(){
    var q=search.value.trim().toLowerCase();
    [].forEach.call(document.querySelectorAll('mark.fx-hit'),function(m){
      var p=m.parentNode; p.replaceChild(document.createTextNode(m.textContent),m); p.normalize(); });
    if(!q){ count.textContent=''; return; }
    var hits=0, first=null;
    [].forEach.call(document.querySelectorAll('.fx-text, .fx-reflow p, .fx-reflow li, .fx-reflow h1, .fx-reflow h2, .fx-reflow h3'),function(el){
      var t=el.textContent; var i=t.toLowerCase().indexOf(q); if(i<0) return; hits++;
      var mark=document.createElement('mark'); mark.className='fx-hit'; mark.textContent=t.substr(i,q.length);
      el.textContent=''; el.appendChild(document.createTextNode(t.slice(0,i))); el.appendChild(mark);
      el.appendChild(document.createTextNode(t.slice(i+q.length)));
      if(!first) first=el; });
    count.textContent=hits+' match'+(hits===1?'':'es'); say(hits+' matches for '+q);
    if(first) first.scrollIntoView({block:'center'});
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ current=Number(en.target.dataset.page)||current;
        if(sel) sel.value=String(current);
        [].forEach.call(document.querySelectorAll('.fx-thumb'),function(t){
          t.setAttribute('aria-current', t.dataset.goto===String(current)?'true':'false'); }); } });
    },{threshold:.4});
    pages.forEach(function(p){ io.observe(p); });
  }
  // Fit each positioned text run to its measured PDF width so selection and
  // screen-reader order line up with the rasterised page.
  requestAnimationFrame(function(){
    [].forEach.call(document.querySelectorAll('.fx-text'),function(el){
      var target=parseFloat(getComputedStyle(el).getPropertyValue('--fx-w'));
      if(!target||!isFinite(target)) return;
      var actual=el.getBoundingClientRect().width; if(!actual) return;
      el.style.transform='scaleX('+(target/actual).toFixed(4)+')';
    });
  });
  setZoom(1); goto(1);
})();
<\/script>
</body>
</html>`;
}
export {
  buildFidelityHtml
};
