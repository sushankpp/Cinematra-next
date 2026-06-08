"use client";
import { VideoPlayerProps } from "@/types/components/sections/video/videoPlayer.types";
import { useRef } from "react";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { VideoControls } from "./VideoControls";
import { sendViews } from "@/lib/api";

export function VideoPlayer({
  src,
  poster,
  title,
  videoId,
  ...props
}: VideoPlayerProps) {
  const videoControls = useVideoPlayer(src);
  const viewSent = useRef(false);

  const handleFirstPlay = () =>{
    if (!viewSent.current) {
      viewSent.current = true;
      console.log("Sending view for video:", videoId);
      sendViews(videoId).then((res)=>{
        console.log("View sent successfully for video:", videoId);
      }).catch(()=>{
        viewSent.current = false; //ignore if failed
      })
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
          onPlay={handleFirstPlay}
          onEnded={() => videoControls.setIsPlaying(false)}
        />

        <VideoControls {...videoControls} />
      </div>
    </section>
  );
}
