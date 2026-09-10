import useGamesGenres from '../hooks/useGamesGenres';
import GenreCard from '../components/GenreCard';
import ErrorState from '../components/ErrorState';
import './Genres.css';

export default function Genres() {
  const { isLoading, error, data } = useGamesGenres();

  return (
    <div className="container page-fade genres-page">
      <h1 className="genres-title">Genres</h1>
      <p className="genres-subtitle">Browse the full RAWG catalog by genre.</p>

      {error ? (
        <ErrorState error={error} />
      ) : (
        <div className="genres-grid">
          {(isLoading ? Array.from({ length: 12 }) : data).map((genre, i) =>
            isLoading ? (
              <div className="skeleton genres-skeleton" key={i} />
            ) : (
              <GenreCard key={genre.id} genre={genre} />
            )
          )}
        </div>
      )}
    </div>
  );
}
