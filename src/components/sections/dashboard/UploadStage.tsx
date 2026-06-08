import { ChevronRight } from "lucide-react";

type UploadStageType = "idle" | "uploading" | "processing" | "done";

export function UploadStage({
  uploadStage,
  uploadProgress,
  uploadInsights,
  isUploading,
  onReset,
}: {
  uploadStage: UploadStageType;
  uploadProgress: number;
  uploadInsights: any;
  isUploading: boolean;
  onReset: () => void;
}) {
  return (
    <>
      {uploadStage === "uploading" && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-primary-text/60">
            <span>Uploading video...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-primary-active transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {uploadStage === "processing" && (
        <div className="flex items-center gap-3 text-sm text-primary-text/60">
          <div className="w-4 h-4 rounded-full border-2 border-primary-active border-t-transparent animate-spin" />
          <span>
            Processing video — generating quality tiers, this may take a few
            minutes...
          </span>
        </div>
      )}

      {uploadStage === "done" && uploadInsights && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-sm font-semibold text-primary-text">
              Upload Complete
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-lg font-bold text-primary-text">
                {uploadInsights.uploadTime}s
              </p>
              <p className="text-[11px] text-tertiary-Shade mt-0.5">
                Upload time
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-lg font-bold text-primary-text">
                {uploadInsights.processingTime}s
              </p>
              <p className="text-[11px] text-tertiary-Shade mt-0.5">
                Processing time
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <p className="text-lg font-bold text-primary-text">
                {uploadInsights.totalTime}s
              </p>
              <p className="text-[11px] text-tertiary-Shade mt-0.5">
                Total time
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-tertiary-Shade">File size</span>
              <span className="text-primary-text">
                {uploadInsights.fileSize}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-tertiary-Shade">Quality tiers</span>
              <span className="text-primary-text">
                {uploadInsights.qualities.join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-tertiary-Shade">Video ID</span>
              <span className="text-primary-text/60 text-xs font-mono truncate max-w-[200px]">
                {uploadInsights.videoId}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <a
              href={`/video/${uploadInsights.videoId}`}
              className="flex-1 text-center py-2 rounded-lg bg-primary-active hover:bg-primary-active/85 text-white text-sm font-semibold transition-colors"
            >
              Watch Video
            </a>
            <button
              type="button"
              onClick={onReset}
              className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-primary-text text-sm hover:bg-white/10 transition-colors"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}

      {/* Submit */}
      {uploadStage !== "done" && (
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isUploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-active hover:bg-primary-active/85 text-white text-sm font-body font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading
              ? uploadStage === "processing"
                ? "Processing..."
                : `Uploading ${uploadProgress}%`
              : "Upload & Continue"}
            {!isUploading && <ChevronRight size={16} />}
          </button>
        </div>
      )}
    </>
  );
}
