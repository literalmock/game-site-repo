const express = require('express');
const Router = express.Router();

// GET leaderboard for a game
Router.get('/:gameId/leaderboard', (req, res) => {
  res.send(`Get leaderboard for game ${req.params.gameId}`);
});

// POST score for a game
Router.post('/:gameId/score', (req, res) => {
  res.send(`Post score for game ${req.params.gameId}`);
});

module.exports = Router;
