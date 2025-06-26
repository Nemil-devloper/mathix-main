import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import ChatbotImage from '../assets/chatbot.png';
import RecommendationImage from '../assets/rec.webp';
import BackgroundImage from '../assets/background.jpg'; // Add background image

const ClickableCard: React.FC<{ title: string; image: string; onClick: () => void; siblingHover: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void }> = ({
  title,
  image,
  onClick,
  siblingHover,
  onMouseEnter,
  onMouseLeave,
}) => (
  <Box
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    sx={{
      width: { xs: '92vw', sm: '80vw', md: '45%' },
      maxWidth: { xs: 400, md: 'none' },
      height: { xs: 180, sm: 220, md: '100%' },
      minHeight: { xs: 180, sm: 220, md: 0 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      background: siblingHover
        ? 'linear-gradient(135deg, rgba(80, 80, 80, 0.85), rgba(60, 60, 60, 0.85))'
        : 'linear-gradient(135deg, rgba(100, 100, 100, 0.9), rgba(80, 80, 80, 0.9))',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, background 0.2s ease',
      borderRadius: '16px',
      overflow: 'hidden',
      margin: { xs: '0 auto 16px auto', md: 2 },
      boxShadow: { xs: 2, md: 4 },
      '&:hover': {
        transform: 'scale(1.01)',
        background: 'linear-gradient(135deg, rgba(216, 181, 181, 0.9), rgba(0, 51, 255, 0.9))',
      },
    }}
  >
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        flex: '8',
        width: '100%',
        height: { xs: 90, sm: 120, md: '80%' },
        objectFit: 'cover',
        filter: 'brightness(0.8)',
        transition: 'filter 0.2s ease',
        '&:hover': {
          filter: 'brightness(1)',
        },
      }}
    />
    <Box
      sx={{
        flex: '2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          marginBottom: 1,
          color: '#d0d0d0',
          transition: 'color 0.2s ease',
          fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
          textAlign: 'center',
          '&:hover': {
            color: '#ffffff',
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
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'auto',
        color: '#ffffff',
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
          flex: 1,
          textAlign: 'center',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          pt: { xs: 2, md: 6 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bolder',
            marginTop: { xs: 2, md: 8 },
            marginBottom: { xs: 2, md: 4 },
            color: 'transparent',
            background: 'linear-gradient(135deg,rgb(255, 255, 255),rgb(235, 236, 236))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textAlign: 'center',
          }}
        >
          AI Tools
        </Typography>
        <Box
          sx={{
            marginTop: { xs: 1, md: 0 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: { xs: 'auto', md: 'calc(100vh - 180px)' },
            gap: { xs: 2, md: 4 },
            pb: { xs: 2, md: 0 },
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
