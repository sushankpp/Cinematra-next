"use client";
import { VideoCardProps } from "@/types/components/sections/video/videoInfo.types";
import { useState, useEffect, useRef } from "react";
import { Heading } from "../../ui/Heading";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import { VideoComments } from "./VideoComments";
import { formatNumber } from "@/lib/formatNumber";
import { useSubscription } from "@/hooks/useSubscription";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatCommentTime } from "@/lib/formatCommentTime";

export function VideoInfo({ video }: VideoCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const {
    subCount,
    isSubscribed,
    loadingCount,
    loadingSub,
    handleSubscribe,
    handleUnsubscribe,
  } = useSubscription(video.user_id);

  console.log("VideoInfo :", video);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.classList.add("line-clamp-3");
      const clamped = el.scrollHeight > el.clientHeight;
      el.classList.remove("line-clamp-3");
      setIsClamped(!!clamped);
    });
  }, [video.description]);

  const handleDescriptionToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <Heading
        level={1}
        text={video.title}
        className="text-[32px] text-primary-text font-headline font-bold leading-tight tracking-wide mt-2"
      />
      <div className="flex mt-4 items-center gap-5">
        <div className="flex items-center">
          <Image
            src={video.users.picture || "/default-profile.jpg"}
            alt={`${video.users.first_name} ${video.users.last_name}`}
            width={50}
            height={50}
            className="rounded-full mt-2"
          />
          <div className="ml-2">
            <p className="text-[18px] text-primary-text">{`${video.users.first_name} ${video.users.last_name}`}</p>
            <p className="text-[14px] text-red-text">
              {loadingCount ? "..." : formatNumber(subCount)}
            </p>
          </div>
        </div>
        <div className="ml-auto flex-1">
          {isSubscribed ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="primary"
                  className={
                    "px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-[16px]" +
                    " bg-tertiary-Shade"
                  }
                  text="Subscribed"
                  disabled={loadingSub}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Unsubscribe from this channel?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You&apos;ll stop receiving updates from{" "}
                    {video.users.first_name} {video.users.last_name} until you
                    subscribe again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    variant="tertiary"
                    className="text-tertiary-default"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="primary"
                    onClick={handleUnsubscribe}
                    disabled={loadingSub}
                  >
                    Unsubscribe
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              variant="primary"
              className={
                "px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-[16px]" +
                " bg-red-500 text-primary-text hover:bg-primary-text hover:text-primary-active "
              }
              text="Subscribe"
              onClick={handleSubscribe}
              disabled={loadingSub}
            />
          )}
        </div>
      </div>

      {/* description */}
      <div
        className="bg-[#212121] p-4 rounded-lg mt-6  cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-200 ease-in-out whitespace-pre-wrap"
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
      {/* comments  */}
      <VideoComments videoId={video.id} />
    </div>
  );
}
