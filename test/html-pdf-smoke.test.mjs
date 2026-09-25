import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const examplePath = path.resolve(__dirname, '../examples/pdf-tool-smoke-test.html');

test('HTML PDF smoke page defaults to original canvas without text overflow', async () => {
  const browser = await chromium.launch();
  const errors = [];

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
    page.on('pageerror', (error) => errors.push(String(error.message || error)));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto(`file:///${examplePath.replace(/\\/g, '/')}`);
    await page.waitForSelector('#fx-pdf-toggle');
    await page.waitForSelector('#fx-op-pages canvas', { timeout: 10000 });
    await page.waitForSelector('.fx-original-textlayer .fx-text', { timeout: 10000 });
    await page.waitForTimeout(100);

    const initial = await page.evaluate(() => {
      const toggle = document.querySelector('#fx-pdf-toggle');
      const original = document.querySelector('#fx-original');
      const accessible = document.querySelector('#fx-accessible');
      const barBox = document.querySelector('header.fx-bar').getBoundingClientRect();
      const railBox = document.querySelector('.fx-rail').getBoundingClientRect();
      const pageBox = document.querySelector('.fx-op-canvas-wrap').getBoundingClientRect();
      const canvas = document.querySelector('#fx-op-pages canvas');
      const canvasBox = canvas.getBoundingClientRect();
      const image = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      let minX = Infinity;
      let minY = Infinity;
      for (let y = 0; y < image.height; y += 1) {
        for (let x = 0; x < image.width; x += 1) {
          const i = (y * image.width + x) * 4;
          const r = image.data[i];
          const g = image.data[i + 1];
          const b = image.data[i + 2];
          const a = image.data[i + 3];
          if (a > 0 && r < 80 && g < 80 && b < 80) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
          }
        }
      }
      const rasterTextOrigin = {
        left: minX * (canvasBox.width / canvas.width),
        top: minY * (canvasBox.height / canvas.height),
      };
      const textBoxes = [...document.querySelectorAll('.fx-original-textlayer .fx-text')].map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          text: node.textContent,
          left: rect.left - pageBox.left,
          top: rect.top - pageBox.top,
          right: rect.right - pageBox.left,
          bottom: rect.bottom - pageBox.top,
          width: rect.width,
          height: rect.height,
        };
      });

      return {
        checked: toggle.checked,
        originalVisible: getComputedStyle(original).display !== 'none',
        accessibleHidden: accessible.hidden,
        canvasCount: document.querySelectorAll('#fx-op-pages canvas').length,
        originalPageLabels: document.querySelectorAll('.fx-op-num').length,
        currentThumb: document.querySelector('.fx-thumb[aria-current="true"]')?.dataset.goto || '',
        status: document.querySelector('#fx-op-status')?.textContent || '',
        layout: {
          barTop: barBox.top,
          barBottom: barBox.bottom,
          railLeft: railBox.left,
          railTop: railBox.top,
          canvasTop: pageBox.top,
        },
        pageWidth: pageBox.width,
        pageHeight: pageBox.height,
        rasterTextOrigin,
        textBoxes,
      };
    });

    assert.equal(errors.length, 0, errors.join('\n'));
    assert.equal(initial.checked, true);
    assert.equal(initial.originalVisible, true);
    assert.equal(initial.accessibleHidden, true);
    assert.equal(initial.canvasCount, 1);
    assert.equal(initial.originalPageLabels, 0);
    assert.equal(initial.currentThumb, '1');
    assert.match(initial.status, /1 page rendered with pdf\.js/);
    assert.ok(Math.abs(initial.layout.barTop) <= 1, 'top bar should start at top of viewport');
    assert.ok(Math.abs(initial.layout.railLeft) <= 1, 'side rail should be flush left');
    assert.ok(initial.layout.railTop >= initial.layout.barBottom - 1, 'side rail should start below the top bar');
    assert.ok(initial.layout.canvasTop >= initial.layout.barBottom + 1, 'PDF canvas should not sit under the top bar');
    assert.ok(initial.textBoxes.length >= 6);
    assert.ok(Math.abs(initial.rasterTextOrigin.top - initial.textBoxes[0].top) <= 2, 'original raster text should align vertically with HTML overlay');
    assert.ok(Math.abs(initial.rasterTextOrigin.left - initial.textBoxes[0].left) <= 3, 'original raster text should align horizontally with HTML overlay');

    for (const box of initial.textBoxes) {
      assert.ok(box.left >= -1, `${box.text} overflows left`);
      assert.ok(box.top >= -1, `${box.text} overflows top`);
      assert.ok(box.right <= initial.pageWidth + 1, `${box.text} overflows right`);
      assert.ok(box.bottom <= initial.pageHeight + 1, `${box.text} overflows bottom`);
      assert.ok(box.width > 0, `${box.text} has no width`);
      assert.ok(box.height > 0, `${box.text} has no height`);
    }

    await page.fill('#fx-search', 'Original');
    await page.waitForSelector('.fx-original-hitbox', { timeout: 5000 });
    const originalSearch = await page.evaluate(() => ({
      hitboxes: document.querySelectorAll('.fx-original-hitbox').length,
      drawerOpen: document.querySelector('#fx-drawer').getAttribute('data-open'),
      count: document.querySelector('#fx-search-count').textContent,
      originalStillChecked: document.querySelector('#fx-pdf-toggle').checked,
      originalStillVisible: !document.querySelector('#fx-original').hidden,
    }));
    assert.ok(originalSearch.hitboxes >= 1);
    assert.equal(originalSearch.drawerOpen, 'true');
    assert.match(originalSearch.count, /match/);
    assert.equal(originalSearch.originalStillChecked, true);
    assert.equal(originalSearch.originalStillVisible, true);

    await page.click('#fx-print');
    await page.waitForSelector('#fx-print-frame', { timeout: 5000 });
    const printFrame = await page.evaluate(() => {
      const frame = document.querySelector('#fx-print-frame');
      return {
        src: frame?.getAttribute('src') || '',
        hidden: frame?.getAttribute('aria-hidden'),
        width: frame?.style.width,
        height: frame?.style.height,
      };
    });
    assert.match(printFrame.src, /^data:application\/pdf;base64,/);
    assert.equal(printFrame.hidden, 'true');
    assert.equal(printFrame.width, '1px');
    assert.equal(printFrame.height, '1px');

    const beforeZoom = await page.evaluate(() => ({
      originalWidth: document.querySelector('.fx-op-canvas-wrap').getBoundingClientRect().width,
      zoom: getComputedStyle(document.documentElement).getPropertyValue('--zoom'),
    }));
    await page.click('#fx-zoom-in');
    await page.waitForTimeout(50);
    const originalAfterZoom = await page.evaluate(() => ({
      originalWidth: document.querySelector('.fx-op-canvas-wrap').getBoundingClientRect().width,
      zoom: getComputedStyle(document.documentElement).getPropertyValue('--zoom'),
    }));
    assert.ok(originalAfterZoom.originalWidth > beforeZoom.originalWidth, 'zoom in should enlarge original canvas');

    await page.click('#fx-view-reflow');
    const reflowView = await page.evaluate(() => {
      const reflow = document.querySelector('#fx-accessible .fx-reflow');
      return {
        checked: document.querySelector('#fx-pdf-toggle').checked,
        originalHidden: document.querySelector('#fx-original').hidden,
        accessibleHidden: document.querySelector('#fx-accessible').hidden,
        view: document.documentElement.dataset.view,
        reflowVisible: getComputedStyle(reflow).display !== 'none',
      };
    });
    assert.equal(reflowView.checked, false);
    assert.equal(reflowView.originalHidden, true);
    assert.equal(reflowView.accessibleHidden, false);
    assert.equal(reflowView.view, 'reflow');
    assert.equal(reflowView.reflowVisible, true);

    await page.click('#fx-view-fidelity');
    const originalFromPdfButton = await page.evaluate(() => ({
      checked: document.querySelector('#fx-pdf-toggle').checked,
      originalHidden: document.querySelector('#fx-original').hidden,
      accessibleHidden: document.querySelector('#fx-accessible').hidden,
      view: document.documentElement.dataset.view,
    }));
    assert.equal(originalFromPdfButton.checked, true);
    assert.equal(originalFromPdfButton.originalHidden, false);
    assert.equal(originalFromPdfButton.accessibleHidden, true);
    assert.equal(originalFromPdfButton.view, 'fidelity');

    await page.click('#fx-pdf-toggle');
    const htmlFidelityAfterZoom = await page.evaluate(() => ({
      checked: document.querySelector('#fx-pdf-toggle').checked,
      originalHidden: document.querySelector('#fx-original').hidden,
      accessibleHidden: document.querySelector('#fx-accessible').hidden,
      view: document.documentElement.dataset.view,
      htmlWidth: document.querySelector('#fx-page-1').getBoundingClientRect().width,
    }));
    assert.equal(htmlFidelityAfterZoom.checked, false);
    assert.equal(htmlFidelityAfterZoom.view, 'fidelity');
    assert.ok(Math.abs(originalAfterZoom.originalWidth - htmlFidelityAfterZoom.htmlWidth) <= 2, 'zoomed original and HTML fidelity page should remain the same width');

    await page.click('#fx-pdf-toggle');

    for (const [button, dialog] of [
      ['#fx-outline-open', '#fx-outline'],
      ['#fx-a11y-open', '#fx-a11y-tools'],
      ['#fx-sum-open', '#fx-sum'],
      ['#fx-ex-open', '#fx-ex'],
      ['#fx-dl-open', '#fx-dl'],
      ['#fx-qa-open', '#fx-qa'],
    ]) {
      await page.click(button);
      const opened = await page.locator(dialog).getAttribute('data-open');
      assert.equal(opened, 'true', `${dialog} did not open`);
      await page.keyboard.press('Escape');
      await page.waitForFunction((selector) => document.querySelector(selector).getAttribute('data-open') === 'false', dialog);
    }

    await page.click('#fx-pdf-toggle');
    const accessibleVisible = await page.evaluate(() => ({
      checked: document.querySelector('#fx-pdf-toggle').checked,
      originalHidden: document.querySelector('#fx-original').hidden,
      accessibleHidden: document.querySelector('#fx-accessible').hidden,
      htmlPageWidth: document.querySelector('#fx-page-1').getBoundingClientRect().width,
    }));
    assert.equal(accessibleVisible.checked, false);
    assert.equal(accessibleVisible.originalHidden, true);
    assert.equal(accessibleVisible.accessibleHidden, false);
    assert.ok(Math.abs(originalAfterZoom.originalWidth - accessibleVisible.htmlPageWidth) <= 2, 'original canvas and HTML fidelity page should render at the same width');

    await page.click('#fx-pdf-toggle');
    const originalVisibleAgain = await page.evaluate(() => ({
      checked: document.querySelector('#fx-pdf-toggle').checked,
      originalHidden: document.querySelector('#fx-original').hidden,
      accessibleHidden: document.querySelector('#fx-accessible').hidden,
    }));
    assert.equal(originalVisibleAgain.checked, true);
    assert.equal(originalVisibleAgain.originalHidden, false);
    assert.equal(originalVisibleAgain.accessibleHidden, true);
  } finally {
    await browser.close();
  }
});

test('generated viewer can disable menu features and exposes feature manifest', async () => {
  const browser = await chromium.launch();
  const errors = [];

  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    page.on('pageerror', (error) => errors.push(String(error.message || error)));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto(`file:///${examplePath.replace(/\\/g, '/')}`);
    await page.waitForFunction(() => window.CodbDocs && window.CodbDocs.buildFidelityHtml);
    await page.evaluate(() => {
      const ir = {
        version: '1.0',
        document: { id: 'feature-menu-test', title: 'Feature Menu Test', metadata: { title: 'Feature Menu Test', language: 'en' }, pages: ['page_1'] },
        pages: {
          page_1: { id: 'page_1', num: 1, width: 612, height: 792, rotation: 0, mediaBox: [0, 0, 612, 792], content: ['text_1'], vectors: [], images: [], annotations: [] },
        },
        objects: {
          text_1: {
            id: 'text_1',
            type: 'text',
            page: 'page_1',
            raw: { text: 'Feature configuration should remove disabled toolbar controls.', font: 'Helvetica', fontSize: 12, color: [0, 0, 0], transform: [12, 0, 0, 12, 72, 720] },
            semantic: { role: 'paragraph', text: 'Feature configuration should remove disabled toolbar controls.' },
            accessibility: { role: 'P' },
            bbox: [72, 720, 340, 16],
          },
        },
        structure: {},
        annotations: {},
        vectors: {},
        forms: { fields: [], byName: {} },
      };
      const html = window.CodbDocs.buildFidelityHtml(ir, {
        title: 'Feature Menu Test',
        disabledFeatures: ['print', 'askAi', 'outline', 'search', 'zoom', 'pageNavigation', 'summary'],
      });
      document.open();
      document.write(html);
      document.close();
    });
    await page.waitForSelector('#fx-content');
    await page.waitForTimeout(100);

    const state = await page.evaluate(() => {
      const readJson = (id) => JSON.parse(document.getElementById(id).textContent);
      return {
        controls: {
          print: Boolean(document.querySelector('#fx-print')),
          askAi: Boolean(document.querySelector('#fx-qa-open')),
          outline: Boolean(document.querySelector('#fx-outline-open')),
          search: Boolean(document.querySelector('#fx-search')),
          zoomIn: Boolean(document.querySelector('#fx-zoom-in')),
          pageSelect: Boolean(document.querySelector('#fx-page-select')),
          summary: Boolean(document.querySelector('#fx-sum-open')),
          accessibility: Boolean(document.querySelector('#fx-a11y-open')),
        },
        configFeatures: readJson('codbdocs-config').features,
        knowledgeFeatures: readJson('codbdocs-knowledge').features,
      };
    });

    assert.equal(errors.length, 0, errors.join('\n'));
    assert.deepEqual(state.controls, {
      print: false,
      askAi: false,
      outline: false,
      search: false,
      zoomIn: false,
      pageSelect: false,
      summary: false,
      accessibility: true,
    });
    for (const feature of ['print', 'askAi', 'outline', 'search', 'zoom', 'pageNavigation', 'summary']) {
      assert.equal(state.configFeatures.menu[feature], false, `${feature} should be disabled in config`);
      assert.ok(state.configFeatures.disabled.includes(feature), `${feature} should be listed as disabled`);
      assert.equal(state.knowledgeFeatures.menu[feature], false, `${feature} should be disabled in knowledge pack`);
    }
    assert.equal(state.configFeatures.menu.accessibility, true);
    assert.ok(state.configFeatures.enabled.includes('accessibility'));
    assert.equal(state.configFeatures.menu.original, false, 'original PDF feature requires originalPdfSrc');
    assert.equal(state.configFeatures.available.find((feature) => feature.key === 'print').buttonId, 'fx-print');
  } finally {
    await browser.close();
  }
});
