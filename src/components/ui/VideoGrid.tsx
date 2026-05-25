"use client";

import { Video } from "@/types/components/ui/videoCard.types";
import Container from "./Container";
import VideoCard from "./VideoCard";
import { getVideos } from "@/lib/api";
import { useEffect, useState } from "react";


export function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(()=>{
    async function fetchVideos() {
      try {
        const data = await getVideos();
        setVideos(data);
        console.log(data);
      } catch {
        console.error("Failed to fetch videos");
      }
    }
    fetchVideos();
  }, []);

  return (
    <section className="mb-4 pt-8 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <VideoCard key={video.id} creatorProfile={video.users.creator_profile || "/default-profile.jpg"} videoId={video.id} videoTitle={video.title} videoThumbnail={video.thumbnail_url} postedTime={new Date(video.created_at).toLocaleDateString()} creatorName={`${video.users.first_name} ${video.users.last_name}`} views="0 views"/>
          ))}
        </div>
      </Container>
    </section>
  );
}
