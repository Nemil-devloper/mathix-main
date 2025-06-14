import { useState } from 'react';
import { TextField, Button, Typography, Box, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import animGif from '../assets/anim.gif'; // Import the GIF from the src/assets folder
import logo from '../assets/logo.png'; // Import the logo from the src/assets folder

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = `${API_BASE_URL}/api/auth/login`;
      console.log('Login API URL:', apiUrl); // Debug: log the full URL
      const res = await axios.post(apiUrl, formData);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('email', res.data.email);
        
        // Remove alert and navigate immediately
        navigate('/home', { replace: true });
      } else {
        setError('Authentication failed');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw', // Full width of the viewport
        height: '100vh', // Full height of the viewport
        background: 'linear-gradient(to bottom right, rgba(25, 33, 68, 0.88), rgb(41, 15, 212))', // Gradient from top-left to bottom-right
        position: 'relative', // For positioning the math symbols
        overflow: 'hidden', // Hide overflow of the symbols
      }}
    >
      {/* Floating Math Symbols */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          '& .mathSymbol': {
            position: 'absolute',
            fontSize: '80px', // Increased size of the math symbols
            fontWeight: 'bold',
            color: 'rgba(255, 255, 255, 0.5)', // Light white color
            textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)', // Glowing effect
            animation: 'float 6s infinite ease-in-out',
          },
          '& .symbol1': {
            top: '10%',
            left: '15%',
            animationDelay: '0s',
          },
          '& .symbol2': {
            bottom: '10%',
            right: '15%',
            animationDelay: '3s',
          },
          '& .symbol3': {
            top: '30%',
            left: '50%',
            animationDelay: '1s',
          },
          '& .symbol4': {
            bottom: '20%',
            left: '10%',
            animationDelay: '2s',
          },
          '& .symbol5': {
            top: '5%',
            right: '5%',
            animationDelay: '4s',
          },
          '& .symbol6': {
            top: '50%',
            left: '5%',
            animationDelay: '1.5s',
          },
          '& .symbol7': {
            bottom: '5%',
            right: '50%',
            animationDelay: '2.5s',
          },
          '@keyframes float': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(20px)' },
            '100%': { transform: 'translateY(0px)' },
          },
        }}
      >
        <Box className="mathSymbol symbol1">∫</Box> {/* Integration symbol */}
        <Box className="mathSymbol symbol2">Σ</Box> {/* Summation symbol */}
        <Box className="mathSymbol symbol3">π</Box> {/* Pi symbol */}
        <Box className="mathSymbol symbol4">∞</Box> {/* Infinity symbol */}
        <Box className="mathSymbol symbol5">√</Box> {/* Square root symbol */}
        <Box className="mathSymbol symbol6">∂</Box> {/* Partial derivative symbol */}
        <Box className="mathSymbol symbol7">∑</Box> {/* Summation symbol */}
      </Box>

      {/* Static Triangles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none', // Prevent interaction with triangles
          '& .triangle': {
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, rgba(255, 87, 34, 0.4), rgba(255, 87, 34, 0.2))',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            transformOrigin: 'center',
          },
          '& .triangle1': {
            top: 0,
            left: 0,
            transform: 'rotate(15deg)',
            animation: 'glow1 3s infinite ease-in-out',
          },
          '& .triangle2': {
            bottom: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.5), rgba(33, 150, 243, 0.3))',
            transform: 'rotate(-20deg)',
            animation: 'glow2 3s infinite ease-in-out',
          },
          '& .triangle3': {
            top: '20%',
            left: '30%',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, rgba(76, 175, 80, 0.4), rgba(76, 175, 80, 0.2))',
            transform: 'rotate(30deg)',
            animation: 'glow3 3s infinite ease-in-out',
          },
          '& .triangle4': {
            bottom: '25%',
            right: '20%',
            width: '120px',
            height: '120px',
            background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.6), rgba(156, 39, 176, 0.3))',
            transform: 'rotate(-45deg)',
            animation: 'glow4 3s infinite ease-in-out',
          },
          '& .triangle5': {
            top: '50%',
            left: '10%',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, rgba(255, 193, 7, 0.5), rgba(255, 193, 7, 0.2))',
            transform: 'rotate(60deg)',
            animation: 'glow5 3s infinite ease-in-out',
          },
          '& .triangle6': {
            top: '10%',
            right: '10%',
            width: '90px',
            height: '90px',
            background: 'linear-gradient(45deg, rgba(0, 188, 212, 0.5), rgba(0, 188, 212, 0.2))',
            transform: 'rotate(-30deg)',
            animation: 'glow6 3s infinite ease-in-out',
          },
          '& .triangle7': {
            bottom: '10%',
            left: '15%',
            width: '110px',
            height: '110px',
            background: 'linear-gradient(45deg, rgba(244, 67, 54, 0.5), rgba(244, 67, 54, 0.2))',
            transform: 'rotate(45deg)',
            animation: 'glow7 3s infinite ease-in-out',
          },
          '@keyframes glow1': {
            '0%, 100%': { boxShadow: '0 0 0 rgba(255, 87, 34, 0)' },
            '50%': { boxShadow: '0 0 60px rgba(255, 87, 34, 0.8)' },
          },
          '@keyframes glow2': {
            '0%, 100%': { boxShadow: '0 0 0 rgba(33, 150, 243, 0)' },
            '50%': { boxShadow: '0 0 60px rgba(33, 150, 243, 0.8)' },
          },
          '@keyframes glow3': {
            '0%, 100%': { boxShadow: '0 0 0 rgba(76, 175, 80, 0)' },
            '50%': { boxShadow: '0 0 60px rgba(76, 175, 80, 0.8)' },
          },
          '@keyframes glow4': {
            '0%, 100%': { boxShadow: '0 0 0 rgba(156, 39, 176, 0)' },
            '50%': { boxShadow: '0 0 60px rgba(156, 39, 176, 0.8)' },
          },
          '@keyframes glow5': {
            '0%, 100%': { boxShadow: '0 0 0 rgba(255, 193, 7, 0)' },
            '50%': { boxShadow: '0 0 60px rgba(255, 193, 7, 0.8)' },
          },
          '@keyframes glow6': {
            '0%, 100%': { boxShadow: '0 0 0 rgba(0, 188, 212, 0)' },
            '50%': { boxShadow: '0 0 60px rgba(0, 188, 212, 0.8)' },
          },
          '@keyframes glow7': {
            '0%, 100%': { boxShadow: '0 0 0 rgba(244, 67, 54, 0)' },
            '50%': { boxShadow: '0 0 60px rgba(244, 67, 54, 0.8)' },
          },
        }}
      >
        <Box className="triangle triangle1" />
        <Box className="triangle triangle2" />
        <Box className="triangle triangle3" />
        <Box className="triangle triangle4" />
        <Box className="triangle triangle5" />
        <Box className="triangle triangle6" />
        <Box className="triangle triangle7" />
      </Box>

      {/* GIF Section */}
      <Box
        sx={{
          width: '50%', // Increased width slightly more
          height: '400px', // Increased height slightly more
          marginRight: '50px', // Keep margin for alignment
          zIndex: 1, // Ensure the form is above the background
        }}
      >
        <img
          src={animGif} // Use the imported GIF
          alt="Animation"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Ensure the image fits within the box
        />
      </Box>

      {/* Form Section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.13)',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 40px rgba(30, 0, 255, 0.6)',
          padding: '30px 25px', // Reduced padding
          zIndex: 1, // Ensure the form is above the background
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '10px', // Reduced distance between logo and text
            position: 'relative',
            padding: '0', // Set padding to 0
          }}
        >
          {/* Square Neon Glow */}
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              padding: '6px', // Reduced padding around the logo for a smaller box
              background: 'linear-gradient(145deg, rgba(49, 55, 241, 0.5), rgba(0, 0, 0, 0.8))', // Brighter two-shade gradient
              borderRadius: '19px', // Slightly rounded corners
              border: '1px',
              boxShadow: '0 0 10px rgb(0, 117, 117), 0 0 2px rgba(0, 255, 255, 0.8)', // Glow effect
              '& img': {
                width: '90px', // Reduced logo size
                height: '90px',
                objectFit: 'contain',
              },
            }}
          >
            <img
              src={logo} // Use the imported logo
              alt="Mathix Logo"
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              marginTop: '5px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontFamily: "'Poppins', sans-serif", // Modern font
              fontWeight: 'bold',
              fontSize: '24px',
              background: 'linear-gradient(90deg, rgba(0, 255, 255, 0.6), rgba(0, 255, 255, 1), rgba(0, 255, 255, 0.6))', // Brighter gradient background
              backgroundSize: '200% 100%', // Double the width for smooth animation
              WebkitBackgroundClip: 'text', // Clip the gradient to the text
              WebkitTextFillColor: 'transparent', // Make the text transparent to show the gradient
              animation: 'glowAnimation 3s infinite', // Apply the animation
              '@keyframes glowAnimation': {
                '0%': { backgroundPosition: '200% 0' }, // Start from the right
                '100%': { backgroundPosition: '-200% 0' }, // Move to the left
              },
            }}
          >
            Welcome Back to Mathix
          </Typography>
        </Box>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={{
            marginBottom: '20px',
            backgroundColor: 'rgba(241, 234, 234, 0.36)',
            borderRadius: '6px',
          }}
          InputProps={{
            style: { color: '#fff' },
          }}
          InputLabelProps={{
            style: { color: '#e5e5e5' },
          }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={{
            marginBottom: '20px',
            backgroundColor: 'rgba(241, 234, 234, 0.36)',
            borderRadius: '6px',
          }}
          InputProps={{
            style: { color: '#fff' },
          }}
          InputLabelProps={{
            style: { color: '#e5e5e5' },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#fff',
            color: '#080710',
            padding: '15px 0',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
        </Button>
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Link
            href="/signup"
            sx={{
              color: '#eaf0fb',
              textDecoration: 'none',
              '&:hover': {
                color: '#fff',
              },
            }}
          >
            New to Mathix ? Create an account
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
