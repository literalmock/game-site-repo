const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', genreController.getGenres);
router.get('/:genreId', genreController.getGenreById);
router.post('/', genreController.createGenre);
router.put('/:genreId', genreController.updateGenre);
router.delete('/:genreId', genreController.deleteGenre);

module.exports = router;
