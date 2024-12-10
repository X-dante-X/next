"use client";

import { useAuth } from "@/lib/AuthContext";
import { PropsWithChildren, useLayoutEffect } from "react";
import { redirect } from "next/navigation";

function Protected({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();

  useLayoutEffect(() => {
    if (!isLoading) {
      if (!user) {
        redirect(`/user/signin`);
      }

      if (user && !user.emailVerified) {
        redirect(`/user/verify`);
      }
    }
  }, [user, isLoading]);

  return <>{children}</>;
}

export default Protected;
