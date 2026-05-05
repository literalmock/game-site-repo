import React from 'react';
import { Play } from '../ui/Icons';

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
          <button
            key={game.id}
            className="gv-grid-card gv-reveal-up"
            onClick={() => onSelect(game)}
            style={{ animationDelay: `${i * 0.04}s` }}
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
                  <Play size={20} fill="currentColor" />
                </span>
              </div>
            </div>
            <div className="gv-grid-info">
              <span className="gv-grid-cat">{game.category}</span>
              <h3 className="gv-grid-title">{game.title}</h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MoreLikeThis;
