import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Volume2, VolumeX, Play, Star, Eye } from 'lucide-react';

const HeroSection = ({ game, isTransitioning }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => {}, 100);
    return () => clearTimeout(timer);
  }, [game?.id]);

  const handleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const handlePlayFullscreen = () => {
    handleFullscreen();
  };

  if (!game) return null;

  return (
    <section className="gv-hero">
      {/* Blurred BG */}
      <div className="gv-hero-bg">
        <img src={game.thumbnail} alt="" className="gv-hero-bg-img" aria-hidden="true" />
        <div className="gv-hero-bg-overlay" />
      </div>

      {/* Particles */}
      <div className="gv-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="gv-particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="gv-hero-inner">
        {/* Glass iframe card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={game.id}
            className="gv-iframe-card"
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Skeleton loader */}
            {!isLoaded && (
              <div className="gv-skeleton" aria-label="Loading game...">
                <div className="gv-skeleton-shimmer" />
                <div className="gv-skeleton-icon">
                  <Play size={40} className="gv-skeleton-play" />
                  <span className="gv-skeleton-text">Loading {game.title}…</span>
                </div>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={game.iframeUrl}
              title={game.title}
              className={`gv-iframe ${isLoaded ? 'gv-iframe--visible' : ''}`}
              allow="fullscreen; autoplay"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              scrolling="no"
              frameBorder="0"
            />

            {/* Controls overlay */}
            <div className="gv-controls">
              <button
                className="gv-ctrl-btn"
                onClick={() => setIsMuted(m => !m)}
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute game' : 'Mute game'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                className="gv-ctrl-btn"
                onClick={handleFullscreen}
                title="Fullscreen"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 size={16} />
              </button>
            </div>

            {/* Now Playing badge */}
            <div className="gv-now-playing" aria-label="Now playing">
              <span className="gv-now-playing-dot" />
              <span>Now Playing</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Game info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${game.id}`}
            className="gv-hero-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="gv-hero-meta">
              <span className="gv-category-badge">{game.category}</span>
              <div className="gv-stats">
                <span className="gv-stat">
                  <Star size={13} className="gv-stat-icon gv-star" />
                  {game.rating}
                </span>
                <span className="gv-stat">
                  <Eye size={13} className="gv-stat-icon" />
                  {game.views}
                </span>
              </div>
            </div>
            <h1 className="gv-hero-title">{game.title}</h1>
            <p className="gv-hero-desc">{game.description}</p>
            <button
              className="gv-cta-btn"
              onClick={handlePlayFullscreen}
              id="play-fullscreen-btn"
            >
              <Maximize2 size={16} />
              Play Fullscreen
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
