export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  runtime: number;
  genres: Genre[];
  overview: string;
}

export interface MovieList {
  id: number;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieFormData {
  title: string;
  original_title: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
}

export type FormErrors = Partial<Record<keyof MovieFormData, string>>;
