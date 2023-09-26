let isPlaying = false;
let winner = "";
let currentPlayer = "X";
let xPlayerTurnMessage = "X's turn";
let oPlayerTurnMessage = "O's turn";

let xImageSource =
  "images/X.png";
let oImageSource =
  "images/O.png";

let current_board = ["", "", "", "", "", "", "", "", ""];
document.querySelector("#reset-button").addEventListener("click", resetGame);
renderBoard(current_board);
renderMessage(xPlayerTurnMessage);
playGame();

function playGame() {
  isPlaying = true;
}

function checkWinner(board) {
  let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const i in winningCombination) {
    let [a, b, c] = winningCombination[i];
    if (board[a] === "" || board[b] === "" || board[c] === "") continue;
    if (board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
}


function handleClickEvent(cellIndex) {
  console.log("Cell index has been clicked: " + cellIndex);
  if (!isPlaying) return;
  if (current_board[cellIndex] === "") {
    current_board[cellIndex] = currentPlayer;
    renderBoard(current_board);
    let haswon = checkWinner(current_board);
    if (haswon) {
      playGameWonAnimation(currentPlayer);
      return;
    }
   let isDraw = checkForADraw(current_board);
   if(isDraw){
    playDrawAnimation();
    return;
   }
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  renderMessage(currentPlayer + "'s turn");
}



// View logic goes below this line



function getAllBoardCells() {
  return document.querySelectorAll(".cell");
}

function assignClickEventToCells() {
  getAllBoardCells().forEach((cell) => {
    cell.addEventListener("click", () => handleClickEvent(cell.id));
  });
}

function renderBoard(board) {
  let gameBoard = document.createElement("div");
  gameBoard.classList.add("game-board");

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    let element = document.createElement("img");
    if (board[i] === "X") {
      element.src = xImageSource;
    }
    if (board[i] === "O") {
      element.src = oImageSource;
    }
    element.classList.add("fit-image");
    element.classList.add("fade-in");
    element.classList.add("custom-cursor");
    cell.appendChild(element);
    gameBoard.appendChild(cell);
  }
  document.querySelector(".game").replaceChildren(gameBoard);
  assignClickEventToCells();
}

function renderMessage(message) {
  let messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = message;
  document.querySelector(".message").replaceChildren(messageElement);
}

function resetGame() {
  playGame();
  currentPlayer = "X";
  current_board = ["", "", "", "", "", "", "", "", ""];
  renderBoard(current_board);
  renderMessage(xPlayerTurnMessage);
  document.body.classList.remove("game_won_fire");
  document.body.classList.remove("game_won_water");
  document.body.classList.remove("game_draw");
  document.body.classList.remove("show_gradient");
  document.body.classList.add("game_restart");
}

function playGameWonAnimation(winner) {
  isPlaying = false;
  document.body.classList.remove("game_restart");

  if (winner === "X") {
    document.body.classList.add("game_won_fire");
  } else if (winner === "O") {
    document.body.classList.add("game_won_water");
  }
  renderMessage(currentPlayer + " has won!");
}

function checkForADraw(board){
  //Check if all the cells are filled
 return board.every(cell => cell !== "");
  
}

function playDrawAnimation(){
  isPlaying = false;
  document.body.classList.remove("game_restart");
  document.body.classList.add("show_gradient");
  renderMessage("It's a draw!");
}
