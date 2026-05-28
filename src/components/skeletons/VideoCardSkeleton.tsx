export function VideoCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  const isCompact = variant === "compact";
  return (
    <div className={`shimmer flex ${isCompact ? "gap-3 p-2" : "flex-col gap-3 p-3"}`}>
      <div className={`bg-skeleton rounded-lg shrink-0
        ${isCompact ? "w-[168px] h-[94px]" : "w-full h-[210px]"}`}
      />
      <div className="flex flex-col gap-2 flex-1 justify-center">
        <div className="h-3 bg-skeleton rounded w-full" />
        <div className="h-3 bg-skeleton rounded w-4/5" />
        <div className="h-3 bg-skeleton rounded w-1/2" />
      </div>
    </div>
  );
}