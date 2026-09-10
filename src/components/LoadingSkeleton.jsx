import './LoadingSkeleton.css';

export function GameCardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="skeleton card-skeleton-art" />
      <div className="skeleton card-skeleton-line" style={{ width: '80%' }} />
      <div className="skeleton card-skeleton-line" style={{ width: '45%' }} />
    </div>
  );
}

export function GameGridSkeleton({ count = 8 }) {
  return (
    <div className="game-grid">
      {Array.from({ length: count }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return <div className="skeleton hero-skeleton" />;
}

export function GameDetailsSkeleton() {
  return (
    <div className="details-skeleton">
      <div className="skeleton details-skeleton-hero" />
      <div className="container details-skeleton-body">
        <div className="skeleton" style={{ height: 20, width: '30%' }} />
        <div className="skeleton" style={{ height: 14, width: '90%' }} />
        <div className="skeleton" style={{ height: 14, width: '70%' }} />
      </div>
    </div>
  );
}
