import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Button, CircularProgress,
  Card, CardMedia, CardContent, Divider, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { BookService } from '../services/BookService';
import { Book } from '../models/Book';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError('Book ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await BookService.getBookById(id);
        setBook(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch book details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleEdit = () => {
    navigate(`/books/edit/${id}`);
  };

  const handleDeleteConfirmation = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    if (!id) return;

    try {
      await BookService.deleteBook(id);
      setOpenDeleteDialog(false);
      navigate('/');
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book. Please try again later.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !book) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
          Back to Books
        </Button>
        <Box sx={{ p: 3, bgcolor: '#f8d7da', borderRadius: 2 }}>
          <Typography color="error" variant="h6">
            {error || 'Book not found'}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back to Books
        </Button>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />} 
            onClick={handleEdit}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteIcon />} 
            onClick={handleDeleteConfirmation}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 4, overflow: 'visible' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' }
        }}>
          {book.coverImage ? (
            <CardMedia
              component="img"
              sx={{ 
                width: { xs: '100%', md: 300 }, 
                height: { xs: 300, md: 400 },
                objectFit: 'cover' 
              }}
              image={book.coverImage}
              alt={book.title}
            />
          ) : (
            <Box sx={{ 
              width: { xs: '100%', md: 300 }, 
              height: { xs: 300, md: 400 },
              bgcolor: '#f5f5f5', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body1" color="textSecondary">
                No Cover Image
              </Typography>
            </Box>
          )}
          <CardContent sx={{ flexGrow: 1, p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              By {book.author}
            </Typography>

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mt: 2 }}>
              {book.publishedYear && (
                <Typography variant="body1" paragraph>
                  <strong>Published Year:</strong> {book.publishedYear}
                </Typography>
              )}
              <Typography variant="body1" paragraph>
                <strong>ISBN:</strong> {book.isbn || 'N/A'}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">
              {book.description || 'No description available.'}
            </Typography>
          </CardContent>
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Book"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{book.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookDetail;
