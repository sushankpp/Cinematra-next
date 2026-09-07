"use client";
import { Heading } from "@/components/ui/Heading";
import Container from "@/components/ui/Container";
import { getWatchHistory } from "@/lib/api";
import { useEffect, useState } from "react";
import { HistoryCard } from "@/components/ui/historyCard";
import { WatchHistoryitem } from "@/types/components/ui/videoCard.types";

export default function History() {
  const [watchHistory, setWatchHistory] = useState<WatchHistoryitem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWatchHistory()
      .then((data) => setWatchHistory(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-6">
      <Container>
        <Heading
          text="Watch History"
          className="text-red-text text-[32px] font-headline mb-1"
        />
        <p className="text-primary-text/60 text-[15px] mb-8">
          Your recently watched videos will appear here.
        </p>

        {loading && (
          <div className="flex flex-row gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl animate-pulse">
                <div className="w-[220px] h-[124px] shrink-0 rounded-[12px] bg-charcoal-100" />
                <div className="flex flex-col gap-3 py-2 flex-1">
                  <div className="h-4 bg-charcoal-100 rounded w-2/3" />
                  <div className="h-3 bg-charcoal-100 rounded w-1/4" />
                  <div className="h-3 bg-charcoal-100 rounded w-1/3 mt-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && watchHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-primary-text/40 text-[16px]">
              No watch history yet. Start watching something!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchHistory.map((item) => (
            <HistoryCard key={item.id} video={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
