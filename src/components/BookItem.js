import React from 'react';
import './BookItem.css';

function BookItem({ book, onUpdateStatus, onDeleteBook }) {
  const handleStatusChange = (e) => {
    onUpdateStatus(book.uuid, e.target.value);
  };
  
  return (
    <div className="book-item">
      <h4 className="book-title">{book.title}</h4>
      <p className="book-author">by {book.author}</p>
      
      <div className="book-actions">
        <div className="status-select-container">
          <label htmlFor={`status-${book.uuid}`}>Status:</label>
          <select 
            id={`status-${book.uuid}`}
            value={book.status} 
            onChange={handleStatusChange}
            className={`status-select status-${book.status}`}
          >
            <option value="unread">Unread</option>
            <option value="reading">Currently Reading</option>
            <option value="read">Completed</option>
          </select>
        </div>
        
        <button 
          className="delete-btn" 
          onClick={() => onDeleteBook(book.uuid)}
          aria-label="Delete book"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookItem;
