import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, List, ListItem, Button, Divider } from '@mui/material';
import Navbar from '../components/Navbar'; // Import Navbar component
import { useNavigate } from 'react-router-dom';

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<{ name: string; progress: string }[]>([
    { name: 'Friend 1', progress: '75%' },
    { name: 'Friend 2', progress: '60%' },
    { name: 'Friend 3', progress: '85%' },
  ]);
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

  const addFriend = () => {
    const friendName = prompt("Enter the name of your friend's ID:");
    if (friendName) {
      setFriends([...friends, { name: friendName, progress: '0%' }]);
    }
  };

  const toggleProgress = (friendName: string) => {
    const progressDiv = document.getElementById(`progress-${friendName}`);
    if (progressDiv) {
      progressDiv.style.display =
        progressDiv.style.display === 'none' || progressDiv.style.display === ''
          ? 'block'
          : 'none';
    }
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
      <Navbar username={username} navigate={navigate} onLogout={handleLogout} /> {/* Use Navbar */}
      <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
        {/* Friends Section */}
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, marginBottom: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Your Friends
          </Typography>
          <Button
            variant="contained"
            onClick={addFriend}
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              '&:hover': { backgroundColor: '#303f9f' },
              marginBottom: 2,
            }}
          >
            Add Friend
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Current Friends
          </Typography>
          <List>
            {friends.map((friend) => (
              <ListItem
                key={friend.name}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  backgroundColor: '#e3f2fd',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {friend.name}
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => toggleProgress(friend.name)}
                    sx={{
                      marginRight: 2,
                      color: '#3f51b5',
                      borderColor: '#3f51b5',
                      '&:hover': { backgroundColor: '#e3f2fd' },
                    }}
                  >
                    Show Progress
                  </Button>
                  <Box
                    id={`progress-${friend.name}`}
                    sx={{
                      display: 'none',
                      marginTop: 1,
                      padding: 1,
                      backgroundColor: '#f0f0f0',
                      borderRadius: 2,
                    }}
                  >
                    Progress: {friend.progress}
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Friends;
