import { NavLink, useNavigate } from "react-router-dom";
import useCartContext from "../hooks/useCartHook";
import useAuthContext from "../hooks/useAuth";

function Navbar() {
  const { state: cartState } = useCartContext();
  const { state: authState, dispatch: authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const cartCount = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `relative py-2 transition-all duration-300 ${
      isActive
        ? "text-blue-600 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
        : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-9999 border-b border-gray-400">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <NavLink to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">
            E
          </div>
          <h3 className="text-xl font-black tracking-tighter text-gray-900">
            STORE
          </h3>
        </NavLink>

        {/* Center Links */}
        <div className="hidden sm:flex gap-8 items-center text-sm font-medium">
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/users" className={navClass}>
            Directory
          </NavLink>
        </div>

        {/* Action Icons */}
        <div className="flex gap-5 items-center">
          <NavLink
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition"
          >
            <svg
              className="w-6 h-6 text-gray-700"
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
            {authState.isAuthenticated && cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                {cartCount}
              </span>
            )}
          </NavLink>

          {authState.isAuthenticated ? (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <NavLink
                to="/profile"
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${authState.user?.name.firstname}+${authState.user?.name.lastname}&background=random`}
                  alt="profile"
                />
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
