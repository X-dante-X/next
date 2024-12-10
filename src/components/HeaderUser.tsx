'use client'

import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import Image from 'next/image';
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";


export default function HeaderUser() {
    const { user } = useAuth();

    const handleSignOut = async () => {
        try {
          await signOut(auth);
          console.log("User signed out successfully.");
          window.location.href = '/';
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error signing out:", error.message);
          } else {
            console.error("An unknown error occurred during sign out");
          }
        }
      };
      
    return ( <>
     {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/user/profile" className="flex items-center space-x-2 hover:text-slate-100 transition">
                <Image
                  key={user?.photoURL}
                  src={user?.photoURL || "/avatar.jpg"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/user/signin" className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Sign In
              </Link>
              <Link href="/user/signup" className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Sign Up
              </Link>
            </div>
          )}
    </> );
}

