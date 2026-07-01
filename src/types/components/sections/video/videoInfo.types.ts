export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    video: {
        id: string;
        title: string;
        description?: string;
        views: string;
        created_at: string;
        user_id: string;
        likes_count: number;
        dislikes_count: number;
        users: {
            first_name: string;
            last_name: string;
            picture?: string;
        }
    }
    subscriptionCount?: number;
}
