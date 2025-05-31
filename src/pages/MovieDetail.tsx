import { useNavigate } from 'react-router-dom';
import {
  ChevronLeftIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  PlayIcon,
} from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';

const dummyMovie = {
  id: 1,
  title: '아바타: 물의 길',
  original_title: 'Avatar: The Way of Water',
  poster_path: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
  backdrop_path: 'https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
  vote_average: 8.2,
  release_date: '2022-12-16',
  runtime: 192,
  overview: '설리 가족의 이야기와 그들을 따라다니는 문제, 생존을 위한 전투를 그린 서사.',
  genres: [{ name: '모험' }, { name: 'SF' }, { name: '액션' }],
};

export default function MovieDetail() {
  const navigate = useNavigate();

  const movie = dummyMovie;

  return (
    <div className="bg-[#0d253f] text-white min-h-screen">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={movie.backdrop_path}
          alt="backdrop"
          className="w-full h-full object-cover opacity-30"
        />
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="icon"
          className="absolute top-6 left-6 z-10 bg-white/10 hover:bg-white/20 cursor-pointer"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </Button>
        <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-[#0d253f] to-transparent">
          <div className="flex gap-8 max-w-6xl w-full mx-auto items-end">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-40 sm:w-48 rounded-lg shadow-lg border-2 border-white/10"
            />
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold">{movie.title}</h1>
              <p className="text-gray-300 text-lg mt-1">{movie.original_title}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{movie.runtime}분</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <StarIcon className="w-4 h-4" />
                  <span>{movie.vote_average}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {movie.genres.map((g, i) => (
                  <span key={i} className="px-3 py-1 bg-teal-700/60 text-sm rounded-full">
                    {g.name}
                  </span>
                ))}
              </div>
              <Button
                onClick={() => console.log('예고편 보기')}
                className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full cursor-pointer"
              >
                <PlayIcon className="w-5 h-5" />
                예고편 보기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">줄거리</h2>
        <p className="text-gray-200 leading-relaxed">{movie.overview}</p>
      </section>
    </div>
  );
}
