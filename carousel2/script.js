const fetchCarouselData = () => {
  return new Promise((res, rej) =>
    setTimeout(() => {
      res([
        "https://www.imgonline.com.ua/examples/orange-flowers.jpg",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1800&h=1000&s=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/bb/a3/96/the-haunted-hotel-attraction.jpg?w=1600&h=900&s=1",
      ]);
    }, 500)
  );
};

let currentSlideIndex = 0;
const slideTemplate = document.querySelector("#slide-template");
const slider = document.querySelector("#slider");

const dotTemplate = document.querySelector("#dot-template");
const navigators = document.querySelector(".navigators");

const navButtons = document.querySelector(".nav-buttons");

const afterCaroselDatsFetch = () => {
  const dot = navigators.querySelector(".dot");
  if (!dot) return;
  dot.classList.add("active");
};

// FETCH SLIDES DATA AND RENDER
fetchCarouselData().then((data) => {
  console.log(data);
  slider.innerHTML = "";

  data.forEach((url, index) => {
    //slides
    const slideContent = slideTemplate.content.cloneNode(true);
    const slide = slideContent.querySelector(".slide");

    // add placeholders until images loaded
    slide.innerHTML = "Loading";
    slider.appendChild(slide);

    const imgTag = document.createElement("img");
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imgTag.src = img.src;
      slide.innerHTML = "";
      slide.appendChild(imgTag);
    };

    //dots
    const dotContent = dotTemplate.content.cloneNode(true);
    const dot = dotContent.querySelector(".dot");
    dot.setAttribute("aria-label", `Go to image # ${index + 1}`);
    navigators.appendChild(dot);
  });

  afterCaroselDatsFetch();
});

// PREV NEXT Buttons
navButtons.addEventListener("click", (e) => {
  const slides = slider.children;
  if (e.target.closest("#next")) {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  } else {
    currentSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
  }
  slides[currentSlideIndex].scrollIntoView();
  selectDot(currentSlideIndex);
});

// DOTS
navigators.addEventListener("click", (e) => {
  const dots = navigators.querySelectorAll(".dot");
  currentSlideIndex = Array.from(dots).indexOf(e.target);
  const slides = slider.children;
  slides[currentSlideIndex].scrollIntoView();

  selectDot(currentSlideIndex);
});

const selectDot = (index) => {
  const dots = navigators.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};

// adjust slides when window resized
window.addEventListener("resize", () => {
  debouncedResize();
});

const debounced = (f, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => f(), delay);
  };
};

const debouncedResize = debounced(() => {
  const slides = slider.children;
  slides[currentSlideIndex].scrollIntoView();
}, 200);
