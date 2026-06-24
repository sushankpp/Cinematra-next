"use client";
import { VideoGridProps } from "@/types/components/ui/videoCard.types";
import Container from "./Container";
import VideoCard from "./VideoCard";
import { useState } from "react";
import { formatCommentTime } from "@/lib/formatCommentTime";

export function VideoGrid({ videos = [], items, getItems }: VideoGridProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  return (
    <section className="mb-4 pt-8 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, _) => (
            <VideoCard
              key={video.id}
              creatorProfile={video.users?.picture ?? ""}
              videoId={video.id}
              videoTitle={video.title}
              videoThumbnail={video.thumbnail_url}
              postedTime={formatCommentTime(video.created_at)}
              creatorName={
                video.users
                  ? `${video.users.first_name} ${video.users.last_name}`
                  : "Unknown"
              }
              views={`${video.views}`}
              isMenuOpen={openMenuId === video.id}
              onMenuToggle={() =>
                setOpenMenuId(openMenuId === video.id ? null : video.id)
              }
              items={getItems ? getItems(video) : items}
              similarityScore={video.similarity_score}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
