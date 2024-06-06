import React, { useState } from 'react';
import './CSS/Login.css';
import { login } from '../API';
import { useNavigate } from 'react-router-dom';


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await login(userData);
      console.log(response);
      setMessage(response.message)
      setToken(response.token)
      if (response.message === 'Login successful!') { 
        navigate('/account')
      }
    } catch (error) {
      throw error
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;

