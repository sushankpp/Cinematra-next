import { useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";

interface DropZoneProps {
  type: "video" | "image";
  accept: string;
  formats: string[];
  maxSize: string;
  isCompact?: boolean;
  onFileSelect: (file: File | null) => void;
  file?: File | null;
  existingPreview?: string | null;
}

export function Zone({
  type,
  accept,
  formats,
  maxSize,
  isCompact,
  onFileSelect,
  file,
  existingPreview,
}: DropZoneProps) {
  const localInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(existingPreview || null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, existingPreview]);

  return (
    <div>
      {previewUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10">
          {type === "image" ? (
            <img
              src={previewUrl}
              alt="Thumbnail preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : file ? (
            <video
              src={previewUrl}
              className="w-full rounded-xl"
              muted
              playsInline
            />
          ) : (
            <div className="w-full h-[160px] rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">🎬</span>
              <p className="text-sm text-primary-text/70">
                Current video uploaded
              </p>
              <p className="text-xs text-primary-text/40">
                Select a new file to replace it
              </p>
            </div>
          )}
          <div className="flex items-center justify-between px-3 py-2 mt-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-xs text-primary-text/70 truncate">
              {file?.name ??
                (existingPreview ? "Current file" : "No file selected")}
            </span>
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                onFileSelect(null as any);
              }}
              className="text-tertiary-Shade hover:text-primary-active ml-2 text-sm"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => localInputRef.current?.click()}
          className={`
          relative border-2 border-dashed border-white/10 rounded-xl
          flex flex-col items-center justify-center gap-3
          px-8 cursor-pointer
          hover:border-primary-active/40 hover:bg-primary-active/5
          transition-all duration-300 group
          ${isCompact ? "py-8" : "py-16"}
        `}
        >
          <input
            ref={localInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
            }}
          />
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary-active/10 group-hover:border-primary-active/30 transition-all duration-300">
            <Upload
              size={24}
              className="text-tertiary-Shade group-hover:text-primary-active transition-colors duration-300"
            />
          </div>
          <div className="text-center">
            <p className="font-body text-primary-text text-sm font-medium capitalize">
              Drag &amp; drop your {type} here
            </p>
            <p className="font-body text-tertiary-Shade text-xs mt-1">
              or click to browse files
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {formats.map((fmt) => (
              <span
                key={fmt}
                className="px-2 py-0.5 rounded text-[10px] font-body font-medium bg-white/5 border border-white/10 text-tertiary-Shade"
              >
                {fmt}
              </span>
            ))}
          </div>
          <p className="font-body text-tertiary-Shade text-[11px]">
            Maximum file size: {maxSize}
          </p>
        </div>
      )}
    </div>
  );
}
