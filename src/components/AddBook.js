import React, { useState } from 'react';
import { 
  Container, Typography, Box, TextField, Button, 
  Paper, FormControl, FormLabel, RadioGroup, 
  FormControlLabel, Radio, Alert, CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookService from '../services/BookService';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    status: 'unread'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      setLoading(true);
      setError('');
      await BookService.addBook(book);
      setSuccess(true);
      
      // Reset form
      setBook({
        title: '',
        author: '',
        status: 'unread'
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Book
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Book added successfully!
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
            disabled={loading}
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
            disabled={loading}
          />
          
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              row
              name="status"
              value={book.status}
              onChange={handleChange}
            >
              <FormControlLabel value="unread" control={<Radio />} label="Unread" disabled={loading} />
              <FormControlLabel value="reading" control={<Radio />} label="Reading" disabled={loading} />
              <FormControlLabel value="read" control={<Radio />} label="Read" disabled={loading} />
            </RadioGroup>
          </FormControl>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Adding...' : 'Add Book'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBook;
