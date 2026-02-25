/**
 * ================================================
 *  API Authentication
 * ================================================
 *
 * Each team member should configure their own API authentication
 * inside this file using their personal TMDB API key.
 *
 */

import { BASE_URL } from "./api";
import { movieCardLayOut } from "./util";
const ADVENTURE_ID = 12;
const url = `${BASE_URL}/discover/movie?with_genres=${ADVENTURE_ID}&sort_by=popularity.desc`;
/**
 * ========================|
 * Nil's KEY               |
 * ========================|
 */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

/**
 * ========================|
 * Nil's FETCH             |
 * ========================|
 */

const fetchAdventure = async () => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const movies = await res.json();

    movieCardLayOut(movies.results, "adventureGrid");
  } catch (error) {
    console.log(error);
  }
};

fetchAdventure();

/**
 * ========================|
 * Nil's LocalStorage      |
 * ========================|
 */
