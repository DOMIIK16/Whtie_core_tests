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

const moreOptions = document.querySelectorAll(".more-options-container");
const actionContainer = document.querySelector(".action-container");
const exitBtn = document.querySelector(".exit-btn");
const actionContents = document.querySelectorAll(".action-content-container");
const copyLink = document.querySelector(".copyLink");
const linkTxt = document.querySelector(".refLink").textContent;
const copyRefCode = document.querySelector(".copyCode");
const refCodeText = document.querySelector(".refCode").textContent;

const copyInviteTxtBtn = document.querySelector(".copyInviteTxtBtn");
const inviteContactsTxt =
  document.querySelector(".inviteContactsTxt").textContent;

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
      case 2:
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

      case 3:
        try {
          await navigator.clipboard.writeText(inviteContactsTxt);
          copyInviteTxtBtn.textContent = "Copied";
          setTimeout(() => {
            copyInviteTxtBtn.textContent = "Copy";
          }, 2000);
        } catch (err) {
          fallbackCopyText(inviteContactsTxt);
        }
        break;
    }
  });
});

const ModifyBtns = document.querySelectorAll(".modify");

ModifyBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    switch (index) {
      case 0:
        actionContainer.classList.add("show");
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".change-username").classList.add("show");
        break;
      case 1:
        actionContainer.classList.add("show");
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".change-display").classList.add("show");
        break;
      case 2:
        actionContainer.classList.add("show");
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".change-password").classList.add("show");
        break;

      case 3:
        actionContainer.classList.add("show");
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document
          .querySelector(".update-withdrawal-account")
          .classList.add("show");
        break;
      case 4:
        actionContainer.classList.add("show");
        actionContents.forEach((content) => {
          content.classList.remove("show");
        });
        document.querySelector(".update-pin").classList.add("show");

        break;
    }
  });
});

const upgradeTier = document.querySelector(".upgradeTier");
const upgradeTierDialogueBox = document.querySelector(".upgrade-tier-plan");

upgradeTier.addEventListener("click", () => {
  actionContainer.classList.add("show");
  actionContents.forEach((content) => {
    content.classList.remove("show");
  });
  upgradeTierDialogueBox.classList.add("show");
});

exitBtn.addEventListener("click", () => {
  actionContainer.classList.remove("show");
  actionContents.forEach((content) => {
    content.classList.remove("show");
  });
});
