const gameState = (() => {
  const cellButtonNodeList = document.querySelectorAll("#gameBoard>button");

  // See displayController.handleBtnClick for explanation of why
  const playerSymbol = "x";
  return { playerSymbol, cellButtonNodeList };
})();

const playerFactory = (() => {
    const playerSymbol = 'x';
    
})

const gameBoard = (() => {
  const boardCells = [];
  const renderBoardCellsArray = () => {
    for (let currentCell = 0; currentCell < 9; currentCell += 1) {
      // child selector start from 1, but js arrays start from 0;
      const currentCellChild = currentCell + 1;
      const currentCellElement = document.querySelector(
        `button:nth-child(${currentCellChild})`
      );
      currentCellElement.textContent = boardCells[currentCell];
    }
  };

  const move = (symbol, position) => {
    boardCells[position] = symbol;
    renderBoardCellsArray();
  };
  const whoWon = () => {
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
      if (boardCells[currentRow] !== undefined) {
        if (
          boardCells[currentRow] === boardCells[currentRow + 1] &&
          boardCells[currentRow] === boardCells[currentRow + 2]
        ) {
          return boardCells[currentRow];
        }
      }
      /*
        
        0, 3, 6
        1, 4, 7
        2, 5, 8
  
        below is code that matches the above pattern
      */
      if (boardCells[i] !== undefined) {
        if (
          boardCells[i] === boardCells[i + 3] &&
          boardCells[i] === boardCells[i + 6]
        ) {
          return boardCells[i];
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
      boardCells[0] === boardCells[4] &&
      boardCells[0] === boardCells[8] &&
      boardCells[0] !== undefined
    ) {
      return boardCells[0];
    }

    if (
      boardCells[2] === boardCells[4] &&
      boardCells[4] === boardCells[6] &&
      boardCells[2] !== undefined
    ) {
      return boardCells[2];
    }

    return null;
  };

  return { whoWon, move };
})();

const displayController = (() => {
  function handleBtnClick() {
    let currentPlayerSymbol = "";
    this.disabled = "disabled";
    if (gameState.playerSymbol === "x") currentPlayerSymbol = "o";
    if (gameState.playerSymbol === "o") currentPlayerSymbol = "x";

    const position = this.getAttribute("data-cell-position");

    gameBoard.move(currentPlayerSymbol, position);
    const winner = gameBoard.whoWon();

    if (winner !== null) {
      alert(`${winner} is the winner!`);
      gameState.cellButtonNodeList.forEach(button => {
        button.disabled = "disabled";
      });
    }

    gameState.playerSymbol = currentPlayerSymbol;
  }

  const addEventListenerToButtons = () => {
    gameState.cellButtonNodeList.forEach((button) => {
      button.addEventListener("click", handleBtnClick);
    });
  };
  return { addEventListenerToButtons };
})();

displayController.addEventListenerToButtons();
