const getSuggestions = (query) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(["apple", "app", "application"]), 1500);
  });
};

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((res, rej) => {
      timer = setTimeout(() => res(fn(...args)), delay);
    });
  };
};

const getSuggestionsDebounced = debounce(getSuggestions, 500);

const input = document.getElementById("input");
const suggestionsField = document.querySelector(".suggestions");

suggestionsField.addEventListener("click", (e) => {
  const clickedLi = e.target.closest("li");
  if (clickedLi) {
    input.value = clickedLi.innerHTML;
  }
  suggestionsField.innerHTML = "";
});

input.addEventListener("input", async (e) => {
  //validate,sanitise,limit

  const suggestions = await getSuggestionsDebounced(e.target.value);
  for (let suggestion of suggestions) {
    const li = document.createElement("li");
    li.innerHTML = suggestion;
    suggestionsField.appendChild(li);
  }
});

document.addEventListener("click", (e) => {
  if (e.target != e.target.closest("li")) {
    suggestionsField.innerHTML = "";
  }
});
