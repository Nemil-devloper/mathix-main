import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';

const Offline: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('Algebra');
  const [selectedVideo, setSelectedVideo] = useState(0);
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

  const subjects = [
    {
      name: 'Algebra',
      topics: [
        { title: 'Introduction to Algebra', description: 'Learn the basics of algebra.', link: 'video1.mp4' },
        { title: 'Quadratic Equations', description: 'Solve quadratic equations.', link: 'video2.mp4' },
      ],
    },
    {
      name: 'Geometry',
      topics: [
        { title: 'Basics of Geometry', description: 'Understand geometric shapes.', link: 'video3.mp4' },
        { title: 'Triangles and Circles', description: 'Explore triangles and circles.', link: 'video4.mp4' },
      ],
    },
    {
      name: 'Calculus',
      topics: [
        { title: 'Introduction to Calculus', description: 'Learn limits and derivatives.', link: 'video5.mp4' },
        { title: 'Integration Basics', description: 'Understand integration techniques.', link: 'video6.mp4' },
      ],
    },
  ];

  const currentSubject = subjects.find((subject) => subject.name === selectedSubject);
  const currentVideo = currentSubject?.topics[selectedVideo];

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        marginTop: '80px', // Ensure content is visible below the Navbar
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)', // Updated gradient for better contrast
        color: '#e0e0e0', // Updated text color for better readability
      }}
    >
      {/* Left Sidebar (30%) */}
      <Box
        sx={{
          width: '30%',
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflowY: 'auto',
          scrollbarWidth: 'thin', // For Firefox
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(135deg, #ff7eb3, #ff758c)', // Futuristic gradient for the scroll bar
            borderRadius: '5px',
            border: '2px solid #1a1a2e', // Adds a border for a cool effect
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(135deg, #ff758c, #ff7eb3)', // Hover effect for the scroll bar
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)', // Subtle background for the scroll track
          },
        }}
      >
        <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <TextField
          placeholder="Search topics..."
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 3,
            backgroundColor: '#ffffff',
            borderRadius: 1,
          }}
        />
        {subjects.map((subject, index) => (
          <Accordion
            key={index}
            expanded={selectedSubject === subject.name}
            onChange={() => setSelectedSubject(subject.name)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              marginBottom: 2,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}>
              <Typography>{subject.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {subject.topics.map((topic, topicIndex) => (
                  <ListItem key={topicIndex} disablePadding>
                    <ListItemButton
                      selected={selectedVideo === topicIndex && selectedSubject === subject.name}
                      onClick={() => setSelectedVideo(topicIndex)}
                      sx={{
                        borderRadius: 1,
                        '&.Mui-selected': {
                          backgroundColor: '#90caf9',
                          color: '#000000',
                        },
                      }}
                    >
                      <ListItemText primary={topic.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Right Main Content (70%) */}
      <Box
        sx={{
          width: '70%',
          padding: '0 3px', // Removed top padding to make the right frame touch the Navbar bottom
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {currentVideo ? (
          <>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 3,
                marginBottom: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  {currentVideo.title}
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      color: '#ffffff', // Updated text color to white
                      borderColor: '#ffffff', // Updated border color to white
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover effect
                      },
                      marginRight: 1,
                    }}
                    disabled={selectedVideo === 0}
                    onClick={() => setSelectedVideo((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      color: '#ffffff', // Updated text color to white
                      borderColor: '#ffffff', // Updated border color to white
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover effect
                      },
                    }}
                    disabled={selectedVideo === (currentSubject?.topics.length || 1) - 1}
                    onClick={() => setSelectedVideo((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
              <video
                controls
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              >
                <source src={currentVideo.link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {currentVideo.description}
              </Typography>
              <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>
                Mark as Completed
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  color: '#ffffff', // Updated text color to white
                  borderColor: '#ffffff', // Updated border color to white
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover effect
                  },
                }}
              >
                Download Notes (PDF)
              </Button>
            </Paper>
          </>
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 5 }}>
            Select a topic to start learning!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Offline;
