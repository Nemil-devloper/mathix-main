import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// Extend the Window interface to include SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface Message {
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en-US');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL;
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (recognition) {
    recognition.lang = language;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setUserInput(speechResult);
      appendMessage(speechResult, 'user');
      fetchAIResponse(speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
      appendMessage('Voice recognition error occurred.', 'ai');
    };

    recognition.onend = () => setIsListening(false);
  }

  const appendMessage = (content: string, sender: 'user' | 'ai') => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prevMessages) => [...prevMessages, { content, sender, timestamp }]);
  };

  const fetchAIResponse = async (userMessage: string) => {
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
              content: `You are MyMathix, an AI-powered math learning assistant designed to help students understand and solve math problems from basic to advanced levels.
You explain concepts clearly and step-by-step, using LaTeX formatting for mathematical expressions to make solutions visually intuitive.
Always be friendly, encouraging, and patient like a real math tutor.
Provide relevant examples, highlight important formulas, and relate problems to real-life situations where appropriate.
If a student asks a question like Solve x^2 + 3x - 4 = 0, respond in the following structured format:
- Restate the question
- Explain the method being used
- Solve step-by-step using proper formatting (e.g., LaTeX)
- Conclude with the final answer
- Optionally suggest a related topic to explore

If a student types a topic like integration, provide an overview, key rules, and a basic example.`,
            },
            { role: 'user', content: userMessage },
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_completion_tokens: 1024,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch AI response');

      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || 'I couldn’t process your question. Could you try rephrasing it?';
      appendMessage(aiMessage, 'ai');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      appendMessage('Sorry, there was an error processing your request.', 'ai');
    }
  };

  const handleSend = () => {
    if (userInput.trim()) {
      appendMessage(userInput, 'user');
      fetchAIResponse(userInput);
      setUserInput('');
    } else {
      appendMessage('Please type a message before sending.', 'ai');
    }
  };

  const startVoiceRecognition = () => {
    if (!recognition) {
      appendMessage('Voice recognition is not supported in this browser.', 'ai');
      return;
    }
    recognition.start();
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    if (recognition) recognition.lang = selectedLanguage;
  };

  const handleNavigate = (path: string) => {
    navigate(path); // Use navigate to programmatically change routes
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  const handleProfileClick = () => {
    // Implement profile click logic
    console.log('Profile clicked');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#343541',
        color: '#d1d5db',
        overflow: 'hidden',
      }}
    >
      <Navbar
        username={username}
        navigate={handleNavigate}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#444654',
          marginTop: { xs: '56px', sm: '64px', md: '64px' },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: { xs: 1, sm: 2 },
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#2c2f33',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(45deg, #00ffcc, #0066ff)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'linear-gradient(45deg, #00cc99, #0044cc)',
            },
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, #007bff, #0056b3)'
                  : '#f1f1f1',
                color: msg.sender === 'user' ? 'white' : 'black',
                padding: { xs: '6px 8px', sm: '8px 12px' },
                borderRadius: msg.sender === 'user'
                  ? { xs: '10px 10px 0 10px', sm: '12px 12px 0 12px' }
                  : { xs: '10px 10px 10px 0', sm: '12px 12px 12px 0' },
                maxWidth: { xs: '90%', sm: '70%' },
                fontSize: { xs: '0.95rem', sm: '1rem' },
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                margin: '4px 0',
              }}
            >
              {msg.sender === 'ai' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    // Optionally, you can style math blocks here
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <Typography variant="body2">{msg.content}</Typography>
              )}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  color: '#9ca3af',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                }}
              >
                {msg.timestamp}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box
          sx={{
            padding: { xs: 1, sm: 2 },
            backgroundColor: '#40414f',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 2 },
            alignItems: { xs: 'stretch', sm: 'center' },
          }}
        >
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{
              color: '#d1d5db',
              backgroundColor: '#555770',
              borderRadius: 1,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              minWidth: { xs: 100, sm: 120 },
              mb: { xs: 1, sm: 0 },
            }}
          >
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="hi-IN">Hindi</MenuItem>
            <MenuItem value="gu-IN">Gujarati</MenuItem>
          </Select>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask a question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            sx={{
              backgroundColor: '#555770',
              borderRadius: 1,
              input: { color: '#d1d5db', fontSize: { xs: '0.95rem', sm: '1rem' } },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'row' }, gap: 1, mt: { xs: 1, sm: 0 } }}>
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{
                backgroundColor: '#10a37f',
                color: 'white',
                fontSize: { xs: '0.95rem', sm: '1rem' },
                minWidth: { xs: 70, sm: 90 },
                '&:hover': { backgroundColor: '#0e8c6c' },
              }}
            >
              Send
            </Button>
            <Button
              onClick={startVoiceRecognition}
              sx={{
                backgroundColor: isListening ? '#ff5722' : '#3f51b5',
                color: 'white',
                fontSize: { xs: '0.95rem', sm: '1rem' },
                minWidth: { xs: 70, sm: 90 },
                '&:hover': { backgroundColor: isListening ? '#e64a19' : '#303f9f' },
              }}
            >
              {isListening ? 'Listening...' : '🎤'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;