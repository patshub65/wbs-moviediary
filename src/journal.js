import { movieCardLayOut } from "/src/util.js";
import { IMG } from "/src/samara.js";
/* Thriller movies in journal */
console.log("journal loaded");
const movieContainer = document.getElementById("journal-grid");
console.log(movieContainer);

const stored = localStorage.getItem("savedMovies");
const movies = stored ? JSON.parse(stored) : [];
console.log("movies length:", movies.length);
movies.forEach(movie => {
    const card = movieCardLayOut(movie);
    card.className =
        "bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg p-3 hover:scale-105 transition-transform duration-200";
    const img = document.createElement("img");
    img.src = IMG + movie.poster_path;
    img.alt = movie.title;
    img.className = "w-full rounded";
    

    const overview = document.createElement("p");
    overview.className = "mt-2 text-sm text-gray-200";
    overview.textContent = movie.overview;
    card.appendChild(img);
    card.appendChild(overview);
    movieContainer.appendChild(card);
});
console.log(movies);

// Patrick's Journal

function displayJournal() {
    const container = document.getElementById('journal-grid');
    if (!container) {
        console.log('journal-grid not found');
        return;
    }
    // Retrieve the array of objects from LocalStorage 
    const favorites = JSON.parse(localStorage.getItem('favedMovies')) || [];

    if (favorites.length === 0) {
        container.innerHTML = "<p class='text-white'>Your diary is empty!</p>";
        return;
    }


    favorites.forEach(movie => {
        const card = document.createElement('div');
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <textarea id="note-${movie.id}" placeholder="Add a review...">${movie.notes || ''}</textarea>
            <button 
                onclick="saveNote(${movie.id})" 
                class="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded shadow transition-colors duration-150">
                Save Note
            </button>
        `;
        container.appendChild(card);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    displayJournal();
});

function saveNote(id) {
    const textarea = document.getElementById(`note-${id}`);
    if (!textarea) return;

    const favorites = JSON.parse(localStorage.getItem('favedMovies')) || [];
    const updated = favorites.map(movie =>
        movie.id === id ? { ...movie, notes: textarea.value } : movie
    );
    localStorage.setItem('favedMovies', JSON.stringify(updated));
}

// Expose for inline onclick handler in journal.html
window.saveNote = saveNote;