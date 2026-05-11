const express = require('express');
const Router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentController');
// GET comments for a game
Router.get('/:gameId/comments', commentController.getCommentsForGame);

// POST comment for a game
Router.post('/:gameId/comments', auth, commentController.createComment);

// DELETE a comment
Router.delete('/comment/:id', auth, commentController.deleteComment);


module.exports = Router;
