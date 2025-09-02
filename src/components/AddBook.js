import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    status: 'unread' // Default status
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!book.title.trim() || !book.author.trim()) {
      setError('Title and author are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await bookService.addBook(book);
      navigate('/');
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="page-header text-center">
          <h2>Add New Book</h2>
          <p className="text-muted">Add a new book to your reading list</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter book title"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  required
                  placeholder="Enter author name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">Reading Status</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={book.status}
                  onChange={handleChange}
                >
                  <option value="unread">Not Read Yet</option>
                  <option value="reading">Currently Reading</option>
                  <option value="read">Read</option>
                </select>
              </div>

              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-2">Saving...</span>
                    </>
                  ) : 'Add Book'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
