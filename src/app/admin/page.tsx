"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { AdminUser, AdminVideo, AdminComment } from "@/types/admin.types";
import { DeleteReasonModal } from "@/components/admin/DeleteReasonModal";
import { toast } from "sonner";
import { formatCommentTime } from "@/lib/formatCommentTime";
import {
  ShieldCheck,
  Users,
  Video,
  MessageSquare,
  Trash2,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { isAdminUser } from "@/lib/admin";

type Tab = "users" | "videos" | "comments";

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin = isAdminUser(user);

  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    type: "video" | "comment";
    id: string | number;
    title: string;
  }>({ open: false, type: "video", id: "", title: "" });
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Route guard
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [user, isAdmin, authLoading, router]);

  const fetchData = useCallback(async (tab: Tab) => {
    setLoading(true);
    setError(null);
    try {
      if (tab === "users") {
        const res = await adminService.getUsers();
        if (res.error) throw new Error(res.error);
        setUsers(Array.isArray(res.data) ? res.data : []);
      } else if (tab === "videos") {
        const res = await adminService.getVideos();
        if (res.error) throw new Error(res.error);
        setVideos(Array.isArray(res.data) ? res.data : []);
      } else {
        const res = await adminService.getComments();
        if (res.error) throw new Error(res.error);
        setComments(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchData(activeTab);
    }
  }, [activeTab, isAdmin, fetchData]);

  // Delete handlers
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      const res = await adminService.deleteUser(userId);
      if (res.error) throw new Error(res.error);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("User deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete user");
    }
  };

  const openDeleteModal = (type: "video" | "comment", id: string | number, title: string) => {
    setDeleteModal({ open: true, type, id, title });
  };

  const handleDeleteWithReason = async (reason: string) => {
    setDeleteLoading(true);
    try {
      if (deleteModal.type === "video") {
        const res = await adminService.deleteVideo(deleteModal.id as string, reason);
        if (res.error) throw new Error(res.error);
        setVideos((prev) => prev.filter((v) => v.id !== deleteModal.id));
        toast.success("Video deleted successfully");
      } else {
        const res = await adminService.deleteComment(deleteModal.id as number, reason);
        if (res.error) throw new Error(res.error);
        setComments((prev) => prev.filter((c) => c.id !== deleteModal.id));
        toast.success("Comment deleted successfully");
      }
      setDeleteModal((prev) => ({ ...prev, open: false }));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="w-full min-h-[calc(100vh-73px)] bg-secondary-Body flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-active" />
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { key: "users", label: "Users", icon: Users, count: users.length },
    { key: "videos", label: "Videos", icon: Video, count: videos.length },
    { key: "comments", label: "Comments", icon: MessageSquare, count: comments.length },
  ];

  const getModerationBadge = (label: string) => {
    if (!label) return null;
    const lower = label.toLowerCase().replace(/[\s_-]/g, "");

    let colorClass = "bg-white/10 text-white/70 border border-white/10";
    let dotClass = "bg-white/50";

    if (
      lower.includes("safe") ||
      lower.includes("clean") ||
      lower.includes("approved") ||
      lower.includes("pass")
    ) {
      colorClass = "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25";
      dotClass = "bg-emerald-400";
    } else if (
      lower.includes("potential") ||
      lower.includes("warn") ||
      lower.includes("pending") ||
      lower.includes("caution") ||
      lower.includes("review")
    ) {
      colorClass = "bg-amber-500/15 text-amber-400 border border-amber-500/25";
      dotClass = "bg-amber-400";
    } else if (
      lower.includes("problem") ||
      lower.includes("flag") ||
      lower.includes("toxic") ||
      lower.includes("spam") ||
      lower.includes("hate") ||
      lower.includes("reject") ||
      lower.includes("violat") ||
      lower.includes("nsfw") ||
      lower.includes("danger")
    ) {
      colorClass = "bg-red-500/15 text-red-400 border border-red-500/25";
      dotClass = "bg-red-400";
    }

    const displayLabel = label.replace(/([a-z])([A-Z])/g, "$1 $2").trim();

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${colorClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        {displayLabel}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    if (!status) return null;
    const lower = status.toLowerCase();
    let color = "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25";
    let dot = "bg-emerald-400";
    if (lower === "processing" || lower === "pending" || lower === "uploading") {
      color = "bg-amber-500/15 text-amber-400 border border-amber-500/25";
      dot = "bg-amber-400";
    } else if (lower === "failed" || lower === "rejected" || lower === "error") {
      color = "bg-red-500/15 text-red-400 border border-red-500/25";
      dot = "bg-red-400";
    }
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${color}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        {status}
      </span>
    );
  };

  return (
    <div className="w-full min-h-[calc(100vh-73px)] bg-secondary-Body text-white">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header — matching dashboard style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <ShieldCheck className="w-8 h-8 text-red-500" />
            Admin Panel
          </h1>
          <p className="text-white/60 text-sm mt-1.5 font-medium">
            Manage users, videos, and comments across the platform.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 self-start md:self-center bg-white/5 hover:bg-white/10 border border-white/10 text-primary-text font-semibold py-2 px-4 rounded-xl text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === key
                ? "bg-primary-active/10 text-primary-active border border-primary-active/20"
                : "bg-white/5 text-tertiary-Shade hover:text-primary-text hover:bg-white/10 border border-white/5"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
            {count > 0 && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-md text-xs ${
                  activeTab === key
                    ? "bg-primary-active/20 text-primary-active"
                    : "bg-white/10 text-tertiary-Shade"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-[#121214]/60 backdrop-blur-md border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300 shadow-xl shadow-black/40">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-tertiary-Shade" />
            <span className="ml-3 text-sm text-tertiary-Shade">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle className="w-8 h-8 text-red-500/70" />
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => fetchData(activeTab)}
              className="text-xs text-primary-active hover:underline cursor-pointer"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            {/* Users Table */}
            {activeTab === "users" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-primary-text">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Email</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Provider</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Joined</th>
                      <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-tertiary-Shade">
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-medium">
                            {u.first_name} {u.last_name}
                            {isAdminUser(u) && (
                              <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold">
                                Admin
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-tertiary-Shade">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs font-semibold text-primary-text/70">
                              {u.provider || "email"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-tertiary-Shade">{formatCommentTime(u.created_at)}</td>
                          <td className="px-4 py-3 text-right">
                            {!isAdminUser(u) && (
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-1.5 rounded-lg hover:bg-red-500/10 text-tertiary-Shade hover:text-red-400 transition-colors cursor-pointer"
                                title="Delete user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {users.length > 0 && (
                  <div className="px-4 py-3 text-xs text-tertiary-Shade border-t border-white/10">
                    {users.length} user{users.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            )}

            {/* Videos Table */}
            {activeTab === "videos" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-primary-text">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Title</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Uploader</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Moderation</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Views</th>
                      <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-tertiary-Shade">
                          No videos found.
                        </td>
                      </tr>
                    ) : (
                      videos.map((v) => (
                        <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-medium max-w-[200px] truncate">{v.title}</td>
                          <td className="px-4 py-3 text-tertiary-Shade">{v.uploader_name}</td>
                          <td className="px-4 py-3">{getStatusBadge(v.status)}</td>
                          <td className="px-4 py-3">{getModerationBadge(v.moderation_label)}</td>
                          <td className="px-4 py-3 text-tertiary-Shade">{v.views?.toLocaleString() ?? 0}</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => openDeleteModal("video", v.id, v.title)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-tertiary-Shade hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete video"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {videos.length > 0 && (
                  <div className="px-4 py-3 text-xs text-tertiary-Shade border-t border-white/10">
                    {videos.length} video{videos.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            )}

            {/* Comments Table */}
            {activeTab === "comments" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-primary-text">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Comment</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Commenter</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Video</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Moderation</th>
                      <th className="text-right px-4 py-3 font-semibold text-xs uppercase tracking-wider text-tertiary-Shade">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-tertiary-Shade">
                          No comments found.
                        </td>
                      </tr>
                    ) : (
                      comments.map((c) => (
                        <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 max-w-[250px] truncate">{c.content}</td>
                          <td className="px-4 py-3 text-tertiary-Shade">{c.commenter_name}</td>
                          <td className="px-4 py-3 text-tertiary-Shade max-w-[150px] truncate">{c.video_title}</td>
                          <td className="px-4 py-3">{getModerationBadge(c.moderation_label)}</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => openDeleteModal("comment", c.id, c.content)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-tertiary-Shade hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete comment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {comments.length > 0 && (
                  <div className="px-4 py-3 text-xs text-tertiary-Shade border-t border-white/10">
                    {comments.length} comment{comments.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Reason Modal */}
      <DeleteReasonModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal((prev) => ({ ...prev, open }))}
        title={`Delete ${deleteModal.type === "video" ? "Video" : "Comment"}`}
        description={`You are about to delete: "${deleteModal.title?.slice(0, 60)}${
          (deleteModal.title?.length ?? 0) > 60 ? "..." : ""
        }". Please provide a reason — the owner will be notified.`}
        onConfirm={handleDeleteWithReason}
        loading={deleteLoading}
      />
      </div>
    </div>
  );
}
