import { ApiResponse } from "../types/lib/api.types";
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
    const json = await res.json();

    if (!res.ok) {
      return { data: null, error: json.error || "An error occured " };
    }

    return { data: json, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}

export const getVideos = async () => {
  const res = await fetch(`${BASE_URL}/videos`);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

export const getVideo = async (id: string) => {
  const res = await fetch(`${BASE_URL}/videos/${id}`);
  if (!res.ok) throw new Error("Failed to fetch video");
  return res.json();
};

export const getUserVideos = async () => {
  return axios
    .get(`${BASE_URL}/videos/mine`, { withCredentials: true })
    .then((res) => res.data);
};

export const uploadVideo = (
  formData: FormData,
  onProgress: (percent: number) => void,
) => {
  return axios
    .post(`${BASE_URL}/videos/upload`, formData, {
      withCredentials: true,
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

export const sendViews = async (videoId: string) => {
  const res = await fetch(`${BASE_URL}/videos/${videoId}/view`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to send view");
  return res.json();
};

export const postComment = async (videoId: string, comment: string) => {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ video_id: videoId, content: comment }),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
};

export const getComments = async (videoId: string) => {
  const res = await fetch(`${BASE_URL}/videos/${videoId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

export const deleteComment = async (commentId: number) => {
  const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
};

export const subscribe = async (channelId: string) => {
  const res = await fetch(`${BASE_URL}/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ channel_id: channelId }),
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to subscribe");
  }
  return res.json();
};

export const unsubscribe = async (channelId: string) => {
  const res = await fetch(`${BASE_URL}/subscriptions/${channelId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to unsubscribe");
  return res.json();
};

export const getSubscriptions = async (channelId: string) => {
  const res = await fetch(`${BASE_URL}/subscriptions/${channelId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch subscriptions");
  return res.json();
};

export const getSubscriptionCount = async (channelId: string) => {
  const res = await fetch(`${BASE_URL}/subscriptions/${channelId}/count`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch subscription count");
  const json = await res.json();
  return Number(json.subscriber_count);
};
