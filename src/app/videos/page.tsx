import { VideoGridSkeleton } from "@/components/skeletons/VideoGridSkeleton";
import { VideoGrid } from "@/components/ui/VideoGrid";
import { getVideos } from "@/lib/serverApi";
import { Suspense } from "react";

export const items = [{ label: "Share" }];

export default function VideosPage() {
  return (
    <div className="">
      <Suspense fallback={<VideoGridSkeleton count={6} />}>
        <Videos />
      </Suspense>
    </div>
  );
}

async function Videos() {
  const videos = await getVideos();

  return <VideoGrid videos={videos} items={items} />;
}
