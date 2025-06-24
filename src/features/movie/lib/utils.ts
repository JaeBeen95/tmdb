import type { FormErrors, MovieFormData } from '@/features/movie/types/movie';

export const validateMovieForm = (formData: MovieFormData): FormErrors => {
  const formErrors: FormErrors = {};

  if (!formData.title.trim()) {
    formErrors.title = '영화 제목을 입력해주세요.';
  }
  if (!formData.release_date) {
    formErrors.release_date = '개봉일을 선택해주세요.';
  }
  if (formData.runtime <= 0) {
    formErrors.runtime = '상영 시간은 0보다 커야 합니다.';
  }
  if (formData.genres.length === 0) {
    formErrors.genres = '장르를 하나 이상 선택해주세요.';
  }

  return formErrors;
};
