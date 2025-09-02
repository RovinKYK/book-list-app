import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { BookService } from '../services/BookService';

const BookForm = ({ bookUuid, bookData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('to-read');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookData) {
      setTitle(bookData.title || '');
      setAuthor(bookData.author || '');
      setStatus(bookData.status || 'to-read');
    }
  }, [bookData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate inputs
    if (!title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    if (!author.trim()) {
      setError('Author is required');
      setLoading(false);
      return;
    }

    try {
      const bookData = { title, author, status };
      
      if (bookUuid) {
        // Update existing book
        await BookService.updateBookStatus(bookUuid, status);
      } else {
        // Create new book
        await BookService.createBook(bookData);
      }
      
      onSubmit();
    } catch (error) {
      console.error('Form submission error:', error);
      setError('Failed to save book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>{bookUuid ? 'Edit Book' : 'Add New Book'}</Card.Header>
      <Card.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            >
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Book'}
            </Button>
            <Button variant="secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookForm;
