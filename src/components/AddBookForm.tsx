import React, { useState } from 'react';
import { Book } from '../types/Book';
import './AddBookForm.css';

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
  isLoading: boolean;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook, isLoading }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'read' | 'reading' | 'to-read'>('to-read');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim()) {
      alert('Please fill in both title and author');
      return;
    }

    const newBook: Book = {
      title: title.trim(),
      author: author.trim(),
      status
    };

    onAddBook(newBook);
    
    // Reset form
    setTitle('');
    setAuthor('');
    setStatus('to-read');
    setIsFormVisible(false);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      // Reset form when opening
      setTitle('');
      setAuthor('');
      setStatus('to-read');
    }
  };

  return (
    <div className="add-book-container">
      <button 
        className={`toggle-form-button ${isFormVisible ? 'active' : ''}`}
        onClick={toggleForm}
        type="button"
      >
        {isFormVisible ? '✕ Cancel' : '+ Add New Book'}
      </button>

      <div className={`form-container ${isFormVisible ? 'visible' : ''}`}>
        <form onSubmit={handleSubmit} className="add-book-form">
          <h3 className="form-title">Add a New Book</h3>
          
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Reading Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'read' | 'reading' | 'to-read')}
              disabled={isLoading}
            >
              <option value="to-read">To Read</option>
              <option value="reading">Currently Reading</option>
              <option value="read">Finished Reading</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? '📚 Adding...' : '📚 Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
