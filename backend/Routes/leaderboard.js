const express = require('express');
const Router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
// GET leaderboard for a game
Router.get('/:gameId/leaderboard', leaderboardController.getLeaderboard );

// POST score for a game
Router.post('/:gameId/score', leaderboardController.postScore );

module.exports = Router;
