import { useEffect, useState } from 'react';
import { searchGames } from '../services/rawg';

// Debounces the query, then hits RAWG. Returns isLoading only once a
// search has actually been fired (an empty query returns idle empty state
// rather than a loading spinner).
export default function useSearch(query, { page = 1, pageSize = 20 } = {}) {
  const [state, setState] = useState({ isLoading: false, error: null, data: null });

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setState({ isLoading: false, error: null, data: null });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true, error: null }));

    const timeout = setTimeout(() => {
      searchGames(trimmed, { page, page_size: pageSize })
        .then((data) => {
          if (!cancelled) setState({ isLoading: false, error: null, data });
        })
        .catch((error) => {
          if (!cancelled) setState({ isLoading: false, error, data: null });
        });
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query, page, pageSize]);

  return state;
}
