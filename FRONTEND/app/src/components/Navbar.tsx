import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Avatar,
  Divider,
  Badge,
  Popover,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

interface NavbarProps {
  username: string;
  onLogout: () => void;
  navigate: (path: string) => void;
  onProfileClick: () => void; // Add profile click handler
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout, navigate, onProfileClick }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mailAnchorEl, setMailAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation(); // Get current location

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      if (token) {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNotifications(res.data || []);
        } catch (e) {
          setNotifications([]);
        }
      }
    };
    fetchNotifications();
  }, []);

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(45deg,rgb(149, 100, 218), #6200EA)',
          height: '80px',
          zIndex: 1300,
          overflow: 'hidden', // Prevent scrollbars
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            height: '100%',
            overflow: 'hidden', // Prevent scrollbars in the toolbar
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1301,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '28px', color: 'white', margin: '0 auto' }}>
            MATHIX AI LEARNING HUB
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <IconButton color="inherit" onClick={(e) => setMailAnchorEl(e.currentTarget)}>
              <MailIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          zIndex: 1302, // Ensure the sidebar appears above the Navbar
          '& .MuiDrawer-paper': {
            width: 300,
            backgroundColor: '#3f51b5',
            color: 'white',
          },
        }}
      >
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <Avatar sx={{ width: 100, height: 100, margin: '0 auto', backgroundColor: '#fff', color: '#3f51b5' }}>
            {username && username.length > 0 ? username.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {username && username.length > 0 ? username : 'User'}
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <List>
          {location.pathname !== '/home' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/home')}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/profile' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/profile')}>
                <ListItemText primary="User Profile" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/roadmap' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/roadmap')}>
                <ListItemText primary="Road Map" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/journey' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/journey')}>
                <ListItemText primary="Journey" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/motivation' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/motivation')}>
                <ListItemText primary="Motivation" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/friend' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/friend')}>
                <ListItemText primary="Show Friends" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/quiz' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/quiz')}>
                <ListItemText primary="Games" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/setting' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/setting')}>
                <ListItemText primary="Preferences & Settings" />
              </ListItemButton>
            </ListItem>
          )}
          {location.pathname !== '/contact' && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/contact')}>
                <ListItemText primary="Contact Us" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton onClick={onLogout}>
              <LogoutIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Mail (Post Message) Popover */}
      <Popover
        open={Boolean(mailAnchorEl)}
        anchorEl={mailAnchorEl}
        onClose={() => setMailAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Message from Admin
          </Typography>
          <Box sx={{ mb: 1, bgcolor: 'info.light', p: 1, borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Welcome to Mathix AI Learning Hub!
            </Typography>
            <Typography variant="caption" color="text.secondary">
              — mathix Team
            </Typography>
          </Box>
        </Box>
      </Popover>

      {/* Notifications Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Class Notifications
          </Typography>
          {/* User notifications */}
          {notifications.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          )}
          {notifications.map((n, idx) => (
            <Box key={n._id || idx} sx={{ mb: 1, bgcolor: n.read ? 'grey.100' : 'primary.light', p: 1, borderRadius: 1 }}>
              <Typography variant="body2">{n.message}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(n.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default Navbar;

