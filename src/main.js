import createMovieCard from "./movie.js";
import "./navigation.js";

window.onload = () => {
  document.getElementById("search-input").focus();
};

createMovieCard();

//Logo Click -> Main page 이동
const headerLogo = document.getElementById("header-logo");

headerLogo.addEventListener("click", () => {
  window.location.reload();
  window.scrollTo(0, 0);
});

//movie-search
const searchForm = document.querySelector("#search-box");
const searchInput = document.querySelector("#search-input");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(searchInput.value);
});

function handleSearch(searchWord) {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase();
    const searchedValue = searchWord.toLowerCase();

    card.style.display = title.includes(searchedValue) ? "block" : "none";
  });
}
