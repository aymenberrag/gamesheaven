import { NavLink } from 'react-router-dom';
import { Home, Compass, Search, Grid3x3 } from 'lucide-react';
import './MobileNav.css';

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/genres', label: 'Genres', icon: Grid3x3 },
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Primary">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
