/**
 * @codbdocs/core — Concept Expansion Engine
 *
 * Model-free semantic expansion for deterministic retrieval.
 * Provides synonym dictionaries, stemming, n-gram generation,
 * fuzzy matching, acronym detection, and document-derived terminology.
 *
 * Architecture:
 *   Query → Expand → [original terms + synonyms + stems + n-grams]
 *   Document → Learn → [aliases, acronyms, definitions]
 */

// ─── Synonym Dictionaries ────────────────────────────────────────────────────

const CONCEPT_SYNONYMS = {
  contract: ['agreement', 'award', 'deal', 'pact', 'compact', 'accord', 'arrangement', 'understanding', 'contractual'],
  money: ['funds', 'payment', 'amount', 'cost', 'price', 'value', 'expenditure', 'expense', 'budget', 'appropriation', 'disbursement', 'compensation'],
  person: ['individual', 'person', 'applicant', 'representative', 'agent', 'officer', 'director', 'manager', 'official', 'employee', 'contractor', 'vendor'],
  organization: ['company', 'corporation', 'firm', 'agency', 'department', 'bureau', 'division', 'authority', 'board', 'commission', 'office', 'entity', 'contractor', 'vendor', 'supplier'],
  approve: ['authorize', 'ratify', 'endorse', 'sanction', 'confirm', 'adopt', 'certify', 'validate', 'accept', 'grant'],
  location: ['address', 'place', 'site', 'property', 'premises', 'location', 'area', 'district', 'zone', 'parcel'],
  date: ['time', 'period', 'deadline', 'due date', 'expiration', 'term', 'duration', 'interval', 'schedule'],
  purchase: ['buy', 'acquire', 'procure', 'obtain', 'order', 'bid', 'solicit', 'requisition'],
  project: ['work', 'initiative', 'program', 'effort', 'undertaking', 'endeavor', 'task', 'assignment'],
  department: ['division', 'bureau', 'unit', 'section', 'branch', 'office', 'team', 'group'],
  reduce: ['decrease', 'lower', 'cut', 'diminish', 'lessen', 'curtail', 'scale back'],
  increase: ['raise', 'grow', 'expand', 'elevate', 'boost', 'enhance', 'augment'],
  save: ['savings', 'reduction', 'decrease', 'lower', 'reduce', 'cost reduction', 'expenditure reduction'],
  comply: ['compliance', 'conform', 'adhere', 'follow', 'observe', 'meet', 'satisfy', 'fulfill'],
  terminate: ['end', 'cancel', 'expire', 'cease', 'discontinue', 'abrogate', 'revoke', 'rescind'],
  amend: ['modify', 'revise', 'change', 'alter', 'update', 'adjust', 'correct'],
  fund: ['funding', 'finance', 'capitalize', 'appropriate', 'allocate', 'budget'],
  perform: ['execute', 'deliver', 'complete', 'accomplish', 'fulfill', 'carry out', 'implement'],
  inspect: ['review', 'examine', 'audit', 'assess', 'evaluate', 'survey', 'investigate'],
  maintain: ['repair', 'upkeep', 'service', 'preserve', 'sustain', 'support'],
};

const ENTITY_TYPE_EXPANSIONS = {
  currency: ['dollar', 'amount', 'cost', 'price', 'fee', 'rate', 'charge', 'budget', 'appropriation', 'expenditure', 'payment', 'fund', 'revenue', 'tax', 'levy', 'assessment', 'fine', 'penalty', 'grant', 'subsidy'],
  date: ['day', 'month', 'year', 'deadline', 'expiration', 'term', 'period', 'duration', 'fiscal year', 'quarter', 'anniversary', 'effective date'],
  person: ['name', 'applicant', 'contact', 'signatory', 'witness', 'notary', 'official', 'officer', 'director', 'manager', 'supervisor', 'coordinator', 'administrator'],
  address: ['street', 'avenue', 'boulevard', 'road', 'drive', 'lane', 'court', 'place', 'way', 'suite', 'floor', 'building', 'city', 'state', 'zip'],
  phone: ['telephone', 'call', 'contact', 'number', 'fax', 'mobile', 'cell'],
  email: ['electronic mail', 'e-mail', 'address', 'contact', 'inbox'],
  organization: ['company', 'firm', 'agency', 'department', 'authority', 'board', 'commission', 'corporation', 'llc', 'inc', 'partnership', 'association', 'institution'],
};

// ─── Stemming (Lightweight Porter-like) ──────────────────────────────────────

const SUFFIX_RULES = [
  ['ational', 'ate'],
  ['tional', 'tion'],
  ['enci', 'ence'],
  ['anci', 'ance'],
  ['izer', 'ize'],
  ['ously', 'ous'],
  ['ively', 'ive'],
  ['ently', 'ent'],
  ['ation', 'ate'],
  ['alism', 'al'],
  ['iveness', 'ive'],
  ['fulness', 'ful'],
  ['ousness', 'ous'],
  ['ality', 'al'],
  ['biliti', 'ble'],
  ['logi', 'log'],
  ['sses', 'ss'],
  ['ies', 'i'],
  ['ss', 'ss'],
  ['s', ''],
  ['ement', ''],
  ['ment', ''],
  ['ence', ''],
  ['ance', ''],
  ['able', ''],
  ['ible', ''],
  ['ful', ''],
  ['ous', ''],
  ['ive', ''],
  ['ize', ''],
  ['ate', ''],
  ['ing', ''],
  ['tion', 't'],
  ['ness', ''],
  ['able', ''],
  ['edly', ''],
  ['ily', 'y'],
  ['ly', ''],
  ['er', ''],
  ['ed', ''],
];

/**
 * Light stemmer — reduces a word to its root form.
 */
export function stem(word) {
  if (!word || word.length < 4) return word;

  const lower = word.toLowerCase();

  // Don't stem very short words
  if (lower.length <= 3) return lower;

  for (const [suffix, replacement] of SUFFIX_RULES) {
    if (lower.endsWith(suffix) && lower.length - suffix.length >= 3) {
      const root = lower.slice(0, -suffix.length) + replacement;
      if (root.length >= 3) return root;
    }
  }

  return lower;
}

// ─── N-gram Generation ───────────────────────────────────────────────────────

/**
 * Generate character n-grams from a string.
 */
export function charNGrams(str, n = 3) {
  const grams = [];
  const lower = str.toLowerCase().replace(/\s+/g, ' ');
  for (let i = 0; i <= lower.length - n; i++) {
    grams.push(lower.substring(i, i + n));
  }
  return grams;
}

/**
 * Generate word n-grams from text.
 */
export function wordNGrams(text, n = 2) {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 1);
  const grams = [];
  for (let i = 0; i <= words.length - n; i++) {
    grams.push(words.slice(i, i + n).join(' '));
  }
  return grams;
}

// ─── Fuzzy Matching ──────────────────────────────────────────────────────────

/**
 * Levenshtein distance between two strings.
 */
export function levenshtein(a, b) {
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

/**
 * Fuzzy match score between two strings (0-1, 1 = exact match).
 */
export function fuzzyScore(a, b) {
  const al = a.toLowerCase().trim();
  const bl = b.toLowerCase().trim();

  if (al === bl) return 1;
  if (al.includes(bl) || bl.includes(al)) return 0.85;

  const maxLen = Math.max(al.length, bl.length);
  if (maxLen === 0) return 0;

  const dist = levenshtein(al, bl);
  return Math.max(0, 1 - dist / maxLen);
}

/**
 * Find the best fuzzy match for a query term in a vocabulary.
 */
export function bestFuzzyMatch(term, vocabulary, threshold = 0.6) {
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

// ─── Query Expansion ─────────────────────────────────────────────────────────

/**
 * Expand a query with synonyms, stems, and concept expansions.
 * Returns expanded terms with weights.
 *
 * @param {string} query - Natural language query
 * @param {Object} options
 * @param {boolean} options.includeSynonyms - Include synonym expansion (default: true)
 * @param {boolean} options.includeStems - Include stemmed variants (default: true)
 * @param {boolean} options.includeNGrams - Include n-gram variants (default: false)
 * @param {boolean} options.includeFuzzy - Include fuzzy matches (default: false)
 * @param {Object} options.documentTerms - Terms from the document for fuzzy matching
 * @returns {Array<{term: string, weight: number, source: string}>}
 */
export function expandQuery(query, options = {}) {
  const {
    includeSynonyms = true,
    includeStems = true,
    includeNGrams = false,
    includeFuzzy = false,
    documentTerms = null,
  } = options;

  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  const expanded = new Map(); // term -> { weight, sources }

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

  // 1. Original terms (highest weight)
  for (const term of terms) {
    addTerm(term, 1.0, 'original');
  }

  // 2. Synonym expansion
  if (includeSynonyms) {
    for (const term of terms) {
      const synonyms = findSynonyms(term);
      for (const syn of synonyms) {
        addTerm(syn, 0.7, 'synonym');
      }
    }

    // Multi-word phrase matching
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
          // Also add other synonyms
          for (const otherSyn of synonyms) {
            if (otherSyn !== syn) addTerm(otherSyn, 0.4, `concept:${syn}`);
          }
        }
      }
    }
  }

  // 3. Stemming
  if (includeStems) {
    for (const term of terms) {
      const s = stem(term);
      if (s !== term) addTerm(s, 0.5, 'stem');
    }
  }

  // 4. N-grams
  if (includeNGrams) {
    const fullQuery = terms.join(' ');
    const bigrams = wordNGrams(fullQuery, 2);
    for (const gram of bigrams) {
      addTerm(gram, 0.4, 'bigram');
    }
  }

  // 5. Fuzzy matching against document vocabulary
  if (includeFuzzy && documentTerms) {
    const vocab = Array.isArray(documentTerms) ? documentTerms : Object.keys(documentTerms);
    for (const term of terms) {
      const match = bestFuzzyMatch(term, vocab, 0.7);
      if (match && match.word !== term) {
        addTerm(match.word, 0.3 * match.score, 'fuzzy');
      }
    }
  }

  // Convert to array
  const result = [];
  for (const [term, data] of expanded) {
    result.push({
      term,
      weight: data.weight,
      sources: data.sources,
    });
  }

  result.sort((a, b) => b.weight - a.weight);
  return result;
}

/**
 * Find synonyms for a term from the dictionaries.
 */
function findSynonyms(term) {
  const lower = term.toLowerCase();
  const synonyms = new Set();

  // Direct lookup
  if (CONCEPT_SYNONYMS[lower]) {
    for (const syn of CONCEPT_SYNONYMS[lower]) {
      synonyms.add(syn);
    }
  }

  // Reverse lookup (find which concepts contain this term)
  for (const [concept, syns] of Object.entries(CONCEPT_SYNONYMS)) {
    if (syns.includes(lower)) {
      synonyms.add(concept);
      for (const syn of syns) {
        if (syn !== lower) synonyms.add(syn);
      }
    }
  }

  // Entity type expansion
  for (const [type, terms] of Object.entries(ENTITY_TYPE_EXPANSIONS)) {
    if (terms.includes(lower)) {
      synonyms.add(type);
    }
  }

  return Array.from(synonyms);
}

// ─── Document-Derived Knowledge Graph ────────────────────────────────────────

/**
 * Detect acronyms from parenthetical patterns.
 * e.g., "Sufficiency of Funds (SOF)" → { full: "Sufficiency of Funds", acronym: "SOF" }
 */
export function detectAcronyms(text) {
  const acronyms = [];
  // Pattern: "Full Name (ACRONYM)" or "Full Name (A.C.R.O.N.Y.M.)"
  const pattern = /([A-Z][a-zA-Z\s\-]{2,50})\s*\(([A-Z](?:\.?[A-Z]){1,10})\)/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    acronyms.push({
      full: match[1].trim(),
      acronym: match[2].replace(/\./g, ''),
      position: match.index,
    });
  }

  // Pattern: "ACRONYM (Full Name)" — reverse
  const reversePattern = /\(([A-Z](?:\.?[A-Z]){1,10})\)\s*([A-Z][a-zA-Z\s\-]{2,50})/g;
  while ((match = reversePattern.exec(text)) !== null) {
    acronyms.push({
      full: match[2].trim(),
      acronym: match[1].replace(/\./g, ''),
      position: match.index,
    });
  }

  return acronyms;
}

/**
 * Detect definitions from text patterns.
 * e.g., "hereinafter referred to as Contractor" → { term: "Contractor", definition: "hereinafter referred to as" }
 */
export function detectDefinitions(text) {
  const definitions = [];
  const patterns = [
    /(?:hereinafter|hereafter)\s+(?:referred\s+to\s+as|called|known\s+as)\s+["']?([A-Z][a-zA-Z\s]+?)["']?[\s.,;]/gi,
    /(?:defined\s+as|means|refers?\s+to)\s+["']?([A-Z][a-zA-Z\s]+?)["']?[\s.,;]/gi,
    /["']([A-Z][a-zA-Z\s]+?)["']\s+(?:means|shall\s+mean|refers?\s+to)/gi,
    /([A-Z][a-zA-Z]+)\s+(?:means|shall\s+mean|is\s+defined\s+as)\s+/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      definitions.push({
        term: match[1].trim(),
        context: text.substring(Math.max(0, match.index - 30), match.index + match[0].length + 30),
        position: match.index,
      });
    }
  }

  return definitions;
}

/**
 * Learn terminology from a document corpus.
 * Builds a concept alias map from co-occurrence patterns, acronyms, and definitions.
 */
export function learnTerminology(pages) {
  const aliases = new Map(); // canonical -> Set of aliases
  const acronymMap = new Map(); // acronym -> full form
  const definitionMap = new Map(); // term -> definition context

  // 1. Detect acronyms across all pages
  for (const page of pages) {
    const text = page.text || '';
    const acronyms = detectAcronyms(text);
    for (const acr of acronyms) {
      acronymMap.set(acr.acronym.toLowerCase(), acr.full);
      // Add bidirectional aliases
      addAlias(aliases, acr.full.toLowerCase(), acr.acronym.toLowerCase());
    }

    // 2. Detect definitions
    const defs = detectDefinitions(text);
    for (const def of defs) {
      definitionMap.set(def.term.toLowerCase(), def.context);
    }
  }

  // 3. Detect repeated phrases that appear near each other (co-occurrence aliases)
  const phraseFreq = new Map();
  for (const page of pages) {
    const text = (page.text || '').toLowerCase();
    // Extract 2-4 word phrases
    const words = text.split(/\s+/).filter(w => w.length > 2);
    for (let len = 2; len <= 4; len++) {
      for (let i = 0; i <= words.length - len; i++) {
        const phrase = words.slice(i, i + len).join(' ');
        if (!/^\d+$/.test(phrase)) { // Skip pure numbers
          phraseFreq.set(phrase, (phraseFreq.get(phrase) || 0) + 1);
        }
      }
    }
  }

  // 4. Find repeated phrases that might be aliases for each other
  // If two phrases share significant overlap and appear frequently, they might be aliases
  const frequentPhrases = Array.from(phraseFreq.entries())
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 200);

  for (let i = 0; i < frequentPhrases.length; i++) {
    for (let j = i + 1; j < frequentPhrases.length; j++) {
      const [phrase1] = frequentPhrases[i];
      const [phrase2] = frequentPhrases[j];

      // Check if one contains the other (abbreviation pattern)
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
    definitions: Object.fromEntries(definitionMap),
  };
}

function addAlias(aliases, canonical, alias) {
  if (!aliases.has(canonical)) {
    aliases.set(canonical, new Set());
  }
  aliases.get(canonical).add(alias);

  // Bidirectional
  if (!aliases.has(alias)) {
    aliases.set(alias, new Set());
  }
  aliases.get(alias).add(canonical);
}

// ─── Fuzzy Search in Document Text ───────────────────────────────────────────

/**
 * Find fuzzy matches for a query in document pages.
 * Returns matches with positions and scores.
 */
export function fuzzySearch(query, pages, options = {}) {
  const { threshold = 0.6, maxResults = 10 } = options;
  const results = [];
  const queryLower = query.toLowerCase().trim();

  for (const page of pages) {
    const text = page.text || '';
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);

    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase().trim();
      const score = fuzzyScore(queryLower, sentenceLower);

      if (score >= threshold) {
        results.push({
          text: sentence.trim().substring(0, 300),
          page: page.pageNum,
          score,
          type: 'fuzzy',
        });
      }
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}
