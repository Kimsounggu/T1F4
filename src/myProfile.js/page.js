import goToMain from "../commons/goMain.js";
import createMovieCard from "../movie.js";

const headerLogo = document.getElementById("header-logo");
headerLogo.addEventListener("click", goToMain);

const bookmark = document.getElementById("user-bookmark");
const reviewCollection = document.getElementById("user-review-collection");
