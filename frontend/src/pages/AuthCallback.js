import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import api from '../services/api';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      // Handle OAuth error
      navigate('/login?error=oauth_failed');
      return;
    }

    if (token) {
      // Store token and set auth header
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user info from backend
      api.get('/auth/me')
        .then(response => {
          // User will be set by AuthContext on page reload
          // Redirect to dashboard
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
          navigate('/login?error=user_fetch_failed');
        });
    } else {
      // No token, redirect to login
      navigate('/login?error=no_token');
    }
  }, [searchParams, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress size={60} sx={{ mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Completing sign in...
      </Typography>
    </Box>
  );
};

export default AuthCallback;
