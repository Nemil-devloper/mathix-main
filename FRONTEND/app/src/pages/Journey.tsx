import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Tooltip,
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { CheckCircle, EmojiEvents, Share } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Journey: React.FC = () => {
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

  const milestones = [
    { date: 'Day 1', topic: 'Started Algebra Basics', message: 'Great start! Keep going!', badge: 'Bronze' },
    { date: 'Day 3', topic: 'Completed Algebra Quiz - 80%', message: 'You’re improving!', badge: 'Silver' },
    { date: 'Day 5', topic: 'Finished Trigonometric Identities', message: 'Amazing work!', badge: 'Gold' },
    { date: 'Day 6', topic: 'Earned Bronze Badge - Master of Trig', message: 'You’re a star!', badge: 'Bronze' },
    { date: 'Day 10', topic: '10 Days Learning Streak!', message: 'Keep the streak alive!', badge: 'Gold' },
  ];

  const studentOverview = {
    streak: 18,
    badges: 5,
    hoursLearned: 25,
    topicsCompleted: 12,
    motivationalMessage: "You're halfway through Class 12. Keep pushing forward!",
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
        overflow: 'hidden',
        paddingTop: '64px', // Adjust for navbar height
      }}
    >
      <Navbar username={username} navigate={navigate} onLogout={handleLogout} />
      {/* Left Pane: Timeline */}
      <Box
        sx={{
          width: '70%',
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
            background: 'linear-gradient(90deg, #43cea2, #185a9d)',
            borderRadius: '10px',
            border: '2px solid rgba(0, 0, 0, 0.2)',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(90deg, #185a9d, #43cea2)',
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            marginBottom: 4,
            background: 'linear-gradient(to bottom, #1e3c72, #2a5298)', // Dark gradient background
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#43cea2' }}>
            Your Learning Journey
          </Typography>
          <Timeline>
            {milestones.map((milestone, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor:
                        milestone.badge === 'Gold'
                          ? '#ffd700'
                          : milestone.badge === 'Silver'
                          ? '#c0c0c0'
                          : '#cd7f32',
                    }}
                  >
                    <CheckCircle sx={{ color: '#ffffff' }} />
                  </TimelineDot>
                  {index < milestones.length - 1 && <TimelineConnector sx={{ backgroundColor: '#43cea2' }} />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#43cea2' }}>
                    {milestone.date}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>
                    {milestone.topic}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#ffdd57' }}>
                    {milestone.message}
                  </Typography>
                  <Tooltip title={`Badge: ${milestone.badge}`}>
                    <EmojiEvents
                      sx={{
                        color:
                          milestone.badge === 'Gold'
                            ? '#ffd700'
                            : milestone.badge === 'Silver'
                            ? '#c0c0c0'
                            : '#cd7f32',
                      }}
                    />
                  </Tooltip>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Paper>
      </Box>

      {/* Right Pane: Student Overview */}
      <Box
        sx={{
          width: '30%',
          padding: 3,
          background: 'linear-gradient(to bottom, #1e3c72, #2a5298)', // Dark gradient background
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Card
          sx={{
            width: '100%',
            marginBottom: 3,
            background: 'linear-gradient(to bottom, #1e3c72, #2a5298)', // Dark gradient background
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#43cea2' }}>
              Student Overview
            </Typography>
            <Typography variant="body1">📅 Learning Streak: {studentOverview.streak} days</Typography>
            <Typography variant="body1">🏅 Badges Earned: {studentOverview.badges}</Typography>
            <Typography variant="body1">⏱️ Hours Learned: {studentOverview.hoursLearned} hours</Typography>
            <Typography variant="body1">🔢 Topics Completed: {studentOverview.topicsCompleted}</Typography>
            <Divider sx={{ marginY: 2, backgroundColor: '#43cea2' }} />
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#ffdd57' }}>
              {studentOverview.motivationalMessage}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#43cea2',
                '&:hover': { backgroundColor: '#3b9d7d' },
              }}
              startIcon={<Share />}
            >
              Share Progress
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default Journey;
