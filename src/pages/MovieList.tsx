import MovieListView from '@/components/MovieList/MovieListView';
import { usePopularMovies } from '@/hooks/useMovies';

export default function MovieList() {
  const { data: movieList, isLoading, isError } = usePopularMovies({ page: 1 });

  console.log('🎬 MovieList rendered:', { movieList, isLoading, isError });

  // 기존 status 형태로 변환 (MovieListView 호환성 위해)
  const status = isLoading ? 'loading' : isError ? 'error' : 'success';

  return (
    <div className="bg-[#0d253f] min-h-screen text-white">
      <header className="sticky top-0 bg-[#0d253f] z-50 px-6 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">The Movie Database 🎬</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-6">인기 영화</h2>
        <MovieListView status={status} movieList={movieList || []} />
      </main>
    </div>
  );
}
