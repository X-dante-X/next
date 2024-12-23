export default function Home() {
  return (
    <div className="relative flex items-center min-h-[80vh] justify-center py-48 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400">
      <div className="w-full max-w-4xl bg-stone-950 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">Home</h1>
        <div className="space-y-4">
          <p className="text-lg text-slate-300 text-center">
            Welcome to the demo project built with <strong>Next.js</strong> and <strong>Firebase</strong>. This application showcases the integration of modern
            technologies for web development, including server-side rendering, authentication, and database management.
          </p>
        </div>
      </div>
    </div>
  );
}
