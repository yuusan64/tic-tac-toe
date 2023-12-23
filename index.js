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


  const togglePlayer = () => {
    turn = (turn === gojo) ? goku : gojo;
    data = (data === "Gojo") ? "Goku" : "Gojo";
  };

  // Checks for a win or tie condition
  const checkWin = (moves) => {
    if (game.checkGameOver()) return;

    const inner = document.getElementsByClassName("inner");
   

    // Win conditions
    const winConditions = [
      [0, 1, 2, 1, 6, 0],
      [3, 4, 5, 1, 16, 0],
      [6, 7, 8, 1, 26, 0],
      [0, 3, 6, -9, 16, 90],
      [1, 4, 7, 1, 16, 90],
      [2, 5, 8, 11, 16, 90],
      [0, 4, 8, 0, 15, 45],
      [2, 4, 6, 1, 16, 135], 
    ];

    winConditions.forEach(condition => {
      const [a, b, c] = condition.slice(0, 3);

      if (
        inner[a].getAttribute('data-name') === inner[b].getAttribute('data-name') &&
        inner[b].getAttribute('data-name') === inner[c].getAttribute('data-name') &&
        inner[a].getAttribute('data-name')
      ) {
        const winner = inner[a].getAttribute('data-name');
        result.innerHTML= winner+" wins!";
        document.querySelector('.gif').getElementsByClassName(winner)[0].style.width = "220px";
        document.querySelector(".line").style.transform = `translate(${condition[3]}vw, ${condition[4]}vw) rotate(${condition[5]}deg)`
        document.querySelector(".line").style.width = "30vw";
        game.setGameOver(true);
        showResetButton(winner);
        return;
      }
    });
    //check for tie
    if(moves===9 && result.innerHTML===""){
      result.innerHTML="It's a tie!"
      game.setGameOver(true);
      showResetButton();
      return;
    }
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
    document.querySelector(".line").style.transition = "width 0.5s ease-in-out";
    document.querySelector(".line").style.width = "0px";
    if(winner!=="undefined") {document.querySelector('.gif').getElementsByClassName(winner)[0].style.width = "0px";} 
    turn = gojo;
    data = "Gojo";
    result.innerHTML="";
    moves=0;
    game.setGameOver(false); // Reset game state
    container.removeEventListener('click', playGame);
    container.addEventListener('click', playGame);
  };

  // Play game logic
  let moves=0;
  const playGame = (event) => {
    const clickedElement = event.target.closest('.box .inner');
    if (clickedElement && !clickedElement.hasAttribute('data-name')) {
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