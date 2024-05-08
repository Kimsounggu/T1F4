// 다크모드
let Body = {
  setcolor: function (color) {
    document.querySelector("body").style.color = color;
  },
  setbackgroundcolor: function (color) {
    document.querySelector("body").style.backgroundColor = color;
  },
};
function nightdayhandler(self) {
  if (document.getElementById("dark-mode").value === "night") {
    Body.setbackgroundcolor("rgb(12, 10, 10)");
    Body.setcolor("white");
    self.value = "day";
  } else {
    Body.setbackgroundcolor("white");
    Body.setcolor("black");
    self.value = "night";
  }
}
