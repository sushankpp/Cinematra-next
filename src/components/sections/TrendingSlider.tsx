"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Container from "../ui/Container";
import { Heading } from "../ui/Heading";
import Link from "../ui/Link";
import { TrendingCard } from "./TrendingCard";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import TrendingControls from "./TrendingControls";
import TrendingPagination from "./TrendingPagination";

export function TrendingSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    setSlideCount(emblaApi.scrollSnapList().length);

    emblaApi.on("select", () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div>
      <Container>
        <div className="flex justify-between items-center mb-6">
          <Heading
            text="Trending Now"
            className="font-tenor text-gold-100 text-[32px]"
          />
          <Link
            href="trending"
            className="text-charcoal-100 flex gap-1 items-center hover:underline transition-all duration-300 ease-in-out group hover:text-gold-500"
          >
            Browse all trending items
            <ArrowRightCircle
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              <div className="lg:flex-[0_0_calc(50%-8px)] flex-[0_0_100%]">
                <TrendingCard />
              </div>
              <div className="flex-[0_0_calc(50%-8px)]">
                <TrendingCard />
              </div>
              <div className="flex-[0_0_calc(50%-8px)]">
                <TrendingCard />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <TrendingPagination
              count={slideCount}
              activeIndex={activeIndex}
              onDotClick={(index) => emblaApi?.scrollTo(index)}
            />
            <TrendingControls onPrev={scrollPrev} onNext={scrollNext} />
          </div>
        </div>
      </Container>
    </div>
  );
}
