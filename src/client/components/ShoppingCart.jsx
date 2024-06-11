import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './CSS/ShoppingCart.css';
import { deleteItemFromUserCart, fetchUserCartItems } from '../API';

const ShoppingCart = ({ token }) => {
  const navigate = useNavigate();

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
        throw error
      }
    }
    getUserCartItems();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
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
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Total: ${totalAmount.toFixed(2)}</h2>
            <button onClick={() => navigate('/checkout')} className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      </>
    );
  } else if (token === null) {
    return (
      <>
        <div className="shopping-cart-container">
          <h1>Shopping Cart</h1>
          <h2>Create an account or log in to add to your cart!</h2>
        </div>
      </>
    );
  }
}

export default ShoppingCart;
