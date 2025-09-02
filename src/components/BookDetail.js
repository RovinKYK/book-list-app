import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BookService from '../services/BookService';
import { toast } from 'react-toastify';

const BookDetail = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [uuid]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const data = await BookService.getBookByUuid(uuid);
      setBook(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch book details. The book may have been removed or does not exist.');
      console.error('Error fetching book details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    if (!book) return;
    
    try {
      const newStatus = book.status === 'read' ? 'unread' : 'read';
      await BookService.updateBookStatus(uuid, { status: newStatus });
      
      // Update the local state
      setBook(prev => ({
        ...prev,
        status: newStatus
      }));
      
      toast.success(`Book marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update book status');
      console.error('Error updating book status:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await BookService.deleteBook(uuid);
        toast.success('Book deleted successfully');
        navigate('/'); // Redirect to book list
      } catch (err) {
        toast.error('Failed to delete book');
        console.error('Error deleting book:', err);
      }
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
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <hr />
        <div className="mb-0">
          <Link to="/" className="btn btn-primary">
            Return to Book List
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Book not found!</h4>
        <p>The requested book could not be found.</p>
        <hr />
        <div className="mb-0">
          <Link to="/" className="btn btn-primary">
            Return to Book List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{book.title}</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h5 className="card-title">Book Details</h5>
            <p className="card-text"><strong>Author:</strong> {book.author}</p>
            <p className="card-text">
              <strong>Status:</strong> 
              <span className={`badge ms-2 ${book.status === 'read' ? 'read-badge' : 'unread-badge'}`}>
                {book.status === 'read' ? 'Read' : 'Unread'}
              </span>
            </p>
          </div>
          
          <div className="d-flex gap-2">
            <button 
              onClick={handleStatusToggle}
              className="btn btn-outline-success"
            >
              {book.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger"
            >
              Delete Book
            </button>
            <Link to="/" className="btn btn-outline-primary ms-auto">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
