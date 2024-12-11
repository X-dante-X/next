"use client";

import { createContext, useContext, PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextProps {
  user: User;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const getCurrentUser = (): Promise<User> =>
    new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } 
      });
    });

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Error>({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
  });

  const safeUser = user ?? (error ? undefined : null);

  return (
    <AuthContext.Provider
      value={{
        user: safeUser as User,
        isLoading: isLoading,
        error: error?.message || null,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  if (context.error) {
    throw new Error(context.error);
  }

  return context;
};
