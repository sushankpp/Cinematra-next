"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#121214] border border-white/10 p-8 rounded-2xl shadow-2xl space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Something went wrong</h2>
        <p className="text-sm text-white/60">
          An unexpected error occurred. Please try reloading the page.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
