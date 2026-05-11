const Comment = require('../models/Comment');
const Game = require('../models/Game');
const auth = require('../middleware/auth');

// Get comments for a game
// GET /api/games/:gameId/comments
exports.getCommentsForGame = async (req, res) => {
  try {
    const comments = await Comment.find({ gameId: req.params.gameId }).populate('userId', 'username avatar');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Create a new comment for a game
// POST /api/games/:gameId/comments
exports.createComment = async (req, res) => {
  try {
  const { content , rating } = req.body;
  const user = req.user;
  console.log(req.user)
  const gameId = req.params.gameId;
    if (!content || !rating) {
      return res.status(400).json({ error: 'Content and rating are required' });
    }
    // 1. check if the gameId is valid and exists in the database
    if (gameId.length !== 24) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
    // Check if game exists
    // const game = await Game.findById(gameId);
    // if (!game) {
    //   return res.status(404).json({ error: 'Game not found' });
    // }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    // 2. check if the user has already commented on this game (optional)
        const existingComment = await Comment.findOne({ gameId: gameId, userId: user._id });
    if (existingComment) {
      return res.status(400).json({ error: 'You have already commented on this game' });
    }
    // 3. validate the content and rating (already done above)
    const newComment = new Comment({
      avatar: user.avatar,
      userId: user._id,
      gameId: gameId,
      content: content,
      rating: rating,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create comment', details: err.message });
  }
};

// Delete a comment
// DELETE /api/comments/:id
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (comment.userId.toString() !== req.user._id.toString() &&
  req.user.role !== "admin") {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
