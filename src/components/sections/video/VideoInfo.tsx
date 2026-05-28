"use client";
import Image from "@/components/ui/Image";
import { Heading } from "../../ui/Heading";
import { VideoCardProps } from "@/types/components/sections/video/videoInfo.types";
import Button from "@/components/ui/Button";
import { useState, useEffect, useRef } from "react";

export function VideoInfo({ video }: VideoCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

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
    <div className="">
      <Heading
        level={1}
        text={video.title}
        className="text-[32px] text-primary-text font-headline font-bold leading-tight tracking-wide mt-2"
      />
      <div className="flex mt-4 items-center gap-5">
        <div className="flex items-center">
          <Image
            src={video.users.creator_profile || "/default-profile.jpg"}
            alt={`${video.users.first_name} ${video.users.last_name}`}
            width={50}
            height={50}
            className="rounded-full mt-2"
          />
          <div className="ml-2">
            <p className="text-[18px] text-primary-text">{`${video.users.first_name} ${video.users.last_name}`}</p>
            <p className="text-[14px] text-red-text">
              {video.subscriberCount || "3,200"} Followers
            </p>
          </div>
        </div>
        <div className="ml-auto flex-1">
          <Button
            variant="primary"
            className="px-4 py-2 rounded-full hover:bg-primary-text hover:text-primary-active transition-all duration-300 ease-in-out text-[16px]"
            text="Subscribe"
          />
        </div>
      </div>

      {/* description */}
      <div
        className="bg-[#212121] p-4 rounded-lg mt-6  cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-200 ease-in-out"
        onClick={handleDescriptionToggle}
      >
        <p
          ref={descRef}
          className={`text-[16px] text-primary-text leading-relaxed overflow-hidden transition-all duration-300
    ${expanded ? "" : "line-clamp-3"}`}
        >
          {video.description}
        </p>
        {(isClamped) && (
          <span className="text-[14px] font-semibold text-primary-text mt-2 inline-block">
            {expanded ? "Show less" : "....Show more"}
          </span>
        )}
      </div>
      {/* comments  */}
      <div className="">
        <Heading level={3} text="3,200 Comments" className="text-[24px] text-primary-text font-headline font-bold leading-tight tracking-wide mt-6" />
      </div>
    </div>
  );
}
