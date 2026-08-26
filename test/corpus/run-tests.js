/**
 * CODB Docs Test Corpus Runner
 * 
 * Validates retrieval accuracy against ground truth.
 * 
 * Usage:
 *   node test/corpus/run-tests.js <pdf-file>
 *   node test/corpus/run-tests.js --all
 * 
 * Requirements:
 *   - PDF.js loaded globally
 *   - Tesseract.js loaded globally (for OCR tests)
 *   - CodbDocs loaded globally
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadGroundTruth() {
  const gtPath = join(__dirname, 'corpus', 'ground-truth.json');
  return JSON.parse(readFileSync(gtPath, 'utf-8'));
}

async function testDocument(pdfPath, groundTruth) {
  const docEntry = groundTruth.corpus.find(e => e.file === pdfPath.split('/').pop());
  if (!docEntry) {
    console.log(`No ground truth for ${pdfPath}`);
    return null;
  }

  console.log(`\nTesting: ${docEntry.description}`);
  console.log(`Type: ${docEntry.type}`);
  console.log(`Queries: ${docEntry.queries.length}`);

  const results = [];
  
  // This would run the actual tests with CodbDocs
  // For now, just report what would be tested
  for (const query of docEntry.queries) {
    results.push({
      question: query.question,
      expected: query.expected,
      page: query.page,
      status: 'pending',
    });
  }

  return {
    file: docEntry.file,
    type: docEntry.type,
    results,
  };
}

async function runTests() {
  const groundTruth = await loadGroundTruth();
  
  console.log('CODB Docs Test Corpus');
  console.log('=====================\n');
  console.log(`Documents: ${groundTruth.corpus.length}`);
  
  const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  };

  for (const doc of groundTruth.corpus) {
    const result = await testDocument(doc.file, groundTruth);
    if (result) {
      summary.total += result.results.length;
      summary.pending += result.results.length;
    }
  }

  console.log('\n=====================');
  console.log(`Total queries: ${summary.total}`);
  console.log(`Pending: ${summary.pending}`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { runTests, loadGroundTruth, testDocument };
