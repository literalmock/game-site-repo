const mongoose = require('mongoose');
const Genre = require('../models/Genre');

const getGenres = async (_req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 }).lean();
    return res.json(genres);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch genres', error: error.message });
  }
};

const getGenreById = async (req, res) => {
  try {
    const { genreId } = req.params;

    if (!mongoose.isValidObjectId(genreId)) {
      return res.status(400).json({ message: 'Invalid genre ID' });
    }

    const genre = await Genre.findById(genreId).lean();
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    return res.json(genre);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch genre', error: error.message });
  }
};

const createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const genre = await Genre.create({
      name: name.trim(),
      description: typeof description === 'string' ? description.trim() : undefined,
    });

    return res.status(201).json(genre);
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({ message: 'Genre already exists' });
    }
    return res.status(500).json({ message: 'Failed to create genre', error: error.message });
  }
};

const updateGenre = async (req, res) => {
  try {
    const { genreId } = req.params;
    const { name, description } = req.body;

    if (!mongoose.isValidObjectId(genreId)) {
      return res.status(400).json({ message: 'Invalid genre ID' });
    }

    const updates = {};
    if (name !== undefined) {
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ message: 'Name must be a non-empty string' });
      }
      updates.name = name.trim();
    }
    if (description !== undefined) {
      updates.description = typeof description === 'string' ? description.trim() : description;
    }

    const genre = await Genre.findByIdAndUpdate(genreId, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    return res.json(genre);
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({ message: 'Genre already exists' });
    }
    return res.status(500).json({ message: 'Failed to update genre', error: error.message });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { genreId } = req.params;

    if (!mongoose.isValidObjectId(genreId)) {
      return res.status(400).json({ message: 'Invalid genre ID' });
    }

    const genre = await Genre.findByIdAndDelete(genreId).lean();
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    return res.json({ message: 'Genre deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete genre', error: error.message });
  }
};

module.exports = {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
