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

// let cat=document.createElement('IMG');
// cat.setAttribute('src', 'assets/cat-face.png');
// var cat="background-image: url('https://img.icons8.com/doodle/144/satoru-gojo.png'); background-repeat: no-repeat; background-size: 120px 120px;background-position: center;" /*filter:hue-rotate(351deg) saturate(0.8) drop-shadow(1px 1px 4px black)"*/
// var dog="background-image: url('assets/goku.png'); background-repeat: no-repeat; background-size: 120px 120px;background-position: center;" /*filter: hue-rotate(4deg) saturate(0.6);"*/

var cat="background-image: url('https://img.icons8.com/doodle/144/satoru-gojo.png'); background-repeat: no-repeat; background-size: 120px 120px;background-position: center;" /*filter:hue-rotate(351deg) saturate(0.8) drop-shadow(1px 1px 4px black)"*/
var dog="background-image: url('assets/goku.png'); background-repeat: no-repeat; background-size: 120px 120px;background-position: center;"

// let dog=document.createElement('IMG');
// dog.setAttribute('style', style);


var Gameboard={
    turn: cat,
    data: "cat",
    changeTurns(){
    return (this.turn===cat?dog:cat);
    },
    changeData(){
    return (this.data==="cat"?"dog":"cat");
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
            this.winConditions.forEach(i=>{
          if( (this.arr[i[0]].getAttribute('data-name')===this.arr[i[1]].getAttribute('data-name')) && (this.arr[i[2]].getAttribute('data-name')===this.arr[i[1]].getAttribute('data-name')) && (this.arr[i[0]].getAttribute('data-name')!==null)){
           console.log(this.arr[i[0]].getAttribute('data-name') + " Won");
          }
        })
    },
    playGame(){

        Array.from(this.arr).forEach(element => {
       let boxtext = element.querySelector('.boxtext');
       element.addEventListener("click", ()=>{
       if(boxtext.innerText===""){
       element.setAttribute('style', this.turn);
       element.setAttribute('data-name', this.data);
       this.turn= this.changeTurns();
       this.data=this.changeData();
       this.checkWin();
       
       }
    }
       )
    });
},
    
    
};

var player=Object.create(Gameboard);
player.playGame();


