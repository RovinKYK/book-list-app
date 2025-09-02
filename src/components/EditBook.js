import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

const EditBook = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    status: 'unread'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [uuid]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const bookData = await bookService.getBookByUUID(uuid);
      setBook({
        title: bookData.title,
        author: bookData.author,
        status: bookData.status || 'unread'
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
      setLoading(false);
      console.error(`Error fetching book ${uuid}:`, err);
    }
  };

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
      setSaving(true);
      setError(null);
      
      // First update the status
      await bookService.updateBookStatus(uuid, { status: book.status });
      
      // We would normally update the title and author here,
      // but the API only supports updating the status
      // If the API is extended in the future, we could add that functionality
      
      navigate('/');
    } catch (err) {
      setError('Failed to update book. Please try again.');
      console.error(`Error updating book ${uuid}:`, err);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="page-header text-center">
          <h2>Edit Book</h2>
          <p className="text-muted">Update book information</p>
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
                  // Disable the title field since the API doesn't support updating it
                  disabled={true}
                />
                <small className="text-muted">Title cannot be changed</small>
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
                  // Disable the author field since the API doesn't support updating it
                  disabled={true}
                />
                <small className="text-muted">Author cannot be changed</small>
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
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-2">Saving...</span>
                    </>
                  ) : 'Update Book'}
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

export default EditBook;
