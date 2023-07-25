const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const updateBoard = (index, symbol) => {
    board[index] = symbol;
  };

  return { getBoard, updateBoard };
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
  const putSymbol = (cell) => {
    if (cell.classList.contains("x") || cell.classList.contains("o")) {
      return;
    } else {
      cell.classList.add(symbol);
      gameBoard.updateBoard(
        Array.from(cell.parentNode.children).indexOf(cell), // Get the index of the cell in its parent
        symbol
      );
      changeSymbol();
    }
  };

  //adds event listeners
  const clickHandle = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        putSymbol(cell);
      });
    });
  };

  const winningCond = () => {};

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    cells.forEach((element, index) => {
      const className = board[index];
      if (className !== "") {
        element.classList.add(className);
      }
    });
  };
  clickHandle();
  return { renderBoard };
})();

DisplayController.renderBoard();
