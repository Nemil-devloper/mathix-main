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
} from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const renderMath = (expression: string) => {
  return { __html: katex.renderToString(expression, { throwOnError: false }) };
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

  const currentQuestion = mockQuizData[currentQuestionIndex];

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

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

  const progress = ((currentQuestionIndex + 1) / mockQuizData.length) * 100;

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Right Panel: Quiz Overview */}
      <Box
        sx={{
          width: '30%',
          height: '92vh', // Adjust height to account for Navbar
          position: 'sticky',
          top: '8vh', // Offset by Navbar height
          background: 'linear-gradient(to bottom, #1c1c1c, #2c3e50)',
          padding: 3,
          marginTop: 4, // Increase margin-top for better spacing
          overflowY: 'auto', // Enable scrolling for the right panel
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <Divider sx={{ marginY: 3, backgroundColor: '#ffffff' }} /> {/* Increase vertical spacing */}
        <Typography variant="h6" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#00e6e6' }}>
          Quiz Overview
        </Typography>
        <List>
          {mockQuizData.map((question, index) => (
            <ListItem
              key={question.id}
              sx={{
                backgroundColor: quizAnswers[question.id]
                  ? quizResults[question.id] === true
                    ? '#28a745' // Green for correct answers
                    : '#ffffff' // White for incorrect answers
                  : '#ffc107', // Yellow for unanswered questions
                color: quizResults[question.id] === false ? 'black' : 'white', // Ensure text color is black for white background
                marginBottom: 2, // Increase spacing between list items
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                },
              }}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  color: quizResults[question.id] === false ? 'black' : 'white', // Ensure consistent text color
                }}
              >
                Question {index + 1}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ marginY: 3, backgroundColor: '#ffffff' }} /> {/* Increase vertical spacing */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00e6e6', marginBottom: 2 }}>
          Timer: {Math.floor(timer / 60)}:{timer % 60}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold', color: '#00e6e6' }}>
          Difficulty:
        </Typography>
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            marginTop: 2, // Increase spacing above the dropdown
            borderRadius: 2,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </Box>

      {/* Left Panel: Quiz Content */}
      <Box
        sx={{
          width: '70%',
          height: '92vh', // Adjust height to account for Navbar
          padding: 4,
          marginTop: 4, // Increase margin-top for better spacing
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',// Enable scrolling for the left panel
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'linear-gradient(to right, #2c5364, #0f2027)',
            color: 'white',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
          }}
        >
          <div style={{ marginBottom: '20px', fontWeight: 'bold', color: '#00e6e6', fontSize: '20px' }}>
            Question {currentQuestionIndex + 1} of {mockQuizData.length}
          </div>
          <div
            style={{
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ffff99', // Light yellow color for the question text
            }}
            dangerouslySetInnerHTML={renderMath(currentQuestion.question)}
          ></div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: quizAnswers[currentQuestion.id] === option ? '#007bff' : '#e3f2fd',
                  color: quizAnswers[currentQuestion.id] === option ? 'white' : 'black',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)')}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          <Button
            variant="contained"
            disabled={currentQuestionIndex === 0}
            onClick={handlePrevious}
            sx={{
              backgroundColor: '#007bff',
              '&:hover': { backgroundColor: '#0056b3' },
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
              transition: 'background-color 0.3s',
            }}
          >
            {currentQuestionIndex === mockQuizData.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00e6e6' }}>
            Progress:
          </Typography>
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{
              color: '#00e6e6',
              marginTop: 2,
              '& .MuiCircularProgress-circle': { strokeWidth: 5 },
            }}
          />
        </Box>
      </Box>

      {/* Result Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            width: '50%',
            margin: 'auto',
            marginTop: '10%',
            padding: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#007bff' }}>
            Quiz Results
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: 2 }}>
            Score: {Object.values(quizResults).filter((result) => result).length} / {mockQuizData.length}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setShowModal(false);
              setQuizAnswers({});
              setQuizResults({});
              setCurrentQuestionIndex(0);
            }}
            sx={{
              backgroundColor: '#007bff',
              '&:hover': { backgroundColor: '#0056b3' },
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
