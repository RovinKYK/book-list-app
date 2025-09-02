import React from 'react';
import { Container } from 'react-bootstrap';
import BookList from '../components/BookList';

const HomePage = () => {
  return (
    <Container className="py-4">
      <BookList />
    </Container>
  );
};

export default HomePage;
