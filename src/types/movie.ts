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
  poster_path: string | null;
  runtime: number;
  genres: genre[];
  overview: string;
}

interface genre {
  id: number;
  name: string;
}
