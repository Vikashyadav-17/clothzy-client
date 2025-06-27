import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = "https://clothzy-backend.onrender.com"; // hardcoded for deployment

export default function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartTotal,
    setCartItems,
  } = useCart();

  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch {
        localStorage.removeItem("token");
        setUserId(null);
      }
    }
  }, []);

  const handleCheckout = () => {
    if (!userId) {
      alert("Please login or register to place an order.");
      navigate("/profile");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        `${API_BASE}/api/orders`,
        { userId, items: cartItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("✅ Your cart was saved successfully!");
        setCartItems([]);
      })
      .catch((err) => {
        console.error("❌ Checkout error:", err);
        alert("❌ Failed to save your cart.");
      });
  };

  return (
    <>
      <div className="container cart-page">
        <h2>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQty(item._id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item._id)}>+</button>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <h3>Total: ₹{cartTotal}</h3>
              <button className="btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
