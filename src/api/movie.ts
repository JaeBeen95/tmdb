import { tmdbClient } from './client';
import type { Movie, MovieDetail } from '../types/movie';



interface MovieListParams {
  language?: string;
  page?: number;
}

// 쿼리 스트링 빌더 유틸
const buildQuery = (params: Record<string, string | number | undefined>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });
  return query.toString();
};

/**
 * 인기 영화 목록 조회
 */
export const getPopularMovies = async (params: MovieListParams = {}) => {
  const { language = 'ko-KR', page = 1 } = params;
  
  console.log('📽️ Fetching popular movies:', { page, language });
  
  const queryString = buildQuery({ language, page });
  return tmdbClient.get<Movie[]>(`/movie/popular?${queryString}`);
};

/**
 * 영화 상세 정보 조회
 */
export const getMovieDetail = async (movieId: number, language = 'ko-KR') => {
  console.log('🎬 Fetching movie detail:', { movieId, language });
  
  const queryString = buildQuery({ language });
  return tmdbClient.get<MovieDetail>(`/movie/${movieId}?${queryString}`);
};

