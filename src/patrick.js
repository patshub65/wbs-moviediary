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

const apiKey = "667aceb5e5357a883579caa776dba165";
const SCIFI_GENRE_ID = 878;


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
    const favBtn = document.createElement('button');
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg overflow-hidden';
        card.innerHTML =
        `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full"/>
      <div class="p-2">
        <h3 class="font-semibold text-sm">${movie.title}</h3>
      </div>`;
      grid.appendChild(card);
        
    });
    favBtn.textContent = '⭐️ Add to Favorites';
    favBtn.className = 'mt-2 bg-red-600 px-2 py-1 rounded text-xs';

    favBtn.onclick = () => {
      saveToFavorites(movie);
    }
    card.appendChild(favBtn);
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
