
  // Modal logic
  // Get the modal element
  var modal = document.getElementById("modal");

  // Get the start button element
  var startButton = document.getElementById("start-button");
  
  // Get the input field elements
  var player1Input = document.getElementById("player1-name");
  var player2Input = document.getElementById("player2-name");
  
  // Get the player name display elements
  var player1Name = document.getElementById("player1");
  var player2Name = document.getElementById("player2");  

// Add click event listener to the start button
startButton.addEventListener("click", function() {
  // Update the innerHTML of player name display elements
  player1Name.innerHTML = player1Input.value;
  player2Name.innerHTML = player2Input.value;
  let player1 = Player(player1Name.innerHTML, 'X');
  let player2 = Player(player2Name.innerHTML, 'O');
  // Hide the modal by adding a CSS class
  modal.classList.add("hide");
});

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
    let player1 = Player(player1Name, 'X');
    let player2 = Player(player2Name, 'O');
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
          switchPlayer();
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
      if ((message.includes('wins')) && currentPlayer == player1) {
        resultElement.textContent = `Player 2 wins!`;
      } else if ((message.includes('wins')) && currentPlayer == player2) {
        resultElement.textContent = `Player 1 wins!`;
      }
      else {
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
        if (document.getElementById('player1-name').value === '' || document.getElementById('player2-name').value === '') {
            alert('Please enter a name for each player.');
            return;
        }
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
  
