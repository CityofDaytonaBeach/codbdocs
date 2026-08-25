import { useCallback, useRef, useState } from 'react';
import { CodbDocs } from '@codbdocs/core';

/**
 * React binding for @codbdocs/core.
 *
 * const { run, status, progress, result, error } = useCodbDocs();
 * <input type="file" onChange={e => run(e.target.files[0])} />
 */
export function useCodbDocs(options = {}) {
  const [status, setStatus] = useState('idle'); // idle | loading | processing | done | error
  const [progress, setProgress] = useState(null); // { page, status, progress }
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const docRef = useRef(null);

  const run = useCallback(async (source) => {
    setStatus('loading');
    setError(null);
    setResult(null);
    try {
      docRef.current = await CodbDocs.load(source);
      setStatus('processing');
      const res = await docRef.current.analyze({
        ocr: options.ocr !== false,
        onProgress: (info) => setProgress(info),
        onPageComplete: options.onPageComplete,
      });
      setResult(res);
      setStatus('done');
      return res;
    } catch (err) {
      setError(err);
      setStatus('error');
      throw err;
    }
  }, [options.ocr, options.onPageComplete]);

  return { run, status, progress, result, error };
}

export default useCodbDocs;
