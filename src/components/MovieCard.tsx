import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    original_title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block bg-[#1c2a3a] rounded-lg overflow-hidden hover:scale-105 transition"
    >
      <img src={movie.poster_path} alt={movie.title} className="w-full h-72 object-cover" />
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">{movie.original_title}</p>
        <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
          <StarIcon className="w-4 h-4" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
