const gameBoard = (function() {
    'use strict'
    boardCells = [];
    function nextMove(cell) {};
    function endGame() {};

    return {nextMove}
})();

const playerFactory = function(symbol) {
    symbol = symbol.toLowerCase();
    if (symbol !== 'x' && symbol !== 'o') {
        throw "Invalid player symbol";
    }

    function sendMove() {}

    return {sendMove}
}

