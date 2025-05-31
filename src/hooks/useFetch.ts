import { useState, useEffect } from 'react';

type Status = 'idle' | 'loading' | 'error' | 'success';

interface UseFetchResult<T> {
  data: T | null;
  status: Status;
  error: Error | null;
}

export function useFetch<T>(url: string, enabled = true): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);

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

        const data = await response.json();
        if (isMounted) {
          setData(data);
          setStatus('success');
        }
      } catch (error: unknown) {
        if (!isMounted) return;
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setError(error as Error);
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
