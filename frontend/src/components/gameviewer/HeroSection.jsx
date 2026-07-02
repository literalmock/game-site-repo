import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Eye, Maximize2, Play, Star, Volume2, VolumeX } from '../ui/Icons';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../context/useAuth';

const PLAYTIME_HEARTBEAT_MS = 30000;

const HeroSection = ({ game }) => {
  const { isAuthenticated } = useAuth();
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionPoints, setSessionPoints] = useState(0);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const lastHeartbeatAtRef = useRef(Date.now());

  useEffect(() => {
    setIsLoaded(false);
    setSessionPoints(0);
    lastHeartbeatAtRef.current = Date.now();
  }, [game?.id]);

  useEffect(() => {
    if (!game?.id || !isLoaded || !isAuthenticated) {
      return undefined;
    }

    lastHeartbeatAtRef.current = Date.now();

    const recordHeartbeat = async () => {
      if (document.visibilityState !== 'visible') {
        lastHeartbeatAtRef.current = Date.now();
        return;
      }

      const now = Date.now();
      const elapsedSeconds = Math.floor((now - lastHeartbeatAtRef.current) / 1000);
      lastHeartbeatAtRef.current = now;

      if (elapsedSeconds <= 0) return;

      try {
        const data = await apiRequest(`/games/${game.id}/playtime`, {
          method: 'POST',
          body: JSON.stringify({ seconds: elapsedSeconds }),
        });

        setSessionPoints((currentPoints) => currentPoints + (Number(data.earnedPoints) || 0));
      } catch {
        // Playtime tracking should never interrupt the game experience.
      }
    };

    const heartbeatId = window.setInterval(recordHeartbeat, PLAYTIME_HEARTBEAT_MS);

    return () => window.clearInterval(heartbeatId);
  }, [game?.id, isAuthenticated, isLoaded]);

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

      <div className="gv-hero-inner">
        {/* Glass iframe card */}
        <div
          key={game.id}
          className="gv-iframe-card gv-fade-in"
          ref={containerRef}
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
              src={`${game.iframeUrl}?gd_sdk_referrer_url=https://game-site-repo.vercel.app`}
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
              <span>{isAuthenticated ? `Now Playing · +${sessionPoints} pts` : 'Now Playing'}</span>
            </div>
        </div>

        {/* Game info */}
        <div
          key={`info-${game.id}`}
          className="gv-hero-info gv-fade-up"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
