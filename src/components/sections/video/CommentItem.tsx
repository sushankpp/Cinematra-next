// CommentItem.tsx
"use client";
import Image from "@/components/ui/Image";
import Button from "@/components/ui/Button";
import OptionsDropdown from "@/components/ui/OptionsDropdown";
import { MoreHorizontal } from "lucide-react";
import { Comment } from "@/types/components/sections/video/comment.types";
import { formatCommentTime } from "@/lib/formatCommentTime";

interface CommentItemProps {
  comment: Comment;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onDelete: (id: number) => void;
}

export function CommentItem({ comment, isMenuOpen, onMenuToggle, onDelete }: CommentItemProps) {
  return (
    <div className="relative border-b border-[#2a2a2a] pb-4">
      <div className="flex items-start gap-3">
        <figure className="w-[40px] h-[40px] shrink-0">
          <Image
            src={comment.users.picture}
            alt={`${comment.users.first_name} ${comment.users.last_name}`}
            width={40} height={40} className="rounded-full"
          />
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
          <p className="text-[16px] text-primary-text line-clamp-4">{comment.content}</p>
        </div>
      </div>
      <div className="absolute right-0 top-0">
        <Button icon={<MoreHorizontal color="white" />} variant="none"
          className="p-2 rounded-full hover:bg-[#2a2a2a]" onClick={onMenuToggle} />
        <OptionsDropdown
          isOpen={isMenuOpen}
          items={[{ label: "Delete Comment", onClick: () => onDelete(comment.id) }]}
        />
      </div>
    </div>
  );
}