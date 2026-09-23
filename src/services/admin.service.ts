import { apiCall } from "@/lib/api";
import { AdminUser, AdminVideo, AdminComment } from "@/types/admin.types";

export const adminService = {
  getUsers: () =>
    apiCall<AdminUser[]>("/admin/users", {
      method: "GET",
      credentials: "include",
    }),

  getVideos: () =>
    apiCall<AdminVideo[]>("/admin/videos", {
      method: "GET",
      credentials: "include",
    }),

  getComments: () =>
    apiCall<AdminComment[]>("/admin/comments", {
      method: "GET",
      credentials: "include",
    }),

  deleteUser: (userId: string) =>
    apiCall(`/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    }),

  deleteVideo: (videoId: string, reason: string) =>
    apiCall(`/videos/${videoId}?reason=${encodeURIComponent(reason)}`, {
      method: "DELETE",
      credentials: "include",
    }),

  deleteComment: (commentId: number, reason: string) =>
    apiCall(`/comments/${commentId}?reason=${encodeURIComponent(reason)}`, {
      method: "DELETE",
      credentials: "include",
    }),
};
