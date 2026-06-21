"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function OnboardingGate() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading || !user) return;
    if (!user.onboarding_completed && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [user, isLoading, pathname, router]);

  return null;
}
