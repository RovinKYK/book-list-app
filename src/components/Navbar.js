import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Check for user info on component mount
  useEffect(() => {
    // Check for userinfo cookie (used by Choreo managed authentication)
    const encodedUserInfo = Cookies.get('userinfo');
    if (encodedUserInfo) {
      try {
        const userInfo = JSON.parse(atob(encodedUserInfo));
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // Clear the short-lived cookie after reading (important)
        Cookies.remove('userinfo', { path: '/' });
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    } else {
      // Check if we have a user in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing stored user info:', error);
        }
      }
    }
  }, []);

  const handleLogin = () => {
    // Redirect to Choreo managed auth login endpoint
    window.location.href = '/auth/login';
  };

  const handleLogout = () => {
    // Clear user data
    setUser(null);
    localStorage.removeItem('user');
    
    // Redirect to logout with session hint
    const sessionHint = Cookies.get('session_hint');
    window.location.href = '/auth/logout' + (sessionHint ? '?session_hint=' + sessionHint : '');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-book me-2"></i>
          Book List App
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add Book</Link>
            </li>
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.given_name || user.preferred_username || 'User'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light my-1" onClick={handleLogin}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
