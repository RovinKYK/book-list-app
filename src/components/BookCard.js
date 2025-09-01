import React from 'react';

const BookCard = ({ book, onUpdateStatus, onDeleteBook }) => {
  if (!book) {
    return <div className="book-card error">Error: Book data is missing</div>;
  }

  const getNextStatus = (currentStatus) => {
    // Cycle through the three possible statuses
    switch (currentStatus) {
      case 'read':
        return 'to_read';
      case 'to_read':
        return 'reading';
      case 'reading':
        return 'read';
      default:
        return 'to_read';
    }
  };

  const handleStatusChange = () => {
    const newStatus = getNextStatus(book.status);
    onUpdateStatus(book.uuid, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      onDeleteBook(book.uuid);
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>By {book.author}</p>
      <p>
        Status: <span className={`book-status status-${book.status}`}>{book.status.replace('_', ' ')}</span>
      </p>
      <div className="actions">
        <button onClick={handleStatusChange} className="button-update">
          Mark as {getNextStatus(book.status).replace('_', ' ')}
        </button>
        <button onClick={handleDelete} className="button-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
