import { User } from "../context/authContext.types";

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    provider: string;
    created_at: string;
  };
};

export type RegisterPayload = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
};

export type LoginPayload = {
    email: string;
    password: string;
}

export type MeResponse = {
  user : User;
  onboarding_completed: boolean;
}