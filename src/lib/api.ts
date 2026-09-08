import { ApiResponse } from "../types/lib/api.types";
import { WatchHistoryitem } from "@/types/components/ui/videoCard.types";
import axios from "axios";

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

    let json: any = {};
    try {
      json = await res.json();
    } catch {
      json = {};
    }

    if (!res.ok) {
      const errorMessage =
        json.error ||
        json.message ||
        (res.status === 401
          ? "Unauthorized. Please log in."
          : res.status === 403
            ? "You do not have permission to perform this action."
            : res.status === 404
              ? "Requested resource not found."
              : res.status === 429
                ? "Too many requests. Please try again later."
                : res.status >= 500
                  ? "Server error. Please try again later."
                  : `An error occurred (HTTP ${res.status})`);

      return { data: null, error: errorMessage, status: res.status };
    }

    return { data: json, error: null, status: res.status };
  } catch (error) {
    return {
      data: null,
      error:
        (error as Error).message ||
        "Network error. Please check your connection.",
      status: 0,
    };
  }
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getVideo = async (id: string) => {
  return apiClient.get(`/videos/${id}`).then((res) => res.data);
};

export const getUserVideos = async () => {
  return apiClient.get("/videos/mine").then((res) => res.data);
};

export const deleteVideo = async (id: string) => {
  return apiClient.delete(`/videos/${id}`).then((res) => res.data);
};

export const updateVideo = async (id: string, formData: FormData) => {
  return apiClient
    .put(`/videos/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const uploadVideo = (
  formData: FormData,
  onProgress: (percent: number) => void,
) => {
  return apiClient
    .post("/videos/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          onProgress(percent);
        }
      },
    })
    .then((res) => res.data);
};

export const sendViews = async (videoId: string): Promise<boolean> => {
  const url = `${BASE_URL}/videos/${videoId}/view`;

  try {
    if (typeof window !== "undefined" && navigator?.sendBeacon) {
      const queued = navigator.sendBeacon(url);
      if (queued) return true;
    }

    await fetch(url, {
      method: "POST",
      credentials: "include",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    });

    return true;
  } catch (error) {
    console.warn(`Failed to send view for video ${videoId}:`, error);
    return false;
  }
};

export const postComment = async (videoId: string, comment: string) => {
  return apiClient
    .post("/comments", { video_id: videoId, content: comment })
    .then((res) => res.data);
};

export const getComments = async (videoId: string) => {
  return apiClient.get(`/videos/${videoId}/comments`).then((res) => res.data);
};

export const deleteComment = async (commentId: number) => {
  return apiClient.delete(`/comments/${commentId}`).then((res) => res.data);
};

export const subscribe = async (channelId: string) => {
  return apiClient
    .post("/subscriptions", { channel_id: channelId })
    .then((res) => res.data);
};

export const unsubscribe = async (channelId: string) => {
  return apiClient
    .delete(`/subscriptions/${channelId}`)
    .then((res) => res.data);
};

export const getSubscriptions = async (channelId?: string) => {
  return apiClient.get(`/subscriptions/${channelId}`).then((res) => res.data);
};

export const getSubscriptionCount = async (channelId: string) => {
  return apiClient
    .get(`/subscriptions/${channelId}/count`)
    .then((res) => Number(res.data.subscriber_count));
};

export const getUserPreferences = async () => {
  return apiClient.get("/preferences").then((res) => res.data);
};

export const postUserPreferences = async (userPreferences: any) => {
  return apiClient
    .post("/preferences", userPreferences)
    .then((res) => res.data);
};

export const watchHistory = async (
  videoId: string,
  data: {
    watch_duration_seconds: number;
    completed: boolean;
    video_duration_seconds?: number;
  },
): Promise<boolean> => {
  const url = `${BASE_URL}/watch/${videoId}`;

  try {
    if (typeof window !== "undefined" && navigator?.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const queued = navigator.sendBeacon(url, blob);
      if (queued) return true;
    }

    await fetch(url, {
      method: "POST",
      credentials: "include",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.warn(`Failed to send watch history for video ${videoId}:`, error);
    return false;
  }
};

export const getWatchHistory = async (): Promise<WatchHistoryitem[]> => {
  return apiClient.get("/watch/history").then((res) => res.data);
};

export const getGlobalTrending = async () => {
  return apiClient.get("/videos/trending").then((res) => res.data);
};

export const postVideoReaction = async (
  videoId: string,
  reactionType: "like" | "dislike",
) => {
  return apiClient
    .post(`/videos/${videoId}/react`, {
      reaction_type: reactionType,
    })
    .then((res) => res.data);
};
