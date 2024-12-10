"use client";

import { useAuth } from "@/lib/AuthContext";
import { redirect } from "next/navigation";
import { PropsWithChildren, useLayoutEffect } from "react";

export default function User({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();

  useLayoutEffect(() => {
    if (user && user.emailVerified && !isLoading) {
      redirect(`/user/profile`);
    }
  }, [user, isLoading]);

  return <>{children}</>;
}
