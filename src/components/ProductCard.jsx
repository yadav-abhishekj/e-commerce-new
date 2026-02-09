import useCartContext from "../hooks/useCartHook";

function ProductCard({ product }) {
  const { dispatch } = useCartContext();

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <div className="group bg-white flex flex-col rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Image Container with fixed Aspect Ratio */}
      <div className="p-6 bg-gray-50 flex items-center justify-center h-64 overflow-hidden">
        <img
          className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
          src={product.image}
          alt={product.title}
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
          {product.category}
        </span>

        <h3 className="text-gray-800 font-bold text-lg leading-tight mb-2 line-clamp-1 transition-all cursor-default">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-sm text-gray-400 block font-medium">
              Price
            </span>
            <span className="text-2xl font-black text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={addToCart}
            className="bg-gray-900 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors duration-300 shadow-lg shadow-gray-200"
            title="Add to Cart"
          >
            {/* Adding a simple "+" icon visual */}
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
