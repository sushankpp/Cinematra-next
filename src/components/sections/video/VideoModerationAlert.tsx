"use client";

import { useRouter } from "next/navigation";

interface VideoModerationAlertProps {
  isOpen: boolean;
  moderationLabel: string;
  moderationConfidence?: number;
  description?: string;
  onProceed: () => void;
}

export function VideoModerationAlert({
  isOpen,
  moderationLabel,
  moderationConfidence,
  description,
  onProceed,
}: VideoModerationAlertProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const confidencePercent =
    moderationConfidence !== undefined && moderationConfidence !== null
      ? Math.round(moderationConfidence * 100)
      : null;

  const formattedLabel = moderationLabel.replace(/([A-Z])/g, " $1").trim();

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-lg"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #1e1628 0%, #110e18 50%, #0b0a0f 100%)",
      }}
    >
      {/* Soft bloom */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 rounded-full blur-3xl"
        style={{
          width: "400px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(168, 130, 214, 0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full px-8 sm:px-16 md:px-24">
        {/* Icon */}
        <div className="relative mb-4">
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background: "rgba(168, 130, 214, 0.2)",
              transform: "scale(2.5)",
            }}
          />
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: "48px",
              height: "48px",
              background: "rgba(168, 130, 214, 0.08)",
              border: "1px solid rgba(168, 130, 214, 0.15)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(192, 162, 235, 0.5)"
              />
              <path d="M12 8v5" stroke="rgba(192, 162, 235, 0.7)" />
              <circle
                cx="12"
                cy="16.5"
                r="0.8"
                fill="rgba(192, 162, 235, 0.7)"
              />
            </svg>
          </div>
        </div>

        <h3
          className="text-xl sm:text-2xl font-semibold leading-tight mb-2 text-center"
          style={{ color: "#e8e0f0" }}
        >
          Just a heads up
        </h3>

        {/* Subtext */}
        <p
          className="font-body text-sm leading-relaxed mb-5 text-center"
          style={{ color: "rgba(200, 190, 215, 0.50)" }}
        >
          This video has been flagged as{" "}
          <span
            className="font-medium"
            style={{ color: "rgba(192, 162, 235, 0.85)" }}
          >
            {formattedLabel.toLowerCase()}
          </span>
          {confidencePercent !== null && (
            <span className="text-red-text"> · {confidencePercent}%</span>
          )}
        </p>

        {description && (
          <div
            className="w-full max-w-lg mb-6 py-3 px-5 text-left"
            style={{
              background: "rgba(168, 130, 214, 0.04)",
              borderRadius: "10px",
              borderLeft: "2px solid rgba(168, 130, 214, 0.18)",
            }}
          >
            <p className="font-body text-[13px] leading-relaxed italic text-white">
              &quot;{description}&quot;
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 font-body text-sm font-medium py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
            style={{
              color: "rgba(200, 190, 215, 0.45)",
              background: "rgba(200, 190, 215, 0.05)",
              border: "1px solid rgba(200, 190, 215, 0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200, 190, 215, 0.1)";
              e.currentTarget.style.color = "rgba(200, 190, 215, 0.75)";
              e.currentTarget.style.borderColor = "rgba(200, 190, 215, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(200, 190, 215, 0.05)";
              e.currentTarget.style.color = "rgba(200, 190, 215, 0.45)";
              e.currentTarget.style.borderColor = "rgba(200, 190, 215, 0.08)";
            }}
          >
            Not now
          </button>

          <button
            type="button"
            onClick={onProceed}
            className="flex-1 font-body text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
            style={{
              color: "#e8e0f0",
              background:
                "linear-gradient(135deg, rgba(168, 130, 214, 0.22) 0%, rgba(130, 100, 180, 0.18) 100%)",
              border: "1px solid rgba(168, 130, 214, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(168, 130, 214, 0.32) 0%, rgba(130, 100, 180, 0.28) 100%)";
              e.currentTarget.style.borderColor = "rgba(168, 130, 214, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(168, 130, 214, 0.22) 0%, rgba(130, 100, 180, 0.18) 100%)";
              e.currentTarget.style.borderColor = "rgba(168, 130, 214, 0.2)";
            }}
          >
            Continue watching
          </button>
        </div>
      </div>
    </div>
  );
}
