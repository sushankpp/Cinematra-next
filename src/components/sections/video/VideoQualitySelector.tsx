import { useState } from "react";
import { VideoQualitySelectorProps } from "@/types/components/sections/video/videoControls.types";
import Button from "@/components/ui/Button";

export function VideoQualitySelector({
  availableQualities,
  currentQuality,
  changeQuality,
}: VideoQualitySelectorProps) {
  const [open, setOpen] = useState(false);
  const qualityLabel =
    currentQuality === 1
      ? "Auto"
      : availableQualities[currentQuality]?.label || "Auto";

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        className="bg-transparent text-white text-sm px-2 py-1 rounded hover:bg-white/20"
        text={qualityLabel}
      />

      {open && (
        <div className="absolute bottom-8 left-0 bg-black/90 rounded-lg overflow-hidden">
          <Button
            onClick={() => {
              changeQuality(-1);
              setOpen(false);
            }}
            className={`w-full bg-transparent text-left px-4 py-2 hover:bg-white/20 ${currentQuality === -1 ? "text-red-500" : "text-white"}`}
            text="Auto"
          />
          {[...availableQualities].reverse().map((q) => (
            <Button
              key={q.index}
              onClick={() => {
                changeQuality(q.index);
                setOpen(false);
              }}
              className={`w-full bg-transparent text-left px-4 py-2 hover:bg-white/20 ${currentQuality === q.index ? "text-red-500" : "text-white"}`}
              text={q.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}
