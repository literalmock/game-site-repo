import React, { useRef } from 'react';
import { Play } from '../ui/Icons';

const GameListCard = ({ game, isActive, onSelect }) => {
  return (
    <button
      className={`gv-list-card ${isActive ? 'gv-list-card--active' : ''}`}
      onClick={() => onSelect(game)}
      aria-label={`Play ${game.title}`}
      aria-pressed={isActive}
    >
      <div className="gv-list-thumb-wrap">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="gv-list-thumb"
          loading="lazy"
        />
        {/* Hover play overlay */}
        <div className="gv-list-hover-overlay">
          <span className="gv-list-play-icon">
            <Play size={18} fill="currentColor" />
          </span>
        </div>
        {isActive && <div className="gv-list-active-bar" />}
      </div>
      <div className="gv-list-card-info">
        <span className="gv-list-card-cat">{game.category}</span>
        <h3 className="gv-list-card-title">{game.title}</h3>
      </div>
    </button>
  );
};

const RecommendedGames = ({ games, activeGame, onSelect }) => {
  const scrollRef = useRef(null);

  return (
    <section className="gv-section" aria-label="Recommended Games">
      <div className="gv-section-head">
        <span className="gv-section-emoji">🔥</span>
        <h2 className="gv-section-title">Recommended Games</h2>
      </div>
      <div className="gv-scroll-track" ref={scrollRef}>
        {games.map((game) => (
          <GameListCard
            key={game.id}
            game={game}
            isActive={activeGame?.id === game.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedGames;
