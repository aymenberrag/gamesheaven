import { SearchX } from 'lucide-react';
import './ErrorState.css';

export default function EmptyState({ message = 'No games found. Try a different search or filter.' }) {
  return (
    <div className="empty-state">
      <SearchX size={28} />
      <p>{message}</p>
    </div>
  );
}
