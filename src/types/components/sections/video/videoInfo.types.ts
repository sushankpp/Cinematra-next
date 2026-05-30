export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    video: {
        id: string;
        title: string;
        description?: string;
        views: string;
        created_at: string;
        subscriberCount?: string;
        likes?: string;
        dislikes?: string;
        users: {
            first_name: string;
            last_name: string;
            creator_profile?: string;
        }
    }
}
