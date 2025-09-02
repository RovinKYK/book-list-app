import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../services/BookService';
import { toast } from 'react-toastify';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    status: 'unread'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!book.title.trim()) newErrors.title = 'Title is required';
    if (!book.author.trim()) newErrors.author = 'Author is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleStatusChange = (e) => {
    setBook(prev => ({
      ...prev,
      status: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await BookService.createBook(book);
      toast.success('Book added successfully!');
      navigate('/'); // Redirect to book list
    } catch (error) {
      toast.error('Failed to add book. Please try again.');
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">Add New Book</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Book Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input
                  type="text"
                  className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                />
                {errors.author && <div className="invalid-feedback">{errors.author}</div>}
              </div>
              
              <div className="mb-3">
                <label className="form-label">Reading Status</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="statusUnread"
                      value="unread"
                      checked={book.status === 'unread'}
                      onChange={handleStatusChange}
                    />
                    <label className="form-check-label" htmlFor="statusUnread">
                      Unread
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="statusRead"
                      value="read"
                      checked={book.status === 'read'}
                      onChange={handleStatusChange}
                    />
                    <label className="form-check-label" htmlFor="statusRead">
                      Read
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Adding...
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
