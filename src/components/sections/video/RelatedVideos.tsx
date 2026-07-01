"use client";
import VideoCard from "@/components/ui/VideoCard";
import { Video } from "@/types/components/ui/videoCard.types";

export function RelatedVideos({ videos }: { videos: Video[] }) {
  return (
    <div className="flex flex-col gap-3 mt-8">
      {videos.map((video, _) => (
        <VideoCard
          key={video.id}
          creatorProfile={video.users?.picture}
          videoId={video.id}
          videoTitle={video.title}
          videoThumbnail={video.thumbnail_url}
          postedTime={new Date(video.created_at).toLocaleDateString()}
          creatorName={
            video.users
              ? `${video.users.first_name} ${video.users.last_name}`
              : "Unknown"
          }
          views={`${video.views}`}
          isMenuOpen={false}
          variant="compact"
          watchedDuration={video.watch_duration_seconds}
          totalDuration={video.video_duration_seconds}
          completed={video.completed}
        />
      ))}
    </div>
  );
}
