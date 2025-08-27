const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 8080;

// In-memory storage for books
const books = new Map();

// Add some sample books
const addSampleBooks = () => {
  const sampleBooks = [
    { uuid: uuidv4(), title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'read' },
    { uuid: uuidv4(), title: '1984', author: 'George Orwell', status: 'reading' },
    { uuid: uuidv4(), title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'unread' }
  ];

  sampleBooks.forEach(book => {
    books.set(book.uuid, { title: book.title, author: book.author, status: book.status });
  });
};

addSampleBooks();

// Middleware
app.use(cors());
app.use(express.json());

// GET /books - List all books (returns UUIDs)
app.get('/books', (req, res) => {
  const bookUuids = Array.from(books.keys());
  res.json(bookUuids);
});

// GET /books/:uuid - Get a specific book
app.get('/books/:uuid', (req, res) => {
  const { uuid } = req.params;
  if (!books.has(uuid)) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(books.get(uuid));
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author, status } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  
  const uuid = uuidv4();
  books.set(uuid, { title, author, status: status || 'unread' });
  
  res.status(200).json({ uuid });
});

// PUT /books/:uuid - Update a book's status
app.put('/books/:uuid', (req, res) => {
  const { uuid } = req.params;
  const { status } = req.body;
  
  if (!books.has(uuid)) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  
  const book = books.get(uuid);
  book.status = status;
  books.set(uuid, book);
  
  res.status(200).json({ message: 'Book status updated' });
});

// DELETE /books/:uuid - Delete a book
app.delete('/books/:uuid', (req, res) => {
  const { uuid } = req.params;
  
  if (!books.has(uuid)) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  books.delete(uuid);
  res.status(200).json({ message: 'Book deleted' });
});

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(port, () => {
  console.log(`Book list service running on port ${port}`);
});
