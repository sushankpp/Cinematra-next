"use client";
import { authService } from "@/services/auth.service";
import { User, AuthContextType } from "@/types/context/authContext.types";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await authService.me();

      if (error || !data) {
        setUser(null);
      } else {
        setUser(data.user);
        console.log("User data fetched successfully:", data.user);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const Logout = async () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, logout: Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };