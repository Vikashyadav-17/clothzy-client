import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>

      <div className="button-group">
        <button className="btn" onClick={() => onAdd(product)}>
          Add to Cart
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate(`/product/${product.id || product._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
