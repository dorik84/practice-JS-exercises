const switchSign = () => {
  let sign = "X";
  return () => {
    if (sign == "X") sign = "O";
    else {
      sign = "X";
    }
    return sign;
  };
};
const getSign = switchSign();

document.querySelector(".field").addEventListener("click", (e) => {
  if (isWinner()) return;
  if (!e.target.closest(".cell")) return;
  if (e.target.innerHTML != "") return;
  e.target.innerHTML = getSign();
  checkWinner();
});

const winnerH2 = document.querySelector("#winner");
const isWinner = () => {
  return winnerH2.innerHTML != "";
};
const showWinner = (sign) => {
  winnerH2.innerHTML = sign + " wins";
};

const resetBtn = document.querySelector("#reset");
const reset = () => {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  winnerH2.innerHTML = "";
};
resetBtn.addEventListener("click", reset);

const checkWinner = () => {
  let [one, two, three, four, five, six, seven, eight, nine] = document.querySelectorAll(".cell");
  let combinations = [
    [one, two, three],
    [four, five, six],
    [seven, eight, nine],
    [one, four, seven],
    [two, five, eight],
    [three, six, nine],
    [one, five, nine],
    [three, five, seven],
  ];
  for (let i = 0; i < combinations.length; i++) {
    if (combinations[i][0].innerHTML == "") continue;
    if (combinations[i][1].innerHTML == "") continue;
    if (combinations[i][2].innerHTML == "") continue;
    if (combinations[i][0].innerHTML == combinations[i][1].innerHTML && combinations[i][1].innerHTML == combinations[i][2].innerHTML) {
      showWinner(combinations[i][2].innerHTML);
      return;
    }
    combinations.splice(i, 1);
  }
};
