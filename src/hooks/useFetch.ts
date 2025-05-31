import { useState, useEffect } from 'react';

type Status = 'idle' | 'loading' | 'error' | 'success';

interface UseFetchResult<T> {
  data: T | null;
  status: Status;
  error: ErrorDetail | null;
}

interface ErrorDetail {
  message: string;
  statusCode?: number;
  statusText?: string;
}

export function useFetch<T>(url: string, enabled = true): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<ErrorDetail | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const fetchData = async () => {
      setStatus('loading');
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
          const message = `${response.status} ${response.statusText}`;
          throw {
            message,
            statusCode: response.status,
            statusText: response.statusText,
          };
        }

        const data: T = await response.json();

        if (isMounted) {
          setData(data);
          setStatus('success');
        }
      } catch (error: unknown) {
        if (!isMounted) return;

        if (error instanceof DOMException && error.name === 'AbortError') return;

        const errorDetail: ErrorDetail = {
          message: 'Network error',
        };

        if (typeof error === 'object' && error !== null) {
          if ('message' in error && typeof error.message === 'string') {
            errorDetail.message = error.message;
          }
          if ('statusCode' in error && typeof error.statusCode === 'number') {
            errorDetail.statusCode = error.statusCode;
          }
          if ('statusText' in error && typeof error.statusText === 'string') {
            errorDetail.statusText = error.statusText;
          }
        }

        setError(errorDetail);
        setStatus('error');
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, enabled]);

  return { data, status, error };
}
