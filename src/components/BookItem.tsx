import React from 'react';
import { Book } from '../types/Book';
import { useBooks } from '../context/BookContext';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Chip,
  IconButton,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import { Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const { updateBookStatus, deleteBook } = useBooks();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleStatusChange = async (status: 'unread' | 'reading' | 'read') => {
    if (book.uuid) {
      await updateBookStatus(book.uuid, status);
    }
    handleMenuClose();
  };
  
  const handleDelete = async () => {
    if (book.uuid) {
      await deleteBook(book.uuid);
    }
  };
  
  const getStatusColor = () => {
    switch (book.status) {
      case 'read':
        return 'success';
      case 'reading':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  const getStatusLabel = () => {
    switch (book.status) {
      case 'read':
        return 'Read';
      case 'reading':
        return 'Currently Reading';
      default:
        return 'Unread';
    }
  };
  
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
      }
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap sx={{ fontWeight: 'bold' }}>
          {book.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          by {book.author}
        </Typography>
        <Box mt={2}>
          <Chip 
            label={getStatusLabel()} 
            color={getStatusColor() as "default" | "success" | "warning"}
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton size="small" onClick={handleDelete} color="error" title="Delete">
          <DeleteIcon />
        </IconButton>
        
        <IconButton 
          size="small" 
          onClick={handleMenuOpen}
          aria-label="change status"
          aria-controls="status-menu"
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        
        <Menu
          id="status-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleStatusChange('unread')}>Unread</MenuItem>
          <MenuItem onClick={() => handleStatusChange('reading')}>Currently Reading</MenuItem>
          <MenuItem onClick={() => handleStatusChange('read')}>Read</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default BookItem;
