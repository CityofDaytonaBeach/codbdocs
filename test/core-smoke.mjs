import * as codbdocs from '../packages/core/src/index.js';
const irPages = {
  page_1: { id:'page_1', num:1, width:612, height:792, content:['t1','t2','im1'] },
  page_2: { id:'page_2', num:2, width:612, height:792, content:['t3'] },
};
const ir = {
  pages: irPages,
  objects: {
    t1: { id:'t1', type:'text', page:'page_1', semantic:{ role:'heading', level:1, text:'Community Redevelopment Agency (CRA) Report' }, bbox:[72,700,300,20] },
    t2: { id:'t2', type:'text', page:'page_1', semantic:{ role:'paragraph', text:'The permit fee is $250 per application.' }, bbox:[72,650,300,12] },
    t3: { id:'t3', type:'text', page:'page_2', semantic:{ role:'heading', level:3, text:'Appendix' }, bbox:[72,700,200,16] },
    im1:{ id:'im1', type:'image', page:'page_1', bbox:[72,400,200,150], accessibility:{} },
  },
};
const graphJson = {
  pageCount: 2,
  pages: [
    { num:1, text:'Community Redevelopment Agency (CRA) Report. The permit fee is $250 per application. Contact clerk@codb.us on 01/02/2026.', headings:[{text:'CRA Report', level:1, page:1}], tables:[], forms:[], lists:[], metadata:{ emails:['clerk@codb.us'], dates:['01/02/2026'], amounts:['$250'], phones:[], addresses:[] }, classification:{type:'report'} },
    { num:2, text:'Appendix. Site plan approval requires zoning sign-off from the planning board.', headings:[{text:'Appendix', level:2, page:2}], tables:[], forms:[], lists:[], metadata:{}, classification:{type:'appendix'} },
  ],
};
const pages = graphJson.pages.map(p=>({num:p.num,text:p.text}));
const text='The Community Redevelopment Agency (CRA) means the city agency. Site plan (SP) approval is required.';
const cases = [
  ['wcag-audit', () => codbdocs.wcagAudit(structuredClone(ir))],
  ['accessibility-report', () => codbdocs.generateAccessibilityReport(structuredClone(ir))],
  ['remediate', () => codbdocs.remediateAccessibility(structuredClone(ir), {})],
  ['remediation-plan', () => { const c=structuredClone(ir); return codbdocs.generateRemediations(codbdocs.wcagAudit(c), c); }],
  ['accessible-html', () => codbdocs.exportAccessibleHTML(structuredClone(ir), {})],
  ['validate-tags', () => codbdocs.validateTags({}, [])],
  ['chunk', () => codbdocs.createChunks(graphJson, {})],
  ['rag-output', () => codbdocs.createRAGOutput(graphJson, {})],
  ['rag-jsonl', () => codbdocs.exportAsJSONL(codbdocs.createRAGOutput(graphJson,{}))],
  ['rag-csv', () => codbdocs.exportAsCSV(codbdocs.createRAGOutput(graphJson,{}))],
  ['cross-page', () => codbdocs.buildCrossPageContext ? codbdocs.buildCrossPageContext(graphJson) : 'n/a'],
  ['search', () => codbdocs.fuzzySearch('permit fee', pages, {})],
  ['expand-query', () => codbdocs.expandQuery('site plan', {})],
  ['query-intent', () => [codbdocs.detectIntent('who approved the contract and when?'), codbdocs.decomposeQuery('who approved it and when?')]],
  ['text-insights', () => [codbdocs.detectAcronyms(text), codbdocs.detectDefinitions(text), codbdocs.normalizeText(text)]],
  ['fuzzy-score', () => [codbdocs.levenshtein('Daytona Beach','Datyona Bch'), codbdocs.fuzzyScore('Daytona Beach','Datyona Bch'), codbdocs.stem('running')]],
  ['color-convert', () => [codbdocs.cmykToRgb(0,0.8,1,0), codbdocs.labToRgb(54,80,67), codbdocs.rgbToCmyk(255,0,0)]],
  ['ir-edgecase-minimal', () => codbdocs.wcagAudit({ pages: { page_1: { num:1 } } })],
  ['load-flat-export', () => typeof codbdocs.load],
];
let fails=0;
for (const [id,fn] of cases){ try{ const o=fn(); console.log(`PASS ${id} -> ${String(JSON.stringify(o)).slice(0,110)}`);}catch(e){fails++;console.log(`FAIL ${id} -> ${(e.stack||String(e)).split('\n').slice(0,2).join(' | ')}`);} }
console.log('fails:',fails,'exports:',Object.keys(codbdocs).length);
if (fails) process.exit(1);

// DocAccess transcript conventions
{
  const ir = {
    document: { metadata: { title: 'Doc' }, pages: ['page_1'] },
    pages: { page_1: { num: 1, content: ['o1', 'o2'], complexity: 88 } },
    objects: {
      o1: { id: 'o1', type: 'text', bbox: [0, 0, 1, 1], semantic: { role: 'heading', level: 1, text: 'Title' } },
      o2: { id: 'o2', type: 'image', bbox: [0, 5, 1, 1], accessibility: { alt: 'A map' }, semantic: { caption: 'Cap' } },
    },
    vectors: {},
  };
  const html = codbdocs.exportAccessibleHTML(ir, { transcriptNotice: 'Transcribed automatically.' });
  const required = [
    'class="docviewer-page-break"',
    'data-page-number="1"',
    'class="transcript-page pdf-page content"',
    'role="group"',
    'class="complexity-warning"',
    'data-complexity-score="88"',
    'data-el-num="1"',
    'id="h-1"',
    'class="transcript-page-image"',
    'transcript-page-image-alt',
    'aria-atomic="true"',
    'class="sr-only visually-hidden transcript-notice"',
  ];
  const missing = required.filter((token) => !html.includes(token));
  if (missing.length) throw new Error('transcript markup missing: ' + missing.join(', '));
  if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error('expected exactly one h1');
  console.log('PASS docaccess-transcript-conventions');
}
