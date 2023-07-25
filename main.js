const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const updateBoard = (index, symbol) => {
    board[index] = symbol;
  };

  const resetBoard = () => {
    board.fill(""); // Reset the board array to empty strings
  };

  return { getBoard, updateBoard, resetBoard };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");
  let symbol = "x";
  const playerOne = Player("Player 1", "x");
  const playerTwo = Player("Player 2", "o");

  const resetBoard = () => {
    cells.forEach((cell) => {
      cell.classList.remove("x", "o");
    });
    gameBoard.resetBoard();
  };

  const changeSymbol = () => {
    symbol = symbol === "x" ? "o" : "x"; // Toggle between "x" and "o"
  };

  const winningCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // left column
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // top-left to bottom-right
    [2, 4, 6], // top-right to bottom-left
  ];

  const checkWinningComb = () => {
    const board = gameBoard.getBoard();
    for (const combinations of winningCombinations) {
      const [a, b, c] = combinations;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert(`${playerOne.name} wins!`);
        resetBoard();
        return;
      }
    }
    if (board.every((cell) => cell !== "")) {
      alert("It's a draw!");
      resetBoard();
    }
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
      checkWinningComb();
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
