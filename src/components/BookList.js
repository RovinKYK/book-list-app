import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onUpdateStatus, onDeleteBook }) => {
  if (!books || books.length === 0) {
    return <div className="loading">No books found. Add a book to get started!</div>;
  }
  
  return (
    <div>
      <h2>Your Books</h2>
      <div className="book-grid">
        {books.map((bookId) => (
          <BookCard 
            key={bookId}
            uuid={bookId}
            onUpdateStatus={onUpdateStatus}
            onDeleteBook={onDeleteBook}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
