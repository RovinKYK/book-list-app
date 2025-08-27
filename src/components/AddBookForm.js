import React, { useState } from 'react';

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('unread');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title.trim() || !author.trim()) {
      alert('Please enter both title and author');
      return;
    }

    const newBook = {
      title,
      author,
      status
    };

    onAddBook(newBook);
    
    // Reset form
    setTitle('');
    setAuthor('');
    setStatus('unread');
  };

  return (
    <div className="form-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
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
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Reading Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
        
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
