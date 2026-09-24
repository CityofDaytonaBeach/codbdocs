/**
 * @codbdocs/core — PDF Creator (Round-trip Fidelity)
 *
 * Generate PDF documents from the PDF-IR.
 * Supports three fidelity levels:
 *   LEVEL 1: Content equivalent (text, images, forms, links)
 *   LEVEL 2: Semantic equivalent (structure, reading order, accessibility)
 *   LEVEL 3: Visual equivalent (geometry, colors, fonts, transparency)
 */

/**
 * PDF Creator class for generating PDFs from IR.
 */
export class PDFCreator {
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
      level = 2, // 1=content, 2=semantic, 3=visual
      includeMetadata = true,
      includeStructure = true,
      includeAccessibility = true,
      pageSize = 'letter',
    } = options;

    this.objects = [];
    this.pages = [];

    // Build PDF structure
    const pdf = {
      version: '1.7',
      header: '%PDF-1.7',
      body: {},
      trailer: {},
    };

    // Add catalog
    const catalogId = this.nextObjectId();
    pdf.body[catalogId] = {
      type: 'catalog',
      pages: null, // Will be set after pages
    };

    // Add pages
    const pagesId = this.nextObjectId();
    pdf.body[pagesId] = {
      type: 'pages',
      kids: [],
      count: 0,
    };
    pdf.body[catalogId].pages = pagesId;

    // Add metadata if requested
    if (includeMetadata && ir.document?.metadata) {
      const metaId = this.nextObjectId();
      pdf.body[metaId] = {
        type: 'metadata',
        data: ir.document.metadata,
      };
    }

    // Process each page
    for (const [pageId, pageData] of Object.entries(ir.pages)) {
      const pageNum = parseInt(pageId.replace('page_', ''));
      const newPageId = this.nextObjectId();

      const pageObj = {
        type: 'page',
        parent: pagesId,
        mediaBox: pageData.mediaBox || [0, 0, 612, 792], // Letter size default
        cropBox: pageData.cropBox || null,
        rotate: pageData.rotation || 0,
        resources: {},
        contents: [],
        annotations: [],
      };

      // Add page resources
      pageObj.resources = this.buildPageResources(pageData, ir);

      // Add content stream
      const contentId = this.nextObjectId();
      const contentStream = this.buildContentStream(pageData, ir, level);
      pdf.body[contentId] = {
        type: 'stream',
        data: contentStream,
        length: contentStream.length,
      };
      pageObj.contents.push(contentId);

      // Add annotations
      if (pageData.annotations && level >= 1) {
        for (const ann of pageData.annotations) {
          const annId = this.nextObjectId();
          pdf.body[annId] = {
            type: 'annotation',
            data: ann,
          };
          pageObj.annotations.push(annId);
        }
      }

      // Add structure tree reference
      if (includeStructure && ir.structure?.[pageId] && level >= 2) {
        const structId = this.nextObjectId();
        pdf.body[structId] = {
          type: 'struct_tree',
          data: ir.structure[pageId],
        };
        pageObj.structParents = structId;
      }

      pdf.body[newPageId] = pageObj;
      pdf.body[pagesId].kids.push(newPageId);
      this.pages.push(newPageId);
    }

    pdf.body[pagesId].count = this.pages.length;

    // Build trailer
    pdf.trailer = {
      root: catalogId,
      info: null,
      size: this.currentObject,
    };

    // Serialize to PDF bytes
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
      extGState: {},
    };

    // Collect fonts from page content
    const fonts = new Set();
    const pageObjects = (pageData.content || []).map(id => ir.objects?.[id]).filter(Boolean);

    for (const obj of pageObjects) {
      if (obj.raw?.font) {
        fonts.add(obj.raw.font);
      }
    }

    // Add font resources
    let fontIndex = 0;
    for (const fontName of fonts) {
      const fontRef = `F${fontIndex++}`;
      resources.font[fontRef] = {
        type: fontName.includes('Bold') ? 'Font' : 'Font',
        baseFont: fontName,
        encoding: 'WinAnsiEncoding',
      };
    }

    return resources;
  }

  /**
   * Build content stream for a page.
   */
  buildContentStream(pageData, ir, level) {
    const commands = [];
    const objects = (pageData.content || []).map(id => ir.objects?.[id]).filter(Boolean);

    // Sort by reading order if level >= 2
    const sortedObjects = level >= 2
      ? this.sortByReadingOrder(objects, pageData)
      : objects;

    for (const obj of sortedObjects) {
      if (obj.type === 'text' && obj.raw?.text) {
        // Text object
        const text = obj.raw.text;
        const fontSize = obj.raw.fontSize || 12;
        const x = obj.bbox?.[0] || 0;
        const y = obj.bbox?.[1] || 0;

        // Find font reference
        const fontRef = this.findFontRef(obj.raw.font, pageData, ir);

        commands.push(`q`); // Save graphics state

        // Apply transform if level 3
        if (level >= 3 && obj.raw.transform) {
          const t = obj.raw.transform;
          commands.push(`${t[0]} ${t[1]} ${t[2]} ${t[3]} ${t[4]} ${t[5]} cm`);
        }

        // Set font
        commands.push(`/${fontRef} ${fontSize} Tf`);

        // Set color
        if (obj.semantic?.color) {
          const c = obj.semantic.color;
          commands.push(`${c[0]} ${c[1]} ${c[2]} rg`);
        }

        // Position and show text
        commands.push(`${x} ${y} Td`);
        commands.push(`(${this.escapePDFString(text)}) Tj`);

        commands.push(`Q`); // Restore graphics state
      } else if (obj.type === 'image' && obj.raw?.src && level >= 3) {
        this.addImageCommands(commands, obj);
      }
    }

    // Add vector objects for level 3
    if (level >= 3) {
      for (const vecId of (pageData.vectors || [])) {
        const vec = ir.vectors?.[vecId];
        if (vec) {
          this.addVectorCommands(commands, vec);
        }
      }
    }

    return commands.join('\n');
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
    // Simplified - in real implementation would lookup from resources
    return 'F0';
  }

  /**
   * Add vector drawing commands.
   */
  addVectorCommands(commands, vec) {
    if ((!vec.points || vec.points.length === 0) && vec.type !== 'rect') return;

    commands.push('q'); // Save state

    if (vec.graphicsState?.transform) {
      const t = vec.graphicsState.transform;
      commands.push(`${this.num(t[0])} ${this.num(t[1])} ${this.num(t[2])} ${this.num(t[3])} ${this.num(t[4])} ${this.num(t[5])} cm`);
    }

    // Set stroke color
    const stroke = this.normalizeColor(vec.graphicsState?.stroke);
    if (stroke) {
      commands.push(`${stroke.map(c => this.num(c)).join(' ')} RG`);
    }

    // Set fill color
    const fill = this.normalizeColor(vec.graphicsState?.fill);
    if (fill) {
      commands.push(`${fill.map(c => this.num(c)).join(' ')} rg`);
    }

    // Set line width
    if (vec.graphicsState?.lineWidth) {
      commands.push(`${vec.graphicsState.lineWidth} w`);
    }

    if (Array.isArray(vec.graphicsState?.dash)) {
      const dash = vec.graphicsState.dash;
      const pattern = Array.isArray(dash[0]) ? dash[0] : dash;
      const phase = Array.isArray(dash[0]) ? dash[1] || 0 : 0;
      commands.push(`[${pattern.join(' ')}] ${phase} d`);
    }

    if (vec.type === 'rect' && Array.isArray(vec.bbox)) {
      commands.push(`${this.num(vec.bbox[0])} ${this.num(vec.bbox[1])} ${this.num(vec.bbox[2])} ${this.num(vec.bbox[3])} re`);
      commands.push(fill && stroke ? 'B' : fill ? 'f' : 'S');
      commands.push('Q');
      return;
    }

    // Draw path
    const firstPoint = vec.points[0];
    if (firstPoint.op === 'moveTo') commands.push(`${this.num(firstPoint.x)} ${this.num(firstPoint.y)} m`);

    for (let i = 1; i < vec.points.length; i++) {
      const pt = vec.points[i];
      if (pt.op === 'moveTo') {
        commands.push(`${this.num(pt.x)} ${this.num(pt.y)} m`);
      } else if (pt.op === 'lineTo') {
        commands.push(`${this.num(pt.x)} ${this.num(pt.y)} l`);
      } else if (pt.op === 'curveTo') {
        commands.push(`${this.num(pt.x1)} ${this.num(pt.y1)} ${this.num(pt.x2)} ${this.num(pt.y2)} ${this.num(pt.x ?? pt.x3)} ${this.num(pt.y ?? pt.y3)} c`);
      } else if (pt.op === 'closePath') {
        commands.push('h');
      }
    }

    // Stroke or fill
    commands.push(fill && stroke ? 'B' : fill ? 'f' : 'S');

    commands.push('Q'); // Restore state
  }

  addImageCommands(commands, obj) {
    const src = String(obj.raw.src || '');
    if (/^data:image\/svg\+xml/i.test(src)) {
      this.addSvgCommands(commands, src, obj.bbox);
    }
  }

  addSvgCommands(commands, src, bbox) {
    const svg = this.decodeDataUrl(src);
    if (!svg || !Array.isArray(bbox)) return;
    const viewBox = /viewBox\s*=\s*["']([^"']+)["']/i.exec(svg)?.[1]?.trim().split(/[\s,]+/).map(Number);
    const width = viewBox?.[2] || Number(/\bwidth\s*=\s*["']([0-9.]+)/i.exec(svg)?.[1]) || bbox[2] || 1;
    const height = viewBox?.[3] || Number(/\bheight\s*=\s*["']([0-9.]+)/i.exec(svg)?.[1]) || bbox[3] || 1;
    const sx = (bbox[2] || width) / width;
    const sy = (bbox[3] || height) / height;
    commands.push('q');
    commands.push(`${this.num(sx)} 0 0 ${this.num(sy)} ${this.num(bbox[0] || 0)} ${this.num(bbox[1] || 0)} cm`);
    for (const shape of this.svgShapes(svg)) {
      const stroke = this.cssColor(shape.stroke);
      const fill = this.cssColor(shape.fill);
      if (stroke) commands.push(`${stroke.map(c => this.num(c)).join(' ')} RG`);
      if (fill) commands.push(`${fill.map(c => this.num(c)).join(' ')} rg`);
      if (shape.strokeWidth) commands.push(`${this.num(shape.strokeWidth)} w`);
      commands.push(...shape.commands);
      commands.push(fill && stroke ? 'B' : fill ? 'f' : 'S');
    }
    commands.push('Q');
  }

  svgShapes(svg) {
    const out = [];
    const attr = (tag, name) => new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, 'i').exec(tag)?.[1];
    const style = (tag, name) => new RegExp(`${name}\\s*:\\s*([^;"']+)`, 'i').exec(attr(tag, 'style') || '')?.[1];
    const paint = (tag, name, fallback) => attr(tag, name) || style(tag, name) || fallback;
    const strokeWidth = (tag) => Number(attr(tag, 'stroke-width') || style(tag, 'stroke-width') || 1);

    for (const match of svg.matchAll(/<path\b[^>]*\bd\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
      const tag = match[0];
      const commands = this.svgPathToPdf(match[1]);
      if (commands.length) out.push({
        commands,
        fill: paint(tag, 'fill', '#000'),
        stroke: paint(tag, 'stroke', null),
        strokeWidth: strokeWidth(tag),
      });
    }
    for (const match of svg.matchAll(/<rect\b[^>]*>/gi)) {
      const tag = match[0];
      const x = Number(attr(tag, 'x') || 0);
      const y = Number(attr(tag, 'y') || 0);
      const w = Number(attr(tag, 'width') || 0);
      const h = Number(attr(tag, 'height') || 0);
      if (w && h) out.push({
        commands: [`${this.num(x)} ${this.num(y)} ${this.num(w)} ${this.num(h)} re`],
        fill: paint(tag, 'fill', '#000'),
        stroke: paint(tag, 'stroke', null),
        strokeWidth: strokeWidth(tag),
      });
    }
    for (const match of svg.matchAll(/<line\b[^>]*>/gi)) {
      const tag = match[0];
      const x1 = Number(attr(tag, 'x1') || 0);
      const y1 = Number(attr(tag, 'y1') || 0);
      const x2 = Number(attr(tag, 'x2') || 0);
      const y2 = Number(attr(tag, 'y2') || 0);
      out.push({
        commands: [`${this.num(x1)} ${this.num(y1)} m`, `${this.num(x2)} ${this.num(y2)} l`],
        fill: null,
        stroke: paint(tag, 'stroke', '#000'),
        strokeWidth: strokeWidth(tag),
      });
    }
    return out;
  }

  svgPathToPdf(d) {
    const tokens = String(d || '').match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/g) || [];
    const commands = [];
    let i = 0, cmd = null, x = 0, y = 0, sx = 0, sy = 0;
    const n = () => Number(tokens[i++]);
    const isCmd = () => /^[a-zA-Z]$/.test(tokens[i] || '');
    while (i < tokens.length) {
      if (isCmd()) cmd = tokens[i++];
      const rel = cmd === cmd?.toLowerCase();
      const c = cmd?.toUpperCase();
      if (c === 'M') {
        x = (rel ? x : 0) + n(); y = (rel ? y : 0) + n(); sx = x; sy = y;
        commands.push(`${this.num(x)} ${this.num(y)} m`);
        cmd = rel ? 'l' : 'L';
      } else if (c === 'L') {
        x = (rel ? x : 0) + n(); y = (rel ? y : 0) + n();
        commands.push(`${this.num(x)} ${this.num(y)} l`);
      } else if (c === 'H') {
        x = (rel ? x : 0) + n();
        commands.push(`${this.num(x)} ${this.num(y)} l`);
      } else if (c === 'V') {
        y = (rel ? y : 0) + n();
        commands.push(`${this.num(x)} ${this.num(y)} l`);
      } else if (c === 'C') {
        const x1 = (rel ? x : 0) + n(), y1 = (rel ? y : 0) + n();
        const x2 = (rel ? x : 0) + n(), y2 = (rel ? y : 0) + n();
        x = (rel ? x : 0) + n(); y = (rel ? y : 0) + n();
        commands.push(`${this.num(x1)} ${this.num(y1)} ${this.num(x2)} ${this.num(y2)} ${this.num(x)} ${this.num(y)} c`);
      } else if (c === 'Z') {
        commands.push('h'); x = sx; y = sy;
      } else {
        break;
      }
    }
    return commands;
  }

  decodeDataUrl(src) {
    const m = /^data:[^,]+,(.*)$/i.exec(src);
    if (!m) return '';
    if (/;base64,/i.test(src)) {
      if (typeof Buffer !== 'undefined') return Buffer.from(m[1], 'base64').toString('utf8');
      if (typeof atob === 'function') return decodeURIComponent(escape(atob(m[1])));
    }
    return decodeURIComponent(m[1]);
  }

  normalizeColor(value) {
    if (!value || value === 'none') return null;
    if (Array.isArray(value)) return value.slice(0, 3).map(v => Number(v) > 1 ? Number(v) / 255 : Number(v));
    if (Array.isArray(value.color)) {
      if (value.colorSpace === 'DeviceCMYK') {
        const [c = 0, m = 0, y = 0, k = 0] = value.color.map(v => Number(v) > 1 ? Number(v) / 100 : Number(v));
        return [(1 - c) * (1 - k), (1 - m) * (1 - k), (1 - y) * (1 - k)];
      }
      return value.color.slice(0, 3).map(v => Number(v) > 1 ? Number(v) / 255 : Number(v));
    }
    return this.cssColor(value);
  }

  cssColor(value) {
    if (!value || value === 'none' || value === 'transparent') return null;
    const named = { black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff' };
    value = String(named[value] || value).trim();
    const rgb = /^rgb\(([^)]+)\)$/i.exec(value);
    if (rgb) return rgb[1].split(',').slice(0, 3).map(v => Number(v.trim()) / 255);
    const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value);
    if (!hex) return null;
    const h = hex[1].length === 3 ? hex[1].split('').map(ch => ch + ch).join('') : hex[1];
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
  }

  num(value) {
    const n = Number(value);
    return Number.isFinite(n) ? String(Math.round(n * 1000) / 1000) : '0';
  }

  /**
   * Escape string for PDF content stream.
   */
  escapePDFString(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
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

    // Header
    parts.push(encoder.encode(pdf.header + '\n'));

    // Body
    for (const [id, obj] of Object.entries(pdf.body)) {
      const objStr = this.serializeObject(parseInt(id), obj);
      parts.push(encoder.encode(objStr));
    }

    // Cross-reference table
    const xrefOffset = parts.reduce((sum, p) => sum + p.length, 0);
    parts.push(encoder.encode('xref\n'));
    parts.push(encoder.encode(`0 ${this.currentObject}\n`));
    parts.push(encoder.encode('0000000000 65535 f \n'));

    // Object offsets (simplified - would need to track in real implementation)
    for (let i = 1; i < this.currentObject; i++) {
      parts.push(encoder.encode(`${String(xrefOffset).padStart(10, '0')} 00000 n \n`));
    }

    // Trailer
    parts.push(encoder.encode('trailer\n'));
    parts.push(encoder.encode(`<< /Size ${this.currentObject} /Root ${pdf.trailer.root} >>\n`));
    parts.push(encoder.encode('startxref\n'));
    parts.push(encoder.encode(`${xrefOffset}\n`));
    parts.push(encoder.encode('%%EOF\n'));

    // Combine all parts
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
    let str = `${id} 0 obj\n`;

    switch (obj.type) {
      case 'catalog':
        str += `<< /Type /Catalog /Pages ${obj.pages} 0 R >>\n`;
        break;

      case 'pages':
        str += `<< /Type /Pages /Kids [${obj.kids.map(k => `${k} 0 R`).join(' ')}] /Count ${obj.count} >>\n`;
        break;

      case 'page':
        str += `<< /Type /Page /Parent ${obj.parent} 0 R`;
        str += ` /MediaBox [${(obj.mediaBox || [0, 0, 612, 792]).join(' ')}]`;
        if (obj.rotate) str += ` /Rotate ${obj.rotate}`;
        if (obj.contents?.length) {
          str += ` /Contents [${obj.contents.map(c => `${c} 0 R`).join(' ')}]`;
        }
        if (obj.annotations?.length) {
          str += ` /Annots [${obj.annotations.map(a => `${a} 0 R`).join(' ')}]`;
        }
        str += ' >>\n';
        break;

      case 'stream':
        str += `<< /Length ${obj.length} >>\n`;
        str += 'stream\n';
        str += obj.data + '\n';
        str += 'endstream\n';
        break;

      case 'annotation':
        const ann = obj.data;
        str += `<< /Type /Annot /Subtype /${ann.subtype || 'Text'}`;
        if (ann.rect) str += ` /Rect [${ann.rect.join(' ')}]`;
        if (ann.contents) str += ` /Contents (${this.escapePDFString(ann.contents)})`;
        str += ' >>\n';
        break;

      case 'metadata':
        str += `<< /Type /Metadata /Subtype /XML >>\n`;
        str += 'stream\n';
        str += '<?xml version="1.0" encoding="UTF-8"?>\n';
        str += '<x:xmpmeta xmlns:x="adobe:ns:meta/">\n';
        str += '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n';
        if (obj.data.title) {
          str += `<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">\n`;
          str += `<dc:title>${this.escapePDFString(obj.data.title)}</dc:title>\n`;
          str += '</rdf:Description>\n';
        }
        str += '</rdf:RDF>\n';
        str += '</x:xmpmeta>\n';
        str += 'endstream\n';
        break;

      default:
        str += '<< >>\n';
    }

    str += 'endobj\n\n';
    return str;
  }
}

/**
 * Create a PDF from IR (convenience function).
 */
export async function createPDF(ir, options = {}) {
  const creator = new PDFCreator();
  return creator.create(ir, options);
}

/**
 * Create a minimal PDF from text content.
 */
export async function createTextPDF(pages, options = {}) {
  const ir = {
    document: { metadata: options.metadata || {} },
    pages: {},
    objects: {},
    structure: {},
    annotations: {},
  };

  for (let i = 0; i < pages.length; i++) {
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
      annotations: [],
    };

    // Add text objects
    const text = typeof pages[i] === 'string' ? pages[i] : pages[i].text || '';
    const lines = text.split('\n');

    for (let j = 0; j < lines.length; j++) {
      const objId = `text_${i}_${j}`;
      ir.objects[objId] = {
        id: objId,
        type: 'text',
        page: pageId,
        raw: {
          text: lines[j],
          font: 'Helvetica',
          fontSize: 12,
          transform: [12, 0, 0, 12, 72, 720 - (j * 14)],
        },
        semantic: {
          role: 'paragraph',
          text: lines[j],
        },
        bbox: [72, 720 - (j * 14), lines[j].length * 7, 12],
      };
      ir.pages[pageId].content.push(objId);
    }
  }

  return createPDF(ir, options);
}
