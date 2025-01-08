const menuBtn = document.querySelector(".menu");
const menu = document.querySelector("nav");
const closeMenuBtn = document.querySelector(".close-menu");
const overlay = document.querySelector(".overlay");
const backgroundContent = document.querySelector(".background-content");
const navLinksParent = document.querySelector("nav");
const navLinks = document.querySelectorAll(".navItem");

const closeMobileMenu = () => {
  menu.classList.toggle("show");
  menu.removeAttribute("inert");
  overlay.classList.toggle("show");
  overlay.setAttribute("inert", "true");
  menuBtn.classList.toggle("hide");
};

const openMobileMenu = () => {
  menu.classList.toggle("show");
  menu.removeAttribute("inert");
  overlay.classList.toggle("show");
  overlay.removeAttribute("inert");
  menuBtn.classList.toggle("hide");
};

navLinksParent.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target.closest(".navItem");
  if (target) {
    navLinks.forEach((link) => {
      console.log(link);
      if (link === target) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
});

menuBtn.addEventListener("click", () => openMobileMenu());

closeMenuBtn.addEventListener("click", () => closeMobileMenu());

overlay.addEventListener("click", () => closeMobileMenu());
