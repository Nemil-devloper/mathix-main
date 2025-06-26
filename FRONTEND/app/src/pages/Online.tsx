import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Avatar,
  CircularProgress,
} from '@mui/material';
import Navbar from '../components/Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Online: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
    // Update the current class status dynamically
    const interval = setInterval(() => {
      const currentClassElement = document.getElementById('current-class');
      if (currentClassElement) {
        currentClassElement.textContent = `Currently in class: ${getCurrentClass()}`;
      }
    }, 60000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
        width: '100vw',
        height: '100vh',
        marginTop: '80px', // Increased top margin to avoid content being hidden by the Navbar
        background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
        color: '#f0f0f0',
      }}
    >
      {/* Left Frame (30%) */}
      <Box
        sx={{
          width: '30%',
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflowY: 'auto',
        }}
      >
        <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Daily Quiz
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Solve this: What is the square root of 144?
          </Typography>
          <Button variant="contained" color="secondary">
            Submit Answer
          </Button>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Progress Tracker
          </Typography>
          <CircularProgress
            variant="determinate"
            value={75}
            size={80}
            sx={{ color: '#90caf9', marginBottom: 2 }}
          />
          <Typography variant="body2">75% Completed</Typography>
        </Paper>
      </Box>

      {/* Right Frame (70%) */}
      <Box
        sx={{
          width: '70%',
          padding: 3,
          overflowY: 'auto',
        }}
      >
        {/* Upcoming & Live Classes Panel */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          Upcoming & Live Classes
        </Typography>
        <Grid container spacing={3}>
          {schedule.map((classItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1.02)',
                    transition: '0.3s',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {classItem.subject}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  {classItem.time}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Avatar sx={{ marginRight: 1, backgroundColor: '#90caf9' }}>
                    {classItem.teacher[0]}
                  </Avatar>
                  <Typography variant="body2">{classItem.teacher}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginRight: 1 }}
                  onClick={() => alert(`Joining ${classItem.subject} class...`)}
                >
                  Join Now
                </Button>
                <Button variant="outlined" color="secondary"
                  onClick={() => handleNotifyMe(classItem)}>
                  Notify Me
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Online;
