const navMenu = document.querySelector("nav");
const main = document.querySelector("main");

const navIcon = document.querySelector("#menu-icon");

const swapMenuIcons = () => {
  const iconPath = navIcon.querySelector("#svg-icon path");
  const iconMenuPath = navIcon.querySelector("#svg-menu-icon path");
  const iconClosePath = navIcon.querySelector("#svg-close-icon path");
  let open = false;
  return () => {
    if (open) {
      iconPath.setAttribute("d", iconMenuPath.getAttribute("d"));
      open = false;
      return;
    }
    iconPath.setAttribute("d", iconClosePath.getAttribute("d"));
    open = true;
  };
};
const swapIcons = swapMenuIcons();

navIcon.addEventListener("click", () => {
  if (navMenu.classList.contains("show")) {
    navMenu.classList.remove("show");
  } else {
    navMenu.classList.add("show");
  }
  swapIcons();
});

main.addEventListener("click", () => {
  if (!navMenu.classList.contains("show")) return;
  navMenu.classList.remove("show");
  swapIcons();
});
