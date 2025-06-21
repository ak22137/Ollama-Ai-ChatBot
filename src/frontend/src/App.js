import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip
} from '@mui/material';
import {
  Send as SendIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('qwen3:1.7b');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:8001/models');
      setModels(response.data.models);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    const newUserMessage = {
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      id: Date.now()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8001/chat', {
        message: userMessage,
        model: selectedModel
      });

      const botMessage = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        model: response.data.model,
        id: Date.now() + 1
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        text: error.response?.data?.detail || 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header */}
      <Paper elevation={2} sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BotIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h5" fontWeight="bold" color="primary">
              AI Chatbot
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Created by Akshat Singh Panwar
            </Typography>
          </Box>
          <Chip 
            label="Powered by Ollama" 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Model</InputLabel>
            <Select
              value={selectedModel}
              label="Model"
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {models.map((model) => (
                <MenuItem key={model.name} value={model.name}>
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Tooltip title="Refresh models">
            <IconButton onClick={fetchModels} size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Clear conversation">
            <IconButton onClick={clearChat} size="small">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Messages Container */}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {messages.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            color: 'text.secondary'
          }}>
            <BotIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              Welcome to AI Chatbot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created by Akshat Singh Panwar
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Start a conversation with the AI assistant. Ask anything!
            </Typography>
          </Box>
        )}

        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: 1,
              maxWidth: '80%',
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
            }}>
              <Avatar sx={{ 
                width: 32, 
                height: 32,
                backgroundColor: message.sender === 'user' ? 'primary.main' : 'secondary.main'
              }}>
                {message.sender === 'user' ? <PersonIcon /> : <BotIcon />}
              </Avatar>
              
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: message.sender === 'user' 
                    ? 'primary.main' 
                    : message.isError 
                      ? 'error.light' 
                      : 'white',
                  color: message.sender === 'user' 
                    ? 'white' 
                    : message.isError 
                      ? 'error.contrastText' 
                      : 'text.primary',
                  borderRadius: message.sender === 'user' 
                    ? '18px 18px 4px 18px' 
                    : '18px 18px 18px 4px',
                  maxWidth: '100%',
                  wordBreak: 'break-word'
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.text}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    opacity: 0.7, 
                    mt: 1, 
                    display: 'block',
                    textAlign: message.sender === 'user' ? 'right' : 'left'
                  }}
                >
                  {message.timestamp}
                  {message.model && ` • ${message.model}`}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Avatar sx={{ 
                width: 32, 
                height: 32,
                backgroundColor: 'secondary.main'
              }}>
                <BotIcon />
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: 'white',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  minWidth: '80px'
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'grey.400',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' }
                      }
                    }}
                  />
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'grey.400',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      animationDelay: '-0.32s',
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' }
                      }
                    }}
                  />
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'grey.400',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                      animationDelay: '-0.16s',
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' }
                      }
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Container */}
      <Paper elevation={3} sx={{ 
        backgroundColor: 'white',
        borderRadius: 0
      }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', p: 2 }}>
          <TextField
            ref={inputRef}
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                paddingRight: '8px'
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '&:disabled': {
                backgroundColor: 'grey.300',
                color: 'grey.500'
              },
              width: 48,
              height: 48
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
        
        {/* Footer */}
        <Box sx={{ 
          textAlign: 'center', 
          py: 1, 
          borderTop: 1, 
          borderColor: 'divider',
          backgroundColor: 'grey.50'
        }}>
          <Typography variant="caption" color="text.secondary">
            Created by Akshat Singh Panwar • Powered by Ollama
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;