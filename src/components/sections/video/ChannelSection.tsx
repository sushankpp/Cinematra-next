"use client";

import Image from "@/components/ui/Image";
import Button from "@/components/ui/Button";
import { formatNumber } from "@/lib/formatNumber";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VideoCardProps } from "@/types/components/sections/video/videoInfo.types";

interface ChannelSectionProps {
  video: VideoCardProps["video"];
  subCount: number;
  isSubscribed: boolean;
  loadingCount: boolean;
  loadingSub: boolean;
  handleSubscribe: () => void;
  handleUnsubscribe: () => void;
}

export function ChannelSection({
  video,
  subCount,
  isSubscribed,
  loadingCount,
  loadingSub,
  handleSubscribe,
  handleUnsubscribe,
}: ChannelSectionProps) {
  return (
    <>
      <div className="flex items-center">
        <Image
          src={video.users.picture || "/default-profile.jpg"}
          alt={`${video.users.first_name} ${video.users.last_name}`}
          width={50}
          height={50}
          className="rounded-full mt-2"
        />
        <div className="ml-2">
          <p className="text-[18px] text-primary-text">{`${video.users.first_name} ${video.users.last_name}`}</p>
          <p className="text-[14px] text-red-text">
            {loadingCount ? "..." : formatNumber(subCount)}
          </p>
        </div>
      </div>
      <div className="ml-auto flex-1">
        {isSubscribed ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="primary"
                className={
                  "px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-[16px]" +
                  " bg-tertiary-Shade"
                }
                text="Subscribed"
                disabled={loadingSub}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Unsubscribe from this channel?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You&apos;ll stop receiving updates from{" "}
                  {video.users.first_name} {video.users.last_name} until you
                  subscribe again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  variant="tertiary"
                  className="text-tertiary-default"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="primary"
                  onClick={handleUnsubscribe}
                  disabled={loadingSub}
                >
                  Unsubscribe
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            variant="primary"
            className={
              "px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-[16px]" +
              " bg-red-500 text-primary-text hover:bg-primary-text hover:text-primary-active "
            }
            text="Subscribe"
            onClick={handleSubscribe}
            disabled={loadingSub}
          />
        )}
      </div>
    </>
  );
}
