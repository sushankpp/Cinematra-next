"use client";
import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

export function LoadingOverlay() {
  const { isLoading, progress } = useLoading();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Never render on server (SSR) to prevent hydration mismatches and stuck DOM nodes
  if (!mounted || !isLoading) return null;

  // Extra guard: If already recorded initial load, never render
  try {
    if (sessionStorage.getItem("cinematra_initial_loaded") === "true") {
      return null;
    }
  } catch {}

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300">
      <img
        src="/cinematra-logo.png"
        alt="Loading"
        className="w-[200px] h-[200px] mb-6"
      />
      <p className="text-white text-lg font-medium tabular-nums mb-4">
        {Math.round(progress)}%
      </p>
      <div className="w-[200px] h-1.5 rounded bg-white/20 overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-red-500 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
