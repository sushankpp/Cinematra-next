import Container from "../ui/Container";
import { VideoCardSkeleton } from "./VideoCardSkeleton";

export function VideoGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
}
