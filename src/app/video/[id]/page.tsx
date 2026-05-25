import { VideoPlayer } from "@/components/sections/video/VideoPlayer";
import Container from "@/components/ui/Container";
import { getVideo } from "@/lib/api";

const videosData = [
  {
    videoId: "1",
    src: "/sample-video.mp4",
    videoThumbnail: "/register-image.jpg",
    videoTitle: "Exploring the Cinematic World",
  },
];

export default async function VideoPage({ params }: { params: { id: string }}) {
  const { id } = await params;
  const video = await getVideo(id);
  console.log(video);

  if(!video) return <p>Video not found</p>
  console.log(video);
  return (
    <Container>
      <VideoPlayer src={video.storage_url} poster={video.thumbnail_url} title={video.title} />
    </Container>
  );
}
