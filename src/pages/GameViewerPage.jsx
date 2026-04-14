import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { viewerGames } from '../utils/viewerGames';
import HeroSection from '../components/gameviewer/HeroSection';
import RecommendedGames from '../components/gameviewer/RecommendedGames';
import GameDetails from '../components/gameviewer/GameDetails';
import MoreLikeThis from '../components/gameviewer/MoreLikeThis';
import CommentsSection from '../components/gameviewer/CommentsSection';
import './GameViewerPage.css';

const GameViewerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const routedGame = location.state?.game;
  const fallbackGame = viewerGames.find((game) => String(game.id) === String(id));
  const initialGame = routedGame && String(routedGame.id) === String(id)
    ? routedGame
    : fallbackGame;

  const [activeGame, setActiveGame] = useState(initialGame || viewerGames[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!initialGame) {
      navigate('/games', { replace: true });
      return;
    }

    setActiveGame(initialGame);
  }, [initialGame, navigate]);

  const handleSelectGame = useCallback((game) => {
    if (game.id === activeGame?.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveGame(game);
      setIsTransitioning(false);
      navigate(`/games/${game.id}`, { replace: true, state: { game } });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }, [activeGame, navigate]);

  if (!initialGame) return null;

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
