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
   
  startGameForm = () => {
    const form = document.createElement('form');
    form.setAttribute("method", "post");
    form.setAttribute("action", "example.com/path");
    
    const player1Label = document.createElement('label');
    player1Label.setAttribute('for', 'player1Name');
    player1Label.textContent = "Player 1's Name:";
    const player1Name = document.createElement('input');
    player1Name.setAttribute('type', 'text');
    player1Name.setAttribute('id', 'player1Name');
    player1Name.setAttribute('name', 'player1Name');  
    
    const player2Label = document.createElement('label');
    player2Label.setAttribute('for', 'player1Name');
    player2Label.textContent = "Player 2's Name:";
    const player2Name = document.createElement('input');
    player2Name.setAttribute('type', 'text');
    player2Name.setAttribute('id', 'player2Name');
    player2Name.setAttribute('name', 'player2Name');
    
    const xSymbolLabel = document.createElement('label');
    xSymbolLabel.setAttribute('for', 'X');
    xSymbolLabel.textContent = "X";
    const xSymbol = document.createElement('input');
    xSymbol.setAttribute('type', 'radio');
    xSymbol.setAttribute('id', 'X');
    xSymbol.setAttribute('name', 'symbol');
    xSymbol.setAttribute('value', 'X');
      
    const oSymbolLabel = document.createElement('label');
    oSymbolLabel.setAttribute('for', 'O');
    oSymbolLabel.textContent = "O";
    const oSymbol = document.createElement('input');
    oSymbol.setAttribute('type', 'radio');
    oSymbol.setAttribute('id', 'O');
    oSymbol.setAttribute('name', 'symbol');
    oSymbol.setAttribute('value', 'O');
    
    const formButton = document.createElement('button');
    formButton.textContent = 'Submit';
    formButton.addEventListener('click', addBothPlayers, false);
    
    const symbolValue = function displayRadioValue() {
      let ele = document.getElementsByName('symbol'); 
      for(i = 0; i < ele.length; i++) {
          if(ele[i].checked) {
          let answer = ele[i].value;
          return answer
          }
        }
      }
      
    const notSymbolValue = function displayRadioValue() {
      let ele = document.getElementsByName('symbol'); 
      for(i = 0; i < ele.length; i++) {
          if(!(ele[i].checked)) {
          let answer = ele[i].value;
          return answer
          }
        }
      }
        
    function addBothPlayers(event) {
      event.preventDefault();
      addPlayer(player1Name.value, symbolValue);
      addPlayer(player2Name.value, notSymbolValue);
      infoBox.removeChild(form);
      whosTurn();
      };
        
    form.append(player1Label, player1Name, player2Label, player2Name, xSymbolLabel, xSymbol, oSymbolLabel, oSymbol, formButton);
    
    infoBox.removeChild(startGameButton);
    infoBox.append(form); 
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
