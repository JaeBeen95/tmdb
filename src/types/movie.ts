export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}