import { useState, useCallback, type FormEvent } from 'react';
import { useModal } from '@/hooks/useModal';
import { usePopularMovies } from '@/features/movie/hooks/useMovies';
import MovieListLayout from '@/features/movie/components/MovieListLayout';
import MovieListView from '@/features/movie/components/MovieListView';
import MovieSkeletonCard from '@/features/movie/components/MovieCardSkeleton';
import AddMovieFormModal from '@/features/movie/components/AddMovieFormModal';
import { Button } from '@/components/ui/button';
import { GENRES_LIST } from '@/features/movie/constants';

export default function MovieList() {
  const { data: movieList, isLoading, isError } = usePopularMovies({ page: 1 });
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const {
  //   formData,
  //   isSubmitting,
  //   posterFile,
  //   errors,
  //   handleFieldChange,
  //   handleGenreChange,
  //   handleFileChange,
  //   handleSubmit,
  //   handleBlur,
  //   reset,
  // } = useAddMovieForm({
  //   onSubmit: async (submitData) => {
  //     console.log(submitData);
  //     closeModal();
  //   },
  // });

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

      const submitData = {
        title: formData.get('title'),
        original_title: formData.get('original_title'),
        release_date: formData.get('release_date'),
        runtime: formData.get('runtime'),
        genres: formData.getAll('genres').map((id) => {
          const foundGenre = GENRES_LIST.find((g) => g.id === Number(id));
          return foundGenre || { id: Number(id), name: 'Unknown' };
        }),
        posterFile:
          (formElement.elements.namedItem('poster') as HTMLInputElement).files?.[0] || null,
      };

      console.log('서버로 제출할 최종 데이터:', submitData);

      await new Promise((resolve) => setTimeout(resolve, 0));

      setIsSubmitting(false);
      closeModal();
    },
    [closeModal]
  );

  // const handleOpenModal = () => {
  //   reset();
  //   openModal();
  // };

  // const handleCancel = () => {
  //   closeModal();
  //   reset();
  // };

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
        <Button onClick={openModal} className="bg-blue-600 hover:bg-blue-700">
          새 영화 추가
        </Button>
      </div>
      <MovieListView movieList={movieList.results} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <AddMovieFormModal
            isLoading={isSubmitting}
            onSubmit={handleSubmit}
            onClose={closeModal}
            // formData={formData}
            // posterFileName={posterFile?.name || '이미지를 업로드해 주세요'}
            // errors={errors}
            // onFieldChange={handleFieldChange}
            // onGenreChange={handleGenreChange}
            // onFileChange={handleFileChange}
            // onBlur={handleBlur}
            // onCancel={handleCancel}
          />
        </div>
      )}
    </MovieListLayout>
  );
}
