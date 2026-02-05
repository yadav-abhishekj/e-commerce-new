import { NavLink, useNavigate } from "react-router-dom";
import useCartContext from "../hooks/useCartHook";
import useAuthContext from "../hooks/useAuth";

function Navbar() {
  const { state: cartState } = useCartContext();
  const { state: authState, dispatch: authDispatch } = useAuthContext();
  const navigate = useNavigate();

  // for cart count badge
  const cartCount = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // for using logout function
  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `text-sm ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"}`;
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <NavLink to="/">
          <h3 className="text-xl font-semibold">E-Commerce</h3>
        </NavLink>

        <div className="flex gap-6 items-center">
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>

          <NavLink to="/cart" className="relative">
            <span className={navClass({ isActive: false })}>Cart</span>

            {authState.isAuthenticated && cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* login - logout */}
          {authState.isAuthenticated ? (
            <>
              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
