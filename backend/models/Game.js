const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);