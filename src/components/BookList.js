import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [uuidList, setUuidList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const bookIds = await bookService.getAllBooks();
      setUuidList(bookIds);
      
      const bookDetails = await Promise.all(
        bookIds.map(uuid => bookService.getBookByUUID(uuid))
      );
      
      const booksWithUuids = bookDetails.map((book, index) => ({
        ...book,
        uuid: bookIds[index]
      }));
      
      setBooks(booksWithUuids);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
      console.error('Error fetching books:', err);
    }
  };

  const handleStatusChange = async (uuid, newStatus) => {
    try {
      await bookService.updateBookStatus(uuid, { status: newStatus });
      // Update the local state to reflect the change
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book.uuid === uuid ? { ...book, status: newStatus } : book
        )
      );
    } catch (err) {
      console.error(`Error updating status for book ${uuid}:`, err);
      alert('Failed to update book status. Please try again.');
    }
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(uuid);
        // Remove the book from the local state
        setBooks(prevBooks => prevBooks.filter(book => book.uuid !== uuid));
        setUuidList(prevUuids => prevUuids.filter(id => id !== uuid));
      } catch (err) {
        console.error(`Error deleting book ${uuid}:`, err);
        alert('Failed to delete book. Please try again.');
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'read':
        return 'status-badge status-read';
      case 'unread':
        return 'status-badge status-unread';
      case 'reading':
        return 'status-badge status-reading';
      default:
        return 'status-badge';
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header text-center">
        <h2>My Book List</h2>
        <p className="text-muted">Manage your reading collection</p>
      </div>
      
      <div className="mb-4 d-flex justify-content-between">
        <h5>Total Books: {books.length}</h5>
        <Link to="/add" className="btn btn-primary">
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="alert alert-info text-center">
          <p className="mb-0">You haven't added any books yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {books.map((book) => (
            <div className="col-md-6 col-lg-4" key={book.uuid}>
              <div className="card book-card h-100">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">By {book.author}</h6>
                  <div className="mb-3">
                    <span className={getStatusBadgeClass(book.status)}>
                      {book.status || 'Unknown'}
                    </span>
                  </div>
                  <div className="dropdown mb-3">
                    <button 
                      className="btn btn-outline-secondary dropdown-toggle btn-sm" 
                      type="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      Update Status
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleStatusChange(book.uuid, 'read')}
                        >
                          Read
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleStatusChange(book.uuid, 'reading')}
                        >
                          Currently Reading
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleStatusChange(book.uuid, 'unread')}
                        >
                          Not Read Yet
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-end">
                  <Link 
                    to={`/edit/${book.uuid}`}
                    className="btn btn-sm btn-outline-primary book-action-btn me-2"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button 
                    onClick={() => handleDelete(book.uuid)} 
                    className="btn btn-sm btn-outline-danger book-action-btn"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
