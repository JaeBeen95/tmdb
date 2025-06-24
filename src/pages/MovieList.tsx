import MovieListView from '@/features/movie/components/MovieListView';
import MovieListLayout from '@/features/movie/components/MovieListLayout';
import { usePopularMovies } from '@/features/movie/hooks/useMovies';

export default function MovieList() {
  const { data: movieList, isLoading, isError } = usePopularMovies({ page: 1 });

  const status = isLoading ? 'loading' : isError ? 'error' : 'success';

  return (
    <MovieListLayout>
      <MovieListView status={status} movieList={movieList?.results || []} />
    </MovieListLayout>
  );
}
