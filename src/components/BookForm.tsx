import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Button, TextField, CircularProgress,
  Paper, Snackbar, Alert
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { BookService } from '../services/BookService';
import { Book } from '../models/Book';

type BookFormData = Omit<Book, 'id'> & { id?: string };

const BookForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    description: '',
    publishedYear: undefined,
    coverImage: '',
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingData, setFetchingData] = useState<boolean>(isEditMode);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        setFetchingData(true);
        const data = await BookService.getBookById(id);
        setFormData({
          id: data.id,
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          description: data.description || '',
          publishedYear: data.publishedYear,
          coverImage: data.coverImage || '',
        });
      } catch (err) {
        console.error('Error fetching book:', err);
        setSnackbar({
          open: true,
          message: 'Failed to load book data. Please try again.',
          severity: 'error'
        });
      } finally {
        setFetchingData(false);
      }
    };

    if (isEditMode) {
      fetchBook();
    }
  }, [id, isEditMode]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }
    
    if (formData.publishedYear !== undefined) {
      const year = Number(formData.publishedYear);
      if (isNaN(year) || year < 0 || year > new Date().getFullYear()) {
        newErrors.publishedYear = 'Please enter a valid year';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publishedYear' ? (value ? Number(value) : undefined) : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setLoading(true);
      
      if (isEditMode && id) {
        await BookService.updateBook(id, formData);
        setSnackbar({
          open: true,
          message: 'Book updated successfully!',
          severity: 'success'
        });
      } else {
        await BookService.addBook(formData);
        setSnackbar({
          open: true,
          message: 'Book added successfully!',
          severity: 'success'
        });
      }
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Error saving book:', err);
      setSnackbar({
        open: true,
        message: 'Failed to save book. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (fetchingData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {isEditMode ? 'Edit Book' : 'Add New Book'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            error={!!errors.author}
            helperText={errors.author}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="isbn"
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            error={!!errors.isbn}
            helperText={errors.isbn}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="publishedYear"
            label="Published Year"
            name="publishedYear"
            type="number"
            value={formData.publishedYear || ''}
            onChange={handleChange}
            error={!!errors.publishedYear}
            helperText={errors.publishedYear}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="coverImage"
            label="Cover Image URL"
            name="coverImage"
            value={formData.coverImage || ''}
            onChange={handleChange}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            multiline
            rows={4}
            disabled={loading}
          />
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Book' : 'Add Book'}
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookForm;
