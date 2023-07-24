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

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    cells.forEach((element, index) => {
      const className = board[index];
      if (className !== "") {
        element.classList.add(className);
      }
    });
  };

  const clickHandle = () => {};

  return { renderBoard };
})();

DisplayController.renderBoard();
