const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

document.addEventListener("DOMContentLoaded", () => {
  disableIfLast();
  disableIifFirst();
});

window.addEventListener("resize", () => {
  slider.children[activeSlideIndex].scrollIntoView({ behavior: "instant", block: "start" });
});

let activeSlideIndex = 0;

const nextIndex = () => {
  if (activeSlideIndex < slider.children.length - 1) {
    activeSlideIndex++;
  }
};
const prevIndex = () => {
  if (activeSlideIndex > 0) {
    activeSlideIndex--;
  }
};

const disableIfLast = () => {
  if (activeSlideIndex === slider.children.length - 1) {
    nextBtn.setAttribute("disabled", true);
  } else {
    nextBtn.removeAttribute("disabled");
  }
};
const disableIifFirst = () => {
  if (activeSlideIndex === 0) {
    prevBtn.setAttribute("disabled", true);
  } else {
    prevBtn.removeAttribute("disabled");
  }
};

const showSlide = () => {
  slider.children[activeSlideIndex].scrollIntoView({ behavior: "smooth", block: "start" });
};

document.querySelector(".controls").addEventListener("click", (e) => {
  if (e.target.classList.contains("next")) {
    nextIndex();
  } else if (e.target.classList.contains("prev")) {
    prevIndex();
  }
  disableIfLast();
  disableIifFirst();
  showSlide();
});
