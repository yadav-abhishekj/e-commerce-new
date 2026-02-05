import useCartContext from "../hooks/useCartHook";

function Cart() {
  const { state, dispatch } = useCartContext();
  if (state.items.length === 0) {
    return (
      <div className="p-6 text-center" draggable="true">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <svg
          className="mx-auto mt-4 h-44 w-44 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="mt-2 text-gray-600">Add some products to your cart.</p>
      </div>
    );
  }

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4  rounded-2xl"
          >
            <div className="flex gap-4 items-start">
              <div className="rounded-2xl overflow-hidden w-80 h-80">
                <img
                  className="w-80 h-80 object-cover rounded"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <h4 className="font-extrabold inline-block">{item.name}</h4>
              <p className="text-sm text-gray-600 inline-block">
                ₹ {item.price} × {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch({
                    type: "ADD_ITEM",
                    payload: item,
                  })
                }
                className="px-2 border rounded"
              >
                +
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "DECREASE_QUANTITY",
                    payload: item.id,
                  })
                }
                className="px-2 border rounded"
              >
                −
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item.id,
                  })
                }
                className="text-red-600 text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-lg font-semibold">Total: ₹ {total}</h3>
      </div>
    </div>
  );
}
export default Cart;
