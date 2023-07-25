const gameBoard = (() => {
  const board = ["", "", "", "x", "", "", "o", "", ""];

  const getBoard = () => board;

  return { getBoard };
})();

const Player = (playerName, symbol) => {
  return { playerName, symbol };
};

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");

  //pust symbols and checks if a cell already has a symbol
  const putSymbol = (cell, symbol) => {
    if (cell.classList.contains(symbol)) {
      return;
    } else cell.classList.add(symbol);
  };

  //adds event listeners
  const clickHandle = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        putSymbol(cell, "x");
      });
    });
  };

  const renderBoard = () => {
    clickHandle();
    const board = gameBoard.getBoard();
    cells.forEach((element, index) => {
      const className = board[index];
      if (className !== "") {
        element.classList.add(className);
      }
    });
  };
  return { renderBoard, clickHandle };
})();

DisplayController.renderBoard();
