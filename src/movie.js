import movieStore from "./store/store.js";

const itemsPerPage = 9;
let currentPage = 1;

const createMovieCard = (data) => {
  const movieCard = document.createElement("li");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${data.img}" alt="${data.title}" class="movie-img">
    <div class="movie-title">${data.title}</div>
    <div class="movie-info">
      <p class="movie-overview">${data.overview}</p>
      <p class="movie-rating">Rating: <span class="movie-rating-number">${data.rating}</span></p>
    </div>
  `;

  movieCard.addEventListener("click", () => {
    alert("Movie ID: " + data.id);
  });

  return movieCard;
};

// pagination_페이지 수 계산
const totalPages = Math.ceil(movieStore.length / itemsPerPage);

// pagination_페이지 렌더링
function renderPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = movieStore.slice(startIndex, endIndex);

  const movieContainer = document.querySelector("#card-container");
  movieContainer.innerHTML = "";

  pageData.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    movieContainer.appendChild(movieCard);
  });
}

// pagination_UI 업데이트
function updatePaginationUI() {
  const pageNumberElement = document.getElementById("page-number");
  pageNumberElement.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.add("page-number-btn");
    pageNumberElement.appendChild(pageButton);

    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
      updatePaginationUI();
      window.scrollTo(0, 0);
    });
  }

  const currentPageButton = pageNumberElement.querySelector(`.page-number-btn:nth-child(${currentPage})`);
  if (currentPageButton) {
    currentPageButton.classList.add("active");
  }
}

// pagination_이전 페이지 및 다음 페이지 버튼
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    updatePaginationUI();
    window.scrollTo(0, 0);
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
    updatePaginationUI();
    window.scrollTo(0, 0);
  }
});

// pagination_초기 페이지 로드
renderPage(currentPage);
updatePaginationUI();

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

export default createMovieCard;
