import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Alert, Box } from '@mui/material';
import AuthHeader from './components/AuthHeader';
import BookList from './components/BookList';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthHeader onAuthChange={setIsAuthenticated} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {isAuthenticated ? (
          <BookList />
        ) : (
          <Box textAlign="center" py={8}>
            <Alert severity="info">
              Please log in to view and manage your book collection.
            </Alert>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
