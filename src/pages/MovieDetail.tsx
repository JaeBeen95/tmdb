import { useNavigate, useParams } from 'react-router-dom';
import { useMovieDetail } from '@/features/movie/hooks/useMovies';
import MovieDetailSkeleton from '@/features/movie/components/MovieDetailSkeleton';
import MovieDetailView from '@/features/movie/components/MovieDetailView';

export default function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const movieId = id ? parseInt(id, 10) : 0;

  const {
    data: movie,
    isLoading,
    isError,
  } = useMovieDetail(movieId, {
    enabled: !!movieId,
  });

  if (isLoading) return <MovieDetailSkeleton />;
  if (isError) return <p>영화 정보를 불러오지 못했습니다.</p>;
  if (!movie) return <p className="text-lg">영화 정보를 찾을 수 없습니다.</p>;

  return <MovieDetailView movie={movie} onBack={() => navigate(-1)} />;
}
