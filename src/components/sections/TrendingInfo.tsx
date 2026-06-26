import { Heading } from "@/components/ui/Heading";
import { X } from "lucide-react";

type TrendingInfoProps = {
  isInfoClicked: boolean;
  onInfoClick: () => void;
  genres?: { genres: { id: number; name: string } }[];
  tags?: { tags: { id: number; name: string } }[];
  views: string;
  language?: string;
  contentRating?: string;
  releaseYear?: number;
};

export function TrendingInfo({
  isInfoClicked,
  onInfoClick,
  genres,
  tags,
  views,
  language,
  contentRating,
  releaseYear,
}: TrendingInfoProps) {
  return (
    <div
      className={`absolute bottom-full left-0 mb-3 w-[22rem] origin-bottom-left rounded-xl border border-white/10 bg-black/85 backdrop-blur-xl p-5 shadow-2xl shadow-black/50 transition-all duration-200 z-20 ${
        isInfoClicked
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
        <Heading
          text="About this video"
          level={2}
          className="text-sm font-semibold text-primary-text"
        />
        <button
          onClick={onInfoClick}
          aria-label="Close info"
          className="text-primary-text/50 hover:text-primary-text transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {genres && genres.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wide text-primary-text/40 mb-1.5">
              Genres
            </p>
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <span
                  key={genre.genres.id}
                  className="bg-white/10 border border-white/10 text-primary-text/90 text-xs px-2.5 py-1 rounded-full"
                >
                  {genre.genres.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wide text-primary-text/40 mb-1.5">
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag.tags.id}
                  className="bg-red-text/30 border border-red-text/30 text-primary-text text-xs px-2.5 py-1 rounded-full"
                >
                  {tag.tags.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-xs text-primary-text/60">
          <span>{views} views</span>
          <span className="w-1 h-1 rounded-full bg-primary-text/30" />
          <span>{language}</span>
          <span className="w-1 h-1 rounded-full bg-primary-text/30" />
          <span>{contentRating}</span>
          <span className="w-1 h-1 rounded-full bg-primary-text/30" />
          <span>{releaseYear}</span>
        </div>
      </div>
    </div>
  );
}
