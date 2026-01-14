import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  CircularProgress,
  Fade,
  Grow,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CodeIcon from '@mui/icons-material/Code';
import AssessmentIcon from '@mui/icons-material/Assessment';
import api from '../services/api';

const COLORS = ['#0f172a', '#0891b2', '#2563eb', '#059669'];

const Analytics = () => {
  const [overview, setOverview] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [typeStats, setTypeStats] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [overviewRes, categoryRes, typeRes] = await Promise.all([
        api.get('/analytics/overview'),
        api.get('/analytics/category'),
        api.get('/analytics/type'),
      ]);

      setOverview(overviewRes.data);
      setCategoryStats(categoryRes.data.stats || []);
      setTypeStats(typeRes.data.stats || []);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  return (
    <Box>
      <Fade in={true}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            Your Performance Analytics 📊
          </Typography>

          {overview ? (
            <>
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
                          {overview.totalQuestions || 0}
                        </Typography>
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
                          {overview.avgScore ? overview.avgScore.toFixed(1) : '0'}%
                        </Typography>
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
                            Practice Sessions
                          </Typography>
                          <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          {overview.recentActivity?.length || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {categoryStats.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Fade in={true} timeout={1000}>
                      <Paper 
                        elevation={0}
                        sx={{ 
                          p: 3,
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                          Performance by Category
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={categoryStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="category" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip 
                              contentStyle={{ 
                                borderRadius: 8,
                                border: '1px solid #e0e0e0',
                              }}
                            />
                            <Legend />
                            <Bar 
                              dataKey="avg_score" 
                              fill="#0f172a" 
                              name="Avg Score"
                              radius={[8, 8, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Fade>
                  </Grid>
                )}

                {typeStats.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Fade in={true} timeout={1200}>
                      <Paper 
                        elevation={0}
                        sx={{ 
                          p: 3,
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                          Questions by Type
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={typeStats}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#0f172a"
                              dataKey="total"
                            >
                              {typeStats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                borderRadius: 8,
                                border: '1px solid #e0e0e0',
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Fade>
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default Analytics;

