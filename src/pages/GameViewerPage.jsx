import React, { useState, useCallback } from 'react';
import { viewerGames } from '../utils/viewerGames';
import HeroSection from '../components/gameviewer/HeroSection';
import RecommendedGames from '../components/gameviewer/RecommendedGames';
import GameDetails from '../components/gameviewer/GameDetails';
import MoreLikeThis from '../components/gameviewer/MoreLikeThis';
import CommentsSection from '../components/gameviewer/CommentsSection';
import './GameViewerPage.css';

const GameViewerPage = () => {
  const [activeGame, setActiveGame] = useState(viewerGames[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelectGame = useCallback((game) => {
    if (game.id === activeGame?.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveGame(game);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }, [activeGame]);

  return (
    <div className="gv-page">
      <HeroSection game={activeGame} isTransitioning={isTransitioning} />

      <div className="gv-content">
        <RecommendedGames
          games={viewerGames}
          activeGame={activeGame}
          onSelect={handleSelectGame}
        />
        <GameDetails game={activeGame} />
        <MoreLikeThis
          games={viewerGames}
          activeGame={activeGame}
          onSelect={handleSelectGame}
        />
        <CommentsSection game={activeGame} />
      </div>
    </div>
  );
};

export default GameViewerPage;
