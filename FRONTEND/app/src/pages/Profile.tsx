import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [updatedUsername, setUpdatedUsername] = useState<string>('');
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
        setUpdatedUsername(response.data.username || 'Guest');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [navigate]);
  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleProfilePictureChange = (file: File | null) => {
    setUpdatedProfilePicture(file);
  };

  const handleEditProfile = async () => {
    try {
      // Update the username locally
      setUserData((prevData: any) => ({
        ...prevData,
        username: updatedUsername,
        profilePicture: updatedProfilePicture ? URL.createObjectURL(updatedProfilePicture) : prevData.profilePicture,
      }));

      setEditDialogOpen(false); // Close the dialog after saving
      setUpdatedProfilePicture(null); // Clear the selected profile picture
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error updating profile.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false); // Close the dialog
    setUpdatedUsername(userData.username); // Reset the username to the original value
    setUpdatedProfilePicture(null); // Clear the selected profile picture
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom right, #1e3c72, #2a5298)',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, #1e3c72, #2a5298)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Navbar
        username={userData.username || 'Guest'}
        navigate={navigate}
        onLogout={handleLogout}
        onProfileClick={() => {}}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          position: 'relative',
          marginTop: '20px',
        }}
      >
        {/* Profile Header */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            width: '100%',
            maxWidth: '600px',
            marginBottom: 4,
          }}
        >
          <Avatar
            src={userData.profilePicture || '/path/to/default-avatar.png'}
            alt={userData.username?.charAt(0).toUpperCase() || 'G'}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto',
              marginBottom: 2,
              border: '3px solid #fff',
              fontSize: 48,
              backgroundColor: '#4a69bd',
              color: '#fff',
            }}
          >
            {!userData.profilePicture && (userData.username?.charAt(0).toUpperCase() || 'G')}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {userData.username || 'Guest'}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ddd', marginBottom: 2 }}>
            {userData.email || 'No email provided'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: '#4a69bd',
              color: 'white',
              '&:hover': { backgroundColor: '#3b5998' },
            }}
            onClick={() => setEditDialogOpen(true)}
          >
            Edit Profile
          </Button>
        </Paper>

        {/* Edit Profile Dialog */}
        <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              label="Username"
              fullWidth
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: 2 }}
            >
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleProfilePictureChange(e.target.files?.[0] || null)}
              />
            </Button>
            {updatedProfilePicture && (
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Selected File: {updatedProfilePicture.name}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit}>Cancel</Button>
            <Button onClick={handleEditProfile} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Dynamic Learning Progress */}
        <Grid container spacing={3} sx={{ maxWidth: '900px', width: '100%' }}>
          {[
            { label: 'Modules Completed', value: `${userData.modulesCompleted || 0} / ${userData.totalModules || 0}` },
            { label: 'Practice Problems Solved', value: `${userData.problemsSolved || 0} / ${userData.totalProblems || 0}` },
            { label: 'Leaderboard Rank', value: userData.rank || 'N/A' },
            { label: 'Achievements Unlocked', value: `${userData.achievementsUnlocked || 0} / ${userData.totalAchievements || 0}` },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
                <Typography variant="h5">{item.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Dynamic Achievements */}
        {userData.achievements?.length > 0 ? (
          userData.achievements.map((achievement: any, index: number) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                width: '100%',
                maxWidth: '600px',
                marginTop: 4,
              }}
            >
              <TrophyIcon sx={{ fontSize: 50, color: '#27ae60', marginBottom: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {achievement.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ddd' }}>
                {achievement.description}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: '#ddd', marginTop: 4 }}>
            No achievements unlocked yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
