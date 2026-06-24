import { PlayCircleIcon, Info } from "lucide-react";
import { Heading } from "../ui/Heading";
import Link from "../ui/Link";
import Image from "../ui/Image";
import { TrendingHeroSlideProps } from "@/types/components/sections/TrendingHeroSlide.types";

export function TrendingHeroSlide({
  title,
  thumbnail_url,
  storage_url,
  creatorName,
  creatorProfile,
  views,
  isActive,
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
            className={`flex items-center gap-2 mb-4 transition-all duration-700 delay-100 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Heading
              text={title}
              level={1}
              className="font-headline line-clamp-3 text-primary-text text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3"
            />
          </div>

          <div
            className={`transition-all duration-700 delay-200 flex gap-2 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {creatorProfile && (
              <Image
                src={creatorProfile}
                alt={creatorName}
                className="w-8 h-8 rounded-full border border-white/20"
              />
            )}
            <span className="text-red-text text-sm font-body">
              by{" "}
              <Link
                href={storage_url}
                className="text-primary-text hover:text-red-text transition-colors underline-offset-2 hover:underline"
              >
                {creatorName}
              </Link>
            </span>
            <div
              className={`flex items-center gap-4 text-sm text-tertiary-Shade font-body mb-8 transition-all duration-700 delay-[350ms] ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-primary-text/60">{views} views</span>
            </div>
          </div>

          <div
            className={`flex gap-3 transition-all duration-700 delay-[400ms] ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link
              href={storage_url}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-active hover:bg-red-500/90 text-white font-body font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-active/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlayCircleIcon size={18} />
              Watch Now
            </Link>
            <div className="inline-flex items-center gap-2 px-6 py-3 z-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-primary-text font-body font-semibold text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]">
              <Info size={18} />
              More Info
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
