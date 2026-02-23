import { fetchComedyMovies } from "./martin.js";

// Entry point for homepage startup logic.
async function init() {
  try {
    const comedyMovies = await fetchComedyMovies();

    // Temporary debug logs while wiring up the TMDB fetch.
    // Replace/remove these when we render cards.
    console.log("Comedy movies fetched", comedyMovies.length);
    console.log(comedyMovies[0]);
  } catch (error) {
    // Show fetch/auth errors clearly in DevTools during development.
    console.error(`Failed to fetch comedy movies: ${error.message}`);
  }
}
// Call the startup function when the page loads.
init();
