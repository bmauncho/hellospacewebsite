"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string | null;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session with your backend
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    setIsLoading(true);
    try {
      // In a real app, this would call your authentication API
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful authentication
      const user: User = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        email,
        name: email.split("@")[0],
        role: "user",
      };

      // Store user in localStorage (in a real app, you'd use secure cookies or tokens)
      if (typeof localStorage === "undefined") {
        throw new Error("localStorage is not defined");
      }

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your registration API
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      const user: User = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: "user",
      };

      // Store user in localStorage (in a real app, you'd use secure cookies or tokens)
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would call your sign out API
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove user from localStorage
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
