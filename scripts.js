const page = document.querySelector(".main");
const gameBox = document.querySelector('.play');
const infoBox = document.querySelector('.infobox');
const startGameButton = document.createElement('button');

startGameButton.classList.add('startGameButton');
startGameButton.textContent = 'Start';
infoBox.appendChild(startGameButton);

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
      infoBox.textContent = `${players[0].getName}'s Turn`;
      turnCounter++;}
      else { 
        turn = players[1];
        infoBox.textContent = `${players[1].getName}'s Turn`;
        turnCounter--;}
      return turn;  
      };
  const makeMove = x => {
    let currentPlayer = whosTurn();
    currentPlayer.select(x);
  }; 
  const checkRoundWin = () => {
    if((Gameboard.gameboard[0] && Gameboard.gameboard[1] && Gameboard.gameboard[2]) === 'X' || (Gameboard.gameboard[0] && Gameboard.gameboard[3] && Gameboard.gameboard[6]) === 'X' || (Gameboard.gameboard[0] && Gameboard.gameboard[4] && Gameboard.gameboard[8]) === 'X' || (Gameboard.gameboard[1] && Gameboard.gameboard[4] && Gameboard.gameboard[7]) === 'X' || (Gameboard.gameboard[2] && Gameboard.gameboard[5] && Gameboard.gameboard[8]) === 'X' || (Gameboard.gameboard[2] && Gameboard.gameboard[4] && Gameboard.gameboard[6]) === 'X' || (Gameboard.gameboard[3] && Gameboard.gameboard[4] && Gameboard.gameboard[5]) === 'X' || (Gameboard.gameboard[6] && Gameboard.gameboard[7] && Gameboard.gameboard[8]) === 'X') {
      if (players[0].getsymbol() === 'X') {
        console.log(`${players[0].getName} wins!`);
        player1Wins++;
        page.appendChild(winnerCircle);
        winnerCircle.textcontent = `${players[0].getName} wins the round!`;
      } 
      else 
        { 
          console.log(`${players[1].getName} wins!`);
          player2Wins++;
          page.appendChild(winnerCircle);
          winnerCircle.textcontent = `${players[1].getName} wins the round!`;
        }
   } 
    else if( (Gameboard.gameboard[0] && Gameboard.gameboard[1] && Gameboard.gameboard[2]) === 'O' || (Gameboard.gameboard[0] && Gameboard.gameboard[3] && Gameboard.gameboard[6]) === 'O' || (Gameboard.gameboard[0] && Gameboard.gameboard[4] && Gameboard.gameboard[8]) === 'O' || (Gameboard.gameboard[1] && Gameboard.gameboard[4] && Gameboard.gameboard[7]) === 'O' || (Gameboard.gameboard[2] && Gameboard.gameboard[5] && Gameboard.gameboard[8]) === 'O' || (Gameboard.gameboard[2] && Gameboard.gameboard[4] && Gameboard.gameboard[6]) === 'O' || (Gameboard.gameboard[3] && Gameboard.gameboard[4] && Gameboard.gameboard[5]) === 'O' || (Gameboard.gameboard[6] && Gameboard.gameboard[7] && Gameboard.gameboard[8]) === 'O') {
      if (players[0].getsymbol() === 'O') {
        console.log(`${players[0].getName} wins the round!`);
        player1Wins++;
        page.appendChild(winnerCircle);
        winnerCircle.textcontent = `${players[0].getName} wins the round!`}
      else 
        {
          console.log(`${players[1].getName} wins!`);
          player2Wins++;
          page.appendChild(winnerCircle);
          winnerCircle.textcontent = `${players[1].getName} wins the round!`
        }
      }
    else 
      { 
        console.log('Its a Tie!');
        page.appendChild(winnerCircle);
        winnerCircle.textcontent = `Tie Round!`
      };
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
