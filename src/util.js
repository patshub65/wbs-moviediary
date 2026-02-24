/** Function that returns the movie cards */

export const movieCardLayOut = (movie) => {
  const movieCard = document.createElement("div");
  movieCard.addEventListener("click", () => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
  });
  return movieCard;
};
