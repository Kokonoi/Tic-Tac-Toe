const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  return getBoard;
})();

const displayController = (() => {
  const cells = document.querySelectorAll(".cell");

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    cells.forEach((element, index) => {
      element.classList.add(board[index]);
    });
  };
  return { renderBoard };
})();
