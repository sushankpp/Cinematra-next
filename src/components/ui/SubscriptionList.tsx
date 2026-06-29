"use client";

import { useState } from "react";
import { subscribe, unsubscribe } from "@/lib/api";
import { toast } from "sonner";
import { Search, Loader2 } from "lucide-react";

interface Channel {
  channel_id: string;
  first_name: string;
  last_name: string;
  picture: string;
  subscriber_count: number;
  video_count: number;
  is_subscribed: boolean;
}

interface SubscriptionListProps {
  initialChannels: Channel[];
}

export default function SubscriptionList({
  initialChannels,
}: SubscriptionListProps) {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const handleToggleSubscribe = async (
    channelId: string,
    isSubscribed: boolean,
  ) => {
    setLoadingMap((prev) => ({ ...prev, [channelId]: true }));
    try {
      if (isSubscribed) {
        await unsubscribe(channelId);
        toast.success("Unsubscribed successfully");
        setChannels((prev) =>
          prev.map((c) =>
            c.channel_id === channelId
              ? {
                  ...c,
                  is_subscribed: false,
                  subscriber_count: Math.max(0, c.subscriber_count - 1),
                }
              : c,
          ),
        );
      } else {
        await subscribe(channelId);
        toast.success("Subscribed successfully");
        setChannels((prev) =>
          prev.map((c) =>
            c.channel_id === channelId
              ? {
                  ...c,
                  is_subscribed: true,
                  subscriber_count: c.subscriber_count + 1,
                }
              : c,
          ),
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update subscription");
    } finally {
      setLoadingMap((prev) => ({ ...prev, [channelId]: false }));
    }
  };

  const filteredChannels = channels.filter((channel) => {
    const fullName = `${channel.first_name} ${channel.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-semibold text-primary-text mb-2">
            My Subscriptions
          </h1>
          <p className="text-sm text-tertiary-Shade font-body">
            Manage your subscribed channels and creators.
          </p>
        </div>

        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-tertiary-Shade">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-default border border-white/5 focus:border-primary-active/50 rounded-xl text-primary-text placeholder-tertiary-Shade focus:outline-none focus:bg-white/5 transition-all duration-200"
          />
        </div>
      </div>

      {filteredChannels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-neutral-default/20 rounded-3xl border border-white/5 p-8">
          <p className="text-lg text-primary-text/60 font-body mb-2">
            {searchQuery
              ? "No channels match your search query."
              : "You have not subscribed to any channels yet."}
          </p>
          <p className="text-sm text-tertiary-Shade max-w-sm">
            {searchQuery
              ? "Try checking the spelling or search for another name."
              : "Explore creators across the site and click subscribe to follow them!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredChannels.map((channel) => {
            const name = `${channel.first_name} ${channel.last_name}`;
            const initials =
              `${channel.first_name?.[0] || ""}${channel.last_name?.[0] || ""}`.toUpperCase() ||
              "?";
            const isPending = loadingMap[channel.channel_id];

            return (
              <div
                key={channel.channel_id}
                className="group/card flex flex-col items-center bg-neutral-default/40 backdrop-blur-md border border-white/5 hover:border-white/10 cursor-pointer p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                <div className="relative w-24 h-24 rounded-full mb-4 overflow-hidden border-2 border-white/10 shadow-lg group-hover/card:border-primary-active/30 transition-colors duration-300 flex items-center justify-center shrink-0">
                  {channel.picture ? (
                    <img
                      src={channel.picture}
                      alt={`${name} profile`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-red-500 to-secondary-default text-white flex items-center justify-center text-2xl font-bold select-none">
                      {initials}
                    </div>
                  )}
                </div>

                <h3
                  className="text-lg font-semibold text-primary-text line-clamp-1 mb-1"
                  title={name}
                >
                  {name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-tertiary-Shade mb-6 font-body">
                  <span>{channel.subscriber_count} subscribers</span>
                  <span className="w-1 h-1 rounded-full bg-tertiary-Shade" />
                  <span>{channel.video_count} videos</span>
                </div>

                <button
                  disabled={isPending}
                  onClick={() =>
                    handleToggleSubscribe(
                      channel.channel_id,
                      channel.is_subscribed,
                    )
                  }
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border select-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    channel.is_subscribed
                      ? "bg-white/5 border-white/10 text-white/80 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500"
                      : "bg-primary-active border-primary-active text-white hover:bg-red-600 shadow-md shadow-red-500/10 hover:shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : channel.is_subscribed ? (
                    "Subscribed"
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
