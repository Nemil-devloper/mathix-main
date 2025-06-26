import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const AIRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState<number>(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL;
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);

    const fetchProfileAndSuggestion = async () => {
      try {
        const token = localStorage.getItem('token');
        let userPageCount = 0;
        if (token) {
          // Fetch profile to get pageCount
          const profileRes = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          userPageCount = profileRes.data.pageCount || 0;
          setPageCount(userPageCount);
        }

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
                content: `You are MyMathix, an AI math mentor. The student "${storedUsername}" has visited ${userPageCount} pages in the app. Based on this, suggest which section or topic they should focus on next. Be encouraging and specific.`
              }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_completion_tokens: 256,
          }),
        });

        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        const aiSuggestion = data.choices?.[0]?.message?.content || 'No suggestion available.';
        setSuggestion(aiSuggestion);
      } catch (err) {
        setSuggestion('Could not fetch recommendation.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndSuggestion();
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Navbar
        username={username}
        navigate={navigate}
        onLogout={() => navigate('/login')}
        onProfileClick={() => {}}
      />
      <Box
        sx={{
          marginTop: { xs: '70px', sm: '100px' },
          padding: { xs: 1, sm: 3 },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 4 },
            borderRadius: 3,
            minWidth: { xs: '90vw', sm: 350 },
            maxWidth: { xs: '95vw', sm: 600 },
            margin: '0 auto',
            background: '#fff',
            color: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 120,
            boxSizing: 'border-box',
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress color="inherit" size={28} />
              <Typography sx={{ color: '#222', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                Fetching your personalized suggestion...
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: '100%' }}>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ node, ...props }) => (
                    <Typography
                      sx={{
                        color: suggestion === 'Could not fetch recommendation.' ? 'red' : '#222',
                        fontSize: { xs: '1rem', sm: '1.15rem' },
                        fontFamily: 'Roboto, sans-serif',
                        textAlign: 'center',
                        wordBreak: 'break-word',
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {suggestion}
              </ReactMarkdown>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AIRecommendation;