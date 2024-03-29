/*----- constants -----*/
const COLOR_LOOKUP = {
  '1': 'rgba(242, 225, 225, .96)',
  '-1': 'rgba(219, 121, 0, 0.86)',
  'null': 'transparent'
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board, turn, winner

/*----- cached element references -----*/
const message = document.querySelector('h2');
const playAgainBtn = document.querySelector('button');
// Note: Could also cache the <div> elements for the squares and avoid
//       the ids on them - like we did with the Connect-Four code-along

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);

/*----- functions -----*/
initialize();

// Initialize all state variables, then call render()
function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  // OR initialize like this:
  // board = new Array(9).fill(null);
  turn = 1;
  winner = null;
  button = null;
  render();
}

// Update all impacted state, then call render()
function handleMove(evt) {
  // obtain index of square
  const idx = parseInt(evt.target.id.replace('sq-', ''));
  // Guards
  if (
    // Didn't click <div> in grid
    isNaN(idx) ||
    // Square already taken
    board[idx] ||
    // Game over
    winner
  ) return;

  // Update state (board, turn, winner)
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  // Render updated state
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    // if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }
  // Less elegant approach:
  if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
  if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
  if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
  if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
  if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
  if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
  if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
  if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
  if (board.includes(null)) return null; return 'T';
}

// Visualize all state and info in the DOM
function render() {
  renderBoard();
  renderMessage();
  // Hide/show PLAY AGAIN button
  playAgainBtn.disabled = !winner;
}

function renderBoard() {
  board.forEach(function (sqVal, idx) {
    const squareEl = document.getElementById(`sq-${idx}`);
    squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
    // Add class if square available for hover effect
    squareEl.className = !sqVal ? 'avail' : '';
  });
}

function renderMoves() {
  if (turn >= '1') {
    squareEl.innerText = 'X';
  } else if (turn <= '-1') {
    squareEl.innerText = 'O';
  }
  else {

  }
}

function renderMessage() {
  if (winner === 'T') {
    message.innerHTML = 'A tie? No. Gritty demands <i>Overtime</i>.';
  } else if (winner >= '1') {
    message.innerHTML = `Sleep with one eye open tonight, bird. YOU win!`;
  } else if (winner <= '-1') {
    message.innerHTML = `Get some wooter. <span style="font-size: 4vmin; color: orange;">GRITTY </span> is victorious!`;
  } else if (turn <= '-1') {
    message.innerHTML = `...it's <span style="font-size: 4vmin; color: orange;"> GRITTY'S </span> turn.`;
  } else {
    message.innerHTML = `<span style="font-size: 4vmin">YER</span>  turn`;
  }
}