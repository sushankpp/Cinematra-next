"use client";
import { getUserVideos } from "@/lib/api";
import { useEffect, useState } from "react";
import { VideoGrid } from "@/components/ui/VideoGrid";
import { VideoGridSkeleton } from "@/components/skeletons/VideoGridSkeleton";
import { deleteVideo } from "@/lib/api";
import { toast } from "sonner";
import { Video } from "@/types/components/ui/videoCard.types";
import { useRouter } from "next/navigation";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();

  const handleEdit = (videoId: string) => {
    router.push(`/dashboard/upload?edit=${videoId}`);
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const videos = await getUserVideos();
      setVideos(videos);
      console.log("Fetched video:", videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await deleteVideo(id);
      if (res.success) {
        setVideos((prev) => prev.filter((video: Video) => video.id !== id));
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video");
    }
  };

  const getItems = (video: Video) => [
    { label: "Edit", onClick: () => handleEdit(video.id) },
    { label: "Delete", onClick: () => handleDelete(video.id) },
    { label: "Share", onClick: () => {} },
  ];

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
      {loading ? (
        <VideoGridSkeleton count={9} />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <VideoGrid videos={videos} getItems={getItems} />
      )}
    </div>
  );
}
