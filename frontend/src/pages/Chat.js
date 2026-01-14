import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Slide,
  Tooltip,
  Fab,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLocation } from 'react-router-dom';
import api from '../services/api';

const Chat = () => {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(location.state?.sessionId || null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('chat');
  const [provider, setProvider] = useState('auto');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      loadSession();
    } else {
      startNewSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startNewSession = async () => {
    try {
      const response = await api.post('/chat/session', {
        question_type: 'coding',
      });
      setSessionId(response.data.sessionId);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Failed to start session:', error);
      const errorMsg = error.response?.data?.error || 'Failed to start session. Please try again.';
      setMessages([{
        role: 'assistant',
        content: `Error: ${errorMsg}`
      }]);
    }
  };

  const loadSession = async () => {
    if (!sessionId) {
      console.error('No sessionId provided');
      startNewSession();
      return;
    }
    
    try {
      console.log('Loading session:', sessionId);
      const response = await api.get(`/chat/session/${sessionId}`);
      setMessages(response.data.session.messages || []);
    } catch (error) {
      console.error('Failed to load session:', error);
      console.error('Error details:', error.response?.data);
      const errorMsg = error.response?.data?.error || 'Failed to load session.';
      // If session not found, start a new one
      if (error.response?.status === 404) {
        startNewSession();
      } else {
        setMessages([{
          role: 'assistant',
          content: `Error: ${errorMsg}`
        }]);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    // Add user message to UI immediately
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await api.post('/chat/message', {
        sessionId,
        message: userMessage,
        action,
        provider,
      });

      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMsg = error.response?.data?.error || 'Sorry, I encountered an error. Please try again.';
      setMessages([...newMessages, {
        role: 'assistant',
        content: `Error: ${errorMsg}`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestion = async () => {
    setLoading(true);
    try {
      const response = await api.post('/questions/generate', {
        type: 'coding',
        category: 'algorithms',
        difficulty: 'medium',
        provider,
      });
      setMessages([
        ...messages,
        { role: 'assistant', content: response.data.question },
      ]);
    } catch (error) {
      console.error('Failed to generate question:', error);
      const errorMsg = error.response?.data?.error || 'Failed to generate question. Please check your API keys and credits.';
      setMessages([
        ...messages,
        { 
          role: 'assistant', 
          content: `❌ Error: ${errorMsg}\n\nPlease check:\n- OpenAI credits: https://platform.openai.com/account/billing\n- Gemini API key: https://makersuite.google.com/app/apikey` 
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      pt: 3,
    }}>
      {/* Action Bar */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 2, 
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Action Type</InputLabel>
            <Select 
              value={action} 
              onChange={(e) => setAction(e.target.value)} 
              label="Action Type"
            >
              <MenuItem value="chat">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SendIcon fontSize="small" />
                  Chat
                </Box>
              </MenuItem>
              <MenuItem value="question">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesomeIcon fontSize="small" />
                  Generate Question
                </Box>
              </MenuItem>
              <MenuItem value="hint">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LightbulbIcon fontSize="small" />
                  Get Hint
                </Box>
              </MenuItem>
              <MenuItem value="evaluate">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssessmentIcon fontSize="small" />
                  Evaluate Answer
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>AI Provider</InputLabel>
            <Select 
              value={provider} 
              onChange={(e) => setProvider(e.target.value)} 
              label="AI Provider"
            >
              <MenuItem value="auto">Auto Select</MenuItem>
              <MenuItem value="openai">OpenAI</MenuItem>
              <MenuItem value="gemini">Gemini</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            startIcon={<AutoAwesomeIcon />}
            onClick={handleGenerateQuestion} 
            disabled={loading}
            sx={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Generate Question
          </Button>
        </Box>
      </Paper>

      {/* Chat Messages */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: 3,
          overflow: 'auto',
          mb: 2,
          borderRadius: 3,
          bgcolor: 'background.default',
          border: '1px solid',
          borderColor: 'divider',
          minHeight: 0, // Important for flex scrolling
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'background.paper',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'primary.main',
            borderRadius: '4px',
          },
        }}
      >
        {messages.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: 'text.secondary',
          }}>
            <SmartToyIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              Start a conversation
            </Typography>
            <Typography variant="body2">
              Ask a question or generate a practice question to begin
            </Typography>
          </Box>
        )}
        
        {messages.map((msg, idx) => (
          <Slide direction={msg.role === 'user' ? 'left' : 'right'} in={true} key={idx}>
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              {msg.role === 'assistant' && (
                <Avatar sx={{ bgcolor: 'primary.main', mt: 0.5 }}>
                  <SmartToyIcon />
                </Avatar>
              )}
              
              <Paper
                elevation={2}
                sx={{
                  p: 2.5,
                  maxWidth: '75%',
                  borderRadius: 3,
                  backgroundColor: msg.role === 'user' 
                    ? 'primary.main' 
                    : 'background.paper',
                  color: msg.role === 'user' ? 'white' : 'text.primary',
                  border: msg.role === 'assistant' ? '1px solid' : 'none',
                  borderColor: msg.role === 'assistant' ? 'divider' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {msg.role === 'user' ? (
                    <PersonIcon fontSize="small" />
                  ) : (
                    <SmartToyIcon fontSize="small" />
                  )}
                  <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9 }}>
                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                  </Typography>
                </Box>
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code 
                          className={className} 
                          {...props}
                          style={{
                            backgroundColor: msg.role === 'user' 
                              ? 'rgba(255,255,255,0.2)' 
                              : 'rgba(99, 102, 241, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.9em',
                          }}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </Paper>
              
              {msg.role === 'user' && (
                <Avatar sx={{ bgcolor: 'secondary.main', mt: 0.5 }}>
                  <PersonIcon />
                </Avatar>
              )}
            </Box>
          </Slide>
        ))}
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1, p: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <SmartToyIcon />
            </Avatar>
            <Paper sx={{ p: 2, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="textSecondary">
                  AI is thinking...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      {/* Input Area - Fixed at bottom */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 2, 
          borderRadius: 3,
          bgcolor: 'background.paper',
          flexShrink: 0,
          mt: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message or question here..."
            disabled={loading}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Tooltip title="Send message">
            <span>
              <Fab
                color="primary"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                sx={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <SendIcon />
              </Fab>
            </span>
          </Tooltip>
        </Box>
        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
          Press Enter to send, Shift+Enter for new line
        </Typography>
      </Paper>
    </Box>
  );
};

export default Chat;

