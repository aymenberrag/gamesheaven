import { useEffect, useMemo, useState } from 'react';
import HeroGame from '../components/HeroGame';
import GameCarousel from '../components/GameCarousel';
import GenreCard from '../components/GenreCard';
import SectionHeader from '../components/SectionHeader';
import { getGenres, FEATURED_GENRE_SLUGS } from '../services/rawg';
import './Home.css';

function useDateRanges() {
  return useMemo(() => {
    const today = new Date();
    const iso = (d) => d.toISOString().slice(0, 10);
    const in90 = new Date(today);
    in90.setDate(in90.getDate() + 90);
    const ago90 = new Date(today);
    ago90.setDate(ago90.getDate() - 90);
    return {
      recent: `${iso(ago90)},${iso(today)}`,
      upcoming: `${iso(today)},${iso(in90)}`,
    };
  }, []);
}

// Fetches RAWG genres once, then filters to our curated slug list while
// preserving each genre's real metadata (image, game count).
function useFeaturedGenres() {
  const [state, setState] = useState({ isLoading: true, error: null, data: null });
  useEffect(() => {
    let cancelled = false;
    getGenres({ page_size: 40 })
      .then((res) => {
        if (cancelled) return;
        const bySlug = new Map(res.results.map((g) => [g.slug, g]));
        const ordered = FEATURED_GENRE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
        setState({ isLoading: false, error: null, data: ordered });
      })
      .catch((error) => !cancelled && setState({ isLoading: false, error, data: null }));
    return () => { cancelled = true; };
  }, []);
  return state;
}

function FeaturedGenreGrid() {
  const { isLoading, error, data } = useFeaturedGenres();
  if (error) return null;
  const genres = data || [];
  return (
    <div className="home-genre-grid">
      {(isLoading ? Array.from({ length: 8 }) : genres).map((genre, i) =>
        isLoading ? (
          <div className="skeleton home-genre-skeleton" key={i} />
        ) : (
          <GenreCard key={genre.id} genre={genre} />
        )
      )}
    </div>
  );
}

export default function Home() {
  const { recent, upcoming } = useDateRanges();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="page-fade">
      <HeroGame />

      <GameCarousel
        title="Trending now"
        subtitle="What everyone's playing right now"
        params={{ ordering: '-added', page_size: 14 }}
        seeAllTo="/explore"
      />

      <GameCarousel
        title="Recently released"
        subtitle="Fresh off the shelf"
        params={{ dates: recent, ordering: '-released', page_size: 14 }}
        seeAllTo="/explore?sort=-released"
      />

      <GameCarousel
        title="Coming soon"
        subtitle="Worth putting on your radar"
        params={{ dates: upcoming, ordering: 'released', page_size: 14 }}
        seeAllTo="/explore?sort=released"
      />

      <GameCarousel
        title="Top rated"
        subtitle="The best of the best, according to players"
        params={{ ordering: '-rating', page_size: 14, dates: `2015-01-01,${today}` }}
        seeAllTo="/explore?sort=-rating"
      />

      <section className="container home-genres">
        <SectionHeader title="Browse by genre" subtitle="Find your next favorite by mood" to="/genres" />
        <FeaturedGenreGrid />
      </section>
    </div>
  );
}
