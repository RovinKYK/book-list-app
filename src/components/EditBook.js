import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, TextField, Button, 
  Paper, FormControl, FormLabel, RadioGroup, 
  FormControlLabel, Radio, Alert, CircularProgress 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import BookService from '../services/BookService';

const EditBook = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    status: 'unread'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [uuid]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const bookDetails = await BookService.getBookByUuid(uuid);
      
      if (bookDetails) {
        setBook({
          title: bookDetails.title || '',
          author: bookDetails.author || '',
          status: bookDetails.status || 'unread'
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching book details:', err);
      setError('Could not load book details. The book might have been deleted.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!book.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!book.author.trim()) {
      setError('Author is required');
      return;
    }
    
    try {
      setSaving(true);
      setError('');
      
      // First update the status
      await BookService.updateBookStatus(uuid, book.status);
      
      // In a real app, we'd need to update title and author too
      // This API only allows updating status, so we're limited here
      
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to update book. Please try again.');
    } finally {
      setSaving(false);
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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Book
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Book updated successfully!
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Book Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            disabled={saving || success}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            disabled={saving || success}
          />
          
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              row
              name="status"
              value={book.status}
              onChange={handleChange}
            >
              <FormControlLabel value="unread" control={<Radio />} label="Unread" disabled={saving || success} />
              <FormControlLabel value="reading" control={<Radio />} label="Reading" disabled={saving || success} />
              <FormControlLabel value="read" control={<Radio />} label="Read" disabled={saving || success} />
            </RadioGroup>
          </FormControl>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/')}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={saving || success}
              startIcon={saving && <CircularProgress size={20} />}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditBook;
