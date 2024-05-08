// html -> kebab-case, js -> camelCase
// 1.
// 2.
// 3.
// 4.

// 댓글 내용 input가져오기
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const commentInput = document.getElementById("comment-input");

// 페이지 로드 될 때 기본 댓글 가져오기
commentForm.addEventListener("submit", function (event) {
  // alert("작성되었습니다!"); // 나중에 풀기
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

// 할 일
// 로그인이 되어 있는 지 id 값으로 판별 (안되어있을 시 임시로 alert으로 경고)
// css 만지기
// 창을 껏다 켜도 다시 뜨게 하기
