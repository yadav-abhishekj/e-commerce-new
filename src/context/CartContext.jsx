import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? { items: JSON.parse(storedCart) } : { items: [] };
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id,
        );
        if (existingItem) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "DECREASE_QUANTITY": {
      const item = state.items.find((item) => item.id === action.payload);

      if (item.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCart); // lazy initialization by passing undefined as initialArg
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
