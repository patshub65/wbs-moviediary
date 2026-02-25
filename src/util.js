/** Function that returns the movie cards */

export const movieCardLayOut = (movies, gridName) => {
  console.log(movies);
  const grid = document.getElementById(gridName);
  grid.className = "flex overflow-x-auto gap-4 pb-4 scrollbar-hide";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card overflow-hidden flex-none w-48 shadow-sm";
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

    const favBtn = card.querySelector("button");
    favBtn.className = "btn btn-primary btn-sm absolute bottom-2 right-2";
    favBtn.style.position = "absolute";
    favBtn.style.bottom = "0.5rem";
    favBtn.style.right = "0.5rem";

    grid.appendChild(card);
  });
};
