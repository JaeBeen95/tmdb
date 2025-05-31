import { useState, useEffect } from 'react';
import MovieListView from '@/components/MovieList/MovieListView';
import type { Movie } from '@/types/movie';

export default function MovieList() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let isMounted = true;

    const fetchData = async () => {
      setStatus('loading');

      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
          signal,
        };

        const res = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
          options
        );

        const data = await res.json();

        if (isMounted) {
          setMovieList(data.results);
          setStatus('success');
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error(err);
          setStatus('error');
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="bg-[#0d253f] min-h-screen text-white">
      <header className="sticky top-0 bg-[#0d253f] z-50 px-6 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">The Movie Database 🎬</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-6">인기 영화</h2>
        <MovieListView status={status} movieList={movieList} />
      </main>
    </div>
  );
}
