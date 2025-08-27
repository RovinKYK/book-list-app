import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, CircularProgress, 
  AppBar, Toolbar, CssBaseline, ThemeProvider, 
  createTheme 
} from '@mui/material';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import { getAllBooks, addBook, updateBookStatus, deleteBook } from './services/bookService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const bookList = await getAllBooks();
      setBooks(bookList);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      await addBook(newBook);
      fetchBooks(); // Refresh the list
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
    }
  };

  const handleUpdateStatus = async (uuid, newStatus) => {
    try {
      await updateBookStatus(uuid, newStatus);
      fetchBooks(); // Refresh the list
    } catch (err) {
      console.error('Error updating book status:', err);
      setError('Failed to update book status. Please try again.');
    }
  };

  const handleDeleteBook = async (uuid) => {
    try {
      await deleteBook(uuid);
      fetchBooks(); // Refresh the list
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Book List App
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Reading List
          </Typography>
          
          <AddBookForm onAddBook={handleAddBook} />
          
          {error && (
            <Box sx={{ mt: 2, color: 'error.main' }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <BookList 
              books={books} 
              onUpdateStatus={handleUpdateStatus} 
              onDeleteBook={handleDeleteBook} 
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
