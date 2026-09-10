import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Search } from 'lucide-react';
import SearchBar from './SearchBar';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/genres', label: 'Genres' },
];

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const submitSearch = (q) => {
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <Gamepad2 size={22} />
          <span>GamesHeaven</span>
        </Link>

        <nav className="navbar-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>

        <div className="navbar-search-desktop">
          <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} />
        </div>

        <button
          className="navbar-search-toggle"
          aria-label="Toggle search"
          onClick={() => setSearchOpen((v) => !v)}
        >
          <Search size={20} />
        </button>
      </div>

      {searchOpen && (
        <div className="navbar-search-mobile container">
          <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} autoFocus />
        </div>
      )}
    </header>
  );
}
