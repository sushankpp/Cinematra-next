"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";

export default function VideoError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Video page error boundary caught an error:", error);
  }, [error]);

  return (
    <Container size="xl">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-gray-400 mb-6 max-w-md">
          {error.message || "An unexpected error occurred while loading this video."}
        </p>
        <button
          onClick={() => reset()}
          className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </Container>
  );
}
