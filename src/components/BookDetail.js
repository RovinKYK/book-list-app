import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import { getBookById, deleteBook } from '../services/bookService';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookById(id);
        setBook(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch book details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        navigate('/books');
      } catch (err) {
        setError('Failed to delete book. Please try again later.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center my-5">Loading book details...</div>;
  if (error) return <div className="alert alert-danger my-5">{error}</div>;
  if (!book) return <div className="alert alert-info my-5">Book not found!</div>;

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header as="h4">{book.title}</Card.Header>
        <Card.Body>
          <Card.Title>Author: {book.author}</Card.Title>
          <Card.Text>
            <strong>Genre:</strong> {book.genre || 'Not specified'}
          </Card.Text>
          <Card.Text>
            <strong>Published Year:</strong> {book.year || 'Not specified'}
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {book.description || 'No description available'}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="primary" onClick={() => navigate('/books')}>Back to List</Button>
          <div>
            <Button variant="warning" className="me-2" onClick={() => navigate(`/edit-book/${id}`)}>Edit</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default BookDetail;
