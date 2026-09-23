export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  provider: string;
  created_at: string;
  role?: string;
}

export interface AdminVideo {
  id: string;
  title: string;
  uploader_name: string;
  status: string;
  moderation_label: string;
  views: number;
  created_at: string;
}

export interface AdminComment {
  id: number;
  content: string;
  commenter_name: string;
  video_title: string;
  moderation_label: string;
  created_at: string;
}
