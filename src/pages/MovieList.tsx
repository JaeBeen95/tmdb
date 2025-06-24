import { useState } from 'react';
import MovieSkeletonCard from '@/features/movie/components/MovieCardSkeleton';
import MovieListLayout from '@/features/movie/components/MovieListLayout';
import MovieListView from '@/features/movie/components/MovieListView';
import { usePopularMovies } from '@/features/movie/hooks/useMovies';
import { Button } from '@/components/ui/button';
import AddMovieFormModal from '@/features/movie/components/AddMovieFormModal';

export default function MovieList() {
  const { data: movieList, isLoading, isError } = usePopularMovies({ page: 1 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitting(true);

    console.log('전송');
  };

  if (isLoading) {
    return (
      <MovieListLayout>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieSkeletonCard key={i} />
          ))}
        </div>
      </MovieListLayout>
    );
  }

  if (isError) {
    return (
      <MovieListLayout>
        <div className="text-red-400 text-center py-10">
          <p>영화 데이터를 불러오지 못했습니다.</p>
        </div>
      </MovieListLayout>
    );
  }

  if (!movieList || movieList.results.length === 0) {
    return (
      <MovieListLayout>
        <div className="text-center py-10">
          <p>영화가 없습니다.</p>
        </div>
      </MovieListLayout>
    );
  }

  return (
    <MovieListLayout>
      <div className="text-right mb-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 text-white hover:bg-teal-700"
        >
          새 영화 추가
        </Button>
      </div>
      <MovieListView movieList={movieList.results} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <AddMovieFormModal
            isLoading={isSubmitting}
            onSubmit={handleFormSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </MovieListLayout>
  );
}
