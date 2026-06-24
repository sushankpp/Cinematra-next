export interface TrendingVideo {
  id: string;
  title: string;
  thumbnail_url: string;
  storage_url: string;
  created_at: string;
  release_year: number;
  user_id: string;
  combined_score: number;
  trending_score: number;
  similarity_score: number;
  users: {
    first_name: string;
    last_name: string;
    picture?: string;
  };
  views: string;
  video_genres?: { id: number; name: string }[];
  video_tags?: { id: number; name: string }[];
}

export interface TrendingHeroSlideProps {
  title: string;
  thumbnail_url: string;
  storage_url: string;
  creatorName: string;
  creatorProfile?: string;
  views: string;
  isActive: boolean;
}

export interface TrendingSliderProps {
  videos: TrendingVideo[];
}
