"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  // Always start false on SSR to prevent hydration mismatches
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideLoading = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    setProgress(100);

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("cinematra_initial_loaded", "true");
      } catch {}
    }

    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 250);
  }, []);

  // Initial load animation — runs only once on initial browser mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem("cinematra_initial_loaded") === "true") {
        return;
      }
    } catch {}

    // First time opening the app in this session
    setIsLoading(true);
    setProgress(15);

    let current = 15;
    intervalRef.current = setInterval(() => {
      current += 15 + Math.random() * 15;
      if (current >= 90) {
        current = 90;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      setProgress(Math.min(current, 90));
    }, 120);

    // Guaranteed safety timeout: Never allow overlay to get stuck
    maxTimeoutRef.current = setTimeout(() => {
      hideLoading();
    }, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    };
  }, [hideLoading]);

  const showLoading = useCallback(() => {
    // Never show full-screen overlay during navigation if already loaded
    try {
      if (sessionStorage.getItem("cinematra_initial_loaded") === "true") {
        return;
      }
    } catch {}

    setIsLoading(true);
    setProgress(15);
  }, []);

  return (
    <LoadingContext.Provider
      value={{ isLoading, progress, showLoading, hideLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context;
}
