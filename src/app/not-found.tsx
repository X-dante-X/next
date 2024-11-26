import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center py-52 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="text-center text-white p-8 bg-opacity-80 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Oops!</h1>
                <p className="text-lg">404 - Page Not Found</p>
                <p className="mt-4">The page you re looking for doesn t exist.</p>
                <Link href="/" className="mt-6 inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-300">Go Home</Link>
            </div>
        </div>
    );
}
