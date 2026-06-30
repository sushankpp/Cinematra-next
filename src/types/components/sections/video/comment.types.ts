export interface Comment {
  id: number;
  users: { first_name: string; last_name: string; picture: string; };
  content: string;
  created_at: string;
  moderation_label?: string;
  moderation_confidence?: number;
}