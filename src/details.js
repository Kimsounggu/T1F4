import movieStore from "./store/store.js";
import goToMain from "./commons/goMain.js";

loadisLogin();

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

// 비로그인 유저 마이페이지 접근 불가
const myPageLink = document.querySelector(".mypage");

myPageLink.addEventListener("click", function (event) {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin !== "1") {
    event.preventDefault();
    alert("로그인이 필요합니다.");
  }
});

const headerLogo = document.getElementById("header-logo");
headerLogo.addEventListener("click", () => {
  goToMain();
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const createMovieCards = () => {
  const cardContainer = document.querySelector("#detail-content");
  for (let i = 0; i < movieStore.length; i++) {
    if (movieStore[i].id == id) {
      const card = createMovieCard(movieStore[i]);
      cardContainer.appendChild(card);
    }
  }
};

let thisMovieStore = {};
function createMovieCard(data) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
      <div class="movie-img-wrapper">
        <img src="https://image.tmdb.org/t/p/w500${data.widthImg}" alt="${data.title}" class="movie-img">
      </div>
      <div class="movie-info">
        <div class="movie-title">${data.title}</div>
        <div class="movie-overview">${data.overview}</div>
        <p class="movie-rating">Rating: <span class="movie-rating-number">${data.rating}</span></p>
        <button class="bookmark">♡</button>
      </div>
    </a>
  `;

  thisMovieStore = {
    title: data.title,
    img: `https://image.tmdb.org/t/p/w500${data.img}`,
  };
  return movieCard;
}

createMovieCards();

/* !----- 북마크 기능-----! */
const bookmarkButtons = document.querySelectorAll(".bookmark");

// 페이지가 로드될 때 북마크 상태 확인 및 설정
window.onload = function () {
  bookmarkButtons.forEach(function (bookmarkButton) {
    const movieTitle = thisMovieStore.title;
    const bookmark = JSON.parse(localStorage.getItem(`bookmark-${movieTitle}`));
    if (bookmark) {
      bookmarkButton.textContent = "♥";
      bookmarkButton.classList.add("heart");
    }
  });
};

bookmarkButtons.forEach(function (bookmarkButton) {
  bookmarkButton.addEventListener("click", function () {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin !== "1") {
      alert("로그인이 필요합니다!");
      return;
    }

    const movieTitle = thisMovieStore.title;
    const bookmark = JSON.parse(localStorage.getItem(`bookmark-${movieTitle}`));
    if (bookmark) {
      this.textContent = "♡";
      this.classList.remove("heart");
      localStorage.removeItem(`bookmark-${movieTitle}`);
      alert("북마크가 해제되었습니다.");
    } else {
      this.textContent = "♥";
      this.classList.add("heart");
      localStorage.setItem(`bookmark-${movieTitle}`, JSON.stringify(thisMovieStore));
      alert("북마크 되었습니다.");
    }
  });
});

/* !----- 리뷰 작성-----! */
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const commentInput = document.getElementById("comment-input");

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin !== "1") {
    event.preventDefault();
    alert("로그인이 필요합니다!");
    return;
  }

  let comment = commentInput.value;

  let newComment = {
    username: comment,
  };

  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  // 새로운 댓글 추가
  comments.push(newComment);
  localStorage.setItem("comments", JSON.stringify(comments));
  sessionStorage.setItem("lastCommented", new Date().toISOString());

  commentForm.reset();

  const review = document.createElement("li");
  review.textContent = `- ${comment}`;
  const firstComment = commentList.firstChild;
  commentList.insertBefore(review, firstComment);

  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.addEventListener("click", function () {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin !== "1") {
      alert("로그인이 필요합니다!");
      return;
    }

    const originalComment = review.textContent.slice(2);
    const updatedComment = prompt("댓글을 수정해주세요");

    if (updatedComment === null || updatedComment.trim() === "") {
      alert("리뷰 수정을 취소하였습니다.");
      return;
    } else if (updatedComment === originalComment) {
      alert("수정된 댓글이 없거나 기존과 동일합니다. 다른 내용으로 수정해주세요");
    } else {
      alert("댓글이 수정되었습니다!");
    }

    if (updatedComment) {
      review.textContent = `- ${updatedComment}`;
      review.appendChild(editButton);
      review.appendChild(deleteButton);
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", function () {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin !== "1") {
      alert("로그인이 필요합니다!");
      return;
    }

    commentList.removeChild(review);
    alert("리뷰가 삭제되었습니다!");
  });

  review.appendChild(editButton);
  review.appendChild(deleteButton);
});
