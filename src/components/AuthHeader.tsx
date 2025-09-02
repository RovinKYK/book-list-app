import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Person as PersonIcon, Login as LoginIcon } from '@mui/icons-material';

interface UserInfo {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
}

interface AuthHeaderProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ onAuthChange }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for userinfo cookie first (recommended method)
      const encodedUserInfo = getCookie('userinfo');
      if (encodedUserInfo) {
        const userInfo = JSON.parse(atob(encodedUserInfo));
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // Clear the cookie (important!)
        deleteCookie('userinfo');
        onAuthChange?.(true);
        return;
      }

      // Check localStorage for existing user info
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        onAuthChange?.(true);
        return;
      }

      // Try the userinfo endpoint as fallback
      const response = await fetch('/auth/userinfo');
      if (response.ok) {
        const userInfo = await response.json();
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        onAuthChange?.(true);
      } else {
        onAuthChange?.(false);
      }
    } catch (error) {
      console.log('User not authenticated');
      onAuthChange?.(false);
    }
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  const handleLogout = () => {
    // Clear stored user data
    localStorage.removeItem('user');
    setUser(null);
    
    // Redirect to logout with session hint
    const sessionHint = getCookie('session_hint');
    window.location.href = '/auth/logout' + (sessionHint ? '?session_hint=' + sessionHint : '');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getUserDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user?.username || user?.email || 'User';
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book List App
        </Typography>
        {user ? (
          <Box>
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              startIcon={<Avatar sx={{ width: 24, height: 24 }}><PersonIcon /></Avatar>}
            >
              {getUserDisplayName()}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            color="inherit"
            onClick={handleLogin}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AuthHeader;
