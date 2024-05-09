let Body = {
  setColor: function (color) {
    document.querySelector("body").style.color = color;
  },
  setBackgroundColor: function (color) {
    document.querySelector("body").style.backgroundColor = color;
  },
};

function nightDayHandler() {
  const isDarkMode = document.body.classList.contains("dark-mode");

  if (isDarkMode) {
    Body.setBackgroundColor("rgb(12, 10, 10)");
    Body.setColor("white");
    document.body.classList.remove("dark-mode");
  } else {
    Body.setBackgroundColor("white");
    Body.setColor("black");
    document.body.classList.add("dark-mode");
  }
}

document.addEventListener("click", function (event) {
  if (event.target.matches("#dark-mode")) {
    nightDayHandler();
  }
});
