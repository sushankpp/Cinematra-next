import { VideoPlayer } from "@/components/sections/video/VideoPlayer";
import Container from "@/components/ui/Container";

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
  const video = videosData.find(video => video.videoId === id);

  if(!video) return <p>Video not found</p>
  console.log(video);
  return (
    <Container>
      <VideoPlayer src={video.src} poster={video.videoThumbnail} title={video.videoTitle} />
    </Container>
  );
}
