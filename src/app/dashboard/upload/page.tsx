"use client";
import { Suspense } from "react";
import { UploadVideoSection } from "@/components/sections/dashboard/UploadForm";
import { useSearchParams } from "next/navigation";

function UploadVideoContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  return (
    <div className="p-6 max-w-screen-xl">
      <div className="mb-6">
        <h1 className="font-headline text-2xl text-primary-text font-bold">
          {editId ? "Edit Video" : "Upload Video"}
        </h1>
        <p className="font-body text-tertiary-Shade text-sm mt-1">
          {editId ? "Update your video details" : "Add a new video to your library"}
        </p>
      </div>

      <UploadVideoSection editId={editId} />
    </div>
  );
}

export default function Videos() {
  return (
    <Suspense fallback={<div className="p-6 max-w-screen-xl text-tertiary-Shade">Loading...</div>}>
      <UploadVideoContent />
    </Suspense>
  );
}
