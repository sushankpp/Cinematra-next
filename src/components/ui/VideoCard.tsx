import { Heading } from "./Heading";
import Image from "./Image";
import Link from "./Link";
import { VideoCardProps } from "@/types/components/ui/videoCard.types";

export default function VideoCard({creatorName, videoTitle, creatorProfile, views, postedTime, videoThumbnail, videoId}: VideoCardProps) {
  return (
    <div className="relative group/videoCard cursor-pointer hover:shadow-lg hover:bg-charcoal-100 transition-all duration-300 rounded-[25px] p-3">
      <div className="absolute inset-0 rounded-[25px] bg-charcoal-100 scale-90 opacity-0 group-hover/videoCard:scale-100 group-hover/videoCard:opacity-100 transition-all duration-300 -z-10" />
      <figure className="w-full h-[250px]  overflow-hidden rounded-[15px]">
        <Image
          src={videoThumbnail}
          alt="video thumbnail"
          className="w-full h-auto rounded-[15px] group-hover/videoCard:-translate-y-[1px] transition-all duration-300"
        />
      </figure>
      <div className="mt-1 flex gap-4">
        <Image
          src={creatorProfile}
          alt="creator image"
          className="w-[40px] h-[40px] rounded-full "
        />
        <div>
          <Heading
            text={videoTitle}
            className="font-sourceSerif text-charcoal-800 font-bold z-20 text-[18px] line-clamp-2"
            title="video title"
          />
          <p className="font-sourceSerif text-charcoal-800 text-[14px]">
            {creatorName}
          </p>
          <div className="flex text-charcoal-500 text-[14px]">
            <span>{views}</span>
            <span className="before:content-['ΓÇó'] before:mx-2">{postedTime}</span>
          </div>
        </div>
      </div>
      <Link
        href={`/video/${videoId}`}
        className="absolute inset-0 z-10"
        title={videoTitle}
      />
    </div>
  );
}
