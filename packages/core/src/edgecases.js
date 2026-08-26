/**
 * @codbdocs/core — PDF Edge Cases & Advanced Detection
 *
 * Addresses remaining PDF failures from review.txt:
 * - Rotation/skew detection and normalization
 * - Glyph/ToUnicode map detection
 * - Outlined text detection
 * - Flattened forms visual recovery
 * - Checkbox/radio button spatial detection
 * - Cross-page table recognition
 * - Caption-image association
 * - Footnote reference preservation
 * - Language detection
 * - Malformed PDF recovery hints
 */

// ─── Rotation & Skew Detection ───────────────────────────────────────────────

/**
 * Detect page rotation and skew angle.
 */
export function detectRotationSkew(pageData, contentItems, vectors) {
  const result = {
    rotation: pageData.rotation || 0,
    skewAngle: 0,
    isRotated: false,
    isSkewed: false,
    confidence: 1.0,
    recommendation: null,
  };

  // Check explicit rotation
  if (result.rotation !== 0) {
    result.isRotated = true;
    result.recommendation = 'Page has explicit rotation applied';
  }

  // Detect skew from text alignment
  if (contentItems.length > 10) {
    const skew = detectSkewFromText(contentItems);
    result.skewAngle = skew.angle;
    result.isSkewed = Math.abs(skew.angle) > 0.5;
    result.confidence = skew.confidence;

    if (result.isSkewed) {
      result.recommendation = `Page appears skewed by ${skew.angle.toFixed(2)} degrees. Consider deskewing.`;
    }
  }

  // Detect rotation from text direction
  if (contentItems.length > 5) {
    const textDirection = detectTextDirection(contentItems);
    if (textDirection === 'vertical') {
      result.recommendation = 'Text appears vertical - page may be rotated 90°';
    } else if (textDirection === 'upside-down') {
      result.recommendation = 'Text appears upside-down - page may be rotated 180°';
    }
  }

  return result;
}

/**
 * Detect skew angle from text item positions.
 */
function detectSkewFromText(items) {
  if (items.length < 5) return { angle: 0, confidence: 0 };

  // Collect text baselines
  const baselines = [];
  for (const item of items) {
    if (!item.str || item.str.trim().length < 2) continue;
    const y = item.transform?.[5] || 0;
    const x = item.transform?.[4] || 0;
    baselines.push({ x, y });
  }

  if (baselines.length < 3) return { angle: 0, confidence: 0 };

  // Sort by x position
  baselines.sort((a, b) => a.x - b.x);

  // Calculate average slope of text lines
  let totalAngle = 0;
  let count = 0;

  for (let i = 1; i < baselines.length; i++) {
    const dx = baselines[i].x - baselines[i - 1].x;
    const dy = baselines[i].y - baselines[i - 1].y;
    
    if (Math.abs(dx) > 10) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      // Only consider small angles (likely skew, not rotated)
      if (Math.abs(angle) < 15) {
        totalAngle += angle;
        count++;
      }
    }
  }

  const avgAngle = count > 0 ? totalAngle / count : 0;
  const confidence = Math.min(1, count / 10);

  return { angle: avgAngle, confidence };
}

/**
 * Detect text direction (horizontal, vertical, upside-down).
 */
function detectTextDirection(items) {
  if (items.length < 3) return 'horizontal';

  // Check if text items are arranged vertically
  const sortedByY = [...items].sort((a, b) => (b.transform?.[5] || 0) - (a.transform?.[5] || 0));
  const yVariance = calculateVariance(sortedByY.map(i => i.transform?.[5] || 0));
  const xVariance = calculateVariance(sortedByY.map(i => i.transform?.[4] || 0));

  if (yVariance > xVariance * 2) {
    return 'vertical';
  }

  // Check if text is upside-down (y decreases as x increases)
  let upsideDownCount = 0;
  for (let i = 1; i < items.length; i++) {
    const prev = items[i - 1];
    const curr = items[i];
    if ((curr.transform?.[4] || 0) > (prev.transform?.[4] || 0) &&
        (curr.transform?.[5] || 0) < (prev.transform?.[5] || 0)) {
      upsideDownCount++;
    }
  }

  if (upsideDownCount > items.length * 0.5) {
    return 'upside-down';
  }

  return 'horizontal';
}

/**
 * Calculate variance of an array of numbers.
 */
function calculateVariance(arr) {
  if (arr.length === 0) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
}

// ─── Glyph/ToUnicode Map Detection ──────────────────────────────────────────

/**
 * Detect glyph encoding issues and missing ToUnicode maps.
 */
export function detectGlyphIssues(pageData, contentItems) {
  const issues = [];

  // 1. Check for PUA (Private Use Area) characters
  const puaChars = contentItems.filter(item => {
    const text = item.str || '';
    return /[\uE000-\uF8FF]/.test(text);
  });

  if (puaChars.length > 0) {
    issues.push({
      type: 'pua_characters',
      severity: 'warning',
      count: puaChars.length,
      samples: puaChars.slice(0, 3).map(i => i.str),
      description: 'Private Use Area characters found - possible missing ToUnicode map',
    });
  }

  // 2. Check for replacement characters
  const replacementChars = contentItems.filter(item => {
    const text = item.str || '';
    return /\uFFFD/.test(text);
  });

  if (replacementChars.length > 0) {
    issues.push({
      type: 'replacement_characters',
      severity: 'error',
      count: replacementChars.length,
      description: 'Unicode replacement characters found - encoding issue',
    });
  }

  // 3. Check for excessive non-BMP characters
  const nonBMP = contentItems.filter(item => {
    const text = item.str || '';
    return /[\u{10000}-\u{10FFFF}]/u.test(text);
  });

  if (nonBMP.length > 0) {
    issues.push({
      type: 'non_bmp_characters',
      severity: 'info',
      count: nonBMP.length,
      description: 'Non-BMP characters found - may indicate complex script or encoding',
    });
  }

  // 4. Check for font encoding mismatches
  const fontIssues = detectFontEncodingMismatches(contentItems);
  if (fontIssues.length > 0) {
    issues.push({
      type: 'font_encoding_mismatch',
      severity: 'warning',
      count: fontIssues.length,
      fonts: [...new Set(fontIssues.map(f => f.font))],
      description: 'Font encoding may not match character encoding',
    });
  }

  // 5. Check for missing glyphs (tofu)
  const tofu = contentItems.filter(item => {
    const text = item.str || '';
    return /\u25A1/.test(text); // White square (common tofu indicator)
  });

  if (tofu.length > 0) {
    issues.push({
      type: 'missing_glyphs',
      severity: 'warning',
      count: tofu.length,
      description: 'Missing glyph indicators found - font may not support all characters',
    });
  }

  return {
    issues,
    hasGlyphIssues: issues.length > 0,
    puaCount: puaChars.length,
    replacementCount: replacementChars.length,
  };
}

/**
 * Detect font encoding mismatches.
 */
function detectFontEncodingMismatches(items) {
  const mismatches = [];
  const fontGroups = {};

  // Group items by font
  for (const item of items) {
    const font = item.fontName || 'unknown';
    if (!fontGroups[font]) fontGroups[font] = [];
    fontGroups[font].push(item);
  }

  // Check each font group for encoding issues
  for (const [font, fontItems] of Object.entries(fontGroups)) {
    const allText = fontItems.map(i => i.str || '').join('');
    
    // Check for mixed encodings (some ASCII, some PUA)
    const hasASCII = /[a-zA-Z]/.test(allText);
    const hasPUA = /[\uE000-\uF8FF]/.test(allText);
    
    if (hasASCII && hasPUA) {
      mismatches.push({ font, reason: 'Mixed ASCII and PUA characters' });
    }
  }

  return mismatches;
}

// ─── Outlined Text Detection ─────────────────────────────────────────────────

/**
 * Detect text that is rendered as vector paths (outlined text).
 */
export function detectOutlinedText(vectors, contentItems) {
  const outlinedText = [];

  // Look for vector paths that look like text characters
  for (const vec of vectors) {
    if (vec.type === 'path' && vec.points && vec.points.length > 5) {
      // Check if the path resembles a text character
      const bbox = vec.bbox || calculateBBox(vec.points);
      const width = bbox[2] - bbox[0];
      const height = bbox[3] - bbox[1];

      // Text characters are typically taller than wide (or vice versa for CJK)
      const aspectRatio = width / height;
      if (aspectRatio > 0.2 && aspectRatio < 5 && height > 5 && height < 100) {
        // Check if there's overlapping text
        const overlappingText = contentItems.filter(item => {
          const x = item.transform?.[4] || 0;
          const y = item.transform?.[5] || 0;
          return x >= bbox[0] - 5 && x <= bbox[2] + 5 &&
                 y >= bbox[1] - 5 && y <= bbox[3] + 5;
        });

        if (overlappingText.length === 0) {
          outlinedText.push({
            bbox,
            pathLength: vec.points.length,
            type: 'outlined_text_candidate',
          });
        }
      }
    }
  }

  return {
    hasOutlinedText: outlinedText.length > 0,
    candidates: outlinedText,
    count: outlinedText.length,
  };
}

/**
 * Calculate bounding box from points.
 */
function calculateBBox(points) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const pt of points) {
    if (pt.x < minX) minX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y > maxY) maxY = pt.y;
  }
  return [minX, minY, maxX, maxY];
}

// ─── Flattened Forms Detection ───────────────────────────────────────────────

/**
 * Detect flattened form fields (visual but no data layer).
 */
export function detectFlattenedForms(vectors, contentItems, annotations) {
  const result = {
    hasFlattenedForms: false,
    candidates: [],
    recoveredFields: [],
  };

  // Look for visual form patterns without corresponding form fields
  const formPatterns = findFormPatterns(vectors, contentItems);
  const formFields = annotations.filter(a => a.subtype === 'Widget');

  // If we see form-like patterns but no form fields, it's likely flattened
  if (formPatterns.length > 0 && formFields.length === 0) {
    result.hasFlattenedForms = true;
    result.candidates = formPatterns;

    // Try to recover field values
    for (const pattern of formPatterns) {
      const recovered = recoverFormField(pattern, contentItems);
      if (recovered) {
        result.recoveredFields.push(recovered);
      }
    }
  }

  return result;
}

/**
 * Find visual patterns that look like form fields.
 */
function findFormPatterns(vectors, contentItems) {
  const patterns = [];

  // Look for rectangles that could be form fields
  for (const vec of vectors) {
    if (vec.type === 'rect') {
      const bbox = vec.bbox;
      const width = bbox[2] - bbox[0];
      const height = bbox[3] - bbox[1];

      // Form fields are typically rectangular with certain proportions
      if (width > 50 && width < 400 && height > 10 && height < 50) {
        // Check if there's text nearby (label)
        const nearbyText = contentItems.filter(item => {
          const x = item.transform?.[4] || 0;
          const y = item.transform?.[5] || 0;
          return x < bbox[0] && Math.abs(y - bbox[1]) < height;
        });

        if (nearbyText.length > 0) {
          patterns.push({
            bbox,
            label: nearbyText.map(t => t.str).join(' ').trim(),
            type: 'form_field_candidate',
          });
        }
      }
    }
  }

  return patterns;
}

/**
 * Recover form field value from visual pattern.
 */
function recoverFormField(pattern, contentItems) {
  const bbox = pattern.bbox;

  // Find text inside the form field area
  const insideText = contentItems.filter(item => {
    const x = item.transform?.[4] || 0;
    const y = item.transform?.[5] || 0;
    return x >= bbox[0] && x <= bbox[2] &&
           y >= bbox[1] && y <= bbox[3];
  });

  if (insideText.length > 0) {
    return {
      label: pattern.label,
      value: insideText.map(t => t.str).join(' ').trim(),
      bbox,
      confidence: 0.7,
    };
  }

  // Check for checkbox marks (filled rectangles)
  const hasCheckmark = detectCheckmarkInArea(bbox, []);
  if (hasCheckmark) {
    return {
      label: pattern.label,
      value: 'checked',
      bbox,
      confidence: 0.8,
    };
  }

  return null;
}

// ─── Checkbox/Radio Button Detection ────────────────────────────────────────

/**
 * Detect checkboxes and radio buttons spatially.
 */
export function detectCheckboxes(vectors, contentItems) {
  const checkboxes = [];

  // Look for square/rectangular shapes that could be checkboxes
  for (const vec of vectors) {
    if (vec.type === 'rect') {
      const bbox = vec.bbox;
      const width = bbox[2] - bbox[0];
      const height = bbox[3] - bbox[1];

      // Checkboxes are typically square-ish
      if (width > 8 && width < 30 && height > 8 && height < 30 &&
          Math.abs(width - height) < 5) {
        
        // Check if there's a label nearby
        const nearbyLabel = contentItems.filter(item => {
          const x = item.transform?.[4] || 0;
          const y = item.transform?.[5] || 0;
          return x > bbox[2] && Math.abs(y - bbox[1]) < height * 2;
        });

        // Check if checkbox appears filled (has content inside)
        const isFilled = detectCheckmarkInArea(bbox, vectors);

        checkboxes.push({
          bbox,
          label: nearbyLabel.map(t => t.str).join(' ').trim() || null,
          checked: isFilled,
          type: 'checkbox',
        });
      }
    }
  }

  // Look for radio buttons (circles)
  for (const vec of vectors) {
    if (vec.type === 'circle' || (vec.type === 'path' && isCircularPath(vec.points))) {
      const bbox = vec.bbox || calculateBBox(vec.points || []);
      const diameter = bbox[2] - bbox[0];

      if (diameter > 8 && diameter < 30) {
        const nearbyLabel = contentItems.filter(item => {
          const x = item.transform?.[4] || 0;
          const y = item.transform?.[5] || 0;
          return x > bbox[2] && Math.abs(y - bbox[1]) < diameter * 2;
        });

        const isFilled = detectCheckmarkInArea(bbox, vectors);

        checkboxes.push({
          bbox,
          label: nearbyLabel.map(t => t.str).join(' ').trim() || null,
          checked: isFilled,
          type: 'radio',
        });
      }
    }
  }

  return {
    count: checkboxes.length,
    checkboxes,
    checked: checkboxes.filter(c => c.checked).length,
    unchecked: checkboxes.filter(c => !c.checked).length,
  };
}

/**
 * Detect if a path is roughly circular.
 */
function isCircularPath(points) {
  if (!points || points.length < 8) return false;
  
  const bbox = calculateBBox(points);
  const width = bbox[2] - bbox[0];
  const height = bbox[3] - bbox[1];
  
  return Math.abs(width - height) < width * 0.2;
}

/**
 * Detect if an area contains a checkmark or fill.
 */
function detectCheckmarkInArea(areaBbox, vectors) {
  // Simple heuristic: check if there are vectors inside the area
  for (const vec of vectors) {
    if (vec.type === 'path' && vec.points) {
      const pointCount = vec.points.filter(pt => 
        pt.x >= areaBbox[0] && pt.x <= areaBbox[2] &&
        pt.y >= areaBbox[1] && pt.y <= areaBbox[3]
      ).length;

      if (pointCount > vec.points.length * 0.3) {
        return true;
      }
    }
  }
  return false;
}

// ─── Cross-Page Table Recognition ───────────────────────────────────────────

/**
 * Recognize tables that span multiple pages.
 */
export function detectCrossPageTables(pageResults, ir) {
  const crossPageTables = [];

  // Group pages by similar table structure
  const tablePages = {};
  for (const [pageId, pageData] of Object.entries(ir.pages)) {
    if (pageData.reconstructedTable && pageData.reconstructedTable.cells.length > 0) {
      const table = pageData.reconstructedTable;
      const key = `${table.columns.length}_${table.rows.length}`;
      
      if (!tablePages[key]) tablePages[key] = [];
      tablePages[key].push({
        pageId,
        table,
        pageNum: parseInt(pageId.replace('page_', '')),
      });
    }
  }

  // Find consecutive pages with same table structure
  for (const [key, pages] of Object.entries(tablePages)) {
    if (pages.length < 2) continue;

    // Sort by page number
    pages.sort((a, b) => a.pageNum - b.pageNum);

    // Find consecutive sequences
    let currentSequence = [pages[0]];
    for (let i = 1; i < pages.length; i++) {
      if (pages[i].pageNum === currentSequence[currentSequence.length - 1].pageNum + 1) {
        currentSequence.push(pages[i]);
      } else {
        if (currentSequence.length >= 2) {
          crossPageTables.push({
            startPage: currentSequence[0].pageNum,
            endPage: currentSequence[currentSequence.length - 1].pageNum,
            pageCount: currentSequence.length,
            columns: currentSequence[0].table.columns.length,
            type: 'cross_page_table',
          });
        }
        currentSequence = [pages[i]];
      }
    }

    // Check final sequence
    if (currentSequence.length >= 2) {
      crossPageTables.push({
        startPage: currentSequence[0].pageNum,
        endPage: currentSequence[currentSequence.length - 1].pageNum,
        pageCount: currentSequence.length,
        columns: currentSequence[0].table.columns.length,
        type: 'cross_page_table',
      });
    }
  }

  return {
    count: crossPageTables.length,
    tables: crossPageTables,
  };
}

// ─── Caption-Image Association ───────────────────────────────────────────────

/**
 * Associate captions with images based on spatial proximity.
 */
export function associateCaptionsWithImages(pageData, contentItems, images) {
  const associations = [];

  for (const image of images) {
    const imageBbox = image.bbox;

    // Find text below the image (likely caption)
    const captionsBelow = contentItems.filter(item => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      const text = item.str || '';

      // Text should be below the image and roughly centered
      return y < imageBbox.y &&
            y > imageBbox.y - 50 &&
            Math.abs((x + (item.width || 0) / 2) - (imageBbox.x + imageBbox.width / 2)) < imageBbox.width &&
            (text.startsWith('Figure') || text.startsWith('Image') || text.startsWith('Table') ||
             text.startsWith('Fig.') || text.startsWith('Img.') || /^\d+\./.test(text));
    });

    // Find text above the image (could be title)
    const titlesAbove = contentItems.filter(item => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      const text = item.str || '';

      return y > imageBbox.y + imageBbox.height &&
            y < imageBbox.y + imageBbox.height + 30 &&
            Math.abs((x + (item.width || 0) / 2) - (imageBbox.x + imageBbox.width / 2)) < imageBbox.width * 1.5 &&
            text.length > 5;
    });

    if (captionsBelow.length > 0 || titlesAbove.length > 0) {
      associations.push({
        image: {
          bbox: imageBbox,
          id: image.id,
        },
        caption: captionsBelow.map(t => t.str).join(' ').trim() || null,
        title: titlesAbove.map(t => t.str).join(' ').trim() || null,
        confidence: captionsBelow.length > 0 ? 0.9 : 0.6,
      });
    }
  }

  return associations;
}

// ─── Footnote Reference Preservation ────────────────────────────────────────

/**
 * Detect and preserve footnote references.
 */
export function detectFootnotes(contentItems, pageData) {
  const footnotes = [];
  const footnoteRefs = [];

  // Detect footnote markers (superscript numbers)
  for (const item of contentItems) {
    const text = item.str || '';
    const fontSize = Math.abs(item.transform?.[0]) || 12;

    // Check for superscript numbers (smaller font, higher position)
    if (/^\d{1,3}$/.test(text) && fontSize < 10) {
      footnoteRefs.push({
        text,
        bbox: [item.transform?.[4] || 0, item.transform?.[5] || 0],
        fontSize,
        type: 'footnote_reference',
      });
    }

    // Check for footnote patterns (1. or a. at start of line)
    if (/^\d{1,2}\.\s/.test(text) || /^[a-z]\.\s/.test(text)) {
      const y = item.transform?.[5] || 0;
      const pageHeight = pageData.height || 792;

      // Footnotes are typically at the bottom of the page
      if (y < pageHeight * 0.2) {
        footnotes.push({
          text,
          bbox: [item.transform?.[4] || 0, y],
          marker: text.match(/^(\d{1,2}|[a-z])\./)?.[1],
          type: 'footnote',
        });
      }
    }
  }

  // Associate references with footnotes
  const associations = [];
  for (const ref of footnoteRefs) {
    const matchingNote = footnotes.find(fn => fn.marker === ref.text);
    if (matchingNote) {
      associations.push({
        reference: ref,
        note: matchingNote,
        type: 'footnote_association',
      });
    }
  }

  return {
    footnotes,
    footnoteRefs,
    associations,
    count: footnotes.length,
  };
}

// ─── Language Detection ──────────────────────────────────────────────────────

/**
 * Detect probable language of text content.
 */
export function detectLanguage(contentItems) {
  const allText = contentItems.map(i => i.str || '').join(' ');
  
  if (allText.length < 50) {
    return { language: 'unknown', confidence: 0 };
  }

  // Simple language detection based on common words/patterns
  const languages = {
    en: { words: ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'that', 'it', 'for'], weight: 1 },
    es: { words: ['el', 'la', 'de', 'en', 'y', 'los', 'las', 'un', 'una', 'que'], weight: 1 },
    fr: { words: ['le', 'la', 'de', 'et', 'est', 'en', 'les', 'des', 'un', 'une'], weight: 1 },
    de: { words: ['der', 'die', 'und', 'ist', 'von', 'den', 'das', 'ein', 'eine', 'auf'], weight: 1 },
    pt: { words: ['o', 'a', 'de', 'e', 'em', 'os', 'as', 'um', 'uma', 'que'], weight: 1 },
    it: { words: ['il', 'la', 'di', 'che', 'è', 'in', 'le', 'del', 'un', 'una'], weight: 1 },
    nl: { words: ['de', 'het', 'een', 'van', 'en', 'is', 'dat', 'op', 'te', 'voor'], weight: 1 },
    ru: { words: ['и', 'в', 'не', 'на', 'что', 'он', 'как', 'это', 'по', 'но'], weight: 0.8 },
    zh: { words: ['的', '是', '在', '了', '不', '有', '和', '就', '人', '都'], weight: 0.8 },
    ja: { words: ['の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し'], weight: 0.8 },
  };

  const words = allText.toLowerCase().split(/\s+/);
  const scores = {};

  for (const [lang, config] of Object.entries(languages)) {
    let count = 0;
    for (const word of words) {
      if (config.words.includes(word)) {
        count++;
      }
    }
    scores[lang] = (count / words.length) * config.weight;
  }

  // Find the best match
  let bestLang = 'unknown';
  let bestScore = 0;
  for (const [lang, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestLang = lang;
    }
  }

  return {
    language: bestLang,
    confidence: Math.min(1, bestScore * 10),
    scores,
  };
}

// ─── Malformed PDF Recovery Hints ────────────────────────────────────────────

/**
 * Detect malformed PDF patterns and provide recovery hints.
 */
export function detectMalformedPDF(pdf) {
  const hints = [];

  // Check for common malformation patterns
  // These would be checked against the raw PDF data if available

  // 1. Missing required dictionaries
  if (!pdf?.catalog) {
    hints.push({
      type: 'missing_catalog',
      severity: 'error',
      description: 'PDF catalog dictionary is missing',
      recovery: 'Try opening with a repair-capable PDF library',
    });
  }

  // 2. Broken cross-reference table
  if (pdf?.xrefBroken) {
    hints.push({
      type: 'broken_xref',
      severity: 'error',
      description: 'Cross-reference table appears corrupted',
      recovery: 'Rebuild xref table using repair tools',
    });
  }

  // 3. Missing page tree
  if (!pdf?.pages) {
    hints.push({
      type: 'missing_pages',
      severity: 'error',
      description: 'Page tree is missing or invalid',
      recovery: 'Extract pages using alternative methods',
    });
  }

  // 4. Encrypted without password
  if (pdf?.encrypted && !pdf?.password) {
    hints.push({
      type: 'encrypted_no_password',
      severity: 'warning',
      description: 'PDF is encrypted but no password provided',
      recovery: 'Provide password or use decryption tools',
    });
  }

  // 5. Truncated file
  if (pdf?.truncated) {
    hints.push({
      type: 'truncated_file',
      severity: 'error',
      description: 'PDF file appears to be truncated',
      recovery: 'File may be incomplete - try re-downloading',
    });
  }

  return {
    isMalformed: hints.length > 0,
    hints,
    severity: hints.some(h => h.severity === 'error') ? 'error' :
              hints.some(h => h.severity === 'warning') ? 'warning' : 'info',
  };
}
