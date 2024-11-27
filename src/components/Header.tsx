'use client'

import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { useAuth } from "@/lib/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-stone-900 text-slate-200 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold hover:text-slate-100">MyApp
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/about" className="hover:text-slate-100 transition">
            About
          </Link>
          <Link href="/services" className="hover:text-slate-100 transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-slate-100 transition ">
            Contact
          </Link>

          <div className="border-l-stone-400 border-l-3 h-6 w-1"/>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/user/profile" className="flex items-center space-x-2 hover:text-slate-100 transition">
                 <Image src={user?.photoURL || "/avatar.jpg"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/user/signin" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                Sign In
              </Link>
              <Link href="/user/signup" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

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

export default Header;
