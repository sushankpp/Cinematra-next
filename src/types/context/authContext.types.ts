export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    picture: string;
    provider: string | null;
    created_at: string;
    updated_at: string;
}

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    refreshUser: () => void;
}