"use client";
import { getUserVideos } from "@/lib/api";
import { useEffect, useState } from "react";
import { VideoGrid } from "@/components/ui/VideoGrid";

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getUserVideos();
        setVideos(videos);
        console.log("Fetched video:", videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-6 max-w-screen-xl">
      <div className="mb-6">
        <h1 className="font-headline text-2xl text-primary-text font-bold">
          Videos Uploaded by You
        </h1>
        <p className="font-body text-tertiary-Shade text-sm mt-1">
          Manage your uploaded videos
        </p>
      </div>
      <VideoGrid videos={videos} />
    </div>
  );
}
