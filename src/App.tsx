import React from 'react';
import './App.css';
import BookList from './components/BookList';
import { BookProvider } from './context/BookContext';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';

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
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book List App
          </Typography>
        </Toolbar>
      </AppBar>
      <BookProvider>
        <BookList />
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
