'use client'

import React from "react";
import Link from "next/link";
import HeaderUser from "./HeaderUser";

export default function Header() {
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

          <div className="border-l-stone-400 border-l-3 h-6 w-1" />

          <HeaderUser />
        </nav>
      </div>
    </header>
  );
};

