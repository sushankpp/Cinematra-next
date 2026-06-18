import { TrendingSlider } from "@/components/sections/TrendingSlider";
import { VideoGridSkeleton } from "@/components/skeletons/VideoGridSkeleton";
import { VideoGrid } from "@/components/ui/VideoGrid";
import { getVideos } from "@/lib/api";
import { Suspense } from "react";

export const items = [
  { label: "Share" },
]

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
  console.log("Fetched videos:", videos);
  return <VideoGrid videos={videos} items={items} />;
}
