import { useEffect, useState } from 'react';
import { getGameDetails, getGameScreenshots, getGameSeries } from '../services/rawg';

export default function useGameDetails(id) {
  const [state, setState] = useState({ isLoading: true, error: null, game: null, screenshots: [], related: [] });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true, error: null }));

    Promise.all([
      getGameDetails(id),
      getGameScreenshots(id).catch(() => ({ results: [] })),
      getGameSeries(id).catch(() => ({ results: [] })),
    ])
      .then(([game, screenshotsRes, seriesRes]) => {
        if (cancelled) return;
        setState({
          isLoading: false,
          error: null,
          game,
          screenshots: screenshotsRes.results || [],
          related: seriesRes.results || [],
        });
      })
      .catch((error) => {
        if (!cancelled) setState({ isLoading: false, error, game: null, screenshots: [], related: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
