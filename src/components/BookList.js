import React, { useState } from 'react';
import { 
  Card, CardContent, Typography, Box, Button, 
  Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, TextField, MenuItem, FormControl, Select, InputLabel 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BookList = ({ books, onUpdateStatus, onDeleteBook }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const handleOpenDeleteDialog = (book) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedBook) {
      onDeleteBook(selectedBook);
    }
    handleCloseDeleteDialog();
  };

  const handleOpenEditDialog = (book) => {
    setSelectedBook(book);
    setNewStatus(book.status || '');
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleStatusUpdate = () => {
    if (selectedBook && newStatus) {
      onUpdateStatus(selectedBook, newStatus);
    }
    handleCloseEditDialog();
  };

  if (!books || books.length === 0) {
    return (
      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="body1">No books in your list yet. Add some books to get started!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {books.map((book, index) => (
        <Card key={book.uuid || index} sx={{ mb: 2, boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" component="h2">
                  {book.title}
                </Typography>
                <Typography color="text.secondary">
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Status: <span style={{ fontWeight: 'bold' }}>{book.status || 'Not specified'}</span>
                </Typography>
              </Box>
              <Box>
                <Button 
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenEditDialog(book)}
                  sx={{ mr: 1 }}
                >
                  Update
                </Button>
                <Button 
                  color="secondary" 
                  startIcon={<DeleteIcon />}
                  onClick={() => handleOpenDeleteDialog(book.uuid)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to remove this book from your list? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Update Book Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change the reading status for "{selectedBook?.title}".
          </DialogContentText>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={newStatus}
              label="Status"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleStatusUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookList;
