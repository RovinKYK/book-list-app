import React from 'react';
import BookItem from './BookItem';
import './BookList.css';

function BookList({ books, onUpdateStatus, onDeleteBook }) {
  // Group books by status
  const unreadBooks = books.filter(book => book.status === 'unread');
  const readingBooks = books.filter(book => book.status === 'reading');
  const readBooks = books.filter(book => book.status === 'read');
  
  return (
    <div className="book-list-container">
      <div className="book-status-section">
        <h3>Unread ({unreadBooks.length})</h3>
        {unreadBooks.length > 0 ? (
          <div className="book-list">
            {unreadBooks.map(book => (
              <BookItem
                key={book.uuid}
                book={book}
                onUpdateStatus={onUpdateStatus}
                onDeleteBook={onDeleteBook}
              />
            ))}
          </div>
        ) : (
          <p className="empty-list-message">No unread books</p>
        )}
      </div>
      
      <div className="book-status-section">
        <h3>Currently Reading ({readingBooks.length})</h3>
        {readingBooks.length > 0 ? (
          <div className="book-list">
            {readingBooks.map(book => (
              <BookItem
                key={book.uuid}
                book={book}
                onUpdateStatus={onUpdateStatus}
                onDeleteBook={onDeleteBook}
              />
            ))}
          </div>
        ) : (
          <p className="empty-list-message">No books currently being read</p>
        )}
      </div>
      
      <div className="book-status-section">
        <h3>Completed ({readBooks.length})</h3>
        {readBooks.length > 0 ? (
          <div className="book-list">
            {readBooks.map(book => (
              <BookItem
                key={book.uuid}
                book={book}
                onUpdateStatus={onUpdateStatus}
                onDeleteBook={onDeleteBook}
              />
            ))}
          </div>
        ) : (
          <p className="empty-list-message">No completed books</p>
        )}
      </div>
    </div>
  );
}

export default BookList;
