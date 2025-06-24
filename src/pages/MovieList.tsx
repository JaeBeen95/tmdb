import { useModal } from '@/hooks/useModal';
import { usePopularMovies } from '@/features/movie/hooks/useMovies';
import { useAddMovieForm } from '@/features/movie/hooks/useAddMovieForm';
import MovieSkeletonCard from '@/features/movie/components/MovieCardSkeleton';
import MovieListLayout from '@/features/movie/components/MovieListLayout';
import MovieListView from '@/features/movie/components/MovieListView';
import AddMovieFormModal from '@/features/movie/components/AddMovieFormModal';
import { Button } from '@/components/ui/button';

export default function MovieList() {
  const { data: movieList, isLoading, isError } = usePopularMovies({ page: 1 });
  const { isModalOpen, openModal, closeModal } = useModal();

  const {
    formData,
    isSubmitting,
    posterFile,
    errors,
    handleFieldChange,
    handleGenreChange,
    handleFileChange,
    handleSubmit,
    handleBlur,
    reset,
  } = useAddMovieForm({
    onSubmit: async (submitData) => {
      console.log(submitData);
      closeModal();
    },
  });

  const handleOpenModal = () => {
    reset();
    openModal();
  };

  const handleCancel = () => {
    closeModal();
    reset();
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
        <Button onClick={handleOpenModal} className="bg-blue-600 hover:bg-blue-700">
          새 영화 추가
        </Button>
      </div>
      <MovieListView movieList={movieList.results} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <AddMovieFormModal
            formData={formData}
            isLoading={isSubmitting}
            posterFileName={posterFile?.name || '이미지를 업로드해 주세요'}
            errors={errors}
            onFieldChange={handleFieldChange}
            onGenreChange={handleGenreChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onBlur={handleBlur}
            onCancel={handleCancel}
          />
        </div>
      )}
    </MovieListLayout>
  );
}
