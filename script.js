const gameState = (() => {
  // See displayController.handleBtnClick for explanation of why starting position is 'x' and not 'o'.
  const playerSymbol = "x";
  return { playerSymbol };
})();

const gameBoard = (() => {
  const boardCells = [];

  const resetBoardCells = () => {
    boardCells.length = 0;
  };
  const renderBoardCellsArray = () => {
    for (let currentCell = 0; currentCell < 9; currentCell += 1) {
      // child selector start from 1, but js arrays start from 0;
      const currentCellChild = currentCell + 1;
      const currentCellElement = document.querySelector(
        `#game-board>button:nth-child(${currentCellChild})`
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
  
      winning positions
  
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

  return { whoWon, move, resetBoardCells };
})();

const displayController = (() => {
  const cellButtonNodeList = document.querySelectorAll("#game-board>button");
  const endGameScreenElement = document.querySelector("#end-game");
  const winnerParagraphElement = document.querySelector("#winner");

  const playersSpan = [];
  playersSpan[0] = document.querySelector("span#player-one-name");
  playersSpan[1] = document.querySelector("span#player-two-name");

  function setupContinueBtn() {
    function handleClickContinue() {
      displayController.resetGame();
      endGameScreenElement.classList.add("hidden");
    }

    const continueBtnElement = document.querySelector("#continueBtn");
    continueBtnElement.addEventListener("click", handleClickContinue);
  }

  function resetGame() {
    gameBoard.resetBoardCells();
    cellButtonNodeList.forEach((cell) => {
      cell.disabled = "";
      cell.textContent = "";
    });
  }

  function handleCellClick() {
    const playerOneScoreElement = document.querySelector("#player-one-score");
    const playerTwoScoreElement = document.querySelector("#player-two-score");

    let currentPlayerSymbol = "";
    this.disabled = "disabled";

    if (gameState.playerSymbol === "x") currentPlayerSymbol = "o";
    if (gameState.playerSymbol === "o") currentPlayerSymbol = "x";

    const position = this.getAttribute("data-cell-position");

    gameBoard.move(currentPlayerSymbol, position);
    const winner = gameBoard.whoWon();

    if (winner !== null) {
      if (winner === "o") {
        playerOneScoreElement.textContent =
          parseInt(playerOneScoreElement.textContent, 10) + 1;
        winnerParagraphElement.textContent = playersSpan[0].textContent;
      } else if (winner === "x") {
        playerTwoScoreElement.textContent =
          parseInt(playerTwoScoreElement.textContent, 10) + 1;
        winnerParagraphElement.textContent = playersSpan[1].textContent;
      }
      cellButtonNodeList.forEach((button) => {
        button.disabled = "disabled";
      });
      endGameScreenElement.classList.remove("hidden");
    } else {
      (function detectTie() {
        let isTie = true;
        cellButtonNodeList.forEach((cell) => {
          if (!cell.disabled) isTie = false;
        });
        if (isTie) {
          endGameScreenElement.classList.remove("hidden");
          winnerParagraphElement.textContent = "Nobody";
        }
      })();
    }

    gameState.playerSymbol = currentPlayerSymbol;
  }

  const addEventListenerToButtons = () => {
    cellButtonNodeList.forEach((button) => {
      button.addEventListener("click", handleCellClick);
    });
  };

  function startGameOnSubmit() {
    function handleLetsPlayBtnClick(e) {
      const gameBoardElement = document.querySelector("#game-board");
      const scoreboardElement = document.querySelector("#scoreboard");
      const formElement = document.querySelector("form");
      e.preventDefault();

      const playersInputForm = [];

      playersInputForm[0] = document.querySelector(
        "#form-player-one-name"
      ).value;
      playersInputForm[1] = document.querySelector(
        "#form-player-two-name"
      ).value;

      playersSpan[0].textContent = playersInputForm[0];
      playersSpan[1].textContent = playersInputForm[1];

      formElement.classList.add("hidden");
      gameBoardElement.classList.remove("hidden");
      scoreboardElement.classList.remove("hidden");

      addEventListenerToButtons();
      setupContinueBtn();
    }
    const letsPlayBtn = document.querySelector("#submit-form");
    letsPlayBtn.addEventListener("click", handleLetsPlayBtnClick);
  }

  return { startGameOnSubmit, resetGame };
})();

displayController.startGameOnSubmit();
