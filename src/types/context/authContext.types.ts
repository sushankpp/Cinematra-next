export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    picture: string;
    provider: string | null;
}

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
}