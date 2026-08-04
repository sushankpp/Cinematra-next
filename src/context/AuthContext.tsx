"use client";
import { authService } from "@/services/auth.service";
import { User, AuthContextType } from "@/types/context/authContext.types";
import { useLoading } from "@/context/LoadingContext";
import { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();

  const fetchUser = useCallback(async () => {  
    const { data, error } = await authService.me();

    if (error || !data) {
      setUser(null);
    } else {
      setUser({...data.user, onboarding_completed: data.onboarding_completed});
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Loading overlay is already visible from initial state.
    // Just fetch user and hide when done.
    fetchUser().finally(() => {
      hideLoading();
    });
  }, [fetchUser, hideLoading]);

  const refreshUser = () => fetchUser();

  const Logout = async () => {
    showLoading();
    await authService.logout();
    setUser(null);
    router.push("/");
    hideLoading();
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, logout: Logout , refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
