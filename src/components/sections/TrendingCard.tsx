import {
  MessageSquareMore,
  PlayCircleIcon,
  Share,
  ThumbsUp,
} from "lucide-react";
import { Heading } from "../ui/Heading";
import Link from "../ui/Link";
import Image from "../ui/Image";

export function TrendingCard() {
  return (
    <div className="h-[500px]">
      <div className="relative h-full w-full group/card cursor-pointer overflow-hidden rounded-lg">
        <video
          poster="./login-image.jpg"
          className="absolute h-full w-full object-cover rounded-lg"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 rounded-lg bg-black/30 group-hover/card:bg-black/60 transition-all duration-300"></div>
        <div>
          <div className="absolute w-full top-4 flex justify-between px-4">
            <div className="">
              <Heading
                text="Movie Title goes here"
                level={2}
                className="left-4 text-brand-100 font-bebas text-[32px]"
              />
              <span className="flex">
                by
                <Link
                  href="/director/john-doe"
                  className="text-charcoal-100 hover:text-gold-500 transition-colors flex gap-1 items-center ml-2 hover:underline"
                >
                  <Image
                    src="/default-profile.jpg"
                    alt="Director"
                    className="w-[20px] h-[20px] rounded-full"
                  />
                  John Doe
                </Link>
              </span>
            </div>
            <div className="opacity-0 group-hover/card:opacity-100 transition-all duration-300 group-hover/card:translate-y-1">
              <Share size={24} className="right-4 text-white cursor-pointer" />
            </div>
          </div>
          <PlayCircleIcon
            size={100}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-charcoal-100 cursor-pointer group-hover/card:text-charcoal-50 transition-all duration-300"
          />
          <div className="absolute w-full px-4 bottom-4 flex justify-between opacity-0 group-hover/card:opacity-100 transition-all duration-300 group-hover/card:translate-y-1">
            <div>
              <p className="text-charcoal-100 text-[18px] font-bebas">3:04</p>
            </div>
            <div className="flex gap-4">
              <div className="flex  gap-2 justify-center">
                <ThumbsUp size={20} className="text-white cursor-pointer" />
                <p className="text-charcoal-50 font-bebas tracking-[1px]">
                  3,200
                </p>
              </div>
              <div className="flex  gap-2 justify-center">
                <MessageSquareMore
                  size={20}
                  className="text-white cursor-pointer"
                />
                <p className="text-charcoal-50 font-bebas tracking-[1px]">
                  3,200
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
