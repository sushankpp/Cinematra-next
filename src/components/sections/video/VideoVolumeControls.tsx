import Button from "@/components/ui/Button";
import { VideoControlProps } from "@/types/components/sections/video/videoControls.types";
import { Fullscreen, Minimize, Volume } from "lucide-react";
import { VideoQualitySelector } from "./VideoQualitySelector";

export function VideoVolumeControls({ ...props }: VideoControlProps) {
  return (
    <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 p-2 rounded-full hover:bg-gray/10 transition-colors duration-300 ease-in-out">
      <VideoQualitySelector
        availableQualities={props.availableQualities}
        currentQuality={props.currentQuality}
        changeQuality={props.changeQuality}
      />
      <div className="relative flex items-center group/volume hover:bg-white/10 transition-colors rounded-full duration-300 ease-in-out px-2">
        <Button
          icon={<Volume />}
          className="bg-transparent hover:bg-transparent px-2"
          title="Volume"
          aria-label="Volume"
        />
        <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 relative py-2">
          <div
            className="w-[80px] h-1 bg-white/50 rounded-full relative overflow-visible"
            ref={props.volumeRef}
            onClick={props.handleVolume}
            onMouseDown={props.handleVolumeDown}
          >
            {/* Fill */}
            <div
              className="h-full bg-gold-500 rounded-full"
              style={{ width: `${props.volume * 100}%` }}
            />

            {/* Thumb */}
            <div
              className="absolute top-1/2 w-3 h-3 bg-gold-500 rounded-full"
              style={{
                left: `${props.volume * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>
      </div>
      <Button
        icon={props.fullScreen ? <Minimize /> : <Fullscreen />}
        className="bg-transparent hover:bg-white/10 transition-colors rounded-full duration-300 ease-in-out "
        title="Fullscreen"
        aria-label="Fullscreen"
        onClick={props.handleFullScreen}
      />
    </div>
  );
}
