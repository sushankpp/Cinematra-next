export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  creatorProfile?: string;
  videoTitle: string;
  creatorName: string;
  views: string;
  postedTime: string;
  videoThumbnail: string;
  videoId: string;
  className?: string;
  variant? : "default" | "compact";
}

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  storage_url: string;
  created_at: string;
  users: {
    first_name: string;
    last_name: string;
    picture?: string;
  }
  views: string;
}

export interface VideoUploadData {
  title: string;
  description: string;
  thumbnail: File | null;
  videoFile: File | null;
  genres: string[];
  releaseYear: number;
  contentRating: string;
  language: string;
  tags: string[];
}

export interface GenreFormDB {
  id: number;
  name: string;
  slug: string;
}