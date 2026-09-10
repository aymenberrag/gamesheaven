// Thin, dependency-free RAWG API client.
// Every request goes through `request()` so caching, key handling and
// error normalization live in exactly one place.

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// Simple in-memory GET cache. Keyed by the final URL. Cleared on reload,
// which is fine here — we mainly want to avoid refetching the same
// endpoint multiple times within one session (e.g. re-rendering the
// homepage sections, or navigating back to a page you already viewed).
const cache = new Map();

export class RawgApiError extends Error {
  constructor(message, { status, kind } = {}) {
    super(message);
    this.name = 'RawgApiError';
    this.status = status;
    // kind is one of: 'missing-key' | 'network' | 'not-found' | 'api'
    this.kind = kind || 'api';
  }
}

function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('key', API_KEY || '');
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
}

async function request(path, params = {}, { useCache = true } = {}) {
  if (!API_KEY) {
    throw new RawgApiError(
      'Missing RAWG API key. Add VITE_RAWG_API_KEY to your .env file.',
      { kind: 'missing-key' }
    );
  }

  const url = buildUrl(path, params);

  if (useCache && cache.has(url)) {
    return cache.get(url);
  }

  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new RawgApiError('Could not reach RAWG. Check your connection.', { kind: 'network' });
  }

  if (!res.ok) {
    if (res.status === 404) {
      throw new RawgApiError('Not found.', { status: 404, kind: 'not-found' });
    }
    if (res.status === 401 || res.status === 403) {
      throw new RawgApiError('RAWG rejected the API key.', { status: res.status, kind: 'missing-key' });
    }
    throw new RawgApiError(`RAWG request failed (${res.status}).`, { status: res.status, kind: 'api' });
  }

  const data = await res.json();
  if (useCache) cache.set(url, data);
  return data;
}

// ---- Public API ---------------------------------------------------------

export function getGames(params = {}) {
  return request('/games', params);
}

export function getGameDetails(id) {
  return request(`/games/${id}`);
}

export function getGameScreenshots(id) {
  return request(`/games/${id}/screenshots`);
}

export function getGameSeries(id) {
  // RAWG's closest match to "related games" for a title.
  return request(`/games/${id}/game-series`);
}

export function searchGames(query, params = {}) {
  if (!query || !query.trim()) return Promise.resolve({ results: [], count: 0 });
  return request('/games', { search: query.trim(), ...params }, { useCache: false });
}

export function getGenres(params = {}) {
  return request('/genres', params);
}

export function getGenreDetails(slug) {
  return request(`/genres/${slug}`);
}

// Curated subset of RAWG genres we actually want to surface in the UI —
// RAWG returns ~19 genres and several are noisy/overlapping for a
// discovery-first homepage.
export const FEATURED_GENRE_SLUGS = [
  'action',
  'adventure',
  'role-playing-games-rpg',
  'strategy',
  'shooter',
  'racing',
  'sports',
  'puzzle',
];
