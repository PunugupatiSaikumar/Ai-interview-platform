import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Pagination,
  CircularProgress,
  Card,
  Fade,
  Tooltip,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import api from '../services/api';

const History = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await api.get('/history', {
        params: {
          limit: 20,
          offset: (page - 1) * 20,
        },
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Fade in={true}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Your Practice History 📚
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : questions.length === 0 ? (
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No practice history yet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Start practicing to see your questions here!
              </Typography>
            </Card>
          ) : (
            <>
              <TableContainer 
                component={Paper} 
                elevation={0}
                sx={{ 
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Question</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Score</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Provider</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((q, idx) => (
                      <Fade in={true} timeout={300} key={q.id} style={{ transitionDelay: `${idx * 50}ms` }}>
                        <TableRow 
                          hover
                          sx={{ 
                            '&:hover': { 
                              bgcolor: 'action.hover',
                              cursor: 'pointer',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <TableCell>
                            <Chip
                              icon={q.type === 'coding' ? <CodeIcon /> : <PsychologyIcon />}
                              label={q.type}
                              color={q.type === 'coding' ? 'primary' : 'secondary'}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={q.category} 
                              variant="outlined" 
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ maxWidth: 400 }}>
                            <Tooltip title={q.question_text}>
                              <Typography variant="body2" noWrap>
                                {q.question_text}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            {q.score !== null ? (
                              <Chip
                                label={`${q.score}%`}
                                color={q.score >= 80 ? 'success' : q.score >= 60 ? 'warning' : 'error'}
                                size="small"
                                sx={{ fontWeight: 600 }}
                              />
                            ) : (
                              <Chip label="Pending" size="small" variant="outlined" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={q.ai_provider} 
                              size="small" 
                              variant="outlined"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(q.created_at).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={Math.ceil(questions.length / 20)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default History;

