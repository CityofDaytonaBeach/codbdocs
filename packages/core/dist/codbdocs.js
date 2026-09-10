var CodbDocs = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/core/src/index.js
  var index_exports = {};
  __export(index_exports, {
    BlockTypes: () => BlockTypes,
    ChunkStrategies: () => ChunkStrategies,
    CodbDocs: () => CodbDocs,
    CodbFingerprint: () => CodbFingerprint,
    ColorSpaceTypes: () => ColorSpaceTypes,
    ConceptEdge: () => ConceptEdge,
    ConceptGraph: () => ConceptGraph,
    ConceptNode: () => ConceptNode,
    ContentBlock: () => ContentBlock,
    CustomEmbeddingProvider: () => CustomEmbeddingProvider,
    DocumentContentGraph: () => DocumentContentGraph,
    DocumentGraph: () => DocumentGraph,
    EmbeddingProvider: () => EmbeddingProvider,
    EntityTypes: () => EntityTypes,
    LocalEmbeddingProvider: () => LocalEmbeddingProvider,
    OpenAIEmbeddingProvider: () => OpenAIEmbeddingProvider,
    PDFCreator: () => PDFCreator,
    PageContentGraph: () => PageContentGraph,
    QueryIntent: () => QueryIntent,
    analyzeSpatialLayout: () => analyzeSpatialLayout,
    analyzeTextQuality: () => analyzeTextQuality,
    analyzeVisualRegions: () => analyzeVisualRegions,
    associateCaptionsWithImages: () => associateCaptionsWithImages,
    bestFuzzyMatch: () => bestFuzzyMatch,
    buildAccessibleHtml: () => buildAccessibleHtml,
    buildActionsSummary: () => buildActionsSummary,
    buildAppearanceStreamsSummary: () => buildAppearanceStreamsSummary,
    buildCrossPageContext: () => buildCrossPageContext,
    buildEmbeddedFilesSummary: () => buildEmbeddedFilesSummary,
    buildFidelityHtml: () => buildFidelityHtml,
    buildGraphicsStateSummary: () => buildGraphicsStateSummary,
    buildOCGSummary: () => buildOCGSummary,
    buildRevisionsSummary: () => buildRevisionsSummary,
    buildSignatureSummary: () => buildSignatureSummary,
    buildTableObjects: () => buildTableObjects,
    buildXObjectSummary: () => buildXObjectSummary,
    calculateRAGReadiness: () => calculateRAGReadiness,
    canUseWorkers: () => canUseWorkers,
    charNGrams: () => charNGrams,
    classifyPage: () => classifyPage,
    clearCache: () => clearCache,
    cmykToRgb: () => cmykToRgb,
    compareVisualInternal: () => compareVisualInternal,
    configure: () => configure,
    createChunks: () => createChunks,
    createGradientShading: () => createGradientShading,
    createHighlightAnnotations: () => createHighlightAnnotations,
    createPDF: () => createPDF,
    createRAGOutput: () => createRAGOutput,
    createRAGOutputWithEmbeddings: () => createRAGOutputWithEmbeddings,
    createSoftMask: () => createSoftMask,
    createTextPDF: () => createTextPDF,
    createTilingPattern: () => createTilingPattern,
    createTransparencyGroup: () => createTransparencyGroup,
    createWorkspace: () => createWorkspace,
    createZip: () => createZip,
    dataToIR: () => dataToIR,
    decomposeQuery: () => decomposeQuery,
    default: () => index_default,
    detectAcronyms: () => detectAcronyms,
    detectCheckboxes: () => detectCheckboxes,
    detectCrossPageTables: () => detectCrossPageTables,
    detectDefinitions: () => detectDefinitions,
    detectFlattenedForms: () => detectFlattenedForms,
    detectFootnotes: () => detectFootnotes,
    detectGlyphIssues: () => detectGlyphIssues,
    detectIntent: () => detectIntent,
    detectLanguage: () => detectLanguage,
    detectMalformedPDF: () => detectMalformedPDF,
    detectOutlinedText: () => detectOutlinedText,
    detectRedactions: () => detectRedactions,
    detectRepeatedElements: () => detectRepeatedElements,
    detectRotationSkew: () => detectRotationSkew,
    detectStructure: () => detectStructure,
    diagnoseDocument: () => diagnoseDocument,
    documentData: () => documentData,
    executeAsk: () => executeAsk,
    executeQuery: () => executeQuery,
    executeReasoning: () => executeReasoning,
    expandQuery: () => expandQuery,
    exportAccessibleHTML: () => exportAccessibleHTML,
    exportAsCSV: () => exportAsCSV,
    exportAsJSONL: () => exportAsJSONL,
    exportFidelityHTML: () => exportFidelityHTML,
    extractActions: () => extractActions,
    extractAllImages: () => extractAllImages,
    extractAppearanceStreams: () => extractAppearanceStreams,
    extractArtifacts: () => extractArtifacts,
    extractDocumentMetadata: () => extractDocumentMetadata,
    extractEmbeddedFiles: () => extractEmbeddedFiles,
    extractGlyphs: () => extractGlyphs,
    extractGraphicsState: () => extractGraphicsState,
    extractImages: () => extractImages,
    extractMarkedContent: () => extractMarkedContent,
    extractMetadata: () => extractMetadata,
    extractNamedDestinations: () => extractNamedDestinations,
    extractOCGs: () => extractOCGs,
    extractOutline: () => extractOutline,
    extractPageImages: () => extractPageImages,
    extractPageLabels: () => extractPageLabels,
    extractPageVector: () => extractPageVector,
    extractRelationships: () => extractRelationships,
    extractRevisions: () => extractRevisions,
    extractSecurity: () => extractSecurity,
    extractSignatures: () => extractSignatures,
    fuzzyScore: () => fuzzyScore,
    fuzzySearch: () => fuzzySearch,
    generateAccessibilityReport: () => generateAccessibilityReport,
    generateRemediations: () => generateRemediations,
    getCacheStats: () => getCacheStats,
    highlightResults: () => highlightResults,
    hybridSearch: () => hybridSearch,
    hydrateGraph: () => hydrateGraph,
    labToRgb: () => labToRgb,
    learnTerminology: () => learnTerminology2,
    levenshtein: () => levenshtein,
    load: () => load,
    loadFromCache: () => loadFromCache,
    normalizeDocument: () => normalizeDocument,
    normalizeIR: () => normalizeIR,
    normalizeText: () => normalizeText,
    ocrImage: () => ocrImage,
    ocrPage: () => ocrPage,
    operatorCount: () => operatorCount,
    operatorMax: () => operatorMax,
    operatorMin: () => operatorMin,
    operatorSum: () => operatorSum,
    packageDocument: () => packageDocument2,
    packageDocumentFull: () => packageDocumentFull,
    parseBlendMode: () => parseBlendMode,
    parseShading: () => parseShading,
    processLargeDocument: () => processLargeDocument,
    queryTable: () => queryTable,
    rankResults: () => rankResults,
    reconstructTable: () => reconstructTable,
    remediateAccessibility: () => remediateAccessibility,
    renderPageImage: () => renderPageImage,
    rerankResults: () => rerankResults,
    rgbToCmyk: () => rgbToCmyk,
    saveToCache: () => saveToCache,
    serverlessCapabilities: () => serverlessCapabilities,
    shouldStream: () => shouldStream,
    stem: () => stem,
    terminateOcr: () => terminateOcr,
    toRgb: () => toRgb,
    trackXObjectReuse: () => trackXObjectReuse,
    validateTags: () => validateTags,
    wcagAudit: () => wcagAudit,
    wordNGrams: () => wordNGrams
  });

  // packages/core/src/fidelity.js
  var esc = (v) => String(v != null ? v : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  var num = (v, fallback = 0) => {
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
  var PDFJS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs";
  var CONFORMANCE = [
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
  var AT_TESTED = [
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
    const config2 = {
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
      ]
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
.fx-original{max-width:1100px;margin:0 auto 24px;padding:16px}
.fx-original iframe{width:100%;height:82vh;border:0;background:#fff;border-radius:10px;
  box-shadow:0 0 0 1px rgba(0,0,0,.08),0 10px 30px rgba(15,20,30,.14)}
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
    ${tagPanel(options.tags)}
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
    ${rag ? `<li><button type="button" class="fx-primary" id="fx-dl-json">Structured data (JSON)</button></li>` : ""}
    <li><button type="button" class="fx-primary" id="fx-dl-know">AI knowledge pack (JSON)</button></li>

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
${jsonScript("codbdocs-config", config2)}
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
            var scale=Math.min(2,(Math.min(1100,(host?host.clientWidth:900)||900))/page.getViewport({scale:1}).width);
            var vp=page.getViewport({scale:scale*(window.devicePixelRatio||1)});
            var wrap=document.createElement('div'); wrap.className='fx-op-page';
            var lab=document.createElement('p'); lab.className='fx-op-num'; lab.textContent='Page '+n+' of '+doc.numPages;
            var cv=document.createElement('canvas'); cv.width=vp.width; cv.height=vp.height;
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

  // packages/core/src/brain.js
  function analyzeSpatialLayout(items, pageSize) {
    if (!items || items.length === 0) {
      return { columns: 0, rows: [], headings: [], flow: "unknown" };
    }
    const boxes = items.map((item) => {
      const tx = item.transform;
      return {
        text: item.str,
        x: tx[4],
        y: tx[5],
        width: item.width,
        height: item.height,
        fontSize: Math.abs(tx[0]) || Math.abs(tx[3]) || 12,
        fontName: item.fontName || ""
      };
    }).filter((b) => b.text.trim());
    const columns = detectColumns(boxes, pageSize.width);
    const rows = groupIntoRows(boxes);
    const headings = detectHeadings(boxes);
    const flow = detectFlow(rows);
    return { columns, rows, headings, flow, boxes };
  }
  function detectColumns(boxes, pageWidth) {
    if (boxes.length === 0) return 0;
    const xPositions = boxes.map((b) => b.x).sort((a, b) => a - b);
    const clusters = [];
    let currentCluster = [xPositions[0]];
    for (let i = 1; i < xPositions.length; i++) {
      const gap = xPositions[i] - xPositions[i - 1];
      if (gap > pageWidth * 0.15) {
        clusters.push(currentCluster);
        currentCluster = [xPositions[i]];
      } else {
        currentCluster.push(xPositions[i]);
      }
    }
    clusters.push(currentCluster);
    return Math.min(clusters.length, 4);
  }
  function groupIntoRows(boxes) {
    if (boxes.length === 0) return [];
    const sorted = [...boxes].sort((a, b) => b.y - a.y);
    const rows = [];
    let currentRow = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      const yDiff = Math.abs(sorted[i].y - currentRow[0].y);
      const avgHeight = currentRow.reduce((s, b) => s + b.height, 0) / currentRow.length;
      if (yDiff < avgHeight * 1.5) {
        currentRow.push(sorted[i]);
      } else {
        currentRow.sort((a, b) => a.x - b.x);
        rows.push(currentRow);
        currentRow = [sorted[i]];
      }
    }
    currentRow.sort((a, b) => a.x - b.x);
    rows.push(currentRow);
    return rows;
  }
  function detectHeadings(boxes) {
    if (boxes.length === 0) return [];
    const sizes = boxes.map((b) => b.fontSize).sort((a, b) => a - b);
    const medianSize = sizes[Math.floor(sizes.length / 2)];
    return boxes.filter((b) => b.fontSize > medianSize * 1.3 && b.text.trim().length > 2).map((b) => ({
      text: b.text,
      level: b.fontSize > medianSize * 2 ? 1 : b.fontSize > medianSize * 1.5 ? 2 : 3,
      y: b.y,
      fontSize: b.fontSize
    }));
  }
  function detectFlow(rows) {
    if (rows.length < 2) return "single";
    const leftEdges = rows.map((r) => {
      var _a;
      return ((_a = r[0]) == null ? void 0 : _a.x) || 0;
    });
    const variance = leftEdges.reduce((s, x) => s + Math.pow(x - leftEdges[0], 2), 0) / leftEdges.length;
    if (variance < 100) return "left-aligned";
    if (variance < 500) return "mixed";
    return "complex";
  }
  function detectStructure(spatialResult, pageSize) {
    const { rows, boxes } = spatialResult;
    const structures = [];
    const tableRegions = detectTables(rows, pageSize);
    structures.push(...tableRegions);
    const listRegions = detectLists(rows);
    structures.push(...listRegions);
    const formFields = detectFormFields(rows);
    structures.push(...formFields);
    const paragraphs = detectParagraphs(rows);
    structures.push(...paragraphs);
    structures.sort((a, b) => a.y - b.y);
    return structures;
  }
  function detectTables(rows, pageSize) {
    var _a;
    const tables = [];
    let tableStart = -1;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cellCount = row.length;
      if (cellCount >= 2) {
        const gaps = [];
        for (let j = 1; j < row.length; j++) {
          gaps.push(row[j].x - (row[j - 1].x + row[j - 1].width));
        }
        const avgGap = gaps.reduce((s, g) => s + g, 0) / gaps.length;
        const gapVariance = gaps.reduce((s, g) => s + Math.pow(g - avgGap, 2), 0) / gaps.length;
        if (gapVariance < avgGap * avgGap * 2) {
          if (tableStart === -1) tableStart = i;
          continue;
        }
      }
      if (tableStart !== -1 && i - tableStart >= 2) {
        tables.push({
          type: "table",
          y: ((_a = rows[tableStart][0]) == null ? void 0 : _a.y) || 0,
          startY: tableStart,
          endY: i - 1,
          rowCount: i - tableStart,
          colCount: Math.max(...rows.slice(tableStart, i).map((r) => r.length))
        });
      }
      tableStart = -1;
    }
    return tables;
  }
  function detectLists(rows) {
    var _a;
    const lists = [];
    const bulletPattern = /^[\u2022\u2023\u25E6\u2043\u2219\-\*\u25AA\u25AB\u25FB\u25FC]\s/;
    const numberPattern = /^(\d+[\.\)]\s|[a-z][\.\)]\s|[ivxIVX]+[\.\)]\s)/;
    let listStart = -1;
    let listType = null;
    for (let i = 0; i < rows.length; i++) {
      const text = rows[i].map((b) => b.text).join(" ").trim();
      const isBullet = bulletPattern.test(text);
      const isNumbered = numberPattern.test(text);
      if (isBullet || isNumbered) {
        const type = isBullet ? "bullet" : "numbered";
        if (listStart === -1) {
          listStart = i;
          listType = type;
        }
      } else {
        if (listStart !== -1 && i - listStart >= 2) {
          lists.push({
            type: "list",
            listType,
            y: ((_a = rows[listStart][0]) == null ? void 0 : _a.y) || 0,
            itemCount: i - listStart,
            startIndex: listStart,
            endIndex: i - 1
          });
        }
        listStart = -1;
        listType = null;
      }
    }
    return lists;
  }
  function detectFormFields(rows) {
    var _a;
    const fields = [];
    const fieldPattern = /^([A-Z][A-Za-z\s]{2,30}):\s*/;
    for (const row of rows) {
      const text = row.map((b) => b.text).join(" ");
      const match = text.match(fieldPattern);
      if (match) {
        fields.push({
          type: "formField",
          label: match[1].trim(),
          y: ((_a = row[0]) == null ? void 0 : _a.y) || 0,
          hasValue: text.length > match[0].length + 1
        });
      }
    }
    return fields;
  }
  function detectParagraphs(rows) {
    var _a;
    const paragraphs = [];
    let paraStart = -1;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const text = row.map((b) => b.text).join(" ").trim();
      const isParagraph = row.length <= 2 && text.length > 50;
      if (isParagraph) {
        if (paraStart === -1) paraStart = i;
      } else {
        if (paraStart !== -1 && i - paraStart >= 2) {
          paragraphs.push({
            type: "paragraph",
            y: ((_a = rows[paraStart][0]) == null ? void 0 : _a.y) || 0,
            lineCount: i - paraStart
          });
        }
        paraStart = -1;
      }
    }
    return paragraphs;
  }
  function extractMetadata(text) {
    const entities = {
      dates: extractDates(text),
      phones: extractPhones(text),
      emails: extractEmails(text),
      addresses: extractAddresses(text),
      amounts: extractAmounts(text),
      urls: extractUrls(text),
      zipCodes: extractZipCodes(text)
    };
    return entities;
  }
  function extractDates(text) {
    const patterns = [
      // MM/DD/YYYY or MM-DD-YYYY
      /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12]\d|3[01])[\/\-](\d{4})\b/g,
      // Month DD, YYYY
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/g,
      // DD Month YYYY
      /\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/g,
      // MM/YYYY
      /\b(0?[1-9]|1[0-2])\/(\d{4})\b/g,
      // Fiscal Year patterns
      /\bFY\s*(\d{4}(?:\s*[-–]\s*\d{2,4})?)\b/gi
    ];
    const dates = [];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        dates.push({
          raw: match[0],
          position: match.index,
          context: text.substring(Math.max(0, match.index - 30), match.index + match[0].length + 30).trim()
        });
      }
    }
    return dates;
  }
  function extractPhones(text) {
    const pattern = /\b(?:\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})\b/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractEmails(text) {
    const pattern = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractAddresses(text) {
    const pattern = /\b\d{1,5}\s+[\w\s]{2,40}(?:Street|St|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Road|Rd|Lane|Ln|Court|Ct|Place|Pl|Way|Circle|Cir)\b/gi;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractAmounts(text) {
    const pattern = /\$[\d,]+(?:\.\d{2})?/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      value: parseFloat(m[0].replace(/[$,]/g, "")),
      position: m.index
    }));
  }
  function extractUrls(text) {
    const pattern = /https?:\/\/[^\s<>"]+/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractZipCodes(text) {
    const pattern = /\b\d{5}(?:-\d{4})?\b/g;
    const zips = [];
    const seen = /* @__PURE__ */ new Set();
    for (const m of text.matchAll(pattern)) {
      const zip = m[0];
      if (!seen.has(zip)) {
        zips.push({ raw: zip, position: m.index });
        seen.add(zip);
      }
    }
    return zips;
  }
  function classifyPage(text, spatialResult) {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;
    if (charCount < 10) return { type: "blank", confidence: 1, summary: "Blank or image-only page" };
    const patterns = {
      cover: /^[\s\S]{0,100}(title|cover|report|annual|city of daytona)/i,
      table_of_contents: /(table of contents|contents|toc|index)/i,
      letter: /(dear|sincerely|regards|attention|re:)/i,
      memo: /(memo|memorandum|from:|to:|subject:|date:)/i,
      form: /(application|form|permit|license|registration)/i,
      legal: /(ordinance|resolution|charter|section \d|article \d)/i,
      budget: /(budget|appropriation|expenditure|revenue|fiscal)/i,
      report: /(report|analysis|review|assessment|evaluation)/i,
      map: /(map|zone|district|parcel|lot)/i,
      contract: /(agreement|contract|party|parties|hereby)/i,
      minutes: /(minutes|meeting|council|commission|public hearing)/i,
      policy: /(policy|procedure|guideline|regulation|compliance)/i,
      agenda: /(agenda|scheduled|item \d|old business|new business)/i
    };
    let bestType = "document";
    let bestConfidence = 0.3;
    for (const [type, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match) {
        const confidence = Math.min(0.9, 0.5 + match[0].length / charCount * 5);
        if (confidence > bestConfidence) {
          bestType = type;
          bestConfidence = confidence;
        }
      }
    }
    const summary = generateSummary(text, bestType);
    return { type: bestType, confidence: bestConfidence, summary, wordCount, charCount };
  }
  function generateSummary(text, type) {
    const lines = text.split("\n").filter((l) => l.trim());
    const firstLines = lines.slice(0, 5).join(" ").substring(0, 200);
    return `[${type}] ${firstLines}...`;
  }
  function analyzeVisualRegions(canvas) {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const bandHeight = Math.floor(height / 20);
    const bands = [];
    for (let y = 0; y < height; y += bandHeight) {
      let darkPixels = 0;
      let totalPixels = 0;
      for (let py = y; py < Math.min(y + bandHeight, height); py++) {
        for (let px = 0; px < width; px++) {
          const idx = (py * width + px) * 4;
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          const brightness = (r + g + b) / 3;
          totalPixels++;
          if (brightness < 128) darkPixels++;
        }
      }
      const density = darkPixels / totalPixels;
      bands.push({
        y,
        height: bandHeight,
        density,
        type: density < 0.02 ? "white" : density > 0.15 ? "image" : "text"
      });
    }
    const headerEnd = Math.floor(bands.length * 0.15);
    const footerStart = Math.floor(bands.length * 0.85);
    const regions = {
      header: bands.slice(0, headerEnd).some((b) => b.type === "text"),
      footer: bands.slice(footerStart).some((b) => b.type === "text"),
      hasImages: bands.some((b) => b.type === "image"),
      contentBands: bands.filter((b) => b.type === "text").length,
      imageBands: bands.filter((b) => b.type === "image").length,
      whiteBands: bands.filter((b) => b.type === "white").length
    };
    return regions;
  }

  // packages/core/src/layers.js
  var TextLayer = class {
    constructor() {
      this.pages = [];
      this.fullText = "";
      this.wordCount = 0;
      this.sentences = [];
    }
    addPage(pageNum, text, source) {
      const words = text.split(/\s+/).filter(Boolean);
      const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 10);
      this.pages.push({ pageNum, text, source, words, sentences });
      this.fullText += text + "\n";
      this.wordCount += words.length;
      this.sentences.push(...sentences.map((s) => ({ text: s, page: pageNum })));
    }
    search(query) {
      const lower = query.toLowerCase();
      return this.sentences.filter((s) => s.text.toLowerCase().includes(lower));
    }
    getPageText(pageNum) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      return page ? page.text : "";
    }
    getWordAt(pageNum, index) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      if (!page) return null;
      return page.words[index] || null;
    }
  };
  var LayoutLayer = class {
    constructor() {
      this.pages = [];
    }
    addPage(pageNum, spatialResult, pageSize) {
      this.pages.push({
        pageNum,
        columns: spatialResult.columns || 1,
        rows: spatialResult.rows || [],
        headings: spatialResult.headings || [],
        flow: spatialResult.flow || "unknown",
        pageSize
      });
    }
    getColumns(pageNum) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      return page ? page.columns : 0;
    }
    getHeadings(pageNum) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      return page ? page.headings : [];
    }
    getAllHeadings() {
      return this.pages.flatMap(
        (p) => p.headings.map((h) => ({ ...h, page: p.pageNum }))
      );
    }
    getTableOfContents() {
      const headings = this.getAllHeadings();
      if (headings.length === 0) return null;
      const toc = [];
      let currentH1 = null;
      let currentH2 = null;
      for (const h of headings) {
        if (h.level === 1) {
          currentH1 = { ...h, children: [] };
          toc.push(currentH1);
          currentH2 = null;
        } else if (h.level === 2 && currentH1) {
          currentH2 = { ...h, children: [] };
          currentH1.children.push(currentH2);
        } else if (h.level === 3 && currentH2) {
          currentH2.children.push({ ...h });
        }
      }
      return toc;
    }
  };
  var StructureLayer = class {
    constructor() {
      this.pages = [];
      this.tables = [];
      this.forms = [];
      this.lists = [];
    }
    addPage(pageNum, structures) {
      const pageStructures = {
        pageNum,
        tables: structures.filter((s) => s.type === "table"),
        lists: structures.filter((s) => s.type === "list"),
        forms: structures.filter((s) => s.type === "formField"),
        paragraphs: structures.filter((s) => s.type === "paragraph")
      };
      this.pages.push(pageStructures);
      this.tables.push(...pageStructures.tables.map((t) => ({ ...t, page: pageNum })));
      this.forms.push(...pageStructures.forms.map((f) => ({ ...f, page: pageNum })));
      this.lists.push(...pageStructures.lists.map((l) => ({ ...l, page: pageNum })));
    }
    getTables(pageNum) {
      if (pageNum) {
        const page = this.pages.find((p) => p.pageNum === pageNum);
        return page ? page.tables : [];
      }
      return this.tables;
    }
    getForms(pageNum) {
      if (pageNum) {
        const page = this.pages.find((p) => p.pageNum === pageNum);
        return page ? page.forms : [];
      }
      return this.forms;
    }
    getLists(pageNum) {
      if (pageNum) {
        const page = this.pages.find((p) => p.pageNum === pageNum);
        return page ? page.lists : [];
      }
      return this.lists;
    }
    getFormData() {
      const data = {};
      for (const field of this.forms) {
        data[field.label] = field.hasValue ? "[value]" : "[empty]";
      }
      return data;
    }
  };
  var MetadataLayer = class {
    constructor() {
      this.pages = [];
      this.entities = {
        dates: [],
        phones: [],
        emails: [],
        addresses: [],
        amounts: [],
        urls: [],
        zipCodes: []
      };
    }
    addPage(pageNum, metadata) {
      this.pages.push({ pageNum, ...metadata });
      for (const key of Object.keys(this.entities)) {
        if (metadata[key]) {
          this.entities[key].push(...metadata[key].map((e) => ({ ...e, page: pageNum })));
        }
      }
    }
    getDates(pageNum) {
      return pageNum ? this.entities.dates.filter((e) => e.page === pageNum) : this.entities.dates;
    }
    getPhones(pageNum) {
      return pageNum ? this.entities.phones.filter((e) => e.page === pageNum) : this.entities.phones;
    }
    getEmails(pageNum) {
      return pageNum ? this.entities.emails.filter((e) => e.page === pageNum) : this.entities.emails;
    }
    getAddresses(pageNum) {
      return pageNum ? this.entities.addresses.filter((e) => e.page === pageNum) : this.entities.addresses;
    }
    getAmounts(pageNum) {
      return pageNum ? this.entities.amounts.filter((e) => e.page === pageNum) : this.entities.amounts;
    }
    getSummary() {
      return {
        totalDates: this.entities.dates.length,
        totalPhones: this.entities.phones.length,
        totalEmails: this.entities.emails.length,
        totalAddresses: this.entities.addresses.length,
        totalAmounts: this.entities.amounts.length,
        uniqueAmounts: [...new Set(this.entities.amounts.map((a) => a.value))].sort((a, b) => b - a)
      };
    }
  };
  var VisualLayer = class {
    constructor() {
      this.pages = [];
    }
    addPage(pageNum, visualRegions) {
      this.pages.push({ pageNum, ...visualRegions });
    }
    getPageInfo(pageNum) {
      return this.pages.find((p) => p.pageNum === pageNum) || null;
    }
    hasImages(pageNum) {
      const page = this.getPageInfo(pageNum);
      return page ? page.hasImages : false;
    }
    getHeaderFooterInfo() {
      return this.pages.map((p) => ({
        page: p.pageNum,
        hasHeader: p.header,
        hasFooter: p.footer
      }));
    }
  };
  var DocumentGraph = class {
    constructor() {
      this.text = new TextLayer();
      this.layout = new LayoutLayer();
      this.structure = new StructureLayer();
      this.metadata = new MetadataLayer();
      this.visual = new VisualLayer();
      this.pageCount = 0;
      this.classifications = [];
    }
    addPageResult(pageResult) {
      this.pageCount++;
      this.text.addPage(pageResult.num, pageResult.text, pageResult.source);
      if (pageResult.spatial) {
        this.layout.addPage(pageResult.num, pageResult.spatial, pageResult.pageSize);
      }
      if (pageResult.structures) {
        this.structure.addPage(pageResult.num, pageResult.structures);
      }
      if (pageResult.metadata) {
        this.metadata.addPage(pageResult.num, pageResult.metadata);
      }
      if (pageResult.visual) {
        this.visual.addPage(pageResult.num, pageResult.visual);
      }
      if (pageResult.classification) {
        this.classifications.push({
          page: pageResult.num,
          ...pageResult.classification
        });
      }
    }
    /**
     * Query the document semantically — like querying an embedding model.
     * Supports natural language patterns.
     */
    query(q) {
      const lower = q.toLowerCase();
      if (/date|when|what day/.test(lower)) {
        return { type: "dates", results: this.metadata.getDates() };
      }
      if (/phone|call|contact|number/.test(lower)) {
        return { type: "phones", results: this.metadata.getPhones() };
      }
      if (/email|e-mail|electronic/.test(lower)) {
        return { type: "emails", results: this.metadata.getEmails() };
      }
      if (/address|location|where|street|avenue/.test(lower)) {
        return { type: "addresses", results: this.metadata.getAddresses() };
      }
      if (/money|amount|cost|price|budget|dollar|\$|fund/.test(lower)) {
        return { type: "amounts", results: this.metadata.getAmounts() };
      }
      if (/table|data|spreadsheet|grid/.test(lower)) {
        return { type: "tables", results: this.structure.getTables() };
      }
      if (/list|items|bullet|numbered/.test(lower)) {
        return { type: "lists", results: this.structure.getLists() };
      }
      if (/form|field|input|application|fill/.test(lower)) {
        return { type: "forms", results: this.structure.getForms() };
      }
      if (/heading|title|section|chapter|outline|toc/.test(lower)) {
        return { type: "headings", results: this.layout.getAllHeadings() };
      }
      if (/summary|summarize|overview|brief/.test(lower)) {
        return { type: "summary", results: this.getSummary() };
      }
      const searchResults = this.text.search(q);
      return { type: "text-search", query: q, results: searchResults };
    }
    /**
     * Get a summary of the entire document.
     */
    getSummary() {
      const pageTypes = this.classifications.map((c) => c.type);
      const typeCounts = {};
      for (const t of pageTypes) {
        typeCounts[t] = (typeCounts[t] || 0) + 1;
      }
      return {
        pageCount: this.pageCount,
        wordCount: this.text.wordCount,
        pageTypes: typeCounts,
        metadata: this.metadata.getSummary(),
        headings: this.layout.getAllHeadings().map((h) => h.text),
        tableCount: this.structure.tables.length,
        formCount: this.structure.forms.length,
        listCount: this.structure.lists.length
      };
    }
    /**
     * Export as JSON for downstream use (RAG, search, etc).
     */
    toJSON() {
      return {
        pageCount: this.pageCount,
        summary: this.getSummary(),
        pages: this.text.pages.map((p, i) => ({
          num: p.pageNum,
          text: p.text,
          source: p.source,
          classification: this.classifications[i] || null,
          headings: this.layout.getHeadings(p.pageNum),
          tables: this.structure.getTables(p.pageNum),
          forms: this.structure.getForms(p.pageNum),
          lists: this.structure.getLists(p.pageNum),
          metadata: {
            dates: this.metadata.getDates(p.pageNum),
            phones: this.metadata.getPhones(p.pageNum),
            emails: this.metadata.getEmails(p.pageNum),
            addresses: this.metadata.getAddresses(p.pageNum),
            amounts: this.metadata.getAmounts(p.pageNum)
          }
        }))
      };
    }
  };

  // packages/core/src/content.js
  var BlockTypes = {
    HEADING: "heading",
    PARAGRAPH: "paragraph",
    TABLE: "table",
    LIST: "list",
    FORM_FIELD: "form_field",
    IMAGE: "image",
    SIGNATURE: "signature",
    CHECKBOX: "checkbox",
    CHART: "chart",
    CITATION: "citation",
    QUOTE: "quote",
    CAPTION: "caption",
    HEADER: "header",
    FOOTER: "footer",
    WHITESPACE: "whitespace"
  };
  var EntityTypes = {
    PERSON: "person",
    ORGANIZATION: "organization",
    DATE: "date",
    CURRENCY: "currency",
    PHONE: "phone",
    EMAIL: "email",
    ADDRESS: "address",
    URL: "url",
    ZIP_CODE: "zip_code",
    INVOICE_NUMBER: "invoice_number",
    PERMIT_NUMBER: "permit_number",
    RESOLUTION_NUMBER: "resolution_number",
    ORDINANCE_NUMBER: "ordinance_number",
    AGENDA_ITEM: "agenda_item"
  };
  var ContentBlock = class {
    constructor(type, data) {
      this.type = type;
      this.text = data.text || "";
      this.bbox = data.bbox || null;
      this.page = data.page || 0;
      this.confidence = data.confidence || null;
      this.metadata = data.metadata || {};
      this.children = data.children || [];
      this.relationships = data.relationships || [];
    }
    toJSON() {
      return {
        type: this.type,
        text: this.text,
        bbox: this.bbox,
        page: this.page,
        confidence: this.confidence,
        metadata: this.metadata,
        children: this.children.length > 0 ? this.children : void 0,
        relationships: this.relationships.length > 0 ? this.relationships : void 0
      };
    }
  };
  var PageContentGraph = class {
    constructor(pageNum) {
      this.page = pageNum;
      this.blocks = [];
      this.tables = [];
      this.entities = [];
      this.regions = [];
      this.relationships = [];
    }
    addBlock(block) {
      this.blocks.push(block);
      if (block.type === BlockTypes.TABLE) {
        this.tables.push(block);
      }
    }
    addEntity(entity) {
      this.entities.push(entity);
    }
    addRelationship(rel) {
      this.relationships.push(rel);
    }
    /**
     * Find blocks/entities by type, text, or spatial proximity.
     */
    find(query) {
      if (typeof query === "string") {
        return this._findByText(query);
      }
      if (query.type) {
        return this._findByType(query.type);
      }
      if (query.near) {
        return this._findNear(query.near, query.type);
      }
      return [];
    }
    _findByText(text) {
      const lower = text.toLowerCase();
      const results = [];
      for (const block of this.blocks) {
        if (block.text.toLowerCase().includes(lower)) {
          results.push(block);
        }
      }
      for (const entity of this.entities) {
        if (entity.value && entity.value.toLowerCase().includes(lower)) {
          results.push(entity);
        }
        if (entity.text && entity.text.toLowerCase().includes(lower)) {
          results.push(entity);
        }
      }
      return results;
    }
    _findByType(type) {
      return [
        ...this.blocks.filter((b) => b.type === type),
        ...this.entities.filter((e) => e.type === type)
      ];
    }
    _findNear(text, type) {
      const targets = this._findByText(text);
      if (targets.length === 0) return [];
      const target = targets[0];
      if (!target.bbox) return targets;
      return this.entities.filter((e) => {
        if (type && e.type !== type) return false;
        if (!e.bbox) return false;
        return this._areNear(target.bbox, e.bbox);
      });
    }
    _areNear(bbox1, bbox2, threshold = 100) {
      const cx1 = bbox1[0] + bbox1[2] / 2;
      const cy1 = bbox1[1] + bbox1[3] / 2;
      const cx2 = bbox2[0] + bbox2[2] / 2;
      const cy2 = bbox2[1] + bbox2[3] / 2;
      const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
      return dist < threshold;
    }
  };
  var DocumentContentGraph = class {
    constructor() {
      this.pages = [];
      this.allBlocks = [];
      this.allEntities = [];
      this.allTables = [];
      this.allRelationships = [];
      this.documentType = null;
    }
    addPageGraph(pageGraph) {
      this.pages.push(pageGraph);
      this.allBlocks.push(...pageGraph.blocks);
      this.allEntities.push(...pageGraph.entities);
      this.allTables.push(...pageGraph.tables);
      this.allRelationships.push(...pageGraph.relationships);
    }
    /**
     * Search across all pages.
     * Returns results with page number and bbox.
     */
    find(query) {
      const results = [];
      for (const page of this.pages) {
        const pageResults2 = page.find(query);
        for (const r of pageResults2) {
          results.push({ ...r, page: page.page });
        }
      }
      return results;
    }
    /**
     * Find the first match across all pages.
     */
    findOne(query) {
      for (const page of this.pages) {
        const results = page.find(query);
        if (results.length > 0) {
          return { ...results[0], page: page.page };
        }
      }
      return null;
    }
    /**
     * Get all entities of a specific type.
     */
    getEntities(type) {
      return this.allEntities.filter((e) => e.type === type);
    }
    /**
     * Get all blocks of a specific type.
     */
    getBlocks(type) {
      return this.allBlocks.filter((b) => b.type === type);
    }
    /**
     * Export as JSON for downstream use.
     */
    toJSON() {
      return {
        documentType: this.documentType,
        pageCount: this.pages.length,
        summary: this.getSummary(),
        pages: this.pages.map((p) => ({
          page: p.page,
          blocks: p.blocks.map((b) => b.toJSON()),
          entities: p.entities,
          tables: p.tables.map((t) => t.toJSON()),
          relationships: p.relationships
        }))
      };
    }
    getSummary() {
      return {
        blockTypes: this._countTypes(this.allBlocks),
        entityTypes: this._countTypes(this.allEntities),
        tableCount: this.allTables.length,
        relationshipCount: this.allRelationships.length
      };
    }
    _countTypes(arr) {
      const counts = {};
      for (const item of arr) {
        counts[item.type] = (counts[item.type] || 0) + 1;
      }
      return counts;
    }
  };
  function analyzeContent(pageNum, text, spatialResult, metadataResult) {
    const graph = new PageContentGraph(pageNum);
    if (!text || text.trim().length === 0) {
      return graph;
    }
    const { rows = [], headings = [], boxes = [] } = spatialResult || {};
    for (const heading of headings) {
      graph.addBlock(new ContentBlock(BlockTypes.HEADING, {
        text: heading.text,
        bbox: findBboxForText(heading.text, boxes),
        page: pageNum,
        metadata: { level: heading.level, fontSize: heading.fontSize }
      }));
    }
    const paragraphs = splitIntoParagraphs(text);
    for (const para of paragraphs) {
      if (para.length < 10) continue;
      if (/^[\u2022\-\*]\s|^\d+[\.\)]\s/.test(para)) {
        graph.addBlock(new ContentBlock(BlockTypes.LIST, {
          text: para,
          bbox: findBboxForText(para.split("\n")[0], boxes),
          page: pageNum
        }));
        continue;
      }
      if (/^[""]|^\|/.test(para)) {
        graph.addBlock(new ContentBlock(BlockTypes.QUOTE, {
          text: para,
          bbox: findBboxForText(para.substring(0, 30), boxes),
          page: pageNum
        }));
        continue;
      }
      graph.addBlock(new ContentBlock(BlockTypes.PARAGRAPH, {
        text: para,
        bbox: findBboxForText(para.substring(0, 30), boxes),
        page: pageNum
      }));
    }
    if (metadataResult) {
      for (const date of metadataResult.dates || []) {
        graph.addEntity({
          type: EntityTypes.DATE,
          value: date.raw,
          text: date.raw,
          bbox: findBboxForText(date.raw, boxes),
          page: pageNum,
          confidence: 0.9
        });
      }
      for (const phone of metadataResult.phones || []) {
        graph.addEntity({
          type: EntityTypes.PHONE,
          value: phone.raw,
          text: phone.raw,
          bbox: findBboxForText(phone.raw, boxes),
          page: pageNum,
          confidence: 0.85
        });
      }
      for (const email of metadataResult.emails || []) {
        graph.addEntity({
          type: EntityTypes.EMAIL,
          value: email.raw,
          text: email.raw,
          bbox: findBboxForText(email.raw, boxes),
          page: pageNum,
          confidence: 0.95
        });
      }
      for (const address of metadataResult.addresses || []) {
        graph.addEntity({
          type: EntityTypes.ADDRESS,
          value: address.raw,
          text: address.raw,
          bbox: findBboxForText(address.raw, boxes),
          page: pageNum,
          confidence: 0.8
        });
      }
      for (const amount of metadataResult.amounts || []) {
        graph.addEntity({
          type: EntityTypes.CURRENCY,
          value: amount.raw,
          numericValue: amount.value,
          text: amount.raw,
          bbox: findBboxForText(amount.raw, boxes),
          page: pageNum,
          confidence: 0.9
        });
      }
    }
    detectSpecialContent(graph, text, boxes, pageNum);
    detectRelationships(graph);
    return graph;
  }
  function detectSpecialContent(graph, text, boxes, pageNum) {
    const lines = text.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (/invoice|inv[\s#:]|bill\s*to|ship\s*to|amount\s*due/i.test(trimmed)) {
        graph.addBlock(new ContentBlock("invoice_hint", {
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          metadata: { hint: "invoice_content" }
        }));
      }
      if (/receipt|purchase|subtotal|tax|total|change|cash|credit|debit/i.test(trimmed)) {
        graph.addBlock(new ContentBlock("receipt_hint", {
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          metadata: { hint: "receipt_content" }
        }));
      }
      const fieldMatch = trimmed.match(/^([A-Z][A-Za-z\s]{2,30}):\s*(.*)/);
      if (fieldMatch) {
        graph.addBlock(new ContentBlock(BlockTypes.FORM_FIELD, {
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          metadata: {
            label: fieldMatch[1].trim(),
            value: fieldMatch[2].trim(),
            hasValue: fieldMatch[2].trim().length > 0
          }
        }));
      }
      if (/[\u2610\u2611\u2612\u25A1\u25A0\u2713\u2717\u2714]/.test(trimmed) || /\[x\]|\[ \]|\[X\]/.test(trimmed)) {
        const isChecked = /[\u2611\u25A0\u2713\u2714]|\[x\]|\[X\]/.test(trimmed);
        graph.addEntity({
          type: EntityTypes.CHECKBOX,
          value: isChecked ? "checked" : "unchecked",
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 20), boxes),
          page: pageNum,
          confidence: 0.85,
          metadata: { checked: isChecked }
        });
      }
      if (/signature|signed|sign\s*here|\/s\/|.{10,30}$/.test(trimmed) && /[A-Za-z]{3,}/.test(trimmed) && !/^[A-Z\s]{10,}$/.test(trimmed) && trimmed.length < 50) {
        const hasSignatureLike = /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(trimmed) || /\//.test(trimmed);
        if (hasSignatureLike) {
          graph.addBlock(new ContentBlock(BlockTypes.SIGNATURE, {
            text: trimmed,
            bbox: findBboxForText(trimmed.substring(0, 30), boxes),
            page: pageNum,
            confidence: 0.6
          }));
        }
      }
      const ordinanceMatch = trimmed.match(/(?:ordinance|resolution)\s*(?:no\.?|number|#)?\s*(\d+[\-\d]*)/i);
      if (ordinanceMatch) {
        const isOrdinance = /ordinance/i.test(trimmed);
        graph.addEntity({
          type: isOrdinance ? EntityTypes.ORDINANCE_NUMBER : EntityTypes.RESOLUTION_NUMBER,
          value: ordinanceMatch[0],
          number: ordinanceMatch[1],
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.9
        });
      }
      const permitMatch = trimmed.match(/permit\s*(?:no\.?|number|#)?\s*([A-Z0-9\-]+)/i);
      if (permitMatch) {
        graph.addEntity({
          type: EntityTypes.PERMIT_NUMBER,
          value: permitMatch[0],
          number: permitMatch[1],
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.85
        });
      }
      const agendaMatch = trimmed.match(/^(?:item\s*)?(\d+[\.\)]\s*.+)/i);
      if (agendaMatch && /agenda|hearing|meeting|public\s*comment/i.test(text.substring(0, 500))) {
        graph.addEntity({
          type: EntityTypes.AGENDA_ITEM,
          value: agendaMatch[1].trim(),
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.7
        });
      }
      const nameMatch = trimmed.match(/^(?:prepared\s*by|author|name|employee|officer|director|commissioner|mayor|city\s*attorney)[:\s]+(.+)/i);
      if (nameMatch) {
        graph.addEntity({
          type: EntityTypes.PERSON,
          value: nameMatch[1].trim(),
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.7,
          metadata: { role: nameMatch[0].split(":")[0].trim() }
        });
      }
      const orgMatch = trimmed.match(/^(city\s*of\s*[a-z\s]+|department\s*of\s*[a-z\s]+|[a-z\s]+\s*department)/i);
      if (orgMatch) {
        graph.addEntity({
          type: EntityTypes.ORGANIZATION,
          value: orgMatch[0].trim(),
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.75
        });
      }
    }
  }
  function detectRelationships(graph) {
    for (const block of graph.blocks) {
      if (!block.bbox) continue;
      for (const entity of graph.entities) {
        if (!entity.bbox) continue;
        if (areBboxesNear(block.bbox, entity.bbox, 80)) {
          block.relationships.push({
            type: "contains",
            target: entity.type,
            value: entity.value
          });
          entity.relationships = entity.relationships || [];
          entity.relationships.push({
            type: "belongs_to",
            target: block.type,
            text: block.text.substring(0, 50)
          });
        }
      }
    }
  }
  function classifyDocumentType(contentGraph) {
    const allText = contentGraph.allBlocks.map((b) => b.text).join(" ").toLowerCase();
    const entityTypes = contentGraph.allEntities.map((e) => e.type);
    const blockTypes = contentGraph.allBlocks.map((b) => b.type);
    const scores = {
      invoice: 0,
      receipt: 0,
      form: 0,
      legal: 0,
      memo: 0,
      letter: 0,
      report: 0,
      minutes: 0,
      policy: 0,
      budget: 0,
      permit: 0,
      contract: 0
    };
    if (/invoice|bill\s*to|amount\s*due|payment\s*due|invoice\s*#/i.test(allText)) scores.invoice += 3;
    if (entityTypes.includes(EntityTypes.CURRENCY)) scores.invoice += 1;
    if (blockTypes.includes("invoice_hint")) scores.invoice += 2;
    if (/receipt|subtotal|change|cash\s*tendered|credit\s*card|debit/i.test(allText)) scores.receipt += 3;
    if (blockTypes.includes("receipt_hint")) scores.receipt += 2;
    const formFieldCount = blockTypes.filter((t) => t === BlockTypes.FORM_FIELD).length;
    if (formFieldCount >= 3) scores.form += 3;
    if (/application|fill\s*out|complete\s*this\s*form/i.test(allText)) scores.form += 2;
    if (/ordinance|resolution|charter|hereby\s*enacted|section\s*\d+/i.test(allText)) scores.legal += 3;
    if (entityTypes.includes(EntityTypes.ORDINANCE_NUMBER)) scores.legal += 2;
    if (entityTypes.includes(EntityTypes.RESOLUTION_NUMBER)) scores.legal += 2;
    if (/memorandum|memo\b|from:|to:|subject:|date:/i.test(allText)) scores.memo += 3;
    if (/dear\s|sincerely|regards|attention|re:\s/i.test(allText)) scores.letter += 3;
    if (/report|annual\s*report|analysis|findings|recommendation/i.test(allText)) scores.report += 2;
    if (/minutes|meeting\s*called\s*to\s*order|public\s*hearing|commissioner|mayor/i.test(allText)) scores.minutes += 3;
    if (/policy|procedure|guideline|regulation|compliance|standard\s*operating/i.test(allText)) scores.policy += 3;
    if (/budget|appropriation|expenditure|revenue|fiscal\s*year|fund\s*balance/i.test(allText)) scores.budget += 3;
    if (entityTypes.includes(EntityTypes.PERMIT_NUMBER)) scores.permit += 3;
    if (/building\s*permit|permit\s*application|zoning/i.test(allText)) scores.permit += 2;
    if (/agreement|contract|party|parties|hereby\s*agrees|terms\s*and\s*conditions/i.test(allText)) scores.contract += 3;
    let bestType = "document";
    let bestScore = 0;
    for (const [type, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestType = type;
        bestScore = score;
      }
    }
    return {
      type: bestType,
      confidence: Math.min(0.95, bestScore / 8),
      scores
    };
  }
  function findBboxForText(text, boxes) {
    if (!boxes || !text) return null;
    const lower = text.toLowerCase().substring(0, 30);
    const match = boxes.find((b) => b.text.toLowerCase().includes(lower));
    if (match) {
      return [match.x, match.y, match.width, match.height];
    }
    return null;
  }
  function splitIntoParagraphs(text) {
    return text.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 0);
  }
  function areBboxesNear(bbox1, bbox2, threshold) {
    const cx1 = bbox1[0] + bbox1[2] / 2;
    const cy1 = bbox1[1] + bbox1[3] / 2;
    const cx2 = bbox2[0] + bbox2[2] / 2;
    const cy2 = bbox2[1] + bbox2[3] / 2;
    const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
    return dist < threshold;
  }

  // packages/core/src/query.js
  function executeQuery(contentGraph, query, graph = null) {
    var _a, _b;
    if (graph && graph.planQuery && graph.hybridSearch) {
      const plan = graph.planQuery(query);
      const results2 = graph.hybridSearch(query, { maxResults: 20 });
      return {
        type: ((_a = plan.intent) == null ? void 0 : _a.type) || "text-search",
        label: ((_b = plan.intent) == null ? void 0 : _b.type) || "text matches",
        plan,
        results: results2,
        query,
        count: results2.length
      };
    }
    const results = contentGraph.find(query);
    return { type: "text-search", label: "text matches", results, query, count: results.length };
  }
  function executeAsk(contentGraph, question, graph = null) {
    if (graph && graph.askEnhanced) {
      return graph.askEnhanced(question);
    }
    const queryResult = executeQuery(contentGraph, question, graph);
    const { type, label, results, query } = queryResult;
    if (type === "summary") {
      const summary = results;
      if (!summary || typeof summary !== "object") {
        return {
          answer: "No summary available.",
          confidence: 0.5,
          evidence: []
        };
      }
      return {
        answer: formatSummaryAnswer(summary),
        confidence: 0.85,
        evidence: []
      };
    }
    const resultsArray = Array.isArray(results) ? results : [];
    if (resultsArray.length === 0) {
      return {
        answer: `No ${label} found in this document.`,
        confidence: 0.9,
        evidence: []
      };
    }
    let answer = "";
    let confidence = 0.8;
    let evidence = [];
    if (type === EntityTypes.DATE) {
      const dates = resultsArray.map((r) => r.value || r.text).join(", ");
      answer = `Found ${resultsArray.length} date(s): ${dates}`;
      confidence = 0.9;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.CURRENCY) {
      answer = `Found ${resultsArray.length} monetary value(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      confidence = 0.85;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.PERSON) {
      const people = [...new Set(resultsArray.map((r) => r.value))];
      answer = `Found ${people.length} person(s): ${people.join(", ")}`;
      evidence = resultsArray.map((r) => {
        var _a;
        return { text: r.value, page: r.page, bbox: r.bbox, role: (_a = r.metadata) == null ? void 0 : _a.role };
      });
    }
    if (type === EntityTypes.ORGANIZATION) {
      const orgs = [...new Set(resultsArray.map((r) => r.value))];
      answer = `Found ${orgs.length} organization(s): ${orgs.join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.PHONE) {
      answer = `Found ${resultsArray.length} phone number(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.EMAIL) {
      answer = `Found ${resultsArray.length} email(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.ADDRESS) {
      answer = `Found ${resultsArray.length} address(es): ${resultsArray.map((r) => r.value).join("; ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.ORDINANCE_NUMBER) {
      answer = `Found ${resultsArray.length} ordinance(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.RESOLUTION_NUMBER) {
      answer = `Found ${resultsArray.length} resolution(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.PERMIT_NUMBER) {
      answer = `Found ${resultsArray.length} permit(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === BlockTypes.TABLE) {
      answer = `Found ${resultsArray.length} table(s) in the document.`;
      evidence = resultsArray.map((r) => {
        var _a;
        return { text: (_a = r.text) == null ? void 0 : _a.substring(0, 50), page: r.page, bbox: r.bbox };
      });
    }
    if (type === BlockTypes.FORM_FIELD) {
      const fields = resultsArray.map((r) => {
        var _a, _b;
        return ((_a = r.metadata) == null ? void 0 : _a.label) || ((_b = r.text) == null ? void 0 : _b.substring(0, 30));
      });
      answer = `Found ${resultsArray.length} form field(s): ${fields.join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.text, page: r.page, bbox: r.bbox }));
    }
    if (type === BlockTypes.SIGNATURE) {
      answer = `Found ${resultsArray.length} signature(s) in the document.`;
      evidence = resultsArray.map((r) => ({ text: r.text, page: r.page, bbox: r.bbox }));
    }
    if (type === "text-search") {
      answer = `Found ${resultsArray.length} text match(es) for "${query}".`;
      evidence = resultsArray.map((r) => ({ text: (r.text || "").substring(0, 50), page: r.page, bbox: r.bbox }));
      confidence = 0.7;
    }
    if (!answer) {
      answer = `Found ${resultsArray.length} result(s) for "${label}".`;
    }
    return { answer, confidence, evidence };
  }
  function formatSummaryAnswer(summary) {
    var _a, _b, _c, _d, _e, _f, _g;
    let answer = `Document Summary:
`;
    answer += `- ${((_a = summary.blockTypes) == null ? void 0 : _a[BlockTypes.HEADING]) || 0} headings
`;
    answer += `- ${((_b = summary.blockTypes) == null ? void 0 : _b[BlockTypes.PARAGRAPH]) || 0} paragraphs
`;
    answer += `- ${summary.tableCount || 0} tables
`;
    answer += `- ${((_c = summary.entityTypes) == null ? void 0 : _c[EntityTypes.DATE]) || 0} dates
`;
    answer += `- ${((_d = summary.entityTypes) == null ? void 0 : _d[EntityTypes.CURRENCY]) || 0} monetary values
`;
    answer += `- ${((_e = summary.entityTypes) == null ? void 0 : _e[EntityTypes.PERSON]) || 0} people
`;
    answer += `- ${((_f = summary.entityTypes) == null ? void 0 : _f[EntityTypes.PHONE]) || 0} phone numbers
`;
    answer += `- ${((_g = summary.entityTypes) == null ? void 0 : _g[EntityTypes.EMAIL]) || 0} emails
`;
    return answer;
  }
  function highlightResults(canvas, results, options = {}) {
    const ctx = canvas.getContext("2d");
    const color = options.color || "rgba(255, 255, 0, 0.3)";
    const borderColor = options.borderColor || "rgba(255, 165, 0, 0.8)";
    const scale = options.scale || 1;
    for (const result of results) {
      if (!result.bbox) continue;
      const [x, y, w, h] = result.bbox;
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(x * scale, y * scale, w * scale, h * scale);
    }
  }
  function createHighlightAnnotations(results, options = {}) {
    const color = options.color || [1, 1, 0];
    return results.filter((r) => r.bbox).map((r) => ({
      type: "Highlight",
      rect: r.bbox,
      color,
      contents: r.text || r.value || "",
      page: r.page
    }));
  }

  // packages/core/src/rag.js
  async function extractImages(page, options = {}) {
    var _a;
    const {
      format = "png",
      quality = 0.92,
      scale = 1,
      extractThumbnails = true,
      thumbnailSize = 150
    } = options;
    const images = [];
    try {
      const opList = await page.getOperatorList();
      const pageNumber = page.pageNumber;
      let currentImage = null;
      let imageIndex = 0;
      for (let i = 0; i < opList.fnArray.length; i++) {
        const fn = opList.fnArray[i];
        const args = opList.argsArray[i];
        const OPS = {
          paintImageXObject: 85,
          paintJpegXObject: 86,
          paintImageXObjectRepeat: 88,
          paintImageMaskXObject: 89
        };
        if (fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject) {
          const imgName = args[0];
          try {
            if (typeof ((_a = page.objs) == null ? void 0 : _a.has) === "function" && !page.objs.has(imgName)) {
              continue;
            }
            const imgData = await new Promise((resolve, reject) => {
              let settled = false;
              const timer = setTimeout(() => {
                if (!settled) {
                  settled = true;
                  reject(new Error(`Image ${imgName} timed out`));
                }
              }, 5e3);
              try {
                page.objs.get(imgName, (data) => {
                  if (settled) return;
                  settled = true;
                  clearTimeout(timer);
                  if (data) resolve(data);
                  else reject(new Error(`Image ${imgName} not found`));
                });
              } catch (cbErr) {
                if (!settled) {
                  settled = true;
                  clearTimeout(timer);
                  reject(cbErr);
                }
              }
            });
            if (imgData && imgData.width && imgData.height) {
              const canvas = document.createElement("canvas");
              canvas.width = imgData.width * scale;
              canvas.height = imgData.height * scale;
              const ctx = canvas.getContext("2d");
              if (imgData.bitmap) {
                ctx.drawImage(imgData.bitmap, 0, 0, canvas.width, canvas.height);
              } else if (imgData.data) {
                const imageData = new ImageData(
                  new Uint8ClampedArray(imgData.data.buffer || imgData.data),
                  imgData.width,
                  imgData.height
                );
                ctx.putImageData(imageData, 0, 0);
              }
              const bbox = args.length > 1 ? args[1] : null;
              const image = {
                id: `page_${pageNumber}_img_${imageIndex}`,
                name: imgName,
                pageNumber,
                width: canvas.width,
                height: canvas.height,
                originalWidth: imgData.width,
                originalHeight: imgData.height,
                bbox: bbox ? {
                  x: bbox[4] || 0,
                  y: bbox[5] || 0,
                  width: bbox[0] || canvas.width,
                  height: bbox[3] || canvas.height
                } : null,
                format,
                dataUrl: canvas.toDataURL(`image/${format}`, quality),
                arrayBuffer: await new Promise((resolve) => {
                  if (canvas.convertToBlob) {
                    canvas.convertToBlob({ type: `image/${format}`, quality }).then((blob) => resolve(blob.arrayBuffer())).catch(() => resolve(null));
                  } else {
                    canvas.toBlob((blob) => {
                      resolve(blob ? blob.arrayBuffer() : null);
                    }, `image/${format}`, quality);
                  }
                })
              };
              if (extractThumbnails) {
                const thumbCanvas = document.createElement("canvas");
                const aspectRatio = imgData.width / imgData.height;
                thumbCanvas.width = thumbnailSize;
                thumbCanvas.height = thumbnailSize / aspectRatio;
                const thumbCtx = thumbCanvas.getContext("2d");
                thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
                image.thumbnail = {
                  dataUrl: thumbCanvas.toDataURL(`image/${format}`, quality),
                  width: thumbCanvas.width,
                  height: thumbCanvas.height
                };
              }
              images.push(image);
              imageIndex++;
            }
          } catch (e) {
            console.warn(`[codbdocs] Could not extract image ${imgName}:`, e.message);
          }
        }
      }
    } catch (e) {
      console.warn("[codbdocs] Image extraction failed:", e.message);
    }
    return images;
  }
  async function extractAllImages(pdf, options = {}) {
    const allImages = [];
    for (let num2 = 1; num2 <= pdf.numPages; num2++) {
      const page = await pdf.getPage(num2);
      const pageImages = await extractImages(page, options);
      allImages.push(...pageImages);
    }
    return allImages;
  }
  var ChunkStrategies = {
    FIXED: "fixed",
    SEMANTIC: "semantic",
    PAGE: "page",
    SECTION: "section",
    TABLE: "table",
    HYBRID: "hybrid"
  };
  function fixedChunking(text, options = {}) {
    const {
      chunkSize = 1e3,
      chunkOverlap = 200,
      separators = ["\n\n", "\n", ". ", " "]
    } = options;
    const chunks = [];
    let start = 0;
    while (start < text.length) {
      let end = Math.min(start + chunkSize, text.length);
      if (end < text.length) {
        for (const sep of separators) {
          const lastSep = text.lastIndexOf(sep, end);
          if (lastSep > start + chunkSize * 0.5) {
            end = lastSep + sep.length;
            break;
          }
        }
      }
      chunks.push({
        text: text.slice(start, end).trim(),
        start,
        end,
        index: chunks.length
      });
      start = end - chunkOverlap;
      if (start >= text.length) break;
    }
    return chunks;
  }
  function semanticChunking(text, options = {}) {
    const {
      minChunkSize = 100,
      maxChunkSize = 2e3
    } = options;
    const chunks = [];
    const paragraphs = text.split(/\n\s*\n/);
    let currentChunk = "";
    let currentStart = 0;
    let position = 0;
    for (const para of paragraphs) {
      if (currentChunk.length + para.length > maxChunkSize && currentChunk.length >= minChunkSize) {
        chunks.push({
          text: currentChunk.trim(),
          start: currentStart,
          end: position,
          index: chunks.length,
          type: "paragraph"
        });
        currentChunk = "";
        currentStart = position;
      }
      currentChunk += (currentChunk ? "\n\n" : "") + para;
      position += para.length + 2;
    }
    if (currentChunk.trim()) {
      chunks.push({
        text: currentChunk.trim(),
        start: currentStart,
        end: position,
        index: chunks.length,
        type: "paragraph"
      });
    }
    return chunks;
  }
  function sectionChunking(text, sections = [], options = {}) {
    const {
      minChunkSize = 100,
      maxChunkSize = 3e3
    } = options;
    if (!sections || sections.length === 0) {
      return semanticChunking(text, options);
    }
    const chunks = [];
    let lastEnd = 0;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const start = section.position || 0;
      const end = i + 1 < sections.length ? sections[i + 1].position || text.length : text.length;
      const sectionText = text.slice(start, end).trim();
      if (sectionText.length > maxChunkSize) {
        const subChunks = fixedChunking(sectionText, { chunkSize: maxChunkSize, chunkOverlap: 200 });
        for (const sub of subChunks) {
          chunks.push({
            text: sub.text,
            start: start + sub.start,
            end: start + sub.end,
            index: chunks.length,
            type: "section",
            heading: section.text,
            headingLevel: section.level || 1
          });
        }
      } else if (sectionText.length >= minChunkSize) {
        chunks.push({
          text: sectionText,
          start,
          end,
          index: chunks.length,
          type: "section",
          heading: section.text,
          headingLevel: section.level || 1
        });
      }
      lastEnd = end;
    }
    return chunks;
  }
  function tableChunking(text, tables = [], options = {}) {
    const {
      minChunkSize = 100,
      maxChunkSize = 2e3
    } = options;
    const chunks = [];
    let lastEnd = 0;
    const sortedTables = [...tables].sort((a, b) => (a.position || 0) - (b.position || 0));
    for (const table of sortedTables) {
      const tableStart = table.position || 0;
      const tableEnd = tableStart + (table.length || 0);
      if (tableStart > lastEnd) {
        const beforeText = text.slice(lastEnd, tableStart).trim();
        if (beforeText.length >= minChunkSize) {
          chunks.push({
            text: beforeText,
            start: lastEnd,
            end: tableStart,
            index: chunks.length,
            type: "text"
          });
        }
      }
      const tableText = text.slice(tableStart, tableEnd).trim();
      if (tableText.length >= minChunkSize) {
        chunks.push({
          text: tableText,
          start: tableStart,
          end: tableEnd,
          index: chunks.length,
          type: "table",
          tableData: table
        });
      }
      lastEnd = tableEnd;
    }
    if (lastEnd < text.length) {
      const remainingText = text.slice(lastEnd).trim();
      if (remainingText.length >= minChunkSize) {
        chunks.push({
          text: remainingText,
          start: lastEnd,
          end: text.length,
          index: chunks.length,
          type: "text"
        });
      }
    }
    return chunks;
  }
  function createChunks(graph, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const {
      strategy = ChunkStrategies.SEMANTIC,
      chunkSize = 1e3,
      chunkOverlap = 200,
      minChunkSize = 100,
      maxChunkSize = 3e3,
      includeMetadata = true,
      includeBoundingBoxes = true
    } = options;
    const chunks = [];
    const summary = graph.getSummary();
    const headings = ((_a = graph.layout) == null ? void 0 : _a.getAllHeadings()) || [];
    const tables = ((_b = graph.structure) == null ? void 0 : _b.getTables()) || [];
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const pageText = ((_c = graph.text) == null ? void 0 : _c.getPageText(pageNum)) || "";
      const pageClassification = ((_d = graph.classifications) == null ? void 0 : _d[pageNum - 1]) || null;
      const pageHeadings = ((_e = graph.layout) == null ? void 0 : _e.getHeadings(pageNum)) || [];
      const pageTables = ((_f = graph.structure) == null ? void 0 : _f.getTables(pageNum)) || [];
      const pageForms = ((_g = graph.structure) == null ? void 0 : _g.getForms(pageNum)) || [];
      const pageLists = ((_h = graph.structure) == null ? void 0 : _h.getLists(pageNum)) || [];
      const pageMetadata = {
        dates: ((_i = graph.metadata) == null ? void 0 : _i.getDates(pageNum)) || [],
        phones: ((_j = graph.metadata) == null ? void 0 : _j.getPhones(pageNum)) || [],
        emails: ((_k = graph.metadata) == null ? void 0 : _k.getEmails(pageNum)) || [],
        addresses: ((_l = graph.metadata) == null ? void 0 : _l.getAddresses(pageNum)) || [],
        amounts: ((_m = graph.metadata) == null ? void 0 : _m.getAmounts(pageNum)) || []
      };
      const contentBlocks = ((_o = (_n = graph._contentGraph) == null ? void 0 : _n.blocks) == null ? void 0 : _o.filter((b) => b.page === pageNum)) || [];
      const contentEntities = ((_q = (_p = graph._contentGraph) == null ? void 0 : _p.entities) == null ? void 0 : _q.filter((e) => e.page === pageNum)) || [];
      let pageChunks = [];
      switch (strategy) {
        case ChunkStrategies.FIXED:
          pageChunks = fixedChunking(pageText, { chunkSize, chunkOverlap });
          break;
        case ChunkStrategies.SEMANTIC:
          pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
          break;
        case ChunkStrategies.PAGE:
          pageChunks = [{
            text: pageText,
            start: 0,
            end: pageText.length,
            index: 0,
            type: "page"
          }];
          break;
        case ChunkStrategies.SECTION:
          pageChunks = sectionChunking(pageText, pageHeadings, { minChunkSize, maxChunkSize });
          break;
        case ChunkStrategies.TABLE:
          pageChunks = tableChunking(pageText, pageTables, { minChunkSize, maxChunkSize });
          break;
        case ChunkStrategies.HYBRID:
          pageChunks = tableChunking(pageText, pageTables, { minChunkSize, maxChunkSize });
          if (pageChunks.length === 0) {
            pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
          }
          break;
        default:
          pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
      }
      for (const chunk of pageChunks) {
        const enrichedChunk = {
          ...chunk,
          id: `page_${pageNum}_chunk_${chunk.index}`,
          pageNumber: pageNum,
          source: "codbdocs"
        };
        if (includeMetadata) {
          enrichedChunk.metadata = {
            pageNumber: pageNum,
            pageCount: summary.pageCount,
            classification: pageClassification,
            documentType: ((_r = graph.getDocumentType) == null ? void 0 : _r.call(graph)) || null,
            headings: pageHeadings.map((h) => h.text),
            hasTables: pageTables.length > 0,
            hasForms: pageForms.length > 0,
            hasLists: pageLists.length > 0,
            entityTypes: [...new Set(contentEntities.map((e) => e.type))],
            contentBlockTypes: [...new Set(contentBlocks.map((b) => b.type))]
          };
          enrichedChunk.metadata.relevantEntities = contentEntities.filter((e) => {
            const ePos = e.position || 0;
            return ePos >= chunk.start && ePos < chunk.end;
          });
        }
        if (includeBoundingBoxes) {
          enrichedChunk.boundingBoxes = contentBlocks.filter((b) => b.start >= chunk.start && b.start < chunk.end).map((b) => b.bbox).filter(Boolean);
        }
        chunks.push(enrichedChunk);
      }
    }
    chunks.forEach((chunk, i) => {
      chunk.index = i;
    });
    return chunks;
  }
  function buildCrossPageContext(graph) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const context = {
      documentType: ((_a = graph.getDocumentType) == null ? void 0 : _a.call(graph)) || null,
      globalEntities: [],
      entityRelationships: [],
      topicFlow: [],
      crossPageReferences: [],
      documentStructure: {
        sections: [],
        tables: [],
        forms: [],
        lists: []
      }
    };
    const summary = graph.getSummary();
    const entityMap = /* @__PURE__ */ new Map();
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const entities = ((_c = (_b = graph._contentGraph) == null ? void 0 : _b.entities) == null ? void 0 : _c.filter((e) => e.page === pageNum)) || [];
      for (const entity of entities) {
        const key = `${entity.type}:${(_d = entity.text) == null ? void 0 : _d.toLowerCase()}`;
        if (entityMap.has(key)) {
          entityMap.get(key).occurrences.push({
            page: pageNum,
            position: entity.position,
            bbox: entity.bbox
          });
        } else {
          entityMap.set(key, {
            type: entity.type,
            text: entity.text,
            occurrences: [{
              page: pageNum,
              position: entity.position,
              bbox: entity.bbox
            }]
          });
        }
      }
    }
    context.globalEntities = Array.from(entityMap.values());
    const pageEntityMap = /* @__PURE__ */ new Map();
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const entities = ((_f = (_e = graph._contentGraph) == null ? void 0 : _e.entities) == null ? void 0 : _f.filter((e) => e.page === pageNum)) || [];
      pageEntityMap.set(pageNum, entities.map((e) => {
        var _a2;
        return `${e.type}:${(_a2 = e.text) == null ? void 0 : _a2.toLowerCase()}`;
      }));
    }
    const relationshipMap = /* @__PURE__ */ new Map();
    for (const [pageNum, entities] of pageEntityMap) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
          const key = [entities[i], entities[j]].sort().join(" <-> ");
          if (relationshipMap.has(key)) {
            relationshipMap.get(key).pages.push(pageNum);
          } else {
            relationshipMap.set(key, {
              entities: [entities[i], entities[j]],
              pages: [pageNum],
              type: "co-occurrence"
            });
          }
        }
      }
    }
    context.entityRelationships = Array.from(relationshipMap.values()).filter((r) => r.pages.length > 1);
    const classifications = graph.classifications || [];
    let currentTopic = null;
    let topicStart = 1;
    for (let i = 0; i < classifications.length; i++) {
      const classification = classifications[i];
      const pageType = (classification == null ? void 0 : classification.type) || "unknown";
      if (pageType !== currentTopic) {
        if (currentTopic) {
          context.topicFlow.push({
            topic: currentTopic,
            startPage: topicStart,
            endPage: i,
            pageCount: i - topicStart + 1
          });
        }
        currentTopic = pageType;
        topicStart = i + 1;
      }
    }
    if (currentTopic) {
      context.topicFlow.push({
        topic: currentTopic,
        startPage: topicStart,
        endPage: classifications.length,
        pageCount: classifications.length - topicStart + 1
      });
    }
    const allHeadings = ((_g = graph.layout) == null ? void 0 : _g.getAllHeadings()) || [];
    context.documentStructure.sections = allHeadings.map((h, i) => ({
      ...h,
      index: i,
      nextPageHeading: i + 1 < allHeadings.length ? allHeadings[i + 1] : null
    }));
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const tables = ((_h = graph.structure) == null ? void 0 : _h.getTables(pageNum)) || [];
      const forms = ((_i = graph.structure) == null ? void 0 : _i.getForms(pageNum)) || [];
      const lists = ((_j = graph.structure) == null ? void 0 : _j.getLists(pageNum)) || [];
      context.documentStructure.tables.push(...tables.map((t) => ({ ...t, page: pageNum })));
      context.documentStructure.forms.push(...forms.map((f) => ({ ...f, page: pageNum })));
      context.documentStructure.lists.push(...lists.map((l) => ({ ...l, page: pageNum })));
    }
    const fullText = ((_l = (_k = graph.text) == null ? void 0 : _k.pages) == null ? void 0 : _l.map((p) => p.text).join(" ")) || "";
    const crossPagePatterns = [
      /(?:continued|cont)\.?\s+(?:on\s+)?page\s+(\d+)/gi,
      /(?:see|refer\s+to)\s+page\s+(\d+)/gi,
      /page\s+(\d+)\s+(?:for|to\s+see)/gi
    ];
    for (const pattern of crossPagePatterns) {
      let match;
      while ((match = pattern.exec(fullText)) !== null) {
        const referencedPage = parseInt(match[1]);
        if (referencedPage > 0 && referencedPage <= summary.pageCount) {
          context.crossPageReferences.push({
            text: match[0],
            fromPage: Math.ceil(match.index / fullText.length * summary.pageCount),
            toPage: referencedPage,
            type: "reference"
          });
        }
      }
    }
    return context;
  }
  function createRAGOutput(graph, options = {}) {
    var _a, _b, _c, _d, _e, _f;
    const {
      chunkStrategy = ChunkStrategies.SEMANTIC,
      chunkSize = 1e3,
      chunkOverlap = 200,
      includeImages = false,
      includeVectors = false,
      includeMetadata = true,
      includeBoundingBoxes = true,
      includeCrossPageContext = true,
      embeddingProvider = null
    } = options;
    const summary = graph.getSummary();
    const documentType = ((_a = graph.getDocumentType) == null ? void 0 : _a.call(graph)) || null;
    const chunks = createChunks(graph, {
      strategy: chunkStrategy,
      chunkSize,
      chunkOverlap,
      includeMetadata,
      includeBoundingBoxes
    });
    const context = includeCrossPageContext ? buildCrossPageContext(graph) : null;
    const ragOutput = {
      // Document metadata
      document: {
        type: (documentType == null ? void 0 : documentType.type) || "unknown",
        confidence: (documentType == null ? void 0 : documentType.confidence) || 0,
        pageCount: summary.pageCount,
        wordCount: summary.wordCount,
        headings: summary.headings,
        metadata: summary.metadata
      },
      // Content chunks for vector DB
      chunks: chunks.map((chunk) => ({
        id: chunk.id,
        text: chunk.text,
        metadata: chunk.metadata || {},
        bbox: chunk.boundingBoxes || [],
        pageNumber: chunk.pageNumber,
        chunkIndex: chunk.index,
        chunkType: chunk.type
      })),
      // Global entities
      entities: (context == null ? void 0 : context.globalEntities) || [],
      // Entity relationships
      relationships: (context == null ? void 0 : context.entityRelationships) || [],
      // Document structure
      structure: {
        headings: summary.headings,
        tables: summary.tableCount,
        forms: summary.formCount,
        lists: summary.listCount
      },
      // Topic flow
      topicFlow: (context == null ? void 0 : context.topicFlow) || [],
      // Cross-page references
      crossPageReferences: (context == null ? void 0 : context.crossPageReferences) || [],
      // Full text for context
      fullText: ((_c = (_b = graph.text) == null ? void 0 : _b.pages) == null ? void 0 : _c.map((p) => p.text).join("\n\n")) || "",
      // Page-by-page text
      pages: ((_e = (_d = graph.text) == null ? void 0 : _d.pages) == null ? void 0 : _e.map((p) => {
        var _a2;
        return {
          pageNumber: p.pageNum,
          text: p.text,
          source: p.source,
          classification: ((_a2 = graph.classifications) == null ? void 0 : _a2[p.pageNum - 1]) || null
        };
      })) || []
    };
    if (includeImages) {
      ragOutput.images = graph._images || [];
    }
    if (includeVectors) {
      ragOutput.vectors = [];
      for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
        const pageVectors = ((_f = graph.getVectors) == null ? void 0 : _f.call(graph, pageNum)) || [];
        ragOutput.vectors.push(...pageVectors.map((v) => ({
          ...v,
          pageNumber: pageNum
        })));
      }
    }
    if (embeddingProvider) {
      ragOutput.embeddings = {
        provider: embeddingProvider.name,
        model: embeddingProvider.model,
        dimensions: embeddingProvider.dimensions,
        chunks: chunks.map((chunk) => ({
          id: chunk.id,
          text: chunk.text
          // Embedding will be added by the provider
        }))
      };
    }
    return ragOutput;
  }
  var EmbeddingProvider = class {
    constructor(name, model, dimensions) {
      this.name = name;
      this.model = model;
      this.dimensions = dimensions;
    }
    async embed(texts) {
      throw new Error("embed() must be implemented by subclass");
    }
    async embedQuery(text) {
      const results = await this.embed([text]);
      return results[0];
    }
  };
  var OpenAIEmbeddingProvider = class extends EmbeddingProvider {
    constructor(apiKey, options = {}) {
      super("openai", options.model || "text-embedding-3-small", options.dimensions || 1536);
      this.apiKey = apiKey;
      this.baseUrl = options.baseUrl || "https://api.openai.com/v1";
    }
    async embed(texts) {
      const response = await fetch(`${this.baseUrl}/embeddings`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: this.model,
          input: texts
        })
      });
      if (!response.ok) {
        throw new Error(`Embedding failed: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data.map((d) => d.embedding);
    }
  };
  var LocalEmbeddingProvider = class extends EmbeddingProvider {
    constructor(options = {}) {
      super("local", options.model || "transformers.js", options.dimensions || 384);
      this.model = null;
      this.ready = false;
    }
    async initialize() {
      this.ready = true;
    }
    async embed(texts) {
      if (!this.ready) {
        await this.initialize();
      }
      return texts.map((text) => {
        const embedding = new Array(this.dimensions).fill(0);
        for (let i = 0; i < text.length; i++) {
          const charCode = text.charCodeAt(i);
          embedding[i % this.dimensions] += charCode;
          embedding[(i * 7 + 13) % this.dimensions] ^= charCode;
        }
        const norm = Math.sqrt(embedding.reduce((sum, x) => sum + x * x, 0));
        return embedding.map((x) => x / (norm || 1));
      });
    }
  };
  var CustomEmbeddingProvider = class extends EmbeddingProvider {
    constructor(name, embedFn, options = {}) {
      super(name, options.model || "custom", options.dimensions || 1536);
      this.embedFn = embedFn;
    }
    async embed(texts) {
      return this.embedFn(texts);
    }
  };
  async function createRAGOutputWithEmbeddings(graph, embeddingProvider, options = {}) {
    const ragOutput = createRAGOutput(graph, {
      ...options,
      embeddingProvider
    });
    const texts = ragOutput.chunks.map((c) => c.text);
    const embeddings = await embeddingProvider.embed(texts);
    ragOutput.chunks = ragOutput.chunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i]
    }));
    return ragOutput;
  }
  function exportAsJSONL(ragOutput) {
    return ragOutput.chunks.map((chunk) => JSON.stringify({
      id: chunk.id,
      text: chunk.text,
      metadata: chunk.metadata,
      embedding: chunk.embedding || null
    })).join("\n");
  }
  function exportAsCSV(ragOutput) {
    const headers = ["id", "text", "pageNumber", "chunkType", "embedding"];
    const rows = ragOutput.chunks.map((chunk) => [
      chunk.id,
      `"${chunk.text.replace(/"/g, '""')}"`,
      chunk.pageNumber,
      chunk.chunkType,
      chunk.embedding ? `"${chunk.embedding.join(",")}"` : ""
    ]);
    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  }

  // packages/core/src/workers.js
  var HAS_OFFSCREEN = typeof OffscreenCanvas !== "undefined";
  var HAS_WORKERS = typeof Worker !== "undefined";
  function canUseWorkers() {
    return HAS_OFFSCREEN && HAS_WORKERS;
  }

  // packages/core/src/exporters.js
  function mdEscape(text) {
    return String(text || "").replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/^([#>*+\-]|\d+\.)\s*/gm, "\\$&");
  }
  function buildRAGContext(ir, contentGraph) {
    var _a, _b, _c, _d, _e, _f;
    const pages = (ir.document.pages || []).map((pageId) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m;
      const page = ir.pages[pageId];
      if (!page) return null;
      const blocks = [];
      const objects = (page.content || []).map((id) => ir.objects[id]).filter(Boolean);
      for (const obj of objects) {
        if (obj.type === "text" && ((_a2 = obj.semantic) == null ? void 0 : _a2.text)) {
          blocks.push({
            type: obj.semantic.role || "text",
            text: obj.semantic.text,
            bbox: obj.bbox || null,
            fontSize: ((_b2 = obj.raw) == null ? void 0 : _b2.fontSize) || null,
            font: ((_c2 = obj.raw) == null ? void 0 : _c2.font) || null,
            color: ((_d2 = obj.raw) == null ? void 0 : _d2.color) || null
          });
        } else if (obj.type === "image") {
          blocks.push({
            type: "image",
            alt: ((_e2 = obj.accessibility) == null ? void 0 : _e2.alt) || ((_f2 = obj.semantic) == null ? void 0 : _f2.caption) || "",
            caption: ((_g = obj.semantic) == null ? void 0 : _g.caption) || "",
            bbox: obj.bbox || null,
            width: ((_h = obj.raw) == null ? void 0 : _h.width) || null,
            height: ((_i = obj.raw) == null ? void 0 : _i.height) || null
          });
        } else if (obj.type === "link") {
          blocks.push({
            type: "link",
            text: ((_j = obj.semantic) == null ? void 0 : _j.text) || "",
            url: ((_k = obj.raw) == null ? void 0 : _k.url) || null,
            dest: ((_l = obj.raw) == null ? void 0 : _l.dest) || null,
            bbox: obj.bbox || null
          });
        }
      }
      const text = objects.filter((o) => {
        var _a3;
        return o.type === "text" && ((_a3 = o.semantic) == null ? void 0 : _a3.text);
      }).map((o) => o.semantic.text).join(" ");
      const pageEntities = contentGraph ? ((_m = (contentGraph.pages || []).find((pg) => pg.page === page.num)) == null ? void 0 : _m.entities) || [] : [];
      return {
        page: page.num,
        size: { width: page.width, height: page.height },
        text,
        blocks,
        entities: pageEntities
      };
    }).filter(Boolean);
    const entityTypes = {};
    const blockTypes = {};
    const content = contentGraph || {};
    (content.allBlocks || []).forEach((b) => {
      blockTypes[b.type] = (blockTypes[b.type] || 0) + 1;
    });
    (content.allEntities || []).forEach((e) => {
      entityTypes[e.type] = (entityTypes[e.type] || 0) + 1;
    });
    return {
      format: "codbdocs-rag-v2",
      source: ((_a = ir.document.metadata) == null ? void 0 : _a.title) || "PDF document",
      title: ((_b = ir.document.metadata) == null ? void 0 : _b.title) || null,
      author: ((_c = ir.document.metadata) == null ? void 0 : _c.author) || null,
      createdAt: ((_d = ir.document.metadata) == null ? void 0 : _d.creationDate) || ((_e = ir.document.metadata) == null ? void 0 : _e.modDate) || null,
      documentType: content.documentType || ir.document.type || null,
      pageCount: (ir.document.pages || []).length,
      pages,
      fullText: pages.map((p) => `[Page ${p.page}]
${p.text}`).join("\n\n"),
      blockTypes,
      entityTypes,
      tables: content.allTables ? content.allTables.map((t) => t.toJSON ? t.toJSON() : t) : [],
      relationships: content.allRelationships || [],
      metadata: ir.document.metadata || {},
      security: ir.document.security ? summarizeSecurity(ir.document.security) : null,
      outline: ((_f = ir.document.navigation) == null ? void 0 : _f.outline) || []
    };
  }
  function summarizeSecurity(security) {
    if (!security) return null;
    const out = {};
    for (const [k, v] of Object.entries(security)) {
      if (typeof v === "boolean" || typeof v === "string" || typeof v === "number") {
        out[k] = v;
      }
    }
    return out;
  }
  function flowLines(objects, { lineTolerance = 1 } = {}) {
    const texts = objects.filter((o) => {
      var _a;
      return o && o.type === "text" && ((_a = o.semantic) == null ? void 0 : _a.text);
    }).map((o) => {
      const b = o.bbox || [0, 0, 0, 0];
      return { o, x: b[0], y: b[1], w: b[2], h: b[3] || 0, cy: b[1] + (b[3] || 0) / 2 };
    });
    if (!texts.length) return [];
    const medianH = texts.map((t) => t.h).sort((a, b) => a - b)[Math.floor(texts.length / 2)] || 1;
    const tol = Math.max(2, medianH * 0.45 * lineTolerance);
    const lines = [];
    const sortedByY = [...texts].sort((a, b) => b.cy - a.cy);
    for (const t of sortedByY) {
      let placed = null;
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        const lineY = line.reduce((s, x) => s + x.cy, 0) / line.length;
        if (Math.abs(t.cy - lineY) <= tol) {
          placed = line;
          break;
        }
      }
      if (placed) placed.push(t);
      else lines.push([t]);
    }
    const lineTexts = lines.map((line) => line.sort((a, b) => a.x - b.x).map((t) => String(t.o.semantic.text).replace(/\s+/g, " ").trim()).filter(Boolean).join(" ").replace(/\s+/g, " ")).filter((t) => t.length);
    const paragraphs = [];
    for (const lt of lineTexts) paragraphs.push([lt]);
    return paragraphs;
  }
  function toMarkdown(ir, contentGraph) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const out = [];
    const title = ((_a = ir.document.metadata) == null ? void 0 : _a.title) || "Document";
    const author = ((_b = ir.document.metadata) == null ? void 0 : _b.author) || "";
    out.push(`# ${title}`);
    if (author) out.push(`
_By ${author}_`);
    out.push("");
    for (const pageId of ir.document.pages || []) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const objects = (page.content || []).map((id) => ir.objects[id]).filter(Boolean).sort(byReadingOrder);
      let inTable = false;
      let pending = [];
      const flush = () => {
        if (pending.length) {
          for (const par of flowLines(pending)) {
            out.push(mdEscape(par.join(" ")));
            out.push("");
          }
          pending = [];
        }
      };
      for (const obj of objects) {
        const role = ((_c = obj.semantic) == null ? void 0 : _c.role) || "text";
        if (obj.type === "text" && ((_d = obj.semantic) == null ? void 0 : _d.text)) {
          const text = String(obj.semantic.text).replace(/\s+/g, " ").trim();
          if (!text) continue;
          switch (role) {
            case "heading": {
              flush();
              const level = Math.min(6, Math.max(2, obj.semantic.level || 2));
              out.push(`${"#".repeat(level)} ${mdEscape(text)}`);
              out.push("");
              break;
            }
            case "list":
            // fall through: handled as plain text since list grouping is in content graph
            default:
              pending.push(obj);
              break;
          }
        } else if (obj.type === "image") {
          flush();
          const alt = ((_e = obj.accessibility) == null ? void 0 : _e.alt) || ((_f = obj.semantic) == null ? void 0 : _f.caption) || "Image";
          out.push(`![${mdEscape(alt)}](${((_g = obj.raw) == null ? void 0 : _g.src) ? "" : ""})`);
          if ((_h = obj.semantic) == null ? void 0 : _h.caption) {
            out.push(`*${mdEscape(obj.semantic.caption)}*`);
          }
          out.push("");
        } else if (obj.type === "link") {
          flush();
          const text = ((_i = obj.semantic) == null ? void 0 : _i.text) || ((_j = obj.raw) == null ? void 0 : _j.url) || "link";
          const href = ((_k = obj.raw) == null ? void 0 : _k.url) || ((_l = obj.raw) == null ? void 0 : _l.href) || "#";
          out.push(`[${mdEscape(text)}](${href})`);
          out.push("");
        } else if (role === "separator") {
          flush();
          out.push("---");
          out.push("");
        }
      }
      flush();
    }
    return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }
  function toReflowedText(ir) {
    const pages = (ir.document.pages || []).map((pageId) => {
      const page = ir.pages[pageId];
      if (!page) return null;
      const objs = (page.content || []).map((id) => ir.objects[id]).filter((o) => {
        var _a, _b;
        return o && (o.type === "text" || o.type === "link") && (((_a = o.semantic) == null ? void 0 : _a.text) || ((_b = o.raw) == null ? void 0 : _b.url));
      });
      const paragraphs = flowLines(objs).map((par) => par.join(" "));
      return { page: page.num, text: paragraphs.join("\n\n") };
    }).filter(Boolean);
    return {
      pageCount: pages.length,
      pages,
      fullText: pages.map((p) => `--- page ${p.page} ---
${p.text}`).join("\n\n")
    };
  }
  function toFullJSON(ir, contentGraph) {
    var _a, _b, _c, _d;
    const pages = (ir.document.pages || []).map((pageId) => {
      const page = ir.pages[pageId];
      if (!page) return null;
      return {
        id: pageId,
        page: page.num,
        size: { width: page.width, height: page.height },
        rotation: page.rotation || 0,
        mediaBox: page.mediaBox || null,
        cropBox: page.cropBox || null,
        labels: page.labels || null,
        background: page.background || null,
        textObjects: (page.content || []).map((id) => ir.objects[id]).filter((o) => o && o.type === "text").map((o) => {
          var _a2, _b2, _c2, _d2, _e, _f, _g;
          return {
            id: o.id,
            text: ((_a2 = o.semantic) == null ? void 0 : _a2.text) || "",
            role: ((_b2 = o.semantic) == null ? void 0 : _b2.role) || "text",
            level: ((_c2 = o.semantic) == null ? void 0 : _c2.level) || null,
            bbox: o.bbox || null,
            font: ((_d2 = o.raw) == null ? void 0 : _d2.font) || null,
            fontSize: ((_e = o.raw) == null ? void 0 : _e.fontSize) || null,
            color: ((_f = o.raw) == null ? void 0 : _f.color) || null,
            transform: ((_g = o.raw) == null ? void 0 : _g.transform) || null
          };
        }),
        images: (page.content || []).map((id) => ir.objects[id]).filter((o) => o && o.type === "image").map((o) => {
          var _a2, _b2, _c2, _d2, _e;
          return {
            id: o.id,
            bbox: o.bbox || null,
            width: ((_a2 = o.raw) == null ? void 0 : _a2.width) || null,
            height: ((_b2 = o.raw) == null ? void 0 : _b2.height) || null,
            alt: ((_c2 = o.accessibility) == null ? void 0 : _c2.alt) || "",
            caption: ((_d2 = o.semantic) == null ? void 0 : _d2.caption) || "",
            src: ((_e = o.raw) == null ? void 0 : _e.src) || null
          };
        }),
        links: (page.content || []).map((id) => ir.objects[id]).filter((o) => o && o.type === "link").map((o) => {
          var _a2, _b2, _c2;
          return {
            id: o.id,
            bbox: o.bbox || null,
            text: ((_a2 = o.semantic) == null ? void 0 : _a2.text) || "",
            url: ((_b2 = o.raw) == null ? void 0 : _b2.url) || null,
            dest: ((_c2 = o.raw) == null ? void 0 : _c2.dest) || null
          };
        }),
        vectors: (page.vectors || []).map((id) => ir.vectors[id]).filter(Boolean),
        annotations: page.annotations || [],
        markedContent: page.markedContent || [],
        artifacts: page.artifacts || []
      };
    }).filter(Boolean);
    const payload = {
      format: "codbdocs-full-json",
      version: ir.version || "1.0",
      document: {
        id: ir.document.id || null,
        title: ((_a = ir.document.metadata) == null ? void 0 : _a.title) || null,
        author: ((_b = ir.document.metadata) == null ? void 0 : _b.author) || null,
        type: (contentGraph == null ? void 0 : contentGraph.documentType) || ir.document.type || null,
        metadata: ir.document.metadata || {},
        security: ir.document.security || {},
        outline: ((_c = ir.document.navigation) == null ? void 0 : _c.outline) || [],
        labels: ((_d = ir.document.navigation) == null ? void 0 : _d.labels) || []
      },
      pageCount: pages.length,
      pages
    };
    if (contentGraph) {
      payload.content = {
        documentType: contentGraph.documentType || null,
        blocks: contentGraph.allBlocks ? contentGraph.allBlocks.map((b) => b.toJSON ? b.toJSON() : b) : [],
        entities: contentGraph.allEntities || [],
        tables: contentGraph.allTables ? contentGraph.allTables.map((t) => t.toJSON ? t.toJSON() : t) : [],
        relationships: contentGraph.allRelationships || [],
        summary: contentGraph.getSummary ? contentGraph.getSummary() : null
      };
    }
    return payload;
  }
  function byReadingOrder(a, b) {
    var _a, _b, _c, _d;
    const ay = ((_a = a.bbox) == null ? void 0 : _a[1]) || 0;
    const by = ((_b = b.bbox) == null ? void 0 : _b[1]) || 0;
    if (Math.abs(ay - by) > 10) return by - ay;
    return (((_c = a.bbox) == null ? void 0 : _c[0]) || 0) - (((_d = b.bbox) == null ? void 0 : _d[0]) || 0);
  }

  // packages/core/src/viewer.js
  function generateViewerChrome(ragPayload) {
    const outline = ragPayload && ragPayload.outline || [];
    return {
      toolbar: viewerToolbarHTML(),
      sidebar: viewerSidebarHTML(outline),
      script: viewerScript(),
      styles: viewerStyles()
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
    <button type="button" class="codbdocs-btn" id="codbdocs-page-next" aria-label="Next page">\u203A</button>
    <div class="codbdocs-sep" aria-hidden="true"></div>
    <button type="button" class="codbdocs-btn" id="codbdocs-zoom-out" aria-label="Zoom out">\u2212</button>
    <button type="button" class="codbdocs-btn" id="codbdocs-zoom-fit" aria-label="Fit to width">Fit</button>
    <button type="button" class="codbdocs-btn" id="codbdocs-zoom-in" aria-label="Zoom in">+</button>
    <div class="codbdocs-sep" aria-hidden="true"></div>
    <button type="button" class="codbdocs-toggle" id="codbdocs-contrast" aria-pressed="false">High contrast</button>
    <button type="button" class="codbdocs-btn" id="codbdocs-outline-toggle" aria-expanded="true" aria-controls="codbdocs-outline">Outline</button>
    <button type="button" class="codbdocs-btn codbdocs-return-btn" id="codbdocs-return-referrer">Return</button>
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
    if (!Array.isArray(nodes) || nodes.length === 0) return "";
    const d = depth || 0;
    let html = '<ul class="codbdocs-outline-list">';
    for (const node of nodes) {
      const label = escapeHTML(node.title || "Untitled");
      const page = node.page || node.pageNum || 0;
      const dest = encodeURIComponent(node.title || "");
      html += `<li class="codbdocs-outline-item" style="padding-left:${d * 14}px"><a href="#codbdocs-search" class="codbdocs-outline-link" data-outline-dest="${dest}"
         data-outline-page="${page}">${label}</a></li>`;
      if (node.items && node.items.length) html += renderOutlineList(node.items, d + 1);
    }
    html += "</ul>";
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
    .codbdocs-return-btn { margin-left: auto; }
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

    var returnBtn = $('#codbdocs-return-referrer');
    if (returnBtn) returnBtn.addEventListener('click', function () {
      if (document.referrer) window.location.href = document.referrer;
      else window.history.back();
    });

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
      text = String(text || '').replace(/s+/g, ' ').trim();
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
  <\/script>
  `;
  }
  function escapeHTML(str) {
    return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // packages/core/src/pdfir.js
  function createIR() {
    return {
      version: "1.0",
      document: {
        id: generateId("doc"),
        hash: null,
        title: null,
        type: "unknown",
        metadata: {},
        pages: [],
        structure: null,
        resources: {},
        navigation: {},
        security: {},
        provenance: { source: "pdf", extraction: "native" }
      },
      pages: {},
      objects: {},
      entities: {},
      relationships: {},
      concepts: {},
      images: {},
      tables: {},
      forms: {},
      annotations: {},
      vectors: {},
      resources: {},
      structure: {},
      assets: {}
    };
  }
  function addPage(ir, pageNum, data) {
    const pageId = `page_${pageNum}`;
    ir.pages[pageId] = {
      id: pageId,
      num: pageNum,
      width: data.width || 0,
      height: data.height || 0,
      rotation: data.rotation || 0,
      mediaBox: data.mediaBox || null,
      cropBox: data.cropBox || null,
      content: [],
      vectors: [],
      images: [],
      annotations: [],
      forms: [],
      labels: data.labels || null
    };
    ir.document.pages.push(pageId);
    return ir.pages[pageId];
  }
  function addTextObject(ir, pageId, data) {
    var _a;
    const id = generateId("text");
    ir.objects[id] = {
      id,
      type: "text",
      page: pageId,
      raw: {
        glyphs: data.glyphs || [],
        font: data.font || null,
        fontSize: data.fontSize || 12,
        color: data.color || null,
        transform: data.transform || [1, 0, 0, 1, 0, 0],
        text: data.text || "",
        encoding: data.encoding || null
      },
      semantic: {
        role: data.role || "paragraph",
        level: data.level || null,
        text: data.text || ""
      },
      accessibility: {
        role: data.accessRole || "P"
      },
      provenance: {
        method: "native",
        confidence: 1
      },
      bbox: data.bbox || null
    };
    (_a = ir.pages[pageId]) == null ? void 0 : _a.content.push(id);
    return ir.objects[id];
  }
  function materializeOCRObject(ir, pageId, { text, source, confidence, pageSize } = {}) {
    const body = (text || "").replace(/\s+/g, " ").trim();
    if (!body) return null;
    const page = ir.pages[pageId];
    const hasTextObjects = ((page == null ? void 0 : page.content) || []).some((id) => {
      var _a;
      return ((_a = ir.objects[id]) == null ? void 0 : _a.type) === "text";
    });
    if (hasTextObjects) return null;
    const size = pageSize || { width: (page == null ? void 0 : page.width) || 0, height: (page == null ? void 0 : page.height) || 0 };
    const obj = addTextObject(ir, pageId, {
      text: body,
      bbox: [0, 0, size.width, size.height],
      font: null,
      fontSize: null,
      color: null,
      transform: null
    });
    if (obj) {
      obj.raw.source = source || "ocr";
      obj.raw.textSource = source || "ocr";
      obj.raw.confidence = confidence != null ? confidence : null;
      obj.provenance.method = source || "ocr";
      obj.provenance.confidence = confidence != null ? confidence / 100 : 0.5;
    }
    return obj;
  }
  function addVectorObject(ir, pageId, data) {
    var _a;
    const id = generateId("vec");
    ir.vectors[id] = {
      id,
      type: data.type || "path",
      // path, line, rect, circle, curve, arrow
      page: pageId,
      points: data.points || [],
      from: data.from || null,
      to: data.to || null,
      bbox: data.bbox || null,
      graphicsState: {
        stroke: data.stroke || null,
        fill: data.fill || null,
        lineWidth: data.lineWidth || 1,
        lineCap: data.lineCap || "butt",
        lineJoin: data.lineJoin || "miter",
        dash: data.dash || null,
        opacity: data.opacity || 1,
        blendMode: data.blendMode || "Normal",
        transform: data.transform || [1, 0, 0, 1, 0, 0],
        clip: data.clip || null
      },
      semantic: {
        role: data.semanticRole || null
        // table_border, checkbox, form_field, separator, decoration
      },
      provenance: {
        method: "native",
        confidence: 1
      }
    };
    (_a = ir.pages[pageId]) == null ? void 0 : _a.vectors.push(id);
    return ir.vectors[id];
  }
  function addObject(ir, pageId, data) {
    var _a;
    const id = generateId(data.type || "obj");
    ir.objects[id] = {
      id,
      type: data.type,
      page: pageId,
      raw: data.raw || {},
      semantic: data.semantic || {},
      accessibility: data.accessibility || {},
      provenance: data.provenance || { method: "native", confidence: 1 },
      bbox: data.bbox || null
    };
    (_a = ir.pages[pageId]) == null ? void 0 : _a.content.push(id);
    return ir.objects[id];
  }
  async function extractVectors(page) {
    const opList = await page.getOperatorList();
    const vectors = [];
    let currentTransform = [1, 0, 0, 1, 0, 0];
    let currentStroke = null;
    let currentFill = null;
    let currentLineWidth = 1;
    let currentLineCap = "butt";
    let currentLineJoin = "miter";
    let currentDash = null;
    let currentClip = null;
    let pathPoints = [];
    let pathStart = null;
    const FN = (pdfjsLib == null ? void 0 : pdfjsLib.OPS) || {};
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      const args = opList.argsArray[i];
      switch (fn) {
        // Transform
        case (FN.transform || 8):
          if (args && args.length >= 6) {
            currentTransform = args.slice(0, 6);
          }
          break;
        // Path operations
        case (FN.moveTo || 13):
          if (args) {
            pathStart = { x: args[0], y: args[1] };
            pathPoints.push({ op: "moveTo", x: args[0], y: args[1] });
          }
          break;
        case (FN.lineTo || 14):
          if (args) {
            pathPoints.push({ op: "lineTo", x: args[0], y: args[1] });
          }
          break;
        case (FN.curveTo || 15):
          if (args) {
            pathPoints.push({ op: "curveTo", x1: args[0], y1: args[1], x2: args[2], y2: args[3], x3: args[4], y3: args[5] });
          }
          break;
        case (FN.rectangle || 19):
          if (args && args.length >= 4) {
            vectors.push(createVector("rect", page, {
              bbox: [args[0], args[1], args[2] - args[0], args[3] - args[1]],
              stroke: currentStroke,
              fill: currentFill,
              lineWidth: currentLineWidth,
              transform: currentTransform
            }));
          }
          break;
        // Stroke
        case (FN.stroke || 20):
          if (pathPoints.length > 0) {
            vectors.push(createVector("path", page, {
              points: [...pathPoints],
              stroke: currentStroke,
              fill: null,
              lineWidth: currentLineWidth,
              lineCap: currentLineCap,
              lineJoin: currentLineJoin,
              dash: currentDash,
              transform: currentTransform
            }));
          }
          pathPoints = [];
          break;
        // Fill
        case (FN.fill || 21):
        case (FN.eoFill || 22):
          if (pathPoints.length > 0) {
            vectors.push(createVector("path", page, {
              points: [...pathPoints],
              stroke: null,
              fill: currentFill,
              lineWidth: currentLineWidth,
              transform: currentTransform
            }));
          }
          pathPoints = [];
          break;
        // Fill and stroke
        case (FN.fillStroke || 23):
        case (FN.eoFillStroke || 24):
          if (pathPoints.length > 0) {
            vectors.push(createVector("path", page, {
              points: [...pathPoints],
              stroke: currentStroke,
              fill: currentFill,
              lineWidth: currentLineWidth,
              transform: currentTransform
            }));
          }
          pathPoints = [];
          break;
        // Close path
        case (FN.closePath || 16):
          pathPoints.push({ op: "closePath" });
          break;
        // Graphics state
        case (FN.save || 25):
          break;
        case (FN.restore || 26):
          break;
        case (FN.setStrokeRGBColor || 43):
          if (args) currentStroke = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
          break;
        case (FN.setFillRGBColor || 44):
          if (args) currentFill = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
          break;
        case (FN.setLineWidth || 40):
          if (args) currentLineWidth = args[0];
          break;
        case (FN.setLineCap || 41):
          if (args) {
            const caps = ["butt", "round", "square"];
            currentLineCap = caps[args[0]] || "butt";
          }
          break;
        case (FN.setLineJoin || 42):
          if (args) {
            const joins = ["miter", "round", "bevel"];
            currentLineJoin = joins[args[0]] || "miter";
          }
          break;
        case (FN.setDash || 45):
          if (args) currentDash = args[0];
          break;
        // Clipping
        case (FN.clip || 28):
        case (FN.eoClip || 29):
          currentClip = [...pathPoints];
          break;
      }
    }
    return vectors;
  }
  function createVector(type, page, data) {
    return {
      type,
      ...data,
      semanticRole: classifyVector(type, data)
    };
  }
  function classifyVector(type, data) {
    if (type === "rect") {
      const [x, y, w, h] = data.bbox || [0, 0, 0, 0];
      const area = w * h;
      if (w > 8 && w < 20 && h > 8 && h < 20 && Math.abs(w - h) < 3) {
        return "checkbox";
      }
      if (h < 2 && w > 20) return "separator";
      if (data.stroke && data.fill === null && area > 100) {
        return "table_border";
      }
      return "border";
    }
    if (type === "path") {
      if (data.points.length === 2 && data.points[0].op === "moveTo" && data.points[1].op === "lineTo") {
        const dx = data.points[1].x - data.points[0].x;
        const dy = data.points[1].y - data.points[0].y;
        if (Math.abs(dx) > 20 && Math.abs(dy) < 2) return "horizontal_line";
        if (Math.abs(dy) > 20 && Math.abs(dx) < 2) return "vertical_line";
        return "line";
      }
      if (data.points.length > 10) return "complex_path";
    }
    return null;
  }
  function auditAccessibility(ir) {
    var _a, _b, _c, _d, _e;
    const issues = [];
    let score = 100;
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      for (const objId of page.content) {
        const obj = ir.objects[objId];
        if ((obj == null ? void 0 : obj.type) === "image" && !((_a = obj.accessibility) == null ? void 0 : _a.alt)) {
          issues.push({
            type: "missing_alt_text",
            page: pageNum,
            element: objId,
            severity: "error",
            message: "Image has no alternative text",
            suggestion: "Add descriptive alt text for screen readers"
          });
          score -= 5;
        }
      }
      const headings = page.content.map((id) => ir.objects[id]).filter((obj) => {
        var _a2;
        return ((_a2 = obj == null ? void 0 : obj.semantic) == null ? void 0 : _a2.role) === "heading";
      });
      let prevLevel = 0;
      for (const heading of headings) {
        const level = heading.semantic.level || 1;
        if (level > prevLevel + 1 && prevLevel > 0) {
          issues.push({
            type: "heading_skip",
            page: pageNum,
            element: heading.id,
            severity: "warning",
            message: `Heading level skipped from H${prevLevel} to H${level}`,
            suggestion: `Use H${prevLevel + 1} instead`
          });
          score -= 2;
        }
        prevLevel = level;
      }
      for (const vecId of page.vectors || []) {
        const vec = ir.vectors[vecId];
        if (((_b = vec == null ? void 0 : vec.semantic) == null ? void 0 : _b.role) === "table_border") {
          const nearbyTexts = page.content.map((id) => ir.objects[id]).filter((obj) => (obj == null ? void 0 : obj.bbox) && isNear(vec.bbox, obj.bbox));
          const hasHeader = nearbyTexts.some(
            (t) => {
              var _a2, _b2;
              return ((_a2 = t.raw) == null ? void 0 : _a2.fontSize) > 12 || ((_b2 = t.semantic) == null ? void 0 : _b2.role) === "heading";
            }
          );
          if (!hasHeader) {
            issues.push({
              type: "table_no_header",
              page: pageNum,
              element: vecId,
              severity: "warning",
              message: "Table may be missing header row",
              suggestion: "Ensure first row contains column headers"
            });
            score -= 2;
          }
        }
      }
      if (page.content.length > 5) {
        const sorted = [...page.content].map((id) => ir.objects[id]).filter((obj) => obj == null ? void 0 : obj.bbox).sort((a, b) => a.bbox[1] - b.bbox[1]);
        for (let i = 1; i < sorted.length; i++) {
          const prev = sorted[i - 1];
          const curr = sorted[i];
          if (prev.bbox[1] > curr.bbox[1] + 50) {
            issues.push({
              type: "reading_order",
              page: pageNum,
              element: curr.id,
              severity: "info",
              message: "Element may be out of reading order",
              suggestion: "Verify content reads correctly top-to-bottom"
            });
            score -= 1;
          }
        }
      }
      for (const objId of page.content) {
        const obj = ir.objects[objId];
        if ((obj == null ? void 0 : obj.type) === "text" && ((_c = obj.raw) == null ? void 0 : _c.color)) {
        }
      }
      if (!((_d = ir.document.metadata) == null ? void 0 : _d.language)) {
        issues.push({
          type: "missing_language",
          page: 1,
          severity: "warning",
          message: "Document language not specified",
          suggestion: "Set document.language for screen reader pronunciation"
        });
        score -= 3;
      }
      if (!((_e = ir.document.metadata) == null ? void 0 : _e.title)) {
        issues.push({
          type: "missing_title",
          page: 1,
          severity: "warning",
          message: "Document has no title",
          suggestion: "Set document.metadata.title"
        });
        score -= 2;
      }
    }
    return {
      score: Math.max(0, score),
      issues,
      summary: {
        errors: issues.filter((i) => i.severity === "error").length,
        warnings: issues.filter((i) => i.severity === "warning").length,
        info: issues.filter((i) => i.severity === "info").length
      }
    };
  }
  function generateAccessibilityTree(ir) {
    var _a, _b, _c, _d;
    const tree = { type: "Document", children: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNode = { type: "Page", properties: { pageNumber: page.num }, children: [] };
      for (const objId of page.content) {
        const obj = ir.objects[objId];
        if (!obj) continue;
        const node = {
          type: ((_a = obj.accessibility) == null ? void 0 : _a.role) || mapRole((_b = obj.semantic) == null ? void 0 : _b.role),
          properties: {},
          children: []
        };
        if ((_c = obj.semantic) == null ? void 0 : _c.text) {
          node.children.push({ type: "Text", content: obj.semantic.text });
        }
        if (((_d = obj.semantic) == null ? void 0 : _d.role) === "heading") {
          node.properties.level = obj.semantic.level || 1;
        }
        pageNode.children.push(node);
      }
      tree.children.push(pageNode);
    }
    return tree;
  }
  function mapRole(role) {
    const map = {
      heading: "Heading",
      paragraph: "Paragraph",
      table: "Table",
      list: "List",
      image: "Figure",
      form_field: "Form",
      signature: "Signature"
    };
    return map[role] || "Paragraph";
  }
  function isNear(bbox1, bbox2, threshold = 100) {
    if (!bbox1 || !bbox2) return false;
    const cx1 = bbox1[0] + bbox1[2] / 2;
    const cy1 = bbox1[1] + bbox1[3] / 2;
    const cx2 = bbox2[0] + bbox2[2] / 2;
    const cy2 = bbox2[1] + bbox2[3] / 2;
    return Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2)) < threshold;
  }
  function exportHTML(ir, options = {}) {
    var _a, _b, _c;
    const {
      mode = "visual",
      // 'visual' | 'accessible' | 'intelligent' | 'selectable'
      includeDataAttributes: includeDataAttributes2 = true,
      includeRAG = true,
      includeRawText = true
    } = options;
    const ragPayload = buildRAGPayload(ir);
    const viewer = generateViewerChrome(ragPayload);
    let html = '<!DOCTYPE html>\n<html lang="' + (((_a = ir.document.metadata) == null ? void 0 : _a.language) || "en") + '">\n<head>\n';
    html += '<meta charset="UTF-8">\n';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += "<title>" + escapeHTML2(((_b = ir.document.metadata) == null ? void 0 : _b.title) || "Document") + "</title>\n";
    html += generateVisualStyles(ir);
    html += generateAccessibleStyles();
    html += viewer.styles;
    html += '</head>\n<body data-codbdocs-view="pdf">\n';
    html += '<a class="skip-link" href="#codbdocs-root">Skip to document</a>\n';
    html += '<main role="document" id="codbdocs-root">\n';
    html += '<div id="codbdocs-viewer">\n';
    html += '<aside class="codbdocs-sidebar">\n';
    html += viewer.sidebar;
    html += "</aside>\n";
    html += '<div id="codbdocs-main">\n';
    html += viewer.toolbar;
    html += '<div class="codbdocs-viewer-hint">Keyboard: <b>F</b> search &middot; <b>P</b>/<b>N</b> page &middot; <b>C</b> contrast &middot; <b>O</b> outline</div>\n';
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const attrs = includeDataAttributes2 ? ` data-pdf-page="${page.num}" data-pdf-page-id="${pageId}"` : "";
      const pageLabel = ((_c = page.labels) == null ? void 0 : _c.print) || `Page ${page.num}`;
      html += `<section class="pdf-page"${attrs} aria-label="${escapeHTML2(pageLabel)}" role="region">
`;
      if (page.background) {
        html += `<div class="pdf-page-raster" aria-hidden="true">
`;
        html += `<img src="${page.background}" alt="" width="${page.width}" height="${page.height}">
`;
        html += renderPageImages(page, ir, attrs);
        html += "</div>\n";
      } else {
        html += renderPageVisual(page, ir, attrs);
      }
      if (page.background) {
        html += renderPagePositionedText(page, ir, attrs);
      } else {
        html += renderPageAccessible(page, ir, attrs, mode);
      }
      html += "</section>\n";
    }
    html += "</div>\n";
    html += "</div>\n";
    html += "</main>\n";
    if (includeRAG || includeRawText) {
      html += '<script type="application/json" id="codbdocs-rag" data-page-count="' + (ir.document.pages.length || 0) + '">' + JSON.stringify(ragPayload).replace(/</g, "\\u003c") + "<\/script>\n";
    }
    html += viewer.script;
    html += "</body>\n</html>";
    return html;
  }
  function renderPageImages(page, ir, attrs) {
    var _a, _b, _c;
    let html = "";
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (!obj || obj.type !== "image") continue;
      const src = (_a = obj.raw) == null ? void 0 : _a.src;
      if (!src) continue;
      const [x = 0, y = 0, w = 0, h = 0] = obj.bbox || [];
      const alt = escapeHTML2(((_b = obj.accessibility) == null ? void 0 : _b.alt) || ((_c = obj.semantic) == null ? void 0 : _c.caption) || "Image");
      html += `<img class="pdf-embedded-image"${attrs} data-pdf-object="${objId}" `;
      html += `src="${src}" alt="${alt}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;" width="${w}" height="${h}">
`;
    }
    return html;
  }
  function buildRAGPayload(ir) {
    return buildRAGContext(ir, null);
  }
  function renderPageVisual(page, ir, attrs) {
    var _a, _b, _c, _d, _e, _f, _g;
    let html = '<div class="pdf-text-canvas" style="position:relative;width:' + (page.width || 0) + "px;height:" + (page.height || 0) + 'px;">\n';
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (!vec) continue;
      html += renderVectorVisual(vec, attrs);
    }
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (!obj) continue;
      if (obj.type === "text") {
        const bbox = obj.bbox || [];
        const style = textRunStyle(obj);
        html += `<div class="pdf-text"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${bbox[0] || 0}px;top:${bbox[1] || 0}px;font-size:${((_a = obj.raw) == null ? void 0 : _a.fontSize) || 12}px;${style}">${escapeHTML2(((_b = obj.semantic) == null ? void 0 : _b.text) || "")}</div>
`;
      } else if (obj.type === "image") {
        const bbox = obj.bbox || [];
        const src = ((_c = obj.raw) == null ? void 0 : _c.src) || "";
        if (src) {
          html += `<img class="pdf-image"${attrs} data-pdf-object="${objId}" src="${src}" alt="${escapeHTML2(((_d = obj.accessibility) == null ? void 0 : _d.alt) || "Image")}" style="position:absolute;left:${bbox[0] || 0}px;top:${bbox[1] || 0}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">
`;
        } else {
          html += `<div class="pdf-image"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${bbox[0] || 0}px;top:${bbox[1] || 0}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;background:#eee;display:flex;align-items:center;justify-content:center;color:#999;">[Image]</div>
`;
        }
      } else if (obj.type === "link") {
        const bbox = obj.bbox || [];
        const href = escapeHTML2(((_e = obj.raw) == null ? void 0 : _e.href) || "#");
        html += `<a class="pdf-link"${attrs} data-pdf-object="${objId}" href="${href}" target="_blank" rel="noopener" style="position:absolute;left:${bbox[0] || 0}px;top:${bbox[1] || 0}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">${escapeHTML2(((_f = obj.semantic) == null ? void 0 : _f.text) || ((_g = obj.raw) == null ? void 0 : _g.url) || "link")}</a>
`;
      }
    }
    html += "</div>\n";
    return html;
  }
  function renderPagePositionedText(page, ir, attrs) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let html = '<div class="pdf-text-layer" aria-label="Selectable text">\n';
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (!obj) continue;
      const dataAttr = includeDataAttributes(objId, attrs);
      const bbox = obj.bbox || [];
      if (obj.type === "text" && ((_a = obj.semantic) == null ? void 0 : _a.text)) {
        const style = textRunStyle(obj);
        html += `<div class="pdf-text"${dataAttr} data-pdf-object="${objId}" style="position:absolute;left:${bbox[0] || 0}px;top:${bbox[1] || 0}px;font-size:${((_b = obj.raw) == null ? void 0 : _b.fontSize) || 12}px;${style}">${escapeHTML2(obj.semantic.text)}</div>
`;
      } else if (obj.type === "image") {
        const src = ((_c = obj.raw) == null ? void 0 : _c.src) || "";
        const alt = escapeHTML2(((_d = obj.accessibility) == null ? void 0 : _d.alt) || ((_e = obj.semantic) == null ? void 0 : _e.caption) || "Image");
        if (src) {
          html += `<img class="pdf-image"${dataAttr} data-pdf-object="${objId}" src="${src}" alt="${alt}" style="position:absolute;left:${bbox[0] || 0}px;top:${bbox[1] || 0}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">
`;
        }
      } else if (obj.type === "link") {
        const href = escapeHTML2(((_f = obj.raw) == null ? void 0 : _f.href) || "#");
        const text = escapeHTML2(((_g = obj.semantic) == null ? void 0 : _g.text) || ((_h = obj.raw) == null ? void 0 : _h.url) || "link");
        html += `<a class="pdf-link"${dataAttr} data-pdf-object="${objId}" href="${href}" target="_blank" rel="noopener" style="position:absolute;left:${bbox[0] || 0}px;top:${bbox[1] || 0}px;width:${bbox[2] || 0}px;height:${bbox[3] || 0}px;">${text}</a>
`;
      }
    }
    html += "</div>\n";
    return html;
  }
  function renderPageAccessible(page, ir, attrs, mode) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    let html = '<div class="pdf-text-layer" aria-label="Selectable text">\n';
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (!obj) continue;
      const dataAttr = includeDataAttributes(objId, attrs);
      const role = ((_a = obj.semantic) == null ? void 0 : _a.role) || "paragraph";
      if (obj.type === "image") {
        const alt = ((_b = obj.accessibility) == null ? void 0 : _b.alt) || ((_c = obj.semantic) == null ? void 0 : _c.caption) || (mode === "intelligent" ? "AI-generated description" : "Image");
        const src = ((_d = obj.raw) == null ? void 0 : _d.src) || "";
        html += `<figure${dataAttr}>
`;
        if (src) html += `<img src="${escapeHTML2(src)}" alt="${escapeHTML2(alt)}" loading="lazy">
`;
        if ((_e = obj.semantic) == null ? void 0 : _e.caption) html += `<figcaption>${escapeHTML2(obj.semantic.caption)}</figcaption>
`;
        if (mode === "intelligent" && ((_f = obj.provenance) == null ? void 0 : _f.method) === "vision") {
          html += `<small class="ai-generated">AI-generated description</small>
`;
        }
        html += "</figure>\n";
      } else if (role === "heading") {
        const level = ((_g = obj.semantic) == null ? void 0 : _g.level) || 2;
        html += `<h${level}${dataAttr}>${escapeHTML2(((_h = obj.semantic) == null ? void 0 : _h.text) || "")}</h${level}>
`;
      } else if (role === "table") {
        html += `<table${dataAttr}>
`;
        html += `<caption>${escapeHTML2(((_i = obj.semantic) == null ? void 0 : _i.caption) || "Table")}</caption>
`;
        html += "</table>\n";
      } else if (role === "list") {
        html += `<ul${dataAttr}>
`;
        html += "</ul>\n";
      } else if (obj.type === "link") {
        const href = escapeHTML2(((_j = obj.raw) == null ? void 0 : _j.href) || "#");
        html += `<a${dataAttr} href="${href}" target="_blank" rel="noopener">${escapeHTML2(((_k = obj.semantic) == null ? void 0 : _k.text) || ((_l = obj.raw) == null ? void 0 : _l.url) || "link")}</a>
`;
      } else if (obj.type === "text" && ((_m = obj.semantic) == null ? void 0 : _m.text)) {
        const style = textRunStyle(obj);
        html += `<p${dataAttr}${style ? ' style="' + style + '"' : ""}>${escapeHTML2(obj.semantic.text)}</p>
`;
      }
    }
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (!vec) continue;
      if (((_n = vec.semantic) == null ? void 0 : _n.role) === "separator") {
        html += `<hr${attrs} data-pdf-vector="${vecId}">
`;
      }
    }
    html += "</div>\n";
    return html;
  }
  function textRunStyle(obj) {
    var _a, _b;
    let style = "";
    const font = (_a = obj.raw) == null ? void 0 : _a.font;
    if (font) {
      style += `font-family:${sanitizeFontName(font)}, system-ui, sans-serif;`;
    }
    const color = (_b = obj.raw) == null ? void 0 : _b.color;
    if (color) {
      style += `color:${escapeCSSColor(color)};`;
    }
    return style;
  }
  function sanitizeFontName(name) {
    return String(name).replace(/[^A-Za-z0-9]+/g, " ").replace(/^\d+\s?/, "").trim() || "sans-serif";
  }
  function escapeCSSColor(color) {
    return String(color).replace(/[^0-9A-Za-z#.,()% ]/g, "");
  }
  function renderVectorVisual(vec, attrs) {
    var _a, _b, _c, _d, _e, _f;
    if (!vec.bbox) return "";
    if (vec.type === "rect") {
      const style = `position:absolute;left:${vec.bbox[0]}px;top:${vec.bbox[1]}px;width:${vec.bbox[2]}px;height:${vec.bbox[3]}px;`;
      const stroke = ((_a = vec.graphicsState) == null ? void 0 : _a.stroke) ? `border:1px solid ${vec.graphicsState.stroke};` : "";
      const fill = ((_b = vec.graphicsState) == null ? void 0 : _b.fill) ? `background:${vec.graphicsState.fill};` : "";
      return `<div class="pdf-rect"${attrs} data-pdf-vector="${vec.id}" style="${style}${stroke}${fill}"></div>
`;
    }
    if (vec.type === "path" && ((_c = vec.points) == null ? void 0 : _c.length) > 0) {
      let d = "";
      for (const pt of vec.points) {
        if (pt.op === "moveTo") d += `M${pt.x},${pt.y}`;
        else if (pt.op === "lineTo") d += `L${pt.x},${pt.y}`;
        else if (pt.op === "curveTo") d += `C${pt.x1},${pt.y1} ${pt.x2},${pt.y2} ${pt.x3},${pt.y3}`;
        else if (pt.op === "closePath") d += "Z";
      }
      const stroke = ((_d = vec.graphicsState) == null ? void 0 : _d.stroke) || "#000";
      const fill = ((_e = vec.graphicsState) == null ? void 0 : _e.fill) || "none";
      return `<svg class="pdf-path"${attrs} data-pdf-vector="${vec.id}" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;"><path d="${d}" stroke="${stroke}" fill="${fill}" stroke-width="${((_f = vec.graphicsState) == null ? void 0 : _f.lineWidth) || 1}"/></svg>
`;
    }
    return "";
  }
  function includeDataAttributes(objId, attrs) {
    return attrs ? `${attrs} data-pdf-object="${objId}"` : ` data-pdf-object="${objId}"`;
  }
  function generateVisualStyles(ir) {
    return `<style>
    body { margin: 0; padding: 20px; background: #f5f5f5; font-family: system-ui, sans-serif; }
    .pdf-page { background: white; margin: 20px auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; position: relative; width: fit-content; }
    .pdf-page-raster { position: relative; }
    .pdf-page-raster > img { display: block; position: relative; z-index: 1; }
    .pdf-embedded-image { position: absolute; z-index: 2; }
    /* The positioned text layer sits directly over the raster at the same
       coordinates, so it renders on top of the pixels and stays selectable.
       This makes the page look exactly like the source PDF while keeping
       every run precise and copyable. */
    .pdf-text-layer { position: absolute; inset: 0; z-index: 3; user-select: text; }
    body[data-codbdocs-view="text"] .pdf-page-raster { display: none; }
    .codbdocs-toolbar { max-width: 820px; margin: 12px auto; padding: 8px; display: flex; gap: 8px; justify-content: center; }
    .codbdocs-toggle { padding: 8px 16px; border: 1px solid #ccc; border-radius: 8px; background: #fff; cursor: pointer; font-size: 14px; }
    .codbdocs-toggle.is-active { background: #4361ee; color: #fff; border-color: #4361ee; }
    .pdf-text { position: absolute; white-space: pre; line-height: 1; transform-origin: 0 0; }
    .pdf-image { border: 1px dashed #ccc; }
    .pdf-rect { border: 1px solid #000; }
    .ai-generated { color: #999; font-style: italic; }
  </style>
`;
  }
  function generateAccessibleStyles() {
    return `<style>
    body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 820px; margin: 0 auto; }
    .pdf-page { margin: 40px 0; padding: 10px 0; position: relative; }
    .pdf-page-raster { position: relative; }
    .pdf-page-raster > img { display: block; width: 100%; height: auto; }
    .pdf-text-layer { position: absolute; inset: 10px 0 0; }
    h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; }
    p { margin: 0.5em 0; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    figure { margin: 1em 0; }
    img { max-width: 100%; height: auto; }
    figcaption { font-size: 0.9em; color: #666; margin-top: 4px; }
    .ai-generated { color: #999; font-size: 0.8em; font-style: italic; }
    hr { border: none; border-top: 1px solid #eee; margin: 1em 0; }
    .codbdocs-toolbar { max-width: 820px; margin: 12px auto; padding: 8px; display: flex; gap: 8px; justify-content: center; }
    .codbdocs-toggle { padding: 8px 16px; border: 1px solid #ccc; border-radius: 8px; background: #fff; cursor: pointer; font-size: 14px; }
    .codbdocs-toggle.is-active { background: #4361ee; color: #fff; border-color: #4361ee; }
    body[data-codbdocs-view="text"] .pdf-page-raster { display: none; }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
    @media (prefers-contrast: high) { body { background: #000; color: #fff; } a { color: #ff0; } }
  </style>
`;
  }
  async function extractStructureTree(page) {
    try {
      const structTree = await page.getStructTree();
      if (!structTree) return null;
      return convertStructTreeNode(structTree);
    } catch (e) {
      return null;
    }
  }
  function convertStructTreeNode(node) {
    if (!node) return null;
    const result = {
      type: node.type || "Unknown",
      role: node.role || node.type,
      children: []
    };
    if (node.alt) result.alt = node.alt;
    if (node.lang) result.lang = node.lang;
    if (node.altText) result.altText = node.altText;
    if (node.children) {
      for (const child of node.children) {
        if (typeof child === "string") {
          result.children.push({ type: "Text", content: child });
        } else {
          const converted = convertStructTreeNode(child);
          if (converted) result.children.push(converted);
        }
      }
    }
    return result;
  }
  async function extractAnnotations(page) {
    try {
      const annotations = await page.getAnnotations();
      if (!annotations || annotations.length === 0) return [];
      return annotations.map((ann) => ({
        id: ann.id,
        type: mapAnnotationType(ann.subtype),
        subtype: ann.subtype,
        rect: ann.rect,
        // [x1, y1, x2, y2]
        color: ann.color,
        contents: ann.contents || "",
        title: ann.title || "",
        modificationDate: ann.modDate,
        creationDate: ann.creationDate,
        flags: ann.flags,
        // Form-specific
        fieldType: ann.fieldType,
        fieldValue: ann.fieldValue,
        buttonWidgetType: ann.buttonWidgetType,
        options: ann.options,
        // Link-specific
        url: ann.url,
        dest: ann.dest,
        // Markup-specific
        strokeWidth: ann.strokeWidth,
        strokeColor: ann.strokeColor,
        fillColor: ann.fillColor,
        opacity: ann.opacity
      }));
    } catch (e) {
      return [];
    }
  }
  function mapAnnotationType(subtype) {
    const typeMap = {
      "Text": "note",
      "Link": "link",
      "FreeText": "free_text",
      "Line": "line",
      "Square": "square",
      "Circle": "circle",
      "Polygon": "polygon",
      "PolyLine": "polyline",
      "Highlight": "highlight",
      "Underline": "underline",
      "Squiggly": "squiggly",
      "StrikeOut": "strikeout",
      "Stamp": "stamp",
      "Caret": "caret",
      "Ink": "ink",
      "Popup": "popup",
      "FileAttachment": "file_attachment",
      "Sound": "sound",
      "Movie": "movie",
      "Widget": "form_field",
      "Screen": "screen",
      "PrinterMark": "printer_mark",
      "TrapNet": "trap_net",
      "Watermark": "watermark",
      "3D": "3d",
      "Redact": "redact"
    };
    return typeMap[subtype] || subtype || "unknown";
  }
  function detectReadingOrder(ir, pageNum) {
    var _a, _b;
    const pageId = `page_${pageNum}`;
    const page = ir.pages[pageId];
    if (!page) return [];
    const objects = [];
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (obj && obj.bbox) {
        objects.push({
          id: objId,
          type: obj.type,
          bbox: obj.bbox,
          text: ((_a = obj.semantic) == null ? void 0 : _a.text) || "",
          // Calculate center point for sorting
          centerX: obj.bbox[0] + obj.bbox[2] / 2,
          centerY: obj.bbox[1] + obj.bbox[3] / 2
        });
      }
    }
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (vec && vec.bbox && ((_b = vec.semantic) == null ? void 0 : _b.role)) {
        objects.push({
          id: vecId,
          type: "vector",
          bbox: vec.bbox,
          text: vec.semantic.role,
          centerX: vec.bbox[0] + vec.bbox[2] / 2,
          centerY: vec.bbox[1] + vec.bbox[3] / 2
        });
      }
    }
    if (objects.length === 0) return [];
    const sorted = objects.sort((a, b) => {
      const yDiff = a.centerY - b.centerY;
      if (Math.abs(yDiff) > 10) return yDiff;
      return a.centerX - b.centerX;
    });
    return sorted.map((obj, index) => ({
      ...obj,
      readingOrder: index
    }));
  }
  function getReadingOrderSequence(ir, pageNum) {
    const order = detectReadingOrder(ir, pageNum);
    return order.map((item) => item.id);
  }
  var idCounter = 0;
  function generateId(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;
  }
  function escapeHTML2(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // packages/core/src/extended.js
  async function extractDocumentMetadata(pdf) {
    try {
      const metadata = await pdf.getMetadata();
      const info = (metadata == null ? void 0 : metadata.info) || {};
      const metadataObj = (metadata == null ? void 0 : metadata.metadata) || null;
      let xmp = null;
      if (metadataObj) {
        try {
          xmp = metadataObj.getAll();
        } catch (e) {
        }
      }
      return {
        title: info.Title || (xmp == null ? void 0 : xmp.title) || null,
        author: info.Author || (xmp == null ? void 0 : xmp.author) || null,
        subject: info.Subject || (xmp == null ? void 0 : xmp.subject) || null,
        keywords: info.Keywords ? info.Keywords.split(/[,;]+/).map((k) => k.trim()) : (xmp == null ? void 0 : xmp.keywords) || [],
        creator: info.Creator || (xmp == null ? void 0 : xmp.creator) || null,
        producer: info.Producer || (xmp == null ? void 0 : xmp.producer) || null,
        creationDate: info.CreationDate || (xmp == null ? void 0 : xmp.creationDate) || null,
        modificationDate: info.ModDate || (xmp == null ? void 0 : xmp.modificationDate) || null,
        language: info.Language || (xmp == null ? void 0 : xmp.language) || null,
        trapped: info.Trapped || null,
        custom: xmp || {}
      };
    } catch (e) {
      return {};
    }
  }
  async function extractOutline(pdf) {
    try {
      const outline = await pdf.getOutline();
      if (!outline || outline.length === 0) return [];
      return convertOutlineItems(outline, pdf);
    } catch (e) {
      return [];
    }
  }
  async function convertOutlineItems(items, pdf) {
    const result = [];
    for (const item of items) {
      const outlineItem = {
        title: item.title || "",
        color: item.color || [0, 0, 0],
        italic: item.italic || false,
        bold: item.bold || false,
        dest: null,
        url: null,
        children: []
      };
      try {
        if (item.dest) {
          let dest = item.dest;
          if (typeof dest === "string") {
            try {
              dest = await pdf.getDestination(dest);
            } catch (e) {
            }
          }
          if (Array.isArray(dest)) {
            const pageIndex = await pdf.getPageIndex(dest[0]);
            outlineItem.dest = {
              page: pageIndex + 1,
              kind: dest[1] || "XYZ",
              args: dest.slice(2)
            };
          }
        }
      } catch (e) {
      }
      if (item.url) {
        outlineItem.url = item.url;
      }
      if (item.items && item.items.length > 0) {
        outlineItem.children = await convertOutlineItems(item.items, pdf);
      }
      result.push(outlineItem);
    }
    return result;
  }
  async function extractNamedDestinations(pdf) {
    try {
      const destinations = await pdf.getDestinations();
      const result = {};
      for (const [name, dest] of Object.entries(destinations)) {
        try {
          if (Array.isArray(dest)) {
            const pageIndex = await pdf.getPageIndex(dest[0]);
            result[name] = {
              page: pageIndex + 1,
              kind: dest[1] || "XYZ",
              args: dest.slice(2)
            };
          }
        } catch (e) {
        }
      }
      return result;
    } catch (e) {
      return {};
    }
  }
  async function extractPageLabels(pdf) {
    try {
      const count = pdf.numPages;
      const labels = [];
      for (let i = 0; i < count; i++) {
        labels.push({
          page: i + 1,
          label: `${i + 1}`,
          style: "decimal"
        });
      }
      return labels;
    } catch (e) {
      return [];
    }
  }
  async function extractSecurity(pdf) {
    try {
      const isEncrypted = pdf.isEncrypted || false;
      let permissions = null;
      try {
        permissions = await pdf.getPermissions();
      } catch (e) {
      }
      return {
        encrypted: isEncrypted,
        permissions: permissions ? {
          printing: permissions.printing !== "disabled",
          modifying: permissions.modifying !== "disabled",
          copying: permissions.copying !== "disabled",
          annotating: permissions.annotating !== "disabled",
          fillingForms: permissions.fillingForms !== "disabled",
          contentAccessibility: permissions.contentAccessibility !== "disabled",
          documentAssembly: permissions.documentAssembly !== "disabled",
          highQualityPrinting: permissions.highQualityPrinting !== "disabled"
        } : null,
        algorithm: null
      };
    } catch (e) {
      return {
        encrypted: false,
        permissions: null,
        algorithm: null
      };
    }
  }
  async function extractMarkedContent(page) {
    try {
      const opList = await page.getOperatorList();
      const markedContent = [];
      let mcStack = [];
      const OPS = typeof pdfjsLib !== "undefined" ? pdfjsLib.OPS || {} : {};
      for (let i = 0; i < opList.fnArray.length; i++) {
        const fn = opList.fnArray[i];
        const args = opList.argsArray[i];
        if (fn === OPS.beginMarkedContent || fn === 18) {
          const mc = {
            tag: args[0] || "Unknown",
            properties: args[1] || {},
            type: "marked_content",
            isArtifact: false,
            children: []
          };
          mcStack.push(mc);
        } else if (fn === OPS.beginMarkedContentProps || fn === 19) {
          const mc = {
            tag: args[0] || "Unknown",
            properties: args[1] || {},
            type: "marked_content",
            isArtifact: args[0] === "Artifact",
            children: []
          };
          mcStack.push(mc);
        } else if (fn === OPS.endMarkedContent || fn === 20) {
          if (mcStack.length > 0) {
            const completed = mcStack.pop();
            if (mcStack.length > 0) {
              mcStack[mcStack.length - 1].children.push(completed);
            } else {
              markedContent.push(completed);
            }
          }
        }
      }
      return markedContent;
    } catch (e) {
      return [];
    }
  }
  async function extractArtifacts(page) {
    const markedContent = await extractMarkedContent(page);
    const artifacts = [];
    function collectArtifacts(node) {
      if (node.isArtifact) {
        artifacts.push({
          tag: node.tag,
          properties: node.properties,
          type: categorizeArtifact(node.tag, node.properties)
        });
      }
      if (node.children) {
        for (const child of node.children) {
          collectArtifacts(child);
        }
      }
    }
    for (const mc of markedContent) {
      collectArtifacts(mc);
    }
    return artifacts;
  }
  function categorizeArtifact(tag) {
    if (tag === "Pagination" || tag === "PageNumber") return "pagination";
    if (tag === "Header") return "header";
    if (tag === "Footer") return "footer";
    if (tag === "Figure") return "decorative_figure";
    if (tag === "Background") return "background";
    return "unknown";
  }
  async function extractGlyphs(page) {
    try {
      const content = await page.getTextContent();
      const glyphs = [];
      for (const item of content.items) {
        if (item.str && item.str.trim()) {
          const transform = item.transform;
          const fontSize = Math.abs(transform[0]) || 12;
          const translateX = transform[4] || 0;
          const translateY = transform[5] || 0;
          const charWidth = item.width / Math.max(item.str.length, 1);
          for (let i = 0; i < item.str.length; i++) {
            glyphs.push({
              unicode: item.str[i],
              charCode: item.str.charCodeAt(i),
              advance: charWidth,
              transform: [
                transform[0],
                transform[1],
                transform[2],
                transform[3],
                translateX + i * charWidth,
                translateY
              ],
              font: item.fontName || null,
              fontSize,
              bbox: [
                translateX + i * charWidth,
                translateY,
                charWidth,
                fontSize
              ]
            });
          }
        }
      }
      return glyphs;
    } catch (e) {
      return [];
    }
  }
  function generateRemediations(auditResult, ir) {
    const fixes = [];
    if (!auditResult || !auditResult.issues) return fixes;
    for (const issue of auditResult.issues) {
      switch (issue.type) {
        case "missing_alt_text":
          fixes.push({
            issue: issue.type,
            page: issue.page,
            element: issue.element,
            severity: issue.severity,
            fix: {
              type: "add_alt_text",
              suggestedAlt: generateAltText(issue, ir),
              strategy: "vision"
            }
          });
          break;
        case "missing_heading_structure":
          fixes.push({
            issue: issue.type,
            page: issue.page,
            severity: issue.severity,
            fix: {
              type: "add_heading_structure",
              suggestedStructure: inferHeadingStructure(ir),
              strategy: "inference"
            }
          });
          break;
        case "missing_language":
          fixes.push({
            issue: issue.type,
            severity: issue.severity,
            fix: {
              type: "add_language",
              suggestedLanguage: "en-US",
              strategy: "detection"
            }
          });
          break;
        case "missing_title":
          fixes.push({
            issue: issue.type,
            severity: issue.severity,
            fix: {
              type: "add_title",
              suggestedTitle: inferDocumentTitle(ir),
              strategy: "inference"
            }
          });
          break;
        case "reading_order":
          fixes.push({
            issue: issue.type,
            page: issue.page,
            severity: issue.severity,
            fix: {
              type: "fix_reading_order",
              suggestedOrder: inferReadingOrder(ir, issue.page),
              strategy: "spatial"
            }
          });
          break;
      }
    }
    return fixes;
  }
  function generateAltText(issue, ir) {
    if (issue.element) {
      const obj = ir.objects[issue.element];
      if (obj && obj.type === "image") {
        return "Image on page " + (obj.page || "unknown");
      }
    }
    return "Decorative image";
  }
  function inferHeadingStructure(ir) {
    var _a;
    const headings = [];
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (((_a = obj.semantic) == null ? void 0 : _a.role) === "heading") {
        headings.push({ id, level: obj.semantic.level, text: obj.semantic.text });
      }
    }
    return headings;
  }
  function inferDocumentTitle(ir) {
    var _a;
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (((_a = obj.semantic) == null ? void 0 : _a.role) === "heading" && obj.semantic.level === 1) {
        return obj.semantic.text;
      }
    }
    return "Untitled Document";
  }
  function inferReadingOrder(ir, pageNum) {
    const pageId = `page_${pageNum}`;
    const page = ir.pages[pageId];
    if (!page) return [];
    const objects = page.content.map((id) => ir.objects[id]).filter((obj) => obj && obj.bbox);
    return objects.sort((a, b) => {
      const ay = a.bbox[1] || 0;
      const by = b.bbox[1] || 0;
      if (Math.abs(ay - by) > 10) return ay - by;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    }).map((obj) => obj.id);
  }

  // packages/core/src/graphics.js
  var ColorSpaceTypes = {
    DEVICE_RGB: "DeviceRGB",
    DEVICE_CMYK: "DeviceCMYK",
    DEVICE_GRAY: "DeviceGray",
    ICC_BASED: "ICCBased",
    CAL_GRAY: "CalGray",
    CAL_RGB: "CalRGB",
    LAB: "Lab",
    SEPARATION: "Separation",
    DEVICE_N: "DeviceN",
    INDEXED: "Indexed",
    PATTERN: "Pattern"
  };
  function createGraphicsState() {
    return {
      transform: [1, 0, 0, 1, 0, 0],
      stroke: {
        colorSpace: ColorSpaceTypes.DEVICE_RGB,
        color: [0, 0, 0],
        width: 1,
        cap: "butt",
        join: "miter",
        dash: [],
        dashPhase: 0
      },
      fill: {
        colorSpace: ColorSpaceTypes.DEVICE_RGB,
        color: [0, 0, 0]
      },
      lineWidth: 1,
      lineCap: "butt",
      lineJoin: "miter",
      miterLimit: 10,
      dash: [],
      dashPhase: 0,
      opacity: 1,
      strokeOpacity: 1,
      fillOpacity: 1,
      blendMode: "Normal",
      clip: null,
      clipPath: [],
      softMask: null,
      transparencyGroup: null,
      renderingIntent: "RelativeColorimetric",
      overprint: false,
      overprintMode: 0
    };
  }
  function pushGraphicsState(state) {
    return JSON.parse(JSON.stringify(state));
  }
  function popGraphicsState(stack) {
    return stack.pop() || createGraphicsState();
  }
  function applyTransform(state, transform) {
    if (!transform || transform.length < 6) return state;
    const [a, b, c, d, e, f] = state.transform;
    const [a2, b2, c2, d2, e2, f2] = transform;
    state.transform = [
      a * a2 + c * b2,
      b * a2 + d * b2,
      a * c2 + c * d2,
      b * c2 + d * d2,
      a * e2 + c * f2 + e,
      b * e2 + d * f2 + f
    ];
    return state;
  }
  function cmykToRgb(c, m, y, k) {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return [Math.round(r), Math.round(g), Math.round(b)];
  }
  function rgbToCmyk(r, g, b) {
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const k = 1 - Math.max(rr, gg, bb);
    if (k === 1) return [0, 0, 0, 100];
    const c = (1 - rr - k) / (1 - k) * 100;
    const m = (1 - gg - k) / (1 - k) * 100;
    const y = (1 - bb - k) / (1 - k) * 100;
    return [Math.round(c), Math.round(m), Math.round(y), Math.round(k * 100)];
  }
  function labToRgb(l, a, b) {
    const fy = (l + 16) / 116;
    const fx = a / 500 + fy;
    const fz = fy - b / 200;
    const delta = 6 / 29;
    const delta3 = delta * delta * delta;
    const x = (fx > delta ? fx * fx * fx : (fx - 16 / 116) * 3 * delta * delta) * 0.95047;
    const y = fy > delta ? fy * fy * fy : (fy - 16 / 116) * 3 * delta * delta;
    const z = (fz > delta ? fz * fz * fz : (fz - 16 / 116) * 3 * delta * delta) * 1.08883;
    const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    const bv = x * 0.0557 + y * -0.204 + z * 1.057;
    return [
      Math.round(Math.min(255, Math.max(0, r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92) * 255)),
      Math.round(Math.min(255, Math.max(0, g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92) * 255)),
      Math.round(Math.min(255, Math.max(0, bv > 31308e-7 ? 1.055 * Math.pow(bv, 1 / 2.4) - 0.055 : bv * 12.92) * 255))
    ];
  }
  function toRgb(color, colorSpace) {
    if (!color) return [0, 0, 0];
    switch (colorSpace) {
      case ColorSpaceTypes.DEVICE_RGB:
        return color;
      case ColorSpaceTypes.DEVICE_CMYK:
        return cmykToRgb(color[0], color[1], color[2], color[3]);
      case ColorSpaceTypes.DEVICE_GRAY:
        return [color[0] * 255, color[0] * 255, color[0] * 255];
      case ColorSpaceTypes.LAB:
        return labToRgb(color[0], color[1], color[2]);
      default:
        return color.slice(0, 3);
    }
  }
  function parseBlendMode(name) {
    const modes = {
      "Normal": "Normal",
      "Multiply": "Multiply",
      "Screen": "Screen",
      "Overlay": "Overlay",
      "Darken": "Darken",
      "Lighten": "Lighten",
      "ColorDodge": "ColorDodge",
      "ColorBurn": "ColorBurn",
      "HardLight": "HardLight",
      "SoftLight": "SoftLight",
      "Difference": "Difference",
      "Exclusion": "Exclusion",
      "Hue": "Hue",
      "Saturation": "Saturation",
      "Color": "Color",
      "Luminosity": "Luminosity"
    };
    return modes[name] || "Normal";
  }
  function createSoftMask(type, bbox, transform) {
    return {
      type: "SoftMask",
      subtype: type,
      // Luminosity or Alpha
      bbox,
      transform,
      group: null,
      backDrop: [0, 0, 0],
      matte: [0, 0, 0]
    };
  }
  function createTransparencyGroup(bbox, isolated, knockout) {
    return {
      type: "TransparencyGroup",
      bbox,
      isolated: isolated || false,
      knockout: knockout || false,
      colorSpace: null,
      group: null
    };
  }
  function createTilingPattern(type, bbox, xStep, yStep, paintType, tilingType) {
    return {
      type: "TilingPattern",
      subtype: type,
      bbox,
      xStep,
      yStep,
      paintType: paintType || 1,
      // 1=colored, 2=uncolored
      tilingType: tilingType || 1,
      // 1=constant, 2=constant spacing, 3=auto flow
      matrix: [1, 0, 0, 1, 0, 0],
      resources: {}
    };
  }
  function createGradientShading(type, coords, domain, colors, functions) {
    return {
      type: "GradientShading",
      subtype: type,
      // Axial or Radial
      coords,
      domain: domain || [0, 1],
      colors,
      // Array of { offset, color }
      functions,
      extend: [false, false]
    };
  }
  function parseShading(args) {
    if (!args || args.length < 4) return null;
    const type = args[0];
    if (type === 1 || type === 2) {
      return createGradientShading(
        type === 1 ? "Axial" : "Radial",
        args.slice(1, type === 1 ? 5 : 7),
        [0, 1],
        [],
        null
      );
    }
    return null;
  }
  function extractGraphicsState(opList) {
    var _a, _b, _c;
    const states = [];
    let currentState = createGraphicsState();
    const stateStack = [];
    const OPS = typeof pdfjsLib !== "undefined" ? pdfjsLib.OPS || {} : {};
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      const args = opList.argsArray[i];
      if (fn === OPS.save || fn === 19) {
        stateStack.push(pushGraphicsState(currentState));
      } else if (fn === OPS.restore || fn === 20) {
        currentState = popGraphicsState(stateStack);
      } else if (fn === OPS.transform || fn === 8) {
        if (args && args.length >= 6) {
          currentState = applyTransform(currentState, args);
        }
      } else if (fn === OPS.setStrokeRGBColor || fn === 16) {
        currentState.stroke.colorSpace = ColorSpaceTypes.DEVICE_RGB;
        currentState.stroke.color = args ? args.slice(0, 3) : [0, 0, 0];
      } else if (fn === OPS.setStrokeCMYKColor || fn === 17) {
        currentState.stroke.colorSpace = ColorSpaceTypes.DEVICE_CMYK;
        currentState.stroke.color = args ? args.slice(0, 4) : [0, 0, 0, 0];
      } else if (fn === OPS.setFillRGBColor || fn === 4) {
        currentState.fill.colorSpace = ColorSpaceTypes.DEVICE_RGB;
        currentState.fill.color = args ? args.slice(0, 3) : [0, 0, 0];
      } else if (fn === OPS.setFillCMYKColor || fn === 5) {
        currentState.fill.colorSpace = ColorSpaceTypes.DEVICE_CMYK;
        currentState.fill.color = args ? args.slice(0, 4) : [0, 0, 0, 0];
      } else if (fn === OPS.setLineWidth || fn === 22) {
        currentState.lineWidth = args ? args[0] : 1;
      } else if (fn === OPS.setLineCap || fn === 23) {
        const caps = ["butt", "round", "square"];
        currentState.lineCap = caps[args == null ? void 0 : args[0]] || "butt";
      } else if (fn === OPS.setLineJoin || fn === 24) {
        const joins = ["miter", "round", "bevel"];
        currentState.lineJoin = joins[args == null ? void 0 : args[0]] || "miter";
      } else if (fn === OPS.setMiterLimit || fn === 25) {
        currentState.miterLimit = (args == null ? void 0 : args[0]) || 10;
      } else if (fn === OPS.setDash || fn === 26) {
        currentState.dash = (args == null ? void 0 : args[0]) || [];
        currentState.dashPhase = (args == null ? void 0 : args[1]) || 0;
      } else if (fn === OPS.clip || fn === 28 || fn === OPS.eoClip || fn === 29) {
        currentState.clip = {
          path: [...currentState.clipPath],
          rule: fn === OPS.eoClip || fn === 29 ? "even-odd" : "winding"
        };
      } else if (fn === OPS.setFillAlpha || fn === 44) {
        currentState.fillOpacity = (_a = args == null ? void 0 : args[0]) != null ? _a : 1;
      } else if (fn === OPS.setStrokeAlpha || fn === 45) {
        currentState.strokeOpacity = (_b = args == null ? void 0 : args[0]) != null ? _b : 1;
      } else if (fn === OPS.setGState || fn === 57) {
      } else if (fn === OPS.setBlendMode || fn === 58) {
        currentState.blendMode = parseBlendMode(args == null ? void 0 : args[0]);
      } else if (fn === OPS.setRenderingIntent || fn === 59) {
        currentState.renderingIntent = (args == null ? void 0 : args[0]) || "RelativeColorimetric";
      } else if (fn === OPS.setOverprint || fn === 60) {
        currentState.overprint = (_c = args == null ? void 0 : args[0]) != null ? _c : false;
      }
      states.push({
        index: i,
        state: pushGraphicsState(currentState)
      });
    }
    return states;
  }
  function buildGraphicsStateSummary(states) {
    const transforms = states.map((s) => s.state.transform);
    const uniqueTransforms = [...new Set(transforms.map((t) => JSON.stringify(t)))].map((t) => JSON.parse(t));
    const strokeColors = states.filter((s) => s.state.stroke.color).map((s) => ({
      colorSpace: s.state.stroke.colorSpace,
      color: s.state.stroke.color,
      rgb: toRgb(s.state.stroke.color, s.state.stroke.colorSpace)
    }));
    const fillColors = states.filter((s) => s.state.fill.color).map((s) => ({
      colorSpace: s.state.fill.colorSpace,
      color: s.state.fill.color,
      rgb: toRgb(s.state.fill.color, s.state.fill.colorSpace)
    }));
    const hasTransparency = states.some(
      (s) => s.state.opacity < 1 || s.state.fillOpacity < 1 || s.state.strokeOpacity < 1 || s.state.blendMode !== "Normal"
    );
    const hasClipping = states.some((s) => s.state.clip !== null);
    const hasPatterns = states.some(
      (s) => s.state.fill.colorSpace === ColorSpaceTypes.PATTERN || s.state.stroke.colorSpace === ColorSpaceTypes.PATTERN
    );
    return {
      uniqueTransforms: uniqueTransforms.length,
      strokeColors: [...new Set(strokeColors.map((c) => JSON.stringify(c)))].map((c) => JSON.parse(c)),
      fillColors: [...new Set(fillColors.map((c) => JSON.stringify(c)))].map((c) => JSON.parse(c)),
      hasTransparency,
      hasClipping,
      hasPatterns,
      lineStyles: [...new Set(states.map((s) => `${s.state.lineCap}-${s.state.lineJoin}-${s.state.lineWidth}`))]
    };
  }

  // packages/core/src/pdfcreator.js
  var PDFCreator = class {
    constructor() {
      this.objects = [];
      this.pages = [];
      this.resources = {};
      this.currentObject = 1;
    }
    /**
     * Create a PDF from IR.
     * @param {Object} ir - PDF-IR document model
     * @param {Object} options - Creation options
     * @returns {Promise<Uint8Array>} PDF bytes
     */
    async create(ir, options = {}) {
      var _a, _b;
      const {
        level = 2,
        // 1=content, 2=semantic, 3=visual
        includeMetadata = true,
        includeStructure = true,
        includeAccessibility = true,
        pageSize = "letter"
      } = options;
      this.objects = [];
      this.pages = [];
      const pdf = {
        version: "1.7",
        header: "%PDF-1.7",
        body: {},
        trailer: {}
      };
      const catalogId = this.nextObjectId();
      pdf.body[catalogId] = {
        type: "catalog",
        pages: null
        // Will be set after pages
      };
      const pagesId = this.nextObjectId();
      pdf.body[pagesId] = {
        type: "pages",
        kids: [],
        count: 0
      };
      pdf.body[catalogId].pages = pagesId;
      if (includeMetadata && ((_a = ir.document) == null ? void 0 : _a.metadata)) {
        const metaId = this.nextObjectId();
        pdf.body[metaId] = {
          type: "metadata",
          data: ir.document.metadata
        };
      }
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        const pageNum = parseInt(pageId.replace("page_", ""));
        const newPageId = this.nextObjectId();
        const pageObj = {
          type: "page",
          parent: pagesId,
          mediaBox: pageData.mediaBox || [0, 0, 612, 792],
          // Letter size default
          cropBox: pageData.cropBox || null,
          rotate: pageData.rotation || 0,
          resources: {},
          contents: [],
          annotations: []
        };
        pageObj.resources = this.buildPageResources(pageData, ir);
        const contentId = this.nextObjectId();
        const contentStream = this.buildContentStream(pageData, ir, level);
        pdf.body[contentId] = {
          type: "stream",
          data: contentStream,
          length: contentStream.length
        };
        pageObj.contents.push(contentId);
        if (pageData.annotations && level >= 1) {
          for (const ann of pageData.annotations) {
            const annId = this.nextObjectId();
            pdf.body[annId] = {
              type: "annotation",
              data: ann
            };
            pageObj.annotations.push(annId);
          }
        }
        if (includeStructure && ((_b = ir.structure) == null ? void 0 : _b[pageId]) && level >= 2) {
          const structId = this.nextObjectId();
          pdf.body[structId] = {
            type: "struct_tree",
            data: ir.structure[pageId]
          };
          pageObj.structParents = structId;
        }
        pdf.body[newPageId] = pageObj;
        pagesId.kids.push(newPageId);
        this.pages.push(newPageId);
      }
      pagesId.count = this.pages.length;
      pdf.trailer = {
        root: catalogId,
        info: null,
        size: this.currentObject
      };
      return this.serializePDF(pdf);
    }
    /**
     * Build page resources dictionary.
     */
    buildPageResources(pageData, ir) {
      var _a;
      const resources = {
        font: {},
        xObject: {},
        pattern: {},
        colorSpace: {},
        extGState: {}
      };
      const fonts = /* @__PURE__ */ new Set();
      const pageObjects2 = (pageData.content || []).map((id) => {
        var _a2;
        return (_a2 = ir.objects) == null ? void 0 : _a2[id];
      }).filter(Boolean);
      for (const obj of pageObjects2) {
        if ((_a = obj.raw) == null ? void 0 : _a.font) {
          fonts.add(obj.raw.font);
        }
      }
      let fontIndex = 0;
      for (const fontName of fonts) {
        const fontRef = `F${fontIndex++}`;
        resources.font[fontRef] = {
          type: fontName.includes("Bold") ? "Font" : "Font",
          baseFont: fontName,
          encoding: "WinAnsiEncoding"
        };
      }
      return resources;
    }
    /**
     * Build content stream for a page.
     */
    buildContentStream(pageData, ir, level) {
      var _a, _b, _c, _d, _e;
      const commands = [];
      const objects = (pageData.content || []).map((id) => {
        var _a2;
        return (_a2 = ir.objects) == null ? void 0 : _a2[id];
      }).filter(Boolean);
      const sortedObjects = level >= 2 ? this.sortByReadingOrder(objects, pageData) : objects;
      for (const obj of sortedObjects) {
        if (obj.type === "text" && ((_a = obj.raw) == null ? void 0 : _a.text)) {
          const text = obj.raw.text;
          const fontSize = obj.raw.fontSize || 12;
          const x = ((_b = obj.bbox) == null ? void 0 : _b[0]) || 0;
          const y = ((_c = obj.bbox) == null ? void 0 : _c[1]) || 0;
          const fontRef = this.findFontRef(obj.raw.font, pageData, ir);
          commands.push(`q`);
          if (level >= 3 && obj.raw.transform) {
            const t = obj.raw.transform;
            commands.push(`${t[0]} ${t[1]} ${t[2]} ${t[3]} ${t[4]} ${t[5]} cm`);
          }
          commands.push(`/${fontRef} ${fontSize} Tf`);
          if ((_d = obj.semantic) == null ? void 0 : _d.color) {
            const c = obj.semantic.color;
            commands.push(`${c[0]} ${c[1]} ${c[2]} rg`);
          }
          commands.push(`${x} ${y} Td`);
          commands.push(`(${this.escapePDFString(text)}) Tj`);
          commands.push(`Q`);
        }
      }
      if (level >= 3) {
        for (const vecId of pageData.vectors || []) {
          const vec = (_e = ir.vectors) == null ? void 0 : _e[vecId];
          if (vec) {
            this.addVectorCommands(commands, vec);
          }
        }
      }
      return commands.join("\n");
    }
    /**
     * Sort objects by reading order.
     */
    sortByReadingOrder(objects, pageData) {
      return [...objects].sort((a, b) => {
        var _a, _b, _c, _d;
        const ay = ((_a = a.bbox) == null ? void 0 : _a[1]) || 0;
        const by = ((_b = b.bbox) == null ? void 0 : _b[1]) || 0;
        if (Math.abs(ay - by) > 10) return ay - by;
        return (((_c = a.bbox) == null ? void 0 : _c[0]) || 0) - (((_d = b.bbox) == null ? void 0 : _d[0]) || 0);
      });
    }
    /**
     * Find font reference for a font name.
     */
    findFontRef(fontName, pageData, ir) {
      return "F0";
    }
    /**
     * Add vector drawing commands.
     */
    addVectorCommands(commands, vec) {
      var _a, _b, _c, _d, _e;
      if (!vec.points || vec.points.length === 0) return;
      commands.push("q");
      if ((_b = (_a = vec.graphicsState) == null ? void 0 : _a.stroke) == null ? void 0 : _b.color) {
        const c = vec.graphicsState.stroke.color;
        commands.push(`${c[0]} ${c[1]} ${c[2]} RG`);
      }
      if ((_d = (_c = vec.graphicsState) == null ? void 0 : _c.fill) == null ? void 0 : _d.color) {
        const c = vec.graphicsState.fill.color;
        commands.push(`${c[0]} ${c[1]} ${c[2]} rg`);
      }
      if ((_e = vec.graphicsState) == null ? void 0 : _e.lineWidth) {
        commands.push(`${vec.graphicsState.lineWidth} w`);
      }
      const firstPoint = vec.points[0];
      commands.push(`${firstPoint.x} ${firstPoint.y} m`);
      for (let i = 1; i < vec.points.length; i++) {
        const pt = vec.points[i];
        if (pt.op === "moveTo") {
          commands.push(`${pt.x} ${pt.y} m`);
        } else if (pt.op === "lineTo") {
          commands.push(`${pt.x} ${pt.y} l`);
        } else if (pt.op === "curveTo") {
          commands.push(`${pt.x1} ${pt.y1} ${pt.x2} ${pt.y2} ${pt.x} ${pt.y} c`);
        }
      }
      if (vec.type === "path") {
        commands.push("S");
      } else if (vec.type === "rect") {
        commands.push("B");
      }
      commands.push("Q");
    }
    /**
     * Escape string for PDF content stream.
     */
    escapePDFString(str) {
      return str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    }
    /**
     * Generate next object ID.
     */
    nextObjectId() {
      return this.currentObject++;
    }
    /**
     * Serialize PDF to bytes.
     */
    serializePDF(pdf) {
      const encoder = new TextEncoder();
      const parts = [];
      parts.push(encoder.encode(pdf.header + "\n"));
      for (const [id, obj] of Object.entries(pdf.body)) {
        const objStr = this.serializeObject(parseInt(id), obj);
        parts.push(encoder.encode(objStr));
      }
      const xrefOffset = parts.reduce((sum, p) => sum + p.length, 0);
      parts.push(encoder.encode("xref\n"));
      parts.push(encoder.encode(`0 ${this.currentObject}
`));
      parts.push(encoder.encode("0000000000 65535 f \n"));
      for (let i = 1; i < this.currentObject; i++) {
        parts.push(encoder.encode(`${String(xrefOffset).padStart(10, "0")} 00000 n 
`));
      }
      parts.push(encoder.encode("trailer\n"));
      parts.push(encoder.encode(`<< /Size ${this.currentObject} /Root ${pdf.trailer.root} >>
`));
      parts.push(encoder.encode("startxref\n"));
      parts.push(encoder.encode(`${xrefOffset}
`));
      parts.push(encoder.encode("%%EOF\n"));
      const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const part of parts) {
        result.set(part, offset);
        offset += part.length;
      }
      return result;
    }
    /**
     * Serialize a single PDF object.
     */
    serializeObject(id, obj) {
      var _a, _b;
      let str = `${id} 0 obj
`;
      switch (obj.type) {
        case "catalog":
          str += `<< /Type /Catalog /Pages ${obj.pages} 0 R >>
`;
          break;
        case "pages":
          str += `<< /Type /Pages /Kids [${obj.kids.map((k) => `${k} 0 R`).join(" ")}] /Count ${obj.count} >>
`;
          break;
        case "page":
          str += `<< /Type /Page /Parent ${obj.parent} 0 R`;
          str += ` /MediaBox [${(obj.mediaBox || [0, 0, 612, 792]).join(" ")}]`;
          if (obj.rotate) str += ` /Rotate ${obj.rotate}`;
          if ((_a = obj.contents) == null ? void 0 : _a.length) {
            str += ` /Contents [${obj.contents.map((c) => `${c} 0 R`).join(" ")}]`;
          }
          if ((_b = obj.annotations) == null ? void 0 : _b.length) {
            str += ` /Annots [${obj.annotations.map((a) => `${a} 0 R`).join(" ")}]`;
          }
          str += " >>\n";
          break;
        case "stream":
          str += `<< /Length ${obj.length} >>
`;
          str += "stream\n";
          str += obj.data + "\n";
          str += "endstream\n";
          break;
        case "annotation":
          const ann = obj.data;
          str += `<< /Type /Annot /Subtype /${ann.subtype || "Text"}`;
          if (ann.rect) str += ` /Rect [${ann.rect.join(" ")}]`;
          if (ann.contents) str += ` /Contents (${this.escapePDFString(ann.contents)})`;
          str += " >>\n";
          break;
        case "metadata":
          str += `<< /Type /Metadata /Subtype /XML >>
`;
          str += "stream\n";
          str += '<?xml version="1.0" encoding="UTF-8"?>\n';
          str += '<x:xmpmeta xmlns:x="adobe:ns:meta/">\n';
          str += '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n';
          if (obj.data.title) {
            str += `<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
`;
            str += `<dc:title>${this.escapePDFString(obj.data.title)}</dc:title>
`;
            str += "</rdf:Description>\n";
          }
          str += "</rdf:RDF>\n";
          str += "</x:xmpmeta>\n";
          str += "endstream\n";
          break;
        default:
          str += "<< >>\n";
      }
      str += "endobj\n\n";
      return str;
    }
  };
  async function createPDF(ir, options = {}) {
    const creator = new PDFCreator();
    return creator.create(ir, options);
  }
  async function createTextPDF(pages, options = {}) {
    const ir = {
      document: { metadata: options.metadata || {} },
      pages: {},
      objects: {},
      structure: {},
      annotations: {}
    };
    for (let i = 0; i < pages.length; i++) {
      const pageId = `page_${i + 1}`;
      ir.pages[pageId] = {
        id: pageId,
        num: i + 1,
        width: 612,
        height: 792,
        rotation: 0,
        mediaBox: [0, 0, 612, 792],
        content: [],
        vectors: [],
        images: [],
        annotations: []
      };
      const text = typeof pages[i] === "string" ? pages[i] : pages[i].text || "";
      const lines = text.split("\n");
      for (let j = 0; j < lines.length; j++) {
        const objId = `text_${i}_${j}`;
        ir.objects[objId] = {
          id: objId,
          type: "text",
          page: pageId,
          raw: {
            text: lines[j],
            font: "Helvetica",
            fontSize: 12,
            transform: [12, 0, 0, 12, 72, 720 - j * 14]
          },
          semantic: {
            role: "paragraph",
            text: lines[j]
          },
          bbox: [72, 720 - j * 14, lines[j].length * 7, 12]
        };
        ir.pages[pageId].content.push(objId);
      }
    }
    return createPDF(ir, options);
  }

  // packages/core/src/advanced.js
  var SignatureSubFilter = {
    ADOBE_PKCS7_S4: "adbe.pkcs7.sha1",
    ADOBE_PKCS7_DETACHED: "adbe.pkcs7.detached",
    ADOBE_X509_RSA_SHA1: "adbe.x509.rsa_sha1",
    ETSI_CADES_DETACHED: "ETSI.CAdES.detached"
  };
  async function extractSignatures(page, doc) {
    const signatures = [];
    try {
      const annotations = await page.getAnnotations();
      for (const ann of annotations) {
        if (ann.subtype === "Widget" && ann.fieldType === "Sig") {
          const sig = {
            id: ann.fieldName || ann.id,
            type: "signature",
            subtype: ann.subtype,
            fieldName: ann.fieldName,
            rect: ann.rect,
            timestamp: ann.M || null,
            reason: ann.Reason || null,
            location: ann.Location || null,
            contactInfo: ann.ContactInfo || null,
            subFilter: ann.SubFilter || null,
            filter: ann.Filter || null,
            byteRange: ann.ByteRange || null,
            contents: ann.Contents ? this.decodeHex(ann.Contents) : null,
            cert: ann.Cert || null,
            reference: ann.Reference || [],
            lockDictionary: null,
            unseenChanges: null,
            hashAlgorithm: this.inferHashAlgorithm(ann.SubFilter),
            signatureValid: null,
            // Would need crypto library to verify
            signerName: null,
            signingTime: ann.M || null,
            documentIntegrity: null
          };
          if (ann.ByteRange && ann.Contents) {
            sig.signedData = {
              hasByteRange: true,
              byteRangeLength: ann.ByteRange.length,
              contentLength: ann.Contents ? ann.Contents.length / 2 : 0
            };
          }
          signatures.push(sig);
        }
      }
    } catch (e) {
      console.error("[codbdocs] Signature extraction error:", e);
    }
    return signatures;
  }
  function buildSignatureSummary(signatures) {
    return {
      count: signatures.length,
      hasSignatures: signatures.length > 0,
      signed: signatures.filter((s) => s.subFilter === SignatureSubFilter.ADOBE_PKCS7_DETACHED).length,
      certifications: signatures.filter((s) => {
        var _a;
        return (_a = s.reason) == null ? void 0 : _a.toLowerCase().includes("certified");
      }).length,
      algorithms: [...new Set(signatures.map((s) => s.hashAlgorithm))],
      signers: signatures.map((s) => ({
        name: s.signerName || s.fieldName,
        time: s.signingTime,
        reason: s.reason
      }))
    };
  }
  async function extractOCGs(doc) {
    var _a, _b, _c;
    const ocgs = [];
    try {
      const docObj = await ((_c = (_b = (_a = doc._pdf) == null ? void 0 : _a.catalog) == null ? void 0 : _b.objRef) == null ? void 0 : _c.fetch());
      if (!docObj) return ocgs;
      const ocProps = await docObj.get("OCProperties");
      if (!ocProps) return ocgs;
      const ocDict = await ocProps.fetch();
      if (!ocDict) return ocgs;
      const ocgArray = await ocDict.get("OCGs");
      if (!ocgArray) return ocgs;
      const ocgsObj = await ocgArray.fetch();
      if (!ocgsObj) return ocgs;
      for (const ref of ocgsObj) {
        try {
          const ocgDict = await ref.fetch();
          if (!ocgDict) continue;
          const name = await ocgDict.get("Name");
          const intent = await ocgDict.get("Intent");
          const usage = await ocgDict.get("Usage");
          ocgs.push({
            id: ref.toString(),
            name: (name == null ? void 0 : name.value) || "Unnamed OCG",
            intent: (intent == null ? void 0 : intent.value) || "View",
            usage: usage ? {
              print: await extractOCGUsage(usage, "Print"),
              view: await extractOCGUsage(usage, "View"),
              export: await extractOCGUsage(usage, "Export")
            } : null,
            visible: true
            // Default visible
          });
        } catch (e) {
        }
      }
      const config2 = await ocDict.get("D");
      if (config2) {
        const configDict = await config2.fetch();
        if (configDict) {
          const order = await configDict.get("Order");
        }
      }
    } catch (e) {
      console.error("[codbdocs] OCG extraction error:", e);
    }
    return ocgs;
  }
  async function extractOCGUsage(usageDict, key) {
    try {
      const usage = await usageDict.get(key);
      if (!usage) return null;
      const dict = await usage.fetch();
      if (!dict) return null;
      const outputIntents = await dict.get("OutputIntents");
      const category = await dict.get("Category");
      return {
        category: (category == null ? void 0 : category.value) || null,
        outputIntents: (outputIntents == null ? void 0 : outputIntents.value) || []
      };
    } catch {
      return null;
    }
  }
  function buildOCGSummary(ocgs) {
    return {
      count: ocgs.length,
      hasLayers: ocgs.length > 0,
      layerNames: ocgs.map((o) => o.name),
      intents: [...new Set(ocgs.map((o) => o.intent))],
      printableLayers: ocgs.filter((o) => {
        var _a, _b;
        return ((_b = (_a = o.usage) == null ? void 0 : _a.print) == null ? void 0 : _b.category) !== "OFF";
      }).length,
      viewableLayers: ocgs.filter((o) => {
        var _a, _b;
        return ((_b = (_a = o.usage) == null ? void 0 : _a.view) == null ? void 0 : _b.category) !== "OFF";
      }).length
    };
  }
  async function extractEmbeddedFiles(doc) {
    var _a, _b, _c;
    const files = [];
    try {
      const docObj = await ((_c = (_b = (_a = doc._pdf) == null ? void 0 : _a.catalog) == null ? void 0 : _b.objRef) == null ? void 0 : _c.fetch());
      if (!docObj) return files;
      const names = await docObj.get("Names");
      if (!names) return files;
      const namesDict = await names.fetch();
      if (!namesDict) return files;
      const embeddedFiles = await namesDict.get("EmbeddedFiles");
      if (!embeddedFiles) return files;
      const efDict = await embeddedFiles.fetch();
      if (!efDict) return files;
      const namesArray = await efDict.get("Names");
      if (!namesArray) return files;
      const nameTree = await namesArray.fetch();
      if (!nameTree) return files;
      for (let i = 0; i < nameTree.length; i++) {
        try {
          const nameObj = await nameTree[i].fetch();
          if (!nameObj) continue;
          const fileSpec = await nameObj.get("F");
          const efRef = await nameObj.get("EF");
          if (fileSpec && efRef) {
            const fileSpecDict = await fileSpec.fetch();
            const efDict2 = await efRef.fetch();
            const fileName = await fileSpecDict.get("F");
            const description = await fileSpecDict.get("Desc");
            const mimeType = await fileSpecDict.get("Type");
            const size = await efDict2.get("Size");
            const creationDate = await efDict2.get("CreationDate");
            const modDate = await efDict2.get("ModDate");
            files.push({
              id: efRef.toString(),
              name: (fileName == null ? void 0 : fileName.value) || `file_${files.length}`,
              description: (description == null ? void 0 : description.value) || null,
              mimeType: (mimeType == null ? void 0 : mimeType.value) || "application/octet-stream",
              size: (size == null ? void 0 : size.value) || 0,
              creationDate: (creationDate == null ? void 0 : creationDate.value) || null,
              modDate: (modDate == null ? void 0 : modDate.value) || null,
              // Raw data not extracted by default (could be large)
              hasData: true
            });
          }
        } catch (e) {
        }
      }
    } catch (e) {
      console.error("[codbdocs] Embedded file extraction error:", e);
    }
    return files;
  }
  function buildEmbeddedFilesSummary(files) {
    const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
    const byType = {};
    for (const f of files) {
      const ext = f.name.split(".").pop().toLowerCase();
      byType[ext] = (byType[ext] || 0) + 1;
    }
    return {
      count: files.length,
      hasEmbeddedFiles: files.length > 0,
      totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      byType,
      files: files.map((f) => ({
        name: f.name,
        size: f.size,
        sizeFormatted: formatBytes(f.size || 0),
        mimeType: f.mimeType
      }))
    };
  }
  function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  async function extractActions(doc) {
    var _a, _b, _c;
    const actions = [];
    try {
      const docObj = await ((_c = (_b = (_a = doc._pdf) == null ? void 0 : _a.catalog) == null ? void 0 : _b.objRef) == null ? void 0 : _c.fetch());
      if (!docObj) return actions;
      const openAction = await docObj.get("OpenAction");
      if (openAction) {
        actions.push({
          type: "Document",
          trigger: "OpenAction",
          action: await parseAction(openAction)
        });
      }
      const pageLabels = await docObj.get("PageLabels");
      const pagesRef = await docObj.get("Pages");
      if (pagesRef) {
        const pages = await pagesRef.fetch();
        await extractPageActions(pages, actions, 0);
      }
    } catch (e) {
      console.error("[codbdocs] Actions extraction error:", e);
    }
    return actions;
  }
  async function extractPageActions(pagesDict, actions, depth) {
    var _a;
    if (depth > 10) return;
    try {
      const kids = await pagesDict.get("Kids");
      if (!kids) return;
      const kidsArray = await kids.fetch();
      if (!kidsArray) return;
      for (const kidRef of kidsArray) {
        try {
          const kid = await kidRef.fetch();
          if (!kid) continue;
          const type = await kid.get("Type");
          const typeName = type == null ? void 0 : type.value;
          if (typeName === "Pages") {
            await extractPageActions(kid, actions, depth + 1);
          } else if (typeName === "Page") {
            const pageNum = await kid.get("StructParents") || actions.filter((a) => a.type === "Page").length + 1;
            const actionsEntry = await kid.get("AA");
            if (actionsEntry) {
              const aaDict = await actionsEntry.fetch();
              if (aaDict) {
                for (const [trigger, actionRef] of Object.entries(aaDict)) {
                  actions.push({
                    type: "Page",
                    page: pageNum,
                    trigger,
                    action: await parseAction(actionRef)
                  });
                }
              }
            }
            const annots = await kid.get("Annots");
            if (annots) {
              const annotsArray = await annots.fetch();
              if (annotsArray) {
                for (const annotRef of annotsArray) {
                  const annot = await annotRef.fetch();
                  if (!annot) continue;
                  const a = await annot.get("A");
                  if (a) {
                    actions.push({
                      type: "Annotation",
                      page: pageNum,
                      fieldName: (_a = await annot.get("T")) == null ? void 0 : _a.value,
                      trigger: "click",
                      action: await parseAction(a)
                    });
                  }
                }
              }
            }
          }
        } catch (e) {
        }
      }
    } catch (e) {
      console.error("[codbdocs] Page actions extraction error:", e);
    }
  }
  async function parseAction(actionRef) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    if (!actionRef) return null;
    try {
      const actionDict = await ((_a = actionRef.fetch) == null ? void 0 : _a.call(actionRef)) || actionRef;
      if (!actionDict) return null;
      const s = await actionDict.get("S");
      const actionType = (s == null ? void 0 : s.value) || "Unknown";
      const result = {
        type: actionType
      };
      switch (actionType) {
        case "GoTo":
          const dest = await actionDict.get("D");
          result.destination = (dest == null ? void 0 : dest.value) || dest;
          break;
        case "GoToR":
          result.file = (_b = await actionDict.get("F")) == null ? void 0 : _b.value;
          result.destination = (_c = await actionDict.get("D")) == null ? void 0 : _c.value;
          break;
        case "Launch":
          result.file = (_d = await actionDict.get("F")) == null ? void 0 : _d.value;
          result.operation = (_e = await actionDict.get("Win")) == null ? void 0 : _e.value;
          break;
        case "JavaScript":
          result.script = (_f = await actionDict.get("JS")) == null ? void 0 : _f.value;
          break;
        case "Named":
          result.name = (_g = await actionDict.get("N")) == null ? void 0 : _g.value;
          break;
        case "SetOCGState":
          const state = await actionDict.get("State");
          result.state = state == null ? void 0 : state.value;
          break;
        case "SubmitForm":
          result.url = (_h = await actionDict.get("F")) == null ? void 0 : _h.value;
          result.fields = (_i = await actionDict.get("Fields")) == null ? void 0 : _i.value;
          break;
        case "ResetForm":
          result.fields = (_j = await actionDict.get("Fields")) == null ? void 0 : _j.value;
          break;
        case "Hide":
          result.targets = (_k = await actionDict.get("T")) == null ? void 0 : _k.value;
          result.hidden = (_l = await actionDict.get("H")) == null ? void 0 : _l.value;
          break;
        case "Sound":
        case "Movie":
          result.sound = (_m = await actionDict.get("S")) == null ? void 0 : _m.value;
          break;
        case "Rendition":
          result.action = (_n = await actionDict.get("AN")) == null ? void 0 : _n.value;
          break;
        case "Trans":
          result.trans = (_o = await actionDict.get("Trans")) == null ? void 0 : _o.value;
          break;
      }
      return result;
    } catch (e) {
      return { type: "Unknown", error: e.message };
    }
  }
  function buildActionsSummary(actions) {
    var _a;
    const byType = {};
    for (const a of actions) {
      const type = ((_a = a.action) == null ? void 0 : _a.type) || "Unknown";
      byType[type] = (byType[type] || 0) + 1;
    }
    return {
      count: actions.length,
      hasActions: actions.length > 0,
      byType,
      hasJavaScript: actions.some((a) => {
        var _a2;
        return ((_a2 = a.action) == null ? void 0 : _a2.type) === "JavaScript";
      }),
      hasNavigation: actions.some((a) => {
        var _a2;
        return ["GoTo", "GoToR", "GoToE"].includes((_a2 = a.action) == null ? void 0 : _a2.type);
      }),
      hasFormActions: actions.some((a) => {
        var _a2;
        return ["SubmitForm", "ResetForm", "ImportData"].includes((_a2 = a.action) == null ? void 0 : _a2.type);
      }),
      documentActions: actions.filter((a) => a.type === "Document"),
      pageActions: actions.filter((a) => a.type === "Page"),
      annotationActions: actions.filter((a) => a.type === "Annotation")
    };
  }
  async function extractAppearanceStreams(page) {
    var _a, _b, _c, _d;
    const appearances = [];
    try {
      const annotations = await page.getAnnotations();
      for (const ann of annotations) {
        if (ann.appearance) {
          const appearance = {
            id: ann.id,
            fieldName: ann.fieldName,
            type: ann.subtype,
            appearances: {
              normal: ((_a = ann.appearance) == null ? void 0 : _a.N) ? await extractAppearanceDict(ann.appearance.N) : null,
              rollover: ((_b = ann.appearance) == null ? void 0 : _b.R) ? await extractAppearanceDict(ann.appearance.R) : null,
              down: ((_c = ann.appearance) == null ? void 0 : _c.D) ? await extractAppearanceDict(ann.appearance.D) : null
            },
            currentAppearance: ((_d = ann.appearance) == null ? void 0 : _d.N) ? "normal" : null
          };
          appearances.push(appearance);
        }
      }
    } catch (e) {
      console.error("[codbdocs] Appearance stream extraction error:", e);
    }
    return appearances;
  }
  async function extractAppearanceDict(appearRef) {
    var _a, _b, _c;
    try {
      const dict = await ((_a = appearRef.fetch) == null ? void 0 : _a.call(appearRef)) || appearRef;
      if (!dict) return null;
      if (dict.getBytes) {
        return {
          type: "single",
          hasData: true,
          size: ((_c = (_b = dict.dict) == null ? void 0 : _b.get("Length")) == null ? void 0 : _c.value) || 0
        };
      }
      const result = {
        type: "dictionary",
        states: {}
      };
      for (const [key, value] of Object.entries(dict)) {
        if (key.startsWith("/")) {
          result.states[key.slice(1)] = {
            hasData: true
          };
        }
      }
      return result;
    } catch {
      return null;
    }
  }
  function buildAppearanceStreamsSummary(appearances) {
    const withNormal = appearances.filter((a) => a.appearances.normal).length;
    const withRollover = appearances.filter((a) => a.appearances.rollover).length;
    const withDown = appearances.filter((a) => a.appearances.down).length;
    return {
      count: appearances.length,
      hasAppearanceStreams: appearances.length > 0,
      withNormalAppearance: withNormal,
      withRolloverAppearance: withRollover,
      withDownAppearance: withDown,
      types: [...new Set(appearances.map((a) => a.type))]
    };
  }
  function trackXObjectReuse(ir) {
    var _a, _b, _c, _d;
    const xobjects = {};
    const usageMap = {};
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      const pageNum = parseInt(pageId.replace("page_", ""));
      for (const vecId of pageData.vectors || []) {
        const vec = (_a = ir.vectors) == null ? void 0 : _a[vecId];
        if ((_b = vec == null ? void 0 : vec.raw) == null ? void 0 : _b.xObject) {
          const xobjId = vec.raw.xObject;
          if (!xobjects[xobjId]) {
            xobjects[xobjId] = {
              id: xobjId,
              type: vec.raw.xObjectType || "unknown",
              pages: [],
              usageCount: 0
            };
          }
          xobjects[xobjId].pages.push(pageNum);
          xobjects[xobjId].usageCount++;
        }
      }
      for (const textId of pageData.content || []) {
        const text = (_c = ir.objects) == null ? void 0 : _c[textId];
        if ((_d = text == null ? void 0 : text.raw) == null ? void 0 : _d.xObject) {
          const xobjId = text.raw.xObject;
          if (!xobjects[xobjId]) {
            xobjects[xobjId] = {
              id: xobjId,
              type: text.raw.xObjectType || "unknown",
              pages: [],
              usageCount: 0
            };
          }
          xobjects[xobjId].pages.push(pageNum);
          xobjects[xobjId].usageCount++;
        }
      }
    }
    const values = Object.values(xobjects);
    const reused = values.filter((x) => x.usageCount > 1);
    const unique = values.filter((x) => x.usageCount === 1);
    return {
      total: values.length,
      reusedCount: reused.length,
      uniqueCount: unique.length,
      reuseRatio: values.length > 0 ? reused.length / values.length : 0,
      xobjects: values,
      byType: values.reduce((acc, x) => {
        acc[x.type] = (acc[x.type] || 0) + 1;
        return acc;
      }, {}),
      reusedXObjects: reused.map((x) => ({
        id: x.id,
        type: x.type,
        usageCount: x.usageCount,
        pages: x.pages
      }))
    };
  }
  function buildXObjectSummary(reuseInfo) {
    return {
      totalXObjects: reuseInfo.total,
      reusedXObjects: reuseInfo.reusedCount,
      uniqueXObjects: reuseInfo.uniqueCount,
      reuseRatio: (reuseInfo.reuseRatio * 100).toFixed(1) + "%",
      mostUsed: reuseInfo.xobjects.sort((a, b) => b.usageCount - a.usageCount).slice(0, 5).map((x) => ({
        id: x.id,
        type: x.type,
        usageCount: x.usageCount
      }))
    };
  }
  async function extractRevisions(doc) {
    const revisions = [];
    try {
      const pdf = doc._pdf;
      if (!pdf) return revisions;
      const meta = await pdf.getMetadata();
      const info = (meta == null ? void 0 : meta.info) || {};
      revisions.push({
        version: 1,
        type: "original",
        creationDate: info.CreationDate || null,
        modDate: info.ModDate || null,
        producer: info.Producer || null,
        creator: info.Creator || null
      });
      const trailer = pdf.trailer;
      if (trailer == null ? void 0 : trailer.Prev) {
        revisions.push({
          version: 2,
          type: "incremental",
          xrefOffset: trailer.Prev
        });
      }
    } catch (e) {
      console.error("[codbdocs] Revision extraction error:", e);
    }
    return revisions;
  }
  function buildRevisionsSummary(revisions) {
    return {
      count: revisions.length,
      hasMultipleRevisions: revisions.length > 1,
      versions: revisions.map((r) => ({
        version: r.version,
        type: r.type,
        creationDate: r.creationDate,
        modDate: r.modDate
      })),
      producers: [...new Set(revisions.map((r) => r.producer).filter(Boolean))],
      creators: [...new Set(revisions.map((r) => r.creator).filter(Boolean))]
    };
  }

  // packages/core/src/quality.js
  function analyzeTextQuality(pageData, contentItems, pageSize) {
    const issues = [];
    let score = 1;
    const invisibleText = contentItems.filter((item) => {
      var _a, _b;
      const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
      const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
      return x < 0 || x > pageSize.width || y < 0 || y > pageSize.height;
    });
    if (invisibleText.length > 0) {
      issues.push({
        type: "invisible_text",
        severity: "warning",
        count: invisibleText.length,
        description: "Text objects found outside page bounds"
      });
      score -= 0.1 * Math.min(invisibleText.length / 10, 0.3);
    }
    const suspiciousText = contentItems.filter((item) => {
      const text = item.str || "";
      return /[^\x00-\x7F]{3,}/.test(text) || // Multiple non-ASCII
      /\s{5,}/.test(text) || // Excessive whitespace
      /[|\\\/]{3,}/.test(text);
    });
    if (suspiciousText.length > 0) {
      issues.push({
        type: "suspicious_unicode",
        severity: "warning",
        count: suspiciousText.length,
        description: "Text contains suspicious Unicode patterns"
      });
      score -= 0.1 * Math.min(suspiciousText.length / 5, 0.3);
    }
    const allText = contentItems.map((i) => i.str || "").join("");
    const charDist = analyzeCharacterDistribution(allText);
    if (charDist.suspicious) {
      issues.push({
        type: "abnormal_char_distribution",
        severity: "info",
        description: charDist.reason
      });
      score -= 0.1;
    }
    const words = allText.split(/\s+/).filter((w) => w.length > 0);
    const gibberishWords = words.filter((w) => isGibberish(w));
    if (gibberishWords.length > words.length * 0.1) {
      issues.push({
        type: "poor_word_formation",
        severity: "warning",
        gibberishRatio: gibberishWords.length / words.length,
        description: `${gibberishWords.length} of ${words.length} words appear to be gibberish`
      });
      score -= 0.2;
    }
    const textFragments = contentItems.map((i) => (i.str || "").trim()).filter((t) => t.length > 5);
    const duplicates = findDuplicates(textFragments);
    if (duplicates.length > 0) {
      issues.push({
        type: "duplicate_text",
        severity: "warning",
        count: duplicates.length,
        samples: duplicates.slice(0, 3),
        description: "Duplicate text fragments detected"
      });
      score -= 0.1 * Math.min(duplicates.length / 5, 0.2);
    }
    const hyphenated = contentItems.filter((item) => {
      const text = item.str || "";
      return /\w-$/.test(text);
    });
    if (hyphenated.length > 0) {
      issues.push({
        type: "hyphenation",
        severity: "info",
        count: hyphenated.length,
        description: "Potential hyphenated words found"
      });
    }
    const ligatures = allText.match(/[ﬁﬂﬃﬄ]/g) || [];
    if (ligatures.length > 0) {
      issues.push({
        type: "ligatures",
        severity: "info",
        count: ligatures.length,
        description: "Ligature characters found that may cause search issues"
      });
      score -= 0.05;
    }
    const clippedText = contentItems.filter((item) => {
      var _a, _b;
      const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
      const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
      const w = item.width || 0;
      const h = item.height || 0;
      return x + w > pageSize.width + 10 || y + h > pageSize.height + 10;
    });
    if (clippedText.length > 0) {
      issues.push({
        type: "clipped_text",
        severity: "info",
        count: clippedText.length,
        description: "Text objects may be clipped at page boundaries"
      });
    }
    return {
      score: Math.max(0, Math.min(1, score)),
      issues,
      summary: {
        invisibleText: invisibleText.length,
        suspiciousUnicode: suspiciousText.length,
        duplicates: duplicates.length,
        hyphenated: hyphenated.length,
        ligatures: ligatures.length,
        clippedText: clippedText.length
      }
    };
  }
  function analyzeCharacterDistribution(text) {
    if (!text || text.length < 100) {
      return { suspicious: false };
    }
    const chars = text.split("");
    const freq = {};
    for (const c of chars) {
      freq[c] = (freq[c] || 0) + 1;
    }
    const nonAlpha = chars.filter((c) => !/[a-zA-Z0-9\s]/.test(c)).length;
    if (nonAlpha > chars.length * 0.3) {
      return { suspicious: true, reason: "Excessive non-alphanumeric characters" };
    }
    const uppercase = chars.filter((c) => /[A-Z]/.test(c)).length;
    const letters = chars.filter((c) => /[a-zA-Z]/.test(c)).length;
    if (letters > 100 && uppercase > letters * 0.8) {
      return { suspicious: true, reason: "Excessive uppercase characters" };
    }
    return { suspicious: false };
  }
  function isGibberish(word) {
    if (word.length < 3) return false;
    const consonantClusters = word.match(/[bcdfghjklmnpqrstvwxyz]{4,}/gi);
    if (consonantClusters && consonantClusters.length > 0) return true;
    const vowelClusters = word.match(/[aeiou]{4,}/gi);
    if (vowelClusters && vowelClusters.length > 0) return true;
    const pattern = word.toLowerCase();
    let alternating = true;
    for (let i = 2; i < pattern.length; i++) {
      const prev1IsVowel = "aeiou".includes(pattern[i - 1]);
      const prev2IsVowel = "aeiou".includes(pattern[i - 2]);
      const currIsVowel = "aeiou".includes(pattern[i]);
      if (prev1IsVowel === currIsVowel && prev2IsVowel === currIsVowel) {
        alternating = false;
        break;
      }
    }
    if (alternating && word.length > 6) return true;
    return false;
  }
  function findDuplicates(fragments) {
    const seen = /* @__PURE__ */ new Map();
    const duplicates = [];
    for (const frag of fragments) {
      const normalized = frag.toLowerCase().trim();
      if (seen.has(normalized)) {
        duplicates.push(frag);
      } else {
        seen.set(normalized, true);
      }
    }
    return duplicates;
  }
  function compareVisualInternal(pageData, visualRegions, contentItems) {
    var _a, _b;
    const discrepancies = [];
    const internalTextRegions = contentItems.filter((item) => item.str && item.str.trim().length > 0).map((item) => {
      var _a2, _b2;
      return {
        x: ((_a2 = item.transform) == null ? void 0 : _a2[4]) || 0,
        y: ((_b2 = item.transform) == null ? void 0 : _b2[5]) || 0,
        width: item.width || 0,
        height: item.height || 0,
        text: item.str
      };
    });
    const visualTextRegions = (visualRegions == null ? void 0 : visualRegions.textRegions) || [];
    for (const vRegion of visualTextRegions) {
      const matchingInternal = internalTextRegions.find(
        (iRegion) => Math.abs(iRegion.x - vRegion.x) < 10 && Math.abs(iRegion.y - vRegion.y) < 10
      );
      if (!matchingInternal) {
        discrepancies.push({
          type: "visual_text_not_in_internal",
          severity: "warning",
          bbox: vRegion,
          description: "Text visible on page but not in PDF text layer"
        });
      }
    }
    for (const iRegion of internalTextRegions) {
      const matchingVisual = visualTextRegions.find(
        (vRegion) => Math.abs(iRegion.x - vRegion.x) < 10 && Math.abs(iRegion.y - vRegion.y) < 10
      );
      if (!matchingVisual && iRegion.text.length > 3) {
        discrepancies.push({
          type: "internal_text_not_visible",
          severity: "warning",
          bbox: iRegion,
          text: iRegion.text,
          description: "Text in PDF layer but not visibly rendered"
        });
      }
    }
    const internalImageCount = ((_a = pageData.images) == null ? void 0 : _a.length) || 0;
    const visualImageCount = ((_b = visualRegions == null ? void 0 : visualRegions.imageRegions) == null ? void 0 : _b.length) || 0;
    if (Math.abs(internalImageCount - visualImageCount) > 0) {
      discrepancies.push({
        type: "image_count_mismatch",
        severity: "info",
        internal: internalImageCount,
        visual: visualImageCount,
        description: `Internal: ${internalImageCount} images, Visual: ${visualImageCount} images`
      });
    }
    const hiddenText = contentItems.filter((item) => {
      var _a2;
      const fontSize = Math.abs((_a2 = item.transform) == null ? void 0 : _a2[0]) || 12;
      return fontSize < 2 && item.str && item.str.trim().length > 0;
    });
    if (hiddenText.length > 0) {
      discrepancies.push({
        type: "hidden_text",
        severity: "warning",
        count: hiddenText.length,
        description: "Text with extremely small font size detected"
      });
    }
    return {
      discrepancies,
      score: Math.max(0, 1 - discrepancies.length * 0.1),
      summary: {
        internalTextRegions: internalTextRegions.length,
        visualTextRegions: visualTextRegions.length,
        internalImages: internalImageCount,
        visualImages: visualImageCount,
        hiddenText: hiddenText.length
      }
    };
  }
  function detectRepeatedElements(pageResults2, allContentItems) {
    var _a, _b, _c;
    const results = {
      watermarks: [],
      headers: [],
      footers: [],
      pageNumbers: []
    };
    const topElements = [];
    const bottomElements = [];
    const centerElements = [];
    for (const [pageId, content] of Object.entries(allContentItems)) {
      const pageHeight = ((_b = (_a = pageResults2[pageId]) == null ? void 0 : _a.pageSize) == null ? void 0 : _b.height) || 792;
      for (const item of content) {
        if (!item.str || item.str.trim().length === 0) continue;
        const y = ((_c = item.transform) == null ? void 0 : _c[5]) || 0;
        const normalizedY = y / pageHeight;
        if (normalizedY > 0.9) {
          topElements.push({ text: item.str.trim(), page: pageId, y });
        } else if (normalizedY < 0.1) {
          bottomElements.push({ text: item.str.trim(), page: pageId, y });
        } else if (normalizedY > 0.4 && normalizedY < 0.6) {
          centerElements.push({ text: item.str.trim(), page: pageId, y });
        }
      }
    }
    results.headers = findRepeatedPatterns(topElements);
    results.footers = findRepeatedPatterns(bottomElements);
    results.watermarks = findWatermarkPatterns(centerElements);
    results.pageNumbers = detectPageNumbers(bottomElements);
    return results;
  }
  function findRepeatedPatterns(elements) {
    const textCounts = {};
    for (const el of elements) {
      const normalized = el.text.toLowerCase().trim();
      if (normalized.length < 3) continue;
      textCounts[normalized] = (textCounts[normalized] || 0) + 1;
    }
    return Object.entries(textCounts).filter(([text, count]) => count >= 3).map(([text, count]) => ({
      text,
      count,
      type: "repeated_element"
    }));
  }
  function findWatermarkPatterns(elements) {
    const textCounts = {};
    for (const el of elements) {
      const normalized = el.text.toLowerCase().trim();
      if (normalized.length < 2) continue;
      textCounts[normalized] = (textCounts[normalized] || 0) + 1;
    }
    return Object.entries(textCounts).filter(([text, count]) => count >= 5).map(([text, count]) => ({
      text,
      count,
      type: "watermark"
    }));
  }
  function detectPageNumbers(elements) {
    const pageNumbers = [];
    const numberPattern = /^\d{1,4}$/;
    for (const el of elements) {
      if (numberPattern.test(el.text)) {
        pageNumbers.push({
          text: el.text,
          page: el.page,
          type: "page_number"
        });
      }
    }
    return pageNumbers;
  }
  function normalizeText(text) {
    if (!text) return text;
    let normalized = text;
    normalized = normalized.replace(/(\w)-\s*\n\s*(\w)/g, "$1$2");
    normalized = normalized.replace(/ﬁ/g, "fi").replace(/ﬂ/g, "fl").replace(/ﬃ/g, "ffi").replace(/ﬄ/g, "ffl");
    normalized = normalized.replace(/\s{3,}/g, "  ");
    normalized = normalized.replace(/\|/g, "l").replace(/0O/g, "0").replace(/l1/g, "l");
    return normalized;
  }
  function detectRedactions(vectors, contentItems) {
    const redactions = [];
    for (const vec of vectors) {
      if (vec.type === "rect" && vec.fillColor) {
        const [r, g, b] = vec.fillColor;
        if (r < 0.1 && g < 0.1 && b < 0.1) {
          const coveredText = contentItems.filter((item) => {
            var _a, _b;
            const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
            const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
            return x >= vec.bbox[0] && x <= vec.bbox[2] && y >= vec.bbox[1] && y <= vec.bbox[3];
          });
          if (coveredText.length > 0) {
            redactions.push({
              bbox: vec.bbox,
              coveredText: coveredText.map((t) => t.str),
              type: "redaction",
              severity: "critical"
            });
          }
        }
      }
    }
    return redactions;
  }
  function validateTags(pageData, structureTree, contentItems) {
    var _a;
    const issues = [];
    if (!structureTree) {
      issues.push({
        type: "missing_structure",
        severity: "warning",
        description: "No structure tree found for tagged PDF validation"
      });
      return { valid: false, issues };
    }
    const headings = extractHeadingsFromStructure(structureTree);
    for (const heading of headings) {
      const matchingText = contentItems.find(
        (item) => item.str && item.str.includes(heading.text)
      );
      if (matchingText) {
        const fontSize = Math.abs((_a = matchingText.transform) == null ? void 0 : _a[0]) || 12;
        if (fontSize < 14) {
          issues.push({
            type: "fake_heading",
            severity: "warning",
            text: heading.text,
            fontSize,
            description: "Tagged heading has small font size"
          });
        }
      }
    }
    const images = extractImagesFromStructure(structureTree);
    for (const img of images) {
      if (!img.alt && !img.description) {
        issues.push({
          type: "missing_alt_text",
          severity: "warning",
          element: img.id,
          description: "Image has no alt text"
        });
      }
    }
    const brokenTags = findBrokenTags(structureTree);
    if (brokenTags.length > 0) {
      issues.push({
        type: "broken_tags",
        severity: "error",
        count: brokenTags.length,
        description: "Structure tags have broken parent-child relationships"
      });
    }
    return {
      valid: issues.length === 0,
      issues
    };
  }
  function extractHeadingsFromStructure(tree, headings = []) {
    if (!tree) return headings;
    if (tree.type === "heading" || tree.type === "H1" || tree.type === "H2") {
      headings.push({
        type: tree.type,
        text: tree.text || "",
        id: tree.id
      });
    }
    if (tree.children) {
      for (const child of tree.children) {
        extractHeadingsFromStructure(child, headings);
      }
    }
    return headings;
  }
  function extractImagesFromStructure(tree, images = []) {
    if (!tree) return images;
    if (tree.type === "figure" || tree.type === "image") {
      images.push({
        id: tree.id,
        alt: tree.alt,
        description: tree.description
      });
    }
    if (tree.children) {
      for (const child of tree.children) {
        extractImagesFromStructure(child, images);
      }
    }
    return images;
  }
  function findBrokenTags(tree, broken = []) {
    if (!tree) return broken;
    if (tree.children) {
      for (const child of tree.children) {
        if (!child.type && !child.id) {
          broken.push({
            parentId: tree.id,
            child,
            reason: "Child has no type or id"
          });
        }
        findBrokenTags(child, broken);
      }
    }
    return broken;
  }
  function calculateRAGReadiness(pageResults2, textQuality, visualComparison, repeatedElements) {
    var _a, _b, _c;
    let score = 1;
    const factors = [];
    const avgTextQuality = pageResults2.reduce((sum, p) => {
      var _a2;
      return sum + (((_a2 = p.textQuality) == null ? void 0 : _a2.score) || 1);
    }, 0) / pageResults2.length;
    score *= avgTextQuality;
    factors.push({ factor: "text_quality", impact: avgTextQuality });
    const avgVisualAgreement = pageResults2.reduce((sum, p) => {
      var _a2;
      return sum + (((_a2 = p.visualComparison) == null ? void 0 : _a2.score) || 1);
    }, 0) / pageResults2.length;
    score *= avgVisualAgreement;
    factors.push({ factor: "visual_agreement", impact: avgVisualAgreement });
    const pagesWithStructure = pageResults2.filter((p) => p.hasStructureTree).length;
    const structureRatio = pagesWithStructure / pageResults2.length;
    score *= 0.5 + structureRatio * 0.5;
    factors.push({ factor: "structure_completeness", impact: structureRatio });
    const pagesWithReadingOrder = pageResults2.filter((p) => p.readingOrder > 0).length;
    const readingOrderRatio = pagesWithReadingOrder / pageResults2.length;
    score *= 0.5 + readingOrderRatio * 0.5;
    factors.push({ factor: "reading_order", impact: readingOrderRatio });
    const headerFooterCount = (((_a = repeatedElements.headers) == null ? void 0 : _a.length) || 0) + (((_b = repeatedElements.footers) == null ? void 0 : _b.length) || 0);
    if (headerFooterCount > 0) {
      score *= 0.9;
      factors.push({ factor: "header_footer_pollution", impact: 0.9 });
    }
    if (((_c = repeatedElements.watermarks) == null ? void 0 : _c.length) > 0) {
      score *= 0.95;
      factors.push({ factor: "watermarks", impact: 0.95 });
    }
    const totalDuplicates = pageResults2.reduce((sum, p) => {
      var _a2, _b2;
      return sum + (((_b2 = (_a2 = p.textQuality) == null ? void 0 : _a2.summary) == null ? void 0 : _b2.duplicates) || 0);
    }, 0);
    if (totalDuplicates > 0) {
      score *= 0.95;
      factors.push({ factor: "duplicate_text", impact: 0.95 });
    }
    return {
      score: Math.max(0, Math.min(1, score)),
      factors,
      recommendations: generateRecommendations(factors, pageResults2)
    };
  }
  function generateRecommendations(factors, pageResults2) {
    const recommendations = [];
    const textQuality = factors.find((f) => f.factor === "text_quality");
    if (textQuality && textQuality.impact < 0.8) {
      recommendations.push({
        type: "ocr",
        priority: "high",
        description: "Text quality is low. Consider enabling OCR or re-OCR with better settings."
      });
    }
    const visualAgreement = factors.find((f) => f.factor === "visual_agreement");
    if (visualAgreement && visualAgreement.impact < 0.8) {
      recommendations.push({
        type: "visual_analysis",
        priority: "medium",
        description: "Visual/internal agreement is low. Enable visual analysis to detect hidden text."
      });
    }
    const structure = factors.find((f) => f.factor === "structure_completeness");
    if (structure && structure.impact < 0.5) {
      recommendations.push({
        type: "structure",
        priority: "medium",
        description: "Document lacks structure. Consider using semantic chunking for better RAG."
      });
    }
    const readingOrder = factors.find((f) => f.factor === "reading_order");
    if (readingOrder && readingOrder.impact < 0.5) {
      recommendations.push({
        type: "reading_order",
        priority: "medium",
        description: "Reading order detection is poor. Enable spatial analysis for multi-column layouts."
      });
    }
    return recommendations;
  }
  function reconstructTable(vectors, textItems, bbox) {
    const table = {
      rows: [],
      cells: [],
      columns: [],
      mergedCells: []
    };
    const hLines = [];
    const vLines = [];
    for (const vec of vectors) {
      if (vec.type === "path" && vec.points) {
        for (let i = 1; i < vec.points.length; i++) {
          const p1 = vec.points[i - 1];
          const p2 = vec.points[i];
          if (Math.abs(p1.y - p2.y) < 2 && Math.abs(p1.x - p2.x) > 20) {
            hLines.push({ y: p1.y, x1: Math.min(p1.x, p2.x), x2: Math.max(p1.x, p2.x) });
          }
          if (Math.abs(p1.x - p2.x) < 2 && Math.abs(p1.y - p2.y) > 20) {
            vLines.push({ x: p1.x, y1: Math.min(p1.y, p2.y), y2: Math.max(p1.y, p2.y) });
          }
        }
      }
    }
    hLines.sort((a, b) => a.y - b.y);
    vLines.sort((a, b) => a.x - b.x);
    const rows = [];
    let lastY = null;
    for (const line of hLines) {
      if (lastY === null || Math.abs(line.y - lastY) > 5) {
        rows.push(line.y);
        lastY = line.y;
      }
    }
    const columns = [];
    lastY = null;
    for (const line of vLines) {
      if (lastY === null || Math.abs(line.x - lastY) > 5) {
        columns.push(line.x);
        lastY = line.x;
      }
    }
    table.rows = rows;
    table.columns = columns;
    for (let r = 0; r < rows.length - 1; r++) {
      for (let c = 0; c < columns.length - 1; c++) {
        const cellBbox = {
          x1: columns[c],
          y1: rows[r],
          x2: columns[c + 1],
          y2: rows[r + 1]
        };
        const cellText = textItems.filter((item) => {
          var _a, _b;
          const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
          const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
          return x >= cellBbox.x1 && x <= cellBbox.x2 && y >= cellBbox.y1 && y <= cellBbox.y2;
        });
        table.cells.push({
          row: r,
          column: c,
          bbox: cellBbox,
          text: cellText.map((t) => t.str).join(" ").trim(),
          items: cellText
        });
      }
    }
    for (let r = 0; r < rows.length - 1; r++) {
      for (let c = 0; c < columns.length - 1; c++) {
        const hasRightLine = vLines.some(
          (v) => Math.abs(v.x - columns[c + 1]) < 2 && v.y1 <= rows[r] && v.y2 >= rows[r + 1]
        );
        const hasBottomLine = hLines.some(
          (h) => Math.abs(h.y - rows[r + 1]) < 2 && h.x1 <= columns[c] && h.x2 >= columns[c + 1]
        );
        if (!hasRightLine || !hasBottomLine) {
          table.mergedCells.push({
            row: r,
            column: c,
            mergeRight: !hasRightLine,
            mergeDown: !hasBottomLine
          });
        }
      }
    }
    return table;
  }
  function diagnoseDocument(pageResults2, graph) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const ir = graph.getIR();
    const issues = {
      scannedPages: 0,
      brokenTextPages: 0,
      readingOrderProblems: 0,
      duplicateText: 0,
      untaggedTables: 0,
      unrecognizedImages: 0,
      suspiciousOCR: 0,
      accessibilityFailures: 0,
      watermarks: 0,
      redactions: 0,
      invisibleText: 0,
      clippedText: 0
    };
    let totalScore = 0;
    for (const page of pageResults2) {
      if (page.source === "ocr") {
        issues.scannedPages++;
      }
      if (page.source === "error") {
        issues.brokenTextPages++;
      }
      if (page.readingOrder === 0 && page.contentBlocks > 3) {
        issues.readingOrderProblems++;
      }
      issues.duplicateText += ((_b = (_a = page.textQuality) == null ? void 0 : _a.summary) == null ? void 0 : _b.duplicates) || 0;
      if (((_c = page.structures) == null ? void 0 : _c.tables) && !page.hasStructureTree) {
        issues.untaggedTables += page.structures.tables;
      }
      issues.unrecognizedImages += ((_e = (_d = page.visual) == null ? void 0 : _d.imageRegions) == null ? void 0 : _e.length) || 0;
      if (page.source === "ocr" && page.confidence && page.confidence < 70) {
        issues.suspiciousOCR++;
      }
      issues.accessibilityFailures += ((_g = (_f = page.markedContent) == null ? void 0 : _f.filter((m) => m.isArtifact)) == null ? void 0 : _g.length) || 0;
      issues.invisibleText += ((_i = (_h = page.textQuality) == null ? void 0 : _h.summary) == null ? void 0 : _i.invisibleText) || 0;
      issues.clippedText += ((_k = (_j = page.textQuality) == null ? void 0 : _j.summary) == null ? void 0 : _k.clippedText) || 0;
      totalScore += ((_l = page.textQuality) == null ? void 0 : _l.score) || 1;
    }
    issues.watermarks = ((_o = (_n = (_m = pageResults2[0]) == null ? void 0 : _m.repeatedElements) == null ? void 0 : _n.watermarks) == null ? void 0 : _o.length) || 0;
    const avgScore = totalScore / pageResults2.length;
    const ragReadiness = calculateRAGReadiness(
      pageResults2,
      null,
      null,
      ((_p = pageResults2[0]) == null ? void 0 : _p.repeatedElements) || {}
    );
    return {
      score: Math.round(avgScore * 100),
      pageCount: pageResults2.length,
      issues,
      ragReadiness: {
        score: Math.round(ragReadiness.score * 100),
        searchable: avgScore > 0.5,
        needsOCR: issues.scannedPages > pageResults2.length * 0.5,
        needsImageAnalysis: issues.unrecognizedImages > 0,
        needsStructureRepair: issues.untaggedTables > 0 || issues.readingOrderProblems > 0
      },
      recommendations: ragReadiness.recommendations
    };
  }
  function normalizeDocument(graph, options = {}) {
    var _a, _b, _c, _d, _e;
    const {
      readingOrder = true,
      ocr = "auto",
      deduplicate = true,
      tables = true,
      images = true,
      structure = true,
      fixHyphenation = true,
      fixLigatures = true,
      removeWatermarks = true
    } = options;
    const ir = graph.getIR();
    const repairs = [];
    if (fixHyphenation || fixLigatures) {
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        for (const textId of pageData.content || []) {
          const textObj = (_a = ir.objects) == null ? void 0 : _a[textId];
          if ((_b = textObj == null ? void 0 : textObj.raw) == null ? void 0 : _b.text) {
            const original = textObj.raw.text;
            textObj.raw.text = normalizeText(original);
            if (original !== textObj.raw.text) {
              repairs.push({
                type: "text_normalization",
                page: pageId,
                description: "Fixed hyphenation/ligatures"
              });
            }
          }
        }
      }
    }
    if (deduplicate) {
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        const seen = /* @__PURE__ */ new Set();
        const uniqueContent = [];
        for (const textId of pageData.content || []) {
          const textObj = (_c = ir.objects) == null ? void 0 : _c[textId];
          const text = ((_d = textObj == null ? void 0 : textObj.raw) == null ? void 0 : _d.text) || "";
          const normalized = text.toLowerCase().trim();
          if (!seen.has(normalized) || normalized.length < 5) {
            seen.add(normalized);
            uniqueContent.push(textId);
          } else {
            repairs.push({
              type: "deduplication",
              page: pageId,
              text: text.substring(0, 50),
              description: "Removed duplicate text"
            });
          }
        }
        pageData.content = uniqueContent;
      }
    }
    if (tables) {
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        if (((_e = pageData.vectors) == null ? void 0 : _e.length) > 0) {
          const textItems = (pageData.content || []).map((id) => {
            var _a2;
            return (_a2 = ir.objects) == null ? void 0 : _a2[id];
          }).filter(Boolean).map((obj) => obj.raw);
          const reconstructed = reconstructTable(pageData.vectors, textItems, pageData);
          if (reconstructed.cells.length > 0) {
            pageData.reconstructedTable = reconstructed;
            repairs.push({
              type: "table_reconstruction",
              page: pageId,
              cells: reconstructed.cells.length,
              description: "Reconstructed table structure"
            });
          }
        }
      }
    }
    return {
      success: true,
      repairs,
      repairCount: repairs.length
    };
  }

  // packages/core/src/edgecases.js
  function detectRotationSkew(pageData, contentItems, vectors) {
    const result = {
      rotation: pageData.rotation || 0,
      skewAngle: 0,
      isRotated: false,
      isSkewed: false,
      confidence: 1,
      recommendation: null
    };
    if (result.rotation !== 0) {
      result.isRotated = true;
      result.recommendation = "Page has explicit rotation applied";
    }
    if (contentItems.length > 10) {
      const skew = detectSkewFromText(contentItems);
      result.skewAngle = skew.angle;
      result.isSkewed = Math.abs(skew.angle) > 0.5;
      result.confidence = skew.confidence;
      if (result.isSkewed) {
        result.recommendation = `Page appears skewed by ${skew.angle.toFixed(2)} degrees. Consider deskewing.`;
      }
    }
    if (contentItems.length > 5) {
      const textDirection = detectTextDirection(contentItems);
      if (textDirection === "vertical") {
        result.recommendation = "Text appears vertical - page may be rotated 90\xB0";
      } else if (textDirection === "upside-down") {
        result.recommendation = "Text appears upside-down - page may be rotated 180\xB0";
      }
    }
    return result;
  }
  function detectSkewFromText(items) {
    var _a, _b;
    if (items.length < 5) return { angle: 0, confidence: 0 };
    const baselines = [];
    for (const item of items) {
      if (!item.str || item.str.trim().length < 2) continue;
      const y = ((_a = item.transform) == null ? void 0 : _a[5]) || 0;
      const x = ((_b = item.transform) == null ? void 0 : _b[4]) || 0;
      baselines.push({ x, y });
    }
    if (baselines.length < 3) return { angle: 0, confidence: 0 };
    baselines.sort((a, b) => a.x - b.x);
    let totalAngle = 0;
    let count = 0;
    for (let i = 1; i < baselines.length; i++) {
      const dx = baselines[i].x - baselines[i - 1].x;
      const dy = baselines[i].y - baselines[i - 1].y;
      if (Math.abs(dx) > 10) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (Math.abs(angle) < 15) {
          totalAngle += angle;
          count++;
        }
      }
    }
    const avgAngle = count > 0 ? totalAngle / count : 0;
    const confidence = Math.min(1, count / 10);
    return { angle: avgAngle, confidence };
  }
  function detectTextDirection(items) {
    var _a, _b, _c, _d;
    if (items.length < 3) return "horizontal";
    const sortedByY = [...items].sort((a, b) => {
      var _a2, _b2;
      return (((_a2 = b.transform) == null ? void 0 : _a2[5]) || 0) - (((_b2 = a.transform) == null ? void 0 : _b2[5]) || 0);
    });
    const yVariance = calculateVariance(sortedByY.map((i) => {
      var _a2;
      return ((_a2 = i.transform) == null ? void 0 : _a2[5]) || 0;
    }));
    const xVariance = calculateVariance(sortedByY.map((i) => {
      var _a2;
      return ((_a2 = i.transform) == null ? void 0 : _a2[4]) || 0;
    }));
    if (yVariance > xVariance * 2) {
      return "vertical";
    }
    let upsideDownCount = 0;
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1];
      const curr = items[i];
      if ((((_a = curr.transform) == null ? void 0 : _a[4]) || 0) > (((_b = prev.transform) == null ? void 0 : _b[4]) || 0) && (((_c = curr.transform) == null ? void 0 : _c[5]) || 0) < (((_d = prev.transform) == null ? void 0 : _d[5]) || 0)) {
        upsideDownCount++;
      }
    }
    if (upsideDownCount > items.length * 0.5) {
      return "upside-down";
    }
    return "horizontal";
  }
  function calculateVariance(arr) {
    if (arr.length === 0) return 0;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
  }
  function detectGlyphIssues(pageData, contentItems) {
    const issues = [];
    const puaChars = contentItems.filter((item) => {
      const text = item.str || "";
      return /[\uE000-\uF8FF]/.test(text);
    });
    if (puaChars.length > 0) {
      issues.push({
        type: "pua_characters",
        severity: "warning",
        count: puaChars.length,
        samples: puaChars.slice(0, 3).map((i) => i.str),
        description: "Private Use Area characters found - possible missing ToUnicode map"
      });
    }
    const replacementChars = contentItems.filter((item) => {
      const text = item.str || "";
      return /\uFFFD/.test(text);
    });
    if (replacementChars.length > 0) {
      issues.push({
        type: "replacement_characters",
        severity: "error",
        count: replacementChars.length,
        description: "Unicode replacement characters found - encoding issue"
      });
    }
    const nonBMP = contentItems.filter((item) => {
      const text = item.str || "";
      return /[\u{10000}-\u{10FFFF}]/u.test(text);
    });
    if (nonBMP.length > 0) {
      issues.push({
        type: "non_bmp_characters",
        severity: "info",
        count: nonBMP.length,
        description: "Non-BMP characters found - may indicate complex script or encoding"
      });
    }
    const fontIssues = detectFontEncodingMismatches(contentItems);
    if (fontIssues.length > 0) {
      issues.push({
        type: "font_encoding_mismatch",
        severity: "warning",
        count: fontIssues.length,
        fonts: [...new Set(fontIssues.map((f) => f.font))],
        description: "Font encoding may not match character encoding"
      });
    }
    const tofu = contentItems.filter((item) => {
      const text = item.str || "";
      return /\u25A1/.test(text);
    });
    if (tofu.length > 0) {
      issues.push({
        type: "missing_glyphs",
        severity: "warning",
        count: tofu.length,
        description: "Missing glyph indicators found - font may not support all characters"
      });
    }
    return {
      issues,
      hasGlyphIssues: issues.length > 0,
      puaCount: puaChars.length,
      replacementCount: replacementChars.length
    };
  }
  function detectFontEncodingMismatches(items) {
    const mismatches = [];
    const fontGroups = {};
    for (const item of items) {
      const font = item.fontName || "unknown";
      if (!fontGroups[font]) fontGroups[font] = [];
      fontGroups[font].push(item);
    }
    for (const [font, fontItems] of Object.entries(fontGroups)) {
      const allText = fontItems.map((i) => i.str || "").join("");
      const hasASCII = /[a-zA-Z]/.test(allText);
      const hasPUA = /[\uE000-\uF8FF]/.test(allText);
      if (hasASCII && hasPUA) {
        mismatches.push({ font, reason: "Mixed ASCII and PUA characters" });
      }
    }
    return mismatches;
  }
  function detectOutlinedText(vectors, contentItems) {
    const outlinedText = [];
    for (const vec of vectors) {
      if (vec.type === "path" && vec.points && vec.points.length > 5) {
        const bbox = vec.bbox || calculateBBox(vec.points);
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        const aspectRatio = width / height;
        if (aspectRatio > 0.2 && aspectRatio < 5 && height > 5 && height < 100) {
          const overlappingText = contentItems.filter((item) => {
            var _a, _b;
            const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
            const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
            return x >= bbox[0] - 5 && x <= bbox[2] + 5 && y >= bbox[1] - 5 && y <= bbox[3] + 5;
          });
          if (overlappingText.length === 0) {
            outlinedText.push({
              bbox,
              pathLength: vec.points.length,
              type: "outlined_text_candidate"
            });
          }
        }
      }
    }
    return {
      hasOutlinedText: outlinedText.length > 0,
      candidates: outlinedText,
      count: outlinedText.length
    };
  }
  function calculateBBox(points) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const pt of points) {
      if (pt.x < minX) minX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y > maxY) maxY = pt.y;
    }
    return [minX, minY, maxX, maxY];
  }
  function detectFlattenedForms(vectors, contentItems, annotations) {
    const result = {
      hasFlattenedForms: false,
      candidates: [],
      recoveredFields: []
    };
    const formPatterns = findFormPatterns(vectors, contentItems);
    const formFields = annotations.filter((a) => a.subtype === "Widget");
    if (formPatterns.length > 0 && formFields.length === 0) {
      result.hasFlattenedForms = true;
      result.candidates = formPatterns;
      for (const pattern of formPatterns) {
        const recovered = recoverFormField(pattern, contentItems);
        if (recovered) {
          result.recoveredFields.push(recovered);
        }
      }
    }
    return result;
  }
  function findFormPatterns(vectors, contentItems) {
    const patterns = [];
    for (const vec of vectors) {
      if (vec.type === "rect") {
        const bbox = vec.bbox;
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        if (width > 50 && width < 400 && height > 10 && height < 50) {
          const nearbyText = contentItems.filter((item) => {
            var _a, _b;
            const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
            const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
            return x < bbox[0] && Math.abs(y - bbox[1]) < height;
          });
          if (nearbyText.length > 0) {
            patterns.push({
              bbox,
              label: nearbyText.map((t) => t.str).join(" ").trim(),
              type: "form_field_candidate"
            });
          }
        }
      }
    }
    return patterns;
  }
  function recoverFormField(pattern, contentItems) {
    const bbox = pattern.bbox;
    const insideText = contentItems.filter((item) => {
      var _a, _b;
      const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
      const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
      return x >= bbox[0] && x <= bbox[2] && y >= bbox[1] && y <= bbox[3];
    });
    if (insideText.length > 0) {
      return {
        label: pattern.label,
        value: insideText.map((t) => t.str).join(" ").trim(),
        bbox,
        confidence: 0.7
      };
    }
    const hasCheckmark = detectCheckmarkInArea(bbox, []);
    if (hasCheckmark) {
      return {
        label: pattern.label,
        value: "checked",
        bbox,
        confidence: 0.8
      };
    }
    return null;
  }
  function detectCheckboxes(vectors, contentItems) {
    const checkboxes = [];
    for (const vec of vectors) {
      if (vec.type === "rect") {
        const bbox = vec.bbox;
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        if (width > 8 && width < 30 && height > 8 && height < 30 && Math.abs(width - height) < 5) {
          const nearbyLabel = contentItems.filter((item) => {
            var _a, _b;
            const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
            const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
            return x > bbox[2] && Math.abs(y - bbox[1]) < height * 2;
          });
          const isFilled = detectCheckmarkInArea(bbox, vectors);
          checkboxes.push({
            bbox,
            label: nearbyLabel.map((t) => t.str).join(" ").trim() || null,
            checked: isFilled,
            type: "checkbox"
          });
        }
      }
    }
    for (const vec of vectors) {
      if (vec.type === "circle" || vec.type === "path" && isCircularPath(vec.points)) {
        const bbox = vec.bbox || calculateBBox(vec.points || []);
        const diameter = bbox[2] - bbox[0];
        if (diameter > 8 && diameter < 30) {
          const nearbyLabel = contentItems.filter((item) => {
            var _a, _b;
            const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
            const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
            return x > bbox[2] && Math.abs(y - bbox[1]) < diameter * 2;
          });
          const isFilled = detectCheckmarkInArea(bbox, vectors);
          checkboxes.push({
            bbox,
            label: nearbyLabel.map((t) => t.str).join(" ").trim() || null,
            checked: isFilled,
            type: "radio"
          });
        }
      }
    }
    return {
      count: checkboxes.length,
      checkboxes,
      checked: checkboxes.filter((c) => c.checked).length,
      unchecked: checkboxes.filter((c) => !c.checked).length
    };
  }
  function isCircularPath(points) {
    if (!points || points.length < 8) return false;
    const bbox = calculateBBox(points);
    const width = bbox[2] - bbox[0];
    const height = bbox[3] - bbox[1];
    return Math.abs(width - height) < width * 0.2;
  }
  function detectCheckmarkInArea(areaBbox, vectors) {
    for (const vec of vectors) {
      if (vec.type === "path" && vec.points) {
        const pointCount = vec.points.filter(
          (pt) => pt.x >= areaBbox[0] && pt.x <= areaBbox[2] && pt.y >= areaBbox[1] && pt.y <= areaBbox[3]
        ).length;
        if (pointCount > vec.points.length * 0.3) {
          return true;
        }
      }
    }
    return false;
  }
  function detectCrossPageTables(pageResults2, ir) {
    const crossPageTables = [];
    const tablePages = {};
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      if (pageData.reconstructedTable && pageData.reconstructedTable.cells.length > 0) {
        const table = pageData.reconstructedTable;
        const key = `${table.columns.length}_${table.rows.length}`;
        if (!tablePages[key]) tablePages[key] = [];
        tablePages[key].push({
          pageId,
          table,
          pageNum: parseInt(pageId.replace("page_", ""))
        });
      }
    }
    for (const [key, pages] of Object.entries(tablePages)) {
      if (pages.length < 2) continue;
      pages.sort((a, b) => a.pageNum - b.pageNum);
      let currentSequence = [pages[0]];
      for (let i = 1; i < pages.length; i++) {
        if (pages[i].pageNum === currentSequence[currentSequence.length - 1].pageNum + 1) {
          currentSequence.push(pages[i]);
        } else {
          if (currentSequence.length >= 2) {
            crossPageTables.push({
              startPage: currentSequence[0].pageNum,
              endPage: currentSequence[currentSequence.length - 1].pageNum,
              pageCount: currentSequence.length,
              columns: currentSequence[0].table.columns.length,
              type: "cross_page_table"
            });
          }
          currentSequence = [pages[i]];
        }
      }
      if (currentSequence.length >= 2) {
        crossPageTables.push({
          startPage: currentSequence[0].pageNum,
          endPage: currentSequence[currentSequence.length - 1].pageNum,
          pageCount: currentSequence.length,
          columns: currentSequence[0].table.columns.length,
          type: "cross_page_table"
        });
      }
    }
    return {
      count: crossPageTables.length,
      tables: crossPageTables
    };
  }
  function associateCaptionsWithImages(pageData, contentItems, images) {
    const associations = [];
    for (const image of images) {
      const imageBbox = image.bbox;
      const captionsBelow = contentItems.filter((item) => {
        var _a, _b;
        const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
        const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
        const text = item.str || "";
        return y < imageBbox.y && y > imageBbox.y - 50 && Math.abs(x + (item.width || 0) / 2 - (imageBbox.x + imageBbox.width / 2)) < imageBbox.width && (text.startsWith("Figure") || text.startsWith("Image") || text.startsWith("Table") || text.startsWith("Fig.") || text.startsWith("Img.") || /^\d+\./.test(text));
      });
      const titlesAbove = contentItems.filter((item) => {
        var _a, _b;
        const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
        const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
        const text = item.str || "";
        return y > imageBbox.y + imageBbox.height && y < imageBbox.y + imageBbox.height + 30 && Math.abs(x + (item.width || 0) / 2 - (imageBbox.x + imageBbox.width / 2)) < imageBbox.width * 1.5 && text.length > 5;
      });
      if (captionsBelow.length > 0 || titlesAbove.length > 0) {
        associations.push({
          image: {
            bbox: imageBbox,
            id: image.id
          },
          caption: captionsBelow.map((t) => t.str).join(" ").trim() || null,
          title: titlesAbove.map((t) => t.str).join(" ").trim() || null,
          confidence: captionsBelow.length > 0 ? 0.9 : 0.6
        });
      }
    }
    return associations;
  }
  function detectFootnotes(contentItems, pageData) {
    var _a, _b, _c, _d, _e, _f;
    const footnotes = [];
    const footnoteRefs = [];
    for (const item of contentItems) {
      const text = item.str || "";
      const fontSize = Math.abs((_a = item.transform) == null ? void 0 : _a[0]) || 12;
      if (/^\d{1,3}$/.test(text) && fontSize < 10) {
        footnoteRefs.push({
          text,
          bbox: [((_b = item.transform) == null ? void 0 : _b[4]) || 0, ((_c = item.transform) == null ? void 0 : _c[5]) || 0],
          fontSize,
          type: "footnote_reference"
        });
      }
      if (/^\d{1,2}\.\s/.test(text) || /^[a-z]\.\s/.test(text)) {
        const y = ((_d = item.transform) == null ? void 0 : _d[5]) || 0;
        const pageHeight = pageData.height || 792;
        if (y < pageHeight * 0.2) {
          footnotes.push({
            text,
            bbox: [((_e = item.transform) == null ? void 0 : _e[4]) || 0, y],
            marker: (_f = text.match(/^(\d{1,2}|[a-z])\./)) == null ? void 0 : _f[1],
            type: "footnote"
          });
        }
      }
    }
    const associations = [];
    for (const ref of footnoteRefs) {
      const matchingNote = footnotes.find((fn) => fn.marker === ref.text);
      if (matchingNote) {
        associations.push({
          reference: ref,
          note: matchingNote,
          type: "footnote_association"
        });
      }
    }
    return {
      footnotes,
      footnoteRefs,
      associations,
      count: footnotes.length
    };
  }
  function detectLanguage(contentItems) {
    const allText = contentItems.map((i) => i.str || "").join(" ");
    if (allText.length < 50) {
      return { language: "unknown", confidence: 0 };
    }
    const languages = {
      en: { words: ["the", "and", "is", "in", "to", "of", "a", "that", "it", "for"], weight: 1 },
      es: { words: ["el", "la", "de", "en", "y", "los", "las", "un", "una", "que"], weight: 1 },
      fr: { words: ["le", "la", "de", "et", "est", "en", "les", "des", "un", "une"], weight: 1 },
      de: { words: ["der", "die", "und", "ist", "von", "den", "das", "ein", "eine", "auf"], weight: 1 },
      pt: { words: ["o", "a", "de", "e", "em", "os", "as", "um", "uma", "que"], weight: 1 },
      it: { words: ["il", "la", "di", "che", "\xE8", "in", "le", "del", "un", "una"], weight: 1 },
      nl: { words: ["de", "het", "een", "van", "en", "is", "dat", "op", "te", "voor"], weight: 1 },
      ru: { words: ["\u0438", "\u0432", "\u043D\u0435", "\u043D\u0430", "\u0447\u0442\u043E", "\u043E\u043D", "\u043A\u0430\u043A", "\u044D\u0442\u043E", "\u043F\u043E", "\u043D\u043E"], weight: 0.8 },
      zh: { words: ["\u7684", "\u662F", "\u5728", "\u4E86", "\u4E0D", "\u6709", "\u548C", "\u5C31", "\u4EBA", "\u90FD"], weight: 0.8 },
      ja: { words: ["\u306E", "\u306B", "\u306F", "\u3092", "\u305F", "\u304C", "\u3067", "\u3066", "\u3068", "\u3057"], weight: 0.8 }
    };
    const words = allText.toLowerCase().split(/\s+/);
    const scores = {};
    for (const [lang, config2] of Object.entries(languages)) {
      let count = 0;
      for (const word of words) {
        if (config2.words.includes(word)) {
          count++;
        }
      }
      scores[lang] = count / words.length * config2.weight;
    }
    let bestLang = "unknown";
    let bestScore = 0;
    for (const [lang, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        bestLang = lang;
      }
    }
    return {
      language: bestLang,
      confidence: Math.min(1, bestScore * 10),
      scores
    };
  }
  function detectMalformedPDF(pdf) {
    const hints = [];
    if (!(pdf == null ? void 0 : pdf.catalog)) {
      hints.push({
        type: "missing_catalog",
        severity: "error",
        description: "PDF catalog dictionary is missing",
        recovery: "Try opening with a repair-capable PDF library"
      });
    }
    if (pdf == null ? void 0 : pdf.xrefBroken) {
      hints.push({
        type: "broken_xref",
        severity: "error",
        description: "Cross-reference table appears corrupted",
        recovery: "Rebuild xref table using repair tools"
      });
    }
    if (!(pdf == null ? void 0 : pdf.pages)) {
      hints.push({
        type: "missing_pages",
        severity: "error",
        description: "Page tree is missing or invalid",
        recovery: "Extract pages using alternative methods"
      });
    }
    if ((pdf == null ? void 0 : pdf.encrypted) && !(pdf == null ? void 0 : pdf.password)) {
      hints.push({
        type: "encrypted_no_password",
        severity: "warning",
        description: "PDF is encrypted but no password provided",
        recovery: "Provide password or use decryption tools"
      });
    }
    if (pdf == null ? void 0 : pdf.truncated) {
      hints.push({
        type: "truncated_file",
        severity: "error",
        description: "PDF file appears to be truncated",
        recovery: "File may be incomplete - try re-downloading"
      });
    }
    return {
      isMalformed: hints.length > 0,
      hints,
      severity: hints.some((h) => h.severity === "error") ? "error" : hints.some((h) => h.severity === "warning") ? "warning" : "info"
    };
  }

  // packages/core/src/expansion.js
  var CONCEPT_SYNONYMS = {
    contract: ["agreement", "award", "deal", "pact", "compact", "accord", "arrangement", "understanding", "contractual"],
    money: ["funds", "payment", "amount", "cost", "price", "value", "expenditure", "expense", "budget", "appropriation", "disbursement", "compensation"],
    person: ["individual", "person", "applicant", "representative", "agent", "officer", "director", "manager", "official", "employee", "contractor", "vendor"],
    organization: ["company", "corporation", "firm", "agency", "department", "bureau", "division", "authority", "board", "commission", "office", "entity", "contractor", "vendor", "supplier"],
    approve: ["authorize", "ratify", "endorse", "sanction", "confirm", "adopt", "certify", "validate", "accept", "grant"],
    location: ["address", "place", "site", "property", "premises", "location", "area", "district", "zone", "parcel"],
    date: ["time", "period", "deadline", "due date", "expiration", "term", "duration", "interval", "schedule"],
    purchase: ["buy", "acquire", "procure", "obtain", "order", "bid", "solicit", "requisition"],
    project: ["work", "initiative", "program", "effort", "undertaking", "endeavor", "task", "assignment"],
    department: ["division", "bureau", "unit", "section", "branch", "office", "team", "group"],
    reduce: ["decrease", "lower", "cut", "diminish", "lessen", "curtail", "scale back"],
    increase: ["raise", "grow", "expand", "elevate", "boost", "enhance", "augment"],
    save: ["savings", "reduction", "decrease", "lower", "reduce", "cost reduction", "expenditure reduction"],
    comply: ["compliance", "conform", "adhere", "follow", "observe", "meet", "satisfy", "fulfill"],
    terminate: ["end", "cancel", "expire", "cease", "discontinue", "abrogate", "revoke", "rescind"],
    amend: ["modify", "revise", "change", "alter", "update", "adjust", "correct"],
    fund: ["funding", "finance", "capitalize", "appropriate", "allocate", "budget"],
    perform: ["execute", "deliver", "complete", "accomplish", "fulfill", "carry out", "implement"],
    inspect: ["review", "examine", "audit", "assess", "evaluate", "survey", "investigate"],
    maintain: ["repair", "upkeep", "service", "preserve", "sustain", "support"]
  };
  var ENTITY_TYPE_EXPANSIONS = {
    currency: ["dollar", "amount", "cost", "price", "fee", "rate", "charge", "budget", "appropriation", "expenditure", "payment", "fund", "revenue", "tax", "levy", "assessment", "fine", "penalty", "grant", "subsidy"],
    date: ["day", "month", "year", "deadline", "expiration", "term", "period", "duration", "fiscal year", "quarter", "anniversary", "effective date"],
    person: ["name", "applicant", "contact", "signatory", "witness", "notary", "official", "officer", "director", "manager", "supervisor", "coordinator", "administrator"],
    address: ["street", "avenue", "boulevard", "road", "drive", "lane", "court", "place", "way", "suite", "floor", "building", "city", "state", "zip"],
    phone: ["telephone", "call", "contact", "number", "fax", "mobile", "cell"],
    email: ["electronic mail", "e-mail", "address", "contact", "inbox"],
    organization: ["company", "firm", "agency", "department", "authority", "board", "commission", "corporation", "llc", "inc", "partnership", "association", "institution"]
  };
  var SUFFIX_RULES = [
    ["ational", "ate"],
    ["tional", "tion"],
    ["enci", "ence"],
    ["anci", "ance"],
    ["izer", "ize"],
    ["ously", "ous"],
    ["ively", "ive"],
    ["ently", "ent"],
    ["ation", "ate"],
    ["alism", "al"],
    ["iveness", "ive"],
    ["fulness", "ful"],
    ["ousness", "ous"],
    ["ality", "al"],
    ["biliti", "ble"],
    ["logi", "log"],
    ["sses", "ss"],
    ["ies", "i"],
    ["ss", "ss"],
    ["s", ""],
    ["ement", ""],
    ["ment", ""],
    ["ence", ""],
    ["ance", ""],
    ["able", ""],
    ["ible", ""],
    ["ful", ""],
    ["ous", ""],
    ["ive", ""],
    ["ize", ""],
    ["ate", ""],
    ["ing", ""],
    ["tion", "t"],
    ["ness", ""],
    ["able", ""],
    ["edly", ""],
    ["ily", "y"],
    ["ly", ""],
    ["er", ""],
    ["ed", ""]
  ];
  function stem(word) {
    if (!word || word.length < 4) return word;
    const lower = word.toLowerCase();
    if (lower.length <= 3) return lower;
    for (const [suffix, replacement] of SUFFIX_RULES) {
      if (lower.endsWith(suffix) && lower.length - suffix.length >= 3) {
        const root = lower.slice(0, -suffix.length) + replacement;
        if (root.length >= 3) return root;
      }
    }
    return lower;
  }
  function charNGrams(str, n = 3) {
    const grams = [];
    const lower = str.toLowerCase().replace(/\s+/g, " ");
    for (let i = 0; i <= lower.length - n; i++) {
      grams.push(lower.substring(i, i + n));
    }
    return grams;
  }
  function wordNGrams(text, n = 2) {
    const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    const grams = [];
    for (let i = 0; i <= words.length - n; i++) {
      grams.push(words.slice(i, i + n).join(" "));
    }
    return grams;
  }
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  }
  function fuzzyScore(a, b) {
    const al = a.toLowerCase().trim();
    const bl = b.toLowerCase().trim();
    if (al === bl) return 1;
    if (al.includes(bl) || bl.includes(al)) return 0.85;
    const maxLen = Math.max(al.length, bl.length);
    if (maxLen === 0) return 0;
    const dist = levenshtein(al, bl);
    return Math.max(0, 1 - dist / maxLen);
  }
  function bestFuzzyMatch(term, vocabulary, threshold = 0.6) {
    let best = null;
    let bestScore = 0;
    for (const word of vocabulary) {
      const score = fuzzyScore(term, word);
      if (score > bestScore && score >= threshold) {
        best = word;
        bestScore = score;
      }
    }
    return best ? { word: best, score: bestScore } : null;
  }
  function expandQuery(query, options = {}) {
    const {
      includeSynonyms = true,
      includeStems = true,
      includeNGrams = false,
      includeFuzzy = false,
      documentTerms = null
    } = options;
    const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    const expanded = /* @__PURE__ */ new Map();
    function addTerm(term, weight, source) {
      if (!term || term.length < 2) return;
      const existing = expanded.get(term);
      if (existing) {
        existing.weight = Math.max(existing.weight, weight);
        existing.sources.push(source);
      } else {
        expanded.set(term, { weight, sources: [source] });
      }
    }
    for (const term of terms) {
      addTerm(term, 1, "original");
    }
    if (includeSynonyms) {
      for (const term of terms) {
        const synonyms = findSynonyms(term);
        for (const syn of synonyms) {
          addTerm(syn, 0.7, "synonym");
        }
      }
      const queryLower = query.toLowerCase();
      for (const [concept, synonyms] of Object.entries(CONCEPT_SYNONYMS)) {
        if (queryLower.includes(concept)) {
          for (const syn of synonyms) {
            addTerm(syn, 0.6, `concept:${concept}`);
          }
        }
        for (const syn of synonyms) {
          if (queryLower.includes(syn)) {
            addTerm(concept, 0.6, `concept:${syn}`);
            for (const otherSyn of synonyms) {
              if (otherSyn !== syn) addTerm(otherSyn, 0.4, `concept:${syn}`);
            }
          }
        }
      }
    }
    if (includeStems) {
      for (const term of terms) {
        const s = stem(term);
        if (s !== term) addTerm(s, 0.5, "stem");
      }
    }
    if (includeNGrams) {
      const fullQuery = terms.join(" ");
      const bigrams = wordNGrams(fullQuery, 2);
      for (const gram of bigrams) {
        addTerm(gram, 0.4, "bigram");
      }
    }
    if (includeFuzzy && documentTerms) {
      const vocab = Array.isArray(documentTerms) ? documentTerms : Object.keys(documentTerms);
      for (const term of terms) {
        const match = bestFuzzyMatch(term, vocab, 0.7);
        if (match && match.word !== term) {
          addTerm(match.word, 0.3 * match.score, "fuzzy");
        }
      }
    }
    const result = [];
    for (const [term, data] of expanded) {
      result.push({
        term,
        weight: data.weight,
        sources: data.sources
      });
    }
    result.sort((a, b) => b.weight - a.weight);
    return result;
  }
  function findSynonyms(term) {
    const lower = term.toLowerCase();
    const synonyms = /* @__PURE__ */ new Set();
    if (CONCEPT_SYNONYMS[lower]) {
      for (const syn of CONCEPT_SYNONYMS[lower]) {
        synonyms.add(syn);
      }
    }
    for (const [concept, syns] of Object.entries(CONCEPT_SYNONYMS)) {
      if (syns.includes(lower)) {
        synonyms.add(concept);
        for (const syn of syns) {
          if (syn !== lower) synonyms.add(syn);
        }
      }
    }
    for (const [type, terms] of Object.entries(ENTITY_TYPE_EXPANSIONS)) {
      if (terms.includes(lower)) {
        synonyms.add(type);
      }
    }
    return Array.from(synonyms);
  }
  function detectAcronyms(text) {
    const acronyms = [];
    const pattern = /([A-Z][a-zA-Z\s\-]{2,50})\s*\(([A-Z](?:\.?[A-Z]){1,10})\)/g;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      acronyms.push({
        full: match[1].trim(),
        acronym: match[2].replace(/\./g, ""),
        position: match.index
      });
    }
    const reversePattern = /\(([A-Z](?:\.?[A-Z]){1,10})\)\s*([A-Z][a-zA-Z\s\-]{2,50})/g;
    while ((match = reversePattern.exec(text)) !== null) {
      acronyms.push({
        full: match[2].trim(),
        acronym: match[1].replace(/\./g, ""),
        position: match.index
      });
    }
    return acronyms;
  }
  function detectDefinitions(text) {
    const definitions = [];
    const patterns = [
      /(?:hereinafter|hereafter)\s+(?:referred\s+to\s+as|called|known\s+as)\s+["']?([A-Z][a-zA-Z\s]+?)["']?[\s.,;]/gi,
      /(?:defined\s+as|means|refers?\s+to)\s+["']?([A-Z][a-zA-Z\s]+?)["']?[\s.,;]/gi,
      /["']([A-Z][a-zA-Z\s]+?)["']\s+(?:means|shall\s+mean|refers?\s+to)/gi,
      /([A-Z][a-zA-Z]+)\s+(?:means|shall\s+mean|is\s+defined\s+as)\s+/gi
    ];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        definitions.push({
          term: match[1].trim(),
          context: text.substring(Math.max(0, match.index - 30), match.index + match[0].length + 30),
          position: match.index
        });
      }
    }
    return definitions;
  }
  function learnTerminology2(pages) {
    const aliases = /* @__PURE__ */ new Map();
    const acronymMap = /* @__PURE__ */ new Map();
    const definitionMap = /* @__PURE__ */ new Map();
    for (const page of pages) {
      const text = page.text || "";
      const acronyms = detectAcronyms(text);
      for (const acr of acronyms) {
        acronymMap.set(acr.acronym.toLowerCase(), acr.full);
        addAlias(aliases, acr.full.toLowerCase(), acr.acronym.toLowerCase());
      }
      const defs = detectDefinitions(text);
      for (const def of defs) {
        definitionMap.set(def.term.toLowerCase(), def.context);
      }
    }
    const phraseFreq = /* @__PURE__ */ new Map();
    for (const page of pages) {
      const text = (page.text || "").toLowerCase();
      const words = text.split(/\s+/).filter((w) => w.length > 2);
      for (let len = 2; len <= 4; len++) {
        for (let i = 0; i <= words.length - len; i++) {
          const phrase = words.slice(i, i + len).join(" ");
          if (!/^\d+$/.test(phrase)) {
            phraseFreq.set(phrase, (phraseFreq.get(phrase) || 0) + 1);
          }
        }
      }
    }
    const frequentPhrases = Array.from(phraseFreq.entries()).filter(([, count]) => count >= 2).sort((a, b) => b[1] - a[1]).slice(0, 200);
    for (let i = 0; i < frequentPhrases.length; i++) {
      for (let j = i + 1; j < frequentPhrases.length; j++) {
        const [phrase1] = frequentPhrases[i];
        const [phrase2] = frequentPhrases[j];
        if (phrase1.includes(phrase2) || phrase2.includes(phrase1)) {
          const longer = phrase1.length > phrase2.length ? phrase1 : phrase2;
          const shorter = phrase1.length > phrase2.length ? phrase2 : phrase1;
          if (shorter.length >= 3) {
            addAlias(aliases, longer, shorter);
          }
        }
      }
    }
    return {
      aliases: Object.fromEntries(
        Array.from(aliases.entries()).map(([k, v]) => [k, Array.from(v)])
      ),
      acronyms: Object.fromEntries(acronymMap),
      definitions: Object.fromEntries(definitionMap)
    };
  }
  function addAlias(aliases, canonical, alias) {
    if (!aliases.has(canonical)) {
      aliases.set(canonical, /* @__PURE__ */ new Set());
    }
    aliases.get(canonical).add(alias);
    if (!aliases.has(alias)) {
      aliases.set(alias, /* @__PURE__ */ new Set());
    }
    aliases.get(alias).add(canonical);
  }
  function fuzzySearch(query, pages, options = {}) {
    const { threshold = 0.6, maxResults = 10 } = options;
    const results = [];
    const queryLower = query.toLowerCase().trim();
    for (const page of pages) {
      const text = page.text || "";
      const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 5);
      for (const sentence of sentences) {
        const sentenceLower = sentence.toLowerCase().trim();
        const score = fuzzyScore(queryLower, sentenceLower);
        if (score >= threshold) {
          results.push({
            text: sentence.trim().substring(0, 300),
            page: page.pageNum,
            score,
            type: "fuzzy"
          });
        }
      }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, maxResults);
  }

  // packages/core/src/concepts.js
  var ConceptNode = class {
    constructor(id, type, text, options = {}) {
      this.id = id;
      this.type = type;
      this.text = text;
      this.page = options.page || 0;
      this.bbox = options.bbox || null;
      this.weight = options.weight || 1;
      this.metadata = options.metadata || {};
      this.occurrences = options.occurrences || [];
    }
  };
  var ConceptEdge = class {
    constructor(sourceId, targetId, relation, options = {}) {
      this.sourceId = sourceId;
      this.targetId = targetId;
      this.relation = relation;
      this.weight = options.weight || 1;
      this.pages = options.pages || [];
      this.evidence = options.evidence || [];
      this.predicate = options.predicate || null;
    }
  };
  var ConceptGraph = class {
    constructor() {
      this.nodes = /* @__PURE__ */ new Map();
      this.edges = /* @__PURE__ */ new Map();
      this.adjacency = /* @__PURE__ */ new Map();
      this.pageIndex = /* @__PURE__ */ new Map();
      this.typeIndex = /* @__PURE__ */ new Map();
      this.textIndex = /* @__PURE__ */ new Map();
    }
    addNode(node) {
      this.nodes.set(node.id, node);
      if (!this.typeIndex.has(node.type)) {
        this.typeIndex.set(node.type, /* @__PURE__ */ new Set());
      }
      this.typeIndex.get(node.type).add(node.id);
      if (!this.pageIndex.has(node.page)) {
        this.pageIndex.set(node.page, /* @__PURE__ */ new Set());
      }
      this.pageIndex.get(node.page).add(node.id);
      const normText = node.text.toLowerCase().trim();
      if (!this.textIndex.has(normText)) {
        this.textIndex.set(normText, /* @__PURE__ */ new Set());
      }
      this.textIndex.get(normText).add(node.id);
      return node;
    }
    addEdge(edge) {
      const edgeKey = `${edge.sourceId}->${edge.targetId}:${edge.relation}`;
      if (this.edges.has(edgeKey)) {
        const existing = this.edges.get(edgeKey);
        existing.weight += edge.weight;
        existing.pages = [.../* @__PURE__ */ new Set([...existing.pages, ...edge.pages])];
        existing.evidence = [...existing.evidence, ...edge.evidence];
        return existing;
      }
      this.edges.set(edgeKey, edge);
      if (!this.adjacency.has(edge.sourceId)) {
        this.adjacency.set(edge.sourceId, /* @__PURE__ */ new Set());
      }
      if (!this.adjacency.has(edge.targetId)) {
        this.adjacency.set(edge.targetId, /* @__PURE__ */ new Set());
      }
      this.adjacency.get(edge.sourceId).add(edgeKey);
      this.adjacency.get(edge.targetId).add(edgeKey);
      return edge;
    }
    getNode(id) {
      return this.nodes.get(id) || null;
    }
    getNeighbors(nodeId, maxDepth = 1) {
      const visited = /* @__PURE__ */ new Set();
      const result = [];
      const traverse = (currentId, depth) => {
        if (depth > maxDepth || visited.has(currentId)) return;
        visited.add(currentId);
        const edgeKeys = this.adjacency.get(currentId) || /* @__PURE__ */ new Set();
        for (const edgeKey of edgeKeys) {
          const edge = this.edges.get(edgeKey);
          if (!edge) continue;
          const neighborId = edge.sourceId === currentId ? edge.targetId : edge.sourceId;
          if (!visited.has(neighborId)) {
            const neighbor = this.nodes.get(neighborId);
            if (neighbor) {
              result.push({
                node: neighbor,
                edge,
                depth
              });
            }
            traverse(neighborId, depth + 1);
          }
        }
      };
      traverse(nodeId, 1);
      return result;
    }
    findByType(type) {
      const nodeIds = this.typeIndex.get(type) || /* @__PURE__ */ new Set();
      return [...nodeIds].map((id) => this.nodes.get(id)).filter(Boolean);
    }
    findByText(text) {
      const normText = text.toLowerCase().trim();
      const nodeIds = this.textIndex.get(normText) || /* @__PURE__ */ new Set();
      return [...nodeIds].map((id) => this.nodes.get(id)).filter(Boolean);
    }
    findByPage(page) {
      const nodeIds = this.pageIndex.get(page) || /* @__PURE__ */ new Set();
      return [...nodeIds].map((id) => this.nodes.get(id)).filter(Boolean);
    }
    /**
     * Find the shortest path between two concepts.
     */
    findPath(sourceId, targetId, maxDepth = 5) {
      const visited = /* @__PURE__ */ new Map();
      const queue = [{ id: sourceId, path: [] }];
      while (queue.length > 0) {
        const { id, path } = queue.shift();
        if (visited.has(id)) continue;
        visited.set(id, path);
        if (id === targetId) {
          return path.map((edgeKey) => this.edges.get(edgeKey)).filter(Boolean);
        }
        if (path.length >= maxDepth) continue;
        const edgeKeys = this.adjacency.get(id) || /* @__PURE__ */ new Set();
        for (const edgeKey of edgeKeys) {
          const edge = this.edges.get(edgeKey);
          if (!edge) continue;
          const neighborId = edge.sourceId === id ? edge.targetId : edge.sourceId;
          if (!visited.has(neighborId)) {
            queue.push({ id: neighborId, path: [...path, edgeKey] });
          }
        }
      }
      return null;
    }
    /**
     * Get all relationships involving a concept.
     */
    getRelationships(nodeId) {
      const edgeKeys = this.adjacency.get(nodeId) || /* @__PURE__ */ new Set();
      return [...edgeKeys].map((key) => this.edges.get(key)).filter(Boolean);
    }
    /**
     * Get the most connected concepts (hub nodes).
     */
    getHubs(limit = 10) {
      const degrees = [];
      for (const [nodeId, edgeKeys] of this.adjacency) {
        degrees.push({
          node: this.nodes.get(nodeId),
          degree: edgeKeys.size
        });
      }
      return degrees.sort((a, b) => b.degree - a.degree).slice(0, limit).filter((d) => d.node);
    }
    /**
     * Get community clusters (connected components by type).
     */
    getCommunities() {
      const visited = /* @__PURE__ */ new Set();
      const communities = [];
      for (const [nodeId] of this.nodes) {
        if (visited.has(nodeId)) continue;
        const community = [];
        const queue = [nodeId];
        while (queue.length > 0) {
          const currentId = queue.shift();
          if (visited.has(currentId)) continue;
          visited.add(currentId);
          const node = this.nodes.get(currentId);
          if (node) community.push(node);
          const edgeKeys = this.adjacency.get(currentId) || /* @__PURE__ */ new Set();
          for (const edgeKey of edgeKeys) {
            const edge = this.edges.get(edgeKey);
            if (!edge) continue;
            const neighborId = edge.sourceId === currentId ? edge.targetId : edge.sourceId;
            if (!visited.has(neighborId)) queue.push(neighborId);
          }
        }
        if (community.length > 0) communities.push(community);
      }
      return communities;
    }
    toJSON() {
      return {
        nodes: [...this.nodes.values()],
        edges: [...this.edges.values()],
        stats: {
          nodeCount: this.nodes.size,
          edgeCount: this.edges.size,
          typeCounts: Object.fromEntries(
            [...this.typeIndex.entries()].map(([type, ids]) => [type, ids.size])
          )
        }
      };
    }
  };
  function extractRelationships(contentGraph, conceptGraph) {
    var _a, _b, _c;
    const relationships = [];
    const pageEntityMap = /* @__PURE__ */ new Map();
    for (const entity of contentGraph.allEntities) {
      if (!pageEntityMap.has(entity.page)) {
        pageEntityMap.set(entity.page, []);
      }
      pageEntityMap.get(entity.page).push(entity);
    }
    for (const [page, entities] of pageEntityMap) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
          const e1 = entities[i];
          const e2 = entities[j];
          if (e1.type === e2.type) continue;
          const predicate = inferPredicate(e1, e2);
          if (predicate) {
            const sourceId = `${e1.type}:${e1.value}`;
            const targetId = `${e2.type}:${e2.value}`;
            const node1 = conceptGraph.addNode(new ConceptNode(
              sourceId,
              e1.type,
              e1.value,
              {
                page,
                bbox: e1.bbox,
                weight: e1.confidence || 0.5
              }
            ));
            const node2 = conceptGraph.addNode(new ConceptNode(
              targetId,
              e2.type,
              e2.value,
              {
                page,
                bbox: e2.bbox,
                weight: e2.confidence || 0.5
              }
            ));
            conceptGraph.addEdge(new ConceptEdge(sourceId, targetId, predicate, {
              weight: 1,
              pages: [page],
              evidence: [`Co-occurrence on page ${page}`],
              predicate
            }));
            relationships.push({
              source: { type: e1.type, value: e1.value },
              target: { type: e2.type, value: e2.value },
              predicate,
              page
            });
          }
        }
      }
    }
    for (const block of contentGraph.allBlocks) {
      if (!block.bbox) continue;
      for (const entity of contentGraph.allEntities) {
        if (!entity.bbox) continue;
        if (areBboxesNear2(block.bbox, entity.bbox, 80)) {
          const blockId = `block:${block.type}:${block.page}`;
          const entityId = `${entity.type}:${entity.value}`;
          conceptGraph.addNode(new ConceptNode(
            blockId,
            block.type,
            (block.text || "").substring(0, 100),
            {
              page: block.page,
              bbox: block.bbox
            }
          ));
          conceptGraph.addEdge(new ConceptEdge(blockId, entityId, "contains", {
            weight: 0.8,
            pages: [block.page],
            evidence: [`Entity found within ${block.type} on page ${block.page}`],
            predicate: "contains"
          }));
        }
      }
    }
    for (const block of contentGraph.allBlocks) {
      if (block.type !== "table" || !block.bbox) continue;
      const tableEntities = contentGraph.allEntities.filter(
        (e) => e.bbox && areBboxesNear2(block.bbox, e.bbox, 150)
      );
      const rows = groupEntitiesByRow(tableEntities);
      for (const row of rows) {
        for (let i = 0; i < row.length; i++) {
          for (let j = i + 1; j < row.length; j++) {
            const e1 = row[i];
            const e2 = row[j];
            if (e1.type === e2.type) continue;
            const predicate = inferPredicate(e1, e2) || "same_row";
            const sourceId = `${e1.type}:${e1.value}`;
            const targetId = `${e2.type}:${e2.value}`;
            conceptGraph.addNode(new ConceptNode(sourceId, e1.type, e1.value, {
              page: e1.page,
              bbox: e1.bbox,
              weight: e1.confidence || 0.5
            }));
            conceptGraph.addNode(new ConceptNode(targetId, e2.type, e2.value, {
              page: e2.page,
              bbox: e2.bbox,
              weight: e2.confidence || 0.5
            }));
            conceptGraph.addEdge(new ConceptEdge(sourceId, targetId, predicate, {
              weight: 1.2,
              pages: [e1.page],
              evidence: [`Same table row on page ${e1.page}`],
              predicate
            }));
            relationships.push({
              source: { type: e1.type, value: e1.value },
              target: { type: e2.type, value: e2.value },
              predicate,
              page: e1.page,
              source_type: "table_row"
            });
          }
        }
      }
    }
    for (const block of contentGraph.allBlocks) {
      if (!block.text || !block.bbox) continue;
      const text = block.text;
      const colonMatch = text.match(/^([A-Z][A-Za-z\s]{2,40}):\s*(.+)$/m);
      if (colonMatch) {
        const label = colonMatch[1].trim();
        const value = colonMatch[2].trim();
        for (const entity of contentGraph.allEntities) {
          if (!entity.bbox) continue;
          if (value.toLowerCase().includes((entity.value || "").toLowerCase()) || (entity.value || "").toLowerCase().includes(value.toLowerCase().substring(0, 20))) {
            if (areBboxesNear2(block.bbox, entity.bbox, 100)) {
              const labelId = `label:${label}:${block.page}`;
              const entityId = `${entity.type}:${entity.value}`;
              conceptGraph.addNode(new ConceptNode(labelId, "label", label, {
                page: block.page,
                bbox: block.bbox
              }));
              conceptGraph.addEdge(new ConceptEdge(labelId, entityId, "label_value", {
                weight: 1.5,
                pages: [block.page],
                evidence: [`Label "${label}" associated with value on page ${block.page}`],
                predicate: "label_value"
              }));
              relationships.push({
                source: { type: "label", value: label },
                target: { type: entity.type, value: entity.value },
                predicate: "label_value",
                page: block.page,
                source_type: "label_value"
              });
            }
          }
        }
      }
    }
    const headingsByPage = /* @__PURE__ */ new Map();
    for (const block of contentGraph.allBlocks) {
      if (block.type === "heading" && block.bbox) {
        if (!headingsByPage.has(block.page)) headingsByPage.set(block.page, []);
        headingsByPage.get(block.page).push(block);
      }
    }
    for (const [page, pageHeadings] of headingsByPage) {
      pageHeadings.sort((a, b) => {
        var _a2, _b2;
        return (((_a2 = a.bbox) == null ? void 0 : _a2[1]) || 0) - (((_b2 = b.bbox) == null ? void 0 : _b2[1]) || 0);
      });
      for (let i = 0; i < pageHeadings.length; i++) {
        const heading = pageHeadings[i];
        const headingId = `heading:${(_a = heading.text) == null ? void 0 : _a.substring(0, 50)}:${page}`;
        conceptGraph.addNode(new ConceptNode(headingId, "heading", heading.text || "", {
          page,
          bbox: heading.bbox
        }));
        const nextY = i < pageHeadings.length - 1 ? ((_b = pageHeadings[i + 1].bbox) == null ? void 0 : _b[1]) || Infinity : Infinity;
        for (const entity of contentGraph.allEntities) {
          if (entity.page === page && entity.bbox && entity.bbox[1] > (((_c = heading.bbox) == null ? void 0 : _c[1]) || 0) && entity.bbox[1] < nextY) {
            const entityId = `${entity.type}:${entity.value}`;
            conceptGraph.addEdge(new ConceptEdge(headingId, entityId, "heading_section", {
              weight: 0.9,
              pages: [page],
              evidence: [`Entity under heading "${heading.text}" on page ${page}`],
              predicate: "heading_section"
            }));
            relationships.push({
              source: { type: "heading", value: heading.text },
              target: { type: entity.type, value: entity.value },
              predicate: "heading_section",
              page,
              source_type: "heading_hierarchy"
            });
          }
        }
      }
    }
    const definitionPages = ((contentGraph == null ? void 0 : contentGraph.pages) || []).map((p) => ({
      pageNum: p.page,
      text: (p.blocks || []).map((b) => b.text || "").join("\n")
    }));
    for (const page of definitionPages) {
      const text = page.text || "";
      const acronyms = detectAcronyms(text);
      for (const acr of acronyms) {
        const fullId = `term:${acr.full.toLowerCase()}`;
        const acrId = `term:${acr.acronym.toLowerCase()}`;
        conceptGraph.addNode(new ConceptNode(fullId, "term", acr.full, { page: page.pageNum }));
        conceptGraph.addNode(new ConceptNode(acrId, "term", acr.acronym, { page: page.pageNum }));
        conceptGraph.addEdge(new ConceptEdge(fullId, acrId, "acronym", {
          weight: 1.5,
          pages: [page.pageNum],
          evidence: [`"${acr.full}" defined as "${acr.acronym}"`],
          predicate: "acronym"
        }));
        relationships.push({
          source: { type: "term", value: acr.full },
          target: { type: "term", value: acr.acronym },
          predicate: "acronym",
          page: page.pageNum,
          source_type: "definition"
        });
      }
    }
    const globalEntities = /* @__PURE__ */ new Map();
    for (const entity of contentGraph.allEntities) {
      const key = `${entity.type}:${(entity.value || "").toLowerCase()}`;
      if (globalEntities.has(key)) {
        globalEntities.get(key).pages.push(entity.page);
      } else {
        globalEntities.set(key, {
          type: entity.type,
          value: entity.value,
          pages: [entity.page]
        });
      }
    }
    for (const [key, data] of globalEntities) {
      if (data.pages.length > 1) {
        const nodeId = `${data.type}:${data.value}`;
        conceptGraph.addNode(new ConceptNode(
          nodeId,
          data.type,
          data.value,
          {
            page: data.pages[0],
            weight: data.pages.length,
            occurrences: data.pages.map((p) => ({ page: p }))
          }
        ));
      }
    }
    return relationships;
  }
  function inferPredicate(e1, e2) {
    const t1 = e1.type;
    const t2 = e2.type;
    if (t1 === "person" && t2 === "organization") return "affiliated_with";
    if (t1 === "organization" && t2 === "person") return "employs";
    if (t1 === "person" && t2 === "date") return "associated_with_date";
    if (t1 === "date" && t2 === "person") return "date_of";
    if (t1 === "currency" && t2 === "person") return "payment_to";
    if (t1 === "currency" && t2 === "organization") return "payment_from";
    if (t1 === "person" && t2 === "currency") return "receives";
    if (t1 === "organization" && t2 === "currency") return "charges";
    if (t1 === "address" && t2 === "person") return "residence_of";
    if (t1 === "address" && t2 === "organization") return "headquarters_of";
    if (t1 === "person" && t2 === "address") return "lives_at";
    if (t1 === "organization" && t2 === "address") return "located_at";
    if (t1 === "ordinance_number" && t2 === "date") return "enacted_on";
    if (t1 === "resolution_number" && t2 === "date") return "passed_on";
    return "associated_with";
  }
  var CodbFingerprint = class _CodbFingerprint {
    constructor() {
      this.toc = [];
      this.entityRegistry = /* @__PURE__ */ new Map();
      this.layoutSignature = {
        columnCounts: [],
        pageTypes: {},
        flowPattern: "unknown"
      };
      this.structureProfile = {
        tableCount: 0,
        formCount: 0,
        listCount: 0,
        headingCount: 0
      };
      this.topicVector = {};
      this.relationshipSignature = {};
      this.metadata = {};
    }
    /**
     * Build fingerprint from a DocumentGraph.
     */
    static fromGraph(graph, ir) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const fp = new _CodbFingerprint();
      fp.toc = (((_a = graph.layout) == null ? void 0 : _a.getAllHeadings()) || []).map((h) => ({
        text: h.text,
        level: h.level,
        page: h.page,
        position: h.y
      }));
      const entities = ((_b = graph._contentGraph) == null ? void 0 : _b.allEntities) || [];
      for (const entity of entities) {
        const key = `${entity.type}:${(entity.value || "").toLowerCase()}`;
        if (!fp.entityRegistry.has(key)) {
          fp.entityRegistry.set(key, {
            type: entity.type,
            value: entity.value,
            pages: [],
            count: 0
          });
        }
        const entry = fp.entityRegistry.get(key);
        if (!entry.pages.includes(entity.page)) {
          entry.pages.push(entity.page);
        }
        entry.count++;
      }
      fp.layoutSignature.columnCounts = ((_d = (_c = graph.layout) == null ? void 0 : _c.pages) == null ? void 0 : _d.map((p) => p.columns)) || [];
      const pageTypes = {};
      for (const c of graph.classifications || []) {
        pageTypes[c.type] = (pageTypes[c.type] || 0) + 1;
      }
      fp.layoutSignature.pageTypes = pageTypes;
      fp.layoutSignature.flowPattern = ((_g = (_f = (_e = graph.layout) == null ? void 0 : _e.pages) == null ? void 0 : _f[0]) == null ? void 0 : _g.flow) || "unknown";
      fp.structureProfile = {
        tableCount: ((_i = (_h = graph.structure) == null ? void 0 : _h.tables) == null ? void 0 : _i.length) || 0,
        formCount: ((_k = (_j = graph.structure) == null ? void 0 : _j.forms) == null ? void 0 : _k.length) || 0,
        listCount: ((_m = (_l = graph.structure) == null ? void 0 : _l.lists) == null ? void 0 : _m.length) || 0,
        headingCount: fp.toc.length
      };
      fp.topicVector = buildTopicVector(graph);
      const contentGraph = graph._contentGraph;
      if (contentGraph) {
        const relCounts = {};
        for (const block of contentGraph.allBlocks) {
          for (const rel of block.relationships || []) {
            relCounts[rel.type] = (relCounts[rel.type] || 0) + 1;
          }
        }
        fp.relationshipSignature = relCounts;
      }
      fp.metadata = {
        pageCount: graph.pageCount,
        wordCount: ((_n = graph.text) == null ? void 0 : _n.wordCount) || 0,
        documentType: ((_p = (_o = graph._contentGraph) == null ? void 0 : _o.documentType) == null ? void 0 : _p.type) || "unknown"
      };
      return fp;
    }
    /**
     * Calculate similarity between two fingerprints.
     * Returns 0.0 to 1.0.
     */
    static similarity(fp1, fp2) {
      let score = 0;
      let weights = 0;
      const toc1 = new Set(fp1.toc.map((h) => h.text.toLowerCase()));
      const toc2 = new Set(fp2.toc.map((h) => h.text.toLowerCase()));
      const tocSim = jaccardSimilarity(toc1, toc2);
      score += tocSim * 3;
      weights += 3;
      const ent1 = new Set(fp1.entityRegistry.keys());
      const ent2 = new Set(fp2.entityRegistry.keys());
      const entSim = jaccardSimilarity(ent1, ent2);
      score += entSim * 2;
      weights += 2;
      const layoutSim = layoutSimilarity(fp1.layoutSignature, fp2.layoutSignature);
      score += layoutSim * 1;
      weights += 1;
      const structSim = structureSimilarity(fp1.structureProfile, fp2.structureProfile);
      score += structSim * 1;
      weights += 1;
      const topicSim = cosineSimilarity(fp1.topicVector, fp2.topicVector);
      score += topicSim * 2;
      weights += 2;
      return weights > 0 ? score / weights : 0;
    }
    toJSON() {
      return {
        toc: this.toc,
        entityRegistry: Object.fromEntries(this.entityRegistry),
        layoutSignature: this.layoutSignature,
        structureProfile: this.structureProfile,
        topicVector: this.topicVector,
        relationshipSignature: this.relationshipSignature,
        metadata: this.metadata
      };
    }
  };
  function bm25Score(query, document2, avgDocLength, k1 = 1.5, b = 0.75) {
    const queryTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    const docTerms = document2.toLowerCase().split(/\s+/);
    const docLength = docTerms.length;
    const tf = {};
    for (const term of docTerms) {
      tf[term] = (tf[term] || 0) + 1;
    }
    let score = 0;
    for (const term of queryTerms) {
      const termFreq = tf[term] || 0;
      if (termFreq === 0) continue;
      const numerator = termFreq * (k1 + 1);
      const denominator = termFreq + k1 * (1 - b + b * docLength / avgDocLength);
      score += numerator / denominator;
    }
    return score;
  }
  function entityScore(query, entities) {
    const queryLower = query.toLowerCase();
    let score = 0;
    for (const entity of entities) {
      const value = (entity.value || "").toLowerCase();
      if (queryLower.includes(value) || value.includes(queryLower)) {
        score += 2;
      } else {
        const queryWords = queryLower.split(/\s+/);
        for (const word of queryWords) {
          if (value.includes(word) && word.length > 2) {
            score += 0.5;
          }
        }
      }
    }
    return score;
  }
  function structureScore(query, blocks, headings) {
    const queryLower = query.toLowerCase();
    let score = 0;
    for (const heading of headings) {
      if (heading.text.toLowerCase().includes(queryLower)) {
        score += 3;
      }
    }
    const typeKeywords = {
      heading: ["title", "heading", "section", "chapter"],
      table: ["table", "data", "spreadsheet", "grid", "column"],
      form_field: ["form", "field", "input", "application", "fill"],
      list: ["list", "items", "bullet", "numbered"],
      invoice_hint: ["invoice", "bill", "payment"],
      receipt_hint: ["receipt", "purchase", "total"],
      signature: ["signature", "signed", "sign here"]
    };
    for (const block of blocks) {
      const keywords = typeKeywords[block.type] || [];
      for (const keyword of keywords) {
        if (queryLower.includes(keyword)) {
          score += 1;
          break;
        }
      }
    }
    return score;
  }
  function hybridSearch(graph, query, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    const {
      maxResults = 20,
      minScore = 0.1,
      includeEvidence = true,
      useExpansion = true,
      rerank = true
    } = options;
    const results = [];
    const contentGraph = graph._contentGraph;
    const fingerprint = graph._fingerprint;
    const conceptGr = graph._conceptGraph;
    const pages = ((_a = graph.text) == null ? void 0 : _a.pages) || [];
    const avgDocLength = pages.reduce((s, p) => {
      var _a2;
      return s + (((_a2 = p.text) == null ? void 0 : _a2.length) || 0);
    }, 0) / (pages.length || 1);
    const expandedTerms = useExpansion ? expandQuery(query, { includeSynonyms: true, includeStems: true }) : [{ term: query.toLowerCase(), weight: 1, sources: ["original"] }];
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1);
    const docVocab = /* @__PURE__ */ new Set();
    for (const page of pages) {
      for (const word of (page.text || "").toLowerCase().split(/\s+/)) {
        if (word.length > 2) docVocab.add(word);
      }
    }
    for (const page of pages) {
      const pageNum = page.pageNum;
      const pageText = page.text || "";
      const pageTextLower = pageText.toLowerCase();
      const signals = {};
      signals.exact = 0;
      for (const term of queryTerms) {
        if (pageTextLower.includes(term)) {
          signals.exact += 2;
        }
      }
      signals.phrase = pageTextLower.includes(queryLower) ? 3 : 0;
      signals.bm25 = bm25Score(query, pageText, avgDocLength);
      signals.fuzzy = 0;
      for (const term of queryTerms) {
        const match = bestFuzzyMatch(term, Array.from(docVocab), 0.7);
        if (match && pageTextLower.includes(match.word)) {
          signals.fuzzy += match.score;
        }
      }
      signals.concept = 0;
      for (const expanded of expandedTerms) {
        if (expanded.weight < 0.5) continue;
        if (pageTextLower.includes(expanded.term)) {
          signals.concept += expanded.weight;
        }
      }
      const pageEntities = ((_b = contentGraph == null ? void 0 : contentGraph.allEntities) == null ? void 0 : _b.filter((e) => e.page === pageNum)) || [];
      signals.entity = entityScore(query, pageEntities);
      const pageBlocks = ((_c = contentGraph == null ? void 0 : contentGraph.allBlocks) == null ? void 0 : _c.filter((b) => b.page === pageNum)) || [];
      const headings = ((_d = graph.layout) == null ? void 0 : _d.getHeadings(pageNum)) || [];
      signals.structure = structureScore(query, pageBlocks, headings);
      signals.relationship = 0;
      if (conceptGr) {
        for (const term of queryTerms) {
          const nodeId = findConceptNode(conceptGr, term);
          if (nodeId) {
            const neighbors = conceptGr.getNeighbors(nodeId);
            signals.relationship += Math.min(neighbors.length * 0.3, 2);
          }
        }
      }
      signals.spatial = 0;
      if (queryTerms.length >= 2) {
        const termPositions = [];
        for (const term of queryTerms) {
          const idx = pageTextLower.indexOf(term);
          if (idx >= 0) termPositions.push(idx);
        }
        if (termPositions.length >= 2) {
          const spread = Math.max(...termPositions) - Math.min(...termPositions);
          signals.spatial = Math.max(0, 2 - spread / 500);
        }
      }
      signals.context = 0;
      for (const heading of headings) {
        if ((_e = heading.text) == null ? void 0 : _e.toLowerCase().includes(queryLower)) {
          signals.context += 2;
        }
      }
      const pageInfo = (_f = graph._pageResults) == null ? void 0 : _f[pageNum - 1];
      if ((_g = pageInfo == null ? void 0 : pageInfo.classification) == null ? void 0 : _g.type) {
        const classType = pageInfo.classification.type.toLowerCase();
        for (const term of queryTerms) {
          if (classType.includes(term)) signals.context += 1;
        }
      }
      const intent = detectIntent(query);
      const weights = getChannelWeights(intent, queryTerms, pageEntities);
      const compositeScore = signals.exact * weights.exact + signals.phrase * weights.phrase + signals.bm25 * weights.bm25 + signals.fuzzy * weights.fuzzy + signals.concept * weights.concept + signals.entity * weights.entity + signals.structure * weights.structure + signals.relationship * weights.relationship + signals.spatial * weights.spatial + signals.context * weights.context;
      if (compositeScore > minScore) {
        const totalWeighted = Object.keys(signals).reduce((s, k) => s + signals[k] * weights[k], 0) || 1;
        const contributions = {};
        for (const [signal, score] of Object.entries(signals)) {
          contributions[signal] = {
            score,
            weight: weights[signal],
            contribution: score * weights[signal] / totalWeighted
          };
        }
        const evidence = includeEvidence ? buildEvidence(pageText, query, pageEntities, pageBlocks, pageNum) : [];
        results.push({
          page: pageNum,
          score: compositeScore,
          signals,
          contributions,
          text: pageText.substring(0, 500),
          entities: pageEntities.map((e) => ({ type: e.type, value: e.value })),
          evidence
        });
      }
    }
    results.sort((a, b) => b.score - a.score);
    if (rerank && results.length > 6) {
      return rerankResults(results, query, { topK: Math.min(maxResults, 30) }).slice(0, maxResults);
    }
    return results.slice(0, maxResults);
  }
  function getChannelWeights(intent, queryTerms, entities) {
    const defaults = {
      exact: 0.15,
      phrase: 0.12,
      bm25: 0.2,
      fuzzy: 0.05,
      concept: 0.1,
      entity: 0.15,
      structure: 0.08,
      relationship: 0.05,
      spatial: 0.05,
      context: 0.05
    };
    if (!intent) return defaults;
    switch (intent.type) {
      case QueryIntent.ENTITY_SEARCH:
        return { ...defaults, entity: 0.3, exact: 0.2, bm25: 0.1, structure: 0.05 };
      case QueryIntent.RELATIONSHIP_LOOKUP:
        return { ...defaults, relationship: 0.25, entity: 0.2, concept: 0.15, bm25: 0.1 };
      case QueryIntent.TABLE_QUERY:
        return { ...defaults, structure: 0.25, entity: 0.15, exact: 0.15, bm25: 0.15 };
      case QueryIntent.COMPARISON:
        return { ...defaults, entity: 0.2, bm25: 0.2, structure: 0.15, concept: 0.1 };
      case QueryIntent.AGGREGATION:
        return { ...defaults, entity: 0.25, bm25: 0.15, structure: 0.15, exact: 0.1 };
      case QueryIntent.COUNT:
        return { ...defaults, entity: 0.2, bm25: 0.15, structure: 0.15, exact: 0.15 };
      case QueryIntent.STRUCTURAL_QUERY:
        return { ...defaults, structure: 0.3, context: 0.2, bm25: 0.1 };
      case QueryIntent.SUMMARY:
        return { ...defaults, bm25: 0.25, concept: 0.15, context: 0.15, structure: 0.1 };
      default:
        return defaults;
    }
  }
  function findConceptNode(conceptGraph, term) {
    const lower = term.toLowerCase();
    for (const [id, node] of conceptGraph.nodes) {
      if (node.text.toLowerCase() === lower || id.toLowerCase().includes(lower)) {
        return id;
      }
    }
    return null;
  }
  function rerankResults(results, query, options = {}) {
    const { topK = 30 } = options;
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1);
    const expandedTerms = expandQuery(query, { includeSynonyms: true, includeStems: true });
    const expandedText = expandedTerms.map((e) => e.term).join(" ");
    const candidates = results.slice(0, topK);
    const reranked = candidates.map((result) => {
      var _a, _b, _c;
      let rerankScore = result.score;
      const bonuses = {};
      const activeSignals = Object.values(result.signals || {}).filter((s) => s > 0).length;
      bonuses.multiSignal = activeSignals >= 3 ? 0.15 : activeSignals >= 2 ? 0.08 : 0;
      if (((_a = result.entities) == null ? void 0 : _a.length) > 0) {
        for (const entity of result.entities) {
          const entityVal = (entity.value || "").toLowerCase();
          if (queryLower.includes(entityVal)) {
            bonuses.exactEntity = 0.25;
            break;
          }
        }
      }
      if (((_b = result.signals) == null ? void 0 : _b.concept) > 1) {
        bonuses.conceptAgreement = 0.1;
      }
      if (((_c = result.signals) == null ? void 0 : _c.structure) > 2) {
        bonuses.structuralRelevance = 0.1;
      }
      if ((result.text || "").length < 50) {
        bonuses.shortPenalty = -0.1;
      }
      if (queryTerms.some((t) => /amount|cost|price|date|who|address/i.test(t)) && (!result.entities || result.entities.length === 0)) {
        bonuses.noEntityPenalty = -0.15;
      }
      const totalBonus = Object.values(bonuses).reduce((s, v) => s + v, 0);
      return {
        ...result,
        score: rerankScore + totalBonus,
        rerankBonuses: bonuses,
        explanation: [
          ...Object.entries(bonuses).filter(([, v]) => v !== 0).map(([k, v]) => `${k}: ${v > 0 ? "+" : ""}${v.toFixed(2)}`)
        ]
      };
    });
    reranked.sort((a, b) => b.score - a.score);
    return reranked;
  }
  var QueryIntent = {
    FACTUAL_LOOKUP: "factual_lookup",
    ENTITY_SEARCH: "entity_search",
    RELATIONSHIP_LOOKUP: "relationship_lookup",
    AGGREGATION: "aggregation",
    TABLE_QUERY: "table_query",
    SPATIAL_QUERY: "spatial_query",
    STRUCTURAL_QUERY: "structural_query",
    SUMMARY: "summary",
    COUNT: "count",
    COMPARISON: "comparison",
    UNKNOWN: "unknown"
  };
  function detectIntent(query) {
    const lower = query.toLowerCase().trim();
    if (/^(how many|count|number of|total)/i.test(lower)) {
      return { type: QueryIntent.COUNT, confidence: 0.9 };
    }
    if (/^(what is the (total|sum|amount)|sum of|add up)/i.test(lower)) {
      return { type: QueryIntent.AGGREGATION, confidence: 0.85 };
    }
    if (/^(what is the (highest|lowest|maximum|minimum|max|min)|most|least|highest|lowest)/i.test(lower)) {
      return { type: QueryIntent.AGGREGATION, confidence: 0.85 };
    }
    if (/^(who|whom|which|what).*(approved|signed|authorized|created|wrote|submitted)/i.test(lower)) {
      return { type: QueryIntent.RELATIONSHIP_LOOKUP, confidence: 0.8 };
    }
    if (/table|column|row|cell|data|spreadsheet|grid/i.test(lower)) {
      return { type: QueryIntent.TABLE_QUERY, confidence: 0.85 };
    }
    if (/^(where|what is the address|location|street)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.8, entityType: "address" };
    }
    if (/^(when|what date|date of)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: "date" };
    }
    if (/^(who is|who are|person|name|author)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: "person" };
    }
    if (/^(how much|what is the (amount|cost|price|total)|money|budget)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: "currency" };
    }
    if (/^(list|what are) (the )?(sections|headings|chapters|topics)/i.test(lower)) {
      return { type: QueryIntent.STRUCTURAL_QUERY, confidence: 0.8 };
    }
    if (/compare|versus|vs\.?|difference between/i.test(lower)) {
      return { type: QueryIntent.COMPARISON, confidence: 0.7 };
    }
    if (/^(summary|summarize|overview|what is (this|the document)|brief)/i.test(lower)) {
      return { type: QueryIntent.SUMMARY, confidence: 0.9 };
    }
    if (/\?/.test(lower) || /^(what|where|when|who|why|how)/i.test(lower)) {
      return { type: QueryIntent.FACTUAL_LOOKUP, confidence: 0.7 };
    }
    return { type: QueryIntent.UNKNOWN, confidence: 0.3 };
  }
  function decomposeQuery(query) {
    const lower = query.toLowerCase();
    const subQueries = [];
    const parts = lower.split(/\s+and\s+|\s+also\s+|\s+as well as\s+/);
    if (parts.length > 1) {
      for (const part of parts) {
        subQueries.push({
          query: part.trim(),
          intent: detectIntent(part.trim())
        });
      }
    }
    const entityPatterns = [
      { pattern: /\$[\d,]+(?:\.\d{2})?/g, type: "currency" },
      { pattern: /\b\d{1,5}\s+[\w\s]+(?:Street|St|Avenue|Ave|Blvd|Road|Rd)/gi, type: "address" },
      { pattern: /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g, type: "date" }
    ];
    for (const { pattern, type } of entityPatterns) {
      const matches = lower.match(pattern);
      if (matches) {
        for (const match of matches) {
          subQueries.push({
            query: match,
            intent: { type: QueryIntent.ENTITY_SEARCH, confidence: 0.9, entityType: type }
          });
        }
      }
    }
    return subQueries.length > 0 ? subQueries : [{ query, intent: detectIntent(query) }];
  }
  function buildEvidence(pageText, query, entities, blocks, pageNum) {
    const evidence = [];
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1);
    const expandedTerms = expandQuery(query, { includeSynonyms: true, includeStems: false });
    const sentences = pageText.split(/[.!?]+/).filter((s) => s.trim().length > 10);
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      const matchCount = queryTerms.filter((t) => sentenceLower.includes(t)).length;
      if (matchCount > 0) {
        evidence.push({
          type: "text_snippet",
          signal: "exact",
          text: sentence.trim().substring(0, 200),
          page: pageNum,
          relevance: matchCount / queryTerms.length,
          contribution: matchCount / queryTerms.length * 0.3
        });
      }
    }
    for (const entity of entities) {
      const value = (entity.value || "").toLowerCase();
      if (queryLower.includes(value) || value.includes(queryLower)) {
        evidence.push({
          type: "entity",
          signal: "entity",
          entity: { type: entity.type, value: entity.value },
          page: pageNum,
          bbox: entity.bbox,
          relevance: 0.9,
          contribution: 0.35
        });
      }
    }
    for (const block of blocks) {
      if (block.text && block.text.toLowerCase().includes(queryLower)) {
        evidence.push({
          type: "block",
          signal: "structure",
          blockType: block.type,
          text: block.text.substring(0, 100),
          page: pageNum,
          bbox: block.bbox,
          relevance: 0.7,
          contribution: 0.2
        });
      }
    }
    for (const expanded of expandedTerms) {
      if (expanded.weight < 0.5) continue;
      const lower = expanded.term.toLowerCase();
      if (pageText.toLowerCase().includes(lower)) {
        evidence.push({
          type: "concept",
          signal: "concept",
          term: expanded.term,
          weight: expanded.weight,
          sources: expanded.sources,
          page: pageNum,
          relevance: expanded.weight * 0.6,
          contribution: 0.15
        });
      }
    }
    evidence.sort((a, b) => b.relevance - a.relevance);
    const totalContribution = evidence.reduce((s, e) => s + (e.contribution || 0), 0);
    if (totalContribution > 0) {
      for (const e of evidence) {
        e.contribution = (e.contribution || 0) / totalContribution;
      }
    }
    return evidence.slice(0, 8);
  }
  function rankResults(results, query) {
    const intent = detectIntent(query);
    const queryLower = query.toLowerCase();
    return results.map((result) => {
      var _a, _b, _c;
      const explanation = [];
      const reasons = [];
      if (result.contributions) {
        for (const [signal, data] of Object.entries(result.contributions)) {
          if (data.contribution > 0.05) {
            reasons.push({
              signal,
              score: data.score,
              weight: data.weight,
              contribution: data.contribution
            });
            explanation.push(`${signal}: ${(data.contribution * 100).toFixed(1)}%`);
          }
        }
      }
      if (intent.type === QueryIntent.ENTITY_SEARCH && ((_a = result.entities) == null ? void 0 : _a.length) > 0) {
        const matchingEntities = result.entities.filter(
          (e) => {
            var _a2;
            return (_a2 = e.value) == null ? void 0 : _a2.toLowerCase().includes(queryLower);
          }
        );
        if (matchingEntities.length > 0) {
          reasons.push({ signal: "exact_entity_match", value: matchingEntities[0].value, contribution: 0.25 });
          explanation.push(`Exact ${intent.entityType || "entity"} match: ${matchingEntities[0].value}`);
        }
      }
      if (intent.type === QueryIntent.TABLE_QUERY && ((_b = result.signals) == null ? void 0 : _b.structure) > 0) {
        reasons.push({ signal: "table_structure", contribution: 0.15 });
        explanation.push("Contains table structure");
      }
      if (intent.type === QueryIntent.RELATIONSHIP_LOOKUP && ((_c = result.signals) == null ? void 0 : _c.relationship) > 0) {
        reasons.push({ signal: "relationship_evidence", contribution: 0.2 });
        explanation.push("Contains relationship evidence");
      }
      return {
        ...result,
        explanation,
        reasons,
        intent,
        confidence: Math.min(result.score * 1.2, 1)
      };
    });
  }
  function operatorCount(graph, criteria) {
    var _a, _b, _c, _d;
    const { entityType, blockType, page, textContains } = criteria;
    let items = [];
    if (entityType) {
      items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    } else if (blockType) {
      items = ((_d = (_c = graph._contentGraph) == null ? void 0 : _c.allBlocks) == null ? void 0 : _d.filter((b) => b.type === blockType)) || [];
    }
    if (page) {
      items = items.filter((i) => i.page === page);
    }
    if (textContains) {
      const lower = textContains.toLowerCase();
      items = items.filter(
        (i) => (i.value || "").toLowerCase().includes(lower) || (i.text || "").toLowerCase().includes(lower)
      );
    }
    return {
      operator: "COUNT",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorSum(graph, criteria) {
    var _a, _b;
    const { entityType = "currency", page, filter } = criteria;
    let items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    if (page) {
      items = items.filter((i) => i.page === page);
    }
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const total = items.reduce((sum, item) => {
      const num2 = parseFloat((item.value || "").replace(/[$,]/g, ""));
      return sum + (isNaN(num2) ? 0 : num2);
    }, 0);
    return {
      operator: "SUM",
      result: total,
      formattedResult: `$${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      itemCount: items.length,
      items,
      criteria
    };
  }
  function operatorMax(graph, criteria) {
    var _a, _b;
    const { entityType = "currency", page, filter } = criteria;
    let items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    if (page) items = items.filter((i) => i.page === page);
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const withValues = items.map((item) => ({
      ...item,
      numericValue: parseFloat((item.value || "").replace(/[$,]/g, ""))
    })).filter((item) => !isNaN(item.numericValue));
    if (withValues.length === 0) {
      return { operator: "MAX", result: null, items: [], criteria };
    }
    withValues.sort((a, b) => b.numericValue - a.numericValue);
    return {
      operator: "MAX",
      result: withValues[0].numericValue,
      formattedResult: `$${withValues[0].numericValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      item: withValues[0],
      allValues: withValues.map((i) => ({ value: i.numericValue, text: i.value, page: i.page })),
      criteria
    };
  }
  function operatorMin(graph, criteria) {
    var _a, _b;
    const { entityType = "currency", page, filter } = criteria;
    let items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    if (page) items = items.filter((i) => i.page === page);
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const withValues = items.map((item) => ({
      ...item,
      numericValue: parseFloat((item.value || "").replace(/[$,]/g, ""))
    })).filter((item) => !isNaN(item.numericValue));
    if (withValues.length === 0) {
      return { operator: "MIN", result: null, items: [], criteria };
    }
    withValues.sort((a, b) => a.numericValue - b.numericValue);
    return {
      operator: "MIN",
      result: withValues[0].numericValue,
      formattedResult: `$${withValues[0].numericValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      item: withValues[0],
      allValues: withValues.map((i) => ({ value: i.numericValue, text: i.value, page: i.page })),
      criteria
    };
  }
  function operatorAvg(graph, criteria) {
    var _a, _b;
    const { entityType = "currency", page, filter } = criteria;
    let items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    if (page) items = items.filter((i) => i.page === page);
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const withValues = items.map((item) => ({
      ...item,
      numericValue: parseFloat((item.value || "").replace(/[$,]/g, ""))
    })).filter((item) => !isNaN(item.numericValue));
    if (withValues.length === 0) {
      return { operator: "AVG", result: null, itemCount: 0, criteria };
    }
    const total = withValues.reduce((s, i) => s + i.numericValue, 0);
    const avg = total / withValues.length;
    return {
      operator: "AVG",
      result: avg,
      formattedResult: `$${avg.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      itemCount: withValues.length,
      total,
      items: withValues,
      criteria
    };
  }
  function operatorBefore(graph, criteria) {
    var _a, _b;
    const { entityType = "date", referenceDate, page } = criteria;
    let items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    if (page) items = items.filter((i) => i.page <= page);
    if (referenceDate) {
      const refTime = new Date(referenceDate).getTime();
      items = items.filter((i) => {
        const itemTime = new Date(i.value).getTime();
        return !isNaN(itemTime) && itemTime < refTime;
      });
    }
    return {
      operator: "BEFORE",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorAfter(graph, criteria) {
    var _a, _b;
    const { entityType = "date", referenceDate, page } = criteria;
    let items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    if (page) items = items.filter((i) => i.page >= page);
    if (referenceDate) {
      const refTime = new Date(referenceDate).getTime();
      items = items.filter((i) => {
        const itemTime = new Date(i.value).getTime();
        return !isNaN(itemTime) && itemTime > refTime;
      });
    }
    return {
      operator: "AFTER",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorBetween(graph, criteria) {
    var _a, _b;
    const { entityType = "currency", low, high, page } = criteria;
    let items = ((_b = (_a = graph._contentGraph) == null ? void 0 : _a.allEntities) == null ? void 0 : _b.filter((e) => e.type === entityType)) || [];
    if (page) items = items.filter((i) => i.page === page);
    items = items.filter((i) => {
      const numVal = parseFloat((i.value || "").replace(/[$,]/g, ""));
      if (!isNaN(numVal) && low !== void 0 && high !== void 0) {
        return numVal >= low && numVal <= high;
      }
      const dateVal = new Date(i.value).getTime();
      if (!isNaN(dateVal) && low !== void 0 && high !== void 0) {
        const lowTime = new Date(low).getTime();
        const highTime = new Date(high).getTime();
        return dateVal >= lowTime && dateVal <= highTime;
      }
      return false;
    });
    return {
      operator: "BETWEEN",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorGroupBy(graph, criteria) {
    var _a;
    const { entityType, groupBy = "page" } = criteria;
    let items = ((_a = graph._contentGraph) == null ? void 0 : _a.allEntities) || [];
    if (entityType) {
      items = items.filter((i) => i.type === entityType);
    }
    const groups = /* @__PURE__ */ new Map();
    for (const item of items) {
      let key;
      switch (groupBy) {
        case "page":
          key = `page_${item.page}`;
          break;
        case "type":
          key = item.type;
          break;
        case "value":
          key = (item.value || "").substring(0, 20);
          break;
        default:
          key = "all";
      }
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }
    const result = {};
    for (const [key, groupItems] of groups) {
      result[key] = {
        count: groupItems.length,
        items: groupItems
      };
    }
    return {
      operator: "GROUP_BY",
      result,
      groupCount: groups.size,
      totalItems: items.length,
      criteria
    };
  }
  function executeReasoning(graph, query) {
    var _a;
    const lower = query.toLowerCase();
    const intent = detectIntent(query);
    if (intent.type === QueryIntent.COUNT) {
      const criteria = {};
      if (/ordinance/i.test(lower)) criteria.entityType = "ordinance_number";
      else if (/resolution/i.test(lower)) criteria.entityType = "resolution_number";
      else if (/permit/i.test(lower)) criteria.entityType = "permit_number";
      else if (/person|people|name/i.test(lower)) criteria.entityType = "person";
      else if (/organization|department|company/i.test(lower)) criteria.entityType = "organization";
      else if (/date/i.test(lower)) criteria.entityType = "date";
      else if (/email/i.test(lower)) criteria.entityType = "email";
      else if (/phone/i.test(lower)) criteria.entityType = "phone";
      else if (/address/i.test(lower)) criteria.entityType = "address";
      else if (/currency|amount|dollar|\$/i.test(lower)) criteria.entityType = "currency";
      else if (/table/i.test(lower)) criteria.blockType = "table";
      else if (/form/i.test(lower)) criteria.blockType = "form_field";
      else if (/heading|section/i.test(lower)) criteria.blockType = "heading";
      const result = operatorCount(graph, criteria);
      return {
        answer: `Found ${result.result} ${criteria.entityType || criteria.blockType || "items"}.`,
        confidence: 0.9,
        evidence: result.items.slice(0, 5).map((i) => ({
          text: i.value || i.text,
          page: i.page,
          type: i.type
        })),
        reasoning: { intent: QueryIntent.COUNT, operator: "COUNT", criteria, result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /total|sum/i.test(lower)) {
      const criteria = { entityType: "currency" };
      const filterWords = lower.replace(/(what is the|total|sum|of|for|in|all)\s*/g, "").trim();
      if (filterWords.length > 2) criteria.filter = filterWords;
      const result = operatorSum(graph, criteria);
      return {
        answer: result.itemCount > 0 ? `The total is ${result.formattedResult} (from ${result.itemCount} value(s)).` : "No monetary values found matching this query.",
        confidence: 0.85,
        evidence: result.items.slice(0, 5).map((i) => ({ text: i.value, page: i.page })),
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "SUM", criteria, result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /average|avg|mean/i.test(lower)) {
      const criteria = { entityType: "currency" };
      const filterWords = lower.replace(/(what is the|average|avg|mean|of|for|in|all)\s*/g, "").trim();
      if (filterWords.length > 2) criteria.filter = filterWords;
      const result = operatorAvg(graph, criteria);
      return {
        answer: result.itemCount > 0 ? `The average is ${result.formattedResult} (from ${result.itemCount} value(s)).` : "No monetary values found matching this query.",
        confidence: 0.85,
        evidence: ((_a = result.items) == null ? void 0 : _a.slice(0, 5).map((i) => ({ text: i.value, page: i.page }))) || [],
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "AVG", criteria, result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /highest|maximum|max|most/i.test(lower)) {
      const result = operatorMax(graph, { entityType: "currency" });
      return {
        answer: result.result !== null ? `The highest value is ${result.formattedResult}.` : "No monetary values found.",
        confidence: 0.85,
        evidence: result.item ? [{ text: result.item.value, page: result.item.page }] : [],
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "MAX", result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /lowest|minimum|min|least/i.test(lower)) {
      const result = operatorMin(graph, { entityType: "currency" });
      return {
        answer: result.result !== null ? `The lowest value is ${result.formattedResult}.` : "No monetary values found.",
        confidence: 0.85,
        evidence: result.item ? [{ text: result.item.value, page: result.item.page }] : [],
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "MIN", result: result.result }
      };
    }
    if (/before|earlier|prior|previous|since|after|later|following/i.test(lower)) {
      const isBefore = /before|earlier|prior|previous/i.test(lower);
      const operator = isBefore ? operatorBefore : operatorAfter;
      const dateMatch = lower.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
      const criteria = { entityType: "date" };
      if (dateMatch) criteria.referenceDate = dateMatch[0];
      const result = operator(graph, criteria);
      return {
        answer: `Found ${result.result} date(s) ${isBefore ? "before" : "after"} the reference.`,
        confidence: 0.8,
        evidence: result.items.slice(0, 5).map((i) => ({ text: i.value, page: i.page })),
        reasoning: { intent: intent.type, operator: isBefore ? "BEFORE" : "AFTER", criteria, result: result.result }
      };
    }
    if (/between|from.*to|range/i.test(lower)) {
      const numbers = lower.match(/\d[\d,]*(?:\.\d+)?/g);
      if (numbers && numbers.length >= 2) {
        const low = parseFloat(numbers[0].replace(/,/g, ""));
        const high = parseFloat(numbers[1].replace(/,/g, ""));
        const criteria = { entityType: "currency", low, high };
        const result = operatorBetween(graph, criteria);
        return {
          answer: `Found ${result.result} value(s) between ${low} and ${high}.`,
          confidence: 0.85,
          evidence: result.items.slice(0, 5).map((i) => ({ text: i.value, page: i.page })),
          reasoning: { intent: intent.type, operator: "BETWEEN", criteria, result: result.result }
        };
      }
    }
    if (/group|breakdown|distribution|by (page|type|category)/i.test(lower)) {
      let groupBy = "page";
      if (/by type|by category|per type/i.test(lower)) groupBy = "type";
      let entityType;
      if (/currency|amount|dollar/i.test(lower)) entityType = "currency";
      else if (/person|name/i.test(lower)) entityType = "person";
      else if (/date/i.test(lower)) entityType = "date";
      const result = operatorGroupBy(graph, { entityType, groupBy });
      return {
        answer: `Grouped ${result.totalItems} items into ${result.groupCount} groups by ${groupBy}.`,
        confidence: 0.8,
        evidence: [],
        reasoning: { intent: intent.type, operator: "GROUP_BY", result: result.groupCount }
      };
    }
    return null;
  }
  function jaccardSimilarity(set1, set2) {
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = /* @__PURE__ */ new Set([...set1, ...set2]);
    return union.size > 0 ? intersection.size / union.size : 0;
  }
  function cosineSimilarity(vec1, vec2) {
    const keys1 = Object.keys(vec1);
    const keys2 = Object.keys(vec2);
    const allKeys = /* @__PURE__ */ new Set([...keys1, ...keys2]);
    if (allKeys.size === 0) return 0;
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    for (const key of allKeys) {
      const v1 = vec1[key] || 0;
      const v2 = vec2[key] || 0;
      dotProduct += v1 * v2;
      norm1 += v1 * v1;
      norm2 += v2 * v2;
    }
    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
    return denominator > 0 ? dotProduct / denominator : 0;
  }
  function layoutSimilarity(l1, l2) {
    const types1 = Object.keys(l1.pageTypes);
    const types2 = Object.keys(l2.pageTypes);
    const allTypes = /* @__PURE__ */ new Set([...types1, ...types2]);
    if (allTypes.size === 0) return 1;
    let similarity = 0;
    for (const type of allTypes) {
      const v1 = l1.pageTypes[type] || 0;
      const v2 = l2.pageTypes[type] || 0;
      similarity += 1 - Math.abs(v1 - v2) / Math.max(v1 + v2, 1);
    }
    return similarity / allTypes.size;
  }
  function structureSimilarity(s1, s2) {
    const fields = ["tableCount", "formCount", "listCount", "headingCount"];
    let similarity = 0;
    for (const field of fields) {
      const v1 = s1[field] || 0;
      const v2 = s2[field] || 0;
      similarity += 1 - Math.abs(v1 - v2) / Math.max(v1 + v2, 1);
    }
    return similarity / fields.length;
  }
  function buildTopicVector(graph) {
    var _a, _b, _c;
    const vector = {};
    const headings = ((_a = graph.layout) == null ? void 0 : _a.getAllHeadings()) || [];
    for (const heading of headings) {
      const words = heading.text.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      for (const word of words) {
        vector[word] = (vector[word] || 0) + 2;
      }
    }
    const entities = ((_b = graph._contentGraph) == null ? void 0 : _b.allEntities) || [];
    for (const entity of entities) {
      const words = (entity.value || "").toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      for (const word of words) {
        vector[word] = (vector[word] || 0) + 1;
      }
    }
    const blocks = ((_c = graph._contentGraph) == null ? void 0 : _c.allBlocks) || [];
    for (const block of blocks.slice(0, 50)) {
      const words = (block.text || "").toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      for (const word of words) {
        vector[word] = (vector[word] || 0) + 0.5;
      }
    }
    const maxVal = Math.max(...Object.values(vector), 1);
    for (const key of Object.keys(vector)) {
      vector[key] = vector[key] / maxVal;
    }
    return vector;
  }
  function areBboxesNear2(bbox1, bbox2, threshold) {
    const cx1 = bbox1[0] + bbox1[2] / 2;
    const cy1 = bbox1[1] + bbox1[3] / 2;
    const cx2 = bbox2[0] + bbox2[2] / 2;
    const cy2 = bbox2[1] + bbox2[3] / 2;
    const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
    return dist < threshold;
  }
  function groupEntitiesByRow(entities) {
    var _a, _b;
    if (entities.length === 0) return [];
    const sorted = [...entities].sort((a, b) => {
      var _a2, _b2;
      return (((_a2 = a.bbox) == null ? void 0 : _a2[1]) || 0) - (((_b2 = b.bbox) == null ? void 0 : _b2[1]) || 0);
    });
    const rows = [];
    let currentRow = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      if (Math.abs((((_a = curr.bbox) == null ? void 0 : _a[1]) || 0) - (((_b = prev.bbox) == null ? void 0 : _b[1]) || 0)) < 15) {
        currentRow.push(curr);
      } else {
        rows.push(currentRow);
        currentRow = [curr];
      }
    }
    rows.push(currentRow);
    return rows;
  }
  function buildTableObjects(contentGraph, conceptGraph) {
    var _a, _b;
    const tables = [];
    const tableBlocks = contentGraph.allBlocks.filter((b) => b.type === "table");
    for (const block of tableBlocks) {
      if (!block.bbox) continue;
      const cellTexts = contentGraph.allBlocks.filter(
        (b) => b.bbox && b.type !== "table" && b.bbox[0] >= block.bbox[0] - 10 && b.bbox[1] >= block.bbox[1] - 10 && b.bbox[0] + (b.bbox[2] || 0) <= block.bbox[0] + block.bbox[2] + 10 && b.bbox[1] + (b.bbox[3] || 0) <= block.bbox[1] + block.bbox[3] + 10
      ).sort((a, b) => {
        const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
        if (Math.abs(yDiff) > 10) return yDiff;
        return (a.bbox[0] || 0) - (b.bbox[0] || 0);
      });
      const cellRows = [];
      let currentRow = cellTexts.length > 0 ? [cellTexts[0]] : [];
      for (let i = 1; i < cellTexts.length; i++) {
        const prev = cellTexts[i - 1];
        const curr = cellTexts[i];
        if (Math.abs((((_a = curr.bbox) == null ? void 0 : _a[1]) || 0) - (((_b = prev.bbox) == null ? void 0 : _b[1]) || 0)) < 10) {
          currentRow.push(curr);
        } else {
          cellRows.push(currentRow);
          currentRow = [curr];
        }
      }
      if (currentRow.length > 0) cellRows.push(currentRow);
      if (cellRows.length === 0) continue;
      const headers = cellRows[0].map((cell) => (cell.text || "").trim());
      const rows = cellRows.slice(1).map(
        (row) => row.map((cell) => (cell.text || "").trim())
      );
      const tableEntities = (contentGraph.allEntities || []).filter(
        (e) => e.bbox && areBboxesNear2(block.bbox, e.bbox, 150)
      );
      const table = {
        id: `table_${block.page}_${block.bbox[0]}_${block.bbox[1]}`,
        page: block.page,
        bbox: block.bbox,
        headers,
        rows,
        rowCount: rows.length,
        colCount: headers.length,
        entities: tableEntities.map((e) => ({ type: e.type, value: e.value, bbox: e.bbox })),
        text: block.text || "",
        relationships: []
      };
      const entityRows = groupEntitiesByRow(tableEntities.filter((e) => e.bbox));
      for (const row of entityRows) {
        for (let i = 0; i < row.length; i++) {
          for (let j = i + 1; j < row.length; j++) {
            table.relationships.push({
              source: { type: row[i].type, value: row[i].value },
              target: { type: row[j].type, value: row[j].value },
              predicate: "same_row"
            });
          }
        }
      }
      tables.push(table);
    }
    return tables;
  }
  function queryTable(table, conditions) {
    if (!table || !table.rows || table.rows.length === 0) return [];
    const { column, gt, lt, eq, contains, where } = conditions || {};
    let results = table.rows.map((row, idx) => {
      const obj = {};
      for (let c = 0; c < table.headers.length; c++) {
        obj[table.headers[c]] = row[c] || "";
      }
      obj._rowIndex = idx;
      return obj;
    });
    if (column && gt !== void 0) {
      results = results.filter((row) => {
        const val = parseFloat((row[column] || "").replace(/[$,]/g, ""));
        return !isNaN(val) && val > gt;
      });
    }
    if (column && lt !== void 0) {
      results = results.filter((row) => {
        const val = parseFloat((row[column] || "").replace(/[$,]/g, ""));
        return !isNaN(val) && val < lt;
      });
    }
    if (column && eq !== void 0) {
      results = results.filter((row) => row[column] === eq);
    }
    if (column && contains) {
      results = results.filter((row) => (row[column] || "").toLowerCase().includes(contains.toLowerCase()));
    }
    if (where) {
      for (const [col, condition] of Object.entries(where)) {
        if (condition.gt !== void 0) {
          results = results.filter((row) => {
            const val = parseFloat((row[col] || "").replace(/[$,]/g, ""));
            return !isNaN(val) && val > condition.gt;
          });
        }
        if (condition.lt !== void 0) {
          results = results.filter((row) => {
            const val = parseFloat((row[col] || "").replace(/[$,]/g, ""));
            return !isNaN(val) && val < condition.lt;
          });
        }
      }
    }
    return results;
  }

  // packages/core/src/docaccess.js
  function escapeHTML3(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function wcagAudit(ir) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
    const issues = [];
    let score = 100;
    const criteria = {};
    criteria["1.1.1"] = { name: "Non-text Content", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (!obj) continue;
        if (obj.type === "image") {
          if (!((_a = obj.accessibility) == null ? void 0 : _a.alt) && ((_b = obj.accessibility) == null ? void 0 : _b.alt) !== "") {
            criteria["1.1.1"].status = "fail";
            criteria["1.1.1"].issues.push(objId);
            issues.push({
              type: "missing_alt_text",
              wcag: "1.1.1",
              page: pageNum,
              element: objId,
              severity: "error",
              message: "Image has no alternative text",
              suggestion: 'Add descriptive alt text or mark as decorative (alt="")'
            });
            score -= 5;
          }
        }
      }
    }
    criteria["1.3.1"] = { name: "Info and Relationships", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      const headings = (page.content || []).map((id) => ir.objects[id]).filter((obj) => {
        var _a2;
        return ((_a2 = obj == null ? void 0 : obj.semantic) == null ? void 0 : _a2.role) === "heading";
      });
      let prevLevel = 0;
      for (const heading of headings) {
        const level2 = heading.semantic.level || 1;
        if (level2 > prevLevel + 1 && prevLevel > 0) {
          criteria["1.3.1"].status = "fail";
          criteria["1.3.1"].issues.push(heading.id);
          issues.push({
            type: "heading_skip",
            wcag: "1.3.1",
            page: pageNum,
            element: heading.id,
            severity: "warning",
            message: `Heading level skipped from H${prevLevel} to H${level2}`,
            suggestion: `Use H${prevLevel + 1} instead`
          });
          score -= 2;
        }
        prevLevel = level2;
      }
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (((_c = obj == null ? void 0 : obj.semantic) == null ? void 0 : _c.role) === "table") {
          if (!((_d = obj.semantic) == null ? void 0 : _d.caption) && !((_e = obj.accessibility) == null ? void 0 : _e.summary)) {
            criteria["1.3.1"].status = "fail";
            criteria["1.3.1"].issues.push(objId);
            issues.push({
              type: "table_no_caption",
              wcag: "1.3.1",
              page: pageNum,
              element: objId,
              severity: "warning",
              message: "Table has no caption or summary",
              suggestion: "Add a <caption> element describing the table"
            });
            score -= 2;
          }
        }
        if (((_f = obj == null ? void 0 : obj.semantic) == null ? void 0 : _f.role) === "list") {
          const items = ((_g = obj.semantic) == null ? void 0 : _g.items) || [];
          if (items.length === 0) {
            criteria["1.3.1"].status = "fail";
            issues.push({
              type: "empty_list",
              wcag: "1.3.1",
              page: pageNum,
              element: objId,
              severity: "warning",
              message: "List has no items",
              suggestion: "Add list items or remove the empty list"
            });
            score -= 1;
          }
        }
      }
    }
    criteria["1.4.3"] = { name: "Contrast (Minimum)", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if ((obj == null ? void 0 : obj.type) === "text" && ((_h = obj.raw) == null ? void 0 : _h.color) && ((_i = obj.raw) == null ? void 0 : _i.bgColor)) {
          const ratio = computeContrastRatio(obj.raw.color, obj.raw.bgColor);
          if (ratio < 4.5) {
            criteria["1.4.3"].status = "fail";
            criteria["1.4.3"].issues.push(objId);
            issues.push({
              type: "low_contrast",
              wcag: "1.4.3",
              page: parseInt(pageId.split("_")[1]),
              element: objId,
              severity: "warning",
              message: `Text contrast ratio ${ratio.toFixed(2)}:1 is below 4.5:1 minimum`,
              suggestion: "Increase contrast between text and background colors"
            });
            score -= 3;
          }
        }
      }
    }
    criteria["1.4.11"] = { name: "Non-text Contrast", status: "pass", issues: [] };
    criteria["2.1.1"] = { name: "Keyboard", status: "pass", issues: [] };
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (((_j = obj == null ? void 0 : obj.semantic) == null ? void 0 : _j.role) === "form_field" || ((_k = obj == null ? void 0 : obj.semantic) == null ? void 0 : _k.role) === "link") {
        if (((_l = obj.accessibility) == null ? void 0 : _l.tabindex) === -1) {
          criteria["2.1.1"].status = "fail";
          issues.push({
            type: "keyboard_trap",
            wcag: "2.1.1",
            element: id,
            severity: "error",
            message: "Interactive element is not keyboard accessible",
            suggestion: 'Remove tabindex="-1" or ensure element can be reached via keyboard'
          });
          score -= 5;
        }
      }
    }
    criteria["2.4.1"] = { name: "Bypass Blocks", status: "pass", issues: [] };
    criteria["2.4.2"] = { name: "Page Titled", status: "pass", issues: [] };
    if (!((_m = ir.document.metadata) == null ? void 0 : _m.title)) {
      criteria["2.4.2"].status = "fail";
      issues.push({
        type: "missing_title",
        wcag: "2.4.2",
        severity: "error",
        message: "Document has no title",
        suggestion: "Add a descriptive <title> element"
      });
      score -= 5;
    }
    criteria["2.4.6"] = { name: "Headings and Labels", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (((_n = obj == null ? void 0 : obj.semantic) == null ? void 0 : _n.role) === "heading" && (!((_o = obj.semantic) == null ? void 0 : _o.text) || obj.semantic.text.trim() === "")) {
          criteria["2.4.6"].status = "fail";
          issues.push({
            type: "empty_heading",
            wcag: "2.4.6",
            page: parseInt(pageId.split("_")[1]),
            element: objId,
            severity: "warning",
            message: "Heading element has no text content",
            suggestion: "Add descriptive text to the heading"
          });
          score -= 2;
        }
      }
    }
    criteria["3.1.1"] = { name: "Language of Page", status: "pass", issues: [] };
    if (!((_p = ir.document.metadata) == null ? void 0 : _p.language)) {
      criteria["3.1.1"].status = "fail";
      issues.push({
        type: "missing_language",
        wcag: "3.1.1",
        severity: "error",
        message: "Document language is not specified",
        suggestion: "Set the lang attribute on the <html> element"
      });
      score -= 5;
    }
    criteria["3.1.2"] = { name: "Language of Parts", status: "pass", issues: [] };
    criteria["4.1.2"] = { name: "Name, Role, Value", status: "pass", issues: [] };
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (((_q = obj == null ? void 0 : obj.semantic) == null ? void 0 : _q.role) === "form_field") {
        if (!((_r = obj.accessibility) == null ? void 0 : _r.label) && !((_s = obj.accessibility) == null ? void 0 : _s.labelledby)) {
          criteria["4.1.2"].status = "fail";
          issues.push({
            type: "form_no_label",
            wcag: "4.1.2",
            element: id,
            severity: "error",
            message: "Form field has no accessible label",
            suggestion: "Add an aria-label or associate a <label> element"
          });
          score -= 5;
        }
      }
    }
    const hasErrors = issues.some((i) => i.severity === "error");
    const hasWarnings = issues.some((i) => i.severity === "warning");
    let level = "AAA";
    if (score < 60) level = "fail";
    else if (score < 80 || hasErrors) level = "A";
    else if (score < 95 || hasWarnings) level = "AA";
    return {
      score: Math.max(0, score),
      level,
      issues,
      wcagCriteria: criteria,
      summary: {
        totalIssues: issues.length,
        errors: issues.filter((i) => i.severity === "error").length,
        warnings: issues.filter((i) => i.severity === "warning").length,
        info: issues.filter((i) => i.severity === "info").length,
        criteriaMet: Object.values(criteria).filter((c) => c.status === "pass").length,
        criteriaTotal: Object.keys(criteria).length
      }
    };
  }
  function parseColor(color) {
    if (!color) return null;
    if (Array.isArray(color)) {
      return { r: color[0] || 0, g: color[1] || 0, b: color[2] || 0 };
    }
    if (typeof color === "string") {
      const hex = color.replace("#", "");
      if (hex.length === 6) {
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16)
        };
      }
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
      }
    }
    return null;
  }
  function relativeLuminance({ r, g, b }) {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  function computeContrastRatio(fg, bg) {
    const fgColor = parseColor(fg);
    const bgColor = parseColor(bg);
    if (!fgColor || !bgColor) return 21;
    const l1 = relativeLuminance(fgColor);
    const l2 = relativeLuminance(bgColor);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  function exportAccessibleHTML(ir, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    const {
      mode = "accessible",
      includeSkipNav = true,
      includeLandmarks = true,
      includeKeyboardNav = true,
      includeAriaLive = true,
      enforceHeadingHierarchy = true,
      wrapImagesInFigures = true,
      includeDataAttributes: includeDataAttributes2 = true,
      includeStyles = true,
      customStyles = "",
      lang
    } = options;
    const docLang = lang || ((_a = ir.document.metadata) == null ? void 0 : _a.language) || "en";
    const title = ((_b = ir.document.metadata) == null ? void 0 : _b.title) || "Document";
    const author = ((_c = ir.document.metadata) == null ? void 0 : _c.author) || "";
    let html = "<!DOCTYPE html>\n";
    html += `<html lang="${escapeHTML3(docLang)}">
`;
    html += "<head>\n";
    html += '<meta charset="UTF-8">\n';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += `<title>${escapeHTML3(title)}</title>
`;
    if (author) html += `<meta name="author" content="${escapeHTML3(author)}">
`;
    html += '<meta name="description" content="Accessible document export from CodbDocs">\n';
    if (includeStyles) {
      html += generateAccessibleStyles2();
    }
    if (customStyles) {
      html += `<style>
${customStyles}
</style>
`;
    }
    html += "</head>\n";
    html += "<body>\n";
    if (includeSkipNav) {
      html += generateSkipNav(ir);
    }
    if (includeLandmarks) {
      html += '<header role="banner" aria-label="Document header">\n';
      html += `  <h1>${escapeHTML3(title)}</h1>
`;
      if (author) {
        html += `  <p class="doc-author">By ${escapeHTML3(author)}</p>
`;
      }
      const date = ((_d = ir.document.metadata) == null ? void 0 : _d.creationDate) || ((_e = ir.document.metadata) == null ? void 0 : _e.modDate);
      if (date) {
        html += `  <p class="doc-date"><time datetime="${escapeHTML3(date)}">${escapeHTML3(date)}</time></p>
`;
      }
      html += "</header>\n";
    }
    html += '<main id="main-content" role="main" aria-label="Document content">\n';
    if (includeAriaLive) {
      html += '  <div id="doc-status" role="status" aria-live="polite" class="visually-hidden"></div>\n';
    }
    const pageCount = ir.document.pages.length;
    if (pageCount > 1) {
      html += '  <nav aria-label="Page navigation">\n';
      html += '    <ul class="page-nav">\n';
      for (const pageId of ir.document.pages) {
        const page = ir.pages[pageId];
        if (!page) continue;
        const label = ((_f = page.labels) == null ? void 0 : _f.print) || `Page ${page.num}`;
        html += `      <li><a href="#${pageId}" aria-label="Go to ${escapeHTML3(label)}">${escapeHTML3(label)}</a></li>
`;
      }
      html += "    </ul>\n";
      html += "  </nav>\n";
    }
    let headingTracker = { current: 0, enforced: enforceHeadingHierarchy };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      const pageLabel = ((_g = page.labels) == null ? void 0 : _g.print) || `Page ${pageNum}`;
      const dataAttr = includeDataAttributes2 ? ` data-pdf-page="${pageNum}" data-pdf-page-id="${pageId}"` : "";
      html += `
  <section id="${pageId}" class="pdf-page"${dataAttr} aria-label="${escapeHTML3(pageLabel)}">
`;
      html += `    <h2 class="page-heading" aria-label="${escapeHTML3(pageLabel)}">${escapeHTML3(pageLabel)}</h2>
`;
      if (page.background) {
        html += `    <div class="pdf-page-raster" aria-hidden="true">
`;
        html += `      <img src="${page.background}" alt="" width="${page.width}" height="${page.height}">
`;
        html += `    </div>
`;
      }
      html += renderAccessiblePage(page, ir, {
        pageNum,
        includeDataAttributes: includeDataAttributes2,
        enforceHeadingHierarchy,
        headingTracker,
        wrapImagesInFigures,
        mode
      });
      html += "  </section>\n";
    }
    html += "</main>\n";
    html += '<script type="application/json" id="codbdocs-rag" data-page-count="' + (ir.document.pages.length || 0) + '">' + JSON.stringify(buildAccessibleRAGPayload(ir)).replace(/</g, "\\u003c") + "<\/script>\n";
    if (includeLandmarks) {
      html += '<footer role="contentinfo" aria-label="Document footer">\n';
      html += '  <p>Generated by <a href="https://github.com/CityofDaytonaBeach/codbdocs">CodbDocs</a></p>\n';
      html += `  <p>${pageCount} page${pageCount !== 1 ? "s" : ""}</p>
`;
      html += "</footer>\n";
    }
    if (includeKeyboardNav) {
      html += generateKeyboardScript();
    }
    html += "</body>\n</html>";
    return html;
  }
  function buildAccessibleRAGPayload(ir) {
    return buildRAGContext(ir, null);
  }
  function generateSkipNav(ir) {
    var _a;
    let html = "<!-- Skip Navigation -->\n";
    html += '<a href="#main-content" class="skip-link" id="skip-to-main">Skip to main content</a>\n';
    if (ir.document.pages.length > 5) {
      html += '<nav aria-label="Quick page access" class="skip-page-nav">\n';
      html += "  <ul>\n";
      for (const pageId of ir.document.pages) {
        const page = ir.pages[pageId];
        if (!page) continue;
        const label = ((_a = page.labels) == null ? void 0 : _a.print) || `Page ${page.num}`;
        html += `    <li><a href="#${pageId}" class="skip-link">${escapeHTML3(label)}</a></li>
`;
      }
      html += "  </ul>\n";
      html += "</nav>\n";
    }
    return html;
  }
  function renderAccessiblePage(page, ir, opts) {
    var _a, _b;
    let html = "";
    const { pageNum, includeDataAttributes: includeDataAttributes2, enforceHeadingHierarchy, headingTracker, wrapImagesInFigures, mode } = opts;
    const objects = (page.content || []).map((id) => ir.objects[id]).filter((obj) => obj && obj.bbox).sort((a, b) => {
      const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
      if (Math.abs(yDiff) > 10) return yDiff;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    });
    for (const obj of objects) {
      const dataAttr = includeDataAttributes2 ? ` data-pdf-object="${obj.id}"` : "";
      switch ((_a = obj.semantic) == null ? void 0 : _a.role) {
        case "heading":
          html += renderAccessibleHeading(obj, { dataAttr, headingTracker, enforceHeadingHierarchy });
          break;
        case "table":
          html += renderAccessibleTable(obj, ir, { dataAttr, pageNum });
          break;
        case "list":
          html += renderAccessibleList(obj, ir, { dataAttr });
          break;
        case "form_field":
          html += renderAccessibleFormField(obj, ir, { dataAttr });
          break;
        case "link":
          html += renderAccessibleLink(obj, { dataAttr });
          break;
        case "separator":
          html += `    <hr${dataAttr} aria-hidden="true">
`;
          break;
        default:
          if (obj.type === "image") {
            html += renderAccessibleImage(obj, { dataAttr, wrapImagesInFigures, mode });
          } else if (obj.type === "text") {
            html += renderAccessibleText(obj, { dataAttr });
          }
          break;
      }
    }
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (!vec) continue;
      if (((_b = vec.semantic) == null ? void 0 : _b.role) === "separator") {
        const dataAttr = includeDataAttributes2 ? ` data-pdf-vector="${vec.id}"` : "";
        html += `    <hr${dataAttr} aria-hidden="true">
`;
      }
    }
    return html;
  }
  function renderAccessibleHeading(obj, opts) {
    var _a, _b, _c, _d;
    const { dataAttr, headingTracker, enforceHeadingHierarchy } = opts;
    let level = ((_a = obj.semantic) == null ? void 0 : _a.level) || 2;
    if (enforceHeadingHierarchy) {
      if (level > headingTracker.current + 1 && headingTracker.current > 0) {
        level = headingTracker.current + 1;
      }
      headingTracker.current = level;
    }
    const text = escapeHTML3(((_b = obj.semantic) == null ? void 0 : _b.text) || "");
    if (!text) return "";
    const id = obj.id || `heading-${(_c = obj.bbox) == null ? void 0 : _c[0]}-${(_d = obj.bbox) == null ? void 0 : _d[1]}`;
    return `    <h${level} id="${id}"${dataAttr}>${text}</h${level}>
`;
  }
  function renderAccessibleTable(obj, ir, opts) {
    var _a, _b, _c, _d;
    const { dataAttr, pageNum } = opts;
    let html = "";
    const tableId = obj.id || `table-${pageNum}`;
    const caption = ((_a = obj.semantic) == null ? void 0 : _a.caption) || "";
    const summary = ((_b = obj.accessibility) == null ? void 0 : _b.summary) || "";
    const rows = ((_c = obj.semantic) == null ? void 0 : _c.rows) || [];
    const cols = ((_d = obj.semantic) == null ? void 0 : _d.cols) || [];
    html += `    <table id="${tableId}"${dataAttr}`;
    if (summary) html += ` aria-label="${escapeHTML3(summary)}"`;
    html += ">\n";
    if (caption) {
      html += `      <caption>${escapeHTML3(caption)}</caption>
`;
    } else if (summary) {
      html += `      <caption>${escapeHTML3(summary)}</caption>
`;
    }
    if (rows.length > 0) {
      html += "      <thead>\n";
      html += "        <tr>\n";
      const headerRow = rows[0] || [];
      for (let c = 0; c < headerRow.length; c++) {
        const cell = headerRow[c];
        html += `          <th scope="col">${escapeHTML3((cell == null ? void 0 : cell.text) || "")}</th>
`;
      }
      html += "        </tr>\n";
      html += "      </thead>\n";
      if (rows.length > 1) {
        html += "      <tbody>\n";
        for (let r = 1; r < rows.length; r++) {
          html += "        <tr>\n";
          const row = rows[r] || [];
          for (let c = 0; c < row.length; c++) {
            const cell = row[c];
            html += `          <td>${escapeHTML3((cell == null ? void 0 : cell.text) || "")}</td>
`;
          }
          html += "        </tr>\n";
        }
        html += "      </tbody>\n";
      }
    } else if (cols.length > 0) {
      html += "      <thead>\n        <tr>\n";
      for (const col of cols) {
        html += `          <th scope="col">${escapeHTML3(col.header || col.name || "")}</th>
`;
      }
      html += "        </tr>\n      </thead>\n";
      const maxRows = Math.max(...cols.map((c) => (c.values || []).length));
      if (maxRows > 0) {
        html += "      <tbody>\n";
        for (let r = 0; r < maxRows; r++) {
          html += "        <tr>\n";
          for (const col of cols) {
            const val = (col.values || [])[r] || "";
            html += `          <td>${escapeHTML3(typeof val === "string" ? val : JSON.stringify(val))}</td>
`;
          }
          html += "        </tr>\n";
        }
        html += "      </tbody>\n";
      }
    } else {
      html += renderTableFromNearbyText(obj, ir, pageNum);
    }
    html += "    </table>\n";
    return html;
  }
  function renderTableFromNearbyText(obj, ir, pageNum) {
    var _a, _b;
    let html = "";
    if (!obj.bbox) return html;
    const pageId = `page_${pageNum}`;
    const page = ir.pages[pageId];
    if (!page) return html;
    const cells = (page.content || []).map((id) => ir.objects[id]).filter(
      (o) => (o == null ? void 0 : o.bbox) && o.type === "text" && o.bbox[0] >= obj.bbox[0] - 5 && o.bbox[1] >= obj.bbox[1] - 5 && o.bbox[0] + (o.bbox[2] || 0) <= obj.bbox[0] + obj.bbox[2] + 5 && o.bbox[1] + (o.bbox[3] || 0) <= obj.bbox[1] + obj.bbox[3] + 5
    ).sort((a, b) => {
      const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
      if (Math.abs(yDiff) > 5) return yDiff;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    });
    if (cells.length === 0) return html;
    const rows = [];
    let currentRow = [cells[0]];
    for (let i = 1; i < cells.length; i++) {
      const prev = cells[i - 1];
      const curr = cells[i];
      if (Math.abs((curr.bbox[1] || 0) - (prev.bbox[1] || 0)) < 10) {
        currentRow.push(curr);
      } else {
        rows.push(currentRow);
        currentRow = [curr];
      }
    }
    rows.push(currentRow);
    if (rows.length === 0) return html;
    html += "      <thead>\n        <tr>\n";
    for (const cell of rows[0]) {
      html += `          <th scope="col">${escapeHTML3(((_a = cell.semantic) == null ? void 0 : _a.text) || "")}</th>
`;
    }
    html += "        </tr>\n      </thead>\n";
    if (rows.length > 1) {
      html += "      <tbody>\n";
      for (let r = 1; r < rows.length; r++) {
        html += "        <tr>\n";
        for (const cell of rows[r]) {
          html += `          <td>${escapeHTML3(((_b = cell.semantic) == null ? void 0 : _b.text) || "")}</td>
`;
        }
        html += "        </tr>\n";
      }
      html += "      </tbody>\n";
    }
    return html;
  }
  function renderAccessibleList(obj, ir, opts) {
    var _a, _b;
    const { dataAttr } = opts;
    const items = ((_a = obj.semantic) == null ? void 0 : _a.items) || [];
    const ordered = ((_b = obj.semantic) == null ? void 0 : _b.ordered) || false;
    const tag = ordered ? "ol" : "ul";
    let html = `    <${tag}${dataAttr} role="list">
`;
    if (items.length > 0) {
      for (const item of items) {
        const text = typeof item === "string" ? item : (item == null ? void 0 : item.text) || "";
        html += `      <li>${escapeHTML3(text)}</li>
`;
      }
    } else {
      const nearbyItems = findNearbyListItems(obj, ir);
      for (const text of nearbyItems) {
        html += `      <li>${escapeHTML3(text)}</li>
`;
      }
    }
    html += `    </${tag}>
`;
    return html;
  }
  function findNearbyListItems(obj, ir) {
    var _a, _b;
    if (!obj.bbox) return [];
    const items = [];
    for (const [id, o] of Object.entries(ir.objects)) {
      if ((o == null ? void 0 : o.type) === "text" && o.bbox && ((_a = o.semantic) == null ? void 0 : _a.role) !== "heading") {
        if (Math.abs((o.bbox[0] || 0) - (obj.bbox[0] || 0)) < 50 && o.bbox[1] >= obj.bbox[1] - 5 && o.bbox[1] <= obj.bbox[1] + obj.bbox[3] + 5) {
          if ((_b = o.semantic) == null ? void 0 : _b.text) items.push(o.semantic.text);
        }
      }
    }
    return items;
  }
  function renderAccessibleFormField(obj, ir, opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const { dataAttr } = opts;
    const fieldType = ((_a = obj.semantic) == null ? void 0 : _a.fieldType) || "text";
    const fieldName = ((_b = obj.semantic) == null ? void 0 : _b.fieldName) || ((_c = obj.accessibility) == null ? void 0 : _c.label) || "";
    const fieldId = obj.id || `field-${fieldName}`;
    const label = ((_d = obj.accessibility) == null ? void 0 : _d.label) || fieldName;
    const value = ((_e = obj.semantic) == null ? void 0 : _e.value) || "";
    const required = ((_f = obj.accessibility) == null ? void 0 : _f.required) || false;
    const description = ((_g = obj.accessibility) == null ? void 0 : _g.description) || "";
    const error = ((_h = obj.accessibility) == null ? void 0 : _h.error) || "";
    let html = `    <div class="form-field"${dataAttr}>
`;
    if (label) {
      html += `      <label for="${fieldId}">${escapeHTML3(label)}</label>
`;
    }
    if (description) {
      html += `      <span id="${fieldId}-desc" class="field-description">${escapeHTML3(description)}</span>
`;
    }
    const ariaDesc = [
      description ? `${fieldId}-desc` : "",
      error ? `${fieldId}-error` : ""
    ].filter(Boolean).join(" ");
    switch (fieldType) {
      case "checkbox":
        html += `      <input type="checkbox" id="${fieldId}" name="${escapeHTML3(fieldName)}"${value === "true" ? " checked" : ""}${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        break;
      case "radio":
        html += `      <input type="radio" id="${fieldId}" name="${escapeHTML3(fieldName)}"${value ? " checked" : ""}${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        break;
      case "dropdown":
        html += `      <select id="${fieldId}" name="${escapeHTML3(fieldName)}"${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        const options = ((_i = obj.semantic) == null ? void 0 : _i.options) || [];
        for (const opt of options) {
          const optVal = typeof opt === "string" ? opt : (opt == null ? void 0 : opt.value) || "";
          const optLabel = typeof opt === "string" ? opt : (opt == null ? void 0 : opt.label) || optVal;
          html += `        <option value="${escapeHTML3(optVal)}"${optVal === value ? " selected" : ""}>${escapeHTML3(optLabel)}</option>
`;
        }
        html += "      </select>\n";
        break;
      case "textarea":
        html += `      <textarea id="${fieldId}" name="${escapeHTML3(fieldName)}" rows="4"${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>${escapeHTML3(value)}</textarea>
`;
        break;
      default:
        html += `      <input type="text" id="${fieldId}" name="${escapeHTML3(fieldName)}" value="${escapeHTML3(value)}"${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        break;
    }
    if (error) {
      html += `      <span id="${fieldId}-error" class="field-error" role="alert">${escapeHTML3(error)}</span>
`;
    }
    html += "    </div>\n";
    return html;
  }
  function renderAccessibleLink(obj, opts) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { dataAttr } = opts;
    const href = ((_a = obj.accessibility) == null ? void 0 : _a.href) || ((_b = obj.semantic) == null ? void 0 : _b.url) || ((_c = obj.raw) == null ? void 0 : _c.href) || ((_d = obj.raw) == null ? void 0 : _d.url) || "#";
    const text = escapeHTML3(((_e = obj.semantic) == null ? void 0 : _e.text) || "");
    const target = ((_f = obj.accessibility) == null ? void 0 : _f.target) || "";
    const ariaLabel = ((_g = obj.accessibility) == null ? void 0 : _g.ariaLabel) || "";
    let attrs = dataAttr;
    if (ariaLabel) attrs += ` aria-label="${escapeHTML3(ariaLabel)}"`;
    if (target === "_blank") attrs += ' target="_blank" rel="noopener noreferrer"';
    if (href !== "#") attrs += ' target="_blank" rel="noopener noreferrer"';
    return `    <p><a href="${escapeHTML3(href)}"${attrs}>${text}</a></p>
`;
  }
  function renderAccessibleImage(obj, opts) {
    var _a, _b, _c, _d, _e, _f;
    const { dataAttr, wrapImagesInFigures, mode } = opts;
    const src = ((_a = obj.raw) == null ? void 0 : _a.src) || "";
    const alt = ((_b = obj.accessibility) == null ? void 0 : _b.alt) || "";
    const caption = ((_c = obj.semantic) == null ? void 0 : _c.caption) || "";
    const isDecorative = ((_d = obj.accessibility) == null ? void 0 : _d.decorative) || !alt && !caption;
    const role = ((_e = obj.accessibility) == null ? void 0 : _e.role) || ((_f = obj.semantic) == null ? void 0 : _f.role) || "";
    const altAttr = isDecorative ? ' alt="" role="presentation"' : ` alt="${escapeHTML3(alt || caption || "Image")}"`;
    let html = "";
    if (wrapImagesInFigures) {
      html += `    <figure${dataAttr}>
`;
      html += `      <img src="${escapeHTML3(src)}"${altAttr} loading="lazy">
`;
      if (caption) {
        html += `      <figcaption>${escapeHTML3(caption)}</figcaption>
`;
      }
      if (role) {
        html += `      <span class="image-role visually-hidden">${escapeHTML3(role)}</span>
`;
      }
      html += "    </figure>\n";
    } else {
      html += `    <img${dataAttr} src="${escapeHTML3(src)}"${altAttr} loading="lazy">
`;
    }
    return html;
  }
  function renderAccessibleText(obj, opts) {
    var _a;
    const { dataAttr } = opts;
    const text = escapeHTML3(((_a = obj.semantic) == null ? void 0 : _a.text) || "");
    if (!text) return "";
    return `    <p${dataAttr}>${text}</p>
`;
  }
  function generateAccessibleStyles2() {
    return `<style>
    /* Reset and base */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0; padding: 0;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6; color: #1a1a2e; background: #fff;
      max-width: 900px; margin: 0 auto;
    }

    /* Skip navigation */
    .skip-link {
      position: absolute; top: -100%; left: 0;
      background: #005a9c; color: #fff; padding: 8px 16px;
      z-index: 10000; font-size: 1rem; text-decoration: none;
      border-radius: 0 0 4px 0;
    }
    .skip-link:focus { top: 0; outline: 3px solid #ff6b00; outline-offset: 2px; }
    .skip-page-nav { position: absolute; top: -100%; left: 0; z-index: 9999; }
    .skip-page-nav:focus-within { top: 40px; }

    /* Visually hidden (screen reader only) */
    .visually-hidden {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }

    /* Header */
    header[role="banner"] {
      padding: 24px 20px 16px; border-bottom: 2px solid #005a9c;
      margin-bottom: 24px;
    }
    header h1 { margin: 0 0 8px; font-size: 1.75rem; color: #1a1a2e; }
    header .doc-author { margin: 0; color: #555; }
    header .doc-date { margin: 4px 0 0; color: #777; font-size: 0.9rem; }

    /* Page navigation */
    nav[aria-label="Page navigation"] {
      margin: 0 0 24px; padding: 12px 20px;
      background: #f8f9fa; border-radius: 6px;
    }
    .page-nav {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-wrap: wrap; gap: 4px;
    }
    .page-nav a {
      display: inline-block; padding: 4px 10px;
      background: #e9ecef; color: #005a9c; text-decoration: none;
      border-radius: 4px; font-size: 0.85rem;
    }
    .page-nav a:hover, .page-nav a:focus {
      background: #005a9c; color: #fff;
      outline: 2px solid #ff6b00; outline-offset: 2px;
    }

    /* Main content */
    main { padding: 0 20px; }

    /* Page sections */
    .pdf-page { margin: 32px 0; padding: 16px 0; border-bottom: 1px solid #dee2e6; position: relative; }
    .pdf-page-raster { margin: 0 0 16px; text-align: center; }
    .pdf-page-raster img {
      display: block; max-width: 100%; height: auto; border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12); border: 1px solid #e9ecef;
    }
    .page-heading {
      font-size: 1.25rem; color: #005a9c;
      margin: 0 0 16px; padding-bottom: 8px;
      border-bottom: 1px solid #e9ecef;
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; line-height: 1.3; }

    /* Paragraphs */
    p { margin: 0.5em 0; }

    /* Tables */
    table {
      border-collapse: collapse; width: 100%; margin: 16px 0;
      font-size: 0.95rem;
    }
    caption {
      text-align: left; font-weight: 600; margin-bottom: 8px;
      font-size: 1rem; color: #1a1a2e;
    }
    th, td {
      border: 1px solid #dee2e6; padding: 10px 12px; text-align: left;
    }
    th {
      background: #f1f3f5; font-weight: 600;
      position: sticky; top: 0;
    }
    th[scope="col"] { border-bottom: 2px solid #005a9c; }
    tr:hover td { background: #f8f9fa; }

    /* Lists */
    ul, ol { margin: 0.5em 0; padding-left: 1.5em; }
    li { margin: 0.25em 0; }

    /* Forms */
    .form-field { margin: 12px 0; }
    .form-field label {
      display: block; font-weight: 600; margin-bottom: 4px;
    }
    .form-field input, .form-field select, .form-field textarea {
      width: 100%; padding: 8px 12px; border: 1px solid #ced4da;
      border-radius: 4px; font-size: 1rem;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
      outline: 3px solid #005a9c; outline-offset: 1px;
      border-color: #005a9c;
    }
    .field-description { display: block; font-size: 0.85rem; color: #666; margin-top: 2px; }
    .field-error { display: block; color: #c62828; font-size: 0.85rem; margin-top: 4px; font-weight: 600; }

    /* Images and figures */
    figure { margin: 16px 0; }
    img { max-width: 100%; height: auto; border-radius: 4px; }
    figcaption {
      font-size: 0.9rem; color: #555; margin-top: 6px;
      font-style: italic;
    }

    /* Links */
    a { color: #005a9c; }
    a:hover { text-decoration: underline; }
    a:focus { outline: 3px solid #ff6b00; outline-offset: 2px; }

    /* Separators */
    hr {
      border: none; border-top: 1px solid #dee2e6;
      margin: 16px 0;
    }

    /* Footer */
    footer[role="contentinfo"] {
      padding: 16px 20px; margin-top: 32px;
      border-top: 2px solid #005a9c; color: #555;
      font-size: 0.9rem;
    }
    footer p { margin: 4px 0; }

    /* Focus styles for keyboard navigation */
    :focus-visible {
      outline: 3px solid #ff6b00;
      outline-offset: 2px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      body { background: #000; color: #fff; }
      a { color: #ff0; }
      th { background: #333; color: #fff; }
      .skip-link { background: #ff0; color: #000; }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }

    /* Print styles */
    @media print {
      .skip-link, .skip-page-nav, nav[aria-label="Page navigation"],
      #doc-status, footer { display: none; }
      .pdf-page { border-bottom: none; page-break-inside: avoid; }
      a { color: #000; text-decoration: none; }
    }
  </style>
`;
  }
  function generateKeyboardScript() {
    return `<script>
(function() {
  'use strict';

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Alt+1: Skip to main content
    if (e.altKey && e.key === '1') {
      e.preventDefault();
      var main = document.getElementById('main-content');
      if (main) { main.focus(); main.scrollIntoView({ behavior: 'smooth' }); }
    }

    // Alt+H: Go to top (Home)
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('header')?.focus();
    }

    // Alt+P: Previous page
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      var sections = document.querySelectorAll('.pdf-page');
      var current = getCurrentSection(sections);
      if (current > 0) {
        sections[current - 1].scrollIntoView({ behavior: 'smooth' });
        sections[current - 1].focus();
      }
    }

    // Alt+N: Next page
    if (e.altKey && e.key === 'ArrowDown') {
      e.preventDefault();
      var sections = document.querySelectorAll('.pdf-page');
      var current = getCurrentSection(sections);
      if (current < sections.length - 1) {
        sections[current + 1].scrollIntoView({ behavior: 'smooth' });
        sections[current + 1].focus();
      }
    }

    // Alt+S: Toggle page navigation
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      var nav = document.querySelector('nav[aria-label="Page navigation"]');
      if (nav) {
        var isHidden = nav.getAttribute('aria-hidden') === 'true';
        nav.setAttribute('aria-hidden', String(!isHidden));
        nav.style.display = isHidden ? '' : 'none';
        if (isHidden) nav.querySelector('a')?.focus();
      }
    }
  });

  function getCurrentSection(sections) {
    var scrollY = window.scrollY + window.innerHeight / 3;
    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) return i;
    }
    return 0;
  }

  // Add tabindex to page sections for focus
  document.querySelectorAll('.pdf-page').forEach(function(el) {
    el.setAttribute('tabindex', '-1');
  });

  // Announce page changes for screen readers
  if (typeof IntersectionObserver !== 'undefined') {
    var status = document.getElementById('doc-status');
    if (status) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var label = entry.target.getAttribute('aria-label') || '';
            status.textContent = 'Viewing ' + label;
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('.pdf-page').forEach(function(el) {
        observer.observe(el);
      });
    }
  }
})();
<\/script>
`;
  }
  function remediateAccessibility(ir, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const {
      fixAltText = true,
      fixHeadingHierarchy = true,
      fixLanguage = true,
      fixTitle = true,
      fixFormLabels = true,
      markDecorativeImages = false,
      defaultLanguage = "en"
    } = options;
    const report = { fixes: [], summary: {} };
    if (fixLanguage && !((_a = ir.document.metadata) == null ? void 0 : _a.language)) {
      ir.document.metadata.language = defaultLanguage;
      report.fixes.push({ type: "language", action: `Set document language to "${defaultLanguage}"` });
    }
    if (fixTitle && !((_b = ir.document.metadata) == null ? void 0 : _b.title)) {
      let inferredTitle = "";
      for (const [id, obj] of Object.entries(ir.objects)) {
        if (((_c = obj == null ? void 0 : obj.semantic) == null ? void 0 : _c.role) === "heading" && ((_d = obj.semantic) == null ? void 0 : _d.level) === 1 && ((_e = obj.semantic) == null ? void 0 : _e.text)) {
          inferredTitle = obj.semantic.text;
          break;
        }
      }
      if (!inferredTitle) inferredTitle = "Untitled Document";
      ir.document.metadata.title = inferredTitle;
      report.fixes.push({ type: "title", action: `Set document title to "${inferredTitle}"` });
    }
    if (fixAltText) {
      for (const [id, obj] of Object.entries(ir.objects)) {
        if ((obj == null ? void 0 : obj.type) === "image" && !obj.accessibility) {
          obj.accessibility = {};
        }
        if ((obj == null ? void 0 : obj.type) === "image" && !((_f = obj.accessibility) == null ? void 0 : _f.alt) && ((_g = obj.accessibility) == null ? void 0 : _g.alt) !== "") {
          if (markDecorativeImages) {
            obj.accessibility.alt = "";
            obj.accessibility.decorative = true;
            report.fixes.push({ type: "alt_text", element: id, action: "Marked as decorative image" });
          } else {
            const caption = ((_h = obj.semantic) == null ? void 0 : _h.caption) || "";
            const role = ((_i = obj.semantic) == null ? void 0 : _i.role) || "";
            obj.accessibility.alt = caption || (role ? `${role} image` : "Image");
            report.fixes.push({ type: "alt_text", element: id, action: `Added alt text: "${obj.accessibility.alt}"` });
          }
        }
      }
    }
    if (fixHeadingHierarchy) {
      let currentLevel = 0;
      for (const pageId of ir.document.pages) {
        const page = ir.pages[pageId];
        if (!page) continue;
        for (const objId of page.content || []) {
          const obj = ir.objects[objId];
          if (((_j = obj == null ? void 0 : obj.semantic) == null ? void 0 : _j.role) === "heading") {
            let level = obj.semantic.level || 1;
            if (level > currentLevel + 1 && currentLevel > 0) {
              const oldLevel = level;
              level = currentLevel + 1;
              obj.semantic.level = level;
              report.fixes.push({
                type: "heading_hierarchy",
                element: objId,
                action: `Changed heading from H${oldLevel} to H${level}`
              });
            }
            currentLevel = level;
          }
        }
      }
    }
    if (fixFormLabels) {
      for (const [id, obj] of Object.entries(ir.objects)) {
        if (((_k = obj == null ? void 0 : obj.semantic) == null ? void 0 : _k.role) === "form_field") {
          if (!obj.accessibility) obj.accessibility = {};
          if (!obj.accessibility.label && !obj.accessibility.labelledby) {
            const name = ((_l = obj.semantic) == null ? void 0 : _l.fieldName) || id;
            obj.accessibility.label = name.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
            report.fixes.push({
              type: "form_label",
              element: id,
              action: `Added label: "${obj.accessibility.label}"`
            });
          }
        }
      }
    }
    report.summary = {
      totalFixes: report.fixes.length,
      byType: report.fixes.reduce((acc, fix) => {
        acc[fix.type] = (acc[fix.type] || 0) + 1;
        return acc;
      }, {})
    };
    return { ir, report };
  }
  function generateAccessibilityReport(ir) {
    const audit = wcagAudit(ir);
    const { report: remediations } = remediateAccessibility(ir, { fixAltText: true, fixHeadingHierarchy: true, fixLanguage: true, fixTitle: true, fixFormLabels: true });
    let text = "=== CodbDocs Accessibility Report ===\n\n";
    text += `WCAG Level: ${audit.level}
`;
    text += `Score: ${audit.score}/100
`;
    text += `Issues: ${audit.summary.totalIssues} (${audit.summary.errors} errors, ${audit.summary.warnings} warnings, ${audit.summary.info} info)
`;
    text += `WCAG Criteria Met: ${audit.summary.criteriaMet}/${audit.summary.criteriaTotal}

`;
    text += "--- Issues ---\n";
    for (const issue of audit.issues) {
      text += `[${issue.severity.toUpperCase()}] ${issue.wcag || "N/A"}: ${issue.message}`;
      if (issue.page) text += ` (Page ${issue.page})`;
      text += "\n";
      if (issue.suggestion) text += `  Suggestion: ${issue.suggestion}
`;
    }
    text += "\n--- WCAG Criteria ---\n";
    for (const [criteria, info] of Object.entries(audit.wcagCriteria)) {
      text += `${criteria} ${info.name}: ${info.status.toUpperCase()}
`;
    }
    text += "\n--- Auto-Remediations Applied ---\n";
    text += `${remediations.summary.totalFixes} fixes applied
`;
    for (const fix of remediations.fixes) {
      text += `  [${fix.type}] ${fix.action}`;
      if (fix.element) text += ` (${fix.element})`;
      text += "\n";
    }
    let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
    html += '<meta charset="UTF-8">\n';
    html += "<title>CodbDocs Accessibility Report</title>\n";
    html += "<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:20px;line-height:1.6}";
    html += ".pass{color:#2e7d32}.fail{color:#c62828}.warn{color:#f57f17}";
    html += ".score{font-size:2em;font-weight:bold}.issue{margin:8px 0;padding:8px;border-left:4px solid #ccc}";
    html += ".error{border-color:#c62828}.warning{border-color:#f57f17}.info{border-color:#1976d2}</style>\n";
    html += "</head>\n<body>\n";
    html += "<h1>Accessibility Report</h1>\n";
    html += `<p class="score ${audit.score >= 90 ? "pass" : audit.score >= 70 ? "warn" : "fail"}">Score: ${audit.score}/100 (Level ${audit.level})</p>
`;
    html += `<p>${audit.summary.criteriaMet}/${audit.summary.criteriaTotal} WCAG criteria met</p>
`;
    html += "<h2>Issues</h2>\n";
    for (const issue of audit.issues) {
      html += `<div class="issue ${issue.severity}"><strong>[${issue.severity.toUpperCase()}]</strong> ${issue.message}`;
      if (issue.page) html += ` <em>(Page ${issue.page})</em>`;
      if (issue.suggestion) html += `<br><small>${issue.suggestion}</small>`;
      html += "</div>\n";
    }
    html += "<h2>WCAG Criteria</h2>\n<table><thead><tr><th>Criteria</th><th>Name</th><th>Status</th></tr></thead><tbody>\n";
    for (const [criteria, info] of Object.entries(audit.wcagCriteria)) {
      html += `<tr><td>${criteria}</td><td>${info.name}</td><td class="${info.status}">${info.status.toUpperCase()}</td></tr>
`;
    }
    html += "</tbody></table>\n";
    html += "<h2>Auto-Remediations</h2>\n";
    html += `<p>${remediations.summary.totalFixes} fixes applied</p>
<ul>
`;
    for (const fix of remediations.fixes) {
      html += `<li><strong>${fix.type}:</strong> ${fix.action}</li>
`;
    }
    html += "</ul>\n";
    html += "</body>\n</html>";
    return { html, text, audit, remediations };
  }

  // packages/core/src/workspace.js
  function createWorkspace(options = {}) {
    const { name = "Workspace", description = "" } = options;
    const workspace = {
      name,
      description,
      documents: /* @__PURE__ */ new Map(),
      // docId -> { doc, graph, fingerprint, concepts }
      crossDocRelationships: [],
      terminology: { aliases: {}, acronyms: {}, definitions: {} }
    };
    workspace.add = async function(docOrGraph, options2 = {}) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      let doc, graph, docId;
      if (docOrGraph._contentGraph) {
        graph = docOrGraph;
        docId = ((_b = (_a = graph._ir) == null ? void 0 : _a.document) == null ? void 0 : _b.id) || `doc_${this.documents.size + 1}`;
      } else {
        doc = docOrGraph;
        graph = await doc.analyze({ ocr: false, ...options2 });
        docId = ((_d = (_c = graph._ir) == null ? void 0 : _c.document) == null ? void 0 : _d.id) || `doc_${this.documents.size + 1}`;
      }
      this.documents.set(docId, {
        doc,
        graph,
        fingerprint: graph._fingerprint || null,
        conceptGraph: graph._conceptGraph || null,
        metadata: ((_f = (_e = graph._ir) == null ? void 0 : _e.document) == null ? void 0 : _f.metadata) || {},
        pageCount: ((_i = (_h = (_g = graph._ir) == null ? void 0 : _g.document) == null ? void 0 : _h.pages) == null ? void 0 : _i.length) || 0
      });
      this._buildCrossDocRelationships();
      this._learnTerminology();
      return docId;
    };
    workspace.remove = function(docId) {
      this.documents.delete(docId);
      this._buildCrossDocRelationships();
    };
    workspace.search = function(query, options2 = {}) {
      const { maxResults = 20, perDocLimit = 5 } = options2;
      const allResults = [];
      for (const [docId, entry] of this.documents) {
        const graph = entry.graph;
        if (!(graph == null ? void 0 : graph.hybridSearch)) continue;
        const results = graph.hybridSearch(query, {
          maxResults: perDocLimit,
          rerank: false,
          useExpansion: true
        });
        for (const result of results) {
          allResults.push({
            ...result,
            docId,
            docMetadata: entry.metadata
          });
        }
      }
      allResults.sort((a, b) => b.score - a.score);
      const entityCounts = /* @__PURE__ */ new Map();
      for (const r of allResults) {
        for (const e of r.entities || []) {
          const key = `${e.type}:${e.value}`;
          entityCounts.set(key, (entityCounts.get(key) || 0) + 1);
        }
      }
      for (const r of allResults) {
        let crossDocBoost = 0;
        for (const e of r.entities || []) {
          const key = `${e.type}:${e.value}`;
          if ((entityCounts.get(key) || 0) > 1) {
            crossDocBoost += 0.1;
          }
        }
        r.score += Math.min(crossDocBoost, 0.3);
        r.crossDocument = crossDocBoost > 0;
      }
      allResults.sort((a, b) => b.score - a.score);
      return allResults.slice(0, maxResults);
    };
    workspace.query = function(question, options2 = {}) {
      const results = this.search(question, { maxResults: 10 });
      const reasoningResults = [];
      for (const [docId, entry] of this.documents) {
        const graph = entry.graph;
        if (!(graph == null ? void 0 : graph.executeReasoning)) continue;
        const reasoning = graph.executeReasoning(question);
        if (reasoning) {
          reasoningResults.push({ ...reasoning, docId, metadata: entry.metadata });
        }
      }
      return {
        searchResults: results,
        reasoningResults,
        answer: reasoningResults.length > 0 ? reasoningResults[0].answer : null,
        confidence: reasoningResults.length > 0 ? reasoningResults[0].confidence : 0
      };
    };
    workspace.getSummary = function() {
      var _a, _b, _c, _d;
      let totalWords = 0;
      let totalPages = 0;
      const allEntityTypes = /* @__PURE__ */ new Map();
      for (const [, entry] of this.documents) {
        const summary = ((_b = (_a = entry.graph) == null ? void 0 : _a.getSummary) == null ? void 0 : _b.call(_a)) || {};
        totalWords += summary.wordCount || 0;
        totalPages += entry.pageCount || 0;
        const entities = ((_d = (_c = entry.graph) == null ? void 0 : _c._contentGraph) == null ? void 0 : _d.allEntities) || [];
        for (const e of entities) {
          allEntityTypes.set(e.type, (allEntityTypes.get(e.type) || 0) + 1);
        }
      }
      return {
        name: this.name,
        documentCount: this.documents.size,
        totalPages,
        totalWords,
        entityTypes: Object.fromEntries(allEntityTypes),
        crossDocRelationships: this.crossDocRelationships.length
      };
    };
    workspace.toJSON = function() {
      return {
        name: this.name,
        description: this.description,
        documents: Array.from(this.documents.entries()).map(([id, entry]) => ({
          id,
          metadata: entry.metadata,
          pageCount: entry.pageCount
        })),
        summary: this.getSummary()
      };
    };
    workspace._buildCrossDocRelationships = function() {
      var _a, _b, _c, _d, _e, _f;
      this.crossDocRelationships = [];
      const docEntries = Array.from(this.documents.entries());
      for (let i = 0; i < docEntries.length; i++) {
        for (let j = i + 1; j < docEntries.length; j++) {
          const [, entry1] = docEntries[i];
          const [, entry2] = docEntries[j];
          const entities1 = ((_b = (_a = entry1.graph) == null ? void 0 : _a._contentGraph) == null ? void 0 : _b.allEntities) || [];
          const entities2 = ((_d = (_c = entry2.graph) == null ? void 0 : _c._contentGraph) == null ? void 0 : _d.allEntities) || [];
          const shared = [];
          for (const e1 of entities1) {
            for (const e2 of entities2) {
              if (e1.type === e2.type && ((_e = e1.value) == null ? void 0 : _e.toLowerCase()) === ((_f = e2.value) == null ? void 0 : _f.toLowerCase())) {
                shared.push({ type: e1.type, value: e1.value });
              }
            }
          }
          if (shared.length > 0) {
            this.crossDocRelationships.push({
              doc1: docEntries[i][0],
              doc2: docEntries[j][0],
              sharedEntities: shared,
              strength: shared.length
            });
          }
        }
      }
    };
    workspace._learnTerminology = function() {
      var _a, _b;
      const allPages = [];
      for (const [, entry] of this.documents) {
        const pages = ((_b = (_a = entry.graph) == null ? void 0 : _a.text) == null ? void 0 : _b.pages) || [];
        allPages.push(...pages);
      }
      this.terminology = learnTerminology(allPages);
    };
    return workspace;
  }

  // packages/core/src/persistence.js
  var DB_NAME = "codbdocs";
  var DB_VERSION = 1;
  var STORE_NAME = "documents";
  var ENGINE_VERSION = "1.0.0";
  var IR_VERSION = "1.0";
  async function hashBuffer(buffer) {
    const hashBuffer2 = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer2));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async function computeCacheKey(pdfBuffer, config2 = {}) {
    const pdfHash = await hashBuffer(pdfBuffer);
    const configStr = JSON.stringify(config2 || {});
    const configHash = await hashBuffer(new TextEncoder().encode(configStr));
    return `${pdfHash}_${ENGINE_VERSION}_${IR_VERSION}_${configHash.slice(0, 8)}`;
  }
  function openDB() {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === "undefined") {
        reject(new Error("IndexedDB not available"));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "hash" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function saveToCache(pdfBuffer, analysisData, options = {}) {
    const { ttl = 7 * 24 * 60 * 60 * 1e3, config: config2 = {} } = options;
    try {
      const cacheKey = await computeCacheKey(pdfBuffer, config2);
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const record = {
          hash: cacheKey,
          data: analysisData,
          timestamp: Date.now(),
          ttl,
          engineVersion: ENGINE_VERSION,
          irVersion: IR_VERSION
        };
        store.put(record);
        tx.oncomplete = () => resolve({ hash: cacheKey, saved: true });
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      return { hash: null, saved: false, error: err.message };
    }
  }
  async function loadFromCache(pdfBuffer, config2 = {}) {
    try {
      const cacheKey = await computeCacheKey(pdfBuffer, config2);
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(cacheKey);
        request.onsuccess = () => {
          const record = request.result;
          if (!record) {
            resolve({ found: false, hash: cacheKey });
            return;
          }
          if (Date.now() - record.timestamp > record.ttl) {
            resolve({ found: false, hash: cacheKey, reason: "expired" });
            return;
          }
          if (record.engineVersion !== ENGINE_VERSION || record.irVersion !== IR_VERSION) {
            resolve({ found: false, hash: cacheKey, reason: "version_mismatch" });
            return;
          }
          resolve({
            found: true,
            hash: cacheKey,
            data: record.data,
            timestamp: record.timestamp,
            age: Date.now() - record.timestamp
          });
        };
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      return { found: false, error: err.message };
    }
  }
  async function clearCache() {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.clear();
        tx.oncomplete = () => resolve({ cleared: true });
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      return { cleared: false, error: err.message };
    }
  }
  async function getCacheStats() {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.count();
        request.onsuccess = () => resolve({ entries: request.result });
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      return { entries: 0, error: err.message };
    }
  }

  // packages/core/src/guards.js
  function normalizeIR(ir) {
    if (!ir || typeof ir !== "object") {
      throw new TypeError("codbdocs: an IR object is required (received " + (ir === null ? "null" : typeof ir) + ")");
    }
    if (!ir.pages || typeof ir.pages !== "object") ir.pages = {};
    if (!ir.objects || typeof ir.objects !== "object") ir.objects = {};
    if (!ir.document || typeof ir.document !== "object") ir.document = {};
    if (!ir.document.metadata || typeof ir.document.metadata !== "object") ir.document.metadata = {};
    if (!Array.isArray(ir.document.pages)) {
      ir.document.pages = Object.keys(ir.pages).sort((a, b) => {
        var _a, _b, _c, _d;
        const na = (_b = (_a = ir.pages[a]) == null ? void 0 : _a.num) != null ? _b : 0;
        const nb = (_d = (_c = ir.pages[b]) == null ? void 0 : _c.num) != null ? _d : 0;
        return na - nb;
      });
    }
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      if (!Array.isArray(page.content)) page.content = [];
      if (!Array.isArray(page.annotations)) page.annotations = [];
    }
    return ir;
  }
  function hydrateGraph(json) {
    var _a;
    if (!json || typeof json !== "object") {
      throw new TypeError("codbdocs: a document graph (or graph.toJSON() output) is required");
    }
    if (typeof json.getSummary === "function") return json;
    const pages = Array.isArray(json.pages) ? json.pages : [];
    const pageOf = (n) => pages.find((p) => {
      var _a2;
      return ((_a2 = p.num) != null ? _a2 : p.pageNum) === n;
    }) || null;
    const listOf = (n, key) => {
      var _a2;
      if (n == null) return pages.flatMap((p) => p[key] || []);
      return ((_a2 = pageOf(n)) == null ? void 0 : _a2[key]) || [];
    };
    const metaOf = (n, key) => {
      var _a2, _b;
      if (n == null) return pages.flatMap((p) => {
        var _a3;
        return ((_a3 = p.metadata) == null ? void 0 : _a3[key]) || [];
      });
      return ((_b = (_a2 = pageOf(n)) == null ? void 0 : _a2.metadata) == null ? void 0 : _b[key]) || [];
    };
    const pageCount = (_a = json.pageCount) != null ? _a : pages.length;
    const summary = json.summary || {
      pageCount,
      wordCount: pages.reduce((acc, p) => acc + String(p.text || "").split(/\s+/).filter(Boolean).length, 0),
      pageTypes: {},
      metadata: {},
      headings: pages.flatMap((p) => (p.headings || []).map((h) => h.text)),
      tableCount: pages.reduce((acc, p) => {
        var _a2;
        return acc + (((_a2 = p.tables) == null ? void 0 : _a2.length) || 0);
      }, 0),
      formCount: pages.reduce((acc, p) => {
        var _a2;
        return acc + (((_a2 = p.forms) == null ? void 0 : _a2.length) || 0);
      }, 0),
      listCount: pages.reduce((acc, p) => {
        var _a2;
        return acc + (((_a2 = p.lists) == null ? void 0 : _a2.length) || 0);
      }, 0)
    };
    if (summary.pageCount == null) summary.pageCount = pageCount;
    return {
      ...json,
      pageCount,
      getSummary: () => summary,
      getDocumentType: () => json.documentType || null,
      classifications: json.classifications || pages.map((p) => p.classification || null),
      text: {
        pages: pages.map((p) => {
          var _a2;
          return { pageNum: (_a2 = p.num) != null ? _a2 : p.pageNum, text: p.text || "", source: p.source };
        }),
        getPageText: (n) => {
          var _a2;
          return ((_a2 = pageOf(n)) == null ? void 0 : _a2.text) || "";
        }
      },
      layout: {
        getHeadings: (n) => listOf(n, "headings"),
        getAllHeadings: () => listOf(null, "headings")
      },
      structure: {
        getTables: (n) => listOf(n, "tables"),
        getForms: (n) => listOf(n, "forms"),
        getLists: (n) => listOf(n, "lists"),
        tables: listOf(null, "tables"),
        forms: listOf(null, "forms"),
        lists: listOf(null, "lists")
      },
      metadata: {
        getDates: (n) => metaOf(n, "dates"),
        getPhones: (n) => metaOf(n, "phones"),
        getEmails: (n) => metaOf(n, "emails"),
        getAddresses: (n) => metaOf(n, "addresses"),
        getAmounts: (n) => metaOf(n, "amounts"),
        getSummary: () => summary.metadata || {}
      }
    };
  }

  // packages/core/src/large.js
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
    var _a;
    const pdfjsLib2 = getPdfjs();
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
    const task = pdfjsLib2.getDocument({
      ...params,
      password,
      rangeChunkSize,
      disableAutoFetch: true,
      disableStream: false,
      // Keep PDF.js internal caches small on huge files.
      maxImageSize: (_a = options.maxImageSize) != null ? _a : 16777216
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
        if (signal == null ? void 0 : signal.aborted) throw new Error("[codbdocs] aborted");
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
        onProgress == null ? void 0 : onProgress({
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
    var _a, _b;
    for (const item of items || []) {
      out.push({ title: item.title, level: depth, dest: (_a = item.dest) != null ? _a : null });
      if ((_b = item.items) == null ? void 0 : _b.length) flattenOutline(item.items, depth + 1, out);
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
        var _a;
        if (page.image) {
          const ext = page.image.type.split("/")[1].replace("jpeg", "jpg");
          const file = `pages/page-${String(page.page).padStart(4, "0")}.${ext}`;
          entries.push({ name: file, data: page.image.bytes });
          pageFiles.push(file);
        }
        await ((_a = options.onPage) == null ? void 0 : _a.call(options, page));
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
    var _a, _b;
    const size = typeof input === "number" ? input : (_a = input == null ? void 0 : input.size) != null ? _a : 0;
    const pages = typeof input === "object" ? (_b = input == null ? void 0 : input.pageCount) != null ? _b : 0 : 0;
    return size > maxBytes || pages > maxPages;
  }

  // packages/core/src/serverless.js
  function getPdfjs2() {
    const lib = typeof window !== "undefined" && (window["pdfjs-dist/build/pdf"] || window.pdfjsLib);
    if (!lib) {
      throw new Error("[codbdocs] pdfjsLib not found. Load PDF.js before calling this API.");
    }
    return lib;
  }
  function makeCanvas(width, height) {
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(w, h);
    const el = document.createElement("canvas");
    el.width = w;
    el.height = h;
    return el;
  }
  async function canvasToDataUri(canvas, type = "image/png", quality = 0.85) {
    if (typeof canvas.convertToBlob === "function") {
      const blob = await canvas.convertToBlob({ type, quality });
      const buf = new Uint8Array(await blob.arrayBuffer());
      return `data:${type};base64,${bytesToBase64(buf)}`;
    }
    return canvas.toDataURL(type, quality);
  }
  function bytesToBase64(bytes) {
    let bin = "";
    const step = 32768;
    for (let i = 0; i < bytes.length; i += step) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + step));
    }
    return btoa(bin);
  }
  async function extractPageVector(page, options = {}) {
    var _a;
    const pdfjsLib2 = getPdfjs2();
    const scale = (_a = options.scale) != null ? _a : 1;
    const viewport = page.getViewport({ scale });
    const opList = await page.getOperatorList();
    if (typeof pdfjsLib2.SVGGraphics === "function") {
      try {
        const gfx = new pdfjsLib2.SVGGraphics(page.commonObjs, page.objs);
        gfx.embedFonts = options.embedFonts !== false;
        const element = await gfx.getSVG(opList, viewport);
        if (typeof XMLSerializer !== "undefined") {
          return new XMLSerializer().serializeToString(element);
        }
        if (element == null ? void 0 : element.outerHTML) return element.outerHTML;
      } catch {
      }
    }
    return buildSvgFromOperators(opList, viewport, pdfjsLib2);
  }
  function buildSvgFromOperators(opList, viewport, pdfjsLib2) {
    var _a;
    const OPS = pdfjsLib2.OPS || {};
    const parts = [];
    let current = [];
    let fill = "#000000";
    let stroke = "#000000";
    let lineWidth = 1;
    const ctm = [1, 0, 0, -1, 0, viewport.height];
    const pt = (x, y) => `${round(ctm[0] * x + ctm[2] * y + ctm[4])} ${round(ctm[1] * x + ctm[3] * y + ctm[5])}`;
    const round = (n) => Math.round(n * 100) / 100;
    for (let i = 0; i < opList.fnArray.length; i += 1) {
      const fn = opList.fnArray[i];
      const args = opList.argsArray[i] || [];
      if (fn === OPS.setFillRGBColor) fill = rgb(args);
      else if (fn === OPS.setStrokeRGBColor) stroke = rgb(args);
      else if (fn === OPS.setLineWidth) lineWidth = (_a = args[0]) != null ? _a : 1;
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
              `C ${pt(coords[c], coords[c + 1])} ${pt(coords[c + 2], coords[c + 3])} ${pt(coords[c + 4], coords[c + 5])}`
            );
            c += 6;
          } else if (op === OPS.rectangle) {
            const [x, y, w, h] = coords.slice(c, c + 4);
            current.push(
              `M ${pt(x, y)} L ${pt(x + w, y)} L ${pt(x + w, y + h)} L ${pt(x, y + h)} Z`
            );
            c += 4;
          } else if (op === OPS.closePath) {
            current.push("Z");
          }
        }
      } else if (fn === OPS.fill || fn === OPS.eoFill) {
        if (current.length) parts.push(`<path d="${current.join(" ")}" fill="${fill}"/>`);
        current = [];
      } else if (fn === OPS.stroke || fn === OPS.closeStroke) {
        if (current.length) {
          parts.push(
            `<path d="${current.join(" ")}" fill="none" stroke="${stroke}" stroke-width="${lineWidth}"/>`
          );
        }
        current = [];
      } else if (fn === OPS.endPath) {
        current = [];
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(viewport.width)}" height="${Math.round(
      viewport.height
    )}" viewBox="0 0 ${Math.round(viewport.width)} ${Math.round(viewport.height)}">${parts.join("")}</svg>`;
  }
  function rgb(args) {
    const [r = 0, g = 0, b = 0] = args;
    const to = (v) => Math.max(0, Math.min(255, Math.round(v <= 1 ? v * 255 : v)));
    return `rgb(${to(r)},${to(g)},${to(b)})`;
  }
  async function renderPageImage(page, options = {}) {
    var _a, _b, _c, _d;
    const dpi = (_a = options.dpi) != null ? _a : 150;
    const scale = (_b = options.scale) != null ? _b : dpi / 72;
    const type = (_c = options.type) != null ? _c : "image/png";
    const viewport = page.getViewport({ scale });
    const canvas = makeCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const dataUri = await canvasToDataUri(canvas, type, (_d = options.quality) != null ? _d : 0.85);
    const width = canvas.width;
    const height = canvas.height;
    canvas.width = 0;
    canvas.height = 0;
    return { dataUri, width, height, type, dpi: Math.round(scale * 72) };
  }
  async function extractPageImages(page, options = {}) {
    const pdfjsLib2 = getPdfjs2();
    const OPS = pdfjsLib2.OPS || {};
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
        let dataUri = "";
        if (options.embed !== false) dataUri = await imageToDataUri(img);
        out.push({
          name: String(name),
          x: Math.round(x * 100) / 100,
          y: Math.round(y * 100) / 100,
          width: Math.round(width * 100) / 100,
          height: Math.round(height * 100) / 100,
          pixelWidth: img.width,
          pixelHeight: img.height,
          data_uri: dataUri
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
      a[1] * b[4] + a[3] * b[5] + a[5]
    ];
  }
  function resolveImage(page, name) {
    return new Promise((resolve) => {
      try {
        if (page.objs.has(name)) return resolve(page.objs.get(name));
        page.objs.get(name, (obj) => resolve(obj));
        setTimeout(() => resolve(null), 3e3);
      } catch {
        resolve(null);
      }
    });
  }
  async function imageToDataUri(img) {
    try {
      if (img.bitmap && typeof createImageBitmap !== "undefined") {
        const canvas2 = makeCanvas(img.width, img.height);
        canvas2.getContext("2d").drawImage(img.bitmap, 0, 0);
        return await canvasToDataUri(canvas2);
      }
      if (!img.data) return "";
      const canvas = makeCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");
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
      return "";
    }
  }
  var TESSERACT_CDN = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
  var ocrWorkerPromise = null;
  async function loadTesseract() {
    if (typeof window !== "undefined" && window.Tesseract) return window.Tesseract;
    if (typeof document === "undefined") throw new Error("[codbdocs] OCR requires a browser.");
    await new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${TESSERACT_CDN}"]`);
      if (existing) return resolve();
      const el = document.createElement("script");
      el.src = TESSERACT_CDN;
      el.async = true;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error("[codbdocs] failed to load tesseract.js"));
      document.head.appendChild(el);
    });
    if (!window.Tesseract) throw new Error("[codbdocs] tesseract.js unavailable.");
    return window.Tesseract;
  }
  async function getOcrWorker(language) {
    if (!ocrWorkerPromise) {
      ocrWorkerPromise = (async () => {
        const Tesseract = await loadTesseract();
        return Tesseract.createWorker(language || "eng");
      })();
    }
    return ocrWorkerPromise;
  }
  async function terminateOcr() {
    if (!ocrWorkerPromise) return;
    try {
      const worker = await ocrWorkerPromise;
      await worker.terminate();
    } catch {
    }
    ocrWorkerPromise = null;
  }
  async function ocrImage(image, options = {}) {
    var _a, _b, _c, _d;
    const worker = await getOcrWorker((_a = options.language) != null ? _a : "eng");
    const { data } = await worker.recognize(image);
    return {
      text: ((data == null ? void 0 : data.text) || "").trim(),
      confidence: (_b = data == null ? void 0 : data.confidence) != null ? _b : null,
      words: (_d = (_c = data == null ? void 0 : data.words) == null ? void 0 : _c.length) != null ? _d : 0
    };
  }
  async function ocrPage(page, options = {}) {
    var _a;
    const rendered = await renderPageImage(page, { dpi: (_a = options.dpi) != null ? _a : 200 });
    const result = await ocrImage(rendered.dataUri, options);
    return { ...result, image: options.keepImage ? rendered : null };
  }
  async function documentData(source, options = {}) {
    const {
      title = "Document",
      language = "en",
      aiContext = "",
      includeLayout = true,
      includeImages = true,
      includeVectors = true,
      includePageImages = false,
      includeOriginal = false,
      ocr = "auto",
      ocrMinChars = 24,
      dpi = 150,
      chunkSize = 220,
      chunkOverlap = 40,
      onProgress,
      signal
    } = options;
    const started = Date.now();
    const pdfjsLib2 = getPdfjs2();
    const bytes = await sourceBytes2(source);
    const loadingTask = pdfjsLib2.getDocument({
      data: bytes ? bytes.slice(0) : void 0,
      url: !bytes && typeof source === "string" ? source : void 0,
      disableAutoFetch: true
    });
    const pdf = await loadingTask.promise;
    let metadata = {};
    try {
      const meta = await pdf.getMetadata();
      metadata = { ...meta.info || {} };
    } catch {
    }
    let outlineRaw = [];
    try {
      outlineRaw = flattenOutline2(await pdf.getOutline());
    } catch {
    }
    const total = pdf.numPages;
    const numbers = resolvePages(options.pages, total);
    const pages = [];
    const layoutPages = [];
    const chunks = [];
    const headings = [];
    let ocrPages = 0;
    for (const num2 of numbers) {
      if (signal == null ? void 0 : signal.aborted) throw new Error("[codbdocs] aborted");
      const page = await pdf.getPage(num2);
      const viewport = page.getViewport({ scale: 1 });
      const content = await page.getTextContent();
      const spans = [];
      let text = "";
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
          font_family: item.fontName || "",
          direction: item.dir || "ltr"
        });
        text += item.str + (item.hasEOL ? "\n" : " ");
      }
      text = text.replace(/[ \t]+\n/g, "\n").trim();
      let pageOcr = false;
      const wantOcr = ocr === true || ocr === "auto" && text.replace(/\s+/g, "").length < ocrMinChars;
      if (wantOcr) {
        try {
          const result = await ocrPage(page, { language: options.ocrLanguage, dpi: Math.max(dpi, 200) });
          if (result.text) {
            text = result.text;
            pageOcr = true;
            ocrPages += 1;
          }
        } catch {
        }
      }
      for (const span of spans) {
        if (span.font_size >= 14 && span.text.trim().length > 2) {
          headings.push({
            text: span.text.trim(),
            page: num2,
            level: span.font_size >= 20 ? 1 : span.font_size >= 16 ? 2 : 3,
            font_size: span.font_size
          });
        }
      }
      pages.push({
        page_number: num2,
        width: Math.round(viewport.width * 100) / 100,
        height: Math.round(viewport.height * 100) / 100,
        text: text || `(No text could be extracted from page ${num2})`,
        words: text ? text.split(/\s+/).filter(Boolean).length : 0,
        spans: spans.length,
        images: 0,
        ocr: pageOcr
      });
      chunks.push(...chunkText(text, num2, chunkSize, chunkOverlap, title));
      if (includeLayout) {
        const images = includeImages ? await extractPageImages(page) : [];
        pages[pages.length - 1].images = images.length;
        const entry = {
          page_number: num2,
          width: Math.round(viewport.width * 100) / 100,
          height: Math.round(viewport.height * 100) / 100,
          spans,
          images,
          vector_svg: "",
          page_image: ""
        };
        if (includeVectors) {
          try {
            entry.vector_svg = await extractPageVector(page);
          } catch {
            entry.vector_svg = "";
          }
        }
        if (includePageImages) {
          try {
            entry.page_image = (await renderPageImage(page, { dpi })).dataUri;
          } catch {
            entry.page_image = "";
          }
        }
        layoutPages.push(entry);
      }
      try {
        page.cleanup();
      } catch {
      }
      onProgress == null ? void 0 : onProgress({
        page: pages.length,
        total: numbers.length,
        percent: Math.round(pages.length / numbers.length * 100)
      });
    }
    const transcript = pages.map((p) => `--- Page ${p.page_number} ---
${p.text}`).join("\n\n");
    const outline = outlineRaw.length ? outlineRaw.map((o, i) => {
      var _a;
      return { text: o.title, level: o.level + 1, page: (_a = o.page) != null ? _a : null, id: `o${i}` };
    }) : headings;
    const payload = {
      document: {
        title,
        source: options.name || source && source.name || `${title}.pdf`,
        language,
        page_count: total,
        bytes: bytes ? bytes.length : 0,
        generated_at: (/* @__PURE__ */ new Date()).toISOString(),
        metadata
      },
      metrics: {
        pages: pages.length,
        headings: outline.length,
        rag_chunks: chunks.length,
        rag_words: chunks.reduce((sum, c) => sum + c.words, 0),
        total_spans: pages.reduce((sum, p) => sum + p.spans, 0),
        text_pages: pages.filter((p) => !p.text.startsWith("(")).length,
        ocr_pages: ocrPages,
        characters: pages.reduce((sum, p) => sum + p.text.length, 0),
        duration_ms: Date.now() - started,
        engine: "codbdocs/browser"
      },
      outline,
      pages,
      chunks,
      transcript,
      ai_context: aiContext
    };
    if (includeLayout) payload.layout = { pages: layoutPages };
    if (includeOriginal && bytes) payload.original_pdf_base64 = bytesToBase64(bytes);
    try {
      await pdf.destroy();
    } catch {
    }
    return payload;
  }
  async function packageDocumentFull(source, options = {}) {
    var _a, _b, _c, _d;
    const data = await documentData(source, {
      ...options,
      includeLayout: true,
      includeVectors: options.includeVectors !== false,
      includePageImages: options.pageBackgrounds !== false
    });
    const entries = [];
    const pageFiles = [];
    const vectorFiles = [];
    const bytes = await sourceBytes2(source);
    const html = options.html || buildFidelityHtml(dataToIR(data, options), {
      title: data.document.title,
      lang: data.document.language || "en",
      rag: { chunks: data.chunks },
      originalName: data.document.source,
      originalPdfSrc: options.includeOriginal !== false ? "original.pdf" : void 0,
      ...(_a = options.htmlOptions) != null ? _a : {}
    });
    entries.push({ name: "index.html", data: html });
    entries.push({ name: "transcript.txt", data: data.transcript });
    entries.push({ name: "rag.json", data: JSON.stringify({ chunks: data.chunks }, null, 2) });
    entries.push({ name: "outline.json", data: JSON.stringify(data.outline, null, 2) });
    if (options.includePageImages !== false) {
      const pdfjsLib2 = getPdfjs2();
      const pdf = await pdfjsLib2.getDocument({ data: bytes.slice(0) }).promise;
      for (const page of data.pages) {
        const p = await pdf.getPage(page.page_number);
        const rendered = await renderPageImage(p, { dpi: (_b = options.dpi) != null ? _b : 150 });
        const name = `pages/page-${String(page.page_number).padStart(4, "0")}.png`;
        entries.push({ name, data: dataUriToBytes(rendered.dataUri) });
        pageFiles.push(name);
        try {
          p.cleanup();
        } catch {
        }
      }
      await pdf.destroy();
    }
    for (const page of (_d = (_c = data.layout) == null ? void 0 : _c.pages) != null ? _d : []) {
      if (!page.vector_svg) continue;
      const name = `vectors/page-${String(page.page_number).padStart(4, "0")}.svg`;
      entries.push({ name, data: page.vector_svg });
      vectorFiles.push(name);
    }
    entries.push({ name: "data.json", data: JSON.stringify(data, null, 2) });
    if (options.includeOriginal !== false && bytes) {
      entries.push({ name: "original.pdf", data: bytes });
    }
    const manifest = {
      generator: "codbdocs/serverless",
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      document: data.document,
      metrics: data.metrics,
      files: entries.map((e) => e.name).concat("manifest.json"),
      pageImages: pageFiles,
      vectors: vectorFiles
    };
    entries.push({ name: "manifest.json", data: JSON.stringify(manifest, null, 2) });
    return { blob: createZip(entries), manifest, data };
  }
  function dataUriToBytes(dataUri) {
    const b64 = dataUri.slice(dataUri.indexOf(",") + 1);
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
        text: slice.join(" "),
        words: slice.length
      });
      if (i + size >= words.length) break;
    }
    return chunks;
  }
  function resolvePages(pages, total) {
    if (!pages) return Array.from({ length: total }, (_, i) => i + 1);
    if (Array.isArray(pages) && pages.length === 2 && pages.every((n) => typeof n === "number")) {
      const out = [];
      for (let n = Math.max(1, pages[0]); n <= Math.min(total, pages[1]); n += 1) out.push(n);
      return out;
    }
    if (Array.isArray(pages)) return pages.filter((n) => n >= 1 && n <= total);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  function flattenOutline2(items, depth = 0, out = []) {
    var _a, _b;
    for (const item of items || []) {
      out.push({ title: item.title, level: depth, dest: (_a = item.dest) != null ? _a : null });
      if ((_b = item.items) == null ? void 0 : _b.length) flattenOutline2(item.items, depth + 1, out);
    }
    return out;
  }
  async function sourceBytes2(source) {
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
  function dataToIR(data, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const objects = {};
    const pages = {};
    const pageIds = [];
    const layout = (_b = (_a = data.layout) == null ? void 0 : _a.pages) != null ? _b : [];
    const byNumber = new Map(layout.map((p) => [p.page_number, p]));
    for (const page of data.pages) {
      const pid = `page-${page.page_number}`;
      pageIds.push(pid);
      const lay = byNumber.get(page.page_number);
      const content = [];
      ((_c = lay == null ? void 0 : lay.spans) != null ? _c : []).forEach((run, i) => {
        if (!run.text || !run.text.trim()) return;
        const id = `${pid}-t${i}`;
        const size = run.font_size || run.height || 11;
        objects[id] = {
          id,
          type: "text",
          bbox: [run.x, run.y, run.width, run.height || size],
          raw: {
            text: run.text,
            font: run.font_family || "",
            fontSize: size,
            bbox: [run.x, run.y, run.width, run.height || size]
          },
          semantic: { text: run.text, role: "paragraph" }
        };
        content.push(id);
      });
      ((_d = lay == null ? void 0 : lay.images) != null ? _d : []).forEach((img, i) => {
        if (!img.data_uri) return;
        const id = `${pid}-img${i}`;
        objects[id] = {
          id,
          type: "image",
          bbox: [img.x, img.y, img.width, img.height],
          raw: { src: img.data_uri, bbox: [img.x, img.y, img.width, img.height] },
          semantic: { role: "figure", caption: `Image on page ${page.page_number}` },
          accessibility: { alt: `Image on page ${page.page_number}` }
        };
        content.push(id);
      });
      pages[pid] = {
        id: pid,
        num: page.page_number,
        width: page.width,
        height: page.height,
        background: (lay == null ? void 0 : lay.page_image) || "",
        content
      };
    }
    return {
      document: {
        title: options.title || ((_e = data.document) == null ? void 0 : _e.title) || "Document",
        pages: pageIds,
        metadata: { ...(_g = (_f = data.document) == null ? void 0 : _f.metadata) != null ? _g : {}, title: (_h = data.document) == null ? void 0 : _h.title, language: (_i = data.document) == null ? void 0 : _i.language }
      },
      pages,
      objects
    };
  }
  async function buildAccessibleHtml(source, options = {}) {
    var _a, _b;
    const data = await documentData(source, {
      ...options,
      includeLayout: true,
      includeImages: options.includeImages !== false,
      includePageImages: options.pageBackgrounds !== false,
      includeVectors: options.includeVectors === true,
      dpi: (_a = options.dpi) != null ? _a : 150
    });
    const ir = dataToIR(data, options);
    const html = buildFidelityHtml(ir, {
      title: data.document.title,
      lang: data.document.language || "en",
      rag: { chunks: data.chunks },
      originalName: data.document.source,
      ...(_b = options.html) != null ? _b : {}
    });
    return { html, data, ir };
  }
  function serverlessCapabilities() {
    return {
      text: true,
      layout: true,
      images: true,
      vectors: true,
      pageImages: true,
      ocr: typeof document !== "undefined",
      rag: true,
      accessibleHtml: true,
      zipPackage: true,
      streamingLargeFiles: true,
      aiQnA: false,
      translation: false,
      note: "AI Q&A and translation need a server-held key; everything else runs in the browser."
    };
  }

  // packages/core/src/index.js
  function trackImageBboxes(pageOps) {
    var _a, _b, _c;
    const imageBboxes = /* @__PURE__ */ new Map();
    const ctmStack = [];
    let ctm = [1, 0, 0, 1, 0, 0];
    for (const op of pageOps) {
      if (op.fn === "save") {
        ctmStack.push([...ctm]);
      } else if (op.fn === "restore") {
        ctm = ctmStack.pop() || [1, 0, 0, 1, 0, 0];
      } else if (op.fn === "transform" && ((_a = op.args) == null ? void 0 : _a.length) === 6) {
        const [a, b, c, d, e, f] = op.args;
        ctm = multiplyMatrix(ctm, [a, b, c, d, e, f]);
      } else if (op.fn === "concatMatrix" && ((_b = op.args) == null ? void 0 : _b.length) === 6) {
        ctm = [...op.args];
      } else if (op.fn === "doXObject" && ((_c = op.args) == null ? void 0 : _c[0])) {
        const name = op.args[0];
        imageBboxes.set(name, {
          bbox: applyMatrixToRect(ctm, [0, 0, 1, 1]),
          ctm: [...ctm],
          name
        });
      }
    }
    return imageBboxes;
  }
  function multiplyMatrix(m1, m2) {
    const [a1, b1, c1, d1, e1, f1] = m1;
    const [a2, b2, c2, d2, e2, f2] = m2;
    return [
      a1 * a2 + c1 * b2,
      b1 * a2 + d1 * b2,
      a1 * c2 + c1 * d2,
      b1 * c2 + d1 * d2,
      a1 * e2 + c1 * f2 + e1,
      b1 * e2 + d1 * f2 + f1
    ];
  }
  function applyMatrixToRect(ctm, [x1, y1, x2, y2]) {
    const [a, b, c, d, e, f] = ctm;
    const corners = [
      [x1, y1],
      [x2, y1],
      [x1, y2],
      [x2, y2]
    ];
    const transformed = corners.map(([x, y]) => [
      a * x + c * y + e,
      b * x + d * y + f
    ]);
    const xs = transformed.map((p) => p[0]);
    const ys = transformed.map((p) => p[1]);
    return [
      Math.min(...xs),
      Math.min(...ys),
      Math.max(...xs) - Math.min(...xs),
      Math.max(...ys) - Math.min(...ys)
    ];
  }
  var DEFAULTS = {
    nativeTextMinLength: 20,
    ocrScale: 2,
    ocrLang: "eng",
    enableVisual: false,
    enableBrain: true,
    enableContent: true,
    useWorkers: true,
    concurrency: 1,
    qualityThreshold: 0.5,
    memory: {
      maxMB: 512,
      canvasCache: 5,
      pageCache: 25
    }
  };
  var config = { ...DEFAULTS };
  function configure(opts = {}) {
    if (opts.memory) {
      opts.memory = { ...config.memory, ...opts.memory };
    }
    config = { ...config, ...opts };
  }
  function getPdfjs3() {
    const lib = typeof window !== "undefined" && (window["pdfjs-dist/build/pdf"] || window.pdfjsLib);
    if (!lib) {
      throw new Error(
        '[codbdocs] pdfjsLib not found. Load PDF.js before calling CodbDocs.load().\n  <script src="vendor/pdf.js/pdf.min.js"><\/script>'
      );
    }
    return lib;
  }
  function getTesseract() {
    const lib = typeof window !== "undefined" && window.Tesseract;
    if (!lib) {
      throw new Error(
        '[codbdocs] Tesseract not found. Load Tesseract.js before calling doc.analyze({ ocr: true }).\n  <script src="vendor/tesseract.js/tesseract.min.js"><\/script>'
      );
    }
    return lib;
  }
  async function load(source) {
    const pdfjsLib2 = getPdfjs3();
    let data;
    if (typeof source === "string") {
      data = { url: source };
    } else if (source instanceof ArrayBuffer) {
      data = { data: source };
    } else if (source instanceof Uint8Array) {
      data = { data: source.buffer };
    } else if (source && typeof source.arrayBuffer === "function") {
      data = { data: await source.arrayBuffer() };
    } else {
      throw new Error("[codbdocs] Unsupported source. Pass a File, Blob, ArrayBuffer, Uint8Array, or URL string.");
    }
    const pdf = await pdfjsLib2.getDocument(data).promise;
    return new CodbDoc(pdf);
  }
  var CodbDoc = class {
    constructor(pdf) {
      this._pdf = pdf;
      this.pageCount = pdf.numPages;
    }
    /**
     * Run the full analysis pipeline.
     * Returns a DocumentGraph with spatial search, content graph, and ask().
     */
    async analyze(opts = {}) {
      var _a, _b;
      const {
        ocr = true,
        visual = false,
        extractVectors: extractVecs = true,
        extractExtended = true,
        onPageComplete,
        onProgress,
        onLayer
      } = opts;
      const graph = new DocumentGraph();
      const contentGraph = new DocumentContentGraph();
      const ir = createIR();
      const listeners = {};
      graph.on = (event, fn) => {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(fn);
      };
      graph.emit = (event, data) => {
        (listeners[event] || []).forEach((fn) => fn(data));
      };
      if (extractExtended) {
        try {
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "metadata" });
          ir.document.metadata = await extractDocumentMetadata(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "navigation" });
          ir.document.navigation = {
            outline: await extractOutline(this._pdf),
            destinations: await extractNamedDestinations(this._pdf),
            labels: await extractPageLabels(this._pdf)
          };
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "security" });
          ir.document.security = await extractSecurity(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "ocgs" });
          ir.document.ocgs = await extractOCGs(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "embedded" });
          ir.document.embeddedFiles = await extractEmbeddedFiles(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "actions" });
          ir.document.actions = await extractActions(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "revisions" });
          ir.document.revisions = await extractRevisions(this._pdf);
        } catch (e) {
          console.error("[codbdocs] Document-level extraction error:", e);
        }
      }
      graph._pageResults = {};
      graph._allContentItems = {};
      graph._allImages = {};
      try {
        for (let num2 = 1; num2 <= this.pageCount; num2++) {
          onProgress && onProgress({ page: num2, total: this.pageCount, status: "reading" });
          const page = await this._pdf.getPage(num2);
          const viewport = page.getViewport({ scale: 1 });
          const pageSize = { width: viewport.width, height: viewport.height };
          const content = await page.getTextContent();
          const nativeTextRaw = content.items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim();
          const nativeText = cleanControlBytes(nativeTextRaw);
          let text = nativeText;
          let source = "native";
          let confidence = null;
          let canvas = null;
          const qualityScore = computeTextQuality(content.items, pageSize);
          if (qualityScore < config.qualityThreshold && ocr) {
            onProgress && onProgress({ page: num2, total: this.pageCount, status: "ocr", progress: 0 });
            try {
              canvas = await renderPageToCanvas(page, config.ocrScale);
              const Tesseract = getTesseract();
              const { data } = await Tesseract.recognize(canvas, config.ocrLang, {
                logger: (m) => {
                  if (m.status === "recognizing text") {
                    onProgress && onProgress({ page: num2, total: this.pageCount, status: "ocr", progress: m.progress });
                  }
                }
              });
              const ocrText = (data.text || "").trim();
              text = fuseNativeOCR(nativeText, ocrText, content.items, pageSize);
              source = text === ocrText ? "ocr" : "fusion";
              confidence = data.confidence;
            } catch (err) {
              source = "error";
              text = "";
            }
          } else if (qualityScore < config.qualityThreshold && !ocr) {
            source = "skipped";
            text = nativeText;
          }
          let spatial = null;
          let structures = null;
          let metadata = null;
          let classification = null;
          let visualRegions = null;
          if (config.enableBrain) {
            onProgress && onProgress({ page: num2, total: this.pageCount, status: "analyzing" });
            spatial = analyzeSpatialLayout(content.items, pageSize);
            structures = detectStructure(spatial, pageSize);
            metadata = extractMetadata(text);
            classification = classifyPage(text, spatial);
          }
          if (visual || config.enableVisual) {
            if (!canvas) canvas = await renderPageToCanvas(page, config.ocrScale);
            try {
              visualRegions = analyzeVisualRegions(canvas);
            } catch (e) {
            }
          }
          let contentPageGraph = null;
          if (config.enableContent) {
            onProgress && onProgress({ page: num2, total: this.pageCount, status: "content" });
            contentPageGraph = analyzeContent(num2, text, spatial, metadata);
            contentGraph.addPageGraph(contentPageGraph);
          }
          let vectors = [];
          if (extractVecs) {
            onProgress && onProgress({ page: num2, total: this.pageCount, status: "vectors" });
            try {
              vectors = await extractVectors(page);
            } catch (e) {
            }
          }
          let structureTree = null;
          try {
            structureTree = await extractStructureTree(page);
          } catch (e) {
          }
          let annotations = [];
          try {
            annotations = await extractAnnotations(page);
          } catch (e) {
          }
          const irPage = addPage(ir, num2, {
            width: pageSize.width,
            height: pageSize.height,
            rotation: page.rotate,
            mediaBox: page.mediaBox,
            cropBox: page.cropBox,
            labels: page.labels || null
          });
          for (const vec of vectors) {
            addVectorObject(ir, `page_${num2}`, vec);
          }
          for (const item of content.items) {
            if (item.str && item.str.trim()) {
              addTextObject(ir, `page_${num2}`, {
                text: item.str,
                bbox: [item.transform[4], item.transform[5], item.width, item.height],
                font: item.fontName,
                fontSize: Math.abs(item.transform[0]) || 12,
                color: item.color || item.fillColor || null,
                transform: item.transform
              });
            }
          }
          if (source === "ocr" || source === "fusion") {
            materializeOCRObject(ir, `page_${num2}`, {
              text,
              source,
              confidence,
              pageSize
            });
          }
          if (annotations.length > 0) {
            irPage.annotations = annotations;
            ir.annotations[`page_${num2}`] = annotations;
            for (const ann of annotations) {
              if (ann.type && ann.type === "link") {
                const href = ann.url || (ann.dest ? `#${ann.dest}` : null);
                if (!href) continue;
                addObject(ir, `page_${num2}`, {
                  type: "link",
                  raw: {
                    url: ann.url || null,
                    dest: ann.dest || null,
                    href,
                    rect: ann.rect || null
                  },
                  semantic: {
                    role: "link",
                    text: ann.contents || null
                  },
                  accessibility: {
                    role: "link"
                  },
                  bbox: ann.rect ? [ann.rect[0], ann.rect[1], ann.rect[2] - ann.rect[0], ann.rect[3] - ann.rect[1]] : null,
                  provenance: { method: "annotation", confidence: 1 }
                });
              }
            }
          }
          if (structureTree) {
            ir.structure[`page_${num2}`] = structureTree;
          }
          if (extractExtended) {
            try {
              irPage.markedContent = await extractMarkedContent(page);
            } catch (e) {
            }
            try {
              irPage.artifacts = await extractArtifacts(page);
            } catch (e) {
            }
            try {
              irPage.glyphs = await extractGlyphs(page);
            } catch (e) {
            }
            try {
              irPage.signatures = await extractSignatures(page, this._pdf);
            } catch (e) {
            }
            try {
              irPage.appearanceStreams = await extractAppearanceStreams(page);
            } catch (e) {
            }
            try {
              const pageOps = await page.getOperatorList();
              irPage.graphicsStates = extractGraphicsState(pageOps);
            } catch (e) {
            }
            try {
              irPage.textQuality = analyzeTextQuality(irPage, content.items, pageSize);
            } catch (e) {
            }
            if (visualRegions) {
              try {
                irPage.visualComparison = compareVisualInternal(irPage, visualRegions, content.items);
              } catch (e) {
              }
            }
            if (vectors.length > 0) {
              try {
                irPage.redactions = detectRedactions(vectors, content.items);
              } catch (e) {
              }
            }
            if (structureTree) {
              try {
                irPage.tagValidation = validateTags(irPage, structureTree, content.items);
              } catch (e) {
              }
            }
            try {
              irPage.rotationSkew = detectRotationSkew(irPage, content.items, vectors);
            } catch (e) {
            }
            try {
              irPage.glyphIssues = detectGlyphIssues(irPage, content.items);
            } catch (e) {
            }
            if (vectors.length > 0) {
              try {
                irPage.outlinedText = detectOutlinedText(vectors, content.items);
              } catch (e) {
              }
            }
            try {
              irPage.flattenedForms = detectFlattenedForms(vectors, content.items, annotations);
            } catch (e) {
            }
            if (vectors.length > 0) {
              try {
                irPage.checkboxes = detectCheckboxes(vectors, content.items);
              } catch (e) {
              }
            }
            try {
              irPage.footnotes = detectFootnotes(content.items, pageSize);
            } catch (e) {
            }
            try {
              irPage.language = detectLanguage(content.items);
            } catch (e) {
            }
          }
          let pageImages = [];
          try {
            let imageBboxesByName = /* @__PURE__ */ new Map();
            try {
              const pageOps = page._opTree || [];
              imageBboxesByName = trackImageBboxes(pageOps);
            } catch (e) {
            }
            pageImages = await extractImages(page);
            for (const img of pageImages) {
              if (img.name && imageBboxesByName.has(img.name)) {
                const ctmData = imageBboxesByName.get(img.name);
                img.bbox = ctmData.bbox;
                img.ctm = ctmData.ctm;
              }
              img.role = inferImageRole(img, content.items, pageSize);
              img.caption = findNearestCaption(img, content.items, pageSize);
              img.nearbyText = extractNearbyText(img, content.items, pageSize);
              if (!irPage.images) irPage.images = [];
              irPage.images.push(img);
              const imgBbox = Array.isArray(img.bbox) ? img.bbox : img.bbox && img.bbox.x != null ? [img.bbox.x, img.bbox.y, img.bbox.width, img.bbox.height] : null;
              try {
                addObject(ir, `page_${num2}`, {
                  type: "image",
                  raw: {
                    src: img.dataUrl || ((_a = img.thumbnail) == null ? void 0 : _a.dataUrl) || "",
                    thumb: ((_b = img.thumbnail) == null ? void 0 : _b.dataUrl) || null,
                    format: img.format,
                    width: img.width,
                    height: img.height
                  },
                  semantic: {
                    role: "image",
                    caption: img.caption || "",
                    text: img.caption || "",
                    imageRole: img.role || null
                  },
                  accessibility: {
                    alt: img.caption || img.role || "Image"
                  },
                  provenance: { method: "native", confidence: 1 },
                  bbox: imgBbox
                });
              } catch (e) {
              }
            }
          } catch (e) {
          }
          let pageRaster = null;
          try {
            if (!canvas) canvas = await renderPageToCanvas(page, 1.5);
            pageRaster = canvas.toDataURL("image/png");
            irPage.background = pageRaster;
          } catch (e) {
          }
          let readingOrder = [];
          try {
            readingOrder = detectReadingOrder(ir, num2);
          } catch (e) {
          }
          let repeatedElements = null;
          if (num2 === this.pageCount) {
            try {
              repeatedElements = detectRepeatedElements(graph._pageResults || {}, graph._allContentItems || {});
            } catch (e) {
            }
          }
          const pageResult = {
            num: num2,
            text,
            source,
            confidence,
            pageSize,
            spatial,
            structures,
            metadata,
            classification,
            visual: visualRegions,
            images: pageImages.length,
            imageRoles: pageImages.map((img) => img.role),
            contentBlocks: contentPageGraph ? contentPageGraph.blocks.length : 0,
            contentEntities: contentPageGraph ? contentPageGraph.entities.length : 0,
            vectors: vectors.length,
            annotations: annotations.length,
            hasStructureTree: !!structureTree,
            readingOrder: readingOrder.length,
            textQuality: irPage.textQuality,
            visualComparison: irPage.visualComparison,
            redactions: irPage.redactions,
            tagValidation: irPage.tagValidation,
            rotationSkew: irPage.rotationSkew,
            glyphIssues: irPage.glyphIssues,
            outlinedText: irPage.outlinedText,
            flattenedForms: irPage.flattenedForms,
            checkboxes: irPage.checkboxes,
            footnotes: irPage.footnotes,
            language: irPage.language,
            repeatedElements
          };
          graph.addPageResult(pageResult);
          graph._pageResults[`page_${num2}`] = pageResult;
          graph._allContentItems[`page_${num2}`] = content.items;
          graph._allImages[`page_${num2}`] = pageImages;
          onPageComplete && onPageComplete(pageResult);
          graph.emit("indexed", {
            page: num2,
            total: this.pageCount,
            pageResult
          });
          onLayer && onLayer({
            page: num2,
            spatial: !!spatial,
            structure: !!structures,
            metadata: !!metadata,
            classification: classification == null ? void 0 : classification.type,
            contentBlocks: pageResult.contentBlocks,
            contentEntities: pageResult.contentEntities,
            vectors: pageResult.vectors
          });
          try {
            page.cleanup();
          } catch (e) {
          }
        }
      } catch (e) {
        console.error("[codbdocs] Analysis error:", e);
      }
      if (config.enableContent) {
        contentGraph.documentType = classifyDocumentType(contentGraph);
      }
      const conceptGraph = new ConceptGraph();
      if (config.enableContent) {
        extractRelationships(contentGraph, conceptGraph);
      }
      const fingerprint = CodbFingerprint.fromGraph(graph, ir);
      graph._contentGraph = contentGraph;
      graph._doc = this;
      graph._ir = ir;
      graph._conceptGraph = conceptGraph;
      graph._fingerprint = fingerprint;
      graph.find = (query) => executeQuery(contentGraph, query, graph);
      graph.findOne = (query) => {
        const results = contentGraph.find(query);
        return results.length > 0 ? results[0] : null;
      };
      graph.ask = (question) => executeAsk(contentGraph, question, graph);
      graph.getEntities = (type) => contentGraph.getEntities(type);
      graph.getBlocks = (type) => contentGraph.getBlocks(type);
      graph.getDocumentType = () => contentGraph.documentType;
      graph.highlight = (canvas, query, options) => {
        const results = contentGraph.find(query);
        return highlightResults(canvas, results, options);
      };
      graph.getHighlights = (query, options) => {
        const results = contentGraph.find(query);
        return createHighlightAnnotations(results, options);
      };
      graph.getIR = () => ir;
      graph.auditAccessibility = () => auditAccessibility(ir);
      graph.getAccessibilityTree = () => generateAccessibilityTree(ir);
      graph.toHTML = (options) => exportHTML(ir, options);
      graph.getVectors = (pageNum) => {
        var _a2, _b2;
        const pageId = `page_${pageNum}`;
        return ((_b2 = (_a2 = ir.pages[pageId]) == null ? void 0 : _a2.vectors) == null ? void 0 : _b2.map((id) => ir.vectors[id])) || [];
      };
      graph.getStructureTree = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.structure[pageId] || null;
      };
      graph.getAnnotations = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.annotations[pageId] || [];
      };
      graph.getFormFields = () => {
        var _a2;
        return ((_a2 = ir.forms) == null ? void 0 : _a2.fields) || [];
      };
      graph.getReadingOrder = (pageNum) => detectReadingOrder(ir, pageNum);
      graph.getReadingOrderSequence = (pageNum) => getReadingOrderSequence(ir, pageNum);
      graph.getImages = (pageNum) => {
        if (pageNum) return graph._allImages[`page_${pageNum}`] || [];
        const all = [];
        for (const pageImages of Object.values(graph._allImages)) {
          all.push(...pageImages);
        }
        return all;
      };
      graph._images = (() => {
        const all = [];
        for (const pageImages of Object.values(graph._allImages)) {
          all.push(...pageImages);
        }
        return all;
      })();
      graph.extractAllImages = (options) => extractAllImages(this._pdf, options);
      graph.createChunks = (options) => createChunks(graph, options);
      graph.getCrossPageContext = () => buildCrossPageContext(graph);
      graph.toRAG = (options) => createRAGOutput(graph, options);
      graph.toRAGWithEmbeddings = (embeddingProvider, options) => createRAGOutputWithEmbeddings(graph, embeddingProvider, options);
      graph.toJSONL = (options) => exportAsJSONL(createRAGOutput(graph, options));
      graph.toCSV = (options) => exportAsCSV(createRAGOutput(graph, options));
      graph.toMarkdown = () => toMarkdown(ir, contentGraph);
      graph.toText = () => toReflowedText(ir);
      graph.exportFull = () => toFullJSON(ir, contentGraph);
      graph.toRAG = (options) => {
        if (options && options.format === "v2") {
          return buildRAGContext(ir, contentGraph);
        }
        return createRAGOutput(graph, options);
      };
      graph.getRAGContext = () => buildRAGContext(ir, contentGraph);
      graph.toExport = (format, options = {}) => {
        switch ((format || "").toLowerCase()) {
          case "markdown":
          case "md":
            return graph.toMarkdown();
          case "text":
          case "txt":
            return graph.toText();
          case "full":
          case "json":
          case "geometry":
            return graph.exportFull();
          case "rag":
          case "ragcontext":
            return graph.getRAGContext();
          case "jsonl":
            return graph.toJSONL(options);
          case "csv":
            return graph.toCSV(options);
          case "html":
          case "accessible":
            return graph.toAccessibleHTML(options);
          case "visual":
          case "intelligent":
          case "selectable":
            return graph.toHTML({ mode: format, ...options });
          default:
            return graph.getRAGContext();
        }
      };
      graph.getMetadata = () => ir.document.metadata;
      graph.getOutline = () => ir.document.navigation.outline || [];
      graph.getNamedDestinations = () => ir.document.navigation.destinations || {};
      graph.getPageLabels = () => ir.document.navigation.labels || [];
      graph.getSecurity = () => ir.document.security;
      graph.getMarkedContent = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.markedContent) || [];
      };
      graph.getArtifacts = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.artifacts) || [];
      };
      graph.getGlyphs = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.glyphs) || [];
      };
      graph.getRemediations = () => {
        const audit = graph.auditAccessibility();
        return generateRemediations(audit, ir);
      };
      graph.getSignatures = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.signatures) || [];
      };
      graph.getSignatureSummary = () => {
        var _a2;
        const allSignatures = [];
        for (const pageId of Object.keys(ir.pages)) {
          if ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.signatures) {
            allSignatures.push(...ir.pages[pageId].signatures);
          }
        }
        return buildSignatureSummary(allSignatures);
      };
      graph.getOCGs = () => ir.document.ocgs || [];
      graph.getOCGSummary = () => buildOCGSummary(ir.document.ocgs || []);
      graph.getEmbeddedFiles = () => ir.document.embeddedFiles || [];
      graph.getEmbeddedFilesSummary = () => buildEmbeddedFilesSummary(ir.document.embeddedFiles || []);
      graph.getActions = () => ir.document.actions || [];
      graph.getActionsSummary = () => buildActionsSummary(ir.document.actions || []);
      graph.getAppearanceStreams = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.appearanceStreams) || [];
      };
      graph.getAppearanceStreamsSummary = () => {
        var _a2;
        const allAppearances = [];
        for (const pageId of Object.keys(ir.pages)) {
          if ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.appearanceStreams) {
            allAppearances.push(...ir.pages[pageId].appearanceStreams);
          }
        }
        return buildAppearanceStreamsSummary(allAppearances);
      };
      graph.getXObjectReuse = () => trackXObjectReuse(ir);
      graph.getXObjectSummary = () => buildXObjectSummary(trackXObjectReuse(ir));
      graph.getRevisions = () => ir.document.revisions || [];
      graph.getRevisionsSummary = () => buildRevisionsSummary(ir.document.revisions || []);
      graph.getGraphicsStateSummary = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        const states = ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.graphicsStates) || [];
        return buildGraphicsStateSummary(states);
      };
      graph.wcagAudit = () => wcagAudit(ir);
      graph.toAccessibleHTML = (options) => exportAccessibleHTML(ir, options);
      graph.toFidelityHTML = (options) => exportFidelityHTML(graph, options);
      graph.remediateAccessibility = (options) => {
        const result = remediateAccessibility(ir, options);
        return result.report;
      };
      graph.getAccessibilityReport = () => generateAccessibilityReport(ir);
      graph.toPDF = (options) => createPDF(ir, options);
      graph.createTextPDF = (options) => createTextPDF(
        Object.values(ir.pages).map((p) => {
          var _a2;
          return ((_a2 = p.content) == null ? void 0 : _a2.join("\n")) || "";
        }),
        options
      );
      graph.diagnose = () => diagnoseDocument(pageResults, graph);
      graph.normalize = (options) => normalizeDocument(graph, options);
      graph.getTextQuality = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.textQuality) || null;
      };
      graph.getVisualComparison = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.visualComparison) || null;
      };
      graph.getRepeatedElements = () => {
        var _a2;
        return ((_a2 = pageResults[0]) == null ? void 0 : _a2.repeatedElements) || { watermarks: [], headers: [], footers: [], pageNumbers: [] };
      };
      graph.getRedactions = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.redactions) || [];
      };
      graph.getTagValidation = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.tagValidation) || { valid: false, issues: [] };
      };
      graph.getRAGReadiness = () => {
        var _a2;
        const readiness = calculateRAGReadiness(pageResults, null, null, ((_a2 = pageResults[0]) == null ? void 0 : _a2.repeatedElements) || {});
        return {
          score: Math.round(readiness.score * 100),
          factors: readiness.factors,
          recommendations: readiness.recommendations
        };
      };
      graph.getRotationSkew = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.rotationSkew) || { rotation: 0, skewAngle: 0, isRotated: false, isSkewed: false };
      };
      graph.getGlyphIssues = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.glyphIssues) || { issues: [], hasGlyphIssues: false };
      };
      graph.getOutlinedText = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.outlinedText) || { hasOutlinedText: false, candidates: [], count: 0 };
      };
      graph.getFlattenedForms = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.flattenedForms) || { hasFlattenedForms: false, candidates: [], recoveredFields: [] };
      };
      graph.getCheckboxes = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.checkboxes) || { count: 0, checkboxes: [], checked: 0, unchecked: 0 };
      };
      graph.getFootnotes = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.footnotes) || { footnotes: [], footnoteRefs: [], associations: [], count: 0 };
      };
      graph.getLanguage = (pageNum) => {
        var _a2;
        const pageId = `page_${pageNum}`;
        return ((_a2 = ir.pages[pageId]) == null ? void 0 : _a2.language) || { language: "unknown", confidence: 0 };
      };
      graph.getCrossPageTables = () => detectCrossPageTables(pageResults, ir);
      graph.associateCaptions = (pageNum) => {
        const pageId = `page_${pageNum}`;
        const pageData = ir.pages[pageId];
        const images = (pageData == null ? void 0 : pageData.images) || [];
        const contentItems = ((pageData == null ? void 0 : pageData.content) || []).map((id) => {
          var _a2;
          return (_a2 = ir.objects) == null ? void 0 : _a2[id];
        }).filter(Boolean).map((obj) => obj.raw);
        return associateCaptionsWithImages(pageData, contentItems, images);
      };
      graph.getConceptGraph = () => conceptGraph;
      graph.getFingerprint = () => fingerprint;
      graph.getConcepts = (type) => type ? conceptGraph.findByType(type) : [...conceptGraph.nodes.values()];
      graph.getConceptNeighbors = (nodeId, depth) => conceptGraph.getNeighbors(nodeId, depth);
      graph.getConceptPath = (sourceId, targetId) => conceptGraph.findPath(sourceId, targetId);
      graph.getConceptHubs = (limit) => conceptGraph.getHubs(limit);
      graph.getCommunities = () => conceptGraph.getCommunities();
      graph.getRelationships = (nodeId) => conceptGraph.getRelationships(nodeId);
      graph.hybridSearch = (query, options) => hybridSearch(graph, query, options);
      graph.detectIntent = (query) => detectIntent(query);
      graph.decomposeQuery = (query) => decomposeQuery(query);
      graph.planQuery = (question) => {
        const lower = question.toLowerCase().trim();
        const intent = detectIntent(lower);
        const subjectPatterns = [
          /(?:about|for|of|regarding)\s+(?:the\s+)?(\w[\w\s]*?)(?:\?|$)/i,
          /(?:what|which|who)\s+(?:is|are|was|were)\s+(?:the\s+)?(\w[\w\s]*?)(?:\?|$)/i,
          /(\w+)\s+(?:amount|cost|price|value|total|budget)/i
        ];
        let subject = [];
        for (const pat of subjectPatterns) {
          const m = lower.match(pat);
          if (m && m[1]) {
            subject.push(m[1].trim());
          }
        }
        const anchors = [];
        const currencyMatch = lower.match(/\$[\d,]+(?:\.\d{2})?/g);
        if (currencyMatch) anchors.push(...currencyMatch.map((v) => ({ type: "currency", value: v })));
        const dateMatch = lower.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g);
        if (dateMatch) anchors.push(...dateMatch.map((v) => ({ type: "date", value: v })));
        const expected = [];
        if (/who|person|people|name|author|approved?\s+by|signed?\s+by/i.test(lower)) {
          expected.push("person");
        }
        if (/how\s+much|amount|cost|price|total|budget|fund|\$/i.test(lower)) {
          expected.push("currency");
        }
        if (/when|date/i.test(lower)) {
          expected.push("date");
        }
        if (/where|address|location/i.test(lower)) {
          expected.push("address");
        }
        const relations = [];
        const relationPatterns = [
          { pattern: /approved?\s+by/i, relation: "approvedBy" },
          { pattern: /signed?\s+by/i, relation: "signedBy" },
          { pattern: /funded?\s+by/i, relation: "fundedBy" },
          { pattern: /authored?\s+by/i, relation: "authoredBy" },
          { pattern: /submitted?\s+by/i, relation: "submittedBy" },
          { pattern: /created?\s+by/i, relation: "createdBy" }
        ];
        for (const { pattern, relation } of relationPatterns) {
          if (pattern.test(lower)) relations.push(relation);
        }
        let operation = null;
        if (/total|sum|add\s+up|combined|aggregate/i.test(lower)) {
          operation = "SUM";
        } else if (/how\s+many|count|number\s+of/i.test(lower)) {
          operation = "COUNT";
        } else if (/average|avg|mean/i.test(lower)) {
          operation = "AVG";
        } else if (/highest|most|maximum|max|largest|biggest/i.test(lower)) {
          operation = "MAX";
        } else if (/lowest|least|minimum|min|smallest/i.test(lower)) {
          operation = "MIN";
        } else if (/before|prior\s+to|earlier\s+than/i.test(lower)) {
          operation = "BEFORE";
        } else if (/after|since|later\s+than/i.test(lower)) {
          operation = "AFTER";
        } else if (/between|from.*to/i.test(lower)) {
          operation = "BETWEEN";
        } else if (/group\s+by|per|each|every/i.test(lower)) {
          operation = "GROUP_BY";
        }
        return {
          query: question,
          intent,
          subject,
          expected,
          anchors,
          relations,
          operation
        };
      };
      graph.count = (criteria) => operatorCount(graph, criteria);
      graph.sum = (criteria) => operatorSum(graph, criteria);
      graph.max = (criteria) => operatorMax(graph, criteria);
      graph.min = (criteria) => operatorMin(graph, criteria);
      graph.reason = (query) => executeReasoning(graph, query);
      graph.askEnhanced = (question) => {
        const reasoningResult = executeReasoning(graph, question);
        if (reasoningResult) return reasoningResult;
        const searchResults = hybridSearch(graph, question, { maxResults: 10 });
        const ranked = rankResults(searchResults, question);
        if (ranked.length === 0) {
          return {
            answer: `No results found for "${question}".`,
            confidence: 0.9,
            evidence: [],
            reasoning: { intent: detectIntent(question), searchResults: 0 }
          };
        }
        const top = ranked[0];
        let answer = "";
        if (top.entities && top.entities.length > 0) {
          const entitySummary = top.entities.slice(0, 5).map((e) => `${e.type}: ${e.value}`).join(", ");
          answer = `Found relevant content on page ${top.page}: ${entitySummary}`;
        } else {
          answer = `Found relevant content on page ${top.page}.`;
        }
        return {
          answer,
          confidence: top.confidence,
          evidence: top.evidence || [],
          reasoning: {
            intent: top.intent,
            searchResults: ranked.length,
            topScore: top.score,
            explanation: top.explanation,
            reasons: top.reasons
          }
        };
      };
      graph.avg = (criteria) => operatorAvg(graph, criteria);
      graph.before = (criteria) => operatorBefore(graph, criteria);
      graph.after = (criteria) => operatorAfter(graph, criteria);
      graph.between = (criteria) => operatorBetween(graph, criteria);
      graph.groupBy = (criteria) => operatorGroupBy(graph, criteria);
      graph.getTables = () => buildTableObjects(graph._contentGraph, conceptGraph);
      graph.queryTable = (tableId, conditions) => {
        const tables = buildTableObjects(graph._contentGraph, conceptGraph);
        const table = tables.find((t) => t.id === tableId);
        return table ? queryTable(table, conditions) : [];
      };
      graph.expandQuery = (query, options) => expandQuery(query, options);
      graph.fuzzySearch = (query, options) => {
        var _a2;
        const pages = ((_a2 = graph.text) == null ? void 0 : _a2.pages) || [];
        return fuzzySearch(query, pages, options);
      };
      graph.getTerminology = () => graph._terminology || { aliases: {}, acronyms: {}, definitions: {} };
      graph.getAcronyms = () => {
        var _a2;
        const allAcronyms = [];
        for (const page of ((_a2 = graph.text) == null ? void 0 : _a2.pages) || []) {
          const text = page.text || "";
          allAcronyms.push(...detectAcronyms(text));
        }
        return allAcronyms;
      };
      graph.getDefinitions = () => {
        var _a2;
        const allDefs = [];
        for (const page of ((_a2 = graph.text) == null ? void 0 : _a2.pages) || []) {
          const text = page.text || "";
          allDefs.push(...detectDefinitions(text));
        }
        return allDefs;
      };
      graph.createWorkspace = (options) => createWorkspace(options);
      graph.saveCache = async (pdfBuffer) => saveToCache(pdfBuffer, graph.toJSON());
      graph.loadCache = async (pdfBuffer) => loadFromCache(pdfBuffer);
      graph.createAccessibleView = (options = {}) => {
        const {
          mode = "accessible",
          includeDataAttributes: includeDataAttributes2 = true,
          enforceHeadingHierarchy = true,
          wrapImagesInFigures = true
        } = options;
        const ir2 = graph._ir || {};
        return exportAccessibleHTML(ir2, {
          mode,
          includeDataAttributes: includeDataAttributes2,
          enforceHeadingHierarchy,
          wrapImagesInFigures
        });
      };
      graph.auditAccessibility = () => {
        const ir2 = graph._ir || {};
        return wcagAudit(ir2);
      };
      graph.remediateAccessibility = () => {
        const ir2 = graph._ir || {};
        return remediateAccessibility(ir2);
      };
      graph.getAccessibilityReport = () => {
        const ir2 = graph._ir || {};
        return generateAccessibilityReport(ir2);
      };
      return graph;
    }
    /**
     * Batteries-included analysis: runs the full pipeline and returns
     * a document ready for hybrid search, reasoning, and concept queries.
     *
     * Usage:
     *   const doc = await CodbDocs.load(file);
     *   await doc.prepare();
     *   const result = await doc.askEnhanced("Who approved the $425,000 contract?");
     */
    async prepare(opts = {}) {
      return this.analyze({
        ocr: true,
        visual: false,
        extractVectors: true,
        extractExtended: true,
        ...opts
      });
    }
    /**
     * Quick text-only extraction (no analysis).
     */
    async extractText(opts = {}) {
      const { ocr = true, onProgress } = opts;
      const pages = [];
      for (let num2 = 1; num2 <= this.pageCount; num2++) {
        onProgress && onProgress({ page: num2, total: this.pageCount, status: "reading" });
        const page = await this._pdf.getPage(num2);
        const content = await page.getTextContent();
        const nativeText = cleanControlBytes(
          content.items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim()
        );
        let text = nativeText;
        let source = "native";
        const qualityScore = computeTextQuality(content.items, page.getViewport({ scale: 1 }));
        if (qualityScore < config.qualityThreshold && ocr) {
          onProgress && onProgress({ page: num2, total: this.pageCount, status: "ocr" });
          try {
            const canvas = await renderPageToCanvas(page, config.ocrScale);
            const Tesseract = getTesseract();
            const { data } = await Tesseract.recognize(canvas, config.ocrLang);
            text = (data.text || "").trim();
            source = "ocr";
          } catch {
            text = nativeText;
            source = "error";
          }
        } else if (qualityScore < config.qualityThreshold) {
          source = "skipped";
          text = nativeText;
        }
        pages.push({ num: num2, text, source });
      }
      return {
        pageCount: this.pageCount,
        pages,
        fullText: pages.map((p) => `--- page ${p.num} (${p.source}) ---
${p.text}`).join("\n\n")
      };
    }
    async renderPage(pageNum, scale = 1.5) {
      const page = await this._pdf.getPage(pageNum);
      return renderPageToCanvas(page, scale);
    }
    /**
     * Process pages in batches for large PDFs (900+ pages).
     * This reduces memory usage by processing pages in chunks.
     */
    async analyzeBatched(opts = {}) {
      const {
        batchSize = 50,
        ocr = true,
        visual = false,
        extractVectors: extractVecs = true,
        extractExtended = true,
        onPageComplete,
        onProgress,
        onLayer,
        onBatchComplete
      } = opts;
      const graph = new DocumentGraph();
      const contentGraph = new DocumentContentGraph();
      const ir = createIR();
      if (extractExtended) {
        try {
          ir.document.metadata = await extractDocumentMetadata(this._pdf);
          ir.document.navigation = {
            outline: await extractOutline(this._pdf),
            destinations: await extractNamedDestinations(this._pdf),
            labels: await extractPageLabels(this._pdf)
          };
          ir.document.security = await extractSecurity(this._pdf);
        } catch (e) {
          console.error("[codbdocs] Document-level extraction error:", e);
        }
      }
      const totalPages = this.pageCount;
      for (let batchStart = 1; batchStart <= totalPages; batchStart += batchSize) {
        const batchEnd = Math.min(batchStart + batchSize - 1, totalPages);
        onProgress && onProgress({
          page: batchStart,
          total: totalPages,
          status: "batch",
          batch: { start: batchStart, end: batchEnd, total: Math.ceil(totalPages / batchSize) }
        });
        for (let num2 = batchStart; num2 <= batchEnd; num2++) {
          const page = await this._pdf.getPage(num2);
          const viewport = page.getViewport({ scale: 1 });
          const pageSize = { width: viewport.width, height: viewport.height };
          const content = await page.getTextContent();
          const nativeText = cleanControlBytes(
            content.items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim()
          );
          let text = nativeText;
          let source = "native";
          let confidence = null;
          const qualityScore = computeTextQuality(content.items, pageSize);
          if (qualityScore < config.qualityThreshold && ocr) {
            try {
              const canvas = await renderPageToCanvas(page, config.ocrScale);
              const Tesseract = getTesseract();
              const { data } = await Tesseract.recognize(canvas, config.ocrLang);
              text = (data.text || "").trim();
              source = "ocr";
              confidence = data.confidence;
            } catch (err) {
              source = "error";
              text = nativeText;
            }
          } else if (qualityScore < config.qualityThreshold && !ocr) {
            source = "skipped";
            text = nativeText;
          }
          let spatial = null;
          let structures = null;
          let metadata = null;
          let classification = null;
          if (config.enableBrain) {
            spatial = analyzeSpatialLayout(content.items, pageSize);
            structures = detectStructure(spatial, pageSize);
            metadata = extractMetadata(text);
            classification = classifyPage(text, spatial);
          }
          let contentPageGraph = null;
          if (config.enableContent) {
            contentPageGraph = analyzeContent(num2, text, spatial, metadata);
            contentGraph.addPageGraph(contentPageGraph);
          }
          let vectors = [];
          if (extractVecs) {
            try {
              vectors = await extractVectors(page);
            } catch (e) {
            }
          }
          let structureTree = null;
          try {
            structureTree = await extractStructureTree(page);
          } catch (e) {
          }
          let annotations = [];
          try {
            annotations = await extractAnnotations(page);
          } catch (e) {
          }
          const irPage = addPage(ir, num2, {
            width: pageSize.width,
            height: pageSize.height,
            rotation: page.rotate,
            mediaBox: page.mediaBox,
            cropBox: page.cropBox
          });
          for (const vec of vectors) addVectorObject(ir, `page_${num2}`, vec);
          for (const item of content.items) {
            if (item.str && item.str.trim()) {
              addTextObject(ir, `page_${num2}`, {
                text: item.str,
                bbox: [item.transform[4], item.transform[5], item.width, item.height],
                font: item.fontName,
                fontSize: Math.abs(item.transform[0]) || 12,
                transform: item.transform
              });
            }
          }
          if (annotations.length > 0) {
            irPage.annotations = annotations;
            ir.annotations[`page_${num2}`] = annotations;
          }
          if (structureTree) ir.structure[`page_${num2}`] = structureTree;
          if (extractExtended) {
            try {
              irPage.markedContent = await extractMarkedContent(page);
            } catch (e) {
            }
            try {
              irPage.artifacts = await extractArtifacts(page);
            } catch (e) {
            }
            try {
              irPage.glyphs = await extractGlyphs(page);
            } catch (e) {
            }
          }
          let readingOrder = [];
          try {
            readingOrder = detectReadingOrder(ir, num2);
          } catch (e) {
          }
          const pageResult = {
            num: num2,
            text,
            source,
            confidence,
            pageSize,
            spatial,
            structures,
            metadata,
            classification,
            contentBlocks: contentPageGraph ? contentPageGraph.blocks.length : 0,
            contentEntities: contentPageGraph ? contentPageGraph.entities.length : 0,
            vectors: vectors.length,
            annotations: annotations.length,
            hasStructureTree: !!structureTree,
            readingOrder: readingOrder.length
          };
          graph.addPageResult(pageResult);
          onPageComplete && onPageComplete(pageResult);
          try {
            page.cleanup();
          } catch (e) {
          }
        }
        onBatchComplete && onBatchComplete({
          batchStart,
          batchEnd,
          completed: batchEnd,
          total: totalPages
        });
      }
      if (config.enableContent) {
        contentGraph.documentType = classifyDocumentType(contentGraph);
      }
      graph._contentGraph = contentGraph;
      graph._doc = this;
      graph._ir = ir;
      graph.find = (query) => executeQuery(contentGraph, query, graph);
      graph.findOne = (query) => {
        const results = contentGraph.find(query);
        return results.length > 0 ? results[0] : null;
      };
      graph.ask = (question) => executeAsk(contentGraph, question, graph);
      graph.getEntities = (type) => contentGraph.getEntities(type);
      graph.getBlocks = (type) => contentGraph.getBlocks(type);
      graph.getDocumentType = () => contentGraph.documentType;
      graph.getIR = () => ir;
      graph.auditAccessibility = () => auditAccessibility(ir);
      graph.getAccessibilityTree = () => generateAccessibilityTree(ir);
      graph.toHTML = (options) => exportHTML(ir, options);
      graph.getVectors = (pageNum) => {
        var _a, _b;
        return ((_b = (_a = ir.pages[`page_${pageNum}`]) == null ? void 0 : _a.vectors) == null ? void 0 : _b.map((id) => ir.vectors[id])) || [];
      };
      graph.getStructureTree = (pageNum) => ir.structure[`page_${pageNum}`] || null;
      graph.getAnnotations = (pageNum) => ir.annotations[`page_${pageNum}`] || [];
      graph.getFormFields = () => {
        var _a;
        return ((_a = ir.forms) == null ? void 0 : _a.fields) || [];
      };
      graph.getReadingOrder = (pageNum) => detectReadingOrder(ir, pageNum);
      graph.getReadingOrderSequence = (pageNum) => getReadingOrderSequence(ir, pageNum);
      graph.getMetadata = () => ir.document.metadata;
      graph.getOutline = () => ir.document.navigation.outline || [];
      graph.getNamedDestinations = () => ir.document.navigation.destinations || {};
      graph.getPageLabels = () => ir.document.navigation.labels || [];
      graph.getSecurity = () => ir.document.security;
      graph.getMarkedContent = (pageNum) => {
        var _a;
        return ((_a = ir.pages[`page_${pageNum}`]) == null ? void 0 : _a.markedContent) || [];
      };
      graph.getArtifacts = (pageNum) => {
        var _a;
        return ((_a = ir.pages[`page_${pageNum}`]) == null ? void 0 : _a.artifacts) || [];
      };
      graph.getGlyphs = (pageNum) => {
        var _a;
        return ((_a = ir.pages[`page_${pageNum}`]) == null ? void 0 : _a.glyphs) || [];
      };
      graph.getRemediations = () => generateRemediations(graph.auditAccessibility(), ir);
      graph.wcagAudit = () => wcagAudit(ir);
      graph.toAccessibleHTML = (options) => exportAccessibleHTML(ir, options);
      graph.toFidelityHTML = (options) => exportFidelityHTML(graph, options);
      graph.remediateAccessibility = (options) => {
        const result = remediateAccessibility(ir, options);
        return result.report;
      };
      graph.getAccessibilityReport = () => generateAccessibilityReport(ir);
      graph.createChunks = (options) => createChunks(graph, options);
      graph.getCrossPageContext = () => buildCrossPageContext(graph);
      graph.toRAG = (options) => createRAGOutput(graph, options);
      return graph;
    }
    destroy() {
      if (this._pdf) this._pdf.destroy();
    }
  };
  function cleanControlBytes(raw) {
    return String(raw || "").replace(/[\u0000\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F\u0080-\u009F\uFFFC\uFFFD]/g, "").replace(/[ \t]+/g, " ").trim();
  }
  function computeTextQuality(contentItems, pageSize) {
    if (!contentItems || contentItems.length === 0) return 0;
    let score = 1;
    const allText = contentItems.map((i) => i.str || "").join(" ");
    const wordCount = allText.split(/\s+/).filter((w) => w.length > 0).length;
    if (wordCount < 5) score -= 0.4;
    else if (wordCount < 15) score -= 0.2;
    const nonPrintable = allText.replace(/[\x20-\x7E\n\r\t]/g, "").length;
    const nonPrintRatio = allText.length > 0 ? nonPrintable / allText.length : 0;
    if (nonPrintRatio > 0.3) score -= 0.3;
    const outsideBounds = contentItems.filter((item) => {
      var _a, _b;
      const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
      const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
      return x < 0 || x > pageSize.width || y < 0 || y > pageSize.height;
    }).length;
    const outsideRatio = contentItems.length > 0 ? outsideBounds / contentItems.length : 0;
    if (outsideRatio > 0.5) score -= 0.3;
    const words = allText.split(/\s+/).filter((w) => w.length > 0);
    const avgWordLen = words.length > 0 ? words.reduce((s, w) => s + w.length, 0) / words.length : 0;
    if (avgWordLen < 1.5 || avgWordLen > 25) score -= 0.2;
    const fragments = contentItems.map((i) => (i.str || "").trim()).filter((t) => t.length > 3);
    const uniqueFragments = new Set(fragments.map((f) => f.toLowerCase()));
    const duplicateRatio = fragments.length > 0 ? 1 - uniqueFragments.size / fragments.length : 0;
    if (duplicateRatio > 0.5) score -= 0.15;
    const uniqueChars = new Set(allText.replace(/\s/g, "")).size;
    if (uniqueChars < 10 && wordCount > 10) score -= 0.15;
    const garbageChars = allText.replace(/[\uFFFD\uFFFC\u0000\u0001-\u0008\u000B\u000C\u000E-\u001F]/g, "");
    const garbageCount = allText.length - garbageChars.length;
    const garbageWords = (allText.match(/\S*[\uFFFD\uFFFC]\S*/g) || []).length;
    const garbageRatio = allText.length > 0 ? garbageCount / allText.length : 0;
    const garbageWordRatio = wordCount > 0 ? garbageWords / wordCount : 0;
    if (garbageWordRatio > 0.4 || garbageRatio > 0.05) score -= 0.65;
    else if (garbageWordRatio > 0.2 || garbageRatio > 0.02) score -= 0.4;
    else if (garbageRatio > 5e-3) score -= 0.2;
    return Math.max(0, Math.min(1, score));
  }
  function inferImageRole(img, contentItems, pageSize) {
    if (!img.bbox) return "unknown";
    const imgY = img.bbox.y || 0;
    const imgCenterY = imgY + (img.bbox.height || 0) / 2;
    const normalizedY = imgCenterY / pageSize.height;
    if (normalizedY < 0.15) return "header";
    if (normalizedY > 0.85) return "footer";
    if (normalizedY < 0.3 && img.originalWidth < 300 && img.originalHeight < 150) return "logo";
    if (img.originalWidth > 400 && img.originalHeight > 300) {
      const centerX = (img.bbox.x || 0) + (img.bbox.width || 0) / 2;
      if (centerX > pageSize.width * 0.2 && centerX < pageSize.width * 0.8) return "chart";
    }
    if (img.originalWidth < 50 && img.originalHeight < 50) return "icon";
    const nearbyText = contentItems.filter((item) => {
      var _a;
      const y = ((_a = item.transform) == null ? void 0 : _a[5]) || 0;
      return Math.abs(y - imgY) < 100;
    }).map((item) => item.str || "").join(" ");
    if (/figure|fig\.|chart|graph|diagram|image|photo|picture/i.test(nearbyText)) return "figure";
    if (/logo|emblem|seal|crest|badge/i.test(nearbyText)) return "logo";
    return "content";
  }
  function fuseNativeOCR(nativeText, ocrText, contentItems, pageSize) {
    if (!nativeText || !ocrText) return nativeText || ocrText || "";
    const nativeQuality = computeTextQuality(contentItems, pageSize);
    if (nativeQuality > 0.8) {
      return nativeText;
    }
    if (ocrText.length > nativeText.length * 1.5) {
      return ocrText;
    }
    const nativeWords = new Set(nativeText.toLowerCase().split(/\s+/));
    const ocrWords = ocrText.split(/\s+/);
    const missingWords = ocrWords.filter((w) => !nativeWords.has(w.toLowerCase()));
    if (missingWords.length > 0 && missingWords.length < ocrWords.length * 0.3) {
      return nativeText;
    }
    return nativeText.length >= ocrText.length ? nativeText : ocrText;
  }
  function findNearestCaption(img, contentItems, pageSize) {
    if (!img.bbox) return null;
    const imgY = img.bbox.y || 0;
    const imgBottom = imgY;
    const imgLeft = img.bbox.x || 0;
    const imgRight = imgLeft + (img.bbox.width || 0);
    const candidates = contentItems.filter((item) => {
      var _a, _b;
      const y = ((_a = item.transform) == null ? void 0 : _a[5]) || 0;
      const x = ((_b = item.transform) == null ? void 0 : _b[4]) || 0;
      const below = y < imgBottom && y > imgBottom - 100;
      const overlap = x >= imgLeft - 50 && x <= imgRight + 50;
      return below && overlap && item.str && item.str.trim().length > 5;
    }).sort((a, b) => {
      var _a, _b;
      const distA = imgBottom - (((_a = a.transform) == null ? void 0 : _a[5]) || 0);
      const distB = imgBottom - (((_b = b.transform) == null ? void 0 : _b[5]) || 0);
      return distA - distB;
    });
    if (candidates.length === 0) return null;
    const firstText = candidates[0].str.trim();
    if (/^(figure|fig\.|chart|graph|diagram|table|photo|image|picture)/i.test(firstText)) {
      return firstText;
    }
    return firstText;
  }
  function extractNearbyText(img, contentItems, pageSize) {
    if (!img.bbox) return "";
    const imgX = img.bbox[0] || 0;
    const imgY = img.bbox[1] || 0;
    const imgW = img.bbox[2] || 0;
    const imgH = img.bbox[3] || 0;
    const margin = 150;
    const nearby = contentItems.filter((item) => {
      var _a, _b;
      const x = ((_a = item.transform) == null ? void 0 : _a[4]) || 0;
      const y = ((_b = item.transform) == null ? void 0 : _b[5]) || 0;
      const inX = x >= imgX - margin && x <= imgX + imgW + margin;
      const inY = y >= imgY - margin && y <= imgY + imgH + margin;
      return inX && inY && item.str && item.str.trim().length > 0;
    }).sort((a, b) => {
      var _a, _b, _c, _d;
      const aDist = Math.abs((((_a = a.transform) == null ? void 0 : _a[4]) || 0) - imgX) + Math.abs((((_b = a.transform) == null ? void 0 : _b[5]) || 0) - imgY);
      const bDist = Math.abs((((_c = b.transform) == null ? void 0 : _c[4]) || 0) - imgX) + Math.abs((((_d = b.transform) == null ? void 0 : _d[5]) || 0) - imgY);
      return aDist - bDist;
    }).slice(0, 20).map((item) => item.str.trim()).join(" ");
    return nearby;
  }
  async function renderPageToCanvas(page, scale) {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas;
  }
  var CodbDocs = { load, configure, canUseWorkers };
  var index_default = CodbDocs;
  function exportFidelityHTML(graph, options = {}) {
    var _a, _b, _c, _d;
    const ir = typeof (graph == null ? void 0 : graph.getIR) === "function" ? graph.getIR() : graph;
    const safe = (fn) => {
      try {
        return fn();
      } catch {
        return void 0;
      }
    };
    const audit = (_a = options.audit) != null ? _a : safe(() => graph.wcagAudit());
    const remediations = (_b = options.remediations) != null ? _b : safe(() => graph.getRemediations());
    const rag = (_c = options.rag) != null ? _c : safe(() => graph.toRAG());
    const tags = (_d = options.tags) != null ? _d : safe(() => graph.getAccessibilityTree());
    return buildFidelityHtml(ir, { ...options, audit, remediations, rag, tags });
  }
  async function packageDocument2(source, options = {}) {
    var _a;
    if (options.mode === "stream") return packageDocument(source, options);
    try {
      return await packageDocumentFull(source, options);
    } catch (err) {
      const html = (_a = options.html) != null ? _a : null;
      return packageDocument(source, { ...options, html, packagerFallbackError: String(err) });
    }
  }
  return __toCommonJS(index_exports);
})();
