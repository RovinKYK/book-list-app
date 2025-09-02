import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookService from '../services/BookService';
import type { Book } from '../types/Book';

const AddBook = () => {
  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    status: 'to-read' // Default status
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!book.title.trim() || !book.author.trim() || !book.status.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await bookService.addBook(book);
      navigate('/'); // Redirect to book list page after successful add
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add New Book</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
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
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={book.status}
            onChange={handleChange}
            required
          >
            <option value="to-read">To Read</option>
            <option value="reading">Currently Reading</option>
            <option value="read">Finished Reading</option>
          </select>
        </div>
        
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
