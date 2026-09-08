"use client";
import { VideoPlayerProps } from "@/types/components/sections/video/videoPlayer.types";
import { useRef, useEffect } from "react";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { VideoControls } from "./VideoControls";
import { sendViews, watchHistory } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export function VideoPlayer({
  src,
  poster,
  title,
  videoId,
  ...props
}: VideoPlayerProps) {
  const videoControls = useVideoPlayer(src);
  const viewSent = useRef(false);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handleFirstPlay = () => {
    if (!viewSent.current) {
      viewSent.current = true;
      sendViews(videoId);
    }
  };

  const handlePlay = () => {
    videoControls.setIsPlaying(true);
    handleFirstPlay();
    if (progressInterval.current) clearInterval(progressInterval.current);

    progressInterval.current = setInterval(() => {
      if (videoControls.videoRef.current && user) {
        watchHistory(videoId, {
          watch_duration_seconds: Math.floor(
            videoControls.videoRef.current.currentTime,
          ),
          video_duration_seconds: Math.floor(
            videoControls.videoRef.current.duration,
          ),
          completed: false,
        });
      }
    }, 5000);
  };

  const handlePause = () => {
    videoControls.setIsPlaying(false);
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (user) {
      watchHistory(videoId, {
        watch_duration_seconds: Math.floor(videoControls.currentTime),
        video_duration_seconds: Math.floor(videoControls.duration),
        completed: false,
      });
    }
  };

  const handleEnded = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    videoControls.setIsPlaying(false);
    if (user) {
      watchHistory(videoId, {
        watch_duration_seconds: Math.floor(videoControls.duration),
        video_duration_seconds: Math.floor(videoControls.duration),
        completed: true,
      });
    }
  };

  return (
    <section
      className="relative w-full group/player mt-6"
      aria-label="Video Player"
    >
      <div
        className="relative h-[500px] rounded-lg overflow-hidden bg-black cursor-pointer"
        ref={videoControls.containerRef}
        onMouseEnter={() => videoControls.setPlayerFocused(true)}
        onMouseLeave={() => videoControls.setPlayerFocused(false)}
      >
        <video
          ref={videoControls.videoRef}
          poster={poster}
          preload="auto"
          className="w-full h-full rounded-lg"
          onLoadedMetadata={() => {
            videoControls.setDuration(
              videoControls.videoRef.current?.duration || 0,
            );
          }}
          onTimeUpdate={() =>
            videoControls.setCurrentTime(
              videoControls.videoRef.current?.currentTime || 0,
            )
          }
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        />

        <VideoControls {...videoControls} />
      </div>
    </section>
  );
}
