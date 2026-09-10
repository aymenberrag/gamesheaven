import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container not-found page-fade">
      <Ghost size={40} />
      <h1>Lost in the multiverse</h1>
      <p>This page doesn't exist — or hasn't shipped yet.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
