import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  MeResponse,
} from "@/types/service/authResponse.types";
import { apiCall } from "@/lib/api";

export const authService = {
  register: (payload: RegisterPayload) =>
    apiCall<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: LoginPayload) =>
    apiCall<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: () =>
    apiCall<MeResponse>("/auth/me", {
      method: "GET",
      credentials: "include",
    }),
  
  logout: () => {
    return apiCall("/auth/logout", {
      method: "POST",
    })
  },

  updateProfile: (
    payload: Partial<RegisterPayload> & { picture?: string },
  ) => {
    return apiCall<MeResponse | null>("/auth/update", {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    })
  }
};
