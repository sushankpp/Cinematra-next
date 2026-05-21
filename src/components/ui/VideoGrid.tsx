"use client";

import Container from "./Container";
import VideoCard from "./VideoCard";

const videosData = [
  {
    creatorProfile: "/default-profile.jpg",
    creatorName: "John Doe",
    videoTitle: "Exploring the Cinematic World: A Journey Through Film",
    views: "20k views",
    postedTime: "3 days ago",
    videoThumbnail: "/register-image.jpg",
    videoId: "1",
  },
];

export function VideoGrid() {
  return (
    <section className="mb-4 pt-8 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videosData.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </Container>
    </section>
  );
}
