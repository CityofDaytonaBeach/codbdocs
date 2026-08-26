/**
 * @codbdocs/core — PDF Quality & Health Analysis
 *
 * Addresses common PDF failures from review.txt:
 * - Text quality scoring (invisible text, bad OCR, duplicates)
 * - Visual vs internal PDF comparison
 * - Health scan / diagnosis
 * - Normalization and repair
 * - RAG readiness scoring
 */

// ─── Text Quality Analysis ───────────────────────────────────────────────────

/**
 * Analyze text quality for a single page.
 */
export function analyzeTextQuality(pageData, contentItems, pageSize) {
  const issues = [];
  let score = 1.0;

  // 1. Check for invisible text (text outside page bounds)
  const invisibleText = contentItems.filter(item => {
    const x = item.transform?.[4] || 0;
    const y = item.transform?.[5] || 0;
    return x < 0 || x > pageSize.width || y < 0 || y > pageSize.height;
  });

  if (invisibleText.length > 0) {
    issues.push({
      type: 'invisible_text',
      severity: 'warning',
      count: invisibleText.length,
      description: 'Text objects found outside page bounds',
    });
    score -= 0.1 * Math.min(invisibleText.length / 10, 0.3);
  }

  // 2. Check for suspicious Unicode patterns
  const suspiciousText = contentItems.filter(item => {
    const text = item.str || '';
    // Check for common OCR garbage patterns
    return /[^\x00-\x7F]{3,}/.test(text) || // Multiple non-ASCII
           /\s{5,}/.test(text) || // Excessive whitespace
           /[|\\\/]{3,}/.test(text); // Excessive symbols
  });

  if (suspiciousText.length > 0) {
    issues.push({
      type: 'suspicious_unicode',
      severity: 'warning',
      count: suspiciousText.length,
      description: 'Text contains suspicious Unicode patterns',
    });
    score -= 0.1 * Math.min(suspiciousText.length / 5, 0.3);
  }

  // 3. Check for abnormal character distribution
  const allText = contentItems.map(i => i.str || '').join('');
  const charDist = analyzeCharacterDistribution(allText);
  if (charDist.suspicious) {
    issues.push({
      type: 'abnormal_char_distribution',
      severity: 'info',
      description: charDist.reason,
    });
    score -= 0.1;
  }

  // 4. Check for poor word formation
  const words = allText.split(/\s+/).filter(w => w.length > 0);
  const gibberishWords = words.filter(w => isGibberish(w));
  if (gibberishWords.length > words.length * 0.1) {
    issues.push({
      type: 'poor_word_formation',
      severity: 'warning',
      gibberishRatio: gibberishWords.length / words.length,
      description: `${gibberishWords.length} of ${words.length} words appear to be gibberish`,
    });
    score -= 0.2;
  }

  // 5. Check for duplicate text
  const textFragments = contentItems.map(i => (i.str || '').trim()).filter(t => t.length > 5);
  const duplicates = findDuplicates(textFragments);
  if (duplicates.length > 0) {
    issues.push({
      type: 'duplicate_text',
      severity: 'warning',
      count: duplicates.length,
      samples: duplicates.slice(0, 3),
      description: 'Duplicate text fragments detected',
    });
    score -= 0.1 * Math.min(duplicates.length / 5, 0.2);
  }

  // 6. Check for hyphenation issues
  const hyphenated = contentItems.filter(item => {
    const text = item.str || '';
    return /\w-$/.test(text);
  });
  if (hyphenated.length > 0) {
    issues.push({
      type: 'hyphenation',
      severity: 'info',
      count: hyphenated.length,
      description: 'Potential hyphenated words found',
    });
  }

  // 7. Check for ligature issues
  const ligatures = allText.match(/[ﬁﬂﬃﬄ]/g) || [];
  if (ligatures.length > 0) {
    issues.push({
      type: 'ligatures',
      severity: 'info',
      count: ligatures.length,
      description: 'Ligature characters found that may cause search issues',
    });
    score -= 0.05;
  }

  // 8. Check for clipped text
  const clippedText = contentItems.filter(item => {
    const x = item.transform?.[4] || 0;
    const y = item.transform?.[5] || 0;
    const w = item.width || 0;
    const h = item.height || 0;
    // Text that extends beyond page boundaries
    return (x + w > pageSize.width + 10) || (y + h > pageSize.height + 10);
  });

  if (clippedText.length > 0) {
    issues.push({
      type: 'clipped_text',
      severity: 'info',
      count: clippedText.length,
      description: 'Text objects may be clipped at page boundaries',
    });
  }

  return {
    score: Math.max(0, Math.min(1, score)),
    issues,
    summary: {
      invisibleText: invisibleText.length,
      suspiciousUnicode: suspiciousText.length,
      duplicates: duplicates.length,
      hyphenated: hyphenated.length,
      ligatures: ligatures.length,
      clippedText: clippedText.length,
    },
  };
}

/**
 * Analyze character distribution for suspicious patterns.
 */
function analyzeCharacterDistribution(text) {
  if (!text || text.length < 100) {
    return { suspicious: false };
  }

  const chars = text.split('');
  const freq = {};
  for (const c of chars) {
    freq[c] = (freq[c] || 0) + 1;
  }

  // Check for excessive non-alphanumeric characters
  const nonAlpha = chars.filter(c => !/[a-zA-Z0-9\s]/.test(c)).length;
  if (nonAlpha > chars.length * 0.3) {
    return { suspicious: true, reason: 'Excessive non-alphanumeric characters' };
  }

  // Check for excessive uppercase (except for acronyms)
  const uppercase = chars.filter(c => /[A-Z]/.test(c)).length;
  const letters = chars.filter(c => /[a-zA-Z]/.test(c)).length;
  if (letters > 100 && uppercase > letters * 0.8) {
    return { suspicious: true, reason: 'Excessive uppercase characters' };
  }

  return { suspicious: false };
}

/**
 * Check if a word appears to be gibberish.
 */
function isGibberish(word) {
  if (word.length < 3) return false;

  // Check for consonant clusters (more than 3 consonants in a row)
  const consonantClusters = word.match(/[bcdfghjklmnpqrstvwxyz]{4,}/gi);
  if (consonantClusters && consonantClusters.length > 0) return true;

  // Check for vowel clusters (more than 3 vowels in a row)
  const vowelClusters = word.match(/[aeiou]{4,}/gi);
  if (vowelClusters && vowelClusters.length > 0) return true;

  // Check for alternating consonant-vowel pattern (too regular)
  const pattern = word.toLowerCase();
  let alternating = true;
  for (let i = 2; i < pattern.length; i++) {
    const prev1IsVowel = 'aeiou'.includes(pattern[i - 1]);
    const prev2IsVowel = 'aeiou'.includes(pattern[i - 2]);
    const currIsVowel = 'aeiou'.includes(pattern[i]);
    if (prev1IsVowel === currIsVowel && prev2IsVowel === currIsVowel) {
      alternating = false;
      break;
    }
  }
  if (alternating && word.length > 6) return true;

  return false;
}

/**
 * Find duplicate text fragments.
 */
function findDuplicates(fragments) {
  const seen = new Map();
  const duplicates = [];

  for (const frag of fragments) {
    const normalized = frag.toLowerCase().trim();
    if (seen.has(normalized)) {
      duplicates.push(frag);
    } else {
      seen.set(normalized, true);
    }
  }

  return duplicates;
}

// ─── Visual vs Internal Comparison ───────────────────────────────────────────

/**
 * Compare visual representation against internal PDF structure.
 */
export function compareVisualInternal(pageData, visualRegions, contentItems) {
  const discrepancies = [];

  // 1. Compare text regions
  const internalTextRegions = contentItems
    .filter(item => item.str && item.str.trim().length > 0)
    .map(item => ({
      x: item.transform?.[4] || 0,
      y: item.transform?.[5] || 0,
      width: item.width || 0,
      height: item.height || 0,
      text: item.str,
    }));

  const visualTextRegions = visualRegions?.textRegions || [];

  // Check for text in visual but not in internal
  for (const vRegion of visualTextRegions) {
    const matchingInternal = internalTextRegions.find(iRegion =>
      Math.abs(iRegion.x - vRegion.x) < 10 &&
      Math.abs(iRegion.y - vRegion.y) < 10
    );

    if (!matchingInternal) {
      discrepancies.push({
        type: 'visual_text_not_in_internal',
        severity: 'warning',
        bbox: vRegion,
        description: 'Text visible on page but not in PDF text layer',
      });
    }
  }

  // Check for internal text not visible
  for (const iRegion of internalTextRegions) {
    const matchingVisual = visualTextRegions.find(vRegion =>
      Math.abs(iRegion.x - vRegion.x) < 10 &&
      Math.abs(iRegion.y - vRegion.y) < 10
    );

    if (!matchingVisual && iRegion.text.length > 3) {
      discrepancies.push({
        type: 'internal_text_not_visible',
        severity: 'warning',
        bbox: iRegion,
        text: iRegion.text,
        description: 'Text in PDF layer but not visibly rendered',
      });
    }
  }

  // 2. Compare image regions
  const internalImageCount = pageData.images?.length || 0;
  const visualImageCount = visualRegions?.imageRegions?.length || 0;

  if (Math.abs(internalImageCount - visualImageCount) > 0) {
    discrepancies.push({
      type: 'image_count_mismatch',
      severity: 'info',
      internal: internalImageCount,
      visual: visualImageCount,
      description: `Internal: ${internalImageCount} images, Visual: ${visualImageCount} images`,
    });
  }

  // 3. Check for hidden text (text with very small font or transparency)
  const hiddenText = contentItems.filter(item => {
    const fontSize = Math.abs(item.transform?.[0]) || 12;
    return fontSize < 2 && item.str && item.str.trim().length > 0;
  });

  if (hiddenText.length > 0) {
    discrepancies.push({
      type: 'hidden_text',
      severity: 'warning',
      count: hiddenText.length,
      description: 'Text with extremely small font size detected',
    });
  }

  return {
    discrepancies,
    score: Math.max(0, 1 - (discrepancies.length * 0.1)),
    summary: {
      internalTextRegions: internalTextRegions.length,
      visualTextRegions: visualTextRegions.length,
      internalImages: internalImageCount,
      visualImages: visualImageCount,
      hiddenText: hiddenText.length,
    },
  };
}

// ─── Watermark & Header/Footer Detection ─────────────────────────────────────

/**
 * Detect watermarks, headers, and footers across pages.
 */
export function detectRepeatedElements(pageResults, allContentItems) {
  const results = {
    watermarks: [],
    headers: [],
    footers: [],
    pageNumbers: [],
  };

  // Collect text elements by vertical position
  const topElements = []; // y > 90% of page height (headers)
  const bottomElements = []; // y < 10% of page height (footers)
  const centerElements = []; // middle of page (watermarks)

  for (const [pageId, content] of Object.entries(allContentItems)) {
    const pageHeight = pageResults[pageId]?.pageSize?.height || 792;

    for (const item of content) {
      if (!item.str || item.str.trim().length === 0) continue;

      const y = item.transform?.[5] || 0;
      const normalizedY = y / pageHeight;

      if (normalizedY > 0.9) {
        topElements.push({ text: item.str.trim(), page: pageId, y });
      } else if (normalizedY < 0.1) {
        bottomElements.push({ text: item.str.trim(), page: pageId, y });
      } else if (normalizedY > 0.4 && normalizedY < 0.6) {
        centerElements.push({ text: item.str.trim(), page: pageId, y });
      }
    }
  }

  // Find repeated patterns
  results.headers = findRepeatedPatterns(topElements);
  results.footers = findRepeatedPatterns(bottomElements);
  results.watermarks = findWatermarkPatterns(centerElements);

  // Detect page numbers
  results.pageNumbers = detectPageNumbers(bottomElements);

  return results;
}

/**
 * Find repeated text patterns across pages.
 */
function findRepeatedPatterns(elements) {
  const textCounts = {};
  for (const el of elements) {
    const normalized = el.text.toLowerCase().trim();
    if (normalized.length < 3) continue;
    textCounts[normalized] = (textCounts[normalized] || 0) + 1;
  }

  return Object.entries(textCounts)
    .filter(([text, count]) => count >= 3) // Appears on at least 3 pages
    .map(([text, count]) => ({
      text,
      count,
      type: 'repeated_element',
    }));
}

/**
 * Detect watermark patterns (text that appears on many pages in center).
 */
function findWatermarkPatterns(elements) {
  const textCounts = {};
  for (const el of elements) {
    const normalized = el.text.toLowerCase().trim();
    if (normalized.length < 2) continue;
    textCounts[normalized] = (textCounts[normalized] || 0) + 1;
  }

  return Object.entries(textCounts)
    .filter(([text, count]) => count >= 5) // Appears on at least 5 pages
    .map(([text, count]) => ({
      text,
      count,
      type: 'watermark',
    }));
}

/**
 * Detect page number patterns.
 */
function detectPageNumbers(elements) {
  const pageNumbers = [];
  const numberPattern = /^\d{1,4}$/;

  for (const el of elements) {
    if (numberPattern.test(el.text)) {
      pageNumbers.push({
        text: el.text,
        page: el.page,
        type: 'page_number',
      });
    }
  }

  return pageNumbers;
}

// ─── Text Normalization ──────────────────────────────────────────────────────

/**
 * Normalize text by fixing common issues.
 */
export function normalizeText(text) {
  if (!text) return text;

  let normalized = text;

  // Fix hyphenation at line breaks
  normalized = normalized.replace(/(\w)-\s*\n\s*(\w)/g, '$1$2');

  // Fix ligatures
  normalized = normalized
    .replace(/ﬁ/g, 'fi')
    .replace(/ﬂ/g, 'fl')
    .replace(/ﬃ/g, 'ffi')
    .replace(/ﬄ/g, 'ffl');

  // Fix multiple spaces
  normalized = normalized.replace(/\s{3,}/g, '  ');

  // Fix common OCR errors
  normalized = normalized
    .replace(/\|/g, 'l') // pipe to lowercase L
    .replace(/0O/g, '0') // zero-O confusion
    .replace(/l1/g, 'l'); // one-L confusion

  return normalized;
}

// ─── Redaction Detection ─────────────────────────────────────────────────────

/**
 * Detect potential redactions (black rectangles over text areas).
 */
export function detectRedactions(vectors, contentItems) {
  const redactions = [];

  for (const vec of vectors) {
    if (vec.type === 'rect' && vec.fillColor) {
      const [r, g, b] = vec.fillColor;
      // Check if it's a black or near-black rectangle
      if (r < 0.1 && g < 0.1 && b < 0.1) {
        // Check if it covers text
        const coveredText = contentItems.filter(item => {
          const x = item.transform?.[4] || 0;
          const y = item.transform?.[5] || 0;
          return x >= vec.bbox[0] && x <= vec.bbox[2] &&
                 y >= vec.bbox[1] && y <= vec.bbox[3];
        });

        if (coveredText.length > 0) {
          redactions.push({
            bbox: vec.bbox,
            coveredText: coveredText.map(t => t.str),
            type: 'redaction',
            severity: 'critical',
          });
        }
      }
    }
  }

  return redactions;
}

// ─── Tag Validation ──────────────────────────────────────────────────────────

/**
 * Validate PDF structure tags against actual content.
 */
export function validateTags(pageData, structureTree, contentItems) {
  const issues = [];

  if (!structureTree) {
    issues.push({
      type: 'missing_structure',
      severity: 'warning',
      description: 'No structure tree found for tagged PDF validation',
    });
    return { valid: false, issues };
  }

  // Check for headings that don't match visual appearance
  const headings = extractHeadingsFromStructure(structureTree);
  for (const heading of headings) {
    const matchingText = contentItems.find(item =>
      item.str && item.str.includes(heading.text)
    );

    if (matchingText) {
      const fontSize = Math.abs(matchingText.transform?.[0]) || 12;
      // Headings should typically be larger than body text
      if (fontSize < 14) {
        issues.push({
          type: 'fake_heading',
          severity: 'warning',
          text: heading.text,
          fontSize,
          description: 'Tagged heading has small font size',
        });
      }
    }
  }

  // Check for missing alt text on images
  const images = extractImagesFromStructure(structureTree);
  for (const img of images) {
    if (!img.alt && !img.description) {
      issues.push({
        type: 'missing_alt_text',
        severity: 'warning',
        element: img.id,
        description: 'Image has no alt text',
      });
    }
  }

  // Check for broken tag relationships
  const brokenTags = findBrokenTags(structureTree);
  if (brokenTags.length > 0) {
    issues.push({
      type: 'broken_tags',
      severity: 'error',
      count: brokenTags.length,
      description: 'Structure tags have broken parent-child relationships',
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Extract headings from structure tree.
 */
function extractHeadingsFromStructure(tree, headings = []) {
  if (!tree) return headings;

  if (tree.type === 'heading' || tree.type === 'H1' || tree.type === 'H2') {
    headings.push({
      type: tree.type,
      text: tree.text || '',
      id: tree.id,
    });
  }

  if (tree.children) {
    for (const child of tree.children) {
      extractHeadingsFromStructure(child, headings);
    }
  }

  return headings;
}

/**
 * Extract images from structure tree.
 */
function extractImagesFromStructure(tree, images = []) {
  if (!tree) return images;

  if (tree.type === 'figure' || tree.type === 'image') {
    images.push({
      id: tree.id,
      alt: tree.alt,
      description: tree.description,
    });
  }

  if (tree.children) {
    for (const child of tree.children) {
      extractImagesFromStructure(child, images);
    }
  }

  return images;
}

/**
 * Find broken tag relationships.
 */
function findBrokenTags(tree, broken = []) {
  if (!tree) return broken;

  if (tree.children) {
    for (const child of tree.children) {
      if (!child.type && !child.id) {
        broken.push({
          parentId: tree.id,
          child,
          reason: 'Child has no type or id',
        });
      }
      findBrokenTags(child, broken);
    }
  }

  return broken;
}

// ─── RAG Readiness Scoring ──────────────────────────────────────────────────

/**
 * Calculate RAG readiness score for a document.
 */
export function calculateRAGReadiness(pageResults, textQuality, visualComparison, repeatedElements) {
  let score = 1.0;
  const factors = [];

  // 1. Text quality score
  const avgTextQuality = pageResults.reduce((sum, p) => sum + (p.textQuality?.score || 1), 0) / pageResults.length;
  score *= avgTextQuality;
  factors.push({ factor: 'text_quality', impact: avgTextQuality });

  // 2. Visual/internal agreement
  const avgVisualAgreement = pageResults.reduce((sum, p) => sum + (p.visualComparison?.score || 1), 0) / pageResults.length;
  score *= avgVisualAgreement;
  factors.push({ factor: 'visual_agreement', impact: avgVisualAgreement });

  // 3. Structure completeness
  const pagesWithStructure = pageResults.filter(p => p.hasStructureTree).length;
  const structureRatio = pagesWithStructure / pageResults.length;
  score *= (0.5 + structureRatio * 0.5);
  factors.push({ factor: 'structure_completeness', impact: structureRatio });

  // 4. Reading order confidence
  const pagesWithReadingOrder = pageResults.filter(p => p.readingOrder > 0).length;
  const readingOrderRatio = pagesWithReadingOrder / pageResults.length;
  score *= (0.5 + readingOrderRatio * 0.5);
  factors.push({ factor: 'reading_order', impact: readingOrderRatio });

  // 5. Header/footer pollution
  const headerFooterCount = (repeatedElements.headers?.length || 0) + (repeatedElements.footers?.length || 0);
  if (headerFooterCount > 0) {
    score *= 0.9;
    factors.push({ factor: 'header_footer_pollution', impact: 0.9 });
  }

  // 6. Watermark presence
  if (repeatedElements.watermarks?.length > 0) {
    score *= 0.95;
    factors.push({ factor: 'watermarks', impact: 0.95 });
  }

  // 7. Duplicate text
  const totalDuplicates = pageResults.reduce((sum, p) => sum + (p.textQuality?.summary?.duplicates || 0), 0);
  if (totalDuplicates > 0) {
    score *= 0.95;
    factors.push({ factor: 'duplicate_text', impact: 0.95 });
  }

  return {
    score: Math.max(0, Math.min(1, score)),
    factors,
    recommendations: generateRecommendations(factors, pageResults),
  };
}

/**
 * Generate recommendations for improving RAG readiness.
 */
function generateRecommendations(factors, pageResults) {
  const recommendations = [];

  const textQuality = factors.find(f => f.factor === 'text_quality');
  if (textQuality && textQuality.impact < 0.8) {
    recommendations.push({
      type: 'ocr',
      priority: 'high',
      description: 'Text quality is low. Consider enabling OCR or re-OCR with better settings.',
    });
  }

  const visualAgreement = factors.find(f => f.factor === 'visual_agreement');
  if (visualAgreement && visualAgreement.impact < 0.8) {
    recommendations.push({
      type: 'visual_analysis',
      priority: 'medium',
      description: 'Visual/internal agreement is low. Enable visual analysis to detect hidden text.',
    });
  }

  const structure = factors.find(f => f.factor === 'structure_completeness');
  if (structure && structure.impact < 0.5) {
    recommendations.push({
      type: 'structure',
      priority: 'medium',
      description: 'Document lacks structure. Consider using semantic chunking for better RAG.',
    });
  }

  const readingOrder = factors.find(f => f.factor === 'reading_order');
  if (readingOrder && readingOrder.impact < 0.5) {
    recommendations.push({
      type: 'reading_order',
      priority: 'medium',
      description: 'Reading order detection is poor. Enable spatial analysis for multi-column layouts.',
    });
  }

  return recommendations;
}

// ─── Table Geometric Reconstruction ──────────────────────────────────────────

/**
 * Reconstruct table structure from geometric clues.
 */
export function reconstructTable(vectors, textItems, bbox) {
  const table = {
    rows: [],
    cells: [],
    columns: [],
    mergedCells: [],
  };

  // Find lines in the vectors
  const hLines = []; // Horizontal lines
  const vLines = []; // Vertical lines

  for (const vec of vectors) {
    if (vec.type === 'path' && vec.points) {
      for (let i = 1; i < vec.points.length; i++) {
        const p1 = vec.points[i - 1];
        const p2 = vec.points[i];

        // Check if it's a horizontal line
        if (Math.abs(p1.y - p2.y) < 2 && Math.abs(p1.x - p2.x) > 20) {
          hLines.push({ y: p1.y, x1: Math.min(p1.x, p2.x), x2: Math.max(p1.x, p2.x) });
        }

        // Check if it's a vertical line
        if (Math.abs(p1.x - p2.x) < 2 && Math.abs(p1.y - p2.y) > 20) {
          vLines.push({ x: p1.x, y1: Math.min(p1.y, p2.y), y2: Math.max(p1.y, p2.y) });
        }
      }
    }
  }

  // Sort lines by position
  hLines.sort((a, b) => a.y - b.y);
  vLines.sort((a, b) => a.x - b.x);

  // Find rows (horizontal lines)
  const rows = [];
  let lastY = null;
  for (const line of hLines) {
    if (lastY === null || Math.abs(line.y - lastY) > 5) {
      rows.push(line.y);
      lastY = line.y;
    }
  }

  // Find columns (vertical lines)
  const columns = [];
  lastY = null;
  for (const line of vLines) {
    if (lastY === null || Math.abs(line.x - lastY) > 5) {
      columns.push(line.x);
      lastY = line.x;
    }
  }

  table.rows = rows;
  table.columns = columns;

  // Create cells from grid intersections
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = 0; c < columns.length - 1; c++) {
      const cellBbox = {
        x1: columns[c],
        y1: rows[r],
        x2: columns[c + 1],
        y2: rows[r + 1],
      };

      // Find text items within this cell
      const cellText = textItems.filter(item => {
        const x = item.transform?.[4] || 0;
        const y = item.transform?.[5] || 0;
        return x >= cellBbox.x1 && x <= cellBbox.x2 &&
               y >= cellBbox.y1 && y <= cellBbox.y2;
      });

      table.cells.push({
        row: r,
        column: c,
        bbox: cellBbox,
        text: cellText.map(t => t.str).join(' ').trim(),
        items: cellText,
      });
    }
  }

  // Detect merged cells (cells with no dividing lines)
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = 0; c < columns.length - 1; c++) {
      // Check if there's a vertical line to the right
      const hasRightLine = vLines.some(v =>
        Math.abs(v.x - columns[c + 1]) < 2 &&
        v.y1 <= rows[r] && v.y2 >= rows[r + 1]
      );

      // Check if there's a horizontal line below
      const hasBottomLine = hLines.some(h =>
        Math.abs(h.y - rows[r + 1]) < 2 &&
        h.x1 <= columns[c] && h.x2 >= columns[c + 1]
      );

      if (!hasRightLine || !hasBottomLine) {
        table.mergedCells.push({
          row: r,
          column: c,
          mergeRight: !hasRightLine,
          mergeDown: !hasBottomLine,
        });
      }
    }
  }

  return table;
}

// ─── Health Scan / Diagnosis ─────────────────────────────────────────────────

/**
 * Run comprehensive health scan on the document.
 */
export function diagnoseDocument(pageResults, graph) {
  const ir = graph.getIR();

  const issues = {
    scannedPages: 0,
    brokenTextPages: 0,
    readingOrderProblems: 0,
    duplicateText: 0,
    untaggedTables: 0,
    unrecognizedImages: 0,
    suspiciousOCR: 0,
    accessibilityFailures: 0,
    watermarks: 0,
    redactions: 0,
    invisibleText: 0,
    clippedText: 0,
  };

  let totalScore = 0;

  for (const page of pageResults) {
    // Count scanned pages
    if (page.source === 'ocr') {
      issues.scannedPages++;
    }

    // Count broken text pages
    if (page.source === 'error') {
      issues.brokenTextPages++;
    }

    // Count reading order problems
    if (page.readingOrder === 0 && page.contentBlocks > 3) {
      issues.readingOrderProblems++;
    }

    // Count duplicate text
    issues.duplicateText += page.textQuality?.summary?.duplicates || 0;

    // Count untagged tables
    if (page.structures?.tables && !page.hasStructureTree) {
      issues.untaggedTables += page.structures.tables;
    }

    // Count unrecognized images
    issues.unrecognizedImages += page.visual?.imageRegions?.length || 0;

    // Count suspicious OCR
    if (page.source === 'ocr' && page.confidence && page.confidence < 70) {
      issues.suspiciousOCR++;
    }

    // Count accessibility failures
    issues.accessibilityFailures += page.markedContent?.filter(m => m.isArtifact)?.length || 0;

    // Count invisible/clipped text
    issues.invisibleText += page.textQuality?.summary?.invisibleText || 0;
    issues.clippedText += page.textQuality?.summary?.clippedText || 0;

    // Accumulate quality score
    totalScore += page.textQuality?.score || 1;
  }

  // Count watermarks
  issues.watermarks = pageResults[0]?.repeatedElements?.watermarks?.length || 0;

  // Calculate overall score
  const avgScore = totalScore / pageResults.length;

  // Calculate RAG readiness
  const ragReadiness = calculateRAGReadiness(
    pageResults,
    null,
    null,
    pageResults[0]?.repeatedElements || {}
  );

  return {
    score: Math.round(avgScore * 100),
    pageCount: pageResults.length,
    issues,
    ragReadiness: {
      score: Math.round(ragReadiness.score * 100),
      searchable: avgScore > 0.5,
      needsOCR: issues.scannedPages > pageResults.length * 0.5,
      needsImageAnalysis: issues.unrecognizedImages > 0,
      needsStructureRepair: issues.untaggedTables > 0 || issues.readingOrderProblems > 0,
    },
    recommendations: ragReadiness.recommendations,
  };
}

// ─── Normalization / Repair ──────────────────────────────────────────────────

/**
 * Normalize and repair document issues.
 */
export function normalizeDocument(graph, options = {}) {
  const {
    readingOrder = true,
    ocr = 'auto',
    deduplicate = true,
    tables = true,
    images = true,
    structure = true,
    fixHyphenation = true,
    fixLigatures = true,
    removeWatermarks = true,
  } = options;

  const ir = graph.getIR();
  const repairs = [];

  // 1. Fix text normalization
  if (fixHyphenation || fixLigatures) {
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      for (const textId of (pageData.content || [])) {
        const textObj = ir.objects?.[textId];
        if (textObj?.raw?.text) {
          const original = textObj.raw.text;
          textObj.raw.text = normalizeText(original);
          if (original !== textObj.raw.text) {
            repairs.push({
              type: 'text_normalization',
              page: pageId,
              description: 'Fixed hyphenation/ligatures',
            });
          }
        }
      }
    }
  }

  // 2. Deduplicate text
  if (deduplicate) {
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      const seen = new Set();
      const uniqueContent = [];

      for (const textId of (pageData.content || [])) {
        const textObj = ir.objects?.[textId];
        const text = textObj?.raw?.text || '';
        const normalized = text.toLowerCase().trim();

        if (!seen.has(normalized) || normalized.length < 5) {
          seen.add(normalized);
          uniqueContent.push(textId);
        } else {
          repairs.push({
            type: 'deduplication',
            page: pageId,
            text: text.substring(0, 50),
            description: 'Removed duplicate text',
          });
        }
      }

      pageData.content = uniqueContent;
    }
  }

  // 3. Reconstruct tables
  if (tables) {
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      if (pageData.vectors?.length > 0) {
        const textItems = (pageData.content || [])
          .map(id => ir.objects?.[id])
          .filter(Boolean)
          .map(obj => obj.raw);

        const reconstructed = reconstructTable(pageData.vectors, textItems, pageData);
        if (reconstructed.cells.length > 0) {
          pageData.reconstructedTable = reconstructed;
          repairs.push({
            type: 'table_reconstruction',
            page: pageId,
            cells: reconstructed.cells.length,
            description: 'Reconstructed table structure',
          });
        }
      }
    }
  }

  return {
    success: true,
    repairs,
    repairCount: repairs.length,
  };
}
