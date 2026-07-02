const mongoose = require('mongoose');
const Game = require('../models/Game');

const normalizeGame = (game) => {
  if (!game) return null;

  const sourceId = game.sourceId ?? game.publicId ?? game._id?.toString();

  return {
    ...game,
    id: sourceId,
    _id: game._id?.toString(),
    publicId: game.publicId ?? String(sourceId),
    category: game.category || game.genre || 'Arcade',
    genre: game.genre || game.category || 'Arcade',
    tags: Array.isArray(game.tags) ? game.tags : [],
  };
};

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const buildSort = (sortValue) => {
  switch (sortValue) {
    case 'oldest':
      return { createdAt: 1 };
    case 'title_asc':
      return { title: 1 };
    case 'title_desc':
      return { title: -1 };
    case 'source_asc':
      return { sourceId: 1, createdAt: 1 };
    default:
      return { sourceId: 1, createdAt: -1 };
  }
};

const getGames = async (req, res) => {
  try {
    const page = Math.max(1, toInt(req.query.page, 1));
    const limit = Math.min(100, Math.max(1, toInt(req.query.limit, 20)));
    const skip = (page - 1) * limit;

    const filter = {};
    const { genre, search, sort } = req.query;

    if (genre) {
      filter.$or = [
        { genre: { $regex: `^${genre}$`, $options: 'i' } },
        { category: { $regex: `^${genre}$`, $options: 'i' } },
      ];
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const [games, total] = await Promise.all([
      Game.find(filter).sort(buildSort(sort)).skip(skip).limit(limit).lean(),
      Game.countDocuments(filter),
    ]);

    return res.json({
      games: games.map(normalizeGame),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch games', error: error.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;

    const lookup = mongoose.isValidObjectId(gameId)
      ? { $or: [{ _id: gameId }, { publicId: String(gameId) }] }
      : { publicId: String(gameId) };

    const game = await Game.findOne(lookup).lean();
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.json(normalizeGame(game));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch game', error: error.message });
  }
};

const createGame = async (req, res) => {
  try {
    const { title, description, genre, category, thumbnail, iframeUrl, rating, views, tags } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const game = await Game.create({
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : undefined,
      genre: typeof genre === 'string' ? genre.trim() : undefined,
      category: typeof category === 'string' ? category.trim() : undefined,
      thumbnail: typeof thumbnail === 'string' ? thumbnail.trim() : undefined,
      iframeUrl: typeof iframeUrl === 'string' ? iframeUrl.trim() : undefined,
      rating: typeof rating === 'string' ? rating.trim() : undefined,
      views: typeof views === 'string' ? views.trim() : undefined,
      tags: Array.isArray(tags) ? tags : undefined,
    });

    return res.status(201).json(normalizeGame(game.toObject()));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create game', error: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    if (!mongoose.isValidObjectId(gameId)) {
      return res.status(400).json({ message: 'Invalid game ID' });
    }

    const updates = {};
    const { title, description, genre, category, thumbnail, iframeUrl, rating, views, tags } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ message: 'Title must be a non-empty string' });
      }
      updates.title = title.trim();
    }

    if (description !== undefined) {
      updates.description = typeof description === 'string' ? description.trim() : description;
    }

    if (genre !== undefined) {
      updates.genre = typeof genre === 'string' ? genre.trim() : genre;
    }

    if (category !== undefined) {
      updates.category = typeof category === 'string' ? category.trim() : category;
    }

    if (thumbnail !== undefined) {
      updates.thumbnail = typeof thumbnail === 'string' ? thumbnail.trim() : thumbnail;
    }

    if (iframeUrl !== undefined) {
      updates.iframeUrl = typeof iframeUrl === 'string' ? iframeUrl.trim() : iframeUrl;
    }

    if (rating !== undefined) {
      updates.rating = typeof rating === 'string' ? rating.trim() : rating;
    }

    if (views !== undefined) {
      updates.views = typeof views === 'string' ? views.trim() : views;
    }

    if (tags !== undefined) {
      updates.tags = Array.isArray(tags) ? tags : [];
    }

    const game = await Game.findByIdAndUpdate(gameId, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.json(normalizeGame(game));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update game', error: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    if (!mongoose.isValidObjectId(gameId)) {
      return res.status(400).json({ message: 'Invalid game ID' });
    }

    const game = await Game.findByIdAndDelete(gameId).lean();
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete game', error: error.message });
  }
};

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
