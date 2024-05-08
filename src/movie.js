import movieStore from "./store/store.js";

const createMovieCard = () => {
  const cardContainer = document.querySelector("#card-container");

  movieStore.forEach((data) => {
    const card = createMovieCard(data);
    cardContainer.appendChild(card);
  });

  function createMovieCard(data) {
    const movieCard = document.createElement("li");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
    <a href="details.html?id=${encodeURIComponent(data.id)}">
    <img src="https://image.tmdb.org/t/p/w500${data.img}" alt="${data.title}" class="movie-img">
    <div class="movie-title">${data.title}</div>
    <div class="movie-info">
      <p class="movie-overview">${data.overview}</p>
      <p class="movie-rating">Rating: <span class="movie-rating-number">${data.rating}</span></p>
    </div>
  `;

    return movieCard;
  }
};

export default createMovieCard;
