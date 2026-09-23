"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface DeleteReasonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: (reason: string) => void;
  loading?: boolean;
}

export function DeleteReasonModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  loading = false,
}: DeleteReasonModalProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) setReason("");
    onOpenChange(value);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="bg-neutral-default border-white/10 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary-text text-base font-bold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-tertiary-Shade text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-2">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for deletion..."
            rows={3}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm font-body text-primary-text placeholder:text-tertiary-Shade focus:outline-none focus:border-primary-active/50 focus:bg-white/8 transition-colors duration-200 resize-none"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            className="bg-white/5 border-white/10 text-primary-text hover:bg-white/10"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!reason.trim() || loading}
            className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
