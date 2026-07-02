const express = require('express');
const Router = express.Router();
const auth = require('../middleware/auth');
const leaderboardController = require('../controllers/leaderboardController');

Router.get('/', leaderboardController.getGlobalLeaderboard);
Router.get('/:gameId', leaderboardController.getLeaderboard);
Router.post('/:gameId/playtime', auth, leaderboardController.recordPlaytime);
Router.post('/:gameId/score', leaderboardController.postScore);

// GET leaderboard for a game
Router.get('/:gameId/leaderboard', leaderboardController.getLeaderboard );

module.exports = Router;
