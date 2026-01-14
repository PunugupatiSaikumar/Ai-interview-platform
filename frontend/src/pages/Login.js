import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import Logo from '../components/Logo';
import AIBackground from '../components/AIBackground';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bgcolor: '#ffffff',
        py: 4,
        overflow: 'hidden',
      }}
    >
      {/* Background Illustration */}
      <AIBackground />
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Header with Logo */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: 'text.secondary',
                fontSize: '1rem',
                fontWeight: 400,
              }}
            >
              Welcome to
            </Typography>
            <Logo size={56} showText={true} />
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              Get started - it's free. No credit card needed.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%', borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              fullWidth
              required
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  },
                },
              }}
            />
            <TextField
              fullWidth
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 4,
                bgcolor: 'primary.main',
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
            </Button>
          </form>

          {/* Terms and Privacy */}
          <Typography
            variant="caption"
            sx={{
              mb: 3,
              color: 'text.secondary',
              textAlign: 'center',
              fontSize: '0.75rem',
            }}
          >
            By proceeding, you agree to the{' '}
            <Link
              to="#"
              style={{ color: '#0f172a', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                alert('Terms of Service');
              }}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to="#"
              style={{ color: '#0f172a', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                alert('Privacy Policy');
              }}
            >
              Privacy Policy
            </Link>
            .
          </Typography>

          {/* Already have account link */}
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;

