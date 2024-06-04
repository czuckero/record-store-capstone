import React, { useState } from 'react';
import './CSS/Registration.css';
import { registerUser } from '../API';
import { useNavigate } from 'react-router-dom';

const Registration = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setToken(response.token);
      console.log(response.token);
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log('Form data submitted:', formData);
      if (response.token !== null) {
        navigate('/account');
      }
    } catch (error) {
      throw error
    }
    // Add form submission logic here
  };

  return (
    <>
      <div className="registration-container">
        <h1>Sign Up</h1>
        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Registration;
