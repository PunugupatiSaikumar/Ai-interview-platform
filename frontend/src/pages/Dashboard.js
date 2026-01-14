import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress,
  Chip,
  Fade,
  Grow,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState('coding');
  const [category, setCategory] = useState('algorithms');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/analytics/overview');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Set default stats on error
      setStats({
        totalQuestions: 0,
        avgScore: 0,
        categoryStats: [],
        typeStats: []
      });
    }
  };

  const handleStartPractice = async () => {
    setLoading(true);
    try {
      const response = await api.post('/chat/session', {
        question_type: questionType,
      });
      
      if (response.data.sessionId) {
        setSnackbar({ open: true, message: 'Session started successfully!', severity: 'success' });
        setTimeout(() => {
          navigate('/chat', { state: { sessionId: response.data.sessionId } });
        }, 500);
      } else {
        throw new Error('No sessionId returned from server');
      }
    } catch (error) {
      console.error('Failed to start session:', error);
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.error || error.message || 'Failed to start practice session. Please try again.',
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Fade in={true}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
            Welcome Back! 👋
          </Typography>

          {stats && (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Grow in={true} timeout={500}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography color="inherit" variant="body2" sx={{ opacity: 0.9 }}>
                          Total Questions
                        </Typography>
                        <CodeIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        {stats.totalQuestions || 0}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.min((stats.totalQuestions || 0) * 10, 100)} 
                        sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }}
                      />
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Grow in={true} timeout={700}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography color="inherit" variant="body2" sx={{ opacity: 0.9 }}>
                          Average Score
                        </Typography>
                        <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        {stats.avgScore ? stats.avgScore.toFixed(1) : '0'}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={stats.avgScore || 0} 
                        sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }}
                      />
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Grow in={true} timeout={900}>
                  <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography color="textSecondary" variant="body2">
                          Practice Type
                        </Typography>
                        <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          label="Coding" 
                          color="primary" 
                          icon={<CodeIcon />}
                          sx={{ fontWeight: 600 }}
                        />
                        <Chip 
                          label="Behavioral" 
                          color="secondary" 
                          icon={<PsychologyIcon />}
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            </Grid>
          )}

          <Grow in={true} timeout={1000}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.03) 0%, rgba(8, 145, 178, 0.05) 100%)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Start Practice Session
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Choose your preferences and begin your interview preparation
                  </Typography>
                </Box>
              </Box>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Question Type</InputLabel>
                    <Select
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                      label="Question Type"
                    >
                      <MenuItem value="coding">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CodeIcon fontSize="small" />
                          Coding
                        </Box>
                      </MenuItem>
                      <MenuItem value="behavioral">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PsychologyIcon fontSize="small" />
                          Behavioral
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="algorithms">Algorithms</MenuItem>
                      <MenuItem value="data-structures">Data Structures</MenuItem>
                      <MenuItem value="system-design">System Design</MenuItem>
                      <MenuItem value="general">General</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      label="Difficulty"
                    >
                      <MenuItem value="easy">
                        <Chip label="Easy" color="success" size="small" sx={{ fontWeight: 600 }} />
                      </MenuItem>
                      <MenuItem value="medium">
                        <Chip label="Medium" color="warning" size="small" sx={{ fontWeight: 600 }} />
                      </MenuItem>
                      <MenuItem value="hard">
                        <Chip label="Hard" color="error" size="small" sx={{ fontWeight: 600 }} />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Button
                variant="contained"
                size="large"
                onClick={handleStartPractice}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Starting Session...' : 'Start Practice Session'}
              </Button>
            </Paper>
          </Grow>
        </Box>
      </Fade>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;

