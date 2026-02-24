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
 * Patrick's KEY           |
 * ========================|
*/

export const apiKey = "667aceb5e5357a883579caa776dba165";
export const SCIFI_GENRE_ID = 878;


/**
 * Technically, one shared fetch implementation would be enough.
 * However, the goal here is educational, so it helps to
 * understand how API authentication works and how to configure
 * a fetch request independently.
 */

/**
 * ========================|
 * Patrick's FETCH         |
 * ========================|
 */

async function fetchPopularScifi() {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${SCIFI_GENRE_ID}&sort_by=popularity.desc`);
    const data = await res.json();
    renderScifiMovies(data.results);
}

function renderScifiMovies(movies) {
    const grid = document.getElementById('scifi-grid');
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg overflow-hidden';
        card.innerHTML =
        `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full"/>
      <div class="p-2">
        <h3 class="font-semibold text-sm">${movie.title}</h3>
      </div>`;

        const favBtn = document.createElement('button');
        favBtn.textContent = '⭐️ Add to Favorites';
        favBtn.className = 'mt-2 bg-red-600 px-2 py-1 rounded text-xs';
        favBtn.onclick = () => {
          saveToFavorites(movie);
        };

        card.appendChild(favBtn);
        grid.appendChild(card);
    });
}

// fetchPopularScifi is now called once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    fetchPopularScifi();
});

/**
 * ========================|
 * Patrick's LocalStorage  |
 * ========================|
 */
function saveToFavorites(movie) {
  // 1. Get existing Patrick favorites or an empty array if none exist
  const favorites = JSON.parse(localStorage.getItem('favedMovies')) || [];

  // 2. Check if movie is already favorited to avoid duplicates
  const isDuplicate = favorites.some(fav => fav.id === movie.id);

  if (!isDuplicate) {
    favorites.push(movie);

    localStorage.setItem('favedMovies', JSON.stringify(favorites));

    // #region agent log
    fetch('http://127.0.0.1:7574/ingest/219a1909-8e2c-4afd-8b1c-b380b065ac1b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': '6e5397'
      },
      body: JSON.stringify({
        sessionId: '6e5397',
        runId: 'initial',
        hypothesisId: 'H_PATRICK_SEPARATION',
        location: 'patrick.js:saveToFavorites',
        message: 'Patrick favorites updated in favedMovies',
        data: {
          newLength: favorites.length
        },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion

    alert(`${movie.title} added to journal!`);
  
  } else {
    alert("Already in your journal");
  }
}
