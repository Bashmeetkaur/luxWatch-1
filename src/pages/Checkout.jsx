import { useState } from 'react';
//import { useCart } from '../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
 // const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAmount, itemPrice, watchName, watchImage, quantity , shipping ,finalAmount} = location.state || { totalAmount: 0, itemPrice: 0, watchName: '', watchImage: '', quantity: 0 , shipping: 0 , finalAmount: 0};
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="total">
            <h3>Total: ${totalAmount}</h3>
            <p>Item Price: ${itemPrice}</p>
            <p>Quantity: {quantity}</p>
            <p>Shipping Charges applied : {shipping}</p>
            <p>Final Amount: {finalAmount}</p>
          </div>
        </div>

        <div className="selected-watch">

          <h2>Selected Watch</h2>
          <img src={watchImage} alt={watchName} style={{ width: '100px', height: 'auto' }} />
          <p>{watchName}</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
  <h2>Shipping Information</h2>
  <div className="form-group">
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={formData.firstName}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={handleInputChange}
      required
    />
  </div>
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleInputChange}
    required
  />
  <input
    type="text"
    name="address"
    placeholder="Address"
    value={formData.address}
    onChange={handleInputChange}
    required
  />
  <div className="form-group">
    <input
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="zipCode"
      placeholder="ZIP Code"
      value={formData.zipCode}
      onChange={handleInputChange}
      required
    />
  </div>
  <h2>Payment Information</h2>
  <input
    type="text"
    name="cardNumber"
    placeholder="Card Number"
    value={formData.cardNumber}
    onChange={handleInputChange}
    required
  />
  <div className="form-group">
    <input
      type="text"
      name="expiryDate"
      placeholder="MM/YY"
      value={formData.expiryDate}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="cvv"
      placeholder="CVV"
      value={formData.cvv}
      onChange={handleInputChange}
      required
    />
  </div>
  <button type="submit" className="submit-button">
    Place Order
  </button>
</form>

      </div>
    </div>
  );
}

export default Checkout;