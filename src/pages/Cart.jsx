import { useModal } from "../context/ModalContext";
import useCartContext from "../hooks/useCartHook";
import { Link } from "react-router-dom";

function Cart() {
  const { state, dispatch } = useCartContext();
  const { openModal } = useModal();

  if (state.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <svg
            className="h-20 w-20 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              // Fixed path: centered and contained within the 24x24 box
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="mt-2 text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* List of Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center hover:border hover:bg-blue-100 hover:border-blue-600 hover:shadow-md transition-colors "
              >
                <div className="w-34 h-34 bg-gray-50 rounded-xl shrink p-2 ">
                  <img
                    className="w-full h-full object-contain "
                    src={item.images[0].url}
                    alt={item.name}
                  />
                </div>

                <div className="grow">
                  <h4 className="font-bold text-gray-800 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="font-black text-blue-600">₹{item.price}</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center bg-white rounded-lg p-1">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item._id,
                        })
                      }
                      className="text-gray-500 hover:text-white hover:bg-red-600 transition rounded-md p-2 flex items-center justify-center mr-1.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QUANTITY",
                          payload: item._id,
                        })
                      }
                      className="w-10 h-10 flex items-center justify-center p-2  hover:bg-blue-600 hover:text-white rounded-md transition"
                    >
                      −
                    </button>
                    <span className="px-5 font-bold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({ type: "ADD_ITEM", payload: item })
                      }
                      className="w-10 h-10 flex items-center justify-center p-2 hover:bg-blue-600 hover:text-white rounded-md transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Order Summary
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-blue-600">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                openModal({
                  title: "Checkout Coming Soon 🚀",
                  message:
                    "Razorpay integration and backend order APIs are currently under development.",
                  primaryText: "Got it",
                })
              }
              className="w-full mt-8 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg shadow-gray-200 scale-100 hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
