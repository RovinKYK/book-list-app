import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, List, ListItem, 
  ListItemText, IconButton, Divider, Paper, 
  CircularProgress, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import BookService from '../services/BookService';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const bookUuids = await BookService.getAllBooks();
      
      // If we have books, fetch details for each one
      if (bookUuids && bookUuids.length > 0) {
        const bookDetailsMap = {};
        
        // Fetch details for each book
        for (const uuid of bookUuids) {
          try {
            const details = await BookService.getBookByUuid(uuid);
            bookDetailsMap[uuid] = details;
          } catch (err) {
            console.error(`Error fetching details for book ${uuid}:`, err);
          }
        }
        
        setBookDetails(bookDetailsMap);
        setBooks(bookUuids);
      } else {
        setBooks([]);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
      setLoading(false);
      console.error('Error in fetchBooks:', err);
    }
  };

  const handleDeleteClick = (uuid) => {
    setSelectedBook(uuid);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await BookService.deleteBook(selectedBook);
      // Remove the book from state
      setBooks(books.filter(uuid => uuid !== selectedBook));
      // Close the dialog
      setDeleteDialogOpen(false);
      setSelectedBook(null);
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading books...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, backgroundColor: '#ffebee' }}>
          <Typography variant="h6" color="error">{error}</Typography>
          <Button variant="contained" onClick={fetchBooks} sx={{ mt: 2 }}>
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Book List
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/add"
        >
          Add New Book
        </Button>
      </Box>

      {books.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No books in your list yet. Add a new book to get started!
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2}>
          <List>
            {books.map((uuid, index) => {
              const book = bookDetails[uuid] || {};
              return (
                <React.Fragment key={uuid}>
                  {index > 0 && <Divider />}
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton 
                          edge="end" 
                          aria-label="view" 
                          component={Link}
                          to={`/view/${uuid}`}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          aria-label="edit"
                          component={Link}
                          to={`/edit/${uuid}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteClick(uuid)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={book.title || 'Unknown Title'}
                      secondary={`by ${book.author || 'Unknown Author'} - ${book.status || 'Status not set'}`}
                    />
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this book from your list?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookList;
