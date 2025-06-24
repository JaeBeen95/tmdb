export const MOVIE_API_PATH = {
  POPULAR: '/movie/popular',
  DETAIL: (id: number | string) => `/movie/${id}`,
};