import MovieCard from '@/components/MovieCard';

const dummyList = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Movie Title ${i + 1}`,
  original_title: `Original Title ${i + 1}`,
  poster_path: `https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg`,
  vote_average: 7.5 + (i % 3),
  release_date: `202${i % 10}-01-01`,
}));

export default function MovieList() {
  

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
          {dummyList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}
