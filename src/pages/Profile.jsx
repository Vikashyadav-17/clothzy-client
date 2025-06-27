import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // ✅ Decode JWT and fetch orders
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        fetchOrders(decoded.id);
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  // ✅ Get orders from backend
  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`https://clothzy-backend.onrender.com/api/orders/${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
    setMessage("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isLogin ? { email: form.email, password: form.password } : form;
    const endpoint = isLogin ? "/api/login" : "/api/register";

    try {
      const res = await axios.post(`https://clothzy-backend.onrender.com${endpoint}`, payload);
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setMessage(`${isLogin ? "Login" : "Registration"} successful!`);
      fetchOrders(decoded.id);
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong.";
      setMessage("❌ " + msg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setOrders([]);
    setMessage("Logged out successfully.");
  };

  return (
    <>
      <div className="container profile-container">
        {user ? (
          <div className="profile-box">
            <h2>👋 Welcome to Clothzy, {user.name}</h2>
            <p>{user.email}</p>
            <button className="btn" onClick={handleLogout}>Logout</button>
            {message && <p className="msg">{message}</p>}

            {/* ✅ My Orders */}
            <div style={{ marginTop: "30px" }}>
              <h3>🛒 My Orders</h3>
              {orders.length === 0 ? (
                <p>No saved carts yet.</p>
              ) : (
                <ul style={{ paddingLeft: "0" }}>
                  {orders.map((order, idx) => (
                    <li
                      key={idx}
                      style={{
                        background: "#f9f9f9",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        marginBottom: "15px",
                        padding: "15px",
                        listStyle: "none"
                      }}
                    >
                      <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()} <br />
                      <strong>Items:</strong> {order.items.map(i => i.name).join(", ")} <br />
                      <strong>Total:</strong> ₹
                      {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="profile-grid">
            <div className="profile-left">
              <h2>{isLogin ? "Login to Clothzy" : "Register for Clothzy"}</h2>
              <form className="profile-form" onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button className="btn" type="submit">
                  {isLogin ? "Login" : "Register"}
                </button>
                {message && <p className="msg">{message}</p>}
              </form>
              <p>
                {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
                <button
                  onClick={toggleMode}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0d6efd",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {isLogin ? "Register here" : "Login here"}
                </button>
              </p>
            </div>

            <div className="profile-right">
              <img
                src="/welcome.png"
                alt="Clothzy illustration"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
