import React, { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await apiRequest("/auth/me");
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = useCallback(async ({ email, password }) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setUser(data.user);
    return data.user;
  }, []);

  const signup = useCallback(async (payload) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }, []);

  const logout = useCallback(async () => {
    await apiRequest("/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isAuthLoading,
    login,
    logout,
    refreshProfile,
    signup,
  }), [isAuthLoading, login, logout, refreshProfile, signup, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
