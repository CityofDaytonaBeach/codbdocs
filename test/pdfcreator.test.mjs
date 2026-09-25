import test from 'node:test';
import assert from 'node:assert/strict';

import { createTextPDF } from '../packages/core/src/pdfcreator.js';

test('createTextPDF returns a valid PDF byte stream', async () => {
  const bytes = await createTextPDF(['Hello from CodbDocs PDF creator'], {
    metadata: { title: 'PDF Creator Smoke Test' },
  });

  const text = new TextDecoder().decode(bytes);
  assert.ok(bytes instanceof Uint8Array);
  assert.match(text.slice(0, 16), /^%PDF-1\.7/);
  assert.match(text, /Hello from CodbDocs PDF creator/);
  assert.match(text, /%%EOF\s*$/);
});
