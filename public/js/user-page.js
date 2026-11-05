var dropBtn = document.querySelector(".drop");
var sidePane = document.querySelector(".side-pane");

dropBtn.addEventListener("click", () => {
  sidePane.classList.toggle("drop-pressed");
});

const pages = document.querySelectorAll(".page");
const pageOptions = document.querySelectorAll(".option");

pageOptions.forEach((option, index) => {
  option.addEventListener("click", () => {
    switch (index) {
      case 0:
        pages[0].classList.add("active");
        pages[1].classList.remove("active");
        sidePane.classList.remove("drop-pressed");
        break;
      case 1:
        pages[1].classList.add("active");
        pages[0].classList.remove("active");
        sidePane.classList.remove("drop-pressed");
        break;
    }
  });
});
