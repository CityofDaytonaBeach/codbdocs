/**
 * @codbdocs/core — IndexedDB Persistence
 *
 * Caches analysis results in IndexedDB for instant reload.
 * Uses SHA-256 hash of PDF as cache key.
 */

const DB_NAME = 'codbdocs';
const DB_VERSION = 1;
const STORE_NAME = 'documents';

/**
 * Compute SHA-256 hash of an ArrayBuffer.
 */
async function hashBuffer(buffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Open the IndexedDB database.
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'hash' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save analysis results to IndexedDB.
 */
export async function saveToCache(pdfBuffer, analysisData, options = {}) {
  const { ttl = 7 * 24 * 60 * 60 * 1000 } = options; // 7 day default TTL

  try {
    const hash = await hashBuffer(pdfBuffer);
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const record = {
        hash,
        data: analysisData,
        timestamp: Date.now(),
        ttl,
      };

      store.put(record);
      tx.oncomplete = () => resolve({ hash, saved: true });
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    return { hash: null, saved: false, error: err.message };
  }
}

/**
 * Load analysis results from IndexedDB.
 */
export async function loadFromCache(pdfBuffer) {
  try {
    const hash = await hashBuffer(pdfBuffer);
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(hash);

      request.onsuccess = () => {
        const record = request.result;
        if (!record) {
          resolve({ found: false, hash });
          return;
        }

        // Check TTL
        if (Date.now() - record.timestamp > record.ttl) {
          resolve({ found: false, hash, reason: 'expired' });
          return;
        }

        resolve({
          found: true,
          hash,
          data: record.data,
          timestamp: record.timestamp,
          age: Date.now() - record.timestamp,
        });
      };

      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    return { found: false, error: err.message };
  }
}

/**
 * Clear expired entries from the cache.
 */
export async function clearExpiredCache() {
  try {
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.openCursor();

      let cleared = 0;

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const record = cursor.value;
          if (Date.now() - record.timestamp > record.ttl) {
            cursor.delete();
            cleared++;
          }
          cursor.continue();
        }
      };

      tx.oncomplete = () => resolve({ cleared });
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    return { cleared: 0, error: err.message };
  }
}

/**
 * Clear all cached entries.
 */
export async function clearCache() {
  try {
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      tx.oncomplete = () => resolve({ cleared: true });
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    return { cleared: false, error: err.message };
  }
}

/**
 * Get cache statistics.
 */
export async function getCacheStats() {
  try {
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.count();

      request.onsuccess = () => resolve({ entries: request.result });
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    return { entries: 0, error: err.message };
  }
}
