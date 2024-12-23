"use client";

import React from "react";
import Link from "next/link";
import HeaderUser from "./HeaderUser";

export default function Header() {
  return (
    <header className="bg-stone-900 min-h-[10vh] grid text-slate-200 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-gray-400 transition-colors duration-300">
          MyApp
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="/user/table"
            className="hover:text-gray-400 transition-colors duration-300">
            Table
          </Link>
          <Link
            href="/user/article"
            className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300">
            Article
          </Link>

          <div className="border-l-stone-400 border-l-3 h-6 w-1" />

          <HeaderUser />
        </nav>
      </div>
    </header>
  );
}
