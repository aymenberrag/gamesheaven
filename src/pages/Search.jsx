import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import GameGrid from '../components/GameGrid';
import { GameGridSkeleton } from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import useSearch from '../hooks/useSearch';
import { SearchX } from 'lucide-react';
import './Search.css';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { isLoading, error, data } = useSearch(query, { pageSize: 24 });

  const handleChange = (value) => {
    setQuery(value);
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <div className="container page-fade search-page">
      <h1 className="search-title">Search games</h1>
      <div className="search-page-bar">
        <SearchBar value={query} onChange={handleChange} onSubmit={handleChange} autoFocus placeholder="Try “elden ring”, “zelda”, “rpg”…" />
      </div>

      {!query.trim() ? (
        <div className="empty-state">
          <SearchX size={28} />
          <p>Start typing to search RAWG's catalog of games.</p>
        </div>
      ) : error ? (
        <ErrorState error={error} />
      ) : isLoading ? (
        <GameGridSkeleton count={12} />
      ) : !data?.results?.length ? (
        <EmptyState message={`No results for "${query}".`} />
      ) : (
        <>
          <p className="search-count">{data.count.toLocaleString()} results</p>
          <GameGrid games={data.results} />
        </>
      )}
    </div>
  );
}
