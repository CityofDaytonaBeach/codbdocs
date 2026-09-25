import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../packages/core/dist/codbdocs.js');

test('dist browser global exposes the documented flat API', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.addScriptTag({ path: distPath });

    const shape = await page.evaluate(() => ({
      load: typeof window.CodbDocs?.load,
      configure: typeof window.CodbDocs?.configure,
      version: window.CodbDocs?.version,
      nestedIsCompatAlias: window.CodbDocs?.CodbDocs === window.CodbDocs,
      defaultIsCompatAlias: window.CodbDocs?.default === window.CodbDocs,
    }));

    assert.equal(shape.load, 'function');
    assert.equal(shape.configure, 'function');
    assert.equal(shape.version, '0.1.2');
    assert.equal(shape.nestedIsCompatAlias, true);
    assert.equal(shape.defaultIsCompatAlias, true);
  } finally {
    await browser.close();
  }
});
