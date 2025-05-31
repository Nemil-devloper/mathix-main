import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button, ListItemText, OutlinedInput } from '@mui/material';
import Navbar from '../components/Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'english',
    notifications: true,
    difficulty: 'medium',
    practiceFrequency: 'daily',
    problemTypes: ['algebra'],
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

  const handleChange = (field: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const savePreferences = () => {
    console.log('Preferences Saved:', preferences);
    alert('Preferences saved successfully!');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'radial-gradient(circle, rgb(37, 1, 66), rgb(63, 81, 181))',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: 3,
      }}
    >
      <Navbar username={username} navigate={navigate} onLogout={handleLogout} onProfileClick={function (): void {
        throw new Error('Function not implemented.');
      } } /> {/* Use Navbar */}
      <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Preferences and Settings
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Choose Theme</InputLabel>
            <Select
              value={preferences.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={preferences.language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="hindi">Hindi</MenuItem>
              <MenuItem value="gujrati">Gujarati</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
            }
            label="Enable Notifications"
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Math Difficulty Level</InputLabel>
            <Select
              value={preferences.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Practice Frequency</InputLabel>
            <Select
              value={preferences.practiceFrequency}
              onChange={(e) => handleChange('practiceFrequency', e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="biweekly">Biweekly</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Preferred Problem Types</InputLabel>
            <Select
              multiple
              value={preferences.problemTypes}
              onChange={(e) => handleChange('problemTypes', e.target.value)}
              input={<OutlinedInput label="Preferred Problem Types" />}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              <MenuItem value="algebra">
                <Checkbox checked={preferences.problemTypes.includes('algebra')} />
                <ListItemText primary="Algebra" />
              </MenuItem>
              <MenuItem value="geometry">
                <Checkbox checked={preferences.problemTypes.includes('geometry')} />
                <ListItemText primary="Geometry" />
              </MenuItem>
              <MenuItem value="calculus">
                <Checkbox checked={preferences.problemTypes.includes('calculus')} />
                <ListItemText primary="Calculus" />
              </MenuItem>
              <MenuItem value="trigonometry">
                <Checkbox checked={preferences.problemTypes.includes('trigonometry')} />
                <ListItemText primary="Trigonometry" />
              </MenuItem>
              <MenuItem value="statistics">
                <Checkbox checked={preferences.problemTypes.includes('statistics')} />
                <ListItemText primary="Statistics" />
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={savePreferences}
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              '&:hover': { backgroundColor: '#303f9f' },
            }}
          >
            Save Preferences
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Settings;
