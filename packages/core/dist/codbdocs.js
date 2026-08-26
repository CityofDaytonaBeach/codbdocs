var CodbDocs = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    BlockTypes: () => BlockTypes,
    ChunkStrategies: () => ChunkStrategies,
    CodbDocs: () => CodbDocs,
    CodbFingerprint: () => CodbFingerprint,
    ColorSpaceTypes: () => ColorSpaceTypes,
    ConceptEdge: () => ConceptEdge,
    ConceptGraph: () => ConceptGraph,
    ConceptNode: () => ConceptNode,
    ContentBlock: () => ContentBlock,
    CustomEmbeddingProvider: () => CustomEmbeddingProvider,
    DocumentContentGraph: () => DocumentContentGraph,
    DocumentGraph: () => DocumentGraph,
    EmbeddingProvider: () => EmbeddingProvider,
    EntityTypes: () => EntityTypes,
    LocalEmbeddingProvider: () => LocalEmbeddingProvider,
    OpenAIEmbeddingProvider: () => OpenAIEmbeddingProvider,
    PDFCreator: () => PDFCreator,
    PageContentGraph: () => PageContentGraph,
    QueryIntent: () => QueryIntent,
    analyzeSpatialLayout: () => analyzeSpatialLayout,
    analyzeTextQuality: () => analyzeTextQuality,
    analyzeVisualRegions: () => analyzeVisualRegions,
    associateCaptionsWithImages: () => associateCaptionsWithImages,
    bestFuzzyMatch: () => bestFuzzyMatch,
    buildActionsSummary: () => buildActionsSummary,
    buildAppearanceStreamsSummary: () => buildAppearanceStreamsSummary,
    buildCrossPageContext: () => buildCrossPageContext,
    buildEmbeddedFilesSummary: () => buildEmbeddedFilesSummary,
    buildGraphicsStateSummary: () => buildGraphicsStateSummary,
    buildOCGSummary: () => buildOCGSummary,
    buildRevisionsSummary: () => buildRevisionsSummary,
    buildSignatureSummary: () => buildSignatureSummary,
    buildTableObjects: () => buildTableObjects,
    buildXObjectSummary: () => buildXObjectSummary,
    calculateRAGReadiness: () => calculateRAGReadiness,
    charNGrams: () => charNGrams,
    classifyPage: () => classifyPage,
    clearCache: () => clearCache,
    cmykToRgb: () => cmykToRgb,
    compareVisualInternal: () => compareVisualInternal,
    createChunks: () => createChunks,
    createGradientShading: () => createGradientShading,
    createHighlightAnnotations: () => createHighlightAnnotations,
    createPDF: () => createPDF,
    createRAGOutput: () => createRAGOutput,
    createRAGOutputWithEmbeddings: () => createRAGOutputWithEmbeddings,
    createSoftMask: () => createSoftMask,
    createTextPDF: () => createTextPDF,
    createTilingPattern: () => createTilingPattern,
    createTransparencyGroup: () => createTransparencyGroup,
    createWorkspace: () => createWorkspace,
    decomposeQuery: () => decomposeQuery,
    default: () => index_default,
    detectAcronyms: () => detectAcronyms,
    detectCheckboxes: () => detectCheckboxes,
    detectCrossPageTables: () => detectCrossPageTables,
    detectDefinitions: () => detectDefinitions,
    detectFlattenedForms: () => detectFlattenedForms,
    detectFootnotes: () => detectFootnotes,
    detectGlyphIssues: () => detectGlyphIssues,
    detectIntent: () => detectIntent,
    detectLanguage: () => detectLanguage,
    detectMalformedPDF: () => detectMalformedPDF,
    detectOutlinedText: () => detectOutlinedText,
    detectRedactions: () => detectRedactions,
    detectRepeatedElements: () => detectRepeatedElements,
    detectRotationSkew: () => detectRotationSkew,
    detectStructure: () => detectStructure,
    diagnoseDocument: () => diagnoseDocument,
    executeAsk: () => executeAsk,
    executeQuery: () => executeQuery,
    executeReasoning: () => executeReasoning,
    expandQuery: () => expandQuery,
    exportAccessibleHTML: () => exportAccessibleHTML,
    exportAsCSV: () => exportAsCSV,
    exportAsJSONL: () => exportAsJSONL,
    extractActions: () => extractActions,
    extractAllImages: () => extractAllImages,
    extractAppearanceStreams: () => extractAppearanceStreams,
    extractArtifacts: () => extractArtifacts,
    extractDocumentMetadata: () => extractDocumentMetadata,
    extractEmbeddedFiles: () => extractEmbeddedFiles,
    extractGlyphs: () => extractGlyphs,
    extractGraphicsState: () => extractGraphicsState,
    extractImages: () => extractImages,
    extractMarkedContent: () => extractMarkedContent,
    extractMetadata: () => extractMetadata,
    extractNamedDestinations: () => extractNamedDestinations,
    extractOCGs: () => extractOCGs,
    extractOutline: () => extractOutline,
    extractPageLabels: () => extractPageLabels,
    extractRelationships: () => extractRelationships,
    extractRevisions: () => extractRevisions,
    extractSecurity: () => extractSecurity,
    extractSignatures: () => extractSignatures,
    fuzzyScore: () => fuzzyScore,
    fuzzySearch: () => fuzzySearch,
    generateAccessibilityReport: () => generateAccessibilityReport,
    generateRemediations: () => generateRemediations,
    getCacheStats: () => getCacheStats,
    highlightResults: () => highlightResults,
    hybridSearch: () => hybridSearch,
    labToRgb: () => labToRgb,
    learnTerminology: () => learnTerminology2,
    levenshtein: () => levenshtein,
    loadFromCache: () => loadFromCache,
    normalizeDocument: () => normalizeDocument,
    normalizeText: () => normalizeText,
    operatorCount: () => operatorCount,
    operatorMax: () => operatorMax,
    operatorMin: () => operatorMin,
    operatorSum: () => operatorSum,
    parseBlendMode: () => parseBlendMode,
    parseShading: () => parseShading,
    queryTable: () => queryTable,
    rankResults: () => rankResults,
    reconstructTable: () => reconstructTable,
    remediateAccessibility: () => remediateAccessibility,
    rerankResults: () => rerankResults,
    rgbToCmyk: () => rgbToCmyk,
    saveToCache: () => saveToCache,
    stem: () => stem,
    toRgb: () => toRgb,
    trackXObjectReuse: () => trackXObjectReuse,
    validateTags: () => validateTags,
    wcagAudit: () => wcagAudit,
    wordNGrams: () => wordNGrams
  });

  // src/brain.js
  function analyzeSpatialLayout(items, pageSize) {
    if (!items || items.length === 0) {
      return { columns: 0, rows: [], headings: [], flow: "unknown" };
    }
    const boxes = items.map((item) => {
      const tx = item.transform;
      return {
        text: item.str,
        x: tx[4],
        y: tx[5],
        width: item.width,
        height: item.height,
        fontSize: Math.abs(tx[0]) || Math.abs(tx[3]) || 12,
        fontName: item.fontName || ""
      };
    }).filter((b) => b.text.trim());
    const columns = detectColumns(boxes, pageSize.width);
    const rows = groupIntoRows(boxes);
    const headings = detectHeadings(boxes);
    const flow = detectFlow(rows);
    return { columns, rows, headings, flow, boxes };
  }
  function detectColumns(boxes, pageWidth) {
    if (boxes.length === 0) return 0;
    const xPositions = boxes.map((b) => b.x).sort((a, b) => a - b);
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
    return Math.min(clusters.length, 4);
  }
  function groupIntoRows(boxes) {
    if (boxes.length === 0) return [];
    const sorted = [...boxes].sort((a, b) => b.y - a.y);
    const rows = [];
    let currentRow = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      const yDiff = Math.abs(sorted[i].y - currentRow[0].y);
      const avgHeight = currentRow.reduce((s, b) => s + b.height, 0) / currentRow.length;
      if (yDiff < avgHeight * 1.5) {
        currentRow.push(sorted[i]);
      } else {
        currentRow.sort((a, b) => a.x - b.x);
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
    const sizes = boxes.map((b) => b.fontSize).sort((a, b) => a - b);
    const medianSize = sizes[Math.floor(sizes.length / 2)];
    return boxes.filter((b) => b.fontSize > medianSize * 1.3 && b.text.trim().length > 2).map((b) => ({
      text: b.text,
      level: b.fontSize > medianSize * 2 ? 1 : b.fontSize > medianSize * 1.5 ? 2 : 3,
      y: b.y,
      fontSize: b.fontSize
    }));
  }
  function detectFlow(rows) {
    if (rows.length < 2) return "single";
    const leftEdges = rows.map((r) => r[0]?.x || 0);
    const variance = leftEdges.reduce((s, x) => s + Math.pow(x - leftEdges[0], 2), 0) / leftEdges.length;
    if (variance < 100) return "left-aligned";
    if (variance < 500) return "mixed";
    return "complex";
  }
  function detectStructure(spatialResult, pageSize) {
    const { rows, boxes } = spatialResult;
    const structures = [];
    const tableRegions = detectTables(rows, pageSize);
    structures.push(...tableRegions);
    const listRegions = detectLists(rows);
    structures.push(...listRegions);
    const formFields = detectFormFields(rows);
    structures.push(...formFields);
    const paragraphs = detectParagraphs(rows);
    structures.push(...paragraphs);
    structures.sort((a, b) => a.y - b.y);
    return structures;
  }
  function detectTables(rows, pageSize) {
    const tables = [];
    let tableStart = -1;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cellCount = row.length;
      if (cellCount >= 2) {
        const gaps = [];
        for (let j = 1; j < row.length; j++) {
          gaps.push(row[j].x - (row[j - 1].x + row[j - 1].width));
        }
        const avgGap = gaps.reduce((s, g) => s + g, 0) / gaps.length;
        const gapVariance = gaps.reduce((s, g) => s + Math.pow(g - avgGap, 2), 0) / gaps.length;
        if (gapVariance < avgGap * avgGap * 2) {
          if (tableStart === -1) tableStart = i;
          continue;
        }
      }
      if (tableStart !== -1 && i - tableStart >= 2) {
        tables.push({
          type: "table",
          y: rows[tableStart][0]?.y || 0,
          startY: tableStart,
          endY: i - 1,
          rowCount: i - tableStart,
          colCount: Math.max(...rows.slice(tableStart, i).map((r) => r.length))
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
      const text = rows[i].map((b) => b.text).join(" ").trim();
      const isBullet = bulletPattern.test(text);
      const isNumbered = numberPattern.test(text);
      if (isBullet || isNumbered) {
        const type = isBullet ? "bullet" : "numbered";
        if (listStart === -1) {
          listStart = i;
          listType = type;
        }
      } else {
        if (listStart !== -1 && i - listStart >= 2) {
          lists.push({
            type: "list",
            listType,
            y: rows[listStart][0]?.y || 0,
            itemCount: i - listStart,
            startIndex: listStart,
            endIndex: i - 1
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
      const text = row.map((b) => b.text).join(" ");
      const match = text.match(fieldPattern);
      if (match) {
        fields.push({
          type: "formField",
          label: match[1].trim(),
          y: row[0]?.y || 0,
          hasValue: text.length > match[0].length + 1
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
      const text = row.map((b) => b.text).join(" ").trim();
      const isParagraph = row.length <= 2 && text.length > 50;
      if (isParagraph) {
        if (paraStart === -1) paraStart = i;
      } else {
        if (paraStart !== -1 && i - paraStart >= 2) {
          paragraphs.push({
            type: "paragraph",
            y: rows[paraStart][0]?.y || 0,
            lineCount: i - paraStart
          });
        }
        paraStart = -1;
      }
    }
    return paragraphs;
  }
  function extractMetadata(text) {
    const entities = {
      dates: extractDates(text),
      phones: extractPhones(text),
      emails: extractEmails(text),
      addresses: extractAddresses(text),
      amounts: extractAmounts(text),
      urls: extractUrls(text),
      zipCodes: extractZipCodes(text)
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
      /\bFY\s*(\d{4}(?:\s*[-–]\s*\d{2,4})?)\b/gi
    ];
    const dates = [];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        dates.push({
          raw: match[0],
          position: match.index,
          context: text.substring(Math.max(0, match.index - 30), match.index + match[0].length + 30).trim()
        });
      }
    }
    return dates;
  }
  function extractPhones(text) {
    const pattern = /\b(?:\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})\b/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractEmails(text) {
    const pattern = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractAddresses(text) {
    const pattern = /\b\d{1,5}\s+[\w\s]{2,40}(?:Street|St|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Road|Rd|Lane|Ln|Court|Ct|Place|Pl|Way|Circle|Cir)\b/gi;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractAmounts(text) {
    const pattern = /\$[\d,]+(?:\.\d{2})?/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      value: parseFloat(m[0].replace(/[$,]/g, "")),
      position: m.index
    }));
  }
  function extractUrls(text) {
    const pattern = /https?:\/\/[^\s<>"]+/g;
    return [...text.matchAll(pattern)].map((m) => ({
      raw: m[0],
      position: m.index
    }));
  }
  function extractZipCodes(text) {
    const pattern = /\b\d{5}(?:-\d{4})?\b/g;
    const zips = [];
    const seen = /* @__PURE__ */ new Set();
    for (const m of text.matchAll(pattern)) {
      const zip = m[0];
      if (!seen.has(zip)) {
        zips.push({ raw: zip, position: m.index });
        seen.add(zip);
      }
    }
    return zips;
  }
  function classifyPage(text, spatialResult) {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;
    if (charCount < 10) return { type: "blank", confidence: 1, summary: "Blank or image-only page" };
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
      agenda: /(agenda|scheduled|item \d|old business|new business)/i
    };
    let bestType = "document";
    let bestConfidence = 0.3;
    for (const [type, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match) {
        const confidence = Math.min(0.9, 0.5 + match[0].length / charCount * 5);
        if (confidence > bestConfidence) {
          bestType = type;
          bestConfidence = confidence;
        }
      }
    }
    const summary = generateSummary(text, bestType);
    return { type: bestType, confidence: bestConfidence, summary, wordCount, charCount };
  }
  function generateSummary(text, type) {
    const lines = text.split("\n").filter((l) => l.trim());
    const firstLines = lines.slice(0, 5).join(" ").substring(0, 200);
    return `[${type}] ${firstLines}...`;
  }
  function analyzeVisualRegions(canvas) {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const bandHeight = Math.floor(height / 20);
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
        type: density < 0.02 ? "white" : density > 0.15 ? "image" : "text"
      });
    }
    const headerEnd = Math.floor(bands.length * 0.15);
    const footerStart = Math.floor(bands.length * 0.85);
    const regions = {
      header: bands.slice(0, headerEnd).some((b) => b.type === "text"),
      footer: bands.slice(footerStart).some((b) => b.type === "text"),
      hasImages: bands.some((b) => b.type === "image"),
      contentBands: bands.filter((b) => b.type === "text").length,
      imageBands: bands.filter((b) => b.type === "image").length,
      whiteBands: bands.filter((b) => b.type === "white").length
    };
    return regions;
  }

  // src/layers.js
  var TextLayer = class {
    constructor() {
      this.pages = [];
      this.fullText = "";
      this.wordCount = 0;
      this.sentences = [];
    }
    addPage(pageNum, text, source) {
      const words = text.split(/\s+/).filter(Boolean);
      const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 10);
      this.pages.push({ pageNum, text, source, words, sentences });
      this.fullText += text + "\n";
      this.wordCount += words.length;
      this.sentences.push(...sentences.map((s) => ({ text: s, page: pageNum })));
    }
    search(query) {
      const lower = query.toLowerCase();
      return this.sentences.filter((s) => s.text.toLowerCase().includes(lower));
    }
    getPageText(pageNum) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      return page ? page.text : "";
    }
    getWordAt(pageNum, index) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      if (!page) return null;
      return page.words[index] || null;
    }
  };
  var LayoutLayer = class {
    constructor() {
      this.pages = [];
    }
    addPage(pageNum, spatialResult, pageSize) {
      this.pages.push({
        pageNum,
        columns: spatialResult.columns || 1,
        rows: spatialResult.rows || [],
        headings: spatialResult.headings || [],
        flow: spatialResult.flow || "unknown",
        pageSize
      });
    }
    getColumns(pageNum) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      return page ? page.columns : 0;
    }
    getHeadings(pageNum) {
      const page = this.pages.find((p) => p.pageNum === pageNum);
      return page ? page.headings : [];
    }
    getAllHeadings() {
      return this.pages.flatMap(
        (p) => p.headings.map((h) => ({ ...h, page: p.pageNum }))
      );
    }
    getTableOfContents() {
      const headings = this.getAllHeadings();
      if (headings.length === 0) return null;
      const toc = [];
      let currentH1 = null;
      let currentH2 = null;
      for (const h of headings) {
        if (h.level === 1) {
          currentH1 = { ...h, children: [] };
          toc.push(currentH1);
          currentH2 = null;
        } else if (h.level === 2 && currentH1) {
          currentH2 = { ...h, children: [] };
          currentH1.children.push(currentH2);
        } else if (h.level === 3 && currentH2) {
          currentH2.children.push({ ...h });
        }
      }
      return toc;
    }
  };
  var StructureLayer = class {
    constructor() {
      this.pages = [];
      this.tables = [];
      this.forms = [];
      this.lists = [];
    }
    addPage(pageNum, structures) {
      const pageStructures = {
        pageNum,
        tables: structures.filter((s) => s.type === "table"),
        lists: structures.filter((s) => s.type === "list"),
        forms: structures.filter((s) => s.type === "formField"),
        paragraphs: structures.filter((s) => s.type === "paragraph")
      };
      this.pages.push(pageStructures);
      this.tables.push(...pageStructures.tables.map((t) => ({ ...t, page: pageNum })));
      this.forms.push(...pageStructures.forms.map((f) => ({ ...f, page: pageNum })));
      this.lists.push(...pageStructures.lists.map((l) => ({ ...l, page: pageNum })));
    }
    getTables(pageNum) {
      if (pageNum) {
        const page = this.pages.find((p) => p.pageNum === pageNum);
        return page ? page.tables : [];
      }
      return this.tables;
    }
    getForms(pageNum) {
      if (pageNum) {
        const page = this.pages.find((p) => p.pageNum === pageNum);
        return page ? page.forms : [];
      }
      return this.forms;
    }
    getLists(pageNum) {
      if (pageNum) {
        const page = this.pages.find((p) => p.pageNum === pageNum);
        return page ? page.lists : [];
      }
      return this.lists;
    }
    getFormData() {
      const data = {};
      for (const field of this.forms) {
        data[field.label] = field.hasValue ? "[value]" : "[empty]";
      }
      return data;
    }
  };
  var MetadataLayer = class {
    constructor() {
      this.pages = [];
      this.entities = {
        dates: [],
        phones: [],
        emails: [],
        addresses: [],
        amounts: [],
        urls: [],
        zipCodes: []
      };
    }
    addPage(pageNum, metadata) {
      this.pages.push({ pageNum, ...metadata });
      for (const key of Object.keys(this.entities)) {
        if (metadata[key]) {
          this.entities[key].push(...metadata[key].map((e) => ({ ...e, page: pageNum })));
        }
      }
    }
    getDates(pageNum) {
      return pageNum ? this.entities.dates.filter((e) => e.page === pageNum) : this.entities.dates;
    }
    getPhones(pageNum) {
      return pageNum ? this.entities.phones.filter((e) => e.page === pageNum) : this.entities.phones;
    }
    getEmails(pageNum) {
      return pageNum ? this.entities.emails.filter((e) => e.page === pageNum) : this.entities.emails;
    }
    getAddresses(pageNum) {
      return pageNum ? this.entities.addresses.filter((e) => e.page === pageNum) : this.entities.addresses;
    }
    getAmounts(pageNum) {
      return pageNum ? this.entities.amounts.filter((e) => e.page === pageNum) : this.entities.amounts;
    }
    getSummary() {
      return {
        totalDates: this.entities.dates.length,
        totalPhones: this.entities.phones.length,
        totalEmails: this.entities.emails.length,
        totalAddresses: this.entities.addresses.length,
        totalAmounts: this.entities.amounts.length,
        uniqueAmounts: [...new Set(this.entities.amounts.map((a) => a.value))].sort((a, b) => b - a)
      };
    }
  };
  var VisualLayer = class {
    constructor() {
      this.pages = [];
    }
    addPage(pageNum, visualRegions) {
      this.pages.push({ pageNum, ...visualRegions });
    }
    getPageInfo(pageNum) {
      return this.pages.find((p) => p.pageNum === pageNum) || null;
    }
    hasImages(pageNum) {
      const page = this.getPageInfo(pageNum);
      return page ? page.hasImages : false;
    }
    getHeaderFooterInfo() {
      return this.pages.map((p) => ({
        page: p.pageNum,
        hasHeader: p.header,
        hasFooter: p.footer
      }));
    }
  };
  var DocumentGraph = class {
    constructor() {
      this.text = new TextLayer();
      this.layout = new LayoutLayer();
      this.structure = new StructureLayer();
      this.metadata = new MetadataLayer();
      this.visual = new VisualLayer();
      this.pageCount = 0;
      this.classifications = [];
    }
    addPageResult(pageResult) {
      this.pageCount++;
      this.text.addPage(pageResult.num, pageResult.text, pageResult.source);
      if (pageResult.spatial) {
        this.layout.addPage(pageResult.num, pageResult.spatial, pageResult.pageSize);
      }
      if (pageResult.structures) {
        this.structure.addPage(pageResult.num, pageResult.structures);
      }
      if (pageResult.metadata) {
        this.metadata.addPage(pageResult.num, pageResult.metadata);
      }
      if (pageResult.visual) {
        this.visual.addPage(pageResult.num, pageResult.visual);
      }
      if (pageResult.classification) {
        this.classifications.push({
          page: pageResult.num,
          ...pageResult.classification
        });
      }
    }
    /**
     * Query the document semantically — like querying an embedding model.
     * Supports natural language patterns.
     */
    query(q) {
      const lower = q.toLowerCase();
      if (/date|when|what day/.test(lower)) {
        return { type: "dates", results: this.metadata.getDates() };
      }
      if (/phone|call|contact|number/.test(lower)) {
        return { type: "phones", results: this.metadata.getPhones() };
      }
      if (/email|e-mail|electronic/.test(lower)) {
        return { type: "emails", results: this.metadata.getEmails() };
      }
      if (/address|location|where|street|avenue/.test(lower)) {
        return { type: "addresses", results: this.metadata.getAddresses() };
      }
      if (/money|amount|cost|price|budget|dollar|\$|fund/.test(lower)) {
        return { type: "amounts", results: this.metadata.getAmounts() };
      }
      if (/table|data|spreadsheet|grid/.test(lower)) {
        return { type: "tables", results: this.structure.getTables() };
      }
      if (/list|items|bullet|numbered/.test(lower)) {
        return { type: "lists", results: this.structure.getLists() };
      }
      if (/form|field|input|application|fill/.test(lower)) {
        return { type: "forms", results: this.structure.getForms() };
      }
      if (/heading|title|section|chapter|outline|toc/.test(lower)) {
        return { type: "headings", results: this.layout.getAllHeadings() };
      }
      if (/summary|summarize|overview|brief/.test(lower)) {
        return { type: "summary", results: this.getSummary() };
      }
      const searchResults = this.text.search(q);
      return { type: "text-search", query: q, results: searchResults };
    }
    /**
     * Get a summary of the entire document.
     */
    getSummary() {
      const pageTypes = this.classifications.map((c) => c.type);
      const typeCounts = {};
      for (const t of pageTypes) {
        typeCounts[t] = (typeCounts[t] || 0) + 1;
      }
      return {
        pageCount: this.pageCount,
        wordCount: this.text.wordCount,
        pageTypes: typeCounts,
        metadata: this.metadata.getSummary(),
        headings: this.layout.getAllHeadings().map((h) => h.text),
        tableCount: this.structure.tables.length,
        formCount: this.structure.forms.length,
        listCount: this.structure.lists.length
      };
    }
    /**
     * Export as JSON for downstream use (RAG, search, etc).
     */
    toJSON() {
      return {
        pageCount: this.pageCount,
        summary: this.getSummary(),
        pages: this.text.pages.map((p, i) => ({
          num: p.pageNum,
          text: p.text,
          source: p.source,
          classification: this.classifications[i] || null,
          headings: this.layout.getHeadings(p.pageNum),
          tables: this.structure.getTables(p.pageNum),
          forms: this.structure.getForms(p.pageNum),
          lists: this.structure.getLists(p.pageNum),
          metadata: {
            dates: this.metadata.getDates(p.pageNum),
            phones: this.metadata.getPhones(p.pageNum),
            emails: this.metadata.getEmails(p.pageNum),
            addresses: this.metadata.getAddresses(p.pageNum),
            amounts: this.metadata.getAmounts(p.pageNum)
          }
        }))
      };
    }
  };

  // src/content.js
  var BlockTypes = {
    HEADING: "heading",
    PARAGRAPH: "paragraph",
    TABLE: "table",
    LIST: "list",
    FORM_FIELD: "form_field",
    IMAGE: "image",
    SIGNATURE: "signature",
    CHECKBOX: "checkbox",
    CHART: "chart",
    CITATION: "citation",
    QUOTE: "quote",
    CAPTION: "caption",
    HEADER: "header",
    FOOTER: "footer",
    WHITESPACE: "whitespace"
  };
  var EntityTypes = {
    PERSON: "person",
    ORGANIZATION: "organization",
    DATE: "date",
    CURRENCY: "currency",
    PHONE: "phone",
    EMAIL: "email",
    ADDRESS: "address",
    URL: "url",
    ZIP_CODE: "zip_code",
    INVOICE_NUMBER: "invoice_number",
    PERMIT_NUMBER: "permit_number",
    RESOLUTION_NUMBER: "resolution_number",
    ORDINANCE_NUMBER: "ordinance_number",
    AGENDA_ITEM: "agenda_item"
  };
  var ContentBlock = class {
    constructor(type, data) {
      this.type = type;
      this.text = data.text || "";
      this.bbox = data.bbox || null;
      this.page = data.page || 0;
      this.confidence = data.confidence || null;
      this.metadata = data.metadata || {};
      this.children = data.children || [];
      this.relationships = data.relationships || [];
    }
    toJSON() {
      return {
        type: this.type,
        text: this.text,
        bbox: this.bbox,
        page: this.page,
        confidence: this.confidence,
        metadata: this.metadata,
        children: this.children.length > 0 ? this.children : void 0,
        relationships: this.relationships.length > 0 ? this.relationships : void 0
      };
    }
  };
  var PageContentGraph = class {
    constructor(pageNum) {
      this.page = pageNum;
      this.blocks = [];
      this.tables = [];
      this.entities = [];
      this.regions = [];
      this.relationships = [];
    }
    addBlock(block) {
      this.blocks.push(block);
      if (block.type === BlockTypes.TABLE) {
        this.tables.push(block);
      }
    }
    addEntity(entity) {
      this.entities.push(entity);
    }
    addRelationship(rel) {
      this.relationships.push(rel);
    }
    /**
     * Find blocks/entities by type, text, or spatial proximity.
     */
    find(query) {
      if (typeof query === "string") {
        return this._findByText(query);
      }
      if (query.type) {
        return this._findByType(query.type);
      }
      if (query.near) {
        return this._findNear(query.near, query.type);
      }
      return [];
    }
    _findByText(text) {
      const lower = text.toLowerCase();
      const results = [];
      for (const block of this.blocks) {
        if (block.text.toLowerCase().includes(lower)) {
          results.push(block);
        }
      }
      for (const entity of this.entities) {
        if (entity.value && entity.value.toLowerCase().includes(lower)) {
          results.push(entity);
        }
        if (entity.text && entity.text.toLowerCase().includes(lower)) {
          results.push(entity);
        }
      }
      return results;
    }
    _findByType(type) {
      return [
        ...this.blocks.filter((b) => b.type === type),
        ...this.entities.filter((e) => e.type === type)
      ];
    }
    _findNear(text, type) {
      const targets = this._findByText(text);
      if (targets.length === 0) return [];
      const target = targets[0];
      if (!target.bbox) return targets;
      return this.entities.filter((e) => {
        if (type && e.type !== type) return false;
        if (!e.bbox) return false;
        return this._areNear(target.bbox, e.bbox);
      });
    }
    _areNear(bbox1, bbox2, threshold = 100) {
      const cx1 = bbox1[0] + bbox1[2] / 2;
      const cy1 = bbox1[1] + bbox1[3] / 2;
      const cx2 = bbox2[0] + bbox2[2] / 2;
      const cy2 = bbox2[1] + bbox2[3] / 2;
      const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
      return dist < threshold;
    }
  };
  var DocumentContentGraph = class {
    constructor() {
      this.pages = [];
      this.allBlocks = [];
      this.allEntities = [];
      this.allTables = [];
      this.allRelationships = [];
      this.documentType = null;
    }
    addPageGraph(pageGraph) {
      this.pages.push(pageGraph);
      this.allBlocks.push(...pageGraph.blocks);
      this.allEntities.push(...pageGraph.entities);
      this.allTables.push(...pageGraph.tables);
      this.allRelationships.push(...pageGraph.relationships);
    }
    /**
     * Search across all pages.
     * Returns results with page number and bbox.
     */
    find(query) {
      const results = [];
      for (const page of this.pages) {
        const pageResults2 = page.find(query);
        for (const r of pageResults2) {
          results.push({ ...r, page: page.page });
        }
      }
      return results;
    }
    /**
     * Find the first match across all pages.
     */
    findOne(query) {
      for (const page of this.pages) {
        const results = page.find(query);
        if (results.length > 0) {
          return { ...results[0], page: page.page };
        }
      }
      return null;
    }
    /**
     * Get all entities of a specific type.
     */
    getEntities(type) {
      return this.allEntities.filter((e) => e.type === type);
    }
    /**
     * Get all blocks of a specific type.
     */
    getBlocks(type) {
      return this.allBlocks.filter((b) => b.type === type);
    }
    /**
     * Export as JSON for downstream use.
     */
    toJSON() {
      return {
        documentType: this.documentType,
        pageCount: this.pages.length,
        summary: this.getSummary(),
        pages: this.pages.map((p) => ({
          page: p.page,
          blocks: p.blocks.map((b) => b.toJSON()),
          entities: p.entities,
          tables: p.tables.map((t) => t.toJSON()),
          relationships: p.relationships
        }))
      };
    }
    getSummary() {
      return {
        blockTypes: this._countTypes(this.allBlocks),
        entityTypes: this._countTypes(this.allEntities),
        tableCount: this.allTables.length,
        relationshipCount: this.allRelationships.length
      };
    }
    _countTypes(arr) {
      const counts = {};
      for (const item of arr) {
        counts[item.type] = (counts[item.type] || 0) + 1;
      }
      return counts;
    }
  };
  function analyzeContent(pageNum, text, spatialResult, metadataResult) {
    const graph = new PageContentGraph(pageNum);
    if (!text || text.trim().length === 0) {
      return graph;
    }
    const { rows = [], headings = [], boxes = [] } = spatialResult || {};
    for (const heading of headings) {
      graph.addBlock(new ContentBlock(BlockTypes.HEADING, {
        text: heading.text,
        bbox: findBboxForText(heading.text, boxes),
        page: pageNum,
        metadata: { level: heading.level, fontSize: heading.fontSize }
      }));
    }
    const paragraphs = splitIntoParagraphs(text);
    for (const para of paragraphs) {
      if (para.length < 10) continue;
      if (/^[\u2022\-\*]\s|^\d+[\.\)]\s/.test(para)) {
        graph.addBlock(new ContentBlock(BlockTypes.LIST, {
          text: para,
          bbox: findBboxForText(para.split("\n")[0], boxes),
          page: pageNum
        }));
        continue;
      }
      if (/^[""]|^\|/.test(para)) {
        graph.addBlock(new ContentBlock(BlockTypes.QUOTE, {
          text: para,
          bbox: findBboxForText(para.substring(0, 30), boxes),
          page: pageNum
        }));
        continue;
      }
      graph.addBlock(new ContentBlock(BlockTypes.PARAGRAPH, {
        text: para,
        bbox: findBboxForText(para.substring(0, 30), boxes),
        page: pageNum
      }));
    }
    if (metadataResult) {
      for (const date of metadataResult.dates || []) {
        graph.addEntity({
          type: EntityTypes.DATE,
          value: date.raw,
          text: date.raw,
          bbox: findBboxForText(date.raw, boxes),
          page: pageNum,
          confidence: 0.9
        });
      }
      for (const phone of metadataResult.phones || []) {
        graph.addEntity({
          type: EntityTypes.PHONE,
          value: phone.raw,
          text: phone.raw,
          bbox: findBboxForText(phone.raw, boxes),
          page: pageNum,
          confidence: 0.85
        });
      }
      for (const email of metadataResult.emails || []) {
        graph.addEntity({
          type: EntityTypes.EMAIL,
          value: email.raw,
          text: email.raw,
          bbox: findBboxForText(email.raw, boxes),
          page: pageNum,
          confidence: 0.95
        });
      }
      for (const address of metadataResult.addresses || []) {
        graph.addEntity({
          type: EntityTypes.ADDRESS,
          value: address.raw,
          text: address.raw,
          bbox: findBboxForText(address.raw, boxes),
          page: pageNum,
          confidence: 0.8
        });
      }
      for (const amount of metadataResult.amounts || []) {
        graph.addEntity({
          type: EntityTypes.CURRENCY,
          value: amount.raw,
          numericValue: amount.value,
          text: amount.raw,
          bbox: findBboxForText(amount.raw, boxes),
          page: pageNum,
          confidence: 0.9
        });
      }
    }
    detectSpecialContent(graph, text, boxes, pageNum);
    detectRelationships(graph);
    return graph;
  }
  function detectSpecialContent(graph, text, boxes, pageNum) {
    const lines = text.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (/invoice|inv[\s#:]|bill\s*to|ship\s*to|amount\s*due/i.test(trimmed)) {
        graph.addBlock(new ContentBlock("invoice_hint", {
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          metadata: { hint: "invoice_content" }
        }));
      }
      if (/receipt|purchase|subtotal|tax|total|change|cash|credit|debit/i.test(trimmed)) {
        graph.addBlock(new ContentBlock("receipt_hint", {
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          metadata: { hint: "receipt_content" }
        }));
      }
      const fieldMatch = trimmed.match(/^([A-Z][A-Za-z\s]{2,30}):\s*(.*)/);
      if (fieldMatch) {
        graph.addBlock(new ContentBlock(BlockTypes.FORM_FIELD, {
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          metadata: {
            label: fieldMatch[1].trim(),
            value: fieldMatch[2].trim(),
            hasValue: fieldMatch[2].trim().length > 0
          }
        }));
      }
      if (/[\u2610\u2611\u2612\u25A1\u25A0\u2713\u2717\u2714]/.test(trimmed) || /\[x\]|\[ \]|\[X\]/.test(trimmed)) {
        const isChecked = /[\u2611\u25A0\u2713\u2714]|\[x\]|\[X\]/.test(trimmed);
        graph.addEntity({
          type: EntityTypes.CHECKBOX,
          value: isChecked ? "checked" : "unchecked",
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 20), boxes),
          page: pageNum,
          confidence: 0.85,
          metadata: { checked: isChecked }
        });
      }
      if (/signature|signed|sign\s*here|\/s\/|.{10,30}$/.test(trimmed) && /[A-Za-z]{3,}/.test(trimmed) && !/^[A-Z\s]{10,}$/.test(trimmed) && trimmed.length < 50) {
        const hasSignatureLike = /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(trimmed) || /\//.test(trimmed);
        if (hasSignatureLike) {
          graph.addBlock(new ContentBlock(BlockTypes.SIGNATURE, {
            text: trimmed,
            bbox: findBboxForText(trimmed.substring(0, 30), boxes),
            page: pageNum,
            confidence: 0.6
          }));
        }
      }
      const ordinanceMatch = trimmed.match(/(?:ordinance|resolution)\s*(?:no\.?|number|#)?\s*(\d+[\-\d]*)/i);
      if (ordinanceMatch) {
        const isOrdinance = /ordinance/i.test(trimmed);
        graph.addEntity({
          type: isOrdinance ? EntityTypes.ORDINANCE_NUMBER : EntityTypes.RESOLUTION_NUMBER,
          value: ordinanceMatch[0],
          number: ordinanceMatch[1],
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.9
        });
      }
      const permitMatch = trimmed.match(/permit\s*(?:no\.?|number|#)?\s*([A-Z0-9\-]+)/i);
      if (permitMatch) {
        graph.addEntity({
          type: EntityTypes.PERMIT_NUMBER,
          value: permitMatch[0],
          number: permitMatch[1],
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.85
        });
      }
      const agendaMatch = trimmed.match(/^(?:item\s*)?(\d+[\.\)]\s*.+)/i);
      if (agendaMatch && /agenda|hearing|meeting|public\s*comment/i.test(text.substring(0, 500))) {
        graph.addEntity({
          type: EntityTypes.AGENDA_ITEM,
          value: agendaMatch[1].trim(),
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.7
        });
      }
      const nameMatch = trimmed.match(/^(?:prepared\s*by|author|name|employee|officer|director|commissioner|mayor|city\s*attorney)[:\s]+(.+)/i);
      if (nameMatch) {
        graph.addEntity({
          type: EntityTypes.PERSON,
          value: nameMatch[1].trim(),
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.7,
          metadata: { role: nameMatch[0].split(":")[0].trim() }
        });
      }
      const orgMatch = trimmed.match(/^(city\s*of\s*[a-z\s]+|department\s*of\s*[a-z\s]+|[a-z\s]+\s*department)/i);
      if (orgMatch) {
        graph.addEntity({
          type: EntityTypes.ORGANIZATION,
          value: orgMatch[0].trim(),
          text: trimmed,
          bbox: findBboxForText(trimmed.substring(0, 30), boxes),
          page: pageNum,
          confidence: 0.75
        });
      }
    }
  }
  function detectRelationships(graph) {
    for (const block of graph.blocks) {
      if (!block.bbox) continue;
      for (const entity of graph.entities) {
        if (!entity.bbox) continue;
        if (areBboxesNear(block.bbox, entity.bbox, 80)) {
          block.relationships.push({
            type: "contains",
            target: entity.type,
            value: entity.value
          });
          entity.relationships = entity.relationships || [];
          entity.relationships.push({
            type: "belongs_to",
            target: block.type,
            text: block.text.substring(0, 50)
          });
        }
      }
    }
  }
  function classifyDocumentType(contentGraph) {
    const allText = contentGraph.allBlocks.map((b) => b.text).join(" ").toLowerCase();
    const entityTypes = contentGraph.allEntities.map((e) => e.type);
    const blockTypes = contentGraph.allBlocks.map((b) => b.type);
    const scores = {
      invoice: 0,
      receipt: 0,
      form: 0,
      legal: 0,
      memo: 0,
      letter: 0,
      report: 0,
      minutes: 0,
      policy: 0,
      budget: 0,
      permit: 0,
      contract: 0
    };
    if (/invoice|bill\s*to|amount\s*due|payment\s*due|invoice\s*#/i.test(allText)) scores.invoice += 3;
    if (entityTypes.includes(EntityTypes.CURRENCY)) scores.invoice += 1;
    if (blockTypes.includes("invoice_hint")) scores.invoice += 2;
    if (/receipt|subtotal|change|cash\s*tendered|credit\s*card|debit/i.test(allText)) scores.receipt += 3;
    if (blockTypes.includes("receipt_hint")) scores.receipt += 2;
    const formFieldCount = blockTypes.filter((t) => t === BlockTypes.FORM_FIELD).length;
    if (formFieldCount >= 3) scores.form += 3;
    if (/application|fill\s*out|complete\s*this\s*form/i.test(allText)) scores.form += 2;
    if (/ordinance|resolution|charter|hereby\s*enacted|section\s*\d+/i.test(allText)) scores.legal += 3;
    if (entityTypes.includes(EntityTypes.ORDINANCE_NUMBER)) scores.legal += 2;
    if (entityTypes.includes(EntityTypes.RESOLUTION_NUMBER)) scores.legal += 2;
    if (/memorandum|memo\b|from:|to:|subject:|date:/i.test(allText)) scores.memo += 3;
    if (/dear\s|sincerely|regards|attention|re:\s/i.test(allText)) scores.letter += 3;
    if (/report|annual\s*report|analysis|findings|recommendation/i.test(allText)) scores.report += 2;
    if (/minutes|meeting\s*called\s*to\s*order|public\s*hearing|commissioner|mayor/i.test(allText)) scores.minutes += 3;
    if (/policy|procedure|guideline|regulation|compliance|standard\s*operating/i.test(allText)) scores.policy += 3;
    if (/budget|appropriation|expenditure|revenue|fiscal\s*year|fund\s*balance/i.test(allText)) scores.budget += 3;
    if (entityTypes.includes(EntityTypes.PERMIT_NUMBER)) scores.permit += 3;
    if (/building\s*permit|permit\s*application|zoning/i.test(allText)) scores.permit += 2;
    if (/agreement|contract|party|parties|hereby\s*agrees|terms\s*and\s*conditions/i.test(allText)) scores.contract += 3;
    let bestType = "document";
    let bestScore = 0;
    for (const [type, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestType = type;
        bestScore = score;
      }
    }
    return {
      type: bestType,
      confidence: Math.min(0.95, bestScore / 8),
      scores
    };
  }
  function findBboxForText(text, boxes) {
    if (!boxes || !text) return null;
    const lower = text.toLowerCase().substring(0, 30);
    const match = boxes.find((b) => b.text.toLowerCase().includes(lower));
    if (match) {
      return [match.x, match.y, match.width, match.height];
    }
    return null;
  }
  function splitIntoParagraphs(text) {
    return text.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 0);
  }
  function areBboxesNear(bbox1, bbox2, threshold) {
    const cx1 = bbox1[0] + bbox1[2] / 2;
    const cy1 = bbox1[1] + bbox1[3] / 2;
    const cx2 = bbox2[0] + bbox2[2] / 2;
    const cy2 = bbox2[1] + bbox2[3] / 2;
    const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
    return dist < threshold;
  }

  // src/query.js
  function executeQuery(contentGraph, query, graph = null) {
    if (graph && graph.planQuery && graph.hybridSearch) {
      const plan = graph.planQuery(query);
      const results2 = graph.hybridSearch(query, { maxResults: 20 });
      return {
        type: plan.intent?.type || "text-search",
        label: plan.intent?.type || "text matches",
        plan,
        results: results2,
        query,
        count: results2.length
      };
    }
    const results = contentGraph.find(query);
    return { type: "text-search", label: "text matches", results, query, count: results.length };
  }
  function executeAsk(contentGraph, question, graph = null) {
    if (graph && graph.askEnhanced) {
      return graph.askEnhanced(question);
    }
    const queryResult = executeQuery(contentGraph, question, graph);
    const { type, label, results, query } = queryResult;
    if (type === "summary") {
      const summary = results;
      if (!summary || typeof summary !== "object") {
        return {
          answer: "No summary available.",
          confidence: 0.5,
          evidence: []
        };
      }
      return {
        answer: formatSummaryAnswer(summary),
        confidence: 0.85,
        evidence: []
      };
    }
    const resultsArray = Array.isArray(results) ? results : [];
    if (resultsArray.length === 0) {
      return {
        answer: `No ${label} found in this document.`,
        confidence: 0.9,
        evidence: []
      };
    }
    let answer = "";
    let confidence = 0.8;
    let evidence = [];
    if (type === EntityTypes.DATE) {
      const dates = resultsArray.map((r) => r.value || r.text).join(", ");
      answer = `Found ${resultsArray.length} date(s): ${dates}`;
      confidence = 0.9;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.CURRENCY) {
      answer = `Found ${resultsArray.length} monetary value(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      confidence = 0.85;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.PERSON) {
      const people = [...new Set(resultsArray.map((r) => r.value))];
      answer = `Found ${people.length} person(s): ${people.join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox, role: r.metadata?.role }));
    }
    if (type === EntityTypes.ORGANIZATION) {
      const orgs = [...new Set(resultsArray.map((r) => r.value))];
      answer = `Found ${orgs.length} organization(s): ${orgs.join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.PHONE) {
      answer = `Found ${resultsArray.length} phone number(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.EMAIL) {
      answer = `Found ${resultsArray.length} email(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.ADDRESS) {
      answer = `Found ${resultsArray.length} address(es): ${resultsArray.map((r) => r.value).join("; ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.ORDINANCE_NUMBER) {
      answer = `Found ${resultsArray.length} ordinance(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.RESOLUTION_NUMBER) {
      answer = `Found ${resultsArray.length} resolution(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === EntityTypes.PERMIT_NUMBER) {
      answer = `Found ${resultsArray.length} permit(s): ${resultsArray.map((r) => r.value).join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.value, page: r.page, bbox: r.bbox }));
    }
    if (type === BlockTypes.TABLE) {
      answer = `Found ${resultsArray.length} table(s) in the document.`;
      evidence = resultsArray.map((r) => ({ text: r.text?.substring(0, 50), page: r.page, bbox: r.bbox }));
    }
    if (type === BlockTypes.FORM_FIELD) {
      const fields = resultsArray.map((r) => r.metadata?.label || r.text?.substring(0, 30));
      answer = `Found ${resultsArray.length} form field(s): ${fields.join(", ")}`;
      evidence = resultsArray.map((r) => ({ text: r.text, page: r.page, bbox: r.bbox }));
    }
    if (type === BlockTypes.SIGNATURE) {
      answer = `Found ${resultsArray.length} signature(s) in the document.`;
      evidence = resultsArray.map((r) => ({ text: r.text, page: r.page, bbox: r.bbox }));
    }
    if (type === "text-search") {
      answer = `Found ${resultsArray.length} text match(es) for "${query}".`;
      evidence = resultsArray.map((r) => ({ text: (r.text || "").substring(0, 50), page: r.page, bbox: r.bbox }));
      confidence = 0.7;
    }
    if (!answer) {
      answer = `Found ${resultsArray.length} result(s) for "${label}".`;
    }
    return { answer, confidence, evidence };
  }
  function formatSummaryAnswer(summary) {
    let answer = `Document Summary:
`;
    answer += `- ${summary.blockTypes?.[BlockTypes.HEADING] || 0} headings
`;
    answer += `- ${summary.blockTypes?.[BlockTypes.PARAGRAPH] || 0} paragraphs
`;
    answer += `- ${summary.tableCount || 0} tables
`;
    answer += `- ${summary.entityTypes?.[EntityTypes.DATE] || 0} dates
`;
    answer += `- ${summary.entityTypes?.[EntityTypes.CURRENCY] || 0} monetary values
`;
    answer += `- ${summary.entityTypes?.[EntityTypes.PERSON] || 0} people
`;
    answer += `- ${summary.entityTypes?.[EntityTypes.PHONE] || 0} phone numbers
`;
    answer += `- ${summary.entityTypes?.[EntityTypes.EMAIL] || 0} emails
`;
    return answer;
  }
  function highlightResults(canvas, results, options = {}) {
    const ctx = canvas.getContext("2d");
    const color = options.color || "rgba(255, 255, 0, 0.3)";
    const borderColor = options.borderColor || "rgba(255, 165, 0, 0.8)";
    const scale = options.scale || 1;
    for (const result of results) {
      if (!result.bbox) continue;
      const [x, y, w, h] = result.bbox;
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(x * scale, y * scale, w * scale, h * scale);
    }
  }
  function createHighlightAnnotations(results, options = {}) {
    const color = options.color || [1, 1, 0];
    return results.filter((r) => r.bbox).map((r) => ({
      type: "Highlight",
      rect: r.bbox,
      color,
      contents: r.text || r.value || "",
      page: r.page
    }));
  }

  // src/rag.js
  async function extractImages(page, options = {}) {
    const {
      format = "png",
      quality = 0.92,
      scale = 1,
      extractThumbnails = true,
      thumbnailSize = 150
    } = options;
    const images = [];
    try {
      const opList = await page.getOperatorList();
      const pageNumber = page.pageNumber;
      let currentImage = null;
      let imageIndex = 0;
      for (let i = 0; i < opList.fnArray.length; i++) {
        const fn = opList.fnArray[i];
        const args = opList.argsArray[i];
        const OPS = {
          paintImageXObject: 85,
          paintJpegXObject: 86,
          paintImageXObjectRepeat: 88,
          paintImageMaskXObject: 89
        };
        if (fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject) {
          const imgName = args[0];
          try {
            const imgData = await new Promise((resolve, reject) => {
              page.objs.get(imgName, (data) => {
                if (data) resolve(data);
                else reject(new Error(`Image ${imgName} not found`));
              });
            });
            if (imgData && imgData.width && imgData.height) {
              const canvas = document.createElement("canvas");
              canvas.width = imgData.width * scale;
              canvas.height = imgData.height * scale;
              const ctx = canvas.getContext("2d");
              if (imgData.bitmap) {
                ctx.drawImage(imgData.bitmap, 0, 0, canvas.width, canvas.height);
              } else if (imgData.data) {
                const imageData = new ImageData(
                  new Uint8ClampedArray(imgData.data.buffer || imgData.data),
                  imgData.width,
                  imgData.height
                );
                ctx.putImageData(imageData, 0, 0);
              }
              const bbox = args.length > 1 ? args[1] : null;
              const image = {
                id: `page_${pageNumber}_img_${imageIndex}`,
                name: imgName,
                pageNumber,
                width: canvas.width,
                height: canvas.height,
                originalWidth: imgData.width,
                originalHeight: imgData.height,
                bbox: bbox ? {
                  x: bbox[4] || 0,
                  y: bbox[5] || 0,
                  width: bbox[0] || canvas.width,
                  height: bbox[3] || canvas.height
                } : null,
                format,
                dataUrl: canvas.toDataURL(`image/${format}`, quality),
                arrayBuffer: await new Promise((resolve) => {
                  if (canvas.convertToBlob) {
                    canvas.convertToBlob({ type: `image/${format}`, quality }).then((blob) => resolve(blob.arrayBuffer())).catch(() => resolve(null));
                  } else {
                    canvas.toBlob((blob) => {
                      resolve(blob ? blob.arrayBuffer() : null);
                    }, `image/${format}`, quality);
                  }
                })
              };
              if (extractThumbnails) {
                const thumbCanvas = document.createElement("canvas");
                const aspectRatio = imgData.width / imgData.height;
                thumbCanvas.width = thumbnailSize;
                thumbCanvas.height = thumbnailSize / aspectRatio;
                const thumbCtx = thumbCanvas.getContext("2d");
                thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
                image.thumbnail = {
                  dataUrl: thumbCanvas.toDataURL(`image/${format}`, quality),
                  width: thumbCanvas.width,
                  height: thumbCanvas.height
                };
              }
              images.push(image);
              imageIndex++;
            }
          } catch (e) {
            console.warn(`[codbdocs] Could not extract image ${imgName}:`, e.message);
          }
        }
      }
    } catch (e) {
      console.warn("[codbdocs] Image extraction failed:", e.message);
    }
    return images;
  }
  async function extractAllImages(pdf, options = {}) {
    const allImages = [];
    for (let num = 1; num <= pdf.numPages; num++) {
      const page = await pdf.getPage(num);
      const pageImages = await extractImages(page, options);
      allImages.push(...pageImages);
    }
    return allImages;
  }
  var ChunkStrategies = {
    FIXED: "fixed",
    SEMANTIC: "semantic",
    PAGE: "page",
    SECTION: "section",
    TABLE: "table",
    HYBRID: "hybrid"
  };
  function fixedChunking(text, options = {}) {
    const {
      chunkSize = 1e3,
      chunkOverlap = 200,
      separators = ["\n\n", "\n", ". ", " "]
    } = options;
    const chunks = [];
    let start = 0;
    while (start < text.length) {
      let end = Math.min(start + chunkSize, text.length);
      if (end < text.length) {
        for (const sep of separators) {
          const lastSep = text.lastIndexOf(sep, end);
          if (lastSep > start + chunkSize * 0.5) {
            end = lastSep + sep.length;
            break;
          }
        }
      }
      chunks.push({
        text: text.slice(start, end).trim(),
        start,
        end,
        index: chunks.length
      });
      start = end - chunkOverlap;
      if (start >= text.length) break;
    }
    return chunks;
  }
  function semanticChunking(text, options = {}) {
    const {
      minChunkSize = 100,
      maxChunkSize = 2e3
    } = options;
    const chunks = [];
    const paragraphs = text.split(/\n\s*\n/);
    let currentChunk = "";
    let currentStart = 0;
    let position = 0;
    for (const para of paragraphs) {
      if (currentChunk.length + para.length > maxChunkSize && currentChunk.length >= minChunkSize) {
        chunks.push({
          text: currentChunk.trim(),
          start: currentStart,
          end: position,
          index: chunks.length,
          type: "paragraph"
        });
        currentChunk = "";
        currentStart = position;
      }
      currentChunk += (currentChunk ? "\n\n" : "") + para;
      position += para.length + 2;
    }
    if (currentChunk.trim()) {
      chunks.push({
        text: currentChunk.trim(),
        start: currentStart,
        end: position,
        index: chunks.length,
        type: "paragraph"
      });
    }
    return chunks;
  }
  function sectionChunking(text, sections = [], options = {}) {
    const {
      minChunkSize = 100,
      maxChunkSize = 3e3
    } = options;
    if (!sections || sections.length === 0) {
      return semanticChunking(text, options);
    }
    const chunks = [];
    let lastEnd = 0;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const start = section.position || 0;
      const end = i + 1 < sections.length ? sections[i + 1].position || text.length : text.length;
      const sectionText = text.slice(start, end).trim();
      if (sectionText.length > maxChunkSize) {
        const subChunks = fixedChunking(sectionText, { chunkSize: maxChunkSize, chunkOverlap: 200 });
        for (const sub of subChunks) {
          chunks.push({
            text: sub.text,
            start: start + sub.start,
            end: start + sub.end,
            index: chunks.length,
            type: "section",
            heading: section.text,
            headingLevel: section.level || 1
          });
        }
      } else if (sectionText.length >= minChunkSize) {
        chunks.push({
          text: sectionText,
          start,
          end,
          index: chunks.length,
          type: "section",
          heading: section.text,
          headingLevel: section.level || 1
        });
      }
      lastEnd = end;
    }
    return chunks;
  }
  function tableChunking(text, tables = [], options = {}) {
    const {
      minChunkSize = 100,
      maxChunkSize = 2e3
    } = options;
    const chunks = [];
    let lastEnd = 0;
    const sortedTables = [...tables].sort((a, b) => (a.position || 0) - (b.position || 0));
    for (const table of sortedTables) {
      const tableStart = table.position || 0;
      const tableEnd = tableStart + (table.length || 0);
      if (tableStart > lastEnd) {
        const beforeText = text.slice(lastEnd, tableStart).trim();
        if (beforeText.length >= minChunkSize) {
          chunks.push({
            text: beforeText,
            start: lastEnd,
            end: tableStart,
            index: chunks.length,
            type: "text"
          });
        }
      }
      const tableText = text.slice(tableStart, tableEnd).trim();
      if (tableText.length >= minChunkSize) {
        chunks.push({
          text: tableText,
          start: tableStart,
          end: tableEnd,
          index: chunks.length,
          type: "table",
          tableData: table
        });
      }
      lastEnd = tableEnd;
    }
    if (lastEnd < text.length) {
      const remainingText = text.slice(lastEnd).trim();
      if (remainingText.length >= minChunkSize) {
        chunks.push({
          text: remainingText,
          start: lastEnd,
          end: text.length,
          index: chunks.length,
          type: "text"
        });
      }
    }
    return chunks;
  }
  function createChunks(graph, options = {}) {
    const {
      strategy = ChunkStrategies.SEMANTIC,
      chunkSize = 1e3,
      chunkOverlap = 200,
      minChunkSize = 100,
      maxChunkSize = 3e3,
      includeMetadata = true,
      includeBoundingBoxes = true
    } = options;
    const chunks = [];
    const summary = graph.getSummary();
    const headings = graph.layout?.getAllHeadings() || [];
    const tables = graph.structure?.getTables() || [];
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const pageText = graph.text?.getPageText(pageNum) || "";
      const pageClassification = graph.classifications?.[pageNum - 1] || null;
      const pageHeadings = graph.layout?.getHeadings(pageNum) || [];
      const pageTables = graph.structure?.getTables(pageNum) || [];
      const pageForms = graph.structure?.getForms(pageNum) || [];
      const pageLists = graph.structure?.getLists(pageNum) || [];
      const pageMetadata = {
        dates: graph.metadata?.getDates(pageNum) || [],
        phones: graph.metadata?.getPhones(pageNum) || [],
        emails: graph.metadata?.getEmails(pageNum) || [],
        addresses: graph.metadata?.getAddresses(pageNum) || [],
        amounts: graph.metadata?.getAmounts(pageNum) || []
      };
      const contentBlocks = graph._contentGraph?.blocks?.filter((b) => b.page === pageNum) || [];
      const contentEntities = graph._contentGraph?.entities?.filter((e) => e.page === pageNum) || [];
      let pageChunks = [];
      switch (strategy) {
        case ChunkStrategies.FIXED:
          pageChunks = fixedChunking(pageText, { chunkSize, chunkOverlap });
          break;
        case ChunkStrategies.SEMANTIC:
          pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
          break;
        case ChunkStrategies.PAGE:
          pageChunks = [{
            text: pageText,
            start: 0,
            end: pageText.length,
            index: 0,
            type: "page"
          }];
          break;
        case ChunkStrategies.SECTION:
          pageChunks = sectionChunking(pageText, pageHeadings, { minChunkSize, maxChunkSize });
          break;
        case ChunkStrategies.TABLE:
          pageChunks = tableChunking(pageText, pageTables, { minChunkSize, maxChunkSize });
          break;
        case ChunkStrategies.HYBRID:
          pageChunks = tableChunking(pageText, pageTables, { minChunkSize, maxChunkSize });
          if (pageChunks.length === 0) {
            pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
          }
          break;
        default:
          pageChunks = semanticChunking(pageText, { minChunkSize, maxChunkSize });
      }
      for (const chunk of pageChunks) {
        const enrichedChunk = {
          ...chunk,
          id: `page_${pageNum}_chunk_${chunk.index}`,
          pageNumber: pageNum,
          source: "codbdocs"
        };
        if (includeMetadata) {
          enrichedChunk.metadata = {
            pageNumber: pageNum,
            pageCount: summary.pageCount,
            classification: pageClassification,
            documentType: graph.getDocumentType?.() || null,
            headings: pageHeadings.map((h) => h.text),
            hasTables: pageTables.length > 0,
            hasForms: pageForms.length > 0,
            hasLists: pageLists.length > 0,
            entityTypes: [...new Set(contentEntities.map((e) => e.type))],
            contentBlockTypes: [...new Set(contentBlocks.map((b) => b.type))]
          };
          enrichedChunk.metadata.relevantEntities = contentEntities.filter((e) => {
            const ePos = e.position || 0;
            return ePos >= chunk.start && ePos < chunk.end;
          });
        }
        if (includeBoundingBoxes) {
          enrichedChunk.boundingBoxes = contentBlocks.filter((b) => b.start >= chunk.start && b.start < chunk.end).map((b) => b.bbox).filter(Boolean);
        }
        chunks.push(enrichedChunk);
      }
    }
    chunks.forEach((chunk, i) => {
      chunk.index = i;
    });
    return chunks;
  }
  function buildCrossPageContext(graph) {
    const context = {
      documentType: graph.getDocumentType?.() || null,
      globalEntities: [],
      entityRelationships: [],
      topicFlow: [],
      crossPageReferences: [],
      documentStructure: {
        sections: [],
        tables: [],
        forms: [],
        lists: []
      }
    };
    const summary = graph.getSummary();
    const entityMap = /* @__PURE__ */ new Map();
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const entities = graph._contentGraph?.entities?.filter((e) => e.page === pageNum) || [];
      for (const entity of entities) {
        const key = `${entity.type}:${entity.text?.toLowerCase()}`;
        if (entityMap.has(key)) {
          entityMap.get(key).occurrences.push({
            page: pageNum,
            position: entity.position,
            bbox: entity.bbox
          });
        } else {
          entityMap.set(key, {
            type: entity.type,
            text: entity.text,
            occurrences: [{
              page: pageNum,
              position: entity.position,
              bbox: entity.bbox
            }]
          });
        }
      }
    }
    context.globalEntities = Array.from(entityMap.values());
    const pageEntityMap = /* @__PURE__ */ new Map();
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const entities = graph._contentGraph?.entities?.filter((e) => e.page === pageNum) || [];
      pageEntityMap.set(pageNum, entities.map((e) => `${e.type}:${e.text?.toLowerCase()}`));
    }
    const relationshipMap = /* @__PURE__ */ new Map();
    for (const [pageNum, entities] of pageEntityMap) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
          const key = [entities[i], entities[j]].sort().join(" <-> ");
          if (relationshipMap.has(key)) {
            relationshipMap.get(key).pages.push(pageNum);
          } else {
            relationshipMap.set(key, {
              entities: [entities[i], entities[j]],
              pages: [pageNum],
              type: "co-occurrence"
            });
          }
        }
      }
    }
    context.entityRelationships = Array.from(relationshipMap.values()).filter((r) => r.pages.length > 1);
    const classifications = graph.classifications || [];
    let currentTopic = null;
    let topicStart = 1;
    for (let i = 0; i < classifications.length; i++) {
      const classification = classifications[i];
      const pageType = classification?.type || "unknown";
      if (pageType !== currentTopic) {
        if (currentTopic) {
          context.topicFlow.push({
            topic: currentTopic,
            startPage: topicStart,
            endPage: i,
            pageCount: i - topicStart + 1
          });
        }
        currentTopic = pageType;
        topicStart = i + 1;
      }
    }
    if (currentTopic) {
      context.topicFlow.push({
        topic: currentTopic,
        startPage: topicStart,
        endPage: classifications.length,
        pageCount: classifications.length - topicStart + 1
      });
    }
    const allHeadings = graph.layout?.getAllHeadings() || [];
    context.documentStructure.sections = allHeadings.map((h, i) => ({
      ...h,
      index: i,
      nextPageHeading: i + 1 < allHeadings.length ? allHeadings[i + 1] : null
    }));
    for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
      const tables = graph.structure?.getTables(pageNum) || [];
      const forms = graph.structure?.getForms(pageNum) || [];
      const lists = graph.structure?.getLists(pageNum) || [];
      context.documentStructure.tables.push(...tables.map((t) => ({ ...t, page: pageNum })));
      context.documentStructure.forms.push(...forms.map((f) => ({ ...f, page: pageNum })));
      context.documentStructure.lists.push(...lists.map((l) => ({ ...l, page: pageNum })));
    }
    const fullText = graph.text?.pages?.map((p) => p.text).join(" ") || "";
    const crossPagePatterns = [
      /(?:continued|cont)\.?\s+(?:on\s+)?page\s+(\d+)/gi,
      /(?:see|refer\s+to)\s+page\s+(\d+)/gi,
      /page\s+(\d+)\s+(?:for|to\s+see)/gi
    ];
    for (const pattern of crossPagePatterns) {
      let match;
      while ((match = pattern.exec(fullText)) !== null) {
        const referencedPage = parseInt(match[1]);
        if (referencedPage > 0 && referencedPage <= summary.pageCount) {
          context.crossPageReferences.push({
            text: match[0],
            fromPage: Math.ceil(match.index / fullText.length * summary.pageCount),
            toPage: referencedPage,
            type: "reference"
          });
        }
      }
    }
    return context;
  }
  function createRAGOutput(graph, options = {}) {
    const {
      chunkStrategy = ChunkStrategies.SEMANTIC,
      chunkSize = 1e3,
      chunkOverlap = 200,
      includeImages = false,
      includeVectors = false,
      includeMetadata = true,
      includeBoundingBoxes = true,
      includeCrossPageContext = true,
      embeddingProvider = null
    } = options;
    const summary = graph.getSummary();
    const documentType = graph.getDocumentType?.() || null;
    const chunks = createChunks(graph, {
      strategy: chunkStrategy,
      chunkSize,
      chunkOverlap,
      includeMetadata,
      includeBoundingBoxes
    });
    const context = includeCrossPageContext ? buildCrossPageContext(graph) : null;
    const ragOutput = {
      // Document metadata
      document: {
        type: documentType?.type || "unknown",
        confidence: documentType?.confidence || 0,
        pageCount: summary.pageCount,
        wordCount: summary.wordCount,
        headings: summary.headings,
        metadata: summary.metadata
      },
      // Content chunks for vector DB
      chunks: chunks.map((chunk) => ({
        id: chunk.id,
        text: chunk.text,
        metadata: chunk.metadata || {},
        bbox: chunk.boundingBoxes || [],
        pageNumber: chunk.pageNumber,
        chunkIndex: chunk.index,
        chunkType: chunk.type
      })),
      // Global entities
      entities: context?.globalEntities || [],
      // Entity relationships
      relationships: context?.entityRelationships || [],
      // Document structure
      structure: {
        headings: summary.headings,
        tables: summary.tableCount,
        forms: summary.formCount,
        lists: summary.listCount
      },
      // Topic flow
      topicFlow: context?.topicFlow || [],
      // Cross-page references
      crossPageReferences: context?.crossPageReferences || [],
      // Full text for context
      fullText: graph.text?.pages?.map((p) => p.text).join("\n\n") || "",
      // Page-by-page text
      pages: graph.text?.pages?.map((p) => ({
        pageNumber: p.pageNum,
        text: p.text,
        source: p.source,
        classification: graph.classifications?.[p.pageNum - 1] || null
      })) || []
    };
    if (includeImages) {
      ragOutput.images = graph._images || [];
    }
    if (includeVectors) {
      ragOutput.vectors = [];
      for (let pageNum = 1; pageNum <= summary.pageCount; pageNum++) {
        const pageVectors = graph.getVectors?.(pageNum) || [];
        ragOutput.vectors.push(...pageVectors.map((v) => ({
          ...v,
          pageNumber: pageNum
        })));
      }
    }
    if (embeddingProvider) {
      ragOutput.embeddings = {
        provider: embeddingProvider.name,
        model: embeddingProvider.model,
        dimensions: embeddingProvider.dimensions,
        chunks: chunks.map((chunk) => ({
          id: chunk.id,
          text: chunk.text
          // Embedding will be added by the provider
        }))
      };
    }
    return ragOutput;
  }
  var EmbeddingProvider = class {
    constructor(name, model, dimensions) {
      this.name = name;
      this.model = model;
      this.dimensions = dimensions;
    }
    async embed(texts) {
      throw new Error("embed() must be implemented by subclass");
    }
    async embedQuery(text) {
      const results = await this.embed([text]);
      return results[0];
    }
  };
  var OpenAIEmbeddingProvider = class extends EmbeddingProvider {
    constructor(apiKey, options = {}) {
      super("openai", options.model || "text-embedding-3-small", options.dimensions || 1536);
      this.apiKey = apiKey;
      this.baseUrl = options.baseUrl || "https://api.openai.com/v1";
    }
    async embed(texts) {
      const response = await fetch(`${this.baseUrl}/embeddings`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: this.model,
          input: texts
        })
      });
      if (!response.ok) {
        throw new Error(`Embedding failed: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data.map((d) => d.embedding);
    }
  };
  var LocalEmbeddingProvider = class extends EmbeddingProvider {
    constructor(options = {}) {
      super("local", options.model || "transformers.js", options.dimensions || 384);
      this.model = null;
      this.ready = false;
    }
    async initialize() {
      this.ready = true;
    }
    async embed(texts) {
      if (!this.ready) {
        await this.initialize();
      }
      return texts.map((text) => {
        const embedding = new Array(this.dimensions).fill(0);
        for (let i = 0; i < text.length; i++) {
          const charCode = text.charCodeAt(i);
          embedding[i % this.dimensions] += charCode;
          embedding[(i * 7 + 13) % this.dimensions] ^= charCode;
        }
        const norm = Math.sqrt(embedding.reduce((sum, x) => sum + x * x, 0));
        return embedding.map((x) => x / (norm || 1));
      });
    }
  };
  var CustomEmbeddingProvider = class extends EmbeddingProvider {
    constructor(name, embedFn, options = {}) {
      super(name, options.model || "custom", options.dimensions || 1536);
      this.embedFn = embedFn;
    }
    async embed(texts) {
      return this.embedFn(texts);
    }
  };
  async function createRAGOutputWithEmbeddings(graph, embeddingProvider, options = {}) {
    const ragOutput = createRAGOutput(graph, {
      ...options,
      embeddingProvider
    });
    const texts = ragOutput.chunks.map((c) => c.text);
    const embeddings = await embeddingProvider.embed(texts);
    ragOutput.chunks = ragOutput.chunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i]
    }));
    return ragOutput;
  }
  function exportAsJSONL(ragOutput) {
    return ragOutput.chunks.map((chunk) => JSON.stringify({
      id: chunk.id,
      text: chunk.text,
      metadata: chunk.metadata,
      embedding: chunk.embedding || null
    })).join("\n");
  }
  function exportAsCSV(ragOutput) {
    const headers = ["id", "text", "pageNumber", "chunkType", "embedding"];
    const rows = ragOutput.chunks.map((chunk) => [
      chunk.id,
      `"${chunk.text.replace(/"/g, '""')}"`,
      chunk.pageNumber,
      chunk.chunkType,
      chunk.embedding ? `"${chunk.embedding.join(",")}"` : ""
    ]);
    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  }

  // src/workers.js
  var HAS_OFFSCREEN = typeof OffscreenCanvas !== "undefined";
  var HAS_WORKERS = typeof Worker !== "undefined";
  function canUseWorkers() {
    return HAS_OFFSCREEN && HAS_WORKERS;
  }

  // src/pdfir.js
  function createIR() {
    return {
      version: "1.0",
      document: {
        id: generateId("doc"),
        hash: null,
        title: null,
        type: "unknown",
        metadata: {},
        pages: [],
        structure: null,
        resources: {},
        navigation: {},
        security: {},
        provenance: { source: "pdf", extraction: "native" }
      },
      pages: {},
      objects: {},
      entities: {},
      relationships: {},
      concepts: {},
      images: {},
      tables: {},
      forms: {},
      annotations: {},
      vectors: {},
      resources: {},
      structure: {},
      assets: {}
    };
  }
  function addPage(ir, pageNum, data) {
    const pageId = `page_${pageNum}`;
    ir.pages[pageId] = {
      id: pageId,
      num: pageNum,
      width: data.width || 0,
      height: data.height || 0,
      rotation: data.rotation || 0,
      mediaBox: data.mediaBox || null,
      cropBox: data.cropBox || null,
      content: [],
      vectors: [],
      images: [],
      annotations: [],
      forms: [],
      labels: data.labels || null
    };
    ir.document.pages.push(pageId);
    return ir.pages[pageId];
  }
  function addTextObject(ir, pageId, data) {
    const id = generateId("text");
    ir.objects[id] = {
      id,
      type: "text",
      page: pageId,
      raw: {
        glyphs: data.glyphs || [],
        font: data.font || null,
        fontSize: data.fontSize || 12,
        transform: data.transform || [1, 0, 0, 1, 0, 0],
        text: data.text || "",
        encoding: data.encoding || null
      },
      semantic: {
        role: data.role || "paragraph",
        level: data.level || null,
        text: data.text || ""
      },
      accessibility: {
        role: data.accessRole || "P"
      },
      provenance: {
        method: "native",
        confidence: 1
      },
      bbox: data.bbox || null
    };
    ir.pages[pageId]?.content.push(id);
    return ir.objects[id];
  }
  function addVectorObject(ir, pageId, data) {
    const id = generateId("vec");
    ir.vectors[id] = {
      id,
      type: data.type || "path",
      // path, line, rect, circle, curve, arrow
      page: pageId,
      points: data.points || [],
      from: data.from || null,
      to: data.to || null,
      bbox: data.bbox || null,
      graphicsState: {
        stroke: data.stroke || null,
        fill: data.fill || null,
        lineWidth: data.lineWidth || 1,
        lineCap: data.lineCap || "butt",
        lineJoin: data.lineJoin || "miter",
        dash: data.dash || null,
        opacity: data.opacity || 1,
        blendMode: data.blendMode || "Normal",
        transform: data.transform || [1, 0, 0, 1, 0, 0],
        clip: data.clip || null
      },
      semantic: {
        role: data.semanticRole || null
        // table_border, checkbox, form_field, separator, decoration
      },
      provenance: {
        method: "native",
        confidence: 1
      }
    };
    ir.pages[pageId]?.vectors.push(id);
    return ir.vectors[id];
  }
  async function extractVectors(page) {
    const opList = await page.getOperatorList();
    const vectors = [];
    let currentTransform = [1, 0, 0, 1, 0, 0];
    let currentStroke = null;
    let currentFill = null;
    let currentLineWidth = 1;
    let currentLineCap = "butt";
    let currentLineJoin = "miter";
    let currentDash = null;
    let currentClip = null;
    let pathPoints = [];
    let pathStart = null;
    const FN = pdfjsLib?.OPS || {};
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      const args = opList.argsArray[i];
      switch (fn) {
        // Transform
        case (FN.transform || 8):
          if (args && args.length >= 6) {
            currentTransform = args.slice(0, 6);
          }
          break;
        // Path operations
        case (FN.moveTo || 13):
          if (args) {
            pathStart = { x: args[0], y: args[1] };
            pathPoints.push({ op: "moveTo", x: args[0], y: args[1] });
          }
          break;
        case (FN.lineTo || 14):
          if (args) {
            pathPoints.push({ op: "lineTo", x: args[0], y: args[1] });
          }
          break;
        case (FN.curveTo || 15):
          if (args) {
            pathPoints.push({ op: "curveTo", x1: args[0], y1: args[1], x2: args[2], y2: args[3], x3: args[4], y3: args[5] });
          }
          break;
        case (FN.rectangle || 19):
          if (args && args.length >= 4) {
            vectors.push(createVector("rect", page, {
              bbox: [args[0], args[1], args[2] - args[0], args[3] - args[1]],
              stroke: currentStroke,
              fill: currentFill,
              lineWidth: currentLineWidth,
              transform: currentTransform
            }));
          }
          break;
        // Stroke
        case (FN.stroke || 20):
          if (pathPoints.length > 0) {
            vectors.push(createVector("path", page, {
              points: [...pathPoints],
              stroke: currentStroke,
              fill: null,
              lineWidth: currentLineWidth,
              lineCap: currentLineCap,
              lineJoin: currentLineJoin,
              dash: currentDash,
              transform: currentTransform
            }));
          }
          pathPoints = [];
          break;
        // Fill
        case (FN.fill || 21):
        case (FN.eoFill || 22):
          if (pathPoints.length > 0) {
            vectors.push(createVector("path", page, {
              points: [...pathPoints],
              stroke: null,
              fill: currentFill,
              lineWidth: currentLineWidth,
              transform: currentTransform
            }));
          }
          pathPoints = [];
          break;
        // Fill and stroke
        case (FN.fillStroke || 23):
        case (FN.eoFillStroke || 24):
          if (pathPoints.length > 0) {
            vectors.push(createVector("path", page, {
              points: [...pathPoints],
              stroke: currentStroke,
              fill: currentFill,
              lineWidth: currentLineWidth,
              transform: currentTransform
            }));
          }
          pathPoints = [];
          break;
        // Close path
        case (FN.closePath || 16):
          pathPoints.push({ op: "closePath" });
          break;
        // Graphics state
        case (FN.save || 25):
          break;
        case (FN.restore || 26):
          break;
        case (FN.setStrokeRGBColor || 43):
          if (args) currentStroke = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
          break;
        case (FN.setFillRGBColor || 44):
          if (args) currentFill = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
          break;
        case (FN.setLineWidth || 40):
          if (args) currentLineWidth = args[0];
          break;
        case (FN.setLineCap || 41):
          if (args) {
            const caps = ["butt", "round", "square"];
            currentLineCap = caps[args[0]] || "butt";
          }
          break;
        case (FN.setLineJoin || 42):
          if (args) {
            const joins = ["miter", "round", "bevel"];
            currentLineJoin = joins[args[0]] || "miter";
          }
          break;
        case (FN.setDash || 45):
          if (args) currentDash = args[0];
          break;
        // Clipping
        case (FN.clip || 28):
        case (FN.eoClip || 29):
          currentClip = [...pathPoints];
          break;
      }
    }
    return vectors;
  }
  function createVector(type, page, data) {
    return {
      type,
      ...data,
      semanticRole: classifyVector(type, data)
    };
  }
  function classifyVector(type, data) {
    if (type === "rect") {
      const [x, y, w, h] = data.bbox || [0, 0, 0, 0];
      const area = w * h;
      if (w > 8 && w < 20 && h > 8 && h < 20 && Math.abs(w - h) < 3) {
        return "checkbox";
      }
      if (h < 2 && w > 20) return "separator";
      if (data.stroke && data.fill === null && area > 100) {
        return "table_border";
      }
      return "border";
    }
    if (type === "path") {
      if (data.points.length === 2 && data.points[0].op === "moveTo" && data.points[1].op === "lineTo") {
        const dx = data.points[1].x - data.points[0].x;
        const dy = data.points[1].y - data.points[0].y;
        if (Math.abs(dx) > 20 && Math.abs(dy) < 2) return "horizontal_line";
        if (Math.abs(dy) > 20 && Math.abs(dx) < 2) return "vertical_line";
        return "line";
      }
      if (data.points.length > 10) return "complex_path";
    }
    return null;
  }
  function auditAccessibility(ir) {
    const issues = [];
    let score = 100;
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      for (const objId of page.content) {
        const obj = ir.objects[objId];
        if (obj?.type === "image" && !obj.accessibility?.alt) {
          issues.push({
            type: "missing_alt_text",
            page: pageNum,
            element: objId,
            severity: "error",
            message: "Image has no alternative text",
            suggestion: "Add descriptive alt text for screen readers"
          });
          score -= 5;
        }
      }
      const headings = page.content.map((id) => ir.objects[id]).filter((obj) => obj?.semantic?.role === "heading");
      let prevLevel = 0;
      for (const heading of headings) {
        const level = heading.semantic.level || 1;
        if (level > prevLevel + 1 && prevLevel > 0) {
          issues.push({
            type: "heading_skip",
            page: pageNum,
            element: heading.id,
            severity: "warning",
            message: `Heading level skipped from H${prevLevel} to H${level}`,
            suggestion: `Use H${prevLevel + 1} instead`
          });
          score -= 2;
        }
        prevLevel = level;
      }
      for (const vecId of page.vectors || []) {
        const vec = ir.vectors[vecId];
        if (vec?.semantic?.role === "table_border") {
          const nearbyTexts = page.content.map((id) => ir.objects[id]).filter((obj) => obj?.bbox && isNear(vec.bbox, obj.bbox));
          const hasHeader = nearbyTexts.some(
            (t) => t.raw?.fontSize > 12 || t.semantic?.role === "heading"
          );
          if (!hasHeader) {
            issues.push({
              type: "table_no_header",
              page: pageNum,
              element: vecId,
              severity: "warning",
              message: "Table may be missing header row",
              suggestion: "Ensure first row contains column headers"
            });
            score -= 2;
          }
        }
      }
      if (page.content.length > 5) {
        const sorted = [...page.content].map((id) => ir.objects[id]).filter((obj) => obj?.bbox).sort((a, b) => a.bbox[1] - b.bbox[1]);
        for (let i = 1; i < sorted.length; i++) {
          const prev = sorted[i - 1];
          const curr = sorted[i];
          if (prev.bbox[1] > curr.bbox[1] + 50) {
            issues.push({
              type: "reading_order",
              page: pageNum,
              element: curr.id,
              severity: "info",
              message: "Element may be out of reading order",
              suggestion: "Verify content reads correctly top-to-bottom"
            });
            score -= 1;
          }
        }
      }
      for (const objId of page.content) {
        const obj = ir.objects[objId];
        if (obj?.type === "text" && obj.raw?.color) {
        }
      }
      if (!ir.document.metadata?.language) {
        issues.push({
          type: "missing_language",
          page: 1,
          severity: "warning",
          message: "Document language not specified",
          suggestion: "Set document.language for screen reader pronunciation"
        });
        score -= 3;
      }
      if (!ir.document.metadata?.title) {
        issues.push({
          type: "missing_title",
          page: 1,
          severity: "warning",
          message: "Document has no title",
          suggestion: "Set document.metadata.title"
        });
        score -= 2;
      }
    }
    return {
      score: Math.max(0, score),
      issues,
      summary: {
        errors: issues.filter((i) => i.severity === "error").length,
        warnings: issues.filter((i) => i.severity === "warning").length,
        info: issues.filter((i) => i.severity === "info").length
      }
    };
  }
  function generateAccessibilityTree(ir) {
    const tree = { type: "Document", children: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNode = { type: "Page", properties: { pageNumber: page.num }, children: [] };
      for (const objId of page.content) {
        const obj = ir.objects[objId];
        if (!obj) continue;
        const node = {
          type: obj.accessibility?.role || mapRole(obj.semantic?.role),
          properties: {},
          children: []
        };
        if (obj.semantic?.text) {
          node.children.push({ type: "Text", content: obj.semantic.text });
        }
        if (obj.semantic?.role === "heading") {
          node.properties.level = obj.semantic.level || 1;
        }
        pageNode.children.push(node);
      }
      tree.children.push(pageNode);
    }
    return tree;
  }
  function mapRole(role) {
    const map = {
      heading: "Heading",
      paragraph: "Paragraph",
      table: "Table",
      list: "List",
      image: "Figure",
      form_field: "Form",
      signature: "Signature"
    };
    return map[role] || "Paragraph";
  }
  function isNear(bbox1, bbox2, threshold = 100) {
    if (!bbox1 || !bbox2) return false;
    const cx1 = bbox1[0] + bbox1[2] / 2;
    const cy1 = bbox1[1] + bbox1[3] / 2;
    const cx2 = bbox2[0] + bbox2[2] / 2;
    const cy2 = bbox2[1] + bbox2[3] / 2;
    return Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2)) < threshold;
  }
  function exportHTML(ir, options = {}) {
    const { mode = "accessible", includeDataAttributes: includeDataAttributes2 = true } = options;
    let html = '<!DOCTYPE html>\n<html lang="' + (ir.document.metadata?.language || "en") + '">\n<head>\n';
    html += '<meta charset="UTF-8">\n';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += "<title>" + escapeHTML(ir.document.metadata?.title || "Document") + "</title>\n";
    if (mode === "visual") {
      html += generateVisualStyles(ir);
    } else {
      html += generateAccessibleStyles();
    }
    html += "</head>\n<body>\n";
    if (mode === "accessible" || mode === "intelligent") {
      html += '<main role="document">\n';
    }
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const attrs = includeDataAttributes2 ? ` data-pdf-page="${page.num}" data-pdf-page-id="${pageId}"` : "";
      if (mode === "visual") {
        html += `<div class="pdf-page"${attrs} style="width:${page.width}px;height:${page.height}px;position:relative;">
`;
        html += renderPageVisual(page, ir, attrs);
        html += "</div>\n";
      } else {
        html += `<section class="pdf-page"${attrs} aria-label="Page ${page.num}">
`;
        html += renderPageAccessible(page, ir, attrs, mode);
        html += "</section>\n";
      }
    }
    if (mode === "accessible" || mode === "intelligent") {
      html += "</main>\n";
    }
    html += "</body>\n</html>";
    return html;
  }
  function renderPageVisual(page, ir, attrs) {
    let html = "";
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (!vec) continue;
      html += renderVectorVisual(vec, attrs);
    }
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (!obj) continue;
      if (obj.type === "text") {
        html += `<div class="pdf-text"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${obj.bbox?.[0] || 0}px;top:${obj.bbox?.[1] || 0}px;font-size:${obj.raw?.fontSize || 12}px;">${escapeHTML(obj.semantic?.text || "")}</div>
`;
      } else if (obj.type === "image") {
        html += `<div class="pdf-image"${attrs} data-pdf-object="${objId}" style="position:absolute;left:${obj.bbox?.[0] || 0}px;top:${obj.bbox?.[1] || 0}px;width:${obj.bbox?.[2] || 0}px;height:${obj.bbox?.[3] || 0}px;background:#eee;display:flex;align-items:center;justify-content:center;color:#999;">[Image]</div>
`;
      }
    }
    return html;
  }
  function renderPageAccessible(page, ir, attrs, mode) {
    let html = "";
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (!obj) continue;
      const dataAttr = includeDataAttributes(objId, attrs);
      const role = obj.semantic?.role || "paragraph";
      if (role === "heading") {
        const level = obj.semantic?.level || 2;
        html += `<h${level}${dataAttr}>${escapeHTML(obj.semantic?.text || "")}</h${level}>
`;
      } else if (role === "table") {
        html += `<table${dataAttr}>
`;
        html += `<caption>${escapeHTML(obj.semantic?.caption || "Table")}</caption>
`;
        html += "</table>\n";
      } else if (role === "list") {
        html += `<ul${dataAttr}>
`;
        html += "</ul>\n";
      } else if (obj.type === "image") {
        const alt = obj.accessibility?.alt || (mode === "intelligent" ? "AI-generated description" : "Image");
        const src = obj.raw?.src || "";
        html += `<figure${dataAttr}>
`;
        html += `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}">
`;
        if (obj.semantic?.caption) {
          html += `<figcaption>${escapeHTML(obj.semantic.caption)}</figcaption>
`;
        }
        if (mode === "intelligent" && obj.provenance?.method === "vision") {
          html += `<small class="ai-generated">AI-generated description</small>
`;
        }
        html += "</figure>\n";
      } else {
        html += `<p${dataAttr}>${escapeHTML(obj.semantic?.text || "")}</p>
`;
      }
    }
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (!vec) continue;
      if (vec.semantic?.role === "separator") {
        html += `<hr${attrs} data-pdf-vector="${vecId}">
`;
      }
    }
    return html;
  }
  function renderVectorVisual(vec, attrs) {
    if (!vec.bbox) return "";
    if (vec.type === "rect") {
      const style = `position:absolute;left:${vec.bbox[0]}px;top:${vec.bbox[1]}px;width:${vec.bbox[2]}px;height:${vec.bbox[3]}px;`;
      const stroke = vec.graphicsState?.stroke ? `border:1px solid ${vec.graphicsState.stroke};` : "";
      const fill = vec.graphicsState?.fill ? `background:${vec.graphicsState.fill};` : "";
      return `<div class="pdf-rect"${attrs} data-pdf-vector="${vec.id}" style="${style}${stroke}${fill}"></div>
`;
    }
    if (vec.type === "path" && vec.points?.length > 0) {
      let d = "";
      for (const pt of vec.points) {
        if (pt.op === "moveTo") d += `M${pt.x},${pt.y}`;
        else if (pt.op === "lineTo") d += `L${pt.x},${pt.y}`;
        else if (pt.op === "curveTo") d += `C${pt.x1},${pt.y1} ${pt.x2},${pt.y2} ${pt.x3},${pt.y3}`;
        else if (pt.op === "closePath") d += "Z";
      }
      const stroke = vec.graphicsState?.stroke || "#000";
      const fill = vec.graphicsState?.fill || "none";
      return `<svg class="pdf-path"${attrs} data-pdf-vector="${vec.id}" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;"><path d="${d}" stroke="${stroke}" fill="${fill}" stroke-width="${vec.graphicsState?.lineWidth || 1}"/></svg>
`;
    }
    return "";
  }
  function includeDataAttributes(objId, attrs) {
    return attrs ? `${attrs} data-pdf-object="${objId}"` : ` data-pdf-object="${objId}"`;
  }
  function generateVisualStyles(ir) {
    return `<style>
    body { margin: 0; padding: 20px; background: #f5f5f5; font-family: system-ui, sans-serif; }
    .pdf-page { background: white; margin: 20px auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
    .pdf-text { white-space: pre-wrap; }
    .pdf-image { border: 1px dashed #ccc; }
    .pdf-rect { border: 1px solid #000; }
    .ai-generated { color: #999; font-style: italic; }
  </style>
`;
  }
  function generateAccessibleStyles() {
    return `<style>
    body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 800px; margin: 0 auto; }
    .pdf-page { margin: 40px 0; padding: 20px 0; border-bottom: 1px solid #eee; }
    h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; }
    p { margin: 0.5em 0; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    figure { margin: 1em 0; }
    img { max-width: 100%; height: auto; }
    figcaption { font-size: 0.9em; color: #666; margin-top: 4px; }
    .ai-generated { color: #999; font-size: 0.8em; font-style: italic; }
    hr { border: none; border-top: 1px solid #eee; margin: 1em 0; }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
    @media (prefers-contrast: high) { body { background: #000; color: #fff; } a { color: #ff0; } }
  </style>
`;
  }
  async function extractStructureTree(page) {
    try {
      const structTree = await page.getStructTree();
      if (!structTree) return null;
      return convertStructTreeNode(structTree);
    } catch (e) {
      return null;
    }
  }
  function convertStructTreeNode(node) {
    if (!node) return null;
    const result = {
      type: node.type || "Unknown",
      role: node.role || node.type,
      children: []
    };
    if (node.alt) result.alt = node.alt;
    if (node.lang) result.lang = node.lang;
    if (node.altText) result.altText = node.altText;
    if (node.children) {
      for (const child of node.children) {
        if (typeof child === "string") {
          result.children.push({ type: "Text", content: child });
        } else {
          const converted = convertStructTreeNode(child);
          if (converted) result.children.push(converted);
        }
      }
    }
    return result;
  }
  async function extractAnnotations(page) {
    try {
      const annotations = await page.getAnnotations();
      if (!annotations || annotations.length === 0) return [];
      return annotations.map((ann) => ({
        id: ann.id,
        type: mapAnnotationType(ann.subtype),
        subtype: ann.subtype,
        rect: ann.rect,
        // [x1, y1, x2, y2]
        color: ann.color,
        contents: ann.contents || "",
        title: ann.title || "",
        modificationDate: ann.modDate,
        creationDate: ann.creationDate,
        flags: ann.flags,
        // Form-specific
        fieldType: ann.fieldType,
        fieldValue: ann.fieldValue,
        buttonWidgetType: ann.buttonWidgetType,
        options: ann.options,
        // Link-specific
        url: ann.url,
        dest: ann.dest,
        // Markup-specific
        strokeWidth: ann.strokeWidth,
        strokeColor: ann.strokeColor,
        fillColor: ann.fillColor,
        opacity: ann.opacity
      }));
    } catch (e) {
      return [];
    }
  }
  function mapAnnotationType(subtype) {
    const typeMap = {
      "Text": "note",
      "Link": "link",
      "FreeText": "free_text",
      "Line": "line",
      "Square": "square",
      "Circle": "circle",
      "Polygon": "polygon",
      "PolyLine": "polyline",
      "Highlight": "highlight",
      "Underline": "underline",
      "Squiggly": "squiggly",
      "StrikeOut": "strikeout",
      "Stamp": "stamp",
      "Caret": "caret",
      "Ink": "ink",
      "Popup": "popup",
      "FileAttachment": "file_attachment",
      "Sound": "sound",
      "Movie": "movie",
      "Widget": "form_field",
      "Screen": "screen",
      "PrinterMark": "printer_mark",
      "TrapNet": "trap_net",
      "Watermark": "watermark",
      "3D": "3d",
      "Redact": "redact"
    };
    return typeMap[subtype] || subtype || "unknown";
  }
  function detectReadingOrder(ir, pageNum) {
    const pageId = `page_${pageNum}`;
    const page = ir.pages[pageId];
    if (!page) return [];
    const objects = [];
    for (const objId of page.content) {
      const obj = ir.objects[objId];
      if (obj && obj.bbox) {
        objects.push({
          id: objId,
          type: obj.type,
          bbox: obj.bbox,
          text: obj.semantic?.text || "",
          // Calculate center point for sorting
          centerX: obj.bbox[0] + obj.bbox[2] / 2,
          centerY: obj.bbox[1] + obj.bbox[3] / 2
        });
      }
    }
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (vec && vec.bbox && vec.semantic?.role) {
        objects.push({
          id: vecId,
          type: "vector",
          bbox: vec.bbox,
          text: vec.semantic.role,
          centerX: vec.bbox[0] + vec.bbox[2] / 2,
          centerY: vec.bbox[1] + vec.bbox[3] / 2
        });
      }
    }
    if (objects.length === 0) return [];
    const sorted = objects.sort((a, b) => {
      const yDiff = a.centerY - b.centerY;
      if (Math.abs(yDiff) > 10) return yDiff;
      return a.centerX - b.centerX;
    });
    return sorted.map((obj, index) => ({
      ...obj,
      readingOrder: index
    }));
  }
  function getReadingOrderSequence(ir, pageNum) {
    const order = detectReadingOrder(ir, pageNum);
    return order.map((item) => item.id);
  }
  var idCounter = 0;
  function generateId(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;
  }
  function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // src/extended.js
  async function extractDocumentMetadata(pdf) {
    try {
      const metadata = await pdf.getMetadata();
      const info = metadata?.info || {};
      const metadataObj = metadata?.metadata || null;
      let xmp = null;
      if (metadataObj) {
        try {
          xmp = metadataObj.getAll();
        } catch (e) {
        }
      }
      return {
        title: info.Title || xmp?.title || null,
        author: info.Author || xmp?.author || null,
        subject: info.Subject || xmp?.subject || null,
        keywords: info.Keywords ? info.Keywords.split(/[,;]+/).map((k) => k.trim()) : xmp?.keywords || [],
        creator: info.Creator || xmp?.creator || null,
        producer: info.Producer || xmp?.producer || null,
        creationDate: info.CreationDate || xmp?.creationDate || null,
        modificationDate: info.ModDate || xmp?.modificationDate || null,
        language: info.Language || xmp?.language || null,
        trapped: info.Trapped || null,
        custom: xmp || {}
      };
    } catch (e) {
      return {};
    }
  }
  async function extractOutline(pdf) {
    try {
      const outline = await pdf.getOutline();
      if (!outline || outline.length === 0) return [];
      return convertOutlineItems(outline, pdf);
    } catch (e) {
      return [];
    }
  }
  async function convertOutlineItems(items, pdf) {
    const result = [];
    for (const item of items) {
      const outlineItem = {
        title: item.title || "",
        color: item.color || [0, 0, 0],
        italic: item.italic || false,
        bold: item.bold || false,
        dest: null,
        url: null,
        children: []
      };
      try {
        if (item.dest) {
          let dest = item.dest;
          if (typeof dest === "string") {
            try {
              dest = await pdf.getDestination(dest);
            } catch (e) {
            }
          }
          if (Array.isArray(dest)) {
            const pageIndex = await pdf.getPageIndex(dest[0]);
            outlineItem.dest = {
              page: pageIndex + 1,
              kind: dest[1] || "XYZ",
              args: dest.slice(2)
            };
          }
        }
      } catch (e) {
      }
      if (item.url) {
        outlineItem.url = item.url;
      }
      if (item.items && item.items.length > 0) {
        outlineItem.children = await convertOutlineItems(item.items, pdf);
      }
      result.push(outlineItem);
    }
    return result;
  }
  async function extractNamedDestinations(pdf) {
    try {
      const destinations = await pdf.getDestinations();
      const result = {};
      for (const [name, dest] of Object.entries(destinations)) {
        try {
          if (Array.isArray(dest)) {
            const pageIndex = await pdf.getPageIndex(dest[0]);
            result[name] = {
              page: pageIndex + 1,
              kind: dest[1] || "XYZ",
              args: dest.slice(2)
            };
          }
        } catch (e) {
        }
      }
      return result;
    } catch (e) {
      return {};
    }
  }
  async function extractPageLabels(pdf) {
    try {
      const count = pdf.numPages;
      const labels = [];
      for (let i = 0; i < count; i++) {
        labels.push({
          page: i + 1,
          label: `${i + 1}`,
          style: "decimal"
        });
      }
      return labels;
    } catch (e) {
      return [];
    }
  }
  async function extractSecurity(pdf) {
    try {
      const isEncrypted = pdf.isEncrypted || false;
      let permissions = null;
      try {
        permissions = await pdf.getPermissions();
      } catch (e) {
      }
      return {
        encrypted: isEncrypted,
        permissions: permissions ? {
          printing: permissions.printing !== "disabled",
          modifying: permissions.modifying !== "disabled",
          copying: permissions.copying !== "disabled",
          annotating: permissions.annotating !== "disabled",
          fillingForms: permissions.fillingForms !== "disabled",
          contentAccessibility: permissions.contentAccessibility !== "disabled",
          documentAssembly: permissions.documentAssembly !== "disabled",
          highQualityPrinting: permissions.highQualityPrinting !== "disabled"
        } : null,
        algorithm: null
      };
    } catch (e) {
      return {
        encrypted: false,
        permissions: null,
        algorithm: null
      };
    }
  }
  async function extractMarkedContent(page) {
    try {
      const opList = await page.getOperatorList();
      const markedContent = [];
      let mcStack = [];
      const OPS = typeof pdfjsLib !== "undefined" ? pdfjsLib.OPS || {} : {};
      for (let i = 0; i < opList.fnArray.length; i++) {
        const fn = opList.fnArray[i];
        const args = opList.argsArray[i];
        if (fn === OPS.beginMarkedContent || fn === 18) {
          const mc = {
            tag: args[0] || "Unknown",
            properties: args[1] || {},
            type: "marked_content",
            isArtifact: false,
            children: []
          };
          mcStack.push(mc);
        } else if (fn === OPS.beginMarkedContentProps || fn === 19) {
          const mc = {
            tag: args[0] || "Unknown",
            properties: args[1] || {},
            type: "marked_content",
            isArtifact: args[0] === "Artifact",
            children: []
          };
          mcStack.push(mc);
        } else if (fn === OPS.endMarkedContent || fn === 20) {
          if (mcStack.length > 0) {
            const completed = mcStack.pop();
            if (mcStack.length > 0) {
              mcStack[mcStack.length - 1].children.push(completed);
            } else {
              markedContent.push(completed);
            }
          }
        }
      }
      return markedContent;
    } catch (e) {
      return [];
    }
  }
  async function extractArtifacts(page) {
    const markedContent = await extractMarkedContent(page);
    const artifacts = [];
    function collectArtifacts(node) {
      if (node.isArtifact) {
        artifacts.push({
          tag: node.tag,
          properties: node.properties,
          type: categorizeArtifact(node.tag, node.properties)
        });
      }
      if (node.children) {
        for (const child of node.children) {
          collectArtifacts(child);
        }
      }
    }
    for (const mc of markedContent) {
      collectArtifacts(mc);
    }
    return artifacts;
  }
  function categorizeArtifact(tag) {
    if (tag === "Pagination" || tag === "PageNumber") return "pagination";
    if (tag === "Header") return "header";
    if (tag === "Footer") return "footer";
    if (tag === "Figure") return "decorative_figure";
    if (tag === "Background") return "background";
    return "unknown";
  }
  async function extractGlyphs(page) {
    try {
      const content = await page.getTextContent();
      const glyphs = [];
      for (const item of content.items) {
        if (item.str && item.str.trim()) {
          const transform = item.transform;
          const fontSize = Math.abs(transform[0]) || 12;
          const translateX = transform[4] || 0;
          const translateY = transform[5] || 0;
          const charWidth = item.width / Math.max(item.str.length, 1);
          for (let i = 0; i < item.str.length; i++) {
            glyphs.push({
              unicode: item.str[i],
              charCode: item.str.charCodeAt(i),
              advance: charWidth,
              transform: [
                transform[0],
                transform[1],
                transform[2],
                transform[3],
                translateX + i * charWidth,
                translateY
              ],
              font: item.fontName || null,
              fontSize,
              bbox: [
                translateX + i * charWidth,
                translateY,
                charWidth,
                fontSize
              ]
            });
          }
        }
      }
      return glyphs;
    } catch (e) {
      return [];
    }
  }
  function generateRemediations(auditResult, ir) {
    const fixes = [];
    if (!auditResult || !auditResult.issues) return fixes;
    for (const issue of auditResult.issues) {
      switch (issue.type) {
        case "missing_alt_text":
          fixes.push({
            issue: issue.type,
            page: issue.page,
            element: issue.element,
            severity: issue.severity,
            fix: {
              type: "add_alt_text",
              suggestedAlt: generateAltText(issue, ir),
              strategy: "vision"
            }
          });
          break;
        case "missing_heading_structure":
          fixes.push({
            issue: issue.type,
            page: issue.page,
            severity: issue.severity,
            fix: {
              type: "add_heading_structure",
              suggestedStructure: inferHeadingStructure(ir),
              strategy: "inference"
            }
          });
          break;
        case "missing_language":
          fixes.push({
            issue: issue.type,
            severity: issue.severity,
            fix: {
              type: "add_language",
              suggestedLanguage: "en-US",
              strategy: "detection"
            }
          });
          break;
        case "missing_title":
          fixes.push({
            issue: issue.type,
            severity: issue.severity,
            fix: {
              type: "add_title",
              suggestedTitle: inferDocumentTitle(ir),
              strategy: "inference"
            }
          });
          break;
        case "reading_order":
          fixes.push({
            issue: issue.type,
            page: issue.page,
            severity: issue.severity,
            fix: {
              type: "fix_reading_order",
              suggestedOrder: inferReadingOrder(ir, issue.page),
              strategy: "spatial"
            }
          });
          break;
      }
    }
    return fixes;
  }
  function generateAltText(issue, ir) {
    if (issue.element) {
      const obj = ir.objects[issue.element];
      if (obj && obj.type === "image") {
        return "Image on page " + (obj.page || "unknown");
      }
    }
    return "Decorative image";
  }
  function inferHeadingStructure(ir) {
    const headings = [];
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (obj.semantic?.role === "heading") {
        headings.push({ id, level: obj.semantic.level, text: obj.semantic.text });
      }
    }
    return headings;
  }
  function inferDocumentTitle(ir) {
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (obj.semantic?.role === "heading" && obj.semantic.level === 1) {
        return obj.semantic.text;
      }
    }
    return "Untitled Document";
  }
  function inferReadingOrder(ir, pageNum) {
    const pageId = `page_${pageNum}`;
    const page = ir.pages[pageId];
    if (!page) return [];
    const objects = page.content.map((id) => ir.objects[id]).filter((obj) => obj && obj.bbox);
    return objects.sort((a, b) => {
      const ay = a.bbox[1] || 0;
      const by = b.bbox[1] || 0;
      if (Math.abs(ay - by) > 10) return ay - by;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    }).map((obj) => obj.id);
  }

  // src/graphics.js
  var ColorSpaceTypes = {
    DEVICE_RGB: "DeviceRGB",
    DEVICE_CMYK: "DeviceCMYK",
    DEVICE_GRAY: "DeviceGray",
    ICC_BASED: "ICCBased",
    CAL_GRAY: "CalGray",
    CAL_RGB: "CalRGB",
    LAB: "Lab",
    SEPARATION: "Separation",
    DEVICE_N: "DeviceN",
    INDEXED: "Indexed",
    PATTERN: "Pattern"
  };
  function createGraphicsState() {
    return {
      transform: [1, 0, 0, 1, 0, 0],
      stroke: {
        colorSpace: ColorSpaceTypes.DEVICE_RGB,
        color: [0, 0, 0],
        width: 1,
        cap: "butt",
        join: "miter",
        dash: [],
        dashPhase: 0
      },
      fill: {
        colorSpace: ColorSpaceTypes.DEVICE_RGB,
        color: [0, 0, 0]
      },
      lineWidth: 1,
      lineCap: "butt",
      lineJoin: "miter",
      miterLimit: 10,
      dash: [],
      dashPhase: 0,
      opacity: 1,
      strokeOpacity: 1,
      fillOpacity: 1,
      blendMode: "Normal",
      clip: null,
      clipPath: [],
      softMask: null,
      transparencyGroup: null,
      renderingIntent: "RelativeColorimetric",
      overprint: false,
      overprintMode: 0
    };
  }
  function pushGraphicsState(state) {
    return JSON.parse(JSON.stringify(state));
  }
  function popGraphicsState(stack) {
    return stack.pop() || createGraphicsState();
  }
  function applyTransform(state, transform) {
    if (!transform || transform.length < 6) return state;
    const [a, b, c, d, e, f] = state.transform;
    const [a2, b2, c2, d2, e2, f2] = transform;
    state.transform = [
      a * a2 + c * b2,
      b * a2 + d * b2,
      a * c2 + c * d2,
      b * c2 + d * d2,
      a * e2 + c * f2 + e,
      b * e2 + d * f2 + f
    ];
    return state;
  }
  function cmykToRgb(c, m, y, k) {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return [Math.round(r), Math.round(g), Math.round(b)];
  }
  function rgbToCmyk(r, g, b) {
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const k = 1 - Math.max(rr, gg, bb);
    if (k === 1) return [0, 0, 0, 100];
    const c = (1 - rr - k) / (1 - k) * 100;
    const m = (1 - gg - k) / (1 - k) * 100;
    const y = (1 - bb - k) / (1 - k) * 100;
    return [Math.round(c), Math.round(m), Math.round(y), Math.round(k * 100)];
  }
  function labToRgb(l, a, b) {
    const fy = (l + 16) / 116;
    const fx = a / 500 + fy;
    const fz = fy - b / 200;
    const delta = 6 / 29;
    const delta3 = delta * delta * delta;
    const x = (fx > delta ? fx * fx * fx : (fx - 16 / 116) * 3 * delta * delta) * 0.95047;
    const y = fy > delta ? fy * fy * fy : (fy - 16 / 116) * 3 * delta * delta;
    const z = (fz > delta ? fz * fz * fz : (fz - 16 / 116) * 3 * delta * delta) * 1.08883;
    const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    const bv = x * 0.0557 + y * -0.204 + z * 1.057;
    return [
      Math.round(Math.min(255, Math.max(0, r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92) * 255)),
      Math.round(Math.min(255, Math.max(0, g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92) * 255)),
      Math.round(Math.min(255, Math.max(0, bv > 31308e-7 ? 1.055 * Math.pow(bv, 1 / 2.4) - 0.055 : bv * 12.92) * 255))
    ];
  }
  function toRgb(color, colorSpace) {
    if (!color) return [0, 0, 0];
    switch (colorSpace) {
      case ColorSpaceTypes.DEVICE_RGB:
        return color;
      case ColorSpaceTypes.DEVICE_CMYK:
        return cmykToRgb(color[0], color[1], color[2], color[3]);
      case ColorSpaceTypes.DEVICE_GRAY:
        return [color[0] * 255, color[0] * 255, color[0] * 255];
      case ColorSpaceTypes.LAB:
        return labToRgb(color[0], color[1], color[2]);
      default:
        return color.slice(0, 3);
    }
  }
  function parseBlendMode(name) {
    const modes = {
      "Normal": "Normal",
      "Multiply": "Multiply",
      "Screen": "Screen",
      "Overlay": "Overlay",
      "Darken": "Darken",
      "Lighten": "Lighten",
      "ColorDodge": "ColorDodge",
      "ColorBurn": "ColorBurn",
      "HardLight": "HardLight",
      "SoftLight": "SoftLight",
      "Difference": "Difference",
      "Exclusion": "Exclusion",
      "Hue": "Hue",
      "Saturation": "Saturation",
      "Color": "Color",
      "Luminosity": "Luminosity"
    };
    return modes[name] || "Normal";
  }
  function createSoftMask(type, bbox, transform) {
    return {
      type: "SoftMask",
      subtype: type,
      // Luminosity or Alpha
      bbox,
      transform,
      group: null,
      backDrop: [0, 0, 0],
      matte: [0, 0, 0]
    };
  }
  function createTransparencyGroup(bbox, isolated, knockout) {
    return {
      type: "TransparencyGroup",
      bbox,
      isolated: isolated || false,
      knockout: knockout || false,
      colorSpace: null,
      group: null
    };
  }
  function createTilingPattern(type, bbox, xStep, yStep, paintType, tilingType) {
    return {
      type: "TilingPattern",
      subtype: type,
      bbox,
      xStep,
      yStep,
      paintType: paintType || 1,
      // 1=colored, 2=uncolored
      tilingType: tilingType || 1,
      // 1=constant, 2=constant spacing, 3=auto flow
      matrix: [1, 0, 0, 1, 0, 0],
      resources: {}
    };
  }
  function createGradientShading(type, coords, domain, colors, functions) {
    return {
      type: "GradientShading",
      subtype: type,
      // Axial or Radial
      coords,
      domain: domain || [0, 1],
      colors,
      // Array of { offset, color }
      functions,
      extend: [false, false]
    };
  }
  function parseShading(args) {
    if (!args || args.length < 4) return null;
    const type = args[0];
    if (type === 1 || type === 2) {
      return createGradientShading(
        type === 1 ? "Axial" : "Radial",
        args.slice(1, type === 1 ? 5 : 7),
        [0, 1],
        [],
        null
      );
    }
    return null;
  }
  function extractGraphicsState(opList) {
    const states = [];
    let currentState = createGraphicsState();
    const stateStack = [];
    const OPS = typeof pdfjsLib !== "undefined" ? pdfjsLib.OPS || {} : {};
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      const args = opList.argsArray[i];
      if (fn === OPS.save || fn === 19) {
        stateStack.push(pushGraphicsState(currentState));
      } else if (fn === OPS.restore || fn === 20) {
        currentState = popGraphicsState(stateStack);
      } else if (fn === OPS.transform || fn === 8) {
        if (args && args.length >= 6) {
          currentState = applyTransform(currentState, args);
        }
      } else if (fn === OPS.setStrokeRGBColor || fn === 16) {
        currentState.stroke.colorSpace = ColorSpaceTypes.DEVICE_RGB;
        currentState.stroke.color = args ? args.slice(0, 3) : [0, 0, 0];
      } else if (fn === OPS.setStrokeCMYKColor || fn === 17) {
        currentState.stroke.colorSpace = ColorSpaceTypes.DEVICE_CMYK;
        currentState.stroke.color = args ? args.slice(0, 4) : [0, 0, 0, 0];
      } else if (fn === OPS.setFillRGBColor || fn === 4) {
        currentState.fill.colorSpace = ColorSpaceTypes.DEVICE_RGB;
        currentState.fill.color = args ? args.slice(0, 3) : [0, 0, 0];
      } else if (fn === OPS.setFillCMYKColor || fn === 5) {
        currentState.fill.colorSpace = ColorSpaceTypes.DEVICE_CMYK;
        currentState.fill.color = args ? args.slice(0, 4) : [0, 0, 0, 0];
      } else if (fn === OPS.setLineWidth || fn === 22) {
        currentState.lineWidth = args ? args[0] : 1;
      } else if (fn === OPS.setLineCap || fn === 23) {
        const caps = ["butt", "round", "square"];
        currentState.lineCap = caps[args?.[0]] || "butt";
      } else if (fn === OPS.setLineJoin || fn === 24) {
        const joins = ["miter", "round", "bevel"];
        currentState.lineJoin = joins[args?.[0]] || "miter";
      } else if (fn === OPS.setMiterLimit || fn === 25) {
        currentState.miterLimit = args?.[0] || 10;
      } else if (fn === OPS.setDash || fn === 26) {
        currentState.dash = args?.[0] || [];
        currentState.dashPhase = args?.[1] || 0;
      } else if (fn === OPS.clip || fn === 28 || fn === OPS.eoClip || fn === 29) {
        currentState.clip = {
          path: [...currentState.clipPath],
          rule: fn === OPS.eoClip || fn === 29 ? "even-odd" : "winding"
        };
      } else if (fn === OPS.setFillAlpha || fn === 44) {
        currentState.fillOpacity = args?.[0] ?? 1;
      } else if (fn === OPS.setStrokeAlpha || fn === 45) {
        currentState.strokeOpacity = args?.[0] ?? 1;
      } else if (fn === OPS.setGState || fn === 57) {
      } else if (fn === OPS.setBlendMode || fn === 58) {
        currentState.blendMode = parseBlendMode(args?.[0]);
      } else if (fn === OPS.setRenderingIntent || fn === 59) {
        currentState.renderingIntent = args?.[0] || "RelativeColorimetric";
      } else if (fn === OPS.setOverprint || fn === 60) {
        currentState.overprint = args?.[0] ?? false;
      }
      states.push({
        index: i,
        state: pushGraphicsState(currentState)
      });
    }
    return states;
  }
  function buildGraphicsStateSummary(states) {
    const transforms = states.map((s) => s.state.transform);
    const uniqueTransforms = [...new Set(transforms.map((t) => JSON.stringify(t)))].map((t) => JSON.parse(t));
    const strokeColors = states.filter((s) => s.state.stroke.color).map((s) => ({
      colorSpace: s.state.stroke.colorSpace,
      color: s.state.stroke.color,
      rgb: toRgb(s.state.stroke.color, s.state.stroke.colorSpace)
    }));
    const fillColors = states.filter((s) => s.state.fill.color).map((s) => ({
      colorSpace: s.state.fill.colorSpace,
      color: s.state.fill.color,
      rgb: toRgb(s.state.fill.color, s.state.fill.colorSpace)
    }));
    const hasTransparency = states.some(
      (s) => s.state.opacity < 1 || s.state.fillOpacity < 1 || s.state.strokeOpacity < 1 || s.state.blendMode !== "Normal"
    );
    const hasClipping = states.some((s) => s.state.clip !== null);
    const hasPatterns = states.some(
      (s) => s.state.fill.colorSpace === ColorSpaceTypes.PATTERN || s.state.stroke.colorSpace === ColorSpaceTypes.PATTERN
    );
    return {
      uniqueTransforms: uniqueTransforms.length,
      strokeColors: [...new Set(strokeColors.map((c) => JSON.stringify(c)))].map((c) => JSON.parse(c)),
      fillColors: [...new Set(fillColors.map((c) => JSON.stringify(c)))].map((c) => JSON.parse(c)),
      hasTransparency,
      hasClipping,
      hasPatterns,
      lineStyles: [...new Set(states.map((s) => `${s.state.lineCap}-${s.state.lineJoin}-${s.state.lineWidth}`))]
    };
  }

  // src/pdfcreator.js
  var PDFCreator = class {
    constructor() {
      this.objects = [];
      this.pages = [];
      this.resources = {};
      this.currentObject = 1;
    }
    /**
     * Create a PDF from IR.
     * @param {Object} ir - PDF-IR document model
     * @param {Object} options - Creation options
     * @returns {Promise<Uint8Array>} PDF bytes
     */
    async create(ir, options = {}) {
      const {
        level = 2,
        // 1=content, 2=semantic, 3=visual
        includeMetadata = true,
        includeStructure = true,
        includeAccessibility = true,
        pageSize = "letter"
      } = options;
      this.objects = [];
      this.pages = [];
      const pdf = {
        version: "1.7",
        header: "%PDF-1.7",
        body: {},
        trailer: {}
      };
      const catalogId = this.nextObjectId();
      pdf.body[catalogId] = {
        type: "catalog",
        pages: null
        // Will be set after pages
      };
      const pagesId = this.nextObjectId();
      pdf.body[pagesId] = {
        type: "pages",
        kids: [],
        count: 0
      };
      pdf.body[catalogId].pages = pagesId;
      if (includeMetadata && ir.document?.metadata) {
        const metaId = this.nextObjectId();
        pdf.body[metaId] = {
          type: "metadata",
          data: ir.document.metadata
        };
      }
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        const pageNum = parseInt(pageId.replace("page_", ""));
        const newPageId = this.nextObjectId();
        const pageObj = {
          type: "page",
          parent: pagesId,
          mediaBox: pageData.mediaBox || [0, 0, 612, 792],
          // Letter size default
          cropBox: pageData.cropBox || null,
          rotate: pageData.rotation || 0,
          resources: {},
          contents: [],
          annotations: []
        };
        pageObj.resources = this.buildPageResources(pageData, ir);
        const contentId = this.nextObjectId();
        const contentStream = this.buildContentStream(pageData, ir, level);
        pdf.body[contentId] = {
          type: "stream",
          data: contentStream,
          length: contentStream.length
        };
        pageObj.contents.push(contentId);
        if (pageData.annotations && level >= 1) {
          for (const ann of pageData.annotations) {
            const annId = this.nextObjectId();
            pdf.body[annId] = {
              type: "annotation",
              data: ann
            };
            pageObj.annotations.push(annId);
          }
        }
        if (includeStructure && ir.structure?.[pageId] && level >= 2) {
          const structId = this.nextObjectId();
          pdf.body[structId] = {
            type: "struct_tree",
            data: ir.structure[pageId]
          };
          pageObj.structParents = structId;
        }
        pdf.body[newPageId] = pageObj;
        pagesId.kids.push(newPageId);
        this.pages.push(newPageId);
      }
      pagesId.count = this.pages.length;
      pdf.trailer = {
        root: catalogId,
        info: null,
        size: this.currentObject
      };
      return this.serializePDF(pdf);
    }
    /**
     * Build page resources dictionary.
     */
    buildPageResources(pageData, ir) {
      const resources = {
        font: {},
        xObject: {},
        pattern: {},
        colorSpace: {},
        extGState: {}
      };
      const fonts = /* @__PURE__ */ new Set();
      const pageObjects = (pageData.content || []).map((id) => ir.objects?.[id]).filter(Boolean);
      for (const obj of pageObjects) {
        if (obj.raw?.font) {
          fonts.add(obj.raw.font);
        }
      }
      let fontIndex = 0;
      for (const fontName of fonts) {
        const fontRef = `F${fontIndex++}`;
        resources.font[fontRef] = {
          type: fontName.includes("Bold") ? "Font" : "Font",
          baseFont: fontName,
          encoding: "WinAnsiEncoding"
        };
      }
      return resources;
    }
    /**
     * Build content stream for a page.
     */
    buildContentStream(pageData, ir, level) {
      const commands = [];
      const objects = (pageData.content || []).map((id) => ir.objects?.[id]).filter(Boolean);
      const sortedObjects = level >= 2 ? this.sortByReadingOrder(objects, pageData) : objects;
      for (const obj of sortedObjects) {
        if (obj.type === "text" && obj.raw?.text) {
          const text = obj.raw.text;
          const fontSize = obj.raw.fontSize || 12;
          const x = obj.bbox?.[0] || 0;
          const y = obj.bbox?.[1] || 0;
          const fontRef = this.findFontRef(obj.raw.font, pageData, ir);
          commands.push(`q`);
          if (level >= 3 && obj.raw.transform) {
            const t = obj.raw.transform;
            commands.push(`${t[0]} ${t[1]} ${t[2]} ${t[3]} ${t[4]} ${t[5]} cm`);
          }
          commands.push(`/${fontRef} ${fontSize} Tf`);
          if (obj.semantic?.color) {
            const c = obj.semantic.color;
            commands.push(`${c[0]} ${c[1]} ${c[2]} rg`);
          }
          commands.push(`${x} ${y} Td`);
          commands.push(`(${this.escapePDFString(text)}) Tj`);
          commands.push(`Q`);
        }
      }
      if (level >= 3) {
        for (const vecId of pageData.vectors || []) {
          const vec = ir.vectors?.[vecId];
          if (vec) {
            this.addVectorCommands(commands, vec);
          }
        }
      }
      return commands.join("\n");
    }
    /**
     * Sort objects by reading order.
     */
    sortByReadingOrder(objects, pageData) {
      return [...objects].sort((a, b) => {
        const ay = a.bbox?.[1] || 0;
        const by = b.bbox?.[1] || 0;
        if (Math.abs(ay - by) > 10) return ay - by;
        return (a.bbox?.[0] || 0) - (b.bbox?.[0] || 0);
      });
    }
    /**
     * Find font reference for a font name.
     */
    findFontRef(fontName, pageData, ir) {
      return "F0";
    }
    /**
     * Add vector drawing commands.
     */
    addVectorCommands(commands, vec) {
      if (!vec.points || vec.points.length === 0) return;
      commands.push("q");
      if (vec.graphicsState?.stroke?.color) {
        const c = vec.graphicsState.stroke.color;
        commands.push(`${c[0]} ${c[1]} ${c[2]} RG`);
      }
      if (vec.graphicsState?.fill?.color) {
        const c = vec.graphicsState.fill.color;
        commands.push(`${c[0]} ${c[1]} ${c[2]} rg`);
      }
      if (vec.graphicsState?.lineWidth) {
        commands.push(`${vec.graphicsState.lineWidth} w`);
      }
      const firstPoint = vec.points[0];
      commands.push(`${firstPoint.x} ${firstPoint.y} m`);
      for (let i = 1; i < vec.points.length; i++) {
        const pt = vec.points[i];
        if (pt.op === "moveTo") {
          commands.push(`${pt.x} ${pt.y} m`);
        } else if (pt.op === "lineTo") {
          commands.push(`${pt.x} ${pt.y} l`);
        } else if (pt.op === "curveTo") {
          commands.push(`${pt.x1} ${pt.y1} ${pt.x2} ${pt.y2} ${pt.x} ${pt.y} c`);
        }
      }
      if (vec.type === "path") {
        commands.push("S");
      } else if (vec.type === "rect") {
        commands.push("B");
      }
      commands.push("Q");
    }
    /**
     * Escape string for PDF content stream.
     */
    escapePDFString(str) {
      return str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    }
    /**
     * Generate next object ID.
     */
    nextObjectId() {
      return this.currentObject++;
    }
    /**
     * Serialize PDF to bytes.
     */
    serializePDF(pdf) {
      const encoder = new TextEncoder();
      const parts = [];
      parts.push(encoder.encode(pdf.header + "\n"));
      for (const [id, obj] of Object.entries(pdf.body)) {
        const objStr = this.serializeObject(parseInt(id), obj);
        parts.push(encoder.encode(objStr));
      }
      const xrefOffset = parts.reduce((sum, p) => sum + p.length, 0);
      parts.push(encoder.encode("xref\n"));
      parts.push(encoder.encode(`0 ${this.currentObject}
`));
      parts.push(encoder.encode("0000000000 65535 f \n"));
      for (let i = 1; i < this.currentObject; i++) {
        parts.push(encoder.encode(`${String(xrefOffset).padStart(10, "0")} 00000 n 
`));
      }
      parts.push(encoder.encode("trailer\n"));
      parts.push(encoder.encode(`<< /Size ${this.currentObject} /Root ${pdf.trailer.root} >>
`));
      parts.push(encoder.encode("startxref\n"));
      parts.push(encoder.encode(`${xrefOffset}
`));
      parts.push(encoder.encode("%%EOF\n"));
      const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const part of parts) {
        result.set(part, offset);
        offset += part.length;
      }
      return result;
    }
    /**
     * Serialize a single PDF object.
     */
    serializeObject(id, obj) {
      let str = `${id} 0 obj
`;
      switch (obj.type) {
        case "catalog":
          str += `<< /Type /Catalog /Pages ${obj.pages} 0 R >>
`;
          break;
        case "pages":
          str += `<< /Type /Pages /Kids [${obj.kids.map((k) => `${k} 0 R`).join(" ")}] /Count ${obj.count} >>
`;
          break;
        case "page":
          str += `<< /Type /Page /Parent ${obj.parent} 0 R`;
          str += ` /MediaBox [${(obj.mediaBox || [0, 0, 612, 792]).join(" ")}]`;
          if (obj.rotate) str += ` /Rotate ${obj.rotate}`;
          if (obj.contents?.length) {
            str += ` /Contents [${obj.contents.map((c) => `${c} 0 R`).join(" ")}]`;
          }
          if (obj.annotations?.length) {
            str += ` /Annots [${obj.annotations.map((a) => `${a} 0 R`).join(" ")}]`;
          }
          str += " >>\n";
          break;
        case "stream":
          str += `<< /Length ${obj.length} >>
`;
          str += "stream\n";
          str += obj.data + "\n";
          str += "endstream\n";
          break;
        case "annotation":
          const ann = obj.data;
          str += `<< /Type /Annot /Subtype /${ann.subtype || "Text"}`;
          if (ann.rect) str += ` /Rect [${ann.rect.join(" ")}]`;
          if (ann.contents) str += ` /Contents (${this.escapePDFString(ann.contents)})`;
          str += " >>\n";
          break;
        case "metadata":
          str += `<< /Type /Metadata /Subtype /XML >>
`;
          str += "stream\n";
          str += '<?xml version="1.0" encoding="UTF-8"?>\n';
          str += '<x:xmpmeta xmlns:x="adobe:ns:meta/">\n';
          str += '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n';
          if (obj.data.title) {
            str += `<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
`;
            str += `<dc:title>${this.escapePDFString(obj.data.title)}</dc:title>
`;
            str += "</rdf:Description>\n";
          }
          str += "</rdf:RDF>\n";
          str += "</x:xmpmeta>\n";
          str += "endstream\n";
          break;
        default:
          str += "<< >>\n";
      }
      str += "endobj\n\n";
      return str;
    }
  };
  async function createPDF(ir, options = {}) {
    const creator = new PDFCreator();
    return creator.create(ir, options);
  }
  async function createTextPDF(pages2, options = {}) {
    const ir = {
      document: { metadata: options.metadata || {} },
      pages: {},
      objects: {},
      structure: {},
      annotations: {}
    };
    for (let i = 0; i < pages2.length; i++) {
      const pageId = `page_${i + 1}`;
      ir.pages[pageId] = {
        id: pageId,
        num: i + 1,
        width: 612,
        height: 792,
        rotation: 0,
        mediaBox: [0, 0, 612, 792],
        content: [],
        vectors: [],
        images: [],
        annotations: []
      };
      const text = typeof pages2[i] === "string" ? pages2[i] : pages2[i].text || "";
      const lines = text.split("\n");
      for (let j = 0; j < lines.length; j++) {
        const objId = `text_${i}_${j}`;
        ir.objects[objId] = {
          id: objId,
          type: "text",
          page: pageId,
          raw: {
            text: lines[j],
            font: "Helvetica",
            fontSize: 12,
            transform: [12, 0, 0, 12, 72, 720 - j * 14]
          },
          semantic: {
            role: "paragraph",
            text: lines[j]
          },
          bbox: [72, 720 - j * 14, lines[j].length * 7, 12]
        };
        ir.pages[pageId].content.push(objId);
      }
    }
    return createPDF(ir, options);
  }

  // src/advanced.js
  var SignatureSubFilter = {
    ADOBE_PKCS7_S4: "adbe.pkcs7.sha1",
    ADOBE_PKCS7_DETACHED: "adbe.pkcs7.detached",
    ADOBE_X509_RSA_SHA1: "adbe.x509.rsa_sha1",
    ETSI_CADES_DETACHED: "ETSI.CAdES.detached"
  };
  async function extractSignatures(page, doc) {
    const signatures = [];
    try {
      const annotations = await page.getAnnotations();
      for (const ann of annotations) {
        if (ann.subtype === "Widget" && ann.fieldType === "Sig") {
          const sig = {
            id: ann.fieldName || ann.id,
            type: "signature",
            subtype: ann.subtype,
            fieldName: ann.fieldName,
            rect: ann.rect,
            timestamp: ann.M || null,
            reason: ann.Reason || null,
            location: ann.Location || null,
            contactInfo: ann.ContactInfo || null,
            subFilter: ann.SubFilter || null,
            filter: ann.Filter || null,
            byteRange: ann.ByteRange || null,
            contents: ann.Contents ? this.decodeHex(ann.Contents) : null,
            cert: ann.Cert || null,
            reference: ann.Reference || [],
            lockDictionary: null,
            unseenChanges: null,
            hashAlgorithm: this.inferHashAlgorithm(ann.SubFilter),
            signatureValid: null,
            // Would need crypto library to verify
            signerName: null,
            signingTime: ann.M || null,
            documentIntegrity: null
          };
          if (ann.ByteRange && ann.Contents) {
            sig.signedData = {
              hasByteRange: true,
              byteRangeLength: ann.ByteRange.length,
              contentLength: ann.Contents ? ann.Contents.length / 2 : 0
            };
          }
          signatures.push(sig);
        }
      }
    } catch (e) {
      console.error("[codbdocs] Signature extraction error:", e);
    }
    return signatures;
  }
  function buildSignatureSummary(signatures) {
    return {
      count: signatures.length,
      hasSignatures: signatures.length > 0,
      signed: signatures.filter((s) => s.subFilter === SignatureSubFilter.ADOBE_PKCS7_DETACHED).length,
      certifications: signatures.filter((s) => s.reason?.toLowerCase().includes("certified")).length,
      algorithms: [...new Set(signatures.map((s) => s.hashAlgorithm))],
      signers: signatures.map((s) => ({
        name: s.signerName || s.fieldName,
        time: s.signingTime,
        reason: s.reason
      }))
    };
  }
  async function extractOCGs(doc) {
    const ocgs = [];
    try {
      const docObj = await doc._pdf?.catalog?.objRef?.fetch();
      if (!docObj) return ocgs;
      const ocProps = await docObj.get("OCProperties");
      if (!ocProps) return ocgs;
      const ocDict = await ocProps.fetch();
      if (!ocDict) return ocgs;
      const ocgArray = await ocDict.get("OCGs");
      if (!ocgArray) return ocgs;
      const ocgsObj = await ocgArray.fetch();
      if (!ocgsObj) return ocgs;
      for (const ref of ocgsObj) {
        try {
          const ocgDict = await ref.fetch();
          if (!ocgDict) continue;
          const name = await ocgDict.get("Name");
          const intent = await ocgDict.get("Intent");
          const usage = await ocgDict.get("Usage");
          ocgs.push({
            id: ref.toString(),
            name: name?.value || "Unnamed OCG",
            intent: intent?.value || "View",
            usage: usage ? {
              print: await extractOCGUsage(usage, "Print"),
              view: await extractOCGUsage(usage, "View"),
              export: await extractOCGUsage(usage, "Export")
            } : null,
            visible: true
            // Default visible
          });
        } catch (e) {
        }
      }
      const config2 = await ocDict.get("D");
      if (config2) {
        const configDict = await config2.fetch();
        if (configDict) {
          const order = await configDict.get("Order");
        }
      }
    } catch (e) {
      console.error("[codbdocs] OCG extraction error:", e);
    }
    return ocgs;
  }
  async function extractOCGUsage(usageDict, key) {
    try {
      const usage = await usageDict.get(key);
      if (!usage) return null;
      const dict = await usage.fetch();
      if (!dict) return null;
      const outputIntents = await dict.get("OutputIntents");
      const category = await dict.get("Category");
      return {
        category: category?.value || null,
        outputIntents: outputIntents?.value || []
      };
    } catch {
      return null;
    }
  }
  function buildOCGSummary(ocgs) {
    return {
      count: ocgs.length,
      hasLayers: ocgs.length > 0,
      layerNames: ocgs.map((o) => o.name),
      intents: [...new Set(ocgs.map((o) => o.intent))],
      printableLayers: ocgs.filter((o) => o.usage?.print?.category !== "OFF").length,
      viewableLayers: ocgs.filter((o) => o.usage?.view?.category !== "OFF").length
    };
  }
  async function extractEmbeddedFiles(doc) {
    const files = [];
    try {
      const docObj = await doc._pdf?.catalog?.objRef?.fetch();
      if (!docObj) return files;
      const names = await docObj.get("Names");
      if (!names) return files;
      const namesDict = await names.fetch();
      if (!namesDict) return files;
      const embeddedFiles = await namesDict.get("EmbeddedFiles");
      if (!embeddedFiles) return files;
      const efDict = await embeddedFiles.fetch();
      if (!efDict) return files;
      const namesArray = await efDict.get("Names");
      if (!namesArray) return files;
      const nameTree = await namesArray.fetch();
      if (!nameTree) return files;
      for (let i = 0; i < nameTree.length; i++) {
        try {
          const nameObj = await nameTree[i].fetch();
          if (!nameObj) continue;
          const fileSpec = await nameObj.get("F");
          const efRef = await nameObj.get("EF");
          if (fileSpec && efRef) {
            const fileSpecDict = await fileSpec.fetch();
            const efDict2 = await efRef.fetch();
            const fileName = await fileSpecDict.get("F");
            const description = await fileSpecDict.get("Desc");
            const mimeType = await fileSpecDict.get("Type");
            const size = await efDict2.get("Size");
            const creationDate = await efDict2.get("CreationDate");
            const modDate = await efDict2.get("ModDate");
            files.push({
              id: efRef.toString(),
              name: fileName?.value || `file_${files.length}`,
              description: description?.value || null,
              mimeType: mimeType?.value || "application/octet-stream",
              size: size?.value || 0,
              creationDate: creationDate?.value || null,
              modDate: modDate?.value || null,
              // Raw data not extracted by default (could be large)
              hasData: true
            });
          }
        } catch (e) {
        }
      }
    } catch (e) {
      console.error("[codbdocs] Embedded file extraction error:", e);
    }
    return files;
  }
  function buildEmbeddedFilesSummary(files) {
    const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
    const byType = {};
    for (const f of files) {
      const ext = f.name.split(".").pop().toLowerCase();
      byType[ext] = (byType[ext] || 0) + 1;
    }
    return {
      count: files.length,
      hasEmbeddedFiles: files.length > 0,
      totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      byType,
      files: files.map((f) => ({
        name: f.name,
        size: f.size,
        sizeFormatted: formatBytes(f.size || 0),
        mimeType: f.mimeType
      }))
    };
  }
  function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  async function extractActions(doc) {
    const actions = [];
    try {
      const docObj = await doc._pdf?.catalog?.objRef?.fetch();
      if (!docObj) return actions;
      const openAction = await docObj.get("OpenAction");
      if (openAction) {
        actions.push({
          type: "Document",
          trigger: "OpenAction",
          action: await parseAction(openAction)
        });
      }
      const pageLabels = await docObj.get("PageLabels");
      const pagesRef = await docObj.get("Pages");
      if (pagesRef) {
        const pages2 = await pagesRef.fetch();
        await extractPageActions(pages2, actions, 0);
      }
    } catch (e) {
      console.error("[codbdocs] Actions extraction error:", e);
    }
    return actions;
  }
  async function extractPageActions(pagesDict, actions, depth) {
    if (depth > 10) return;
    try {
      const kids = await pagesDict.get("Kids");
      if (!kids) return;
      const kidsArray = await kids.fetch();
      if (!kidsArray) return;
      for (const kidRef of kidsArray) {
        try {
          const kid = await kidRef.fetch();
          if (!kid) continue;
          const type = await kid.get("Type");
          const typeName = type?.value;
          if (typeName === "Pages") {
            await extractPageActions(kid, actions, depth + 1);
          } else if (typeName === "Page") {
            const pageNum = await kid.get("StructParents") || actions.filter((a) => a.type === "Page").length + 1;
            const actionsEntry = await kid.get("AA");
            if (actionsEntry) {
              const aaDict = await actionsEntry.fetch();
              if (aaDict) {
                for (const [trigger, actionRef] of Object.entries(aaDict)) {
                  actions.push({
                    type: "Page",
                    page: pageNum,
                    trigger,
                    action: await parseAction(actionRef)
                  });
                }
              }
            }
            const annots = await kid.get("Annots");
            if (annots) {
              const annotsArray = await annots.fetch();
              if (annotsArray) {
                for (const annotRef of annotsArray) {
                  const annot = await annotRef.fetch();
                  if (!annot) continue;
                  const a = await annot.get("A");
                  if (a) {
                    actions.push({
                      type: "Annotation",
                      page: pageNum,
                      fieldName: (await annot.get("T"))?.value,
                      trigger: "click",
                      action: await parseAction(a)
                    });
                  }
                }
              }
            }
          }
        } catch (e) {
        }
      }
    } catch (e) {
      console.error("[codbdocs] Page actions extraction error:", e);
    }
  }
  async function parseAction(actionRef) {
    if (!actionRef) return null;
    try {
      const actionDict = await actionRef.fetch?.() || actionRef;
      if (!actionDict) return null;
      const s = await actionDict.get("S");
      const actionType = s?.value || "Unknown";
      const result = {
        type: actionType
      };
      switch (actionType) {
        case "GoTo":
          const dest = await actionDict.get("D");
          result.destination = dest?.value || dest;
          break;
        case "GoToR":
          result.file = (await actionDict.get("F"))?.value;
          result.destination = (await actionDict.get("D"))?.value;
          break;
        case "Launch":
          result.file = (await actionDict.get("F"))?.value;
          result.operation = (await actionDict.get("Win"))?.value;
          break;
        case "JavaScript":
          result.script = (await actionDict.get("JS"))?.value;
          break;
        case "Named":
          result.name = (await actionDict.get("N"))?.value;
          break;
        case "SetOCGState":
          const state = await actionDict.get("State");
          result.state = state?.value;
          break;
        case "SubmitForm":
          result.url = (await actionDict.get("F"))?.value;
          result.fields = (await actionDict.get("Fields"))?.value;
          break;
        case "ResetForm":
          result.fields = (await actionDict.get("Fields"))?.value;
          break;
        case "Hide":
          result.targets = (await actionDict.get("T"))?.value;
          result.hidden = (await actionDict.get("H"))?.value;
          break;
        case "Sound":
        case "Movie":
          result.sound = (await actionDict.get("S"))?.value;
          break;
        case "Rendition":
          result.action = (await actionDict.get("AN"))?.value;
          break;
        case "Trans":
          result.trans = (await actionDict.get("Trans"))?.value;
          break;
      }
      return result;
    } catch (e) {
      return { type: "Unknown", error: e.message };
    }
  }
  function buildActionsSummary(actions) {
    const byType = {};
    for (const a of actions) {
      const type = a.action?.type || "Unknown";
      byType[type] = (byType[type] || 0) + 1;
    }
    return {
      count: actions.length,
      hasActions: actions.length > 0,
      byType,
      hasJavaScript: actions.some((a) => a.action?.type === "JavaScript"),
      hasNavigation: actions.some((a) => ["GoTo", "GoToR", "GoToE"].includes(a.action?.type)),
      hasFormActions: actions.some((a) => ["SubmitForm", "ResetForm", "ImportData"].includes(a.action?.type)),
      documentActions: actions.filter((a) => a.type === "Document"),
      pageActions: actions.filter((a) => a.type === "Page"),
      annotationActions: actions.filter((a) => a.type === "Annotation")
    };
  }
  async function extractAppearanceStreams(page) {
    const appearances = [];
    try {
      const annotations = await page.getAnnotations();
      for (const ann of annotations) {
        if (ann.appearance) {
          const appearance = {
            id: ann.id,
            fieldName: ann.fieldName,
            type: ann.subtype,
            appearances: {
              normal: ann.appearance?.N ? await extractAppearanceDict(ann.appearance.N) : null,
              rollover: ann.appearance?.R ? await extractAppearanceDict(ann.appearance.R) : null,
              down: ann.appearance?.D ? await extractAppearanceDict(ann.appearance.D) : null
            },
            currentAppearance: ann.appearance?.N ? "normal" : null
          };
          appearances.push(appearance);
        }
      }
    } catch (e) {
      console.error("[codbdocs] Appearance stream extraction error:", e);
    }
    return appearances;
  }
  async function extractAppearanceDict(appearRef) {
    try {
      const dict = await appearRef.fetch?.() || appearRef;
      if (!dict) return null;
      if (dict.getBytes) {
        return {
          type: "single",
          hasData: true,
          size: dict.dict?.get("Length")?.value || 0
        };
      }
      const result = {
        type: "dictionary",
        states: {}
      };
      for (const [key, value] of Object.entries(dict)) {
        if (key.startsWith("/")) {
          result.states[key.slice(1)] = {
            hasData: true
          };
        }
      }
      return result;
    } catch {
      return null;
    }
  }
  function buildAppearanceStreamsSummary(appearances) {
    const withNormal = appearances.filter((a) => a.appearances.normal).length;
    const withRollover = appearances.filter((a) => a.appearances.rollover).length;
    const withDown = appearances.filter((a) => a.appearances.down).length;
    return {
      count: appearances.length,
      hasAppearanceStreams: appearances.length > 0,
      withNormalAppearance: withNormal,
      withRolloverAppearance: withRollover,
      withDownAppearance: withDown,
      types: [...new Set(appearances.map((a) => a.type))]
    };
  }
  function trackXObjectReuse(ir) {
    const xobjects = {};
    const usageMap = {};
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      const pageNum = parseInt(pageId.replace("page_", ""));
      for (const vecId of pageData.vectors || []) {
        const vec = ir.vectors?.[vecId];
        if (vec?.raw?.xObject) {
          const xobjId = vec.raw.xObject;
          if (!xobjects[xobjId]) {
            xobjects[xobjId] = {
              id: xobjId,
              type: vec.raw.xObjectType || "unknown",
              pages: [],
              usageCount: 0
            };
          }
          xobjects[xobjId].pages.push(pageNum);
          xobjects[xobjId].usageCount++;
        }
      }
      for (const textId of pageData.content || []) {
        const text = ir.objects?.[textId];
        if (text?.raw?.xObject) {
          const xobjId = text.raw.xObject;
          if (!xobjects[xobjId]) {
            xobjects[xobjId] = {
              id: xobjId,
              type: text.raw.xObjectType || "unknown",
              pages: [],
              usageCount: 0
            };
          }
          xobjects[xobjId].pages.push(pageNum);
          xobjects[xobjId].usageCount++;
        }
      }
    }
    const values = Object.values(xobjects);
    const reused = values.filter((x) => x.usageCount > 1);
    const unique = values.filter((x) => x.usageCount === 1);
    return {
      total: values.length,
      reusedCount: reused.length,
      uniqueCount: unique.length,
      reuseRatio: values.length > 0 ? reused.length / values.length : 0,
      xobjects: values,
      byType: values.reduce((acc, x) => {
        acc[x.type] = (acc[x.type] || 0) + 1;
        return acc;
      }, {}),
      reusedXObjects: reused.map((x) => ({
        id: x.id,
        type: x.type,
        usageCount: x.usageCount,
        pages: x.pages
      }))
    };
  }
  function buildXObjectSummary(reuseInfo) {
    return {
      totalXObjects: reuseInfo.total,
      reusedXObjects: reuseInfo.reusedCount,
      uniqueXObjects: reuseInfo.uniqueCount,
      reuseRatio: (reuseInfo.reuseRatio * 100).toFixed(1) + "%",
      mostUsed: reuseInfo.xobjects.sort((a, b) => b.usageCount - a.usageCount).slice(0, 5).map((x) => ({
        id: x.id,
        type: x.type,
        usageCount: x.usageCount
      }))
    };
  }
  async function extractRevisions(doc) {
    const revisions = [];
    try {
      const pdf = doc._pdf;
      if (!pdf) return revisions;
      const meta = await pdf.getMetadata();
      const info = meta?.info || {};
      revisions.push({
        version: 1,
        type: "original",
        creationDate: info.CreationDate || null,
        modDate: info.ModDate || null,
        producer: info.Producer || null,
        creator: info.Creator || null
      });
      const trailer = pdf.trailer;
      if (trailer?.Prev) {
        revisions.push({
          version: 2,
          type: "incremental",
          xrefOffset: trailer.Prev
        });
      }
    } catch (e) {
      console.error("[codbdocs] Revision extraction error:", e);
    }
    return revisions;
  }
  function buildRevisionsSummary(revisions) {
    return {
      count: revisions.length,
      hasMultipleRevisions: revisions.length > 1,
      versions: revisions.map((r) => ({
        version: r.version,
        type: r.type,
        creationDate: r.creationDate,
        modDate: r.modDate
      })),
      producers: [...new Set(revisions.map((r) => r.producer).filter(Boolean))],
      creators: [...new Set(revisions.map((r) => r.creator).filter(Boolean))]
    };
  }

  // src/quality.js
  function analyzeTextQuality(pageData, contentItems, pageSize) {
    const issues = [];
    let score = 1;
    const invisibleText = contentItems.filter((item) => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      return x < 0 || x > pageSize.width || y < 0 || y > pageSize.height;
    });
    if (invisibleText.length > 0) {
      issues.push({
        type: "invisible_text",
        severity: "warning",
        count: invisibleText.length,
        description: "Text objects found outside page bounds"
      });
      score -= 0.1 * Math.min(invisibleText.length / 10, 0.3);
    }
    const suspiciousText = contentItems.filter((item) => {
      const text = item.str || "";
      return /[^\x00-\x7F]{3,}/.test(text) || // Multiple non-ASCII
      /\s{5,}/.test(text) || // Excessive whitespace
      /[|\\\/]{3,}/.test(text);
    });
    if (suspiciousText.length > 0) {
      issues.push({
        type: "suspicious_unicode",
        severity: "warning",
        count: suspiciousText.length,
        description: "Text contains suspicious Unicode patterns"
      });
      score -= 0.1 * Math.min(suspiciousText.length / 5, 0.3);
    }
    const allText = contentItems.map((i) => i.str || "").join("");
    const charDist = analyzeCharacterDistribution(allText);
    if (charDist.suspicious) {
      issues.push({
        type: "abnormal_char_distribution",
        severity: "info",
        description: charDist.reason
      });
      score -= 0.1;
    }
    const words = allText.split(/\s+/).filter((w) => w.length > 0);
    const gibberishWords = words.filter((w) => isGibberish(w));
    if (gibberishWords.length > words.length * 0.1) {
      issues.push({
        type: "poor_word_formation",
        severity: "warning",
        gibberishRatio: gibberishWords.length / words.length,
        description: `${gibberishWords.length} of ${words.length} words appear to be gibberish`
      });
      score -= 0.2;
    }
    const textFragments = contentItems.map((i) => (i.str || "").trim()).filter((t) => t.length > 5);
    const duplicates = findDuplicates(textFragments);
    if (duplicates.length > 0) {
      issues.push({
        type: "duplicate_text",
        severity: "warning",
        count: duplicates.length,
        samples: duplicates.slice(0, 3),
        description: "Duplicate text fragments detected"
      });
      score -= 0.1 * Math.min(duplicates.length / 5, 0.2);
    }
    const hyphenated = contentItems.filter((item) => {
      const text = item.str || "";
      return /\w-$/.test(text);
    });
    if (hyphenated.length > 0) {
      issues.push({
        type: "hyphenation",
        severity: "info",
        count: hyphenated.length,
        description: "Potential hyphenated words found"
      });
    }
    const ligatures = allText.match(/[ﬁﬂﬃﬄ]/g) || [];
    if (ligatures.length > 0) {
      issues.push({
        type: "ligatures",
        severity: "info",
        count: ligatures.length,
        description: "Ligature characters found that may cause search issues"
      });
      score -= 0.05;
    }
    const clippedText = contentItems.filter((item) => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      const w = item.width || 0;
      const h = item.height || 0;
      return x + w > pageSize.width + 10 || y + h > pageSize.height + 10;
    });
    if (clippedText.length > 0) {
      issues.push({
        type: "clipped_text",
        severity: "info",
        count: clippedText.length,
        description: "Text objects may be clipped at page boundaries"
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
        clippedText: clippedText.length
      }
    };
  }
  function analyzeCharacterDistribution(text) {
    if (!text || text.length < 100) {
      return { suspicious: false };
    }
    const chars = text.split("");
    const freq = {};
    for (const c of chars) {
      freq[c] = (freq[c] || 0) + 1;
    }
    const nonAlpha = chars.filter((c) => !/[a-zA-Z0-9\s]/.test(c)).length;
    if (nonAlpha > chars.length * 0.3) {
      return { suspicious: true, reason: "Excessive non-alphanumeric characters" };
    }
    const uppercase = chars.filter((c) => /[A-Z]/.test(c)).length;
    const letters = chars.filter((c) => /[a-zA-Z]/.test(c)).length;
    if (letters > 100 && uppercase > letters * 0.8) {
      return { suspicious: true, reason: "Excessive uppercase characters" };
    }
    return { suspicious: false };
  }
  function isGibberish(word) {
    if (word.length < 3) return false;
    const consonantClusters = word.match(/[bcdfghjklmnpqrstvwxyz]{4,}/gi);
    if (consonantClusters && consonantClusters.length > 0) return true;
    const vowelClusters = word.match(/[aeiou]{4,}/gi);
    if (vowelClusters && vowelClusters.length > 0) return true;
    const pattern = word.toLowerCase();
    let alternating = true;
    for (let i = 2; i < pattern.length; i++) {
      const prev1IsVowel = "aeiou".includes(pattern[i - 1]);
      const prev2IsVowel = "aeiou".includes(pattern[i - 2]);
      const currIsVowel = "aeiou".includes(pattern[i]);
      if (prev1IsVowel === currIsVowel && prev2IsVowel === currIsVowel) {
        alternating = false;
        break;
      }
    }
    if (alternating && word.length > 6) return true;
    return false;
  }
  function findDuplicates(fragments) {
    const seen = /* @__PURE__ */ new Map();
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
  function compareVisualInternal(pageData, visualRegions, contentItems) {
    const discrepancies = [];
    const internalTextRegions = contentItems.filter((item) => item.str && item.str.trim().length > 0).map((item) => ({
      x: item.transform?.[4] || 0,
      y: item.transform?.[5] || 0,
      width: item.width || 0,
      height: item.height || 0,
      text: item.str
    }));
    const visualTextRegions = visualRegions?.textRegions || [];
    for (const vRegion of visualTextRegions) {
      const matchingInternal = internalTextRegions.find(
        (iRegion) => Math.abs(iRegion.x - vRegion.x) < 10 && Math.abs(iRegion.y - vRegion.y) < 10
      );
      if (!matchingInternal) {
        discrepancies.push({
          type: "visual_text_not_in_internal",
          severity: "warning",
          bbox: vRegion,
          description: "Text visible on page but not in PDF text layer"
        });
      }
    }
    for (const iRegion of internalTextRegions) {
      const matchingVisual = visualTextRegions.find(
        (vRegion) => Math.abs(iRegion.x - vRegion.x) < 10 && Math.abs(iRegion.y - vRegion.y) < 10
      );
      if (!matchingVisual && iRegion.text.length > 3) {
        discrepancies.push({
          type: "internal_text_not_visible",
          severity: "warning",
          bbox: iRegion,
          text: iRegion.text,
          description: "Text in PDF layer but not visibly rendered"
        });
      }
    }
    const internalImageCount = pageData.images?.length || 0;
    const visualImageCount = visualRegions?.imageRegions?.length || 0;
    if (Math.abs(internalImageCount - visualImageCount) > 0) {
      discrepancies.push({
        type: "image_count_mismatch",
        severity: "info",
        internal: internalImageCount,
        visual: visualImageCount,
        description: `Internal: ${internalImageCount} images, Visual: ${visualImageCount} images`
      });
    }
    const hiddenText = contentItems.filter((item) => {
      const fontSize = Math.abs(item.transform?.[0]) || 12;
      return fontSize < 2 && item.str && item.str.trim().length > 0;
    });
    if (hiddenText.length > 0) {
      discrepancies.push({
        type: "hidden_text",
        severity: "warning",
        count: hiddenText.length,
        description: "Text with extremely small font size detected"
      });
    }
    return {
      discrepancies,
      score: Math.max(0, 1 - discrepancies.length * 0.1),
      summary: {
        internalTextRegions: internalTextRegions.length,
        visualTextRegions: visualTextRegions.length,
        internalImages: internalImageCount,
        visualImages: visualImageCount,
        hiddenText: hiddenText.length
      }
    };
  }
  function detectRepeatedElements(pageResults2, allContentItems) {
    const results = {
      watermarks: [],
      headers: [],
      footers: [],
      pageNumbers: []
    };
    const topElements = [];
    const bottomElements = [];
    const centerElements = [];
    for (const [pageId, content] of Object.entries(allContentItems)) {
      const pageHeight = pageResults2[pageId]?.pageSize?.height || 792;
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
    results.headers = findRepeatedPatterns(topElements);
    results.footers = findRepeatedPatterns(bottomElements);
    results.watermarks = findWatermarkPatterns(centerElements);
    results.pageNumbers = detectPageNumbers(bottomElements);
    return results;
  }
  function findRepeatedPatterns(elements) {
    const textCounts = {};
    for (const el of elements) {
      const normalized = el.text.toLowerCase().trim();
      if (normalized.length < 3) continue;
      textCounts[normalized] = (textCounts[normalized] || 0) + 1;
    }
    return Object.entries(textCounts).filter(([text, count]) => count >= 3).map(([text, count]) => ({
      text,
      count,
      type: "repeated_element"
    }));
  }
  function findWatermarkPatterns(elements) {
    const textCounts = {};
    for (const el of elements) {
      const normalized = el.text.toLowerCase().trim();
      if (normalized.length < 2) continue;
      textCounts[normalized] = (textCounts[normalized] || 0) + 1;
    }
    return Object.entries(textCounts).filter(([text, count]) => count >= 5).map(([text, count]) => ({
      text,
      count,
      type: "watermark"
    }));
  }
  function detectPageNumbers(elements) {
    const pageNumbers = [];
    const numberPattern = /^\d{1,4}$/;
    for (const el of elements) {
      if (numberPattern.test(el.text)) {
        pageNumbers.push({
          text: el.text,
          page: el.page,
          type: "page_number"
        });
      }
    }
    return pageNumbers;
  }
  function normalizeText(text) {
    if (!text) return text;
    let normalized = text;
    normalized = normalized.replace(/(\w)-\s*\n\s*(\w)/g, "$1$2");
    normalized = normalized.replace(/ﬁ/g, "fi").replace(/ﬂ/g, "fl").replace(/ﬃ/g, "ffi").replace(/ﬄ/g, "ffl");
    normalized = normalized.replace(/\s{3,}/g, "  ");
    normalized = normalized.replace(/\|/g, "l").replace(/0O/g, "0").replace(/l1/g, "l");
    return normalized;
  }
  function detectRedactions(vectors, contentItems) {
    const redactions = [];
    for (const vec of vectors) {
      if (vec.type === "rect" && vec.fillColor) {
        const [r, g, b] = vec.fillColor;
        if (r < 0.1 && g < 0.1 && b < 0.1) {
          const coveredText = contentItems.filter((item) => {
            const x = item.transform?.[4] || 0;
            const y = item.transform?.[5] || 0;
            return x >= vec.bbox[0] && x <= vec.bbox[2] && y >= vec.bbox[1] && y <= vec.bbox[3];
          });
          if (coveredText.length > 0) {
            redactions.push({
              bbox: vec.bbox,
              coveredText: coveredText.map((t) => t.str),
              type: "redaction",
              severity: "critical"
            });
          }
        }
      }
    }
    return redactions;
  }
  function validateTags(pageData, structureTree, contentItems) {
    const issues = [];
    if (!structureTree) {
      issues.push({
        type: "missing_structure",
        severity: "warning",
        description: "No structure tree found for tagged PDF validation"
      });
      return { valid: false, issues };
    }
    const headings = extractHeadingsFromStructure(structureTree);
    for (const heading of headings) {
      const matchingText = contentItems.find(
        (item) => item.str && item.str.includes(heading.text)
      );
      if (matchingText) {
        const fontSize = Math.abs(matchingText.transform?.[0]) || 12;
        if (fontSize < 14) {
          issues.push({
            type: "fake_heading",
            severity: "warning",
            text: heading.text,
            fontSize,
            description: "Tagged heading has small font size"
          });
        }
      }
    }
    const images = extractImagesFromStructure(structureTree);
    for (const img of images) {
      if (!img.alt && !img.description) {
        issues.push({
          type: "missing_alt_text",
          severity: "warning",
          element: img.id,
          description: "Image has no alt text"
        });
      }
    }
    const brokenTags = findBrokenTags(structureTree);
    if (brokenTags.length > 0) {
      issues.push({
        type: "broken_tags",
        severity: "error",
        count: brokenTags.length,
        description: "Structure tags have broken parent-child relationships"
      });
    }
    return {
      valid: issues.length === 0,
      issues
    };
  }
  function extractHeadingsFromStructure(tree, headings = []) {
    if (!tree) return headings;
    if (tree.type === "heading" || tree.type === "H1" || tree.type === "H2") {
      headings.push({
        type: tree.type,
        text: tree.text || "",
        id: tree.id
      });
    }
    if (tree.children) {
      for (const child of tree.children) {
        extractHeadingsFromStructure(child, headings);
      }
    }
    return headings;
  }
  function extractImagesFromStructure(tree, images = []) {
    if (!tree) return images;
    if (tree.type === "figure" || tree.type === "image") {
      images.push({
        id: tree.id,
        alt: tree.alt,
        description: tree.description
      });
    }
    if (tree.children) {
      for (const child of tree.children) {
        extractImagesFromStructure(child, images);
      }
    }
    return images;
  }
  function findBrokenTags(tree, broken = []) {
    if (!tree) return broken;
    if (tree.children) {
      for (const child of tree.children) {
        if (!child.type && !child.id) {
          broken.push({
            parentId: tree.id,
            child,
            reason: "Child has no type or id"
          });
        }
        findBrokenTags(child, broken);
      }
    }
    return broken;
  }
  function calculateRAGReadiness(pageResults2, textQuality, visualComparison, repeatedElements) {
    let score = 1;
    const factors = [];
    const avgTextQuality = pageResults2.reduce((sum, p) => sum + (p.textQuality?.score || 1), 0) / pageResults2.length;
    score *= avgTextQuality;
    factors.push({ factor: "text_quality", impact: avgTextQuality });
    const avgVisualAgreement = pageResults2.reduce((sum, p) => sum + (p.visualComparison?.score || 1), 0) / pageResults2.length;
    score *= avgVisualAgreement;
    factors.push({ factor: "visual_agreement", impact: avgVisualAgreement });
    const pagesWithStructure = pageResults2.filter((p) => p.hasStructureTree).length;
    const structureRatio = pagesWithStructure / pageResults2.length;
    score *= 0.5 + structureRatio * 0.5;
    factors.push({ factor: "structure_completeness", impact: structureRatio });
    const pagesWithReadingOrder = pageResults2.filter((p) => p.readingOrder > 0).length;
    const readingOrderRatio = pagesWithReadingOrder / pageResults2.length;
    score *= 0.5 + readingOrderRatio * 0.5;
    factors.push({ factor: "reading_order", impact: readingOrderRatio });
    const headerFooterCount = (repeatedElements.headers?.length || 0) + (repeatedElements.footers?.length || 0);
    if (headerFooterCount > 0) {
      score *= 0.9;
      factors.push({ factor: "header_footer_pollution", impact: 0.9 });
    }
    if (repeatedElements.watermarks?.length > 0) {
      score *= 0.95;
      factors.push({ factor: "watermarks", impact: 0.95 });
    }
    const totalDuplicates = pageResults2.reduce((sum, p) => sum + (p.textQuality?.summary?.duplicates || 0), 0);
    if (totalDuplicates > 0) {
      score *= 0.95;
      factors.push({ factor: "duplicate_text", impact: 0.95 });
    }
    return {
      score: Math.max(0, Math.min(1, score)),
      factors,
      recommendations: generateRecommendations(factors, pageResults2)
    };
  }
  function generateRecommendations(factors, pageResults2) {
    const recommendations = [];
    const textQuality = factors.find((f) => f.factor === "text_quality");
    if (textQuality && textQuality.impact < 0.8) {
      recommendations.push({
        type: "ocr",
        priority: "high",
        description: "Text quality is low. Consider enabling OCR or re-OCR with better settings."
      });
    }
    const visualAgreement = factors.find((f) => f.factor === "visual_agreement");
    if (visualAgreement && visualAgreement.impact < 0.8) {
      recommendations.push({
        type: "visual_analysis",
        priority: "medium",
        description: "Visual/internal agreement is low. Enable visual analysis to detect hidden text."
      });
    }
    const structure = factors.find((f) => f.factor === "structure_completeness");
    if (structure && structure.impact < 0.5) {
      recommendations.push({
        type: "structure",
        priority: "medium",
        description: "Document lacks structure. Consider using semantic chunking for better RAG."
      });
    }
    const readingOrder = factors.find((f) => f.factor === "reading_order");
    if (readingOrder && readingOrder.impact < 0.5) {
      recommendations.push({
        type: "reading_order",
        priority: "medium",
        description: "Reading order detection is poor. Enable spatial analysis for multi-column layouts."
      });
    }
    return recommendations;
  }
  function reconstructTable(vectors, textItems, bbox) {
    const table = {
      rows: [],
      cells: [],
      columns: [],
      mergedCells: []
    };
    const hLines = [];
    const vLines = [];
    for (const vec of vectors) {
      if (vec.type === "path" && vec.points) {
        for (let i = 1; i < vec.points.length; i++) {
          const p1 = vec.points[i - 1];
          const p2 = vec.points[i];
          if (Math.abs(p1.y - p2.y) < 2 && Math.abs(p1.x - p2.x) > 20) {
            hLines.push({ y: p1.y, x1: Math.min(p1.x, p2.x), x2: Math.max(p1.x, p2.x) });
          }
          if (Math.abs(p1.x - p2.x) < 2 && Math.abs(p1.y - p2.y) > 20) {
            vLines.push({ x: p1.x, y1: Math.min(p1.y, p2.y), y2: Math.max(p1.y, p2.y) });
          }
        }
      }
    }
    hLines.sort((a, b) => a.y - b.y);
    vLines.sort((a, b) => a.x - b.x);
    const rows = [];
    let lastY = null;
    for (const line of hLines) {
      if (lastY === null || Math.abs(line.y - lastY) > 5) {
        rows.push(line.y);
        lastY = line.y;
      }
    }
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
    for (let r = 0; r < rows.length - 1; r++) {
      for (let c = 0; c < columns.length - 1; c++) {
        const cellBbox = {
          x1: columns[c],
          y1: rows[r],
          x2: columns[c + 1],
          y2: rows[r + 1]
        };
        const cellText = textItems.filter((item) => {
          const x = item.transform?.[4] || 0;
          const y = item.transform?.[5] || 0;
          return x >= cellBbox.x1 && x <= cellBbox.x2 && y >= cellBbox.y1 && y <= cellBbox.y2;
        });
        table.cells.push({
          row: r,
          column: c,
          bbox: cellBbox,
          text: cellText.map((t) => t.str).join(" ").trim(),
          items: cellText
        });
      }
    }
    for (let r = 0; r < rows.length - 1; r++) {
      for (let c = 0; c < columns.length - 1; c++) {
        const hasRightLine = vLines.some(
          (v) => Math.abs(v.x - columns[c + 1]) < 2 && v.y1 <= rows[r] && v.y2 >= rows[r + 1]
        );
        const hasBottomLine = hLines.some(
          (h) => Math.abs(h.y - rows[r + 1]) < 2 && h.x1 <= columns[c] && h.x2 >= columns[c + 1]
        );
        if (!hasRightLine || !hasBottomLine) {
          table.mergedCells.push({
            row: r,
            column: c,
            mergeRight: !hasRightLine,
            mergeDown: !hasBottomLine
          });
        }
      }
    }
    return table;
  }
  function diagnoseDocument(pageResults2, graph) {
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
      clippedText: 0
    };
    let totalScore = 0;
    for (const page of pageResults2) {
      if (page.source === "ocr") {
        issues.scannedPages++;
      }
      if (page.source === "error") {
        issues.brokenTextPages++;
      }
      if (page.readingOrder === 0 && page.contentBlocks > 3) {
        issues.readingOrderProblems++;
      }
      issues.duplicateText += page.textQuality?.summary?.duplicates || 0;
      if (page.structures?.tables && !page.hasStructureTree) {
        issues.untaggedTables += page.structures.tables;
      }
      issues.unrecognizedImages += page.visual?.imageRegions?.length || 0;
      if (page.source === "ocr" && page.confidence && page.confidence < 70) {
        issues.suspiciousOCR++;
      }
      issues.accessibilityFailures += page.markedContent?.filter((m) => m.isArtifact)?.length || 0;
      issues.invisibleText += page.textQuality?.summary?.invisibleText || 0;
      issues.clippedText += page.textQuality?.summary?.clippedText || 0;
      totalScore += page.textQuality?.score || 1;
    }
    issues.watermarks = pageResults2[0]?.repeatedElements?.watermarks?.length || 0;
    const avgScore = totalScore / pageResults2.length;
    const ragReadiness = calculateRAGReadiness(
      pageResults2,
      null,
      null,
      pageResults2[0]?.repeatedElements || {}
    );
    return {
      score: Math.round(avgScore * 100),
      pageCount: pageResults2.length,
      issues,
      ragReadiness: {
        score: Math.round(ragReadiness.score * 100),
        searchable: avgScore > 0.5,
        needsOCR: issues.scannedPages > pageResults2.length * 0.5,
        needsImageAnalysis: issues.unrecognizedImages > 0,
        needsStructureRepair: issues.untaggedTables > 0 || issues.readingOrderProblems > 0
      },
      recommendations: ragReadiness.recommendations
    };
  }
  function normalizeDocument(graph, options = {}) {
    const {
      readingOrder = true,
      ocr = "auto",
      deduplicate = true,
      tables = true,
      images = true,
      structure = true,
      fixHyphenation = true,
      fixLigatures = true,
      removeWatermarks = true
    } = options;
    const ir = graph.getIR();
    const repairs = [];
    if (fixHyphenation || fixLigatures) {
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        for (const textId of pageData.content || []) {
          const textObj = ir.objects?.[textId];
          if (textObj?.raw?.text) {
            const original = textObj.raw.text;
            textObj.raw.text = normalizeText(original);
            if (original !== textObj.raw.text) {
              repairs.push({
                type: "text_normalization",
                page: pageId,
                description: "Fixed hyphenation/ligatures"
              });
            }
          }
        }
      }
    }
    if (deduplicate) {
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        const seen = /* @__PURE__ */ new Set();
        const uniqueContent = [];
        for (const textId of pageData.content || []) {
          const textObj = ir.objects?.[textId];
          const text = textObj?.raw?.text || "";
          const normalized = text.toLowerCase().trim();
          if (!seen.has(normalized) || normalized.length < 5) {
            seen.add(normalized);
            uniqueContent.push(textId);
          } else {
            repairs.push({
              type: "deduplication",
              page: pageId,
              text: text.substring(0, 50),
              description: "Removed duplicate text"
            });
          }
        }
        pageData.content = uniqueContent;
      }
    }
    if (tables) {
      for (const [pageId, pageData] of Object.entries(ir.pages)) {
        if (pageData.vectors?.length > 0) {
          const textItems = (pageData.content || []).map((id) => ir.objects?.[id]).filter(Boolean).map((obj) => obj.raw);
          const reconstructed = reconstructTable(pageData.vectors, textItems, pageData);
          if (reconstructed.cells.length > 0) {
            pageData.reconstructedTable = reconstructed;
            repairs.push({
              type: "table_reconstruction",
              page: pageId,
              cells: reconstructed.cells.length,
              description: "Reconstructed table structure"
            });
          }
        }
      }
    }
    return {
      success: true,
      repairs,
      repairCount: repairs.length
    };
  }

  // src/edgecases.js
  function detectRotationSkew(pageData, contentItems, vectors) {
    const result = {
      rotation: pageData.rotation || 0,
      skewAngle: 0,
      isRotated: false,
      isSkewed: false,
      confidence: 1,
      recommendation: null
    };
    if (result.rotation !== 0) {
      result.isRotated = true;
      result.recommendation = "Page has explicit rotation applied";
    }
    if (contentItems.length > 10) {
      const skew = detectSkewFromText(contentItems);
      result.skewAngle = skew.angle;
      result.isSkewed = Math.abs(skew.angle) > 0.5;
      result.confidence = skew.confidence;
      if (result.isSkewed) {
        result.recommendation = `Page appears skewed by ${skew.angle.toFixed(2)} degrees. Consider deskewing.`;
      }
    }
    if (contentItems.length > 5) {
      const textDirection = detectTextDirection(contentItems);
      if (textDirection === "vertical") {
        result.recommendation = "Text appears vertical - page may be rotated 90\xB0";
      } else if (textDirection === "upside-down") {
        result.recommendation = "Text appears upside-down - page may be rotated 180\xB0";
      }
    }
    return result;
  }
  function detectSkewFromText(items) {
    if (items.length < 5) return { angle: 0, confidence: 0 };
    const baselines = [];
    for (const item of items) {
      if (!item.str || item.str.trim().length < 2) continue;
      const y = item.transform?.[5] || 0;
      const x = item.transform?.[4] || 0;
      baselines.push({ x, y });
    }
    if (baselines.length < 3) return { angle: 0, confidence: 0 };
    baselines.sort((a, b) => a.x - b.x);
    let totalAngle = 0;
    let count = 0;
    for (let i = 1; i < baselines.length; i++) {
      const dx = baselines[i].x - baselines[i - 1].x;
      const dy = baselines[i].y - baselines[i - 1].y;
      if (Math.abs(dx) > 10) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
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
  function detectTextDirection(items) {
    if (items.length < 3) return "horizontal";
    const sortedByY = [...items].sort((a, b) => (b.transform?.[5] || 0) - (a.transform?.[5] || 0));
    const yVariance = calculateVariance(sortedByY.map((i) => i.transform?.[5] || 0));
    const xVariance = calculateVariance(sortedByY.map((i) => i.transform?.[4] || 0));
    if (yVariance > xVariance * 2) {
      return "vertical";
    }
    let upsideDownCount = 0;
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1];
      const curr = items[i];
      if ((curr.transform?.[4] || 0) > (prev.transform?.[4] || 0) && (curr.transform?.[5] || 0) < (prev.transform?.[5] || 0)) {
        upsideDownCount++;
      }
    }
    if (upsideDownCount > items.length * 0.5) {
      return "upside-down";
    }
    return "horizontal";
  }
  function calculateVariance(arr) {
    if (arr.length === 0) return 0;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
  }
  function detectGlyphIssues(pageData, contentItems) {
    const issues = [];
    const puaChars = contentItems.filter((item) => {
      const text = item.str || "";
      return /[\uE000-\uF8FF]/.test(text);
    });
    if (puaChars.length > 0) {
      issues.push({
        type: "pua_characters",
        severity: "warning",
        count: puaChars.length,
        samples: puaChars.slice(0, 3).map((i) => i.str),
        description: "Private Use Area characters found - possible missing ToUnicode map"
      });
    }
    const replacementChars = contentItems.filter((item) => {
      const text = item.str || "";
      return /\uFFFD/.test(text);
    });
    if (replacementChars.length > 0) {
      issues.push({
        type: "replacement_characters",
        severity: "error",
        count: replacementChars.length,
        description: "Unicode replacement characters found - encoding issue"
      });
    }
    const nonBMP = contentItems.filter((item) => {
      const text = item.str || "";
      return /[\u{10000}-\u{10FFFF}]/u.test(text);
    });
    if (nonBMP.length > 0) {
      issues.push({
        type: "non_bmp_characters",
        severity: "info",
        count: nonBMP.length,
        description: "Non-BMP characters found - may indicate complex script or encoding"
      });
    }
    const fontIssues = detectFontEncodingMismatches(contentItems);
    if (fontIssues.length > 0) {
      issues.push({
        type: "font_encoding_mismatch",
        severity: "warning",
        count: fontIssues.length,
        fonts: [...new Set(fontIssues.map((f) => f.font))],
        description: "Font encoding may not match character encoding"
      });
    }
    const tofu = contentItems.filter((item) => {
      const text = item.str || "";
      return /\u25A1/.test(text);
    });
    if (tofu.length > 0) {
      issues.push({
        type: "missing_glyphs",
        severity: "warning",
        count: tofu.length,
        description: "Missing glyph indicators found - font may not support all characters"
      });
    }
    return {
      issues,
      hasGlyphIssues: issues.length > 0,
      puaCount: puaChars.length,
      replacementCount: replacementChars.length
    };
  }
  function detectFontEncodingMismatches(items) {
    const mismatches = [];
    const fontGroups = {};
    for (const item of items) {
      const font = item.fontName || "unknown";
      if (!fontGroups[font]) fontGroups[font] = [];
      fontGroups[font].push(item);
    }
    for (const [font, fontItems] of Object.entries(fontGroups)) {
      const allText = fontItems.map((i) => i.str || "").join("");
      const hasASCII = /[a-zA-Z]/.test(allText);
      const hasPUA = /[\uE000-\uF8FF]/.test(allText);
      if (hasASCII && hasPUA) {
        mismatches.push({ font, reason: "Mixed ASCII and PUA characters" });
      }
    }
    return mismatches;
  }
  function detectOutlinedText(vectors, contentItems) {
    const outlinedText = [];
    for (const vec of vectors) {
      if (vec.type === "path" && vec.points && vec.points.length > 5) {
        const bbox = vec.bbox || calculateBBox(vec.points);
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        const aspectRatio = width / height;
        if (aspectRatio > 0.2 && aspectRatio < 5 && height > 5 && height < 100) {
          const overlappingText = contentItems.filter((item) => {
            const x = item.transform?.[4] || 0;
            const y = item.transform?.[5] || 0;
            return x >= bbox[0] - 5 && x <= bbox[2] + 5 && y >= bbox[1] - 5 && y <= bbox[3] + 5;
          });
          if (overlappingText.length === 0) {
            outlinedText.push({
              bbox,
              pathLength: vec.points.length,
              type: "outlined_text_candidate"
            });
          }
        }
      }
    }
    return {
      hasOutlinedText: outlinedText.length > 0,
      candidates: outlinedText,
      count: outlinedText.length
    };
  }
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
  function detectFlattenedForms(vectors, contentItems, annotations) {
    const result = {
      hasFlattenedForms: false,
      candidates: [],
      recoveredFields: []
    };
    const formPatterns = findFormPatterns(vectors, contentItems);
    const formFields = annotations.filter((a) => a.subtype === "Widget");
    if (formPatterns.length > 0 && formFields.length === 0) {
      result.hasFlattenedForms = true;
      result.candidates = formPatterns;
      for (const pattern of formPatterns) {
        const recovered = recoverFormField(pattern, contentItems);
        if (recovered) {
          result.recoveredFields.push(recovered);
        }
      }
    }
    return result;
  }
  function findFormPatterns(vectors, contentItems) {
    const patterns = [];
    for (const vec of vectors) {
      if (vec.type === "rect") {
        const bbox = vec.bbox;
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        if (width > 50 && width < 400 && height > 10 && height < 50) {
          const nearbyText = contentItems.filter((item) => {
            const x = item.transform?.[4] || 0;
            const y = item.transform?.[5] || 0;
            return x < bbox[0] && Math.abs(y - bbox[1]) < height;
          });
          if (nearbyText.length > 0) {
            patterns.push({
              bbox,
              label: nearbyText.map((t) => t.str).join(" ").trim(),
              type: "form_field_candidate"
            });
          }
        }
      }
    }
    return patterns;
  }
  function recoverFormField(pattern, contentItems) {
    const bbox = pattern.bbox;
    const insideText = contentItems.filter((item) => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      return x >= bbox[0] && x <= bbox[2] && y >= bbox[1] && y <= bbox[3];
    });
    if (insideText.length > 0) {
      return {
        label: pattern.label,
        value: insideText.map((t) => t.str).join(" ").trim(),
        bbox,
        confidence: 0.7
      };
    }
    const hasCheckmark = detectCheckmarkInArea(bbox, []);
    if (hasCheckmark) {
      return {
        label: pattern.label,
        value: "checked",
        bbox,
        confidence: 0.8
      };
    }
    return null;
  }
  function detectCheckboxes(vectors, contentItems) {
    const checkboxes = [];
    for (const vec of vectors) {
      if (vec.type === "rect") {
        const bbox = vec.bbox;
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        if (width > 8 && width < 30 && height > 8 && height < 30 && Math.abs(width - height) < 5) {
          const nearbyLabel = contentItems.filter((item) => {
            const x = item.transform?.[4] || 0;
            const y = item.transform?.[5] || 0;
            return x > bbox[2] && Math.abs(y - bbox[1]) < height * 2;
          });
          const isFilled = detectCheckmarkInArea(bbox, vectors);
          checkboxes.push({
            bbox,
            label: nearbyLabel.map((t) => t.str).join(" ").trim() || null,
            checked: isFilled,
            type: "checkbox"
          });
        }
      }
    }
    for (const vec of vectors) {
      if (vec.type === "circle" || vec.type === "path" && isCircularPath(vec.points)) {
        const bbox = vec.bbox || calculateBBox(vec.points || []);
        const diameter = bbox[2] - bbox[0];
        if (diameter > 8 && diameter < 30) {
          const nearbyLabel = contentItems.filter((item) => {
            const x = item.transform?.[4] || 0;
            const y = item.transform?.[5] || 0;
            return x > bbox[2] && Math.abs(y - bbox[1]) < diameter * 2;
          });
          const isFilled = detectCheckmarkInArea(bbox, vectors);
          checkboxes.push({
            bbox,
            label: nearbyLabel.map((t) => t.str).join(" ").trim() || null,
            checked: isFilled,
            type: "radio"
          });
        }
      }
    }
    return {
      count: checkboxes.length,
      checkboxes,
      checked: checkboxes.filter((c) => c.checked).length,
      unchecked: checkboxes.filter((c) => !c.checked).length
    };
  }
  function isCircularPath(points) {
    if (!points || points.length < 8) return false;
    const bbox = calculateBBox(points);
    const width = bbox[2] - bbox[0];
    const height = bbox[3] - bbox[1];
    return Math.abs(width - height) < width * 0.2;
  }
  function detectCheckmarkInArea(areaBbox, vectors) {
    for (const vec of vectors) {
      if (vec.type === "path" && vec.points) {
        const pointCount = vec.points.filter(
          (pt) => pt.x >= areaBbox[0] && pt.x <= areaBbox[2] && pt.y >= areaBbox[1] && pt.y <= areaBbox[3]
        ).length;
        if (pointCount > vec.points.length * 0.3) {
          return true;
        }
      }
    }
    return false;
  }
  function detectCrossPageTables(pageResults2, ir) {
    const crossPageTables = [];
    const tablePages = {};
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      if (pageData.reconstructedTable && pageData.reconstructedTable.cells.length > 0) {
        const table = pageData.reconstructedTable;
        const key = `${table.columns.length}_${table.rows.length}`;
        if (!tablePages[key]) tablePages[key] = [];
        tablePages[key].push({
          pageId,
          table,
          pageNum: parseInt(pageId.replace("page_", ""))
        });
      }
    }
    for (const [key, pages2] of Object.entries(tablePages)) {
      if (pages2.length < 2) continue;
      pages2.sort((a, b) => a.pageNum - b.pageNum);
      let currentSequence = [pages2[0]];
      for (let i = 1; i < pages2.length; i++) {
        if (pages2[i].pageNum === currentSequence[currentSequence.length - 1].pageNum + 1) {
          currentSequence.push(pages2[i]);
        } else {
          if (currentSequence.length >= 2) {
            crossPageTables.push({
              startPage: currentSequence[0].pageNum,
              endPage: currentSequence[currentSequence.length - 1].pageNum,
              pageCount: currentSequence.length,
              columns: currentSequence[0].table.columns.length,
              type: "cross_page_table"
            });
          }
          currentSequence = [pages2[i]];
        }
      }
      if (currentSequence.length >= 2) {
        crossPageTables.push({
          startPage: currentSequence[0].pageNum,
          endPage: currentSequence[currentSequence.length - 1].pageNum,
          pageCount: currentSequence.length,
          columns: currentSequence[0].table.columns.length,
          type: "cross_page_table"
        });
      }
    }
    return {
      count: crossPageTables.length,
      tables: crossPageTables
    };
  }
  function associateCaptionsWithImages(pageData, contentItems, images) {
    const associations = [];
    for (const image of images) {
      const imageBbox = image.bbox;
      const captionsBelow = contentItems.filter((item) => {
        const x = item.transform?.[4] || 0;
        const y = item.transform?.[5] || 0;
        const text = item.str || "";
        return y < imageBbox.y && y > imageBbox.y - 50 && Math.abs(x + (item.width || 0) / 2 - (imageBbox.x + imageBbox.width / 2)) < imageBbox.width && (text.startsWith("Figure") || text.startsWith("Image") || text.startsWith("Table") || text.startsWith("Fig.") || text.startsWith("Img.") || /^\d+\./.test(text));
      });
      const titlesAbove = contentItems.filter((item) => {
        const x = item.transform?.[4] || 0;
        const y = item.transform?.[5] || 0;
        const text = item.str || "";
        return y > imageBbox.y + imageBbox.height && y < imageBbox.y + imageBbox.height + 30 && Math.abs(x + (item.width || 0) / 2 - (imageBbox.x + imageBbox.width / 2)) < imageBbox.width * 1.5 && text.length > 5;
      });
      if (captionsBelow.length > 0 || titlesAbove.length > 0) {
        associations.push({
          image: {
            bbox: imageBbox,
            id: image.id
          },
          caption: captionsBelow.map((t) => t.str).join(" ").trim() || null,
          title: titlesAbove.map((t) => t.str).join(" ").trim() || null,
          confidence: captionsBelow.length > 0 ? 0.9 : 0.6
        });
      }
    }
    return associations;
  }
  function detectFootnotes(contentItems, pageData) {
    const footnotes = [];
    const footnoteRefs = [];
    for (const item of contentItems) {
      const text = item.str || "";
      const fontSize = Math.abs(item.transform?.[0]) || 12;
      if (/^\d{1,3}$/.test(text) && fontSize < 10) {
        footnoteRefs.push({
          text,
          bbox: [item.transform?.[4] || 0, item.transform?.[5] || 0],
          fontSize,
          type: "footnote_reference"
        });
      }
      if (/^\d{1,2}\.\s/.test(text) || /^[a-z]\.\s/.test(text)) {
        const y = item.transform?.[5] || 0;
        const pageHeight = pageData.height || 792;
        if (y < pageHeight * 0.2) {
          footnotes.push({
            text,
            bbox: [item.transform?.[4] || 0, y],
            marker: text.match(/^(\d{1,2}|[a-z])\./)?.[1],
            type: "footnote"
          });
        }
      }
    }
    const associations = [];
    for (const ref of footnoteRefs) {
      const matchingNote = footnotes.find((fn) => fn.marker === ref.text);
      if (matchingNote) {
        associations.push({
          reference: ref,
          note: matchingNote,
          type: "footnote_association"
        });
      }
    }
    return {
      footnotes,
      footnoteRefs,
      associations,
      count: footnotes.length
    };
  }
  function detectLanguage(contentItems) {
    const allText = contentItems.map((i) => i.str || "").join(" ");
    if (allText.length < 50) {
      return { language: "unknown", confidence: 0 };
    }
    const languages = {
      en: { words: ["the", "and", "is", "in", "to", "of", "a", "that", "it", "for"], weight: 1 },
      es: { words: ["el", "la", "de", "en", "y", "los", "las", "un", "una", "que"], weight: 1 },
      fr: { words: ["le", "la", "de", "et", "est", "en", "les", "des", "un", "une"], weight: 1 },
      de: { words: ["der", "die", "und", "ist", "von", "den", "das", "ein", "eine", "auf"], weight: 1 },
      pt: { words: ["o", "a", "de", "e", "em", "os", "as", "um", "uma", "que"], weight: 1 },
      it: { words: ["il", "la", "di", "che", "\xE8", "in", "le", "del", "un", "una"], weight: 1 },
      nl: { words: ["de", "het", "een", "van", "en", "is", "dat", "op", "te", "voor"], weight: 1 },
      ru: { words: ["\u0438", "\u0432", "\u043D\u0435", "\u043D\u0430", "\u0447\u0442\u043E", "\u043E\u043D", "\u043A\u0430\u043A", "\u044D\u0442\u043E", "\u043F\u043E", "\u043D\u043E"], weight: 0.8 },
      zh: { words: ["\u7684", "\u662F", "\u5728", "\u4E86", "\u4E0D", "\u6709", "\u548C", "\u5C31", "\u4EBA", "\u90FD"], weight: 0.8 },
      ja: { words: ["\u306E", "\u306B", "\u306F", "\u3092", "\u305F", "\u304C", "\u3067", "\u3066", "\u3068", "\u3057"], weight: 0.8 }
    };
    const words = allText.toLowerCase().split(/\s+/);
    const scores = {};
    for (const [lang, config2] of Object.entries(languages)) {
      let count = 0;
      for (const word of words) {
        if (config2.words.includes(word)) {
          count++;
        }
      }
      scores[lang] = count / words.length * config2.weight;
    }
    let bestLang = "unknown";
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
      scores
    };
  }
  function detectMalformedPDF(pdf) {
    const hints = [];
    if (!pdf?.catalog) {
      hints.push({
        type: "missing_catalog",
        severity: "error",
        description: "PDF catalog dictionary is missing",
        recovery: "Try opening with a repair-capable PDF library"
      });
    }
    if (pdf?.xrefBroken) {
      hints.push({
        type: "broken_xref",
        severity: "error",
        description: "Cross-reference table appears corrupted",
        recovery: "Rebuild xref table using repair tools"
      });
    }
    if (!pdf?.pages) {
      hints.push({
        type: "missing_pages",
        severity: "error",
        description: "Page tree is missing or invalid",
        recovery: "Extract pages using alternative methods"
      });
    }
    if (pdf?.encrypted && !pdf?.password) {
      hints.push({
        type: "encrypted_no_password",
        severity: "warning",
        description: "PDF is encrypted but no password provided",
        recovery: "Provide password or use decryption tools"
      });
    }
    if (pdf?.truncated) {
      hints.push({
        type: "truncated_file",
        severity: "error",
        description: "PDF file appears to be truncated",
        recovery: "File may be incomplete - try re-downloading"
      });
    }
    return {
      isMalformed: hints.length > 0,
      hints,
      severity: hints.some((h) => h.severity === "error") ? "error" : hints.some((h) => h.severity === "warning") ? "warning" : "info"
    };
  }

  // src/expansion.js
  var CONCEPT_SYNONYMS = {
    contract: ["agreement", "award", "deal", "pact", "compact", "accord", "arrangement", "understanding", "contractual"],
    money: ["funds", "payment", "amount", "cost", "price", "value", "expenditure", "expense", "budget", "appropriation", "disbursement", "compensation"],
    person: ["individual", "person", "applicant", "representative", "agent", "officer", "director", "manager", "official", "employee", "contractor", "vendor"],
    organization: ["company", "corporation", "firm", "agency", "department", "bureau", "division", "authority", "board", "commission", "office", "entity", "contractor", "vendor", "supplier"],
    approve: ["authorize", "ratify", "endorse", "sanction", "confirm", "adopt", "certify", "validate", "accept", "grant"],
    location: ["address", "place", "site", "property", "premises", "location", "area", "district", "zone", "parcel"],
    date: ["time", "period", "deadline", "due date", "expiration", "term", "duration", "interval", "schedule"],
    purchase: ["buy", "acquire", "procure", "obtain", "order", "bid", "solicit", "requisition"],
    project: ["work", "initiative", "program", "effort", "undertaking", "endeavor", "task", "assignment"],
    department: ["division", "bureau", "unit", "section", "branch", "office", "team", "group"],
    reduce: ["decrease", "lower", "cut", "diminish", "lessen", "curtail", "scale back"],
    increase: ["raise", "grow", "expand", "elevate", "boost", "enhance", "augment"],
    save: ["savings", "reduction", "decrease", "lower", "reduce", "cost reduction", "expenditure reduction"],
    comply: ["compliance", "conform", "adhere", "follow", "observe", "meet", "satisfy", "fulfill"],
    terminate: ["end", "cancel", "expire", "cease", "discontinue", "abrogate", "revoke", "rescind"],
    amend: ["modify", "revise", "change", "alter", "update", "adjust", "correct"],
    fund: ["funding", "finance", "capitalize", "appropriate", "allocate", "budget"],
    perform: ["execute", "deliver", "complete", "accomplish", "fulfill", "carry out", "implement"],
    inspect: ["review", "examine", "audit", "assess", "evaluate", "survey", "investigate"],
    maintain: ["repair", "upkeep", "service", "preserve", "sustain", "support"]
  };
  var ENTITY_TYPE_EXPANSIONS = {
    currency: ["dollar", "amount", "cost", "price", "fee", "rate", "charge", "budget", "appropriation", "expenditure", "payment", "fund", "revenue", "tax", "levy", "assessment", "fine", "penalty", "grant", "subsidy"],
    date: ["day", "month", "year", "deadline", "expiration", "term", "period", "duration", "fiscal year", "quarter", "anniversary", "effective date"],
    person: ["name", "applicant", "contact", "signatory", "witness", "notary", "official", "officer", "director", "manager", "supervisor", "coordinator", "administrator"],
    address: ["street", "avenue", "boulevard", "road", "drive", "lane", "court", "place", "way", "suite", "floor", "building", "city", "state", "zip"],
    phone: ["telephone", "call", "contact", "number", "fax", "mobile", "cell"],
    email: ["electronic mail", "e-mail", "address", "contact", "inbox"],
    organization: ["company", "firm", "agency", "department", "authority", "board", "commission", "corporation", "llc", "inc", "partnership", "association", "institution"]
  };
  var SUFFIX_RULES = [
    ["ational", "ate"],
    ["tional", "tion"],
    ["enci", "ence"],
    ["anci", "ance"],
    ["izer", "ize"],
    ["ously", "ous"],
    ["ively", "ive"],
    ["ently", "ent"],
    ["ation", "ate"],
    ["alism", "al"],
    ["iveness", "ive"],
    ["fulness", "ful"],
    ["ousness", "ous"],
    ["ality", "al"],
    ["biliti", "ble"],
    ["logi", "log"],
    ["sses", "ss"],
    ["ies", "i"],
    ["ss", "ss"],
    ["s", ""],
    ["ement", ""],
    ["ment", ""],
    ["ence", ""],
    ["ance", ""],
    ["able", ""],
    ["ible", ""],
    ["ful", ""],
    ["ous", ""],
    ["ive", ""],
    ["ize", ""],
    ["ate", ""],
    ["ing", ""],
    ["tion", "t"],
    ["ness", ""],
    ["able", ""],
    ["edly", ""],
    ["ily", "y"],
    ["ly", ""],
    ["er", ""],
    ["ed", ""]
  ];
  function stem(word) {
    if (!word || word.length < 4) return word;
    const lower = word.toLowerCase();
    if (lower.length <= 3) return lower;
    for (const [suffix, replacement] of SUFFIX_RULES) {
      if (lower.endsWith(suffix) && lower.length - suffix.length >= 3) {
        const root = lower.slice(0, -suffix.length) + replacement;
        if (root.length >= 3) return root;
      }
    }
    return lower;
  }
  function charNGrams(str, n = 3) {
    const grams = [];
    const lower = str.toLowerCase().replace(/\s+/g, " ");
    for (let i = 0; i <= lower.length - n; i++) {
      grams.push(lower.substring(i, i + n));
    }
    return grams;
  }
  function wordNGrams(text, n = 2) {
    const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    const grams = [];
    for (let i = 0; i <= words.length - n; i++) {
      grams.push(words.slice(i, i + n).join(" "));
    }
    return grams;
  }
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  }
  function fuzzyScore(a, b) {
    const al = a.toLowerCase().trim();
    const bl = b.toLowerCase().trim();
    if (al === bl) return 1;
    if (al.includes(bl) || bl.includes(al)) return 0.85;
    const maxLen = Math.max(al.length, bl.length);
    if (maxLen === 0) return 0;
    const dist = levenshtein(al, bl);
    return Math.max(0, 1 - dist / maxLen);
  }
  function bestFuzzyMatch(term, vocabulary, threshold = 0.6) {
    let best = null;
    let bestScore = 0;
    for (const word of vocabulary) {
      const score = fuzzyScore(term, word);
      if (score > bestScore && score >= threshold) {
        best = word;
        bestScore = score;
      }
    }
    return best ? { word: best, score: bestScore } : null;
  }
  function expandQuery(query, options = {}) {
    const {
      includeSynonyms = true,
      includeStems = true,
      includeNGrams = false,
      includeFuzzy = false,
      documentTerms = null
    } = options;
    const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    const expanded = /* @__PURE__ */ new Map();
    function addTerm(term, weight, source) {
      if (!term || term.length < 2) return;
      const existing = expanded.get(term);
      if (existing) {
        existing.weight = Math.max(existing.weight, weight);
        existing.sources.push(source);
      } else {
        expanded.set(term, { weight, sources: [source] });
      }
    }
    for (const term of terms) {
      addTerm(term, 1, "original");
    }
    if (includeSynonyms) {
      for (const term of terms) {
        const synonyms = findSynonyms(term);
        for (const syn of synonyms) {
          addTerm(syn, 0.7, "synonym");
        }
      }
      const queryLower = query.toLowerCase();
      for (const [concept, synonyms] of Object.entries(CONCEPT_SYNONYMS)) {
        if (queryLower.includes(concept)) {
          for (const syn of synonyms) {
            addTerm(syn, 0.6, `concept:${concept}`);
          }
        }
        for (const syn of synonyms) {
          if (queryLower.includes(syn)) {
            addTerm(concept, 0.6, `concept:${syn}`);
            for (const otherSyn of synonyms) {
              if (otherSyn !== syn) addTerm(otherSyn, 0.4, `concept:${syn}`);
            }
          }
        }
      }
    }
    if (includeStems) {
      for (const term of terms) {
        const s = stem(term);
        if (s !== term) addTerm(s, 0.5, "stem");
      }
    }
    if (includeNGrams) {
      const fullQuery = terms.join(" ");
      const bigrams = wordNGrams(fullQuery, 2);
      for (const gram of bigrams) {
        addTerm(gram, 0.4, "bigram");
      }
    }
    if (includeFuzzy && documentTerms) {
      const vocab = Array.isArray(documentTerms) ? documentTerms : Object.keys(documentTerms);
      for (const term of terms) {
        const match = bestFuzzyMatch(term, vocab, 0.7);
        if (match && match.word !== term) {
          addTerm(match.word, 0.3 * match.score, "fuzzy");
        }
      }
    }
    const result = [];
    for (const [term, data] of expanded) {
      result.push({
        term,
        weight: data.weight,
        sources: data.sources
      });
    }
    result.sort((a, b) => b.weight - a.weight);
    return result;
  }
  function findSynonyms(term) {
    const lower = term.toLowerCase();
    const synonyms = /* @__PURE__ */ new Set();
    if (CONCEPT_SYNONYMS[lower]) {
      for (const syn of CONCEPT_SYNONYMS[lower]) {
        synonyms.add(syn);
      }
    }
    for (const [concept, syns] of Object.entries(CONCEPT_SYNONYMS)) {
      if (syns.includes(lower)) {
        synonyms.add(concept);
        for (const syn of syns) {
          if (syn !== lower) synonyms.add(syn);
        }
      }
    }
    for (const [type, terms] of Object.entries(ENTITY_TYPE_EXPANSIONS)) {
      if (terms.includes(lower)) {
        synonyms.add(type);
      }
    }
    return Array.from(synonyms);
  }
  function detectAcronyms(text) {
    const acronyms = [];
    const pattern = /([A-Z][a-zA-Z\s\-]{2,50})\s*\(([A-Z](?:\.?[A-Z]){1,10})\)/g;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      acronyms.push({
        full: match[1].trim(),
        acronym: match[2].replace(/\./g, ""),
        position: match.index
      });
    }
    const reversePattern = /\(([A-Z](?:\.?[A-Z]){1,10})\)\s*([A-Z][a-zA-Z\s\-]{2,50})/g;
    while ((match = reversePattern.exec(text)) !== null) {
      acronyms.push({
        full: match[2].trim(),
        acronym: match[1].replace(/\./g, ""),
        position: match.index
      });
    }
    return acronyms;
  }
  function detectDefinitions(text) {
    const definitions = [];
    const patterns = [
      /(?:hereinafter|hereafter)\s+(?:referred\s+to\s+as|called|known\s+as)\s+["']?([A-Z][a-zA-Z\s]+?)["']?[\s.,;]/gi,
      /(?:defined\s+as|means|refers?\s+to)\s+["']?([A-Z][a-zA-Z\s]+?)["']?[\s.,;]/gi,
      /["']([A-Z][a-zA-Z\s]+?)["']\s+(?:means|shall\s+mean|refers?\s+to)/gi,
      /([A-Z][a-zA-Z]+)\s+(?:means|shall\s+mean|is\s+defined\s+as)\s+/gi
    ];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        definitions.push({
          term: match[1].trim(),
          context: text.substring(Math.max(0, match.index - 30), match.index + match[0].length + 30),
          position: match.index
        });
      }
    }
    return definitions;
  }
  function learnTerminology2(pages2) {
    const aliases = /* @__PURE__ */ new Map();
    const acronymMap = /* @__PURE__ */ new Map();
    const definitionMap = /* @__PURE__ */ new Map();
    for (const page of pages2) {
      const text = page.text || "";
      const acronyms = detectAcronyms(text);
      for (const acr of acronyms) {
        acronymMap.set(acr.acronym.toLowerCase(), acr.full);
        addAlias(aliases, acr.full.toLowerCase(), acr.acronym.toLowerCase());
      }
      const defs = detectDefinitions(text);
      for (const def of defs) {
        definitionMap.set(def.term.toLowerCase(), def.context);
      }
    }
    const phraseFreq = /* @__PURE__ */ new Map();
    for (const page of pages2) {
      const text = (page.text || "").toLowerCase();
      const words = text.split(/\s+/).filter((w) => w.length > 2);
      for (let len = 2; len <= 4; len++) {
        for (let i = 0; i <= words.length - len; i++) {
          const phrase = words.slice(i, i + len).join(" ");
          if (!/^\d+$/.test(phrase)) {
            phraseFreq.set(phrase, (phraseFreq.get(phrase) || 0) + 1);
          }
        }
      }
    }
    const frequentPhrases = Array.from(phraseFreq.entries()).filter(([, count]) => count >= 2).sort((a, b) => b[1] - a[1]).slice(0, 200);
    for (let i = 0; i < frequentPhrases.length; i++) {
      for (let j = i + 1; j < frequentPhrases.length; j++) {
        const [phrase1] = frequentPhrases[i];
        const [phrase2] = frequentPhrases[j];
        if (phrase1.includes(phrase2) || phrase2.includes(phrase1)) {
          const longer = phrase1.length > phrase2.length ? phrase1 : phrase2;
          const shorter = phrase1.length > phrase2.length ? phrase2 : phrase1;
          if (shorter.length >= 3) {
            addAlias(aliases, longer, shorter);
          }
        }
      }
    }
    return {
      aliases: Object.fromEntries(
        Array.from(aliases.entries()).map(([k, v]) => [k, Array.from(v)])
      ),
      acronyms: Object.fromEntries(acronymMap),
      definitions: Object.fromEntries(definitionMap)
    };
  }
  function addAlias(aliases, canonical, alias) {
    if (!aliases.has(canonical)) {
      aliases.set(canonical, /* @__PURE__ */ new Set());
    }
    aliases.get(canonical).add(alias);
    if (!aliases.has(alias)) {
      aliases.set(alias, /* @__PURE__ */ new Set());
    }
    aliases.get(alias).add(canonical);
  }
  function fuzzySearch(query, pages2, options = {}) {
    const { threshold = 0.6, maxResults = 10 } = options;
    const results = [];
    const queryLower = query.toLowerCase().trim();
    for (const page of pages2) {
      const text = page.text || "";
      const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 5);
      for (const sentence of sentences) {
        const sentenceLower = sentence.toLowerCase().trim();
        const score = fuzzyScore(queryLower, sentenceLower);
        if (score >= threshold) {
          results.push({
            text: sentence.trim().substring(0, 300),
            page: page.pageNum,
            score,
            type: "fuzzy"
          });
        }
      }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, maxResults);
  }

  // src/concepts.js
  var ConceptNode = class {
    constructor(id, type, text, options = {}) {
      this.id = id;
      this.type = type;
      this.text = text;
      this.page = options.page || 0;
      this.bbox = options.bbox || null;
      this.weight = options.weight || 1;
      this.metadata = options.metadata || {};
      this.occurrences = options.occurrences || [];
    }
  };
  var ConceptEdge = class {
    constructor(sourceId, targetId, relation, options = {}) {
      this.sourceId = sourceId;
      this.targetId = targetId;
      this.relation = relation;
      this.weight = options.weight || 1;
      this.pages = options.pages || [];
      this.evidence = options.evidence || [];
      this.predicate = options.predicate || null;
    }
  };
  var ConceptGraph = class {
    constructor() {
      this.nodes = /* @__PURE__ */ new Map();
      this.edges = /* @__PURE__ */ new Map();
      this.adjacency = /* @__PURE__ */ new Map();
      this.pageIndex = /* @__PURE__ */ new Map();
      this.typeIndex = /* @__PURE__ */ new Map();
      this.textIndex = /* @__PURE__ */ new Map();
    }
    addNode(node) {
      this.nodes.set(node.id, node);
      if (!this.typeIndex.has(node.type)) {
        this.typeIndex.set(node.type, /* @__PURE__ */ new Set());
      }
      this.typeIndex.get(node.type).add(node.id);
      if (!this.pageIndex.has(node.page)) {
        this.pageIndex.set(node.page, /* @__PURE__ */ new Set());
      }
      this.pageIndex.get(node.page).add(node.id);
      const normText = node.text.toLowerCase().trim();
      if (!this.textIndex.has(normText)) {
        this.textIndex.set(normText, /* @__PURE__ */ new Set());
      }
      this.textIndex.get(normText).add(node.id);
      return node;
    }
    addEdge(edge) {
      const edgeKey = `${edge.sourceId}->${edge.targetId}:${edge.relation}`;
      if (this.edges.has(edgeKey)) {
        const existing = this.edges.get(edgeKey);
        existing.weight += edge.weight;
        existing.pages = [.../* @__PURE__ */ new Set([...existing.pages, ...edge.pages])];
        existing.evidence = [...existing.evidence, ...edge.evidence];
        return existing;
      }
      this.edges.set(edgeKey, edge);
      if (!this.adjacency.has(edge.sourceId)) {
        this.adjacency.set(edge.sourceId, /* @__PURE__ */ new Set());
      }
      if (!this.adjacency.has(edge.targetId)) {
        this.adjacency.set(edge.targetId, /* @__PURE__ */ new Set());
      }
      this.adjacency.get(edge.sourceId).add(edgeKey);
      this.adjacency.get(edge.targetId).add(edgeKey);
      return edge;
    }
    getNode(id) {
      return this.nodes.get(id) || null;
    }
    getNeighbors(nodeId, maxDepth = 1) {
      const visited = /* @__PURE__ */ new Set();
      const result = [];
      const traverse = (currentId, depth) => {
        if (depth > maxDepth || visited.has(currentId)) return;
        visited.add(currentId);
        const edgeKeys = this.adjacency.get(currentId) || /* @__PURE__ */ new Set();
        for (const edgeKey of edgeKeys) {
          const edge = this.edges.get(edgeKey);
          if (!edge) continue;
          const neighborId = edge.sourceId === currentId ? edge.targetId : edge.sourceId;
          if (!visited.has(neighborId)) {
            const neighbor = this.nodes.get(neighborId);
            if (neighbor) {
              result.push({
                node: neighbor,
                edge,
                depth
              });
            }
            traverse(neighborId, depth + 1);
          }
        }
      };
      traverse(nodeId, 1);
      return result;
    }
    findByType(type) {
      const nodeIds = this.typeIndex.get(type) || /* @__PURE__ */ new Set();
      return [...nodeIds].map((id) => this.nodes.get(id)).filter(Boolean);
    }
    findByText(text) {
      const normText = text.toLowerCase().trim();
      const nodeIds = this.textIndex.get(normText) || /* @__PURE__ */ new Set();
      return [...nodeIds].map((id) => this.nodes.get(id)).filter(Boolean);
    }
    findByPage(page) {
      const nodeIds = this.pageIndex.get(page) || /* @__PURE__ */ new Set();
      return [...nodeIds].map((id) => this.nodes.get(id)).filter(Boolean);
    }
    /**
     * Find the shortest path between two concepts.
     */
    findPath(sourceId, targetId, maxDepth = 5) {
      const visited = /* @__PURE__ */ new Map();
      const queue = [{ id: sourceId, path: [] }];
      while (queue.length > 0) {
        const { id, path } = queue.shift();
        if (visited.has(id)) continue;
        visited.set(id, path);
        if (id === targetId) {
          return path.map((edgeKey) => this.edges.get(edgeKey)).filter(Boolean);
        }
        if (path.length >= maxDepth) continue;
        const edgeKeys = this.adjacency.get(id) || /* @__PURE__ */ new Set();
        for (const edgeKey of edgeKeys) {
          const edge = this.edges.get(edgeKey);
          if (!edge) continue;
          const neighborId = edge.sourceId === id ? edge.targetId : edge.sourceId;
          if (!visited.has(neighborId)) {
            queue.push({ id: neighborId, path: [...path, edgeKey] });
          }
        }
      }
      return null;
    }
    /**
     * Get all relationships involving a concept.
     */
    getRelationships(nodeId) {
      const edgeKeys = this.adjacency.get(nodeId) || /* @__PURE__ */ new Set();
      return [...edgeKeys].map((key) => this.edges.get(key)).filter(Boolean);
    }
    /**
     * Get the most connected concepts (hub nodes).
     */
    getHubs(limit = 10) {
      const degrees = [];
      for (const [nodeId, edgeKeys] of this.adjacency) {
        degrees.push({
          node: this.nodes.get(nodeId),
          degree: edgeKeys.size
        });
      }
      return degrees.sort((a, b) => b.degree - a.degree).slice(0, limit).filter((d) => d.node);
    }
    /**
     * Get community clusters (connected components by type).
     */
    getCommunities() {
      const visited = /* @__PURE__ */ new Set();
      const communities = [];
      for (const [nodeId] of this.nodes) {
        if (visited.has(nodeId)) continue;
        const community = [];
        const queue = [nodeId];
        while (queue.length > 0) {
          const currentId = queue.shift();
          if (visited.has(currentId)) continue;
          visited.add(currentId);
          const node = this.nodes.get(currentId);
          if (node) community.push(node);
          const edgeKeys = this.adjacency.get(currentId) || /* @__PURE__ */ new Set();
          for (const edgeKey of edgeKeys) {
            const edge = this.edges.get(edgeKey);
            if (!edge) continue;
            const neighborId = edge.sourceId === currentId ? edge.targetId : edge.sourceId;
            if (!visited.has(neighborId)) queue.push(neighborId);
          }
        }
        if (community.length > 0) communities.push(community);
      }
      return communities;
    }
    toJSON() {
      return {
        nodes: [...this.nodes.values()],
        edges: [...this.edges.values()],
        stats: {
          nodeCount: this.nodes.size,
          edgeCount: this.edges.size,
          typeCounts: Object.fromEntries(
            [...this.typeIndex.entries()].map(([type, ids]) => [type, ids.size])
          )
        }
      };
    }
  };
  function extractRelationships(contentGraph, conceptGraph) {
    const relationships = [];
    const pageEntityMap = /* @__PURE__ */ new Map();
    for (const entity of contentGraph.allEntities) {
      if (!pageEntityMap.has(entity.page)) {
        pageEntityMap.set(entity.page, []);
      }
      pageEntityMap.get(entity.page).push(entity);
    }
    for (const [page, entities] of pageEntityMap) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
          const e1 = entities[i];
          const e2 = entities[j];
          if (e1.type === e2.type) continue;
          const predicate = inferPredicate(e1, e2);
          if (predicate) {
            const sourceId = `${e1.type}:${e1.value}`;
            const targetId = `${e2.type}:${e2.value}`;
            const node1 = conceptGraph.addNode(new ConceptNode(
              sourceId,
              e1.type,
              e1.value,
              {
                page,
                bbox: e1.bbox,
                weight: e1.confidence || 0.5
              }
            ));
            const node2 = conceptGraph.addNode(new ConceptNode(
              targetId,
              e2.type,
              e2.value,
              {
                page,
                bbox: e2.bbox,
                weight: e2.confidence || 0.5
              }
            ));
            conceptGraph.addEdge(new ConceptEdge(sourceId, targetId, predicate, {
              weight: 1,
              pages: [page],
              evidence: [`Co-occurrence on page ${page}`],
              predicate
            }));
            relationships.push({
              source: { type: e1.type, value: e1.value },
              target: { type: e2.type, value: e2.value },
              predicate,
              page
            });
          }
        }
      }
    }
    for (const block of contentGraph.allBlocks) {
      if (!block.bbox) continue;
      for (const entity of contentGraph.allEntities) {
        if (!entity.bbox) continue;
        if (areBboxesNear2(block.bbox, entity.bbox, 80)) {
          const blockId = `block:${block.type}:${block.page}`;
          const entityId = `${entity.type}:${entity.value}`;
          conceptGraph.addNode(new ConceptNode(
            blockId,
            block.type,
            (block.text || "").substring(0, 100),
            {
              page: block.page,
              bbox: block.bbox
            }
          ));
          conceptGraph.addEdge(new ConceptEdge(blockId, entityId, "contains", {
            weight: 0.8,
            pages: [block.page],
            evidence: [`Entity found within ${block.type} on page ${block.page}`],
            predicate: "contains"
          }));
        }
      }
    }
    for (const block of contentGraph.allBlocks) {
      if (block.type !== "table" || !block.bbox) continue;
      const tableEntities = contentGraph.allEntities.filter(
        (e) => e.bbox && areBboxesNear2(block.bbox, e.bbox, 150)
      );
      const rows = groupEntitiesByRow(tableEntities);
      for (const row of rows) {
        for (let i = 0; i < row.length; i++) {
          for (let j = i + 1; j < row.length; j++) {
            const e1 = row[i];
            const e2 = row[j];
            if (e1.type === e2.type) continue;
            const predicate = inferPredicate(e1, e2) || "same_row";
            const sourceId = `${e1.type}:${e1.value}`;
            const targetId = `${e2.type}:${e2.value}`;
            conceptGraph.addNode(new ConceptNode(sourceId, e1.type, e1.value, {
              page: e1.page,
              bbox: e1.bbox,
              weight: e1.confidence || 0.5
            }));
            conceptGraph.addNode(new ConceptNode(targetId, e2.type, e2.value, {
              page: e2.page,
              bbox: e2.bbox,
              weight: e2.confidence || 0.5
            }));
            conceptGraph.addEdge(new ConceptEdge(sourceId, targetId, predicate, {
              weight: 1.2,
              pages: [e1.page],
              evidence: [`Same table row on page ${e1.page}`],
              predicate
            }));
            relationships.push({
              source: { type: e1.type, value: e1.value },
              target: { type: e2.type, value: e2.value },
              predicate,
              page: e1.page,
              source_type: "table_row"
            });
          }
        }
      }
    }
    for (const block of contentGraph.allBlocks) {
      if (!block.text || !block.bbox) continue;
      const text = block.text;
      const colonMatch = text.match(/^([A-Z][A-Za-z\s]{2,40}):\s*(.+)$/m);
      if (colonMatch) {
        const label = colonMatch[1].trim();
        const value = colonMatch[2].trim();
        for (const entity of contentGraph.allEntities) {
          if (!entity.bbox) continue;
          if (value.toLowerCase().includes((entity.value || "").toLowerCase()) || (entity.value || "").toLowerCase().includes(value.toLowerCase().substring(0, 20))) {
            if (areBboxesNear2(block.bbox, entity.bbox, 100)) {
              const labelId = `label:${label}:${block.page}`;
              const entityId = `${entity.type}:${entity.value}`;
              conceptGraph.addNode(new ConceptNode(labelId, "label", label, {
                page: block.page,
                bbox: block.bbox
              }));
              conceptGraph.addEdge(new ConceptEdge(labelId, entityId, "label_value", {
                weight: 1.5,
                pages: [block.page],
                evidence: [`Label "${label}" associated with value on page ${block.page}`],
                predicate: "label_value"
              }));
              relationships.push({
                source: { type: "label", value: label },
                target: { type: entity.type, value: entity.value },
                predicate: "label_value",
                page: block.page,
                source_type: "label_value"
              });
            }
          }
        }
      }
    }
    const headingsByPage = /* @__PURE__ */ new Map();
    for (const block of contentGraph.allBlocks) {
      if (block.type === "heading" && block.bbox) {
        if (!headingsByPage.has(block.page)) headingsByPage.set(block.page, []);
        headingsByPage.get(block.page).push(block);
      }
    }
    for (const [page, pageHeadings] of headingsByPage) {
      pageHeadings.sort((a, b) => (a.bbox?.[1] || 0) - (b.bbox?.[1] || 0));
      for (let i = 0; i < pageHeadings.length; i++) {
        const heading = pageHeadings[i];
        const headingId = `heading:${heading.text?.substring(0, 50)}:${page}`;
        conceptGraph.addNode(new ConceptNode(headingId, "heading", heading.text || "", {
          page,
          bbox: heading.bbox
        }));
        const nextY = i < pageHeadings.length - 1 ? pageHeadings[i + 1].bbox?.[1] || Infinity : Infinity;
        for (const entity of contentGraph.allEntities) {
          if (entity.page === page && entity.bbox && entity.bbox[1] > (heading.bbox?.[1] || 0) && entity.bbox[1] < nextY) {
            const entityId = `${entity.type}:${entity.value}`;
            conceptGraph.addEdge(new ConceptEdge(headingId, entityId, "heading_section", {
              weight: 0.9,
              pages: [page],
              evidence: [`Entity under heading "${heading.text}" on page ${page}`],
              predicate: "heading_section"
            }));
            relationships.push({
              source: { type: "heading", value: heading.text },
              target: { type: entity.type, value: entity.value },
              predicate: "heading_section",
              page,
              source_type: "heading_hierarchy"
            });
          }
        }
      }
    }
    for (const page of pages || []) {
      const text = page.text || "";
      const acronyms = detectAcronyms(text);
      for (const acr of acronyms) {
        const fullId = `term:${acr.full.toLowerCase()}`;
        const acrId = `term:${acr.acronym.toLowerCase()}`;
        conceptGraph.addNode(new ConceptNode(fullId, "term", acr.full, { page: page.pageNum }));
        conceptGraph.addNode(new ConceptNode(acrId, "term", acr.acronym, { page: page.pageNum }));
        conceptGraph.addEdge(new ConceptEdge(fullId, acrId, "acronym", {
          weight: 1.5,
          pages: [page.pageNum],
          evidence: [`"${acr.full}" defined as "${acr.acronym}"`],
          predicate: "acronym"
        }));
        relationships.push({
          source: { type: "term", value: acr.full },
          target: { type: "term", value: acr.acronym },
          predicate: "acronym",
          page: page.pageNum,
          source_type: "definition"
        });
      }
    }
    const globalEntities = /* @__PURE__ */ new Map();
    for (const entity of contentGraph.allEntities) {
      const key = `${entity.type}:${(entity.value || "").toLowerCase()}`;
      if (globalEntities.has(key)) {
        globalEntities.get(key).pages.push(entity.page);
      } else {
        globalEntities.set(key, {
          type: entity.type,
          value: entity.value,
          pages: [entity.page]
        });
      }
    }
    for (const [key, data] of globalEntities) {
      if (data.pages.length > 1) {
        const nodeId = `${data.type}:${data.value}`;
        conceptGraph.addNode(new ConceptNode(
          nodeId,
          data.type,
          data.value,
          {
            page: data.pages[0],
            weight: data.pages.length,
            occurrences: data.pages.map((p) => ({ page: p }))
          }
        ));
      }
    }
    return relationships;
  }
  function inferPredicate(e1, e2) {
    const t1 = e1.type;
    const t2 = e2.type;
    if (t1 === "person" && t2 === "organization") return "affiliated_with";
    if (t1 === "organization" && t2 === "person") return "employs";
    if (t1 === "person" && t2 === "date") return "associated_with_date";
    if (t1 === "date" && t2 === "person") return "date_of";
    if (t1 === "currency" && t2 === "person") return "payment_to";
    if (t1 === "currency" && t2 === "organization") return "payment_from";
    if (t1 === "person" && t2 === "currency") return "receives";
    if (t1 === "organization" && t2 === "currency") return "charges";
    if (t1 === "address" && t2 === "person") return "residence_of";
    if (t1 === "address" && t2 === "organization") return "headquarters_of";
    if (t1 === "person" && t2 === "address") return "lives_at";
    if (t1 === "organization" && t2 === "address") return "located_at";
    if (t1 === "ordinance_number" && t2 === "date") return "enacted_on";
    if (t1 === "resolution_number" && t2 === "date") return "passed_on";
    return "associated_with";
  }
  var CodbFingerprint = class _CodbFingerprint {
    constructor() {
      this.toc = [];
      this.entityRegistry = /* @__PURE__ */ new Map();
      this.layoutSignature = {
        columnCounts: [],
        pageTypes: {},
        flowPattern: "unknown"
      };
      this.structureProfile = {
        tableCount: 0,
        formCount: 0,
        listCount: 0,
        headingCount: 0
      };
      this.topicVector = {};
      this.relationshipSignature = {};
      this.metadata = {};
    }
    /**
     * Build fingerprint from a DocumentGraph.
     */
    static fromGraph(graph, ir) {
      const fp = new _CodbFingerprint();
      fp.toc = (graph.layout?.getAllHeadings() || []).map((h) => ({
        text: h.text,
        level: h.level,
        page: h.page,
        position: h.y
      }));
      const entities = graph._contentGraph?.allEntities || [];
      for (const entity of entities) {
        const key = `${entity.type}:${(entity.value || "").toLowerCase()}`;
        if (!fp.entityRegistry.has(key)) {
          fp.entityRegistry.set(key, {
            type: entity.type,
            value: entity.value,
            pages: [],
            count: 0
          });
        }
        const entry = fp.entityRegistry.get(key);
        if (!entry.pages.includes(entity.page)) {
          entry.pages.push(entity.page);
        }
        entry.count++;
      }
      fp.layoutSignature.columnCounts = graph.layout?.pages?.map((p) => p.columns) || [];
      const pageTypes = {};
      for (const c of graph.classifications || []) {
        pageTypes[c.type] = (pageTypes[c.type] || 0) + 1;
      }
      fp.layoutSignature.pageTypes = pageTypes;
      fp.layoutSignature.flowPattern = graph.layout?.pages?.[0]?.flow || "unknown";
      fp.structureProfile = {
        tableCount: graph.structure?.tables?.length || 0,
        formCount: graph.structure?.forms?.length || 0,
        listCount: graph.structure?.lists?.length || 0,
        headingCount: fp.toc.length
      };
      fp.topicVector = buildTopicVector(graph);
      const contentGraph = graph._contentGraph;
      if (contentGraph) {
        const relCounts = {};
        for (const block of contentGraph.allBlocks) {
          for (const rel of block.relationships || []) {
            relCounts[rel.type] = (relCounts[rel.type] || 0) + 1;
          }
        }
        fp.relationshipSignature = relCounts;
      }
      fp.metadata = {
        pageCount: graph.pageCount,
        wordCount: graph.text?.wordCount || 0,
        documentType: graph._contentGraph?.documentType?.type || "unknown"
      };
      return fp;
    }
    /**
     * Calculate similarity between two fingerprints.
     * Returns 0.0 to 1.0.
     */
    static similarity(fp1, fp2) {
      let score = 0;
      let weights = 0;
      const toc1 = new Set(fp1.toc.map((h) => h.text.toLowerCase()));
      const toc2 = new Set(fp2.toc.map((h) => h.text.toLowerCase()));
      const tocSim = jaccardSimilarity(toc1, toc2);
      score += tocSim * 3;
      weights += 3;
      const ent1 = new Set(fp1.entityRegistry.keys());
      const ent2 = new Set(fp2.entityRegistry.keys());
      const entSim = jaccardSimilarity(ent1, ent2);
      score += entSim * 2;
      weights += 2;
      const layoutSim = layoutSimilarity(fp1.layoutSignature, fp2.layoutSignature);
      score += layoutSim * 1;
      weights += 1;
      const structSim = structureSimilarity(fp1.structureProfile, fp2.structureProfile);
      score += structSim * 1;
      weights += 1;
      const topicSim = cosineSimilarity(fp1.topicVector, fp2.topicVector);
      score += topicSim * 2;
      weights += 2;
      return weights > 0 ? score / weights : 0;
    }
    toJSON() {
      return {
        toc: this.toc,
        entityRegistry: Object.fromEntries(this.entityRegistry),
        layoutSignature: this.layoutSignature,
        structureProfile: this.structureProfile,
        topicVector: this.topicVector,
        relationshipSignature: this.relationshipSignature,
        metadata: this.metadata
      };
    }
  };
  function bm25Score(query, document2, avgDocLength, k1 = 1.5, b = 0.75) {
    const queryTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    const docTerms = document2.toLowerCase().split(/\s+/);
    const docLength = docTerms.length;
    const tf = {};
    for (const term of docTerms) {
      tf[term] = (tf[term] || 0) + 1;
    }
    let score = 0;
    for (const term of queryTerms) {
      const termFreq = tf[term] || 0;
      if (termFreq === 0) continue;
      const numerator = termFreq * (k1 + 1);
      const denominator = termFreq + k1 * (1 - b + b * docLength / avgDocLength);
      score += numerator / denominator;
    }
    return score;
  }
  function entityScore(query, entities) {
    const queryLower = query.toLowerCase();
    let score = 0;
    for (const entity of entities) {
      const value = (entity.value || "").toLowerCase();
      if (queryLower.includes(value) || value.includes(queryLower)) {
        score += 2;
      } else {
        const queryWords = queryLower.split(/\s+/);
        for (const word of queryWords) {
          if (value.includes(word) && word.length > 2) {
            score += 0.5;
          }
        }
      }
    }
    return score;
  }
  function structureScore(query, blocks, headings) {
    const queryLower = query.toLowerCase();
    let score = 0;
    for (const heading of headings) {
      if (heading.text.toLowerCase().includes(queryLower)) {
        score += 3;
      }
    }
    const typeKeywords = {
      heading: ["title", "heading", "section", "chapter"],
      table: ["table", "data", "spreadsheet", "grid", "column"],
      form_field: ["form", "field", "input", "application", "fill"],
      list: ["list", "items", "bullet", "numbered"],
      invoice_hint: ["invoice", "bill", "payment"],
      receipt_hint: ["receipt", "purchase", "total"],
      signature: ["signature", "signed", "sign here"]
    };
    for (const block of blocks) {
      const keywords = typeKeywords[block.type] || [];
      for (const keyword of keywords) {
        if (queryLower.includes(keyword)) {
          score += 1;
          break;
        }
      }
    }
    return score;
  }
  function hybridSearch(graph, query, options = {}) {
    const {
      maxResults = 20,
      minScore = 0.1,
      includeEvidence = true,
      useExpansion = true,
      rerank = true
    } = options;
    const results = [];
    const contentGraph = graph._contentGraph;
    const fingerprint = graph._fingerprint;
    const conceptGr = graph._conceptGraph;
    const pages2 = graph.text?.pages || [];
    const avgDocLength = pages2.reduce((s, p) => s + (p.text?.length || 0), 0) / (pages2.length || 1);
    const expandedTerms = useExpansion ? expandQuery(query, { includeSynonyms: true, includeStems: true }) : [{ term: query.toLowerCase(), weight: 1, sources: ["original"] }];
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1);
    const docVocab = /* @__PURE__ */ new Set();
    for (const page of pages2) {
      for (const word of (page.text || "").toLowerCase().split(/\s+/)) {
        if (word.length > 2) docVocab.add(word);
      }
    }
    for (const page of pages2) {
      const pageNum = page.pageNum;
      const pageText = page.text || "";
      const pageTextLower = pageText.toLowerCase();
      const signals = {};
      signals.exact = 0;
      for (const term of queryTerms) {
        if (pageTextLower.includes(term)) {
          signals.exact += 2;
        }
      }
      signals.phrase = pageTextLower.includes(queryLower) ? 3 : 0;
      signals.bm25 = bm25Score(query, pageText, avgDocLength);
      signals.fuzzy = 0;
      for (const term of queryTerms) {
        const match = bestFuzzyMatch(term, Array.from(docVocab), 0.7);
        if (match && pageTextLower.includes(match.word)) {
          signals.fuzzy += match.score;
        }
      }
      signals.concept = 0;
      for (const expanded of expandedTerms) {
        if (expanded.weight < 0.5) continue;
        if (pageTextLower.includes(expanded.term)) {
          signals.concept += expanded.weight;
        }
      }
      const pageEntities = contentGraph?.allEntities?.filter((e) => e.page === pageNum) || [];
      signals.entity = entityScore(query, pageEntities);
      const pageBlocks = contentGraph?.allBlocks?.filter((b) => b.page === pageNum) || [];
      const headings = graph.layout?.getHeadings(pageNum) || [];
      signals.structure = structureScore(query, pageBlocks, headings);
      signals.relationship = 0;
      if (conceptGr) {
        for (const term of queryTerms) {
          const nodeId = findConceptNode(conceptGr, term);
          if (nodeId) {
            const neighbors = conceptGr.getNeighbors(nodeId);
            signals.relationship += Math.min(neighbors.length * 0.3, 2);
          }
        }
      }
      signals.spatial = 0;
      if (queryTerms.length >= 2) {
        const termPositions = [];
        for (const term of queryTerms) {
          const idx = pageTextLower.indexOf(term);
          if (idx >= 0) termPositions.push(idx);
        }
        if (termPositions.length >= 2) {
          const spread = Math.max(...termPositions) - Math.min(...termPositions);
          signals.spatial = Math.max(0, 2 - spread / 500);
        }
      }
      signals.context = 0;
      for (const heading of headings) {
        if (heading.text?.toLowerCase().includes(queryLower)) {
          signals.context += 2;
        }
      }
      const pageInfo = graph._pageResults?.[pageNum - 1];
      if (pageInfo?.classification?.type) {
        const classType = pageInfo.classification.type.toLowerCase();
        for (const term of queryTerms) {
          if (classType.includes(term)) signals.context += 1;
        }
      }
      const intent = detectIntent(query);
      const weights = getChannelWeights(intent, queryTerms, pageEntities);
      const compositeScore = signals.exact * weights.exact + signals.phrase * weights.phrase + signals.bm25 * weights.bm25 + signals.fuzzy * weights.fuzzy + signals.concept * weights.concept + signals.entity * weights.entity + signals.structure * weights.structure + signals.relationship * weights.relationship + signals.spatial * weights.spatial + signals.context * weights.context;
      if (compositeScore > minScore) {
        const totalWeighted = Object.keys(signals).reduce((s, k) => s + signals[k] * weights[k], 0) || 1;
        const contributions = {};
        for (const [signal, score] of Object.entries(signals)) {
          contributions[signal] = {
            score,
            weight: weights[signal],
            contribution: score * weights[signal] / totalWeighted
          };
        }
        const evidence = includeEvidence ? buildEvidence(pageText, query, pageEntities, pageBlocks, pageNum) : [];
        results.push({
          page: pageNum,
          score: compositeScore,
          signals,
          contributions,
          text: pageText.substring(0, 500),
          entities: pageEntities.map((e) => ({ type: e.type, value: e.value })),
          evidence
        });
      }
    }
    results.sort((a, b) => b.score - a.score);
    if (rerank && results.length > 6) {
      return rerankResults(results, query, { topK: Math.min(maxResults, 30) }).slice(0, maxResults);
    }
    return results.slice(0, maxResults);
  }
  function getChannelWeights(intent, queryTerms, entities) {
    const defaults = {
      exact: 0.15,
      phrase: 0.12,
      bm25: 0.2,
      fuzzy: 0.05,
      concept: 0.1,
      entity: 0.15,
      structure: 0.08,
      relationship: 0.05,
      spatial: 0.05,
      context: 0.05
    };
    if (!intent) return defaults;
    switch (intent.type) {
      case QueryIntent.ENTITY_SEARCH:
        return { ...defaults, entity: 0.3, exact: 0.2, bm25: 0.1, structure: 0.05 };
      case QueryIntent.RELATIONSHIP_LOOKUP:
        return { ...defaults, relationship: 0.25, entity: 0.2, concept: 0.15, bm25: 0.1 };
      case QueryIntent.TABLE_QUERY:
        return { ...defaults, structure: 0.25, entity: 0.15, exact: 0.15, bm25: 0.15 };
      case QueryIntent.COMPARISON:
        return { ...defaults, entity: 0.2, bm25: 0.2, structure: 0.15, concept: 0.1 };
      case QueryIntent.AGGREGATION:
        return { ...defaults, entity: 0.25, bm25: 0.15, structure: 0.15, exact: 0.1 };
      case QueryIntent.COUNT:
        return { ...defaults, entity: 0.2, bm25: 0.15, structure: 0.15, exact: 0.15 };
      case QueryIntent.STRUCTURAL_QUERY:
        return { ...defaults, structure: 0.3, context: 0.2, bm25: 0.1 };
      case QueryIntent.SUMMARY:
        return { ...defaults, bm25: 0.25, concept: 0.15, context: 0.15, structure: 0.1 };
      default:
        return defaults;
    }
  }
  function findConceptNode(conceptGraph, term) {
    const lower = term.toLowerCase();
    for (const [id, node] of conceptGraph.nodes) {
      if (node.text.toLowerCase() === lower || id.toLowerCase().includes(lower)) {
        return id;
      }
    }
    return null;
  }
  function rerankResults(results, query, options = {}) {
    const { topK = 30 } = options;
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1);
    const expandedTerms = expandQuery(query, { includeSynonyms: true, includeStems: true });
    const expandedText = expandedTerms.map((e) => e.term).join(" ");
    const candidates = results.slice(0, topK);
    const reranked = candidates.map((result) => {
      let rerankScore = result.score;
      const bonuses = {};
      const activeSignals = Object.values(result.signals || {}).filter((s) => s > 0).length;
      bonuses.multiSignal = activeSignals >= 3 ? 0.15 : activeSignals >= 2 ? 0.08 : 0;
      if (result.entities?.length > 0) {
        for (const entity of result.entities) {
          const entityVal = (entity.value || "").toLowerCase();
          if (queryLower.includes(entityVal)) {
            bonuses.exactEntity = 0.25;
            break;
          }
        }
      }
      if (result.signals?.concept > 1) {
        bonuses.conceptAgreement = 0.1;
      }
      if (result.signals?.structure > 2) {
        bonuses.structuralRelevance = 0.1;
      }
      if ((result.text || "").length < 50) {
        bonuses.shortPenalty = -0.1;
      }
      if (queryTerms.some((t) => /amount|cost|price|date|who|address/i.test(t)) && (!result.entities || result.entities.length === 0)) {
        bonuses.noEntityPenalty = -0.15;
      }
      const totalBonus = Object.values(bonuses).reduce((s, v) => s + v, 0);
      return {
        ...result,
        score: rerankScore + totalBonus,
        rerankBonuses: bonuses,
        explanation: [
          ...Object.entries(bonuses).filter(([, v]) => v !== 0).map(([k, v]) => `${k}: ${v > 0 ? "+" : ""}${v.toFixed(2)}`)
        ]
      };
    });
    reranked.sort((a, b) => b.score - a.score);
    return reranked;
  }
  var QueryIntent = {
    FACTUAL_LOOKUP: "factual_lookup",
    ENTITY_SEARCH: "entity_search",
    RELATIONSHIP_LOOKUP: "relationship_lookup",
    AGGREGATION: "aggregation",
    TABLE_QUERY: "table_query",
    SPATIAL_QUERY: "spatial_query",
    STRUCTURAL_QUERY: "structural_query",
    SUMMARY: "summary",
    COUNT: "count",
    COMPARISON: "comparison",
    UNKNOWN: "unknown"
  };
  function detectIntent(query) {
    const lower = query.toLowerCase().trim();
    if (/^(how many|count|number of|total)/i.test(lower)) {
      return { type: QueryIntent.COUNT, confidence: 0.9 };
    }
    if (/^(what is the (total|sum|amount)|sum of|add up)/i.test(lower)) {
      return { type: QueryIntent.AGGREGATION, confidence: 0.85 };
    }
    if (/^(what is the (highest|lowest|maximum|minimum|max|min)|most|least|highest|lowest)/i.test(lower)) {
      return { type: QueryIntent.AGGREGATION, confidence: 0.85 };
    }
    if (/^(who|whom|which|what).*(approved|signed|authorized|created|wrote|submitted)/i.test(lower)) {
      return { type: QueryIntent.RELATIONSHIP_LOOKUP, confidence: 0.8 };
    }
    if (/table|column|row|cell|data|spreadsheet|grid/i.test(lower)) {
      return { type: QueryIntent.TABLE_QUERY, confidence: 0.85 };
    }
    if (/^(where|what is the address|location|street)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.8, entityType: "address" };
    }
    if (/^(when|what date|date of)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: "date" };
    }
    if (/^(who is|who are|person|name|author)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: "person" };
    }
    if (/^(how much|what is the (amount|cost|price|total)|money|budget)/i.test(lower)) {
      return { type: QueryIntent.ENTITY_SEARCH, confidence: 0.85, entityType: "currency" };
    }
    if (/^(list|what are) (the )?(sections|headings|chapters|topics)/i.test(lower)) {
      return { type: QueryIntent.STRUCTURAL_QUERY, confidence: 0.8 };
    }
    if (/compare|versus|vs\.?|difference between/i.test(lower)) {
      return { type: QueryIntent.COMPARISON, confidence: 0.7 };
    }
    if (/^(summary|summarize|overview|what is (this|the document)|brief)/i.test(lower)) {
      return { type: QueryIntent.SUMMARY, confidence: 0.9 };
    }
    if (/\?/.test(lower) || /^(what|where|when|who|why|how)/i.test(lower)) {
      return { type: QueryIntent.FACTUAL_LOOKUP, confidence: 0.7 };
    }
    return { type: QueryIntent.UNKNOWN, confidence: 0.3 };
  }
  function decomposeQuery(query) {
    const lower = query.toLowerCase();
    const subQueries = [];
    const parts = lower.split(/\s+and\s+|\s+also\s+|\s+as well as\s+/);
    if (parts.length > 1) {
      for (const part of parts) {
        subQueries.push({
          query: part.trim(),
          intent: detectIntent(part.trim())
        });
      }
    }
    const entityPatterns = [
      { pattern: /\$[\d,]+(?:\.\d{2})?/g, type: "currency" },
      { pattern: /\b\d{1,5}\s+[\w\s]+(?:Street|St|Avenue|Ave|Blvd|Road|Rd)/gi, type: "address" },
      { pattern: /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g, type: "date" }
    ];
    for (const { pattern, type } of entityPatterns) {
      const matches = lower.match(pattern);
      if (matches) {
        for (const match of matches) {
          subQueries.push({
            query: match,
            intent: { type: QueryIntent.ENTITY_SEARCH, confidence: 0.9, entityType: type }
          });
        }
      }
    }
    return subQueries.length > 0 ? subQueries : [{ query, intent: detectIntent(query) }];
  }
  function buildEvidence(pageText, query, entities, blocks, pageNum) {
    const evidence = [];
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1);
    const expandedTerms = expandQuery(query, { includeSynonyms: true, includeStems: false });
    const sentences = pageText.split(/[.!?]+/).filter((s) => s.trim().length > 10);
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      const matchCount = queryTerms.filter((t) => sentenceLower.includes(t)).length;
      if (matchCount > 0) {
        evidence.push({
          type: "text_snippet",
          signal: "exact",
          text: sentence.trim().substring(0, 200),
          page: pageNum,
          relevance: matchCount / queryTerms.length,
          contribution: matchCount / queryTerms.length * 0.3
        });
      }
    }
    for (const entity of entities) {
      const value = (entity.value || "").toLowerCase();
      if (queryLower.includes(value) || value.includes(queryLower)) {
        evidence.push({
          type: "entity",
          signal: "entity",
          entity: { type: entity.type, value: entity.value },
          page: pageNum,
          bbox: entity.bbox,
          relevance: 0.9,
          contribution: 0.35
        });
      }
    }
    for (const block of blocks) {
      if (block.text && block.text.toLowerCase().includes(queryLower)) {
        evidence.push({
          type: "block",
          signal: "structure",
          blockType: block.type,
          text: block.text.substring(0, 100),
          page: pageNum,
          bbox: block.bbox,
          relevance: 0.7,
          contribution: 0.2
        });
      }
    }
    for (const expanded of expandedTerms) {
      if (expanded.weight < 0.5) continue;
      const lower = expanded.term.toLowerCase();
      if (pageText.toLowerCase().includes(lower)) {
        evidence.push({
          type: "concept",
          signal: "concept",
          term: expanded.term,
          weight: expanded.weight,
          sources: expanded.sources,
          page: pageNum,
          relevance: expanded.weight * 0.6,
          contribution: 0.15
        });
      }
    }
    evidence.sort((a, b) => b.relevance - a.relevance);
    const totalContribution = evidence.reduce((s, e) => s + (e.contribution || 0), 0);
    if (totalContribution > 0) {
      for (const e of evidence) {
        e.contribution = (e.contribution || 0) / totalContribution;
      }
    }
    return evidence.slice(0, 8);
  }
  function rankResults(results, query) {
    const intent = detectIntent(query);
    const queryLower = query.toLowerCase();
    return results.map((result) => {
      const explanation = [];
      const reasons = [];
      if (result.contributions) {
        for (const [signal, data] of Object.entries(result.contributions)) {
          if (data.contribution > 0.05) {
            reasons.push({
              signal,
              score: data.score,
              weight: data.weight,
              contribution: data.contribution
            });
            explanation.push(`${signal}: ${(data.contribution * 100).toFixed(1)}%`);
          }
        }
      }
      if (intent.type === QueryIntent.ENTITY_SEARCH && result.entities?.length > 0) {
        const matchingEntities = result.entities.filter(
          (e) => e.value?.toLowerCase().includes(queryLower)
        );
        if (matchingEntities.length > 0) {
          reasons.push({ signal: "exact_entity_match", value: matchingEntities[0].value, contribution: 0.25 });
          explanation.push(`Exact ${intent.entityType || "entity"} match: ${matchingEntities[0].value}`);
        }
      }
      if (intent.type === QueryIntent.TABLE_QUERY && result.signals?.structure > 0) {
        reasons.push({ signal: "table_structure", contribution: 0.15 });
        explanation.push("Contains table structure");
      }
      if (intent.type === QueryIntent.RELATIONSHIP_LOOKUP && result.signals?.relationship > 0) {
        reasons.push({ signal: "relationship_evidence", contribution: 0.2 });
        explanation.push("Contains relationship evidence");
      }
      return {
        ...result,
        explanation,
        reasons,
        intent,
        confidence: Math.min(result.score * 1.2, 1)
      };
    });
  }
  function operatorCount(graph, criteria) {
    const { entityType, blockType, page, textContains } = criteria;
    let items = [];
    if (entityType) {
      items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    } else if (blockType) {
      items = graph._contentGraph?.allBlocks?.filter((b) => b.type === blockType) || [];
    }
    if (page) {
      items = items.filter((i) => i.page === page);
    }
    if (textContains) {
      const lower = textContains.toLowerCase();
      items = items.filter(
        (i) => (i.value || "").toLowerCase().includes(lower) || (i.text || "").toLowerCase().includes(lower)
      );
    }
    return {
      operator: "COUNT",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorSum(graph, criteria) {
    const { entityType = "currency", page, filter } = criteria;
    let items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    if (page) {
      items = items.filter((i) => i.page === page);
    }
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const total = items.reduce((sum, item) => {
      const num = parseFloat((item.value || "").replace(/[$,]/g, ""));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
    return {
      operator: "SUM",
      result: total,
      formattedResult: `$${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      itemCount: items.length,
      items,
      criteria
    };
  }
  function operatorMax(graph, criteria) {
    const { entityType = "currency", page, filter } = criteria;
    let items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    if (page) items = items.filter((i) => i.page === page);
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const withValues = items.map((item) => ({
      ...item,
      numericValue: parseFloat((item.value || "").replace(/[$,]/g, ""))
    })).filter((item) => !isNaN(item.numericValue));
    if (withValues.length === 0) {
      return { operator: "MAX", result: null, items: [], criteria };
    }
    withValues.sort((a, b) => b.numericValue - a.numericValue);
    return {
      operator: "MAX",
      result: withValues[0].numericValue,
      formattedResult: `$${withValues[0].numericValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      item: withValues[0],
      allValues: withValues.map((i) => ({ value: i.numericValue, text: i.value, page: i.page })),
      criteria
    };
  }
  function operatorMin(graph, criteria) {
    const { entityType = "currency", page, filter } = criteria;
    let items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    if (page) items = items.filter((i) => i.page === page);
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const withValues = items.map((item) => ({
      ...item,
      numericValue: parseFloat((item.value || "").replace(/[$,]/g, ""))
    })).filter((item) => !isNaN(item.numericValue));
    if (withValues.length === 0) {
      return { operator: "MIN", result: null, items: [], criteria };
    }
    withValues.sort((a, b) => a.numericValue - b.numericValue);
    return {
      operator: "MIN",
      result: withValues[0].numericValue,
      formattedResult: `$${withValues[0].numericValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      item: withValues[0],
      allValues: withValues.map((i) => ({ value: i.numericValue, text: i.value, page: i.page })),
      criteria
    };
  }
  function operatorAvg(graph, criteria) {
    const { entityType = "currency", page, filter } = criteria;
    let items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    if (page) items = items.filter((i) => i.page === page);
    if (filter) {
      items = items.filter((i) => {
        const value = (i.value || "").toLowerCase();
        return filter.toLowerCase().split(/\s+/).some((word) => value.includes(word));
      });
    }
    const withValues = items.map((item) => ({
      ...item,
      numericValue: parseFloat((item.value || "").replace(/[$,]/g, ""))
    })).filter((item) => !isNaN(item.numericValue));
    if (withValues.length === 0) {
      return { operator: "AVG", result: null, itemCount: 0, criteria };
    }
    const total = withValues.reduce((s, i) => s + i.numericValue, 0);
    const avg = total / withValues.length;
    return {
      operator: "AVG",
      result: avg,
      formattedResult: `$${avg.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      itemCount: withValues.length,
      total,
      items: withValues,
      criteria
    };
  }
  function operatorBefore(graph, criteria) {
    const { entityType = "date", referenceDate, page } = criteria;
    let items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    if (page) items = items.filter((i) => i.page <= page);
    if (referenceDate) {
      const refTime = new Date(referenceDate).getTime();
      items = items.filter((i) => {
        const itemTime = new Date(i.value).getTime();
        return !isNaN(itemTime) && itemTime < refTime;
      });
    }
    return {
      operator: "BEFORE",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorAfter(graph, criteria) {
    const { entityType = "date", referenceDate, page } = criteria;
    let items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    if (page) items = items.filter((i) => i.page >= page);
    if (referenceDate) {
      const refTime = new Date(referenceDate).getTime();
      items = items.filter((i) => {
        const itemTime = new Date(i.value).getTime();
        return !isNaN(itemTime) && itemTime > refTime;
      });
    }
    return {
      operator: "AFTER",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorBetween(graph, criteria) {
    const { entityType = "currency", low, high, page } = criteria;
    let items = graph._contentGraph?.allEntities?.filter((e) => e.type === entityType) || [];
    if (page) items = items.filter((i) => i.page === page);
    items = items.filter((i) => {
      const numVal = parseFloat((i.value || "").replace(/[$,]/g, ""));
      if (!isNaN(numVal) && low !== void 0 && high !== void 0) {
        return numVal >= low && numVal <= high;
      }
      const dateVal = new Date(i.value).getTime();
      if (!isNaN(dateVal) && low !== void 0 && high !== void 0) {
        const lowTime = new Date(low).getTime();
        const highTime = new Date(high).getTime();
        return dateVal >= lowTime && dateVal <= highTime;
      }
      return false;
    });
    return {
      operator: "BETWEEN",
      result: items.length,
      items,
      criteria
    };
  }
  function operatorGroupBy(graph, criteria) {
    const { entityType, groupBy = "page" } = criteria;
    let items = graph._contentGraph?.allEntities || [];
    if (entityType) {
      items = items.filter((i) => i.type === entityType);
    }
    const groups = /* @__PURE__ */ new Map();
    for (const item of items) {
      let key;
      switch (groupBy) {
        case "page":
          key = `page_${item.page}`;
          break;
        case "type":
          key = item.type;
          break;
        case "value":
          key = (item.value || "").substring(0, 20);
          break;
        default:
          key = "all";
      }
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }
    const result = {};
    for (const [key, groupItems] of groups) {
      result[key] = {
        count: groupItems.length,
        items: groupItems
      };
    }
    return {
      operator: "GROUP_BY",
      result,
      groupCount: groups.size,
      totalItems: items.length,
      criteria
    };
  }
  function executeReasoning(graph, query) {
    const lower = query.toLowerCase();
    const intent = detectIntent(query);
    if (intent.type === QueryIntent.COUNT) {
      const criteria = {};
      if (/ordinance/i.test(lower)) criteria.entityType = "ordinance_number";
      else if (/resolution/i.test(lower)) criteria.entityType = "resolution_number";
      else if (/permit/i.test(lower)) criteria.entityType = "permit_number";
      else if (/person|people|name/i.test(lower)) criteria.entityType = "person";
      else if (/organization|department|company/i.test(lower)) criteria.entityType = "organization";
      else if (/date/i.test(lower)) criteria.entityType = "date";
      else if (/email/i.test(lower)) criteria.entityType = "email";
      else if (/phone/i.test(lower)) criteria.entityType = "phone";
      else if (/address/i.test(lower)) criteria.entityType = "address";
      else if (/currency|amount|dollar|\$/i.test(lower)) criteria.entityType = "currency";
      else if (/table/i.test(lower)) criteria.blockType = "table";
      else if (/form/i.test(lower)) criteria.blockType = "form_field";
      else if (/heading|section/i.test(lower)) criteria.blockType = "heading";
      const result = operatorCount(graph, criteria);
      return {
        answer: `Found ${result.result} ${criteria.entityType || criteria.blockType || "items"}.`,
        confidence: 0.9,
        evidence: result.items.slice(0, 5).map((i) => ({
          text: i.value || i.text,
          page: i.page,
          type: i.type
        })),
        reasoning: { intent: QueryIntent.COUNT, operator: "COUNT", criteria, result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /total|sum/i.test(lower)) {
      const criteria = { entityType: "currency" };
      const filterWords = lower.replace(/(what is the|total|sum|of|for|in|all)\s*/g, "").trim();
      if (filterWords.length > 2) criteria.filter = filterWords;
      const result = operatorSum(graph, criteria);
      return {
        answer: result.itemCount > 0 ? `The total is ${result.formattedResult} (from ${result.itemCount} value(s)).` : "No monetary values found matching this query.",
        confidence: 0.85,
        evidence: result.items.slice(0, 5).map((i) => ({ text: i.value, page: i.page })),
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "SUM", criteria, result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /average|avg|mean/i.test(lower)) {
      const criteria = { entityType: "currency" };
      const filterWords = lower.replace(/(what is the|average|avg|mean|of|for|in|all)\s*/g, "").trim();
      if (filterWords.length > 2) criteria.filter = filterWords;
      const result = operatorAvg(graph, criteria);
      return {
        answer: result.itemCount > 0 ? `The average is ${result.formattedResult} (from ${result.itemCount} value(s)).` : "No monetary values found matching this query.",
        confidence: 0.85,
        evidence: result.items?.slice(0, 5).map((i) => ({ text: i.value, page: i.page })) || [],
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "AVG", criteria, result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /highest|maximum|max|most/i.test(lower)) {
      const result = operatorMax(graph, { entityType: "currency" });
      return {
        answer: result.result !== null ? `The highest value is ${result.formattedResult}.` : "No monetary values found.",
        confidence: 0.85,
        evidence: result.item ? [{ text: result.item.value, page: result.item.page }] : [],
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "MAX", result: result.result }
      };
    }
    if (intent.type === QueryIntent.AGGREGATION && /lowest|minimum|min|least/i.test(lower)) {
      const result = operatorMin(graph, { entityType: "currency" });
      return {
        answer: result.result !== null ? `The lowest value is ${result.formattedResult}.` : "No monetary values found.",
        confidence: 0.85,
        evidence: result.item ? [{ text: result.item.value, page: result.item.page }] : [],
        reasoning: { intent: QueryIntent.AGGREGATION, operator: "MIN", result: result.result }
      };
    }
    if (/before|earlier|prior|previous|since|after|later|following/i.test(lower)) {
      const isBefore = /before|earlier|prior|previous/i.test(lower);
      const operator = isBefore ? operatorBefore : operatorAfter;
      const dateMatch = lower.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
      const criteria = { entityType: "date" };
      if (dateMatch) criteria.referenceDate = dateMatch[0];
      const result = operator(graph, criteria);
      return {
        answer: `Found ${result.result} date(s) ${isBefore ? "before" : "after"} the reference.`,
        confidence: 0.8,
        evidence: result.items.slice(0, 5).map((i) => ({ text: i.value, page: i.page })),
        reasoning: { intent: intent.type, operator: isBefore ? "BEFORE" : "AFTER", criteria, result: result.result }
      };
    }
    if (/between|from.*to|range/i.test(lower)) {
      const numbers = lower.match(/\d[\d,]*(?:\.\d+)?/g);
      if (numbers && numbers.length >= 2) {
        const low = parseFloat(numbers[0].replace(/,/g, ""));
        const high = parseFloat(numbers[1].replace(/,/g, ""));
        const criteria = { entityType: "currency", low, high };
        const result = operatorBetween(graph, criteria);
        return {
          answer: `Found ${result.result} value(s) between ${low} and ${high}.`,
          confidence: 0.85,
          evidence: result.items.slice(0, 5).map((i) => ({ text: i.value, page: i.page })),
          reasoning: { intent: intent.type, operator: "BETWEEN", criteria, result: result.result }
        };
      }
    }
    if (/group|breakdown|distribution|by (page|type|category)/i.test(lower)) {
      let groupBy = "page";
      if (/by type|by category|per type/i.test(lower)) groupBy = "type";
      let entityType;
      if (/currency|amount|dollar/i.test(lower)) entityType = "currency";
      else if (/person|name/i.test(lower)) entityType = "person";
      else if (/date/i.test(lower)) entityType = "date";
      const result = operatorGroupBy(graph, { entityType, groupBy });
      return {
        answer: `Grouped ${result.totalItems} items into ${result.groupCount} groups by ${groupBy}.`,
        confidence: 0.8,
        evidence: [],
        reasoning: { intent: intent.type, operator: "GROUP_BY", result: result.groupCount }
      };
    }
    return null;
  }
  function jaccardSimilarity(set1, set2) {
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = /* @__PURE__ */ new Set([...set1, ...set2]);
    return union.size > 0 ? intersection.size / union.size : 0;
  }
  function cosineSimilarity(vec1, vec2) {
    const keys1 = Object.keys(vec1);
    const keys2 = Object.keys(vec2);
    const allKeys = /* @__PURE__ */ new Set([...keys1, ...keys2]);
    if (allKeys.size === 0) return 0;
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    for (const key of allKeys) {
      const v1 = vec1[key] || 0;
      const v2 = vec2[key] || 0;
      dotProduct += v1 * v2;
      norm1 += v1 * v1;
      norm2 += v2 * v2;
    }
    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
    return denominator > 0 ? dotProduct / denominator : 0;
  }
  function layoutSimilarity(l1, l2) {
    const types1 = Object.keys(l1.pageTypes);
    const types2 = Object.keys(l2.pageTypes);
    const allTypes = /* @__PURE__ */ new Set([...types1, ...types2]);
    if (allTypes.size === 0) return 1;
    let similarity = 0;
    for (const type of allTypes) {
      const v1 = l1.pageTypes[type] || 0;
      const v2 = l2.pageTypes[type] || 0;
      similarity += 1 - Math.abs(v1 - v2) / Math.max(v1 + v2, 1);
    }
    return similarity / allTypes.size;
  }
  function structureSimilarity(s1, s2) {
    const fields = ["tableCount", "formCount", "listCount", "headingCount"];
    let similarity = 0;
    for (const field of fields) {
      const v1 = s1[field] || 0;
      const v2 = s2[field] || 0;
      similarity += 1 - Math.abs(v1 - v2) / Math.max(v1 + v2, 1);
    }
    return similarity / fields.length;
  }
  function buildTopicVector(graph) {
    const vector = {};
    const headings = graph.layout?.getAllHeadings() || [];
    for (const heading of headings) {
      const words = heading.text.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      for (const word of words) {
        vector[word] = (vector[word] || 0) + 2;
      }
    }
    const entities = graph._contentGraph?.allEntities || [];
    for (const entity of entities) {
      const words = (entity.value || "").toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      for (const word of words) {
        vector[word] = (vector[word] || 0) + 1;
      }
    }
    const blocks = graph._contentGraph?.allBlocks || [];
    for (const block of blocks.slice(0, 50)) {
      const words = (block.text || "").toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      for (const word of words) {
        vector[word] = (vector[word] || 0) + 0.5;
      }
    }
    const maxVal = Math.max(...Object.values(vector), 1);
    for (const key of Object.keys(vector)) {
      vector[key] = vector[key] / maxVal;
    }
    return vector;
  }
  function areBboxesNear2(bbox1, bbox2, threshold) {
    const cx1 = bbox1[0] + bbox1[2] / 2;
    const cy1 = bbox1[1] + bbox1[3] / 2;
    const cx2 = bbox2[0] + bbox2[2] / 2;
    const cy2 = bbox2[1] + bbox2[3] / 2;
    const dist = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
    return dist < threshold;
  }
  function groupEntitiesByRow(entities) {
    if (entities.length === 0) return [];
    const sorted = [...entities].sort((a, b) => (a.bbox?.[1] || 0) - (b.bbox?.[1] || 0));
    const rows = [];
    let currentRow = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      if (Math.abs((curr.bbox?.[1] || 0) - (prev.bbox?.[1] || 0)) < 15) {
        currentRow.push(curr);
      } else {
        rows.push(currentRow);
        currentRow = [curr];
      }
    }
    rows.push(currentRow);
    return rows;
  }
  function buildTableObjects(contentGraph, conceptGraph) {
    const tables = [];
    const tableBlocks = contentGraph.allBlocks.filter((b) => b.type === "table");
    for (const block of tableBlocks) {
      if (!block.bbox) continue;
      const cellTexts = contentGraph.allBlocks.filter(
        (b) => b.bbox && b.type !== "table" && b.bbox[0] >= block.bbox[0] - 10 && b.bbox[1] >= block.bbox[1] - 10 && b.bbox[0] + (b.bbox[2] || 0) <= block.bbox[0] + block.bbox[2] + 10 && b.bbox[1] + (b.bbox[3] || 0) <= block.bbox[1] + block.bbox[3] + 10
      ).sort((a, b) => {
        const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
        if (Math.abs(yDiff) > 10) return yDiff;
        return (a.bbox[0] || 0) - (b.bbox[0] || 0);
      });
      const cellRows = [];
      let currentRow = cellTexts.length > 0 ? [cellTexts[0]] : [];
      for (let i = 1; i < cellTexts.length; i++) {
        const prev = cellTexts[i - 1];
        const curr = cellTexts[i];
        if (Math.abs((curr.bbox?.[1] || 0) - (prev.bbox?.[1] || 0)) < 10) {
          currentRow.push(curr);
        } else {
          cellRows.push(currentRow);
          currentRow = [curr];
        }
      }
      if (currentRow.length > 0) cellRows.push(currentRow);
      if (cellRows.length === 0) continue;
      const headers = cellRows[0].map((cell) => (cell.text || "").trim());
      const rows = cellRows.slice(1).map(
        (row) => row.map((cell) => (cell.text || "").trim())
      );
      const tableEntities = (contentGraph.allEntities || []).filter(
        (e) => e.bbox && areBboxesNear2(block.bbox, e.bbox, 150)
      );
      const table = {
        id: `table_${block.page}_${block.bbox[0]}_${block.bbox[1]}`,
        page: block.page,
        bbox: block.bbox,
        headers,
        rows,
        rowCount: rows.length,
        colCount: headers.length,
        entities: tableEntities.map((e) => ({ type: e.type, value: e.value, bbox: e.bbox })),
        text: block.text || "",
        relationships: []
      };
      const entityRows = groupEntitiesByRow(tableEntities.filter((e) => e.bbox));
      for (const row of entityRows) {
        for (let i = 0; i < row.length; i++) {
          for (let j = i + 1; j < row.length; j++) {
            table.relationships.push({
              source: { type: row[i].type, value: row[i].value },
              target: { type: row[j].type, value: row[j].value },
              predicate: "same_row"
            });
          }
        }
      }
      tables.push(table);
    }
    return tables;
  }
  function queryTable(table, conditions) {
    if (!table || !table.rows || table.rows.length === 0) return [];
    const { column, gt, lt, eq, contains, where } = conditions || {};
    let results = table.rows.map((row, idx) => {
      const obj = {};
      for (let c = 0; c < table.headers.length; c++) {
        obj[table.headers[c]] = row[c] || "";
      }
      obj._rowIndex = idx;
      return obj;
    });
    if (column && gt !== void 0) {
      results = results.filter((row) => {
        const val = parseFloat((row[column] || "").replace(/[$,]/g, ""));
        return !isNaN(val) && val > gt;
      });
    }
    if (column && lt !== void 0) {
      results = results.filter((row) => {
        const val = parseFloat((row[column] || "").replace(/[$,]/g, ""));
        return !isNaN(val) && val < lt;
      });
    }
    if (column && eq !== void 0) {
      results = results.filter((row) => row[column] === eq);
    }
    if (column && contains) {
      results = results.filter((row) => (row[column] || "").toLowerCase().includes(contains.toLowerCase()));
    }
    if (where) {
      for (const [col, condition] of Object.entries(where)) {
        if (condition.gt !== void 0) {
          results = results.filter((row) => {
            const val = parseFloat((row[col] || "").replace(/[$,]/g, ""));
            return !isNaN(val) && val > condition.gt;
          });
        }
        if (condition.lt !== void 0) {
          results = results.filter((row) => {
            const val = parseFloat((row[col] || "").replace(/[$,]/g, ""));
            return !isNaN(val) && val < condition.lt;
          });
        }
      }
    }
    return results;
  }

  // src/docaccess.js
  function escapeHTML2(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function wcagAudit(ir) {
    const issues = [];
    let score = 100;
    const criteria = {};
    criteria["1.1.1"] = { name: "Non-text Content", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (!obj) continue;
        if (obj.type === "image") {
          if (!obj.accessibility?.alt && obj.accessibility?.alt !== "") {
            criteria["1.1.1"].status = "fail";
            criteria["1.1.1"].issues.push(objId);
            issues.push({
              type: "missing_alt_text",
              wcag: "1.1.1",
              page: pageNum,
              element: objId,
              severity: "error",
              message: "Image has no alternative text",
              suggestion: 'Add descriptive alt text or mark as decorative (alt="")'
            });
            score -= 5;
          }
        }
      }
    }
    criteria["1.3.1"] = { name: "Info and Relationships", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      const headings = (page.content || []).map((id) => ir.objects[id]).filter((obj) => obj?.semantic?.role === "heading");
      let prevLevel = 0;
      for (const heading of headings) {
        const level2 = heading.semantic.level || 1;
        if (level2 > prevLevel + 1 && prevLevel > 0) {
          criteria["1.3.1"].status = "fail";
          criteria["1.3.1"].issues.push(heading.id);
          issues.push({
            type: "heading_skip",
            wcag: "1.3.1",
            page: pageNum,
            element: heading.id,
            severity: "warning",
            message: `Heading level skipped from H${prevLevel} to H${level2}`,
            suggestion: `Use H${prevLevel + 1} instead`
          });
          score -= 2;
        }
        prevLevel = level2;
      }
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (obj?.semantic?.role === "table") {
          if (!obj.semantic?.caption && !obj.accessibility?.summary) {
            criteria["1.3.1"].status = "fail";
            criteria["1.3.1"].issues.push(objId);
            issues.push({
              type: "table_no_caption",
              wcag: "1.3.1",
              page: pageNum,
              element: objId,
              severity: "warning",
              message: "Table has no caption or summary",
              suggestion: "Add a <caption> element describing the table"
            });
            score -= 2;
          }
        }
        if (obj?.semantic?.role === "list") {
          const items = obj.semantic?.items || [];
          if (items.length === 0) {
            criteria["1.3.1"].status = "fail";
            issues.push({
              type: "empty_list",
              wcag: "1.3.1",
              page: pageNum,
              element: objId,
              severity: "warning",
              message: "List has no items",
              suggestion: "Add list items or remove the empty list"
            });
            score -= 1;
          }
        }
      }
    }
    criteria["1.4.3"] = { name: "Contrast (Minimum)", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (obj?.type === "text" && obj.raw?.color && obj.raw?.bgColor) {
          const ratio = computeContrastRatio(obj.raw.color, obj.raw.bgColor);
          if (ratio < 4.5) {
            criteria["1.4.3"].status = "fail";
            criteria["1.4.3"].issues.push(objId);
            issues.push({
              type: "low_contrast",
              wcag: "1.4.3",
              page: parseInt(pageId.split("_")[1]),
              element: objId,
              severity: "warning",
              message: `Text contrast ratio ${ratio.toFixed(2)}:1 is below 4.5:1 minimum`,
              suggestion: "Increase contrast between text and background colors"
            });
            score -= 3;
          }
        }
      }
    }
    criteria["1.4.11"] = { name: "Non-text Contrast", status: "pass", issues: [] };
    criteria["2.1.1"] = { name: "Keyboard", status: "pass", issues: [] };
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (obj?.semantic?.role === "form_field" || obj?.semantic?.role === "link") {
        if (obj.accessibility?.tabindex === -1) {
          criteria["2.1.1"].status = "fail";
          issues.push({
            type: "keyboard_trap",
            wcag: "2.1.1",
            element: id,
            severity: "error",
            message: "Interactive element is not keyboard accessible",
            suggestion: 'Remove tabindex="-1" or ensure element can be reached via keyboard'
          });
          score -= 5;
        }
      }
    }
    criteria["2.4.1"] = { name: "Bypass Blocks", status: "pass", issues: [] };
    criteria["2.4.2"] = { name: "Page Titled", status: "pass", issues: [] };
    if (!ir.document.metadata?.title) {
      criteria["2.4.2"].status = "fail";
      issues.push({
        type: "missing_title",
        wcag: "2.4.2",
        severity: "error",
        message: "Document has no title",
        suggestion: "Add a descriptive <title> element"
      });
      score -= 5;
    }
    criteria["2.4.6"] = { name: "Headings and Labels", status: "pass", issues: [] };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      for (const objId of page.content || []) {
        const obj = ir.objects[objId];
        if (obj?.semantic?.role === "heading" && (!obj.semantic?.text || obj.semantic.text.trim() === "")) {
          criteria["2.4.6"].status = "fail";
          issues.push({
            type: "empty_heading",
            wcag: "2.4.6",
            page: parseInt(pageId.split("_")[1]),
            element: objId,
            severity: "warning",
            message: "Heading element has no text content",
            suggestion: "Add descriptive text to the heading"
          });
          score -= 2;
        }
      }
    }
    criteria["3.1.1"] = { name: "Language of Page", status: "pass", issues: [] };
    if (!ir.document.metadata?.language) {
      criteria["3.1.1"].status = "fail";
      issues.push({
        type: "missing_language",
        wcag: "3.1.1",
        severity: "error",
        message: "Document language is not specified",
        suggestion: "Set the lang attribute on the <html> element"
      });
      score -= 5;
    }
    criteria["3.1.2"] = { name: "Language of Parts", status: "pass", issues: [] };
    criteria["4.1.2"] = { name: "Name, Role, Value", status: "pass", issues: [] };
    for (const [id, obj] of Object.entries(ir.objects)) {
      if (obj?.semantic?.role === "form_field") {
        if (!obj.accessibility?.label && !obj.accessibility?.labelledby) {
          criteria["4.1.2"].status = "fail";
          issues.push({
            type: "form_no_label",
            wcag: "4.1.2",
            element: id,
            severity: "error",
            message: "Form field has no accessible label",
            suggestion: "Add an aria-label or associate a <label> element"
          });
          score -= 5;
        }
      }
    }
    const hasErrors = issues.some((i) => i.severity === "error");
    const hasWarnings = issues.some((i) => i.severity === "warning");
    let level = "AAA";
    if (score < 60) level = "fail";
    else if (score < 80 || hasErrors) level = "A";
    else if (score < 95 || hasWarnings) level = "AA";
    return {
      score: Math.max(0, score),
      level,
      issues,
      wcagCriteria: criteria,
      summary: {
        totalIssues: issues.length,
        errors: issues.filter((i) => i.severity === "error").length,
        warnings: issues.filter((i) => i.severity === "warning").length,
        info: issues.filter((i) => i.severity === "info").length,
        criteriaMet: Object.values(criteria).filter((c) => c.status === "pass").length,
        criteriaTotal: Object.keys(criteria).length
      }
    };
  }
  function parseColor(color) {
    if (!color) return null;
    if (Array.isArray(color)) {
      return { r: color[0] || 0, g: color[1] || 0, b: color[2] || 0 };
    }
    if (typeof color === "string") {
      const hex = color.replace("#", "");
      if (hex.length === 6) {
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16)
        };
      }
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
      }
    }
    return null;
  }
  function relativeLuminance({ r, g, b }) {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  function computeContrastRatio(fg, bg) {
    const fgColor = parseColor(fg);
    const bgColor = parseColor(bg);
    if (!fgColor || !bgColor) return 21;
    const l1 = relativeLuminance(fgColor);
    const l2 = relativeLuminance(bgColor);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  function exportAccessibleHTML(ir, options = {}) {
    const {
      mode = "accessible",
      includeSkipNav = true,
      includeLandmarks = true,
      includeKeyboardNav = true,
      includeAriaLive = true,
      enforceHeadingHierarchy = true,
      wrapImagesInFigures = true,
      includeDataAttributes: includeDataAttributes2 = true,
      includeStyles = true,
      customStyles = "",
      lang
    } = options;
    const docLang = lang || ir.document.metadata?.language || "en";
    const title = ir.document.metadata?.title || "Document";
    const author = ir.document.metadata?.author || "";
    let html = "<!DOCTYPE html>\n";
    html += `<html lang="${escapeHTML2(docLang)}">
`;
    html += "<head>\n";
    html += '<meta charset="UTF-8">\n';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += `<title>${escapeHTML2(title)}</title>
`;
    if (author) html += `<meta name="author" content="${escapeHTML2(author)}">
`;
    html += '<meta name="description" content="Accessible document export from CodbDocs">\n';
    if (includeStyles) {
      html += generateAccessibleStyles2();
    }
    if (customStyles) {
      html += `<style>
${customStyles}
</style>
`;
    }
    html += "</head>\n";
    html += "<body>\n";
    if (includeSkipNav) {
      html += generateSkipNav(ir);
    }
    if (includeLandmarks) {
      html += '<header role="banner" aria-label="Document header">\n';
      html += `  <h1>${escapeHTML2(title)}</h1>
`;
      if (author) {
        html += `  <p class="doc-author">By ${escapeHTML2(author)}</p>
`;
      }
      const date = ir.document.metadata?.creationDate || ir.document.metadata?.modDate;
      if (date) {
        html += `  <p class="doc-date"><time datetime="${escapeHTML2(date)}">${escapeHTML2(date)}</time></p>
`;
      }
      html += "</header>\n";
    }
    html += '<main id="main-content" role="main" aria-label="Document content">\n';
    if (includeAriaLive) {
      html += '  <div id="doc-status" role="status" aria-live="polite" class="visually-hidden"></div>\n';
    }
    const pageCount = ir.document.pages.length;
    if (pageCount > 1) {
      html += '  <nav aria-label="Page navigation">\n';
      html += '    <ul class="page-nav">\n';
      for (const pageId of ir.document.pages) {
        const page = ir.pages[pageId];
        if (!page) continue;
        const label = page.labels?.print || `Page ${page.num}`;
        html += `      <li><a href="#${pageId}" aria-label="Go to ${escapeHTML2(label)}">${escapeHTML2(label)}</a></li>
`;
      }
      html += "    </ul>\n";
      html += "  </nav>\n";
    }
    let headingTracker = { current: 0, enforced: enforceHeadingHierarchy };
    for (const pageId of ir.document.pages) {
      const page = ir.pages[pageId];
      if (!page) continue;
      const pageNum = parseInt(pageId.split("_")[1]);
      const pageLabel = page.labels?.print || `Page ${pageNum}`;
      const dataAttr = includeDataAttributes2 ? ` data-pdf-page="${pageNum}" data-pdf-page-id="${pageId}"` : "";
      html += `
  <section id="${pageId}" class="pdf-page"${dataAttr} aria-label="${escapeHTML2(pageLabel)}">
`;
      html += `    <h2 class="page-heading" aria-label="${escapeHTML2(pageLabel)}">${escapeHTML2(pageLabel)}</h2>
`;
      html += renderAccessiblePage(page, ir, {
        pageNum,
        includeDataAttributes: includeDataAttributes2,
        enforceHeadingHierarchy,
        headingTracker,
        wrapImagesInFigures,
        mode
      });
      html += "  </section>\n";
    }
    html += "</main>\n";
    if (includeLandmarks) {
      html += '<footer role="contentinfo" aria-label="Document footer">\n';
      html += '  <p>Generated by <a href="https://github.com/CityofDaytonaBeach/codbdocs">CodbDocs</a></p>\n';
      html += `  <p>${pageCount} page${pageCount !== 1 ? "s" : ""}</p>
`;
      html += "</footer>\n";
    }
    if (includeKeyboardNav) {
      html += generateKeyboardScript();
    }
    html += "</body>\n</html>";
    return html;
  }
  function generateSkipNav(ir) {
    let html = "<!-- Skip Navigation -->\n";
    html += '<a href="#main-content" class="skip-link" id="skip-to-main">Skip to main content</a>\n';
    if (ir.document.pages.length > 5) {
      html += '<nav aria-label="Quick page access" class="skip-page-nav">\n';
      html += "  <ul>\n";
      for (const pageId of ir.document.pages) {
        const page = ir.pages[pageId];
        if (!page) continue;
        const label = page.labels?.print || `Page ${page.num}`;
        html += `    <li><a href="#${pageId}" class="skip-link">${escapeHTML2(label)}</a></li>
`;
      }
      html += "  </ul>\n";
      html += "</nav>\n";
    }
    return html;
  }
  function renderAccessiblePage(page, ir, opts) {
    let html = "";
    const { pageNum, includeDataAttributes: includeDataAttributes2, enforceHeadingHierarchy, headingTracker, wrapImagesInFigures, mode } = opts;
    const objects = (page.content || []).map((id) => ir.objects[id]).filter((obj) => obj && obj.bbox).sort((a, b) => {
      const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
      if (Math.abs(yDiff) > 10) return yDiff;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    });
    for (const obj of objects) {
      const dataAttr = includeDataAttributes2 ? ` data-pdf-object="${obj.id}"` : "";
      switch (obj.semantic?.role) {
        case "heading":
          html += renderAccessibleHeading(obj, { dataAttr, headingTracker, enforceHeadingHierarchy });
          break;
        case "table":
          html += renderAccessibleTable(obj, ir, { dataAttr, pageNum });
          break;
        case "list":
          html += renderAccessibleList(obj, ir, { dataAttr });
          break;
        case "form_field":
          html += renderAccessibleFormField(obj, ir, { dataAttr });
          break;
        case "link":
          html += renderAccessibleLink(obj, { dataAttr });
          break;
        case "separator":
          html += `    <hr${dataAttr} aria-hidden="true">
`;
          break;
        default:
          if (obj.type === "image") {
            html += renderAccessibleImage(obj, { dataAttr, wrapImagesInFigures, mode });
          } else if (obj.type === "text") {
            html += renderAccessibleText(obj, { dataAttr });
          }
          break;
      }
    }
    for (const vecId of page.vectors || []) {
      const vec = ir.vectors[vecId];
      if (!vec) continue;
      if (vec.semantic?.role === "separator") {
        const dataAttr = includeDataAttributes2 ? ` data-pdf-vector="${vec.id}"` : "";
        html += `    <hr${dataAttr} aria-hidden="true">
`;
      }
    }
    return html;
  }
  function renderAccessibleHeading(obj, opts) {
    const { dataAttr, headingTracker, enforceHeadingHierarchy } = opts;
    let level = obj.semantic?.level || 2;
    if (enforceHeadingHierarchy) {
      if (level > headingTracker.current + 1 && headingTracker.current > 0) {
        level = headingTracker.current + 1;
      }
      headingTracker.current = level;
    }
    const text = escapeHTML2(obj.semantic?.text || "");
    if (!text) return "";
    const id = obj.id || `heading-${obj.bbox?.[0]}-${obj.bbox?.[1]}`;
    return `    <h${level} id="${id}"${dataAttr}>${text}</h${level}>
`;
  }
  function renderAccessibleTable(obj, ir, opts) {
    const { dataAttr, pageNum } = opts;
    let html = "";
    const tableId = obj.id || `table-${pageNum}`;
    const caption = obj.semantic?.caption || "";
    const summary = obj.accessibility?.summary || "";
    const rows = obj.semantic?.rows || [];
    const cols = obj.semantic?.cols || [];
    html += `    <table id="${tableId}"${dataAttr}`;
    if (summary) html += ` aria-label="${escapeHTML2(summary)}"`;
    html += ">\n";
    if (caption) {
      html += `      <caption>${escapeHTML2(caption)}</caption>
`;
    } else if (summary) {
      html += `      <caption>${escapeHTML2(summary)}</caption>
`;
    }
    if (rows.length > 0) {
      html += "      <thead>\n";
      html += "        <tr>\n";
      const headerRow = rows[0] || [];
      for (let c = 0; c < headerRow.length; c++) {
        const cell = headerRow[c];
        html += `          <th scope="col">${escapeHTML2(cell?.text || "")}</th>
`;
      }
      html += "        </tr>\n";
      html += "      </thead>\n";
      if (rows.length > 1) {
        html += "      <tbody>\n";
        for (let r = 1; r < rows.length; r++) {
          html += "        <tr>\n";
          const row = rows[r] || [];
          for (let c = 0; c < row.length; c++) {
            const cell = row[c];
            html += `          <td>${escapeHTML2(cell?.text || "")}</td>
`;
          }
          html += "        </tr>\n";
        }
        html += "      </tbody>\n";
      }
    } else if (cols.length > 0) {
      html += "      <thead>\n        <tr>\n";
      for (const col of cols) {
        html += `          <th scope="col">${escapeHTML2(col.header || col.name || "")}</th>
`;
      }
      html += "        </tr>\n      </thead>\n";
      const maxRows = Math.max(...cols.map((c) => (c.values || []).length));
      if (maxRows > 0) {
        html += "      <tbody>\n";
        for (let r = 0; r < maxRows; r++) {
          html += "        <tr>\n";
          for (const col of cols) {
            const val = (col.values || [])[r] || "";
            html += `          <td>${escapeHTML2(typeof val === "string" ? val : JSON.stringify(val))}</td>
`;
          }
          html += "        </tr>\n";
        }
        html += "      </tbody>\n";
      }
    } else {
      html += renderTableFromNearbyText(obj, ir, pageNum);
    }
    html += "    </table>\n";
    return html;
  }
  function renderTableFromNearbyText(obj, ir, pageNum) {
    let html = "";
    if (!obj.bbox) return html;
    const pageId = `page_${pageNum}`;
    const page = ir.pages[pageId];
    if (!page) return html;
    const cells = (page.content || []).map((id) => ir.objects[id]).filter(
      (o) => o?.bbox && o.type === "text" && o.bbox[0] >= obj.bbox[0] - 5 && o.bbox[1] >= obj.bbox[1] - 5 && o.bbox[0] + (o.bbox[2] || 0) <= obj.bbox[0] + obj.bbox[2] + 5 && o.bbox[1] + (o.bbox[3] || 0) <= obj.bbox[1] + obj.bbox[3] + 5
    ).sort((a, b) => {
      const yDiff = (a.bbox[1] || 0) - (b.bbox[1] || 0);
      if (Math.abs(yDiff) > 5) return yDiff;
      return (a.bbox[0] || 0) - (b.bbox[0] || 0);
    });
    if (cells.length === 0) return html;
    const rows = [];
    let currentRow = [cells[0]];
    for (let i = 1; i < cells.length; i++) {
      const prev = cells[i - 1];
      const curr = cells[i];
      if (Math.abs((curr.bbox[1] || 0) - (prev.bbox[1] || 0)) < 10) {
        currentRow.push(curr);
      } else {
        rows.push(currentRow);
        currentRow = [curr];
      }
    }
    rows.push(currentRow);
    if (rows.length === 0) return html;
    html += "      <thead>\n        <tr>\n";
    for (const cell of rows[0]) {
      html += `          <th scope="col">${escapeHTML2(cell.semantic?.text || "")}</th>
`;
    }
    html += "        </tr>\n      </thead>\n";
    if (rows.length > 1) {
      html += "      <tbody>\n";
      for (let r = 1; r < rows.length; r++) {
        html += "        <tr>\n";
        for (const cell of rows[r]) {
          html += `          <td>${escapeHTML2(cell.semantic?.text || "")}</td>
`;
        }
        html += "        </tr>\n";
      }
      html += "      </tbody>\n";
    }
    return html;
  }
  function renderAccessibleList(obj, ir, opts) {
    const { dataAttr } = opts;
    const items = obj.semantic?.items || [];
    const ordered = obj.semantic?.ordered || false;
    const tag = ordered ? "ol" : "ul";
    let html = `    <${tag}${dataAttr} role="list">
`;
    if (items.length > 0) {
      for (const item of items) {
        const text = typeof item === "string" ? item : item?.text || "";
        html += `      <li>${escapeHTML2(text)}</li>
`;
      }
    } else {
      const nearbyItems = findNearbyListItems(obj, ir);
      for (const text of nearbyItems) {
        html += `      <li>${escapeHTML2(text)}</li>
`;
      }
    }
    html += `    </${tag}>
`;
    return html;
  }
  function findNearbyListItems(obj, ir) {
    if (!obj.bbox) return [];
    const items = [];
    for (const [id, o] of Object.entries(ir.objects)) {
      if (o?.type === "text" && o.bbox && o.semantic?.role !== "heading") {
        if (Math.abs((o.bbox[0] || 0) - (obj.bbox[0] || 0)) < 50 && o.bbox[1] >= obj.bbox[1] - 5 && o.bbox[1] <= obj.bbox[1] + obj.bbox[3] + 5) {
          if (o.semantic?.text) items.push(o.semantic.text);
        }
      }
    }
    return items;
  }
  function renderAccessibleFormField(obj, ir, opts) {
    const { dataAttr } = opts;
    const fieldType = obj.semantic?.fieldType || "text";
    const fieldName = obj.semantic?.fieldName || obj.accessibility?.label || "";
    const fieldId = obj.id || `field-${fieldName}`;
    const label = obj.accessibility?.label || fieldName;
    const value = obj.semantic?.value || "";
    const required = obj.accessibility?.required || false;
    const description = obj.accessibility?.description || "";
    const error = obj.accessibility?.error || "";
    let html = `    <div class="form-field"${dataAttr}>
`;
    if (label) {
      html += `      <label for="${fieldId}">${escapeHTML2(label)}</label>
`;
    }
    if (description) {
      html += `      <span id="${fieldId}-desc" class="field-description">${escapeHTML2(description)}</span>
`;
    }
    const ariaDesc = [
      description ? `${fieldId}-desc` : "",
      error ? `${fieldId}-error` : ""
    ].filter(Boolean).join(" ");
    switch (fieldType) {
      case "checkbox":
        html += `      <input type="checkbox" id="${fieldId}" name="${escapeHTML2(fieldName)}"${value === "true" ? " checked" : ""}${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        break;
      case "radio":
        html += `      <input type="radio" id="${fieldId}" name="${escapeHTML2(fieldName)}"${value ? " checked" : ""}${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        break;
      case "dropdown":
        html += `      <select id="${fieldId}" name="${escapeHTML2(fieldName)}"${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        const options = obj.semantic?.options || [];
        for (const opt of options) {
          const optVal = typeof opt === "string" ? opt : opt?.value || "";
          const optLabel = typeof opt === "string" ? opt : opt?.label || optVal;
          html += `        <option value="${escapeHTML2(optVal)}"${optVal === value ? " selected" : ""}>${escapeHTML2(optLabel)}</option>
`;
        }
        html += "      </select>\n";
        break;
      case "textarea":
        html += `      <textarea id="${fieldId}" name="${escapeHTML2(fieldName)}" rows="4"${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>${escapeHTML2(value)}</textarea>
`;
        break;
      default:
        html += `      <input type="text" id="${fieldId}" name="${escapeHTML2(fieldName)}" value="${escapeHTML2(value)}"${required ? " required" : ""}${ariaDesc ? ` aria-describedby="${ariaDesc}"` : ""}>
`;
        break;
    }
    if (error) {
      html += `      <span id="${fieldId}-error" class="field-error" role="alert">${escapeHTML2(error)}</span>
`;
    }
    html += "    </div>\n";
    return html;
  }
  function renderAccessibleLink(obj, opts) {
    const { dataAttr } = opts;
    const href = obj.accessibility?.href || obj.semantic?.url || "#";
    const text = escapeHTML2(obj.semantic?.text || "");
    const target = obj.accessibility?.target || "";
    const ariaLabel = obj.accessibility?.ariaLabel || "";
    let attrs = dataAttr;
    if (ariaLabel) attrs += ` aria-label="${escapeHTML2(ariaLabel)}"`;
    if (target === "_blank") attrs += ' target="_blank" rel="noopener noreferrer"';
    return `    <p><a href="${escapeHTML2(href)}"${attrs}>${text}</a></p>
`;
  }
  function renderAccessibleImage(obj, opts) {
    const { dataAttr, wrapImagesInFigures, mode } = opts;
    const src = obj.raw?.src || "";
    const alt = obj.accessibility?.alt || "";
    const caption = obj.semantic?.caption || "";
    const isDecorative = obj.accessibility?.decorative || !alt && !caption;
    const role = obj.accessibility?.role || obj.semantic?.role || "";
    const altAttr = isDecorative ? ' alt="" role="presentation"' : ` alt="${escapeHTML2(alt || caption || "Image")}"`;
    let html = "";
    if (wrapImagesInFigures) {
      html += `    <figure${dataAttr}>
`;
      html += `      <img src="${escapeHTML2(src)}"${altAttr} loading="lazy">
`;
      if (caption) {
        html += `      <figcaption>${escapeHTML2(caption)}</figcaption>
`;
      }
      if (role) {
        html += `      <span class="image-role visually-hidden">${escapeHTML2(role)}</span>
`;
      }
      html += "    </figure>\n";
    } else {
      html += `    <img${dataAttr} src="${escapeHTML2(src)}"${altAttr} loading="lazy">
`;
    }
    return html;
  }
  function renderAccessibleText(obj, opts) {
    const { dataAttr } = opts;
    const text = escapeHTML2(obj.semantic?.text || "");
    if (!text) return "";
    return `    <p${dataAttr}>${text}</p>
`;
  }
  function generateAccessibleStyles2() {
    return `<style>
    /* Reset and base */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0; padding: 0;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6; color: #1a1a2e; background: #fff;
      max-width: 900px; margin: 0 auto;
    }

    /* Skip navigation */
    .skip-link {
      position: absolute; top: -100%; left: 0;
      background: #005a9c; color: #fff; padding: 8px 16px;
      z-index: 10000; font-size: 1rem; text-decoration: none;
      border-radius: 0 0 4px 0;
    }
    .skip-link:focus { top: 0; outline: 3px solid #ff6b00; outline-offset: 2px; }
    .skip-page-nav { position: absolute; top: -100%; left: 0; z-index: 9999; }
    .skip-page-nav:focus-within { top: 40px; }

    /* Visually hidden (screen reader only) */
    .visually-hidden {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }

    /* Header */
    header[role="banner"] {
      padding: 24px 20px 16px; border-bottom: 2px solid #005a9c;
      margin-bottom: 24px;
    }
    header h1 { margin: 0 0 8px; font-size: 1.75rem; color: #1a1a2e; }
    header .doc-author { margin: 0; color: #555; }
    header .doc-date { margin: 4px 0 0; color: #777; font-size: 0.9rem; }

    /* Page navigation */
    nav[aria-label="Page navigation"] {
      margin: 0 0 24px; padding: 12px 20px;
      background: #f8f9fa; border-radius: 6px;
    }
    .page-nav {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-wrap: wrap; gap: 4px;
    }
    .page-nav a {
      display: inline-block; padding: 4px 10px;
      background: #e9ecef; color: #005a9c; text-decoration: none;
      border-radius: 4px; font-size: 0.85rem;
    }
    .page-nav a:hover, .page-nav a:focus {
      background: #005a9c; color: #fff;
      outline: 2px solid #ff6b00; outline-offset: 2px;
    }

    /* Main content */
    main { padding: 0 20px; }

    /* Page sections */
    .pdf-page { margin: 32px 0; padding: 16px 0; border-bottom: 1px solid #dee2e6; }
    .page-heading {
      font-size: 1.25rem; color: #005a9c;
      margin: 0 0 16px; padding-bottom: 8px;
      border-bottom: 1px solid #e9ecef;
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; line-height: 1.3; }

    /* Paragraphs */
    p { margin: 0.5em 0; }

    /* Tables */
    table {
      border-collapse: collapse; width: 100%; margin: 16px 0;
      font-size: 0.95rem;
    }
    caption {
      text-align: left; font-weight: 600; margin-bottom: 8px;
      font-size: 1rem; color: #1a1a2e;
    }
    th, td {
      border: 1px solid #dee2e6; padding: 10px 12px; text-align: left;
    }
    th {
      background: #f1f3f5; font-weight: 600;
      position: sticky; top: 0;
    }
    th[scope="col"] { border-bottom: 2px solid #005a9c; }
    tr:hover td { background: #f8f9fa; }

    /* Lists */
    ul, ol { margin: 0.5em 0; padding-left: 1.5em; }
    li { margin: 0.25em 0; }

    /* Forms */
    .form-field { margin: 12px 0; }
    .form-field label {
      display: block; font-weight: 600; margin-bottom: 4px;
    }
    .form-field input, .form-field select, .form-field textarea {
      width: 100%; padding: 8px 12px; border: 1px solid #ced4da;
      border-radius: 4px; font-size: 1rem;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
      outline: 3px solid #005a9c; outline-offset: 1px;
      border-color: #005a9c;
    }
    .field-description { display: block; font-size: 0.85rem; color: #666; margin-top: 2px; }
    .field-error { display: block; color: #c62828; font-size: 0.85rem; margin-top: 4px; font-weight: 600; }

    /* Images and figures */
    figure { margin: 16px 0; }
    img { max-width: 100%; height: auto; border-radius: 4px; }
    figcaption {
      font-size: 0.9rem; color: #555; margin-top: 6px;
      font-style: italic;
    }

    /* Links */
    a { color: #005a9c; }
    a:hover { text-decoration: underline; }
    a:focus { outline: 3px solid #ff6b00; outline-offset: 2px; }

    /* Separators */
    hr {
      border: none; border-top: 1px solid #dee2e6;
      margin: 16px 0;
    }

    /* Footer */
    footer[role="contentinfo"] {
      padding: 16px 20px; margin-top: 32px;
      border-top: 2px solid #005a9c; color: #555;
      font-size: 0.9rem;
    }
    footer p { margin: 4px 0; }

    /* Focus styles for keyboard navigation */
    :focus-visible {
      outline: 3px solid #ff6b00;
      outline-offset: 2px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      body { background: #000; color: #fff; }
      a { color: #ff0; }
      th { background: #333; color: #fff; }
      .skip-link { background: #ff0; color: #000; }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }

    /* Print styles */
    @media print {
      .skip-link, .skip-page-nav, nav[aria-label="Page navigation"],
      #doc-status, footer { display: none; }
      .pdf-page { border-bottom: none; page-break-inside: avoid; }
      a { color: #000; text-decoration: none; }
    }
  </style>
`;
  }
  function generateKeyboardScript() {
    return `<script>
(function() {
  'use strict';

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Alt+1: Skip to main content
    if (e.altKey && e.key === '1') {
      e.preventDefault();
      var main = document.getElementById('main-content');
      if (main) { main.focus(); main.scrollIntoView({ behavior: 'smooth' }); }
    }

    // Alt+H: Go to top (Home)
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('header')?.focus();
    }

    // Alt+P: Previous page
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      var sections = document.querySelectorAll('.pdf-page');
      var current = getCurrentSection(sections);
      if (current > 0) {
        sections[current - 1].scrollIntoView({ behavior: 'smooth' });
        sections[current - 1].focus();
      }
    }

    // Alt+N: Next page
    if (e.altKey && e.key === 'ArrowDown') {
      e.preventDefault();
      var sections = document.querySelectorAll('.pdf-page');
      var current = getCurrentSection(sections);
      if (current < sections.length - 1) {
        sections[current + 1].scrollIntoView({ behavior: 'smooth' });
        sections[current + 1].focus();
      }
    }

    // Alt+S: Toggle page navigation
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      var nav = document.querySelector('nav[aria-label="Page navigation"]');
      if (nav) {
        var isHidden = nav.getAttribute('aria-hidden') === 'true';
        nav.setAttribute('aria-hidden', String(!isHidden));
        nav.style.display = isHidden ? '' : 'none';
        if (isHidden) nav.querySelector('a')?.focus();
      }
    }
  });

  function getCurrentSection(sections) {
    var scrollY = window.scrollY + window.innerHeight / 3;
    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) return i;
    }
    return 0;
  }

  // Add tabindex to page sections for focus
  document.querySelectorAll('.pdf-page').forEach(function(el) {
    el.setAttribute('tabindex', '-1');
  });

  // Announce page changes for screen readers
  if (typeof IntersectionObserver !== 'undefined') {
    var status = document.getElementById('doc-status');
    if (status) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var label = entry.target.getAttribute('aria-label') || '';
            status.textContent = 'Viewing ' + label;
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('.pdf-page').forEach(function(el) {
        observer.observe(el);
      });
    }
  }
})();
<\/script>
`;
  }
  function remediateAccessibility(ir, options = {}) {
    const {
      fixAltText = true,
      fixHeadingHierarchy = true,
      fixLanguage = true,
      fixTitle = true,
      fixFormLabels = true,
      markDecorativeImages = false,
      defaultLanguage = "en"
    } = options;
    const report = { fixes: [], summary: {} };
    if (fixLanguage && !ir.document.metadata?.language) {
      ir.document.metadata.language = defaultLanguage;
      report.fixes.push({ type: "language", action: `Set document language to "${defaultLanguage}"` });
    }
    if (fixTitle && !ir.document.metadata?.title) {
      let inferredTitle = "";
      for (const [id, obj] of Object.entries(ir.objects)) {
        if (obj?.semantic?.role === "heading" && obj.semantic?.level === 1 && obj.semantic?.text) {
          inferredTitle = obj.semantic.text;
          break;
        }
      }
      if (!inferredTitle) inferredTitle = "Untitled Document";
      ir.document.metadata.title = inferredTitle;
      report.fixes.push({ type: "title", action: `Set document title to "${inferredTitle}"` });
    }
    if (fixAltText) {
      for (const [id, obj] of Object.entries(ir.objects)) {
        if (obj?.type === "image" && !obj.accessibility) {
          obj.accessibility = {};
        }
        if (obj?.type === "image" && !obj.accessibility?.alt && obj.accessibility?.alt !== "") {
          if (markDecorativeImages) {
            obj.accessibility.alt = "";
            obj.accessibility.decorative = true;
            report.fixes.push({ type: "alt_text", element: id, action: "Marked as decorative image" });
          } else {
            const caption = obj.semantic?.caption || "";
            const role = obj.semantic?.role || "";
            obj.accessibility.alt = caption || (role ? `${role} image` : "Image");
            report.fixes.push({ type: "alt_text", element: id, action: `Added alt text: "${obj.accessibility.alt}"` });
          }
        }
      }
    }
    if (fixHeadingHierarchy) {
      let currentLevel = 0;
      for (const pageId of ir.document.pages) {
        const page = ir.pages[pageId];
        if (!page) continue;
        for (const objId of page.content || []) {
          const obj = ir.objects[objId];
          if (obj?.semantic?.role === "heading") {
            let level = obj.semantic.level || 1;
            if (level > currentLevel + 1 && currentLevel > 0) {
              const oldLevel = level;
              level = currentLevel + 1;
              obj.semantic.level = level;
              report.fixes.push({
                type: "heading_hierarchy",
                element: objId,
                action: `Changed heading from H${oldLevel} to H${level}`
              });
            }
            currentLevel = level;
          }
        }
      }
    }
    if (fixFormLabels) {
      for (const [id, obj] of Object.entries(ir.objects)) {
        if (obj?.semantic?.role === "form_field") {
          if (!obj.accessibility) obj.accessibility = {};
          if (!obj.accessibility.label && !obj.accessibility.labelledby) {
            const name = obj.semantic?.fieldName || id;
            obj.accessibility.label = name.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
            report.fixes.push({
              type: "form_label",
              element: id,
              action: `Added label: "${obj.accessibility.label}"`
            });
          }
        }
      }
    }
    report.summary = {
      totalFixes: report.fixes.length,
      byType: report.fixes.reduce((acc, fix) => {
        acc[fix.type] = (acc[fix.type] || 0) + 1;
        return acc;
      }, {})
    };
    return { ir, report };
  }
  function generateAccessibilityReport(ir) {
    const audit = wcagAudit(ir);
    const { report: remediations } = remediateAccessibility(ir, { fixAltText: true, fixHeadingHierarchy: true, fixLanguage: true, fixTitle: true, fixFormLabels: true });
    let text = "=== CodbDocs Accessibility Report ===\n\n";
    text += `WCAG Level: ${audit.level}
`;
    text += `Score: ${audit.score}/100
`;
    text += `Issues: ${audit.summary.totalIssues} (${audit.summary.errors} errors, ${audit.summary.warnings} warnings, ${audit.summary.info} info)
`;
    text += `WCAG Criteria Met: ${audit.summary.criteriaMet}/${audit.summary.criteriaTotal}

`;
    text += "--- Issues ---\n";
    for (const issue of audit.issues) {
      text += `[${issue.severity.toUpperCase()}] ${issue.wcag || "N/A"}: ${issue.message}`;
      if (issue.page) text += ` (Page ${issue.page})`;
      text += "\n";
      if (issue.suggestion) text += `  Suggestion: ${issue.suggestion}
`;
    }
    text += "\n--- WCAG Criteria ---\n";
    for (const [criteria, info] of Object.entries(audit.wcagCriteria)) {
      text += `${criteria} ${info.name}: ${info.status.toUpperCase()}
`;
    }
    text += "\n--- Auto-Remediations Applied ---\n";
    text += `${remediations.summary.totalFixes} fixes applied
`;
    for (const fix of remediations.fixes) {
      text += `  [${fix.type}] ${fix.action}`;
      if (fix.element) text += ` (${fix.element})`;
      text += "\n";
    }
    let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
    html += '<meta charset="UTF-8">\n';
    html += "<title>CodbDocs Accessibility Report</title>\n";
    html += "<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:20px;line-height:1.6}";
    html += ".pass{color:#2e7d32}.fail{color:#c62828}.warn{color:#f57f17}";
    html += ".score{font-size:2em;font-weight:bold}.issue{margin:8px 0;padding:8px;border-left:4px solid #ccc}";
    html += ".error{border-color:#c62828}.warning{border-color:#f57f17}.info{border-color:#1976d2}</style>\n";
    html += "</head>\n<body>\n";
    html += "<h1>Accessibility Report</h1>\n";
    html += `<p class="score ${audit.score >= 90 ? "pass" : audit.score >= 70 ? "warn" : "fail"}">Score: ${audit.score}/100 (Level ${audit.level})</p>
`;
    html += `<p>${audit.summary.criteriaMet}/${audit.summary.criteriaTotal} WCAG criteria met</p>
`;
    html += "<h2>Issues</h2>\n";
    for (const issue of audit.issues) {
      html += `<div class="issue ${issue.severity}"><strong>[${issue.severity.toUpperCase()}]</strong> ${issue.message}`;
      if (issue.page) html += ` <em>(Page ${issue.page})</em>`;
      if (issue.suggestion) html += `<br><small>${issue.suggestion}</small>`;
      html += "</div>\n";
    }
    html += "<h2>WCAG Criteria</h2>\n<table><thead><tr><th>Criteria</th><th>Name</th><th>Status</th></tr></thead><tbody>\n";
    for (const [criteria, info] of Object.entries(audit.wcagCriteria)) {
      html += `<tr><td>${criteria}</td><td>${info.name}</td><td class="${info.status}">${info.status.toUpperCase()}</td></tr>
`;
    }
    html += "</tbody></table>\n";
    html += "<h2>Auto-Remediations</h2>\n";
    html += `<p>${remediations.summary.totalFixes} fixes applied</p>
<ul>
`;
    for (const fix of remediations.fixes) {
      html += `<li><strong>${fix.type}:</strong> ${fix.action}</li>
`;
    }
    html += "</ul>\n";
    html += "</body>\n</html>";
    return { html, text, audit, remediations };
  }

  // src/workspace.js
  function createWorkspace(options = {}) {
    const { name = "Workspace", description = "" } = options;
    const workspace = {
      name,
      description,
      documents: /* @__PURE__ */ new Map(),
      // docId -> { doc, graph, fingerprint, concepts }
      crossDocRelationships: [],
      terminology: { aliases: {}, acronyms: {}, definitions: {} }
    };
    workspace.add = async function(docOrGraph, options2 = {}) {
      let doc, graph, docId;
      if (docOrGraph._contentGraph) {
        graph = docOrGraph;
        docId = graph._ir?.document?.id || `doc_${this.documents.size + 1}`;
      } else {
        doc = docOrGraph;
        graph = await doc.analyze({ ocr: false, ...options2 });
        docId = graph._ir?.document?.id || `doc_${this.documents.size + 1}`;
      }
      this.documents.set(docId, {
        doc,
        graph,
        fingerprint: graph._fingerprint || null,
        conceptGraph: graph._conceptGraph || null,
        metadata: graph._ir?.document?.metadata || {},
        pageCount: graph._ir?.document?.pages?.length || 0
      });
      this._buildCrossDocRelationships();
      this._learnTerminology();
      return docId;
    };
    workspace.remove = function(docId) {
      this.documents.delete(docId);
      this._buildCrossDocRelationships();
    };
    workspace.search = function(query, options2 = {}) {
      const { maxResults = 20, perDocLimit = 5 } = options2;
      const allResults = [];
      for (const [docId, entry] of this.documents) {
        const graph = entry.graph;
        if (!graph?.hybridSearch) continue;
        const results = graph.hybridSearch(query, {
          maxResults: perDocLimit,
          rerank: false,
          useExpansion: true
        });
        for (const result of results) {
          allResults.push({
            ...result,
            docId,
            docMetadata: entry.metadata
          });
        }
      }
      allResults.sort((a, b) => b.score - a.score);
      const entityCounts = /* @__PURE__ */ new Map();
      for (const r of allResults) {
        for (const e of r.entities || []) {
          const key = `${e.type}:${e.value}`;
          entityCounts.set(key, (entityCounts.get(key) || 0) + 1);
        }
      }
      for (const r of allResults) {
        let crossDocBoost = 0;
        for (const e of r.entities || []) {
          const key = `${e.type}:${e.value}`;
          if ((entityCounts.get(key) || 0) > 1) {
            crossDocBoost += 0.1;
          }
        }
        r.score += Math.min(crossDocBoost, 0.3);
        r.crossDocument = crossDocBoost > 0;
      }
      allResults.sort((a, b) => b.score - a.score);
      return allResults.slice(0, maxResults);
    };
    workspace.query = function(question, options2 = {}) {
      const results = this.search(question, { maxResults: 10 });
      const reasoningResults = [];
      for (const [docId, entry] of this.documents) {
        const graph = entry.graph;
        if (!graph?.executeReasoning) continue;
        const reasoning = graph.executeReasoning(question);
        if (reasoning) {
          reasoningResults.push({ ...reasoning, docId, metadata: entry.metadata });
        }
      }
      return {
        searchResults: results,
        reasoningResults,
        answer: reasoningResults.length > 0 ? reasoningResults[0].answer : null,
        confidence: reasoningResults.length > 0 ? reasoningResults[0].confidence : 0
      };
    };
    workspace.getSummary = function() {
      let totalWords = 0;
      let totalPages = 0;
      const allEntityTypes = /* @__PURE__ */ new Map();
      for (const [, entry] of this.documents) {
        const summary = entry.graph?.getSummary?.() || {};
        totalWords += summary.wordCount || 0;
        totalPages += entry.pageCount || 0;
        const entities = entry.graph?._contentGraph?.allEntities || [];
        for (const e of entities) {
          allEntityTypes.set(e.type, (allEntityTypes.get(e.type) || 0) + 1);
        }
      }
      return {
        name: this.name,
        documentCount: this.documents.size,
        totalPages,
        totalWords,
        entityTypes: Object.fromEntries(allEntityTypes),
        crossDocRelationships: this.crossDocRelationships.length
      };
    };
    workspace.toJSON = function() {
      return {
        name: this.name,
        description: this.description,
        documents: Array.from(this.documents.entries()).map(([id, entry]) => ({
          id,
          metadata: entry.metadata,
          pageCount: entry.pageCount
        })),
        summary: this.getSummary()
      };
    };
    workspace._buildCrossDocRelationships = function() {
      this.crossDocRelationships = [];
      const docEntries = Array.from(this.documents.entries());
      for (let i = 0; i < docEntries.length; i++) {
        for (let j = i + 1; j < docEntries.length; j++) {
          const [, entry1] = docEntries[i];
          const [, entry2] = docEntries[j];
          const entities1 = entry1.graph?._contentGraph?.allEntities || [];
          const entities2 = entry2.graph?._contentGraph?.allEntities || [];
          const shared = [];
          for (const e1 of entities1) {
            for (const e2 of entities2) {
              if (e1.type === e2.type && e1.value?.toLowerCase() === e2.value?.toLowerCase()) {
                shared.push({ type: e1.type, value: e1.value });
              }
            }
          }
          if (shared.length > 0) {
            this.crossDocRelationships.push({
              doc1: docEntries[i][0],
              doc2: docEntries[j][0],
              sharedEntities: shared,
              strength: shared.length
            });
          }
        }
      }
    };
    workspace._learnTerminology = function() {
      const allPages = [];
      for (const [, entry] of this.documents) {
        const pages2 = entry.graph?.text?.pages || [];
        allPages.push(...pages2);
      }
      this.terminology = learnTerminology(allPages);
    };
    return workspace;
  }

  // src/persistence.js
  var DB_NAME = "codbdocs";
  var DB_VERSION = 1;
  var STORE_NAME = "documents";
  var ENGINE_VERSION = "1.0.0";
  var IR_VERSION = "1.0";
  async function hashBuffer(buffer) {
    const hashBuffer2 = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer2));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async function computeCacheKey(pdfBuffer, config2 = {}) {
    const pdfHash = await hashBuffer(pdfBuffer);
    const configStr = JSON.stringify(config2 || {});
    const configHash = await hashBuffer(new TextEncoder().encode(configStr));
    return `${pdfHash}_${ENGINE_VERSION}_${IR_VERSION}_${configHash.slice(0, 8)}`;
  }
  function openDB() {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === "undefined") {
        reject(new Error("IndexedDB not available"));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "hash" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function saveToCache(pdfBuffer, analysisData, options = {}) {
    const { ttl = 7 * 24 * 60 * 60 * 1e3, config: config2 = {} } = options;
    try {
      const cacheKey = await computeCacheKey(pdfBuffer, config2);
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const record = {
          hash: cacheKey,
          data: analysisData,
          timestamp: Date.now(),
          ttl,
          engineVersion: ENGINE_VERSION,
          irVersion: IR_VERSION
        };
        store.put(record);
        tx.oncomplete = () => resolve({ hash: cacheKey, saved: true });
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      return { hash: null, saved: false, error: err.message };
    }
  }
  async function loadFromCache(pdfBuffer, config2 = {}) {
    try {
      const cacheKey = await computeCacheKey(pdfBuffer, config2);
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(cacheKey);
        request.onsuccess = () => {
          const record = request.result;
          if (!record) {
            resolve({ found: false, hash: cacheKey });
            return;
          }
          if (Date.now() - record.timestamp > record.ttl) {
            resolve({ found: false, hash: cacheKey, reason: "expired" });
            return;
          }
          if (record.engineVersion !== ENGINE_VERSION || record.irVersion !== IR_VERSION) {
            resolve({ found: false, hash: cacheKey, reason: "version_mismatch" });
            return;
          }
          resolve({
            found: true,
            hash: cacheKey,
            data: record.data,
            timestamp: record.timestamp,
            age: Date.now() - record.timestamp
          });
        };
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      return { found: false, error: err.message };
    }
  }
  async function clearCache() {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.clear();
        tx.oncomplete = () => resolve({ cleared: true });
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      return { cleared: false, error: err.message };
    }
  }
  async function getCacheStats() {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.count();
        request.onsuccess = () => resolve({ entries: request.result });
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      return { entries: 0, error: err.message };
    }
  }

  // src/index.js
  function trackImageBboxes(pageOps) {
    const imageBboxes = /* @__PURE__ */ new Map();
    const ctmStack = [];
    let ctm = [1, 0, 0, 1, 0, 0];
    for (const op of pageOps) {
      if (op.fn === "save") {
        ctmStack.push([...ctm]);
      } else if (op.fn === "restore") {
        ctm = ctmStack.pop() || [1, 0, 0, 1, 0, 0];
      } else if (op.fn === "transform" && op.args?.length === 6) {
        const [a, b, c, d, e, f] = op.args;
        ctm = multiplyMatrix(ctm, [a, b, c, d, e, f]);
      } else if (op.fn === "concatMatrix" && op.args?.length === 6) {
        ctm = [...op.args];
      } else if (op.fn === "doXObject" && op.args?.[0]) {
        const name = op.args[0];
        imageBboxes.set(name, {
          bbox: applyMatrixToRect(ctm, [0, 0, 1, 1]),
          ctm: [...ctm],
          name
        });
      }
    }
    return imageBboxes;
  }
  function multiplyMatrix(m1, m2) {
    const [a1, b1, c1, d1, e1, f1] = m1;
    const [a2, b2, c2, d2, e2, f2] = m2;
    return [
      a1 * a2 + c1 * b2,
      b1 * a2 + d1 * b2,
      a1 * c2 + c1 * d2,
      b1 * c2 + d1 * d2,
      a1 * e2 + c1 * f2 + e1,
      b1 * e2 + d1 * f2 + f1
    ];
  }
  function applyMatrixToRect(ctm, [x1, y1, x2, y2]) {
    const [a, b, c, d, e, f] = ctm;
    const corners = [
      [x1, y1],
      [x2, y1],
      [x1, y2],
      [x2, y2]
    ];
    const transformed = corners.map(([x, y]) => [
      a * x + c * y + e,
      b * x + d * y + f
    ]);
    const xs = transformed.map((p) => p[0]);
    const ys = transformed.map((p) => p[1]);
    return [
      Math.min(...xs),
      Math.min(...ys),
      Math.max(...xs) - Math.min(...xs),
      Math.max(...ys) - Math.min(...ys)
    ];
  }
  var DEFAULTS = {
    nativeTextMinLength: 20,
    ocrScale: 2,
    ocrLang: "eng",
    enableVisual: false,
    enableBrain: true,
    enableContent: true,
    useWorkers: true,
    concurrency: 1,
    qualityThreshold: 0.5,
    memory: {
      maxMB: 512,
      canvasCache: 5,
      pageCache: 25
    }
  };
  var config = { ...DEFAULTS };
  function configure(opts = {}) {
    if (opts.memory) {
      opts.memory = { ...config.memory, ...opts.memory };
    }
    config = { ...config, ...opts };
  }
  function getPdfjs() {
    const lib = typeof window !== "undefined" && (window["pdfjs-dist/build/pdf"] || window.pdfjsLib);
    if (!lib) {
      throw new Error(
        '[codbdocs] pdfjsLib not found. Load PDF.js before calling CodbDocs.load().\n  <script src="vendor/pdf.js/pdf.min.js"><\/script>'
      );
    }
    return lib;
  }
  function getTesseract() {
    const lib = typeof window !== "undefined" && window.Tesseract;
    if (!lib) {
      throw new Error(
        '[codbdocs] Tesseract not found. Load Tesseract.js before calling doc.analyze({ ocr: true }).\n  <script src="vendor/tesseract.js/tesseract.min.js"><\/script>'
      );
    }
    return lib;
  }
  async function load(source) {
    const pdfjsLib2 = getPdfjs();
    let data;
    if (typeof source === "string") {
      data = { url: source };
    } else if (source instanceof ArrayBuffer) {
      data = { data: source };
    } else if (source instanceof Uint8Array) {
      data = { data: source.buffer };
    } else if (source && typeof source.arrayBuffer === "function") {
      data = { data: await source.arrayBuffer() };
    } else {
      throw new Error("[codbdocs] Unsupported source. Pass a File, Blob, ArrayBuffer, Uint8Array, or URL string.");
    }
    const pdf = await pdfjsLib2.getDocument(data).promise;
    return new CodbDoc(pdf);
  }
  var CodbDoc = class {
    constructor(pdf) {
      this._pdf = pdf;
      this.pageCount = pdf.numPages;
    }
    /**
     * Run the full analysis pipeline.
     * Returns a DocumentGraph with spatial search, content graph, and ask().
     */
    async analyze(opts = {}) {
      const {
        ocr = true,
        visual = false,
        extractVectors: extractVecs = true,
        extractExtended = true,
        onPageComplete,
        onProgress,
        onLayer
      } = opts;
      const graph = new DocumentGraph();
      const contentGraph = new DocumentContentGraph();
      const ir = createIR();
      const listeners = {};
      graph.on = (event, fn) => {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(fn);
      };
      graph.emit = (event, data) => {
        (listeners[event] || []).forEach((fn) => fn(data));
      };
      if (extractExtended) {
        try {
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "metadata" });
          ir.document.metadata = await extractDocumentMetadata(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "navigation" });
          ir.document.navigation = {
            outline: await extractOutline(this._pdf),
            destinations: await extractNamedDestinations(this._pdf),
            labels: await extractPageLabels(this._pdf)
          };
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "security" });
          ir.document.security = await extractSecurity(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "ocgs" });
          ir.document.ocgs = await extractOCGs(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "embedded" });
          ir.document.embeddedFiles = await extractEmbeddedFiles(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "actions" });
          ir.document.actions = await extractActions(this._pdf);
          onProgress && onProgress({ page: 0, total: this.pageCount, status: "revisions" });
          ir.document.revisions = await extractRevisions(this._pdf);
        } catch (e) {
          console.error("[codbdocs] Document-level extraction error:", e);
        }
      }
      graph._pageResults = {};
      graph._allContentItems = {};
      graph._allImages = {};
      try {
        for (let num = 1; num <= this.pageCount; num++) {
          onProgress && onProgress({ page: num, total: this.pageCount, status: "reading" });
          const page = await this._pdf.getPage(num);
          const viewport = page.getViewport({ scale: 1 });
          const pageSize = { width: viewport.width, height: viewport.height };
          const content = await page.getTextContent();
          const nativeText = content.items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim();
          let text = nativeText;
          let source = "native";
          let confidence = null;
          let canvas = null;
          const qualityScore = computeTextQuality(content.items, pageSize);
          if (qualityScore < config.qualityThreshold && ocr) {
            onProgress && onProgress({ page: num, total: this.pageCount, status: "ocr", progress: 0 });
            try {
              canvas = await renderPageToCanvas(page, config.ocrScale);
              const Tesseract = getTesseract();
              const { data } = await Tesseract.recognize(canvas, config.ocrLang, {
                logger: (m) => {
                  if (m.status === "recognizing text") {
                    onProgress && onProgress({ page: num, total: this.pageCount, status: "ocr", progress: m.progress });
                  }
                }
              });
              const ocrText = (data.text || "").trim();
              text = fuseNativeOCR(nativeText, ocrText, content.items, pageSize);
              source = text === ocrText ? "ocr" : "fusion";
              confidence = data.confidence;
            } catch (err) {
              source = "error";
              text = "";
            }
          } else if (qualityScore < config.qualityThreshold && !ocr) {
            source = "skipped";
            text = "";
          }
          let spatial = null;
          let structures = null;
          let metadata = null;
          let classification = null;
          let visualRegions = null;
          if (config.enableBrain) {
            onProgress && onProgress({ page: num, total: this.pageCount, status: "analyzing" });
            spatial = analyzeSpatialLayout(content.items, pageSize);
            structures = detectStructure(spatial, pageSize);
            metadata = extractMetadata(text);
            classification = classifyPage(text, spatial);
          }
          if (visual || config.enableVisual) {
            if (!canvas) canvas = await renderPageToCanvas(page, config.ocrScale);
            try {
              visualRegions = analyzeVisualRegions(canvas);
            } catch (e) {
            }
          }
          let contentPageGraph = null;
          if (config.enableContent) {
            onProgress && onProgress({ page: num, total: this.pageCount, status: "content" });
            contentPageGraph = analyzeContent(num, text, spatial, metadata);
            contentGraph.addPageGraph(contentPageGraph);
          }
          let vectors = [];
          if (extractVecs) {
            onProgress && onProgress({ page: num, total: this.pageCount, status: "vectors" });
            try {
              vectors = await extractVectors(page);
            } catch (e) {
            }
          }
          let structureTree = null;
          try {
            structureTree = await extractStructureTree(page);
          } catch (e) {
          }
          let annotations = [];
          try {
            annotations = await extractAnnotations(page);
          } catch (e) {
          }
          const irPage = addPage(ir, num, {
            width: pageSize.width,
            height: pageSize.height,
            rotation: page.rotate,
            mediaBox: page.mediaBox,
            cropBox: page.cropBox,
            labels: page.labels || null
          });
          for (const vec of vectors) {
            addVectorObject(ir, `page_${num}`, vec);
          }
          for (const item of content.items) {
            if (item.str && item.str.trim()) {
              addTextObject(ir, `page_${num}`, {
                text: item.str,
                bbox: [item.transform[4], item.transform[5], item.width, item.height],
                font: item.fontName,
                fontSize: Math.abs(item.transform[0]) || 12,
                transform: item.transform
              });
            }
          }
          if (annotations.length > 0) {
            irPage.annotations = annotations;
            ir.annotations[`page_${num}`] = annotations;
          }
          if (structureTree) {
            ir.structure[`page_${num}`] = structureTree;
          }
          if (extractExtended) {
            try {
              irPage.markedContent = await extractMarkedContent(page);
            } catch (e) {
            }
            try {
              irPage.artifacts = await extractArtifacts(page);
            } catch (e) {
            }
            try {
              irPage.glyphs = await extractGlyphs(page);
            } catch (e) {
            }
            try {
              irPage.signatures = await extractSignatures(page, this._pdf);
            } catch (e) {
            }
            try {
              irPage.appearanceStreams = await extractAppearanceStreams(page);
            } catch (e) {
            }
            try {
              const pageOps = await page.getOperatorList();
              irPage.graphicsStates = extractGraphicsState(pageOps);
            } catch (e) {
            }
            try {
              irPage.textQuality = analyzeTextQuality(irPage, content.items, pageSize);
            } catch (e) {
            }
            if (visualRegions) {
              try {
                irPage.visualComparison = compareVisualInternal(irPage, visualRegions, content.items);
              } catch (e) {
              }
            }
            if (vectors.length > 0) {
              try {
                irPage.redactions = detectRedactions(vectors, content.items);
              } catch (e) {
              }
            }
            if (structureTree) {
              try {
                irPage.tagValidation = validateTags(irPage, structureTree, content.items);
              } catch (e) {
              }
            }
            try {
              irPage.rotationSkew = detectRotationSkew(irPage, content.items, vectors);
            } catch (e) {
            }
            try {
              irPage.glyphIssues = detectGlyphIssues(irPage, content.items);
            } catch (e) {
            }
            if (vectors.length > 0) {
              try {
                irPage.outlinedText = detectOutlinedText(vectors, content.items);
              } catch (e) {
              }
            }
            try {
              irPage.flattenedForms = detectFlattenedForms(vectors, content.items, annotations);
            } catch (e) {
            }
            if (vectors.length > 0) {
              try {
                irPage.checkboxes = detectCheckboxes(vectors, content.items);
              } catch (e) {
              }
            }
            try {
              irPage.footnotes = detectFootnotes(content.items, pageSize);
            } catch (e) {
            }
            try {
              irPage.language = detectLanguage(content.items);
            } catch (e) {
            }
          }
          let pageImages = [];
          try {
            let imageBboxesByName = /* @__PURE__ */ new Map();
            try {
              const pageOps = page._opTree || [];
              imageBboxesByName = trackImageBboxes(pageOps);
            } catch (e) {
            }
            pageImages = await extractImages(page);
            for (const img of pageImages) {
              if (img.name && imageBboxesByName.has(img.name)) {
                const ctmData = imageBboxesByName.get(img.name);
                img.bbox = ctmData.bbox;
                img.ctm = ctmData.ctm;
              }
              img.role = inferImageRole(img, content.items, pageSize);
              img.caption = findNearestCaption(img, content.items, pageSize);
              img.nearbyText = extractNearbyText(img, content.items, pageSize);
              if (!irPage.images) irPage.images = [];
              irPage.images.push(img);
            }
          } catch (e) {
          }
          let readingOrder = [];
          try {
            readingOrder = detectReadingOrder(ir, num);
          } catch (e) {
          }
          let repeatedElements = null;
          if (num === this.pageCount) {
            try {
              repeatedElements = detectRepeatedElements(graph._pageResults || {}, graph._allContentItems || {});
            } catch (e) {
            }
          }
          const pageResult = {
            num,
            text,
            source,
            confidence,
            pageSize,
            spatial,
            structures,
            metadata,
            classification,
            visual: visualRegions,
            images: pageImages.length,
            imageRoles: pageImages.map((img) => img.role),
            contentBlocks: contentPageGraph ? contentPageGraph.blocks.length : 0,
            contentEntities: contentPageGraph ? contentPageGraph.entities.length : 0,
            vectors: vectors.length,
            annotations: annotations.length,
            hasStructureTree: !!structureTree,
            readingOrder: readingOrder.length,
            textQuality: irPage.textQuality,
            visualComparison: irPage.visualComparison,
            redactions: irPage.redactions,
            tagValidation: irPage.tagValidation,
            rotationSkew: irPage.rotationSkew,
            glyphIssues: irPage.glyphIssues,
            outlinedText: irPage.outlinedText,
            flattenedForms: irPage.flattenedForms,
            checkboxes: irPage.checkboxes,
            footnotes: irPage.footnotes,
            language: irPage.language,
            repeatedElements
          };
          graph.addPageResult(pageResult);
          graph._pageResults[`page_${num}`] = pageResult;
          graph._allContentItems[`page_${num}`] = content.items;
          graph._allImages[`page_${num}`] = pageImages;
          onPageComplete && onPageComplete(pageResult);
          graph.emit("indexed", {
            page: num,
            total: this.pageCount,
            pageResult
          });
          onLayer && onLayer({
            page: num,
            spatial: !!spatial,
            structure: !!structures,
            metadata: !!metadata,
            classification: classification?.type,
            contentBlocks: pageResult.contentBlocks,
            contentEntities: pageResult.contentEntities,
            vectors: pageResult.vectors
          });
          try {
            page.cleanup();
          } catch (e) {
          }
        }
      } catch (e) {
        console.error("[codbdocs] Analysis error:", e);
      }
      if (config.enableContent) {
        contentGraph.documentType = classifyDocumentType(contentGraph);
      }
      const conceptGraph = new ConceptGraph();
      if (config.enableContent) {
        extractRelationships(contentGraph, conceptGraph);
      }
      const fingerprint = CodbFingerprint.fromGraph(graph, ir);
      graph._contentGraph = contentGraph;
      graph._doc = this;
      graph._ir = ir;
      graph._conceptGraph = conceptGraph;
      graph._fingerprint = fingerprint;
      graph.find = (query) => executeQuery(contentGraph, query, graph);
      graph.findOne = (query) => {
        const results = contentGraph.find(query);
        return results.length > 0 ? results[0] : null;
      };
      graph.ask = (question) => executeAsk(contentGraph, question, graph);
      graph.getEntities = (type) => contentGraph.getEntities(type);
      graph.getBlocks = (type) => contentGraph.getBlocks(type);
      graph.getDocumentType = () => contentGraph.documentType;
      graph.highlight = (canvas, query, options) => {
        const results = contentGraph.find(query);
        return highlightResults(canvas, results, options);
      };
      graph.getHighlights = (query, options) => {
        const results = contentGraph.find(query);
        return createHighlightAnnotations(results, options);
      };
      graph.getIR = () => ir;
      graph.auditAccessibility = () => auditAccessibility(ir);
      graph.getAccessibilityTree = () => generateAccessibilityTree(ir);
      graph.toHTML = (options) => exportHTML(ir, options);
      graph.getVectors = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.vectors?.map((id) => ir.vectors[id]) || [];
      };
      graph.getStructureTree = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.structure[pageId] || null;
      };
      graph.getAnnotations = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.annotations[pageId] || [];
      };
      graph.getFormFields = () => ir.forms?.fields || [];
      graph.getReadingOrder = (pageNum) => detectReadingOrder(ir, pageNum);
      graph.getReadingOrderSequence = (pageNum) => getReadingOrderSequence(ir, pageNum);
      graph.getImages = (pageNum) => {
        if (pageNum) return graph._allImages[`page_${pageNum}`] || [];
        const all = [];
        for (const pageImages of Object.values(graph._allImages)) {
          all.push(...pageImages);
        }
        return all;
      };
      graph._images = (() => {
        const all = [];
        for (const pageImages of Object.values(graph._allImages)) {
          all.push(...pageImages);
        }
        return all;
      })();
      graph.extractAllImages = (options) => extractAllImages(this._pdf, options);
      graph.createChunks = (options) => createChunks(graph, options);
      graph.getCrossPageContext = () => buildCrossPageContext(graph);
      graph.toRAG = (options) => createRAGOutput(graph, options);
      graph.toRAGWithEmbeddings = (embeddingProvider, options) => createRAGOutputWithEmbeddings(graph, embeddingProvider, options);
      graph.toJSONL = (options) => exportAsJSONL(createRAGOutput(graph, options));
      graph.toCSV = (options) => exportAsCSV(createRAGOutput(graph, options));
      graph.getMetadata = () => ir.document.metadata;
      graph.getOutline = () => ir.document.navigation.outline || [];
      graph.getNamedDestinations = () => ir.document.navigation.destinations || {};
      graph.getPageLabels = () => ir.document.navigation.labels || [];
      graph.getSecurity = () => ir.document.security;
      graph.getMarkedContent = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.markedContent || [];
      };
      graph.getArtifacts = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.artifacts || [];
      };
      graph.getGlyphs = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.glyphs || [];
      };
      graph.getRemediations = () => {
        const audit = graph.auditAccessibility();
        return generateRemediations(audit, ir);
      };
      graph.getSignatures = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.signatures || [];
      };
      graph.getSignatureSummary = () => {
        const allSignatures = [];
        for (const pageId of Object.keys(ir.pages)) {
          if (ir.pages[pageId]?.signatures) {
            allSignatures.push(...ir.pages[pageId].signatures);
          }
        }
        return buildSignatureSummary(allSignatures);
      };
      graph.getOCGs = () => ir.document.ocgs || [];
      graph.getOCGSummary = () => buildOCGSummary(ir.document.ocgs || []);
      graph.getEmbeddedFiles = () => ir.document.embeddedFiles || [];
      graph.getEmbeddedFilesSummary = () => buildEmbeddedFilesSummary(ir.document.embeddedFiles || []);
      graph.getActions = () => ir.document.actions || [];
      graph.getActionsSummary = () => buildActionsSummary(ir.document.actions || []);
      graph.getAppearanceStreams = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.appearanceStreams || [];
      };
      graph.getAppearanceStreamsSummary = () => {
        const allAppearances = [];
        for (const pageId of Object.keys(ir.pages)) {
          if (ir.pages[pageId]?.appearanceStreams) {
            allAppearances.push(...ir.pages[pageId].appearanceStreams);
          }
        }
        return buildAppearanceStreamsSummary(allAppearances);
      };
      graph.getXObjectReuse = () => trackXObjectReuse(ir);
      graph.getXObjectSummary = () => buildXObjectSummary(trackXObjectReuse(ir));
      graph.getRevisions = () => ir.document.revisions || [];
      graph.getRevisionsSummary = () => buildRevisionsSummary(ir.document.revisions || []);
      graph.getGraphicsStateSummary = (pageNum) => {
        const pageId = `page_${pageNum}`;
        const states = ir.pages[pageId]?.graphicsStates || [];
        return buildGraphicsStateSummary(states);
      };
      graph.wcagAudit = () => wcagAudit(ir);
      graph.toAccessibleHTML = (options) => exportAccessibleHTML(ir, options);
      graph.remediateAccessibility = (options) => {
        const result = remediateAccessibility(ir, options);
        return result.report;
      };
      graph.getAccessibilityReport = () => generateAccessibilityReport(ir);
      graph.toPDF = (options) => createPDF(ir, options);
      graph.createTextPDF = (options) => createTextPDF(
        Object.values(ir.pages).map((p) => p.content?.join("\n") || ""),
        options
      );
      graph.diagnose = () => diagnoseDocument(pageResults, graph);
      graph.normalize = (options) => normalizeDocument(graph, options);
      graph.getTextQuality = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.textQuality || null;
      };
      graph.getVisualComparison = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.visualComparison || null;
      };
      graph.getRepeatedElements = () => {
        return pageResults[0]?.repeatedElements || { watermarks: [], headers: [], footers: [], pageNumbers: [] };
      };
      graph.getRedactions = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.redactions || [];
      };
      graph.getTagValidation = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.tagValidation || { valid: false, issues: [] };
      };
      graph.getRAGReadiness = () => {
        const readiness = calculateRAGReadiness(pageResults, null, null, pageResults[0]?.repeatedElements || {});
        return {
          score: Math.round(readiness.score * 100),
          factors: readiness.factors,
          recommendations: readiness.recommendations
        };
      };
      graph.getRotationSkew = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.rotationSkew || { rotation: 0, skewAngle: 0, isRotated: false, isSkewed: false };
      };
      graph.getGlyphIssues = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.glyphIssues || { issues: [], hasGlyphIssues: false };
      };
      graph.getOutlinedText = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.outlinedText || { hasOutlinedText: false, candidates: [], count: 0 };
      };
      graph.getFlattenedForms = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.flattenedForms || { hasFlattenedForms: false, candidates: [], recoveredFields: [] };
      };
      graph.getCheckboxes = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.checkboxes || { count: 0, checkboxes: [], checked: 0, unchecked: 0 };
      };
      graph.getFootnotes = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.footnotes || { footnotes: [], footnoteRefs: [], associations: [], count: 0 };
      };
      graph.getLanguage = (pageNum) => {
        const pageId = `page_${pageNum}`;
        return ir.pages[pageId]?.language || { language: "unknown", confidence: 0 };
      };
      graph.getCrossPageTables = () => detectCrossPageTables(pageResults, ir);
      graph.associateCaptions = (pageNum) => {
        const pageId = `page_${pageNum}`;
        const pageData = ir.pages[pageId];
        const images = pageData?.images || [];
        const contentItems = (pageData?.content || []).map((id) => ir.objects?.[id]).filter(Boolean).map((obj) => obj.raw);
        return associateCaptionsWithImages(pageData, contentItems, images);
      };
      graph.getConceptGraph = () => conceptGraph;
      graph.getFingerprint = () => fingerprint;
      graph.getConcepts = (type) => type ? conceptGraph.findByType(type) : [...conceptGraph.nodes.values()];
      graph.getConceptNeighbors = (nodeId, depth) => conceptGraph.getNeighbors(nodeId, depth);
      graph.getConceptPath = (sourceId, targetId) => conceptGraph.findPath(sourceId, targetId);
      graph.getConceptHubs = (limit) => conceptGraph.getHubs(limit);
      graph.getCommunities = () => conceptGraph.getCommunities();
      graph.getRelationships = (nodeId) => conceptGraph.getRelationships(nodeId);
      graph.hybridSearch = (query, options) => hybridSearch(graph, query, options);
      graph.detectIntent = (query) => detectIntent(query);
      graph.decomposeQuery = (query) => decomposeQuery(query);
      graph.planQuery = (question) => {
        const lower = question.toLowerCase().trim();
        const intent = detectIntent(lower);
        const subjectPatterns = [
          /(?:about|for|of|regarding)\s+(?:the\s+)?(\w[\w\s]*?)(?:\?|$)/i,
          /(?:what|which|who)\s+(?:is|are|was|were)\s+(?:the\s+)?(\w[\w\s]*?)(?:\?|$)/i,
          /(\w+)\s+(?:amount|cost|price|value|total|budget)/i
        ];
        let subject = [];
        for (const pat of subjectPatterns) {
          const m = lower.match(pat);
          if (m && m[1]) {
            subject.push(m[1].trim());
          }
        }
        const anchors = [];
        const currencyMatch = lower.match(/\$[\d,]+(?:\.\d{2})?/g);
        if (currencyMatch) anchors.push(...currencyMatch.map((v) => ({ type: "currency", value: v })));
        const dateMatch = lower.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g);
        if (dateMatch) anchors.push(...dateMatch.map((v) => ({ type: "date", value: v })));
        const expected = [];
        if (/who|person|people|name|author|approved?\s+by|signed?\s+by/i.test(lower)) {
          expected.push("person");
        }
        if (/how\s+much|amount|cost|price|total|budget|fund|\$/i.test(lower)) {
          expected.push("currency");
        }
        if (/when|date/i.test(lower)) {
          expected.push("date");
        }
        if (/where|address|location/i.test(lower)) {
          expected.push("address");
        }
        const relations = [];
        const relationPatterns = [
          { pattern: /approved?\s+by/i, relation: "approvedBy" },
          { pattern: /signed?\s+by/i, relation: "signedBy" },
          { pattern: /funded?\s+by/i, relation: "fundedBy" },
          { pattern: /authored?\s+by/i, relation: "authoredBy" },
          { pattern: /submitted?\s+by/i, relation: "submittedBy" },
          { pattern: /created?\s+by/i, relation: "createdBy" }
        ];
        for (const { pattern, relation } of relationPatterns) {
          if (pattern.test(lower)) relations.push(relation);
        }
        let operation = null;
        if (/total|sum|add\s+up|combined|aggregate/i.test(lower)) {
          operation = "SUM";
        } else if (/how\s+many|count|number\s+of/i.test(lower)) {
          operation = "COUNT";
        } else if (/average|avg|mean/i.test(lower)) {
          operation = "AVG";
        } else if (/highest|most|maximum|max|largest|biggest/i.test(lower)) {
          operation = "MAX";
        } else if (/lowest|least|minimum|min|smallest/i.test(lower)) {
          operation = "MIN";
        } else if (/before|prior\s+to|earlier\s+than/i.test(lower)) {
          operation = "BEFORE";
        } else if (/after|since|later\s+than/i.test(lower)) {
          operation = "AFTER";
        } else if (/between|from.*to/i.test(lower)) {
          operation = "BETWEEN";
        } else if (/group\s+by|per|each|every/i.test(lower)) {
          operation = "GROUP_BY";
        }
        return {
          query: question,
          intent,
          subject,
          expected,
          anchors,
          relations,
          operation
        };
      };
      graph.count = (criteria) => operatorCount(graph, criteria);
      graph.sum = (criteria) => operatorSum(graph, criteria);
      graph.max = (criteria) => operatorMax(graph, criteria);
      graph.min = (criteria) => operatorMin(graph, criteria);
      graph.reason = (query) => executeReasoning(graph, query);
      graph.askEnhanced = (question) => {
        const reasoningResult = executeReasoning(graph, question);
        if (reasoningResult) return reasoningResult;
        const searchResults = hybridSearch(graph, question, { maxResults: 10 });
        const ranked = rankResults(searchResults, question);
        if (ranked.length === 0) {
          return {
            answer: `No results found for "${question}".`,
            confidence: 0.9,
            evidence: [],
            reasoning: { intent: detectIntent(question), searchResults: 0 }
          };
        }
        const top = ranked[0];
        let answer = "";
        if (top.entities && top.entities.length > 0) {
          const entitySummary = top.entities.slice(0, 5).map((e) => `${e.type}: ${e.value}`).join(", ");
          answer = `Found relevant content on page ${top.page}: ${entitySummary}`;
        } else {
          answer = `Found relevant content on page ${top.page}.`;
        }
        return {
          answer,
          confidence: top.confidence,
          evidence: top.evidence || [],
          reasoning: {
            intent: top.intent,
            searchResults: ranked.length,
            topScore: top.score,
            explanation: top.explanation,
            reasons: top.reasons
          }
        };
      };
      graph.avg = (criteria) => operatorAvg(graph, criteria);
      graph.before = (criteria) => operatorBefore(graph, criteria);
      graph.after = (criteria) => operatorAfter(graph, criteria);
      graph.between = (criteria) => operatorBetween(graph, criteria);
      graph.groupBy = (criteria) => operatorGroupBy(graph, criteria);
      graph.getTables = () => buildTableObjects(graph._contentGraph, conceptGraph);
      graph.queryTable = (tableId, conditions) => {
        const tables = buildTableObjects(graph._contentGraph, conceptGraph);
        const table = tables.find((t) => t.id === tableId);
        return table ? queryTable(table, conditions) : [];
      };
      graph.expandQuery = (query, options) => expandQuery(query, options);
      graph.fuzzySearch = (query, options) => {
        const pages2 = graph.text?.pages || [];
        return fuzzySearch(query, pages2, options);
      };
      graph.getTerminology = () => graph._terminology || { aliases: {}, acronyms: {}, definitions: {} };
      graph.getAcronyms = () => {
        const allAcronyms = [];
        for (const page of graph.text?.pages || []) {
          const text = page.text || "";
          allAcronyms.push(...detectAcronyms(text));
        }
        return allAcronyms;
      };
      graph.getDefinitions = () => {
        const allDefs = [];
        for (const page of graph.text?.pages || []) {
          const text = page.text || "";
          allDefs.push(...detectDefinitions(text));
        }
        return allDefs;
      };
      graph.createWorkspace = (options) => createWorkspace(options);
      graph.saveCache = async (pdfBuffer) => saveToCache(pdfBuffer, graph.toJSON());
      graph.loadCache = async (pdfBuffer) => loadFromCache(pdfBuffer);
      graph.createAccessibleView = (options = {}) => {
        const {
          mode = "accessible",
          includeDataAttributes: includeDataAttributes2 = true,
          enforceHeadingHierarchy = true,
          wrapImagesInFigures = true
        } = options;
        const ir2 = graph._ir || {};
        return exportAccessibleHTML(ir2, {
          mode,
          includeDataAttributes: includeDataAttributes2,
          enforceHeadingHierarchy,
          wrapImagesInFigures
        });
      };
      graph.auditAccessibility = () => {
        const ir2 = graph._ir || {};
        return wcagAudit(ir2);
      };
      graph.remediateAccessibility = () => {
        const ir2 = graph._ir || {};
        return remediateAccessibility(ir2);
      };
      graph.getAccessibilityReport = () => {
        const ir2 = graph._ir || {};
        return generateAccessibilityReport(ir2);
      };
      return graph;
    }
    /**
     * Batteries-included analysis: runs the full pipeline and returns
     * a document ready for hybrid search, reasoning, and concept queries.
     *
     * Usage:
     *   const doc = await CodbDocs.load(file);
     *   await doc.prepare();
     *   const result = await doc.askEnhanced("Who approved the $425,000 contract?");
     */
    async prepare(opts = {}) {
      return this.analyze({
        ocr: true,
        visual: false,
        extractVectors: true,
        extractExtended: true,
        ...opts
      });
    }
    /**
     * Quick text-only extraction (no analysis).
     */
    async extractText(opts = {}) {
      const { ocr = true, onProgress } = opts;
      const pages2 = [];
      for (let num = 1; num <= this.pageCount; num++) {
        onProgress && onProgress({ page: num, total: this.pageCount, status: "reading" });
        const page = await this._pdf.getPage(num);
        const content = await page.getTextContent();
        const nativeText = content.items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim();
        let text = nativeText;
        let source = "native";
        const qualityScore = computeTextQuality(content.items, page.getViewport({ scale: 1 }));
        if (qualityScore < config.qualityThreshold && ocr) {
          onProgress && onProgress({ page: num, total: this.pageCount, status: "ocr" });
          try {
            const canvas = await renderPageToCanvas(page, config.ocrScale);
            const Tesseract = getTesseract();
            const { data } = await Tesseract.recognize(canvas, config.ocrLang);
            text = (data.text || "").trim();
            source = "ocr";
          } catch {
            text = "";
            source = "error";
          }
        } else if (qualityScore < config.qualityThreshold) {
          source = "skipped";
          text = "";
        }
        pages2.push({ num, text, source });
      }
      return {
        pageCount: this.pageCount,
        pages: pages2,
        fullText: pages2.map((p) => `--- page ${p.num} (${p.source}) ---
${p.text}`).join("\n\n")
      };
    }
    async renderPage(pageNum, scale = 1.5) {
      const page = await this._pdf.getPage(pageNum);
      return renderPageToCanvas(page, scale);
    }
    /**
     * Process pages in batches for large PDFs (900+ pages).
     * This reduces memory usage by processing pages in chunks.
     */
    async analyzeBatched(opts = {}) {
      const {
        batchSize = 50,
        ocr = true,
        visual = false,
        extractVectors: extractVecs = true,
        extractExtended = true,
        onPageComplete,
        onProgress,
        onLayer,
        onBatchComplete
      } = opts;
      const graph = new DocumentGraph();
      const contentGraph = new DocumentContentGraph();
      const ir = createIR();
      if (extractExtended) {
        try {
          ir.document.metadata = await extractDocumentMetadata(this._pdf);
          ir.document.navigation = {
            outline: await extractOutline(this._pdf),
            destinations: await extractNamedDestinations(this._pdf),
            labels: await extractPageLabels(this._pdf)
          };
          ir.document.security = await extractSecurity(this._pdf);
        } catch (e) {
          console.error("[codbdocs] Document-level extraction error:", e);
        }
      }
      const totalPages = this.pageCount;
      for (let batchStart = 1; batchStart <= totalPages; batchStart += batchSize) {
        const batchEnd = Math.min(batchStart + batchSize - 1, totalPages);
        onProgress && onProgress({
          page: batchStart,
          total: totalPages,
          status: "batch",
          batch: { start: batchStart, end: batchEnd, total: Math.ceil(totalPages / batchSize) }
        });
        for (let num = batchStart; num <= batchEnd; num++) {
          const page = await this._pdf.getPage(num);
          const viewport = page.getViewport({ scale: 1 });
          const pageSize = { width: viewport.width, height: viewport.height };
          const content = await page.getTextContent();
          const nativeText = content.items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim();
          let text = nativeText;
          let source = "native";
          let confidence = null;
          const qualityScore = computeTextQuality(content.items, pageSize);
          if (qualityScore < config.qualityThreshold && ocr) {
            try {
              const canvas = await renderPageToCanvas(page, config.ocrScale);
              const Tesseract = getTesseract();
              const { data } = await Tesseract.recognize(canvas, config.ocrLang);
              text = (data.text || "").trim();
              source = "ocr";
              confidence = data.confidence;
            } catch (err) {
              source = "error";
              text = "";
            }
          }
          let spatial = null;
          let structures = null;
          let metadata = null;
          let classification = null;
          if (config.enableBrain) {
            spatial = analyzeSpatialLayout(content.items, pageSize);
            structures = detectStructure(spatial, pageSize);
            metadata = extractMetadata(text);
            classification = classifyPage(text, spatial);
          }
          let contentPageGraph = null;
          if (config.enableContent) {
            contentPageGraph = analyzeContent(num, text, spatial, metadata);
            contentGraph.addPageGraph(contentPageGraph);
          }
          let vectors = [];
          if (extractVecs) {
            try {
              vectors = await extractVectors(page);
            } catch (e) {
            }
          }
          let structureTree = null;
          try {
            structureTree = await extractStructureTree(page);
          } catch (e) {
          }
          let annotations = [];
          try {
            annotations = await extractAnnotations(page);
          } catch (e) {
          }
          const irPage = addPage(ir, num, {
            width: pageSize.width,
            height: pageSize.height,
            rotation: page.rotate,
            mediaBox: page.mediaBox,
            cropBox: page.cropBox
          });
          for (const vec of vectors) addVectorObject(ir, `page_${num}`, vec);
          for (const item of content.items) {
            if (item.str && item.str.trim()) {
              addTextObject(ir, `page_${num}`, {
                text: item.str,
                bbox: [item.transform[4], item.transform[5], item.width, item.height],
                font: item.fontName,
                fontSize: Math.abs(item.transform[0]) || 12,
                transform: item.transform
              });
            }
          }
          if (annotations.length > 0) {
            irPage.annotations = annotations;
            ir.annotations[`page_${num}`] = annotations;
          }
          if (structureTree) ir.structure[`page_${num}`] = structureTree;
          if (extractExtended) {
            try {
              irPage.markedContent = await extractMarkedContent(page);
            } catch (e) {
            }
            try {
              irPage.artifacts = await extractArtifacts(page);
            } catch (e) {
            }
            try {
              irPage.glyphs = await extractGlyphs(page);
            } catch (e) {
            }
          }
          let readingOrder = [];
          try {
            readingOrder = detectReadingOrder(ir, num);
          } catch (e) {
          }
          const pageResult = {
            num,
            text,
            source,
            confidence,
            pageSize,
            spatial,
            structures,
            metadata,
            classification,
            contentBlocks: contentPageGraph ? contentPageGraph.blocks.length : 0,
            contentEntities: contentPageGraph ? contentPageGraph.entities.length : 0,
            vectors: vectors.length,
            annotations: annotations.length,
            hasStructureTree: !!structureTree,
            readingOrder: readingOrder.length
          };
          graph.addPageResult(pageResult);
          onPageComplete && onPageComplete(pageResult);
          try {
            page.cleanup();
          } catch (e) {
          }
        }
        onBatchComplete && onBatchComplete({
          batchStart,
          batchEnd,
          completed: batchEnd,
          total: totalPages
        });
      }
      if (config.enableContent) {
        contentGraph.documentType = classifyDocumentType(contentGraph);
      }
      graph._contentGraph = contentGraph;
      graph._doc = this;
      graph._ir = ir;
      graph.find = (query) => executeQuery(contentGraph, query, graph);
      graph.findOne = (query) => {
        const results = contentGraph.find(query);
        return results.length > 0 ? results[0] : null;
      };
      graph.ask = (question) => executeAsk(contentGraph, question, graph);
      graph.getEntities = (type) => contentGraph.getEntities(type);
      graph.getBlocks = (type) => contentGraph.getBlocks(type);
      graph.getDocumentType = () => contentGraph.documentType;
      graph.getIR = () => ir;
      graph.auditAccessibility = () => auditAccessibility(ir);
      graph.getAccessibilityTree = () => generateAccessibilityTree(ir);
      graph.toHTML = (options) => exportHTML(ir, options);
      graph.getVectors = (pageNum) => ir.pages[`page_${pageNum}`]?.vectors?.map((id) => ir.vectors[id]) || [];
      graph.getStructureTree = (pageNum) => ir.structure[`page_${pageNum}`] || null;
      graph.getAnnotations = (pageNum) => ir.annotations[`page_${pageNum}`] || [];
      graph.getFormFields = () => ir.forms?.fields || [];
      graph.getReadingOrder = (pageNum) => detectReadingOrder(ir, pageNum);
      graph.getReadingOrderSequence = (pageNum) => getReadingOrderSequence(ir, pageNum);
      graph.getMetadata = () => ir.document.metadata;
      graph.getOutline = () => ir.document.navigation.outline || [];
      graph.getNamedDestinations = () => ir.document.navigation.destinations || {};
      graph.getPageLabels = () => ir.document.navigation.labels || [];
      graph.getSecurity = () => ir.document.security;
      graph.getMarkedContent = (pageNum) => ir.pages[`page_${pageNum}`]?.markedContent || [];
      graph.getArtifacts = (pageNum) => ir.pages[`page_${pageNum}`]?.artifacts || [];
      graph.getGlyphs = (pageNum) => ir.pages[`page_${pageNum}`]?.glyphs || [];
      graph.getRemediations = () => generateRemediations(graph.auditAccessibility(), ir);
      graph.wcagAudit = () => wcagAudit(ir);
      graph.toAccessibleHTML = (options) => exportAccessibleHTML(ir, options);
      graph.remediateAccessibility = (options) => {
        const result = remediateAccessibility(ir, options);
        return result.report;
      };
      graph.getAccessibilityReport = () => generateAccessibilityReport(ir);
      graph.createChunks = (options) => createChunks(graph, options);
      graph.getCrossPageContext = () => buildCrossPageContext(graph);
      graph.toRAG = (options) => createRAGOutput(graph, options);
      return graph;
    }
    destroy() {
      if (this._pdf) this._pdf.destroy();
    }
  };
  function computeTextQuality(contentItems, pageSize) {
    if (!contentItems || contentItems.length === 0) return 0;
    let score = 1;
    const allText = contentItems.map((i) => i.str || "").join(" ");
    const wordCount = allText.split(/\s+/).filter((w) => w.length > 0).length;
    if (wordCount < 5) score -= 0.4;
    else if (wordCount < 15) score -= 0.2;
    const nonPrintable = allText.replace(/[\x20-\x7E\n\r\t]/g, "").length;
    const nonPrintRatio = allText.length > 0 ? nonPrintable / allText.length : 0;
    if (nonPrintRatio > 0.3) score -= 0.3;
    const outsideBounds = contentItems.filter((item) => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      return x < 0 || x > pageSize.width || y < 0 || y > pageSize.height;
    }).length;
    const outsideRatio = contentItems.length > 0 ? outsideBounds / contentItems.length : 0;
    if (outsideRatio > 0.5) score -= 0.3;
    const words = allText.split(/\s+/).filter((w) => w.length > 0);
    const avgWordLen = words.length > 0 ? words.reduce((s, w) => s + w.length, 0) / words.length : 0;
    if (avgWordLen < 1.5 || avgWordLen > 25) score -= 0.2;
    const fragments = contentItems.map((i) => (i.str || "").trim()).filter((t) => t.length > 3);
    const uniqueFragments = new Set(fragments.map((f) => f.toLowerCase()));
    const duplicateRatio = fragments.length > 0 ? 1 - uniqueFragments.size / fragments.length : 0;
    if (duplicateRatio > 0.5) score -= 0.15;
    const uniqueChars = new Set(allText.replace(/\s/g, "")).size;
    if (uniqueChars < 10 && wordCount > 10) score -= 0.15;
    return Math.max(0, Math.min(1, score));
  }
  function inferImageRole(img, contentItems, pageSize) {
    if (!img.bbox) return "unknown";
    const imgY = img.bbox.y || 0;
    const imgCenterY = imgY + (img.bbox.height || 0) / 2;
    const normalizedY = imgCenterY / pageSize.height;
    if (normalizedY < 0.15) return "header";
    if (normalizedY > 0.85) return "footer";
    if (normalizedY < 0.3 && img.originalWidth < 300 && img.originalHeight < 150) return "logo";
    if (img.originalWidth > 400 && img.originalHeight > 300) {
      const centerX = (img.bbox.x || 0) + (img.bbox.width || 0) / 2;
      if (centerX > pageSize.width * 0.2 && centerX < pageSize.width * 0.8) return "chart";
    }
    if (img.originalWidth < 50 && img.originalHeight < 50) return "icon";
    const nearbyText = contentItems.filter((item) => {
      const y = item.transform?.[5] || 0;
      return Math.abs(y - imgY) < 100;
    }).map((item) => item.str || "").join(" ");
    if (/figure|fig\.|chart|graph|diagram|image|photo|picture/i.test(nearbyText)) return "figure";
    if (/logo|emblem|seal|crest|badge/i.test(nearbyText)) return "logo";
    return "content";
  }
  function fuseNativeOCR(nativeText, ocrText, contentItems, pageSize) {
    if (!nativeText || !ocrText) return nativeText || ocrText || "";
    const nativeQuality = computeTextQuality(contentItems, pageSize);
    if (nativeQuality > 0.8) {
      return nativeText;
    }
    if (ocrText.length > nativeText.length * 1.5) {
      return ocrText;
    }
    const nativeWords = new Set(nativeText.toLowerCase().split(/\s+/));
    const ocrWords = ocrText.split(/\s+/);
    const missingWords = ocrWords.filter((w) => !nativeWords.has(w.toLowerCase()));
    if (missingWords.length > 0 && missingWords.length < ocrWords.length * 0.3) {
      return nativeText;
    }
    return nativeText.length >= ocrText.length ? nativeText : ocrText;
  }
  function findNearestCaption(img, contentItems, pageSize) {
    if (!img.bbox) return null;
    const imgY = img.bbox.y || 0;
    const imgBottom = imgY;
    const imgLeft = img.bbox.x || 0;
    const imgRight = imgLeft + (img.bbox.width || 0);
    const candidates = contentItems.filter((item) => {
      const y = item.transform?.[5] || 0;
      const x = item.transform?.[4] || 0;
      const below = y < imgBottom && y > imgBottom - 100;
      const overlap = x >= imgLeft - 50 && x <= imgRight + 50;
      return below && overlap && item.str && item.str.trim().length > 5;
    }).sort((a, b) => {
      const distA = imgBottom - (a.transform?.[5] || 0);
      const distB = imgBottom - (b.transform?.[5] || 0);
      return distA - distB;
    });
    if (candidates.length === 0) return null;
    const firstText = candidates[0].str.trim();
    if (/^(figure|fig\.|chart|graph|diagram|table|photo|image|picture)/i.test(firstText)) {
      return firstText;
    }
    return firstText;
  }
  function extractNearbyText(img, contentItems, pageSize) {
    if (!img.bbox) return "";
    const imgX = img.bbox[0] || 0;
    const imgY = img.bbox[1] || 0;
    const imgW = img.bbox[2] || 0;
    const imgH = img.bbox[3] || 0;
    const margin = 150;
    const nearby = contentItems.filter((item) => {
      const x = item.transform?.[4] || 0;
      const y = item.transform?.[5] || 0;
      const inX = x >= imgX - margin && x <= imgX + imgW + margin;
      const inY = y >= imgY - margin && y <= imgY + imgH + margin;
      return inX && inY && item.str && item.str.trim().length > 0;
    }).sort((a, b) => {
      const aDist = Math.abs((a.transform?.[4] || 0) - imgX) + Math.abs((a.transform?.[5] || 0) - imgY);
      const bDist = Math.abs((b.transform?.[4] || 0) - imgX) + Math.abs((b.transform?.[5] || 0) - imgY);
      return aDist - bDist;
    }).slice(0, 20).map((item) => item.str.trim()).join(" ");
    return nearby;
  }
  async function renderPageToCanvas(page, scale) {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas;
  }
  var CodbDocs = { load, configure, canUseWorkers };
  var index_default = CodbDocs;
  return __toCommonJS(index_exports);
})();
