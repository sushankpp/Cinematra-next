import { Zone } from "./Zone";

export interface UploadDropZoneProps {
  onVideoSelect: (file: File | null) => void;
  onThumbnailSelect: (file: File | null) => void;
  videoFile?: File | null;
  thumbnail?: File | null;
  existingThumbnail?: string | null;
  existingVideo?: string | null;
}

export function UploadDropZone({ onVideoSelect, onThumbnailSelect, videoFile, thumbnail, existingThumbnail, existingVideo }: UploadDropZoneProps) {
  const thumbnailPreview = thumbnail ? URL.createObjectURL(thumbnail) : existingThumbnail || null;
  const videoPreview = videoFile ? URL.createObjectURL(videoFile) : existingVideo || null;
  return (
    <div className="flex flex-col gap-6">
      <Zone
        type="video"
        accept=".mp4,.avi,.mkv,.mov,.wmv,.webm"
        formats={["MP4", "AVI", "MKV", "MOV", "WMV", "WebM"]}
        maxSize="10GB"
        onFileSelect={onVideoSelect}
        file={videoFile}
        existingPreview={videoPreview}
      />
      <Zone
        type="image"
        accept=".png,.jpg,.jpeg,.gif,.bmp,.svg"
        formats={["PNG", "JPG", "GIF", "BMP", "SVG"]}
        maxSize="150MB"
        isCompact
        onFileSelect={onThumbnailSelect}
        file={thumbnail}
        existingPreview={thumbnailPreview}
      />
    </div>
  );
}
