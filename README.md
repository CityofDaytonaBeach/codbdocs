# CodbDocs

**A complete browser-based PDF document processing library with offline AI understanding, full RAG support, and round-trip PDF creation.**

No server. No CDN. No external APIs. Pure browser JavaScript.

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
| **Full RAG Support** | Generates chunks, embeddings, and structured output for any vector database. |
| **Round-Trip PDF** | Reconstruct PDFs from the intermediate representation with 3 fidelity levels. |
| **900+ Pages** | Batch processing mode handles large documents without memory issues. |

---

## What Makes This Different

| Feature | pdf.js | Tesseract.js | Adobe API | CodbDocs |
|---------|--------|--------------|-----------|----------|
| Text extraction | ✅ | ✅ | ✅ | ✅ |
| OCR fallback | ❌ | ✅ | ✅ | ✅ |
| Document structure | ❌ | ❌ | ✅ | ✅ Headings, tables, forms, lists |
| Entity extraction | ❌ | ❌ | ✅ | ✅ Dates, phones, emails, addresses |
| Page classification | ❌ | ❌ | ✅ | ✅ Cover, letter, memo, form, legal |
| Semantic query | ❌ | ❌ | ❌ | ✅ "what dates are mentioned?" |
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
│  │ • OCR with Tesseract.js                                  │  │
│  │ • Spatial layout analysis (columns, rows, alignment)     │  │
│  │ • Structure detection (tables, lists, form fields)       │  │
│  │ • Visual region analysis (headers, footers, images)      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Layer 1: PDF-Aware                                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ • Native text extraction (PDF.js)                        │  │
│  │ • Font and vector graphics                               │  │
│  │ • Images and annotations                                 │  │
│  │ • Structure trees and form fields                        │  │
│  │ • Digital signatures and encryption                      │  │
│  │ • Optional Content Groups (layers)                       │  │
│  │ • Embedded files and actions                             │  │
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
//       images: [image objects],
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
  const graph = await doc.analyze({ ocr: true });
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
          <pre>{JSON.stringify(result.query("what dates are mentioned?"), null, 2)}</pre>
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

// AI-like Q&A
const answer = graph.ask("What is the total amount?");
// → { answer: "$1,250,000", confidence: 0.92, evidence: [...] }
```

### Getting Structured Data

```javascript
// Document summary
const summary = graph.getSummary();
// → { pageCount, wordCount, pageTypes, metadata: { dates, phones, ... } }

// Entities
const dates = graph.getEntities("date");
const people = graph.getEntities("person");
const orgs = graph.getEntities("organization");

// Content blocks
const headings = graph.getBlocks("heading");
const tables = graph.getBlocks("table");
const forms = graph.getBlocks("form");

// Document type
const docType = graph.getDocumentType();
// → { type: "budget", confidence: 0.92 }
```

---

## RAG (Retrieval-Augmented Generation)

CodbDocs provides complete RAG support for AI applications.

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

### Embeddings

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
const graph = await doc.analyze({ ocr: true });

// Create embeddings
const embeddings = new OpenAIEmbeddingProvider('your-api-key');

// Generate RAG output
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

---

## Configuration

```javascript
CodbDocs.configure({
  // OCR settings
  ocrScale: 2,              // Render scale before OCR (default: 2)
  ocrLang: 'eng',           // Tesseract language code (default: 'eng')
  nativeTextMinLength: 20,  // Below this, treat as scan-only (default: 20)

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
│   │   │   ├── extended.js      ← Metadata, navigation, security, glyphs
│   │   │   ├── graphics.js      ← Graphics state + color management
│   │   │   ├── pdfcreator.js    ← Round-trip PDF generation
│   │   │   ├── advanced.js      ← Signatures, OCG, files, actions
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
| `doc.analyzeBatched(options)` | Process in batches for large PDFs |
| `doc.extractText(options)` | Quick text-only extraction |
| `doc.renderPage(pageNum, scale)` | Render page to canvas |
| `doc.destroy()` | Clean up and free memory |

### DocumentGraph (from `doc.analyze()`)

| Method | Description |
|--------|-------------|
| `graph.query(question)` | Natural language query |
| `graph.ask(question)` | AI-like Q&A with confidence |
| `graph.find(query)` | Search content |
| `graph.findOne(query)` | Get first match |
| `graph.getSummary()` | Document summary |
| `graph.getEntities(type?)` | Get entities |
| `graph.getBlocks(type?)` | Get content blocks |
| `graph.getDocumentType()` | Document classification |
| `graph.toJSON()` | Export as JSON |

### RAG Methods

| Method | Description |
|--------|-------------|
| `graph.createChunks(options)` | Create RAG chunks |
| `graph.getCrossPageContext()` | Cross-page relationships |
| `graph.toRAG(options)` | Full RAG output |
| `graph.toRAGWithEmbeddings(provider)` | RAG with embeddings |
| `graph.toJSONL(options)` | Export as JSONL |
| `graph.toCSV(options)` | Export as CSV |
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
