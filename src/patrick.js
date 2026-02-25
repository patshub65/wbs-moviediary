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
    grid.className = 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card overflow-hidden flex-none w-48 shadow-sm';
        card.innerHTML = `
      <figure>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full" />
      </figure>
      <div class="card-body">
        <h3 class="card-title text-sm">${movie.title}</h3>
        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-sm">⭐️</button>
        </div>
      </div>`;

        const favBtn = card.querySelector('button');
        favBtn.className = 'btn btn-primary btn-sm absolute bottom-2 right-2';
        favBtn.style.position = 'absolute';
        favBtn.style.bottom = '0.5rem';
        favBtn.style.right = '0.5rem';
        if (favBtn) {
          favBtn.onclick = () => {
            saveToFavorites(movie);
          };
        }
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
    showDaisyToast(`${movie.title} added to journal!`, 'success');
  
  } else {
    showDaisyToast('Already in your journal', 'info');
  }
}

function showDaisyToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast toast-top toast-end z-50';

  const alertDiv = document.createElement('div');
  const baseAlertClass = 'alert';
  const typeClass =
    type === 'success'
      ? 'alert-success'
      : type === 'error'
      ? 'alert-error'
      : 'alert-info';

  alertDiv.className = `${baseAlertClass} ${typeClass}`;
  alertDiv.innerHTML = `<span>${message}</span>`;

  toast.appendChild(alertDiv);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}
