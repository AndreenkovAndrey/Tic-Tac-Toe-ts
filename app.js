var cells = document.querySelectorAll(".cell");
var button = document.getElementById("resetButton");
var turnTitel = document.querySelector("h1");
var winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];
var gameState = {
    currentPlayer: "X",
    counter: 0,
    gameOn: true,
};
var changeTurnTitel = function () { return gameState.currentPlayer + "'s turn"; };
cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        cellClickHandler(cell);
    });
});
button.addEventListener("click", function () {
    resetGame();
});
var changePlayer = function () {
    return (gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X");
};
var cellClickHandler = function (cell) {
    if (cell.textContent && !gameState.gameOn)
        return;
    cell.textContent = gameState.currentPlayer;
    changePlayer();
    turnTitel.textContent = changeTurnTitel();
    gameState.counter++;
    if (gameState.counter < 4)
        return;
    if (checkForWinner(cells)) {
        changePlayer();
        turnTitel.textContent = gameState.currentPlayer + "'s WIN!";
        gameState.gameOn = false;
    }
    if (gameState.counter !== 9)
        return;
    turnTitel.textContent = "Draw!";
    gameState.gameOn = false;
};
var clearCells = function () {
    return cells.forEach(function (cell) {
        cell.textContent = "";
    });
};
var resetGame = function () {
    clearCells();
    gameState.currentPlayer = "X";
    turnTitel.textContent = changeTurnTitel();
    gameState.counter = 0;
    gameState.gameOn = true;
};
var checkForWinner = function (cells) {
    for (var _i = 0, winCombinations_1 = winCombinations; _i < winCombinations_1.length; _i++) {
        var winCombo = winCombinations_1[_i];
        if (cells[winCombo[0]].textContent == cells[winCombo[1]].textContent &&
            cells[winCombo[1]].textContent == cells[winCombo[2]].textContent &&
            cells[winCombo[0]].textContent != "") {
            return true;
        }
    }
    return false;
};
