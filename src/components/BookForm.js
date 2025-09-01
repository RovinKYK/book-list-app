import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { addBook, getBookById, updateBook } from '../services/bookService';

const BookForm = ({ isEditing = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchBook = async () => {
        try {
          const data = await getBookById(id);
          setFormData({
            title: data.title || '',
            author: data.author || '',
            genre: data.genre || '',
            year: data.year || '',
            description: data.description || ''
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch book details. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchBook();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (isEditing) {
        await updateBook(id, formData);
      } else {
        await addBook(formData);
      }
      navigate('/books');
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'add'} book. Please try again later.`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center my-5">Loading book data...</div>;

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header as="h4">{isEditing ? 'Edit Book' : 'Add New Book'}</Card.Header>
        <Card.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter book title"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Enter author name"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Enter book genre"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Publication Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter publication year"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Enter book description"
              />
            </Form.Group>
            
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate('/books')}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : isEditing ? 'Update Book' : 'Add Book'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookForm;
