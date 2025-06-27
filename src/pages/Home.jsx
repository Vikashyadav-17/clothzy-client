import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [email, setEmail] = useState("");

  // ✅ Hardcoded Backend URL
  const API_URL = "https://clothzy-backend.onrender.com/api/products";

  // ✅ Fetch featured products
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log("📦 Products fetched:", res.data);

        // Ensure it's an array
        const all = Array.isArray(res.data) ? res.data : [];
        const featured = all.slice(0, 6); // Take top 6 products
        setFeaturedProducts(featured);
      })
      .catch((err) => {
        console.error("❌ Failed to load products", err);
        setFeaturedProducts([]);
      });
  }, []);

  const handleSubscribe = () => {
    if (!email) {
      alert("❌ Please enter your email address.");
      return;
    }
    alert(`✅ Subscribed successfully with: ${email}`);
    setEmail("");
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="hero-banner">
        <img src="/banner-hero.jpeg" alt="Clothzy Banner" className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>
              Welcome to <span className="brand">Clothzy</span>
            </h1>
            <p>Explore the latest styles and trends.</p>
            <button className="btn" onClick={() => navigate("/collection")}>
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Category Cards */}
        <section className="category-section">
          <h2>🛍 Shop by Category</h2>
          <div className="category-cards">
            {["men", "women", "kids"].map((cat) => (
              <div
                className="category-card"
                key={cat}
                onClick={() => navigate(`/collection?category=${cat}`)}
              >
                <img src={`/${cat}.jpg`} alt={cat} />
                <p>{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <h2 className="section-title">✨ Featured Products</h2>
        <div className="product-grid">
          {Array.isArray(featuredProducts) && featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={() => alert(`Added ${product.name} to cart`)}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "1rem" }}>
              No featured products available.
            </p>
          )}
        </div>

        {/* Promotions */}
        <div className="promotions">
          <div className="promo-card">🔥 50% OFF on T-Shirts!</div>
          <div className="promo-card">🚚 Free Shipping on orders above ₹999</div>
          <div className="promo-card">💳 COD Available on All Orders</div>
        </div>

        {/* Newsletter */}
        <div className="newsletter">
          <h3>📬 Subscribe to Our Newsletter</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn" onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
