"use client";
import { Heading } from "@/components/ui/Heading";
import { VideoPlayerProps } from "@/types/components/sections/video/videoPlayer.types";

import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { VideoControls } from "./VideoControls";

export function VideoPlayer({
  src,
  poster,
  title,
  ...props
}: VideoPlayerProps) {
  const videoControls = useVideoPlayer(src);

  return (
    <section
      className="relative w-full group/player mt-6"
      aria-label="Video Player"
    >
      <Heading
        level={1}
        text={title}
        className="text-[48px] text-charcoal-900 font-bebas font-bold leading-tight tracking-wide mb-4"
      />
      <div
        className="relative h-[500px] rounded-lg overflow-hidden bg-black cursor-pointer"
        ref={videoControls.containerRef}
        onMouseEnter={() => videoControls.setPlayerFocused(true)}
        onMouseLeave={() => videoControls.setPlayerFocused(false)}
      >
        <video
          ref={videoControls.videoRef}
          src={src}
          poster={poster}
          preload="auto"
          className="w-full h-full rounded-lg object-cover"
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
          onEnded={() => videoControls.setIsPlaying(false)}
        />

        <VideoControls {...videoControls} />
      </div>
    </section>
  );
}
