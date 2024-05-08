import goToMain from "../commons/goMain.js";

const headerLogo = document.getElementById("header-logo");
headerLogo.addEventListener("click", goToMain);

window.onload = function () {
  displayBookmarkedMovies();
};

function displayBookmarkedMovies() {
  const bookmarkContent = document.getElementById("card-container");
  bookmarkContent.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("bookmark")) {
      const movieData = JSON.parse(localStorage.getItem(key));
      const title = movieData.title;
      const imgUrl = movieData.img;

      // 카드 형태로 보여주기
      const card = document.createElement("div");
      card.classList.add("movie-card");

      const movieImg = document.createElement("img");
      movieImg.src = `https://image.tmdb.org/t/p/w500${imgUrl}`;
      movieImg.classList.add("bookmark-movie-img");

      const movieTitle = document.createElement("p");
      movieTitle.classList.add("bookmark-movie-title");

      movieTitle.textContent = title;

      card.appendChild(movieImg);
      card.appendChild(movieTitle);

      bookmarkContent.appendChild(card);
    }
  }
}

// const bookmark = document.getElementById("user-bookmark");
// const reviewCollection = document.getElementById("user-review-collection");
