var registerBtn = document.querySelectorAll(".register");

registerBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    window.location.href = "select-tier-plan.html";
  });
});

var tierCards = document.querySelectorAll(".tier-card");
var tierHeading = document.querySelectorAll(".tier-toggle");
var tierToggle = document.querySelectorAll(".tier-details");

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

console.log("Cards found:", tierCards.length);
console.log("Details found:", tierToggle.length);
