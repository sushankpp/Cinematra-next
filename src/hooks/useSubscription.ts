import { useState, useEffect } from "react";
import {
  getSubscriptionCount,
  subscribe,
  getSubscriptions,
  unsubscribe,
} from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export function useSubscription(channelId: string) {
  const { user } = useAuth();
  const [subCount, setSubCount] = useState(0);
  const [loadingSub, setLoadingSub] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loadingCount, setLoadingCount] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchSubscriptionData = async () => {
      try {
        setLoadingCount(true);

        const count = await getSubscriptionCount(channelId);
        if (!cancelled) setSubCount(count);

        try {
          const subscribed = await getSubscriptions(channelId);
          if (!cancelled)
            setIsSubscribed(Array.isArray(subscribed) && subscribed.length > 0);
        } catch {
          if (!cancelled) setIsSubscribed(false);
        }
      } catch (error) {
        if (!cancelled)
          console.error("Error fetching subscription data:", error);
      } finally {
        if (!cancelled) setLoadingCount(false);
      }
    };

    fetchSubscriptionData();
    return () => {
      cancelled = true;
    };
  }, [channelId]);

  const handleSubscribe = async () => {
    const previousCount = subCount;

    if ( !user ) {
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

  return {
    subCount,
    isSubscribed,
    loadingCount,
    loadingSub,
    handleSubscribe,
    handleUnsubscribe,
  };
}
