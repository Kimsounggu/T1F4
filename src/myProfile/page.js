import goToMain from "../commons/goMain.js";

const headerLogo = document.getElementById("header-logo");
headerLogo.addEventListener("click", goToMain);

window.onload = function () {
  displayBookmarkedMovies();
};

// 북마크 영화 표시
function displayBookmarkedMovies() {
  const bookmarkContent = document.getElementById("card-container");
  bookmarkContent.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("bookmark")) {
      const movieData = JSON.parse(localStorage.getItem(key));
      const title = movieData.title;
      const imgUrl = movieData.img;

      const card = document.createElement("div");
      card.classList.add("movie-card");

      const movieImg = document.createElement("img");
      movieImg.src = `https://image.tmdb.org/t/p/w500${imgUrl}`;
      movieImg.classList.add("bookmark-movie-img");

      const movieTitle = document.createElement("p");
      movieTitle.classList.add("bookmark-movie-title");
      movieTitle.textContent = title;

      const deleteBookmark = document.createElement("button");
      deleteBookmark.classList.add("delete-bookmark-btn");
      deleteBookmark.textContent = "🗑️";

      card.appendChild(deleteBookmark);
      card.appendChild(movieImg);
      card.appendChild(movieTitle);

      bookmarkContent.appendChild(card);
    }
  }
}

// 북마크 삭제
const deleteBookmarkBtn = document.getElementById("delete-bookmark-btn");
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-bookmark-btn")) {
    const card = event.target.closest(".movie-card");
    const titleElement = card.querySelector(".bookmark-movie-title");
    const movieTitle = titleElement.textContent;

    localStorage.removeItem(`bookmark-${movieTitle}`);

    displayBookmarkedMovies();
  }
});

// 프로필 영역
let username = localStorage.getItem("username");
if (username) {
  document.getElementById("user-id").innerText = username;
}

let changeId = document.getElementById("change-profile");

changeId.addEventListener("click", function () {
  let newId = prompt("새로운 ID를 입력하세요:");
  let currentId = localStorage.getItem("username");

  if (newId === currentId) {
    alert("현재 ID와 동일한 ID입니다. 다른 ID를 입력해주세요.");
  } else if (newId.length >= 2) {
    localStorage.setItem("username", newId);
    document.getElementById("user-id").innerText = newId;
    alert("아이디 변경이 완료되었습니다.");
  } else {
    alert("ID는 최소 2글자 이상이어야 합니다.");
  }
});
