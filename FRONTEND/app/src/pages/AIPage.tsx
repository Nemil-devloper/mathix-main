import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import ChatbotImage from '../assets/chatbot.png';
import RecommendationImage from '../assets/rec.webp';
import BackgroundImage from '../assets/background.jpg'; // Add background image

const ClickableCard: React.FC<{ title: string; image: string; onClick: () => void; siblingHover: boolean }> = ({
  title,
  image,
  onClick,
  siblingHover,
}) => (
  <Box
    onClick={onClick}
    sx={{
      width: '50%', // Take 50% width
      height: '100%', // Fill the height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      background: siblingHover
        ? 'linear-gradient(135deg, rgba(80, 80, 80, 0.85), rgba(60, 60, 60, 0.85))' // Slightly darker background when sibling is hovered
        : 'linear-gradient(135deg, rgba(100, 100, 100, 0.9), rgba(80, 80, 80, 0.9))', // Default less dark background
      cursor: 'pointer', // Make the card clickable
      transition: 'transform 0.2s ease, background 0.2s ease',
      borderRadius: '16px', // Add border radius to the edges
      overflow: 'hidden', // Ensure content stays within the rounded edges
      '&:hover': {
        transform: 'scale(1.01)', // Subtle zoom effect on hover
        background: 'linear-gradient(135deg, rgba(216, 181, 181, 0.9), rgba(0, 51, 255, 0.9))', // Brighter background on hover
      },
    }}
  >
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        flex: '8', // 80% height for the image
        width: '100%',
        height: '80%', // Ensure equal height for both images
        objectFit: 'cover',
        filter: 'brightness(0.8)', // Less dark image by default
        transition: 'filter 0.2s ease', // Smooth transition for image filter
        '&:hover': {
          filter: 'brightness(1)', // Brighten the image on hover
        },
      }}
    />
    <Box
      sx={{
        flex: '2', // 20% height for the text
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          marginBottom: 1,
          color: '#d0d0d0', // Slightly brighter text by default
          transition: 'color 0.2s ease', // Smooth transition for text color
          '&:hover': {
            color: '#ffffff', // Bright text on hover
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);

const AIPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${BackgroundImage})`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire viewport
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent image repetition
        overflow: 'hidden', // Disable scrolling
        color: '#ffffff', // Ensure text is visible on the dark background
      }}
    >
      <Navbar
        username={username}
        navigate={navigate}
        onLogout={() => navigate('/login')}
        onProfileClick={() => navigate('/profile')}
      />
      <Box
        sx={{
          flex: '1',
          textAlign: 'center',
          width: '100vw', // Ensure full width of the viewport
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bolder',
            marginTop: 12, // Adjusted top margin
            marginBottom: 0 ,
            color: 'transparent', // Make text color transparent to show gradient
            background: 'linear-gradient(135deg,rgb(255, 255, 255),rgb(235, 236, 236))', // Shiny gradient with cool shade
            backgroundClip: 'text', // Clip the gradient to the text
            WebkitBackgroundClip: 'text', // For Webkit browsers
            WebkitTextFillColor: 'transparent', // Ensure text fill is transparent
          }}
        >
          AI Tools
        </Typography>
        <Box
          sx={{
            marginTop: '0px',
            display: 'flex',
            flexDirection: 'row', // Align sections horizontally
            width: '100vw', // Use full width of the screen
            height: 'calc(100vh - 150px)', // Adjust height to fit within the viewport
          }}
        >
          <ClickableCard
            title="Chatbot"
            image={ChatbotImage}
            onClick={() => navigate('/chatbot')}
            siblingHover={hoveredCard === 'AI Recommendations'}
            onMouseEnter={() => setHoveredCard('Chatbot')}
            onMouseLeave={() => setHoveredCard(null)}
          />
          <ClickableCard
            title="AI Recommendations"
            image={RecommendationImage}
            onClick={() => navigate('/ai-recommendation')}
            siblingHover={hoveredCard === 'Chatbot'}
            onMouseEnter={() => setHoveredCard('AI Recommendations')}
            onMouseLeave={() => setHoveredCard(null)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AIPage;
