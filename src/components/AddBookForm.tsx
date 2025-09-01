import React, { useState } from 'react';
import { Book } from '../types/Book';
import { useBooks } from '../context/BookContext';
import { 
  TextField, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box
} from '@mui/material';

interface AddBookFormProps {
  open: boolean;
  onClose: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ open, onClose }) => {
  const { addBook } = useBooks();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'unread' | 'reading' | 'read'>('unread');
  const [errors, setErrors] = useState({
    title: false,
    author: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      title: title.trim() === '',
      author: author.trim() === ''
    };
    
    setErrors(newErrors);
    
    if (newErrors.title || newErrors.author) {
      return;
    }
    
    const newBook: Book = {
      title: title.trim(),
      author: author.trim(),
      status
    };
    
    await addBook(newBook);
    
    // Reset form
    setTitle('');
    setAuthor('');
    setStatus('unread');
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setTitle('');
    setAuthor('');
    setStatus('unread');
    setErrors({
      title: false,
      author: false
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            helperText={errors.title ? 'Title is required' : ''}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={errors.author}
            helperText={errors.author ? 'Author is required' : ''}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as 'unread' | 'reading' | 'read')}
            >
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="reading">Currently Reading</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Add Book</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookForm;
