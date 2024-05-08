import createMovieCard from "./movie.js";
import goToMain from "./commons/goMain.js";

window.onload = () => {
  document.getElementById("search-input").focus();

  let isLogin = localStorage.getItem("isLogin");
  // 로그인 상태에 따라 UI 업데이트
  if (isLogin === "1") {
    showLogoutButton(); // 로그인 상태면 로그아웃 버튼 보이기
  } else {
    showLoginButton(); // 비로그인 상태면 로그인 버튼 보이기
  }
};

// 로그아웃 버튼 표시 함수
function showLogoutButton() {
  let logoutButton = document.getElementById("logout-button");
  let loginButton = document.getElementById("login-button");
  logoutButton.style.display = "block";
  loginButton.style.display = "none";
}

// 로그인 버튼 표시 함수
function showLoginButton() {
  let logoutButton = document.getElementById("logout-button");
  let loginButton = document.getElementById("login-button");
  logoutButton.style.display = "none";
  loginButton.style.display = "block";
}

createMovieCard();

//Logo Click -> Main page 이동
const headerLogo = document.getElementById("header-logo");

headerLogo.addEventListener("click", () => {
  goToMain();
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
