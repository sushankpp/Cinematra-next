import { cn } from "@/lib/util";
import { Heading } from "./Heading";
import Image from "./Image";
import Link from "./Link";
import { VideoCardProps } from "@/types/components/ui/videoCard.types";
import { formatCommentTime } from "@/lib/formatCommentTime";
import Button from "./Button";
import { MoreVertical } from "lucide-react";
import OptionsDropdown from "./OptionsDropdown";

export default function VideoCard({
  creatorName,
  videoTitle,
  creatorProfile,
  views,
  postedTime,
  videoThumbnail,
  videoId,
  className,
  variant = "default",
  isMenuOpen,
  onMenuToggle,
  items,
  ...props
}: VideoCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "relative group/videoCard cursor-pointer transition-all duration-300",
        // layout switches based on variant
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
          "overflow-hidden rounded-[15px]",
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
      </figure>

      <div className={cn("flex gap-3", !isCompact && "mt-1 gap-4")}>
        {/* creator avatar — hidden in compact */}
        {creatorProfile && !isCompact && (
          <Image
            src={creatorProfile}
            alt="creator image"
            className="w-[40px] h-[40px] rounded-full"
          />
        )}
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
        <OptionsDropdown
          isOpen={isMenuOpen}
          items={items ?? []}
        />
      </div>

      <Link
        href={`/video/${videoId}`}
        className="absolute inset-0 z-10"
        title={videoTitle}
      />
    </div>
  );
}
