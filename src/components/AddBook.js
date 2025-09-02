import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../services/BookService';
import './AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('to-read');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!title.trim()) {
      setError('Book title is required');
      return;
    }
    
    if (!author.trim()) {
      setError('Author name is required');
      return;
    }

    const newBook = {
      title,
      author,
      status
    };

    try {
      setLoading(true);
      await BookService.addBook(newBook);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    }
  };

  return (
    <div className="add-book-container">
      <div className="card">
        <div className="card-header">
          <h2>Add New Book</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>
            
            <div className="form-group mb-4">
              <label htmlFor="status">Reading Status</label>
              <select
                className="form-control"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="to-read">To Read</option>
                <option value="reading">Currently Reading</option>
                <option value="read">Finished Reading</option>
              </select>
            </div>
            
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  'Add Book'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
