'use client';

import { useAuth } from "@/lib/AuthContext";
import { redirect } from "next/navigation";
import { PropsWithChildren, useLayoutEffect } from "react";

export default function User({
    children,
  }: PropsWithChildren) {
    const { user } = useAuth();
  
    useLayoutEffect(() => {
      if (user && user.emailVerified) {
        redirect(`/user/profile`);
      }
    }, [user]);
  
    return <>{children}</>;
  }
  