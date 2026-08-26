/**
 * @codbdocs/core — Multi-Document Workspace
 *
 * Enables querying across multiple documents simultaneously.
 * Provides unified search, cross-document relationship discovery,
 * and workspace-level aggregation.
 */

/**
 * Create a multi-document workspace.
 */
export function createWorkspace(options = {}) {
  const { name = 'Workspace', description = '' } = options;

  const workspace = {
    name,
    description,
    documents: new Map(), // docId -> { doc, graph, fingerprint, concepts }
    crossDocRelationships: [],
    terminology: { aliases: {}, acronyms: {}, definitions: {} },
  };

  /**
   * Add a document to the workspace.
   */
  workspace.add = async function(docOrGraph, options = {}) {
    let doc, graph, docId;

    if (docOrGraph._contentGraph) {
      // It's a graph from analyze()
      graph = docOrGraph;
      docId = graph._ir?.document?.id || `doc_${this.documents.size + 1}`;
    } else {
      // It's a CodbDoc
      doc = docOrGraph;
      graph = await doc.analyze({ ocr: false, ...options });
      docId = graph._ir?.document?.id || `doc_${this.documents.size + 1}`;
    }

    this.documents.set(docId, {
      doc,
      graph,
      fingerprint: graph._fingerprint || null,
      conceptGraph: graph._conceptGraph || null,
      metadata: graph._ir?.document?.metadata || {},
      pageCount: graph._ir?.document?.pages?.length || 0,
    });

    // Rebuild cross-document relationships
    this._buildCrossDocRelationships();
    this._learnTerminology();

    return docId;
  };

  /**
   * Remove a document from the workspace.
   */
  workspace.remove = function(docId) {
    this.documents.delete(docId);
    this._buildCrossDocRelationships();
  };

  /**
   * Search across all documents.
   */
  workspace.search = function(query, options = {}) {
    const { maxResults = 20, perDocLimit = 5 } = options;
    const allResults = [];

    for (const [docId, entry] of this.documents) {
      const graph = entry.graph;
      if (!graph?.hybridSearch) continue;

      const results = graph.hybridSearch(query, {
        maxResults: perDocLimit,
        rerank: false,
        useExpansion: true,
      });

      for (const result of results) {
        allResults.push({
          ...result,
          docId,
          docMetadata: entry.metadata,
        });
      }
    }

    // Sort globally
    allResults.sort((a, b) => b.score - a.score);

    // Cross-document boost: if same entity appears in multiple docs, boost
    const entityCounts = new Map();
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

  /**
   * Query across all documents with reasoning.
   */
  workspace.query = function(question, options = {}) {
    const results = this.search(question, { maxResults: 10 });

    // Try reasoning on each document
    const reasoningResults = [];
    for (const [docId, entry] of this.documents) {
      const graph = entry.graph;
      if (!graph?.executeReasoning) continue;
      const reasoning = graph.executeReasoning(question);
      if (reasoning) {
        reasoningResults.push({ ...reasoning, docId, metadata: entry.metadata });
      }
    }

    return {
      searchResults: results,
      reasoningResults,
      answer: reasoningResults.length > 0 ? reasoningResults[0].answer : null,
      confidence: reasoningResults.length > 0 ? reasoningResults[0].confidence : 0,
    };
  };

  /**
   * Get workspace summary.
   */
  workspace.getSummary = function() {
    let totalWords = 0;
    let totalPages = 0;
    const allEntityTypes = new Map();

    for (const [, entry] of this.documents) {
      const summary = entry.graph?.getSummary?.() || {};
      totalWords += summary.wordCount || 0;
      totalPages += entry.pageCount || 0;

      const entities = entry.graph?._contentGraph?.allEntities || [];
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
      crossDocRelationships: this.crossDocRelationships.length,
    };
  };

  /**
   * Export workspace as JSON.
   */
  workspace.toJSON = function() {
    return {
      name: this.name,
      description: this.description,
      documents: Array.from(this.documents.entries()).map(([id, entry]) => ({
        id,
        metadata: entry.metadata,
        pageCount: entry.pageCount,
      })),
      summary: this.getSummary(),
    };
  };

  // Internal: Build cross-document relationships
  workspace._buildCrossDocRelationships = function() {
    this.crossDocRelationships = [];
    const docEntries = Array.from(this.documents.entries());

    for (let i = 0; i < docEntries.length; i++) {
      for (let j = i + 1; j < docEntries.length; j++) {
        const [, entry1] = docEntries[i];
        const [, entry2] = docEntries[j];

        const entities1 = entry1.graph?._contentGraph?.allEntities || [];
        const entities2 = entry2.graph?._contentGraph?.allEntities || [];

        // Find shared entities
        const shared = [];
        for (const e1 of entities1) {
          for (const e2 of entities2) {
            if (e1.type === e2.type && e1.value?.toLowerCase() === e2.value?.toLowerCase()) {
              shared.push({ type: e1.type, value: e1.value });
            }
          }
        }

        if (shared.length > 0) {
          this.crossDocRelationships.push({
            doc1: docEntries[i][0],
            doc2: docEntries[j][0],
            sharedEntities: shared,
            strength: shared.length,
          });
        }
      }
    }
  };

  // Internal: Learn terminology across documents
  workspace._learnTerminology = function() {
    const allPages = [];
    for (const [, entry] of this.documents) {
      const pages = entry.graph?.text?.pages || [];
      allPages.push(...pages);
    }
    this.terminology = learnTerminology(allPages);
  };

  return workspace;
}
