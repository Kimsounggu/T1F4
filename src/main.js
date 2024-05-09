import createMovieCard from "./movie.js";
import goToMain from "./commons/goMain.js";

window.onload = () => {
  document.getElementById("search-input").focus();
};

loadisLogin();
createMovieCard();

function loadisLogin() {
  let isLogin = localStorage.getItem("isLogin");
  if (isLogin === "1") {
    showLogoutButton();
  } else {
    showLoginButton();
  }
}

function showLogoutButton() {
  let logoutButton = document.getElementById("logout-button");
  let loginButton = document.getElementById("login-button");
  logoutButton.style.display = "block";
  loginButton.style.display = "none";
}

function showLoginButton() {
  let logoutButton = document.getElementById("logout-button");
  let loginButton = document.getElementById("login-button");
  logoutButton.style.display = "none";
  loginButton.style.display = "block";
}

// Logo Click -> Main page 이동
const headerLogo = document.getElementById("header-logo");

headerLogo.addEventListener("click", () => {
  goToMain();
});

// 비로그인 유저 마이페이지 접근 불가
const myPageLink = document.querySelector(".mypage");

myPageLink.addEventListener("click", function (event) {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin !== "1") {
    event.preventDefault();
    alert("로그인이 필요합니다.");
  }
});

// movie-search
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
