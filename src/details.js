//상세 페이지 api 가져오기
console.log(window.location)
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")



import movieStore from "./store/store.js";
const createMovieCards = () => {
  const cardContainer = document.querySelector("#details");
  for(let i = 0 ; i < movieStore.length; i++){
    if(movieStore[i].id == id){
      const card = createMovieCard(movieStore[i]); 
      cardContainer.appendChild(card);
    }
  }
}

function createMovieCard(data) {
  const movieCard = document.createElement("li");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
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

createMovieCards();


// Logo Click -> 뒤로가기
const headerLogo = document.getElementById("header-logo");
headerLogo.addEventListener("click", () => {
  window.history.back();
});
