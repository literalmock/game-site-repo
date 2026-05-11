const express = require('express');
const Router = express.Router();

// Example route
Router.get('/', (req, res) => {
  res.send('Games route working');
});
Router.get('/:gameId', (req, res) => {
  res.send(`Get details for game ${req.params.gameId}`);
}
);  

module.exports = Router;