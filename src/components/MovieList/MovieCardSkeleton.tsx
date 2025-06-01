export default function MovieSkeletonCard() {
  return (
    <div className="bg-[#1c2a3a] rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-72 bg-white/10" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-white/20 rounded w-full" />
        <div className="h-4 bg-white/20 rounded w-5/6" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
        <div className="flex items-center gap-1 mt-2">
          <div className="w-4 h-4 bg-white/20 rounded-full" />
          <div className="h-3 bg-white/10 rounded w-6" />
        </div>
      </div>
    </div>
  );
}
