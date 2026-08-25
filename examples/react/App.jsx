import React from 'react';
import { useCodbDocs } from '@codbdocs/react';

// Requires PDF.js and Tesseract.js to be loaded globally (script tags or your bundler),
// same as the vanilla example.

export default function App() {
  const { run, status, progress, result, error } = useCodbDocs({ ocr: true });

  return (
    <div style={{ maxWidth: 680, margin: '60px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>CodbDocs — React example</h1>
      <input type="file" accept="application/pdf" onChange={(e) => e.target.files[0] && run(e.target.files[0])} />

      {status === 'processing' && progress && (
        <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#57616F' }}>
          page {progress.page}: {progress.status}
          {progress.progress != null ? ` ${Math.round(progress.progress * 100)}%` : ''}
        </p>
      )}

      {error && <p style={{ color: '#B23B3B' }}>{String(error)}</p>}

      {result && (
        <>
          <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#57616F' }}>
            {result.stats.nativeCount} native · {result.stats.ocrCount} ocr'd · {result.stats.wordCount} words
          </p>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.6 }}>{result.fullText}</pre>
        </>
      )}
    </div>
  );
}
