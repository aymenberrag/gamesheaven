import { Star } from 'lucide-react';

export default function Rating({ value }) {
  if (!value) return null;
  return (
    <span className="pill rating-pill">
      <Star size={13} fill="var(--color-accent-2)" stroke="var(--color-accent-2)" />
      {value.toFixed(1)}
    </span>
  );
}
