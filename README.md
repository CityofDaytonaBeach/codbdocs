# CodbDocs

A browser document-processing engine with **offline AI understanding**.
Pull text from PDFs with **PDF.js**, OCR scanned pages with **Tesseract.js**,
then let the **Document Brain** analyze structure, extract entities, and
classify content — all without a server, CDN, or external API.

```
CodbDocs
   │
@codbdocs/core        ← the engine + Document Brain
   │
   ├── @codbdocs/react     ← useCodbDocs() hook
   └── (vanilla JS / any framework via dist/codbdocs.js)
```

## What makes this different

| Feature | Traditional PDF tools | CodbDocs |
|---------|----------------------|----------|
| Text extraction | ✅ | ✅ |
| OCR fallback | ✅ | ✅ |
| Document structure | ❌ | ✅ Headings, tables, forms, lists |
| Entity extraction | ❌ | ✅ Dates, phones, emails, addresses |
| Page classification | ❌ | ✅ Cover, letter, memo, form, legal, etc. |
| Semantic query | ❌ | ✅ "what dates are mentioned?" |
| Offline operation | ❌ | ✅ No server, no CDN, no API keys |
| Framework-agnostic | Varies | ✅ Core is pure JS, React hook available |

## Quick start — no build, no CDN

```html
<!-- Load from local vendor/ (no external CDN needed) -->
<script src="vendor/pdf.js/pdf.min.js"></script>
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.js/pdf.worker.min.js";
</script>
<script src="vendor/tesseract.js/tesseract.min.js"></script>
<script src="packages/core/dist/codbdocs.js"></script>

<script>
  const doc = await CodbDocs.load(file);
  const graph = await doc.analyze({ ocr: true });

  // Query like an AI
  console.log(graph.query("what dates are mentioned?"));
  console.log(graph.query("find all form fields"));
  console.log(graph.query("what is this document about?"));
  console.log(graph.getSummary());
</script>
```

## Quick start — React

```bash
npm install @codbdocs/core @codbdocs/react
```

```jsx
import { useCodbDocs } from '@codbdocs/react';

function DocProcessor() {
  const { run, status, progress, result, error } = useCodbDocs({ ocr: true });

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={e => run(e.target.files[0])} />
      {status === 'processing' && <p>Page {progress.page}: {progress.status}</p>}
      {result && (
        <div>
          <p>{result.wordCount} words extracted</p>
          <pre>{result.query("summary").results}</pre>
        </div>
      )}
    </div>
  );
}
```

## The Document Graph

`doc.analyze()` returns a rich, queryable `DocumentGraph`:

```js
const graph = await doc.analyze({ ocr: true });

// Query semantically
graph.query("what dates are mentioned?")    // → { type: 'dates', results: [...] }
graph.query("find all tables")              // → { type: 'tables', results: [...] }
graph.query("who should I contact?")        // → { type: 'phones', results: [...] }
graph.query("what is this about?")          // → { type: 'summary', results: {...} }

// Get structured data
graph.getSummary()    // → { pageCount, wordCount, pageTypes, tables, forms, ... }
graph.toJSON()        // → Full JSON export for RAG / search / storage

// Access layers directly
graph.allDates        // All dates found across all pages
graph.allHeadings     // All headings with levels
graph.allTables       // All detected tables
graph.allForms        // All form fields
```

## Semantic Layers

The Document Brain analyzes each page through multiple layers:

| Layer | What it does | Example output |
|-------|-------------|----------------|
| **Spatial** | Column detection, row grouping, text flow | 2 columns, left-aligned flow |
| **Structure** | Tables, lists, form fields, paragraphs | 3 tables, 12 form fields |
| **Metadata** | Dates, phones, emails, addresses, amounts | $1,250,000, (386) 555-0123 |
| **Classification** | Page type + confidence | 'legal' (0.87) |
| **Visual** | Header/footer detection, image regions | has images, has header text |

## Configuration

```js
CodbDocs.configure({
  nativeTextMinLength: 20,  // below this, treat as scan-only
  ocrScale: 2,             // render scale before OCR
  ocrLang: 'eng',          // Tesseract language code
  enableBrain: true,       // enable Document Brain analysis
  enableVisual: false,     // enable canvas visual analysis (slower)
  useWorkers: true,        // use OffscreenCanvas + Workers
});
```

## Bundled dependencies

No CDN needed. Local copies in `vendor/`:

```
vendor/
├── pdf.js/
│   ├── pdf.min.js
│   └── pdf.worker.min.js
└── tesseract.js/
    └── tesseract.min.js
```

## Repo layout

```
codbdocs/
├── vendor/                      ← Local PDF.js + Tesseract.js (no CDN)
│   ├── pdf.js/
│   └── tesseract.js/
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── index.js         ← Main engine + CodbDoc class
│   │   │   ├── brain.js         ← Document Brain (spatial, structure, metadata)
│   │   │   ├── layers.js        ← Semantic layers + DocumentGraph
│   │   │   └── workers.js       ← OffscreenCanvas + Web Workers
│   │   ├── dist/codbdocs.js     ← UMD browser build (drop-in <script>)
│   │   └── package.json
│   └── react/
│       ├── src/index.js         ← useCodbDocs() hook
│       └── package.json
├── examples/
│   ├── vanilla/index.html       ← Full demo with Document Brain
│   └── react/App.jsx
└── package.json                 ← npm workspaces root
```

## What this is not

This is the extraction + understanding layer. "Ask questions about this
document" using an LLM (RAG) is a separate concern that needs a backend.
But `graph.toJSON()` gives you everything you need to feed into any RAG
pipeline, vector database, or search index.

## Hosting

Everything under `packages/*/dist` is a plain browser-ready `.js` file.
Push to GitHub, turn on GitHub Pages, and `codbdocs.js` is a stable URL
any site can use — no build step required.

## License

MIT
