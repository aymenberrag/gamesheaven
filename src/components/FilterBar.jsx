import './FilterBar.css';

const SORT_OPTIONS = [
  { value: '-added', label: 'Popularity' },
  { value: '-rating', label: 'Rating' },
  { value: '-released', label: 'Release date' },
  { value: 'name', label: 'Name' },
];

const PLATFORM_OPTIONS = [
  { value: '', label: 'All platforms' },
  { value: '4', label: 'PC' },
  { value: '187,18,16', label: 'PlayStation' },
  { value: '186,1,14', label: 'Xbox' },
  { value: '7', label: 'Nintendo' },
  { value: '3', label: 'iOS' },
  { value: '21', label: 'Android' },
];

export default function FilterBar({ sort, onSortChange, platform, onPlatformChange, showPlatform = true }) {
  return (
    <div className="filter-bar">
      <label className="filter-field">
        <span>Sort by</span>
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      {showPlatform && (
        <label className="filter-field">
          <span>Platform</span>
          <select value={platform} onChange={(e) => onPlatformChange(e.target.value)}>
            {PLATFORM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
