import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import BookService from '../services/BookService';

const BookCard = ({ book, onBookUpdated, onBookDeleted }) => {
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState(book.status);
  const [loading, setLoading] = useState(false);

  // Determine chip color based on book status
  const getStatusColor = (status) => {
    switch(status) {
      case 'read': return 'success';
      case 'reading': return 'primary';
      case 'unread': return 'warning';
      default: return 'default';
    }
  };

  const handleOpenStatusDialog = () => {
    setNewStatus(book.status);
    setOpenStatusDialog(true);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    if (newStatus === book.status) {
      handleCloseStatusDialog();
      return;
    }
    
    setLoading(true);
    try {
      await BookService.updateBookStatus(book.uuid, { status: newStatus });
      onBookUpdated();
      handleCloseStatusDialog();
    } catch (error) {
      console.error('Failed to update book status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setLoading(true);
      try {
        await BookService.deleteBook(book.uuid);
        onBookDeleted();
      } catch (error) {
        console.error('Failed to delete book:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          {book.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          by {book.author}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip 
            label={book.status.charAt(0).toUpperCase() + book.status.slice(1)} 
            color={getStatusColor(book.status)} 
            size="small" 
            variant="outlined"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          onClick={handleOpenStatusDialog} 
          disabled={loading}
        >
          Update Status
        </Button>
        <Button 
          size="small" 
          color="error" 
          onClick={handleDeleteBook} 
          disabled={loading}
        >
          Delete
        </Button>
      </CardActions>

      {/* Status Update Dialog */}
      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
        <DialogTitle>Update Book Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-update-label">Status</InputLabel>
            <Select
              labelId="status-update-label"
              value={newStatus}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="reading">Currently Reading</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog}>Cancel</Button>
          <Button onClick={handleUpdateStatus} variant="contained" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BookCard;
