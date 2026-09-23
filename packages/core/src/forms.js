import { extractXfaFormFields, normalizeFormField } from './pdfir.js';
export { parseAcrobatFormRules } from './formrules.js';

function getPdfjs() {
  const lib = typeof window !== 'undefined' && (window['pdfjs-dist/build/pdf'] || window.pdfjsLib);
  if (!lib) throw new Error('[codbdocs] pdfjsLib not found. Load PDF.js before saving a filled PDF.');
  return lib;
}

async function sourceBytes(source) {
  if (source instanceof Uint8Array) return source.slice(0);
  if (source instanceof ArrayBuffer) return new Uint8Array(source.slice(0));
  if (source && typeof source.arrayBuffer === 'function') return new Uint8Array(await source.arrayBuffer());
  if (typeof source === 'string') {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`[codbdocs] Unable to load PDF (${response.status}).`);
    return new Uint8Array(await response.arrayBuffer());
  }
  throw new Error('[codbdocs] Unsupported PDF source.');
}

function checkedFor(field, value) {
  const option = String(field.optionValue || 'On');
  if (Array.isArray(value)) return value.map(String).includes(option);
  if (typeof value === 'boolean') return value;
  return value != null && String(value) === option;
}

/** Apply normalized field values to a PDF.js PDFDocumentProxy annotation store. */
export function applyFormValuesToStorage(pdf, fields, values = {}) {
  if (!pdf?.annotationStorage) throw new Error('[codbdocs] The PDF document has no annotation storage.');
  let applied = 0;
  const stored = new Set();
  for (const field of fields || []) {
    const id = field.annotationId || field.id || (field.xfa ? field.dataId || field.name : null);
    const name = field.name || field.fieldName || field.dataId;
    if (!id || !name || !Object.prototype.hasOwnProperty.call(values, name)) continue;
    const value = values[name];
    if (field.fieldType === 'button' || field.fieldType === 'signature') continue;
    if (field.xfa && field.fieldType === 'radio') {
      if (stored.has(id)) continue;
      stored.add(id);
      const selected = (fields || []).find(item => item.xfa && item.name === name && String(item.optionValue) === String(value));
      pdf.annotationStorage.setValue(id, { value: selected ? selected.xfaOn || selected.optionValue : field.xfaOff || 'off' });
      applied += 1;
      continue;
    }
    if (field.xfa) {
      let next = value;
      if (field.fieldType === 'checkbox' || field.fieldType === 'radio') {
        next = checkedFor(field, value) ? field.optionValue || field.xfaOn || '1' : field.xfaOff || '0';
      }
      pdf.annotationStorage.setValue(id, { value: next == null ? '' : next });
    } else if (field.fieldType === 'checkbox' || field.fieldType === 'radio') {
      pdf.annotationStorage.setValue(id, { value: checkedFor(field, value) });
    } else {
      pdf.annotationStorage.setValue(id, { value: value == null ? '' : value });
    }
    applied += 1;
  }
  return applied;
}

async function extractFields(pdf) {
  if (pdf.isPureXfa) {
    const fields = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      if (typeof page.getXfa === 'function') fields.push(...extractXfaFormFields(await page.getXfa(), pageNumber));
    }
    return fields;
  }
  const fieldObjects = typeof pdf.getFieldObjects === 'function' ? await pdf.getFieldObjects() : null;
  const fields = [];
  for (const [name, widgets] of Object.entries(fieldObjects || {})) {
    for (const widget of Array.isArray(widgets) ? widgets : []) {
      const field = normalizeFormField({ ...widget, fieldName: widget.fieldName || name });
      if (field) fields.push({ ...field, annotationId: field.id });
    }
  }
  return fields;
}

/** Fill AcroForm/XFA storage and return a newly saved PDF as Uint8Array. */
export async function saveFilledPdf(source, values = {}, options = {}) {
  const pdfjsLib = getPdfjs();
  const bytes = await sourceBytes(source);
  const task = pdfjsLib.getDocument({ data: bytes.slice(0), enableXfa: options.enableXfa !== false });
  const pdf = await task.promise;
  try {
    const fields = options.fields || await extractFields(pdf);
    applyFormValuesToStorage(pdf, fields, values);
    return new Uint8Array(await pdf.saveDocument());
  } finally {
    try { await pdf.destroy(); } catch { /* ignore */ }
  }
}
