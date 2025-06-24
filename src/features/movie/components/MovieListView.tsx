import MovieCard from '@/features/movie/components/MovieCard';
import MovieSkeletonCard from '@/features/movie/components/MovieCardSkeleton';
import type { Movie } from '@/features/movie/types/movie';

interface MovieListViewProps {
  status: 'idle' | 'loading' | 'error' | 'success';
  movieList: Movie[];
}

export default function MovieListView({ status, movieList }: MovieListViewProps) {
  if (status === 'loading')
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieSkeletonCard key={i} />
        ))}
      </div>
    );

  if (status === 'error') {
    return (
      <div className="text-red-400 text-center py-10">
        <p>영화 데이터를 불러오지 못했습니다.</p>
      </div>
    );
  }

  if (movieList.length === 0) {
    return (
      <div className="text-center py-10">
        <p>영화가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
