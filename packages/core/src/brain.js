/**
 * @codbdocs/core — Document Brain
 *
 * Offline document understanding engine that mimics vision model capabilities
 * using pure JavaScript heuristics + canvas analysis. No server, no CDN.
 *
 * Architecture:
 *   DocumentBrain
 *     ├── SpatialLayer    — where elements are on the page
 *     ├── StructureLayer  — headings, tables, forms, lists
 *     ├── MetadataLayer   — dates, names, addresses, entities
 *     └── SemanticLayer   — page classification, content summaries
 */

// ─── Spatial Analysis ────────────────────────────────────────────────────────

/**
 * Analyze spatial layout of text items on a page.
 * @param {Array} items - PDF.js textContent.items
 * @param {{width:number, height:number}} pageSize
 * @returns {Object} Spatial layout analysis
 */
export function analyzeSpatialLayout(items, pageSize) {
  if (!items || items.length === 0) {
    return { columns: 0, rows: [], headings: [], flow: 'unknown' };
  }

  // Build bounding boxes
  const boxes = items.map(item => {
    const tx = item.transform;
    return {
      text: item.str,
      x: tx[4],
      y: tx[5],
      width: item.width,
      height: item.height,
      fontSize: Math.abs(tx[0]) || Math.abs(tx[3]) || 12,
      fontName: item.fontName || '',
    };
  }).filter(b => b.text.trim());

  // Detect columns by clustering x-coordinates
  const columns = detectColumns(boxes, pageSize.width);

  // Group into rows by y-proximity
  const rows = groupIntoRows(boxes);

  // Detect headings by font size
  const headings = detectHeadings(boxes);

  // Determine text flow direction
  const flow = detectFlow(rows);

  return { columns, rows, headings, flow, boxes };
}

function detectColumns(boxes, pageWidth) {
  if (boxes.length === 0) return 0;

  // Cluster x-positions
  const xPositions = boxes.map(b => b.x).sort((a, b) => a - b);
  const clusters = [];
  let currentCluster = [xPositions[0]];

  for (let i = 1; i < xPositions.length; i++) {
    const gap = xPositions[i] - xPositions[i - 1];
    if (gap > pageWidth * 0.15) {
      clusters.push(currentCluster);
      currentCluster = [xPositions[i]];
    } else {
      currentCluster.push(xPositions[i]);
    }
  }
  clusters.push(currentCluster);

  return Math.min(clusters.length, 4); // max 4 columns
}

function groupIntoRows(boxes) {
  if (boxes.length === 0) return [];

  const sorted = [...boxes].sort((a, b) => b.y - a.y); // top to bottom
  const rows = [];
  let currentRow = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const yDiff = Math.abs(sorted[i].y - currentRow[0].y);
    const avgHeight = currentRow.reduce((s, b) => s + b.height, 0) / currentRow.length;

    if (yDiff < avgHeight * 1.5) {
      currentRow.push(sorted[i]);
    } else {
      currentRow.sort((a, b) => a.x - b.x); // left to right
      rows.push(currentRow);
      currentRow = [sorted[i]];
    }
  }
  currentRow.sort((a, b) => a.x - b.x);
  rows.push(currentRow);

  return rows;
}

function detectHeadings(boxes) {
  if (boxes.length === 0) return [];

  // Find median font size
  const sizes = boxes.map(b => b.fontSize).sort((a, b) => a - b);
  const medianSize = sizes[Math.floor(sizes.length / 2)];

  // Headings are significantly larger than median
  return boxes
    .filter(b => b.fontSize > medianSize * 1.3 && b.text.trim().length > 2)
    .map(b => ({
      text: b.text,
      level: b.fontSize > medianSize * 2 ? 1 : b.fontSize > medianSize * 1.5 ? 2 : 3,
      y: b.y,
      fontSize: b.fontSize,
    }));
}

function detectFlow(rows) {
  if (rows.length < 2) return 'single';

  // Check if rows are roughly left-aligned
  const leftEdges = rows.map(r => r[0]?.x || 0);
  const variance = leftEdges.reduce((s, x) => s + Math.pow(x - leftEdges[0], 2), 0) / leftEdges.length;

  if (variance < 100) return 'left-aligned';
  if (variance < 500) return 'mixed';
  return 'complex';
}

// ─── Structure Detection ─────────────────────────────────────────────────────

/**
 * Detect document structure: tables, forms, lists, paragraphs.
 */
export function detectStructure(spatialResult, pageSize) {
  const { rows, boxes } = spatialResult;
  const structures = [];

  // Detect tables (rows with consistent column alignment)
  const tableRegions = detectTables(rows, pageSize);
  structures.push(...tableRegions);

  // Detect lists (indented items with bullets/numbers)
  const listRegions = detectLists(rows);
  structures.push(...listRegions);

  // Detect form fields (label: value patterns)
  const formFields = detectFormFields(rows);
  structures.push(...formFields);

  // Detect paragraphs (continuous text blocks)
  const paragraphs = detectParagraphs(rows);
  structures.push(...paragraphs);

  // Sort by position (top to bottom)
  structures.sort((a, b) => a.y - b.y);

  return structures;
}

function detectTables(rows, pageSize) {
  const tables = [];
  let tableStart = -1;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cellCount = row.length;

    // Tables typically have 2+ cells per row with consistent spacing
    if (cellCount >= 2) {
      const gaps = [];
      for (let j = 1; j < row.length; j++) {
        gaps.push(row[j].x - (row[j - 1].x + row[j - 1].width));
      }

      // Check if gaps are somewhat consistent (table-like)
      const avgGap = gaps.reduce((s, g) => s + g, 0) / gaps.length;
      const gapVariance = gaps.reduce((s, g) => s + Math.pow(g - avgGap, 2), 0) / gaps.length;

      if (gapVariance < avgGap * avgGap * 2) {
        if (tableStart === -1) tableStart = i;
        continue;
      }
    }

    if (tableStart !== -1 && i - tableStart >= 2) {
      tables.push({
        type: 'table',
        y: rows[tableStart][0]?.y || 0,
        startY: tableStart,
        endY: i - 1,
        rowCount: i - tableStart,
        colCount: Math.max(...rows.slice(tableStart, i).map(r => r.length)),
      });
    }
    tableStart = -1;
  }

  return tables;
}

function detectLists(rows) {
  const lists = [];
  const bulletPattern = /^[\u2022\u2023\u25E6\u2043\u2219\-\*\u25AA\u25AB\u25FB\u25FC]\s/;
  const numberPattern = /^(\d+[\.\)]\s|[a-z][\.\)]\s|[ivxIVX]+[\.\)]\s)/;

  let listStart = -1;
  let listType = null;

  for (let i = 0; i < rows.length; i++) {
    const text = rows[i].map(b => b.text).join(' ').trim();
    const isBullet = bulletPattern.test(text);
    const isNumbered = numberPattern.test(text);

    if (isBullet || isNumbered) {
      const type = isBullet ? 'bullet' : 'numbered';
      if (listStart === -1) {
        listStart = i;
        listType = type;
      }
    } else {
      if (listStart !== -1 && i - listStart >= 2) {
        lists.push({
          type: 'list',
          listType,
          y: rows[listStart][0]?.y || 0,
          itemCount: i - listStart,
          startIndex: listStart,
          endIndex: i - 1,
        });
      }
      listStart = -1;
      listType = null;
    }
  }

  return lists;
}

function detectFormFields(rows) {
  const fields = [];
  const fieldPattern = /^([A-Z][A-Za-z\s]{2,30}):\s*/;

  for (const row of rows) {
    const text = row.map(b => b.text).join(' ');
    const match = text.match(fieldPattern);
    if (match) {
      fields.push({
        type: 'formField',
        label: match[1].trim(),
        y: row[0]?.y || 0,
        hasValue: text.length > match[0].length + 1,
      });
    }
  }

  return fields;
}

function detectParagraphs(rows) {
  const paragraphs = [];
  let paraStart = -1;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const text = row.map(b => b.text).join(' ').trim();

    // Paragraphs: single cell, reasonable length, left-aligned
    const isParagraph = row.length <= 2 && text.length > 50;

    if (isParagraph) {
      if (paraStart === -1) paraStart = i;
    } else {
      if (paraStart !== -1 && i - paraStart >= 2) {
        paragraphs.push({
          type: 'paragraph',
          y: rows[paraStart][0]?.y || 0,
          lineCount: i - paraStart,
        });
      }
      paraStart = -1;
    }
  }

  return paragraphs;
}

// ─── Metadata Extraction ─────────────────────────────────────────────────────

/**
 * Extract metadata entities from text: dates, names, addresses, etc.
 */
export function extractMetadata(text) {
  const entities = {
    dates: extractDates(text),
    phones: extractPhones(text),
    emails: extractEmails(text),
    addresses: extractAddresses(text),
    amounts: extractAmounts(text),
    urls: extractUrls(text),
    zipCodes: extractZipCodes(text),
  };

  return entities;
}

function extractDates(text) {
  const patterns = [
    // MM/DD/YYYY or MM-DD-YYYY
    /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12]\d|3[01])[\/\-](\d{4})\b/g,
    // Month DD, YYYY
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/g,
    // DD Month YYYY
    /\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/g,
    // MM/YYYY
    /\b(0?[1-9]|1[0-2])\/(\d{4})\b/g,
    // Fiscal Year patterns
    /\bFY\s*(\d{4}(?:\s*[-–]\s*\d{2,4})?)\b/gi,
  ];

  const dates = [];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      dates.push({
        raw: match[0],
        position: match.index,
        context: text.substring(Math.max(0, match.index - 30), match.index + match[0].length + 30).trim(),
      });
    }
  }
  return dates;
}

function extractPhones(text) {
  const pattern = /\b(?:\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})\b/g;
  return [...text.matchAll(pattern)].map(m => ({
    raw: m[0],
    position: m.index,
  }));
}

function extractEmails(text) {
  const pattern = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g;
  return [...text.matchAll(pattern)].map(m => ({
    raw: m[0],
    position: m.index,
  }));
}

function extractAddresses(text) {
  const pattern = /\b\d{1,5}\s+[\w\s]{2,40}(?:Street|St|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Road|Rd|Lane|Ln|Court|Ct|Place|Pl|Way|Circle|Cir)\b/gi;
  return [...text.matchAll(pattern)].map(m => ({
    raw: m[0],
    position: m.index,
  }));
}

function extractAmounts(text) {
  const pattern = /\$[\d,]+(?:\.\d{2})?/g;
  return [...text.matchAll(pattern)].map(m => ({
    raw: m[0],
    value: parseFloat(m[0].replace(/[$,]/g, '')),
    position: m.index,
  }));
}

function extractUrls(text) {
  const pattern = /https?:\/\/[^\s<>"]+/g;
  return [...text.matchAll(pattern)].map(m => ({
    raw: m[0],
    position: m.index,
  }));
}

function extractZipCodes(text) {
  const pattern = /\b\d{5}(?:-\d{4})?\b/g;
  const zips = [];
  const seen = new Set();
  for (const m of text.matchAll(pattern)) {
    const zip = m[0];
    // Filter out likely non-zip numbers
    if (!seen.has(zip) && !/^\d{5}$/.test(zip) || true) {
      zips.push({ raw: zip, position: m.index });
      seen.add(zip);
    }
  }
  return zips;
}

// ─── Semantic Classification ─────────────────────────────────────────────────

/**
 * Classify page content type and generate summary.
 */
export function classifyPage(text, spatialResult) {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  // Empty page
  if (charCount < 10) return { type: 'blank', confidence: 1.0, summary: 'Blank or image-only page' };

  // Check for common patterns
  const patterns = {
    cover: /^[\s\S]{0,100}(title|cover|report|annual|city of daytona)/i,
    table_of_contents: /(table of contents|contents|toc|index)/i,
    letter: /(dear|sincerely|regards|attention|re:)/i,
    memo: /(memo|memorandum|from:|to:|subject:|date:)/i,
    form: /(application|form|permit|license|registration)/i,
    legal: /(ordinance|resolution|charter|section \d|article \d)/i,
    budget: /(budget|appropriation|expenditure|revenue|fiscal)/i,
    report: /(report|analysis|review|assessment|evaluation)/i,
    map: /(map|zone|district|parcel|lot)/i,
    contract: /(agreement|contract|party|parties|hereby)/i,
    minutes: /(minutes|meeting|council|commission|public hearing)/i,
    policy: /(policy|procedure|guideline|regulation|compliance)/i,
    agenda: /(agenda|scheduled|item \d|old business|new business)/i,
  };

  let bestType = 'document';
  let bestConfidence = 0.3;

  for (const [type, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    if (match) {
      const confidence = Math.min(0.9, 0.5 + (match[0].length / charCount) * 5);
      if (confidence > bestConfidence) {
        bestType = type;
        bestConfidence = confidence;
      }
    }
  }

  // Generate summary
  const summary = generateSummary(text, bestType);

  return { type: bestType, confidence: bestConfidence, summary, wordCount, charCount };
}

function generateSummary(text, type) {
  const lines = text.split('\n').filter(l => l.trim());
  const firstLines = lines.slice(0, 5).join(' ').substring(0, 200);
  return `[${type}] ${firstLines}...`;
}

// ─── Visual Analysis (Canvas-based) ──────────────────────────────────────────

/**
 * Analyze rendered page visually using canvas.
 * Detects regions: headers, footers, images, whitespace blocks.
 */
export function analyzeVisualRegions(canvas) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Scan horizontal bands for content density
  const bandHeight = Math.floor(height / 20); // 20 bands
  const bands = [];

  for (let y = 0; y < height; y += bandHeight) {
    let darkPixels = 0;
    let totalPixels = 0;

    for (let py = y; py < Math.min(y + bandHeight, height); py++) {
      for (let px = 0; px < width; px++) {
        const idx = (py * width + px) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const brightness = (r + g + b) / 3;
        totalPixels++;
        if (brightness < 128) darkPixels++;
      }
    }

    const density = darkPixels / totalPixels;
    bands.push({
      y,
      height: bandHeight,
      density,
      type: density < 0.02 ? 'white' : density > 0.15 ? 'image' : 'text',
    });
  }

  // Identify header/footer regions (top/bottom 15% with low density)
  const headerEnd = Math.floor(bands.length * 0.15);
  const footerStart = Math.floor(bands.length * 0.85);

  const regions = {
    header: bands.slice(0, headerEnd).some(b => b.type === 'text'),
    footer: bands.slice(footerStart).some(b => b.type === 'text'),
    hasImages: bands.some(b => b.type === 'image'),
    contentBands: bands.filter(b => b.type === 'text').length,
    imageBands: bands.filter(b => b.type === 'image').length,
    whiteBands: bands.filter(b => b.type === 'white').length,
  };

  return regions;
}
