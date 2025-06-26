import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import Navbar from '../components/Navbar'; // Use the existing Navbar component
import OnlineImage from '../assets/online.png';
import OfflineImage from '../assets/offline.jpg';
import AiImage from '../assets/ai.png';
import NotesImage from '../assets/notes.jpg';
import BackgroundImage from '../assets/bg.jpg';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

const Home: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 60000);

    // Increment page count on mount
    const incrementPageCount = async () => {
      const token = localStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      if (token) {
        try {
          await axios.post(`${API_BASE_URL}/api/user/increment-page`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (e) {
          // Ignore error
        }
      }
    };
    incrementPageCount();

    // Fetch notifications
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      if (token) {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/notifications`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setNotifications(res.data || []);
        } catch (e) {
          setNotifications([]);
        }
      }
    };
    fetchNotifications();

    return () => clearInterval(interval);
  }, []);

  const updateTimeAndGreeting = (): void => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else if (hours < 21) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflowX: 'hidden',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
          borderRadius: '10px',
          border: '2px solid rgba(0, 0, 0, 0.2)',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
        },
      }}
    >
      <Navbar username={username} navigate={navigate} onLogout={() => navigate('/login')} onProfileClick={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <Box sx={{ marginTop: '80px', padding: 3 }}>
        {/* Greeting */}
        <Box sx={{ textAlign: 'center', margin: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            Hello, {username}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#ffffff',
            }}
          >
            {greeting}
          </Typography>
        </Box>

        {/* Menu Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 2,
            flex: '1 1 auto',
          }}
        >
          {/* First Button */}
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0,
              height: '250px',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '10px',
              '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
            }}
            onClick={() => navigate('/online')} // Navigate to the Online page
          >
            <Box sx={{ flex: 1, padding: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Online Sessions
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: '18px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Learn anytime, anywhere with live online sessions and expert instructors.
              </Typography>
            </Box>
            <Box
              component="img"
              src={OnlineImage}
              alt="Online Sessions"
              sx={{
                width: '35%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '0 10px 10px 0',
              }}
            />
          </Paper>

          {/* Second Button */}
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0,
              height: '250px',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '10px',
              '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
            }}
            onClick={() => navigate('/offline')} // Navigate to the Offline page
          >
            <Box
              component="img"
              src={OfflineImage}
              alt="Offline Sessions"
              sx={{
                width: '35%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px 0 0 10px',
              }}
            />
            <Box sx={{ flex: 1, textAlign: 'right', padding: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Offline Sessions
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: '18px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Access offline resources and attend in-person sessions for hands-on learning.
              </Typography>
            </Box>
          </Paper>

          {/* Third Button */}
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0,
              height: '250px',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '10px',
              '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
            }}
            onClick={() => navigate('/AIPage')} // Navigate to AIPage
          >
            <Box sx={{ flex: 1, padding: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Learn with AI
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: '18px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Explore AI-powered tools like Chatbot and personalized recommendations.
              </Typography>
            </Box>
            <Box
              component="img"
              src={AiImage}
              alt="Learn with AI"
              sx={{
                width: '35%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '0 10px 10px 0',
              }}
            />
          </Paper>

          {/* Fourth Button */}
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0,
              height: '250px',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '10px',
              '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
            }}
            onClick={() => navigate('/notes')} // Navigate to the Notes page
          >
            <Box
              component="img"
              src={NotesImage}
              alt="Notes and PYQ"
              sx={{
                width: '35%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px 0 0 10px',
              }}
            />
            <Box sx={{ flex: 1, textAlign: 'right', padding: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Notes and PYQ
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: '18px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Access comprehensive notes and previous year questions to boost your preparation.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Notification Bell */}
      <Box sx={{ position: 'absolute', top: 24, right: 36, zIndex: 10 }}>
        <IconButton
          color="inherit"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ p: 2, minWidth: 250 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Notifications</Typography>
            {notifications.length === 0 && (
              <Typography variant="body2" color="text.secondary">No notifications</Typography>
            )}
            {notifications.map((n, idx) => (
              <Box key={n._id || idx} sx={{ mb: 1, bgcolor: n.read ? 'grey.100' : 'primary.light', p: 1, borderRadius: 1 }}>
                <Typography variant="body2">{n.message}</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(n.createdAt).toLocaleString()}</Typography>
              </Box>
            ))}
          </Box>
        </Popover>
      </Box>

      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(35deg, #6200EA, #9C27B0)',
          color: 'white',
          textAlign: 'center',
          padding: 2, // Reduced height
          marginTop: 'auto',
          '& a': {
            color: 'white',
            textDecoration: 'none',
          },
          '& a:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <Box className="footer-content" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box className="footer-left" sx={{ flex: '1 1 300px', padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <a href="#about">About Us</a>
              <a href="#products">Products</a>
              <a href="#awards">Awards</a>
              <a href="#help">Help</a>
              <a href="#contact">Contact</a>
            </Box>
          </Box>
          <Box className="footer-right" sx={{ flex: '1 1 300px', padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Email: <a href="mailto:support@mathix.com">support@mathix.com</a>
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Phone: +91-1234567890
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Need Help? <a href="/help">Click Here</a>
            </Typography>
            <Typography variant="body2">
              © {new Date().getFullYear()} Mathix. All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;