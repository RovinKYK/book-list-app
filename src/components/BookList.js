import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllBooks, deleteBook } from '../services/bookService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
      } catch (err) {
        setError('Failed to delete book. Please try again later.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center my-5">Loading books...</div>;
  if (error) return <div className="alert alert-danger my-5">{error}</div>;
  if (books.length === 0) return <div className="alert alert-info my-5">No books found. Add some books!</div>;

  return (
    <div className="my-4">
      <h2 className="mb-4">Book List</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map(book => (
          <Col key={book.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>
                  {book.description && book.description.length > 100
                    ? `${book.description.substring(0, 100)}...`
                    : book.description || 'No description available'}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white">
                <div className="d-flex justify-content-between">
                  <Link to={`/books/${book.id}`} className="btn btn-primary btn-sm">View</Link>
                  <Link to={`/edit-book/${book.id}`} className="btn btn-warning btn-sm">Edit</Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(book.id)}>Delete</Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BookList;
