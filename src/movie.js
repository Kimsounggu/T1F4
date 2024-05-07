import movieStore from "./store/store.js";

const itemsPerPage = 9;
let currentPage = 1;
let currentLanguage = "en-US";

const createMovieCard = (data) => {
  const movieCard = document.createElement("li");
  movieCard.classList.add("movie-card");

  const imgSrc = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : `https://image.tmdb.org/t/p/w500${data.img}`;

  const rating = data.vote_average ? data.vote_average : data.rating;

  movieCard.innerHTML = `
  <img src="${imgSrc}" alt="${data.title}" class="movie-img">
    <div class="movie-title">${data.title}</div>
    <div class="movie-info">
      <p class="movie-overview">${data.overview}</p>
      <p class="movie-rating">Rating: <span class="movie-rating-number">${rating}</span></p>
    </div>
  `;

  movieCard.addEventListener("click", () => {
    alert("Movie ID: " + data.id);
  });

  return movieCard;
};

const displayMovies = (movies) => {
  const movieContainer = document.querySelector("#card-container");
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    movieContainer.appendChild(movieCard);
  });
};

const totalPages = Math.ceil(movieStore.length / itemsPerPage);

// pagination_페이지 렌더링
async function renderPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjUxYmI1M2Q5YTNkMTA0NGRiYTcwZDFiMmI2ZGEwNSIsInN1YiI6IjY2MmNmNDRlZjZmZDE4MDEyODIyNGI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yGcscHFGjYQq6B7s_OqCif9IH5jw8vlFboOuJZNKnTk",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=${currentLanguage}&page=${pageNumber}`,
      options,
    );
    if (!response.ok) throw new Error("Failed to fetch api data");
    const data = await response.json();
    const allMovies = data.results;
    const currentPageData = paginate(allMovies, pageNumber);
    displayMovies(currentPageData);
    updatePaginationUI();
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
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

// pagination_이전 , 다음 페이지
document.getElementById("prev-page").addEventListener("click", () => {
  handlePageChange(currentPage - 1);
});

document.getElementById("next-page").addEventListener("click", () => {
  handlePageChange(currentPage + 1);
});

function handlePageChange(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    currentPage = pageNumber;
    renderPage(currentPage);
    updatePaginationUI();
    window.scrollTo(0, 0);
  }
}

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

const languageToggle = document.getElementById("language-toggle");

// 언어변환
const toggleLanguage = async () => {
  if (languageToggle.checked) {
    currentLanguage = "ko-KR";
  } else {
    currentLanguage = "en-US";
  }
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjUxYmI1M2Q5YTNkMTA0NGRiYTcwZDFiMmI2ZGEwNSIsInN1YiI6IjY2MmNmNDRlZjZmZDE4MDEyODIyNGI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yGcscHFGjYQq6B7s_OqCif9IH5jw8vlFboOuJZNKnTk",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=${currentLanguage}&page=1`,
      options,
    );
    if (!response.ok) throw new Error("Failed to fetch api data");
    const data = await response.json();
    const allMovies = data.results;
    const currentPageData = paginate(allMovies, currentPage);
    displayMovies(currentPageData);
    updatePaginationUI();
    languageToggle.nextElementSibling.textContent = currentLanguage === "ko-KR" ? "영어" : "한글";
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
};

languageToggle.addEventListener("change", async () => {
  await toggleLanguage();
});

const paginate = (data, page) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

export default createMovieCard;
