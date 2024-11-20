'use client'
import { useAuth } from "@/lib/authContext";
import { ReactNode, useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface Props 
{
    children: ReactNode
}

function Protected({children}: Props) {
    const { user } = useAuth();
    const returnUrl = usePathname();

    useLayoutEffect(() => {
        if (!user){
            redirect(`/user/singin?returnUrl=${returnUrl}`);
        }
    }, []);
    return ( <>
    { children }
    </> );
}

export default Protected;