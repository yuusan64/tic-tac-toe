var gojo="background-image: url('https://img.icons8.com/doodle/144/satoru-gojo.png'); background-repeat: no-repeat; background-size: 120px 120px;background-position: center;" 
var goku="background-image: url('assets/goku.png'); background-repeat: no-repeat; background-size: 130px 120px;background-position: center;"

var Gameboard={
  container: document.querySelector('.container'), 
    turn: gojo,
    data: "gojo",
    arr: document.getElementsByClassName("box"),
    gameOver: false,
    changeTurns(){
      return (this.turn===gojo?goku:gojo);
    },
    changeData(){
    return (this.data==="gojo"?"goku":"gojo");
    },
    checkWin(){
      let winConditions=[
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, 0, 15, 45],
        [2, 4, 6, 0, 15, 135],  
    ];
    let inner=document.getElementsByClassName("inner");
          winConditions.forEach(i=>{
          if( (inner[i[0]].getAttribute('data-name')===inner[i[1]].getAttribute('data-name')) && (inner[i[2]].getAttribute('data-name')===inner[i[1]].getAttribute('data-name')) && (inner[i[0]].getAttribute('data-name'))){
            let winner=inner[i[0]].getAttribute('data-name');
            console.log(winner + " Won");
            document.querySelector('.gif').getElementsByClassName(winner)[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${i[3]}vw, ${i[4]}vw) rotate(${i[5]}deg)`
            document.querySelector(".line").style.width = "30vw";
            this.reset(winner); 
               
          }
        })
    },
    playGame() {
      console.log("Game starts");
      
      // Add click event listener to the container
      document.querySelector('.container').addEventListener('click', (event) => {
          const clickedElement = event.target.closest('.box .inner');
          
          if (clickedElement && !clickedElement.hasAttribute('data-name')) {
              // If the clicked box is empty, proceed with the game logic
              clickedElement.setAttribute('style', this.turn);
              clickedElement.setAttribute('data-name', this.data);
              
              this.turn = this.changeTurns();
              this.data = this.changeData();
              
              this.checkWin();
          }
      });
  },

reset(winner) {
  let inner = document.querySelectorAll(".inner");
  let resetid = document.getElementById("reset");
  let reset = document.createElement('button');
  reset.innerText = "Reset";
  resetid.appendChild(reset);

  reset.addEventListener('click', () => {
      Array.from(inner).forEach(element => {
          element.removeAttribute("style");
          element.removeAttribute("data-name");
      });

      // Reset the line
      document.querySelector(".line").style.transition = "width 0.5s ease-in-out";
      document.querySelector(".line").style.width = "0px";
      document.querySelector('.gif').getElementsByClassName(winner)[0].style.width = "0px";  

      // Re-enable click handling
      this.turn = gojo;
      this.data = "gojo";
      reset.style.display = "none";

      // Re-add the click event listeners
      this.playGame();
  });
}

};

var game=Object.create(Gameboard);
game.playGame();