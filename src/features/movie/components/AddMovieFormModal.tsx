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

export default function AddMovieFormModal({ formData, onFieldChange }: MovieFormProps) {
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
