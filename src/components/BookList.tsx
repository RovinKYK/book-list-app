import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookItem from './BookItem';
import AddBookForm from './AddBookForm';
import { 
  Grid as MuiGrid, 
  Typography, 
  Button, 
  Container, 
  Box, 
  CircularProgress,
  Alert,
  InputAdornment,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Fab,
  Tooltip
} from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon, Search as SearchIcon } from '@mui/icons-material';
import { Book } from '../types/Book';

// Create a Grid component that doesn't require a component prop
const Grid = (props: any) => <MuiGrid {...props} />;

const BookList: React.FC = () => {
  const { books, loading, error, fetchBooks } = useBooks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'reading' | 'read'>('all');
  
  // Handle book filtering
  const filteredBooks = books.filter((book) => {
    // Apply search filter
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRefresh = () => {
    fetchBooks();
  };

  // Status counts for summary
  const statusCounts = {
    unread: books.filter(book => book.status === 'unread').length,
    reading: books.filter(book => book.status === 'reading').length,
    read: books.filter(book => book.status === 'read').length,
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Reading List
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />} 
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
        
        {/* Filter and search controls */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search books"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Filter by Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={filterStatus}
                label="Filter by Status"
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'unread' | 'reading' | 'read')}
              >
                <MenuItem value="all">All Books</MenuItem>
                <MenuItem value="unread">Unread</MenuItem>
                <MenuItem value="reading">Currently Reading</MenuItem>
                <MenuItem value="read">Read</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        {/* Summary cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={4}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="h5">{statusCounts.unread}</Typography>
              <Typography variant="body2">Books to Read</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="h5">{statusCounts.reading}</Typography>
              <Typography variant="body2">Currently Reading</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="h5">{statusCounts.read}</Typography>
              <Typography variant="body2">Completed Books</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading state */}
        {loading ? (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Empty state */}
            {books.length === 0 ? (
              <Box textAlign="center" py={5}>
                <Typography variant="h6" gutterBottom>
                  Your reading list is empty
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Click the add button to start building your reading list
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  sx={{ mt: 2 }}
                >
                  Add Your First Book
                </Button>
              </Box>
            ) : (
              /* Books grid */
              <>
                {filteredBooks.length === 0 ? (
                  <Box textAlign="center" py={5}>
                    <Typography variant="body1">
                      No books match your search criteria.
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {filteredBooks.map((book: Book) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={book.uuid}>
                        <BookItem book={book} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </>
        )}

        {/* Floating action button to add new books */}
        <Tooltip title="Add a new book">
          <Fab 
            color="primary" 
            aria-label="add" 
            onClick={handleOpenDialog}
            sx={{ position: 'fixed', bottom: 20, right: 20 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        <AddBookForm open={dialogOpen} onClose={handleCloseDialog} />
      </Box>
    </Container>
  );
};

export default BookList;
