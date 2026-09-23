function flattenScripts(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach(item => flattenScripts(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach(item => flattenScripts(item, out));
  return out;
}

function quotedValues(text) {
  const values = [];
  const re = /["']([^"']+)["']/g;
  let match;
  while ((match = re.exec(String(text || '')))) values.push(match[1]);
  return values;
}

/** Parse a safe, declarative subset of Acrobat form actions. No PDF JavaScript is evaluated. */
export function parseAcrobatFormRules(actions) {
  const rules = { calculations: [], formats: [], validations: [], unsupportedScripts: [] };
  for (const script of flattenScripts(actions)) {
    let supported = false;
    let match = script.match(/AFSimple_Calculate\s*\(\s*["'](SUM|AVG|PRD|MIN|MAX)["']\s*,\s*([^)]*)\)/i);
    if (match) {
      rules.calculations.push({ type: 'aggregate', operation: match[1].toUpperCase(), fields: quotedValues(match[2]) });
      supported = true;
    }
    match = script.match(/AF(Number|Percent)_Format\s*\(\s*(\d+)/i);
    if (match) {
      rules.formats.push({ type: match[1].toLowerCase(), decimals: Number(match[2]) });
      supported = true;
    }
    match = script.match(/AFDate_FormatEx\s*\(\s*["']([^"']+)["']/i);
    if (match) {
      rules.formats.push({ type: 'date', pattern: match[1] });
      supported = true;
    }
    match = script.match(/AFRange_Validate\s*\(\s*(true|false)\s*,\s*(-?[\d.]+)\s*,\s*(true|false)\s*,\s*(-?[\d.]+)/i);
    if (match) {
      rules.validations.push({
        type: 'range',
        minimum: match[1] === 'true' ? Number(match[2]) : null,
        maximum: match[3] === 'true' ? Number(match[4]) : null,
      });
      supported = true;
    }
    if (/AF(Number|Percent)_Keystroke/i.test(script)) {
      rules.validations.push({ type: 'number' });
      supported = true;
    }
    if (/AFDate_KeystrokeEx/i.test(script)) {
      rules.validations.push({ type: 'date', pattern: quotedValues(script)[0] || null });
      supported = true;
    }
    if (!supported) rules.unsupportedScripts.push(script);
  }
  return rules;
}
