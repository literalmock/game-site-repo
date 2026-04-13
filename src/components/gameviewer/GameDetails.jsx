import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, Tag } from 'lucide-react';

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
        <motion.div
          className="gv-detail-card gv-detail-desc"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="gv-detail-label">About</h3>
          <p className="gv-detail-text">{game.description}</p>
        </motion.div>

        {/* Tags */}
        <motion.div
          className="gv-detail-card"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <h3 className="gv-detail-label">
            <Tag size={13} className="gv-inline-icon" /> Tags
          </h3>
          <div className="gv-tags">
            {game.tags?.map((tag) => (
              <span key={tag} className="gv-tag">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="gv-detail-card"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
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
            <motion.div
              className="gv-progress-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${popularityPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="gv-progress-label">{popularityPercent}%</span>
        </motion.div>
      </div>
    </section>
  );
};

export default GameDetails;
