import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import AuthNav from './components/AuthNav';
import BookService from './services/BookService';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetchBooks();
    
    // If we're in production and window.configs exists, get the username
    // In Choreo's managed authentication, user info would typically be available
    if (process.env.NODE_ENV === 'production' && window.configs && window.configs.userInfo) {
      setUsername(window.configs.userInfo.username || 'User');
    }
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await BookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      await BookService.addBook(newBook);
      fetchBooks();
      setSuccess('Book added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleUpdateStatus = async (uuid, status) => {
    try {
      await BookService.updateBookStatus(uuid, status);
      fetchBooks();
      setSuccess('Book status updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error updating book status:', error);
      setError('Failed to update book status. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteBook = async (uuid) => {
    try {
      await BookService.deleteBook(uuid);
      fetchBooks();
      setSuccess('Book deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Book List App</h1>
        <p>Manage your reading list with ease</p>
        <AuthNav username={username} />
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <AddBookForm onAddBook={handleAddBook} />

      {loading ? (
        <div className="loading">Loading books...</div>
      ) : (
        <BookList 
          books={books} 
          onUpdateStatus={handleUpdateStatus} 
          onDeleteBook={handleDeleteBook}
        />
      )}
    </div>
  );
}

export default App;
