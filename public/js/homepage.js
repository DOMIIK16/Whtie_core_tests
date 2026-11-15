const registerBtn = document.querySelectorAll(".register");

registerBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    window.location.href = "select-tier-plan.html";
  });
});

const tierCards = document.querySelectorAll(".tier-card");
const tierHeading = document.querySelectorAll(".tier-toggle");
const tierToggle = document.querySelectorAll(".tier-details");

tierCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (index === 0) {
      tierToggle[0].classList.add("active");
      tierToggle[1].classList.remove("active");
      tierHeading[0].classList.add("active");
      tierHeading[1].classList.remove("active");
    }
    if (index === 1) {
      tierToggle[1].classList.add("active");
      tierToggle[0].classList.remove("active");
      tierHeading[1].classList.add("active");
      tierHeading[0].classList.remove("active");
    }
  });
});

const sampleImageContainer = document.querySelector(".sample-image-container");
const sampleImages = ["wallet.png", "referral.jpeg", "analysis.png"];
const sampleImagesTxt = document.querySelector(".sample-image-txt");
const sampleTxts = ["Fast payment", "Networking", "Funds tracking"];
let currentIndex = 0;
let currentTxtIndex = 0;
let intervalId = null;
sampleImageContainer.addEventListener("mouseenter", () => {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % sampleImages.length;
    currentTxtIndex = (currentTxtIndex + 1) % sampleTxts.length;
    sampleImagesTxt.textContent = sampleTxts[currentTxtIndex];
    sampleImageContainer.style.backgroundImage = `url('/images/${sampleImages[currentIndex]}')`;
  }, 3000);
});

sampleImageContainer.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
});
