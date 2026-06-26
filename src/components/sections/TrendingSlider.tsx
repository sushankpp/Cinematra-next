"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Container from "../ui/Container";
import { useCallback, useEffect, useState } from "react";
import TrendingPagination from "./TrendingPagination";
import { TrendingHeroSlide } from "./TrendingHeroSlide";
import { Video } from "@/types/components/ui/videoCard.types";

export function TrendingSlider({ videos }: { videos: Video[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: true })],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    setSlideCount(emblaApi.scrollSnapList().length);

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className="relative w-full h-[100vh] -mt-[73px] overflow-hidden">
      {/* Main full-screen carousel */}
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 h-full relative"
            >
              <TrendingHeroSlide
                title={video.title}
                storage_url={`/video/${video.id}`}
                thumbnail_url={video.thumbnail_url}
                creatorName={
                  video.users.first_name + " " + video.users.last_name
                }
                creatorProfile={video.users.picture}
                views={video.views}
                isActive={index === activeIndex}
                onInfoClick={() => {setIsInfoClicked(prev => !prev), console.log("Info button clicked")}}
                isInfoClicked={isInfoClicked}
                description={video.description ? video.description : "No description available."}
                genres={video.video_genres}
                tags={video.video_tags}
                language={video.language}
                contentRating={video.content_rating}
                releaseYear={video.release_year}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-Body via-secondary-Body/80 to-transparent pointer-events-none" />

        <Container className="relative z-10 pb-6">
          <div className="flex justify-center mb-5">
            <TrendingPagination
              count={slideCount}
              activeIndex={activeIndex}
              onDotClick={scrollTo}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
