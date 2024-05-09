const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("click", openSignupForm);
const modalContent = document.getElementById("modal-content");
const modal = document.getElementById("modal");

// 회원가입 페이지 열기
function openSignupForm() {
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

  // 로그인 폼 열기
  function openLoginForm() {
    modalContent.innerHTML = `
    <h2>로그인</h2>
    <input type="text" id="login-username" placeholder="아이디" />
    <input type="password" id="login-password" placeholder="비밀번호" />
    <button id="login-submit">로그인</button>
    <hr />
    <div id="question-signup">
      <p>계정이 없으신가요?</p>
      <button id="signup-form">가입하기</button>
      <button id="close-modal">닫기</button>
    </div>
  `;
    // 기존의 로그인 폼에 대한 이벤트 리스너 제거
    const loginSubmit = document.getElementById("login-submit");
    loginSubmit.removeEventListener("click", handleLogin);

    // 로그인 버튼 이벤트 리스너 다시 등록
    loginSubmit.addEventListener("click", handleLogin);

    // 기존의 회원가입 폼에 대한 이벤트 리스너 제거
    const signupForm = document.getElementById("signup-form");
    signupForm.removeEventListener("click", openSignupForm);

    // 다시 가입하기 버튼 이벤트 리스너 등록
    signupForm.addEventListener("click", openSignupForm);
  }

  // 모달 토글
  function toggleModal(display) {
    var modal = document.getElementById("modal");
    modal.style.display = display;

    const loginButton = document.getElementById("login-button");
    if (display === "none") {
      const logoutButton = document.getElementById("logout-button");
      if (loginButton.style.display === "none") {
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
      }
    }
  }

  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", openModal);

  function openModal() {
    toggleModal("block");
  }

  function afterLoginCloseModal() {
    toggleModal("none");
  }

  // 로그인 처리
  function handleLogin() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let savedUsername = localStorage.getItem("username");
    let savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
      alert("로그인 성공!");
      afterLoginCloseModal();
      const loginButton = document.getElementById("login-button");
      loginButton.style.display = "none";
      const logoutButton = document.getElementById("logout-button");
      logoutButton.style.display = "block";
      localStorage.setItem("isLogin", "1");
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  // 회원가입 처리 함수
  function handleSignup() {
    let signupUsername = document.getElementById("signup-username").value;
    let signupPassword = document.getElementById("signup-password").value;

    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    // 아이디 유효성 검사
    if (signupUsername.length < 2) {
      usernameError.style.display = "block";
      usernameError.textContent = "아이디는 최소 2글자 이상이어야 합니다.";
      passwordError.textContent = "";
      return; // 유효성 검사에 실패하면 처리 중단
    } else {
      usernameError.style.display = "none";
      usernameError.textContent = "";
    }

    // 비밀번호 유효성 검사
    if (signupPassword === "") {
      passwordError.style.display = "block";
      passwordError.textContent = "비밀번호를 입력해주세요.";
      return; // 유효성 검사에 실패하면 처리 중단
    } else if (!signupPassword.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)) {
      passwordError.style.display = "block";
      passwordError.textContent = "비밀번호는 숫자, 영어, 특수문자를 조합하여 최소 6자 이상이어야 합니다.";
      return; // 유효성 검사에 실패하면 처리 중단
    } else {
      passwordError.style.display = "none";
      passwordError.textContent = "";
    }

    // 저장된 회원가입 정보 가져오기
    let savedUsername = localStorage.getItem("username");

    // 이미 존재하는 계정인지 확인
    if (savedUsername === signupUsername) {
      alert("이미 계정이 존재합니다.");
      return;
    }

    // 회원가입 정보를 로컬 스토리지에 저장
    localStorage.setItem("username", signupUsername);
    localStorage.setItem("password", signupPassword);

    alert("회원가입이 완료되었습니다.");

    // 회원가입 완료 후 로그인 모달 열기
    openLoginForm();
  }
}
