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
const copyLink = document.querySelector(".copyLink");
const linkTxt = document.querySelector(".refLink").textContent;
const copyRefCode = document.querySelector(".copyCode");
const refCodeText = document.querySelector(".refCode").textContent;
moreOptions.forEach((option, index) => {
  option.addEventListener("click", async () => {
    switch (index) {
      case 0:
        actionContainer.classList.add("show");
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".withdraw").classList.add("show");
        break;
      case 1:
        actionContainer.classList.add("show");
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".referral-table").classList.add("show");
        break;
      case 2:
        try {
          await navigator.clipboard.writeText(linkTxt);
          copyLink.textContent = "Copied";
          setTimeout(() => {
            copyLink.textContent = "Copy";
          }, 2000);
        } catch (err) {
          fallbackCopyText(linkTxt);
        }
        break;
      case 3:
        try {
          await navigator.clipboard.writeText(refCodeText);
          copyRefCode.textContent = "Copied";
          setTimeout(() => {
            copyRefCode.textContent = "Copy";
          }, 2000);
        } catch (err) {
          fallbackCopyText(refCodeText);
        }
        break;
    }
  });
});

exitBtn.addEventListener("click", () => {
  actionContainer.classList.remove("show");
  actionContents.forEach((content) => {
    content.classList.remove("show");
  });
});
