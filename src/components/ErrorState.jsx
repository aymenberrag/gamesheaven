import { AlertTriangle, KeyRound, WifiOff } from 'lucide-react';
import './ErrorState.css';

const ICONS = {
  'missing-key': KeyRound,
  network: WifiOff,
  'not-found': AlertTriangle,
  api: AlertTriangle,
};

const MESSAGES = {
  'missing-key': 'RAWG API key missing or invalid. Add a valid VITE_RAWG_API_KEY to your .env file.',
  network: "Couldn't reach RAWG. Check your connection and try again.",
  'not-found': "This couldn't be found.",
  api: 'Something went wrong talking to RAWG.',
};

export default function ErrorState({ error, onRetry }) {
  const kind = error?.kind || 'api';
  const Icon = ICONS[kind] || AlertTriangle;
  const message = error?.message || MESSAGES[kind];

  return (
    <div className="error-state">
      <Icon size={28} />
      <p>{message}</p>
      {onRetry && kind !== 'missing-key' && (
        <button className="btn btn-ghost" onClick={onRetry}>Try again</button>
      )}
    </div>
  );
}
