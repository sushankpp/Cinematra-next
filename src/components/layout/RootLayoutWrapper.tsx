"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { isAdminUser } from "@/lib/admin";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAdmin = pathname?.startsWith("/admin");

  // Route guard for /admin
  useEffect(() => {
    if (isAdmin && !isLoading && (!user || !isAdminUser(user))) {
      router.push("/");
    }
  }, [isAdmin, isLoading, user, router]);

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-[73px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
