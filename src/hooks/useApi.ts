import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ApiResponse } from '@/types/api';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseApiResult<T> {
  data: T | null;
  status: ApiStatus;
  error: Error | null;
  refetch: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface UseApiOptions {
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  cacheKey: string,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 30 * 1000 } = options;

  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [refetchCount, setRefetchCount] = useState(0);

  const refetch = useCallback(() => {
    console.log('🔄 Refetch triggered for:', cacheKey);
    setRefetchCount((prev) => prev + 1);
  }, [cacheKey]);

  useEffect(() => {
    if (!enabled) {
      console.log('⏸️ API call disabled for:', cacheKey);
      return;
    }

    let mounted = true;

    const executeCall = async () => {
      // 캐시 확인
      const now = Date.now();
      const cached = cache.get(cacheKey);

      if (cached && now - cached.timestamp < staleTime) {
        console.log('💾 Using cached data for:', cacheKey);
        setData(cached.data as T);
        setStatus('success');
        setError(null);
        return;
      }

      setStatus('loading');
      setError(null);

      try {
        console.log('🌐 Executing API call for:', cacheKey);
        const response = await apiCall();

        if (!mounted) return;

        if (response.success && response.data) {
          // 캐시에 저장
          cache.set(cacheKey, {
            data: response.data,
            timestamp: now,
          });

          // 캐시 만료 스케줄링
          setTimeout(() => {
            console.log('🗑️ Cache expired for:', cacheKey);
            cache.delete(cacheKey);
          }, cacheTime);

          setData(response.data);
          setStatus('success');
        } else {
          const apiError = response.error || new Error('Unknown API error');
          console.error('❌ API call failed for:', cacheKey, apiError);
          setError(apiError);
          setStatus('error');
        }
      } catch (err) {
        if (!mounted || (err instanceof DOMException && err.name === 'AbortError')) {
          return;
        }

        const error = err instanceof Error ? err : new Error('Unknown error');
        console.error('💥 API call error for:', cacheKey, error);
        setError(error);
        setStatus('error');
      }
    };

    executeCall();

    return () => {
      mounted = false;
    };
  }, [apiCall, cacheKey, enabled, cacheTime, staleTime, refetchCount]);

  const computedStates = useMemo(
    () => ({
      isLoading: status === 'loading',
      isSuccess: status === 'success',
      isError: status === 'error',
    }),
    [status]
  );

  return {
    data,
    status,
    error,
    refetch,
    ...computedStates,
  };
}
