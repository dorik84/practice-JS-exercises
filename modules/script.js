const addNewButton = document.querySelector("#add");
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancel");
const form = document.querySelector("form");
const tableBody = document.querySelector("table tbody");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const openModal = () => {
  dialog.showModal();
};

const clearForm = () => {
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
};

const formValidation = () => {};

const populateTable = (name, email, message) => {
  const row = tableBody.insertRow();
  row.insertCell().innerHTML = name;
  row.insertCell().innerHTML = email;
  row.insertCell().innerHTML = message;
};
addNewButton.addEventListener("click", openModal);

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameValue = nameInput.value;
  let emailValue = emailInput.value;
  let msgValue = messageInput.value;

  formValidation(nameValue, emailValue, msgValue);
  populateTable(nameValue, emailValue, msgValue);
  clearForm();
  dialog.close();
});
