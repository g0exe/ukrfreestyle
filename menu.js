document.addEventListener("DOMContentLoaded", function () {
  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");
  const mobileMenu = document.querySelector(".header-mobile");
  const overlay = document.createElement("div"); 

  overlay.classList.add("menu-overlay");
  document.body.appendChild(overlay); 

  function openMenu() {
    mobileMenu.classList.add("active");
    overlay.classList.add("active"); 
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active"); 
  }

  menuOpen.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu); 
});
