import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Add route for Signup */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/motivation" element={<Motivation />} />
          <Route path="/friend" element={<Friends />} /> {/* Add route for Friends */}
          <Route path="/quiz" element={<Game />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/online" element={<Online />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/notes" element={<Notes />} /> {/* Add route for Notes */}
          <Route path="/AIPage" element={<AIPage />} /> {/* Route for AIPage */}
          <Route path="/chatbot" element={<Chatbot />} /> {/* Route for Chatbot */}
          <Route path="/ai-recommendation" element={<AIRecommendation />} /> {/* Route for AIRecommendation */}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
