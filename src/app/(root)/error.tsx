"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Home route error:", error);
  }, [error]);

  return (
    <Container>
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Could not load home page content</h2>
        <p className="text-gray-400 text-sm">
          Something went wrong while loading recommended or trending videos.
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-xl transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    </Container>
  );
}
