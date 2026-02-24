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