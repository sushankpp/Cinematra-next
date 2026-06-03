"use client";
import { UploadVideoSection } from "@/components/sections/dashboard/UploadForm";

export default function Videos() {
  return (
    <div className="p-6 max-w-screen-xl">
      <div className="mb-6">
        <h1 className="font-headline text-2xl text-primary-text font-bold">
          Upload Video
        </h1>
        <p className="font-body text-tertiary-Shade text-sm mt-1">
          Add a new video to your library
        </p>
      </div>

      <UploadVideoSection />
    </div>
  );
}
