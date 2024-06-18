import React from 'react';
import { useState, useEffect } from 'react';
import './CSS/Checkout.css';
import { fetchUserCartItems } from '../API';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ token }) => {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getUserCartItems() {
      try {
        const response = await fetchUserCartItems(token);
        console.log(response);
        setCartItems(response);
      } catch (error) {
        throw error
      }
    }
    getUserCartItems();
  }, []);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div className="checkout-container">
        <h1>Checkout</h1>
        <form className="checkout-form">
          <div className="section">
            <h2>Shipping Information</h2>
            <label>
              Full Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Address:
              <input type="text" name="address" required />
            </label>
            <label>
              City:
              <input type="text" name="city" required />
            </label>
            <label>
              State:
              <input type="text" name="state" required />
            </label>
            <label>
              Zip Code:
              <input type="text" name="zip" required />
            </label>
          </div>

          <div className="section">
            <h2>Payment Details</h2>
            <label>
              Card Number:
              <input type="text" name="cardNumber" required />
            </label>
            <label>
              Expiration Date:
              <input type="text" name="expirationDate" required />
            </label>
            <label>
              CVV:
              <input type="text" name="cvv" required />
            </label>
          </div>

          <div className="section">
            <h2>Order Summary</h2>
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <span>{item.title}</span>
                  <span>{item.quantity} x</span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="total">
              <h2>Total: ${totalAmount.toFixed(2)}</h2>
            </div>
          </div>

          <button onClick={() => navigate('/success')} type="submit">Place Order</button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
