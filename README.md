# CodbDocs

**A complete browser-based PDF document processing library with offline AI understanding, full RAG support, and round-trip PDF creation.**

No server. No external APIs. Pure browser JavaScript. Use the CDN or host the files yourself.

**jsDelivr access URL:**
```text
https://cdn.jsdelivr.net/gh/CityofDaytonaBeach/codbdocs@main/packages/core/dist/codbdocs.js
```

```
CodbDocs
   │
@codbdocs/core        ← the engine + Document Brain + RAG + PDF Creator
   │
   ├── @codbdocs/react     ← useCodbDocs() hook
   └── (vanilla JS / any framework via dist/codbdocs.js)
```

---

## Why CodbDocs?

### The Problem

Traditional PDF tools only extract text. They don't understand documents. You get raw text with no structure, no entities, no relationships, and no way to query the content intelligently. To build document AI applications, you need:

1. **Server infrastructure** - Deploy and maintain backend services
2. **API keys** - Pay for OpenAI, Google Vision, or AWS Textract
3. **Privacy concerns** - Send sensitive documents to external services
4. **Latency** - Network round-trips for every document
5. **Cost** - Per-page or per-document pricing adds up fast

### The Solution

CodbDocs runs **entirely in the browser**. It extracts text, analyzes structure, classifies content, and generates RAG-ready output without sending a single byte to a server. Your documents never leave your users' devices.

### Key Benefits

| Benefit | Description |
|---------|-------------|
| **Privacy-First** | Documents never leave the browser. No server uploads, no API calls, no data leakage. |
| **Zero Cost** | No API keys, no per-page fees, no subscription. Open source and free forever. |
| **Offline Capable** | Works without internet. Perfect for air-gapped environments, field work, or low-connectivity areas. |
| **Instant Setup** | One `<script>` tag. No npm install, no webpack config, no build step required. |
| **Framework Agnostic** | Works with React, Vue, Angular, Svelte, or vanilla JavaScript. |
| **Model-Free RAG** | No embedding model, no vector database, no GPU. Deterministic retrieval using document structure. |
| **Round-Trip PDF** | Reconstruct PDFs from the intermediate representation with 3 fidelity levels. |
| **900+ Pages** | Batch processing mode handles large documents without memory issues. |

---

## What Makes This Different

| Feature | pdf.js | Tesseract.js | Adobe API | CodbDocs |
|---------|--------|--------------|-----------|----------|
| Text extraction | ✅ | ✅ | ✅ | ✅ |
| OCR fallback | ❌ | ✅ | ✅ | ✅ (quality-scored) |
| Document structure | ❌ | ❌ | ✅ | ✅ Headings, tables, forms, lists |
| Entity extraction | ❌ | ❌ | ✅ | ✅ Dates, phones, emails, addresses |
| Page classification | ❌ | ❌ | ✅ | ✅ Cover, letter, memo, form, legal |
| Semantic query | ❌ | ❌ | ❌ | ✅ "what dates are mentioned?" |
| Concept graph | ❌ | ❌ | ❌ | ✅ Entity relationships, co-occurrence |
| Hybrid search | ❌ | ❌ | ❌ | ✅ BM25 + entity + structure scoring |
| Deterministic reasoning | ❌ | ❌ | ❌ | ✅ COUNT, SUM, MAX, MIN operators |
| Model-free retrieval | ❌ | ❌ | ❌ | ✅ No embedding model needed |
| Offline operation | ✅ | ✅ | ❌ | ✅ No server, no API keys |
| RAG output | ❌ | ❌ | ❌ | ✅ Chunks, embeddings, JSONL/CSV |
| PDF creation | ❌ | ❌ | ❌ | ✅ Round-trip from IR |
| Digital signatures | ❌ | ❌ | ✅ | ✅ Extract + analyze |
| Cost | Free | Free | $1.50/1000 pages | Free |

---

## Architecture

CodbDocs uses a **3-layer architecture** that progressively builds understanding:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CodbDocs Architecture                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 3: Content-Aware                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ • Semantic blocks (paragraphs, tables, forms)            │  │
│  │ • Entity extraction (dates, phones, emails, amounts)     │  │
│  │ • Cross-page relationships                               │  │
│  │ • Document classification                                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Layer 2: Vision-Aware                                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ • Quality-scored OCR (Tesseract.js)                      │  │
│  │ • Spatial layout analysis (columns, rows, alignment)     │  │
│  │ • Structure detection (tables, lists, form fields)       │  │
│  │ • Visual region analysis (headers, footers, images)      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Layer 1: PDF-Aware                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ • Native text extraction (PDF.js)                        │  │
│  │ • Font and vector graphics                               │  │
│  │ • Images with semantic roles (logo, chart, figure)       │  │
│  │ • Structure trees and form fields                        │  │
│  │ • Digital signatures and encryption                      │  │
│  │ • Optional Content Groups (layers)                       │  │
│  │ • Embedded files and actions                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Retrieval Engine (overlay)                                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ • Concept Graph (entity relationships, co-occurrence)    │  │
│  │ • CodbFingerprint (model-free document signature)        │  │
│  │ • Hybrid Search (BM25 + entity + structure matching)     │  │
│  │ • Query Planner (intent detection, decomposition)        │  │
│  │ • Deterministic Reasoning (COUNT, SUM, MAX, MIN)         │  │
│  │ • Evidence Ranking (explainability + citations)          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### PDF Intermediate Representation (IR)

At the heart of CodbDocs is the **PDF-IR** — a complete intermediate representation that captures every aspect of a PDF document:

```javascript
const ir = graph.getIR();
// {
//   document: {
//     metadata: { title, author, creator, producer, ... },
//     navigation: { outline, destinations, labels },
//     security: { encrypted, permissions, algorithm },
//     ocgs: [layers],
//     embeddedFiles: [files],
//     actions: [actions],
//     revisions: [history]
//   },
//   pages: {
//     page_1: {
//       width, height, rotation, mediaBox, cropBox,
//       content: [text objects],
//       vectors: [vector objects],
//       images: [image objects with roles + captions],
//       annotations: [annotations],
//       signatures: [digital signatures],
//       appearanceStreams: [form appearances],
//       graphicsStates: [graphics state snapshots],
//       markedContent: [tagged content],
//       artifacts: [page artifacts],
//       glyphs: [individual glyphs]
//     }
//   },
//   vectors: { ... },
//   objects: { ... },
//   structure: { ... },
//   annotations: { ... },
//   forms: { ... }
// }
```

---

## How the Model-Free RAG Works

This is the core innovation. Most RAG systems require an embedding model (like OpenAI's `text-embedding-3-small` or a local model via ONNX/WASM) to convert text into vectors, then use a vector database for similarity search. CodbDocs takes a fundamentally different approach.

### The Traditional RAG Pipeline

```
Traditional RAG:
  Document → Chunk → Embedding Model → Vector → Vector DB → Similarity Search → Results
                      (GPU/API needed)          (server needed)
```

**Problems with this:**
- Requires an embedding model (GPU or API key)
- Requires a vector database (server infrastructure)
- Embeddings are opaque — you can't explain why a result matched
- Embeddings drift — different model versions produce different vectors
- Embeddings are slow — running 1000 chunks through a model takes seconds to minutes
- Privacy — sending document content to an external service

### CodbDocs' Model-Free Retrieval

```
CodbDocs RAG:
  Document → Analyze → Concept Graph + CodbFingerprint → Hybrid Search → Ranked Results
                        (deterministic, explainable)      (no model, no GPU)
```

**How it works:**

1. **Analysis Phase** — CodbDocs extracts everything from the PDF:
   - Text content with spatial positions
   - Entities (dates, people, organizations, currencies, addresses)
   - Structure (headings, tables, forms, lists)
   - Images with semantic roles (logo, chart, figure, icon)
   - Vector graphics and annotations

2. **Concept Graph Construction** — A graph is built where:
   - **Nodes** are concepts (entities, blocks, headings)
   - **Edges** are weighted relationships (co-occurrence, spatial proximity, semantic predicates)
   - **Indices** enable fast lookup by type, page, or text

3. **CodbFingerprint Generation** — A multi-signal document fingerprint:
   - Table of Contents (heading hierarchy)
   - Entity Registry (entity types + values + page locations)
   - Layout Signature (column counts, page types, text flow)
   - Structure Profile (table/form/list/heading counts)
   - Topic Vector (word frequency distribution)
   - Relationship Signature (relationship type counts)

4. **Hybrid Search** — At query time, four signals are combined:
   - **BM25 text scoring** — classic information retrieval text matching
   - **Entity matching** — direct entity value lookup
   - **Structure matching** — heading/block type relevance
   - **Topic scoring** — topic vector similarity from the fingerprint

5. **Deterministic Reasoning** — For count/sum/max/min queries, CodbDocs
   runs operators directly against the extracted entities — no model needed.

6. **Evidence Ranking** — Every result includes explainability:
   - Which page matched and why
   - Which entities were found
   - Which text snippets matched
   - Confidence scores for each signal

### Why This Works

The key insight from the review.txt design document:

> "The most important next milestone isn't 'more PDF support.' It's CODB Docs 1.0 Retrieval Engine: quality scoring → normalized IR → concept graph → relationship graph → fingerprints → hybrid deterministic retrieval → query planner → evidence ranking."

**CodbDocs wins on:**
- **Exact factual lookup** — "What is the invoice number?" (entity extraction + exact match)
- **Table questions** — "What is the total budget?" (structure detection + SUM operator)
- **Relationship questions** — "Who approved this resolution?" (concept graph traversal)
- **Cross-page questions** — "What dates appear throughout the document?" (global entity registry)
- **Document-specific terminology** — Ordinance numbers, resolution numbers, permit numbers (custom entity types)

**Embeddings retain an advantage on:**
- Unconstrained paraphrasing — "Tell me about the funding situation" (semantic similarity)
- Abstract concepts — "What's the overall sentiment?" (requires language understanding)

### When You Still Want Embeddings

CodbDocs provides embedding providers for when you need them:

```javascript
// Use OpenAI embeddings if you need semantic similarity
const embeddings = new OpenAIEmbeddingProvider('your-api-key');
const ragOutput = await graph.toRAGWithEmbeddings(embeddings);

// Or use the built-in local placeholder (not a real model)
const local = new LocalEmbeddingProvider();
```

But the point is: **you don't need them to get good results.** The model-free pipeline handles most document queries.

---

## Quick Start

### CDN (jsDelivr) — Simplest

```html
<!DOCTYPE html>
<html>
<head>
  <title>Document Analyzer</title>
</head>
<body>
  <input type="file" id="fileInput" accept=".pdf" />
  <div id="results"></div>

  <script src="https://cdn.jsdelivr.net/gh/CityofDaytonaBeach/codbdocs@main/packages/core/dist/codbdocs.js"></script>
  
  <script>
    document.getElementById('fileInput').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Load and analyze
      const doc = await CodbDocs.load(file);
      const graph = await doc.analyze({ ocr: true });

      // Query
      const dates = graph.query("what dates are mentioned?");
      const phones = graph.query("find all phone numbers");
      const summary = graph.getSummary();

      // Display
      document.getElementById('results').innerHTML = `
        <h2>${summary.pageCount} pages, ${summary.wordCount} words</h2>
        <h3>Dates</h3>
        <ul>${dates.results.map(d => `<li>${d.raw}</li>`).join('')}</ul>
        <h3>Phones</h3>
        <ul>${phones.results.map(p => `<li>${p.raw}</li>`).join('')}</ul>
      `;

      doc.destroy();
    });
  </script>
</body>
</html>
```

### Batteries-Included (Recommended)

Use `prepare()` to run the full pipeline in one call:

```javascript
const doc = await CodbDocs.load(file);
const graph = await doc.prepare();  // runs analyze() with all features enabled

// Now query with the enhanced engine
const result = graph.askEnhanced("Who approved the $425,000 contract?");
// → {
//   answer: "Found relevant content on page 17.",
//   confidence: 0.87,
//   evidence: [{ type: 'entity', entity: { type: 'currency', value: '$425,000' }, page: 17 }],
//   reasoning: { intent: 'relationship_lookup', searchResults: 5, topScore: 0.87 }
// }
```

### Local Files — No CDN Required

```html
<script src="vendor/pdf.js/pdf.min.js"></script>
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.js/pdf.worker.min.js";
</script>
<script src="vendor/tesseract.js/tesseract.min.js"></script>
<script src="packages/core/dist/codbdocs.js"></script>

<script>
  const doc = await CodbDocs.load(file);
  const graph = await doc.prepare();
  console.log(graph.getSummary());
</script>
```

### React

```bash
npm install @codbdocs/core @codbdocs/react
```

```jsx
import { useCodbDocs } from '@codbdocs/react';

function DocumentProcessor() {
  const { run, status, progress, result, error } = useCodbDocs({ ocr: true });

  return (
    <div>
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={e => e.target.files[0] && run(e.target.files[0])} 
      />

      {status === 'processing' && (
        <p>Page {progress.page}/{progress.total}: {progress.status}</p>
      )}

      {error && <p>Error: {String(error)}</p>}

      {result && (
        <div>
          <h2>{result.getSummary().wordCount} words</h2>
          <pre>{JSON.stringify(result.askEnhanced("What is this document about?"), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

---

## Core API

### Loading Documents

```javascript
// From file input
const doc = await CodbDocs.load(file);

// From ArrayBuffer
const doc = await CodbDocs.load(arrayBuffer);

// From URL (fetches the file first)
const doc = await CodbDocs.load('https://example.com/document.pdf');
```

### Analyzing Documents

```javascript
// Full analysis with OCR
const graph = await doc.analyze({
  ocr: true,                    // Enable OCR for scanned pages
  visual: false,                // Enable visual analysis (slower)
  extractVectors: true,         // Extract vector graphics
  extractExtended: true,        // Extract signatures, layers, etc.
  onProgress: ({ page, total, status }) => {
    console.log(`Page ${page}/${total}: ${status}`);
  }
});

// Batteries-included (recommended)
const graph = await doc.prepare();  // same as analyze() with all options enabled

// For large PDFs (900+ pages)
const graph = await doc.analyzeBatched({
  batchSize: 50,                // Process 50 pages at a time
  ocr: false,                  // Skip OCR to save memory
  onBatchComplete: ({ completed, total }) => {
    console.log(`${completed}/${total} pages processed`);
  }
});

// Quick text extraction (no analysis)
const result = await doc.extractText({ ocr: true });
console.log(result.fullText);
```

### Querying Documents

```javascript
// Natural language queries
graph.query("what dates are mentioned?")    // → { type: 'dates', results: [...] }
graph.query("find all phone numbers")       // → { type: 'phones', results: [...] }
graph.query("what emails are in the document?") // → { type: 'emails', results: [...] }
graph.query("find all addresses")           // → { type: 'addresses', results: [...] }
graph.query("what amounts are mentioned?")  // → { type: 'amounts', results: [...] }
graph.query("find all tables")              // → { type: 'tables', results: [...] }
graph.query("what is this document about?") // → { type: 'summary', results: {...} }

// Search content
const results = graph.find("budget");
const first = graph.findOne("invoice");

// AI-like Q&A (simple)
const answer = graph.ask("What is the total amount?");
// → { answer: "$1,250,000", confidence: 0.92, evidence: [...] }

// Enhanced Q&A (with reasoning operators + concept graph)
const enhanced = graph.askEnhanced("Who approved the $425,000 contract?");
// → { answer, confidence, evidence, reasoning: { intent, searchResults, explanation } }
```

---

## Retrieval Engine

### Concept Graph

The concept graph is a weighted graph of entities and their relationships. It's built automatically during `analyze()`.

```javascript
// Get the full concept graph
const conceptGraph = graph.getConceptGraph();

// Find all concepts of a type
const people = graph.getConcepts("person");
const orgs = graph.getConcepts("organization");

// Get neighbors of a concept
const neighbors = graph.getConceptNeighbors("person:Jane Smith", 1);
// → [{ node: { type: 'organization', text: 'City of Daytona Beach' }, edge: { relation: 'affiliated_with' }, depth: 1 }]

// Find path between two concepts
const path = graph.getConceptPath("person:Jane Smith", "currency:$425,000");
// → [{ sourceId, targetId, relation: 'associated_with', weight: 1.0 }]

// Get the most connected concepts (hubs)
const hubs = graph.getConceptHubs(5);
// → [{ node: { type: 'organization', text: 'City of Daytona Beach' }, degree: 12 }]

// Get communities (connected components)
const communities = graph.getCommunities();
```

### CodbFingerprint

The fingerprint is a model-free document signature. It captures structure, entities, and topics without any embedding model.

```javascript
const fp = graph.getFingerprint();
// → {
//   toc: [{ text: "Budget Overview", level: 1, page: 1 }],
//   entityRegistry: Map { "person:jane smith" → { type, value, pages, count } },
//   layoutSignature: { columnCounts: [1,2,1], pageTypes: { budget: 3, cover: 1 } },
//   structureProfile: { tableCount: 5, formCount: 2, listCount: 3, headingCount: 12 },
//   topicVector: { "budget": 0.9, "appropriation": 0.7, "revenue": 0.6 },
//   relationshipSignature: { contains: 45, affiliated_with: 8 },
//   metadata: { pageCount: 24, wordCount: 15000, documentType: 'budget' }
// }

// Compare two documents
const similarity = CodbFingerprint.similarity(fp1, fp2);
// → 0.73 (Jaccard on TOC, entity overlap, layout similarity, topic cosine)
```

### Hybrid Search

Search combines four signals: text (BM25), entities, structure, and topic similarity.

```javascript
const results = graph.hybridSearch("budget appropriation 2024", {
  maxResults: 10,
  minScore: 0.1,
  includeEvidence: true,
});

// Each result includes:
// {
//   page: 3,
//   score: 0.87,           // composite score
//   textScore: 0.82,       // BM25 text match
//   entityScore: 0.9,      // entity value match
//   structureScore: 0.7,   // heading/block type match
//   topicScore: 0.6,       // topic vector similarity
//   text: "The 2024 budget appropriation...",
//   entities: [{ type: 'currency', value: '$2.5M' }],
//   evidence: [
//     { type: 'text_snippet', text: '...', page: 3, relevance: 0.9 },
//     { type: 'entity', entity: { type: 'currency', value: '$2.5M' }, page: 3 }
//   ]
// }
```

### Query Intent Detection

The query planner detects intent and decomposes complex queries.

```javascript
const intent = graph.detectIntent("How many ordinances are mentioned?");
// → { type: 'count', confidence: 0.9 }

const intent2 = graph.detectIntent("Who approved the contract?");
// → { type: 'relationship_lookup', confidence: 0.8 }

const subQueries = graph.decomposeQuery("Find all dates and amounts on page 5");
// → [
//   { query: "find all dates and amounts on page 5", intent: { type: 'entity_search' } },
//   { query: "5", intent: { type: 'entity_search', entityType: 'date' } }
// ]
```

### Deterministic Reasoning Operators

For count, sum, max, and min queries, CodbDocs runs operators directly against extracted entities. No model, no API, no GPU.

```javascript
// COUNT — count entities matching criteria
const count = graph.count({ entityType: 'ordinance_number' });
// → { operator: 'COUNT', result: 8, items: [...] }

const countFiltered = graph.count({ entityType: 'person', textContains: 'Smith' });
// → { operator: 'COUNT', result: 2, items: [...] }

// SUM — sum numeric values (currency entities)
const total = graph.sum({ entityType: 'currency' });
// → { operator: 'SUM', result: 2500000, formattedResult: '$2,500,000', itemCount: 15 }

const filteredSum = graph.sum({ entityType: 'currency', filter: 'budget' });
// → sums only amounts that contain the word "budget"

// MAX — find highest value
const max = graph.max({ entityType: 'currency' });
// → { operator: 'MAX', result: 425000, formattedResult: '$425,000', item: { ... } }

// MIN — find lowest value
const min = graph.min({ entityType: 'currency' });
// → { operator: 'MIN', result: 150, formattedResult: '$150.00', item: { ... } }

// reason() — auto-detects intent and runs the right operator
const result = graph.reason("How many resolutions are mentioned?");
// → { answer: "Found 8 resolution_number items.", confidence: 0.9, reasoning: { operator: 'COUNT' } }

const totalBudget = graph.reason("What is the total budget amount?");
// → { answer: "The total is $2,500,000.00 (from 15 value(s)).", confidence: 0.85 }
```

### Evidence Ranking

Every search result includes explainability — you can show users exactly why a result matched.

```javascript
const ranked = graph.hybridSearch("contract approval", { includeEvidence: true });

for (const result of ranked) {
  console.log(`Page ${result.page} (score: ${result.score})`);
  for (const ev of result.evidence) {
    if (ev.type === 'entity') {
      console.log(`  Entity: ${ev.entity.type} = ${ev.entity.value}`);
    }
    if (ev.type === 'text_snippet') {
      console.log(`  Text: "${ev.text.substring(0, 80)}..."`);
    }
  }
}
```

---

## Image Semantic Understanding

Images are extracted during `analyze()` with automatic role inference and caption detection.

```javascript
const images = graph.getImages();
// → [
//   {
//     id: 'page_1_img_0',
//     pageNumber: 1,
//     width: 800, height: 200,
//     role: 'logo',          // inferred from size + position
//     caption: null,
//     dataUrl: 'data:image/png;base64,...'
//   },
//   {
//     id: 'page_3_img_1',
//     pageNumber: 3,
//     width: 600, height: 400,
//     role: 'chart',         // large, centered
//     caption: 'Figure 3: Revenue by Department',
//     dataUrl: 'data:image/png;base64,...'
//   }
// ]

// Get images for a specific page
const pageImages = graph.getImages(3);
```

**Image Roles:**

| Role | Detection |
|------|-----------|
| `logo` | Small image near top of page |
| `header` | Image in top 15% of page |
| `footer` | Image in bottom 15% of page |
| `chart` | Large, centered image (>400×300) |
| `icon` | Very small image (<50×50) |
| `figure` | Referenced as "Figure" or "Fig." in nearby text |
| `content` | Default for other images |

---

## Quality-Based OCR

Instead of a crude text-length check ("if text < 20 chars, OCR"), CodbDocs uses multi-signal quality scoring to decide whether to OCR a page.

```javascript
// The quality score considers:
// 1. Text volume (very short = likely scanned image)
// 2. Non-printable character ratio (garbage characters)
// 3. Outside-bounds text ratio (invisible text objects)
// 4. Average word length (too short or too long = garbage)
// 5. Duplicate text fragment ratio
// 6. Character variety (too few unique characters)

// Configure the quality threshold
CodbDocs.configure({ qualityThreshold: 0.5 });  // default: 0.5
// Pages scoring below this threshold get OCR'd
```

---

## RAG (Retrieval-Augmented Generation)

CodbDocs provides complete RAG support for AI applications — both model-free and embedding-based.

### Model-Free RAG (Recommended)

```javascript
// One call — analyzes, builds concept graph, creates fingerprint
const graph = await doc.prepare();

// Query with the enhanced engine
const answer = graph.askEnhanced("What is the total appropriation?");
// Uses: quality scoring → concept graph → hybrid search → evidence ranking

// Or use deterministic reasoning for exact questions
const count = graph.count({ entityType: 'ordinance_number' });
const total = graph.sum({ entityType: 'currency' });
const max = graph.max({ entityType: 'currency' });
```

### Embedding-Based RAG (When You Need Semantic Similarity)

```javascript
import { OpenAIEmbeddingProvider, LocalEmbeddingProvider } from '@codbdocs/core';

// OpenAI embeddings
const embeddings = new OpenAIEmbeddingProvider('your-api-key', {
  model: 'text-embedding-3-small',
  dimensions: 1536,
});

const ragOutput = await graph.toRAGWithEmbeddings(embeddings, {
  chunkStrategy: 'semantic',
  includeMetadata: true,
  includeCrossPageContext: true,
});

// Each chunk now includes:
// {
//   id: 'page_1_chunk_0',
//   text: '...',
//   embedding: [0.123, -0.456, ...]  // 1536-dimensional vector
// }

// Local embeddings (no API needed)
const localEmbeddings = new LocalEmbeddingProvider({ dimensions: 384 });
const ragLocal = await graph.toRAGWithEmbeddings(localEmbeddings);
```

### Smart Chunking

```javascript
const chunks = graph.createChunks({
  strategy: 'semantic',  // 'fixed' | 'semantic' | 'page' | 'section' | 'table' | 'hybrid'
  chunkSize: 1000,
  chunkOverlap: 200,
  includeMetadata: true,
  includeBoundingBoxes: true,
});
```

**Chunk Strategies:**

| Strategy | Description | Best For |
|----------|-------------|----------|
| `semantic` | Split by natural paragraph boundaries | General RAG |
| `fixed` | Fixed-size chunks with overlap | Simple vector DBs |
| `page` | One chunk per page | Page-level retrieval |
| `section` | Split by headings | Document structure |
| `table` | Keep tables as separate chunks | Table-heavy documents |
| `hybrid` | Semantic with tables separate | Mixed content |

### Export Formats

```javascript
// JSONL (for Pinecone, Weaviate, etc.)
const jsonl = graph.toJSONL({ chunkStrategy: 'semantic' });

// CSV (for simple vector DBs)
const csv = graph.toCSV({ chunkStrategy: 'semantic' });

// Download
const blob = new Blob([jsonl], { type: 'application/jsonl' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'rag-output.jsonl';
a.click();
```

### Complete RAG Example

```javascript
import CodbDocs, { OpenAIEmbeddingProvider } from '@codbdocs/core';

// Load and analyze
const doc = await CodbDocs.load(file);
const graph = await doc.prepare();

// Model-free query (no API key needed)
const answer = graph.askEnhanced("What are the key budget items?");

// Embedding-based RAG (for vector database storage)
const embeddings = new OpenAIEmbeddingProvider('your-api-key');
const ragOutput = await graph.toRAGWithEmbeddings(embeddings, {
  chunkStrategy: 'semantic',
  chunkSize: 1000,
  includeMetadata: true,
  includeCrossPageContext: true,
});

// Store in vector database
for (const chunk of ragOutput.chunks) {
  await vectorDB.upsert({
    id: chunk.id,
    values: chunk.embedding,
    metadata: {
      text: chunk.text,
      pageNumber: chunk.pageNumber,
      documentType: ragOutput.document.type,
      ...chunk.metadata,
    },
  });
}
```

---

## PDF Creation (Round-Trip)

Generate new PDFs from the analyzed document with three fidelity levels:

```javascript
// Level 1: Content equivalent (text, images, forms, links)
const pdf1 = await graph.toPDF({ level: 1 });

// Level 2: Semantic equivalent (+ structure, reading order, accessibility)
const pdf2 = await graph.toPDF({ level: 2 });

// Level 3: Visual equivalent (+ geometry, colors, fonts, transparency)
const pdf3 = await graph.toPDF({ level: 3 });

// Download
const blob = new Blob([pdf2], { type: 'application/pdf' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'recreated-document.pdf';
a.click();
```

**Fidelity Levels:**

| Level | Name | Features | Use Case |
|-------|------|----------|----------|
| 1 | Content | Text, images, forms, links | Text extraction, content migration |
| 2 | Semantic | + Structure, reading order, accessibility | Screen readers, semantic web |
| 3 | Visual | + Geometry, colors, fonts, transparency | Visual reproduction, printing |

---

## Advanced Features

### Digital Signatures

```javascript
const signatures = graph.getSignatures(1);
// → [{ id, fieldName, reason, location, subFilter, hashAlgorithm, signingTime }]

const summary = graph.getSignatureSummary();
// → { count, hasSignatures, algorithms: ['SHA-256'], signers: [...] }
```

### Optional Content Groups (Layers)

```javascript
const layers = graph.getOCGs();
// → [{ name, intent, usage, visible }]

const summary = graph.getOCGSummary();
// → { count, layerNames, printableLayers, viewableLayers }
```

### Embedded Files

```javascript
const files = graph.getEmbeddedFiles();
// → [{ name, description, mimeType, size, creationDate }]

const summary = graph.getEmbeddedFilesSummary();
// → { count, totalSize, totalSizeFormatted, byType }
```

### Actions

```javascript
const actions = graph.getActions();
// → [{ type, trigger, action: { type, destination/url/script } }]

const summary = graph.getActionsSummary();
// → { hasJavaScript, hasNavigation, hasFormActions }
```

### XObject Reuse Tracking

```javascript
const reuse = graph.getXObjectReuse();
// → { total, reusedCount, reuseRatio, reusedXObjects }

const summary = graph.getXObjectSummary();
// → { totalXObjects, reusedXObjects, reuseRatio: '33.3%' }
```

### Incremental Revisions

```javascript
const revisions = graph.getRevisions();
// → [{ version, type, creationDate, producer, creator }]

const summary = graph.getRevisionsSummary();
// → { count, hasMultipleRevisions, producers, creators }
```

### Graphics State

```javascript
const graphics = graph.getGraphicsStateSummary(1);
// → { uniqueTransforms, strokeColors, fillColors, hasTransparency, hasClipping }
```

### Document Health / Diagnosis

```javascript
const health = graph.diagnose();
// → {
//   score: 85,
//   pageCount: 24,
//   issues: { scannedPages: 2, brokenTextPages: 0, watermarks: 1, ... },
//   ragReadiness: { score: 78, searchable: true, needsOCR: false },
//   recommendations: [{ type: 'ocr', priority: 'high', description: '...' }]
// }
```

### Normalization / Repair

```javascript
const repairs = graph.normalize({
  fixHyphenation: true,
  fixLigatures: true,
  deduplicate: true,
  tables: true,
});
// → { success: true, repairs: [...], repairCount: 8 }
```

---

## Configuration

```javascript
CodbDocs.configure({
  // OCR settings
  ocrScale: 2,              // Render scale before OCR (default: 2)
  ocrLang: 'eng',           // Tesseract language code (default: 'eng')
  qualityThreshold: 0.5,    // Below this, use OCR (default: 0.5)

  // Analysis settings
  enableBrain: true,        // Enable Document Brain (default: true)
  enableContent: true,      // Enable content-aware analysis (default: true)
  enableVisual: false,      // Enable canvas visual analysis (default: false)

  // Performance
  useWorkers: true,         // Use Web Workers (default: true)
  concurrency: 4,           // Number of concurrent workers (default: 4)
});
```

---

## Large PDFs (900+ Pages)

For large documents, use batched processing to prevent memory issues:

```javascript
const graph = await doc.analyzeBatched({
  batchSize: 25,           // Smaller batches = less memory
  ocr: false,              // Skip OCR if not needed (huge memory save)
  extractExtended: false,  // Skip glyphs/marked content if not needed
  extractVectors: true,
  onBatchComplete: ({ completed, total }) => {
    console.log(`${completed}/${total} pages`);
  }
});
```

**Memory Optimization Tips:**
- Set `ocr: false` if documents have native text
- Set `extractExtended: false` if you don't need signatures/layers
- Reduce `batchSize` for very large documents
- Call `doc.destroy()` when done

---

## File Structure

```
codbdocs/
├── vendor/                      ← Local PDF.js + Tesseract.js (no CDN)
│   ├── pdf.js/
│   │   ├── pdf.min.js
│   │   └── pdf.worker.min.js
│   └── tesseract.js/
│       └── tesseract.min.js
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── index.js         ← Main engine + CodbDoc class
│   │   │   ├── brain.js         ← Document Brain (spatial, structure, metadata)
│   │   │   ├── content.js       ← Content-aware layer (blocks, entities)
│   │   │   ├── layers.js        ← Semantic layers + DocumentGraph
│   │   │   ├── pdfir.js         ← PDF-IR core + HTML export
│   │   │   ├── query.js         ← Natural language query + ask()
│   │   │   ├── rag.js           ← RAG module (chunks, embeddings, export)
│   │   │   ├── concepts.js      ← Concept graph + retrieval engine + reasoning
│   │   │   ├── extended.js      ← Metadata, navigation, security, glyphs
│   │   │   ├── graphics.js      ← Graphics state + color management
│   │   │   ├── pdfcreator.js    ← Round-trip PDF generation
│   │   │   ├── advanced.js      ← Signatures, OCG, files, actions
│   │   │   ├── quality.js       ← Text quality, diagnosis, normalization
│   │   │   ├── edgecases.js     ← Rotation, glyphs, forms, footnotes
│   │   │   └── workers.js       ← OffscreenCanvas + Web Workers
│   │   ├── dist/
│   │   │   └── codbdocs.js      ← UMD browser build (drop-in <script>)
│   │   └── package.json
│   └── react/
│       ├── src/index.js         ← useCodbDocs() hook
│       └── package.json
├── examples/
│   ├── vanilla/index.html       ← Full demo with all features
│   ├── react/App.jsx            ← React example
│   └── test-suite.html          ← Automated test suite (27 tests)
├── README.md                    ← This file
├── USAGE.md                     ← Comprehensive API documentation
├── review.txt                   ← Design document
└── package.json                 ← npm workspaces root
```

---

## API Reference

### CodbDocs Class

| Method | Description |
|--------|-------------|
| `CodbDocs.load(source)` | Load a PDF from File, Blob, ArrayBuffer, Uint8Array, or URL |
| `CodbDocs.configure(options)` | Set global configuration |
| `CodbDocs.canUseWorkers()` | Check if Web Workers are available |

### CodbDoc Instance

| Method | Description |
|--------|-------------|
| `doc.analyze(options)` | Run full 3-layer analysis pipeline |
| `doc.prepare(options)` | Batteries-included analysis (same as analyze with all options) |
| `doc.analyzeBatched(options)` | Process in batches for large PDFs |
| `doc.extractText(options)` | Quick text-only extraction |
| `doc.renderPage(pageNum, scale)` | Render page to canvas |
| `doc.destroy()` | Clean up and free memory |

### DocumentGraph (from `doc.analyze()`)

| Method | Description |
|--------|-------------|
| `graph.query(question)` | Natural language query |
| `graph.ask(question)` | AI-like Q&A with confidence |
| `graph.askEnhanced(question)` | Enhanced Q&A with reasoning + concept graph |
| `graph.find(query)` | Search content |
| `graph.findOne(query)` | Get first match |
| `graph.getSummary()` | Document summary |
| `graph.getEntities(type?)` | Get entities |
| `graph.getBlocks(type?)` | Get content blocks |
| `graph.getDocumentType()` | Document classification |
| `graph.toJSON()` | Export as JSON |

### Retrieval Engine

| Method | Description |
|--------|-------------|
| `graph.hybridSearch(query, options?)` | BM25 + entity + structure search with evidence |
| `graph.detectIntent(query)` | Detect query intent type |
| `graph.decomposeQuery(query)` | Break complex queries into sub-queries |
| `graph.count(criteria)` | COUNT operator for entities |
| `graph.sum(criteria)` | SUM operator for currency values |
| `graph.max(criteria)` | MAX operator for currency values |
| `graph.min(criteria)` | MIN operator for currency values |
| `graph.reason(query)` | Auto-detect intent and run reasoning |
| `graph.getConceptGraph()` | Get the full concept graph |
| `graph.getConcepts(type?)` | Get all concepts |
| `graph.getConceptNeighbors(id, depth?)` | Get concept neighbors |
| `graph.getConceptPath(sourceId, targetId)` | Find path between concepts |
| `graph.getConceptHubs(limit?)` | Most connected concepts |
| `graph.getCommunities()` | Connected component clusters |
| `graph.getRelationships(nodeId?)` | Get relationships |
| `graph.getFingerprint()` | Get document fingerprint |

### RAG Methods

| Method | Description |
|--------|-------------|
| `graph.createChunks(options)` | Create RAG chunks |
| `graph.getCrossPageContext()` | Cross-page relationships |
| `graph.toRAG(options)` | Full RAG output |
| `graph.toRAGWithEmbeddings(provider)` | RAG with embeddings |
| `graph.toJSONL(options)` | Export as JSONL |
| `graph.toCSV(options)` | Export as CSV |
| `graph.getImages(pageNum?)` | Get extracted images with roles |
| `graph.extractAllImages(options)` | Extract all images |

### PDF-IR Methods

| Method | Description |
|--------|-------------|
| `graph.getIR()` | Get raw PDF-IR |
| `graph.toPDF(options)` | Generate PDF from IR |
| `graph.toHTML(options)` | Export as HTML |
| `graph.auditAccessibility()` | Accessibility audit |
| `graph.getAccessibilityTree()` | Accessibility tree |
| `graph.getVectors(pageNum)` | Vector graphics |
| `graph.getStructureTree(pageNum)` | Tagged PDF structure |
| `graph.getAnnotations(pageNum)` | Annotations |
| `graph.getFormFields()` | Form fields |
| `graph.getReadingOrder(pageNum)` | Reading order |

### Extended Features

| Method | Description |
|--------|-------------|
| `graph.getMetadata()` | Document metadata |
| `graph.getOutline()` | Bookmarks/TOC |
| `graph.getNamedDestinations()` | Named destinations |
| `graph.getPageLabels()` | Page labels |
| `graph.getSecurity()` | Encryption/permissions |
| `graph.getMarkedContent(pageNum)` | Tagged content |
| `graph.getArtifacts(pageNum)` | Page artifacts |
| `graph.getGlyphs(pageNum)` | Glyph-level text |
| `graph.getRemediations()` | Accessibility fixes |

### Advanced Features

| Method | Description |
|--------|-------------|
| `graph.getSignatures(pageNum)` | Digital signatures |
| `graph.getOCGs()` | Optional Content Groups |
| `graph.getEmbeddedFiles()` | Embedded files |
| `graph.getActions()` | PDF actions |
| `graph.getAppearanceStreams(pageNum)` | Form appearances |
| `graph.getXObjectReuse()` | XObject reuse tracking |
| `graph.getRevisions()` | Revision history |
| `graph.getGraphicsStateSummary(pageNum)` | Graphics state |

### Quality & Health

| Method | Description |
|--------|-------------|
| `graph.diagnose()` | Comprehensive health scan |
| `graph.normalize(options?)` | Normalize and repair document issues |
| `graph.getTextQuality(pageNum)` | Text quality analysis |
| `graph.getVisualComparison(pageNum)` | Visual vs internal comparison |
| `graph.getRepeatedElements()` | Watermarks, headers, footers |
| `graph.getRedactions(pageNum)` | Redaction detection |
| `graph.getTagValidation(pageNum)` | Tag validation |
| `graph.getRAGReadiness()` | RAG readiness score |

### Edge Cases

| Method | Description |
|--------|-------------|
| `graph.getRotationSkew(pageNum)` | Rotation and skew detection |
| `graph.getGlyphIssues(pageNum)` | Glyph encoding issues |
| `graph.getOutlinedText(pageNum)` | Outlined/stroked text |
| `graph.getFlattenedForms(pageNum)` | Flattened form fields |
| `graph.getCheckboxes(pageNum)` | Checkbox detection |
| `graph.getFootnotes(pageNum)` | Footnote detection |
| `graph.getLanguage(pageNum)` | Language detection |
| `graph.getCrossPageTables()` | Cross-page table recognition |
| `graph.associateCaptions(pageNum)` | Caption-image association |

---

## Browser Support

- Chrome 66+
- Firefox 60+
- Safari 11.1+
- Edge 79+

Requires:
- WebAssembly support
- OffscreenCanvas (for workers)
- Promise support

---

## What This Is Not

CodbDocs is the **extraction + understanding layer**. "Ask questions about this document" using an LLM (RAG) is a separate concern that needs a backend. But `graph.toJSON()` and `graph.toRAG()` give you everything you need to feed into any RAG pipeline, vector database, or search index.

For the retrieval engine specifically: CodbDocs handles the **exact factual lookup** portion of RAG very well (entity extraction, table queries, relationship traversal). For **semantic paraphrasing** ("tell me about the funding situation"), you'll still want an embedding model or an LLM. The recommended architecture is:

1. Use CodbDocs for extraction + concept graph + fingerprinting
2. Use CodbDocs' hybrid search for factual queries
3. Optionally add embeddings for semantic similarity
4. Pass context to an LLM for natural language generation

---

## Documentation

- **[USAGE.md](USAGE.md)** — Comprehensive API documentation with examples
- **[review.txt](review.txt)** — Full design document (2062 lines)

---

## Hosting

Everything under `packages/*/dist` is a plain browser-ready `.js` file. Push to GitHub, turn on GitHub Pages, and `codbdocs.js` is a stable URL any site can use — no build step required.

**CDN URL:**
```
https://cdn.jsdelivr.net/gh/CityofDaytonaBeach/codbdocs@main/packages/core/dist/codbdocs.js
```

---

## Credits

Developed by the **City of Daytona Beach**.

**Lead Developer:** Daniel Gurczynski

---

## License

MIT
