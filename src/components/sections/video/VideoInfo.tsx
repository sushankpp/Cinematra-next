"use client";

import { VideoCardProps } from "@/types/components/sections/video/videoInfo.types";
import { Heading } from "../../ui/Heading";
import { VideoComments } from "./VideoComments";
import { useVideoInfo } from "@/hooks/useVideoInfo";
import { ChannelSection } from "./ChannelSection";
import { VideoReactions } from "./VideoReactions";
import { VideoDescription } from "./VideoDescription";

export function VideoInfo({ video }: VideoCardProps) {
  const {
    subCount,
    isSubscribed,
    loadingCount,
    loadingSub,
    handleSubscribe,
    handleUnsubscribe,
    expanded,
    isClamped,
    handleDescriptionToggle,
    likeState,
    likes,
    dislikes,
    handleLikes,
    handleDislikes,
    loadingReaction,
    descRef,
  } = useVideoInfo(video);

  return (
    <div>
      <Heading
        level={1}
        text={video.title}
        className="text-[32px] text-primary-text font-headline font-bold leading-tight tracking-wide mt-2"
      />
      
      <div className="flex mt-4 items-center gap-5">
        <ChannelSection
          video={video}
          subCount={subCount}
          isSubscribed={isSubscribed}
          loadingCount={loadingCount}
          loadingSub={loadingSub}
          handleSubscribe={handleSubscribe}
          handleUnsubscribe={handleUnsubscribe}
        />
        
        <VideoReactions
          likeState={likeState}
          likes={likes}
          dislikes={dislikes}
          handleLikes={handleLikes}
          handleDislikes={handleDislikes}
          loadingReaction={loadingReaction}
        />
      </div>

      <VideoDescription
        video={video}
        expanded={expanded}
        isClamped={isClamped}
        handleDescriptionToggle={handleDescriptionToggle}
        descRef={descRef}
      />

      <VideoComments videoId={video.id} />
    </div>
  );
}
