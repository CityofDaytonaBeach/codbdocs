/**
 * @codbdocs/core — Document Query API
 *
 * Spatial + semantic search over the content graph.
 * Mimics AI-powered document understanding using pure heuristics.
 *
 * Usage:
 *   graph.find("invoice number")
 *   graph.find({ type: "currency" })
 *   graph.find("total", { near: "currency" })
 *   graph.ask("What is the total amount?")
 *   document.find("signature").highlight(canvas)
 */

import { EntityTypes, BlockTypes } from './content.js';

// ─── Natural Language Patterns ───────────────────────────────────────────────

const QUERY_PATTERNS = [
  // Dates
  { patterns: [/what\s+date|when|dates?\s+mentioned|date\s+of/i], entityType: EntityTypes.DATE, label: 'dates' },
  // People
  { patterns: [/who|person|people|names?|author|prepared\s+by|signed\s+by/i], entityType: EntityTypes.PERSON, label: 'people' },
  // Organizations
  { patterns: [/organization|company|department|agency|city/i], entityType: EntityTypes.ORGANIZATION, label: 'organizations' },
  // Money
  { patterns: [/how\s+much|money|amount|cost|price|total|budget|fund|currency|\$/i], entityType: EntityTypes.CURRENCY, label: 'amounts' },
  // Phone
  { patterns: [/phone|call|contact|number|telephone/i], entityType: EntityTypes.PHONE, label: 'phone numbers' },
  // Email
  { patterns: [/email|e-mail|electronic\s+mail/i], entityType: EntityTypes.EMAIL, label: 'emails' },
  // Address
  { patterns: [/address|location|where|street|avenue|city|zip/i], entityType: EntityTypes.ADDRESS, label: 'addresses' },
  // Tables
  { patterns: [/table|data|spreadsheet|grid|column/i], blockType: BlockTypes.TABLE, label: 'tables' },
  // Forms
  { patterns: [/form|field|input|application|fill|checkbox/i], blockType: BlockTypes.FORM_FIELD, label: 'form fields' },
  // Headings
  { patterns: [/heading|title|section|chapter|outline|toc/i], blockType: BlockTypes.HEADING, label: 'headings' },
  // Lists
  { patterns: [/list|items|bullet|numbered/i], blockType: BlockTypes.LIST, label: 'lists' },
  // Signatures
  { patterns: [/signature|signed|sign\s*here/i], blockType: BlockTypes.SIGNATURE, label: 'signatures' },
  // Ordinances
  { patterns: [/ordinance/i], entityType: EntityTypes.ORDINANCE_NUMBER, label: 'ordinances' },
  // Resolutions
  { patterns: [/resolution/i], entityType: EntityTypes.RESOLUTION_NUMBER, label: 'resolutions' },
  // Permits
  { patterns: [/permit/i], entityType: EntityTypes.PERMIT_NUMBER, label: 'permits' },
  // Invoices
  { patterns: [/invoice/i], blockType: 'invoice_hint', label: 'invoice content' },
  // Summary
  { patterns: [/summary|summarize|overview|brief|what\s+is\s+this/i], special: 'summary', label: 'summary' },
];

// ─── Query Executor ──────────────────────────────────────────────────────────

/**
 * Execute a natural language query against the content graph.
 */
export function executeQuery(contentGraph, query) {
  const lower = query.toLowerCase().trim();

  // Try pattern matching
  for (const { patterns, entityType, blockType, special, label } of QUERY_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(lower)) {
        if (special === 'summary') {
          return { type: 'summary', label, results: contentGraph.getSummary(), query };
        }
        if (entityType) {
          const results = contentGraph.getEntities(entityType);
          return { type: entityType, label, results, query, count: results.length };
        }
        if (blockType) {
          const results = contentGraph.getBlocks(blockType);
          return { type: blockType, label, results, query, count: results.length };
        }
      }
    }
  }

  // Fallback: text search
  const results = contentGraph.find(query);
  return { type: 'text-search', label: 'text matches', results, query, count: results.length };
}

// ─── Document Ask (AI-like layer) ────────────────────────────────────────────

/**
 * Natural language Q&A over the document.
 * Returns a human-readable answer, not just raw results.
 */
export function executeAsk(contentGraph, question) {
  const queryResult = executeQuery(contentGraph, question);
  const { type, label, results, query } = queryResult;

  if (results.length === 0) {
    return {
      answer: `No ${label} found in this document.`,
      confidence: 0.9,
      evidence: [],
    };
  }

  // Build answer based on type
  let answer = '';
  let confidence = 0.8;
  const evidence = [];

  if (type === 'summary') {
    return {
      answer: formatSummaryAnswer(results),
      confidence: 0.85,
      evidence: [],
    };
  }

  if (type === EntityTypes.DATE) {
    const dates = results.map(r => r.value || r.text).join(', ');
    answer = `Found ${results.length} date(s): ${dates}`;
    confidence = 0.9;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.CURRENCY) {
    const amounts = results.map(r => ({ value: r.numericValue || r.value, text: r.value }));
    const total = amounts.reduce((s, a) => s + (a.value || 0), 0);
    answer = `Found ${results.length} monetary value(s): ${results.map(r => r.value).join(', ')}`;
    if (total > 0) answer += `\nTotal: $${total.toLocaleString()}`;
    confidence = 0.85;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.PERSON) {
    const people = [...new Set(results.map(r => r.value))];
    answer = `Found ${people.length} person(s): ${people.join(', ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox, role: r.metadata?.role }));
  }

  if (type === EntityTypes.ORGANIZATION) {
    const orgs = [...new Set(results.map(r => r.value))];
    answer = `Found ${orgs.length} organization(s): ${orgs.join(', ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.PHONE) {
    answer = `Found ${results.length} phone number(s): ${results.map(r => r.value).join(', ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.EMAIL) {
    answer = `Found ${results.length} email(s): ${results.map(r => r.value).join(', ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.ADDRESS) {
    answer = `Found ${results.length} address(es): ${results.map(r => r.value).join('; ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.ORDINANCE_NUMBER) {
    answer = `Found ${results.length} ordinance(s): ${results.map(r => r.value).join(', ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.RESOLUTION_NUMBER) {
    answer = `Found ${results.length} resolution(s): ${results.map(r => r.value).join(', ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.PERMIT_NUMBER) {
    answer = `Found ${results.length} permit(s): ${results.map(r => r.value).join(', ')}`;
    evidence = results.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === BlockTypes.TABLE) {
    answer = `Found ${results.length} table(s) in the document.`;
    evidence = results.map(r => ({ text: r.text?.substring(0, 50), page: r.page, bbox: r.bbox }));
  }

  if (type === BlockTypes.FORM_FIELD) {
    const fields = results.map(r => r.metadata?.label || r.text.substring(0, 30));
    answer = `Found ${results.length} form field(s): ${fields.join(', ')}`;
    evidence = results.map(r => ({ text: r.text, page: r.page, bbox: r.bbox }));
  }

  if (type === BlockTypes.SIGNATURE) {
    answer = `Found ${results.length} signature(s) in the document.`;
    evidence = results.map(r => ({ text: r.text, page: r.page, bbox: r.bbox }));
  }

  if (type === 'text-search') {
    answer = `Found ${results.length} text match(es) for "${query}".`;
    evidence = results.map(r => ({ text: (r.text || '').substring(0, 50), page: r.page, bbox: r.bbox }));
    confidence = 0.7;
  }

  if (!answer) {
    answer = `Found ${results.length} result(s) for "${label}".`;
  }

  return { answer, confidence, evidence };
}

function formatSummaryAnswer(summary) {
  let answer = `Document Summary:\n`;
  answer += `- ${summary.blockTypes[BlockTypes.HEADING] || 0} headings\n`;
  answer += `- ${summary.blockTypes[BlockTypes.PARAGRAPH] || 0} paragraphs\n`;
  answer += `- ${summary.tableCount} tables\n`;
  answer += `- ${summary.entityTypes[EntityTypes.DATE] || 0} dates\n`;
  answer += `- ${summary.entityTypes[EntityTypes.CURRENCY] || 0} monetary values\n`;
  answer += `- ${summary.entityTypes[EntityTypes.PERSON] || 0} people\n`;
  answer += `- ${summary.entityTypes[EntityTypes.PHONE] || 0} phone numbers\n`;
  answer += `- ${summary.entityTypes[EntityTypes.EMAIL] || 0} emails\n`;
  return answer;
}

// ─── Spatial Highlighting ────────────────────────────────────────────────────

/**
 * Highlight search results on a canvas (for PDF viewer integration).
 */
export function highlightResults(canvas, results, options = {}) {
  const ctx = canvas.getContext('2d');
  const color = options.color || 'rgba(255, 255, 0, 0.3)';
  const borderColor = options.borderColor || 'rgba(255, 165, 0, 0.8)';
  const scale = options.scale || 1;

  for (const result of results) {
    if (!result.bbox) continue;

    const [x, y, w, h] = result.bbox;

    // Fill
    ctx.fillStyle = color;
    ctx.fillRect(x * scale, y * scale, w * scale, h * scale);

    // Border
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x * scale, y * scale, w * scale, h * scale);
  }
}

/**
 * Create highlight annotations for a PDF page.
 * Returns annotation objects that can be rendered by PDF.js.
 */
export function createHighlightAnnotations(results, options = {}) {
  const color = options.color || [1, 1, 0]; // Yellow RGB

  return results
    .filter(r => r.bbox)
    .map(r => ({
      type: 'Highlight',
      rect: r.bbox,
      color: color,
      contents: r.text || r.value || '',
      page: r.page,
    }));
}
