import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Switch,
  Checkbox,
  useMediaQuery,
} from '@mui/material';
import {
  ExpandMore,
  Bookmark,
  BookmarkBorder,
  Search,
  Fullscreen,
  FullscreenExit,
  CheckCircle,
  CheckCircleOutline,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'notes' | 'pyq'>('notes'); // Toggle between Notes and PYQ
  const [activeTopic, setActiveTopic] = useState<keyof typeof notes | null>(null); // Track the selected topic
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [username, setUsername] = useState('');

  const topics = [
    { subject: 'Algebra', chapters: ['Linear Equations', 'Quadratic Equations'] },
    { subject: 'Calculus', chapters: ['Derivatives', 'Integrals'] },
    { subject: 'Geometry', chapters: ['Triangles', 'Circles'] },
  ];

  const notes = {
    'Linear Equations': {
      content: 'Linear equations are equations of the first degree...',
      lastUpdated: '2023-10-01',
    },
    'Quadratic Equations': {
      content: 'A quadratic equation is in the form ax² + bx + c = 0...',
      lastUpdated: '2023-09-25',
    },
    // ...other notes...
  };

  const pyq = {
    'Linear Equations': [
      { question: 'Solve 2x + 3 = 7.', answer: 'x = 2' },
      { question: 'Find the slope of the line y = 2x + 5.', answer: 'Slope = 2' },
    ],
    'Quadratic Equations': [
      { question: 'Solve x² - 5x + 6 = 0.', answer: 'x = 2, x = 3' },
      { question: 'Find the vertex of y = x² - 4x + 3.', answer: 'Vertex = (2, -1)' },
    ],
    'Derivatives': [
      { question: 'What is the derivative of f(x) = 3x²?', answer: 'f\'(x) = 6x' },
      { question: 'Find the derivative of sin(x).', answer: 'cos(x)' },
    ],
    'Integrals': [
      { question: 'Calculate ∫x dx.', answer: 'x²/2 + C' },
      { question: 'Evaluate ∫e^x dx.', answer: 'e^x + C' },
    ],
    'Triangles': [
      { question: 'Prove Pythagoras theorem.', answer: 'a² + b² = c²' },
      { question: 'Find the area of a triangle with base 5 and height 10.', answer: 'Area = 25' },
    ],
    'Circles': [
      { question: 'Find the circumference of a circle with radius 7.', answer: 'Circumference = 44' },
      { question: 'Find the area of a circle with radius 7.', answer: 'Area = 154' },
    ],
  };

  const handleBookmarkToggle = (topic: string) => {
    setBookmarkedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleMarkComplete = (topic: string) => {
    setCompletedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const filteredTopics = topics.filter((topic) =>
    topic.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
    const lastOpenedTopic = localStorage.getItem('lastOpenedTopic');
    if (lastOpenedTopic && lastOpenedTopic in notes) {
      setActiveTopic(lastOpenedTopic as keyof typeof notes);
    }
  }, []);

  useEffect(() => {
    if (activeTopic) localStorage.setItem('lastOpenedTopic', activeTopic);
  }, [activeTopic]);

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh',
        backgroundColor: darkMode ? '#121212' : '#f5f5f5',
        color: darkMode ? '#ffffff' : '#000000',
        marginTop: { xs: '56px', sm: '64px', md: '64px' },
      }}
    >
      {/* Left Panel: Topic Navigator */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          minWidth: 0,
          padding: { xs: 1, sm: 2 },
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          borderRight: { xs: 'none', md: `1px solid ${darkMode ? '#333333' : '#dddddd'}` },
          borderBottom: { xs: `1px solid ${darkMode ? '#333333' : '#dddddd'}`, md: 'none' },
          overflowY: 'auto',
          maxHeight: { xs: 'auto', md: '100vh' },
        }}
      >
        <Navbar username={username} navigate={navigate} onLogout={() => navigate('/login')} onProfileClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ marginRight: 1 }} />,
            }}
            sx={{
              backgroundColor: darkMode ? '#333333' : '#f0f0f0',
              borderRadius: 1,
              color: darkMode ? '#ffffff' : '#000000',
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
          <Button
            variant={activeSection === 'notes' ? 'contained' : 'outlined'}
            onClick={() => setActiveSection('notes')}
            sx={{
              backgroundColor: activeSection === 'notes' ? '#FFDD57' : 'transparent',
              color: activeSection === 'notes' ? 'black' : '#FFDD57',
              '&:hover': { backgroundColor: '#FFC107' },
              fontSize: { xs: '0.95rem', sm: '1rem' },
              minWidth: { xs: 80, sm: 100 },
            }}
          >
            Notes
          </Button>
          <Button
            variant={activeSection === 'pyq' ? 'contained' : 'outlined'}
            onClick={() => setActiveSection('pyq')}
            sx={{
              backgroundColor: activeSection === 'pyq' ? '#FFDD57' : 'transparent',
              color: activeSection === 'pyq' ? 'black' : '#FFDD57',
              '&:hover': { backgroundColor: '#FFC107' },
              fontSize: { xs: '0.95rem', sm: '1rem' },
              minWidth: { xs: 80, sm: 100 },
            }}
          >
            PYQ
          </Button>
        </Box>
        {filteredTopics.map((topic, index) => (
          <Accordion key={index} sx={{ backgroundColor: darkMode ? '#2c2c2c' : '#f9f9f9' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>{topic.subject}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {topic.chapters.map((chapter) => (
                <Box
                  key={chapter}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      textDecoration: activeTopic === chapter ? 'underline' : 'none',
                      color: darkMode ? '#ffffff' : '#000000',
                      transition: 'color 0.3s ease',
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                    }}
                    onClick={() => setActiveTopic(chapter)}
                  >
                    {chapter}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={() => handleBookmarkToggle(chapter)}>
                      {bookmarkedTopics.includes(chapter) ? (
                        <Bookmark sx={{ color: '#ffdd57' }} />
                      ) : (
                        <BookmarkBorder />
                      )}
                    </IconButton>
                    <Checkbox
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle sx={{ color: '#4caf50' }} />}
                      checked={completedTopics.includes(chapter)}
                      onChange={() => handleMarkComplete(chapter)}
                    />
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Right Panel: Content Viewer */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          padding: { xs: 1, sm: 2, md: 3 },
          overflowY: 'auto',
          position: 'relative',
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        }}
      >
        {activeSection === 'notes' && activeTopic ? (
          <>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                {activeTopic}
              </Typography>
              <Box>
                <Tooltip title="Toggle Fullscreen">
                  <IconButton onClick={() => setIsFullscreen(!isFullscreen)}>
                    {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Toggle Dark Mode">
                  <Switch
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    color="default"
                  />
                </Tooltip>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Last Updated: {activeTopic && notes[activeTopic]?.lastUpdated || 'N/A'}
            </Typography>
            <Paper
              elevation={3}
              sx={{
                padding: { xs: 1.5, sm: 3 },
                backgroundColor: darkMode ? '#2c2c2c' : '#f9f9f9',
                color: darkMode ? '#ffffff' : '#000000',
                fontSize: { xs: '0.98rem', sm: '1.1rem' },
                overflowX: 'auto',
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ node, ...props }) => (
                    <Typography
                      sx={{
                        fontSize: { xs: '0.98rem', sm: '1.1rem' },
                        color: darkMode ? '#fff' : '#000',
                        wordBreak: 'break-word',
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {notes[activeTopic]?.content || 'No content available.'}
              </ReactMarkdown>
            </Paper>
            <Box sx={{ marginTop: 2, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button variant="contained" color="primary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                Download PDF
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleMarkComplete(activeTopic)}
                sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
              >
                {completedTopics.includes(activeTopic) ? 'Mark as Incomplete' : 'Mark as Complete'}
              </Button>
            </Box>
          </>
        ) : activeSection === 'pyq' && activeTopic ? (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              Previous Year Questions: {activeTopic}
            </Typography>
            {pyq[activeTopic]?.map((question, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  padding: { xs: 1.5, sm: 2 },
                  marginBottom: 2,
                  borderRadius: 2,
                  backgroundColor: darkMode ? '#2c2c2c' : '#f9f9f9',
                  color: darkMode ? '#ffffff' : '#000000',
                  fontSize: { xs: '0.98rem', sm: '1.1rem' },
                  overflowX: 'auto',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                  {index + 1}. {question.question}
                </Typography>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ node, ...props }) => (
                      <Typography
                        sx={{
                          fontSize: { xs: '0.98rem', sm: '1.1rem' },
                          color: darkMode ? '#fff' : '#000',
                          wordBreak: 'break-word',
                        }}
                        {...props}
                      />
                    ),
                  }}
                >
                  {question.answer}
                </ReactMarkdown>
              </Paper>
            )) || (
              <Typography variant="body1">No questions available for this topic.</Typography>
            )}
          </Box>
        ) : (
          <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '20%', fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
            Select a topic to view content.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Notes;
