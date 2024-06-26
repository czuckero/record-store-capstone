import React from 'react';
import './CSS/Success.css';
import { useNavigate } from 'react-router-dom';

const Success = ({ purchasedItems, totalCost }) => {
  const navigate = useNavigate();
  
  return (
    <div className="success-container">
      <h1>Purchase Successful!</h1>
      <p>Thank you for your purchase. Here is a summary of your order:</p>
      <ul className="purchased-items">
        {purchasedItems.map((item, index) => (
          <li key={index} className="purchased-item">
            <span>{item.title}</span>
            <span>{item.artist}</span>
            <span>x{item.quantity}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
      <div className="total-cost">
        <h2>Total Cost: {totalCost}</h2>
      </div>
      <button className="continue-shopping-button" onClick={() => navigate('/home')}>Continue Shopping</button>
    </div>
  );
};

export default Success;

