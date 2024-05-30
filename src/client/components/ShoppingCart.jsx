import React, { useState } from 'react';
import './CSS/ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Album A', price: 40.00, quantity: 1 },
    { id: 2, name: 'Album B', price: 35.00, quantity: 2 },
    { id: 3, name: 'Album C', price: 45.00, quantity: 1 },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div className="shopping-cart-container">
        <h1>Shopping Cart</h1>
        <ul className="cart-items">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
