import { tmdbClient } from '@/api/client';
import { MOVIE_API_PATH } from '@/constant';
import type { ApiResponse } from '@/types/api';
import type { MovieList, MovieDetail } from '@/features/movie/types/movie';

interface MovieListParams {
  language?: string;
  page?: number;
}

/**
 * 인기 영화 목록 조회
 */
export const getPopularMovies = (params: MovieListParams = {}): Promise<ApiResponse<MovieList>> => {
  const { language = 'ko-KR', page = 1 } = params;

  // 개선된 get 메서드에 params 객체를 바로 전달
  return tmdbClient.get(MOVIE_API_PATH.POPULAR, { language, page });
};

/**
 * 영화 상세 정보 조회
 */
export const getMovieDetail = (
  movieId: number,
  language = 'ko-KR'
): Promise<ApiResponse<MovieDetail>> => {
  return tmdbClient.get(MOVIE_API_PATH.DETAIL(movieId), { language });
};
