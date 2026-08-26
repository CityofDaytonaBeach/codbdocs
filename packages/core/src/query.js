/**
 * @codbdocs/core — Document Query API
 *
 * Routes queries through the Concept Graph engine (concepts.js).
 * Legacy pattern matching is removed — all queries go through
 * planQuery → hybridSearch → evidence ranking.
 *
 * Usage:
 *   graph.find("invoice number")
 *   graph.ask("What is the total amount?")
 */

import { EntityTypes, BlockTypes } from './content.js';

// ─── Query Executor ──────────────────────────────────────────────────────────

/**
 * Execute a natural language query against the content graph.
 * If a graph with planQuery/hybridSearch is available, routes through it.
 * Falls back to contentGraph text search only for basic find() calls.
 */
export function executeQuery(contentGraph, query, graph = null) {
  // If the new engine is available, route through it
  if (graph && graph.planQuery && graph.hybridSearch) {
    const plan = graph.planQuery(query);
    const results = graph.hybridSearch(query, { maxResults: 20 });

    return {
      type: plan.intent?.type || 'text-search',
      label: plan.intent?.type || 'text matches',
      plan,
      results,
      query,
      count: results.length,
    };
  }

  // Fallback: basic text search on contentGraph
  const results = contentGraph.find(query);
  return { type: 'text-search', label: 'text matches', results, query, count: results.length };
}

// ─── Document Ask (AI-like layer) ────────────────────────────────────────────

/**
 * Natural language Q&A over the document.
 * If graph with askEnhanced is available, routes through it.
 */
export function executeAsk(contentGraph, question, graph = null) {
  // If the new engine is available, route through it
  if (graph && graph.askEnhanced) {
    return graph.askEnhanced(question);
  }

  // Fallback: legacy simple Q&A
  const queryResult = executeQuery(contentGraph, question, graph);
  const { type, label, results, query } = queryResult;

  // Handle summary (may return object, not array)
  if (type === 'summary') {
    const summary = results;
    if (!summary || typeof summary !== 'object') {
      return {
        answer: 'No summary available.',
        confidence: 0.5,
        evidence: [],
      };
    }
    return {
      answer: formatSummaryAnswer(summary),
      confidence: 0.85,
      evidence: [],
    };
  }

  // Ensure results is an array
  const resultsArray = Array.isArray(results) ? results : [];

  if (resultsArray.length === 0) {
    return {
      answer: `No ${label} found in this document.`,
      confidence: 0.9,
      evidence: [],
    };
  }

  // Build answer based on type
  let answer = '';
  let confidence = 0.8;
  let evidence = [];

  if (type === EntityTypes.DATE) {
    const dates = resultsArray.map(r => r.value || r.text).join(', ');
    answer = `Found ${resultsArray.length} date(s): ${dates}`;
    confidence = 0.9;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.CURRENCY) {
    // NEVER auto-aggregate — only list individual amounts
    answer = `Found ${resultsArray.length} monetary value(s): ${resultsArray.map(r => r.value).join(', ')}`;
    confidence = 0.85;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.PERSON) {
    const people = [...new Set(resultsArray.map(r => r.value))];
    answer = `Found ${people.length} person(s): ${people.join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox, role: r.metadata?.role }));
  }

  if (type === EntityTypes.ORGANIZATION) {
    const orgs = [...new Set(resultsArray.map(r => r.value))];
    answer = `Found ${orgs.length} organization(s): ${orgs.join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.PHONE) {
    answer = `Found ${resultsArray.length} phone number(s): ${resultsArray.map(r => r.value).join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.EMAIL) {
    answer = `Found ${resultsArray.length} email(s): ${resultsArray.map(r => r.value).join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.ADDRESS) {
    answer = `Found ${resultsArray.length} address(es): ${resultsArray.map(r => r.value).join('; ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.ORDINANCE_NUMBER) {
    answer = `Found ${resultsArray.length} ordinance(s): ${resultsArray.map(r => r.value).join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.RESOLUTION_NUMBER) {
    answer = `Found ${resultsArray.length} resolution(s): ${resultsArray.map(r => r.value).join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === EntityTypes.PERMIT_NUMBER) {
    answer = `Found ${resultsArray.length} permit(s): ${resultsArray.map(r => r.value).join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.value, page: r.page, bbox: r.bbox }));
  }

  if (type === BlockTypes.TABLE) {
    answer = `Found ${resultsArray.length} table(s) in the document.`;
    evidence = resultsArray.map(r => ({ text: r.text?.substring(0, 50), page: r.page, bbox: r.bbox }));
  }

  if (type === BlockTypes.FORM_FIELD) {
    const fields = resultsArray.map(r => r.metadata?.label || r.text?.substring(0, 30));
    answer = `Found ${resultsArray.length} form field(s): ${fields.join(', ')}`;
    evidence = resultsArray.map(r => ({ text: r.text, page: r.page, bbox: r.bbox }));
  }

  if (type === BlockTypes.SIGNATURE) {
    answer = `Found ${resultsArray.length} signature(s) in the document.`;
    evidence = resultsArray.map(r => ({ text: r.text, page: r.page, bbox: r.bbox }));
  }

  if (type === 'text-search') {
    answer = `Found ${resultsArray.length} text match(es) for "${query}".`;
    evidence = resultsArray.map(r => ({ text: (r.text || '').substring(0, 50), page: r.page, bbox: r.bbox }));
    confidence = 0.7;
  }

  if (!answer) {
    answer = `Found ${resultsArray.length} result(s) for "${label}".`;
  }

  return { answer, confidence, evidence };
}

function formatSummaryAnswer(summary) {
  let answer = `Document Summary:\n`;
  answer += `- ${summary.blockTypes?.[BlockTypes.HEADING] || 0} headings\n`;
  answer += `- ${summary.blockTypes?.[BlockTypes.PARAGRAPH] || 0} paragraphs\n`;
  answer += `- ${summary.tableCount || 0} tables\n`;
  answer += `- ${summary.entityTypes?.[EntityTypes.DATE] || 0} dates\n`;
  answer += `- ${summary.entityTypes?.[EntityTypes.CURRENCY] || 0} monetary values\n`;
  answer += `- ${summary.entityTypes?.[EntityTypes.PERSON] || 0} people\n`;
  answer += `- ${summary.entityTypes?.[EntityTypes.PHONE] || 0} phone numbers\n`;
  answer += `- ${summary.entityTypes?.[EntityTypes.EMAIL] || 0} emails\n`;
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
