const nav = document.createElement("nav");
nav.innerHTML = `
  <div id="logo-section">
    <img src="./img/logo_WHITE.png" alt="logo" id="header-logo" />
    <p class="mypage">마이페이지</p>
    <p>기타추가++</p>
  </div>
  <div id="login-section">
    <fieldset>
      <label>
        <input role="switch" type="checkbox" />
        <span>다크모드</span>
      </label>
      <label>
        <input role="switch" type="checkbox" />
        <span>언어변환</span>
      </label>
    </fieldset>
    <button class="loginBtn">로그인</button>
  </div>
`;
document.body.insertBefore(nav, document.body.firstChild);

document.querySelector("nav").addEventListener("click", (event) => {
  if (event.target.id === "header-logo") {
    // 실제메인페이지링크넣기
    window.location.href = "";
  }
});

const onScroll = (event) => {
  const scrollPosition = event.target.scrollingElement.scrollTop;
  if (scrollPosition > 10) {
    if (!nav.classList.contains("scrolled-down")) {
      nav.classList.add("scrolled-down");
    }
  } else {
    if (nav.classList.contains("scrolled-down")) {
      nav.classList.remove("scrolled-down");
    }
  }
};

document.addEventListener("scroll", onScroll);