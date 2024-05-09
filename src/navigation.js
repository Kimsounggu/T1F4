function addNav() {
  const nav = document.createElement("nav");

  const header = document.querySelector("header");
  if (header) {
    header.insertBefore(nav, header.firstChild);
  }
}

window.addEventListener("DOMContentLoaded", addNav);
