// CommentItem.tsx
"use client";
import Image from "@/components/ui/Image";
import Button from "@/components/ui/Button";
import OptionsDropdown from "@/components/ui/OptionsDropdown";
import { MoreHorizontal } from "lucide-react";
import { Comment } from "@/types/components/sections/video/comment.types";
import { formatCommentTime } from "@/lib/formatCommentTime";
import { Initials } from "@/services/initials";
import { CommentModerationLabels } from "@/services/commentModeration";
import { CommentModerationConfidence } from "@/services/commentConfidence";

interface CommentItemProps {
  comment: Comment;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onDelete: (id: number) => void;
}

export function CommentItem({
  comment,
  isMenuOpen,
  onMenuToggle,
  onDelete,
}: CommentItemProps) {
  return (
    <div className="relative border-b border-[#2a2a2a] pb-4">
      <div className="flex items-start gap-3">
        <figure className="w-[40px] h-[40px] shrink-0">
          {comment.users.picture ? (
            <Image
              src={comment.users.picture}
              alt={`${comment.users.first_name} ${comment.users.last_name}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-[40px] h-[40px] shrink-0 rounded-full bg-neutral-default/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-tr from-primary-active to-secondary-default">
              {Initials(comment.users.first_name, comment.users.last_name)}
            </div>
          )}
        </figure>
        <div className="ml-2">
          <div className="flex items-center gap-2">
            <p className="text-[16px] text-primary-text font-semibold">
              {comment.users.first_name} {comment.users.last_name}
            </p>
            <time className="text-[14px] text-[#666]">
              {formatCommentTime(comment.created_at)}
            </time>
          </div>
          <p className="text-[16px] text-primary-text line-clamp-4">
            {comment.content}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[16px] text-red-text">Verdict about comment </p>
        <div className="flex gap-1 mt-2">
          <span className={`text-[14px] px-2 py-1 rounded-md ${CommentModerationLabels(comment.moderation_label)}`}>
            {comment.moderation_label}
          </span>
          <span className={`text-[14px] px-2 py-1 rounded-md ${CommentModerationConfidence(comment.moderation_confidence)}`}>
            Confidence :{" "}
            {Math.floor(Number(comment.moderation_confidence) * 100)}%
          </span>
        </div>
      </div>
      <div className="absolute right-0 top-0">
        <Button
          icon={<MoreHorizontal color="white" />}
          variant="none"
          className="p-2 rounded-full hover:bg-[#2a2a2a]"
          onClick={onMenuToggle}
        />
        <OptionsDropdown
          isOpen={isMenuOpen}
          items={[
            { label: "Delete Comment", onClick: () => onDelete(comment.id) },
          ]}
        />
      </div>
    </div>
  );
}
