import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Typography, Alert, Snackbar, createTheme, ThemeProvider } from '@mui/material';
import './App.css';

// Components
import Header from './components/Header';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Segoe UI',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [configError, setConfigError] = useState(null);

  // Check if the app is running in Choreo environment or local
  useEffect(() => {
    // If in Choreo, window.configs should be defined via the public/config.js file
    // For local development, we use env variables
    if (!window.configs && !process.env.REACT_APP_API_URL) {
      console.warn('No API configuration found. Using default configuration.');
    }
  }, []);

  const handleBookAdded = () => {
    setRefreshCounter(prev => prev + 1);
    setNotification({
      open: true,
      message: 'Book added successfully!',
      severity: 'success'
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              My Book List
            </Typography>
            <AddBookForm onBookAdded={handleBookAdded} />
          </Box>

          {configError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {configError}
            </Alert>
          )}

          <BookList refreshTrigger={refreshCounter} />
        </Box>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
