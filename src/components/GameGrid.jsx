import GameCard from './GameCard';
import './GameGrid.css';

export default function GameGrid({ games }) {
  return (
    <div className="game-grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
