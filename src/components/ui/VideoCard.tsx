import { cn } from "@/lib/util";
import { Heading } from "./Heading";
import Image from "./Image";
import Link from "./Link";
import { VideoCardProps } from "@/types/components/ui/videoCard.types";
import { formatCommentTime } from "@/lib/formatCommentTime";
import Button from "./Button";
import { MoreVertical } from "lucide-react";
import OptionsDropdown from "./OptionsDropdown";
import { Initials } from "@/services/initials";
import {
  formatFullDuration,
  getProgressPercent,
} from "@/lib/formatWatchDurations";

export default function VideoCard({
  creatorName,
  videoTitle,
  creatorProfile,
  views,
  postedTime,
  videoThumbnail,
  videoId,
  className,
  watchedDuration,
  totalDuration,
  completed,
  variant = "default",
  isMenuOpen,
  similarityScore,
  onMenuToggle,
  items,
  ...props
}: VideoCardProps) {
  const isCompact = variant === "compact";
  const durationText = formatFullDuration(watchedDuration, totalDuration);
  const showProgressBar =
    Boolean(totalDuration && totalDuration > 0) &&
    (Boolean(watchedDuration && watchedDuration > 0) || Boolean(completed));

  return (
    <div
      className={cn(
        "relative group/videoCard cursor-pointer transition-all duration-300",
        isCompact
          ? "flex gap-3 rounded-xl p-2 hover:bg-tertiary-Shade/30"
          : "hover:shadow-lg hover:bg-tertiary-Shade/30 rounded-[25px] p-3",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-[25px] bg-charcoal-100 scale-90 opacity-0 group-hover/videoCard:scale-100 group-hover/videoCard:opacity-100 transition-all duration-300 -z-10" />

      {/* thumbnail */}
      <figure
        className={cn(
          "overflow-hidden rounded-[15px] relative",
          isCompact ? "w-[168px] h-[94px] shrink-0" : "w-full h-[210px] mb-3",
        )}
      >
        <Image
          src={videoThumbnail}
          alt="video thumbnail"
          className={cn(
            "rounded-[15px] transition-all duration-300 group-hover/videoCard:-translate-y-[1px]",
            isCompact ? "w-full h-full object-cover" : "w-full h-auto",
          )}
        />
        {durationText ? (
          <div className="absolute bottom-3 right-1">
            <div className="bg-black/80 text-white text-[11px] px-1.5 py-0.5 rounded font-body">
              {durationText}
            </div>
          </div>
        ) : null}

        {showProgressBar ? (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
            <div
              className={`h-full transition-all ${completed ? "bg-green-500" : "bg-red-500"}`}
              style={{
                width: completed
                  ? "100%"
                  : `${getProgressPercent(watchedDuration ?? 0, totalDuration ?? 0)}%`,
              }}
            />
          </div>
        ) : null}

        {similarityScore !== undefined && (
          <div className="absolute top-0 left-0">
            <span className="bg-red-text text-white text-[12px] font-semibold px-2 py-1 rounded-br-lg">
              Similarity: {Math.round(similarityScore * 100)}%
            </span>
          </div>
        )}
      </figure>

      <div className={cn("flex gap-3", !isCompact && "mt-1 gap-4")}>
        {creatorProfile && !isCompact ? (
          <Image
            src={creatorProfile}
            alt="creator image"
            className="w-[40px] h-[40px] rounded-full"
          />
        ) : !isCompact ? (
          <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-neutral-default/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-tr from-primary-active to-secondary-default">
            {Initials(creatorName.split(" ")[0], creatorName.split(" ")[1])}
          </div>
        ) : null}
        <div className="min-w-0">
          <Heading
            text={videoTitle}
            className={cn(
              "font-body text-primary-text font-[500] line-clamp-2",
              isCompact ? "text-[15px]" : "text-[18px]",
            )}
            title="video title"
          />
          <p
            className={cn(
              "font-body text-red-text",
              isCompact ? "text-[13px]" : "text-[14px]",
            )}
          >
            {creatorName}
          </p>
          <div
            className={cn(
              "flex items-center text-red-text",
              isCompact ? "text-[13px]" : "text-[14px]",
            )}
          >
            <span>{views} Views</span>
            <span
              className="mx-2 relative w-3 h-3 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current before:w-[4px] before:h-[4px] before:rounded-full"
              aria-hidden="true"
            />
            <span>{formatCommentTime(postedTime)}</span>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-13 z-11">
        <Button
          icon={<MoreVertical color="white" />}
          variant="none"
          className="p-2 rounded-full hover:bg-[#2a2a2a]"
          onClick={onMenuToggle}
        />
        <OptionsDropdown isOpen={isMenuOpen} items={items ?? []} />
      </div>

      <Link
        href={`/video/${videoId}`}
        className="absolute inset-0 z-10"
        title={videoTitle}
      />
    </div>
  );
}
