import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const MoreLikeThis = ({ games, activeGame, onSelect }) => {
  const similar = games
    .filter((g) => g.id !== activeGame?.id)
    .filter(
      (g) =>
        g.category === activeGame?.category ||
        g.tags?.some((t) => activeGame?.tags?.includes(t)),
    )
    .slice(0, 6);

  // Fall back to any other games if similarity is low
  const items =
    similar.length >= 3
      ? similar
      : games.filter((g) => g.id !== activeGame?.id).slice(0, 6);

  return (
    <section className="gv-section" aria-label="More Like This">
      <div className="gv-section-head">
        <span className="gv-section-emoji">🎮</span>
        <h2 className="gv-section-title">More Like This</h2>
      </div>
      <div className="gv-grid">
        {items.map((game, i) => (
          <motion.button
            key={game.id}
            className="gv-grid-card"
            onClick={() => onSelect(game)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Play ${game.title}`}
          >
            <div className="gv-grid-thumb-wrap">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="gv-grid-thumb"
                loading="lazy"
              />
              <div className="gv-grid-hover">
                <span className="gv-grid-play">
                  <Play size={20} fill="white" />
                </span>
              </div>
            </div>
            <div className="gv-grid-info">
              <span className="gv-grid-cat">{game.category}</span>
              <h3 className="gv-grid-title">{game.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default MoreLikeThis;
