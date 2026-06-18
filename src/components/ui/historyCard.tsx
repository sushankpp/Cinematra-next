import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import { formatCommentTime } from "@/lib/formatCommentTime";
import { WatchHistoryitem } from "@/types/components/ui/videoCard.types";

export function HistoryCard({ video }: { video: WatchHistoryitem }) {
  const getProgressPercent = (watched: number, total: number) => {
    if (!total || total <= 0) return 0;
    return Math.min(100, Math.max(0, (watched / total) * 100));
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s watched`;
    return `${m}m ${s}s watched`;
  };

  return (
    <Link
      href={`/video/${video.videos?.id}`}
      key={video.id}
      className="flex gap-4 p-3 rounded-xl hover:bg-charcoal-100/50 transition-all duration-200 group"
    >
      <div className="relative w-[220px] h-[124px] shrink-0 rounded-[12px] overflow-hidden bg-charcoal-100">
        <Image
          src={video.videos?.thumbnail_url}
          alt={video.videos?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] px-1.5 py-0.5 rounded font-body">
          {formatDuration(video.watch_duration_seconds)}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
          <div
            className={`h-full transition-all ${video.completed ? "bg-green-500" : "bg-red-500"}`}
            style={{
              width: video.completed
                ? "100%"
                : `${getProgressPercent(video.watch_duration_seconds, video.video_duration_seconds)}%`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between py-1 min-w-0">
        <div>
          <p className="text-primary-text font-body font-[500] text-[17px] line-clamp-2 group-hover:text-red-text transition-colors duration-200">
            {video.videos?.title}
          </p>
          <div className="flex videos-center gap-2 mt-2">
            <span className="text-[12px] text-primary-text/50 border border-primary-text/20 px-2 py-0.5 rounded-full font-body">
              {video.videos?.language}
            </span>
            <span className="text-[12px] text-primary-text/50 border border-primary-text/20 px-2 py-0.5 rounded-full font-body">
              {video.videos?.content_rating}
            </span>
            {video.completed && (
              <span className="text-[12px] text-green-400 border border-green-400/30 px-2 py-0.5 rounded-full font-body">
                ✓ Completed
              </span>
            )}
          </div>
        </div>

        <p className="text-[13px] text-primary-text/40 font-body">
          {formatCommentTime(video.watched_at)}
        </p>
      </div>
    </Link>
  );
}
