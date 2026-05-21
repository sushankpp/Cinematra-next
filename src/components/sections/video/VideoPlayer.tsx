"use client";
import Button from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import { VideoPlayerProps } from "@/types/components/sections/video/videoPlayer.types";
import { Fullscreen, Pause, Play, SkipBack, SkipForward, Volume } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function VideoPlayer({
  src,
  poster,
  title,
  ...props
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatDisplay = (s: number) => {
    const mins = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${sec}`;
  };

  const formatISO = (s: number) => {
    const mins = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `PT${mins}M${sec}S`;
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.readyState >= 1) {
      setDuration(video.duration);
    }

    const handleMetadata = () => setDuration(video.duration);
    video.addEventListener("loadedmetadata", handleMetadata);

    return () => video.removeEventListener("loadedmetadata", handleMetadata);
  },[]);

  const handlePlayPause = () =>{
    const video = videoRef.current;

    if(!video) return;

    if(!isPlaying) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const time = Number(e.target.value);
     if(!videoRef.current) return;
     videoRef.current.currentTime = time;
     setCurrentTime(time);
  }

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
      <div className="relative h-[500px] rounded-lg overflow-hidden bg-black cursor-pointer">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="auto"
          className="w-full h-full rounded-lg object-cover"
          onLoadedMetadata={() => {
            console.log("duration:", videoRef.current?.duration);
            setDuration(videoRef.current?.duration || 0);
          }}
          onTimeUpdate={() =>
            setCurrentTime(videoRef.current?.currentTime || 0)
          }
          onError={(e) => console.log("video error:", e)}
        />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
          <Input type="range" min="0" max={duration} onChange={handleSeek} className="w-full mb-2" />

          <div className="flex justify-between items-center">
            <div className="flex">
              <Button
                icon={
                  isPlaying ? <Pause /> : <Play />
                }
                className="bg-transparent hover:bg-white/10 transition-colors rounded-full duration-300 ease-in-out"
                title="Play"
                aria-label="Play"
                onClick= {handlePlayPause}
              />
              <Button
                icon={<SkipBack />}
                className="bg-transparent hover:bg-white/10 transition-colors rounded-full  duration-300 ease-in-out"
                title="Skip Back"
                aria-label="Skip Back"
              />
              <Button
                icon={<SkipForward />}
                className="bg-transparent hover:bg-white/10 transition-colors rounded-full duration-300 ease-in-out"
                title="Skip Forward"
                aria-label="Skip Forward"
              />
              <div className="flex gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-2 rounded-full">
                <time
                  className="text-sm text-white font-sourceSerif"
                  dateTime={formatISO(currentTime)}
                >
                  {formatDisplay(currentTime)}
                </time>
                <span className="text-sm text-white font-sourceSerif">/</span>
                <time
                  className="text-sm text-white font-sourceSerif"
                  dateTime={formatISO(duration)}
                >
                  {formatDisplay(duration)}
                </time>
              </div>
            </div>
            <div className="flex gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-2 rounded-full hover:bg-gray/10 transition-colors duration-300 ease-in-out">
              <Button
                icon={<Volume />}
                className="bg-transparent hover:bg-white/10 transition-colors rounded-full duration-300 ease-in-out"
                title="Volume"
                aria-label="Volume"
              />
              <Button
                icon={<Fullscreen />}
                className="bg-transparent hover:bg-white/10 transition-colors rounded-full duration-300 ease-in-out "
                title="Fullscreen"
                aria-label="Fullscreen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
