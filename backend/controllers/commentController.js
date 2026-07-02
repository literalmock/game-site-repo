const Comment = require('../models/Comment');

// Get comments for a game
// GET /api/games/:gameId/comments
exports.getCommentsForGame = async (req, res) => {
  try {
    const gameId = String(req.params.gameId || '').trim();
    if (!gameId) {
      return res.status(400).json({ message: 'Game ID is required' });
    }

    const comments = await Comment.find({ gameId })
      .populate('userId', 'username fullname avatar')
      .sort({ createdAt: -1 })
      .lean();

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

// Create a new comment for a game
// POST /api/games/:gameId/comments
exports.createComment = async (req, res) => {
  try {
    const { content, rating = 5 } = req.body;
    const user = req.user;
    const gameId = String(req.params.gameId || '').trim();
    const cleanContent = typeof content === 'string' ? content.trim() : '';
    const numericRating = Number(rating);

    if (!gameId) {
      return res.status(400).json({ message: 'Game ID is required' });
    }

    if (!cleanContent) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const existingComment = await Comment.findOne({ gameId, userId: user._id });
    if (existingComment) {
      return res.status(400).json({ message: 'You have already commented on this game' });
    }

    const newComment = new Comment({
      avatar: user.avatar,
      userId: user._id,
      gameId,
      content: cleanContent,
      rating: numericRating,
    });

    await newComment.save();
    const populatedComment = await Comment.findById(newComment._id)
      .populate('userId', 'username fullname avatar')
      .lean();

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create comment', details: err.message });
  }
};

// Delete a comment
// DELETE /api/comments/:id
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.userId.toString() !== req.user._id.toString() &&
  req.user.role !== "admin") {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};
