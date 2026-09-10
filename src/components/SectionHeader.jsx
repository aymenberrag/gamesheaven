import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './SectionHeader.css';

export default function SectionHeader({ title, subtitle, to }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="section-header-link">
          See all <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
