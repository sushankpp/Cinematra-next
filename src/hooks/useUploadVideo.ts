import { useState, useEffect, useRef } from "react";
import { GenreFormDB } from "@/types/components/ui/videoCard.types";
import { supabase } from "@/lib/supabase";
import { uploadVideo, getVideo, updateVideo } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUploadVideo(editId?: string | null) {
  const [availableGenres, setAvailableGenres] = useState<GenreFormDB[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState<boolean>(true);
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(null);
  const [existingVideo, setExistingVideo] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<"idle" | "uploading" | "processing" | "done">("idle");
  const uploadStartTime = useRef<number>(0);
  const processingStartTime = useRef<number>(0);
  const router = useRouter();

  const [uploadInsights, setUploadInsights] = useState<{
    uploadTime: number;
    processingTime: number;
    totalTime: number;
    fileSize: string;
    qualities: string[];
    videoId: string;
    thumbnailUrl: string;
  } | null>(null);

  const [scalarData, setScalarData] = useState({
    title: "",
    description: "",
    contentRating: "",
    language: "English",
    releaseYear: String(new Date().getFullYear()),
  });

  const [files, setFiles] = useState<{
    thumbnail: File | null;
    videoFile: File | null;
  }>({
    thumbnail: null,
    videoFile: null,
  });

  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data, error } = await supabase
          .from("genres")
          .select("*")
          .order("name", { ascending: true });

        if (error) throw error;
        if (data) setAvailableGenres(data);
      } catch (err) {
        console.error("Error fetching genres:", err);
      } finally {
        setIsLoadingGenres(false);
      }
    }
    fetchGenres();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId) {
      const formData = new FormData();
      formData.append("title", scalarData.title);
      formData.append("description", scalarData.description);
      formData.append("content_rating", scalarData.contentRating);
      formData.append("language", scalarData.language);
      formData.append("release_year", scalarData.releaseYear.toString());
      formData.append("genre_ids", genres.join(","));
      formData.append("tag_ids", tags.join(","));
      if (files.videoFile) formData.append("Video", files.videoFile);
      if (files.thumbnail) formData.append("Thumbnail", files.thumbnail);

      await updateVideo(editId, formData);
      toast.success("Video updated successfully!");
      router.push(`/dashboard/videos`);
    } else {
      if (isUploading) return;

      if (!files.videoFile) {
        return toast.error("Please select a video file to upload.");
      }
      if (!scalarData.title.trim()) return toast.error("Title is required.");

      uploadStartTime.current = Date.now();
      setIsUploading(true);
      setUploadStage("uploading");
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("title", scalarData.title);
      formData.append("description", scalarData.description);
      formData.append("content_rating", scalarData.contentRating);
      formData.append("language", scalarData.language);
      formData.append("release_year", scalarData.releaseYear.toString());
      formData.append("genre_ids", genres.join(","));
      formData.append("tag_ids", tags.join(","));
      if (files.videoFile) formData.append("Video", files.videoFile);
      if (files.thumbnail) formData.append("Thumbnail", files.thumbnail);

      console.log("Form Data to submit:", formData);

      try {
        const response = await uploadVideo(formData, (percent) => {
          setUploadProgress(percent);
          if (percent === 100) {
            processingStartTime.current = Date.now();
            setUploadStage("processing");
          }
        });

        const now = Date.now();
        setUploadInsights({
          uploadTime: Math.round(
            (processingStartTime.current - uploadStartTime.current) / 1000,
          ),
          processingTime: Math.round(
            (now - processingStartTime.current) / 1000,
          ),
          totalTime: Math.round((now - uploadStartTime.current) / 1000),
          fileSize: files.videoFile
            ? (files.videoFile.size / (1024 * 1024)).toFixed(1) + " MB"
            : "—",
          qualities: response.qualities,
          videoId: response.video_id,
          thumbnailUrl: response.thumbnail_url,
        });
        setUploadStage("done");
        // window.location.href = `/video/${response.video_id}`;
        console.log("Upload successful:", response);
      } catch (error) {
        toast.error("Upload failed. Please try again.");
        console.error("Upload failed:", error);
        setUploadStage("idle");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onReset = () => {
    setUploadStage("idle");
    setUploadInsights(null);
  };

  //edit video
  useEffect(() => {
    if (!editId) return;

    const fetchVideo = async () => {
      try {
        const video = await getVideo(editId);
        setScalarData({
          title: video.title || "",
          description: video.description || "",
          contentRating: video.content_rating || "",
          language: video.language || "",
          releaseYear: video.release_year || new Date().getFullYear(),
        });

        if (video.video_genres) {
          setGenres(video.video_genres.map((vg: any) => String(vg.genre_id)));
        }

        if (video.video_tags) {
          setTags(video.video_tags.map((vt: any) => String(vt.tag_id)));
        }

        setExistingThumbnail(video.thumbnail_url || null);
        setExistingVideo(video.video_url || null);
      } catch (error) {
        console.error("Error fetching video details for editing:", error);
        toast.error("Failed to load video details for editing.");
      }
    };
    fetchVideo();
  }, [editId]);

  return {
    availableGenres,
    isLoadingGenres,
    scalarData,
    files,
    tags,
    isUploading,
    uploadProgress,
    uploadStage,
    uploadInsights,
    genres,
    existingThumbnail,
    existingVideo,
    setFiles,
    setScalarData,
    setTags,
    setGenres,
    handleSubmit,
    setUploadStage,
    setUploadInsights,
    onReset,
  };
}
