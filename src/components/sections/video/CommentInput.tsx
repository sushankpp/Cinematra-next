"use client";
import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Initials } from "@/services/initials";

interface CommentInputProps {
  value: string;
  userName: string;
  userAvatar?: string;
  isAuthenticated: boolean;
  commentFocused: boolean;
  onChange: (text: string) => void;
  onFocus: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function CommentInput({
  value,
  userName,
  userAvatar,
  isAuthenticated,
  commentFocused,
  onChange,
  onFocus,
  onSubmit,
  onCancel,
}: CommentInputProps) {
  return (
    <div className="flex items-start gap-3">
      <figure className="w-[40px] h-[40px] shrink-0">
        {userAvatar ? (
          <Image
            src={userAvatar ?? ""}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-10 w-10 shrink-0 rounded-full bg-neutral-default/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-tr from-red-text to-tertiary-Shade">
            {Initials(userName.split(" ")[0], userName.split(" ")[1])}
          </div>
        )}
      </figure>
      <div className="w-full">
        <div className="relative group/input">
          <Input
            placeholder="Add your comment here"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onKeyDown={(e) => {
              if (!isAuthenticated) {
                window.alert("Please login to add a comment");
                e.currentTarget.blur();
                return;
              }
              if (e.key === "Enter") onSubmit();
            }}
            className="w-full p-3 border-0 border-b border-[#2a2a2a] text-primary-text
                       placeholder:text-[#666] focus:outline-none focus:ring-0 bg-transparent"
          />
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0
                           bg-primary-text transition-all duration-300
                           group-focus-within/input:w-full"
          />
        </div>
        {commentFocused && (
          <div className="mt-2 flex justify-end gap-2">
            <Button
              text="Cancel"
              variant="secondary"
              className="rounded-full hover:bg-[#2a2a2a]"
              onClick={onCancel}
            />
            <Button
              text="Comment"
              variant="primary"
              onClick={onSubmit}
              className="rounded-full hover:bg-primary-text hover:text-primary-active transition-all duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
