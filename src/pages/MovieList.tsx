import { useState, useCallback } from 'react';
import { usePopularMovies } from '@/features/movie/hooks/useMovies';
import MovieSkeletonCard from '@/features/movie/components/MovieCardSkeleton';
import MovieListLayout from '@/features/movie/components/MovieListLayout';
import MovieListView from '@/features/movie/components/MovieListView';
import AddMovieFormModal from '@/features/movie/components/AddMovieFormModal';
import { Button } from '@/components/ui/button';
import type { Genre, MovieFormData } from '@/features/movie/types/movie';

const initialFormData: MovieFormData = {
  title: '',
  original_title: '',
  release_date: '',
  runtime: 0,
  genres: [],
};

export default function MovieList() {
  const { data: movieList, isLoading, isError } = usePopularMovies({ page: 1 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MovieFormData>(initialFormData);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
    }));
  }, []);

  const handleGenreChange = useCallback((genre: Genre) => {
    setFormData((prev) => {
      const newGenres = prev.genres.some((g) => g.id === genre.id)
        ? prev.genres.filter((g) => g.id !== genre.id)
        : [...prev.genres, genre];
      return { ...prev, genres: newGenres };
    });
  }, []);

  const handleFileChange = useCallback((file: File | null) => {
    setPosterFile(file);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setPosterFile(null);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          새 영화 추가
        </Button>
      </div>
      <MovieListView movieList={movieList.results} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <AddMovieFormModal
            formData={formData}
            isLoading={isSubmitting}
            posterFileName={posterFile?.name || '파일을 선택하거나 드래그하세요'}
            onFieldChange={handleFieldChange}
            onGenreChange={handleGenreChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
    </MovieListLayout>
  );
}
