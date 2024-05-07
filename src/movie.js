import movieStore from "./store/store.js";

const createMovieCards = () => {
  const cardContainer = document.querySelector("#card-container");

  movieStore.forEach((data) => {
    const card = createMovieCard(data);
    cardContainer.appendChild(card);
  });
};

function createMovieCard(data) {
  const movieCard = document.createElement("li");
  movieCard.classList.add("movie-card");

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  movieCard.innerHTML = `
    <a href="details.html?id=${encodeURIComponent(data.id)}">
      <img src="https://image.tmdb.org/t/p/w500${data.img}" alt="${data.title}" class="movie-img">
      <div class="movie-title">${data.title}</div>
      <div class="movie-info">
        <p class="movie-overview">${data.overview}</p>
        <p class="movie-rating">Rating: <span class="movie-rating-number">${data.rating}</span></p>
      </div>
    </a>
  `;

  return movieCard;
}

export default createMovieCards;