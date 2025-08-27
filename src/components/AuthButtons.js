import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const AuthButtons = () => {
  const isLoggedIn = true; // In a real app, you would determine this from your auth state

  const handleLogin = () => {
    // Choreo managed auth will handle this
    window.location.href = '/auth/login';
  };

  const handleLogout = () => {
    // Choreo managed auth will handle this
    window.location.href = '/auth/logout';
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isLoggedIn ? (
        <Button 
          color="inherit" 
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      ) : (
        <Button 
          color="inherit" 
          onClick={handleLogin}
          startIcon={<LoginIcon />}
        >
          Login
        </Button>
      )}
    </Box>
  );
};

export default AuthButtons;
