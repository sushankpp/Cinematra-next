import { Zone } from "./Zone";

export interface UploadDropZoneProps {
  onVideoSelect: (file: File | null) => void;
  onThumbnailSelect: (file: File | null) => void;
  videoFile?: File | null;
  thumbnail?: File | null;
}

export function UploadDropZone({ onVideoSelect, onThumbnailSelect, videoFile, thumbnail }: UploadDropZoneProps) {
  return (
    <div className="flex flex-col gap-6">
      <Zone
        type="video"
        accept=".mp4,.avi,.mkv,.mov,.wmv,.webm"
        formats={["MP4", "AVI", "MKV", "MOV", "WMV", "WebM"]}
        maxSize="10GB"
        onFileSelect={onVideoSelect}
        file={videoFile}
      />
      <Zone
        type="image"
        accept=".png,.jpg,.jpeg,.gif,.bmp,.svg"
        formats={["PNG", "JPG", "GIF", "BMP", "SVG"]}
        maxSize="150MB"
        isCompact
        onFileSelect={onThumbnailSelect}
        file={thumbnail}
      />
    </div>
  );
}
