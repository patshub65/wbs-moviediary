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
    card.className = "bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg p-3 hover:scale-105 transition-transform duration-200";
    card.textContent = movie.overview;
    movieContainer.appendChild(card);
    const img = document.createElement("img");
    img.src = IMG + movie.poster_path;
    card.appendChild(img);
});
console.log(movies);

// Patrick's Journal

import { apiKey, IMG_PATH } from "./patrick.js";

document.addEventListener("DOMContentLoaded", () => {
    displayJournal();
});

function displayJournal() {
    const container = document.getElementById('journal-grid');
    // Retrieve the array of objects from LocalStorage (Requirement FR013)
    cosnt favorites = JSON.parse(localStorage.getItem('myMovies')) || [];

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
            <button onclick="saveNote(${movie.id})">Save Note</button> 
        `;
        container.appendChild(card);
    })
}