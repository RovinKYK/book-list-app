import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert, Tabs, Tab } from '@mui/material';
import BookCard from './BookCard';
import BookService from '../services/BookService';

const BookList = ({ refreshTrigger }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState('all');
  
  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);
  
  const fetchBooks = async () => {
    setLoading(true);
    try {
      // First fetch all book UUIDs
      const bookUuids = await BookService.getAllBooks();
      
      // Then fetch details for each book
      const bookDetailsPromises = bookUuids.map(uuid => BookService.getBookByUuid(uuid));
      const bookDetailsResults = await Promise.all(bookDetailsPromises);
      
      // Add the UUID to each book object
      const booksWithIds = bookDetailsResults.map((bookDetails, index) => ({
        ...bookDetails,
        uuid: bookUuids[index]
      }));
      
      setBooks(booksWithIds);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredBooks = () => {
    if (currentTab === 'all') return books;
    return books.filter(book => book.status === currentTab);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  if (books.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">No books in your list yet.</Typography>
        <Typography color="text.secondary">Add a new book to get started!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          aria-label="book status tabs"
        >
          <Tab label="All Books" value="all" />
          <Tab label="Unread" value="unread" />
          <Tab label="Reading" value="reading" />
          <Tab label="Read" value="read" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredBooks().map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.uuid}>
            <BookCard 
              book={book} 
              onBookUpdated={fetchBooks} 
              onBookDeleted={fetchBooks} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
