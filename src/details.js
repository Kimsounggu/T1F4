import movieStore from "./store/store.js";
//상세 페이지 api 가져오기
console.log(window.location);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const createMovieCards = () => {
  const cardContainer = document.querySelector("#details");
  for (let i = 0; i < movieStore.length; i++) {
    if (movieStore[i].id == id) {
      const card = createMovieCard(movieStore[i]);
      cardContainer.appendChild(card);
    }
  }
};

function createMovieCard(data) {
  const movieCard = document.createElement("div");
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

// 여기부터 댓글 기능

// 댓글 내용 input가져오기
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const commentInput = document.getElementById("comment-input");

// 페이지 로드 될 때 기본 댓글 가져오기
commentForm.addEventListener("submit", function (event) {
  alert("작성되었습니다!");
  event.preventDefault(); // 폼 로드 막는 것.
  let comment = commentInput.value;
  console.log(comment);

  // 댓글 객체 생성
  let newComment = {
    username: comment,
  };

  // 기존 댓글 배열 가져오기
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  // 새로운 댓글 추가
  comments.push(newComment);
  localStorage.setItem("comments", JSON.stringify(comments));
  sessionStorage.setItem("lastCommented", new Date().toISOString());

  //폼 초기화
  commentForm.reset();

  // 1. html에 있는 ul태그에 li태그들을 추가하고싶다.
  const review = document.createElement("li"); // 2. js 에서 li태크를 생성한다
  review.textContent = `- ${comment}`; // 3. li태그 값을 넣는 부분
  commentList.appendChild(review); // 4. ul태크에 li태그 추가하는 부분

  const editButton = document.createElement("button"); //수정 버튼 생성
  editButton.textContent = "edit";
  editButton.addEventListener("click", function () {
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
      review.appendChild(editButton); //li에 수정버튼 함께 등장
      review.appendChild(deleteButton); //li에 삭제버튼 함께 등장;
    }
  });
  const deleteButton = document.createElement("button"); //삭제 버튼 생성
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", function () {
    commentList.removeChild(review); // review를 제거한다.
    alert("리뷰가 삭제되었습니다!");
  });

  review.appendChild(editButton); //li에 수정버튼 함께 등장
  review.appendChild(deleteButton); //li에 삭제버튼 함께 등장
});
