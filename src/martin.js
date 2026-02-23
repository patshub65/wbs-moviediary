/**
 * ================================================
 *  API Authentication
 * ================================================
 *
 * Each team member should configure their own API authentication
 * inside this file using their personal TMDB API key.
 *
 */
const BASE_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_BEARER_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export async function fetchComedyMovies() {
  const url = `${BASE_URL}/discover/movie?with_genres=35&sort_by=popularity.desc&page=1`;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const result = await response.json();
  return result.results ?? [];
}

/**
 * ========================|
 * Martin's KEY            |
 * ========================|
 */

/**
 * Technically, one shared fetch implementation would be enough.
 * However, the goal here is educational, so it helps to
 * understand how API authentication works and how to configure
 * a fetch request independently.
 */

/**
 * ========================|
 * Martin's FETCH          |
 * ========================|
 */

/**
 * ========================|
 * Martin's LocalStorage   |
 * ========================|
 */
