import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function Navbar() {
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="navbar">
      <div className="navbar-brand">Clothzy</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>         
        <li><Link to="/collection">Collection</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/profile">Profile</Link></li>

          <li>
          <Link to="/cart">
            Cart {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

/*                */



