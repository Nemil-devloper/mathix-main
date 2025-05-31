import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Grid,
} from '@mui/material';
import { FormatQuote, Refresh } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Motivation: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill",
    "The only way to learn mathematics is to do mathematics. - Paul Halmos",
    "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding. - William Paul Thurston",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  ];

  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);
  const [streak, setStreak] = useState<number>(0);
  const [visibleStories, setVisibleStories] = useState<number>(2); // Number of stories to show initially

  const successStories = [
    {
      name: 'John Doe',
      avatar: '/path/to/avatar1.jpg',
      message: 'MyMathix helped me ace my exams and build confidence in math!',
    },
    {
      name: 'Jane Smith',
      avatar: '/path/to/avatar2.jpg',
      message: 'Thanks to MyMathix, I overcame my fear of calculus and scored top marks!',
    },
    {
      name: 'Alice Johnson',
      avatar: '/path/to/avatar3.jpg',
      message: 'I never thought I could love math until I started using MyMathix!',
    },
    {
      name: 'Bob Brown',
      avatar: '/path/to/avatar4.jpg',
      message: 'The interactive lessons on MyMathix made learning math so much fun!',
    },
  ];

  const handleNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const handleLoadMoreStories = () => {
    setVisibleStories((prev) => Math.min(prev + 2, successStories.length));
  };

  const handleLoadLessStories = () => {
    setVisibleStories((prev) => Math.max(prev - 2, 2)); // Ensure at least 2 stories are visible
  };

  useEffect(() => {
    // Simulate fetching streak data from localStorage or API
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    } else {
      setStreak(1);
      localStorage.setItem('streak', '1');
    }
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background: 'linear-gradient(to bottom right, #141e30, #243b55)', // Cool gradient background
        overflow: 'hidden',
        paddingTop: '64px', // Adjust for Navbar height
      }}
    >
      <Navbar username={username} navigate={navigate} onLogout={handleLogout} />
      {/* Left Section: Motivation Zone */}
      <Box
        sx={{
          flex: 1, // Make the left section take up the remaining space
          padding: 3,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
            borderRadius: '10px',
            border: '2px solid rgba(0, 0, 0, 0.2)',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(90deg, #feb47b, #ff7e5f)',
          },
        }}
      >
        {/* Daily Motivation Quote */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            marginBottom: 4,
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient for the quote section
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Daily Motivation
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <FormatQuote sx={{ fontSize: 40, color: '#ffffff', marginRight: 2 }} />
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#ffffff' }}>
              {currentQuote}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleNewQuote}
            sx={{
              backgroundColor: '#ff7e5f',
              '&:hover': { backgroundColor: '#feb47b' },
            }}
          >
            Motivate Me
          </Button>
        </Paper>

        {/* Streak Tracker */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            marginBottom: 4,
            background: 'linear-gradient(to right, #141e30, #243b55)', // Gradient for the streak section
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#ff7e5f' }}>
            Your Motivation Streak
          </Typography>
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            You have visited this page for <strong>{streak}</strong> consecutive days! Keep it up!
          </Typography>
        </Paper>

        {/* Student Success Stories */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            marginBottom: 4,
            background: 'linear-gradient(to right, #243b55, #141e30)', // Gradient for the success stories section
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#ff7e5f' }}>
            Student Success Stories
          </Typography>
          <Grid container spacing={2}>
            {successStories.slice(0, visibleStories).map((story, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ borderRadius: 3, padding: 2 }}>
                  <Avatar
                    src={story.avatar}
                    alt={story.name}
                    sx={{ width: 60, height: 60, marginBottom: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff7e5f' }}>
                    {story.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    {story.message}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            {visibleStories > 2 && (
              <Button
                variant="contained"
                onClick={handleLoadLessStories}
                sx={{
                  backgroundColor: '#ff7e5f',
                  '&:hover': { backgroundColor: '#feb47b' },
                }}
              >
                Load Less
              </Button>
            )}
            {visibleStories < successStories.length && (
              <Button
                variant="contained"
                onClick={handleLoadMoreStories}
                sx={{
                  backgroundColor: '#ff7e5f',
                  '&:hover': { backgroundColor: '#feb47b' },
                }}
              >
                Load More
              </Button>
            )}
          </Box>
        </Paper>

        {/* Inspirational Videos */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            marginBottom: 4,
            background: 'linear-gradient(to right, #141e30, #243b55)', // Gradient for the video section
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#ff7e5f' }}>
            Inspirational Videos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="iframe"
                  src="https://www.youtube.com/embed/2Lz0VOltZKA"
                  title="Motivational Video 1"
                  sx={{ height: 200 }} // Removed borderRadius
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="iframe"
                  src="https://www.youtube.com/embed/ZXsQAXx_ao0"
                  title="Motivational Video 2"
                  sx={{ height: 200 }} // Removed borderRadius
                />
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Motivation;
