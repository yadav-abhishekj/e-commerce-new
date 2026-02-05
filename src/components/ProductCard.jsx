import useCartContext from "../hooks/useCartHook";

function ProductCard({ product }) {
  const { dispatch } = useCartContext();

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <div className="bg-[#d5f6fc] w-150 p-12 border bottom-0 border-blue-300 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-900 mb-1.5 font-semibold">
        Price: ₹{product.price}
      </p>
      <p className="text-black">{product.description}</p>
      <p className="text-gray-500">{product.category}</p>

      <div className="mt-2 flex items-center justify-center">
        <img
          className="w-full min-h-20 max-h-60 object-cover rounded-3xl"
          src={product.image}
          alt={product.name}
        />
      </div>
      <button
        onClick={addToCart}
        className="mt-3 bg-[#ffc155] hover:bg-[#e7a638] text-white px-4 py-2 rounded-3xl"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
