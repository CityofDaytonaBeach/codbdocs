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
function inferHeadingLevels(ir) {
  var _a, _b, _c, _d, _e;
  const sizes = [];
  const candidates = [];
  const pages = Array.isArray((_a = ir.document) == null ? void 0 : _a.pages) ? ir.document.pages : Object.keys((_b = ir.pages) != null ? _b : {});
  for (const pid of pages) {
    const page = (_c = ir.pages) == null ? void 0 : _c[pid];
    if (!page) continue;
    for (const o of pageObjects(ir, page)) {
      if (o.type !== "text" && o.type !== void 0) continue;
      if (((_d = o.semantic) == null ? void 0 : _d.role) && o.semantic.role !== "paragraph") continue;
      const text = objText(o).trim();
      if (!text) continue;
      const size = num((_e = o.raw) == null ? void 0 : _e.fontSize, 0);
      if (!size) continue;
      sizes.push(size);
      if (text.length <= 120 && !/[.;]$/.test(text)) candidates.push({ id: o.id, size, text });
    }
  }
  const levels = /* @__PURE__ */ new Map();
  if (!sizes.length) return levels;
  const sorted = [...sizes].sort((a, b) => a - b);
  const body = sorted[Math.floor(sorted.length / 2)];
  const heads = candidates.filter((c) => c.size >= body * 1.25);
  const scale = [...new Set(heads.map((h) => Math.round(h.size * 10) / 10))].sort((a, b) => b - a);
  for (const h of heads) {
    const rank = scale.indexOf(Math.round(h.size * 10) / 10);
    levels.set(h.id, Math.min(6, Math.max(1, rank + 1)));
  }
  return levels;
}
function newDocCtx() {
  return { outline: [], index: [], h: 0, inferred: /* @__PURE__ */ new Map(), figures: [], vectors: {}, elements: [] };
}
function tableParts(o) {
  var _a, _b;
  const raw = (_a = o.raw) != null ? _a : {};
  const grid = Array.isArray(raw.rows) ? raw.rows.map((r) => Array.isArray(r) ? r : Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [r]) : Array.isArray(raw.cells) ? [raw.cells] : [];
  if (!grid.length) return { html: "", text: "", rows: 0, cols: 0 };
  const cell = (c) => {
    var _a2, _b2;
    return String(c == null ? "" : typeof c === "object" ? (_b2 = (_a2 = c.text) != null ? _a2 : c.value) != null ? _b2 : "" : c);
  };
  const caption = String(((_b = o.semantic) == null ? void 0 : _b.caption) || raw.caption || "Table");
  const [head, ...rest] = grid;
  const cols = Math.max(...grid.map((r) => r.length));
  const html = `<table class="fx-datatable"><caption>${esc(caption)}</caption><thead><tr>` + head.map((c) => `<th scope="col">${esc(cell(c))}</th>`).join("") + `</tr></thead><tbody>` + rest.map(
    (r) => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${esc(cell(c))}</th>` : `<td>${esc(cell(c))}</td>`).join("")}</tr>`
  ).join("") + `</tbody></table>`;
  const text = grid.map((r) => r.map(cell).join(" | ")).join("\n");
  return { html, text, rows: grid.length, cols };
}
function vectorSummary(o) {
  var _a, _b, _c, _d;
  const raw = (_a = o.raw) != null ? _a : {};
  const paths = Array.isArray(raw.paths) ? raw.paths.length : num(raw.pathCount, 0);
  const [x = 0, y = 0, w = 0, h = 0] = (_b = o.bbox) != null ? _b : [];
  const parts = [
    ((_c = o.semantic) == null ? void 0 : _c.caption) || ((_d = o.accessibility) == null ? void 0 : _d.alt) || "Vector drawing",
    paths ? `${paths} paths` : "",
    w && h ? `${Math.round(num(w))}\xD7${Math.round(num(h))} pt` : "",
    raw.fill ? `fill ${raw.fill}` : "",
    raw.stroke ? `stroke ${raw.stroke}` : "",
    `at x ${Math.round(num(x))}, y ${Math.round(num(y))}`
  ].filter(Boolean);
  return parts.join(", ");
}
function pushElement(ctx, el) {
  const id = el.id && String(el.id).trim() ? String(el.id) : `el-${ctx.elements.length + 1}`;
  ctx.elements.push({ ...el, id });
  return id;
}
function renderTextLayer(ir, page, ctx, pageNum) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
  const pageHeight = num(page.height, 792);
  let html = "";
  for (const o of pageObjects(ir, page)) {
    if (o.type === "image") {
      const src = (_a = o.raw) == null ? void 0 : _a.src;
      const [x = 0, y = 0, w = 0, h = 0] = (_b = o.bbox) != null ? _b : [];
      const alt = ((_c = o.accessibility) == null ? void 0 : _c.alt) || ((_d = o.semantic) == null ? void 0 : _d.caption) || "Image";
      const long = String(
        ((_e = o.accessibility) == null ? void 0 : _e.longDescription) || ((_f = o.accessibility) == null ? void 0 : _f.summary) || ((_g = o.semantic) == null ? void 0 : _g.summary) || ""
      );
      const kind = String(((_h = o.semantic) == null ? void 0 : _h.kind) || ((_i = o.raw) == null ? void 0 : _i.kind) || "image");
      const fid = String((_j = o.id) != null ? _j : `fig-${ctx.figures.length + 1}`);
      ctx.figures.push({ id: fid, page: pageNum, alt, long, kind });
      pushElement(ctx, {
        id: fid,
        page: pageNum,
        kind: kind === "chart" ? "chart" : "image",
        label: alt,
        text: [alt, long].filter(Boolean).join(" \u2014 "),
        detail: { width: Math.round(num(w)), height: Math.round(num(h)), hasImage: Boolean(src), graphic: kind }
      });
      if (src && w && h) {
        html += `<img class="fx-img" src="${esc(src)}" alt="${esc(alt)}" data-el="${esc(fid)}" style="left:${num(x)}px;top:${cssTop(pageHeight, o.bbox, num(h))}px;width:${num(w)}px;height:${num(h)}px">`;
      }
      continue;
    }
    if (o.type === "vector" || o.type === "path" || o.type === "shape") {
      const summary = vectorSummary(o);
      pushElement(ctx, {
        id: String((_k = o.id) != null ? _k : ""),
        page: pageNum,
        kind: "vector",
        label: ((_l = o.semantic) == null ? void 0 : _l.caption) || ((_m = o.accessibility) == null ? void 0 : _m.alt) || "Vector drawing",
        text: summary,
        detail: { bbox: (_n = o.bbox) != null ? _n : null, type: o.type }
      });
      continue;
    }
    if (o.type === "table" || Array.isArray((_o = o.raw) == null ? void 0 : _o.rows)) {
      const t = tableParts(o);
      if (t.rows) {
        pushElement(ctx, {
          id: String((_p = o.id) != null ? _p : ""),
          page: pageNum,
          kind: "table",
          label: String(((_q = o.semantic) == null ? void 0 : _q.caption) || ((_r = o.raw) == null ? void 0 : _r.caption) || `Table with ${t.rows} rows`),
          text: t.text,
          detail: { rows: t.rows, columns: t.cols }
        });
        ctx.index.push({ p: pageNum, role: "table", t: t.text });
        continue;
      }
    }
    if (o.type === "link") {
      const href = ((_s = o.raw) == null ? void 0 : _s.href) || ((_t = o.raw) == null ? void 0 : _t.url);
      const rect = (_u = o.raw) == null ? void 0 : _u.rect;
      pushElement(ctx, {
        id: String((_v = o.id) != null ? _v : ""),
        page: pageNum,
        kind: "link",
        label: objText(o) || String(href || "Link"),
        text: `${objText(o) || ""} (${href || "no destination"})`,
        detail: { href: href || null }
      });
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
    const fontSize = num((_w = o.raw) == null ? void 0 : _w.fontSize, 12) || 12;
    const left = num(bbox[0]);
    const top = cssTop(pageHeight, bbox, fontSize);
    const width = num(bbox[2]);
    const inferredLevel = ctx.inferred.get(o.id);
    const declared = (_x = o.semantic) == null ? void 0 : _x.role;
    const role = inferredLevel && (!declared || declared === "paragraph") ? "heading" : declared || "paragraph";
    const level = Math.min(6, Math.max(1, num((_y = o.semantic) == null ? void 0 : _y.level, inferredLevel != null ? inferredLevel : 2)));
    const tag = role === "heading" ? `h${level}` : "span";
    const style = `left:${left}px;top:${top}px;font-size:${fontSize}px;font-family:${fontFamily(o)};` + (width ? `--fx-w:${width}px;` : "");
    let idAttr = "";
    if (role === "heading") {
      ctx.h += 1;
      ctx.outline.push({ i: ctx.h, level, text, page: pageNum });
      idAttr = ` id="fx-h-${ctx.h}"`;
    }
    ctx.index.push({ p: pageNum, role, t: text });
    const elId = pushElement(ctx, {
      id: String((_z = o.id) != null ? _z : ""),
      page: pageNum,
      kind: role === "heading" ? "heading" : role === "list-item" ? "list" : "text",
      label: text.length > 90 ? `${text.slice(0, 90)}\u2026` : text,
      text,
      detail: { role, level: role === "heading" ? level : void 0, fontSize: Math.round(fontSize) }
    });
    html += `<${tag}${idAttr} class="fx-text" data-object="${esc((_A = o.id) != null ? _A : "")}" data-el="${esc(elId)}" data-role="${esc(role)}" style="${style}">${esc(text)}</${tag}>`;
  }
  return html;
}
function renderReflow(ir, page, headingIds, ctx) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  let html = "";
  let openList = false;
  let hCursor = 0;
  for (const o of pageObjects(ir, page)) {
    const inferredLevel = ctx.inferred.get(o.id);
    const declared = (_a = o.semantic) == null ? void 0 : _a.role;
    const role = o.type === "image" ? "image" : inferredLevel && (!declared || declared === "paragraph") ? "heading" : declared || "paragraph";
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
      const fid = esc((_h = o.id) != null ? _h : "");
      html += `<figure data-fig="${fid}">${src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : ""}<figcaption>${esc(alt)}</figcaption>` + (long ? `<details class="fx-longdesc"><summary>Detailed description of this image</summary><p>${esc(long)}</p></details>` : `<button type="button" class="fx-desc-btn" data-fig="${fid}">Describe this image with AI</button><p class="fx-desc-out" data-fig="${fid}" role="status" aria-live="polite" hidden></p>`) + `</figure>`;
      continue;
    }
    if (o.type === "table" || Array.isArray((_i = o.raw) == null ? void 0 : _i.rows)) {
      const t = tableParts(o);
      if (t.rows) {
        const tid = esc((_j = o.id) != null ? _j : "");
        html += `<div class="fx-tablewrap" data-el="${tid}" tabindex="0" role="group" aria-label="Data table">${t.html}<button type="button" class="fx-desc-btn" data-explain="${tid}">Explain this table with AI</button><p class="fx-desc-out" data-explain="${tid}" role="status" aria-live="polite" hidden></p></div>`;
        continue;
      }
    }
    if (o.type === "vector" || o.type === "path" || o.type === "shape") {
      const vid = esc((_k = o.id) != null ? _k : "");
      html += `<figure class="fx-vector" data-el="${vid}"><figcaption>${esc(
        ((_l = o.semantic) == null ? void 0 : _l.caption) || ((_m = o.accessibility) == null ? void 0 : _m.alt) || "Vector drawing"
      )}</figcaption><p class="fx-note">${esc(vectorSummary(o))}</p><button type="button" class="fx-desc-btn" data-explain="${vid}">Explain this drawing with AI</button><p class="fx-desc-out" data-explain="${vid}" role="status" aria-live="polite" hidden></p></figure>`;
      continue;
    }
    if (!text.trim()) continue;
    if (role === "heading") {
      const level = Math.min(6, Math.max(1, num((_n = o.semantic) == null ? void 0 : _n.level, inferredLevel != null ? inferredLevel : 2)));
      const hid = headingIds[hCursor++];
      html += `<h${level}${hid ? ` id="fx-rh-${hid}"` : ""}>${esc(text)}</h${level}>`;
    } else if (o.type === "link") {
      html += `<p><a href="${esc(((_o = o.raw) == null ? void 0 : _o.href) || ((_p = o.raw) == null ? void 0 : _p.url) || "#")}" target="_blank" rel="noopener">${esc(text)}</a></p>`;
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
const PDFJS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs";
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  if (!ir || typeof ir !== "object") throw new Error("An IR object is required.");
  const pages = Array.isArray((_a = ir.document) == null ? void 0 : _a.pages) ? ir.document.pages : Object.keys((_b = ir.pages) != null ? _b : {});
  const lang = options.lang || ((_d = (_c = ir.document) == null ? void 0 : _c.metadata) == null ? void 0 : _d.language) || "en";
  const title = options.title || ((_f = (_e = ir.document) == null ? void 0 : _e.metadata) == null ? void 0 : _f.title) || ((_g = ir.document) == null ? void 0 : _g.title) || "Document";
  const showThumbs = options.thumbnails !== false;
  const showDataControls = options.showDataControls === true;
  const initialView = options.view === "reflow" ? "reflow" : "fidelity";
  const ctx = newDocCtx();
  if (options.inferHeadings !== false) ctx.inferred = inferHeadingLevels(ir);
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
    const vectorCount = Array.isArray(page.vectors) ? page.vectors.length : pageObjects(ir, page).filter((o) => o.type === "vector" || o.type === "path" || o.type === "shape").length;
    if (vectorCount) ctx.vectors[String(index + 1)] = vectorCount;
    nav += `<option value="${index + 1}">${esc(label)}</option>`;
    if (showThumbs) {
      thumbs += `<li><button type="button" class="fx-thumb" data-goto="${index + 1}" aria-label="Go to ${esc(label)}">` + (page.background ? `<img src="${esc(page.background)}" alt="" loading="lazy">` : `<span class="fx-thumb-blank" aria-hidden="true"></span>`) + `<span class="fx-thumb-num">${index + 1}</span></button></li>`;
    }
    body += `
    <section class="fx-page" id="fx-page-${index + 1}" role="region" aria-label="${esc(label)}"
      data-page="${index + 1}" data-raster="${page.background ? "1" : "0"}" style="--pw:${w}px;--ph:${h}px">
      <div class="fx-canvas">
        ${page.background ? `<img class="fx-raster" src="${esc(page.background)}" alt="" aria-hidden="true" width="${w}" height="${h}">` : ""}
        <div class="fx-textlayer" aria-label="${esc(label)} text">${renderTextLayer(ir, page, ctx, index + 1)}</div>
      </div>
      <div class="fx-reflow">${renderReflow(
      ir,
      page,
      ctx.outline.filter((e) => e.page === index + 1).map((e) => e.i),
      ctx
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
    aiEndpoint: options.aiEndpoint === void 0 ? "https://itavtools.lovable.app/api/public/docaccess/ask" : options.aiEndpoint || null,
    knowledge: options.knowledge || options.documentContext || options.siteContext || null,
    feedbackEndpoint: options.feedbackEndpoint || null,
    feedbackEmail: options.feedbackEmail || null,
    originalUrl: options.originalUrl || null,
    originalName: options.originalName || null,
    permalink: options.permalink || null,
    fingerprint: options.fingerprint || null
  };
  const knowledgePack = {
    title,
    language: lang,
    pageCount: pages.length,
    documentId: options.documentId || options.fingerprint || null,
    originalName: options.originalName || null,
    sourceUrl: options.sourceUrl || null,
    permalink: options.permalink || null,
    fingerprint: options.fingerprint || null,
    outline: ctx.outline.map((e) => ({ level: e.level, text: e.text, page: e.page })),
    headings: ctx.outline.length,
    figures: ctx.figures,
    vectors: ctx.vectors,
    pages: pages.map((pageId, index) => {
      var _a2, _b2;
      const page = (_a2 = ir.pages) == null ? void 0 : _a2[pageId];
      const pageText = ctx.index.filter((e) => e.p === index + 1).map((e) => e.t).join(" ");
      return {
        page: index + 1,
        label: ((_b2 = page == null ? void 0 : page.labels) == null ? void 0 : _b2.print) || `Page ${index + 1}`,
        width: num(page == null ? void 0 : page.width, 612),
        height: num(page == null ? void 0 : page.height, 792),
        hasRaster: Boolean(page == null ? void 0 : page.background),
        summary: pageText.replace(/\s+/g, " ").trim().slice(0, 420),
        accessibility: {
          hasText: Boolean(pageText.trim()),
          language: (page == null ? void 0 : page.language) || lang,
          screenReaderText: pageText
        }
      };
    }),
    accessibility: options.audit ? {
      score: (_j = options.audit.score) != null ? _j : null,
      level: (_k = options.audit.level) != null ? _k : null,
      issues: Array.isArray(options.audit.issues) ? options.audit.issues.length : 0,
      topIssues: (Array.isArray(options.audit.issues) ? options.audit.issues : []).slice(0, 12).map((i) => {
        var _a2, _b2, _c2, _d2;
        return { severity: (_a2 = i.severity) != null ? _a2 : "info", wcag: (_b2 = i.wcag) != null ? _b2 : "", message: (_d2 = (_c2 = i.message) != null ? _c2 : i.type) != null ? _d2 : "" };
      })
    } : null,
    conformance: CONFORMANCE,
    assistiveTechnology: AT_TESTED,
    notes: options.knowledge || options.documentContext || options.siteContext || null,
    elementCounts: ctx.elements.reduce((acc, e) => {
      var _a2;
      acc[e.kind] = ((_a2 = acc[e.kind]) != null ? _a2 : 0) + 1;
      return acc;
    }, {}),
    tables: ctx.elements.filter((e) => e.kind === "table").map((e) => {
      var _a2;
      return { id: e.id, page: e.page, label: e.label, ...(_a2 = e.detail) != null ? _a2 : {} };
    }),
    capabilities: [
      "ask",
      "summarize",
      "describe",
      "alt",
      "translate",
      "retrieve",
      "speak",
      "elements",
      "explainElement",
      "explainPage"
    ],
    aiContract: {
      version: "1.0",
      globalObject: "window.CodbDocsAI",
      readyEvent: "codbdocs:ready",
      methods: ["retrieve", "ask", "summarize", "describe", "altText", "translate", "speak", "elements", "explainElement", "explainPage"],
      guidance: "Use retrieve() for grounded passages, then ask() or your own AI endpoint with returned page citations. Use pages[].accessibility.screenReaderText for ADA and screen-reader workflows."
    }
  };
  const jsonScript = (id, value) => `<script type="application/json" id="${id}">${JSON.stringify(value).replace(/</g, "\\u003c")}<\/script>`;
  return `<!DOCTYPE html>
<html lang="${esc(lang)}" data-view="${initialView}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
:root{--chrome:#1f2124;--chrome-2:#2b2e33;--chrome-3:#383c42;--stage:#f2f3f5;--ink:#eceff3;
  --muted:#a7aeb8;--accent:#d0021b;--accent-2:#1473e6;--line:#3a3e45;--zoom:1;--radius:10px}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{background:var(--stage);color:#16181a;
  font-family:'Segoe UI Variable Text','Segoe UI',Inter,system-ui,-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased}
.fx-skip{position:absolute;left:-9999px;top:0;z-index:80;background:#ffed4a;color:#000;padding:.6rem 1rem;font-weight:700;border-radius:6px}
.fx-skip:focus{left:.5rem;top:.5rem}
header.fx-bar{position:sticky;top:0;z-index:30;display:flex;flex-wrap:wrap;gap:.35rem;align-items:center;
  background:linear-gradient(180deg,#26292e,#1f2124);color:var(--ink);padding:.5rem .8rem;
  border-bottom:1px solid #101215;box-shadow:0 1px 0 rgba(255,255,255,.04),0 6px 18px rgba(0,0,0,.18)}
.fx-brand{display:flex;align-items:center;gap:.55rem;margin-right:.9rem;min-width:0}
.fx-brand-mark{width:26px;height:26px;border-radius:7px;background:var(--accent);color:#fff;flex:none;
  display:grid;place-items:center;font-weight:800;font-size:.72rem;letter-spacing:.02em}
.fx-bar h1{font-size:.9rem;font-weight:600;margin:0;max-width:22rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fx-group{display:flex;align-items:center;gap:.2rem;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.06);border-radius:999px;padding:.15rem .25rem}
.fx-bar button,.fx-bar select,.fx-bar input{background:transparent;color:var(--ink);border:0;
  border-radius:999px;padding:.34rem .7rem;font-size:.82rem;cursor:pointer;font:inherit;font-size:.82rem;line-height:1.2}
.fx-bar select{background:var(--chrome-3);padding:.3rem .5rem;border-radius:8px}
.fx-bar input{cursor:text;min-width:13rem;background:rgba(255,255,255,.08);border-radius:999px;padding:.4rem .85rem}
.fx-bar input::placeholder{color:var(--muted)}
.fx-bar button:hover{background:rgba(255,255,255,.12)}
.fx-bar button[aria-pressed=true]{background:var(--accent-2);color:#fff}
.fx-bar .fx-primary-btn{background:var(--accent);color:#fff;font-weight:600}
.fx-bar .fx-primary-btn:hover{background:#b70117}
.fx-bar-link{display:inline-flex}
.fx-spacer{flex:1 1 auto}
#fx-zoom-label{min-width:3.2rem;text-align:center;font-size:.78rem;color:var(--muted)}
#fx-search-count{font-size:.76rem;color:var(--muted);white-space:nowrap;padding:0 .55rem 0 .2rem}
.fx-bar .fx-primary-btn{margin-left:.4rem}
.fx-bar :focus-visible,.fx-thumb:focus-visible,.fx-textlayer :focus-visible{outline:3px solid #ffd400;outline-offset:2px}
.fx-shell{display:flex;min-height:calc(100vh - 3.1rem)}
.fx-rail{width:12rem;flex:none;background:#e7e9ec;border-right:1px solid #d3d7dc;overflow:auto;
  max-height:calc(100vh - 3.1rem);position:sticky;top:3.1rem}
.fx-rail ul{list-style:none;margin:0;padding:.7rem;display:grid;gap:.7rem}
.fx-thumb{width:100%;background:none;border:0;padding:0;cursor:pointer;display:block}
.fx-thumb img{width:100%;display:block;background:#fff;border:1px solid #cfd4da;border-radius:6px;
  box-shadow:0 1px 3px rgba(0,0,0,.12)}
.fx-thumb-blank{display:block;width:100%;padding-top:129%;background:#fff;border:1px solid #cfd4da;border-radius:6px}
.fx-thumb-num{display:block;color:#5a6068;font-size:.72rem;padding:.2rem 0;text-align:center}
.fx-thumb[aria-current=true] img,.fx-thumb[aria-current=true] .fx-thumb-blank{border-color:var(--accent-2);
  box-shadow:0 0 0 2px rgba(20,115,230,.35)}
main.fx-stage{flex:1;padding:1.75rem;display:grid;justify-items:center;gap:1.75rem;background:var(--stage)}
.fx-page{width:calc(var(--pw) * var(--zoom));}
.fx-canvas{position:relative;width:var(--pw);height:var(--ph);background:#fff;border-radius:2px;
  box-shadow:0 0 0 1px rgba(0,0,0,.08),0 12px 28px rgba(15,20,30,.16);
  transform:scale(var(--zoom));transform-origin:top left;overflow:hidden}
.fx-page{height:calc(var(--ph) * var(--zoom))}
.fx-raster{position:absolute;inset:0;width:100%;height:100%;display:block}
.fx-textlayer{position:absolute;inset:0}
.fx-text{position:absolute;margin:0;white-space:pre;transform-origin:left top;color:transparent;
  line-height:1;font-weight:400;cursor:text}
.fx-text::selection{background:rgba(20,115,230,.35)}

/* No rasterised background available (text-only extraction): show the text layer
   itself so the fidelity view is never a blank page. */
.fx-page[data-raster="0"] .fx-text{color:#111}
.fx-page[data-raster="0"] .fx-link{color:#0b4f9e;border-bottom-color:currentColor}
.fx-img{position:absolute;object-fit:contain}
.fx-link{position:absolute;display:block;color:transparent;overflow:hidden;border-bottom:1px solid transparent}
.fx-link:hover,.fx-link:focus{border-bottom-color:var(--accent-2);background:rgba(20,115,230,.12)}
.fx-reflow{display:none}
.fx-pagefoot{color:#6b727b;font-size:.75rem;text-align:center;margin:.45rem 0 0}
html[data-view=reflow] .fx-canvas{display:none}
html[data-view=reflow] .fx-page{width:min(52rem,100%);height:auto}
html[data-view=reflow] .fx-reflow{display:block;background:#fff;padding:2.75rem 3.25rem;border-radius:12px;
  box-shadow:0 0 0 1px rgba(0,0,0,.06),0 10px 30px rgba(15,20,30,.12);line-height:1.7;font-size:1.05rem;color:#16181a}
html[data-view=reflow] .fx-reflow h1,html[data-view=reflow] .fx-reflow h2,html[data-view=reflow] .fx-reflow h3{line-height:1.25;letter-spacing:-.01em}
html[data-view=reflow] .fx-reflow img{max-width:100%;height:auto}
html.fx-contrast body,html.fx-contrast .fx-reflow,html.fx-contrast main.fx-stage{background:#000;color:#fff}
html.fx-contrast .fx-raster{filter:invert(1) hue-rotate(180deg)}
html.fx-contrast .fx-reflow a{color:#ffd400}
.fx-panel{background:#fff;border-radius:12px;padding:1.4rem 1.6rem;width:min(60rem,100%);color:#16181a;
  box-shadow:0 0 0 1px rgba(0,0,0,.06),0 6px 18px rgba(15,20,30,.08)}
.fx-table{border-collapse:collapse;width:100%;font-size:.88rem}
.fx-table caption{text-align:left;font-weight:600;padding-bottom:.4rem}
.fx-table th,.fx-table td{border:1px solid #e2e6ea;padding:.45rem .6rem;text-align:left;vertical-align:top}
.fx-table thead th{background:#f4f6f8}
.fx-pre{background:#f5f7f9;padding:1rem;border-radius:8px;overflow:auto;max-height:22rem;font-size:.8rem}
.fx-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
mark.fx-hit{background:#ffd400;color:#000;border-radius:2px}
.fx-dl{display:grid;gap:.5rem;margin:0}
.fx-dl>div{display:grid;grid-template-columns:15rem 1fr;gap:.75rem}
.fx-dl dt{font-weight:600;margin:0}
.fx-dl dd{margin:0}
.fx-cols{columns:2;gap:2rem;margin:.4rem 0 1rem;padding-left:1.2rem}
.fx-note{font-size:.85rem;color:#5a6068}
.fx-longdesc{margin-top:.4rem;font-size:.92rem}
.fx-longdesc summary{cursor:pointer;font-weight:600}
.fx-desc-btn{margin-top:.4rem;background:#eef4fb;border:1px solid #c3d7f2;color:#0f5fc4;border-radius:999px;
  padding:.3rem .8rem;font:inherit;font-size:.85rem;cursor:pointer}
.fx-desc-btn:hover{background:#e0ebfa}
.fx-desc-btn[disabled]{opacity:.6;cursor:progress}
.fx-desc-out{margin:.45rem 0 0;font-size:.92rem;line-height:1.55;background:#f5f8fc;border-left:3px solid var(--accent-2);
  padding:.6rem .8rem;border-radius:0 8px 8px 0}
.fx-datatable{border-collapse:collapse;width:100%;font-size:.92rem;margin:.4rem 0}
.fx-datatable caption{text-align:left;font-weight:700;padding:.2rem 0 .4rem}
.fx-datatable th,.fx-datatable td{border:1px solid #d5dae1;padding:.35rem .55rem;text-align:left}
.fx-datatable thead th{background:#eef1f5}
.fx-tablewrap{margin:.9rem 0;overflow-x:auto}
.fx-vector{margin:.9rem 0;padding:.7rem .9rem;border:1px dashed #c7ced8;border-radius:10px}
.fx-ex-tabs{display:flex;flex-wrap:wrap;gap:.35rem;margin:.6rem 0}
.fx-ex-tabs button{border:1px solid #d5dae1;background:#f6f8fa;border-radius:999px;padding:.28rem .8rem;
  font:inherit;font-size:.85rem;cursor:pointer}
.fx-ex-tabs button[aria-pressed=true]{background:var(--accent-2);border-color:var(--accent-2);color:#fff}
.fx-ex-list{list-style:none;margin:0;padding:0;max-height:52vh;overflow:auto}
.fx-ex-list li{border-bottom:1px solid #e7eaee;padding:.6rem .2rem}
.fx-ex-kind{display:inline-block;font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;
  background:#eef1f5;border-radius:999px;padding:.1rem .5rem;margin-right:.45rem;color:#4a525c}
.fx-ex-label{font-size:.95rem}
.fx-ex-actions{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.4rem}


.fx-backdrop{position:fixed;inset:0;background:rgba(10,12,15,.55);backdrop-filter:blur(2px);z-index:60;display:none}
.fx-backdrop[data-open=true]{display:block}
.fx-dialog{position:fixed;z-index:61;top:50%;left:50%;transform:translate(-50%,-50%);width:min(46rem,94vw);
  max-height:86vh;overflow:auto;background:#fff;color:#16181a;border-radius:14px;padding:1.4rem 1.6rem;
  box-shadow:0 24px 60px rgba(0,0,0,.4);display:none}
.fx-dialog[data-open=true]{display:block}
.fx-dialog h2{margin-top:0;letter-spacing:-.01em}
.fx-dialog-close{position:absolute;top:.7rem;right:.7rem;background:#f0f2f5;border:1px solid #dde1e6;
  border-radius:999px;width:2rem;height:2rem;cursor:pointer;font-size:.95rem}
.fx-switch{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;padding:0 .25rem}
.fx-switch input{appearance:none;-webkit-appearance:none;width:28px;height:15px;border-radius:999px;
  background:#4b5563;position:relative;cursor:pointer;transition:background .15s;margin:0;flex:0 0 28px}
.fx-switch input::after{content:"";position:absolute;top:2px;left:2px;width:11px;height:11px;border-radius:50%;
  background:#fff;transition:transform .15s}
.fx-switch input:checked{background:var(--accent-2)}
.fx-switch input:checked::after{transform:translateX(13px)}
.fx-switch label{cursor:pointer;font-size:.76rem;white-space:nowrap}
.fx-original{width:100%;max-width:1100px;margin:0 auto 24px;padding:16px}
.fx-original iframe{width:100%;height:82vh;border:0;background:#fff;border-radius:10px;
  box-shadow:0 0 0 1px rgba(0,0,0,.08),0 10px 30px rgba(15,20,30,.14)}
.fx-op-page{display:grid;justify-items:center;margin:0 auto 1.25rem;overflow:auto}
.fx-op-page canvas{display:block;max-width:100%;height:auto;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.08),0 8px 22px rgba(15,20,30,.12)}
.fx-op-num{font-size:.78rem;color:#5a6068;margin:.25rem 0 .4rem}
.fx-outline{list-style:none;margin:0;padding:0}
.fx-outline li{margin:0}
.fx-ol-item{display:flex;width:100%;gap:.75rem;justify-content:space-between;align-items:baseline;
  background:none;border:0;border-left:3px solid transparent;padding:.4rem .55rem;text-align:left;
  cursor:pointer;font-size:.95rem;color:#16181a;border-radius:0 8px 8px 0}
.fx-ol-item:hover{background:#eef4fb}
.fx-ol-item[aria-current=true]{background:#e3eefb;border-left-color:var(--accent-2);font-weight:600}
.fx-ol-p{color:#5a6068;font-size:.8rem;flex:none}
.fx-ol-l2 .fx-ol-item{padding-left:1.5rem}
.fx-ol-l3 .fx-ol-item{padding-left:2.5rem}
.fx-ol-l4 .fx-ol-item,.fx-ol-l5 .fx-ol-item,.fx-ol-l6 .fx-ol-item{padding-left:3.5rem}
.fx-ol-empty{padding:.5rem;color:#5a6068}
.fx-field{display:grid;gap:.35rem;margin-bottom:.75rem}
.fx-field label{font-weight:600}
.fx-field input,.fx-field textarea,.fx-field select{padding:.6rem .7rem;border:1px solid #ccd2d8;border-radius:8px;
  font:inherit;width:100%}
.fx-primary{background:var(--accent-2);color:#fff;border:0;border-radius:8px;padding:.55rem 1.1rem;cursor:pointer;font:inherit;font-weight:600}
.fx-primary:hover{background:#0f5fc4}
.fx-answer{background:#f5f8fc;border-left:3px solid var(--accent-2);border-radius:0 8px 8px 0;
  padding:.85rem 1.05rem;margin-top:1rem;white-space:pre-wrap;line-height:1.6}
.fx-qa-cite{font-size:.82rem;color:#5a6068;margin-top:.5rem}
.fx-lang-note{font-size:.82rem;color:#5a6068}
#google_translate_element{margin-top:.5rem}
/* ---- RAG search drawer ---- */
.fx-drawer{position:fixed;top:var(--barh,3.1rem);right:0;bottom:0;width:min(27rem,92vw);background:#fff;z-index:25;
  border-left:1px solid #d7dbe0;box-shadow:-12px 0 34px rgba(15,20,30,.14);display:none;
  grid-template-rows:auto 1fr;overflow:hidden}
.fx-drawer[data-open=true]{display:grid}
.fx-drawer-head{display:flex;align-items:center;justify-content:space-between;gap:.5rem;
  padding:.85rem 1rem;border-bottom:1px solid #e6e9ed}
.fx-drawer-head h2{margin:0;font-size:1rem}
.fx-drawer-body{overflow:auto;padding:.6rem .75rem 2rem}
.fx-res{list-style:none;margin:0;padding:0;display:grid;gap:.5rem}
.fx-res button{width:100%;text-align:left;background:#f7f9fb;border:1px solid #e3e7ec;border-radius:10px;
  padding:.65rem .75rem;cursor:pointer;font:inherit;display:grid;gap:.25rem}
.fx-res button:hover{background:#eef4fb;border-color:#c3d7f2}
.fx-res-meta{display:flex;justify-content:space-between;font-size:.74rem;color:#5a6068;text-transform:uppercase;letter-spacing:.04em}
.fx-res-text{font-size:.88rem;line-height:1.45;color:#22262b}
.fx-res-empty{color:#5a6068;font-size:.9rem;padding:.5rem}
.fx-ai-card{background:linear-gradient(180deg,#f2f7ff,#ffffff);border:1px solid #d5e3f7;border-radius:12px;
  padding:.8rem .9rem;margin-bottom:.75rem}
.fx-ai-card h3{margin:0 0 .35rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.05em;color:#1473e6}
.fx-ai-text{font-size:.92rem;line-height:1.55;white-space:pre-wrap;margin:0}
.fx-chip{display:inline-block;background:#e8f0fd;color:#0f5fc4;border-radius:999px;padding:.12rem .55rem;
  font-size:.72rem;font-weight:600;margin:.3rem .3rem 0 0}
@media print{
  header.fx-bar,.fx-rail,.fx-panel,.fx-drawer{display:none!important}
  body{background:#fff}
  .fx-canvas{box-shadow:none;transform:none}
  .fx-page{page-break-after:always;width:auto;height:auto}
  @page{margin:0}
}
@media (max-width:900px){.fx-rail{display:none}main.fx-stage{padding:1rem}}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}

</style>
</head>
<body>
<a class="fx-skip" href="#fx-content">Skip to document content</a>
<a class="fx-skip" href="#fx-a11y">Skip to accessibility report</a>
<header class="fx-bar" role="banner">
  <div class="fx-brand">
    <span class="fx-brand-mark" aria-hidden="true">DA</span>
    <h1>${esc(title)}</h1>
  </div>
  <nav class="fx-group" aria-label="Page navigation">
    <button type="button" id="fx-prev" aria-label="Previous page">&#8249;</button>
    <label class="fx-status" for="fx-page-select">Jump to page</label>
    <select id="fx-page-select">${nav}</select>
    <button type="button" id="fx-next" aria-label="Next page">&#8250;</button>
  </nav>
  <div class="fx-group">
    <button type="button" id="fx-zoom-out" aria-label="Zoom out">&#8722;</button>
    <span id="fx-zoom-label" aria-live="polite">100%</span>
    <button type="button" id="fx-zoom-in" aria-label="Zoom in">+</button>
    <button type="button" id="fx-fit">Fit width</button>
  </div>
  <div class="fx-group">
    <button type="button" id="fx-view-fidelity" aria-pressed="${initialView === "fidelity"}">PDF view</button>
    <button type="button" id="fx-view-reflow" aria-pressed="${initialView === "reflow"}">Reflow</button>
    <button type="button" id="fx-contrast" aria-pressed="false">Contrast</button>
  </div>
  ${options.originalPdfSrc ? `<span class="fx-switch"><input type="checkbox" id="fx-pdf-toggle"><label for="fx-pdf-toggle">Original PDF</label></span>` : ""}
  <div class="fx-group">
    <button type="button" id="fx-outline-open" aria-haspopup="dialog">Outline</button>
    <button type="button" id="fx-sum-open" aria-haspopup="dialog">AI summary</button>
    <button type="button" id="fx-ex-open" aria-haspopup="dialog">Explore content</button>

    <button type="button" id="fx-read" aria-pressed="false">Read aloud</button>
    <button type="button" id="fx-print">Print</button>
    ${translate ? `<button type="button" id="fx-lang-open" aria-haspopup="dialog">Translate</button>` : ""}
    <button type="button" id="fx-dl-open" aria-haspopup="dialog">Download</button>
    <button type="button" id="fx-fb-open" aria-haspopup="dialog">Report</button>
    ${options.airaUrl ? `<a class="fx-bar-link" href="${esc(options.airaUrl)}" target="_blank" rel="noopener"><button type="button">Live help</button></a>` : ""}
    ${options.originalUrl ? `<a class="fx-bar-link" href="${esc(options.originalUrl)}" target="_blank" rel="noopener"><button type="button">Original</button></a>` : ""}
  </div>
  <span class="fx-spacer"></span>
  <div class="fx-group">
    <label class="fx-status" for="fx-search">Search this document</label>
    <input id="fx-search" type="search" placeholder="Search this document\u2026" aria-describedby="fx-search-count">
    <span id="fx-search-count" aria-live="polite"></span>
  </div>
  <button type="button" class="fx-primary-btn" id="fx-qa-open" aria-haspopup="dialog">Ask AI</button>

</header>
<aside class="fx-drawer" id="fx-drawer" data-open="false" aria-label="Search results">
  <div class="fx-drawer-head">
    <h2 id="fx-drawer-h">Search results</h2>
    <button type="button" id="fx-drawer-close" class="fx-dialog-close" style="position:static" aria-label="Close search results">&#10005;</button>
  </div>
  <div class="fx-drawer-body">
    <div id="fx-ai-summary" hidden></div>
    <ul class="fx-res" id="fx-res"></ul>
  </div>
</aside>

<div class="fx-shell">
  ${showThumbs ? `<nav class="fx-rail" aria-label="Page thumbnails"><ul>${thumbs}</ul></nav>` : ""}
  <main class="fx-stage" id="fx-content" role="main" tabindex="-1">
    ${options.originalPdfSrc ? `<section id="fx-original" class="fx-original" aria-label="Original PDF" hidden>
      <p class="fx-status" id="fx-op-status" aria-live="polite">The original PDF is rendered here with pdf.js.</p>
      <div id="fx-op-pages" role="group" aria-label="Original PDF pages"></div>
      <p class="fx-note">This is the unmodified original PDF. Turn the \u201COriginal PDF\u201D switch off to return to the accessible version.</p>
    </section>` : ""}
    <div id="fx-accessible">
    ${body}
    ${infoPanel(options, pages.length, ctx.outline.length)}
    ${auditPanel(options.audit, options.remediations)}
    ${conformancePanel()}
    ${showDataControls ? tagPanel(options.tags) : ""}
    </div>
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

<div class="fx-dialog" id="fx-sum" role="dialog" aria-modal="true" aria-labelledby="fx-sum-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close AI summary">&#10005;</button>
  <h2 id="fx-sum-h">AI summary of this document</h2>
  <p class="fx-lang-note">A plain-language overview built from the whole document, its headings, figures and data.</p>
  <button class="fx-primary" type="button" id="fx-sum-run">Summarise this document</button>
  <button class="fx-primary" type="button" id="fx-sum-page">Summarise the page I am on</button>
  <div id="fx-sum-out" class="fx-answer" hidden role="status" aria-live="polite"></div>
</div>

<div class="fx-dialog" id="fx-ex" role="dialog" aria-modal="true" aria-labelledby="fx-ex-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close content explorer">&#10005;</button>
  <h2 id="fx-ex-h">Explore every part of this document</h2>
  <p class="fx-lang-note">Every heading, paragraph, list, link, image, chart, vector drawing and table is listed
    here. Choose an item to jump to it, hear it read aloud, or have the AI explain it in plain language.</p>
  <div class="fx-field">
    <label for="fx-ex-filter">Find an item</label>
    <input id="fx-ex-filter" type="search" placeholder="e.g. budget table, logo, deadline">
  </div>
  <div class="fx-ex-tabs" role="group" aria-label="Filter by type" id="fx-ex-tabs">
    ${["all", "heading", "text", "list", "table", "image", "chart", "vector", "link"].map(
    (k) => `<button type="button" data-kind="${k}" aria-pressed="${k === "all"}">${k === "all" ? "Everything" : k.charAt(0).toUpperCase() + k.slice(1) + "s"}</button>`
  ).join("")}
  </div>
  <p class="fx-status" id="fx-ex-count" aria-live="polite"></p>
  <ul class="fx-ex-list" id="fx-ex-list"></ul>
</div>


${translate ? `<div class="fx-dialog" id="fx-lang" role="dialog" aria-modal="true" aria-labelledby="fx-lang-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close translation">&#10005;</button>
  <h2 id="fx-lang-h">Translate this document</h2>
  <p class="fx-lang-note">Translation into 250+ languages, including the accessible transcript, scanned content and question answers.</p>
  ${priority.length ? `<h3>Languages spoken in our service area</h3><ul>${priority.map((l) => `<li>${esc(l.label)}${l.share ? ` \u2014 ${esc(l.share)}` : ""}</li>`).join("")}</ul>` : ""}
  <div id="google_translate_element"></div>
  <h3>AI translation of the accessible transcript</h3>
  <p class="fx-lang-note">Keeps headings and reading order, so screen readers announce the translated document correctly.</p>
  <div class="fx-field">
    <label for="fx-ai-lang">Translate into</label>
    <input id="fx-ai-lang" type="text" list="fx-lang-list" placeholder="e.g. Spanish, Haitian Creole, Vietnamese">
    <datalist id="fx-lang-list">
      ${["Spanish", "Haitian Creole", "Portuguese", "French", "Vietnamese", "Arabic", "Chinese (Simplified)", "Russian", "Tagalog", "American Sign Language gloss"].map((l) => `<option value="${esc(l)}"></option>`).join("")}
    </datalist>
  </div>
  <button class="fx-primary" type="button" id="fx-ai-translate">Translate with AI</button>
  <div id="fx-ai-tr-out" class="fx-answer" hidden role="status" aria-live="polite"></div>
</div>` : ""}


<div class="fx-dialog" id="fx-dl" role="dialog" aria-modal="true" aria-labelledby="fx-dl-h" data-open="false">
  <button type="button" class="fx-dialog-close" data-close aria-label="Close downloads">&#10005;</button>
  <h2 id="fx-dl-h">Download this document</h2>
  <ul>
    ${options.originalUrl ? `<li><a href="${esc(options.originalUrl)}" download target="_blank" rel="noopener">Original document${options.originalName ? ` (${esc(options.originalName)})` : ""}</a></li>` : ""}
    <li><button type="button" class="fx-primary" id="fx-dl-html">Accessible HTML version</button></li>
    <li><button type="button" class="fx-primary" id="fx-dl-txt">Plain-text transcript</button></li>
    ${showDataControls && rag ? `<li><button type="button" class="fx-primary" id="fx-dl-json">Structured data (JSON)</button></li>` : ""}
    ${showDataControls ? `<li><button type="button" class="fx-primary" id="fx-dl-know">AI knowledge pack (JSON)</button></li>` : ""}

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
${jsonScript("codbdocs-knowledge", knowledgePack)}
${jsonScript("codbdocs-elements", ctx.elements.map((e) => ({ ...e, text: e.text.slice(0, 4e3) })))}
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
  // ---- retrieval index (RAG) ------------------------------------------
  var passages=null;
  function tokens(s){ return String(s||'').toLowerCase().split(/[^a-z0-9]+/).filter(function(w){
    return w.length>2 && !/^(the|and|for|with|that|this|from|are|was|were|have|has|its|our|their|you|your)$/.test(w); }); }
  function buildPassages(){
    if(passages) return passages;
    var out=[];
    var chunks=(ragData&&(ragData.chunks||ragData.documents||ragData.passages))||[];
    if(Array.isArray(chunks)) chunks.forEach(function(c,i){
      var t=(typeof c==='string')?c:(c.text||c.content||c.pageContent||'');
      if(!t||!String(t).trim()) return;
      var meta=(c&&c.metadata)||c||{};
      var pnum=Number(meta.page||meta.pageNumber||meta.pageIndex||0)||0;
      if(!pnum){ var m=/page[_ -]?(\\d+)/i.exec(String((c&&c.id)||'')); if(m) pnum=Number(m[1]); }
      out.push({id:'c'+i,p:pnum,t:String(t),src:'chunk'});
    });
    // Always add the finer-grained text index so results point at a paragraph,
    // not just the page-sized chunk.
    (index||[]).forEach(function(e,i){
      if(!e||!e.t||e.t.length<(out.length?40:20)) return;
      out.push({id:'i'+i,p:Number(e.p)||0,t:String(e.t),src:'text'}); });
    // BM25-style field stats
    var df={}, total=0;
    out.forEach(function(pg){ pg.tok=tokens(pg.t); total+=pg.tok.length;
      var seen={}; pg.tok.forEach(function(w){ if(!seen[w]){ seen[w]=1; df[w]=(df[w]||0)+1; } }); });
    passages={items:out,df:df,avg:out.length?total/out.length:1,n:out.length||1};
    return passages;
  }
  function retrieve(query,limit){
    var ix=buildPassages(), qt=tokens(query); if(!qt.length||!ix.items.length) return [];
    var k1=1.4,b=.72;
    var scored=ix.items.map(function(pg){
      var tf={}; pg.tok.forEach(function(w){ tf[w]=(tf[w]||0)+1; });
      var s=0;
      qt.forEach(function(w){
        var f=tf[w]||0;
        if(!f){ if(pg.t.toLowerCase().indexOf(w)>=0) s+=0.4; return; }
        var idf=Math.log(1+(ix.n-(ix.df[w]||0)+.5)/((ix.df[w]||0)+.5));
        s+=idf*(f*(k1+1))/(f+k1*(1-b+b*(pg.tok.length/(ix.avg||1))));
      });
      if(pg.t.toLowerCase().indexOf(query.toLowerCase())>=0) s+=2;
      return {pg:pg,s:s}; }).filter(function(x){ return x.s>0; })
      .sort(function(a,b2){ return b2.s-a.s; }).slice(0,limit||8);
    return scored;
  }
  function snippet(text,query){
    var t=String(text).replace(/\\s+/g,' ').trim();
    var i=t.toLowerCase().indexOf(String(query).toLowerCase().split(/\\s+/)[0]||'');
    if(i<0) i=0;
    var start=Math.max(0,i-90);
    return (start?'\u2026':'')+t.slice(start,start+260)+(t.length>start+260?'\u2026':'');
  }

  // ---- search UI --------------------------------------------------------
  var search=document.getElementById('fx-search'), count=document.getElementById('fx-search-count'), timer;
  var drawer=document.getElementById('fx-drawer'), resList=document.getElementById('fx-res');
  var drawerClose=document.getElementById('fx-drawer-close');
  if(drawerClose) drawerClose.onclick=function(){ drawer.setAttribute('data-open','false'); };
  function syncBar(){ var h=document.querySelector('header.fx-bar');
    if(h) root.style.setProperty('--barh',h.offsetHeight+'px'); }
  syncBar(); window.addEventListener('resize',syncBar);
  function openDrawer(){ syncBar(); if(drawer) drawer.setAttribute('data-open','true'); }
  function jumpToText(page,text){
    goto(page||1);
    var needle=String(text||'').replace(/\\s+/g,' ').trim().slice(0,40).toLowerCase();
    if(!needle) return;
    var sels='.fx-text, .fx-reflow p, .fx-reflow li, .fx-reflow h1, .fx-reflow h2, .fx-reflow h3';
    var el=[].slice.call(document.querySelectorAll(sels)).filter(function(n){
      return n.textContent.replace(/\\s+/g,' ').toLowerCase().indexOf(needle.slice(0,24))>=0; })[0];
    if(el) el.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function renderResults(q,results){
    if(!resList) return;
    resList.innerHTML='';
    if(!results.length){
      var li=document.createElement('li'); li.className='fx-res-empty';
      li.textContent='No passage in this document matched \u201C'+q+'\u201D.'; resList.appendChild(li); return; }
    results.forEach(function(r){
      var li=document.createElement('li'), b=document.createElement('button'); b.type='button';
      var meta=document.createElement('span'); meta.className='fx-res-meta';
      meta.innerHTML='<span>Page '+(r.pg.p||'\u2014')+'</span><span>relevance '+r.s.toFixed(1)+'</span>';
      var txt=document.createElement('span'); txt.className='fx-res-text'; txt.textContent=snippet(r.pg.t,q);
      b.appendChild(meta); b.appendChild(txt);
      b.onclick=function(){ jumpToText(r.pg.p,r.pg.t); };
      li.appendChild(b); resList.appendChild(li); });
  }
  if(search) search.addEventListener('input',function(){ clearTimeout(timer); timer=setTimeout(run,220); });
  function run(){
    var raw=search.value.trim(), q=raw.toLowerCase();
    [].forEach.call(document.querySelectorAll('mark.fx-hit'),function(m){
      var p=m.parentNode; p.replaceChild(document.createTextNode(m.textContent),m); p.normalize(); });
    if(!q){ count.textContent=''; if(drawer) drawer.setAttribute('data-open','false'); return; }
    var hits=0, first=null;
    [].forEach.call(document.querySelectorAll('.fx-text, .fx-reflow p, .fx-reflow li, .fx-reflow h1, .fx-reflow h2, .fx-reflow h3'),function(el){
      var t=el.textContent; var i=t.toLowerCase().indexOf(q); if(i<0) return; hits++;
      var mark=document.createElement('mark'); mark.className='fx-hit'; mark.textContent=t.substr(i,q.length);
      el.textContent=''; el.appendChild(document.createTextNode(t.slice(0,i))); el.appendChild(mark);
      el.appendChild(document.createTextNode(t.slice(i+q.length)));
      if(!first) first=el; });
    var results=retrieve(raw,10);
    renderResults(raw,results); openDrawer();
    count.textContent=hits+' match'+(hits===1?'':'es');
    say(hits+' matches and '+results.length+' relevant passages for '+raw);
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
  // ---- original PDF switch -------------------------------------------
  var pdfToggle=document.getElementById('fx-pdf-toggle');
  if(pdfToggle){
    var origPane=document.getElementById('fx-original'), accPane=document.getElementById('fx-accessible');
    var pdfSrc=${JSON.stringify(options.originalPdfSrc || "")}, pdfJsUrl=${JSON.stringify(options.pdfJsUrl || PDFJS_URL)};
    var pdfLoaded=false, pdfLoading=false;
    function opStatus(m){ var s=document.getElementById('fx-op-status'); if(s) s.textContent=m; }
    function toBytes(src){
      var i=src.indexOf('base64,');
      if(i<0) return null;
      var bin=atob(src.slice(i+7)), out=new Uint8Array(bin.length);
      for(var k=0;k<bin.length;k++) out[k]=bin.charCodeAt(k);
      return out;
    }
    function renderOriginal(){
      if(pdfLoaded||pdfLoading) return; pdfLoading=true;
      opStatus('Rendering the original PDF\u2026');
      import(pdfJsUrl).then(function(pdfjs){
        pdfjs.GlobalWorkerOptions.workerSrc=pdfJsUrl.replace(/pdf(\\.min)?\\.mjs$/,'pdf.worker$1.mjs');
        var bytes=toBytes(pdfSrc);
        var task=bytes?pdfjs.getDocument({data:bytes}):pdfjs.getDocument(pdfSrc);
        return task.promise;
      }).then(function(doc){
        var host=document.getElementById('fx-op-pages'); if(host) host.textContent='';
        var chain=Promise.resolve();
        for(var n=1;n<=doc.numPages;n++)(function(n){
          chain=chain.then(function(){ return doc.getPage(n); }).then(function(page){
            var base=page.getViewport({scale:1});
            var scale=Math.min(2,(Math.min(1100,(host?host.clientWidth:900)||900))/base.width);
            var cssVp=page.getViewport({scale:scale});
            var vp=page.getViewport({scale:scale*(window.devicePixelRatio||1)});
            var wrap=document.createElement('div'); wrap.className='fx-op-page';
            var lab=document.createElement('p'); lab.className='fx-op-num'; lab.textContent='Page '+n+' of '+doc.numPages;
            var cv=document.createElement('canvas'); cv.width=vp.width; cv.height=vp.height;
            cv.style.width=cssVp.width+'px'; cv.style.height=cssVp.height+'px';
            cv.setAttribute('role','img'); cv.setAttribute('aria-label','Original PDF page '+n);
            wrap.appendChild(lab); wrap.appendChild(cv); if(host) host.appendChild(wrap);
            return page.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
          });
        })(n);
        return chain.then(function(){ pdfLoaded=true; pdfLoading=false;
          opStatus('Original PDF \u2014 '+doc.numPages+' page'+(doc.numPages===1?'':'s')+' rendered with pdf.js.'); });
      }).catch(function(err){
        pdfLoading=false;
        opStatus('The original PDF could not be rendered here ('+(err&&err.message||err)+'). Use Download to open the file.');
      });
    }
    pdfToggle.addEventListener('change',function(){
      var on=pdfToggle.checked;
      if(origPane) origPane.hidden=!on;
      if(accPane) accPane.hidden=on;
      if(on) renderOriginal();
      say(on?'Showing the original PDF':'Showing the accessible version');
    });
  }

  // ---- embedded data -------------------------------------------------
  function readJson(id){ var el=document.getElementById(id); if(!el) return null;
    try{ return JSON.parse(el.textContent||'null'); }catch(e){ return null; } }
  var cfg=readJson('codbdocs-config')||{}, index=readJson('codbdocs-index')||[];
  var outline=readJson('codbdocs-outline')||[], ragData=readJson('codbdocs-rag');
  var knowledge=readJson('codbdocs-knowledge')||{};
  var elements=readJson('codbdocs-elements')||[];


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
  wire('fx-sum-open','fx-sum');
  wire('fx-ex-open','fx-ex',function(){ renderElements(); });
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

  // ---- built-in AI (RAG + knowledge pack + assistant) -------------------
  // Everything the AI needs travels with the file: the retrieval index, the
  // outline, the figure/vector inventory and the accessibility conformance
  // data. Host applications drive the same engine through window.CodbDocsAI.
  function docLanguage(){ return document.documentElement.lang||'en'; }
  function endpointUrl(){ return cfg.qaEndpoint||cfg.aiEndpoint||null; }
  function transcriptText(limit){
    var t=(index||[]).map(function(e){ return e.t; }).join('\\n');
    return limit? t.slice(0,limit) : t;
  }
  function callAI(payload){
    var url=endpointUrl();
    if(!url) return Promise.reject(new Error('This document has no AI endpoint configured.'));
    payload.lang=payload.lang||docLanguage();
    payload.title=cfg.title; payload.documentId=cfg.documentId;
    if(payload.knowledge===undefined) payload.knowledge=knowledge;
    // text/plain keeps this a simple request (no CORS preflight) so exported
    // files work from disk, SharePoint or any other origin.
    return fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},
      body:JSON.stringify(payload)})
      .then(function(r){ if(!r.ok) throw new Error('The AI service returned '+r.status+'.'); return r.json(); })
      .then(function(d){ if(d&&d.error) throw new Error(d.error); return d; });
  }
  function passagesFor(q,n){ return retrieve(q,n||8).map(function(r){ return {page:r.pg.p,text:r.pg.t}; }); }
  function coveragePassages(n){
    var byPage={};
    (index||[]).forEach(function(e){ if(!e||!e.t||e.t.length<20) return;
      var k=String(e.p||0); byPage[k]=byPage[k]||[];
      if(byPage[k].join(' ').length<1400) byPage[k].push(e.t); });
    return Object.keys(byPage).map(function(k){ return {page:Number(k),text:byPage[k].join(' ')}; }).slice(0,n||40);
  }
  function localAnswer(q){
    var r=retrieve(q,4);
    if(!r.length) return null;
    return r.map(function(x){ return 'Page '+(x.pg.p||'\u2014')+': '+snippet(x.pg.t,q); }).join('\\n\\n');
  }
  function showSources(container,results){
    if(!results.length) return;
    var p=document.createElement('p'); p.className='fx-qa-cite';
    p.appendChild(document.createTextNode('Sources in this document: '));
    var seen={};
    results.filter(function(r){ var k=r.pg.p||0; if(seen[k]) return false; seen[k]=1; return true; }).forEach(function(r){
      var b=document.createElement('button'); b.type='button'; b.className='fx-chip';
      b.textContent='Page '+(r.pg.p||'\u2014');
      b.onclick=function(){ jumpToText(r.pg.p,r.pg.t); closeDialog(); };
      p.appendChild(b); });
    container.appendChild(p);
  }

  var AI={
    knowledge:function(){ return knowledge; },
    config:function(){ return cfg; },
    transcript:function(){ return transcriptText(); },
    outline:function(){ return outline; },
    figures:function(){ return knowledge.figures||[]; },
    retrieve:function(q,n){ return retrieve(q,n||8).map(function(r){
      return {page:r.pg.p,text:r.pg.t,score:r.s}; }); },
    goToPage:function(n){ goto(Number(n)||1); },
    ask:function(q){
      var top=passagesFor(q,8);
      return callAI({mode:'ask',question:q,passages:top})
        .then(function(d){ return {answer:d.answer,citations:d.citations||[],passages:top}; })
        .catch(function(err){
          var a=localAnswer(q);
          if(!a) throw err;
          return {answer:'The AI assistant is unavailable, so here are the closest passages:\\n\\n'+a,
            citations:[],passages:top,offline:true}; });
    },
    summarize:function(){
      return callAI({mode:'summarize',passages:coveragePassages(40)}).then(function(d){ return d.answer; });
    },
    describe:function(fig){
      var f=(typeof fig==='string')?(AI.figures().filter(function(x){ return x.id===fig; })[0]||{id:fig}):(fig||{});
      var around=passagesFor((f.alt||'')+' '+(f.kind||'figure'),4);
      if(f.page) around=around.concat(coveragePassages(40).filter(function(p){ return p.page===f.page; }));
      return callAI({mode:'describe',text:JSON.stringify(f),passages:around}).then(function(d){ return d.answer; });
    },
    altText:function(fig){
      var f=(typeof fig==='string')?{id:fig}:(fig||{});
      return callAI({mode:'alt',text:JSON.stringify(f),passages:passagesFor(f.alt||'image',3)})
        .then(function(d){ return String(d.answer||'').replace(/^["']|["']$/g,'').slice(0,150); });
    },
    translate:function(target,text){
      return callAI({mode:'translate',target:target,text:text||transcriptText(18000)})
        .then(function(d){ return d.answer; });
    },
    speak:function(text){
      if(!('speechSynthesis' in window)) return false;
      window.speechSynthesis.cancel();
      var u=new SpeechSynthesisUtterance(String(text||'').slice(0,6000));
      u.lang=docLanguage(); window.speechSynthesis.speak(u); return true;
    },
    stopSpeaking:function(){ if('speechSynthesis' in window) window.speechSynthesis.cancel(); },
    elements:function(kind){ return kind&&kind!=='all'
      ? elements.filter(function(e){ return e.kind===kind; }) : elements; },
    element:function(id){ return elements.filter(function(e){ return e.id===String(id); })[0]||null; },
    explainElement:function(id){
      var el=(typeof id==='object'&&id)?id:AI.element(id);
      if(!el) return Promise.reject(new Error('That item is not part of this document.'));
      var around=passagesFor(el.label||el.text||'',3)
        .concat(coveragePassages(40).filter(function(p){ return p.page===el.page; }));
      return callAI({mode:'explain',text:JSON.stringify(el),question:'Explain this '+el.kind+' for a reader who cannot see the page.',passages:around})
        .then(function(d){ return d.answer; })
        .catch(function(err){
          if(el.text) return 'The AI assistant is unavailable. Here is the content of this '+el.kind+
            ' on page '+el.page+':\\n\\n'+el.text;
          throw err; });
    },
    explainPage:function(n){
      var p=Number(n)||current;
      var items=elements.filter(function(e){ return e.page===p; });
      return callAI({mode:'summarize',question:'Explain page '+p+' of this document.',
        text:JSON.stringify(items).slice(0,12000),
        passages:coveragePassages(40).filter(function(x){ return x.page===p; })})
        .then(function(d){ return d.answer; });
    },
    version:'3'
  };

  window.CodbDocsAI=AI;
  try{ document.dispatchEvent(new CustomEvent('codbdocs:ready',{detail:AI})); }catch(e){}

  // ---- Ask AI -----------------------------------------------------------
  var qaForm=document.getElementById('fx-qa-form'), qaOut=document.getElementById('fx-qa-answer');
  if(qaForm) qaForm.addEventListener('submit',function(e){
    e.preventDefault();
    var q=document.getElementById('fx-qa-input').value.trim(); if(!q) return;
    qaOut.hidden=false; qaOut.setAttribute('aria-busy','true');
    qaOut.textContent='Reading this document\u2026'; say('Asking the document assistant.');
    AI.ask(q).then(function(res){
      qaOut.textContent=res.answer||'No answer was returned.';
      qaOut.removeAttribute('aria-busy');
      showSources(qaOut,retrieve(q,5));
      if(resList){ renderResults(q,retrieve(q,10)); openDrawer();
        var sum=document.getElementById('fx-ai-summary');
        if(sum){ sum.hidden=false;
          sum.innerHTML='<div class="fx-ai-card"><h3>AI answer</h3><p class="fx-ai-text"></p></div>';
          sum.querySelector('.fx-ai-text').textContent=res.answer||''; } }
      say('The assistant answered your question.');
    }).catch(function(err){
      qaOut.removeAttribute('aria-busy');
      qaOut.textContent=(err&&err.message)||'No passage in this document matched that question.'; });
  });

  // ---- AI summary -------------------------------------------------------
  var sumBtn=document.getElementById('fx-sum-run'), sumOut=document.getElementById('fx-sum-out');
  if(sumBtn) sumBtn.onclick=function(){
    sumOut.hidden=false; sumOut.setAttribute('aria-busy','true');
    sumOut.textContent='Reading the whole document\u2026';
    AI.summarize().then(function(a){ sumOut.removeAttribute('aria-busy');
      sumOut.textContent=a||'No summary was returned.';
      var play=document.createElement('button'); play.type='button'; play.className='fx-chip';
      play.textContent='Read this summary aloud';
      play.onclick=function(){ AI.speak(sumOut.textContent); };
      sumOut.appendChild(document.createElement('br')); sumOut.appendChild(play);
      say('Summary ready.');
    }).catch(function(err){ sumOut.removeAttribute('aria-busy');
      sumOut.textContent=(err&&err.message)||'The summary could not be produced.'; });
  };
  var sumPage=document.getElementById('fx-sum-page');
  if(sumPage) sumPage.onclick=function(){
    sumOut.hidden=false; sumOut.setAttribute('aria-busy','true');
    sumOut.textContent='Reading page '+current+'\u2026';
    AI.explainPage(current).then(function(a){ sumOut.removeAttribute('aria-busy');
      sumOut.textContent=a||'No summary was returned.'; say('Page summary ready.');
    }).catch(function(err){ sumOut.removeAttribute('aria-busy');
      sumOut.textContent=(err&&err.message)||'The page summary could not be produced.'; });
  };

  // ---- AI explanations for images, charts, drawings and tables -----------
  function runExplain(btn,out,busyText,done){
    if(out){ out.hidden=false; out.setAttribute('aria-busy','true'); out.textContent=busyText; }
    btn.disabled=true;
    return function(promise){
      promise.then(function(a){
        if(out){ out.removeAttribute('aria-busy'); out.textContent=a||'No explanation was returned.'; }
        btn.disabled=false; if(done) done(a); say('Explanation ready.');
      }).catch(function(err){ btn.disabled=false;
        if(out){ out.removeAttribute('aria-busy');
          out.textContent=(err&&err.message)||'The explanation could not be produced.'; } });
    };
  }
  [].forEach.call(document.querySelectorAll('.fx-desc-btn'),function(btn){
    btn.onclick=function(){
      var fid=btn.getAttribute('data-fig'), eid=btn.getAttribute('data-explain');
      if(fid!==null&&fid!==undefined&&!eid){
        var out=document.querySelector('.fx-desc-out[data-fig="'+fid+'"]');
        var fig=(AI.figures().filter(function(f){ return f.id===fid; })[0])||{id:fid};
        runExplain(btn,out,'Describing this image\u2026',function(a){
          var host=btn.closest('figure'); var img=host&&host.querySelector('img');
          if(img&&a) img.setAttribute('alt',String(a).slice(0,150)); })(AI.describe(fig));
        return;
      }
      var eout=document.querySelector('.fx-desc-out[data-explain="'+eid+'"]');
      runExplain(btn,eout,'Explaining this item\u2026')(AI.explainElement(eid));
    };
  });

  // ---- content explorer (every text block, image, drawing and table) -----
  var exKind='all';
  function elementNodeFor(el){
    return document.querySelector('[data-el="'+(window.CSS&&CSS.escape?CSS.escape(el.id):el.id)+'"]');
  }
  function renderElements(){
    var list=document.getElementById('fx-ex-list'); if(!list) return;
    var q=((document.getElementById('fx-ex-filter')||{}).value||'').toLowerCase().trim();
    var items=elements.filter(function(e){
      if(exKind!=='all'&&e.kind!==exKind) return false;
      if(!q) return true;
      return (e.label+' '+e.text+' page '+e.page).toLowerCase().indexOf(q)>=0; }).slice(0,400);
    list.innerHTML='';
    var count=document.getElementById('fx-ex-count');
    if(count) count.textContent=items.length+' item'+(items.length===1?'':'s')+
      (exKind==='all'?'':' of type '+exKind)+' in this document.';
    items.forEach(function(el){
      var li=document.createElement('li');
      var head=document.createElement('p'); head.style.margin='0';
      var k=document.createElement('span'); k.className='fx-ex-kind'; k.textContent=el.kind;
      var lab=document.createElement('span'); lab.className='fx-ex-label';
      lab.textContent=el.label||el.text.slice(0,90)||('Item on page '+el.page);
      head.appendChild(k); head.appendChild(lab);
      var meta=document.createElement('span'); meta.className='fx-ex-kind'; meta.style.marginLeft='.4rem';
      meta.textContent='page '+el.page; head.appendChild(meta);
      li.appendChild(head);
      var actions=document.createElement('div'); actions.className='fx-ex-actions';
      function chip(label,fn){ var b=document.createElement('button'); b.type='button'; b.className='fx-chip';
        b.textContent=label; b.onclick=fn; actions.appendChild(b); return b; }
      chip('Go to it',function(){ goto(el.page);
        var node=elementNodeFor(el);
        if(node){ node.setAttribute('tabindex','-1'); node.scrollIntoView({behavior:'smooth',block:'center'});
          node.focus({preventScroll:true}); }
        closeDialog(); });
      chip('Read aloud',function(){ AI.speak(el.text||el.label); });
      var out=document.createElement('p'); out.className='fx-desc-out'; out.hidden=true;
      out.setAttribute('role','status'); out.setAttribute('aria-live','polite');
      var ex=chip('Explain with AI',function(){ runExplain(ex,out,'Explaining this '+el.kind+'\u2026')(AI.explainElement(el)); });
      if(el.kind==='image'||el.kind==='chart'){
        var alt=chip('Write alt text',function(){
          runExplain(alt,out,'Writing alt text\u2026')(AI.altText(el)); });
      }
      li.appendChild(actions); li.appendChild(out);
      if(el.kind==='table'&&el.text){
        var pre=document.createElement('pre'); pre.className='fx-pre'; pre.textContent=el.text.slice(0,4000);
        var det=document.createElement('details'); var sm=document.createElement('summary');
        sm.textContent='Show the table data as text'; det.appendChild(sm); det.appendChild(pre);
        li.appendChild(det);
      }
      list.appendChild(li);
    });
  }
  var exFilter=document.getElementById('fx-ex-filter');
  if(exFilter) exFilter.oninput=function(){ renderElements(); };
  [].forEach.call(document.querySelectorAll('#fx-ex-tabs button'),function(b){
    b.onclick=function(){ exKind=b.dataset.kind||'all';
      [].forEach.call(document.querySelectorAll('#fx-ex-tabs button'),function(x){
        x.setAttribute('aria-pressed',String(x===b)); });
      renderElements(); };
  });


  // ---- AI translation ----------------------------------------------------
  var trBtn=document.getElementById('fx-ai-translate'), trOut=document.getElementById('fx-ai-tr-out');
  if(trBtn) trBtn.onclick=function(){
    var target=(document.getElementById('fx-ai-lang')||{}).value||'';
    if(!target.trim()){ if(trOut){ trOut.hidden=false; trOut.textContent='Type the language you need first.'; } return; }
    trOut.hidden=false; trOut.setAttribute('aria-busy','true'); trOut.textContent='Translating this document\u2026';
    AI.translate(target).then(function(a){ trOut.removeAttribute('aria-busy');
      trOut.textContent=a||'No translation was returned.';
      say('Translation into '+target+' is ready.');
    }).catch(function(err){ trOut.removeAttribute('aria-busy');
      trOut.textContent=(err&&err.message)||'The translation could not be produced.'; });
  };

  // ---- read aloud (screen-reader friendly playback) ----------------------
  var readBtn=document.getElementById('fx-read');
  if(readBtn){
    var reading=false;
    readBtn.onclick=function(){
      if(reading){ AI.stopSpeaking(); reading=false; readBtn.setAttribute('aria-pressed','false');
        say('Reading stopped.'); return; }
      var page=document.getElementById('fx-page-'+current);
      var text=page? (page.querySelector('.fx-reflow')||page).textContent
        : transcriptText(6000);
      if(!AI.speak(text)){ say('Speech is not available in this browser.'); return; }
      reading=true; readBtn.setAttribute('aria-pressed','true'); say('Reading page '+current+' aloud.');
      if('speechSynthesis' in window) window.speechSynthesis.addEventListener('end',function(){
        reading=false; readBtn.setAttribute('aria-pressed','false'); },{once:true});
    };
  }




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
  var dk=document.getElementById('fx-dl-know');
  if(dk) dk.onclick=function(){ download(base+'-ai-knowledge.json',
    JSON.stringify({knowledge:knowledge,outline:outline,transcript:transcriptText()},null,2),'application/json'); };

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
