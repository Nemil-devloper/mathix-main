import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material'; // Import Box from MUI
import Login from './pages/Login';
import Signup from './pages/Signup'; // Import the Signup page
import Home from './pages/Home';
import Profile from './pages/Profile';
import Roadmap from './pages/Roadmap';
import Journey from './pages/Journey';
import Motivation from './pages/Motivation';
import Friends from './pages/Friends'; // Import the Friends page
import Game from './pages/Game'; // Import the Game page
import Settings from './pages/Settings'; // Import the Settings page
import ContactUs from './pages/ContactUs'; // Import the ContactUs page
import Online from './pages/Online'; // Import the Online page
import Offline from './pages/Offline'; // Import the Offline page
import Notes from './pages/Notes'; // Import the Notes page
import AIPage from './pages/AIPage'; // Import AIPage
import Chatbot from './pages/Chatbot'; // Import Chatbot
import AIRecommendation from './pages/AIRecommendation'; // Import AIRecommendation

// Auth wrapper for protected routes
function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    // If not authenticated, redirect to login, preserving the intended path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden', // Prevent all scrollbars
        }}
      >
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          <Route path="/home" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          <Route path="/profile" element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
          <Route path="/roadmap" element={
            <RequireAuth>
              <Roadmap />
            </RequireAuth>
          } />
          <Route path="/journey" element={
            <RequireAuth>
              <Journey />
            </RequireAuth>
          } />
          <Route path="/motivation" element={
            <RequireAuth>
              <Motivation />
            </RequireAuth>
          } />
          <Route path="/friend" element={
            <RequireAuth>
              <Friends />
            </RequireAuth>
          } />
          <Route path="/quiz" element={
            <RequireAuth>
              <Game />
            </RequireAuth>
          } />
          <Route path="/setting" element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          } />
          <Route path="/contact" element={
            <RequireAuth>
              <ContactUs />
            </RequireAuth>
          } />
          <Route path="/online" element={
            <RequireAuth>
              <Online />
            </RequireAuth>
          } />
          <Route path="/offline" element={
            <RequireAuth>
              <Offline />
            </RequireAuth>
          } />
          <Route path="/notes" element={
            <RequireAuth>
              <Notes />
            </RequireAuth>
          } />
          <Route path="/AIPage" element={
            <RequireAuth>
              <AIPage />
            </RequireAuth>
          } />
          <Route path="/chatbot" element={
            <RequireAuth>
              <Chatbot />
            </RequireAuth>
          } />
          <Route path="/ai-recommendation" element={
            <RequireAuth>
              <AIRecommendation />
            </RequireAuth>
          } />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
