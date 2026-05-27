
import VideoCard from "@/components/ui/VideoCard";
import { Video } from "@/types/components/ui/videoCard.types";

export function RelatedVideos({ videos }: { videos: Video[] }) {
  return (
    <div className="flex flex-col gap-3 mt-8">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          videoId={video.id}
          videoThumbnail={video.thumbnail_url}
          videoTitle={video.title}
          creatorName={`${video.users.first_name} ${video.users.last_name}`}
          views={video.views || "0 Views"}
          postedTime={new Date(video.created_at).toLocaleDateString()}
          variant="compact"
        />
      ))}
    </div>
  );
}
