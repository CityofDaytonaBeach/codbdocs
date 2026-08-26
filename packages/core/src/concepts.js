/**
 * @codbdocs/core — Concept Graph & Retrieval Engine
 *
 * Implements the CODB Docs 1.0 Retrieval Engine as designed in review.txt:
 *   1. Concept Graph — entity co-occurrence graph with weighted edges
 *   2. Relationship Extraction — table rows, label/value, heading hierarchy, reading order
 *   3. CodbFingerprint — multi-signal document fingerprint (no embedding model)
 *   4. Hybrid Search — 10-channel retrieval (exact, phrase, BM25, fuzzy, concept, entity, structure, relationship, spatial, context)
 *   5. Query Planner — intent detection and query decomposition
 *   6. Evidence Ranking — per-signal contribution breakdown with explainability
 *   7. Deterministic Reasoning — COUNT, SUM, AVG, MAX, MIN, BEFORE, AFTER, BETWEEN, GROUP BY
 *   8. Reranker — 1000→30→6 candidate reduction pipeline
 *   9. Tables — first-class queryable objects with headers, rows, relationships
 *  10. Document Knowledge Graph — acronym/alias auto-detection, terminology learning
 *
 * Architecture: Model-free. No GPU. No API. No vector database. No server.
 * Pure deterministic retrieval using document structure + content signals.
 */

import {
  expandQuery,
  stem,
  charNGrams,
  wordNGrams,
  fuzzyScore,
  bestFuzzyMatch,
  detectAcronyms,
  detectDefinitions,
  learnTerminology,
  fuzzySearch,
} from './expansion.js';

// ─── Concept Graph ───────────────────────────────────────────────────────────

/**
 * A concept node in the document graph.
 */
export class ConceptNode {
  constructor(id, type, text, options = {}) {
    this.id = id;
    this.type = type;
    this.text = text;
    this.page = options.page || 0;
    this.bbox = options.bbox || null;
    this.weight = options.weight || 1.0;
    this.metadata = options.metadata || {};
    this.occurrences = options.occurrences || [];
  }
}

/**
 * A weighted edge between two concept nodes.
 */
export class ConceptEdge {
  constructor(sourceId, targetId, relation, options = {}) {
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.relation = relation;
    this.weight = options.weight || 1.0;
    this.pages = options.pages || [];
    this.evidence = options.evidence || [];
    this.predicate = options.predicate || null;
  }
}

/**
 * Full document concept graph.
 */
export class ConceptGraph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
    this.adjacency = new Map(); // nodeId -> Set of edgeIds
    this.pageIndex = new Map(); // page -> Set of nodeIds
    this.typeIndex = new Map(); // type -> Set of nodeIds
    this.textIndex = new Map(); // normalized text -> Set of nodeIds
  }

  addNode(node) {
    this.nodes.set(node.id, node);

    // Index by type
    if (!this.typeIndex.has(node.type)) {
      this.typeIndex.set(node.type, new Set());
    }
    this.typeIndex.get(node.type).add(node.id);

    // Index by page
    if (!this.pageIndex.has(node.page)) {
      this.pageIndex.set(node.page, new Set());
    }
    this.pageIndex.get(node.page).add(node.id);

    // Index by normalized text
    const normText = node.text.toLowerCase().trim();
    if (!this.textIndex.has(normText)) {
      this.textIndex.set(normText, new Set());
    }
    this.textIndex.get(normText).add(node.id);

    return node;
  }

  addEdge(edge) {
    const edgeKey = `${edge.sourceId}->${edge.targetId}:${edge.relation}`;
    if (this.edges.has(edgeKey)) {
      // Strengthen existing edge
      const existing = this.edges.get(edgeKey);
      existing.weight += edge.weight;
      existing.pages = [...new Set([...existing.pages, ...edge.pages])];
      existing.evidence = [...existing.evidence, ...edge.evidence];
      return existing;
    }

    this.edges.set(edgeKey, edge);

    // Update adjacency lists
    if (!this.adjacency.has(edge.sourceId)) {
      this.adjacency.set(edge.sourceId, new Set());
    }
    if (!this.adjacency.has(edge.targetId)) {
      this.adjacency.set(edge.targetId, new Set());
    }
    this.adjacency.get(edge.sourceId).add(edgeKey);
    this.adjacency.get(edge.targetId).add(edgeKey);

    return edge;
  }

  getNode(id) {
    return this.nodes.get(id) || null;
  }

  getNeighbors(nodeId, maxDepth = 1) {
    const visited = new Set();
    const result = [];

    const traverse = (currentId, depth) => {
      if (depth > maxDepth || visited.has(currentId)) return;
      visited.add(currentId);

      const edgeKeys = this.adjacency.get(currentId) || new Set();
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
              depth,
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
    const nodeIds = this.typeIndex.get(type) || new Set();
    return [...nodeIds].map(id => this.nodes.get(id)).filter(Boolean);
  }

  findByText(text) {
    const normText = text.toLowerCase().trim();
    const nodeIds = this.textIndex.get(normText) || new Set();
    return [...nodeIds].map(id => this.nodes.get(id)).filter(Boolean);
  }

  findByPage(page) {
    const nodeIds = this.pageIndex.get(page) || new Set();
    return [...nodeIds].map(id => this.nodes.get(id)).filter(Boolean);
  }

  /**
   * Find the shortest path between two concepts.
   */
  findPath(sourceId, targetId, maxDepth = 5) {
    const visited = new Map();
    const queue = [{ id: sourceId, path: [] }];

    while (queue.length > 0) {
      const { id, path } = queue.shift();
      if (visited.has(id)) continue;
      visited.set(id, path);

      if (id === targetId) {
        return path.map(edgeKey => this.edges.get(edgeKey)).filter(Boolean);
      }

      if (path.length >= maxDepth) continue;

      const edgeKeys = this.adjacency.get(id) || new Set();
      for (const edgeKey of edgeKeys) {
        const edge = this.edges.get(edgeKey);
        if (!edge) continue;
        const neighborId = edge.sourceId === id ? edge.targetId : edge.sourceId;
        if (!visited.has(neighborId)) {
          queue.push({ id: neighborId, path: [...path, edgeKey] });
        }
      }
    }

    return null; // No path found
  }

  /**
   * Get all relationships involving a concept.
   */
  getRelationships(nodeId) {
    const edgeKeys = this.adjacency.get(nodeId) || new Set();
    return [...edgeKeys].map(key => this.edges.get(key)).filter(Boolean);
  }

  /**
   * Get the most connected concepts (hub nodes).
   */
  getHubs(limit = 10) {
    const degrees = [];
    for (const [nodeId, edgeKeys] of this.adjacency) {
      degrees.push({
        node: this.nodes.get(nodeId),
        degree: edgeKeys.size,
      });
    }
    return degrees
      .sort((a, b) => b.degree - a.degree)
      .slice(0, limit)
      .filter(d => d.node);
  }

  /**
   * Get community clusters (connected components by type).
   */
  getCommunities() {
    const visited = new Set();
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

        const edgeKeys = this.adjacency.get(currentId) || new Set();
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
        ),
      },
    };
  }
}

// ─── Relationship Extraction ─────────────────────────────────────────────────

/**
 * Extract relationships between entities on a page.
 * Uses predicate patterns and spatial proximity.
 */
export function extractRelationships(contentGraph, conceptGraph) {
  const relationships = [];

  // 1. Co-occurrence relationships (entities on same page)
  const pageEntityMap = new Map();
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

        // Skip if same type (less interesting)
        if (e1.type === e2.type) continue;

        // Determine relationship predicate
        const predicate = inferPredicate(e1, e2);

        if (predicate) {
          const sourceId = `${e1.type}:${e1.value}`;
          const targetId = `${e2.type}:${e2.value}`;

          // Ensure nodes exist in concept graph
          const node1 = conceptGraph.addNode(new ConceptNode(
            sourceId, e1.type, e1.value, {
              page, bbox: e1.bbox, weight: e1.confidence || 0.5,
            }
          ));
          const node2 = conceptGraph.addNode(new ConceptNode(
            targetId, e2.type, e2.value, {
              page, bbox: e2.bbox, weight: e2.confidence || 0.5,
            }
          ));

          conceptGraph.addEdge(new ConceptEdge(sourceId, targetId, predicate, {
            weight: 1.0,
            pages: [page],
            evidence: [`Co-occurrence on page ${page}`],
            predicate,
          }));

          relationships.push({
            source: { type: e1.type, value: e1.value },
            target: { type: e2.type, value: e2.value },
            predicate,
            page,
          });
        }
      }
    }
  }

  // 2. Block-entity relationships (entities near content blocks)
  for (const block of contentGraph.allBlocks) {
    if (!block.bbox) continue;

    for (const entity of contentGraph.allEntities) {
      if (!entity.bbox) continue;
      if (areBboxesNear(block.bbox, entity.bbox, 80)) {
        const blockId = `block:${block.type}:${block.page}`;
        const entityId = `${entity.type}:${entity.value}`;

        conceptGraph.addNode(new ConceptNode(
          blockId, block.type, (block.text || '').substring(0, 100), {
            page: block.page, bbox: block.bbox,
          }
        ));

        conceptGraph.addEdge(new ConceptEdge(blockId, entityId, 'contains', {
          weight: 0.8,
          pages: [block.page],
          evidence: [`Entity found within ${block.type} on page ${block.page}`],
          predicate: 'contains',
        }));
      }
    }
  }

  // 3. Table row relationships (entities in the same table row)
  for (const block of contentGraph.allBlocks) {
    if (block.type !== 'table' || !block.bbox) continue;
    // Find entities within this table's bounding box
    const tableEntities = contentGraph.allEntities.filter(e =>
      e.bbox && areBboxesNear(block.bbox, e.bbox, 150)
    );
    // Group by approximate Y position (same row)
    const rows = groupEntitiesByRow(tableEntities);
    for (const row of rows) {
      for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
          const e1 = row[i];
          const e2 = row[j];
          if (e1.type === e2.type) continue;
          const predicate = inferPredicate(e1, e2) || 'same_row';
          const sourceId = `${e1.type}:${e1.value}`;
          const targetId = `${e2.type}:${e2.value}`;
          conceptGraph.addNode(new ConceptNode(sourceId, e1.type, e1.value, {
            page: e1.page, bbox: e1.bbox, weight: e1.confidence || 0.5,
          }));
          conceptGraph.addNode(new ConceptNode(targetId, e2.type, e2.value, {
            page: e2.page, bbox: e2.bbox, weight: e2.confidence || 0.5,
          }));
          conceptGraph.addEdge(new ConceptEdge(sourceId, targetId, predicate, {
            weight: 1.2,
            pages: [e1.page],
            evidence: [`Same table row on page ${e1.page}`],
            predicate,
          }));
          relationships.push({
            source: { type: e1.type, value: e1.value },
            target: { type: e2.type, value: e2.value },
            predicate,
            page: e1.page,
            source_type: 'table_row',
          });
        }
      }
    }
  }

  // 4. Label/value relationships (colon-separated patterns and proximity)
  for (const block of contentGraph.allBlocks) {
    if (!block.text || !block.bbox) continue;
    const text = block.text;
    // Check for "Label: Value" pattern
    const colonMatch = text.match(/^([A-Z][A-Za-z\s]{2,40}):\s*(.+)$/m);
    if (colonMatch) {
      const label = colonMatch[1].trim();
      const value = colonMatch[2].trim();
      // Find entities near this value
      for (const entity of contentGraph.allEntities) {
        if (!entity.bbox) continue;
        if (value.toLowerCase().includes((entity.value || '').toLowerCase()) ||
            (entity.value || '').toLowerCase().includes(value.toLowerCase().substring(0, 20))) {
          if (areBboxesNear(block.bbox, entity.bbox, 100)) {
            const labelId = `label:${label}:${block.page}`;
            const entityId = `${entity.type}:${entity.value}`;
            conceptGraph.addNode(new ConceptNode(labelId, 'label', label, {
              page: block.page, bbox: block.bbox,
            }));
            conceptGraph.addEdge(new ConceptEdge(labelId, entityId, 'label_value', {
              weight: 1.5,
              pages: [block.page],
              evidence: [`Label "${label}" associated with value on page ${block.page}`],
              predicate: 'label_value',
            }));
            relationships.push({
              source: { type: 'label', value: label },
              target: { type: entity.type, value: entity.value },
              predicate: 'label_value',
              page: block.page,
              source_type: 'label_value',
            });
          }
        }
      }
    }
  }

  // 5. Heading hierarchy relationships (heading → section content)
  const headingsByPage = new Map();
  for (const block of contentGraph.allBlocks) {
    if (block.type === 'heading' && block.bbox) {
      if (!headingsByPage.has(block.page)) headingsByPage.set(block.page, []);
      headingsByPage.get(block.page).push(block);
    }
  }
  for (const [page, pageHeadings] of headingsByPage) {
    pageHeadings.sort((a, b) => (a.bbox?.[1] || 0) - (b.bbox?.[1] || 0));
    for (let i = 0; i < pageHeadings.length; i++) {
      const heading = pageHeadings[i];
      const headingId = `heading:${heading.text?.substring(0, 50)}:${page}`;
      conceptGraph.addNode(new ConceptNode(headingId, 'heading', heading.text || '', {
        page, bbox: heading.bbox,
      }));
      // Find entities under this heading (between this heading and the next)
      const nextY = i < pageHeadings.length - 1 ? (pageHeadings[i + 1].bbox?.[1] || Infinity) : Infinity;
      for (const entity of contentGraph.allEntities) {
        if (entity.page === page && entity.bbox &&
            entity.bbox[1] > (heading.bbox?.[1] || 0) && entity.bbox[1] < nextY) {
          const entityId = `${entity.type}:${entity.value}`;
          conceptGraph.addEdge(new ConceptEdge(headingId, entityId, 'heading_section', {
            weight: 0.9,
            pages: [page],
            evidence: [`Entity under heading "${heading.text}" on page ${page}`],
            predicate: 'heading_section',
          }));
          relationships.push({
            source: { type: 'heading', value: heading.text },
            target: { type: entity.type, value: entity.value },
            predicate: 'heading_section',
            page,
            source_type: 'heading_hierarchy',
          });
        }
      }
    }
  }

  // 6. Definition-based relationships (acronyms, "hereinafter referred to as")
  for (const page of pages || []) {
    const text = page.text || '';
    const acronyms = detectAcronyms(text);
    for (const acr of acronyms) {
      const fullId = `term:${acr.full.toLowerCase()}`;
      const acrId = `term:${acr.acronym.toLowerCase()}`;
      conceptGraph.addNode(new ConceptNode(fullId, 'term', acr.full, { page: page.pageNum }));
      conceptGraph.addNode(new ConceptNode(acrId, 'term', acr.acronym, { page: page.pageNum }));
      conceptGraph.addEdge(new ConceptEdge(fullId, acrId, 'acronym', {
        weight: 1.5,
        pages: [page.pageNum],
        evidence: [`"${acr.full}" defined as "${acr.acronym}"`],
        predicate: 'acronym',
      }));
      relationships.push({
        source: { type: 'term', value: acr.full },
        target: { type: 'term', value: acr.acronym },
        predicate: 'acronym',
        page: page.pageNum,
        source_type: 'definition',
      });
    }
  }

  // 7. Cross-page entity linkages
  const globalEntities = new Map();
  for (const entity of contentGraph.allEntities) {
    const key = `${entity.type}:${(entity.value || '').toLowerCase()}`;
    if (globalEntities.has(key)) {
      globalEntities.get(key).pages.push(entity.page);
    } else {
      globalEntities.set(key, {
        type: entity.type,
        value: entity.value,
        pages: [entity.page],
      });
    }
  }

  for (const [key, data] of globalEntities) {
    if (data.pages.length > 1) {
      const nodeId = `${data.type}:${data.value}`;
      conceptGraph.addNode(new ConceptNode(
        nodeId, data.type, data.value, {
          page: data.pages[0],
          weight: data.pages.length,
          occurrences: data.pages.map(p => ({ page: p })),
        }
      ));
    }
  }

  return relationships;
}

/**
 * Infer the relationship predicate between two entities.
 */
function inferPredicate(e1, e2) {
  const t1 = e1.type;
  const t2 = e2.type;

  // Person-Organization: "works for", "member of"
  if (t1 === 'person' && t2 === 'organization') return 'affiliated_with';
  if (t1 === 'organization' && t2 === 'person') return 'employs';

  // Person-Date: "signed on", "born on"
  if (t1 === 'person' && t2 === 'date') return 'associated_with_date';
  if (t1 === 'date' && t2 === 'person') return 'date_of';

  // Currency-Entity: "amount for", "cost of"
  if (t1 === 'currency' && t2 === 'person') return 'payment_to';
  if (t1 === 'currency' && t2 === 'organization') return 'payment_from';
  if (t1 === 'person' && t2 === 'currency') return 'receives';
  if (t1 === 'organization' && t2 === 'currency') return 'charges';

  // Address-Entity: "located at"
  if (t1 === 'address' && t2 === 'person') return 'residence_of';
  if (t1 === 'address' && t2 === 'organization') return 'headquarters_of';
  if (t1 === 'person' && t2 === 'address') return 'lives_at';
  if (t1 === 'organization' && t2 === 'address') return 'located_at';

  // Ordinance/Resolution
  if (t1 === 'ordinance_number' && t2 === 'date') return 'enacted_on';
  if (t1 === 'resolution_number' && t2 === 'date') return 'passed_on';

  // Default: generic association
  return 'associated_with';
}

// ─── CodbFingerprint ─────────────────────────────────────────────────────────

/**
 * Multi-signal document fingerprint for model-free retrieval.
 *
 * Signals:
 *   1. Table of Contents (headings hierarchy)
 *   2. Entity Registry (entity types + values)
 *   3. Layout Signature (column count, page types, flow)
 *   4. Structure Profile (tables, forms, lists counts)
 *   5. Topic Vector (word frequencies for key domains)
 *   6. Relationship Signature (relationship type counts)
 */
export class CodbFingerprint {
  constructor() {
    this.toc = [];
    this.entityRegistry = new Map();
    this.layoutSignature = {
      columnCounts: [],
      pageTypes: {},
      flowPattern: 'unknown',
    };
    this.structureProfile = {
      tableCount: 0,
      formCount: 0,
      listCount: 0,
      headingCount: 0,
    };
    this.topicVector = {};
    this.relationshipSignature = {};
    this.metadata = {};
  }

  /**
   * Build fingerprint from a DocumentGraph.
   */
  static fromGraph(graph, ir) {
    const fp = new CodbFingerprint();

    // 1. Table of Contents
    fp.toc = (graph.layout?.getAllHeadings() || []).map(h => ({
      text: h.text,
      level: h.level,
      page: h.page,
      position: h.y,
    }));

    // 2. Entity Registry
    const entities = graph._contentGraph?.allEntities || [];
    for (const entity of entities) {
      const key = `${entity.type}:${(entity.value || '').toLowerCase()}`;
      if (!fp.entityRegistry.has(key)) {
        fp.entityRegistry.set(key, {
          type: entity.type,
          value: entity.value,
          pages: [],
          count: 0,
        });
      }
      const entry = fp.entityRegistry.get(key);
      if (!entry.pages.includes(entity.page)) {
        entry.pages.push(entity.page);
      }
      entry.count++;
    }

    // 3. Layout Signature
    fp.layoutSignature.columnCounts = graph.layout?.pages?.map(p => p.columns) || [];
    const pageTypes = {};
    for (const c of graph.classifications || []) {
      pageTypes[c.type] = (pageTypes[c.type] || 0) + 1;
    }
    fp.layoutSignature.pageTypes = pageTypes;
    fp.layoutSignature.flowPattern = graph.layout?.pages?.[0]?.flow || 'unknown';

    // 4. Structure Profile
    fp.structureProfile = {
      tableCount: graph.structure?.tables?.length || 0,
      formCount: graph.structure?.forms?.length || 0,
      listCount: graph.structure?.lists?.length || 0,
      headingCount: fp.toc.length,
    };

    // 5. Topic Vector (word frequencies from key terms)
    fp.topicVector = buildTopicVector(graph);

    // 6. Relationship Signature
    const contentGraph = graph._contentGraph;
    if (contentGraph) {
      const relCounts = {};
      for (const block of contentGraph.allBlocks) {
        for (const rel of (block.relationships || [])) {
          relCounts[rel.type] = (relCounts[rel.type] || 0) + 1;
        }
      }
      fp.relationshipSignature = relCounts;
    }

    // 7. Metadata
    fp.metadata = {
      pageCount: graph.pageCount,
      wordCount: graph.text?.wordCount || 0,
      documentType: graph._contentGraph?.documentType?.type || 'unknown',
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

    // TOC similarity (Jaccard on heading texts)
    const toc1 = new Set(fp1.toc.map(h => h.text.toLowerCase()));
    const toc2 = new Set(fp2.toc.map(h => h.text.toLowerCase()));
    const tocSim = jaccardSimilarity(toc1, toc2);
    score += tocSim * 3;
    weights += 3;

    // Entity overlap
    const ent1 = new Set(fp1.entityRegistry.keys());
    const ent2 = new Set(fp2.entityRegistry.keys());
    const entSim = jaccardSimilarity(ent1, ent2);
    score += entSim * 2;
    weights += 2;

    // Layout similarity
    const layoutSim = layoutSimilarity(fp1.layoutSignature, fp2.layoutSignature);
    score += layoutSim * 1;
    weights += 1;

    // Structure similarity
    const structSim = structureSimilarity(fp1.structureProfile, fp2.structureProfile);
    score += structSim * 1;
    weights += 1;

    // Topic vector cosine similarity
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
      metadata: this.metadata,
    };
  }
}

// ─── Hybrid Search Engine ────────────────────────────────────────────────────

/**
 * BM25-inspired text scoring.
 */
function bm25Score(query, document, avgDocLength, k1 = 1.5, b = 0.75) {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  const docTerms = document.toLowerCase().split(/\s+/);
  const docLength = docTerms.length;

  // Term frequency
  const tf = {};
  for (const term of docTerms) {
    tf[term] = (tf[term] || 0) + 1;
  }

  let score = 0;
  for (const term of queryTerms) {
    const termFreq = tf[term] || 0;
    if (termFreq === 0) continue;

    // BM25 scoring formula
    const numerator = termFreq * (k1 + 1);
    const denominator = termFreq + k1 * (1 - b + b * docLength / avgDocLength);
    score += numerator / denominator;
  }

  return score;
}

/**
 * Entity matching score.
 */
function entityScore(query, entities) {
  const queryLower = query.toLowerCase();
  let score = 0;

  for (const entity of entities) {
    const value = (entity.value || '').toLowerCase();
    if (queryLower.includes(value) || value.includes(queryLower)) {
      score += 2;
    } else {
      // Partial match
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

/**
 * Structure matching score (headings, block types).
 */
function structureScore(query, blocks, headings) {
  const queryLower = query.toLowerCase();
  let score = 0;

  // Heading matches
  for (const heading of headings) {
    if (heading.text.toLowerCase().includes(queryLower)) {
      score += 3;
    }
  }

  // Block type relevance
  const typeKeywords = {
    heading: ['title', 'heading', 'section', 'chapter'],
    table: ['table', 'data', 'spreadsheet', 'grid', 'column'],
    form_field: ['form', 'field', 'input', 'application', 'fill'],
    list: ['list', 'items', 'bullet', 'numbered'],
    invoice_hint: ['invoice', 'bill', 'payment'],
    receipt_hint: ['receipt', 'purchase', 'total'],
    signature: ['signature', 'signed', 'sign here'],
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

/**
 * Full-text search across the document.
 * 10-channel hybrid retrieval: exact, phrase, BM25, fuzzy, concept, entity, structure, relationship, spatial, context.
 * Returns ranked results with per-signal contribution breakdown.
 */
export function hybridSearch(graph, query, options = {}) {
  const {
    maxResults = 20,
    minScore = 0.1,
    includeEvidence = true,
    useExpansion = true,
    rerank = true,
  } = options;

  const results = [];
  const contentGraph = graph._contentGraph;
  const fingerprint = graph._fingerprint;
  const conceptGr = graph._conceptGraph;

  // Get all pages' text and entities
  const pages = graph.text?.pages || [];
  const avgDocLength = pages.reduce((s, p) => s + (p.text?.length || 0), 0) / (pages.length || 1);

  // Expand query with synonyms and stems
  const expandedTerms = useExpansion ? expandQuery(query, { includeSynonyms: true, includeStems: true }) : [{ term: query.toLowerCase(), weight: 1.0, sources: ['original'] }];
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 1);

  // Build document vocabulary for fuzzy matching
  const docVocab = new Set();
  for (const page of pages) {
    for (const word of (page.text || '').toLowerCase().split(/\s+/)) {
      if (word.length > 2) docVocab.add(word);
    }
  }

  for (const page of pages) {
    const pageNum = page.pageNum;
    const pageText = page.text || '';
    const pageTextLower = pageText.toLowerCase();
    const signals = {};

    // Channel 1: Exact match
    signals.exact = 0;
    for (const term of queryTerms) {
      if (pageTextLower.includes(term)) {
        signals.exact += 2;
      }
    }

    // Channel 2: Phrase match (query as contiguous phrase)
    signals.phrase = pageTextLower.includes(queryLower) ? 3 : 0;

    // Channel 3: BM25 text score
    signals.bm25 = bm25Score(query, pageText, avgDocLength);

    // Channel 4: Fuzzy match
    signals.fuzzy = 0;
    for (const term of queryTerms) {
      const match = bestFuzzyMatch(term, Array.from(docVocab), 0.7);
      if (match && pageTextLower.includes(match.word)) {
        signals.fuzzy += match.score;
      }
    }

    // Channel 5: Concept expansion match
    signals.concept = 0;
    for (const expanded of expandedTerms) {
      if (expanded.weight < 0.5) continue; // Skip low-weight expansions
      if (pageTextLower.includes(expanded.term)) {
        signals.concept += expanded.weight;
      }
    }

    // Channel 6: Entity match score
    const pageEntities = contentGraph?.allEntities?.filter(e => e.page === pageNum) || [];
    signals.entity = entityScore(query, pageEntities);

    // Channel 7: Structure match score
    const pageBlocks = contentGraph?.allBlocks?.filter(b => b.page === pageNum) || [];
    const headings = graph.layout?.getHeadings(pageNum) || [];
    signals.structure = structureScore(query, pageBlocks, headings);

    // Channel 8: Relationship graph score
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

    // Channel 9: Spatial match (bbox proximity of query terms)
    signals.spatial = 0;
    if (queryTerms.length >= 2) {
      // Check if multiple query terms appear near each other on this page
      const termPositions = [];
      for (const term of queryTerms) {
        const idx = pageTextLower.indexOf(term);
        if (idx >= 0) termPositions.push(idx);
      }
      if (termPositions.length >= 2) {
        const spread = Math.max(...termPositions) - Math.min(...termPositions);
        signals.spatial = Math.max(0, 2 - spread / 500); // Closer = higher score
      }
    }

    // Channel 10: Context score (heading hierarchy, surrounding blocks)
    signals.context = 0;
    for (const heading of headings) {
      if (heading.text?.toLowerCase().includes(queryLower)) {
        signals.context += 2;
      }
    }
    // Check if query matches a page classification
    const pageInfo = graph._pageResults?.[pageNum - 1];
    if (pageInfo?.classification?.type) {
      const classType = pageInfo.classification.type.toLowerCase();
      for (const term of queryTerms) {
        if (classType.includes(term)) signals.context += 1;
      }
    }

    // Adaptive weighting based on query intent
    const intent = detectIntent(query);
    const weights = getChannelWeights(intent, queryTerms, pageEntities);

    // Composite score
    const compositeScore =
      signals.exact * weights.exact +
      signals.phrase * weights.phrase +
      signals.bm25 * weights.bm25 +
      signals.fuzzy * weights.fuzzy +
      signals.concept * weights.concept +
      signals.entity * weights.entity +
      signals.structure * weights.structure +
      signals.relationship * weights.relationship +
      signals.spatial * weights.spatial +
      signals.context * weights.context;

    if (compositeScore > minScore) {
      // Per-signal contribution breakdown
      const totalWeighted = Object.keys(signals).reduce((s, k) => s + signals[k] * weights[k], 0) || 1;
      const contributions = {};
      for (const [signal, score] of Object.entries(signals)) {
        contributions[signal] = {
          score,
          weight: weights[signal],
          contribution: (score * weights[signal]) / totalWeighted,
        };
      }

      const evidence = includeEvidence ? buildEvidence(pageText, query, pageEntities, pageBlocks, pageNum) : [];

      results.push({
        page: pageNum,
        score: compositeScore,
        signals,
        contributions,
        text: pageText.substring(0, 500),
        entities: pageEntities.map(e => ({ type: e.type, value: e.value })),
        evidence,
      });
    }
  }

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  // Rerank if requested
  if (rerank && results.length > 6) {
    return rerankResults(results, query, { topK: Math.min(maxResults, 30) }).slice(0, maxResults);
  }

  return results.slice(0, maxResults);
}

/**
 * Adaptive channel weights based on query intent.
 */
function getChannelWeights(intent, queryTerms, entities) {
  const defaults = {
    exact: 0.15, phrase: 0.12, bm25: 0.20, fuzzy: 0.05,
    concept: 0.10, entity: 0.15, structure: 0.08,
    relationship: 0.05, spatial: 0.05, context: 0.05,
  };

  if (!intent) return defaults;

  switch (intent.type) {
    case QueryIntent.ENTITY_SEARCH:
      return { ...defaults, entity: 0.30, exact: 0.20, bm25: 0.10, structure: 0.05 };
    case QueryIntent.RELATIONSHIP_LOOKUP:
      return { ...defaults, relationship: 0.25, entity: 0.20, concept: 0.15, bm25: 0.10 };
    case QueryIntent.TABLE_QUERY:
      return { ...defaults, structure: 0.25, entity: 0.15, exact: 0.15, bm25: 0.15 };
    case QueryIntent.COMPARISON:
      return { ...defaults, entity: 0.20, bm25: 0.20, structure: 0.15, concept: 0.10 };
    case QueryIntent.AGGREGATION:
      return { ...defaults, entity: 0.25, bm25: 0.15, structure: 0.15, exact: 0.10 };
    case QueryIntent.COUNT:
      return { ...defaults, entity: 0.20, bm25: 0.15, structure: 0.15, exact: 0.15 };
    case QueryIntent.STRUCTURAL_QUERY:
      return { ...defaults, structure: 0.30, context: 0.20, bm25: 0.10 };
    case QueryIntent.SUMMARY:
      return { ...defaults, bm25: 0.25, concept: 0.15, context: 0.15, structure: 0.10 };
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

// ─── Reranker ────────────────────────────────────────────────────────────────

/**
 * Rerank candidates using a more expensive scoring pass.
 * Pipeline: 1000 candidates → candidate retrieval → top 30 → reranking → top 6
 */
export function rerankResults(results, query, options = {}) {
  const { topK = 30 } = options;
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 1);
  const expandedTerms = expandQuery(query, { includeSynonyms: true, includeStems: true });
  const expandedText = expandedTerms.map(e => e.term).join(' ');

  // Phase 1: Candidate retrieval (already done by hybridSearch, take top topK)
  const candidates = results.slice(0, topK);

  // Phase 2: Expensive reranking
  const reranked = candidates.map(result => {
    let rerankScore = result.score;
    const bonuses = {};

    // Bonus: multiple signal agreement (if 3+ channels fire, boost)
    const activeSignals = Object.values(result.signals || {}).filter(s => s > 0).length;
    bonuses.multiSignal = activeSignals >= 3 ? 0.15 : activeSignals >= 2 ? 0.08 : 0;

    // Bonus: exact entity match with context
    if (result.entities?.length > 0) {
      for (const entity of result.entities) {
        const entityVal = (entity.value || '').toLowerCase();
        if (queryLower.includes(entityVal)) {
          bonuses.exactEntity = 0.25;
          break;
        }
      }
    }

    // Bonus: concept expansion agreement
    if (result.signals?.concept > 1) {
      bonuses.conceptAgreement = 0.10;
    }

    // Bonus: high structural relevance for table queries
    if (result.signals?.structure > 2) {
      bonuses.structuralRelevance = 0.10;
    }

    // Penalty: very short text (likely fragment)
    if ((result.text || '').length < 50) {
      bonuses.shortPenalty = -0.10;
    }

    // Penalty: no entities when entity query
    if (queryTerms.some(t => /amount|cost|price|date|who|address/i.test(t)) &&
        (!result.entities || result.entities.length === 0)) {
      bonuses.noEntityPenalty = -0.15;
    }

    const totalBonus = Object.values(bonuses).reduce((s, v) => s + v, 0);

    return {
      ...result,
      score: rerankScore + totalBonus,
      rerankBonuses: bonuses,
      explanation: [
        ...Object.entries(bonuses)
          .filter(([, v]) => v !== 0)
          .map(([k, v]) => `${k}: ${v > 0 ? '+' : ''}${v.toFixed(2)}`),
      ],
    };
  });

  // Phase 3: Sort and return top results
  reranked.sort((a, b) => b.score - a.score);
  return reranked;
}

// ─── Query Planner ───────────────────────────────────────────────────────────

/**
 * Query intent types.
 */
export const QueryIntent = {
  FACTUAL_LOOKUP: 'factual_lookup',
  ENTITY_SEARCH: 'entity_search',
  RELATIONSHIP_LOOKUP: 'relationship_lookup',
  AGGREGATION: 'aggregation',
  TABLE_QUERY: 'table_query',
  SPATIAL_QUERY: 'spatial_query',
  STRUCTURAL_QUERY: 'structural_query',
  SUMMARY: 'summary',
  COUNT: 'count',
  COMPARISON: 'comparison',
  UNKNOWN: 'unknown',
};

/**
 * Detect the intent of a natural language query.
 */
export function detectIntent(query) {
  const lower = query.toLowerCase().trim();

  // Count/Aggregation queries
  if (/^(how many|count|number of|total)/i.test(lower)) {
    return { type: QueryIntent.COUNT, confidence: 0.9 };
  }

  if (/^(what is the (total|sum|amount)|sum of|add up)/i.test(lower)) {
    return { type: QueryIntent.AGGREGATION, confidence: 0.85 };
  }

  if (/^(what is the (highest|lowest|maximum|minimum|max|min)|most|least|highest|lowest)/i.test(lower)) {
    return { type: QueryIntent.AGGREGATION, confidence: 0.85 };
  }

  // Relationship queries
  if (/^(who|whom|which|what).*(approved|signed|authorized|created|wrote|submitted)/i.test(lower)) {
    return { type: QueryIntent.RELATIONSHIP_LOOKUP, confidence: 0.8 };
  }

  // Table queries
  if (/table|column|row|cell|data|spreadsheet|grid/i.test(lower)) {
    return { type: QueryIntent.TABLE_QUERY, confidence: 0.85 };
  }

  // Entity queries
  if (/^(where|what is the address|location|street)/i.test(lower)) {
    return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.8, entityType: 'address' };
  }

  if (/^(when|what date|date of)/i.test(lower)) {
    return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: 'date' };
  }

  if (/^(who is|who are|person|name|author)/i.test(lower)) {
    return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: 'person' };
  }

  if (/^(how much|what is the (amount|cost|price|total)|money|budget)/i.test(lower)) {
    return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: 'currency' };
  }

  // Structural queries
  if (/^(list|what are) (the )?(sections|headings|chapters|topics)/i.test(lower)) {
    return { type: QueryIntent.STRUCTURAL_QUERY, confidence: 0.8 };
  }

  // Comparison queries
  if (/compare|versus|vs\.?|difference between/i.test(lower)) {
    return { type: QueryIntent.COMPARISON, confidence: 0.7 };
  }

  // Summary queries
  if (/^(summary|summarize|overview|what is (this|the document)|brief)/i.test(lower)) {
    return { type: QueryIntent.SUMMARY, confidence: 0.9 };
  }

  // Factual lookup (default for specific questions)
  if (/\?/.test(lower) || /^(what|where|when|who|why|how)/i.test(lower)) {
    return { type: QueryIntent.FACTUAL_LOOKUP, confidence: 0.7 };
  }

  return { type: QueryIntent.UNKNOWN, confidence: 0.3 };
}

/**
 * Decompose a complex query into sub-queries.
 */
export function decomposeQuery(query) {
  const lower = query.toLowerCase();
  const subQueries = [];

  // Split on "and", "also", "as well as"
  const parts = lower.split(/\s+and\s+|\s+also\s+|\s+as well as\s+/);
  if (parts.length > 1) {
    for (const part of parts) {
      subQueries.push({
        query: part.trim(),
        intent: detectIntent(part.trim()),
      });
    }
  }

  // Extract entity references
  const entityPatterns = [
    { pattern: /\$[\d,]+(?:\.\d{2})?/g, type: 'currency' },
    { pattern: /\b\d{1,5}\s+[\w\s]+(?:Street|St|Avenue|Ave|Blvd|Road|Rd)/gi, type: 'address' },
    { pattern: /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g, type: 'date' },
  ];

  for (const { pattern, type } of entityPatterns) {
    const matches = lower.match(pattern);
    if (matches) {
      for (const match of matches) {
        subQueries.push({
          query: match,
          intent: { type: QueryIntent.ENTITY_SEARCH, confidence: 0.9, entityType: type },
        });
      }
    }
  }

  return subQueries.length > 0 ? subQueries : [{ query, intent: detectIntent(query) }];
}

// ─── Evidence Ranking ────────────────────────────────────────────────────────

/**
 * Build evidence for a search result with per-signal contribution breakdown.
 */
function buildEvidence(pageText, query, entities, blocks, pageNum) {
  const evidence = [];
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 1);
  const expandedTerms = expandQuery(query, { includeSynonyms: true, includeStems: false });

  // 1. Text snippet evidence
  const sentences = pageText.split(/[.!?]+/).filter(s => s.trim().length > 10);
  for (const sentence of sentences) {
    const sentenceLower = sentence.toLowerCase();
    const matchCount = queryTerms.filter(t => sentenceLower.includes(t)).length;
    if (matchCount > 0) {
      evidence.push({
        type: 'text_snippet',
        signal: 'exact',
        text: sentence.trim().substring(0, 200),
        page: pageNum,
        relevance: matchCount / queryTerms.length,
        contribution: (matchCount / queryTerms.length) * 0.3,
      });
    }
  }

  // 2. Entity evidence
  for (const entity of entities) {
    const value = (entity.value || '').toLowerCase();
    if (queryLower.includes(value) || value.includes(queryLower)) {
      evidence.push({
        type: 'entity',
        signal: 'entity',
        entity: { type: entity.type, value: entity.value },
        page: pageNum,
        bbox: entity.bbox,
        relevance: 0.9,
        contribution: 0.35,
      });
    }
  }

  // 3. Structural evidence
  for (const block of blocks) {
    if (block.text && block.text.toLowerCase().includes(queryLower)) {
      evidence.push({
        type: 'block',
        signal: 'structure',
        blockType: block.type,
        text: block.text.substring(0, 100),
        page: pageNum,
        bbox: block.bbox,
        relevance: 0.7,
        contribution: 0.2,
      });
    }
  }

  // 4. Concept expansion evidence
  for (const expanded of expandedTerms) {
    if (expanded.weight < 0.5) continue;
    const lower = expanded.term.toLowerCase();
    if (pageText.toLowerCase().includes(lower)) {
      evidence.push({
        type: 'concept',
        signal: 'concept',
        term: expanded.term,
        weight: expanded.weight,
        sources: expanded.sources,
        page: pageNum,
        relevance: expanded.weight * 0.6,
        contribution: 0.15,
      });
    }
  }

  // Sort by relevance
  evidence.sort((a, b) => b.relevance - a.relevance);

  // Normalize contributions
  const totalContribution = evidence.reduce((s, e) => s + (e.contribution || 0), 0);
  if (totalContribution > 0) {
    for (const e of evidence) {
      e.contribution = (e.contribution || 0) / totalContribution;
    }
  }

  return evidence.slice(0, 8);
}

/**
 * Rank multiple search results with per-signal contribution breakdown and explainability.
 */
export function rankResults(results, query) {
  const intent = detectIntent(query);
  const queryLower = query.toLowerCase();

  return results.map(result => {
    const explanation = [];
    const reasons = [];

    // Per-signal contribution breakdown
    if (result.contributions) {
      for (const [signal, data] of Object.entries(result.contributions)) {
        if (data.contribution > 0.05) {
          reasons.push({
            signal,
            score: data.score,
            weight: data.weight,
            contribution: data.contribution,
          });
          explanation.push(`${signal}: ${(data.contribution * 100).toFixed(1)}%`);
        }
      }
    }

    // Intent-based boosts
    if (intent.type === QueryIntent.ENTITY_SEARCH && result.entities?.length > 0) {
      const matchingEntities = result.entities.filter(e =>
        e.value?.toLowerCase().includes(queryLower)
      );
      if (matchingEntities.length > 0) {
        reasons.push({ signal: 'exact_entity_match', value: matchingEntities[0].value, contribution: 0.25 });
        explanation.push(`Exact ${intent.entityType || 'entity'} match: ${matchingEntities[0].value}`);
      }
    }

    if (intent.type === QueryIntent.TABLE_QUERY && result.signals?.structure > 0) {
      reasons.push({ signal: 'table_structure', contribution: 0.15 });
      explanation.push('Contains table structure');
    }

    if (intent.type === QueryIntent.RELATIONSHIP_LOOKUP && result.signals?.relationship > 0) {
      reasons.push({ signal: 'relationship_evidence', contribution: 0.20 });
      explanation.push('Contains relationship evidence');
    }

    return {
      ...result,
      explanation,
      reasons,
      intent,
      confidence: Math.min(result.score * 1.2, 1.0),
    };
  });
}

// ─── Deterministic Reasoning Operators ───────────────────────────────────────

/**
 * COUNT operator — count entities/blocks matching criteria.
 */
export function operatorCount(graph, criteria) {
  const { entityType, blockType, page, textContains } = criteria;
  let items = [];

  if (entityType) {
    items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];
  } else if (blockType) {
    items = graph._contentGraph?.allBlocks?.filter(b => b.type === blockType) || [];
  }

  if (page) {
    items = items.filter(i => i.page === page);
  }

  if (textContains) {
    const lower = textContains.toLowerCase();
    items = items.filter(i =>
      (i.value || '').toLowerCase().includes(lower) ||
      (i.text || '').toLowerCase().includes(lower)
    );
  }

  return {
    operator: 'COUNT',
    result: items.length,
    items,
    criteria,
  };
}

/**
 * SUM operator — sum numeric values from currency entities.
 */
export function operatorSum(graph, criteria) {
  const { entityType = 'currency', page, filter } = criteria;
  let items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];

  if (page) {
    items = items.filter(i => i.page === page);
  }

  if (filter) {
    items = items.filter(i => {
      const value = (i.value || '').toLowerCase();
      return filter.toLowerCase().split(/\s+/).some(word => value.includes(word));
    });
  }

  const total = items.reduce((sum, item) => {
    const num = parseFloat((item.value || '').replace(/[$,]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return {
    operator: 'SUM',
    result: total,
    formattedResult: `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    itemCount: items.length,
    items,
    criteria,
  };
}

/**
 * MAX/MIN operator — find extreme value.
 */
export function operatorMax(graph, criteria) {
  const { entityType = 'currency', page, filter } = criteria;
  let items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];

  if (page) items = items.filter(i => i.page === page);
  if (filter) {
    items = items.filter(i => {
      const value = (i.value || '').toLowerCase();
      return filter.toLowerCase().split(/\s+/).some(word => value.includes(word));
    });
  }

  const withValues = items.map(item => ({
    ...item,
    numericValue: parseFloat((item.value || '').replace(/[$,]/g, '')),
  })).filter(item => !isNaN(item.numericValue));

  if (withValues.length === 0) {
    return { operator: 'MAX', result: null, items: [], criteria };
  }

  withValues.sort((a, b) => b.numericValue - a.numericValue);

  return {
    operator: 'MAX',
    result: withValues[0].numericValue,
    formattedResult: `$${withValues[0].numericValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    item: withValues[0],
    allValues: withValues.map(i => ({ value: i.numericValue, text: i.value, page: i.page })),
    criteria,
  };
}

export function operatorMin(graph, criteria) {
  const { entityType = 'currency', page, filter } = criteria;
  let items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];

  if (page) items = items.filter(i => i.page === page);
  if (filter) {
    items = items.filter(i => {
      const value = (i.value || '').toLowerCase();
      return filter.toLowerCase().split(/\s+/).some(word => value.includes(word));
    });
  }

  const withValues = items.map(item => ({
    ...item,
    numericValue: parseFloat((item.value || '').replace(/[$,]/g, '')),
  })).filter(item => !isNaN(item.numericValue));

  if (withValues.length === 0) {
    return { operator: 'MIN', result: null, items: [], criteria };
  }

  withValues.sort((a, b) => a.numericValue - b.numericValue);

  return {
    operator: 'MIN',
    result: withValues[0].numericValue,
    formattedResult: `$${withValues[0].numericValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    item: withValues[0],
    allValues: withValues.map(i => ({ value: i.numericValue, text: i.value, page: i.page })),
    criteria,
  };
}

/**
 * AVG operator — compute average of numeric values.
 */
export function operatorAvg(graph, criteria) {
  const { entityType = 'currency', page, filter } = criteria;
  let items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];

  if (page) items = items.filter(i => i.page === page);
  if (filter) {
    items = items.filter(i => {
      const value = (i.value || '').toLowerCase();
      return filter.toLowerCase().split(/\s+/).some(word => value.includes(word));
    });
  }

  const withValues = items.map(item => ({
    ...item,
    numericValue: parseFloat((item.value || '').replace(/[$,]/g, '')),
  })).filter(item => !isNaN(item.numericValue));

  if (withValues.length === 0) {
    return { operator: 'AVG', result: null, itemCount: 0, criteria };
  }

  const total = withValues.reduce((s, i) => s + i.numericValue, 0);
  const avg = total / withValues.length;

  return {
    operator: 'AVG',
    result: avg,
    formattedResult: `$${avg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    itemCount: withValues.length,
    total,
    items: withValues,
    criteria,
  };
}

/**
 * BEFORE operator — find entities before a date or on earlier pages.
 */
export function operatorBefore(graph, criteria) {
  const { entityType = 'date', referenceDate, page } = criteria;
  let items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];

  if (page) items = items.filter(i => i.page <= page);

  if (referenceDate) {
    const refTime = new Date(referenceDate).getTime();
    items = items.filter(i => {
      const itemTime = new Date(i.value).getTime();
      return !isNaN(itemTime) && itemTime < refTime;
    });
  }

  return {
    operator: 'BEFORE',
    result: items.length,
    items,
    criteria,
  };
}

/**
 * AFTER operator — find entities after a date or on later pages.
 */
export function operatorAfter(graph, criteria) {
  const { entityType = 'date', referenceDate, page } = criteria;
  let items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];

  if (page) items = items.filter(i => i.page >= page);

  if (referenceDate) {
    const refTime = new Date(referenceDate).getTime();
    items = items.filter(i => {
      const itemTime = new Date(i.value).getTime();
      return !isNaN(itemTime) && itemTime > refTime;
    });
  }

  return {
    operator: 'AFTER',
    result: items.length,
    items,
    criteria,
  };
}

/**
 * BETWEEN operator — find entities between two values (dates, numbers, pages).
 */
export function operatorBetween(graph, criteria) {
  const { entityType = 'currency', low, high, page } = criteria;
  let items = graph._contentGraph?.allEntities?.filter(e => e.type === entityType) || [];

  if (page) items = items.filter(i => i.page === page);

  items = items.filter(i => {
    const numVal = parseFloat((i.value || '').replace(/[$,]/g, ''));
    if (!isNaN(numVal) && low !== undefined && high !== undefined) {
      return numVal >= low && numVal <= high;
    }
    const dateVal = new Date(i.value).getTime();
    if (!isNaN(dateVal) && low !== undefined && high !== undefined) {
      const lowTime = new Date(low).getTime();
      const highTime = new Date(high).getTime();
      return dateVal >= lowTime && dateVal <= highTime;
    }
    return false;
  });

  return {
    operator: 'BETWEEN',
    result: items.length,
    items,
    criteria,
  };
}

/**
 * GROUP BY operator — group entities by type, page, or other attribute.
 */
export function operatorGroupBy(graph, criteria) {
  const { entityType, groupBy = 'page' } = criteria;
  let items = graph._contentGraph?.allEntities || [];

  if (entityType) {
    items = items.filter(i => i.type === entityType);
  }

  const groups = new Map();
  for (const item of items) {
    let key;
    switch (groupBy) {
      case 'page': key = `page_${item.page}`; break;
      case 'type': key = item.type; break;
      case 'value':
        key = (item.value || '').substring(0, 20);
        break;
      default: key = 'all';
    }
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  const result = {};
  for (const [key, groupItems] of groups) {
    result[key] = {
      count: groupItems.length,
      items: groupItems,
    };
  }

  return {
    operator: 'GROUP_BY',
    result,
    groupCount: groups.size,
    totalItems: items.length,
    criteria,
  };
}

/**
 * Execute a deterministic reasoning query.
 * Supports: COUNT, SUM, AVG, MAX, MIN, BEFORE, AFTER, BETWEEN, GROUP BY
 */
export function executeReasoning(graph, query) {
  const lower = query.toLowerCase();
  const intent = detectIntent(query);

  // COUNT queries
  if (intent.type === QueryIntent.COUNT) {
    const criteria = {};
    if (/ordinance/i.test(lower)) criteria.entityType = 'ordinance_number';
    else if (/resolution/i.test(lower)) criteria.entityType = 'resolution_number';
    else if (/permit/i.test(lower)) criteria.entityType = 'permit_number';
    else if (/person|people|name/i.test(lower)) criteria.entityType = 'person';
    else if (/organization|department|company/i.test(lower)) criteria.entityType = 'organization';
    else if (/date/i.test(lower)) criteria.entityType = 'date';
    else if (/email/i.test(lower)) criteria.entityType = 'email';
    else if (/phone/i.test(lower)) criteria.entityType = 'phone';
    else if (/address/i.test(lower)) criteria.entityType = 'address';
    else if (/currency|amount|dollar|\$/i.test(lower)) criteria.entityType = 'currency';
    else if (/table/i.test(lower)) criteria.blockType = 'table';
    else if (/form/i.test(lower)) criteria.blockType = 'form_field';
    else if (/heading|section/i.test(lower)) criteria.blockType = 'heading';

    const result = operatorCount(graph, criteria);
    return {
      answer: `Found ${result.result} ${criteria.entityType || criteria.blockType || 'items'}.`,
      confidence: 0.9,
      evidence: result.items.slice(0, 5).map(i => ({
        text: i.value || i.text,
        page: i.page,
        type: i.type,
      })),
      reasoning: { intent: QueryIntent.COUNT, operator: 'COUNT', criteria, result: result.result },
    };
  }

  // SUM queries
  if (intent.type === QueryIntent.AGGREGATION && /total|sum/i.test(lower)) {
    const criteria = { entityType: 'currency' };
    const filterWords = lower.replace(/(what is the|total|sum|of|for|in|all)\s*/g, '').trim();
    if (filterWords.length > 2) criteria.filter = filterWords;

    const result = operatorSum(graph, criteria);
    return {
      answer: result.itemCount > 0
        ? `The total is ${result.formattedResult} (from ${result.itemCount} value(s)).`
        : 'No monetary values found matching this query.',
      confidence: 0.85,
      evidence: result.items.slice(0, 5).map(i => ({ text: i.value, page: i.page })),
      reasoning: { intent: QueryIntent.AGGREGATION, operator: 'SUM', criteria, result: result.result },
    };
  }

  // AVG queries
  if (intent.type === QueryIntent.AGGREGATION && /average|avg|mean/i.test(lower)) {
    const criteria = { entityType: 'currency' };
    const filterWords = lower.replace(/(what is the|average|avg|mean|of|for|in|all)\s*/g, '').trim();
    if (filterWords.length > 2) criteria.filter = filterWords;

    const result = operatorAvg(graph, criteria);
    return {
      answer: result.itemCount > 0
        ? `The average is ${result.formattedResult} (from ${result.itemCount} value(s)).`
        : 'No monetary values found matching this query.',
      confidence: 0.85,
      evidence: result.items?.slice(0, 5).map(i => ({ text: i.value, page: i.page })) || [],
      reasoning: { intent: QueryIntent.AGGREGATION, operator: 'AVG', criteria, result: result.result },
    };
  }

  // MAX queries
  if (intent.type === QueryIntent.AGGREGATION && /highest|maximum|max|most/i.test(lower)) {
    const result = operatorMax(graph, { entityType: 'currency' });
    return {
      answer: result.result !== null
        ? `The highest value is ${result.formattedResult}.`
        : 'No monetary values found.',
      confidence: 0.85,
      evidence: result.item ? [{ text: result.item.value, page: result.item.page }] : [],
      reasoning: { intent: QueryIntent.AGGREGATION, operator: 'MAX', result: result.result },
    };
  }

  // MIN queries
  if (intent.type === QueryIntent.AGGREGATION && /lowest|minimum|min|least/i.test(lower)) {
    const result = operatorMin(graph, { entityType: 'currency' });
    return {
      answer: result.result !== null
        ? `The lowest value is ${result.formattedResult}.`
        : 'No monetary values found.',
      confidence: 0.85,
      evidence: result.item ? [{ text: result.item.value, page: result.item.page }] : [],
      reasoning: { intent: QueryIntent.AGGREGATION, operator: 'MIN', result: result.result },
    };
  }

  // BEFORE/AFTER queries (temporal)
  if (/before|earlier|prior|previous|since|after|later|following/i.test(lower)) {
    const isBefore = /before|earlier|prior|previous/i.test(lower);
    const operator = isBefore ? operatorBefore : operatorAfter;

    // Try to extract a reference date
    const dateMatch = lower.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
    const criteria = { entityType: 'date' };
    if (dateMatch) criteria.referenceDate = dateMatch[0];

    const result = operator(graph, criteria);
    return {
      answer: `Found ${result.result} date(s) ${isBefore ? 'before' : 'after'} the reference.`,
      confidence: 0.8,
      evidence: result.items.slice(0, 5).map(i => ({ text: i.value, page: i.page })),
      reasoning: { intent: intent.type, operator: isBefore ? 'BEFORE' : 'AFTER', criteria, result: result.result },
    };
  }

  // BETWEEN queries
  if (/between|from.*to|range/i.test(lower)) {
    const numbers = lower.match(/\d[\d,]*(?:\.\d+)?/g);
    if (numbers && numbers.length >= 2) {
      const low = parseFloat(numbers[0].replace(/,/g, ''));
      const high = parseFloat(numbers[1].replace(/,/g, ''));
      const criteria = { entityType: 'currency', low, high };

      const result = operatorBetween(graph, criteria);
      return {
        answer: `Found ${result.result} value(s) between ${low} and ${high}.`,
        confidence: 0.85,
        evidence: result.items.slice(0, 5).map(i => ({ text: i.value, page: i.page })),
        reasoning: { intent: intent.type, operator: 'BETWEEN', criteria, result: result.result },
      };
    }
  }

  // GROUP BY queries
  if (/group|breakdown|distribution|by (page|type|category)/i.test(lower)) {
    let groupBy = 'page';
    if (/by type|by category|per type/i.test(lower)) groupBy = 'type';

    let entityType;
    if (/currency|amount|dollar/i.test(lower)) entityType = 'currency';
    else if (/person|name/i.test(lower)) entityType = 'person';
    else if (/date/i.test(lower)) entityType = 'date';

    const result = operatorGroupBy(graph, { entityType, groupBy });
    return {
      answer: `Grouped ${result.totalItems} items into ${result.groupCount} groups by ${groupBy}.`,
      confidence: 0.8,
      evidence: [],
      reasoning: { intent: intent.type, operator: 'GROUP_BY', result: result.groupCount },
    };
  }

  return null; // Not a reasoning query
}

// ─── Utility Functions ───────────────────────────────────────────────────────

function jaccardSimilarity(set1, set2) {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return union.size > 0 ? intersection.size / union.size : 0;
}

function cosineSimilarity(vec1, vec2) {
  const keys1 = Object.keys(vec1);
  const keys2 = Object.keys(vec2);
  const allKeys = new Set([...keys1, ...keys2]);

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
  // Compare page type distributions
  const types1 = Object.keys(l1.pageTypes);
  const types2 = Object.keys(l2.pageTypes);
  const allTypes = new Set([...types1, ...types2]);

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
  const fields = ['tableCount', 'formCount', 'listCount', 'headingCount'];
  let similarity = 0;

  for (const field of fields) {
    const v1 = s1[field] || 0;
    const v2 = s2[field] || 0;
    similarity += 1 - Math.abs(v1 - v2) / Math.max(v1 + v2, 1);
  }

  return similarity / fields.length;
}

function buildTopicVector(graph) {
  const vector = {};

  // Extract key terms from headings
  const headings = graph.layout?.getAllHeadings() || [];
  for (const heading of headings) {
    const words = heading.text.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    for (const word of words) {
      vector[word] = (vector[word] || 0) + 2; // Headings are more important
    }
  }

  // Extract key terms from entity values
  const entities = graph._contentGraph?.allEntities || [];
  for (const entity of entities) {
    const words = (entity.value || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
    for (const word of words) {
      vector[word] = (vector[word] || 0) + 1;
    }
  }

  // Extract key terms from block text (sampled)
  const blocks = graph._contentGraph?.allBlocks || [];
  for (const block of blocks.slice(0, 50)) { // Sample first 50 blocks
    const words = (block.text || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
    for (const word of words) {
      vector[word] = (vector[word] || 0) + 0.5;
    }
  }

  // Normalize
  const maxVal = Math.max(...Object.values(vector), 1);
  for (const key of Object.keys(vector)) {
    vector[key] = vector[key] / maxVal;
  }

  return vector;
}

function areBboxesNear(bbox1, bbox2, threshold) {
  const cx1 = bbox1[0] + bbox1[2] / 2;
  const cy1 = bbox1[1] + bbox1[3] / 2;
  const cx2 = bbox2[0] + bbox2[2] / 2;
  const cy2 = bbox2[1] + bbox2[3] / 2;
  const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
  return dist < threshold;
}

function groupEntitiesByRow(entities) {
  if (entities.length === 0) return [];
  const sorted = [...entities].sort((a, b) => (a.bbox?.[1] || 0) - (b.bbox?.[1] || 0));
  const rows = [];
  let currentRow = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    if (Math.abs((curr.bbox?.[1] || 0) - (prev.bbox?.[1] || 0)) < 15) {
      currentRow.push(curr);
    } else {
      rows.push(currentRow);
      currentRow = [curr];
    }
  }
  rows.push(currentRow);
  return rows;
}

// ─── First-Class Table Objects ────────────────────────────────────────────────

/**
 * Build structured table objects from content blocks.
 * Returns tables with headers, rows, and entity relationships.
 */
export function buildTableObjects(contentGraph, conceptGraph) {
  const tables = [];
  const tableBlocks = contentGraph.allBlocks.filter(b => b.type === 'table');

  for (const block of tableBlocks) {
    if (!block.bbox) continue;

    // Find text objects within this table's bounding box
    const cellTexts = contentGraph.allBlocks
      .filter(b => b.bbox && b.type !== 'table' &&
        b.bbox[0] >= block.bbox[0] - 10 &&
        b.bbox[1] >= block.bbox[1] - 10 &&
        b.bbox[0] + (b.bbox[2] || 0) <= block.bbox[0] + block.bbox[2] + 10 &&
        b.bbox[1] + (b.bbox[3] || 0) <= block.bbox[1] + block.bbox[3] + 10
      )
      .sort((a, b) => {
        const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
        if (Math.abs(yDiff) > 10) return yDiff;
        return (a.bbox[0] || 0) - (b.bbox[0] || 0);
      });

    // Group into rows
    const cellRows = [];
    let currentRow = cellTexts.length > 0 ? [cellTexts[0]] : [];
    for (let i = 1; i < cellTexts.length; i++) {
      const prev = cellTexts[i - 1];
      const curr = cellTexts[i];
      if (Math.abs((curr.bbox?.[1] || 0) - (prev.bbox?.[1] || 0)) < 10) {
        currentRow.push(curr);
      } else {
        cellRows.push(currentRow);
        currentRow = [curr];
      }
    }
    if (currentRow.length > 0) cellRows.push(currentRow);

    if (cellRows.length === 0) continue;

    // First row = headers
    const headers = cellRows[0].map(cell => (cell.text || '').trim());
    const rows = cellRows.slice(1).map(row =>
      row.map(cell => (cell.text || '').trim())
    );

    // Find entities within this table
    const tableEntities = (contentGraph.allEntities || []).filter(e =>
      e.bbox && areBboxesNear(block.bbox, e.bbox, 150)
    );

    const table = {
      id: `table_${block.page}_${block.bbox[0]}_${block.bbox[1]}`,
      page: block.page,
      bbox: block.bbox,
      headers,
      rows,
      rowCount: rows.length,
      colCount: headers.length,
      entities: tableEntities.map(e => ({ type: e.type, value: e.value, bbox: e.bbox })),
      text: block.text || '',
      relationships: [],
    };

    // Build row-level relationships
    const entityRows = groupEntitiesByRow(tableEntities.filter(e => e.bbox));
    for (const row of entityRows) {
      for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
          table.relationships.push({
            source: { type: row[i].type, value: row[i].value },
            target: { type: row[j].type, value: row[j].value },
            predicate: 'same_row',
          });
        }
      }
    }

    tables.push(table);
  }

  return tables;
}

/**
 * Query a table object with conditions.
 * e.g., table.query({ column: 'Amount', gt: 100000 })
 */
export function queryTable(table, conditions) {
  if (!table || !table.rows || table.rows.length === 0) return [];

  const { column, gt, lt, eq, contains, where } = conditions || {};

  let results = table.rows.map((row, idx) => {
    const obj = {};
    for (let c = 0; c < table.headers.length; c++) {
      obj[table.headers[c]] = row[c] || '';
    }
    obj._rowIndex = idx;
    return obj;
  });

  if (column && gt !== undefined) {
    results = results.filter(row => {
      const val = parseFloat((row[column] || '').replace(/[$,]/g, ''));
      return !isNaN(val) && val > gt;
    });
  }
  if (column && lt !== undefined) {
    results = results.filter(row => {
      const val = parseFloat((row[column] || '').replace(/[$,]/g, ''));
      return !isNaN(val) && val < lt;
    });
  }
  if (column && eq !== undefined) {
    results = results.filter(row => row[column] === eq);
  }
  if (column && contains) {
    results = results.filter(row => (row[column] || '').toLowerCase().includes(contains.toLowerCase()));
  }
  if (where) {
    for (const [col, condition] of Object.entries(where)) {
      if (condition.gt !== undefined) {
        results = results.filter(row => {
          const val = parseFloat((row[col] || '').replace(/[$,]/g, ''));
          return !isNaN(val) && val > condition.gt;
        });
      }
      if (condition.lt !== undefined) {
        results = results.filter(row => {
          const val = parseFloat((row[col] || '').replace(/[$,]/g, ''));
          return !isNaN(val) && val < condition.lt;
        });
      }
    }
  }

  return results;
}
