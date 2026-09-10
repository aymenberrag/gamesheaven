import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import { GameCardSkeleton } from './LoadingSkeleton';
import ErrorState from './ErrorState';
import SectionHeader from './SectionHeader';
import './GameCarousel.css';

export default function GameCarousel({ title, subtitle, params, seeAllTo }) {
  const { isLoading, error, data } = useGames(params);
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * trackRef.current.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (error) {
    return (
      <section className="carousel-section container">
        <SectionHeader title={title} subtitle={subtitle} to={seeAllTo} />
        <ErrorState error={error} />
      </section>
    );
  }

  const games = data?.results || [];

  return (
    <section className="carousel-section container">
      <SectionHeader title={title} subtitle={subtitle} to={seeAllTo} />
      <div className="carousel-wrap">
        <button
          className="carousel-nav carousel-nav-left"
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollBy(-1)}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="carousel-track" ref={trackRef}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div className="carousel-item" key={i}><GameCardSkeleton /></div>
              ))
            : games.map((game) => (
                <div className="carousel-item" key={game.id}><GameCard game={game} /></div>
              ))}
        </div>
        <button
          className="carousel-nav carousel-nav-right"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollBy(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
