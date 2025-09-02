import React from 'react';
import { BookWithUUID } from '../types/Book';
import './BookCard.css';

interface BookCardProps {
  book: BookWithUUID;
  onStatusChange: (uuid: string, status: string) => void;
  onDelete: (uuid: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onStatusChange, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read':
        return '#4caf50';
      case 'reading':
        return '#ff9800';
      case 'to-read':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'read':
        return '✓';
      case 'reading':
        return '📖';
      case 'to-read':
        return '📚';
      default:
        return '❓';
    }
  };

  return (
    <div className="book-card">
      <div className="book-card-header">
        <div className="book-status-badge" style={{ backgroundColor: getStatusColor(book.status) }}>
          <span className="status-icon">{getStatusIcon(book.status)}</span>
          <span className="status-text">{book.status.replace('-', ' ')}</span>
        </div>
        <button 
          className="delete-button"
          onClick={() => onDelete(book.uuid)}
          title="Delete book"
        >
          🗑️
        </button>
      </div>
      
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
      </div>
      
      <div className="book-actions">
        <select
          value={book.status}
          onChange={(e) => onStatusChange(book.uuid, e.target.value)}
          className="status-select"
        >
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
      </div>
    </div>
  );
};

export default BookCard;
