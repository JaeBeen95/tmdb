export default function MovieDetailSkeleton() {
  return (
    <div className="bg-[#0d253f] text-white min-h-screen animate-pulse">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="w-full h-full bg-white/10" />
        <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-[#0d253f] to-transparent">
          <div className="flex gap-8 max-w-6xl w-full mx-auto items-end">
            <div className="w-40 sm:w-48 h-60 bg-white/10 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-white/20 rounded w-2/3" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
              <div className="flex gap-4 mt-4">
                <div className="h-4 w-16 bg-white/10 rounded" />
                <div className="h-4 w-16 bg-white/10 rounded" />
                <div className="h-4 w-16 bg-white/10 rounded" />
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-16 h-6 bg-white/10 rounded-full" />
                ))}
              </div>
              <div className="w-32 h-10 bg-white/20 rounded-full mt-5" />
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        <div className="h-6 bg-white/20 rounded w-32" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-11/12" />
        <div className="h-4 bg-white/10 rounded w-4/5" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
      </section>
    </div>
  );
}
