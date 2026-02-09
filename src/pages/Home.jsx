import { Link } from "react-router-dom";

function Home() {
  const categories = [
    {
      name: "Electronics",
      desc: "Latest gadgets and tech",
      icon: "📱",
      color: "bg-blue-100",
    },
    {
      name: "Jewelry",
      desc: "Elegant gold and silver pieces",
      icon: "✨",
      color: "bg-purple-100",
    },
    {
      name: "Men's Clothing",
      desc: "Classic and casual styles",
      icon: "👔",
      color: "bg-orange-100",
    },
    {
      name: "Women's Clothing",
      desc: "Trendsetting fashion",
      icon: "👗",
      color: "bg-pink-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- Hero Section --- */}
      <section className="relative bg-gray-900 py-24 px-6 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left grid lg:grid-cols-2 items-center gap-12">
          <div>
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">
              New Season Arrival
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-black text-white leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Daily Lifestyle.
              </span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg max-w-lg mx-auto lg:mx-0">
              Explore our curated collection of premium products designed for
              quality, comfort, and style.
            </p>
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"
              >
                Shop Collection
              </Link>
              <Link
                to="/register"
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-md"
              >
                Join Member
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-gradient-to-tr from-gray-800 to-gray-700 p-8 rounded-[2.5rem] shadow-2xl border border-white/10 scale-110">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"
                alt="Featured Product"
                className="rounded-3xl shadow-lg hover:rotate-2 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Categories Section --- */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Browse Categories
            </h2>
            <p className="text-gray-500 mt-2">
              Find exactly what you're looking for.
            </p>
          </div>
          <Link
            to="/products"
            className="text-blue-600 font-bold hover:underline flex items-center gap-2"
          >
            View All Products <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div
                className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {cat.name}
              </h4>
              <p className="text-gray-500 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Trust Badge Section --- */}
      <section className="bg-gray-50 border-y border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-2xl font-black text-gray-900">Fast</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">
              Delivery
            </p>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">24/7</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">
              Support
            </p>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">Secure</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">
              Payments
            </p>
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">100%</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">
              Original
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
