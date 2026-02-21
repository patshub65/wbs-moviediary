/**
 * ================================================
 *  API Authentication
 * ================================================
 *
 * Each team member should configure their own API authentication
 * inside this file using their personal TMDB API key.
 *
 */

/**
 * ========================|
 * Nil's KEY               |
 * ========================|
 */
const nilKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTVmY2MxYzYyNTU3NjY1MzI0MDQzYzg0YjJiNTZjNiIsIm5iZiI6MTc3MTU5MTY0OS44ODUsInN1YiI6IjY5OTg1N2UxZDZiZTg4YjliODEzYmU2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5IPpNKV4ic4xFpDZWfRu8AKfCZvDczxKkcNWMqRsXRw";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${key}`,
  },
};

/**
 * ========================|
 * Nil's FETCH             |
 * ========================|
 */

/**
 * ========================|
 * Nil's LocalStorage      |
 * ========================|
 */
