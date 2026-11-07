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

var moreOptions = document.querySelectorAll(".more-options-container");
var actionContainer = document.querySelector(".action-container");
var exitBtn = document.querySelector(".exit-btn");
var actionContents = document.querySelectorAll(".action-content-container");

moreOptions.forEach((option, index) => {
  option.addEventListener("click", () => {
    actionContainer.classList.add("show");
    switch (index) {
      case 0:
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".withdraw").classList.add("show");
        break;
      case 1:
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".referral-table").classList.add("show");
        break;
      case 2:
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        break;
      case 3:
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        break;
    }
  });
});

exitBtn.addEventListener("click", () => {
  actionContainer.classList.remove("show");
});
