"use client";

import { useState, useEffect, useCallback } from "react";
import { apiPost, apiGet } from "@/lib/api";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always start fresh — require password every time
    localStorage.removeItem("admin_token");
    setIsLoading(false);
  }, []);

  const login = useCallback(async (password: string) => {
    const { token: newToken } = await apiPost("/api/auth/login", { password });
    localStorage.setItem("admin_token", newToken);
    setToken(newToken);
    setIsVerified(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsVerified(false);
  }, []);

  return { token, isVerified, isLoading, login, logout };
}
