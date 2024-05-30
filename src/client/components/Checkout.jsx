import React from 'react';
import './CSS/Checkout.css';

const Checkout = () => {
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
            <ul className="order-summary">
              <li>Album A - $40.00</li>
              <li>Album B - $35.00</li>
              <li>Album C - $45.00</li>
            </ul>
            <p className="total">Total: $120.00</p>
          </div>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
