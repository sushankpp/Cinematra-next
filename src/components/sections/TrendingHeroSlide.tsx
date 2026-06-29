import { PlayCircleIcon, Info, X } from "lucide-react";
import { Heading } from "../ui/Heading";
import Link from "../ui/Link";
import Image from "../ui/Image";
import { TrendingHeroSlideProps } from "@/types/components/sections/TrendingHeroSlide.types";
import Button from "../ui/Button";
import { TrendingInfo } from "./TrendingInfo";
import { Initials } from "@/services/initials";

export function TrendingHeroSlide({
  title,
  description,
  thumbnail_url,
  storage_url,
  creatorName,
  creatorProfile,
  genres,
  tags,
  language,
  contentRating,
  releaseYear,
  views,
  isActive,
  onInfoClick,
  isInfoClicked,
}: TrendingHeroSlideProps) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <Image
          src={thumbnail_url}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-Body via-transparent to-black/30" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] mix-blend-overlay" />
      </div>

      <div className="absolute inset-0 flex items-end z-10">
        <div className="px-6 md:px-16 lg:px-24 pb-[200px] max-w-3xl">
          <div
            className={`flex flex-col items-center gap-2 mb-4 transition-all duration-700 delay-100 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Heading
              text={title}
              level={1}
              className="font-headline line-clamp-3 text-primary-text text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3"
            />
            <p className="text-primary-text/80 text-lg md:text-xl lg:text-2xl font-body line-clamp-3">
              {description}
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-200 flex items-center gap-3 mb-6 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {creatorProfile ? (
              <Image
                src={creatorProfile}
                alt={creatorName}
                className="w-8 h-8 rounded-full border border-white/20 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-neutral-default/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-tr from-primary-active to-secondary-default">
                {Initials(creatorName.split(" ")[0], creatorName.split(" ")[1])}
              </div>
            )}
            <span className="text-sm font-body text-primary-text/70">
              by{" "}
              <Link
                href={storage_url}
                className="text-primary-text font-medium hover:text-red-text transition-colors underline-offset-2 hover:underline"
              >
                {creatorName}
              </Link>
            </span>
            <span className="w-1 h-1 rounded-full bg-primary-text/30" />
            <span className="text-sm font-body text-primary-text/60">
              {views} views
            </span>
          </div>

          <div className="relative">
            <div
              className={`flex gap-3 transition-all duration-700 delay-[400ms] ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href={storage_url}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-active hover:bg-red-500/90 text-white font-body font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-active/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlayCircleIcon size={18} />
                Watch Now
              </Link>
              <Button
                className={`inline-flex items-center gap-2 px-6 py-3 z-10 rounded-lg bg-white/30 backdrop-blur-md border font-body font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                onClick={onInfoClick}
              >
                <Info size={18} />
                More Info
              </Button>
            </div>
            <TrendingInfo 
              isInfoClicked={isInfoClicked}
              onInfoClick={onInfoClick}
              genres={genres}
              tags={tags}
              views={views}
              language={language}
              contentRating={contentRating}
              releaseYear={releaseYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
