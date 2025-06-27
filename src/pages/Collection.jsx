import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Collection() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const API_URL = "https://clothzy-backend.onrender.com/api/products";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data;
        const fetched = Array.isArray(data) ? data : data.products || [];
        setProducts(fetched);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (cat) => setCategory(cat);
  const handleSortChange = (e) => setSortOrder(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const filtered = products
    .filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.name.toLowerCase().includes(search)
    )
    .sort((a, b) =>
      sortOrder === "low"
        ? a.price - b.price
        : sortOrder === "high"
        ? b.price - a.price
        : 0
    );

  return (
    <>
      <div className="container collection-page">
        <h2 className="section-title">🛍 Explore Our Collection</h2>

        {/* Filter Bar */}
        <div
          className="filter-bar"
          style={{
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Categories */}
          <div className="categories" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["all", "men", "women", "kids"].map((cat) => (
              <button
                key={cat}
                className={`btn ${category === cat ? "active" : ""}`}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  backgroundColor: category === cat ? "#0d6efd" : "#e9ecef",
                  color: category === cat ? "#fff" : "#333",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 14px",
                  fontWeight: "500",
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort and Search */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <select
              onChange={handleSortChange}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
            >
              <option value="">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <input
              type="text"
              placeholder="🔍 Search products"
              onChange={handleSearchChange}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />
          </div>
        </div>

        {/* Products */}
        <div className="product-grid">
          {loading ? (
            <p style={{ textAlign: "center", padding: "2rem" }}>Loading products...</p>
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <div key={product._id} className="product-card-wrapper">
                <ProductCard product={product} onAdd={addToCart} />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>
              No products match your search/filter.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
