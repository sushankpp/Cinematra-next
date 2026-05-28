import { VideoCardSkeleton } from "./VideoCardSkeleton";

export function RelatedVideoSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} variant="compact" />
      ))}
    </div>
  );
}
