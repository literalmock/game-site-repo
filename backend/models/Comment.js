const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  avatar: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //id in frontend
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }, 
  content: { type: String, required: true },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], default: 5 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
