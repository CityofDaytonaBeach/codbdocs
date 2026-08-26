/**
 * @codbdocs/core — Advanced PDF Features
 *
 * Contains:
 * - Digital Signatures (extraction, validation info)
 * - Optional Content Groups (OCG / layers)
 * - Embedded Files
 * - Actions Subsystem
 * - Appearance Streams
 * - XObject Reuse Tracking
 * - Incremental Revisions
 */

// ─── Digital Signatures ──────────────────────────────────────────────────────

export const SignatureSubFilter = {
  ADOBE_PKCS7_S4: 'adbe.pkcs7.sha1',
  ADOBE_PKCS7_DETACHED: 'adbe.pkcs7.detached',
  ADOBE_X509_RSA_SHA1: 'adbe.x509.rsa_sha1',
  ETSI_CADES_DETACHED: 'ETSI.CAdES.detached',
};

export const SignatureReasons = {
  APPROVED: 'Approved',
  DECLINED: 'Declined',
  CERTIFIED: 'Certified',
  CONCEPT: 'Concept',
};

/**
 * Extract digital signatures from a PDF page.
 */
export async function extractSignatures(page, doc) {
  const signatures = [];

  try {
    const annotations = await page.getAnnotations();
    for (const ann of annotations) {
      if (ann.subtype === 'Widget' && ann.fieldType === 'Sig') {
        const sig = {
          id: ann.fieldName || ann.id,
          type: 'signature',
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
          signatureValid: null, // Would need crypto library to verify
          signerName: null,
          signingTime: ann.M || null,
          documentIntegrity: null,
        };

        // Try to parse signature info
        if (ann.ByteRange && ann.Contents) {
          sig.signedData = {
            hasByteRange: true,
            byteRangeLength: ann.ByteRange.length,
            contentLength: ann.Contents ? ann.Contents.length / 2 : 0,
          };
        }

        signatures.push(sig);
      }
    }
  } catch (e) {
    console.error('[codbdocs] Signature extraction error:', e);
  }

  return signatures;
}

/**
 * Decode hex string to bytes.
 */
function decodeHex(hex) {
  if (!hex) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

/**
 * Infer hash algorithm from subfilter.
 */
function inferHashAlgorithm(subFilter) {
  if (!subFilter) return 'SHA-256';
  if (subFilter.includes('sha1')) return 'SHA-1';
  if (subFilter.includes('sha256')) return 'SHA-256';
  if (subFilter.includes('sha384')) return 'SHA-384';
  if (subFilter.includes('sha512')) return 'SHA-512';
  return 'SHA-256';
}

/**
 * Build signature summary.
 */
export function buildSignatureSummary(signatures) {
  return {
    count: signatures.length,
    hasSignatures: signatures.length > 0,
    signed: signatures.filter(s => s.subFilter === SignatureSubFilter.ADOBE_PKCS7_DETACHED).length,
    certifications: signatures.filter(s => s.reason?.toLowerCase().includes('certified')).length,
    algorithms: [...new Set(signatures.map(s => s.hashAlgorithm))],
    signers: signatures.map(s => ({
      name: s.signerName || s.fieldName,
      time: s.signingTime,
      reason: s.reason,
    })),
  };
}

// ─── Optional Content Groups (OCG) ──────────────────────────────────────────

/**
 * Extract Optional Content Groups from the PDF.
 */
export async function extractOCGs(doc) {
  const ocgs = [];

  try {
    // Access the document catalog
    const docObj = await doc._pdf?.catalog?.objRef?.fetch();
    if (!docObj) return ocgs;

    // Look for OCProperties
    const ocProps = await docObj.get('OCProperties');
    if (!ocProps) return ocgs;

    const ocDict = await ocProps.fetch();
    if (!ocDict) return ocgs;

    // Get OCG array
    const ocgArray = await ocDict.get('OCGs');
    if (!ocgArray) return ocgs;

    const ocgsObj = await ocgArray.fetch();
    if (!ocgsObj) return ocgs;

    for (const ref of ocgsObj) {
      try {
        const ocgDict = await ref.fetch();
        if (!ocgDict) continue;

        const name = await ocgDict.get('Name');
        const intent = await ocgDict.get('Intent');
        const usage = await ocgDict.get('Usage');

        ocgs.push({
          id: ref.toString(),
          name: name?.value || 'Unnamed OCG',
          intent: intent?.value || 'View',
          usage: usage ? {
            print: await extractOCGUsage(usage, 'Print'),
            view: await extractOCGUsage(usage, 'View'),
            export: await extractOCGUsage(usage, 'Export'),
          } : null,
          visible: true, // Default visible
        });
      } catch (e) {
        // Skip problematic OCGs
      }
    }

    // Get default state from OCConfig
    const config = await ocDict.get('D');
    if (config) {
      const configDict = await config.fetch();
      if (configDict) {
        const order = await configDict.get('Order');
        // Apply default visibility
      }
    }
  } catch (e) {
    console.error('[codbdocs] OCG extraction error:', e);
  }

  return ocgs;
}

/**
 * Extract OCG usage info.
 */
async function extractOCGUsage(usageDict, key) {
  try {
    const usage = await usageDict.get(key);
    if (!usage) return null;

    const dict = await usage.fetch();
    if (!dict) return null;

    const outputIntents = await dict.get('OutputIntents');
    const category = await dict.get('Category');

    return {
      category: category?.value || null,
      outputIntents: outputIntents?.value || [],
    };
  } catch {
    return null;
  }
}

/**
 * Build OCG summary.
 */
export function buildOCGSummary(ocgs) {
  return {
    count: ocgs.length,
    hasLayers: ocgs.length > 0,
    layerNames: ocgs.map(o => o.name),
    intents: [...new Set(ocgs.map(o => o.intent))],
    printableLayers: ocgs.filter(o => o.usage?.print?.category !== 'OFF').length,
    viewableLayers: ocgs.filter(o => o.usage?.view?.category !== 'OFF').length,
  };
}

// ─── Embedded Files ──────────────────────────────────────────────────────────

/**
 * Extract embedded files from the PDF.
 */
export async function extractEmbeddedFiles(doc) {
  const files = [];

  try {
    const docObj = await doc._pdf?.catalog?.objRef?.fetch();
    if (!docObj) return files;

    // Look for Names dictionary
    const names = await docObj.get('Names');
    if (!names) return files;

    const namesDict = await names.fetch();
    if (!namesDict) return files;

    // Look for EmbeddedFiles
    const embeddedFiles = await namesDict.get('EmbeddedFiles');
    if (!embeddedFiles) return files;

    const efDict = await embeddedFiles.fetch();
    if (!efDict) return files;

    const namesArray = await efDict.get('Names');
    if (!namesArray) return files;

    // Parse name tree
    const nameTree = await namesArray.fetch();
    if (!nameTree) return files;

    for (let i = 0; i < nameTree.length; i++) {
      try {
        const nameObj = await nameTree[i].fetch();
        if (!nameObj) continue;

        // Name tree is alternating: value, value, ...
        // Each value is a dict with /F (file spec) and /EF (embedded file)
        const fileSpec = await nameObj.get('F');
        const efRef = await nameObj.get('EF');

        if (fileSpec && efRef) {
          const fileSpecDict = await fileSpec.fetch();
          const efDict = await efRef.fetch();

          const fileName = await fileSpecDict.get('F');
          const description = await fileSpecDict.get('Desc');
          const mimeType = await fileSpecDict.get('Type');
          const size = await efDict.get('Size');
          const creationDate = await efDict.get('CreationDate');
          const modDate = await efDict.get('ModDate');

          files.push({
            id: efRef.toString(),
            name: fileName?.value || `file_${files.length}`,
            description: description?.value || null,
            mimeType: mimeType?.value || 'application/octet-stream',
            size: size?.value || 0,
            creationDate: creationDate?.value || null,
            modDate: modDate?.value || null,
            // Raw data not extracted by default (could be large)
            hasData: true,
          });
        }
      } catch (e) {
        // Skip problematic entries
      }
    }
  } catch (e) {
    console.error('[codbdocs] Embedded file extraction error:', e);
  }

  return files;
}

/**
 * Build embedded files summary.
 */
export function buildEmbeddedFilesSummary(files) {
  const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
  const byType = {};
  for (const f of files) {
    const ext = f.name.split('.').pop().toLowerCase();
    byType[ext] = (byType[ext] || 0) + 1;
  }

  return {
    count: files.length,
    hasEmbeddedFiles: files.length > 0,
    totalSize,
    totalSizeFormatted: formatBytes(totalSize),
    byType,
    files: files.map(f => ({
      name: f.name,
      size: f.size,
      sizeFormatted: formatBytes(f.size || 0),
      mimeType: f.mimeType,
    })),
  };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ─── Actions Subsystem ───────────────────────────────────────────────────────

export const ActionType = {
  GOTO: 'GoTo',
  GOTO_REMOTE: 'GoToR',
  GOTO_EMBEDDED: 'GoToE',
  LAUNCH: 'Launch',
  THREAD: 'Thread',
  SOUND: 'Sound',
  MOVIE: 'Movie',
  HIDE: 'Hide',
  NAMED: 'Named',
  SUBMIT_FORM: 'SubmitForm',
  RESET_FORM: 'ResetForm',
  IMPORT_DATA: 'ImportData',
  JAVASCRIPT: 'JavaScript',
  SET_OCG_STATE: 'SetOCGState',
  RENDITION: 'Rendition',
  TRANS: 'Trans',
  SET_GUIDE: 'SetGUIDE',
};

/**
 * Extract actions from the PDF catalog and page objects.
 */
export async function extractActions(doc) {
  const actions = [];

  try {
    const docObj = await doc._pdf?.catalog?.objRef?.fetch();
    if (!docObj) return actions;

    // Document-level actions
    const openAction = await docObj.get('OpenAction');
    if (openAction) {
      actions.push({
        type: 'Document',
        trigger: 'OpenAction',
        action: await parseAction(openAction),
      });
    }

    const pageLabels = await docObj.get('PageLabels');
    // Page labels aren't actions, skip

    // Pages actions
    const pagesRef = await docObj.get('Pages');
    if (pagesRef) {
      const pages = await pagesRef.fetch();
      await extractPageActions(pages, actions, 0);
    }
  } catch (e) {
    console.error('[codbdocs] Actions extraction error:', e);
  }

  return actions;
}

/**
 * Recursively extract page actions.
 */
async function extractPageActions(pagesDict, actions, depth) {
  if (depth > 10) return; // Prevent infinite recursion

  try {
    const kids = await pagesDict.get('Kids');
    if (!kids) return;

    const kidsArray = await kids.fetch();
    if (!kidsArray) return;

    for (const kidRef of kidsArray) {
      try {
        const kid = await kidRef.fetch();
        if (!kid) continue;

        const type = await kid.get('Type');
        const typeName = type?.value;

        if (typeName === 'Pages') {
          await extractPageActions(kid, actions, depth + 1);
        } else if (typeName === 'Page') {
          const pageNum = await kid.get('StructParents') || actions.filter(a => a.type === 'Page').length + 1;

          // Page open/close actions
          const actionsEntry = await kid.get('AA');
          if (actionsEntry) {
            const aaDict = await actionsEntry.fetch();
            if (aaDict) {
              for (const [trigger, actionRef] of Object.entries(aaDict)) {
                actions.push({
                  type: 'Page',
                  page: pageNum,
                  trigger,
                  action: await parseAction(actionRef),
                });
              }
            }
          }

          // Annotations with actions
          const annots = await kid.get('Annots');
          if (annots) {
            const annotsArray = await annots.fetch();
            if (annotsArray) {
              for (const annotRef of annotsArray) {
                const annot = await annotRef.fetch();
                if (!annot) continue;

                const a = await annot.get('A');
                if (a) {
                  actions.push({
                    type: 'Annotation',
                    page: pageNum,
                    fieldName: (await annot.get('T'))?.value,
                    trigger: 'click',
                    action: await parseAction(a),
                  });
                }
              }
            }
          }
        }
      } catch (e) {
        // Skip problematic pages
      }
    }
  } catch (e) {
    console.error('[codbdocs] Page actions extraction error:', e);
  }
}

/**
 * Parse a PDF action dictionary.
 */
async function parseAction(actionRef) {
  if (!actionRef) return null;

  try {
    const actionDict = await actionRef.fetch?.() || actionRef;
    if (!actionDict) return null;

    const s = await actionDict.get('S');
    const actionType = s?.value || 'Unknown';

    const result = {
      type: actionType,
    };

    // Extract common properties based on type
    switch (actionType) {
      case 'GoTo':
        const dest = await actionDict.get('D');
        result.destination = dest?.value || dest;
        break;

      case 'GoToR':
        result.file = (await actionDict.get('F'))?.value;
        result.destination = (await actionDict.get('D'))?.value;
        break;

      case 'Launch':
        result.file = (await actionDict.get('F'))?.value;
        result.operation = (await actionDict.get('Win'))?.value;
        break;

      case 'JavaScript':
        result.script = (await actionDict.get('JS'))?.value;
        break;

      case 'Named':
        result.name = (await actionDict.get('N'))?.value;
        break;

      case 'SetOCGState':
        const state = await actionDict.get('State');
        result.state = state?.value;
        break;

      case 'SubmitForm':
        result.url = (await actionDict.get('F'))?.value;
        result.fields = (await actionDict.get('Fields'))?.value;
        break;

      case 'ResetForm':
        result.fields = (await actionDict.get('Fields'))?.value;
        break;

      case 'Hide':
        result.targets = (await actionDict.get('T'))?.value;
        result.hidden = (await actionDict.get('H'))?.value;
        break;

      case 'Sound':
      case 'Movie':
        result.sound = (await actionDict.get('S'))?.value;
        break;

      case 'Rendition':
        result.action = (await actionDict.get('AN'))?.value;
        break;

      case 'Trans':
        result.trans = (await actionDict.get('Trans'))?.value;
        break;
    }

    return result;
  } catch (e) {
    return { type: 'Unknown', error: e.message };
  }
}

/**
 * Build actions summary.
 */
export function buildActionsSummary(actions) {
  const byType = {};
  for (const a of actions) {
    const type = a.action?.type || 'Unknown';
    byType[type] = (byType[type] || 0) + 1;
  }

  return {
    count: actions.length,
    hasActions: actions.length > 0,
    byType,
    hasJavaScript: actions.some(a => a.action?.type === 'JavaScript'),
    hasNavigation: actions.some(a => ['GoTo', 'GoToR', 'GoToE'].includes(a.action?.type)),
    hasFormActions: actions.some(a => ['SubmitForm', 'ResetForm', 'ImportData'].includes(a.action?.type)),
    documentActions: actions.filter(a => a.type === 'Document'),
    pageActions: actions.filter(a => a.type === 'Page'),
    annotationActions: actions.filter(a => a.type === 'Annotation'),
  };
}

// ─── Appearance Streams ──────────────────────────────────────────────────────

/**
 * Extract appearance streams from annotations.
 */
export async function extractAppearanceStreams(page) {
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
            down: ann.appearance?.D ? await extractAppearanceDict(ann.appearance.D) : null,
          },
          currentAppearance: ann.appearance?.N ? 'normal' : null,
        };

        appearances.push(appearance);
      }
    }
  } catch (e) {
    console.error('[codbdocs] Appearance stream extraction error:', e);
  }

  return appearances;
}

/**
 * Extract appearance dictionary.
 */
async function extractAppearanceDict(appearRef) {
  try {
    const dict = await appearRef.fetch?.() || appearRef;
    if (!dict) return null;

    // Check if it's a single stream or a dictionary of streams
    if (dict.getBytes) {
      // Single stream
      return {
        type: 'single',
        hasData: true,
        size: dict.dict?.get('Length')?.value || 0,
      };
    }

    // Dictionary of appearances (e.g., for different states)
    const result = {
      type: 'dictionary',
      states: {},
    };

    for (const [key, value] of Object.entries(dict)) {
      if (key.startsWith('/')) {
        result.states[key.slice(1)] = {
          hasData: true,
        };
      }
    }

    return result;
  } catch {
    return null;
  }
}

/**
 * Build appearance streams summary.
 */
export function buildAppearanceStreamsSummary(appearances) {
  const withNormal = appearances.filter(a => a.appearances.normal).length;
  const withRollover = appearances.filter(a => a.appearances.rollover).length;
  const withDown = appearances.filter(a => a.appearances.down).length;

  return {
    count: appearances.length,
    hasAppearanceStreams: appearances.length > 0,
    withNormalAppearance: withNormal,
    withRolloverAppearance: withRollover,
    withDownAppearance: withDown,
    types: [...new Set(appearances.map(a => a.type))],
  };
}

// ─── XObject Reuse Tracking ─────────────────────────────────────────────────

/**
 * Track XObject references and reuse patterns.
 */
export function trackXObjectReuse(ir) {
  const xobjects = {};
  const usageMap = {};

  // Scan all pages for XObject references
  for (const [pageId, pageData] of Object.entries(ir.pages)) {
    const pageNum = parseInt(pageId.replace('page_', ''));

    for (const vecId of (pageData.vectors || [])) {
      const vec = ir.vectors?.[vecId];
      if (vec?.raw?.xObject) {
        const xobjId = vec.raw.xObject;
        if (!xobjects[xobjId]) {
          xobjects[xobjId] = {
            id: xobjId,
            type: vec.raw.xObjectType || 'unknown',
            pages: [],
            usageCount: 0,
          };
        }
        xobjects[xobjId].pages.push(pageNum);
        xobjects[xobjId].usageCount++;
      }
    }

    for (const textId of (pageData.content || [])) {
      const text = ir.objects?.[textId];
      if (text?.raw?.xObject) {
        const xobjId = text.raw.xObject;
        if (!xobjects[xobjId]) {
          xobjects[xobjId] = {
            id: xobjId,
            type: text.raw.xObjectType || 'unknown',
            pages: [],
            usageCount: 0,
          };
        }
        xobjects[xobjId].pages.push(pageNum);
        xobjects[xobjId].usageCount++;
      }
    }
  }

  // Calculate reuse statistics
  const values = Object.values(xobjects);
  const reused = values.filter(x => x.usageCount > 1);
  const unique = values.filter(x => x.usageCount === 1);

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
    reusedXObjects: reused.map(x => ({
      id: x.id,
      type: x.type,
      usageCount: x.usageCount,
      pages: x.pages,
    })),
  };
}

/**
 * Build XObject summary.
 */
export function buildXObjectSummary(reuseInfo) {
  return {
    totalXObjects: reuseInfo.total,
    reusedXObjects: reuseInfo.reusedCount,
    uniqueXObjects: reuseInfo.uniqueCount,
    reuseRatio: (reuseInfo.reuseRatio * 100).toFixed(1) + '%',
    mostUsed: reuseInfo.xobjects
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5)
      .map(x => ({
        id: x.id,
        type: x.type,
        usageCount: x.usageCount,
      })),
  };
}

// ─── Incremental Revisions ───────────────────────────────────────────────────

/**
 * Extract revision history from an incremental PDF.
 */
export async function extractRevisions(doc) {
  const revisions = [];

  try {
    const pdf = doc._pdf;
    if (!pdf) return revisions;

    // PDF.js doesn't directly expose revision history, but we can infer from trailer
    // In a real implementation, we'd parse the raw PDF bytes for xref sections

    // Basic revision info from document
    const meta = await pdf.getMetadata();
    const info = meta?.info || {};

    revisions.push({
      version: 1,
      type: 'original',
      creationDate: info.CreationDate || null,
      modDate: info.ModDate || null,
      producer: info.Producer || null,
      creator: info.Creator || null,
    });

    // Check for incremental updates
    const trailer = pdf.trailer;
    if (trailer?.Prev) {
      revisions.push({
        version: 2,
        type: 'incremental',
        xrefOffset: trailer.Prev,
      });
    }
  } catch (e) {
    console.error('[codbdocs] Revision extraction error:', e);
  }

  return revisions;
}

/**
 * Build revisions summary.
 */
export function buildRevisionsSummary(revisions) {
  return {
    count: revisions.length,
    hasMultipleRevisions: revisions.length > 1,
    versions: revisions.map(r => ({
      version: r.version,
      type: r.type,
      creationDate: r.creationDate,
      modDate: r.modDate,
    })),
    producers: [...new Set(revisions.map(r => r.producer).filter(Boolean))],
    creators: [...new Set(revisions.map(r => r.creator).filter(Boolean))],
  };
}
