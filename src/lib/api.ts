import { ApiResponse } from "../types/lib/api.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...options,
    });
    const json = await res.json();

    if (!res.ok) {
      return { data: null, error: json.error || "An error occured " };
    }

    return { data: json, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}
