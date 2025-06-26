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
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Offline: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('Algebra');
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter subjects/topics based on search query
  const filteredSubjects = subjects
    .map(subject => ({
      ...subject,
      topics: subject.topics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(subject => subject.topics.length > 0);

  const currentSubject = subjects.find((subject) => subject.name === selectedSubject);
  const currentVideo = currentSubject?.topics[selectedVideo];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100vw',
        height: '100vh',
        marginTop: { xs: '56px', sm: '64px', md: '80px' },
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)',
        color: '#e0e0e0',
        overflow: 'hidden',
      }}
    >
      {/* Left Sidebar */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          minWidth: 0,
          padding: { xs: 1, sm: 2, md: 3 },
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflowY: 'auto',
          maxHeight: { xs: 'auto', md: '100vh' },
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(135deg, #ff7eb3, #ff758c)',
            borderRadius: '5px',
            border: '2px solid #1a1a2e',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={function (): void {
          throw new Error('Function not implemented.');
        }} />
        <TextField
          placeholder="Search topics..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{
            marginBottom: 3,
            backgroundColor: '#ffffff',
            borderRadius: 1,
            fontSize: { xs: '0.95rem', sm: '1rem' },
          }}
        />
        {(searchQuery ? filteredSubjects : subjects).map((subject, index) => (
          <Accordion
            key={index}
            expanded={selectedSubject === subject.name}
            onChange={() => setSelectedSubject(subject.name)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              marginBottom: 2,
              borderRadius: 2,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}>
              <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>{subject.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {subject.topics.map((topic, topicIndex) => (
                  <ListItem key={topicIndex} disablePadding>
                    <ListItemButton
                      selected={selectedVideo === topicIndex && selectedSubject === subject.name}
                      onClick={() => {
                        setSelectedSubject(subject.name);
                        setSelectedVideo(topicIndex);
                      }}
                      sx={{
                        borderRadius: 1,
                        fontSize: { xs: '0.95rem', sm: '1rem' },
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

      {/* Right Main Content */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          padding: { xs: 1, sm: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          overflowY: 'auto',
        }}
      >
        {currentVideo ? (
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 1.5, sm: 3 },
              borderRadius: 3,
              marginBottom: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
                marginBottom: { xs: 1, sm: 2 },
                fontSize: { xs: '1.1rem', sm: '1.5rem' }
              }}>
                {currentVideo.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
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
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                marginTop: isMobile ? '8px' : '16px',
                maxHeight: isMobile ? 200 : 350,
                background: '#000',
              }}
            >
              <source src={currentVideo.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
              {currentVideo.description}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
              <Button variant="contained" color="secondary" sx={{ marginRight: { xs: 0, sm: 2 }, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                Mark as Completed
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Download Notes (PDF)
              </Button>
            </Box>
          </Paper>
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 5, fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            Select a topic to start learning!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Offline;
