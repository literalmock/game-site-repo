const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Score = require('../models/Score');
const User = require('../models/User');

dotenv.config();

const demoUsers = [
  { fullname: 'Nova Striker', username: 'NovaStriker', email: 'nova.striker@gameverse.demo', avatar: 'N' },
  { fullname: 'Pixel Viper', username: 'PixelViper', email: 'pixel.viper@gameverse.demo', avatar: 'P' },
  { fullname: 'Arcade Warden', username: 'ArcadeWarden', email: 'arcade.warden@gameverse.demo', avatar: 'A' },
  { fullname: 'Neon Kite', username: 'NeonKite', email: 'neon.kite@gameverse.demo', avatar: 'K' },
  { fullname: 'Zen Runner', username: 'ZenRunner', email: 'zen.runner@gameverse.demo', avatar: 'Z' },
  { fullname: 'Blade Runner', username: 'BladeRunner99', email: 'blade.runner@gameverse.demo', avatar: 'B' },
  { fullname: 'Night Owl', username: 'NightOwl_X', email: 'night.owl@gameverse.demo', avatar: 'N' },
  { fullname: 'Pixel Knight', username: 'PixelKnight', email: 'pixel.knight@gameverse.demo', avatar: 'P' },
];

const scoreRows = [
  { username: 'NovaStriker', gameId: '7', score: 24850 },
  { username: 'NovaStriker', gameId: '3', score: 18420 },
  { username: 'PixelViper', gameId: '7', score: 23110 },
  { username: 'PixelViper', gameId: '9', score: 17640 },
  { username: 'ArcadeWarden', gameId: '7', score: 21940 },
  { username: 'ArcadeWarden', gameId: '4', score: 15120 },
  { username: 'NeonKite', gameId: '2', score: 19870 },
  { username: 'ZenRunner', gameId: '7', score: 18730 },
  { username: 'BladeRunner99', gameId: '7', score: 16980 },
  { username: 'NightOwl_X', gameId: '7', score: 15840 },
  { username: 'PixelKnight', gameId: '7', score: 14180 },
];

const commentRows = [
  {
    username: 'BladeRunner99',
    gameId: '7',
    rating: 5,
    likes: 24,
    content: 'Absolutely love this game. The controls are tight and the gameplay loop is incredibly satisfying.',
  },
  {
    username: 'NightOwl_X',
    gameId: '7',
    rating: 4,
    likes: 18,
    content: "Solid game with great visuals. A bit of a learning curve at first but once you get it, it's great.",
  },
  {
    username: 'PixelKnight',
    gameId: '7',
    rating: 4,
    likes: 11,
    content: "Fun for a quick session. Would love more levels but what's here is polished.",
  },
];

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(process.env.MONGO_URI);

  const password = await bcrypt.hash('demoPassword123', 10);

  await Promise.all(demoUsers.map((user) => User.findOneAndUpdate(
    { email: user.email },
    {
      $set: {
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: 'user',
      },
      $setOnInsert: { password },
    },
    { returnDocument: 'after', upsert: true },
  )));

  const users = await User.find({ email: { $in: demoUsers.map((user) => user.email) } }).lean();
  const userByName = new Map(users.map((user) => [user.username, user]));
  const userIds = users.map((user) => user._id);

  await Promise.all([
    Score.deleteMany({ userId: { $in: userIds } }),
    Comment.deleteMany({ userId: { $in: userIds } }),
  ]);

  await Score.insertMany(scoreRows.map((row) => ({
    userId: userByName.get(row.username)._id,
    gameId: row.gameId,
    score: row.score,
  })));

  await Comment.insertMany(commentRows.map((row, index) => ({
    userId: userByName.get(row.username)._id,
    avatar: userByName.get(row.username).avatar,
    gameId: row.gameId,
    content: row.content,
    rating: row.rating,
    likes: row.likes,
    createdAt: new Date(Date.now() - (index + 2) * 24 * 60 * 60 * 1000),
  })));

  console.log(`Seeded ${users.length} demo users, ${scoreRows.length} scores, and ${commentRows.length} comments.`);
};

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
