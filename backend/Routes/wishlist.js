const express = require('express');
const Router = express.Router();

// GET wishlist
Router.get('/', (req, res) => {
  res.send('Get user wishlist');
});

// POST add to wishlist
Router.post('/:gameId', (req, res) => {
  res.send(`Add game ${req.params.gameId} to wishlist`);
});

// DELETE remove from wishlist
Router.delete('/:gameId', (req, res) => {
  res.send(`Remove game ${req.params.gameId} from wishlist`);
});

module.exports = Router;
