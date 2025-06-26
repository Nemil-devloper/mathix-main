import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  CircularProgress,
  Modal,
  Select,
  MenuItem,
  useMediaQuery,
  Paper,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const renderMath = (expression: string) => {
  // Remove \\( and \\) or $$ for dynamic rendering
  const clean = expression.replace(/\\\(|\\\)|\$\$/g, '');
  return { __html: katex.renderToString(clean, { throwOnError: false }) };
};

const mockQuizData = [
  {
    id: 1,
    question: 'What is the derivative of \\(f(x) = 3x^2 + 5x - 4\\)?',
    options: ['6x + 5', '3x + 5', '6x - 5', '5x + 3'],
    correctAnswer: '6x + 5',
  },
  {
    id: 2,
    question: 'Solve for \\(x\\): \\(2x + 3 = 7\\).',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
  },
  {
    id: 3,
    question: 'What is the value of \\(\\sin(30°) + \\cos(60°)\\)?',
    options: ['0.5', '1', '1.5', '2'],
    correctAnswer: '1',
  },
];

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<{ [key: number]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [timer, setTimer] = useState(300); // 5 minutes
  const [username, setUsername] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const currentQuestion = mockQuizData[currentQuestionIndex];

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  useEffect(() => {
    if (timer === 0) setShowModal(true);
    if (showModal) return;
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, showModal]);

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleAnswerSelect = (answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleSubmit = () => {
    const results = mockQuizData.reduce((acc, question) => {
      const isCorrect = quizAnswers[question.id] === question.correctAnswer;
      return { ...acc, [question.id]: isCorrect };
    }, {});
    setQuizResults(results);
    setShowModal(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleShowAnswers = () => setShowAnswers((prev) => !prev);

  const progress = ((currentQuestionIndex + 1) / mockQuizData.length) * 100;

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Top Navbar for mobile */}
      {isMobile && (
        <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 10 }}>
          <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={() => {}} />
        </Box>
      )}

      {/* Quiz Overview Panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          minWidth: 0,
          height: { xs: 'auto', md: '92vh' },
          position: { xs: 'static', md: 'sticky' },
          top: { md: '8vh' },
          background: 'linear-gradient(to bottom, #1c1c1c, #2c3e50)',
          padding: { xs: 1, sm: 2, md: 3 },
          marginTop: { xs: isMobile ? '56px' : 0, md: 4 },
          overflowY: 'auto',
          boxShadow: { xs: 'none', md: '0px 0px 15px rgba(0, 0, 0, 0.5)' },
          zIndex: 2,
        }}
      >
        {!isMobile && (
          <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={() => {}} />
        )}
        <Divider sx={{ marginY: { xs: 2, md: 3 }, backgroundColor: '#ffffff' }} />
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#00e6e6', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Quiz Overview
        </Typography>
        <List>
          {mockQuizData.map((question, index) => (
            <ListItem
              key={question.id}
              sx={{
                backgroundColor: quizAnswers[question.id]
                  ? quizResults[question.id] === true
                    ? '#28a745'
                    : '#ffffff'
                  : '#ffc107',
                color: quizResults[question.id] === false ? 'black' : 'white',
                marginBottom: 2,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                },
                fontSize: { xs: '0.95rem', sm: '1rem' },
                px: { xs: 1, sm: 2 },
              }}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  color: quizResults[question.id] === false ? 'black' : 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                }}
              >
                Question {index + 1}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ marginY: { xs: 2, md: 3 }, backgroundColor: '#ffffff' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00e6e6', marginBottom: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Timer: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: '#00e6e6', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Difficulty:
        </Typography>
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            marginTop: 1,
            borderRadius: 2,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            width: { xs: '100%', sm: 'auto' },
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
        <Button
          variant="outlined"
          onClick={handleShowAnswers}
          sx={{
            mt: 2,
            color: '#00e6e6',
            borderColor: '#00e6e6',
            fontSize: { xs: '0.95rem', sm: '1rem' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {showAnswers ? 'Hide Answers' : 'Show Answers'}
        </Button>
      </Box>

      {/* Quiz Content Panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          minWidth: 0,
          height: { xs: 'auto', md: '92vh' },
          padding: { xs: 1, sm: 2, md: 4 },
          marginTop: { xs: isMobile ? '56px' : 0, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflowY: 'auto',
          zIndex: 1,
        }}
      >
        <Paper
          sx={{
            padding: { xs: 1, sm: 2, md: 3 },
            borderRadius: 2,
            background: 'linear-gradient(to right, #2c5364, #0f2027)',
            color: 'white',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
            marginBottom: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ marginBottom: { xs: 2, md: 3 }, fontWeight: 'bold', color: '#00e6e6', fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            Question {currentQuestionIndex + 1} of {mockQuizData.length}
          </Box>
          <Box
            sx={{
              marginBottom: { xs: 2, md: 3 },
              fontSize: { xs: '1rem', sm: '1.15rem' },
              fontWeight: 'bold',
              color: '#ffff99',
              wordBreak: 'break-word',
              overflowX: 'auto',
            }}
            dangerouslySetInnerHTML={renderMath(currentQuestion.question)}
          ></Box>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: quizAnswers[currentQuestion.id] === option ? '#007bff' : '#e3f2fd',
                  color: quizAnswers[currentQuestion.id] === option ? 'white' : 'black',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  padding: isMobile ? '10px 8px' : '10px 16px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: isMobile ? '0.98rem' : '1.05rem',
                  border: showAnswers && option === currentQuestion.correctAnswer ? '2px solid #28a745' : 'none',
                  boxShadow: quizAnswers[currentQuestion.id] === option ? '0px 4px 10px rgba(0,0,0,0.2)' : 'none',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)')}
                onMouseOut={e => (e.currentTarget.style.boxShadow = quizAnswers[currentQuestion.id] === option ? '0px 4px 10px rgba(0,0,0,0.2)' : 'none')}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
                {showAnswers && option === currentQuestion.correctAnswer && (
                  <span style={{ marginLeft: 8, color: '#28a745', fontWeight: 'bold' }}>✓</span>
                )}
              </li>
            ))}
          </ul>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            variant="contained"
            disabled={currentQuestionIndex === 0}
            onClick={handlePrevious}
            sx={{
              backgroundColor: '#007bff',
              '&:hover': { backgroundColor: '#0056b3' },
              fontSize: { xs: '0.95rem', sm: '1rem' },
              minWidth: { xs: 80, sm: 100 },
              transition: 'background-color 0.3s',
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={currentQuestionIndex === mockQuizData.length - 1 ? handleSubmit : handleNext}
            sx={{
              backgroundColor: '#007bff',
              '&:hover': { backgroundColor: '#0056b3' },
              fontSize: { xs: '0.95rem', sm: '1rem' },
              minWidth: { xs: 80, sm: 100 },
              transition: 'background-color 0.3s',
            }}
          >
            {currentQuestionIndex === mockQuizData.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
        <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00e6e6', fontSize: { xs: '0.95rem', sm: '1rem' } }}>
            Progress:
          </Typography>
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{
              color: '#00e6e6',
              marginTop: 1,
              '& .MuiCircularProgress-circle': { strokeWidth: 5 },
            }}
          />
        </Box>
      </Box>

      {/* Result Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            width: { xs: '90vw', sm: '60vw', md: '50%' },
            margin: 'auto',
            marginTop: { xs: '20%', sm: '10%' },
            padding: { xs: 2, sm: 4 },
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
            color: '#222',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#007bff', fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
            Quiz Results
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, marginBottom: 2 }}>
            Score: {Object.values(quizResults).filter((result) => result).length} / {mockQuizData.length}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(false);
              setQuizAnswers({});
              setQuizResults({});
              setCurrentQuestionIndex(0);
              setTimer(300);
            }}
            sx={{
              backgroundColor: '#007bff',
              '&:hover': { backgroundColor: '#0056b3' },
              fontSize: { xs: '0.95rem', sm: '1rem' },
              minWidth: { xs: 80, sm: 100 },
              transition: 'background-color 0.3s',
            }}
          >
            Retry
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Game;
