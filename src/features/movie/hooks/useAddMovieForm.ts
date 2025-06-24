import { useState, useCallback } from 'react';
import type { Genre, MovieFormData } from '@/features/movie/types/movie';

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

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setPosterFile(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit({ formData, posterFile });
        reset();
      } catch (error) {
        console.error(error);
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
    handleFieldChange,
    handleGenreChange,
    handleFileChange,
    handleSubmit,
    reset,
  };
}
