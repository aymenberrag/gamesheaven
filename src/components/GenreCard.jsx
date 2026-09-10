import { Link } from 'react-router-dom';
import './GenreCard.css';

export default function GenreCard({ genre }) {
  return (
    <Link to={`/genre/${genre.slug}`} className="genre-card">
      {genre.image_background && <img src={genre.image_background} alt="" loading="lazy" />}
      <div className="genre-card-overlay" />
      <div className="genre-card-body">
        <h3>{genre.name}</h3>
        {genre.games_count != null && <span>{genre.games_count.toLocaleString()} games</span>}
      </div>
    </Link>
  );
}
