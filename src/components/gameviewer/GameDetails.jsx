import React from 'react';
import { Eye, Star, Tag } from '../ui/Icons';

const StarRating = ({ rating }) => {
  const filled = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="gv-stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`gv-star-icon ${i < filled ? 'gv-star--filled' : i === filled && hasHalf ? 'gv-star--half' : 'gv-star--empty'}`}
          fill={i < filled ? 'currentColor' : 'none'}
        />
      ))}
      <span className="gv-star-value">{rating}</span>
    </div>
  );
};

const GameDetails = ({ game }) => {
  if (!game) return null;

  const popularityPercent = Math.round((game.rating / 5) * 100);

  return (
    <section className="gv-section gv-details-section" aria-label="Game Details">
      <div className="gv-section-head">
        <span className="gv-section-emoji">📊</span>
        <h2 className="gv-section-title">Game Details</h2>
      </div>

      <div className="gv-details-grid">
        {/* Description */}
        <div className="gv-detail-card gv-detail-desc gv-reveal-up">
          <h3 className="gv-detail-label">About</h3>
          <p className="gv-detail-text">{game.description}</p>
        </div>

        {/* Tags */}
        <div className="gv-detail-card gv-reveal-up" style={{ animationDelay: '0.05s' }}>
          <h3 className="gv-detail-label">
            <Tag size={13} className="gv-inline-icon" /> Tags
          </h3>
          <div className="gv-tags">
            {game.tags?.map((tag) => (
              <span key={tag} className="gv-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="gv-detail-card gv-reveal-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="gv-detail-label">
            <Star size={13} className="gv-inline-icon" /> Rating
          </h3>
          <StarRating rating={game.rating} />

          <h3 className="gv-detail-label" style={{ marginTop: '1rem' }}>
            <Eye size={13} className="gv-inline-icon" /> Views
          </h3>
          <span className="gv-stat-value">{game.views}</span>

          <h3 className="gv-detail-label" style={{ marginTop: '1rem' }}>Popularity</h3>
          <div className="gv-progress-bar">
            <div
              className="gv-progress-fill"
              style={{ width: `${popularityPercent}%` }}
            />
          </div>
          <span className="gv-progress-label">{popularityPercent}%</span>
        </div>
      </div>
    </section>
  );
};

export default GameDetails;
