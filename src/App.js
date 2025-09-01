import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navigation from './components/Navigation';

// Pages
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
