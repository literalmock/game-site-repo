const Score = require('../models/Score');
const User = require('../models/User');

const POINTS_PER_SECOND = 1;
const MAX_HEARTBEAT_SECONDS = 120;

const buildLeaderboard = async (gameId) => {
  const pipeline = [
    {
      $addFields: {
        gameKey: { $toString: "$gameId" },
      },
    },
  ];

  if (gameId) {
    pipeline.push({ $match: { gameKey: String(gameId) } });
  }

  pipeline.push(
    {
      $group: {
        _id: "$userId",
        maxScore: { $max: "$score" },
        totalScore: { $sum: "$score" },
        playSeconds: { $sum: { $ifNull: ["$durationSeconds", 0] } },
        games: { $sum: 1 },
        lastPlayedAt: { $max: "$createdAt" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        userId: { $toString: "$_id" },
        username: "$user.username",
        avatar: { $ifNull: ["$user.avatar", "$user.photoURL"] },
        maxScore: gameId ? "$maxScore" : "$totalScore",
        totalScore: 1,
        playSeconds: 1,
        games: 1,
        lastPlayedAt: 1,
      },
    },
    { $sort: { maxScore: -1, lastPlayedAt: 1 } },
    { $limit: 100 },
  );

  return Score.aggregate(pipeline);
};

const getGlobalLeaderboard = async (req, res) => {
  try {
    const scores = await buildLeaderboard();
    res.json({ leaderboard: scores });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error: err.message });
  }
};

// GET /api/games/:gameId/leaderboard or /api/leaderboard/:gameId
const getLeaderboard = async (req, res) => {
  try {
    const gameId = String(req.params.gameId || '').trim();
    if (!gameId) {
      return res.status(400).json({ message: "Game ID is required" });
    }

    const scores = await buildLeaderboard(gameId);
    res.json({ gameId, leaderboard: scores });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error: err.message });
  }
};

// POST /api/games/:gameId/playtime
const recordPlaytime = async (req, res) => {
  try {
    const gameId = String(req.params.gameId || '').trim();
    const seconds = Math.floor(Number(req.body.seconds));

    if (!gameId) {
      return res.status(400).json({ message: "Game ID is required" });
    }

    if (!Number.isFinite(seconds) || seconds <= 0) {
      return res.status(400).json({ message: "A positive seconds value is required" });
    }

    const safeSeconds = Math.min(seconds, MAX_HEARTBEAT_SECONDS);
    const earnedPoints = safeSeconds * POINTS_PER_SECOND;

    const score = await Score.findOneAndUpdate(
      { userId: req.user._id, gameId, source: 'playtime' },
      {
        $inc: {
          score: earnedPoints,
          durationSeconds: safeSeconds,
        },
        $set: {
          source: 'playtime',
          createdAt: new Date(),
        },
        $setOnInsert: {
          userId: req.user._id,
          gameId,
        },
      },
      {
        returnDocument: 'after',
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      message: "Playtime recorded",
      addedSeconds: safeSeconds,
      earnedPoints,
      score: score.score,
      durationSeconds: score.durationSeconds,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to record playtime", error: err.message });
  }
};

// POST /api/games/:gameId/score
const postScore = async (req, res) => {
  try {
    const gameId = String(req.params.gameId || '').trim();
    const { username, score } = req.body;
    const numericScore = Number(score);

    if (!gameId) {
      return res.status(400).json({ message: "Game ID is required" });
    }

    if (!username || !Number.isFinite(numericScore)) {
      return res.status(400).json({ message: "Username and a numeric score are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newScore = new Score({
      userId: user._id,
      gameId,
      score: numericScore
    });

    await newScore.save();
    res.status(201).json({ message: "Score submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit score", error: err.message });
  }
};

module.exports = {
  getGlobalLeaderboard,
  getLeaderboard,
  recordPlaytime,
  postScore
};
