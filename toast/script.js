const btn = document.querySelector("#flash-toast");
const toast = document.querySelector(".toastWrapper");
const toastTemplate = document.querySelector("#toast-template");
const position = document.querySelector("#notification-position");

const addNotification = () => {
  const id = Math.round(Math.random() * 1000);
  const clone = toastTemplate.content.cloneNode("true");
  clone.firstElementChild.id = `toast${id}`;
  clone.firstElementChild.querySelector("p").innerHTML = `Toast ${id}`;
  position.insertBefore(clone, position.firstChild);

  const toast = position.querySelector(`#toast${id}`);
  setTimeout(() => toast.classList.add("show"), 200);
  setTimeout(() => position.removeChild(toast), 5000);
};
btn.addEventListener("click", addNotification);

position.addEventListener("click", (e) => {
  if (e.target.closest(".close")) {
    position.removeChild(e.target.closest(".toastWrapper"));
  }
});

// ##############

const dialog = document.querySelector("dialog");
const btnDialog = document.querySelector("#flash-dialog");

btnDialog.addEventListener("click", () => {
  dialog.show();

  setTimeout(() => dialog.querySelector(".dialogWrapper").classList.add("show"), 200);
});

dialog.querySelector(".close").addEventListener("click", () => {
  dialog.close();
  dialog.querySelector(".dialogWrapper").classList.remove("show");
});
