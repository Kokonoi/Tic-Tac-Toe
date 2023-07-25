const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  return { getBoard };
})();

const Player = (playerName, symbol) => {
  return { playerName, symbol };
};

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");
  let symbol = "x";

  const changeSymbol = () => {
    symbol = symbol === "x" ? "o" : "x"; // Toggle between "x" and "o"
  };

  //puts symbols and checks if a cell already has a symbol
  const putSymbol = (cell, symbolClass) => {
    if (cell.classList.contains(symbolClass)) {
      return;
    } else {
      cell.classList.add(symbolClass);
      changeSymbol();
    }
  };

  //adds event listeners
  const clickHandle = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        putSymbol(cell, symbol);
      });
    });
  };

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    cells.forEach((element, index) => {
      const className = board[index];
      if (className !== "") {
        element.classList.add(className);
      }
    });
  };
  return { renderBoard };
})();

DisplayController.renderBoard();
