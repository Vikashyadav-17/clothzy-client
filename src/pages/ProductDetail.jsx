import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    axios
      .get(`https://clothzy-backend.onrender.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.image);
      })
      .catch((err) => console.error("❌ Failed to load product", err));
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading Product...</h2>
        <p>Please wait while we fetch the product details.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container product-detail">
        {/* Image Gallery */}
        <div className="gallery">
          <img
            className="main-image"
            src={mainImage}
            alt={`${product.name} - Preview`}
          />
          <div className="thumbnails">
            <img
              src={product.image}
              alt={`${product.name} - Thumbnail`}
              onClick={() => setMainImage(product.image)}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="info">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          <p>{product.description || "This product does not have a description yet."}</p>
          <button className="btn" onClick={() => addToCart(product)}>
            🛒 Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
