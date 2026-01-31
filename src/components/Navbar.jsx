import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav draggable={true}>
        <NavLink to="/">Home</NavLink> | <NavLink to="/login">Login</NavLink> |
        <NavLink to="/register">Register</NavLink> |
        <NavLink to="/products">Products</NavLink> |{" "}
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </>
  );
}

export default Navbar;
