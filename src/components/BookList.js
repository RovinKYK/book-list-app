import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../services/BookService';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const bookIds = await BookService.getAllBooks();
      
      // If we have book IDs, fetch details for each book
      if (bookIds && bookIds.length > 0) {
        const details = {};
        
        // Use Promise.all to fetch all book details in parallel
        await Promise.all(
          bookIds.map(async (uuid) => {
            try {
              const bookData = await BookService.getBookByUuid(uuid);
              details[uuid] = bookData;
            } catch (err) {
              console.error(`Error fetching details for book ${uuid}:`, err);
            }
          })
        );
        
        setBookDetails(details);
      }
      
      setBooks(bookIds || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
      console.error('Error fetching books:', err);
    }
  };

  const handleDeleteBook = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await BookService.deleteBook(uuid);
        // Update the state to remove the deleted book
        setBooks(books.filter(id => id !== uuid));
        
        // Create a new bookDetails object without the deleted book
        const updatedDetails = { ...bookDetails };
        delete updatedDetails[uuid];
        setBookDetails(updatedDetails);
      } catch (err) {
        setError('Failed to delete book. Please try again later.');
        console.error('Error deleting book:', err);
      }
    }
  };

  const handleStatusChange = async (uuid, newStatus) => {
    try {
      await BookService.updateBookStatus(uuid, newStatus);
      
      // Update the book details in state
      setBookDetails(prevDetails => ({
        ...prevDetails,
        [uuid]: {
          ...prevDetails[uuid],
          status: newStatus
        }
      }));
    } catch (err) {
      setError('Failed to update book status. Please try again later.');
      console.error('Error updating book status:', err);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'read':
        return 'status-read';
      case 'reading':
        return 'status-reading';
      case 'to-read':
        return 'status-to-read';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="text-center my-5"><div className="spinner-border" role="status"></div><p>Loading books...</p></div>;
  }

  if (error) {
    return <div className="alert alert-danger my-4">{error}</div>;
  }

  return (
    <div className="book-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Book List</h2>
        <Link to="/add" className="btn btn-primary">Add New Book</Link>
      </div>

      {books.length === 0 ? (
        <div className="alert alert-info">
          You haven't added any books yet. Click "Add New Book" to get started.
        </div>
      ) : (
        <div className="row">
          {books.map((uuid) => {
            const book = bookDetails[uuid];
            return (
              <div key={uuid} className="col-md-6 col-lg-4 mb-4">
                <div className="card book-card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{book?.title || 'Loading...'}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{book?.author || 'Unknown Author'}</h6>
                    
                    <div className="mt-3 mb-3">
                      <span className={`status-badge ${getStatusClass(book?.status)}`}>
                        {book?.status || 'Unknown'}
                      </span>
                    </div>

                    <div className="btn-group status-buttons">
                      <button 
                        className={`btn btn-sm ${book?.status === 'to-read' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleStatusChange(uuid, 'to-read')}
                      >
                        To Read
                      </button>
                      <button 
                        className={`btn btn-sm ${book?.status === 'reading' ? 'btn-info' : 'btn-outline-info'}`}
                        onClick={() => handleStatusChange(uuid, 'reading')}
                      >
                        Reading
                      </button>
                      <button 
                        className={`btn btn-sm ${book?.status === 'read' ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => handleStatusChange(uuid, 'read')}
                      >
                        Read
                      </button>
                    </div>
                    
                    <button 
                      className="btn btn-danger btn-sm mt-3"
                      onClick={() => handleDeleteBook(uuid)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookList;
