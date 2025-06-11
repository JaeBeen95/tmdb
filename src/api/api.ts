// const baseUrl = 'https://api.themoviedb.org/3/movie';
// const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apis = {
  // popular: (page = 1, language = 'ko-KR') => `${BASE_URL}/movie/popular?language=${language}&page=${page}`,
  popular: ({page, language}: {page: number, language: string}) => `${BASE_URL}/movie/popular?language=${language}&page=${page}`,
  detail: (id: string, {language}: {language: string}) => `${BASE_URL}/movie/${id}?language=${language}`,
};
