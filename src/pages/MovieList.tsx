import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import type { Movie } from '@/types/Movie';

export default function MovieList() {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    };

    fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
      .then((res) => res.json())
      .then((res) => setMovieList(res.results))
      .catch((err) => console.error(err));
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}
