const express = require('express');
const Router = express.Router();

// Example route
Router.get('/', (req, res) => {
  res.send('Games route working');
});

module.exports = Router;