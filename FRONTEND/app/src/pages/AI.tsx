import React, { useState } from 'react';
import { Box, Typography, Paper, Container, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';

const AI: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ content: string; sender: 'user' | 'ai' }[]>([]);
  const [userInput, setUserInput] = useState('');

  const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const appendMessage = (content: string, sender: 'user' | 'ai') => {
    setMessages((prev) => [...prev, { content, sender }]);
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an AI math assistant. Format responses with appropriate mathematical notation where applicable.',
            },
            { role: 'user', content: userMessage },
          ],
          model: 'llama-3.3-70b-versatile',
          stream: false,
          temperature: 0,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const aiMessage = data.choices && data.choices[0].message.content;
      return aiMessage || "Sorry, I couldn't find an answer.";
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };

  const handleSend = async () => {
    if (userInput.trim()) {
      appendMessage(userInput, 'user');
      setUserInput('');
      const aiResponse = await getAIResponse(userInput);
      appendMessage(aiResponse, 'ai');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', // Updated background gradient
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 3,
        color: '#f0f0f0', // Updated text color for better contrast
      }}
    >
      <Navbar username="User" navigate={navigate} onLogout={handleLogout} /> {/* Use Navbar */}
      <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Updated paper background for better contrast
            color: '#ffffff', // Ensure text inside the paper is white
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
            AI Math Learning Chatbot
          </Typography>
          <Box
            sx={{
              height: '400px',
              overflowY: 'auto',
              marginBottom: 2,
              padding: 2,
              border: '1px solid #fff',
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Chat container background
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  marginBottom: 1,
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: message.sender === 'user'
                    ? 'linear-gradient(135deg, rgba(0, 123, 255, 0.7), rgba(0, 0, 255, 0.7))'
                    : 'linear-gradient(135deg, rgb(255, 255, 255), rgb(83, 86, 249))',
                  color: message.sender === 'user' ? 'white' : 'black',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                  maxWidth: '90%',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message.content}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                input: { color: 'white' },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{
                backgroundColor: '#3d9fff',
                '&:hover': { backgroundColor: '#2a80c3' },
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AI;
