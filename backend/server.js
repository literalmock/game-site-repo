const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth');
const gameRoutes = require('./Routes/games');
const genreRoutes = require('./Routes/genres');
const wishlistRoutes = require('./Routes/wishlist');
const leaderboardRoutes = require('./Routes/leaderboard');
const commentRoutes = require('./Routes/comments');
const connectDB = require('./utils/connectDB');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

// Connect to MongoDB
connectDB();
// Middleware
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/games', leaderboardRoutes);
app.use('/api/games', commentRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/user/wishlist', wishlistRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
