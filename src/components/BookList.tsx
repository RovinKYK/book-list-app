import { useEffect, useState } from 'react';
import bookService from '../services/BookService';
import type { BookWithUuid } from '../types/Book';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState<BookWithUuid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const ids = await bookService.getAllBooks();
      
      // Fetch details for each book
      const bookPromises = ids.map(id => bookService.getBookByUuid(id));
      const bookDetails = await Promise.all(bookPromises);
      setBooks(bookDetails);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      await bookService.deleteBook(uuid);
      // Refresh book list after deletion
      fetchBooks();
    } catch (err) {
      setError('Failed to delete book. Please try again later.');
      console.error('Error deleting book:', err);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'read':
        return 'bg-success';
      case 'reading':
        return 'bg-primary';
      case 'to-read':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Book List</h1>
        <Link to="/add" className="btn btn-primary">
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="alert alert-info">
          No books found. Start by adding a new book!
        </div>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book.uuid} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">By {book.author}</h6>
                  <span className={`badge ${getStatusBadgeClass(book.status)}`}>
                    {book.status}
                  </span>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-between">
                  <Link to={`/edit/${book.uuid}`} className="btn btn-sm btn-outline-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(book.uuid)}
                  >
                    Delete
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
