const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Set MongoDB Atlas URI
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY || 'mathix_secret_key_2024';

// Check required environment variables
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in environment variables');
  process.exit(1);
}

if (!SECRET_KEY) {
  console.error('❌ SECRET_KEY is not defined in environment variables');
  process.exit(1);
}

const app = express();

// Allow CORS from your frontend domain
const allowedOrigins = [
  'http://localhost:5173', // Vite default
  'http://localhost:3000', // React default
  'https://mathix-main-voeg.vercel.app', // Your deployed Vercel frontend
  'https://mathix-main.vercel.app', // (optional, if you use this)
  'https://mathix-main.onrender.com', // Render frontend (if used)
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(express.json());

// Suppress deprecation warnings
mongoose.set('strictQuery', true);

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    process.exit(1);
  });

// User Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institution: { type: String, required: false },
  class: { type: String, required: false },
});

const User = mongoose.model('User', userSchema); // Ensure collection is named 'users'

// ✅ Signup Route
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password, institution, class: studentClass } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'Email already exists' });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, institution, class: studentClass });
    await newUser.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: 'Error registering user' });
  }
});

// ✅ Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send({ message: 'Error logging in' });
  }
});

// ✅ Profile Route
app.get('/api/auth/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).send({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).send({ message: 'Error fetching profile' });
  }
});

// ✅ Protected Dashboard Route
app.get('/api/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.send({ message: `Welcome to the dashboard, ${decoded.username}!` });
  } catch (err) {
    res.status(401).send({ message: 'Invalid token' });
  }
});

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// No code changes needed, .env MONGO_URI now points to your MongoDB Atlas cluster
// Make sure you run the correct file name: index.js, not inedx.js
