
const Score = require('../models/Score');
const mongoose = require('mongoose');

if (typeof Score !== 'function' || !Score || !Score.prototype) {
  console.error('Score model is not a constructor:', Score);
}
const User = require('../models/User');

// GET /api/games/:gameId/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    // Aggregate scores for the game, join user info, sort by score desc
    const scores = await Score.aggregate([
      { $match: { gameId: new mongoose.Types.ObjectId(gameId) } },
      {
        $group: {
          _id: "$userId",
          maxScore: { $max: "$score" },
          games: { $sum: 1 },
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          username: "$user.username",
          avatar: "$user.avatar",
          maxScore: 1,
          games: 1,
        }
      },
      { $sort: { maxScore: -1 } },
      { $limit: 100 }
    ]);
    res.json({ gameId, leaderboard: scores });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error: err.message });
  }
};

// POST /api/games/:gameId/score
const postScore = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const { username, score } = req.body;
    if (!username || typeof score !== 'number') {
      return res.status(400).json({ message: "Username and score are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newScore = new Score({
      userId: user._id,
      gameId: new mongoose.Types.ObjectId(gameId),
      score
    });
    await newScore.save();
    res.status(201).json({ message: "Score submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit score", error: err.message });
  }
};

module.exports = {
  getLeaderboard,
  postScore
};

