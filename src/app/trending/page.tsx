import { VideoGrid } from "@/components/ui/VideoGrid";
import { getGlobalTrending } from "@/lib/api";
import { Suspense } from "react";
import { VideoGridSkeleton } from "@/components/skeletons/VideoGridSkeleton";
import { Heading } from "@/components/ui/Heading";
import Container from "@/components/ui/Container";
import { getPersonalTrending } from "@/lib/serverApi";

export default function TrendingPage() {
  return (
    <div className="">
      <Container>
        <Heading
          level={1}
          className="text-white text-[32px] font-headline"
          text="Globally Trending Videos"
        />
      </Container>
      <Suspense fallback={<VideoGridSkeleton count={6} />}>
        <TrendingVideos />
      </Suspense>
      <div className="border-b bg-white w-full h-[1px] mb-4"></div>
      <Container>
        <Heading
          level={1}
          className="text-white text-[32px] font-headline"
          text="Your Personalized Trending Videos according to the videos you have watched"
        />
      </Container>
      <Suspense fallback={<VideoGridSkeleton count={6} />}>
        <PersonalTrendingVideos />
      </Suspense>
    </div>
  );
}

async function TrendingVideos() {
  const trendingVideos = await getGlobalTrending();

  return <VideoGrid videos={trendingVideos} items={[]} />;
}

async function PersonalTrendingVideos() {
  let personalTrendingVideos = [];

  try {
    personalTrendingVideos = await getPersonalTrending();
  } catch (error) {
    console.error("Error fetching personal trending videos:", error);
    return null;
  }

  return <VideoGrid videos={personalTrendingVideos} items={[]} />;
}
