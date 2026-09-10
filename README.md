# GamesHeaven 2.0

A modern game discovery platform powered by the [RAWG](https://rawg.io) API — built with React, Vite and React Router.

## ⚠️ Security note

An earlier version of this repo had a RAWG API key hardcoded in `src/hooks/useFetch.js` and committed in a plaintext `.env` file. Both are public in this repo's git history. **Rotate that key on RAWG's site** — this rebuild never reads it and stores your key only in a local, git-ignored `.env`.

## Stack

- React 19 + Vite
- React Router v6
- Plain CSS with a small design-token system (`src/index.css`) — no UI framework
- [lucide-react](https://lucide.dev) for icons
- RAWG API as the sole data source (no mocked/fake game data)

## Getting started

```bash
npm install
cp .env.example .env
# edit .env and add your key from https://rawg.io/apidocs
npm run dev
```

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/   # GameCard, GameGrid, GameCarousel, HeroGame, Navbar, MobileNav,
                # SearchBar, FilterBar, GenreCard, ScreenshotGallery, Rating,
                # LoadingSkeleton, ErrorState, EmptyState, SectionHeader
  pages/        # Home, Explore, Search, Genres, Genre, GameDetails, NotFound
  hooks/        # useGames, useGameDetails, useSearch, useGamesGenres
  services/     # rawg.js — the only file that talks to the RAWG API
```

## RAWG integration

All requests go through `src/services/rawg.js`, a thin fetch wrapper that:

- reads the key from `VITE_RAWG_API_KEY` (never hardcoded)
- normalizes errors into a `RawgApiError` with a `kind` of `missing-key`, `network`, `not-found`, or `api`, so every page can render an appropriate error state
- caches GET responses in-memory per session to avoid refetching the same query when a page re-renders or the user navigates back

Endpoints used: `/games`, `/games/:id`, `/games/:id/screenshots`, `/games/:id/game-series` (used as "related games"), `/genres`, `/genres/:slug`.

## Known limitations

- This was built and build-tested without live network access to `api.rawg.io`, so it hasn't been exercised against real RAWG responses yet — verify it end-to-end once you drop in a real key, and watch the browser console for anything RAWG's actual payloads don't match.
- "Related games" uses RAWG's `game-series` endpoint (same-franchise entries), since RAWG has no general-purpose recommendation endpoint — for games with no series entries, that section is simply omitted.
- Platform filter values in `FilterBar` are hand-picked common RAWG platform IDs; double-check against `/platforms/lists/parents` if you want the full set.
- No automated tests included, per the "keep it simple" brief — `npm run build` and manual QA are the current safety net.
