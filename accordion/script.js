const texts = document.querySelectorAll(".text");
const accordion = document.querySelector(".accordion");
const checkbox = document.querySelector("#checkbox");
const upArrows = document.querySelectorAll(".up");
const downArrows = document.querySelectorAll(".down");

const hideAllTexts = () => {
  texts.forEach((text) => {
    text.classList.remove("show");
  });
};

const hideAllArrows = () => {
  downArrows.forEach((arrow) => {
    arrow.classList.add("hidden");
  });
  upArrows.forEach((arrow) => {
    arrow.classList.remove("hidden");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  hideAllTexts();
  hideAllArrows();
});

accordion.addEventListener("click", (e) => {
  // Find the closest parent with class 'title'
  const titleElement = e.target.closest(".title");

  // If click wasn't on or within a title element, return
  if (!titleElement) return;

  if (!checkbox.checked) {
    hideAllTexts();
    hideAllArrows();
  }

  const up = titleElement.querySelector(".up");
  const down = titleElement.querySelector(".down");
  console.log(up, down);
  if (titleElement.classList.contains("active")) {
    titleElement.classList.remove("active");
    titleElement.parentElement.querySelector(".text").classList.remove("show");
    down.classList.add("hidden");
    up.classList.remove("hidden");
  } else {
    titleElement.classList.add("active");
    titleElement.parentElement.querySelector(".text").classList.add("show");
    down.classList.remove("hidden");
    up.classList.add("hidden");
  }
});
