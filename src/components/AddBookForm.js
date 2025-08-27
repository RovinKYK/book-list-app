import React, { useState } from 'react';
import { 
  Paper, TextField, Button, Typography, Box,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('unread');
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }
    
    if (!author.trim()) {
      setAuthorError(true);
      isValid = false;
    } else {
      setAuthorError(false);
    }
    
    if (isValid) {
      onAddBook({
        title: title.trim(),
        author: author.trim(),
        status
      });
      
      // Reset form
      setTitle('');
      setAuthor('');
      setStatus('unread');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Add a New Book
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            helperText={titleError ? 'Title is required' : ''}
            fullWidth
            sx={{ flex: 2 }}
          />
          
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={authorError}
            helperText={authorError ? 'Author is required' : ''}
            fullWidth
            sx={{ flex: 2 }}
          />
          
          <FormControl sx={{ flex: 1, minWidth: '120px' }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ height: '56px' }}
          >
            Add Book
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddBookForm;
