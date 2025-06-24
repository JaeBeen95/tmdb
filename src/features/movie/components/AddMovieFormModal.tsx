import { GENRES_LIST } from '@/features/movie/constants';
import { PhotoIcon } from '@heroicons/react/24/solid';
import type { Genre, MovieFormData } from '@/features/movie/types/movie';

export interface MovieFormProps {
  formData: MovieFormData;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  posterFileName: string;
  onGenreChange: (genre: Genre) => void;
  onFileChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function AddMovieFormModal({
  formData,
  posterFileName,
  onFieldChange,
  onGenreChange,
  onFileChange,
}: MovieFormProps) {
  return (
    <div className="bg-[#0d253f] p-8 rounded-xl text-white w-full max-w-2xl shadow-2xl border border-sky-900/50">
      <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-white/10">새 영화 추가</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <TextInput
            label="영화 제목"
            name="title"
            value={formData.title}
            onChange={onFieldChange}
            required
          />
          <TextInput
            label="원제"
            name="original_title"
            value={formData.original_title}
            onChange={onFieldChange}
          />
          <TextInput
            label="개봉일"
            name="release_date"
            type="date"
            value={formData.release_date}
            onChange={onFieldChange}
            required
          />
          <TextInput
            label="상영 시간 (분)"
            name="runtime"
            type="number"
            value={formData.runtime.toString()}
            onChange={onFieldChange}
            required
          />

          <div className="md:col-span-2">
            <FileUploadInput
              label="포스터 이미지"
              fileName={posterFileName}
              onFileChange={onFileChange}
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
                    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-teal-500 focus:ring-teal-500"
                    checked={formData.genres.some((g) => g.id === genre.id)}
                    onChange={() => onGenreChange(genre)}
                  />
                  <span className="text-sm">{genre.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const TextInput = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-[#0c2d48] border border-slate-700 rounded-md shadow-sm px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    />
  </div>
);

const FileUploadInput = ({
  label,
  fileName,
  onFileChange,
}: {
  label: string;
  fileName: string;
  onFileChange: (file: File | null) => void;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <label
        htmlFor="file-upload"
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 cursor-pointer hover:border-gray-500 hover:bg-slate-800/20 transition-colors"
      >
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
          <div className="mt-4 flex text-sm leading-6 text-gray-400">
            <span className="relative rounded-md font-semibold text-teal-500">
              파일을 업로드 하세요
            </span>
          </div>
          <p className="text-xs leading-5 text-gray-500 truncate max-w-xs mx-auto mt-2">
            {fileName}
          </p>
        </div>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
