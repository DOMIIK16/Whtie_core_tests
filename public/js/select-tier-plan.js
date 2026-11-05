var tierCardsLabel = document.querySelectorAll(".plan-card-label");

tierCardsLabel.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (index === 0) {
      tierCardsLabel[0].classList.add("active");
      tierCardsLabel[1].classList.remove("active");
    }
    if (index === 1) {
      tierCardsLabel[1].classList.add("active");
      tierCardsLabel[0].classList.remove("active");
    }
  });
});
