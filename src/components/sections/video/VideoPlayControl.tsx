import Button from "@/components/ui/Button";
import { VideoControlProps } from "@/types/components/sections/video/videoControls.types";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export function VideoPlayControl({ ...props }: VideoControlProps) {
  return (
    <div className="flex">
      <Button
        icon={props.isPlaying ? <Pause /> : <Play />}
        className="bg-transparent hover:bg-white/10 transition-colors rounded-full duration-300 ease-in-out"
        title="Play"
        aria-label="Play"
        onClick={props.handlePlayPause}
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
          dateTime={props.formatISO(props.currentTime)}
        >
          {props.formatDisplay(props.currentTime)}
        </time>
        <span className="text-sm text-white font-sourceSerif">/</span>
        <time
          className="text-sm text-white font-sourceSerif"
          dateTime={props.formatISO(props.duration)}
        >
          {props.formatDisplay(props.duration)}
        </time>
      </div>
    </div>
  );
}
