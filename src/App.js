import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetail from './components/BookDetail';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Navigation component with auth controls
const Navigation = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Book List App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Book</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {user.given_name || user.name || 'User'}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={login}>Login</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navigation />
      
      <div className="container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          } />
          <Route path="/book/:uuid" element={
            <ProtectedRoute>
              <BookDetail />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      <footer className="bg-light text-center text-muted py-3 mt-5">
        <div className="container">
          <p>Book List App &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
    </AuthProvider>
  );
}

export default App;
