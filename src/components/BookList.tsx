import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, CardActions, 
  Button, CircularProgress, TextField, InputAdornment, Grid 
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BookService } from '../services/BookService';
import { Book } from '../models/Book';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await BookService.getAllBooks();
        setBooks(data);
        setFilteredBooks(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = books.filter(
        book => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query) ||
          (book.isbn && book.isbn.includes(query))
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/books/${id}`);
  };

  const handleAddBook = () => {
    navigate('/books/new');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Book Collection
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddBook}>
          Add New Book
        </Button>
      </Box>

      <TextField
        fullWidth
        margin="normal"
        label="Search Books"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Box mt={2} mb={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {filteredBooks.length === 0 && !loading ? (
        <Typography variant="h6">No books found. Add a new book to get started.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
          {filteredBooks.map((book) => (
            <Box key={book.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  }
                }}
              >
                {book.coverImage ? (
                  <Box
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                      width: '100%'
                    }}
                    alt={book.title}
                    src={book.coverImage}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      backgroundColor: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      No Cover Image
                    </Typography>
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    By {book.author}
                  </Typography>
                  {book.publishedYear && (
                    <Typography variant="body2" color="textSecondary">
                      Published: {book.publishedYear}
                    </Typography>
                  )}
                  {book.isbn && (
                    <Typography variant="body2" color="textSecondary">
                      ISBN: {book.isbn}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => handleViewDetails(book.id)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default BookList;
