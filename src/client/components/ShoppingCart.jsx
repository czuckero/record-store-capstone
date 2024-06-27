import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './CSS/ShoppingCart.css';
import { deleteItemFromUserCart, fetchUserCartItems, updateCartItemQuantity } from '../API';

const ShoppingCart = ({ token }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const [cartItems, setCartItems] = useState([
    // { id: 1, name: 'Album A', price: 40.00, quantity: 1 },
    // { id: 2, name: 'Album B', price: 35.00, quantity: 2 },
    // { id: 3, name: 'Album C', price: 45.00, quantity: 1 },
  ]);

  useEffect(() => {
    async function getUserCartItems() {
      try {
        const response = await fetchUserCartItems(token);
        console.log(response);

        setCartItems(response);
      } catch (error) {
        throw error;
      }
    }
    getUserCartItems();
  }, []);

  const handleQuantityChange = async (record_id, quantity, price) => {
    try {
      await updateCartItemQuantity(token, record_id, quantity, price);
      setCartItems(cartItems.map(item => item.id === record_id ? { ...item, quantity, price } : item));
    } catch (error) {
      throw error
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await deleteItemFromUserCart(token, cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
      console.log(cartItemId, "item deleted");
    } catch (error) {
      throw error
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout')
    } else {
      setMessage("Your cart is empty.")
    }
  }

  if (token) {
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
      <>
        <div className="shopping-cart-container">
          <h1>Shopping Cart</h1>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>${parseFloat(item.price).toFixed(2)}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value), item.price)}
                />
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Total: ${totalAmount.toFixed(2)}</h2>
            <button onClick={() => handleCheckout()} className="checkout-button">Proceed to Checkout</button>
            {message && <h3>{message}</h3>}
          </div>
        </div>
      </>
    );
  } else if (token === null) {
    return (
      <>
        <div className="shopping-cart-container">
          <h1>Shopping Cart</h1>
          <h3>{' '}
              <span onClick={() => navigate('/register')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Create an account
              </span>{' '}
              <span>or </span>
              <span onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              log in
              </span>{' '}
              to add items to your cart!
            </h3>
        </div>
      </>
    );
  }
}

export default ShoppingCart;
