const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getGames);
router.get('/:gameId', gameController.getGameById);
router.post('/', gameController.createGame);
router.put('/:gameId', gameController.updateGame);
router.delete('/:gameId', gameController.deleteGame);

module.exports = router;
