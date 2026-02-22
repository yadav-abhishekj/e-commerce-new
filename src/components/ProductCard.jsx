import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartContext from "../hooks/useCartHook";

function ProductCard({ product }) {
  const { dispatch } = useCartContext();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const addToCart = (e) => {
    e.stopPropagation(); // prevent navigation
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const navigateToProductDetails = () => {
    setIsNavigating(true);

    // small delay for smooth UX feedback
    setTimeout(() => {
      navigate(`/products/${product._id}`);
    }, 200);
  };

  return (
    <div
      onClick={navigateToProductDetails}
      className="
      relative group rounded-3xl border hover:border-2  border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer
      "
    >
      {/* Navigation Overlay */}
      {isNavigating && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Glow Accent */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Image Section */}
      <div className="relative p-8 bg-gray-50 flex items-center justify-center h-64 overflow-hidden">
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
          className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow relative z-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
          {product.category}
        </span>

        <h3 className="text-gray-900 font-bold text-lg leading-tight mb-2 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-6 grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-gray-400 block font-medium uppercase tracking-wide">
              Price
            </span>
            <span className="text-2xl font-black text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={addToCart}
            className="bg-gray-900 hover:bg-blue-600 text-white p-3 rounded-2xl transition-all duration-300 shadow-lg shadow-gray-200 flex items-center justify-center group-hover:scale-105"
            title="Add to Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
