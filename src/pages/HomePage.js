import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow text-center p-5">
            <h1 className="mb-4">Welcome to Book List App</h1>
            <p className="lead">
              Manage your book collection with ease. Add, view, edit, and delete books in your library.
            </p>
            <p>
              This application connects to the book-list-service in Choreo Marketplace to provide a seamless
              experience for managing your book collection.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
