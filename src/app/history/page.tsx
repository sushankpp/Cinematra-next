"use client";
import { Heading } from "@/components/ui/Heading";
import Container from "@/components/ui/Container";
import { getWatchHistory } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";
import { HistoryCard } from "@/components/ui/historyCard";
import { WatchHistoryitem } from "@/types/components/ui/videoCard.types";
import { AlertCircle, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function History() {
  const [watchHistory, setWatchHistory] = useState<WatchHistoryitem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(() => {
    setLoading(true);
    setError(null);
    getWatchHistory()
      .then((data) => setWatchHistory(data || []))
      .catch((err) => {
        console.error("Failed to fetch watch history:", err);
        setError(
          "Unable to load watch history. Please make sure you are logged in and try again.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

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

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-white font-medium text-lg mb-1">
              Unable to load watch history
            </p>
            <p className="text-primary-text/50 text-sm max-w-sm mb-4">{error}</p>
            <Button
              variant="secondary"
              text="Try Again"
              onClick={fetchHistory}
              icon={<RotateCcw className="w-4 h-4" />}
            />
          </div>
        )}

        {!loading && !error && watchHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-primary-text/40 text-[16px]">
              No watch history yet. Start watching something!
            </p>
          </div>
        )}

        {!loading && !error && watchHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchHistory.map((item) => (
              <HistoryCard key={item.id} video={item} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

