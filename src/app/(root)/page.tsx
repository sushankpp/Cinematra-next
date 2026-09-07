import { TrendingSlider } from "@/components/sections/TrendingSlider";
import { VideoGridSkeleton } from "@/components/skeletons/VideoGridSkeleton";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { VideoGrid } from "@/components/ui/VideoGrid";
import {
  getVideos,
  getPersonalTrending,
  getRecommendations,
  getGlobalTrending,
} from "@/lib/serverApi";
import { Suspense } from "react";

export const items = [{ label: "Share" }];

export default async function Home() {
  return (
    <>
      <Suspense fallback={<TrendingSlider videos={[]} />}>
        <TrendingVideoFetcher />
      </Suspense>
      <Suspense fallback={<VideoGridSkeleton count={6} />}>
        <VideoGridFetcher />
      </Suspense>
      <Suspense fallback={<VideoGridSkeleton count={6} />}>
        <AllVideos />
      </Suspense>
    </>
  );
}

async function VideoGridFetcher() {
  let recommendations = [];

  try {
    recommendations = await getRecommendations();
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return null;
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <>
      <Container>
        <Heading
          text="Recommended for you"
          className="font-headline text-[32px] text-red-text"
        />
      </Container>
      <VideoGrid videos={recommendations} items={items} />
    </>
  );
}

async function AllVideos() {
  try {
    const videos = await getVideos();

    if (!videos || videos.length === 0) {
      return null;
    }

    return (
      <Container>
        <Heading
          text="All Videos"
          className="font-headline text-[32px] text-red-text"
        />
        <VideoGrid videos={videos} items={items} />
      </Container>
    );
  } catch (error) {
    console.error("Error fetching all videos:", error);
    return null;
  }
}

async function TrendingVideoFetcher() {
  const globalTrending = await getGlobalTrending();

  let personalTrending: typeof globalTrending = [];
  try {
    personalTrending = await getPersonalTrending();
  } catch {
    // User is not authenticated — fall back to global trending
  }

  const trending =
    personalTrending.length > 0 ? personalTrending : globalTrending;

  return <TrendingSlider videos={trending} />;
}
