import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWatchById } from "../services/api";

const WatchDetail = () => {
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchDetails = async () => {
      try {
        const data = await getWatchById(id);
        setWatch(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchDetails();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!watch) return <div>Watch not found</div>;

  const handleGoToCart = () => {
    navigate("/Checkout", {
      state: {
        itemPrice: watch.price,
        watchName: watch.title,
        watchImage: watch.images[0],
        quantity: quantity,
        shipping: watch.shipping.charges,
        totalAmount: watch.price * quantity + watch.shipping.charges,
        finalAmount: watch.price * quantity + watch.shipping.charges,
      },
    });
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div className="watch-images" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {watch.images.map((image, index) => (
            <img key={index} src={image} alt={`${watch.title} - View ${index + 1}`} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
          ))}
        </div>

        <div className="watch-info" style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#1a1a1a" }}>{watch.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "2rem", color: "#2c2c2c" }}>₹{watch.price}</h2>
            {watch.discount > 0 && (
              <p style={{ backgroundColor: "#ff4444", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "1.1rem" }}>
                {watch.discount}% OFF
              </p>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <button onClick={decreaseQuantity} style={{ padding: "10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                -
              </button>
              <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{quantity}</span>
              <button onClick={increaseQuantity} style={{ padding: "10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                +
              </button>
              <br></br>
              <button onClick={handleGoToCart} style={{ display: "inline-block", marginTop: "20px", padding: "10px 20px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold", textAlign: "center" }}>
              Go to Cart (₹{watch.price * quantity})
            </button>              
            </div>
          </div>
          <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
            <strong>Brand:</strong> {watch.brand}
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "30px", color: "#444" }}>{watch.description}</p>

          <div className="technical-specs" style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Technical Specifications</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Dial Size:</strong> {watch.technical_specs.dial_size}
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Strap Material:</strong> {watch.technical_specs.strap_material}
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Water Resistance:</strong> {watch.technical_specs.water_resistance}
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Movement Type:</strong> {watch.technical_specs.movement_type}
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Battery Life:</strong> {watch.technical_specs.battery_life}
              </li>
            </ul>

            <h4 style={{ fontSize: "1.3rem", marginTop: "20px", marginBottom: "15px" }}>Features</h4>
            <ul style={{ paddingLeft: "20px" }}>
              {watch.technical_specs.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="additional-info" style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
            <p style={{ marginBottom: "8px" }}>
              <strong>SKU:</strong> {watch.sku}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Manufacturer:</strong> {watch.manufacturer}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Country of Origin:</strong> {watch.country_of_origin}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Warranty:</strong> {watch.warranty_period}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Rating:</strong> {watch.rating} / 5
            </p>
            <p>
              <strong>Stock:</strong> {watch.inventory.quantity_in_stock} units
            </p>
          </div>

          <div className="shipping-info" style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "15px" }}>Shipping Information</h3>
            <p style={{ marginBottom: "8px" }}>
              <strong>Delivery Time:</strong> {watch.shipping.delivery_time}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Shipping Charge:</strong> ₹{watch.shipping.charges}
            </p>
            <p>
              <strong>Available Options:</strong> {watch.shipping.options.join(", ")}
            </p>
          </div>

          {watch.reviews.length > 0 && (
            <div className="reviews">
              <h3 style={{ fontSize: "1.3rem", marginBottom: "20px" }}>Customer Reviews</h3>
              {watch.reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
                  <p style={{ fontWeight: "600", marginBottom: "8px" }}>{review.user_name}</p>
                  <p style={{ color: "#666", marginBottom: "8px" }}>Rating: {review.rating}/5</p>
                  <p style={{ lineHeight: "1.5" }}>{review.user_comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchDetail;