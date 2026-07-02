const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: String, required: true },
  score: { type: Number, required: true },
  durationSeconds: { type: Number, default: 0 },
  source: { type: String, enum: ['manual', 'playtime'], default: 'manual' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);
