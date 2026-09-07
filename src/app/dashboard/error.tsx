"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard route error:", error);
  }, [error]);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="bg-[#121214] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-xl space-y-4">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Dashboard Error</h2>
        <p className="text-sm text-white/60">
          Failed to load your channel dashboard data.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reload Dashboard
        </button>
      </div>
    </div>
  );
}
