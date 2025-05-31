import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = () => {
    console.log('Form Submitted:', formData);
    alert('Your message has been sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset the form
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'radial-gradient(circle, rgb(37, 1, 66), rgb(255, 165, 0))',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 3,
      }}
    >
      <Navbar username={username} navigate={navigate} onLogout={handleLogout} /> {/* Use Navbar */}
      <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            We'd love to hear from you! Please fill out the form below.
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={submitForm}
            sx={{
              backgroundColor: '#3F51B5',
              color: 'white',
              '&:hover': { backgroundColor: '#303F9F' },
            }}
          >
            Send Message
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;
