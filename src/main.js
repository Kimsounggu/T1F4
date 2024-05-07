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
