"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Bell, Video, MessageSquare, X } from "lucide-react";
import { notificationService } from "@/services/notification.service";
import { Notification } from "@/types/notification.types";
import { formatCommentTime } from "@/lib/formatCommentTime";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await notificationService.getAll();
      if (!res.error && Array.isArray(res.data)) {
        setNotifications(res.data);
      }
    } catch {
      // Silently fail — notifications are non-critical
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Refetch on window focus
  useEffect(() => {
    const handleFocus = () => fetchNotifications();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (notifId: number) => {
    try {
      await notificationService.markAsRead(notifId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
      );
    } catch {
      // Silently fail
    }
  };

  const getNotifIcon = (type: string) => {
    if (type === "video_deleted") return <Video className="w-4 h-4 text-red-400 shrink-0" />;
    if (type === "comment_deleted") return <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />;
    return <Bell className="w-4 h-4 text-tertiary-Shade shrink-0" />;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-primary-text/70" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary-active text-white text-[10px] font-bold px-1 animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-[48px] z-50 w-[340px] overflow-hidden rounded-xl
          border border-white/10 bg-neutral-Shade/95 shadow-xl shadow-black/40 backdrop-blur-md
          transition-all duration-200 ease-out
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h3 className="text-sm font-semibold text-primary-text">Notifications</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-tertiary-Shade hover:text-primary-text transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-[360px] overflow-y-auto scrollbar-hide">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Bell className="w-8 h-8 text-tertiary-Shade/50" />
              <p className="text-xs text-tertiary-Shade">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => {
                  if (!notif.read) handleMarkAsRead(notif.id);
                }}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors duration-150 hover:bg-white/5 cursor-pointer ${
                  !notif.read ? "bg-white/[0.03]" : ""
                }`}
              >
                <div className="mt-0.5">{getNotifIcon(notif.type)}</div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm leading-snug ${
                      notif.read ? "text-tertiary-Shade" : "text-primary-text"
                    }`}
                  >
                    {notif.message}
                  </p>
                  <p className="text-[11px] text-tertiary-Shade/70 mt-1">
                    {formatCommentTime(notif.created_at)}
                  </p>
                </div>
                {!notif.read && (
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-active shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
