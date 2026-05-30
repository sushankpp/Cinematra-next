import { Heading } from "../../ui/Heading";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { postComment } from "@/lib/api";

interface Comment {
  id: number;
  commenter: {
    name: string;
    profilePicture: string;
  };
  comment: string;
  timestamp: string;
}

const Comments: Comment[] = [
  {
    id: 1,
    commenter: {
      name: "John Doe",
      profilePicture: "/default-profile.jpg",
    },
    comment: "This is a sample comment. Great video!",
    timestamp: "2 hours ago",
  },
];

export function VideoComments({ videoId }: { videoId: string }) {
  const [commentFocused, setCommentFocused] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(Comments);
  const { user, isAuthenticated } = useAuth();

  const handleComment = async () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      commenter: {
        name: user?.first_name + " " + user?.last_name || "Unknown User",
        profilePicture: user?.picture || "/default-profile.jpg",
      },
      comment: commentText,
      timestamp: "Just now",
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
    try {
      await postComment(videoId, commentText);
    } catch (error) {
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
      setCommentText(commentText);
      window.alert("Failed to post comment. Please try again.");
    }
  };

  const userAvatar =
    isAuthenticated && user?.picture ? user.picture : "/default-profile.jpg";
  return (
    <div className="">
      <Heading
        level={3}
        text={`${comments.length} Comments`}
        className="text-[24px] text-primary-text font-headline font-bold leading-tight tracking-wide mt-6"
      />
      <div className="mt-3">
        <div className="flex items-start gap-3">
          <figure className="w-[40px] h-[40px]">
            <Image
              src={userAvatar}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
              referrerPolicy="no-referrer"
            />
          </figure>

          <div className="relative w-full">
            <div className="relative group/input w-full">
              <Input
                placeholder="Add your comment here"
                className="w-full p-3 border-0 border-b border-[#2a2a2a] text-primary-text 
              placeholder:text-[#666] focus:outline-none focus:ring-0 bg-transparent"
                onFocus={() => setCommentFocused(true)}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (!isAuthenticated) {
                    (window.alert("Please login to add a comment"),
                      e.currentTarget.blur());
                    return;
                  }

                  if (e.key === "Enter") handleComment();
                }}
              />
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 
              bg-primary-text transition-all duration-300 ease-in-out
              group-focus-within/input:w-full"
              />
            </div>
            {commentFocused && (
              <div className="mt-2 flex justify-end">
                <Button
                  text="Cancel"
                  variant="secondary"
                  className="rounded-full hover:bg-[#2a2a2a]"
                  onClick={() => setCommentText("")}
                />
                <Button
                  text="Comment"
                  variant="primary"
                  onClick={handleComment}
                  className="ml-2 rounded-full hover:bg-primary-text hover:text-primary-active transition-all duration-300 ease-in-out"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          {/* comments list */}
          {comments.map((c) => (
            <div className="flex items-start gap-3 border-b border-[#2a2a2a] pb-4" key={c.id}>
              <figure className="w-[40px] h-[40px]">
                <Image
                  src={c.commenter.profilePicture}
                  alt={c.commenter.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </figure>
              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <p className="text-[16px] text-primary-text font-semibold">
                    {c.commenter.name}
                  </p>
                  <time className="text-[14px] text-[#666] ml-2">
                    {c.timestamp}
                  </time>
                </div>
                <p className="text-[16px] text-primary-text line-clamp-4">
                  {c.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
