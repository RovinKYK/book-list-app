import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Container, Row, Col, Spinner } from 'react-bootstrap';
import { BookService } from '../services/BookService';
import BookForm from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookIds = await BookService.getAllBooks();
      
      // Fetch details for each book
      const bookDetailsPromises = bookIds.map(id => BookService.getBookByUuid(id));
      const booksWithDetails = await Promise.all(bookDetailsPromises);
      
      // Create a map of UUID to book details
      const detailsMap = {};
      bookIds.forEach((id, index) => {
        detailsMap[id] = booksWithDetails[index];
      });
      
      setBooks(bookIds);
      setBookDetails(detailsMap);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleEditBook = (uuid) => {
    setSelectedBook(uuid);
    setShowForm(true);
  };

  const handleDeleteBook = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await BookService.deleteBook(uuid);
        fetchBooks();
      } catch (error) {
        console.error('Failed to delete book:', error);
        setError('Failed to delete book. Please try again later.');
      }
    }
  };

  const handleUpdateStatus = async (uuid, newStatus) => {
    try {
      await BookService.updateBookStatus(uuid, newStatus);
      fetchBooks();
    } catch (error) {
      console.error('Failed to update book status:', error);
      setError('Failed to update book status. Please try again later.');
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchBooks();
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'read':
        return <Badge bg="success">Read</Badge>;
      case 'reading':
        return <Badge bg="primary">Reading</Badge>;
      case 'to-read':
      case 'to read':
        return <Badge bg="warning">To Read</Badge>;
      default:
        return <Badge bg="secondary">{status || 'Unknown'}</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading books...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Button variant="primary" onClick={fetchBooks}>Retry</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>My Reading List</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAddBook}>Add New Book</Button>
        </Col>
      </Row>

      {showForm && (
        <BookForm 
          bookUuid={selectedBook} 
          bookData={selectedBook ? bookDetails[selectedBook] : null}
          onSubmit={handleFormSubmit} 
          onCancel={handleFormCancel}
        />
      )}

      {books.length === 0 ? (
        <div className="alert alert-info">
          No books found in your reading list. Add a new book to get started!
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((uuid) => {
              const book = bookDetails[uuid] || {};
              return (
                <tr key={uuid}>
                  <td>{book.title || 'Unknown'}</td>
                  <td>{book.author || 'Unknown'}</td>
                  <td>{getStatusBadge(book.status)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEditBook(uuid)}
                      >
                        Edit
                      </Button>
                      
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleUpdateStatus(uuid, 'read')}
                        disabled={book.status === 'read'}
                      >
                        Mark Read
                      </Button>
                      
                      <Button 
                        variant="outline-warning" 
                        size="sm"
                        onClick={() => handleUpdateStatus(uuid, 'reading')}
                        disabled={book.status === 'reading'}
                      >
                        Mark Reading
                      </Button>
                      
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteBook(uuid)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default BookList;
