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
  useMediaQuery,
  Slide,
  Fade,
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { CheckCircle, EmojiEvents, Share, Celebration } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const allMilestones = [
  { date: 'Day 1', topic: 'Started Algebra Basics', message: 'Great start! Keep going!', badge: 'Bronze' },
  { date: 'Day 3', topic: 'Completed Algebra Quiz - 80%', message: 'You’re improving!', badge: 'Silver' },
  { date: 'Day 5', topic: 'Finished Trigonometric Identities', message: 'Amazing work!', badge: 'Gold' },
  { date: 'Day 6', topic: 'Earned Bronze Badge - Master of Trig', message: 'You’re a star!', badge: 'Bronze' },
  { date: 'Day 10', topic: '10 Days Learning Streak!', message: 'Keep the streak alive!', badge: 'Gold' },
  { date: 'Day 12', topic: 'Completed Calculus Basics', message: 'Fantastic progress!', badge: 'Silver' },
  { date: 'Day 15', topic: 'Scored 90% in Geometry Quiz', message: 'Outstanding!', badge: 'Gold' },
  { date: 'Day 18', topic: '15 Days Streak!', message: 'Consistency is key!', badge: 'Gold' },
];

const studentOverview = {
  streak: 18,
  badges: 5,
  hoursLearned: 25,
  topicsCompleted: 12,
  motivationalMessage: "You're halfway through Class 12. Keep pushing forward!",
};

const Journey: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [visibleMilestones, setVisibleMilestones] = useState(5);
  const [showCongrats, setShowCongrats] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  // Show congrats animation when a new milestone is loaded
  useEffect(() => {
    if (visibleMilestones > 5) {
      setShowCongrats(true);
      const timer = setTimeout(() => setShowCongrats(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [visibleMilestones]);

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const milestones = allMilestones.slice(0, visibleMilestones);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
        overflow: 'hidden',
        paddingTop: { xs: '56px', sm: '64px', md: '64px' },
      }}
    >
      <Navbar username={username} navigate={navigate} onLogout={handleLogout} />
      {/* Left Pane: Timeline */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          minHeight: 0,
          padding: { xs: 0, sm: 2, md: 3 },
          overflowX: { xs: 'auto', md: 'hidden' },
          overflowY: { xs: 'auto', md: 'auto' },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 0.5, sm: 2, md: 4 },
            borderRadius: { xs: 0, sm: 2, md: 3 },
            marginBottom: { xs: 1, md: 4 },
            background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
            minWidth: 0,
          }}
        >
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            color: '#43cea2',
            fontSize: { xs: '1rem', sm: '1.3rem', md: '2rem' },
            textAlign: { xs: 'center', md: 'left' }
          }}>
            Your Learning Journey
          </Typography>
          <Box
            sx={{
              width: '100%',
              overflowX: isMobile ? 'auto' : 'visible',
              pb: isMobile ? 2 : 0,
              // Add horizontal scroll indicator for mobile
              position: 'relative',
              '&::after': isMobile
                ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '6px',
                    background: 'linear-gradient(90deg, #43cea2 40%, transparent 100%)',
                  }
                : {},
            }}
          >
            <Timeline
              position={isMobile ? 'alternate' : 'right'}
              sx={{
                minWidth: isMobile ? 420 : 'auto',
                width: '100%',
                margin: 0,
                padding: 0,
                '& .MuiTimelineItem-root': {
                  minWidth: isMobile ? 260 : 'auto',
                  maxWidth: isMobile ? 320 : 'none',
                },
              }}
            >
              {milestones.map((milestone, index) => (
                <Slide in direction="up" timeout={400 + index * 100} key={index}>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor:
                            milestone.badge === 'Gold'
                              ? '#ffd700'
                              : milestone.badge === 'Silver'
                              ? '#c0c0c0'
                              : '#cd7f32',
                          boxShadow: '0 0 10px 2px #43cea2',
                          animation: 'pulse 1.2s infinite alternate',
                          '@keyframes pulse': {
                            from: { boxShadow: '0 0 10px 2px #43cea2' },
                            to: { boxShadow: '0 0 20px 6px #43cea2' },
                          },
                        }}
                      >
                        <CheckCircle sx={{ color: '#ffffff' }} />
                      </TimelineDot>
                      {index < milestones.length - 1 && <TimelineConnector sx={{ backgroundColor: '#43cea2' }} />}
                    </TimelineSeparator>
                    <TimelineContent sx={{
                      minWidth: { xs: 180, sm: 220, md: 0 },
                      maxWidth: { xs: 240, sm: 320, md: 'none' },
                      px: { xs: 1, sm: 2, md: 0 }
                    }}>
                      <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                        color: '#43cea2',
                        fontSize: { xs: '0.9rem', sm: '1.1rem' }
                      }}>
                        {milestone.date}
                      </Typography>
                      <Typography variant="body1" sx={{
                        color: '#ffffff',
                        fontSize: { xs: '0.85rem', sm: '1rem' }
                      }}>
                        {milestone.topic}
                      </Typography>
                      <Typography variant="body2" sx={{
                        fontStyle: 'italic',
                        color: '#ffdd57',
                        fontSize: { xs: '0.8rem', sm: '1rem' }
                      }}>
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
                </Slide>
              ))}
            </Timeline>
          </Box>
          {visibleMilestones < allMilestones.length && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#43cea2',
                  '&:hover': { backgroundColor: '#3b9d7d' },
                  fontWeight: 'bold',
                  fontSize: { xs: '0.85rem', sm: '1rem' },
                  px: { xs: 2, sm: 4 }
                }}
                onClick={() => setVisibleMilestones((v) => Math.min(v + 2, allMilestones.length))}
              >
                Load More
              </Button>
            </Box>
          )}
          <Fade in={showCongrats}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
              px: { xs: 1, sm: 0 }
            }}>
              <Celebration sx={{ color: '#ffdd57', fontSize: { xs: 24, sm: 36 }, mr: 1 }} />
              <Typography variant="h6" sx={{
                color: '#ffdd57',
                fontWeight: 'bold',
                fontSize: { xs: '0.95rem', sm: '1.2rem' }
              }}>
                Congratulations on unlocking a new milestone!
              </Typography>
            </Box>
          </Fade>
        </Paper>
      </Box>

      {/* Right Pane: Student Overview */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          padding: { xs: 0.5, sm: 2, md: 3 },
          background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderLeft: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.2)' },
          borderTop: { xs: '1px solid rgba(255,255,255,0.2)', md: 'none' },
        }}
      >
        <Card
          sx={{
            width: '100%',
            marginBottom: 3,
            background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
            borderRadius: { xs: 0, sm: 2, md: 3 },
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1, sm: 3 }
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{
              fontWeight: 'bold',
              marginBottom: 2,
              color: '#43cea2',
              fontSize: { xs: '1rem', sm: '1.5rem' }
            }}>
              Student Overview
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>📅 Learning Streak: {studentOverview.streak} days</Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>🏅 Badges Earned: {studentOverview.badges}</Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>⏱️ Hours Learned: {studentOverview.hoursLearned} hours</Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>🔢 Topics Completed: {studentOverview.topicsCompleted}</Typography>
            <Divider sx={{ marginY: 2, backgroundColor: '#43cea2' }} />
            <Typography variant="body2" sx={{
              fontStyle: 'italic',
              color: '#ffdd57',
              fontSize: { xs: '0.85rem', sm: '1rem' }
            }}>
              {studentOverview.motivationalMessage}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#43cea2',
                '&:hover': { backgroundColor: '#3b9d7d' },
                fontSize: { xs: '0.85rem', sm: '1rem' }
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
