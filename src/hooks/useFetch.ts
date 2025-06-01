import { useState, useEffect } from 'react';

type Status = 'idle' | 'loading' | 'error' | 'success';

interface ErrorDetail {
  message: string;
  statusCode?: number;
  statusText?: string;
}

interface UseFetchResult<T> {
  data: T | null;
  status: Status;
  error: ErrorDetail | null;
}

interface CacheItem<T> {
  data: T;
  cachedAt: number;
}

const fetchCache = new Map<string, CacheItem<unknown>>();

export function invalidateCache(url: string) {
  fetchCache.delete(url);
}

interface UseFetchOptions {
  cacheMaxAge?: number;
}

export function useFetch<T>(
  url: string,
  enabled = true,
  options?: UseFetchOptions
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<ErrorDetail | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!(enabled && url)) return;

    const cacheMaxAge = options?.cacheMaxAge ?? 1000 * 60 * 5;
    const now = Date.now();
    const cacheItem = fetchCache.get(url) as CacheItem<T>;

    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;
    let timer: ReturnType<typeof setTimeout>;

    const scheduleNext = (delay: number) => {
      if (delay > 0) {
        timer = setTimeout(() => {
          if (isMounted) {
            setRefetchTrigger((prev) => prev + 1);
          }
        }, delay);
      }
    };

    const fetchData = async () => {
      setStatus('loading');
      setError(null);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
          signal,
        });

        if (!response.ok) {
          throw {
            message: `${response.status} ${response.statusText}`,
            statusCode: response.status,
            statusText: response.statusText,
          };
        }

        const result: T = await response.json();

        if (isMounted) {
          fetchCache.set(url, { data: result, cachedAt: Date.now() });
          setData(result);
          setStatus('success');

          scheduleNext(cacheMaxAge);
        }
      } catch (err: unknown) {
        if (!isMounted || (err instanceof DOMException && err.name === 'AbortError')) return;

        const errorDetail: ErrorDetail = { message: 'Network error' };
        if (typeof err === 'object' && err !== null) {
          if ('message' in err && typeof err.message === 'string')
            errorDetail.message = err.message;
          if ('statusCode' in err && typeof err.statusCode === 'number')
            errorDetail.statusCode = err.statusCode;
          if ('statusText' in err && typeof err.statusText === 'string')
            errorDetail.statusText = err.statusText;
        }
        setError(errorDetail);
        setStatus('error');
      }
    };

    if (cacheItem && now - cacheItem.cachedAt < cacheMaxAge) {
      setData(cacheItem.data);
      setStatus('success');
      setError(null);

      const timeUntilExpiry = cacheMaxAge - (now - cacheItem.cachedAt);
      scheduleNext(timeUntilExpiry);
    } else {
      fetchData();
    }

    return () => {
      isMounted = false;
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, [url, enabled, options?.cacheMaxAge, refetchTrigger]);

  return { data, status, error };
}
