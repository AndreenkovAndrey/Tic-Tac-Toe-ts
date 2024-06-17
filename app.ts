const cells: NodeListOf<Element> = document.querySelectorAll(".cell");
const button: HTMLElement = document.getElementById("resetButton")!;
const turnTitle: HTMLHeadingElement = document.querySelector("h1")!;
const winCombinations: Array<number[]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];


type GameState = {
  currentPlayer: "X" | "O",
  counter: number,
  gameOn: boolean
}

let gameState: GameState = {
  currentPlayer: "X",
  counter: 0,
  gameOn: true,
};

const changeTurnTitle = (): string => gameState.currentPlayer + "'s turn";

cells.forEach((cell: Element) => {
  cell.addEventListener("click", () : void => {
    cellClickHandler(cell);
  });
});

button.addEventListener("click", (): void => {
  resetGame();
});

const changePlayer = (): string =>
  (gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X");

const cellClickHandler = (cell: Element) => {
  if (cell.textContent && !gameState.gameOn) return;
  cell.textContent = gameState.currentPlayer;
  changePlayer();
  turnTitle.textContent = changeTurnTitle();
  gameState.counter++;

  if (gameState.counter < 4) return;

  if (checkForWinner(cells)) {
    changePlayer();
    turnTitle.textContent = gameState.currentPlayer + "'s WIN!";
    gameState.gameOn = false;
  }
  if (gameState.counter !== 9) return;
  turnTitle.textContent = "Draw!";
  gameState.gameOn = false;
};

const clearCells = (): void =>
  cells.forEach((cell) => {
    cell.textContent = "";
  });

const resetGame = (): void => {
  clearCells();
  gameState.currentPlayer = "X";
  turnTitle.textContent = changeTurnTitle();
  gameState.counter = 0;
  gameState.gameOn = true;
};

const checkForWinner = (cells: NodeListOf<Element>) => {
  for (let winCombo of winCombinations) {
    if (
      cells[winCombo[0]].textContent == cells[winCombo[1]].textContent &&
      cells[winCombo[1]].textContent == cells[winCombo[2]].textContent &&
      cells[winCombo[0]].textContent != ""
    ) {
      return true;
    }
  }
  return false;
};
