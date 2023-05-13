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

function startGame() {
  function move(symbol, position) {
    gameBoard.boardCells[position] = symbol;
    renderBoardCellsArray();
  }

  function whoWon() {
    for (let i = 0; i < 3; i += 1) {
      const currentRow = i * 3;

      /* 
        The following 2 lines prevent an error where 3 matching undefined values
        are considered a win condition
      */

      if (gameBoard.boardCells[i] === undefined) break;
      if (gameBoard.boardCells[currentRow] === undefined) break;

      if (
        gameBoard.boardCells[currentRow] ===
          gameBoard.boardCells[currentRow + 1] &&
        gameBoard.boardCells[currentRow] ===
          gameBoard.boardCells[currentRow + 2]
      ) {
        return gameBoard.boardCells[currentRow];
      }

      /*
      The win conditions for a column requires one of the following 
      positions to be of equal (symbol) value
      0, 3, 6
      1, 4, 7
      2, 5, 8

      below is code that matches the above pattern
      */
      if (
        gameBoard.boardCells[i] === gameBoard.boardCells[i + 3] &&
        gameBoard.boardCells[i] === gameBoard.boardCells[i + 6]
      ) {
        return gameBoard.boardCells[i];
      }
    }

    /*
    Checking diagonals is done manually since there is  
    no easily discernable mathematical pattern

    winning positions (see previous comment)

    048
    246
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

  let currentPlayerSymbol = "o";
  let prevPlayerSymbol = "x";

  function getAndValidatePosition(symbol) {
    let positionValid = false;
    let position = "";

    while (!positionValid) {
      positionValid = true;
      position = prompt(`Player ${symbol} is playing. Choose your next move`);

      if (position === "") {
        alert("Position can not be empty");
        positionValid = false;
      }

      if (gameBoard.boardCells[position] !== undefined) {
        alert("Please enter a position which has not been entered");
        positionValid = false;
      }
    }
    return position;
  }

  // 9 is the maximum number of moves in TicTacToe
  for (let i = 0; i < 9; i += 1) {
    if (prevPlayerSymbol === "x") currentPlayerSymbol = "o";
    if (prevPlayerSymbol === "o") currentPlayerSymbol = "x";

    const position = getAndValidatePosition(currentPlayerSymbol);

    move(currentPlayerSymbol, position);

    const winner = whoWon();

    if (winner !== null) {
      alert(`${winner} is the winner!`);
      break;
    }

    prevPlayerSymbol = currentPlayerSymbol;
  }
}

function addEventListenerToCells() {
    function handleBtnClick() {
        
    }

    const cellButtonNodeList = document.querySelectorAll('.gameBoard>button');
    
    cellButtonNodeList.forEach(button => {
        button.addEventListener('click',handleBtnClick);
    });
}

startGame();
