import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, ThumbsUp } from '../ui/Icons';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../context/useAuth';

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

const formatRelativeTime = (dateValue) => {
  if (!dateValue) return 'just now';

  const createdAt = new Date(dateValue).getTime();
  if (Number.isNaN(createdAt)) return 'just now';

  const seconds = Math.max(1, Math.floor((Date.now() - createdAt) / 1000));
  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;

  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
};

const normalizeComment = (review, index) => {
  const user = review.userId || {};
  const name = user.username || user.fullname || review.user || 'Player';

  return {
    id: review._id || review.id || `review-${index}`,
    user: name,
    avatar: (user.avatar || review.avatar || name).slice(0, 1).toUpperCase(),
    rating: Number(review.rating) || 5,
    text: review.content || review.text || '',
    likes: Number(review.likes) || 0,
    time: review.createdAt ? formatRelativeTime(review.createdAt) : review.time || 'just now',
  };
};

const CommentsSection = ({ game }) => {
  const { isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState(mockReviews);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const gameId = game?.id ? String(game.id) : '';

  useEffect(() => {
    let isMounted = true;

    const loadComments = async () => {
      if (!gameId) return;
      setIsLoading(true);
      setError('');

      try {
        const data = await apiRequest(`/games/${gameId}/comments`);
        const liveReviews = Array.isArray(data)
          ? data.map(normalizeComment)
          : [];

        if (!isMounted) return;
        setReviews(liveReviews.length ? liveReviews : mockReviews);
      } catch (err) {
        if (!isMounted) return;
        setReviews(mockReviews);
        setError(err.message || 'Unable to load comments');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadComments();

    return () => {
      isMounted = false;
    };
  }, [gameId]);

  const canSubmit = useMemo(
    () => Boolean(isAuthenticated && comment.trim() && !isSubmitting),
    [comment, isAuthenticated, isSubmitting],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || !gameId) return;

    setIsSubmitting(true);
    setError('');

    try {
      const savedComment = await apiRequest(`/games/${gameId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: comment.trim(), rating }),
      });

      setReviews((currentReviews) => {
        const withoutMocks = currentReviews === mockReviews ? [] : currentReviews;
        return [normalizeComment(savedComment, 0), ...withoutMocks];
      });
      setComment('');
      setRating(5);
    } catch (err) {
      setError(err.message || 'Unable to post your comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="gv-section gv-comments-section" aria-label="Reviews">
      <div className="gv-section-head">
        <span className="gv-section-emoji">💬</span>
        <h2 className="gv-section-title">Reviews</h2>
        <span className="gv-section-badge">{reviews.length}</span>
      </div>

      {error ? (
        <p className="gv-comment-status" role="alert">
          {error}
        </p>
      ) : null}

      {/* Reviews list */}
      <div className="gv-reviews">
        {reviews.map((review, i) => (
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
      <form className="gv-comment-form" onSubmit={handleSubmit}>
        <MessageSquare size={16} className="gv-comment-form-icon" />
        <div className="gv-comment-rating" aria-label="Review rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`gv-comment-star ${value <= rating ? 'is-active' : ''}`}
              onClick={() => setRating(value)}
              aria-label={`${value} star${value === 1 ? '' : 's'}`}
            >
              ★
            </button>
          ))}
        </div>
        <input
          className="gv-comment-input"
          type="text"
          placeholder={isAuthenticated ? 'Share your thoughts on this game...' : 'Sign in to comment'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-label="Write a review"
          disabled={!isAuthenticated || isSubmitting}
        />
        {!isAuthenticated ? (
          <Link to="/login" className="gv-comment-login-link">
            Sign in
          </Link>
        ) : null}
        <button className="gv-comment-submit" type="submit" aria-label="Submit review" disabled={!canSubmit}>
          <Send size={15} />
        </button>
      </form>

      {isLoading ? (
        <p className="gv-comment-footnote">Syncing reviews...</p>
      ) : null}
    </section>
  );
};

export default CommentsSection;
