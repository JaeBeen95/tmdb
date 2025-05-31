import MovieListView from '@/components/MovieList/MovieListView';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/api/api';
import type { Movie } from '@/types/movie';

export default function MovieList() {
  const { data: movieList, status } = useFetch<{ results: Movie[] }>(api.popular(1));

  return (
    <div className="bg-[#0d253f] min-h-screen text-white">
      <header className="sticky top-0 bg-[#0d253f] z-50 px-6 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">The Movie Database 🎬</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-6">인기 영화</h2>
        <MovieListView status={status} movieList={movieList?.results || []} />
      </main>
    </div>
  );
}
