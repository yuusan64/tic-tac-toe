//game factory function
const createGame = () => {
  let gameOver = false;

  const checkGameOver = () => gameOver;
  const setGameOver = (state) => {
    gameOver = state;
  };

  return { checkGameOver, setGameOver };
};

// Gameboard factory function extending createGame
const createGameboard = () => {

  const game = createGame(); // Inherit from createGame
  const gojo = "background-image: url('https://img.icons8.com/doodle/144/satoru-gojo.png');";
  const goku = "background-image: url('assets/goku.png');";
  const result=document.querySelector(".result")
  const container = document.querySelector('.container');
  let turn = gojo;
  let data = "Gojo";
  const gameContainer= document.querySelector('.gameContainer');

  const togglePlayer = () => {
    turn = (turn === gojo) ? goku : gojo;
    data = (data === "Gojo") ? "Goku" : "Gojo";
  };

  //function to check win or tie 
  const checkWin = (moves) => {
    if (game.checkGameOver()) return;
  
    const inner = document.getElementsByClassName("inner");
  
    // Win conditions
    const winConditions = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6]  
    ];
  
    winConditions.forEach((condition, index) => {
      const [a, b, c] = condition;
  
      if (
        inner[a].getAttribute('data-name') === inner[b].getAttribute('data-name') &&
        inner[b].getAttribute('data-name') === inner[c].getAttribute('data-name') &&
        inner[a].getAttribute('data-name')
      ) {
        const winner = inner[a].getAttribute('data-name');
        result.innerHTML = winner + " wins!";
        console.log( document.querySelector('.gif').getElementsByClassName(winner)[0]);
        document.querySelector('.gif').getElementsByClassName(winner)[0].classList.add("gifSize");
        updateWinningLine(index); // Pass index of the winning condition
        game.setGameOver(true);
        showResetButton(winner);
        return;
      }
    });
  
    // Check for tie
    if (moves === 9 && result.innerHTML === "") {
      result.innerHTML = "It's a tie!";
      game.setGameOver(true);
      showResetButton();
      return;
    }
  };
  
  const updateWinningLine = (winConditionIndex) => {
    const line = document.querySelector(".line");
    line.setAttribute('style', "width: 100%;");
    line.className = `line win-${winConditionIndex}`; // Apply a specific class based on the winning condition
  };

  // Show reset button
  const showResetButton = (winner) => {
      const resetButton = document.getElementById("reset");
      resetButton.innerHTML = `<button onclick="resetGame('${winner}')">Restart</button>`;
    };
  

  // Reset game logic
  const resetGame = (winner) => {
    const inner = document.querySelectorAll(".inner");
    Array.from(inner).forEach(element => {
      element.removeAttribute("style");
      element.removeAttribute("data-name");
    });
  
    const line = document.querySelector(".line");
    line.style.width = '0'; // Retract the line

    if (winner !== undefined) {
      const gifElement = document.querySelector('.gif');
      const winnerElement = gifElement ? gifElement.getElementsByClassName(winner)[0] : null;
      if (winnerElement) {
        winnerElement.classList.remove("gifSize");
      }
    }
    
  
    console.log(result);
    
    turn = gojo;
    data = "Gojo";
    result.innerHTML = "";
    gameContainer.setAttribute('style', "gap: 0;");
    moves = 0;
    game.setGameOver(false); // Reset game state
    container.removeEventListener('click', playGame);
    container.addEventListener('click', playGame);
    document.getElementById('game')
  };

  // Play game logic
  let moves=0;
  const playGame = (event) => {
    const clickedElement = event.target.closest('.box .inner');
    if (clickedElement && !clickedElement.hasAttribute('data-name')) {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    console.log(mediaQuery);
    if (mediaQuery.matches) {
      gameContainer.setAttribute('style', "gap: 3em;");
     }
      clickedElement.setAttribute('style', turn);
      clickedElement.setAttribute('data-name', data);
      togglePlayer();
      moves++;
      checkWin(moves);
    }
  };

  container.addEventListener('click', playGame);

  return {
    resetGame,
  };
};

// Create the gameboard object
const gameboard = createGameboard();

// Reset button click handler
function resetGame(winner) {
  gameboard.resetGame(winner);
}