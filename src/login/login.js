// 모달 토글
function toggleModal(display) {
  var modal = document.getElementById("modal");
  modal.style.display = display;

  // 모달이 열리거나 닫힐 때 로그인/로그아웃 버튼 표시 변경
  const loginButton = document.getElementById("login-button");
  if (display === "none") {
    const logoutButton = document.getElementById("logout-button");
    if (loginButton.style.display === "none") {
      loginButton.style.display = "block"; // 로그아웃 후 로그인 버튼 표시
      logoutButton.style.display = "none"; // 모달이 닫힐 때 로그아웃 버튼 숨기기
    }
  }
}

// 모달 열기
function openModal() {
  toggleModal("block");
}

// 모달 닫기
function closeModal() {
  toggleModal("none");
}

// 로그아웃 버튼 클릭 이벤트 처리
const handleLogout = function () {
  alert("로그아웃 되었습니다.");
  const logoutButton = document.getElementById("logout-button");
  logoutButton.style.display = "none"; // 로그아웃 후 로그아웃 버튼 숨기기
  const loginButton = document.getElementById("login-button");
  loginButton.style.display = "block"; // 로그아웃 후 로그인 버튼 표시
};

// 로그인 처리
function handleLogin() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  // 저장된 회원가입 정보 가져오기
  let savedUsername = localStorage.getItem("username");
  let savedPassword = localStorage.getItem("password");

  // 입력된 정보와 저장된 정보 비교
  if (username === savedUsername && password === savedPassword) {
    alert("로그인 성공!");
    closeModal(); // 로그인 성공 시 모달 닫기
    const loginButton = document.getElementById("login-button");
    loginButton.style.display = "none"; // 로그인 후 로그인 버튼 숨기기
    const logoutButton = document.getElementById("logout-button");
    logoutButton.style.display = "block"; // 로그인 후 로그아웃 버튼 표시
  } else {
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  }
}

// 이벤트 리스너 등록
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", openModal);

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", handleLogout);

const loginSubmit = document.getElementById("login-submit");
loginSubmit.addEventListener("click", handleLogin);

const closeModalButton = document.getElementById("close-modal");
closeModalButton.addEventListener("click", closeModal);
