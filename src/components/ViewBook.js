import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, CircularProgress,
  Button, Chip, Alert, Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  LibraryBooks as BookIcon, 
  Person as AuthorIcon,
  PlaylistAddCheck as StatusIcon
} from '@mui/icons-material';
import BookService from '../services/BookService';

const ViewBook = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookDetails();
  }, [uuid]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const bookDetails = await BookService.getBookByUuid(uuid);
      setBook(bookDetails);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching book details:', err);
      setError('Could not load book details. The book might have been deleted.');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'read':
        return 'success';
      case 'reading':
        return 'primary';
      case 'unread':
        return 'default';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading book details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Book List
        </Button>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">
          Book not found. It may have been deleted.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Book List
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          Book Details
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <BookIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Title
            </Typography>
            <Typography variant="h6">
              {book.title}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <AuthorIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Author
            </Typography>
            <Typography variant="h6">
              {book.author}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <StatusIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip 
              label={book.status ? book.status.charAt(0).toUpperCase() + book.status.slice(1) : 'Unknown'} 
              color={getStatusColor(book.status)}
              variant="outlined"
            />
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Back to List
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/edit/${uuid}`)}
          >
            Edit Book
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewBook;
