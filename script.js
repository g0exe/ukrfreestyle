// Main page

const cards = document.querySelectorAll(".hero-card");
if (window.innerWidth < 768) {
  function resetPositions() {
    cards[0].style.height = "400px";
    cards[0].style.top = "0px";
    cards[1].style.height = "200px";
    cards[1].style.top = "320px";
    cards[2].style.height = "200px";
    cards[2].style.top = "460px";
    cards[3].style.height = "200px";
    cards[3].style.top = "600px";
  }

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      if (index === 0) {
        resetPositions();
      } else if (index === 1) {
        cards[0].style.height = "200px";
        cards[0].style.top = "0px";
        cards[1].style.height = "400px";
        cards[1].style.top = "140px";
        cards[2].style.height = "200px";
        cards[2].style.top = "460px";
        cards[3].style.height = "200px";
        cards[3].style.top = "600px";
      } else if (index === 2) {
        cards[0].style.height = "200px";
        cards[0].style.top = "0px";
        cards[1].style.height = "200px";
        cards[1].style.top = "140px";
        cards[2].style.height = "400px";
        cards[2].style.top = "280px";
        cards[3].style.height = "200px";
        cards[3].style.top = "600px";
      } else if (index === 3) {
        cards[0].style.height = "200px";
        cards[0].style.top = "0px";
        cards[1].style.height = "200px";
        cards[1].style.top = "140px";
        cards[2].style.height = "200px";
        cards[2].style.top = "280px";
        cards[3].style.height = "400px";
        cards[3].style.top = "420px";
      }
    });
  });
}

document
  .querySelector(".hero-stack")
  ?.addEventListener("mouseleave", resetPositions);

const videoCard = document.getElementById("videoCard");
const videoPreview = document.getElementById("videoPreview");

videoCard?.addEventListener("mouseenter", () => {
  videoPreview.currentTime = 0;
  videoPreview.play();

  videoPreview.addEventListener("timeupdate", loopVideo);

  function loopVideo() {
    if (videoPreview.currentTime >= 5) {
      videoPreview.currentTime = 0;
      videoPreview.play();
    }
  }
});

videoCard?.addEventListener("mouseleave", () => {
  videoPreview.removeEventListener("timeupdate", loopVideo);
  videoPreview.pause();
});

const modal = document.getElementById("videoModal");
const modalIframe = modal?.querySelector("iframe");
const closeModal = modal?.querySelector(".close");

videoCard?.addEventListener("click", () => {
  modal.style.display = "flex";
  modalIframe.src = "https://player.vimeo.com/video/1064664519?autoplay=1";
});

closeModal?.addEventListener("click", () => {
  modal.style.display = "none";
  modalIframe.src = "";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    modalIframe.src = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".squad-carousel");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let cards = Array.from(document.querySelectorAll(".squad-card"));
  let index = 1;
  let firstClone, lastClone;

  function initCarousel() {
    const existingFirstClone = document.getElementById("first-clone");
    const existingLastClone = document.getElementById("last-clone");
    if (existingFirstClone) existingFirstClone.remove();
    if (existingLastClone) existingLastClone.remove();

    cards = Array.from(document.querySelectorAll(".squad-card"));
    index = 1;
    firstClone = null;
    lastClone = null;

    if (window.innerWidth >= 768) {
      carousel.style.display = "grid";
      carousel.style.transform = "none";
      carousel.style.transition = "none";
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }

    carousel.style.display = "flex";
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";

    firstClone = cards[0].cloneNode(true);
    lastClone = cards[cards.length - 1].cloneNode(true);
    firstClone.id = "first-clone";
    lastClone.id = "last-clone";
    carousel.appendChild(firstClone);
    carousel.prepend(lastClone);

    cards = Array.from(document.querySelectorAll(".squad-card"));

    function getCardWidth() {
      if (window.innerWidth >= 480 && window.innerWidth < 768) {
        return 50; 
      }
      return 100; 
    }

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth + 16; 
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    function jumpToRealSlide() {
      const cardWidth = cards[0].offsetWidth + 16;
      if (index >= cards.length - 1) {
        carousel.style.transition = "none";
        index = 1;
        carousel.style.transform = `translateX(-${index * cardWidth}px)`;
      } else if (index <= 0) {
        carousel.style.transition = "none";
        index = cards.length - 2;
        carousel.style.transform = `translateX(-${index * cardWidth}px)`;
      }
    }

    nextBtn.onclick = () => {
      if (index < cards.length - 1) {
        index++;
        updateCarousel();
      }
    };

    prevBtn.onclick = () => {
      if (index > 0) {
        index--;
        updateCarousel();
      }
    };

    carousel.removeEventListener("transitionend", jumpToRealSlide);
    carousel.addEventListener("transitionend", jumpToRealSlide);

    carousel.style.transform = `translateX(-${index * getCardWidth()}%)`;
  }

  initCarousel();
  window.addEventListener("resize", initCarousel);
});

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounter(counter) {
  let target = +counter.getAttribute("data-target");
  let startTime = null;

  let duration = Math.max(2000, Math.min(4000, 800 + target * 4));

  function updateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = (timestamp - startTime) / duration;
    if (progress > 1) progress = 1;

    let easedProgress = easeOutExpo(progress);
    let value = Math.round(easedProgress * target);

    if (value !== +counter.textContent) {
      counter.textContent = value.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(updateCounter);
}

function onIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}

let observer = new IntersectionObserver(onIntersection, {
  threshold: 0.5,
});

document.querySelectorAll(".counter-item span").forEach((counter) => {
  observer.observe(counter);
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".hero-card");

  function isTablet() {
    return window.innerWidth >= 768;
  }

  function setInitialState() {
    if (!isTablet()) return;

    cards.forEach((card, index) => {
      if (index === 0) {
        card.style.width = "52%";
      } else {
        card.style.width = "16%";
      }
    });
  }

  function handleHover(index) {
    if (!isTablet()) return;

    cards.forEach((card, i) => {
      card.style.transition = "width 0.3s ease";
      card.style.width = i === index ? "52%" : "16%";
    });
  }

  function resetOnResize() {
    if (!isTablet()) {
      cards.forEach((card) => (card.style.width = ""));
    } else {
      setInitialState();
    }
  }

  setInitialState();

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => handleHover(index));
  });

  window.addEventListener("resize", resetOnResize);
});
