import { useState, useCallback } from 'react';
import type { FormErrors, Genre, MovieFormData } from '@/features/movie/types/movie';
import { validateMovieForm } from '@/features/movie/lib/utils';

const initialFormData: MovieFormData = {
  title: '',
  original_title: '',
  release_date: '',
  runtime: 0,
  genres: [],
};

interface UseAddMovieFormParams {
  onSubmit: (submitData: { formData: MovieFormData; posterFile: File | null }) => Promise<void>;
}

export function useAddMovieForm({ onSubmit }: UseAddMovieFormParams) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MovieFormData>(initialFormData);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      if (errors[name as keyof MovieFormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
      }));
    },
    [errors]
  );

  const handleGenreChange = useCallback(
    (genre: Genre) => {
      if (errors.genres) {
        setErrors((prev) => ({ ...prev, genres: undefined }));
      }
      setFormData((prev) => {
        const newGenres = prev.genres.some((g) => g.id === genre.id)
          ? prev.genres.filter((g) => g.id !== genre.id)
          : [...prev.genres, genre];
        return { ...prev, genres: newGenres };
      });
    },
    [errors]
  );

  const handleFileChange = useCallback((file: File | null) => {
    setPosterFile(file);
  }, []);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;
      const validationErrors = validateMovieForm(formData);
      const error = validationErrors[name as keyof MovieFormData];
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [formData]
  );

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setPosterFile(null);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validateMovieForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit({ formData, posterFile });
        reset();
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, formData, posterFile, reset]
  );

  return {
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
  };
}
