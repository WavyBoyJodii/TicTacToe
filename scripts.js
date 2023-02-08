const page = document.querySelector(".main");
const gameBox = document.querySelector('.play');
const infoBox = document.querySelector('.infobox');

const Game = (() => {
  const winnerCircle = document.createElement("div");
  winnerCircle.classList.add("winnercirlce");
  let playerCounter = 0;
  let turnCounter = 0;
  let players = [];
  let player1Wins = 0;
  let player2Wins = 0;
  const addPlayer = (name, symbol) => {
    if (playerCounter > 1) {
      console.log('returning');
      return} 
      else {
        const player = Player(name, symbol);
        playerCounter++;
        console.log(playerCounter);    
        players.push(player);}
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
  const gameboard = [,,,,,,,,,];
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
    if (Gameboard.gameboard[x] === 'undefined' || Gameboard.gameboard[x] === 'X' || Gameboard.gameboard[x] === 'O') {
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
