console.log("Samara JS loaded");
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
 * Samara's KEY            |
 * ========================|
 */
const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

import { movieCardLayOut } from "/src/util.js";
/**
 * Technically, one shared fetch implementation would be enough.
 * However, the goal here is educational, so it helps to
 * understand how API authentication works and how to configure
 * a fetch request independently.
 */

/**
 * ========================|
 * Samara's FETCH          |
 * ========================|
 */
import { BASE_URL } from "/src/api.js";

const url = BASE_URL + "/discover/movie?with_genres=53&sort_by=popularity.desc";
async function fetchMoviesByGenre() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tmdbToken}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        console.log(result.results.length);
        result.results.forEach(movie => {
            console.log(movie.title);
            displayMovies(movie);
        });

    } catch (error) {
        console.error(error.message);
    }
}
fetchMoviesByGenre();
const gridDiv = document.getElementById("thriller-grid");
function displayMovies(movie) {
    const movieGrid = movieCardLayOut(movie);
    movieGrid.addEventListener("click", () => {
        saveToStorage(movie);
    });

    movieGrid.className = "bg-gray-900 rounded-lg overflow-hidden shadow";
    const movieImg = document.createElement("img");
    movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w500" + movie.poster_path);
    gridDiv.appendChild(movieGrid);
    movieGrid.appendChild(movieImg);
}

/**
 * ========================|
 * Samara's LocalStorage   |
 * ========================|
 */
function saveToStorage(movie) {
    const stored = localStorage.getItem("savedMovies");
    const arr = stored === null ? [] : JSON.parse(stored);
    const alreadySaved = arr.some(m => m.id === movie.id);
    if (!alreadySaved) {
        arr.push(movie);
        localStorage.setItem("savedMovies", JSON.stringify(arr));
    }

}