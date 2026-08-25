/**
 * @codbdocs/core — Content-Aware Layer
 *
 * Turns PDF primitives (text, fonts, coordinates) into semantic objects:
 *   heading, paragraph, table, invoice, receipt, form, address,
 *   person, date, currency, checkbox, signature, chart, citation, etc.
 *
 * 3-layer architecture:
 *   Layer 1: PDF-aware    — native text, fonts, vectors, images, links
 *   Layer 2: Vision-aware — OCR, layout, tables, handwriting
 *   Layer 3: Content-aware — semantic objects with bounding boxes
 */

// ─── Content Block Types ─────────────────────────────────────────────────────

export const BlockTypes = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  TABLE: 'table',
  LIST: 'list',
  FORM_FIELD: 'form_field',
  IMAGE: 'image',
  SIGNATURE: 'signature',
  CHECKBOX: 'checkbox',
  CHART: 'chart',
  CITATION: 'citation',
  QUOTE: 'quote',
  CAPTION: 'caption',
  HEADER: 'header',
  FOOTER: 'footer',
  WHITESPACE: 'whitespace',
};

// ─── Entity Types ────────────────────────────────────────────────────────────

export const EntityTypes = {
  PERSON: 'person',
  ORGANIZATION: 'organization',
  DATE: 'date',
  CURRENCY: 'currency',
  PHONE: 'phone',
  EMAIL: 'email',
  ADDRESS: 'address',
  URL: 'url',
  ZIP_CODE: 'zip_code',
  INVOICE_NUMBER: 'invoice_number',
  PERMIT_NUMBER: 'permit_number',
  RESOLUTION_NUMBER: 'resolution_number',
  ORDINANCE_NUMBER: 'ordinance_number',
  AGENDA_ITEM: 'agenda_item',
};

// ─── Content Block ───────────────────────────────────────────────────────────

/**
 * A content block represents a semantic region of a page.
 */
export class ContentBlock {
  constructor(type, data) {
    this.type = type;
    this.text = data.text || '';
    this.bbox = data.bbox || null;       // [x, y, width, height]
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
      children: this.children.length > 0 ? this.children : undefined,
      relationships: this.relationships.length > 0 ? this.relationships : undefined,
    };
  }
}

// ─── Content Graph ───────────────────────────────────────────────────────────

/**
 * Content graph for a single page.
 */
export class PageContentGraph {
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
    if (typeof query === 'string') {
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

    // Search blocks
    for (const block of this.blocks) {
      if (block.text.toLowerCase().includes(lower)) {
        results.push(block);
      }
    }

    // Search entities
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
      ...this.blocks.filter(b => b.type === type),
      ...this.entities.filter(e => e.type === type),
    ];
  }

  _findNear(text, type) {
    const targets = this._findByText(text);
    if (targets.length === 0) return [];

    const target = targets[0];
    if (!target.bbox) return targets;

    // Find entities of given type near the target
    return this.entities.filter(e => {
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
}

/**
 * Full document content graph.
 */
export class DocumentContentGraph {
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
      const pageResults = page.find(query);
      for (const r of pageResults) {
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
    return this.allEntities.filter(e => e.type === type);
  }

  /**
   * Get all blocks of a specific type.
   */
  getBlocks(type) {
    return this.allBlocks.filter(b => b.type === type);
  }

  /**
   * Export as JSON for downstream use.
   */
  toJSON() {
    return {
      documentType: this.documentType,
      pageCount: this.pages.length,
      summary: this.getSummary(),
      pages: this.pages.map(p => ({
        page: p.page,
        blocks: p.blocks.map(b => b.toJSON()),
        entities: p.entities,
        tables: p.tables.map(t => t.toJSON()),
        relationships: p.relationships,
      })),
    };
  }

  getSummary() {
    return {
      blockTypes: this._countTypes(this.allBlocks),
      entityTypes: this._countTypes(this.allEntities),
      tableCount: this.allTables.length,
      relationshipCount: this.allRelationships.length,
    };
  }

  _countTypes(arr) {
    const counts = {};
    for (const item of arr) {
      counts[item.type] = (counts[item.type] || 0) + 1;
    }
    return counts;
  }
}

// ─── Content Analyzers ───────────────────────────────────────────────────────

/**
 * Analyze a page's text and spatial data to produce content blocks.
 */
export function analyzeContent(pageNum, text, spatialResult, metadataResult) {
  const graph = new PageContentGraph(pageNum);

  if (!text || text.trim().length === 0) {
    return graph;
  }

  const { rows = [], headings = [], boxes = [] } = spatialResult || {};

  // 1. Create blocks from headings
  for (const heading of headings) {
    graph.addBlock(new ContentBlock(BlockTypes.HEADING, {
      text: heading.text,
      bbox: findBboxForText(heading.text, boxes),
      page: pageNum,
      metadata: { level: heading.level, fontSize: heading.fontSize },
    }));
  }

  // 2. Create blocks from paragraphs
  const paragraphs = splitIntoParagraphs(text);
  for (const para of paragraphs) {
    if (para.length < 10) continue;

    // Check if it's a list
    if (/^[\u2022\-\*]\s|^\d+[\.\)]\s/.test(para)) {
      graph.addBlock(new ContentBlock(BlockTypes.LIST, {
        text: para,
        bbox: findBboxForText(para.split('\n')[0], boxes),
        page: pageNum,
      }));
      continue;
    }

    // Check if it's a quote
    if (/^[""]|^\|/.test(para)) {
      graph.addBlock(new ContentBlock(BlockTypes.QUOTE, {
        text: para,
        bbox: findBboxForText(para.substring(0, 30), boxes),
        page: pageNum,
      }));
      continue;
    }

    // Regular paragraph
    graph.addBlock(new ContentBlock(BlockTypes.PARAGRAPH, {
      text: para,
      bbox: findBboxForText(para.substring(0, 30), boxes),
      page: pageNum,
    }));
  }

  // 3. Create entities from metadata
  if (metadataResult) {
    for (const date of (metadataResult.dates || [])) {
      graph.addEntity({
        type: EntityTypes.DATE,
        value: date.raw,
        text: date.raw,
        bbox: findBboxForText(date.raw, boxes),
        page: pageNum,
        confidence: 0.9,
      });
    }

    for (const phone of (metadataResult.phones || [])) {
      graph.addEntity({
        type: EntityTypes.PHONE,
        value: phone.raw,
        text: phone.raw,
        bbox: findBboxForText(phone.raw, boxes),
        page: pageNum,
        confidence: 0.85,
      });
    }

    for (const email of (metadataResult.emails || [])) {
      graph.addEntity({
        type: EntityTypes.EMAIL,
        value: email.raw,
        text: email.raw,
        bbox: findBboxForText(email.raw, boxes),
        page: pageNum,
        confidence: 0.95,
      });
    }

    for (const address of (metadataResult.addresses || [])) {
      graph.addEntity({
        type: EntityTypes.ADDRESS,
        value: address.raw,
        text: address.raw,
        bbox: findBboxForText(address.raw, boxes),
        page: pageNum,
        confidence: 0.8,
      });
    }

    for (const amount of (metadataResult.amounts || [])) {
      graph.addEntity({
        type: EntityTypes.CURRENCY,
        value: amount.raw,
        numericValue: amount.value,
        text: amount.raw,
        bbox: findBboxForText(amount.raw, boxes),
        page: pageNum,
        confidence: 0.9,
      });
    }
  }

  // 4. Detect special content types
  detectSpecialContent(graph, text, boxes, pageNum);

  // 5. Detect relationships between blocks and entities
  detectRelationships(graph);

  return graph;
}

// ─── Special Content Detection ───────────────────────────────────────────────

function detectSpecialContent(graph, text, boxes, pageNum) {
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    // Invoice detection
    if (/invoice|inv[\s#:]|bill\s*to|ship\s*to|amount\s*due/i.test(trimmed)) {
      graph.addBlock(new ContentBlock('invoice_hint', {
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 30), boxes),
        page: pageNum,
        metadata: { hint: 'invoice_content' },
      }));
    }

    // Receipt detection
    if (/receipt|purchase|subtotal|tax|total|change|cash|credit|debit/i.test(trimmed)) {
      graph.addBlock(new ContentBlock('receipt_hint', {
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 30), boxes),
        page: pageNum,
        metadata: { hint: 'receipt_content' },
      }));
    }

    // Form field detection (label: value pattern)
    const fieldMatch = trimmed.match(/^([A-Z][A-Za-z\s]{2,30}):\s*(.*)/);
    if (fieldMatch) {
      graph.addBlock(new ContentBlock(BlockTypes.FORM_FIELD, {
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 30), boxes),
        page: pageNum,
        metadata: {
          label: fieldMatch[1].trim(),
          value: fieldMatch[2].trim(),
          hasValue: fieldMatch[2].trim().length > 0,
        },
      }));
    }

    // Checkbox detection
    if (/[\u2610\u2611\u2612\u25A1\u25A0\u2713\u2717\u2714]/.test(trimmed) ||
        /\[x\]|\[ \]|\[X\]/.test(trimmed)) {
      const isChecked = /[\u2611\u25A0\u2713\u2714]|\[x\]|\[X\]/.test(trimmed);
      graph.addEntity({
        type: EntityTypes.CHECKBOX,
        value: isChecked ? 'checked' : 'unchecked',
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 20), boxes),
        page: pageNum,
        confidence: 0.85,
        metadata: { checked: isChecked },
      });
    }

    // Signature detection
    if (/signature|signed|sign\s*here|\/s\/|.{10,30}$/.test(trimmed) &&
        /[A-Za-z]{3,}/.test(trimmed) &&
        !/^[A-Z\s]{10,}$/.test(trimmed) &&
        trimmed.length < 50) {
      // Heuristic: signatures are often cursive-like, mixed case, short
      const hasSignatureLike = /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(trimmed) ||
                               /\//.test(trimmed);
      if (hasSignatureLike) {
        graph.addBlock(new ContentBlock(BlockTypes.SIGNATURE, {
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.6,
        }));
      }
    }

    // Ordinance/Resolution numbers (City of Daytona Beach specific)
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
        confidence: 0.9,
      });
    }

    // Permit numbers
    const permitMatch = trimmed.match(/permit\s*(?:no\.?|number|#)?\s*([A-Z0-9\-]+)/i);
    if (permitMatch) {
      graph.addEntity({
        type: EntityTypes.PERMIT_NUMBER,
        value: permitMatch[0],
        number: permitMatch[1],
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 30), boxes),
        page: pageNum,
        confidence: 0.85,
      });
    }

    // Agenda items
    const agendaMatch = trimmed.match(/^(?:item\s*)?(\d+[\.\)]\s*.+)/i);
    if (agendaMatch && /agenda|hearing|meeting|public\s*comment/i.test(text.substring(0, 500))) {
      graph.addEntity({
        type: EntityTypes.AGENDA_ITEM,
        value: agendaMatch[1].trim(),
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 30), boxes),
        page: pageNum,
        confidence: 0.7,
      });
    }

    // Person names (heuristic: "Name: Value" or known patterns)
    const nameMatch = trimmed.match(/^(?:prepared\s*by|author|name|employee|officer|director|commissioner|mayor|city\s*attorney)[:\s]+(.+)/i);
    if (nameMatch) {
      graph.addEntity({
        type: EntityTypes.PERSON,
        value: nameMatch[1].trim(),
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 30), boxes),
        page: pageNum,
        confidence: 0.7,
        metadata: { role: nameMatch[0].split(':')[0].trim() },
      });
    }

    // Organization names
    const orgMatch = trimmed.match(/^(city\s*of\s*[a-z\s]+|department\s*of\s*[a-z\s]+|[a-z\s]+\s*department)/i);
    if (orgMatch) {
      graph.addEntity({
        type: EntityTypes.ORGANIZATION,
        value: orgMatch[0].trim(),
        text: trimmed,
        bbox: findBboxForText(trimmed.substring(0, 30), boxes),
        page: pageNum,
        confidence: 0.75,
      });
    }
  }
}

// ─── Relationship Detection ──────────────────────────────────────────────────

function detectRelationships(graph) {
  for (const block of graph.blocks) {
    if (!block.bbox) continue;

    // Find entities near this block
    for (const entity of graph.entities) {
      if (!entity.bbox) continue;
      if (areBboxesNear(block.bbox, entity.bbox, 80)) {
        block.relationships.push({
          type: 'contains',
          target: entity.type,
          value: entity.value,
        });
        entity.relationships = entity.relationships || [];
        entity.relationships.push({
          type: 'belongs_to',
          target: block.type,
          text: block.text.substring(0, 50),
        });
      }
    }
  }
}

// ─── Document Type Detection ─────────────────────────────────────────────────

/**
 * Classify the overall document type based on content blocks.
 */
export function classifyDocumentType(contentGraph) {
  const allText = contentGraph.allBlocks.map(b => b.text).join(' ').toLowerCase();
  const entityTypes = contentGraph.allEntities.map(e => e.type);
  const blockTypes = contentGraph.allBlocks.map(b => b.type);

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
    contract: 0,
  };

  // Invoice signals
  if (/invoice|bill\s*to|amount\s*due|payment\s*due|invoice\s*#/i.test(allText)) scores.invoice += 3;
  if (entityTypes.includes(EntityTypes.CURRENCY)) scores.invoice += 1;
  if (blockTypes.includes('invoice_hint')) scores.invoice += 2;

  // Receipt signals
  if (/receipt|subtotal|change|cash\s*tendered|credit\s*card|debit/i.test(allText)) scores.receipt += 3;
  if (blockTypes.includes('receipt_hint')) scores.receipt += 2;

  // Form signals
  const formFieldCount = blockTypes.filter(t => t === BlockTypes.FORM_FIELD).length;
  if (formFieldCount >= 3) scores.form += 3;
  if (/application|fill\s*out|complete\s*this\s*form/i.test(allText)) scores.form += 2;

  // Legal signals
  if (/ordinance|resolution|charter|hereby\s*enacted|section\s*\d+/i.test(allText)) scores.legal += 3;
  if (entityTypes.includes(EntityTypes.ORDINANCE_NUMBER)) scores.legal += 2;
  if (entityTypes.includes(EntityTypes.RESOLUTION_NUMBER)) scores.legal += 2;

  // Memo signals
  if (/memorandum|memo\b|from:|to:|subject:|date:/i.test(allText)) scores.memo += 3;

  // Letter signals
  if (/dear\s|sincerely|regards|attention|re:\s/i.test(allText)) scores.letter += 3;

  // Report signals
  if (/report|annual\s*report|analysis|findings|recommendation/i.test(allText)) scores.report += 2;

  // Minutes signals
  if (/minutes|meeting\s*called\s*to\s*order|public\s*hearing|commissioner|mayor/i.test(allText)) scores.minutes += 3;

  // Policy signals
  if (/policy|procedure|guideline|regulation|compliance|standard\s*operating/i.test(allText)) scores.policy += 3;

  // Budget signals
  if (/budget|appropriation|expenditure|revenue|fiscal\s*year|fund\s*balance/i.test(allText)) scores.budget += 3;

  // Permit signals
  if (entityTypes.includes(EntityTypes.PERMIT_NUMBER)) scores.permit += 3;
  if (/building\s*permit|permit\s*application|zoning/i.test(allText)) scores.permit += 2;

  // Contract signals
  if (/agreement|contract|party|parties|hereby\s*agrees|terms\s*and\s*conditions/i.test(allText)) scores.contract += 3;

  // Find winner
  let bestType = 'document';
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
    scores,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findBboxForText(text, boxes) {
  if (!boxes || !text) return null;
  const lower = text.toLowerCase().substring(0, 30);
  const match = boxes.find(b => b.text.toLowerCase().includes(lower));
  if (match) {
    return [match.x, match.y, match.width, match.height];
  }
  return null;
}

function splitIntoParagraphs(text) {
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
}

function areBboxesNear(bbox1, bbox2, threshold) {
  const cx1 = bbox1[0] + bbox1[2] / 2;
  const cy1 = bbox1[1] + bbox1[3] / 2;
  const cx2 = bbox2[0] + bbox2[2] / 2;
  const cy2 = bbox2[1] + bbox2[3] / 2;
  const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
  return dist < threshold;
}
