// Gameboard module
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const getBoard = () => board;
  
    const updateBoard = (index, marker) => {
      if (board[index] === '') {
        board[index] = marker;
        return true;
      }
      return false;
    };
  
    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    };
  
    return { getBoard, updateBoard, resetBoard };
  })();
  
  // Render the gameboard
  function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    const board = Gameboard.getBoard();
  
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }
  
  // Player factory function
  const Player = (name, marker) => {
    return { name, marker };
  };
  
  // Game module
  const Game = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let gameOver = false;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const handleCellClick = (event) => {
      if (gameOver) return;
  
      const cellIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
      if (Gameboard.updateBoard(cellIndex, currentPlayer.marker)) {
        renderBoard();
        if (checkForWin()) {
          displayResult(`${currentPlayer.name} wins!`);
          gameOver = true;
        } else if (checkForTie()) {
          displayResult("It's a tie!");
          gameOver = true;
        } else {
          switchPlayer();
        }
      }
    };
  
    const checkForWin = () => {
      const board = Gameboard.getBoard();
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
          return true;
        }
      }
  
      return false;
    };
  
    const checkForTie = () => {
      const board = Gameboard.getBoard();
      return board.every((cell) => cell !== '');
    };
  
    const displayResult = (message) => {
      const resultElement = document.getElementById('result');
      if (message.includes('wins')) {
        const winningPlayer = currentPlayer === player1 ? player2 : player1;
        resultElement.textContent = `${winningPlayer.name} wins!`;
      } else {
        resultElement.textContent = message;
      }
    };
  
    const getPlayerNames = () => {
      const player1Name = document.getElementById('player1-name').value || 'Player 1';
      const player2Name = document.getElementById('player2-name').value || 'Player 2';
      player1.name = player1Name;
      player2.name = player2Name;
    };
  
    const handleStartClick = () => {
      getPlayerNames();
      reset();
    };
  
    const handleResetClick = () => {
      reset();
    };
  
    const initialize = () => {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
      });
  
      const resetButton = document.getElementById('reset-button');
      resetButton.addEventListener('click', handleResetClick);
    };
  
    const reset = () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      gameOver = false;
      renderBoard();
      displayResult('');
    };
  
    return { initialize, reset };
  })();
  
  Game.initialize(); // Initialize the game event listeners
  