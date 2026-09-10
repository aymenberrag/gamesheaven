import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import Rating from './Rating';
import './GameCard.css';

const PLATFORM_LABELS = {
  pc: 'PC',
  playstation: 'PlayStation',
  xbox: 'Xbox',
  nintendo: 'Nintendo',
  ios: 'iOS',
  android: 'Android',
  mac: 'Mac',
  linux: 'Linux',
};

function releaseYear(dateStr) {
  if (!dateStr) return 'TBA';
  return dateStr.slice(0, 4);
}

export default function GameCard({ game }) {
  const platforms = (game.parent_platforms || [])
    .map((p) => PLATFORM_LABELS[p.platform.slug] || p.platform.name)
    .slice(0, 3);
  const genre = game.genres?.[0]?.name;
  const image = game.background_image;

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-card-art">
        {image ? (
          <img src={image} alt={game.name} loading="lazy" />
        ) : (
          <div className="game-card-fallback">
            <Gamepad2 size={32} />
          </div>
        )}
        <div className="game-card-overlay">
          <span className="btn btn-primary game-card-cta">View game</span>
        </div>
        <Rating value={game.rating} />
      </div>
      <div className="game-card-info">
        <h3 className="game-card-title" title={game.name}>{game.name}</h3>
        <div className="game-card-meta">
          <span>{releaseYear(game.released)}</span>
          {genre && <span className="dot" />}
          {genre && <span>{genre}</span>}
        </div>
        {platforms.length > 0 && (
          <div className="game-card-platforms">{platforms.join(' · ')}</div>
        )}
      </div>
    </Link>
  );
}
