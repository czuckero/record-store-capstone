import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import './CSS/Footer.css';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="newsletter">
        <label>Sign up for our newsletter:</label>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
      <div className="footer-links">
        <a onClick={() => navigate('/about')}>About Us</a>
      </div>
    </footer>
  );
}

export default Footer;
