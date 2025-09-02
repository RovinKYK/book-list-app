import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  const [apiInfo, setApiInfo] = useState({
    isConnected: false,
    apiUrl: process.env.REACT_APP_API_URL || '(Not connected)'
  });

  useEffect(() => {
    // This will be updated with actual connection check when deployed on Choreo
    const checkConnection = async () => {
      const connected = !!process.env.REACT_APP_API_URL;
      setApiInfo({
        isConnected: connected,
        apiUrl: process.env.REACT_APP_API_URL || '(Not connected)'
      });
    };

    checkConnection();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container mt-4">
          {!apiInfo.isConnected && (
            <div className="alert alert-warning" role="alert">
              <strong>Development Mode</strong>: Not connected to book-list-service. 
              API calls will be directed to {process.env.REACT_APP_API_URL || 'http://localhost:8080'}
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
