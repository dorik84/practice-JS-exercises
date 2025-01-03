const URL = "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
const tableData = [];

const getCoordinates = (htmlTable) => {
  const rows = htmlTable.querySelectorAll("tr");
  rows.forEach((row, index) => {
    if (index === 0) {
      return;
    }
    const cells = row.querySelectorAll("td");
    const rowData = [];
    cells.forEach((cell) => {
      let value = cell.textContent.trim();
      if (!isNaN(Number(value))) {
        value = Number(value);
      }

      rowData.push(value);
    });
    tableData.push(rowData);
  });

  return tableData;
};

const getTableDOM = (responseTxt) => {
  const dom = new JSDOM(responseTxt);
  const document = dom.window.document;
  return document.querySelector("table");
};

const composeStrToPrint = (coordinates) => {
  coordinates.sort((a, b) => {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });
  console.log(coordinates);
  // printing from top to buttom, left to right
  let rowNum = -1;
  let result = "";
  let row = "";

  for (let [x, character, y] of coordinates) {
    if (y !== rowNum) {
      rowNum = y;
      console.log(row);
      result += row + "\n";
      row = "";
    }
    console.log(x, row.length);
    row += " ".repeat(x - row.length) + character;
  }
  result += row + "\n";
  return result;
};

const fetchHtml = async (url) => {
  const response = await fetch(url);
  return await response.text();
};

const main = async (url) => {
  const html = await fetchHtml(url);

  const table = getTableDOM(html);
  const coordinates = getCoordinates(table);
  const str = composeStrToPrint(coordinates);
  console.log(str);
};
main(URL);
