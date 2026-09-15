#!/usr/bin/env node
/**
 * Visual regression harness: original PDF render vs CodbDocs generated HTML.
 *
 * Usage:
 *   node test/visual/compare-pdf-html.mjs path/to/file.pdf
 *
 * Optional deps required for this harness only:
 *   npm i -D playwright pngjs
 *   npx playwright install chromium
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const pdfPath = process.argv[2] ? resolve(process.argv[2]) : '';
if (!pdfPath || !existsSync(pdfPath)) {
  console.error('Usage: node test/visual/compare-pdf-html.mjs path/to/file.pdf');
  process.exit(2);
}

const [{ chromium }, { PNG }] = await Promise.all([
  importOptional('playwright', 'Install visual test deps: npm i -D playwright pngjs && npx playwright install chromium'),
  importOptional('pngjs', 'Install visual test deps: npm i -D playwright pngjs && npx playwright install chromium'),
]);

const pdfBytes = readFileSync(pdfPath);
const pdfBase64 = pdfBytes.toString('base64');
const server = await serve(root);
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto(`${server.url}/test/visual/runner.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async ({ name, base64 }) => {
    await window.runVisualRegression({ name, base64 });
  }, { name: pdfPath.split(/[\\/]/).pop(), base64: pdfBase64 });

  const pageCount = await page.evaluate(() => window.visualResult.pageCount);
  const results = [];
  for (let i = 1; i <= pageCount; i += 1) {
    const original = page.locator(`#orig-page-${i}`);
    const generated = page.frameLocator('#generated-frame').locator(`#fx-page-${i} .fx-canvas`);
    await original.waitFor({ state: 'visible', timeout: 30000 });
    await generated.waitFor({ state: 'visible', timeout: 30000 });
    const [origPng, htmlPng] = await Promise.all([
      original.screenshot(),
      generated.screenshot(),
    ]);
    const diff = comparePng(origPng, htmlPng, PNG);
    results.push({ page: i, ...diff });
  }

  const maxMismatch = Number(process.env.CODBDOCS_VISUAL_MAX_MISMATCH || '0.04');
  const failed = results.filter(r => r.mismatchRatio > maxMismatch);
  console.log(JSON.stringify({ pdf: pdfPath, threshold: maxMismatch, results, passed: failed.length === 0 }, null, 2));
  process.exit(failed.length ? 1 : 0);
} finally {
  await browser.close();
  await server.close();
}

async function importOptional(name, help) {
  try {
    return await import(name);
  } catch (err) {
    console.error(help);
    console.error(`Missing module: ${name}`);
    process.exit(2);
  }
}

function comparePng(aBuffer, bBuffer, PNG) {
  const a = PNG.sync.read(aBuffer);
  const b = PNG.sync.read(bBuffer);
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  let changed = 0;
  let total = width * height;
  let sum = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const ai = (y * a.width + x) * 4;
      const bi = (y * b.width + x) * 4;
      const dr = Math.abs(a.data[ai] - b.data[bi]);
      const dg = Math.abs(a.data[ai + 1] - b.data[bi + 1]);
      const db = Math.abs(a.data[ai + 2] - b.data[bi + 2]);
      const da = Math.abs(a.data[ai + 3] - b.data[bi + 3]);
      const delta = (dr + dg + db + da) / (255 * 4);
      sum += delta;
      if (delta > 0.08) changed += 1;
    }
  }
  return {
    originalSize: { width: a.width, height: a.height },
    generatedSize: { width: b.width, height: b.height },
    comparedSize: { width, height },
    mismatchRatio: total ? changed / total : 1,
    meanDelta: total ? sum / total : 1,
  };
}

function serve(baseDir) {
  const mime = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.wasm': 'application/wasm',
    '.pdf': 'application/pdf',
  };
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const file = resolve(join(baseDir, pathname || 'index.html'));
    if (!file.startsWith(baseDir) || !existsSync(file)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  return new Promise(resolveServer => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolveServer({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise(done => server.close(done)),
      });
    });
  });
}
