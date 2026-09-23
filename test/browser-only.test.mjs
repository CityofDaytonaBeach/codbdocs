import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BROWSER_ONLY_PROFILES,
  browserOnlyCapabilities,
  createBrowserOnlySDK,
  recommendBrowserOnlyProfile,
  retrieveBrowserOnly,
  summarizeBrowserOnly,
} from '../packages/core/src/browser.js';

const sample = {
  pages: [
    { page_number: 1, text: 'The council approved a $425,000 public safety contract. The vote was unanimous.' },
    { page_number: 2, text: 'The contract begins on October 1 and lasts for three years.' },
  ],
  chunks: [
    { id: 'p1-c1', page: 1, text: 'The council approved a $425,000 public safety contract.' },
    { id: 'p2-c1', page: 2, text: 'The contract begins on October 1 and lasts for three years.' },
  ],
};

test('exposes three immutable browser-only profiles', () => {
  assert.deepEqual(Object.keys(BROWSER_ONLY_PROFILES), ['lite', 'standard', 'max']);
  assert.equal(BROWSER_ONLY_PROFILES.standard.options.enableXfa, true);
  assert.equal(Object.isFrozen(BROWSER_ONLY_PROFILES.max.options), true);
});

test('reports browser-only limits without claiming unavailable features', () => {
  const result = browserOnlyCapabilities();
  assert.equal(result.browserOnly, true);
  assert.equal(result.backendRequired, false);
  assert.equal(result.features.offlineGroundedQnA, true);
  assert.equal(result.features.remediatedPdfUaWriter, false);
  assert.equal(result.features.trustedCertificateSignatures, false);
});

test('recommends a bounded-memory profile for large documents', () => {
  assert.equal(recommendBrowserOnlyProfile({ bytes: 150 * 1024 * 1024, pages: 900 }).profile, 'lite');
  assert.equal(recommendBrowserOnlyProfile({ bytes: 5 * 1024 * 1024, pages: 20, deviceMemoryGB: 16 }).profile, 'max');
});

test('answers locally with grounded passages and citations', async () => {
  const sdk = createBrowserOnlySDK({ profile: 'standard', localFilesOnly: true });
  const answer = await sdk.ask(sample, 'How much was the public safety contract?');
  assert.match(answer.answer, /425,000/);
  assert.equal(answer.offline, true);
  assert.equal(answer.generated, false);
  assert.equal(answer.citations[0].page, 1);
});

test('supports extractive retrieval and summaries without a model', () => {
  const hits = retrieveBrowserOnly(sample, 'When does the contract begin?');
  const summary = summarizeBrowserOnly(sample, { maxSentences: 2 });
  assert.equal(hits[0].page, 2);
  assert.match(summary.answer, /contract/i);
  assert.equal(summary.generated, false);
});

test('uses local providers and rejects endpoint-shaped configuration', async () => {
  const sdk = createBrowserOnlySDK({
    providers: {
      translation: ({ text, target }) => `${target}:${text}`,
    },
  });
  assert.equal(await sdk.translate('Hello', 'es'), 'es:Hello');
  assert.throws(
    () => createBrowserOnlySDK({ processing: { aiEndpoint: 'https://example.test' } }),
    /not available in browser-only mode/,
  );
  assert.throws(
    () => sdk.process(new Uint8Array(), { htmlOptions: { feedbackEndpoint: 'https://example.test' } }),
    /not available in browser-only mode/,
  );
});
