import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
} from '@mui/material';
import { CheckCircle, Lock, PlayArrow } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Roadmap: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0); // Overall progress percentage
  const [completedTopics, setCompletedTopics] = useState<string[]>([]); // Track completed topics
  const [username, setUsername] = useState('');
  const topics = [
    {
      name: 'Basic Algebra',
      description: 'Learn the fundamentals of algebra, including variables and equations.',
      estimatedTime: '2 hours',
      difficulty: 'Easy',
    },
    {
      name: 'Linear Equations',
      description: 'Understand and solve linear equations with one or more variables.',
      estimatedTime: '3 hours',
      difficulty: 'Medium',
    },
    {
      name: 'Quadratic Equations',
      description: 'Dive into solving quadratic equations using various methods.',
      estimatedTime: '4 hours',
      difficulty: 'Hard',
    },
    {
      name: 'Calculus Basics',
      description: 'Introduction to limits, derivatives, and integrals.',
      estimatedTime: '5 hours',
      difficulty: 'Hard',
    },
  ];

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const handleCompleteTopic = (topicName: string) => {
    if (!completedTopics.includes(topicName)) {
      setCompletedTopics((prev) => [...prev, topicName]);
      setProgress(((completedTopics.length + 1) / topics.length) * 100);
    }
  };

  const isTopicUnlocked = (index: number) => {
    return index === 0 || completedTopics.includes(topics[index - 1].name);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 3,
        '&::-webkit-scrollbar': {
          width: '10px',
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
      <Navbar username={username} navigate={navigate} onLogout={() => navigate('/login')} onProfileClick={() => {}} />
      <Box sx={{ marginTop: '100px', padding: 3 }}>
        {/* Progress Overview */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            marginBottom: 4,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Math Learning Roadmap
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Follow this roadmap to master mathematics step by step.
          </Typography>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={progress}
              size={100}
              sx={{
                color: '#43cea2',
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {Math.round(progress)}% Completed
          </Typography>
        </Paper>

        {/* Roadmap Stepper */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            maxHeight: '500px', // Limit height for inner scrollbar
            overflowY: 'auto', // Enable vertical scrolling
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
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Your Learning Pathway
          </Typography>
          <Stepper orientation="vertical">
            {topics.map((topic, index) => (
              <Step key={topic.name} active={isTopicUnlocked(index)} completed={completedTopics.includes(topic.name)}>
                <StepLabel
                  optional={
                    completedTopics.includes(topic.name) ? (
                      <Typography variant="caption" sx={{ color: '#43cea2' }}>
                        Completed
                      </Typography>
                    ) : null
                  }
                  icon={
                    completedTopics.includes(topic.name) ? (
                      <CheckCircle sx={{ color: '#43cea2' }} />
                    ) : isTopicUnlocked(index) ? (
                      <PlayArrow sx={{ color: '#ffdd57' }} />
                    ) : (
                      <Lock sx={{ color: '#888' }} />
                    )
                  }
                >
                  <Typography
                    sx={{
                      color: isTopicUnlocked(index) ? '#ffffff' : '#888',
                      fontWeight: isTopicUnlocked(index) ? 'bold' : 'normal',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {topic.name}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {topic.description}
                  </Typography>
                  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Estimated Time: {topic.estimatedTime}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Difficulty: {topic.difficulty}</Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isTopicUnlocked(index)}
                    onClick={() => handleCompleteTopic(topic.name)}
                    sx={{
                      backgroundColor: isTopicUnlocked(index) ? '#43cea2' : '#888',
                      '&:hover': { backgroundColor: isTopicUnlocked(index) ? '#3b9d7d' : '#888' },
                      boxShadow: isTopicUnlocked(index)
                        ? '0px 4px 10px rgba(67, 206, 162, 0.5)'
                        : 'none',
                    }}
                  >
                    {completedTopics.includes(topic.name) ? 'Review' : 'Start'}
                  </Button>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
    </Box>
  );
};

export default Roadmap;
