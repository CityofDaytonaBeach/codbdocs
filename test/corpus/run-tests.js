/**
 * CODB Docs Test Corpus Runner
 *
 * Actually loads PDFs, analyzes them, executes queries, and compares results.
 *
 * Usage:
 *   node --experimental-vm-modules test/corpus/run-tests.js <pdf-file>
 *   node --experimental-vm-modules test/corpus/run-tests.js --all
 *
 * Requirements:
 *   - pdfjsLib loaded (via import or global)
 *   - Tesseract loaded (for OCR tests)
 *   - CodbDocs loaded
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadGroundTruth() {
  const gtPath = join(__dirname, 'corpus', 'ground-truth.json');
  return JSON.parse(readFileSync(gtPath, 'utf-8'));
}

async function testDocument(pdfPath, groundTruth, CodbDocs) {
  const fileName = pdfPath.split('/').pop();
  const docEntry = groundTruth.corpus.find(e => e.file === fileName);
  if (!docEntry) {
    console.log(`  No ground truth for ${fileName}`);
    return null;
  }

  console.log(`\n  Testing: ${docEntry.description}`);
  console.log(`  Type: ${docEntry.type}`);
  console.log(`  Queries: ${docEntry.queries.length}`);

  const results = [];

  for (const query of docEntry.queries) {
    try {
      // Load and analyze the PDF
      const fileBuffer = readFileSync(pdfPath);
      const doc = await CodbDocs.load(fileBuffer);

      // Analyze the document
      await doc.analyze({
        ocr: true,
        extractVectors: true,
        extractExtended: true,
      });

      // Get the graph
      const graph = doc._graph || doc;

      // Execute the query
      const result = await graph.askEnhanced(query.question);

      // Compare with expected
      const passed = result.answer &&
        (result.answer.toLowerCase().includes(query.expected.toLowerCase()) ||
         query.expected.toLowerCase().includes(result.answer.toLowerCase()));

      results.push({
        question: query.question,
        expected: query.expected,
        page: query.page,
        actual: result.answer,
        confidence: result.confidence,
        passed,
        status: passed ? 'pass' : 'fail',
      });

      console.log(`    ${passed ? '✓' : '✗'} "${query.question}"`);
      if (!passed) {
        console.log(`      Expected: ${query.expected}`);
        console.log(`      Got: ${result.answer}`);
      }
    } catch (err) {
      results.push({
        question: query.question,
        expected: query.expected,
        page: query.page,
        actual: null,
        error: err.message,
        passed: false,
        status: 'error',
      });
      console.log(`    ✗ "${query.question}" - Error: ${err.message}`);
    }
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
    errors: 0,
  };

  // Check if PDF files exist
  const corpusDir = join(__dirname, 'corpus');
  const availablePDFs = readdirSync(corpusDir).filter(f => f.endsWith('.pdf'));

  if (availablePDFs.length === 0) {
    console.log('\n  No PDF files found in test/corpus/');
    console.log('  Add PDF files to run actual tests.');
    console.log('\n  See ground-truth.json for expected test cases.');
    return;
  }

  for (const pdf of availablePDFs) {
    const pdfPath = join(corpusDir, pdf);
    if (!existsSync(pdfPath)) continue;

    const result = await testDocument(pdfPath, groundTruth, globalThis.CodbDocs);
    if (result) {
      for (const r of result.results) {
        summary.total++;
        if (r.status === 'pass') summary.passed++;
        else if (r.status === 'fail') summary.failed++;
        else summary.errors++;
      }
    }
  }

  console.log('\n=====================');
  console.log(`Total queries: ${summary.total}`);
  console.log(`Passed: ${summary.passed}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Errors: ${summary.errors}`);

  if (summary.total > 0) {
    const accuracy = (summary.passed / summary.total * 100).toFixed(1);
    console.log(`Accuracy: ${accuracy}%`);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { runTests, loadGroundTruth, testDocument };
