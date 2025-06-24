import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { GENRES_LIST } from '@/features/movie/constants';
// import type { Genre } from '@/features/movie/types/movie';

export interface AddMovieFormModalProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  /*
  formData: MovieFormData;
  posterFileName: string;
  errors: FormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenreChange: (genre: Genre) => void;
  onFileChange: (file: File | null) => void;
  */
}

export default function AddMovieFormModal({
  isLoading,
  onSubmit,
  onClose,
  // formData,
  // posterFileName,
  // errors,
  // onFieldChange,
  // onGenreChange,
  // onFileChange,
}: AddMovieFormModalProps) {
  return (
    <div className="bg-[#0d253f] p-8 rounded-xl text-white w-full max-w-2xl shadow-2xl border border-sky-900/50">
      <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-white/10">새 영화 추가</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <TextInput
            label="영화 제목"
            name="title"
            // value={formData.title}
            // onChange={onFieldChange}
            // error={errors.title}
            required
          />
          <TextInput
            label="원제"
            name="original_title"
            // value={formData.original_title}
            // onChange={onFieldChange}
          />
          <TextInput
            label="개봉일"
            name="release_date"
            type="date"
            // value={formData.release_date}
            // onChange={onFieldChange}
            // error={errors.release_date}
            required
          />
          <TextInput
            label="상영 시간 (분)"
            name="runtime"
            type="number"
            defaultValue={0}
            // value={formData.runtime.toString()}
            // onChange={onFieldChange}
            // error={errors.runtime}
            required
          />
          <div className="md:col-span-2">
            <FileUploadInput
              label="포스터 이미지"
              name="poster"
              // fileName={posterFileName}
              // onFileChange={onFileChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">장르</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {GENRES_LIST.map((genre) => (
                <label
                  key={genre.id}
                  className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-sky-900/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    name="genres"
                    value={genre.id}
                    // checked={formData.genres.some((g) => g.id === genre.id)}
                    // onChange={() => onGenreChange(genre)}
                    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-sm">{genre.name}</span>
                </label>
              ))}
            </div>
            {/* {errors.genres && <p className="mt-2 text-sm text-red-500">{errors.genres}</p>} */}
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-6 border-t border-white/20 mt-8">
          <Button
            type="button"
            variant="outline"
            className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
            onClick={onClose}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            type="submit"
            className="bg-teal-600 text-white hover:bg-teal-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" /> 추가 중...
              </>
            ) : (
              '추가하기'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

const TextInput = ({
  label,
  // error,
  ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-[#0c2d48] border border-slate-700 rounded-md shadow-sm px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    />
    {/* {error && <p className="mt-1 text-sm text-red-500">{error}</p>} */}
  </div>
);

const FileUploadInput = ({ label, name }: { label: string; name: string }) => {
  const [fileName, setFileName] = useState('이미지를 업로드해 주세요');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '이미지를 업로드해 주세요');
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <label
        htmlFor={name}
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 cursor-pointer hover:border-gray-500 hover:bg-slate-800/20 transition-colors"
      >
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
          <p className="mt-4 text-sm font-semibold text-teal-500">이미지를 업로드해 주세요</p>
          <p className="mt-1 text-xs text-gray-500 truncate max-w-xs mx-auto">{fileName}</p>
        </div>
        <input id={name} name={name} type="file" className="sr-only" onChange={handleFileChange} />
      </label>
    </div>
  );
};
