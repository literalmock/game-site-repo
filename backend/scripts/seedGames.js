const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const { pathToFileURL } = require('url');
const Game = require('../models/Game');

dotenv.config();

const loadViewerGames = async () => {
  const viewerGamesPath = path.resolve(__dirname, '../../frontend/src/utils/viewerGames.js');
  const moduleUrl = pathToFileURL(viewerGamesPath).href;
  const module = await import(moduleUrl);
  return module.viewerGames || module.default || [];
};

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  const viewerGames = await loadViewerGames();
  if (!Array.isArray(viewerGames) || viewerGames.length === 0) {
    throw new Error('No games found in frontend viewerGames.js');
  }

  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all(viewerGames.map((game) => {
    const publicId = String(game.id);
    const category = game.category || game.genre || 'Arcade';

    return Game.findOneAndUpdate(
      { publicId },
      {
        $set: {
          publicId,
          sourceId: Number(game.id),
          title: game.title,
          description: game.description,
          genre: category,
          category,
          tags: Array.isArray(game.tags) ? game.tags : [],
          thumbnail: game.thumbnail,
          rating: String(game.rating || ''),
          views: String(game.views || ''),
          iframeUrl: game.iframeUrl,
          source: 'viewerGames',
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
  }));

  console.log(`Seeded ${viewerGames.length} games from viewerGames.js.`);
};

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
