import { RelatedVideos } from "@/components/sections/video/RelatedVideos";
import { VideoInfo } from "@/components/sections/video/VideoInfo";
import { VideoPlayer } from "@/components/sections/video/VideoPlayer";
import Container from "@/components/ui/Container";
import { getVideo, getVideos } from "@/lib/serverApi";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const [video, allVideos] = await Promise.all([
      getVideo(id),
      getVideos(),
    ]);

    if (!video) {
      return (
        <Container size="xl">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Video Not Found</h2>
            <p className="text-gray-400">
              The video you are looking for does not exist or has been removed.
            </p>
          </div>
        </Container>
      );
    }

    const relatedVideos = allVideos.filter(
      (v: { id: string }) => v.id !== video.id
    );

    return (
      <Container size="xl">
        <div className="flex gap-6">
          <div className="flex-1">
            <VideoPlayer
              src={video.storage_url}
              poster={video.thumbnail_url}
              title={video.title}
              videoId={video.id}
            />
            <VideoInfo video={video} />
          </div>
          <aside className="w-[380px] shrink-0">
            <RelatedVideos videos={relatedVideos} />
          </aside>
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Failed to load video page:", error);
    return (
      <Container size="xl">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Failed to load video</h2>
          <p className="text-gray-400">
            There was a problem fetching this video. Please check your connection or try again later.
          </p>
        </div>
      </Container>
    );
  }
}
