import Button from "@/components/ui/Button";
import { Pause, Play } from "lucide-react";
import { VideoProgressControls } from "./VideoProgressControls";
import { VideoTimeControls } from "./VideoTimeControls";
import { VideoControlProps } from "@/types/components/sections/video/videoControls.types";

export function VideoControls({ ...props }: VideoControlProps) {
  return (
    <>
      <Button
        icon={props.isPlaying ? <Pause size={50} /> : <Play size={50} />}
        className="bg-transparent hover:bg-black/50 transition-colors rounded-full duration-300 ease-in-out absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/player:opacity-100"
        title="Play"
        aria-label="Play"
        onClick={props.handlePlayPause}
      />

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
        <VideoProgressControls {...props} />
        <VideoTimeControls {...props} />
      </div>
    </>
  );
}
