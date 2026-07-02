"use client";

import { formatCommentTime } from "@/lib/formatCommentTime";
import { VideoCardProps } from "@/types/components/sections/video/videoInfo.types";

interface VideoDescriptionProps {
  video: VideoCardProps["video"];
  expanded: boolean;
  isClamped: boolean;
  handleDescriptionToggle: () => void;
  descRef: React.RefObject<HTMLParagraphElement | null>;
}

export function VideoDescription({
  video,
  expanded,
  isClamped,
  handleDescriptionToggle,
  descRef,
}: VideoDescriptionProps) {
  return (
    <div
      className="bg-[#212121] p-4 rounded-lg mt-6 cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-200 ease-in-out whitespace-pre-wrap"
      onClick={handleDescriptionToggle}
    >
      <div className="flex items-center text-sm text-white font-medium font-body mb-2">
        <span>{video.views} views</span>
        <span className="mx-2">•</span>
        <span>{formatCommentTime(video.created_at)}</span>
      </div>
      <p
        ref={descRef}
        className={`text-[16px] text-primary-text leading-relaxed overflow-hidden transition-all duration-300
          ${expanded ? "" : "line-clamp-3"}`}
      >
        {video.description}
      </p>
      {isClamped && (
        <span className="text-[14px] font-semibold text-primary-text mt-2 inline-block">
          {expanded ? "Show less" : "....Show more"}
        </span>
      )}
    </div>
  );
}
