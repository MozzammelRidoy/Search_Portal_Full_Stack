function SkeletonCard() {
  return (
    <div className="bg-white border border-[#E4E1DA] rounded-lg p-5 animate-pulse">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="h-5 bg-[#E4E1DA] rounded w-2/3" />
        <div className="h-5 bg-[#E4E1DA] rounded w-10 shrink-0" />
      </div>
      <div className="space-y-2">
        <div className="h-3.5 bg-[#E4E1DA] rounded w-full" />
        <div className="h-3.5 bg-[#E4E1DA] rounded w-5/6" />
        <div className="h-3.5 bg-[#E4E1DA] rounded w-4/6" />
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <section aria-busy="true" aria-label="Loading results" className="flex flex-col gap-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </section>
  );
}
