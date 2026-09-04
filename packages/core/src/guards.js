/**
 * @codbdocs/core — IR/graph guards
 *
 * normalizeIR() fills in the optional shapes (pages, objects, document,
 * metadata, content/annotation arrays) that downstream analysis, audit and
 * export helpers assume, so a partially populated IR no longer throws.
 * hydrateGraph() rebuilds a usable graph object from serialized JSON.
 */
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
      const na = ir.pages[a]?.num ?? 0;
      const nb = ir.pages[b]?.num ?? 0;
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
  if (!json || typeof json !== "object") {
    throw new TypeError("codbdocs: a document graph (or graph.toJSON() output) is required");
  }
  if (typeof json.getSummary === "function") return json;
  const pages = Array.isArray(json.pages) ? json.pages : [];
  const pageOf = (n) => pages.find((p) => (p.num ?? p.pageNum) === n) || null;
  const listOf = (n, key) => {
    if (n == null) return pages.flatMap((p) => p[key] || []);
    return pageOf(n)?.[key] || [];
  };
  const metaOf = (n, key) => {
    if (n == null) return pages.flatMap((p) => p.metadata?.[key] || []);
    return pageOf(n)?.metadata?.[key] || [];
  };
  const pageCount = json.pageCount ?? pages.length;
  const summary = json.summary || {
    pageCount,
    wordCount: pages.reduce((acc, p) => acc + String(p.text || "").split(/\s+/).filter(Boolean).length, 0),
    pageTypes: {},
    metadata: {},
    headings: pages.flatMap((p) => (p.headings || []).map((h) => h.text)),
    tableCount: pages.reduce((acc, p) => acc + (p.tables?.length || 0), 0),
    formCount: pages.reduce((acc, p) => acc + (p.forms?.length || 0), 0),
    listCount: pages.reduce((acc, p) => acc + (p.lists?.length || 0), 0)
  };
  if (summary.pageCount == null) summary.pageCount = pageCount;
  return {
    ...json,
    pageCount,
    getSummary: () => summary,
    getDocumentType: () => json.documentType || null,
    classifications: json.classifications || pages.map((p) => p.classification || null),
    text: {
      pages: pages.map((p) => ({ pageNum: p.num ?? p.pageNum, text: p.text || "", source: p.source })),
      getPageText: (n) => pageOf(n)?.text || ""
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

export { normalizeIR, hydrateGraph };
