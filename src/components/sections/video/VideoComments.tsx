import { useVideoComment } from "@/hooks/useVideoComment";
import { Heading } from "../../ui/Heading";
import { CommentInput } from "./CommentInput";
import { CommentItem } from "./CommentItem";

export function VideoComments({ videoId }: { videoId: string }) {
  const {
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
  } = useVideoComment(videoId);

  const userAvatar = user?.picture;

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
          userName= {user ? `${user.first_name} ${user.last_name}` : " "}
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
              onMenuToggle={() =>
                setOpenMenuId(openMenuId === c.id ? null : c.id)
              }
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
