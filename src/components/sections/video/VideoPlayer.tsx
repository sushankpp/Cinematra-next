import { Heading } from "@/components/ui/Heading";

export function VideoPlayer() {
  return (
    <section>
      <Heading
        text="Video title goes here"
        className="text-[32px] font-bebas tracking-[1px]"
      />
      <div>
        <video className="w-full " poster="/register-image.jpg" controls>
          <source src="/sample-video.mp4" type="video/mp4"  />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
