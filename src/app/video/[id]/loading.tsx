import { RelatedVideoSkeleton } from "@/components/skeletons/RelatedVideoSkeleton";
import { VideoPlayerSkeleton } from "@/components/skeletons/VideoPlayerSkeleton";
import Container from "@/components/ui/Container";

export default function VideoLoading() {
  return (
    <Container>
      <div className="flex gap-3">
        <div className="flex-1">
          <VideoPlayerSkeleton />
        </div>
        <div className="shrink-0 w-[300px]">
          <RelatedVideoSkeleton count={7} />
        </div>
      </div>
    </Container>
  );
}
