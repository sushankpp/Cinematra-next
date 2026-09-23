export interface Notification {
  id: number;
  user_id: string;
  type: "video_deleted" | "comment_deleted";
  message: string;
  read: boolean;
  created_at: string;
}
