import React from 'react';
import { Container, Card } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="py-4">
      <h2>About Book List App</h2>
      
      <Card className="my-4">
        <Card.Body>
          <p>
            The Book List App is a simple application that helps you manage your reading list.
            Built with React and deployed on Choreo, it consumes the book-list-service from 
            the Choreo Marketplace.
          </p>
          
          <h5>Features:</h5>
          <ul>
            <li>View all books in your reading list</li>
            <li>Add new books to your list</li>
            <li>Update the reading status of books</li>
            <li>Remove books from your list</li>
          </ul>

          <h5>Technology Stack:</h5>
          <ul>
            <li>Frontend: React, React Bootstrap</li>
            <li>API: Book List Service (Choreo Marketplace)</li>
            <li>Deployment: Choreo Platform</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutPage;
