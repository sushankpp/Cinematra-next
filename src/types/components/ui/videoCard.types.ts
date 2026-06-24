export type DropdownItem = {
  label: string;
  href?: string;
  className?: string;
  onClick?: () => void;
};

export type VideoGridProps = {
  videos?: Video[];
  items?: DropdownItem[];
  getItems?: (video: Video) => DropdownItem[];
};

export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  creatorProfile?: string;
  videoTitle: string;
  creatorName: string;
  views: string;
  postedTime: string;
  videoThumbnail: string;
  videoId: string;
  className?: string;
  onMenuToggle?: () => void;
  isMenuOpen: boolean;
  items?: DropdownItem[];
  variant?: "default" | "compact";
  similarityScore?: number;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail_url: string;
  storage_url: string;
  created_at: string;
  users: {
    first_name: string;
    last_name: string;
    picture?: string;
  };
  views: string;
  similarity_score?: number;
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

export interface TagFromDB {
  id: number;
  name: string;
  slug: string;
}

export interface WatchHistoryitem {
  id: string;
  user_id: string;
  video_id: string;
  watch_duration_seconds: number;
  video_duration_seconds: number;
  completed: boolean;
  watched_at: string;
  videos: {
    id: string;
    title: string;
    thumbnail_url: string;
    storage_url: string;
    language: string;
    content_rating: string;
  };
}
