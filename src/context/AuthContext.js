import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

// Create authentication context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check for authentication status
  const checkAuth = () => {
    setLoading(true);
    
    // First, try to get user from localStorage (if previously stored)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Then check for the short-lived userinfo cookie from Choreo
    const encodedUserInfo = Cookies.get('userinfo');
    if (encodedUserInfo) {
      try {
        // Decode and parse the base64 encoded user info
        const userInfo = JSON.parse(atob(encodedUserInfo));
        
        // Store user info in state and localStorage
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // Clear the cookie (important as it expires in 2 minutes)
        Cookies.remove('userinfo', { path: '/' });
      } catch (error) {
        console.error('Error parsing userinfo cookie:', error);
      }
    }
    
    setLoading(false);
  };

  // Login function - redirects to Choreo's login endpoint
  const login = () => {
    window.location.href = "/auth/login";
  };

  // Logout function - clears session and redirects
  const logout = () => {
    // Clear stored user data
    localStorage.removeItem('user');
    setUser(null);
    
    // Get session hint for proper logout
    const sessionHint = Cookies.get('session_hint');
    window.location.href = '/auth/logout' + (sessionHint ? '?session_hint=' + sessionHint : '');
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
