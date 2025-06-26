import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Avatar,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Online: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const schedule = [
    { time: '09:00 AM - 10:00 AM', subject: 'Algebra', teacher: 'John Doe' },
    { time: '10:30 AM - 11:30 AM', subject: 'Calculus', teacher: 'Jane Smith' },
    { time: '12:00 PM - 01:00 PM', subject: 'Geometry', teacher: 'Alice Brown' },
    { time: '02:00 PM - 03:00 PM', subject: 'Statistics', teacher: 'Bob White' },
  ];

  const getCurrentClass = (): string => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour + currentMinute / 60;

    for (const classItem of schedule) {
      const [startTime, endTime] = classItem.time.split(' - ').map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour + minute / 60;
      });

      if (currentTime >= startTime && currentTime < endTime) {
        return classItem.subject;
      }
    }

    return 'No class currently.';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentClassElement = document.getElementById('current-class');
      if (currentClassElement) {
        currentClassElement.textContent = `Currently in class: ${getCurrentClass()}`;
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleNotifyMe = async (classItem: { subject: string; time: string }) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.post(
        `${API_BASE_URL}/api/notifications`,
        { message: `Class Reminder: ${classItem.subject} at ${classItem.time}` },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('You will be notified for this class!');
    } catch (err) {
      alert('Could not set notification.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100vw',
        height: '100vh',
        marginTop: { xs: '56px', sm: '64px', md: '80px' },
        background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
        color: '#f0f0f0',
        overflow: 'hidden',
      }}
    >
      {/* Left Frame */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          minWidth: 0,
          padding: { xs: 1, sm: 2, md: 3 },
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3 },
            marginTop: { xs: 2, sm: 3 },
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Daily Quiz
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
            Solve this: What is the square root of 144?
          </Typography>
          <Button variant="contained" color="secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Submit Answer
          </Button>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3 },
            marginTop: { xs: 2, sm: 3 },
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Progress Tracker
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: 'center', gap: 2 }}>
            <CircularProgress
              variant="determinate"
              value={75}
              size={isMobile ? 50 : 80}
              sx={{ color: '#90caf9', marginBottom: { xs: 0, sm: 2 } }}
            />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>75% Completed</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Right Frame */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          padding: { xs: 1, sm: 2, md: 3 },
          overflowY: 'auto',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: 3,
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Upcoming & Live Classes
        </Typography>
        <Grid container spacing={2}>
          {schedule.map((classItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1.02)',
                    transition: '0.3s',
                  },
                  minHeight: { xs: 160, sm: 180 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                  {classItem.subject}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                  {classItem.time}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Avatar sx={{ marginRight: 1, backgroundColor: '#90caf9', width: 32, height: 32, fontSize: 18 }}>
                    {classItem.teacher[0]}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{classItem.teacher}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginRight: { xs: 0, sm: 1 }, fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    onClick={() => alert(`Joining ${classItem.subject} class...`)}
                    fullWidth={isMobile}
                  >
                    Join Now
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    onClick={() => handleNotifyMe(classItem)}
                    fullWidth={isMobile}
                  >
                    Notify Me
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Online;
