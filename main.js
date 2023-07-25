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
  const displayText = document.querySelector("h2");
  const resetButton = document.querySelector("button");

  const resetBoard = () => {
    cells.forEach((cell) => {
      cell.classList.remove("x", "o");
    });
    displayText.innerText = "";
    resetButton.style.display = "none";
    gameBoard.resetBoard();
  };

  const changeSymbol = () => {
    symbol = symbol === "x" ? "o" : "x"; // Toggle between "x" and "o"
  };

  const displayBlockedAccess = () => {
    cells.forEach((cell) => {
      cell.style.cursor = "not-allowed";
    });
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
        if (board[a] === "x") {
          displayText.innerText = `${playerOne.name} wins!`;
          resetButton.style.display = "block";
          displayBlockedAccess();
          return;
        } else {
          displayText.innerText = `${playerTwo.name} wins!`;
          resetButton.style.display = "block";
          displayBlockedAccess();
          return;
        }
      }
    }
    if (board.every((cell) => cell !== "")) {
      displayText.innerText = "It's a draw!";
      resetButton.style.display = "block";
      displayBlockedAccess();
    }
  };

  //puts symbols and checks if a cell already has a symbol
  const putSymbol = (cell) => {
    if (cell.classList.contains("x") || cell.classList.contains("o")) {
      return;
    } else if (displayText.innerText !== "") {
      return; // Game has ended, return early to prevent further input
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
    resetButton.addEventListener("click", resetBoard);
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
