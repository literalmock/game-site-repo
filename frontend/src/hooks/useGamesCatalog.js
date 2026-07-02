import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

let cachedGames = null;

export const useGamesCatalog = (fallbackGames = []) => {
  const [games, setGames] = useState(() => cachedGames || fallbackGames);
  const [isLoadingGames, setIsLoadingGames] = useState(!cachedGames);
  const [gamesError, setGamesError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadGames = async () => {
      if (cachedGames) {
        setGames(cachedGames);
        setIsLoadingGames(false);
        return;
      }

      setIsLoadingGames(true);
      setGamesError('');

      try {
        const data = await apiRequest('/games?limit=100&sort=source_asc');
        const nextGames = Array.isArray(data.games) ? data.games : [];

        if (!isMounted) return;

        if (nextGames.length > 0) {
          cachedGames = nextGames;
          setGames(nextGames);
        } else {
          setGames(fallbackGames);
        }
      } catch (error) {
        if (!isMounted) return;
        setGames(fallbackGames);
        setGamesError(error.message || 'Unable to load games');
      } finally {
        if (isMounted) {
          setIsLoadingGames(false);
        }
      }
    };

    loadGames();

    return () => {
      isMounted = false;
    };
  }, [fallbackGames]);

  return { games, isLoadingGames, gamesError };
};
