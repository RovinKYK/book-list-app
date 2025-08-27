import React, { useState, useEffect } from 'react';
import BookService from '../services/BookService';

const BookCard = ({ uuid, onUpdateStatus, onDeleteBook }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await BookService.getBookByUuid(uuid);
        setBook(data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching book with UUID ${uuid}:`, error);
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [uuid]);

  if (loading) {
    return <div className="book-card loading">Loading book details...</div>;
  }

  if (error || !book) {
    return <div className="book-card error">Error: {error || 'Book not found'}</div>;
  }

  const handleStatusChange = () => {
    const newStatus = book.status === 'read' ? 'unread' : 'read';
    onUpdateStatus(uuid, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      onDeleteBook(uuid);
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>By {book.author}</p>
      <p>
        Status: <span className={`book-status status-${book.status}`}>{book.status}</span>
      </p>
      <div className="actions">
        <button onClick={handleStatusChange} className="button-update">
          Mark as {book.status === 'read' ? 'Unread' : 'Read'}
        </button>
        <button onClick={handleDelete} className="button-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
