"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center py-52 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center text-white px-24 py-28 opacity-80 shadow-lg rounded-lg">
        <div className="text-lg">404 error</div>
        <h1 className="text-4xl font-bold mb-4">We can't find that page</h1>
        <p className="mt-4">Sorry, the page you are looking for doesn't exist or has been moved.</p>

        <div className="flex items-center mt-6 justify-around">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:rotate-180">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>Go back</span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
