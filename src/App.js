import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { getAllBooks, addBook, updateBookStatus, deleteBook } from './services/bookService';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const bookList = await getAllBooks();
      setBooks(bookList);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      await addBook(newBook);
      fetchBooks();
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
    }
  };

  const handleUpdateStatus = async (uuid, status) => {
    try {
      await updateBookStatus(uuid, status);
      fetchBooks();
    } catch (err) {
      console.error('Error updating book status:', err);
      setError('Failed to update book status. Please try again.');
    }
  };

  const handleDeleteBook = async (uuid) => {
    try {
      await deleteBook(uuid);
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book List App</h1>
        <p>Keep track of your reading list</p>
      </header>
      
      <main className="App-main">
        <section className="book-form-section">
          <h2>Add New Book</h2>
          <BookForm onAddBook={handleAddBook} />
        </section>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}
        
        <section className="book-list-section">
          <h2>Your Books</h2>
          {loading ? (
            <p>Loading books...</p>
          ) : books.length > 0 ? (
            <BookList 
              books={books} 
              onUpdateStatus={handleUpdateStatus}
              onDeleteBook={handleDeleteBook}
            />
          ) : (
            <p>No books found. Add your first book above!</p>
          )}
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2025 Book List App - Powered by Choreo</p>
      </footer>
    </div>
  );
}

export default App;
