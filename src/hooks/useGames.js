import { useEffect, useState } from 'react';
import { getGames } from '../services/rawg';

// Fetches a list of games for a given RAWG query. `params` should be a
// stable object reference (memoize with useMemo in the caller) since it's
// used as an effect dependency via JSON.stringify.
export default function useGames(params = {}) {
  const [state, setState] = useState({ isLoading: true, error: null, data: null });
  const key = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true, error: null }));

    getGames(params)
      .then((data) => {
        if (!cancelled) setState({ isLoading: false, error: null, data });
      })
      .catch((error) => {
        if (!cancelled) setState({ isLoading: false, error, data: null });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
