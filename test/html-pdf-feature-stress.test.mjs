import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const examplePath = path.resolve(__dirname, '../examples/pdf-feature-stress-test.html');

test('feature stress PDF renders pages, features, and searchable original overlays', async () => {
  const browser = await chromium.launch();
  const errors = [];

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
    page.on('pageerror', (error) => errors.push(String(error.message || error)));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto(`file:///${examplePath.replace(/\\/g, '/')}`);
    await page.waitForSelector('#fx-op-pages canvas', { timeout: 15000 });
    await page.waitForFunction(() => document.querySelectorAll('#fx-op-pages canvas').length === 10, null, { timeout: 15000 });
    await page.waitForFunction(() => document.querySelectorAll('.fx-thumb img[src^="data:image/png"]').length === 10, null, { timeout: 15000 });
    await page.waitForSelector('.fx-original-textlayer .fx-text', { timeout: 10000 });

    const features = await page.evaluate(() => ({
      canvases: document.querySelectorAll('#fx-op-pages canvas').length,
      pages: document.querySelectorAll('.fx-page').length,
      thumbs: document.querySelectorAll('.fx-thumb').length,
      thumbImages: document.querySelectorAll('.fx-thumb img[src^="data:image/png"]').length,
      railHasHorizontalScroll: document.querySelector('.fx-rail').scrollWidth > document.querySelector('.fx-rail').clientWidth + 1,
      railScrollbarGutter: document.querySelector('.fx-rail').offsetWidth - document.querySelector('.fx-rail').clientWidth,
      originalPageScrollbarGutter: document.querySelector('.fx-op-page').offsetWidth - document.querySelector('.fx-op-page').clientWidth,
      formFields: document.querySelectorAll('#fx-accessible .fx-pdf-field').length,
      reflowFields: document.querySelectorAll('#fx-accessible .fx-reflow-field').length,
      vectorLayers: document.querySelectorAll('#fx-accessible .fx-vector-layer').length,
      images: document.querySelectorAll('#fx-accessible .fx-img').length,
      tables: document.querySelectorAll('#fx-accessible table').length,
      originalToggleChecked: document.querySelector('#fx-pdf-toggle').checked,
      status: document.querySelector('#fx-op-status')?.textContent || '',
    }));

    assert.equal(errors.length, 0, errors.join('\n'));
    assert.equal(features.canvases, 10);
    assert.equal(features.pages, 10);
    assert.equal(features.thumbs, 10);
    assert.equal(features.thumbImages, 10);
    assert.equal(features.railHasHorizontalScroll, false);
    assert.ok(features.railScrollbarGutter <= 1);
    assert.equal(features.originalPageScrollbarGutter, 0);
    assert.ok(features.formFields >= 5);
    assert.ok(features.reflowFields >= 5);
    assert.ok(features.vectorLayers >= 2);
    assert.ok(features.images >= 2);
    assert.ok(features.tables >= 1);
    assert.equal(features.originalToggleChecked, true);
    assert.match(features.status, /10 pages rendered with pdf\.js/);

    const originalLayout = await page.evaluate(() => {
      const stage = document.querySelector('.fx-stage').getBoundingClientRect();
      const original = document.querySelector('.fx-op-canvas-wrap').getBoundingClientRect();
      return {
        stageCenter: stage.left + stage.width / 2,
        originalCenter: original.left + original.width / 2,
        originalWidth: original.width,
      };
    });

    await page.fill('#fx-search', 'stormwater');
    await page.waitForSelector('.fx-original-hitbox', { timeout: 5000 });
    const search = await page.evaluate(() => ({
      count: document.querySelector('#fx-search-count').textContent,
      drawerOpen: document.querySelector('#fx-drawer').getAttribute('data-open'),
      hitboxes: document.querySelectorAll('.fx-original-hitbox').length,
      resultText: document.querySelector('#fx-res')?.textContent || '',
      currentThumb: document.querySelector('.fx-thumb[aria-current="true"]')?.dataset.goto || '',
    }));

    assert.match(search.count, /match/);
    assert.equal(search.drawerOpen, 'true');
    assert.ok(search.hitboxes >= 1);
    assert.match(search.resultText.toLowerCase(), /stormwater/);

    await page.locator('#fx-search').blur();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.keyboard.press('ArrowDown');
    await page.waitForFunction(() => window.scrollY > 0);
    const arrowScrollY = await page.evaluate(() => window.scrollY);
    assert.ok(arrowScrollY > 0, 'ArrowDown should scroll the canvas/document');

    await page.click('#fx-search');
    await page.evaluate(() => {
      document.scrollingElement.scrollTop = 0;
      document.documentElement.style.scrollBehavior = 'auto';
    });
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    assert.ok(await page.evaluate(() => window.scrollY < 30), 'ArrowDown inside inputs should not be hijacked by the canvas scroller');
    await page.locator('#fx-search').blur();

    await page.click('#fx-a11y-open');
    await page.click('[data-a11y-toggle="screen-reader"]');
    await page.keyboard.press('Escape');
    await page.evaluate(() => { document.scrollingElement.scrollTop = 0; });
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('fx-screen-reader')), true);
    await page.click('#fx-a11y-open');
    await page.click('[data-a11y-toggle="screen-reader"]');
    await page.keyboard.press('Escape');

    await page.click('#fx-pdf-toggle');
    await page.waitForTimeout(100);
    const htmlLayout = await page.evaluate(() => {
      const stage = document.querySelector('.fx-stage').getBoundingClientRect();
      const canvas = document.querySelector('#fx-page-1 .fx-canvas').getBoundingClientRect();
      const page = document.querySelector('#fx-page-1').getBoundingClientRect();
      const textBoxes = [...document.querySelectorAll('#fx-accessible .fx-page .fx-text')].map((node) => {
        const text = node.textContent.trim();
        const rect = node.getBoundingClientRect();
        const canvasRect = node.closest('.fx-canvas').getBoundingClientRect();
        return {
          text,
          page: node.closest('.fx-page').dataset.page,
          left: rect.left - canvasRect.left,
          top: rect.top - canvasRect.top,
          right: rect.right - canvasRect.left,
          bottom: rect.bottom - canvasRect.top,
          canvasWidth: canvasRect.width,
          canvasHeight: canvasRect.height,
        };
      });
      return {
        stageCenter: stage.left + stage.width / 2,
        htmlCenter: canvas.left + canvas.width / 2,
        htmlWidth: page.width,
        textBoxes,
      };
    });

    assert.ok(Math.abs(originalLayout.originalCenter - originalLayout.stageCenter) <= 2, 'original page should be centered in stage');
    assert.ok(Math.abs(htmlLayout.htmlCenter - htmlLayout.stageCenter) <= 2, 'HTML page should be centered in stage');
    assert.ok(Math.abs(originalLayout.originalWidth - htmlLayout.htmlWidth) <= 2, 'original and HTML pages should be same width');
    for (const box of htmlLayout.textBoxes) {
      assert.ok(box.left >= -1, `${box.text} overflows left on page ${box.page}`);
      assert.ok(box.top >= -1, `${box.text} overflows top on page ${box.page}`);
      assert.ok(box.right <= box.canvasWidth + 1, `${box.text} overflows right on page ${box.page}`);
      assert.ok(box.bottom <= box.canvasHeight + 1, `${box.text} overflows bottom on page ${box.page}`);
    }

    await page.click('#fx-pdf-toggle');
    await page.waitForTimeout(100);

    await page.click('.fx-thumb[data-goto="5"]');
    await page.waitForFunction(() => document.querySelector('.fx-thumb[aria-current="true"]')?.dataset.goto === '5');
    const thumbState = await page.evaluate(() => ({
      currentThumb: document.querySelector('.fx-thumb[aria-current="true"]')?.dataset.goto || '',
      originalStillChecked: document.querySelector('#fx-pdf-toggle').checked,
    }));
    assert.equal(thumbState.currentThumb, '5');
    assert.equal(thumbState.originalStillChecked, true);
  } finally {
    await browser.close();
  }
});
