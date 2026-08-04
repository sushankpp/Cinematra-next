"use client";
import { useLoading } from "@/context/LoadingContext";

export function LoadingOverlay() {
  const { isLoading, progress } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
      <img src="/cinematra-logo.png" alt="Loading" className="w-[250px] h-[250px] mb-6" />
      <p className="text-white text-lg font-medium tabular-nums mb-4">
        {Math.round(progress)}%
      </p>
      <div className="w-[200px] h-1.5 rounded bg-white/20 overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-red-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
