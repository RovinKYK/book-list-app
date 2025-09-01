import React from 'react';
import { Container } from 'react-bootstrap';
import BookList from '../components/BookList';

const BooksPage = () => {
  return (
    <Container className="my-4">
      <BookList />
    </Container>
  );
};

export default BooksPage;
