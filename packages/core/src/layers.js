/**
 * @codbdocs/core — Semantic Layers
 *
 * Separates document content into composable layers:
 *   - TextLayer:      raw text, word-level data
 *   - LayoutLayer:    spatial positions, columns, rows
 *   - StructureLayer: headings, tables, lists, forms
 *   - MetadataLayer:  dates, names, addresses, entities
 *   - VisualLayer:    image regions, headers, footers
 *
 * Each layer can be queried independently or composed for full understanding.
 */

// ─── Text Layer ──────────────────────────────────────────────────────────────

export class TextLayer {
  constructor() {
    this.pages = [];
    this.fullText = '';
    this.wordCount = 0;
    this.sentences = [];
  }

  addPage(pageNum, text, source) {
    const words = text.split(/\s+/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);

    this.pages.push({ pageNum, text, source, words, sentences });
    this.fullText += text + '\n';
    this.wordCount += words.length;
    this.sentences.push(...sentences.map(s => ({ text: s, page: pageNum })));
  }

  search(query) {
    const lower = query.toLowerCase();
    return this.sentences.filter(s => s.text.toLowerCase().includes(lower));
  }

  getPageText(pageNum) {
    const page = this.pages.find(p => p.pageNum === pageNum);
    return page ? page.text : '';
  }

  getWordAt(pageNum, index) {
    const page = this.pages.find(p => p.pageNum === pageNum);
    if (!page) return null;
    return page.words[index] || null;
  }
}

// ─── Layout Layer ────────────────────────────────────────────────────────────

export class LayoutLayer {
  constructor() {
    this.pages = [];
  }

  addPage(pageNum, spatialResult, pageSize) {
    this.pages.push({
      pageNum,
      columns: spatialResult.columns || 1,
      rows: spatialResult.rows || [],
      headings: spatialResult.headings || [],
      flow: spatialResult.flow || 'unknown',
      pageSize,
    });
  }

  getColumns(pageNum) {
    const page = this.pages.find(p => p.pageNum === pageNum);
    return page ? page.columns : 0;
  }

  getHeadings(pageNum) {
    const page = this.pages.find(p => p.pageNum === pageNum);
    return page ? page.headings : [];
  }

  getAllHeadings() {
    return this.pages.flatMap(p =>
      p.headings.map(h => ({ ...h, page: p.pageNum }))
    );
  }

  getTableOfContents() {
    const headings = this.getAllHeadings();
    if (headings.length === 0) return null;

    // Build a tree from heading levels
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
}

// ─── Structure Layer ─────────────────────────────────────────────────────────

export class StructureLayer {
  constructor() {
    this.pages = [];
    this.tables = [];
    this.forms = [];
    this.lists = [];
  }

  addPage(pageNum, structures) {
    const pageStructures = {
      pageNum,
      tables: structures.filter(s => s.type === 'table'),
      lists: structures.filter(s => s.type === 'list'),
      forms: structures.filter(s => s.type === 'formField'),
      paragraphs: structures.filter(s => s.type === 'paragraph'),
    };

    this.pages.push(pageStructures);
    this.tables.push(...pageStructures.tables.map(t => ({ ...t, page: pageNum })));
    this.forms.push(...pageStructures.forms.map(f => ({ ...f, page: pageNum })));
    this.lists.push(...pageStructures.lists.map(l => ({ ...l, page: pageNum })));
  }

  getTables(pageNum) {
    if (pageNum) {
      const page = this.pages.find(p => p.pageNum === pageNum);
      return page ? page.tables : [];
    }
    return this.tables;
  }

  getForms(pageNum) {
    if (pageNum) {
      const page = this.pages.find(p => p.pageNum === pageNum);
      return page ? page.forms : [];
    }
    return this.forms;
  }

  getLists(pageNum) {
    if (pageNum) {
      const page = this.pages.find(p => p.pageNum === pageNum);
      return page ? page.lists : [];
    }
    return this.lists;
  }

  getFormData() {
    const data = {};
    for (const field of this.forms) {
      data[field.label] = field.hasValue ? '[value]' : '[empty]';
    }
    return data;
  }
}

// ─── Metadata Layer ──────────────────────────────────────────────────────────

export class MetadataLayer {
  constructor() {
    this.pages = [];
    this.entities = {
      dates: [],
      phones: [],
      emails: [],
      addresses: [],
      amounts: [],
      urls: [],
      zipCodes: [],
    };
  }

  addPage(pageNum, metadata) {
    this.pages.push({ pageNum, ...metadata });

    // Merge entities
    for (const key of Object.keys(this.entities)) {
      if (metadata[key]) {
        this.entities[key].push(...metadata[key].map(e => ({ ...e, page: pageNum })));
      }
    }
  }

  getDates(pageNum) {
    return pageNum
      ? this.entities.dates.filter(e => e.page === pageNum)
      : this.entities.dates;
  }

  getPhones(pageNum) {
    return pageNum
      ? this.entities.phones.filter(e => e.page === pageNum)
      : this.entities.phones;
  }

  getEmails(pageNum) {
    return pageNum
      ? this.entities.emails.filter(e => e.page === pageNum)
      : this.entities.emails;
  }

  getAddresses(pageNum) {
    return pageNum
      ? this.entities.addresses.filter(e => e.page === pageNum)
      : this.entities.addresses;
  }

  getAmounts(pageNum) {
    return pageNum
      ? this.entities.amounts.filter(e => e.page === pageNum)
      : this.entities.amounts;
  }

  getSummary() {
    return {
      totalDates: this.entities.dates.length,
      totalPhones: this.entities.phones.length,
      totalEmails: this.entities.emails.length,
      totalAddresses: this.entities.addresses.length,
      totalAmounts: this.entities.amounts.length,
      uniqueAmounts: [...new Set(this.entities.amounts.map(a => a.value))].sort((a, b) => b - a),
    };
  }
}

// ─── Visual Layer ────────────────────────────────────────────────────────────

export class VisualLayer {
  constructor() {
    this.pages = [];
  }

  addPage(pageNum, visualRegions) {
    this.pages.push({ pageNum, ...visualRegions });
  }

  getPageInfo(pageNum) {
    return this.pages.find(p => p.pageNum === pageNum) || null;
  }

  hasImages(pageNum) {
    const page = this.getPageInfo(pageNum);
    return page ? page.hasImages : false;
  }

  getHeaderFooterInfo() {
    return this.pages.map(p => ({
      page: p.pageNum,
      hasHeader: p.header,
      hasFooter: p.footer,
    }));
  }
}

// ─── Composite Document Graph ────────────────────────────────────────────────

/**
 * Complete semantic document graph combining all layers.
 * This is what `doc.analyze()` returns — a rich, queryable representation.
 */
export class DocumentGraph {
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

    // Add to each layer
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
        ...pageResult.classification,
      });
    }
  }

  /**
   * Query the document semantically — like querying an embedding model.
   * Supports natural language patterns.
   */
  query(q) {
    const lower = q.toLowerCase();

    // Date queries
    if (/date|when|what day/.test(lower)) {
      return { type: 'dates', results: this.metadata.getDates() };
    }

    // Phone queries
    if (/phone|call|contact|number/.test(lower)) {
      return { type: 'phones', results: this.metadata.getPhones() };
    }

    // Email queries
    if (/email|e-mail|electronic/.test(lower)) {
      return { type: 'emails', results: this.metadata.getEmails() };
    }

    // Address queries
    if (/address|location|where|street|avenue/.test(lower)) {
      return { type: 'addresses', results: this.metadata.getAddresses() };
    }

    // Money/amount queries
    if (/money|amount|cost|price|budget|dollar|\$|fund/.test(lower)) {
      return { type: 'amounts', results: this.metadata.getAmounts() };
    }

    // Table queries
    if (/table|data|spreadsheet|grid/.test(lower)) {
      return { type: 'tables', results: this.structure.getTables() };
    }

    // List queries
    if (/list|items|bullet|numbered/.test(lower)) {
      return { type: 'lists', results: this.structure.getLists() };
    }

    // Form queries
    if (/form|field|input|application|fill/.test(lower)) {
      return { type: 'forms', results: this.structure.getForms() };
    }

    // Heading/structure queries
    if (/heading|title|section|chapter|outline|toc/.test(lower)) {
      return { type: 'headings', results: this.layout.getAllHeadings() };
    }

    // Summary queries
    if (/summary|summarize|overview|brief/.test(lower)) {
      return { type: 'summary', results: this.getSummary() };
    }

    // Default: text search
    const searchResults = this.text.search(q);
    return { type: 'text-search', query: q, results: searchResults };
  }

  /**
   * Get a summary of the entire document.
   */
  getSummary() {
    const pageTypes = this.classifications.map(c => c.type);
    const typeCounts = {};
    for (const t of pageTypes) {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    }

    return {
      pageCount: this.pageCount,
      wordCount: this.text.wordCount,
      pageTypes: typeCounts,
      metadata: this.metadata.getSummary(),
      headings: this.layout.getAllHeadings().map(h => h.text),
      tableCount: this.structure.tables.length,
      formCount: this.structure.forms.length,
      listCount: this.structure.lists.length,
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
          amounts: this.metadata.getAmounts(p.pageNum),
        },
      })),
    };
  }
}
