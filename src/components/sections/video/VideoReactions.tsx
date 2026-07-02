"use client";

import Button from "@/components/ui/Button";
import { Loader2, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

interface VideoReactionsProps {
  likeState: "like" | "dislike" | null;
  likes: number;
  dislikes: number;
  handleLikes: () => void;
  handleDislikes: () => void;
  loadingReaction: boolean;
}

export function VideoReactions({
  likeState,
  likes,
  dislikes,
  handleLikes,
  handleDislikes,
  loadingReaction,
}: VideoReactionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="none"
        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 ease-in-out"
        onClick={handleLikes}
      >
        {loadingReaction ? (
          <Loader2 className="w-5 h-5 text-primary-text animate-spin" />
        ) : likeState === "like" ? (
          <ThumbsUpIcon className="w-5 h-5 text-blue-500" />
        ) : (
          <ThumbsUpIcon className="w-5 h-5 text-primary-text" />
        )}
        <span className="ml-2 text-primary-text text-[16px]">{likes}</span>
      </Button>
      <Button
        variant="none"
        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 ease-in-out"
        onClick={handleDislikes}
      >
        {loadingReaction ? (
          <Loader2 className="w-5 h-5 text-primary-text animate-spin" />
        ) : likeState === "dislike" ? (
          <ThumbsDownIcon className="w-5 h-5 text-red-500" />
        ) : (
          <ThumbsDownIcon className="w-5 h-5 text-primary-text" />
        )}
        <span className="ml-2 text-primary-text text-[16px]">
          {dislikes}
        </span>
      </Button>
    </div>
  );
}
