"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderUser from "./HeaderUser";
import { AlignRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-stone-900 min-h-[10vh] grid text-slate-200 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-gray-400 transition-colors duration-300">
          MyApp
        </Link>

        <nav className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
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

            <div className="border-l-stone-400 border-l h-6"></div>

            <HeaderUser />
          </div>

          <div className="relative md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 focus:outline-none">
              <AlignRight />
            </button>
            {isOpen && (
              <div className="absolute z-40 right-0 mt-2 w-60 bg-stone-800 rounded-lg shadow-lg">
                <ul className="text-slate-200 text-right">
                  <li>
                    <Link
                      href="/user/table"
                      className="block px-4 py-2 hover:bg-stone-700">
                      Table
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/user/article"
                      className="block px-4 py-2 hover:bg-stone-700">
                      Article
                    </Link>
                  </li>
                  <li>
                    <div className="border-t border-stone-700 my-2"></div>
                  </li>
                  <li className="mb-2">
                    <HeaderUser />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
