const express = require('express');
const Router = express.Router();

// GET all genres
Router.get('/', (req, res) => {
  res.send('Get all genres');
});

// POST create a genre
Router.post('/', (req, res) => {
  res.send('Create a genre');
});

// PUT update a genre
Router.put('/:id', (req, res) => {
  res.send(`Update genre with ID ${req.params.id}`);
});

// DELETE a genre
Router.delete('/:id', (req, res) => {
  res.send(`Delete genre with ID ${req.params.id}`);
});

module.exports = Router;
