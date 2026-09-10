import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GameGrid from '../components/GameGrid';
import FilterBar from '../components/FilterBar';
import { GameGridSkeleton } from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import useGames from '../hooks/useGames';
import './Explore.css';

const PAGE_SIZE = 24;

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '-added';
  const platform = searchParams.get('platform') || '';

  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);

  const params = useMemo(
    () => ({ ordering: sort, platforms: platform || undefined, page, page_size: PAGE_SIZE }),
    [sort, platform, page]
  );

  const { isLoading, error, data } = useGames(params);

  // Reset accumulated results whenever the filters change (not the page).
  useEffect(() => {
    setPage(1);
    setAllResults([]);
  }, [sort, platform]);

  useEffect(() => {
    if (data?.results) {
      setAllResults((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
    }
  }, [data, page]);

  const hasMore = Boolean(data?.next);

  return (
    <div className="container page-fade explore-page">
      <h1 className="explore-title">Explore games</h1>
      <FilterBar
        sort={sort}
        onSortChange={(v) => setSearchParams((prev) => { prev.set('sort', v); return prev; })}
        platform={platform}
        onPlatformChange={(v) => setSearchParams((prev) => {
          if (v) prev.set('platform', v); else prev.delete('platform');
          return prev;
        })}
      />

      {error && allResults.length === 0 ? (
        <ErrorState error={error} />
      ) : isLoading && allResults.length === 0 ? (
        <GameGridSkeleton count={PAGE_SIZE} />
      ) : allResults.length === 0 ? (
        <EmptyState message="No games matched these filters." />
      ) : (
        <>
          <GameGrid games={allResults} />
          <div className="explore-load-more">
            {hasMore && (
              <button className="btn btn-ghost" disabled={isLoading} onClick={() => setPage((p) => p + 1)}>
                {isLoading ? 'Loading…' : 'Load more'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
