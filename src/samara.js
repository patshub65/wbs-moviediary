/**
 * ================================================
 *  API Authentication
 * ================================================
 *
 * Each team member should configure their own API authentication
 * inside this file using their personal TMDB API key.
 *
 */
import { movieCardLayOut } from "/src/util.js";
import { BASE_URL } from "/src/api.js";
/**
 * ========================|
 * Samara's KEY            |
 * ========================|
 */
const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
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

export const IMG = "https://image.tmdb.org/t/p/w500";
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
document.addEventListener("DOMContentLoaded", () => {
    const gridDiv = document.getElementById("thriller-grid");
    if (!gridDiv) {
        console.warn("thriller-grid not found");
        return;
    }
    fetchMoviesByGenre();
});

function displayMovies(movie) {
    const movieGrid = movieCardLayOut(movie);
    movieGrid.classList.add(
        "group",              // needed for group-hover
        "relative",
        "bg-gray-900",
        "rounded-lg",
        "overflow-hidden",
        "shadow-lg",
        "p-3",
        "hover:scale-105",
        "transition-transform",
        "duration-200"
    );

    //img
    const movieImg = document.createElement("img");
    movieImg.setAttribute("src", IMG + movie.poster_path);
    movieImg.alt = movie.title;
    movieImg.classList.add(
        "w-full",
        "rounded",
        "transition",
        "duration-300",
        "group-hover:brightness-50"
    );

    // Journal Button (hidden by default)
    const journalBtn = document.createElement("button");
    journalBtn.textContent = "+ journal";

    journalBtn.classList.add(
        "absolute",
        "bottom-4",
        "left-1/2",
        "-translate-x-1/2",
        "bg-red-600",
        "hover:bg-red-900",
        "text-white",
        "px-4",
        "py-2",
        "rounded",
        "opacity-0",
        "transition-opacity",
        "duration-300",
        "group-hover:opacity-100",
        "cursor-pointer"

    );

    journalBtn.addEventListener("click", (e) => {
        saveToStorage(movie);
    })
    //Append children
    movieGrid.appendChild(movieImg);
    movieGrid.appendChild(journalBtn);
    //Append card to grid
    gridDiv.appendChild(movieGrid);
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