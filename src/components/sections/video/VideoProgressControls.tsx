import { VideoControlProps } from "@/types/components/sections/video/videoControls.types";

export function VideoProgressControls({ ...props }: VideoControlProps) {
  return (
    <div
      className="w-full h-1 bg-white/50 rounded-full cursor-pointer group/progress mb-2 relative"
      ref={props.progressRef}
      onClick={props.handleSeek}
      onMouseDown={props.handleMouseDown}
    >
      <div
        className="h-full bg-gold-500 rounded-full relative"
        style={{
          width: `${(props.currentTime / props.duration) * 100}%`,
        }}
      >
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gold-500 rounded-full"></div>
      </div>
    </div>
  );
}
