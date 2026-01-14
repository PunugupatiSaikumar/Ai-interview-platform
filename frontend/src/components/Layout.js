import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Tabs,
  Tab,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const getTabValue = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 0;
    if (path.includes('/chat')) return 1;
    if (path.includes('/history')) return 2;
    if (path.includes('/analytics')) return 3;
    return 0;
  };

  const handleTabChange = (event, newValue) => {
    const routes = ['/dashboard', '/chat', '/history', '/analytics'];
    navigate(routes[newValue]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'primary.main',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Logo size={32} showText={true} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{user?.name?.charAt(0).toUpperCase()}</Avatar>}
              label={user?.name}
              sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 500, border: '1px solid rgba(255,255,255,0.2)' }}
            />
            <Tooltip title="Logout">
              <IconButton 
                color="inherit" 
                onClick={logout}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <Tabs 
          value={getTabValue()} 
          onChange={handleTabChange} 
          textColor="inherit" 
          indicatorColor="secondary"
          sx={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            '& .MuiTab-root': {
              minHeight: 64,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.8)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
                color: 'white',
              },
              '&.Mui-selected': {
                color: 'white',
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
          <Tab icon={<ChatIcon />} iconPosition="start" label="Chat" />
          <Tab icon={<HistoryIcon />} iconPosition="start" label="History" />
          <Tab icon={<AnalyticsIcon />} iconPosition="start" label="Analytics" />
        </Tabs>
      </AppBar>
      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1, 
          py: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;

