const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth');
const gameRoutes = require('./Routes/games');
const genreRoutes = require('./Routes/genres');
const wishlistRoutes = require('./Routes/wishlist');
const leaderboardRoutes = require('./Routes/leaderboard');
const commentRoutes = require('./Routes/comments');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/user/wishlist', wishlistRoutes);
app.use('/api/games', leaderboardRoutes);
app.use('/api/games', commentRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});