import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../services/BookService';
import { toast } from 'react-toastify';

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
      
      // Create an object to store book details
      const details = {};
      
      // Fetch details for each book
      for (const uuid of bookIds) {
        try {
          const bookDetail = await BookService.getBookByUuid(uuid);
          details[uuid] = bookDetail;
        } catch (error) {
          console.error(`Error fetching details for book ${uuid}:`, error);
        }
      }
      
      setBookDetails(details);
      setBooks(bookIds);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
      toast.error('Failed to fetch books');
      console.error('Error fetching books:', err);
    }
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await BookService.deleteBook(uuid);
        // Update the UI by removing the deleted book
        setBooks(books.filter(id => id !== uuid));
        
        // Also remove from bookDetails
        const updatedDetails = { ...bookDetails };
        delete updatedDetails[uuid];
        setBookDetails(updatedDetails);
        
        toast.success('Book deleted successfully');
      } catch (err) {
        toast.error('Failed to delete book');
        console.error('Error deleting book:', err);
      }
    }
  };

  const handleStatusToggle = async (uuid) => {
    try {
      const currentStatus = bookDetails[uuid]?.status || 'unread';
      const newStatus = currentStatus === 'read' ? 'unread' : 'read';
      
      await BookService.updateBookStatus(uuid, { status: newStatus });
      
      // Update the book details in state
      setBookDetails(prev => ({
        ...prev,
        [uuid]: {
          ...prev[uuid],
          status: newStatus
        }
      }));
      
      toast.success(`Book marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update book status');
      console.error('Error updating book status:', err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center my-5">
        <h2>No books found</h2>
        <p>Start by adding a new book to your reading list.</p>
        <Link to="/add" className="btn btn-primary">Add Book</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Your Reading List</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {books.map((uuid) => (
          <div className="col" key={uuid}>
            <div className="card book-card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{bookDetails[uuid]?.title || 'Loading...'}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{bookDetails[uuid]?.author || ''}</h6>
                <div className="d-flex align-items-center mb-3">
                  <span 
                    className={`badge ${bookDetails[uuid]?.status === 'read' ? 'read-badge' : 'unread-badge'} me-2`}
                  >
                    {bookDetails[uuid]?.status === 'read' ? 'Read' : 'Unread'}
                  </span>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
                <Link to={`/book/${uuid}`} className="btn btn-sm btn-outline-primary">
                  View Details
                </Link>
                <div>
                  <button 
                    onClick={() => handleStatusToggle(uuid)} 
                    className="btn btn-sm btn-outline-success me-2"
                  >
                    {bookDetails[uuid]?.status === 'read' ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button 
                    onClick={() => handleDelete(uuid)} 
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link to="/add" className="btn btn-primary">
          Add New Book
        </Link>
      </div>
    </div>
  );
};

export default BookList;
