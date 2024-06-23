import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 
const logo = require('../assets/Group.png');

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-user input-icon"></i>
            <input type="text" placeholder="Username" className="login-input" required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock input-icon"></i>
            <input type="password" placeholder="Password" className="login-input" required />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
