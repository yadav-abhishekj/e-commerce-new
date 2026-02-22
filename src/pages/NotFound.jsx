import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-white animate-pageEnter">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-32 px-6 overflow-hidden text-center">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">
            404 Error
          </p>

          <h1 className="mt-6 text-6xl md:text-7xl font-black text-white leading-tight">
            Page Not
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Found
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              Go Home
            </Link>

            <Link
              to="/products"
              className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-md"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Optional Support Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-500">
            If you believe this is a mistake, please contact support or return
            to our homepage.
          </p>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
