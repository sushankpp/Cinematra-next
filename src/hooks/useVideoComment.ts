"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { postComment, getComments, deleteComment } from "@/lib/api";
import { Comment } from "@/types/components/sections/video/comment.types";
import { toast } from "sonner";

export const useVideoComment = (videoId: string) => {
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

    if (!isAuthenticated) {
      toast.error("You must be logged in to comment.");
      return;
    }

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
      toast.success("Comment posted successfully!");
    } catch {
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
      setCommentText(newComment.content);
      toast.error("Failed to post comment. Please try again.");
    }
  };

  const handleDelete = async (commentId: number) => {
    const previous = [...comments];
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    try {
      await deleteComment(commentId);
      toast.success("Comment deleted successfully");
    } catch {
      setComments(previous);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  return {
    commentText,
    setCommentText,
    commentFocused,
    setCommentFocused,
    comments,
    openMenuId,
    setOpenMenuId,
    handleSubmit,
    handleDelete,
    user,
    isAuthenticated,
  };
};
