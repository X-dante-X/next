'use client'
import { useAuth } from "@/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect } from 'next/navigation';

function Protected({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { user } = useAuth();

    useLayoutEffect(() => {
        if (!user){
            redirect(`/user/signin`);
        }
    }, [user]);
    return ( <>
    { children }
    </> );
}

export default Protected;