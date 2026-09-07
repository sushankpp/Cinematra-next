import { VideoGrid } from "@/components/ui/VideoGrid";
import { Suspense } from "react";
import { VideoGridSkeleton } from "@/components/skeletons/VideoGridSkeleton";
import { Heading } from "@/components/ui/Heading";
import Container from "@/components/ui/Container";
import { getGlobalTrending, getPersonalTrending } from "@/lib/serverApi";

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
  try {
    const trendingVideos = await getGlobalTrending();

    if (!trendingVideos || trendingVideos.length === 0) {
      return null;
    }
    return <VideoGrid videos={trendingVideos} items={[]} />;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return null;
  }
}

async function PersonalTrendingVideos() {
  try {
    const personalTrendingVideos = await getPersonalTrending();

    if (!personalTrendingVideos || personalTrendingVideos.length === 0) {
      return null;
    }

    return <VideoGrid videos={personalTrendingVideos} items={[]} />;
  } catch (error) {
    console.error("Error fetching personal trending videos:", error);
    return null;
  }
}

