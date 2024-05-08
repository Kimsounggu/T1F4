const signupForm = document.getElementById("signup-form");
const modalContent = document.getElementById("modal-content");

// 회원가입 페이지 열기
signupForm.addEventListener("click", function () {
  modalContent.innerHTML = `
    <h2>회원가입</h2>
    <input type="text" id="signup-username" placeholder="아이디">
    <span id="username-error"></span>
    <input type="password" id="signup-password" placeholder="비밀번호">
    <span id="password-error"></span>
    <button id="signup-submit">가입</button>
    <hr />
    <button id="close-modal">닫기</button>
  `;

  // 회원가입 버튼 이벤트 리스너
  const signupSubmit = document.getElementById("signup-submit");
  signupSubmit.addEventListener("click", handleSignup);

  // 닫기 버튼 이벤트 리스너
  const closeModal = document.getElementById("close-modal");

  // 닫기 button 클릭시 초기화면으로
  closeModal.addEventListener("click", () => {
    window.location.reload();
    window.scrollTo(0, 0);
  });

  // 회원가입 처리 함수
  function handleSignup() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    // 유효성 검사
    // 두 가지 조건 중 하나라도 만족하지 않으면 회원가입 처리 중단
    if (!validateUsername(username) || !validatePassword(password)) {
      return;
    }

    // 저장된 회원가입 정보 가져오기
    let savedUsername = localStorage.getItem("username");

    // 이미 존재하는 계정인지 확인
    if (savedUsername === username) {
      alert("이미 계정이 존재합니다.");
      return;
    }

    // 회원가입 정보를 로컬 스토리지에 저장
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("회원가입이 완료되었습니다.");

    window.location.reload();
    window.scrollTo(0, 0);

    // 아이디 유효성 검사 함수
    function validateUsername(username) {
      if (username.trim().length < 2) {
        usernameError.style.display = "block";
        usernameError.textContent = "아이디는 최소 2글자 이상이어야 합니다.";
        return false;
      }
      return true;
    }

    // 비밀번호 유효성 검사 함수
    function validatePassword(password) {
      if (password.trim() === "") {
        passwordError.style.display = "block";
        passwordError.textContent = "비밀번호를 입력해주세요.";
        return false;
      }
      // 비밀번호는 숫자, 영어, 특수문자를 조합하여야 합니다.
      if (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)) {
        passwordError.style.display = "block";
        passwordError.textContent = "비밀번호는 숫자, 영어, 특수문자를 조합하여 최소 6자 이상이어야 합니다.";
        return false;
      }
      return true;
    }
  }
});
