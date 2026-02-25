// Martin's feature file:
// Swedish Comedy -> fetch from TMDB -> render cards -> save to localStorage

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Read my TMDB token from .env through Vite
const token = import.meta.env.VITE_TMDB_BEARER_TOKEN;

// Same localStorage key the team is using for saved movies
const STORAGE_KEY = "savedMovies";

// Reuse fetch options so I don't repeat headers every time
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// 1) Fetch Swedish comedy movies from TMDB
async function fetchComedyMovies() {
  // genre 35 = Comedy
  // original language sv = Swedish
  const url = `${BASE_URL}/discover/movie?with_genres=35&with_original_language=sv&sort_by=popularity.desc&page=1`;

  const response = await fetch(url, options);

  // Stop early if TMDB gives an error status
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const result = await response.json();

  // TMDB movie list comes in result.results
  return result.results || [];
}

// 2) Save one movie to localStorage (skip duplicates)
function saveToFavourites(movie) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const savedMovies = raw ? JSON.parse(raw) : [];

  const alreadySaved = savedMovies.some(
    (savedMovie) => savedMovie.id === movie.id,
  );
  if (alreadySaved) return;

  // Save only what we need for now (+ note for later journal feature)
  savedMovies.push({
    id: movie.id,
    title: movie.title || "",
    poster_path: movie.poster_path || "",
    overview: movie.overview || "",
    release_date: movie.release_date || "",
    note: "",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMovies));
}

// 3) Build one movie card using DOM methods (no innerHTML)
function createMovieCard(movie) {
  const card = document.createElement("article");
  card.className = "bg-white rounded-lg shadow p-3 flex flex-col gap-2";

  const img = document.createElement("img");
  img.className = "w-full aspect-[2/3] object-cover rounded";

  // If TMDB has a poster, use it. Otherwise use a placeholder image.
  img.src = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Poster";

  img.alt = movie.title || "Movie poster";

  const title = document.createElement("h3");
  title.className = "font-semibold text-sm leading-tight";
  title.textContent = movie.title || "No title";

  const info = document.createElement("p");
  info.className = "text-xs text-gray-600";
  info.textContent = movie.release_date || "Release date unknown";

  // FR012: Add to favourites button
  const button = document.createElement("button");
  button.type = "button";
  button.className = "mt-auto bg-gray-900 text-white text-xs px-3 py-2 rounded";
  button.textContent = "Add to favourites";

  button.addEventListener("click", () => {
    saveToFavourites(movie);

    // Simple visual feedback for demo
    button.textContent = "Saved";
    button.disabled = true;
  });

  card.append(img, title, info, button);
  return card;
}

// 4) Render Martin's Swedish Comedy section on index.html
export async function renderSwedishComedy() {
  const comedyGrid = document.getElementById("swedish-comedy-grid");

  // Safe guard: if the grid doesn't exist, stop without crashing
  if (!comedyGrid) return;

  try {
    const comedyMovies = await fetchComedyMovies();

    // Clear old cards before rendering new ones
    comedyGrid.replaceChildren();

    // Render first 8 movies for the section
    for (const movie of comedyMovies.slice(0, 8)) {
      comedyGrid.append(createMovieCard(movie));
    }

    console.log("Swedish comedy movies fetched:", comedyMovies.length);
  } catch (error) {
    console.error("Failed to fetch comedy movies:", error);

    // Simple fallback message in the UI if fetch fails
    comedyGrid.textContent = "Could not load Swedish comedy movies.";
  }
}
