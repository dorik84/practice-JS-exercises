const fetchData = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};
const pageSize = 10;
let currentPage = 1;
let currentData = [];
let fetchedData = [];

const nextBtn = document.querySelector("#next");
const table = document.querySelector("table tbody");
const thId = document.querySelector("table thead th#id");
const filter = document.querySelector("#body-filter");

nextBtn.addEventListener("click", () => {
  currentPage += 1;
  currentData = getdataPortion(currentPage, pageSize, fetchedData);
  populateTable(currentData);
});

//id sorting logic
let idOrder = "acs";
thId.addEventListener("click", () => {
  if (idOrder === "acs") {
    currentData.sort((a, b) => b.id - a.id);
    idOrder = "desc";
  } else {
    idOrder = "acs";
    currentData.sort((a, b) => a.id - b.id);
  }
  populateTable(currentData);
});

//filter logic
filter.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase().trim();

  if (value === "") return;
  const filteredData = currentData.filter((row) => row.body.toLowerCase().includes(value));
  populateTable(filteredData);
});

const populateTable = (data) => {
  table.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const row = table.insertRow();
    row.insertCell().textContent = data[i].id;
    row.insertCell().textContent = data[i].userId;
    row.insertCell().textContent = data[i].title;
    row.insertCell().textContent = data[i].body;
  }
};

const getdataPortion = (currentPage, pageSize, data) => {
  return data.slice(pageSize * (currentPage - 1), pageSize * currentPage);
};

fetchData().then((data) => {
  fetchedData = data;
  currentData = getdataPortion(currentPage, pageSize, data);
  populateTable(currentData);
});
