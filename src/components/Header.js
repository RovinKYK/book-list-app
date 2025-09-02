import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ mb: 4 }}>
      <Toolbar>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MenuBookIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              Book List App
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
