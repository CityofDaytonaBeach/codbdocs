const params = new URLSearchParams(location.search);
const sourceUrl = new URL(params.get('manifest') || '../codbdocs-manifest.json', location.href).href;
const storageKey = `codbdocs-admin:${sourceUrl}`;

const elements = {
  source: document.getElementById('manifestSource'),
  rows: document.getElementById('documentRows'),
  emptyRows: document.getElementById('emptyRows'),
  total: document.getElementById('totalMetric'),
  enabled: document.getElementById('enabledMetric'),
  ready: document.getElementById('readyMetric'),
  attention: document.getElementById('attentionMetric'),
  search: document.getElementById('searchInput'),
  statusFilter: document.getElementById('statusFilter'),
  enabledFilter: document.getElementById('enabledFilter'),
  draftStatus: document.getElementById('draftStatus'),
  settingsForm: document.getElementById('settingsForm'),
  siteName: document.getElementById('siteName'),
  baseUrl: document.getElementById('baseUrl'),
  viewerUrl: document.getElementById('viewerUrl'),
  openMode: document.getElementById('openMode'),
  language: document.getElementById('language'),
  feedbackEmail: document.getElementById('feedbackEmail'),
  airaUrl: document.getElementById('airaUrl'),
  dialog: document.getElementById('documentDialog'),
  dialogTitle: document.getElementById('dialogTitle'),
  documentForm: document.getElementById('documentForm'),
  editIndex: document.getElementById('editIndex'),
  documentTitle: document.getElementById('documentTitle'),
  documentUrl: document.getElementById('documentUrl'),
  accessibleUrl: document.getElementById('accessibleUrl'),
  documentId: document.getElementById('documentId'),
  documentStatus: document.getElementById('documentStatus'),
  documentScore: document.getElementById('documentScore'),
  documentIssues: document.getElementById('documentIssues'),
  documentPages: document.getElementById('documentPages'),
  lastScanned: document.getElementById('lastScanned'),
  documentEnabled: document.getElementById('documentEnabled'),
  importInput: document.getElementById('importInput'),
  toast: document.getElementById('toast'),
};

const statusLabels = {
  unscanned: 'Unscanned',
  processing: 'Processing',
  ready: 'Ready',
  'needs-review': 'Needs review',
  failed: 'Failed',
};

let manifest = emptyManifest();
let remoteManifest = null;
let toastTimer = null;

function emptyManifest() {
  return {
    $schema: '../schema/codbdocs-manifest.schema.json',
    version: 1,
    site: {
      name: '',
      baseUrl: '',
      viewerUrl: '../viewer/index.html',
      openMode: 'new-tab',
      selector: 'a[href]',
      language: 'en',
    },
    defaults: { enabled: false, openMode: 'new-tab' },
    documents: [],
  };
}

function normalizeManifest(value) {
  if (!value || typeof value !== 'object') throw new Error('Manifest must be a JSON object.');
  if (value.version !== 1) throw new Error('Manifest version must be 1.');
  if (!Array.isArray(value.documents)) throw new Error('Manifest documents must be an array.');
  return {
    ...value,
    site: { ...emptyManifest().site, ...(value.site || {}) },
    defaults: { ...emptyManifest().defaults, ...(value.defaults || {}) },
    documents: value.documents.map((entry) => ({ status: 'unscanned', ...entry })),
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  toastTimer = setTimeout(() => { elements.toast.hidden = true; }, 2800);
}

function saveDraft(message = 'Draft saved locally') {
  localStorage.setItem(storageKey, JSON.stringify(manifest));
  elements.draftStatus.textContent = message;
}

function resolveEntryUrl(value) {
  if (!value) return null;
  try {
    return new URL(value, manifest.site.baseUrl || sourceUrl).href;
  } catch {
    return null;
  }
}

function accessibleUrl(entry) {
  const direct = resolveEntryUrl(entry.accessibleUrl);
  if (direct) return direct;
  const viewerBase = resolveEntryUrl(entry.viewerUrl || manifest.site.viewerUrl);
  const documentUrl = resolveEntryUrl(entry.url);
  if (!viewerBase || !documentUrl) return null;
  const viewer = new URL(viewerBase);
  viewer.searchParams.set('document', documentUrl);
  viewer.searchParams.set('manifest', sourceUrl);
  if (entry.id) viewer.searchParams.set('id', entry.id);
  if (entry.title) viewer.searchParams.set('title', entry.title);
  return viewer.href;
}

function isEnabled(entry) {
  return entry.enabled ?? manifest.defaults.enabled ?? false;
}

function numberOrDash(value) {
  return Number.isFinite(Number(value)) && value !== '' && value != null ? String(value) : '-';
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);
}

function appendTextCell(row, text, label) {
  const cell = row.insertCell();
  cell.textContent = text;
  cell.dataset.label = label;
  return cell;
}

function matchingDocuments() {
  const query = elements.search.value.trim().toLowerCase();
  const status = elements.statusFilter.value;
  const enabled = elements.enabledFilter.value;
  return manifest.documents
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => {
      const textMatch = !query || `${entry.title || ''} ${entry.url || ''} ${entry.id || ''}`.toLowerCase().includes(query);
      const statusMatch = !status || (entry.status || 'unscanned') === status;
      const enabledValue = isEnabled(entry);
      const enabledMatch = !enabled || (enabled === 'enabled' ? enabledValue : !enabledValue);
      return textMatch && statusMatch && enabledMatch;
    });
}

function renderMetrics() {
  const documents = manifest.documents;
  elements.total.textContent = documents.length;
  elements.enabled.textContent = documents.filter(isEnabled).length;
  elements.ready.textContent = documents.filter((entry) => entry.status === 'ready').length;
  elements.attention.textContent = documents.filter((entry) => ['needs-review', 'failed'].includes(entry.status)).length;
}

function renderRows() {
  elements.rows.replaceChildren();
  const rows = matchingDocuments();
  elements.emptyRows.hidden = rows.length > 0;

  for (const { entry, index } of rows) {
    const row = elements.rows.insertRow();
    row.dataset.index = index;

    const documentCell = row.insertCell();
    documentCell.className = 'document-cell';
    documentCell.dataset.label = 'Document';
    const title = document.createElement('strong');
    title.textContent = entry.title || 'Untitled document';
    const url = document.createElement('span');
    url.textContent = entry.url || '';
    url.title = entry.url || '';
    documentCell.append(title, url);

    const statusCell = row.insertCell();
    statusCell.dataset.label = 'Status';
    const status = entry.status || 'unscanned';
    const badge = document.createElement('span');
    badge.className = `status ${status}`;
    badge.textContent = statusLabels[status] || status;
    statusCell.appendChild(badge);

    appendTextCell(row, numberOrDash(entry.score), 'Score');
    appendTextCell(row, numberOrDash(entry.issues), 'Issues');
    appendTextCell(row, numberOrDash(entry.pages), 'Pages');
    appendTextCell(row, formatDate(entry.lastScanned), 'Last scanned');

    const enabledCell = row.insertCell();
    enabledCell.dataset.label = 'Enabled';
    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.className = 'enabled-toggle';
    toggle.checked = isEnabled(entry);
    toggle.dataset.action = 'toggle';
    toggle.setAttribute('aria-label', `Enable ${entry.title || 'document'}`);
    enabledCell.appendChild(toggle);

    const actionsCell = row.insertCell();
    actionsCell.dataset.label = 'Actions';
    const actions = document.createElement('div');
    actions.className = 'row-actions';
    const viewUrl = accessibleUrl(entry);
    if (viewUrl) {
      const view = document.createElement('a');
      view.href = viewUrl;
      view.target = '_blank';
      view.rel = 'noopener';
      view.textContent = 'View';
      actions.appendChild(view);
    }
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.dataset.action = 'edit';
    edit.textContent = 'Edit';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.action = 'remove';
    remove.className = 'remove';
    remove.textContent = 'Remove';
    actions.append(edit, remove);
    actionsCell.appendChild(actions);
  }
}

function populateSettings() {
  elements.siteName.value = manifest.site.name || '';
  elements.baseUrl.value = manifest.site.baseUrl || '';
  elements.viewerUrl.value = manifest.site.viewerUrl || '';
  elements.openMode.value = manifest.site.openMode || 'new-tab';
  elements.language.value = manifest.site.language || 'en';
  elements.feedbackEmail.value = manifest.site.feedbackEmail || '';
  elements.airaUrl.value = manifest.site.airaUrl || '';
}

function render() {
  renderMetrics();
  renderRows();
  populateSettings();
}

function inputNumber(element) {
  return element.value === '' ? undefined : Number(element.value);
}

function deleteEmpty(entry, keys) {
  for (const key of keys) {
    if (entry[key] === '' || entry[key] == null || Number.isNaN(entry[key])) delete entry[key];
  }
  return entry;
}

function slug(value) {
  return String(value || 'document')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64) || 'document';
}

function uniqueId(candidate, editingIndex) {
  const base = slug(candidate);
  let id = base;
  let suffix = 2;
  while (manifest.documents.some((entry, index) => index !== editingIndex && entry.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

function toLocalDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function openDocumentDialog(index = -1) {
  const entry = index >= 0 ? manifest.documents[index] : null;
  elements.documentForm.reset();
  elements.editIndex.value = String(index);
  elements.dialogTitle.textContent = entry ? 'Edit document' : 'Add document';
  elements.documentTitle.value = entry?.title || '';
  elements.documentUrl.value = entry?.url || '';
  elements.accessibleUrl.value = entry?.accessibleUrl || '';
  elements.documentId.value = entry?.id || '';
  elements.documentStatus.value = entry?.status || 'unscanned';
  elements.documentScore.value = entry?.score ?? '';
  elements.documentIssues.value = entry?.issues ?? '';
  elements.documentPages.value = entry?.pages ?? '';
  elements.lastScanned.value = toLocalDateTime(entry?.lastScanned);
  elements.documentEnabled.checked = entry ? isEnabled(entry) : true;
  elements.dialog.showModal();
  elements.documentTitle.focus();
}

function documentFromForm(index) {
  const previous = index >= 0 ? manifest.documents[index] : {};
  const title = elements.documentTitle.value.trim();
  const url = elements.documentUrl.value.trim();
  const id = uniqueId(elements.documentId.value.trim() || title || url.split('/').pop(), index);
  return deleteEmpty({
    ...previous,
    id,
    title,
    url,
    accessibleUrl: elements.accessibleUrl.value.trim(),
    enabled: elements.documentEnabled.checked,
    status: elements.documentStatus.value,
    score: inputNumber(elements.documentScore),
    issues: inputNumber(elements.documentIssues),
    pages: inputNumber(elements.documentPages),
    lastScanned: elements.lastScanned.value ? new Date(elements.lastScanned.value).toISOString() : undefined,
  }, ['accessibleUrl', 'score', 'issues', 'pages', 'lastScanned']);
}

function exportJson() {
  const data = `${JSON.stringify(manifest, null, 2)}\n`;
  const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'codbdocs-manifest.json';
  link.click();
  URL.revokeObjectURL(url);
  showToast('Manifest exported');
}

async function loadRemote() {
  const response = await fetch(sourceUrl, { credentials: 'same-origin', headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Manifest request failed with ${response.status}.`);
  return normalizeManifest(await response.json());
}

async function initialize() {
  elements.source.textContent = sourceUrl;
  try {
    remoteManifest = await loadRemote();
    const draft = localStorage.getItem(storageKey);
    manifest = draft ? normalizeManifest(JSON.parse(draft)) : clone(remoteManifest);
    elements.draftStatus.textContent = draft ? 'Local draft loaded' : 'Manifest loaded';
  } catch (error) {
    console.error('[codbdocs] admin load failed:', error);
    manifest = emptyManifest();
    elements.draftStatus.textContent = 'New local manifest';
    showToast(error.message || 'Manifest could not be loaded');
  }
  render();
}

document.getElementById('addButton').addEventListener('click', () => openDocumentDialog());
document.getElementById('closeDialogButton').addEventListener('click', () => elements.dialog.close());
document.getElementById('cancelDialogButton').addEventListener('click', () => elements.dialog.close());
document.getElementById('exportButton').addEventListener('click', exportJson);
document.getElementById('importButton').addEventListener('click', () => elements.importInput.click());

document.getElementById('copyButton').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(manifest, null, 2));
    showToast('Manifest copied');
  } catch {
    showToast('Clipboard access is unavailable in this browser');
  }
});

document.getElementById('resetButton').addEventListener('click', async () => {
  if (!confirm('Discard the local draft and reload the hosted manifest?')) return;
  try {
    remoteManifest = await loadRemote();
    manifest = clone(remoteManifest);
    localStorage.removeItem(storageKey);
    elements.draftStatus.textContent = 'Manifest reloaded';
    render();
    showToast('Local draft reset');
  } catch (error) {
    showToast(error.message || 'Hosted manifest could not be loaded');
  }
});

for (const filter of [elements.search, elements.statusFilter, elements.enabledFilter]) {
  filter.addEventListener('input', renderRows);
}

elements.rows.addEventListener('change', (event) => {
  const row = event.target.closest('tr[data-index]');
  if (!row || event.target.dataset.action !== 'toggle') return;
  manifest.documents[Number(row.dataset.index)].enabled = event.target.checked;
  saveDraft();
  renderMetrics();
});

elements.rows.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  const row = event.target.closest('tr[data-index]');
  if (!button || !row) return;
  const index = Number(row.dataset.index);
  if (button.dataset.action === 'edit') openDocumentDialog(index);
  if (button.dataset.action === 'remove') {
    const entry = manifest.documents[index];
    if (!confirm(`Remove ${entry.title || 'this document'} from the manifest?`)) return;
    manifest.documents.splice(index, 1);
    saveDraft();
    render();
  }
});

elements.settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  manifest.site = deleteEmpty({
    ...manifest.site,
    name: elements.siteName.value.trim(),
    baseUrl: elements.baseUrl.value.trim(),
    viewerUrl: elements.viewerUrl.value.trim(),
    openMode: elements.openMode.value,
    language: elements.language.value.trim() || 'en',
    feedbackEmail: elements.feedbackEmail.value.trim(),
    airaUrl: elements.airaUrl.value.trim(),
  }, ['name', 'baseUrl', 'feedbackEmail', 'airaUrl']);
  saveDraft('Site settings saved locally');
  renderRows();
  showToast('Site settings saved');
});

elements.documentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const index = Number(elements.editIndex.value);
  const candidate = documentFromForm(index);
  const duplicate = manifest.documents.some((entry, entryIndex) => entryIndex !== index && resolveEntryUrl(entry.url) === resolveEntryUrl(candidate.url));
  if (duplicate) {
    elements.documentUrl.setCustomValidity('This PDF URL is already in the manifest.');
    elements.documentUrl.reportValidity();
    return;
  }
  elements.documentUrl.setCustomValidity('');
  if (index >= 0) manifest.documents[index] = candidate;
  else manifest.documents.push(candidate);
  elements.dialog.close();
  saveDraft();
  render();
  showToast(index >= 0 ? 'Document updated' : 'Document added');
});

elements.documentUrl.addEventListener('input', () => elements.documentUrl.setCustomValidity(''));

elements.importInput.addEventListener('change', async () => {
  const file = elements.importInput.files?.[0];
  if (!file) return;
  try {
    manifest = normalizeManifest(JSON.parse(await file.text()));
    saveDraft('Imported manifest saved locally');
    render();
    showToast('Manifest imported');
  } catch (error) {
    showToast(error.message || 'Manifest is not valid JSON');
  } finally {
    elements.importInput.value = '';
  }
});

initialize();
