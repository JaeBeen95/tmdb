import { useCallback } from 'react';
import { useApi } from './useApi';
import * as movieApi from '../api/movie';

interface UseMoviesOptions {
  enabled?: boolean;
  page?: number;
  language?: string;
}

interface UseMovieDetailOptions {
  enabled?: boolean;
  language?: string;
}

/**
 * 인기 영화 목록 조회 훅
 */
export function usePopularMovies(options: UseMoviesOptions = {}) {
  const { enabled = true, page = 1, language = 'ko-KR' } = options;
  
  const apiCall = useCallback(
    () => movieApi.getPopularMovies({ page, language }),
    [page, language]
  );
  
  return useApi(apiCall, `popular-movies-${page}-${language}`, { enabled });
}

/**
 * 영화 상세 정보 조회 훅
 */
export function useMovieDetail(movieId: number, options: UseMovieDetailOptions = {}) {
  const { enabled = true, language = 'ko-KR' } = options;
  
  const apiCall = useCallback(
    () => movieApi.getMovieDetail(movieId, language),
    [movieId, language]
  );
  
  return useApi(apiCall, `movie-detail-${movieId}-${language}`, { 
    enabled: enabled && !!movieId,
    staleTime: 10 * 60 * 1000, // 10분 캐싱
  });
} 