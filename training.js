document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const slides = document.querySelectorAll(".training-card");

  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  nextButton.addEventListener("click", function () {
    if (index < slides.length - 1) {
      index++;
    } else {
      index = 0;
    }
    updateCarousel();
  });

  prevButton.addEventListener("click", function () {
    if (index > 0) {
      index--;
    } else {
      index = slides.length - 1;
    }
    updateCarousel();
  });
});
