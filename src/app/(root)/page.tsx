import { TrendingSlider } from "@/components/sections/TrendingSlider";
import { VideoGridSkeleton } from "@/components/skeletons/VideoGridSkeleton";
import { VideoGrid } from "@/components/ui/VideoGrid";
import { getVideos } from "@/lib/api";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <TrendingSlider />
      <Suspense fallback={<VideoGridSkeleton count={6} />}>
        <VideoGridFetcher />
      </Suspense>
    </>
  );
}

async function VideoGridFetcher() {
  const videos = await getVideos();
  return <VideoGrid videos={videos} />;
}
