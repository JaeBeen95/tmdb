export const api = {
  popular: (page = 1, language = 'ko-KR') =>
    `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`,

  detail: (id: string, language = 'ko-KR') =>
    `https://api.themoviedb.org/3/movie/${id}?language=${language}`,
};
