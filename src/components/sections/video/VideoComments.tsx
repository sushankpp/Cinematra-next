// VideoComments.tsx — now just orchestration
"use client";
import { useState, useEffect } from "react";
import { Heading } from "../../ui/Heading";
import { CommentInput } from "./CommentInput";
import { CommentItem } from "./CommentItem";
import { useAuth } from "@/hooks/useAuth";
import { postComment, getComments, deleteComment } from "@/lib/api";
import { Comment } from "@/types/components/sections/video/comment.types";

export function VideoComments({ videoId }: { videoId: string }) {
  const [commentText, setCommentText] = useState("");
  const [commentFocused, setCommentFocused] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    getComments(videoId)
      .then(setComments)
      .catch(() => console.error("Failed to fetch comments"));
  }, [videoId]);

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      users: {
        first_name: user?.first_name || "Unknown",
        last_name: user?.last_name || "",
        picture: user?.picture || "/default-profile.jpg",
      },
      content: commentText.trim(),
      created_at: "Just now",
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
    try {
      await postComment(videoId, newComment.content);
    } catch {
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
      setCommentText(newComment.content);
      window.alert("Failed to post comment. Please try again.");
    }
  };

  const handleDelete = async (commentId: number) => {
    const previous = [...comments];
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    try {
      await deleteComment(commentId);
    } catch {
      setComments(previous);
      window.alert("Failed to delete comment. Please try again.");
    }
  };

  const userAvatar = user?.picture ?? "/default-profile.jpg";

  return (
    <div className="mt-6">
      <Heading
        level={3}
        text={`${comments.length} Comments`}
        className="text-[24px] text-primary-text font-headline font-bold leading-tight tracking-wide"
      />
      <div className="mt-3">
        <CommentInput
          value={commentText}
          userAvatar={userAvatar}
          isAuthenticated={isAuthenticated}
          commentFocused={commentFocused}
          onChange={setCommentText}
          onFocus={() => setCommentFocused(true)}
          onSubmit={handleSubmit}
          onCancel={() => setCommentText("")}
        />
        <div className="flex flex-col gap-4 mt-6">
          {comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              isMenuOpen={openMenuId === c.id}
              onMenuToggle={() => setOpenMenuId(openMenuId === c.id ? null : c.id)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}