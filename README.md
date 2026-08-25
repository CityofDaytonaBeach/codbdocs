# CodbDocs

A browser document-processing engine: pull text straight out of a PDF's
embedded text layer with **PDF.js**, and OCR any page that doesn't have one
with **Tesseract.js**. Runs entirely client-side — a PDF never has to leave
the browser.

```
CodbDocs
   │
@codbdocs/core        ← the actual engine, framework-agnostic
   │
   ├── @codbdocs/react     ← useCodbDocs() hook
   └── (vanilla JS / any framework via dist/codbdocs.js)
```

## Why this split

`@codbdocs/core` doesn't know React exists. It takes a PDF in, gives you a
plain JavaScript object back — a document graph, not a component tree. Every
framework binding is just a thin adapter over the same `CodbDocs.load()` /
`doc.analyze()` calls.

## Quick start — no npm, no build step

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
</script>
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@5.0.4/dist/tesseract.min.js"></script>
<script src="./packages/core/dist/codbdocs.js"></script>

<script>
  const doc = await CodbDocs.load(fileOrArrayBufferOrUrl);
  const result = await doc.analyze({ ocr: true });
  console.log(result.fullText);
</script>
```

See `examples/vanilla/index.html` for a runnable version.

## Quick start — React

```bash
npm install @codbdocs/core @codbdocs/react
```

```jsx
import { useCodbDocs } from '@codbdocs/react';

function Uploader() {
  const { run, status, progress, result } = useCodbDocs({ ocr: true });
  return <input type="file" onChange={e => run(e.target.files[0])} />;
}
```

See `examples/react/App.jsx`.

## The document graph

`doc.analyze()` resolves to:

```ts
{
  pageCount: number,
  pages: Array<{
    num: number,
    text: string,
    source: 'native' | 'ocr' | 'error' | 'skipped',
    confidence: number | null   // OCR confidence, 0–100, null for native pages
  }>,
  fullText: string,
  stats: { nativeCount: number, ocrCount: number, wordCount: number }
}
```

## Configuration

```js
CodbDocs.configure({
  nativeTextMinLength: 20, // below this char count, a page is treated as scan-only
  ocrScale: 2,             // render scale before handing a page to Tesseract
  ocrLang: 'eng',          // Tesseract language code
});
```

## What this is not

This repo is the extraction layer only — it gets you clean, searchable text
per page. "Ask questions about this document" (RAG) is a separate concern:
chunk the extracted text, embed it, store it in a vector database, retrieve
relevant chunks, then send those to an LLM. That pipeline needs a backend;
it doesn't belong in `@codbdocs/core`.

## Repo layout

```
codbdocs/
├── packages/
│   ├── core/
│   │   ├── src/index.js       ← ES module source
│   │   ├── dist/codbdocs.js   ← UMD browser build, drop-in <script>
│   │   └── package.json
│   └── react/
│       ├── src/index.js       ← useCodbDocs hook
│       └── package.json
├── examples/
│   ├── vanilla/index.html
│   └── react/App.jsx
└── package.json                ← npm workspaces root
```

## Hosting without npm

Everything under `packages/*/dist` is a plain browser-ready `.js` file.
Push this repo to GitHub, turn on GitHub Pages (or point a custom domain at
it), and `packages/core/dist/codbdocs.js` is a stable URL any site can pull
in with one `<script>` tag — no registry required. Version it under
`/releases/x.y.z/codbdocs.js` if you want consumers to pin a specific build.
