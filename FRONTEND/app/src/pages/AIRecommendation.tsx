import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AIRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);

    const fetchSuggestion = async () => {
      try {
        await fetch(`${FASTAPI_URL}/visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: storedUsername }),
        });
        const res = await fetch(`${FASTAPI_URL}/recommendation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: storedUsername }),
        });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        // Show only the message from the Python FastAPI (LangChain LLM)
        setSuggestion(data && typeof data.suggestion === 'string' ? data.suggestion : 'No suggestion available.');
      } catch (err) {
        setSuggestion('Could not fetch recommendation.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
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
        padding: 3,
      }}
    >
      <Navbar
        username={username}
        navigate={navigate}
        onLogout={() => navigate('/login')}
        onProfileClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Box sx={{ marginTop: '100px', padding: 3, display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            minWidth: 350,
            maxWidth: 600,
            margin: '0 auto',
            background: '#fff',
            color: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 120,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress color="inherit" size={28} />
              <Typography sx={{ color: '#222' }}>Fetching your personalized suggestion...</Typography>
            </Box>
          ) : (
            <Typography sx={{ color: suggestion === 'Could not fetch recommendation.' ? 'red' : '#222', fontSize: '18px', fontFamily: 'Roboto, sans-serif', textAlign: 'center' }}>
              {suggestion}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AIRecommendation;
