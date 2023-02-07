const page = document.querySelector(".main");
const gameBox = document.querySelector('.play');

const Game = (() => {
    let playerCounter = 0;
    let turnCounter = 0;
    let players = [];
    const addPlayer = (x) => {
      if (playerCounter > 1) {
        console.log('returning');
        return} 
        else {
          playerCounter++;
          console.log(playerCounter);    
          players.push(x);}
        };
        
    const whosTurn = () => {
      let turn;
      if (turnCounter === 0) {
        turn = players[0];
        turnCounter++;}
        else { 
          turn = players[1];
          turnCounter--;}
        return turn;  
        };
    const makeMove = x => {
      let currentPlayer = whosTurn();
      currentPlayer.select(x);
    };      
    return {addPlayer, whosTurn, makeMove};
})();    

const Gameboard = (() => {
  const gameboard = ["X","O",,,,,,"O",,];
  const init = () => {
    for (let i=0; i<gameboard.length; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.textContent = gameboard[i];
      box.dataset.index = i;
      box.addEventListener('click', function(event){
        Game.makeMove(event.target.dataset.index);
        console.log(event.target.dataset.index);
      });
      gameBox.appendChild(box);
      }
  }
  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }
  // const makeMove = x => {
  //   let currentPlayer = Game.whosTurn();
  //   currentPlayer.select(x);
  // };    
  return {gameboard, init, removeAllChildNodes};
})();
   
const Player = (name, symbol) => { 
  const getName = () => name;
  const getSymbol = () => symbol;
  const select = (x) => {
    let choice = getSymbol();
    // let index = x;
    if (Gameboard.gameboard[x] === 'undefined') {
      console.log(Gameboard.gameboard[x]);  
      return} else {
      Gameboard.gameboard[x] = choice;
      Gameboard.removeAllChildNodes(gameBox);
      Gameboard.init();}
    };
  return {getName, getSymbol, select};
};

const jodii = Player('Jodii', 'X');
const eli = Player('Eli', 'O');


Game.addPlayer(jodii);
Game.addPlayer(eli);
Gameboard.init();

eli.select(3);
jodii.select(8);
