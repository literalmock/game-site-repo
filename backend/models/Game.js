const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  publicId: { type: String, index: true },
  sourceId: Number,
  title: { type: String, required: true },
  description: String,
  genre: String,
  category: String,
  tags: [{ type: String }],
  thumbnail: String,
  rating: String,
  views: String,
  iframeUrl: String,
  source: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
