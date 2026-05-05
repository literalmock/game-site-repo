const express = require('express');
const Router = express.Router();

// GET comments for a game
Router.get('/:gameId/comments', (req, res) => {
  res.send(`Get comments for game ${req.params.gameId}`);
});

// POST comment for a game
Router.post('/:gameId/comments', (req, res) => {
  res.send(`Post comment for game ${req.params.gameId}`);
});

// DELETE a comment
Router.delete('/comments/:id', (req, res) => {
  res.send(`Delete comment with ID ${req.params.id}`);
});

module.exports = Router;
