import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onUpdateStatus, onDeleteBook }) => {
  // Make sure books is an array before trying to use array methods
  const bookArray = Array.isArray(books) ? books : [];
  
  if (bookArray.length === 0) {
    return <div className="loading">No books found. Add a book to get started!</div>;
  }
  
  return (
    <div>
      <h2>Your Books</h2>
      <div className="book-grid">
        {bookArray.map((book) => (
          <BookCard 
            key={book.uuid}
            book={book}
            onUpdateStatus={onUpdateStatus}
            onDeleteBook={onDeleteBook}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
