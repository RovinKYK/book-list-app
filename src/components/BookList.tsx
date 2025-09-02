import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Alert,
  CircularProgress,
  Fab,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Book as BookIcon,
} from '@mui/icons-material';
import { bookService } from '../services/bookService';
import { Book } from '../types/Book';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Omit<Book, 'uuid'>>({
    title: '',
    author: '',
    status: 'unread',
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const booksResponse = await bookService.getAllBooks();
      
      // Convert the response object to an array of books with UUIDs
      const bookArray = Object.keys(booksResponse).map(uuid => ({
        uuid,
        ...booksResponse[uuid],
      }));
      
      setBooks(bookArray);
    } catch (err) {
      setError('Failed to load books. Please check if the book service is running.');
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '', status: 'unread' });
    setDialogOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setFormData({ title: book.title, author: book.author, status: book.status });
    setDialogOpen(true);
  };

  const handleSaveBook = async () => {
    try {
      if (editingBook) {
        // Update existing book status (API only allows status updates)
        await bookService.updateBookStatus(editingBook.uuid!, formData.status);
      } else {
        // Create new book
        await bookService.createBook(formData);
      }
      setDialogOpen(false);
      loadBooks();
    } catch (err) {
      setError('Failed to save book. Please try again.');
      console.error('Error saving book:', err);
    }
  };

  const handleDeleteBook = async (uuid: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(uuid);
        loadBooks();
      } catch (err) {
        setError('Failed to delete book. Please try again.');
        console.error('Error deleting book:', err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read':
        return 'success';
      case 'reading':
        return 'warning';
      case 'unread':
        return 'default';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <BookIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h3" component="h1" color="primary">
          My Book Library
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3,
        }}
      >
        {books.map((book) => (
          <Card key={book.uuid} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                by {book.author}
              </Typography>
              <Box mt={2}>
                <Chip
                  label={book.status}
                  color={getStatusColor(book.status) as any}
                  variant="outlined"
                />
              </Box>
            </CardContent>
            <CardActions>
              <IconButton
                size="small"
                onClick={() => handleEditBook(book)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDeleteBook(book.uuid!)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>

      {books.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No books found. Add your first book to get started!
          </Typography>
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="add book"
        onClick={handleAddBook}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Add/Edit Book Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingBook ? 'Edit Book Status' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {!editingBook && (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  margin="normal"
                  required
                />
              </>
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                label="Status"
              >
                <MenuItem value="unread">Unread</MenuItem>
                <MenuItem value="reading">Reading</MenuItem>
                <MenuItem value="read">Read</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveBook}
            variant="contained"
            disabled={!formData.title || !formData.author}
          >
            {editingBook ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookList;
