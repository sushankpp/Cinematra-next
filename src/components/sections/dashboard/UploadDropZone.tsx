import { useRef } from "react";
import { Upload } from "lucide-react";

export function UploadDropZone() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="
        relative border-2 border-dashed border-white/10 rounded-xl
        flex flex-col items-center justify-center gap-3
        py-16 px-8 cursor-pointer
        hover:border-primary-active/40 hover:bg-primary-active/5
        transition-all duration-300 group
      "
    >
      <input
        ref={inputRef}
        type="file"
        accept=".mp4,.avi,.mkv,.mov,.wmv,.webm"
        className="hidden"
      />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary-active/10 group-hover:border-primary-active/30 transition-all duration-300">
        <Upload
          size={24}
          className="text-tertiary-Shade group-hover:text-primary-active transition-colors duration-300"
        />
      </div>

      <div className="text-center">
        <p className="font-body text-primary-text text-sm font-medium">
          Drag &amp; drop your video here
        </p>
        <p className="font-body text-tertiary-Shade text-xs mt-1">
          or click to browse files
        </p>
      </div>

      {/* Format badges */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {["MP4", "AVI", "MKV", "MOV", "WMV", "WebM"].map((fmt) => (
          <span
            key={fmt}
            className="px-2 py-0.5 rounded text-[10px] font-body font-medium bg-white/5 border border-white/10 text-tertiary-Shade"
          >
            {fmt}
          </span>
        ))}
      </div>

      <p className="font-body text-tertiary-Shade text-[11px]">
        Maximum file size: 10GB
      </p>
    </div>
  );
}