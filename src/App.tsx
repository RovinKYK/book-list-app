import React, { useState, useEffect } from 'react';
import { BookWithUUID, Book } from './types/Book';
import { bookService } from './services/BookService';
import BookCard from './components/BookCard';
import AddBookForm from './components/AddBookForm';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [books, setBooks] = useState<BookWithUUID[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    checkConnection();
    loadBooks();
  }, []);

  const checkConnection = async () => {
    try {
      const isHealthy = await bookService.healthCheck();
      setConnectionStatus(isHealthy ? 'connected' : 'disconnected');
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBooks = await bookService.getAllBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (book: Book) => {
    try {
      setActionLoading(true);
      setError(null);
      await bookService.addBook(book);
      await loadBooks(); // Refresh the list
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add book');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusChange = async (uuid: string, status: string) => {
    try {
      setError(null);
      await bookService.updateBookStatus(uuid, status);
      // Update local state immediately for better UX
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.uuid === uuid ? { ...book, status: status as 'read' | 'reading' | 'to-read' } : book
        )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update book status');
      // Reload books to revert the change
      await loadBooks();
    }
  };

  const handleDeleteBook = async (uuid: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      setError(null);
      await bookService.deleteBook(uuid);
      // Remove from local state immediately
      setBooks(prevBooks => prevBooks.filter(book => book.uuid !== uuid));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete book');
      // Reload books to revert the change
      await loadBooks();
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#4caf50';
      case 'disconnected': return '#f44336';
      case 'checking': return '#ff9800';
      default: return '#757575';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected to Book Service';
      case 'disconnected': return 'Disconnected from Book Service';
      case 'checking': return 'Checking connection...';
      default: return 'Unknown status';
    }
  };

  const filterBooksByStatus = (status: string) => {
    return books.filter(book => book.status === status);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">📚 My Book List</h1>
        <div className="connection-status" style={{ color: getConnectionStatusColor() }}>
          <span className="status-indicator" style={{ backgroundColor: getConnectionStatusColor() }}></span>
          {getConnectionStatusText()}
        </div>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
            <button className="retry-button" onClick={loadBooks}>
              🔄 Retry
            </button>
          </div>
        )}

        <div className="controls-section">
          <AddBookForm onAddBook={handleAddBook} isLoading={actionLoading} />
        </div>

        {loading ? (
          <LoadingSpinner message="Loading your book collection..." />
        ) : (
          <div className="books-section">
            {books.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📖</div>
                <h2>No books in your collection yet</h2>
                <p>Add your first book to get started!</p>
              </div>
            ) : (
              <>
                <div className="books-stats">
                  <div className="stat-card">
                    <span className="stat-number">{books.length}</span>
                    <span className="stat-label">Total Books</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{filterBooksByStatus('read').length}</span>
                    <span className="stat-label">Read</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{filterBooksByStatus('reading').length}</span>
                    <span className="stat-label">Reading</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{filterBooksByStatus('to-read').length}</span>
                    <span className="stat-label">To Read</span>
                  </div>
                </div>

                <div className="books-grid">
                  {books.map((book) => (
                    <BookCard
                      key={book.uuid}
                      book={book}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteBook}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
