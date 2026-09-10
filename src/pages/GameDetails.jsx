import { useParams } from 'react-router-dom';
import { Star, Calendar, Building2, Rocket, MonitorPlay, ExternalLink } from 'lucide-react';
import useGameDetails from '../hooks/useGameDetails';
import { GameDetailsSkeleton } from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import ScreenshotGallery from '../components/ScreenshotGallery';
import GameGrid from '../components/GameGrid';
import SectionHeader from '../components/SectionHeader';
import './GameDetails.css';

function formatDate(dateStr) {
  if (!dateStr) return 'TBA';
  return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function GameDetails() {
  const { id } = useParams();
  const { isLoading, error, game, screenshots, related } = useGameDetails(id);

  if (isLoading) return <GameDetailsSkeleton />;
  if (error) return <div className="container" style={{ paddingTop: 40 }}><ErrorState error={error} /></div>;
  if (!game) return null;

  const developers = game.developers?.map((d) => d.name).join(', ');
  const publishers = game.publishers?.map((p) => p.name).join(', ');
  const platforms = game.platforms?.map((p) => p.platform.name).join(', ');
  const stores = game.stores || [];

  return (
    <div className="page-fade game-details">
      <section className="gd-hero">
        {game.background_image && <img src={game.background_image} alt="" aria-hidden="true" />}
        <div className="gd-hero-scrim" />
        <div className="container gd-hero-content">
          <div className="gd-hero-tags">
            {game.genres?.slice(0, 3).map((g) => <span className="pill" key={g.id}>{g.name}</span>)}
          </div>
          <h1>{game.name}</h1>
          <div className="gd-hero-stats">
            {game.rating > 0 && (
              <span className="gd-stat"><Star size={16} fill="var(--color-accent-2)" stroke="var(--color-accent-2)" /> {game.rating.toFixed(1)} / 5</span>
            )}
            <span className="gd-stat"><Calendar size={16} /> {formatDate(game.released)}</span>
            {platforms && <span className="gd-stat"><MonitorPlay size={16} /> {platforms}</span>}
          </div>
        </div>
      </section>

      <div className="container gd-body">
        <div className="gd-main">
          {game.description_raw && (
            <section className="gd-section">
              <h2>About</h2>
              <p className="gd-description">{game.description_raw}</p>
            </section>
          )}

          {screenshots.length > 0 && (
            <section className="gd-section">
              <h2>Screenshots</h2>
              <ScreenshotGallery screenshots={screenshots} />
            </section>
          )}

          {related.length > 0 && (
            <section className="gd-section">
              <SectionHeader title="Related games" />
              <GameGrid games={related.slice(0, 8)} />
            </section>
          )}
        </div>

        <aside className="gd-sidebar">
          <div className="gd-info-card">
            {developers && (
              <div className="gd-info-row">
                <Building2 size={16} />
                <div><span>Developer</span><p>{developers}</p></div>
              </div>
            )}
            {publishers && (
              <div className="gd-info-row">
                <Rocket size={16} />
                <div><span>Publisher</span><p>{publishers}</p></div>
              </div>
            )}
            <div className="gd-info-row">
              <Calendar size={16} />
              <div><span>Release date</span><p>{formatDate(game.released)}</p></div>
            </div>
            {platforms && (
              <div className="gd-info-row">
                <MonitorPlay size={16} />
                <div><span>Platforms</span><p>{platforms}</p></div>
              </div>
            )}
          </div>

          {stores.length > 0 && (
            <div className="gd-info-card">
              <h3 className="gd-stores-title">Where to buy</h3>
              <ul className="gd-stores-list">
                {stores.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url || `https://${s.store.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.store.name} <ExternalLink size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
