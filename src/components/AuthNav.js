import React from 'react';
import './AuthNav.css';

const AuthNav = ({ username }) => {
  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  const handleLogout = () => {
    window.location.href = '/auth/logout';
  };

  return (
    <div className="auth-nav">
      {username ? (
        <div className="user-info">
          <span>Welcome, {username}</span>
          <button onClick={handleLogout} className="auth-button logout">Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="auth-button login">Login</button>
      )}
    </div>
  );
};

export default AuthNav;
