// var Player={
    
//     turn:"X",
//     create: function(values){
//      var instance =Object.create(this);
//      return instance;
//     },
//     changeTurns: function(sign){
//      return this.sign==="X"?"O":"X";
//     },
// }
var Gameboard={
    turn: "X",
    changeTurns(){
    return this.turn==="X"?"O":"X";
    },
    arr: document.getElementsByClassName("box"),
    winConditions:[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],        
        [2,4,6],   
    ],
    checkWin(){
        let boxtext = document.getElementsByClassName('boxtext');
        
        this.winConditions.forEach(i=>{
            console.log(boxtext[i[0]]);
          if( (boxtext[i[0]].innerText===boxtext[i[1]].innerText) && (boxtext[i[2]].innerText===boxtext[i[1]].innerText) && (boxtext[i[0]].innerText!=="")){
           console.log(boxtext[i[0]].innerText + " Won");
          }
        })
    },
    playGame(){
        Array.from(this.arr).forEach(element => {
       let boxtext = element.querySelector('.boxtext');
       element.addEventListener("click", ()=>{
       if(boxtext.innerText===""){
       boxtext.innerText=this.turn;
       this.turn= this.changeTurns();
       this.checkWin(boxtext);
       
       }
    }
       )
    });
},
    
    
};

var player=Object.create(Gameboard);
player.playGame();


