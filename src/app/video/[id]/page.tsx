import { RelatedVideos } from "@/components/sections/video/RelatedVideos";
import { VideoInfo } from "@/components/sections/video/VideoInfo";
import { VideoPlayer } from "@/components/sections/video/VideoPlayer";
import Container from "@/components/ui/Container";
import VideoCard from "@/components/ui/VideoCard";
import { getVideo, getVideos, getSubscriptionCount } from "@/lib/api";

const videosData = [
  {
    videoId: "1",
    src: "/sample-video.mp4",
    videoThumbnail: "/register-image.jpg",
    videoTitle: "Exploring the Cinematic World",
  },
];

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const [video, allVideos] = await Promise.all([getVideo(id), getVideos()]);
  const subscriptionCount = await getSubscriptionCount(video.user_id);

  if (!video) return <p>Video not found</p>;

  const relatedVideos = allVideos.filter(
    (v: { id: string }) => v.id !== video.id,
  );
  return (
    <Container size="xl">
      <div className="flex gap-6">
        <div className="flex-1">
          <VideoPlayer
            src={video.storage_url}
            poster={video.thumbnail_url}
            title={video.title}
          />
          <VideoInfo video={video} subscriptionCount={subscriptionCount} />
        </div>
        <aside className="w-[380px] shrink-0">
          <RelatedVideos videos={relatedVideos} />
        </aside>
      </div>
    </Container>
  );
}
