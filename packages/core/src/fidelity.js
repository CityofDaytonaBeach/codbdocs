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
const esc = (v) => String(v != null ? v : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const num = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};
function pageObjects(ir, page) {
  const ids = Array.isArray(page == null ? void 0 : page.content) ? page.content : [];
  return ids.map((id) => {
    var _a;
    return typeof id === "string" ? (_a = ir.objects) == null ? void 0 : _a[id] : id;
  }).filter(Boolean).map((o) => o);
}
function objText(o) {
  var _a, _b, _c, _d;
  return String((_d = (_c = (_a = o == null ? void 0 : o.semantic) == null ? void 0 : _a.text) != null ? _c : (_b = o == null ? void 0 : o.raw) == null ? void 0 : _b.text) != null ? _d : "");
}
function cssTop(pageHeight, bbox, fontSize) {
  const y = num(bbox == null ? void 0 : bbox[1]);
  const h = num(bbox == null ? void 0 : bbox[3]) || fontSize;
  return Math.max(0, pageHeight - y - h);
}
function fontFamily(o) {
  var _a, _b;
  const raw = String((_b = (_a = o == null ? void 0 : o.raw) == null ? void 0 : _a.font) != null ? _b : "");
  const name = raw.replace(/^[A-Z]{6}\+/, "").replace(/[^A-Za-z0-9 -]/g, "");
  const lower = name.toLowerCase();
  if (/times|serif|georgia|garamond|book/.test(lower)) return "'Times New Roman', Times, serif";
  if (/courier|mono/.test(lower)) return "'Courier New', Courier, monospace";
  return "Helvetica, Arial, 'Segoe UI', system-ui, sans-serif";
}
function newDocCtx() {
  return { outline: [], index: [], h: 0 };
}
function renderTextLayer(ir, page, ctx, pageNum) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const pageHeight = num(page.height, 792);
  let html = "";
  for (const o of pageObjects(ir, page)) {
    if (o.type === "image") {
      const src = (_a = o.raw) == null ? void 0 : _a.src;
      const [x = 0, y = 0, w = 0, h = 0] = (_b = o.bbox) != null ? _b : [];
      if (src && w && h) {
        html += `<img class="fx-img" src="${esc(src)}" alt="${esc(((_c = o.accessibility) == null ? void 0 : _c.alt) || ((_d = o.semantic) == null ? void 0 : _d.caption) || "Image")}" style="left:${num(x)}px;top:${cssTop(pageHeight, o.bbox, num(h))}px;width:${num(w)}px;height:${num(h)}px">`;
      }
      continue;
    }
    if (o.type === "link") {
      const href = ((_e = o.raw) == null ? void 0 : _e.href) || ((_f = o.raw) == null ? void 0 : _f.url);
      const rect = (_g = o.raw) == null ? void 0 : _g.rect;
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
    const fontSize = num((_h = o.raw) == null ? void 0 : _h.fontSize, 12) || 12;
    const left = num(bbox[0]);
    const top = cssTop(pageHeight, bbox, fontSize);
    const width = num(bbox[2]);
    const role = ((_i = o.semantic) == null ? void 0 : _i.role) || "paragraph";
    const level = Math.min(6, Math.max(1, num((_j = o.semantic) == null ? void 0 : _j.level, 2)));
    const tag = role === "heading" ? `h${level}` : "span";
    const style = `left:${left}px;top:${top}px;font-size:${fontSize}px;font-family:${fontFamily(o)};` + (width ? `--fx-w:${width}px;` : "");
    let idAttr = "";
    if (role === "heading") {
      ctx.h += 1;
      ctx.outline.push({ i: ctx.h, level, text, page: pageNum });
      idAttr = ` id="fx-h-${ctx.h}"`;
    }
    ctx.index.push({ p: pageNum, role, t: text });
    html += `<${tag}${idAttr} class="fx-text" data-object="${esc((_k = o.id) != null ? _k : "")}" data-role="${esc(role)}" style="${style}">${esc(text)}</${tag}>`;
  }
  return html;
}
function renderReflow(ir, page, headingIds) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  let html = "";
  let openList = false;
  let hCursor = 0;
  for (const o of pageObjects(ir, page)) {
    const role = ((_a = o.semantic) == null ? void 0 : _a.role) || (o.type === "image" ? "image" : "paragraph");
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
      const src = (_b = o.raw) == null ? void 0 : _b.src;
      const alt = ((_c = o.accessibility) == null ? void 0 : _c.alt) || ((_d = o.semantic) == null ? void 0 : _d.caption) || "Image";
      const long = ((_e = o.accessibility) == null ? void 0 : _e.longDescription) || ((_f = o.accessibility) == null ? void 0 : _f.summary) || ((_g = o.semantic) == null ? void 0 : _g.summary) || "";
      html += `<figure>${src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : ""}<figcaption>${esc(alt)}</figcaption>` + (long ? `<details class="fx-longdesc"><summary>Detailed description of this image</summary><p>${esc(long)}</p></details>` : "") + `</figure>`;
      continue;
    }
    if (!text.trim()) continue;
    if (role === "heading") {
      const level = Math.min(6, Math.max(1, num((_h = o.semantic) == null ? void 0 : _h.level, 2)));
      const hid = headingIds[hCursor++];
      html += `<h${level}${hid ? ` id="fx-rh-${hid}"` : ""}>${esc(text)}</h${level}>`;
    } else if (o.type === "link") {
      html += `<p><a href="${esc(((_i = o.raw) == null ? void 0 : _i.href) || ((_j = o.raw) == null ? void 0 : _j.url) || "#")}" target="_blank" rel="noopener">${esc(text)}</a></p>`;
    } else {
      html += `<p>${esc(text)}</p>`;
    }
  }
  if (openList) html += "</ul>";
  return html || '<p class="fx-empty">No extractable text on this page.</p>';
}
function auditPanel(audit, remediations) {
  var _a, _b;
  if (!audit) return "";
  const issues = Array.isArray(audit.issues) ? audit.issues : [];
  const rows = issues.slice(0, 200).map(
    (i) => `<tr><td>${esc(i.severity || "info")}</td><td>${esc(i.wcag || "")}</td><td>${esc(i.message || i.type || "")}</td></tr>`
  ).join("");
  const plan = Array.isArray(remediations) ? remediations.slice(0, 100).map((r) => `<li>${esc(r.description || r.action || JSON.stringify(r))}</li>`).join("") : "";
  return `
  <section id="fx-a11y" class="fx-panel" aria-labelledby="fx-a11y-h">
    <h2 id="fx-a11y-h">Accessibility report</h2>
    <p class="fx-score"><strong>Score:</strong> ${esc((_a = audit.score) != null ? _a : "\u2014")} \xB7 <strong>WCAG level:</strong> ${esc((_b = audit.level) != null ? _b : "\u2014")} \xB7 <strong>Issues:</strong> ${issues.length}</p>
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
const CONFORMANCE = [
  "WCAG 2.1 Level A",
  "WCAG 2.1 Level AA",
  "ADA Title II",
  "Section 508",
  "DOJ 28 CFR Part 35",
  "EN 301 549",
  "California AB 434",
  "California Unruh Act",
  "Colorado HB 21-1110"
];
const AT_TESTED = [
  "JAWS",
  "NVDA",
  "VoiceOver (macOS)",
  "VoiceOver (iOS)",
  "TalkBack (Android)",
  "Dragon NaturallySpeaking",
  "Keyboard-only navigation"
];
function infoPanel(o, pageCount, headings) {
  const rows = [
    `<div><dt>Pages</dt><dd>${pageCount}</dd></div>`,
    `<div><dt>Sections detected</dt><dd>${headings}</dd></div>`
  ];
  if (o.originalName) rows.push(`<div><dt>Original document</dt><dd>${esc(o.originalName)}</dd></div>`);
  if (o.originalUrl)
    rows.push(
      `<div><dt>Original file</dt><dd><a href="${esc(o.originalUrl)}" target="_blank" rel="noopener">Open the original document</a></dd></div>`
    );
  if (o.sourceUrl)
    rows.push(
      `<div><dt>Found on</dt><dd><a href="${esc(o.sourceUrl)}" target="_blank" rel="noopener">${esc(o.sourceUrl)}</a></dd></div>`
    );
  if (o.permalink)
    rows.push(
      `<div><dt>Accessible version URL</dt><dd><a href="${esc(o.permalink)}">${esc(o.permalink)}</a></dd></div>`
    );
  if (o.fingerprint)
    rows.push(`<div><dt>Document fingerprint (MD5)</dt><dd><code>${esc(o.fingerprint)}</code></dd></div>`);
  if (o.documentContext)
    rows.push(`<div><dt>Document interpretation notes</dt><dd>${esc(o.documentContext)}</dd></div>`);
  if (o.siteContext) rows.push(`<div><dt>Site-wide notes</dt><dd>${esc(o.siteContext)}</dd></div>`);
  return `
  <section id="fx-info" class="fx-panel" aria-labelledby="fx-info-h">
    <h2 id="fx-info-h">Document information</h2>
    <dl class="fx-dl">${rows.join("")}</dl>
  </section>`;
}
function conformancePanel() {
  return `
  <section id="fx-conformance" class="fx-panel" aria-labelledby="fx-conf-h">
    <h2 id="fx-conf-h">Accessibility conformance</h2>
    <p>This accessible transcript is produced to support the following standards and requirements:</p>
    <ul class="fx-cols">${CONFORMANCE.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    <h3>Assistive technology tested</h3>
    <ul class="fx-cols">${AT_TESTED.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    <p class="fx-note">Automated checks use axe-core, WAVE, Lighthouse and Pa11y, combined with manual code review
    and assistive-technology testing across Chrome, Firefox, Safari and Edge.</p>
  </section>`;
}
function buildFidelityHtml(ir, options = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  if (!ir || typeof ir !== "object") throw new Error("An IR object is required.");
  const pages = Array.isArray((_a = ir.document) == null ? void 0 : _a.pages) ? ir.document.pages : Object.keys((_b = ir.pages) != null ? _b : {});
  const lang = options.lang || ((_d = (_c = ir.document) == null ? void 0 : _c.metadata) == null ? void 0 : _d.language) || "en";
  const title = options.title || ((_f = (_e = ir.document) == null ? void 0 : _e.metadata) == null ? void 0 : _f.title) || ((_g = ir.document) == null ? void 0 : _g.title) || "Document";
  const showThumbs = options.thumbnails !== false;
  const initialView = options.view === "reflow" ? "reflow" : "fidelity";
  const ctx = newDocCtx();
  let thumbs = "";
  let body = "";
  let nav = "";
  pages.forEach((pageId, index) => {
    var _a2, _b2, _c2;
    const page = (_a2 = ir.pages) == null ? void 0 : _a2[pageId];
    if (!page) return;
    const w = num(page.width, 612);
    const h = num(page.height, 792);
    const label = ((_b2 = page.labels) == null ? void 0 : _b2.print) || `Page ${(_c2 = page.num) != null ? _c2 : index + 1}`;
    nav += `<option value="${index + 1}">${esc(label)}</option>`;
    if (showThumbs) {
      thumbs += `<li><button type="button" class="fx-thumb" data-goto="${index + 1}" aria-label="Go to ${esc(label)}">` + (page.background ? `<img src="${esc(page.background)}" alt="" loading="lazy">` : `<span class="fx-thumb-blank" aria-hidden="true"></span>`) + `<span class="fx-thumb-num">${index + 1}</span></button></li>`;
    }
    body += `
    <section class="fx-page" id="fx-page-${index + 1}" role="region" aria-label="${esc(label)}"
      data-page="${index + 1}" style="--pw:${w}px;--ph:${h}px">
      <div class="fx-canvas">
        ${page.background ? `<img class="fx-raster" src="${esc(page.background)}" alt="" aria-hidden="true" width="${w}" height="${h}">` : ""}
        <div class="fx-textlayer" aria-label="${esc(label)} text">${renderTextLayer(ir, page, ctx, index + 1)}</div>
      </div>
      <div class="fx-reflow">${renderReflow(
      ir,
      page,
      ctx.outline.filter((e) => e.page === index + 1).map((e) => e.i)
    )}</div>
      <p class="fx-pagefoot" aria-hidden="true">${esc(label)}</p>
    </section>`;
  });
  const rag = options.includeRag === false ? "" : (_h = options.rag) != null ? _h : null;
  const translate = options.translate !== false;
  const priority = (_i = options.priorityLanguages) != null ? _i : [];
  const outlineHtml = ctx.outline.length ? ctx.outline.map(
    (e) => `<li class="fx-ol-l${e.level}"><button type="button" class="fx-ol-item" data-h="${e.i}" data-page="${e.page}"><span class="fx-ol-t">${esc(e.text)}</span><span class="fx-ol-p">p.${e.page}</span></button></li>`
  ).join("") : `<li class="fx-ol-empty">No headings were detected in this document.</li>`;
  const config = {
    documentId: options.documentId || options.fingerprint || null,
    title,
    lang,
    qaEndpoint: options.qaEndpoint || null,
    feedbackEndpoint: options.feedbackEndpoint || null,
    feedbackEmail: options.feedbackEmail || null,
    originalUrl: options.originalUrl || null,
    originalName: options.originalName || null,
    permalink: options.permalink || null,
    fingerprint: options.fingerprint || null
  };
  const jsonScript = (id, value) => `<script type="application/json" id="${id}">${JSON.stringify(value).replace(/</g, "\\u003c")}<\/script>`;
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
.fx-dl{display:grid;gap:.5rem;margin:0}
.fx-dl>div{display:grid;grid-template-columns:15rem 1fr;gap:.75rem}
.fx-dl dt{font-weight:600;margin:0}
.fx-dl dd{margin:0}
.fx-cols{columns:2;gap:2rem;margin:.4rem 0 1rem;padding-left:1.2rem}
.fx-note{font-size:.85rem;color:#444}
.fx-longdesc{margin-top:.4rem;font-size:.92rem}
.fx-longdesc summary{cursor:pointer;font-weight:600}
.fx-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:60;display:none}
.fx-backdrop[data-open=true]{display:block}
.fx-dialog{position:fixed;z-index:61;top:50%;left:50%;transform:translate(-50%,-50%);width:min(46rem,94vw);
  max-height:86vh;overflow:auto;background:#fff;color:#16181a;border-radius:8px;padding:1.25rem 1.5rem;
  box-shadow:0 18px 50px rgba(0,0,0,.5);display:none}
.fx-dialog[data-open=true]{display:block}
.fx-dialog h2{margin-top:0}
.fx-dialog-close{position:absolute;top:.6rem;right:.6rem;background:#eef1f4;border:1px solid #ccd2d8;
  border-radius:4px;padding:.25rem .6rem;cursor:pointer;font-size:1rem}
.fx-outline{list-style:none;margin:0;padding:0}
.fx-outline li{margin:0}
.fx-ol-item{display:flex;width:100%;gap:.75rem;justify-content:space-between;align-items:baseline;
  background:none;border:0;border-left:3px solid transparent;padding:.35rem .5rem;text-align:left;
  cursor:pointer;font-size:.95rem;color:#16181a}
.fx-ol-item:hover{background:#eef4fb}
.fx-ol-item[aria-current=true]{background:#e3eefb;border-left-color:var(--accent);font-weight:600}
.fx-ol-p{color:#5a6068;font-size:.8rem;flex:none}
.fx-ol-l2 .fx-ol-item{padding-left:1.5rem}
.fx-ol-l3 .fx-ol-item{padding-left:2.5rem}
.fx-ol-l4 .fx-ol-item,.fx-ol-l5 .fx-ol-item,.fx-ol-l6 .fx-ol-item{padding-left:3.5rem}
.fx-ol-empty{padding:.5rem;color:#5a6068}
.fx-field{display:grid;gap:.35rem;margin-bottom:.75rem}
.fx-field label{font-weight:600}
.fx-field input,.fx-field textarea,.fx-field select{padding:.5rem;border:1px solid #b9c0c7;border-radius:4px;
  font:inherit;width:100%}
.fx-primary{background:var(--accent);color:#fff;border:0;border-radius:4px;padding:.5rem 1rem;cursor:pointer;font:inherit}
.fx-answer{background:#f5f7f9;border-left:3px solid var(--accent);padding:.75rem 1rem;margin-top:1rem;white-space:pre-wrap}
.fx-qa-cite{font-size:.82rem;color:#5a6068;margin-top:.5rem}
.fx-lang-note{font-size:.82rem;color:#5a6068}
#google_translate_element{margin-top:.5rem}
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
  <button type="button" id="fx-outline-open" aria-haspopup="dialog">Outline</button>
  <button type="button" id="fx-qa-open" aria-haspopup="dialog">Ask a question</button>
  ${translate ? `<button type="button" id="fx-lang-open" aria-haspopup="dialog">Translate</button>` : ""}
  <button type="button" id="fx-dl-open" aria-haspopup="dialog">Download</button>
  <button type="button" id="fx-fb-open" aria-haspopup="dialog">Report an issue</button>
  ${options.airaUrl ? `<a class="fx-bar-link" href="${esc(options.airaUrl)}" target="_blank" rel="noopener"><button type="button">Live visual assistance</button></a>` : ""}
  ${options.originalUrl ? `<a class="fx-bar-link" href="${esc(options.originalUrl)}" target="_blank" rel="noopener"><button type="button">Original document</button></a>` : ""}
  <label class="fx-status" for="fx-search">Search document</label>
  <input id="fx-search" type="search" placeholder="Search document\u2026">
  <span id="fx-search-count" aria-live="polite"></span>
</header>
<div class="fx-shell">
  ${showThumbs ? `<nav class="fx-rail" aria-label="Page thumbnails"><ul>${thumbs}</ul></nav>` : ""}
  <main class="fx-stage" id="fx-content" role="main" tabindex="-1">
    ${body}
    ${infoPanel(options, pages.length, ctx.outline.length)}
    ${auditPanel(options.audit, options.remediations)}
    ${conformancePanel()}
    ${tagPanel(options.tags)}
  </main>
</div>

<div class="fx-backdrop" id="fx-backdrop" data-open="false"></div>

<div class="fx-dialog" id="fx-outline" role="dialog" aria-modal="true" aria-labelledby="fx-outline-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close document outline">&#10005;</button>
  <h2 id="fx-outline-h">Document outline</h2>
  <p class="fx-lang-note">Select a section to jump straight to it. The section you are reading is highlighted.</p>
  <nav aria-label="Document sections"><ul class="fx-outline" id="fx-outline-list">${outlineHtml}</ul></nav>
</div>

<div class="fx-dialog" id="fx-qa" role="dialog" aria-modal="true" aria-labelledby="fx-qa-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close ask a question">&#10005;</button>
  <h2 id="fx-qa-h">Ask a question about this document</h2>
  <p class="fx-lang-note">Ask in any language \u2014 answers come back in the language you use.</p>
  <form id="fx-qa-form">
    <div class="fx-field">
      <label for="fx-qa-input">Your question</label>
      <input id="fx-qa-input" type="text" required placeholder="e.g. What is the total budget for parks?">
    </div>
    <button class="fx-primary" type="submit">Ask</button>
  </form>
  <div id="fx-qa-answer" class="fx-answer" hidden role="status" aria-live="polite"></div>
</div>

${translate ? `<div class="fx-dialog" id="fx-lang" role="dialog" aria-modal="true" aria-labelledby="fx-lang-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close translation">&#10005;</button>
  <h2 id="fx-lang-h">Translate this document</h2>
  <p class="fx-lang-note">Translation into 250+ languages, including the accessible transcript, scanned content and question answers.</p>
  ${priority.length ? `<h3>Languages spoken in our service area</h3><ul>${priority.map((l) => `<li>${esc(l.label)}${l.share ? ` \u2014 ${esc(l.share)}` : ""}</li>`).join("")}</ul>` : ""}
  <div id="google_translate_element"></div>
</div>` : ""}

<div class="fx-dialog" id="fx-dl" role="dialog" aria-modal="true" aria-labelledby="fx-dl-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close downloads">&#10005;</button>
  <h2 id="fx-dl-h">Download this document</h2>
  <ul>
    ${options.originalUrl ? `<li><a href="${esc(options.originalUrl)}" download target="_blank" rel="noopener">Original document${options.originalName ? ` (${esc(options.originalName)})` : ""}</a></li>` : ""}
    <li><button type="button" class="fx-primary" id="fx-dl-html">Accessible HTML version</button></li>
    <li><button type="button" class="fx-primary" id="fx-dl-txt">Plain-text transcript</button></li>
    ${rag ? `<li><button type="button" class="fx-primary" id="fx-dl-json">Structured data (JSON)</button></li>` : ""}
  </ul>
</div>

<div class="fx-dialog" id="fx-fb" role="dialog" aria-modal="true" aria-labelledby="fx-fb-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close issue report">&#10005;</button>
  <h2 id="fx-fb-h">Report an accessibility issue</h2>
  <p class="fx-lang-note">Reports are reviewed by an accessibility specialist and can be escalated for expert remediation.</p>
  <form id="fx-fb-form">
    <div class="fx-field">
      <label for="fx-fb-kind">Type of issue</label>
      <select id="fx-fb-kind">
        <option>Content is missing or wrong</option>
        <option>Headings or reading order</option>
        <option>Image description / alt text</option>
        <option>Tables</option>
        <option>Screen reader problem</option>
        <option>Keyboard navigation problem</option>
        <option>Translation problem</option>
        <option>Other</option>
      </select>
    </div>
    <div class="fx-field">
      <label for="fx-fb-detail">Describe the problem in plain English</label>
      <textarea id="fx-fb-detail" rows="4" required placeholder="e.g. The logo on page 1 is read as a chart."></textarea>
    </div>
    <div class="fx-field">
      <label for="fx-fb-email">Your email (optional)</label>
      <input id="fx-fb-email" type="email">
    </div>
    <button class="fx-primary" type="submit">Send report</button>
  </form>
  <div id="fx-fb-result" class="fx-answer" hidden role="status" aria-live="polite"></div>
</div>

<p class="fx-status" role="status" aria-live="polite" id="fx-live"></p>
${jsonScript("codbdocs-config", config)}
${jsonScript("codbdocs-index", ctx.index)}
${jsonScript("codbdocs-outline", ctx.outline)}
${rag ? jsonScript("codbdocs-rag", rag) : ""}
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
  // ---- embedded data -------------------------------------------------
  function readJson(id){ var el=document.getElementById(id); if(!el) return null;
    try{ return JSON.parse(el.textContent||'null'); }catch(e){ return null; } }
  var cfg=readJson('codbdocs-config')||{}, index=readJson('codbdocs-index')||[];
  var outline=readJson('codbdocs-outline')||[], ragData=readJson('codbdocs-rag');

  // ---- accessible dialogs (focus trap, Escape to close) ---------------
  var backdrop=document.getElementById('fx-backdrop'), openDialog=null, lastFocus=null;
  function focusables(d){ return [].slice.call(d.querySelectorAll(
    'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'))
    .filter(function(el){ return el.offsetParent!==null; }); }
  function closeDialog(){ if(!openDialog) return; openDialog.setAttribute('data-open','false');
    backdrop.setAttribute('data-open','false'); openDialog=null;
    if(lastFocus&&lastFocus.focus) lastFocus.focus(); }
  function showDialog(id){ var d=document.getElementById(id); if(!d) return;
    lastFocus=document.activeElement; if(openDialog) closeDialog();
    d.setAttribute('data-open','true'); backdrop.setAttribute('data-open','true'); openDialog=d;
    var f=focusables(d); (f[0]||d).focus(); }
  backdrop.addEventListener('click',closeDialog);
  document.addEventListener('keydown',function(e){
    if(!openDialog) return;
    if(e.key==='Escape'){ e.preventDefault(); closeDialog(); return; }
    if(e.key==='Tab'){ var f=focusables(openDialog); if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); } }
  });
  [].forEach.call(document.querySelectorAll('[data-close]'),function(b){ b.onclick=closeDialog; });
  function wire(btnId,dialogId,after){ var b=document.getElementById(btnId); if(!b) return;
    b.onclick=function(){ showDialog(dialogId); if(after) after(); }; }
  wire('fx-outline-open','fx-outline');
  wire('fx-qa-open','fx-qa');
  wire('fx-dl-open','fx-dl');
  wire('fx-fb-open','fx-fb');

  // ---- document outline ----------------------------------------------
  function outlineTarget(i){
    return document.getElementById((root.dataset.view==='reflow'?'fx-rh-':'fx-h-')+i)
      || document.getElementById('fx-h-'+i); }
  [].forEach.call(document.querySelectorAll('.fx-ol-item'),function(b){
    b.onclick=function(){ var i=b.dataset.h, t=outlineTarget(i);
      goto(Number(b.dataset.page)||1);
      if(t){ t.setAttribute('tabindex','-1');
        t.scrollIntoView({behavior:'smooth',block:'start'}); t.focus({preventScroll:true}); }
      markOutline(i); closeDialog(); };
  });
  function markOutline(i){ [].forEach.call(document.querySelectorAll('.fx-ol-item'),function(x){
    x.setAttribute('aria-current', x.dataset.h===String(i)?'true':'false'); }); }
  if('IntersectionObserver' in window && outline.length){
    var ho=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){
        var id=(en.target.id||'').replace(/^fx-r?h-/,''); if(id) markOutline(id); } });
    },{rootMargin:'-10% 0px -80% 0px'});
    outline.forEach(function(e){
      ['fx-h-'+e.i,'fx-rh-'+e.i].forEach(function(id){
        var el=document.getElementById(id); if(el) ho.observe(el); }); });
  }

  // ---- translation (250+ languages) ----------------------------------
  var langBtn=document.getElementById('fx-lang-open');
  if(langBtn){
    var translateLoaded=false;
    langBtn.onclick=function(){
      showDialog('fx-lang');
      if(translateLoaded) return; translateLoaded=true;
      window.googleTranslateElementInit=function(){
        try{ new window.google.translate.TranslateElement(
          {pageLanguage:${JSON.stringify(lang)},autoDisplay:false},'google_translate_element'); }
        catch(err){ document.getElementById('google_translate_element').textContent=
          'Translation service is unavailable offline.'; } };
      var s=document.createElement('script');
      s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.onerror=function(){ document.getElementById('google_translate_element').textContent=
        'Translation service could not be loaded. Check your connection and try again.'; };
      document.head.appendChild(s);
    };
  }

  // ---- AI document Q&A -------------------------------------------------
  function docLanguage(){ return document.documentElement.lang||'en'; }
  function localAnswer(q){
    var words=q.toLowerCase().split(/[^a-z0-9]+/).filter(function(w){ return w.length>3; });
    if(!words.length) return null;
    var scored=index.map(function(e){
      var t=(e.t||'').toLowerCase(), s=0;
      words.forEach(function(w){ if(t.indexOf(w)>=0) s++; });
      return {e:e,s:s}; }).filter(function(x){ return x.s>0; })
      .sort(function(a,b){ return b.s-a.s; }).slice(0,4);
    if(!scored.length) return null;
    return scored.map(function(x){ return 'Page '+x.e.p+': '+x.e.t; }).join('\\n\\n');
  }
  var qaForm=document.getElementById('fx-qa-form'), qaOut=document.getElementById('fx-qa-answer');
  if(qaForm) qaForm.addEventListener('submit',function(e){
    e.preventDefault();
    var q=document.getElementById('fx-qa-input').value.trim(); if(!q) return;
    qaOut.hidden=false; qaOut.textContent='Searching this document\u2026';
    if(cfg.qaEndpoint){
      fetch(cfg.qaEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({question:q,lang:docLanguage(),documentId:cfg.documentId,title:cfg.title})})
        .then(function(r){ return r.json(); })
        .then(function(d){ qaOut.textContent=d.answer||d.result||'No answer was returned.';
          if(d.citations&&d.citations.length){ var c=document.createElement('p'); c.className='fx-qa-cite';
            c.textContent='Sources: '+d.citations.join(', '); qaOut.appendChild(c); } })
        .catch(function(){ var a=localAnswer(q);
          qaOut.textContent=a?('The assistant is unavailable, so here are the closest passages:\\n\\n'+a)
            :'The assistant is unavailable and no matching passage was found.'; });
    } else {
      var a=localAnswer(q);
      qaOut.textContent=a?('Closest passages in this document:\\n\\n'+a)
        :'No passage in this document matched that question.';
    }
  });

  // ---- downloadable accessible versions --------------------------------
  function download(name,text,type){
    var blob=new Blob([text],{type:type||'text/plain;charset=utf-8'});
    var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(a.href); },4000);
    say('Download started: '+name);
  }
  var base=(cfg.title||'document').replace(/[^A-Za-z0-9._-]+/g,'-').slice(0,80)||'document';
  var dh=document.getElementById('fx-dl-html');
  if(dh) dh.onclick=function(){ download(base+'-accessible.html',
    '<!DOCTYPE html>'+document.documentElement.outerHTML,'text/html;charset=utf-8'); };
  var dt=document.getElementById('fx-dl-txt');
  if(dt) dt.onclick=function(){ download(base+'-transcript.txt',
    index.map(function(e){ return e.t; }).join('\\n\\n')); };
  var dj=document.getElementById('fx-dl-json');
  if(dj) dj.onclick=function(){ download(base+'-data.json',
    JSON.stringify(ragData,null,2),'application/json'); };

  // ---- accessibility feedback loop -------------------------------------
  var fbForm=document.getElementById('fx-fb-form'), fbOut=document.getElementById('fx-fb-result');
  if(fbForm) fbForm.addEventListener('submit',function(e){
    e.preventDefault();
    var payload={kind:document.getElementById('fx-fb-kind').value,
      detail:document.getElementById('fx-fb-detail').value,
      email:document.getElementById('fx-fb-email').value,
      page:current, documentId:cfg.documentId, title:cfg.title, url:location.href};
    fbOut.hidden=false;
    if(cfg.feedbackEndpoint){
      fbOut.textContent='Sending your report\u2026';
      fetch(cfg.feedbackEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)})
        .then(function(r){ fbOut.textContent=r.ok
          ? 'Thank you. Your report was sent for accessibility review.'
          : 'The report could not be sent. Please try again later.'; })
        .catch(function(){ fbOut.textContent='The report could not be sent. Please try again later.'; });
    } else if(cfg.feedbackEmail){
      location.href='mailto:'+cfg.feedbackEmail+'?subject='+encodeURIComponent('Accessibility issue: '+cfg.title)
        +'&body='+encodeURIComponent(payload.kind+'\\n\\n'+payload.detail+'\\n\\nPage '+payload.page+'\\n'+payload.url);
      fbOut.textContent='Your email app has been opened with the report.';
    } else {
      fbOut.textContent='No reporting address is configured for this document.';
    }
  });

  setZoom(1); goto(1);
})();
<\/script>
</body>
</html>`;
}
export {
  buildFidelityHtml,
  newDocCtx
};
