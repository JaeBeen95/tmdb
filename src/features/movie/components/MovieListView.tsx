import MovieCard from '@/features/movie/components/MovieCard';
import type { Movie } from '@/features/movie/types/movie';

interface MovieListViewProps {
  movieList: Movie[];
}

export default function MovieListView({ movieList }: MovieListViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
