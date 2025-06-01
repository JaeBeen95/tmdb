const baseUrl = 'https://api.themoviedb.org/3/movie';

export const api = {
  popular: (page = 1, language = 'ko-KR') => `${baseUrl}/popular?language=${language}&page=${page}`,

  detail: (id: string, language = 'ko-KR') => `${baseUrl}/${id}?language=${language}`,
};
