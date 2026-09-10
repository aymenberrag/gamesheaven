import { useEffect, useState } from 'react';
import { getGenres } from '../services/rawg';

export default function useGamesGenres() {
  const [state, setState] = useState({ isLoading: true, error: null, data: [] });
  useEffect(() => {
    let cancelled = false;
    getGenres({ page_size: 40 })
      .then((res) => !cancelled && setState({ isLoading: false, error: null, data: res.results }))
      .catch((error) => !cancelled && setState({ isLoading: false, error, data: [] }));
    return () => { cancelled = true; };
  }, []);
  return state;
}
