import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import useGames from '../hooks/useGames';
import { HeroSkeleton } from './LoadingSkeleton';
import ErrorState from './ErrorState';
import Rating from './Rating';
import './HeroGame.css';

// Pull a small pool of highly-rated recent-ish games and feature the first
// one with solid artwork — gives a "curated pick" feel without inventing data.
export default function HeroGame() {
  const { isLoading, error, data } = useGames({
    ordering: '-added',
    dates: `${new Date().getFullYear() - 1}-01-01,${new Date().toISOString().slice(0, 10)}`,
    page_size: 8,
  });

  if (isLoading) return <HeroSkeleton />;
  if (error) {
    return (
      <div className="container">
        <ErrorState error={error} />
      </div>
    );
  }

  const game = (data?.results || []).find((g) => g.background_image) || data?.results?.[0];
  if (!game) return null;

  const genre = game.genres?.[0]?.name;
  const year = game.released?.slice(0, 4);

  return (
    <section className="hero">
      <div className="hero-media">
        <img src={game.background_image} alt="" aria-hidden="true" />
      </div>
      <div className="container hero-content">
        <div className="hero-tags">
          {genre && <span className="pill">{genre}</span>}
          {year && <span className="pill">{year}</span>}
          <Rating value={game.rating} />
        </div>
        <h1 className="hero-title">{game.name}</h1>
        {game.description_raw && (
          <p className="hero-desc">{game.description_raw.slice(0, 180).trim()}…</p>
        )}
        <div className="hero-actions">
          <Link to={`/game/${game.id}`} className="btn btn-primary">
            <Play size={16} fill="currentColor" /> View game
          </Link>
          <Link to={`/game/${game.id}`} className="btn btn-ghost">
            <Info size={16} /> More info
          </Link>
        </div>
      </div>
    </section>
  );
}
