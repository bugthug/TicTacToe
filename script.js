const gameBoard = (() => {
  const boardCells = [];

  return { boardCells };
})();

function renderBoardCellsArray() {
  for (let currentCell = 0; currentCell < 9; currentCell += 1) {
    // child selector start from 1, but js arrays start from 0;
    const currentCellChild = currentCell + 1;
    const currentCellElement = document.querySelector(
      `button:nth-child(${currentCellChild})`
    );
    currentCellElement.textContent = gameBoard.boardCells[currentCell];
  }
}

function whoWon() {
  for (let i = 0; i < 3; i += 1) {
    const currentRow = i * 3;

    /*
    first if condition prevents an issue where 3 undefined values are considered
    a win condition

    The win conditions for a row requires one of the following 
    positions to be of equal (symbol) value
    
     win conditions matched here are:
     0, 1, 2
     3, 4, 5
     6, 7, 8
    */
    if (gameBoard.boardCells[currentRow] !== undefined) {
      if (
        gameBoard.boardCells[currentRow] ===
          gameBoard.boardCells[currentRow + 1] &&
        gameBoard.boardCells[currentRow] ===
          gameBoard.boardCells[currentRow + 2]
      ) {
        return gameBoard.boardCells[currentRow];
      }
    }
    /*
      
      0, 3, 6
      1, 4, 7
      2, 5, 8

      below is code that matches the above pattern
    */
    if (gameBoard.boardCells[i] !== undefined) {
      if (
        gameBoard.boardCells[i] === gameBoard.boardCells[i + 3] &&
        gameBoard.boardCells[i] === gameBoard.boardCells[i + 6]
      ) {
        return gameBoard.boardCells[i];
      }
    }
  }

  /*
    Checking diagonals is done manually since there is  
    no easily discernable mathematical pattern

    winning positions (see previous comment)

    0, 4, 8
    2, 4, 6
    */
  if (
    gameBoard.boardCells[0] === gameBoard.boardCells[4] &&
    gameBoard.boardCells[0] === gameBoard.boardCells[8] &&
    gameBoard.boardCells[0] !== undefined
  ) {
    return gameBoard.boardCells[0];
  }

  if (
    gameBoard.boardCells[2] === gameBoard.boardCells[4] &&
    gameBoard.boardCells[4] === gameBoard.boardCells[6] &&
    gameBoard.boardCells[2] !== undefined
  ) {
    return gameBoard.boardCells[2];
  }

  return null;
}

function addEventListenerToCells() {
  const cellButtonNodeList = document.querySelectorAll("#gameBoard>button");

  function move(symbol, position) {
    gameBoard.boardCells[position] = symbol;
    renderBoardCellsArray();
  }

  let prevPlayerSymbol = "x";
  let currentPlayerSymbol = "";
  function handleBtnClick() {
    this.disabled = "disabled";
    if (prevPlayerSymbol === "x") currentPlayerSymbol = "o";
    if (prevPlayerSymbol === "o") currentPlayerSymbol = "x";

    const position = this.getAttribute("data-cell-position");

    move(currentPlayerSymbol, position);
    const winner = whoWon();

    if (winner !== null) {
      alert(`${winner} is the winner!`);
      cellButtonNodeList.forEach((button) => {
        button.disabled = "disabled";
      });
    }

    prevPlayerSymbol = currentPlayerSymbol;
  }

  cellButtonNodeList.forEach((button) => {
    button.addEventListener("click", handleBtnClick);
  });
}

addEventListenerToCells();
