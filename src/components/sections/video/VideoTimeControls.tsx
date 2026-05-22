import { VideoPlayControl } from "./VideoPlayControl";
import { VideoVolumeControls } from "./VideoVolumeControls";
import { VideoControlProps } from "@/types/components/sections/video/videoControls.types";

export function VideoTimeControls({ ...props }: VideoControlProps) {
  return (
    <div className="flex justify-between items-center">
      <VideoPlayControl {...props} />
      <VideoVolumeControls {...props} />
    </div>
  );
}
