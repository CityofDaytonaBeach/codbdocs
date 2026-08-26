# CodbDocs Usage Guide

A comprehensive guide to using CodbDocs for browser-based document processing.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core API](#core-api)
- [Document Analysis](#document-analysis)
- [Querying Documents](#querying-documents)
- [Content-Aware Features](#content-aware-features)
- [PDF Intermediate Representation](#pdf-intermediate-representation)
- [React Integration](#react-integration)
- [Configuration](#configuration)
- [Examples](#examples)

---

## Installation

### Option 1: CDN (jsDelivr)

```html
<script src="https://cdn.jsdelivr.net/gh/CityofDaytonaBeach/codbdocs@main/packages/core/dist/codbdocs.js"></script>
```

### Option 2: Local Files

Download the files from the `vendor/` directory and include them directly:

```html
<script src="vendor/pdf.js/pdf.min.js"></script>
<script src="vendor/tesseract.js/tesseract.min.js"></script>
<script src="packages/core/dist/codbdocs.js"></script>
```

### Option 3: NPM (when published)

```bash
npm install @codbdocs/core @codbdocs/react
```

---

## Quick Start

### Basic PDF Text Extraction

```html
<script src="https://cdn.jsdelivr.net/gh/CityofDaytonaBeach/codbdocs@main/packages/core/dist/codbdocs.js"></script>

<script>
  // Load a PDF file
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    
    // Load the document
    const doc = await CodbDocs.load(file);
    
    // Extract text with OCR fallback
    const result = await doc.extractText({ ocr: true });
    
    console.log('Pages:', result.pageCount);
    console.log('Full text:', result.fullText);
    
    // Clean up
    doc.destroy();
  });
</script>
```

### Full Document Analysis

```html
<script>
  const doc = await CodbDocs.load(file);
  const graph = await doc.analyze({ ocr: true });
  
  // Get summary
  const summary = graph.getSummary();
  console.log('Word count:', summary.wordCount);
  console.log('Page types:', summary.pageTypes);
  
  // Query semantically
  const dates = graph.query("what dates are mentioned?");
  console.log('Dates found:', dates.results);
  
  // Export to JSON for RAG/search
  const json = graph.toJSON();
</script>
```

---

## Core API

### CodbDocs.load(source)

Load a PDF from various input types.

**Parameters:**
- `source`: `File | Blob | ArrayBuffer | Uint8Array | string` - The PDF source

**Returns:** `Promise<CodbDoc>`

**Examples:**
```javascript
// From file input
const doc = await CodbDocs.load(file);

// From ArrayBuffer
const doc = await CodbDocs.load(arrayBuffer);

// From URL (fetches the file first)
const doc = await CodbDocs.load('https://example.com/document.pdf');
```

### CodbDocs.configure(options)

Set global configuration options.

**Parameters:**
- `options`: `Object` - Configuration options (see [Configuration](#configuration))

**Example:**
```javascript
CodbDocs.configure({
  ocrScale: 2,
  enableBrain: true,
  enableContent: true
});
```

### CodbDocs.canUseWorkers()

Check if Web Workers are available in the current environment.

**Returns:** `boolean`

```javascript
if (CodbDocs.canUseWorkers()) {
  console.log('Web Workers available');
}
```

---

## Document Analysis

### doc.analyze(options)

Run the full 3-layer analysis pipeline.

**Parameters:**
- `options`: `Object`
  - `ocr`: `boolean` (default: `true`) - Enable OCR for scanned pages
  - `visual`: `boolean` (default: `false`) - Enable visual analysis (slower)
  - `extractVectors`: `boolean` (default: `true`) - Extract vector graphics
  - `onProgress`: `Function` - Progress callback
  - `onPageComplete`: `Function` - Page completion callback
  - `onLayer`: `Function` - Layer analysis callback

**Returns:** `Promise<DocumentGraph>`

**Example:**
```javascript
const graph = await doc.analyze({
  ocr: true,
  visual: true,
  onProgress: ({ page, total, status }) => {
    console.log(`Page ${page}/${total}: ${status}`);
  }
});
```

### doc.extractText(options)

Quick text-only extraction without full analysis.

**Parameters:**
- `options`: `Object`
  - `ocr`: `boolean` (default: `true`) - Enable OCR
  - `onProgress`: `Function` - Progress callback

**Returns:** `Promise<{ pageCount, pages, fullText }>`

```javascript
const result = await doc.extractText({ ocr: true });
console.log(result.fullText);
```

### doc.renderPage(pageNum, scale)

Render a page to a canvas element.

**Parameters:**
- `pageNum`: `number` - Page number (1-indexed)
- `scale`: `number` (default: `1`) - Render scale

**Returns:** `Promise<HTMLCanvasElement>`

```javascript
const canvas = await doc.renderPage(1, 2); // Page 1, 2x scale
document.body.appendChild(canvas);
```

### doc.destroy()

Clean up the PDF document and free memory.

```javascript
doc.destroy();
```

---

## Querying Documents

### graph.query(question)

Query the document using natural language.

**Parameters:**
- `question`: `string` - Natural language question

**Returns:** `Object` - `{ type: string, results: Array }`

**Supported queries:**
- "what dates are mentioned?"
- "find all phone numbers"
- "what emails are in the document?"
- "find all addresses"
- "what amounts are mentioned?"
- "find all tables"
- "what form fields are present?"
- "what is this document about?"

```javascript
const dates = graph.query("what dates are mentioned?");
// Returns: { type: 'dates', results: [{ raw: '01/15/2024', position: 123 }, ...] }

const phones = graph.query("find all phone numbers");
// Returns: { type: 'phones', results: [{ raw: '(386) 555-0123', position: 456 }, ...] }
```

### graph.getSummary()

Get a summary of the document.

**Returns:** `Object`
```javascript
{
  pageCount: 5,
  wordCount: 1234,
  pageTypes: { letter: 2, memo: 3 },
  metadata: {
    dates: 12,
    phones: 3,
    emails: 5,
    addresses: 2,
    amounts: 8
  },
  headings: ['Introduction', 'Background', 'Conclusion'],
  tableCount: 2,
  formCount: 1,
  listCount: 3
}
```

### graph.toJSON()

Export the full document graph as JSON for RAG, search, or storage.

**Returns:** `Object` - Complete document structure

```javascript
const json = graph.toJSON();
// Send to backend for RAG processing
await fetch('/api/index', {
  method: 'POST',
  body: JSON.stringify(json)
});
```

---

## Content-Aware Features

The Document Brain analyzes content through multiple layers to understand document structure.

### Semantic Layers

| Layer | Description | Example Output |
|-------|-------------|----------------|
| **Spatial** | Column detection, row grouping, text flow | 2 columns, left-aligned flow |
| **Structure** | Tables, lists, form fields, paragraphs | 3 tables, 12 form fields |
| **Metadata** | Dates, phones, emails, addresses, amounts | $1,250,000, (386) 555-0123 |
| **Classification** | Page type + confidence | 'legal' (0.87) |
| **Visual** | Header/footer detection, image regions | has images, has header text |

### graph.find(query)

Search the content graph.

**Parameters:**
- `query`: `string | Object` - Text to search or `{ type: "entity_type" }`

**Returns:** `Array<ContentBlock>`

```javascript
// Text search
const results = graph.find("budget");

// Type search
const dates = graph.find({ type: "date" });
```

### graph.findOne(query)

Get the first matching result.

```javascript
const firstDate = graph.findOne({ type: "date" });
```

### graph.ask(question)

Natural language Q&A with confidence scoring.

**Parameters:**
- `question`: `string` - Natural language question

**Returns:** `Object` - `{ answer, confidence, evidence }`

```javascript
const answer = graph.ask("What is this document about?");
// Returns: {
//   answer: "This is a budget proposal for fiscal year 2024...",
//   confidence: 0.85,
//   evidence: ["budget", "fiscal year", "2024", "proposal"]
// }
```

### graph.getEntities(type?)

Get all entities, optionally filtered by type.

**Parameters:**
- `type`: `string` (optional) - Entity type filter

**Returns:** `Array<Entity>`

**Entity types:**
- `PERSON`, `ORGANIZATION`, `DATE`, `CURRENCY`
- `PHONE`, `EMAIL`, `ADDRESS`, `URL`
- `ZIP_CODE`, `INVOICE_NUMBER`, `PERMIT_NUMBER`
- `RESOLUTION_NUMBER`, `ORDINANCE_NUMBER`, `AGENDA_ITEM`

```javascript
const allEntities = graph.getEntities();
const dates = graph.getEntities("date");
```

### graph.getBlocks(type?)

Get all content blocks, optionally filtered by type.

**Block types:**
- `HEADING`, `PARAGRAPH`, `TABLE`, `LIST`
- `FORM_FIELD`, `IMAGE`, `SIGNATURE`, `CHECKBOX`
- `CHART`, `CITATION`, `QUOTE`, `CAPTION`
- `HEADER`, `FOOTER`, `WHITESPACE`

```javascript
const headings = graph.getBlocks("heading");
const tables = graph.getBlocks("table");
```

### graph.getDocumentType()

Get the document-level type classification.

**Returns:** `Object` - `{ type: string, confidence: number }`

```javascript
const docType = graph.getDocumentType();
// Returns: { type: "budget", confidence: 0.92 }
```

### graph.highlight(canvas, query, options)

Draw highlight rectangles on a canvas.

**Parameters:**
- `canvas`: `HTMLCanvasElement` - Target canvas
- `query`: `string | Object` - What to highlight
- `options`: `Object` (optional) - `{ color: '#ff0', padding: 2 }`

```javascript
const canvas = await doc.renderPage(1);
graph.highlight(canvas, "budget", { color: '#ffff00' });
```

### graph.getHighlights(query, options)

Get highlight annotation objects without drawing.

**Returns:** `Array<HighlightAnnotation>`

---

## PDF Intermediate Representation

The PDF-IR provides low-level access to PDF structure and enables advanced features.

### graph.getIR()

Get the raw PDF Intermediate Representation.

```javascript
const ir = graph.getIR();
console.log(ir.pages); // All pages
console.log(ir.vectors); // All vectors
```

### graph.auditAccessibility()

Run an accessibility audit on the PDF.

**Returns:** `Object` - `{ score, issues, summary }`

```javascript
const audit = graph.auditAccessibility();
console.log('Accessibility score:', audit.score);
console.log('Issues:', audit.issues);
```

### graph.getAccessibilityTree()

Get the accessibility tree as nested objects.

```javascript
const tree = graph.getAccessibilityTree();
// Returns hierarchical structure for screen readers
```

### graph.toHTML(options)

Export the PDF as HTML.

**Parameters:**
- `options`: `Object`
  - `mode`: `'visual' | 'accessible' | 'intelligent'` (default: `'visual'`)

```javascript
// Visual mode - preserves layout
const html = graph.toHTML({ mode: 'visual' });

// Accessible mode - semantic HTML for screen readers
const html = graph.toHTML({ mode: 'accessible' });

// Intelligent mode - best effort semantic + visual
const html = graph.toHTML({ mode: 'intelligent' });
```

### graph.getVectors(pageNum)

Get vectors/shapes for a specific page.

**Returns:** `Array<Vector>`

```javascript
const vectors = graph.getVectors(1);
// Each vector: { type, bbox, strokeColor, fillColor, ... }
```

### graph.getStructureTree(pageNum)

Get the tagged PDF structure tree.

**Returns:** `Object | null`

```javascript
const tree = graph.getStructureTree(1);
// Returns structure tree if PDF is tagged
```

### graph.getAnnotations(pageNum)

Get PDF annotations for a page.

**Returns:** `Array<Annotation>`

```javascript
const annotations = graph.getAnnotations(1);
// Includes highlights, links, form fields, etc.
```

### graph.getFormFields()

Get all AcroForm fields.

**Returns:** `Array<FormField>`

```javascript
const fields = graph.getFormFields();
// Each field: { name, type, value, bbox, ... }
```

### graph.getReadingOrder(pageNum)

Get reading order objects with indices.

**Returns:** `Array<ReadingOrderItem>`

```javascript
const order = graph.getReadingOrder(1);
// Returns items with indices for screen readers
```

### graph.getReadingOrderSequence(pageNum)

Get reading order as flat ID list.

**Returns:** `Array<string>`

```javascript
const sequence = graph.getReadingOrderSequence(1);
// Returns: ['text_1', 'text_2', 'image_1', ...]
```

---

## RAG (Retrieval-Augmented Generation)

CodbDocs provides full RAG support for AI applications.

### Image Extraction

Extract images from PDFs for visual RAG.

```javascript
// Extract all images from document
const images = await graph.extractAllImages({
  format: 'png',
  quality: 0.92,
  scale: 1,
  extractThumbnails: true,
  thumbnailSize: 150,
});

// Get images for specific page
const pageImages = graph.getImages(1);

// Each image contains:
// {
//   id: 'page_1_img_0',
//   name: 'img_p1_i0',
//   pageNumber: 1,
//   width: 800,
//   height: 600,
//   bbox: { x: 50, y: 100, width: 200, height: 150 },
//   dataUrl: 'data:image/png;base64,...',
//   thumbnail: { dataUrl: '...', width: 150, height: 112 }
// }
```

### Smart Chunking

Create optimized chunks for vector databases.

```javascript
const chunks = graph.createChunks({
  strategy: 'semantic',  // 'fixed' | 'semantic' | 'page' | 'section' | 'table' | 'hybrid'
  chunkSize: 1000,
  chunkOverlap: 200,
  minChunkSize: 100,
  maxChunkSize: 3000,
  includeMetadata: true,
  includeBoundingBoxes: true,
});

// Each chunk:
// {
//   id: 'page_1_chunk_0',
//   text: '...',
//   pageNumber: 1,
//   chunkType: 'paragraph',
//   metadata: {
//     pageNumber: 1,
//     classification: { type: 'letter', confidence: 0.9 },
//     documentType: { type: 'business', confidence: 0.8 },
//     headings: ['Introduction', 'Summary'],
//     hasTables: true,
//     entityTypes: ['date', 'person', 'organization'],
//     relevantEntities: [...]
//   },
//   bbox: [{ x: 50, y: 100, width: 200, height: 50 }]
// }
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

### Cross-Page Context

Build relationships across pages.

```javascript
const context = graph.getCrossPageContext();

// {
//   documentType: { type: 'invoice', confidence: 0.95 },
//   globalEntities: [
//     {
//       type: 'organization',
//       text: 'City of Daytona Beach',
//       occurrences: [
//         { page: 1, position: 123, bbox: {...} },
//         { page: 3, position: 456, bbox: {...} }
//       ]
//     }
//   ],
//   entityRelationships: [
//     {
//       entities: ['organization:city of daytona beach', 'date:01/15/2024'],
//       pages: [1, 3],
//       type: 'co-occurrence'
//     }
//   ],
//   topicFlow: [
//     { topic: 'letter', startPage: 1, endPage: 2, pageCount: 2 },
//     { topic: 'form', startPage: 3, endPage: 3, pageCount: 1 }
//   ],
//   crossPageReferences: [
//     { text: 'continued on page 3', fromPage: 2, toPage: 3, type: 'reference' }
//   ],
//   documentStructure: {
//     sections: [...],
//     tables: [...],
//     forms: [...],
//     lists: [...]
//   }
// }
```

### RAG Output

Get complete RAG-ready output.

```javascript
const ragOutput = graph.toRAG({
  chunkStrategy: 'semantic',
  chunkSize: 1000,
  includeImages: false,
  includeVectors: false,
  includeMetadata: true,
  includeCrossPageContext: true,
});

// {
//   document: {
//     type: 'invoice',
//     confidence: 0.95,
//     pageCount: 5,
//     wordCount: 1234,
//     headings: [...],
//     metadata: { dates: 12, phones: 3, ... }
//   },
//   chunks: [
//     {
//       id: 'page_1_chunk_0',
//       text: '...',
//       metadata: {...},
//       bbox: [...],
//       pageNumber: 1,
//       chunkIndex: 0,
//       chunkType: 'paragraph'
//     }
//   ],
//   entities: [...],
//   relationships: [...],
//   structure: {...},
//   topicFlow: [...],
//   crossPageReferences: [...],
//   fullText: '...',
//   pages: [...]
// }
```

### Embeddings

Generate embeddings for vector databases.

```javascript
import { OpenAIEmbeddingProvider, LocalEmbeddingProvider } from '@codbdocs/core';

// OpenAI embeddings
const openaiProvider = new OpenAIEmbeddingProvider('your-api-key', {
  model: 'text-embedding-3-small',
  dimensions: 1536,
});

const ragWithEmbeddings = await graph.toRAGWithEmbeddings(openaiProvider, {
  chunkStrategy: 'semantic',
});

// Each chunk now includes:
// {
//   id: 'page_1_chunk_0',
//   text: '...',
//   embedding: [0.123, -0.456, ...]  // 1536-dimensional vector
// }

// Local embeddings (no API needed)
const localProvider = new LocalEmbeddingProvider({
  dimensions: 384,
});

const ragLocal = await graph.toRAGWithEmbeddings(localProvider);
```

**Embedding Providers:**

| Provider | Model | Dimensions | Description |
|----------|-------|------------|-------------|
| `OpenAIEmbeddingProvider` | text-embedding-3-small | 1536 | OpenAI API |
| `LocalEmbeddingProvider` | transformers.js | 384 | Browser-based (no API) |
| `CustomEmbeddingProvider` | any | any | Your own provider |

### Export Formats

Export RAG output for different vector databases.

```javascript
// JSONL format (for Pinecone, Weaviate, etc.)
const jsonl = graph.toJSONL({
  chunkStrategy: 'semantic',
});
// Returns: newline-delimited JSON

// CSV format (for simple vector DBs)
const csv = graph.toCSV({
  chunkStrategy: 'semantic',
});
// Returns: CSV with id, text, pageNumber, chunkType, embedding

// Save to file
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

// Load and analyze document
const doc = await CodbDocs.load(file);
const graph = await doc.analyze({ ocr: true });

// Create embedding provider
const embeddings = new OpenAIEmbeddingProvider('your-api-key');

// Generate RAG output with embeddings
const ragOutput = await graph.toRAGWithEmbeddings(embeddings, {
  chunkStrategy: 'semantic',
  chunkSize: 1000,
  includeMetadata: true,
  includeCrossPageContext: true,
});

// Send to vector database
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

// Also store document metadata
await vectorDB.upsert({
  id: 'doc-metadata',
  values: await embeddings.embedQuery(ragOutput.document.type),
  metadata: {
    type: 'document-metadata',
    documentType: ragOutput.document.type,
    pageCount: ragOutput.document.pageCount,
    entities: ragOutput.entities,
    relationships: ragOutput.relationships,
    topicFlow: ragOutput.topicFlow,
  },
});
```

---

## Extended Features

### Document Metadata

Extract document-level metadata from PDFs.

```javascript
const metadata = graph.getMetadata();

// Returns:
// {
//   title: 'Annual Report 2026',
//   author: 'City of Daytona Beach',
//   subject: 'Financial Report',
//   keywords: ['budget', 'finance', '2026'],
//   creator: 'Adobe Acrobat',
//   producer: 'PDF.js',
//   creationDate: '2026-01-15T10:30:00Z',
//   modificationDate: '2026-01-20T14:45:00Z',
//   language: 'en-US',
//   trapped: false,
//   custom: { ... }
// }
```

### Document Navigation

Extract bookmarks, named destinations, and page labels.

```javascript
// Bookmarks/Table of Contents
const outline = graph.getOutline();

// Returns:
// [
//   {
//     title: 'Introduction',
//     color: [0, 0, 0],
//     italic: false,
//     bold: false,
//     dest: { page: 1, kind: 'XYZ', args: [0, 700, 1] },
//     children: [
//       { title: 'Background', dest: { page: 2, ... }, children: [] }
//     ]
//   }
// ]

// Named Destinations
const destinations = graph.getNamedDestinations();

// Returns:
// {
//   'chapter1': { page: 1, kind: 'XYZ', args: [0, 700, 1] },
//   'appendix': { page: 25, kind: 'FitH', args: [700] }
// }

// Page Labels
const labels = graph.getPageLabels();

// Returns:
// [
//   { page: 1, label: 'i', style: 'lowerRoman' },
//   { page: 2, label: 'ii', style: 'lowerRoman' },
//   { page: 3, label: '1', style: 'decimal' }
// ]
```

### Security Information

Extract encryption and permissions metadata.

```javascript
const security = graph.getSecurity();

// Returns:
// {
//   encrypted: true,
//   permissions: {
//     printing: true,
//     modifying: false,
//     copying: false,
//     annotating: true,
//     fillingForms: true,
//     contentAccessibility: true,
//     documentAssembly: false,
//     highQualityPrinting: true
//   },
//   algorithm: 'AES-256'
// }
```

### Marked Content & Artifacts

Extract marked content sequences and identify artifacts.

```javascript
// Marked Content
const markedContent = graph.getMarkedContent(1);

// Returns:
// [
//   {
//     tag: 'P',
//     properties: {},
//     type: 'marked_content',
//     isArtifact: false,
//     children: []
//   }
// ]

// Artifacts (page numbers, headers, footers, etc.)
const artifacts = graph.getArtifacts(1);

// Returns:
// [
//   { tag: 'Pagination', properties: {}, type: 'pagination' },
//   { tag: 'Header', properties: {}, type: 'header' },
//   { tag: 'Footer', properties: {}, type: 'footer' }
// ]
```

### Glyph-Level Text

Extract individual glyph data with positions.

```javascript
const glyphs = graph.getGlyphs(1);

// Returns:
// [
//   {
//     unicode: 'A',
//     charCode: 65,
//     advance: 7.2,
//     transform: [12, 0, 0, 12, 100, 700],
//     font: 'Helvetica',
//     fontSize: 12,
//     bbox: [100, 700, 7.2, 12]
//   },
//   ...
// ]
```

### Accessibility Remediation

Generate suggested fixes for accessibility issues.

```javascript
const remediations = graph.getRemediations();

// Returns:
// [
//   {
//     issue: 'missing_alt_text',
//     page: 3,
//     element: 'img_42',
//     severity: 'warning',
//     fix: {
//       type: 'add_alt_text',
//       suggestedAlt: 'Company logo',
//       strategy: 'vision'
//     }
//   },
//   {
//     issue: 'missing_heading_structure',
//     page: 1,
//     severity: 'error',
//     fix: {
//       type: 'add_heading_structure',
//       suggestedStructure: [
//         { id: 'text_1', level: 1, text: 'Annual Report' }
//       ],
//       strategy: 'inference'
//     }
//   }
// ]
```

### Extended API Summary

| Method | Description |
|--------|-------------|
| `graph.getMetadata()` | Document metadata (title, author, dates, etc.) |
| `graph.getOutline()` | Bookmarks/table of contents |
| `graph.getNamedDestinations()` | Named destination mappings |
| `graph.getPageLabels()` | Page label mappings |
| `graph.getSecurity()` | Encryption and permissions |
| `graph.getMarkedContent(pageNum)` | Marked content sequences |
| `graph.getArtifacts(pageNum)` | Page artifacts (headers, footers, etc.) |
| `graph.getGlyphs(pageNum)` | Glyph-level text with positions |
| `graph.getRemediations()` | Accessibility fix suggestions |

---

## Advanced Features

### Digital Signatures

Extract and analyze digital signatures from PDFs.

```javascript
// Get signatures for a specific page
const signatures = graph.getSignatures(1);

// Returns:
// [
//   {
//     id: 'sig1',
//     type: 'signature',
//     fieldName: 'Signature1',
//     rect: [100, 100, 300, 150],
//     reason: 'Approved',
//     location: 'Daytona Beach',
//     subFilter: 'adbe.pkcs7.detached',
//     hashAlgorithm: 'SHA-256',
//     signingTime: '2026-01-15T10:30:00Z',
//     signedData: {
//       hasByteRange: true,
//       contentLength: 2048
//     }
//   }
// ]

// Get signature summary
const sigSummary = graph.getSignatureSummary();
// Returns:
// {
//   count: 2,
//   hasSignatures: true,
//   signed: 1,
//   certifications: 1,
//   algorithms: ['SHA-256'],
//   signers: [
//     { name: 'Signature1', time: '2026-01-15T10:30:00Z', reason: 'Approved' }
//   ]
// }
```

### Optional Content Groups (Layers)

Extract and analyze PDF layers (Optional Content Groups).

```javascript
// Get all OCGs (layers)
const ocgs = graph.getOCGs();

// Returns:
// [
//   {
//     id: 'ocg_1',
//     name: 'Text Layer',
//     intent: 'View',
//     usage: {
//       print: { category: 'ON' },
//       view: { category: 'ON' },
//       export: { category: 'ON' }
//     },
//     visible: true
//   }
// ]

// Get OCG summary
const ocgSummary = graph.getOCGSummary();
// Returns:
// {
//   count: 3,
//   hasLayers: true,
//   layerNames: ['Text Layer', 'Images', 'Annotations'],
//   intents: ['View', 'Design'],
//   printableLayers: 2,
//   viewableLayers: 3
// }
```

### Embedded Files

Extract embedded files from PDFs.

```javascript
// Get embedded files
const files = graph.getEmbeddedFiles();

// Returns:
// [
//   {
//     id: 'emb_1',
//     name: 'report.xlsx',
//     description: 'Financial report data',
//     mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     size: 102400,
//     creationDate: '2026-01-10T09:00:00Z',
//     modDate: '2026-01-15T14:30:00Z',
//     hasData: true
//   }
// ]

// Get embedded files summary
const filesSummary = graph.getEmbeddedFilesSummary();
// Returns:
// {
//   count: 2,
//   hasEmbeddedFiles: true,
//   totalSize: 153600,
//   totalSizeFormatted: '150 KB',
//   byType: { xlsx: 1, pdf: 1 },
//   files: [
//     { name: 'report.xlsx', size: 102400, sizeFormatted: '100 KB', mimeType: '...' },
//     { name: 'appendix.pdf', size: 51200, sizeFormatted: '50 KB', mimeType: '...' }
//   ]
// }
```

### Actions Subsystem

Extract PDF actions (navigation, JavaScript, form submissions).

```javascript
// Get all actions
const actions = graph.getActions();

// Returns:
// [
//   {
//     type: 'Document',
//     trigger: 'OpenAction',
//     action: {
//       type: 'GoTo',
//       destination: { page: 1, kind: 'XYZ', args: [0, 700, 1] }
//     }
//   },
//   {
//     type: 'Annotation',
//     page: 2,
//     fieldName: 'SubmitButton',
//     trigger: 'click',
//     action: {
//       type: 'SubmitForm',
//       url: 'https://example.com/submit',
//       fields: ['field1', 'field2']
//     }
//   }
// ]

// Get actions summary
const actionsSummary = graph.getActionsSummary();
// Returns:
// {
//   count: 5,
//   hasActions: true,
//   byType: { GoTo: 3, JavaScript: 1, SubmitForm: 1 },
//   hasJavaScript: true,
//   hasNavigation: true,
//   hasFormActions: true,
//   documentActions: [...],
//   pageActions: [...],
//   annotationActions: [...]
// }
```

### Appearance Streams

Extract appearance streams from form fields and annotations.

```javascript
// Get appearance streams for a page
const appearances = graph.getAppearanceStreams(1);

// Returns:
// [
//   {
//     id: 'field_1',
//     fieldName: 'Signature1',
//     type: 'Widget',
//     appearances: {
//       normal: { type: 'single', hasData: true, size: 1024 },
//       rollover: { type: 'single', hasData: true, size: 1024 },
//       down: { type: 'single', hasData: true, size: 1024 }
//     },
//     currentAppearance: 'normal'
//   }
// ]

// Get appearance streams summary
const appearanceSummary = graph.getAppearanceStreamsSummary();
// Returns:
// {
//   count: 10,
//   hasAppearanceStreams: true,
//   withNormalAppearance: 10,
//   withRolloverAppearance: 3,
//   withDownAppearance: 2,
//   types: ['Widget', 'Stamp', 'Ink']
// }
```

### XObject Reuse Tracking

Track XObject references and reuse patterns.

```javascript
// Get XObject reuse info
const xobjReuse = graph.getXObjectReuse();

// Returns:
// {
//   total: 15,
//   reusedCount: 5,
//   uniqueCount: 10,
//   reuseRatio: 0.333,
//   xobjects: [
//     {
//       id: 'xobj_1',
//       type: 'Form',
//       pages: [1, 3, 5],
//       usageCount: 3
//     }
//   ],
//   byType: { Form: 8, Image: 7 },
//   reusedXObjects: [
//     { id: 'xobj_1', type: 'Form', usageCount: 3, pages: [1, 3, 5] }
//   ]
// }

// Get XObject summary
const xobjSummary = graph.getXObjectSummary();
// Returns:
// {
//   totalXObjects: 15,
//   reusedXObjects: 5,
//   uniqueXObjects: 10,
//   reuseRatio: '33.3%',
//   mostUsed: [
//     { id: 'xobj_1', type: 'Form', usageCount: 3 },
//     { id: 'xobj_2', type: 'Image', usageCount: 2 }
//   ]
// }
```

### Incremental Revisions

Extract revision history from incremental PDFs.

```javascript
// Get revisions
const revisions = graph.getRevisions();

// Returns:
// [
//   {
//     version: 1,
//     type: 'original',
//     creationDate: '2026-01-10T09:00:00Z',
//     modDate: '2026-01-15T14:30:00Z',
//     producer: 'Adobe Acrobat',
//     creator: 'Microsoft Word'
//   },
//   {
//     version: 2,
//     type: 'incremental',
//     xrefOffset: 12345
//   }
// ]

// Get revisions summary
const revisionsSummary = graph.getRevisionsSummary();
// Returns:
// {
//   count: 2,
//   hasMultipleRevisions: true,
//   versions: [
//     { version: 1, type: 'original', creationDate: '...', modDate: '...' },
//     { version: 2, type: 'incremental' }
//   ],
//   producers: ['Adobe Acrobat'],
//   creators: ['Microsoft Word']
// }
```

### Graphics State

Extract and analyze PDF graphics state including transforms, colors, and transparency.

```javascript
// Get graphics state summary for a page
const graphicsSummary = graph.getGraphicsStateSummary(1);

// Returns:
// {
//   uniqueTransforms: 5,
//   strokeColors: [
//     { colorSpace: 'DeviceRGB', color: [0, 0, 0], rgb: [0, 0, 0] },
//     { colorSpace: 'DeviceCMYK', color: [0, 0, 0, 100], rgb: [0, 0, 0] }
//   ],
//   fillColors: [
//     { colorSpace: 'DeviceRGB', color: [1, 0, 0], rgb: [255, 0, 0] }
//   ],
//   hasTransparency: true,
//   hasClipping: false,
//   hasPatterns: false,
//   lineStyles: ['butt-miter-1', 'round-bevel-2']
// }
```

**Color Spaces Supported:**
- `DeviceRGB` - RGB color space
- `DeviceCMYK` - CMYK color space
- `DeviceGray` - Grayscale
- `ICCBased` - ICC profile-based
- `CalGray` - Calibrated gray
- `CalRGB` - Calibrated RGB
- `Lab` - Lab color space
- `Separation` - Separation color space
- `DeviceN` - DeviceN color space
- `Indexed` - Indexed color space
- `Pattern` - Pattern color space

**Color Conversion Utilities:**
```javascript
import { cmykToRgb, rgbToCmyk, labToRgb, toRgb } from '@codbdocs/core';

// Convert CMYK to RGB
const rgb = cmykToRgb(0, 100, 100, 0); // [255, 0, 0] (red)

// Convert RGB to CMYK
const cmyk = rgbToCmyk(255, 0, 0); // [0, 100, 100, 0]

// Convert Lab to RGB
const labRgb = labToRgb(50, 0, 0); // [118, 118, 118]

// Convert any color to RGB based on color space
const anyRgb = toRgb([0, 100, 100, 0], 'DeviceCMYK'); // [255, 0, 0]
```

### PDF Creation (Round-Trip)

Generate PDFs from the PDF-IR with three fidelity levels.

```javascript
import { PDFCreator, createPDF, createTextPDF } from '@codbdocs/core';

// Level 1: Content equivalent (text, images, forms, links)
const pdfBytes1 = await graph.toPDF({ level: 1 });

// Level 2: Semantic equivalent (structure, reading order, accessibility)
const pdfBytes2 = await graph.toPDF({ level: 2 });

// Level 3: Visual equivalent (geometry, colors, fonts, transparency)
const pdfBytes3 = await graph.toPDF({ level: 3 });

// Create minimal PDF from text
const textPdf = await createTextPDF(
  ['Page 1 content', 'Page 2 content'],
  { metadata: { title: 'My Document' } }
);

// Download the PDF
const blob = new Blob([pdfBytes2], { type: 'application/pdf' });
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

### Advanced API Summary

| Method | Description |
|--------|-------------|
| `graph.getSignatures(pageNum)` | Digital signatures on a page |
| `graph.getSignatureSummary()` | Signature statistics |
| `graph.getOCGs()` | Optional Content Groups (layers) |
| `graph.getOCGSummary()` | OCG statistics |
| `graph.getEmbeddedFiles()` | Embedded files |
| `graph.getEmbeddedFilesSummary()` | Embedded file statistics |
| `graph.getActions()` | PDF actions |
| `graph.getActionsSummary()` | Action statistics |
| `graph.getAppearanceStreams(pageNum)` | Appearance streams |
| `graph.getAppearanceStreamsSummary()` | Appearance statistics |
| `graph.getXObjectReuse()` | XObject reuse tracking |
| `graph.getXObjectSummary()` | XObject statistics |
| `graph.getRevisions()` | Incremental revision history |
| `graph.getRevisionsSummary()` | Revision statistics |
| `graph.getGraphicsStateSummary(pageNum)` | Graphics state analysis |
| `graph.toPDF(options)` | Generate PDF from IR |

---

## React Integration

### useCodbDocs Hook

```jsx
import { useCodbDocs } from '@codbdocs/react';

function DocumentProcessor() {
  const { run, status, progress, result, error } = useCodbDocs({ ocr: true });

  return (
    <div>
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={(e) => e.target.files[0] && run(e.target.files[0])} 
      />

      {status === 'loading' && <p>Loading...</p>}
      {status === 'processing' && progress && (
        <p>Page {progress.page}/{progress.total}: {progress.status}</p>
      )}
      {error && <p>Error: {String(error)}</p>}

      {result && (
        <div>
          <h2>Results</h2>
          <p>{result.getSummary().wordCount} words</p>
          <p>{result.getSummary().pageCount} pages</p>
          
          <h3>Query Results</h3>
          <pre>{JSON.stringify(result.query("what dates are mentioned?"), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### Hook Options

```javascript
const { run, status, progress, result, error } = useCodbDocs({
  ocr: true,                    // Enable OCR (default: true)
  onPageComplete: (page) => {}  // Called after each page
});
```

### Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `run` | `(source) => Promise<DocumentGraph>` | Load and analyze a file |
| `status` | `'idle' \| 'loading' \| 'processing' \| 'done' \| 'error'` | Current status |
| `progress` | `{ page, total, status, progress? }` | Progress info |
| `result` | `DocumentGraph \| null` | Analysis result |
| `error` | `Error \| null` | Error if failed |

---

## Configuration

### Global Configuration

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

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ocrScale` | `number` | `2` | Scale factor for OCR rendering |
| `ocrLang` | `string` | `'eng'` | Tesseract language code |
| `nativeTextMinLength` | `number` | `20` | Minimum native text length before OCR |
| `enableBrain` | `boolean` | `true` | Enable spatial/structure/metadata analysis |
| `enableContent` | `boolean` | `true` | Enable content-aware analysis |
| `enableVisual` | `boolean` | `false` | Enable canvas visual analysis |
| `useWorkers` | `boolean` | `true` | Use Web Workers for processing |
| `concurrency` | `number` | `4` | Number of concurrent workers |

---

## Examples

### Complete Example: Document Analyzer

```html
<!DOCTYPE html>
<html>
<head>
  <title>Document Analyzer</title>
</head>
<body>
  <h1>CodbDocs Document Analyzer</h1>
  
  <input type="file" id="fileInput" accept=".pdf" />
  <button id="analyzeBtn">Analyze</button>
  
  <div id="results"></div>

  <script src="https://cdn.jsdelivr.net/gh/CityofDaytonaBeach/codbdocs@main/packages/core/dist/codbdocs.js"></script>
  
  <script>
    let currentDoc = null;
    
    document.getElementById('analyzeBtn').addEventListener('click', async () => {
      const file = document.getElementById('fileInput').files[0];
      if (!file) return;
      
      // Clean up previous document
      if (currentDoc) currentDoc.destroy();
      
      try {
        // Load and analyze
        currentDoc = await CodbDocs.load(file);
        const graph = await currentDoc.analyze({ ocr: true });
        
        // Get results
        const summary = graph.getSummary();
        const dates = graph.query("what dates are mentioned?");
        const phones = graph.query("find all phone numbers");
        const docType = graph.getDocumentType();
        
        // Display results
        document.getElementById('results').innerHTML = `
          <h2>Analysis Results</h2>
          <p><strong>Document Type:</strong> ${docType.type} (${Math.round(docType.confidence * 100)}%)</p>
          <p><strong>Pages:</strong> ${summary.pageCount}</p>
          <p><strong>Words:</strong> ${summary.wordCount}</p>
          
          <h3>Dates Found</h3>
          <ul>
            ${dates.results.map(d => `<li>${d.raw}</li>`).join('')}
          </ul>
          
          <h3>Phone Numbers</h3>
          <ul>
            ${phones.results.map(p => `<li>${p.raw}</li>`).join('')}
          </ul>
          
          <h3>Full Text</h3>
          <pre style="max-height: 400px; overflow: auto;">
            ${graph.text.getPageText(1)}
          </pre>
        `;
        
      } catch (err) {
        alert('Error: ' + err.message);
      }
    });
  </script>
</body>
</html>
```

### React Example: Document Viewer

```jsx
import React, { useState } from 'react';
import { useCodbDocs } from '@codbdocs/react';

export default function DocumentViewer() {
  const { run, status, progress, result, error } = useCodbDocs({ ocr: true });
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  const handleQuery = () => {
    if (result && query) {
      setQueryResult(result.query(query));
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Document Viewer</h1>
      
      <input 
        type="file" 
        accept=".pdf" 
        onChange={(e) => e.target.files[0] && run(e.target.files[0])} 
      />

      {status === 'processing' && (
        <div>
          <p>Processing: Page {progress.page}/{progress.total}</p>
          <p>Status: {progress.status}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{String(error)}</p>}

      {result && (
        <div>
          <h2>Summary</h2>
          <p>{result.getSummary().wordCount} words, {result.getSummary().pageCount} pages</p>
          
          <h2>Query Document</h2>
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about the document..."
          />
          <button onClick={handleQuery}>Search</button>
          
          {queryResult && (
            <pre>{JSON.stringify(queryResult, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## Troubleshooting

### Common Issues

**1. OCR not working**
- Ensure Tesseract.js is loaded
- Check browser console for errors
- Try increasing `ocrScale` for better recognition

**2. Large files are slow**
- Reduce `ocrScale` (default: 2, try 1.5)
- Disable `enableVisual` if not needed
- Use `extractText()` instead of `analyze()` for quick extraction

**3. Memory issues**
- Always call `doc.destroy()` when done
- Process pages one at a time if needed
- Consider chunking large documents

**4. Worker errors**
- Check if Web Workers are supported: `CodbDocs.canUseWorkers()`
- Disable workers: `CodbDocs.configure({ useWorkers: false })`

### Browser Support

- Chrome 66+
- Firefox 60+
- Safari 11.1+
- Edge 79+

Requires:
- WebAssembly support
- OffscreenCanvas (for workers)
- Promise support

---

## Credits

Developed by the **City of Daytona Beach**.

**Lead Developer:** Daniel Gurczynski

## License

MIT
