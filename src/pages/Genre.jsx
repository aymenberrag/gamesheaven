import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import GameGrid from '../components/GameGrid';
import FilterBar from '../components/FilterBar';
import { GameGridSkeleton } from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import useGames from '../hooks/useGames';
import { getGenreDetails } from '../services/rawg';
import './Genre.css';

const PAGE_SIZE = 24;

export default function Genre() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '-added';

  const [genreInfo, setGenreInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setGenreInfo(null);
    getGenreDetails(slug).then((g) => !cancelled && setGenreInfo(g)).catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  const params = useMemo(
    () => ({ genres: slug, ordering: sort, page, page_size: PAGE_SIZE }),
    [slug, sort, page]
  );
  const { isLoading, error, data } = useGames(params);

  useEffect(() => {
    setPage(1);
    setAllResults([]);
  }, [slug, sort]);

  useEffect(() => {
    if (data?.results) {
      setAllResults((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
    }
  }, [data, page]);

  const hasMore = Boolean(data?.next);

  return (
    <div className="container page-fade genre-page">
      <h1 className="genre-page-title">{genreInfo?.name || slug.replace(/-/g, ' ')}</h1>
      {genreInfo?.description && (
        <p
          className="genre-page-desc"
          dangerouslySetInnerHTML={{ __html: genreInfo.description.split('</p>')[0] + '</p>' }}
        />
      )}

      <FilterBar
        sort={sort}
        onSortChange={(v) => setSearchParams((prev) => { prev.set('sort', v); return prev; })}
        showPlatform={false}
      />

      {error && allResults.length === 0 ? (
        <ErrorState error={error} />
      ) : isLoading && allResults.length === 0 ? (
        <GameGridSkeleton count={PAGE_SIZE} />
      ) : allResults.length === 0 ? (
        <EmptyState message="No games found for this genre." />
      ) : (
        <>
          <GameGrid games={allResults} />
          <div className="genre-page-load-more">
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
