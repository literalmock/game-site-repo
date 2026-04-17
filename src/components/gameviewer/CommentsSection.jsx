import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp } from '../ui/Icons';

const mockReviews = [
  {
    id: 1,
    user: 'BladeRunner99',
    avatar: 'B',
    rating: 5,
    text: 'Absolutely love this game. The controls are tight and the gameplay loop is incredibly satisfying.',
    likes: 24,
    time: '2 days ago',
  },
  {
    id: 2,
    user: 'NightOwl_X',
    avatar: 'N',
    rating: 4,
    text: "Solid game with great visuals. A bit of a learning curve at first but once you get it, it's great.",
    likes: 18,
    time: '5 days ago',
  },
  {
    id: 3,
    user: 'PixelKnight',
    avatar: 'P',
    rating: 4,
    text: "Fun for a quick session. Would love more levels but what's here is polished.",
    likes: 11,
    time: '1 week ago',
  },
];

const StarRow = ({ count }) => (
  <span className="gv-review-stars">
    {'★'.repeat(count)}
    {'☆'.repeat(5 - count)}
  </span>
);

const CommentsSection = ({ game }) => {
  const [comment, setComment] = useState('');

  return (
    <section className="gv-section gv-comments-section" aria-label="Reviews">
      <div className="gv-section-head">
        <span className="gv-section-emoji">💬</span>
        <h2 className="gv-section-title">Reviews</h2>
        <span className="gv-section-badge">{mockReviews.length}</span>
      </div>

      {/* Reviews list */}
      <div className="gv-reviews">
        {mockReviews.map((review, i) => (
          <div
            key={review.id}
            className="gv-review-card gv-reveal-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="gv-review-header">
              <span className="gv-review-avatar">{review.avatar}</span>
              <div className="gv-review-user-info">
                <span className="gv-review-user">{review.user}</span>
                <div className="gv-review-meta">
                  <StarRow count={review.rating} />
                  <span className="gv-review-time">{review.time}</span>
                </div>
              </div>
            </div>
            <p className="gv-review-text">{review.text}</p>
            <button className="gv-review-like" aria-label={`Like review by ${review.user}`}>
              <ThumbsUp size={13} />
              <span>{review.likes}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Write a review */}
      <div className="gv-comment-form">
        <MessageSquare size={16} className="gv-comment-form-icon" />
        <input
          className="gv-comment-input"
          type="text"
          placeholder="Share your thoughts on this game…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-label="Write a review"
        />
        <button
          className="gv-comment-submit"
          onClick={() => setComment('')}
          aria-label="Submit review"
          disabled={!comment.trim()}
        >
          <Send size={15} />
        </button>
      </div>
    </section>
  );
};

export default CommentsSection;
