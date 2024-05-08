function addNav() {
  const nav = document.createElement("nav");

  const header = document.querySelector("header");
  if (header) {
    header.insertBefore(nav, header.firstChild);
  }

  // nav.addEventListener("click", (event) => {
  //   if (event.target.id === "header-logo") {
  //     // 실제메인페이지링크
  //     window.location.href = "";
  //   }
  // });
}

window.addEventListener("DOMContentLoaded", addNav);
