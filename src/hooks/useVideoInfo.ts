import { useState, useEffect, useRef } from "react";
import {
  getSubscriptionCount,
  subscribe,
  getSubscriptions,
  unsubscribe,
} from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { postVideoReaction } from "@/lib/api";
import { VideoCardProps } from "@/types/components/sections/video/videoInfo.types";

export function useVideoInfo(video: VideoCardProps["video"]) {
  const { user } = useAuth();
  const [subCount, setSubCount] = useState(0);
  const [loadingSub, setLoadingSub] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loadingCount, setLoadingCount] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [likeState, setLikeState] = useState<"like" | "dislike" | null>(
    video.user_reaction || null,
  );
  const [likes, setLikes] = useState<number>(video.likes_count);
  const [dislikes, setDislikes] = useState<number>(video.dislikes_count);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [loadingReaction, setLoadingReaction] = useState(false);
  const channelId = video.user_id;

useEffect(() => {
  let cancelled = false;

  const fetchSubscriptionData = async () => {
    try {
      setLoadingCount(true);

      const [count, subscribed] = await Promise.all([
        getSubscriptionCount(channelId).catch((err) => {
          console.error("Error fetching subscription count:", err);
          return 0;
        }),
        user
          ? getSubscriptions(channelId).catch(() => [])
          : Promise.resolve([]),
      ]);

      if (!cancelled) {
        setSubCount(count);
        setIsSubscribed(Array.isArray(subscribed) && subscribed.length > 0);
      }
    } catch (error) {
      if (!cancelled) console.error("Error fetching subscription data:", error);
    } finally {
      if (!cancelled) setLoadingCount(false);
    }
  };

  fetchSubscriptionData();
  return () => {
    cancelled = true;
  };
}, [channelId, user]);


  const handleSubscribe = async () => {
    const previousCount = subCount;

    if (!user) {
      toast.error("You must be logged in to subscribe.");
      return;
    }

    setLoadingSub(true);
    setSubCount((prev) => prev + 1);
    setIsSubscribed(true);

    try {
      if (!isSubscribed) {
        const res = await subscribe(channelId);
        if (!res) throw new Error("Subscription failed");

        toast.success("Subscribed successfully!");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubCount(previousCount);
      setIsSubscribed(false);
    } finally {
      setLoadingSub(false);
    }
  };

  const handleUnsubscribe = async () => {
    const previousCount = subCount;

    setLoadingSub(true);
    setSubCount((prev) => prev - 1);
    setIsSubscribed(false);

    try {
      if (isSubscribed) {
        const res = await unsubscribe(channelId);
        if (!res) throw new Error("Unsubscription failed");
        toast.success("Unsubscribed successfully!");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      setSubCount(previousCount);
      setIsSubscribed(true);
    } finally {
      setLoadingSub(false);
    }
  };

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.height = "auto";
      clone.style.width = `${el.clientWidth}px`;
      clone.classList.add("line-clamp-3");
      document.body.appendChild(clone);

      const clamped = clone.scrollHeight > clone.clientHeight;
      document.body.removeChild(clone);

      setIsClamped(clamped);
    }, 0);

    return () => clearTimeout(timer);
  }, [video.description]);

  const handleDescriptionToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleLikes = async () => {
    if (!user) {
      toast.error("You must be logged in to like.");
      return;
    }

    const wasLiked = likeState === "like";
    const wasDisliked = likeState === "dislike";
    const newReaction = wasLiked ? null : "like";

    if (loadingReaction) return;

    setLoadingReaction(true);

    setLikeState(newReaction);
    setLikes((prev) => (wasLiked ? prev - 1 : prev + 1));
    if (wasDisliked) {
      setDislikes((prev) => prev - 1);
    }

    try {
      await postVideoReaction(video.id, newReaction || "like");
    } catch (error) {
      console.error("Error updating reaction:", error);
      setLikeState(likeState);
      setLikes((prev) => (wasLiked ? prev + 1 : prev - 1));
      if (wasDisliked) {
        setDislikes((prev) => prev - 1);
      }
    } finally {
      setLoadingReaction(false);
    }
  };

  const handleDislikes = async () => {
    if (!user) {
      toast.error("You must be logged in to dislike.");
      return;
    }

    const wasDisliked = likeState === "dislike";
    const wasLiked = likeState === "like";
    const newReaction = wasDisliked ? null : "dislike";

    if (loadingReaction) return;
    setLoadingReaction(true);

    setLikeState(newReaction);
    setDislikes((prev) => (wasDisliked ? prev - 1 : prev + 1));
    if (wasLiked) {
      setLikes((prev) => prev - 1);
    }

    try {
      await postVideoReaction(video.id, newReaction || "dislike");
    } catch (error) {
      console.error("Error sending dislike reaction:", error);
      setLikeState(likeState);
      setDislikes((prev) => (wasDisliked ? prev + 1 : prev - 1));
      if (wasLiked) {
        setLikes((prev) => prev + 1);
      }
    } finally {
      setLoadingReaction(false);
    }
  };

  return {
    subCount,
    isSubscribed,
    loadingCount,
    loadingSub,
    handleSubscribe,
    handleUnsubscribe,
    expanded,
    isClamped,
    handleDescriptionToggle,
    likeState,
    likes,
    dislikes,
    handleLikes,
    handleDislikes,
    loadingReaction,
    descRef,
  };
}
