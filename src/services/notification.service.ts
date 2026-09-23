import { apiCall } from "@/lib/api";
import { Notification } from "@/types/notification.types";

export const notificationService = {
  getAll: () =>
    apiCall<Notification[]>("/notifications", {
      method: "GET",
      credentials: "include",
    }),

  markAsRead: (notifId: number) =>
    apiCall(`/notifications/${notifId}/read`, {
      method: "PATCH",
      credentials: "include",
    }),
};
