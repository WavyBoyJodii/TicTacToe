const page = document.querySelector(".main");
const gameBox = document.querySelector('.play');
const infoBox = document.querySelector('.infobox');
const startGameButton = document.createElement('button');
const newGameButton = document.createElement('button');
const vsPlayer1 = document.getElementById('player1');
const vsPlayer2 = document.getElementById('player2');
const p1wins = document.getElementById('p1Wins');
const p2wins = document.getElementById('p2Wins');


const Game = (() => {
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const winnerCircle = document.createElement("div");
  winnerCircle.classList.add("winnercircle");
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
        console.log(`this is the player counter number ${playerCounter}`);    
        players.push(player);}
      };
        
  const whosTurn = () => {
    let turn;
    if (turnCounter === 0) {
      turn = players[0];
      infoBox.textContent = `${players[1].getName()}'s Turn`;
      turnCounter++;}
      else { 
        turn = players[1];
        infoBox.textContent = `${players[0].getName()}'s Turn`;
        turnCounter--;}
      return turn;  
      };
  const makeMove = x => {
    let currentPlayer = whosTurn();
    currentPlayer.select(x);
    if (checkRoundWin(currentPlayer)) {
      endRound(false, currentPlayer)
    } else if(isDraw()) {
      endRound(true)
    };
    // checkGameWin();
  }; 
  function checkRoundWin(currentPlayer) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return Gameboard.gameboard[index] === currentPlayer.getSymbol()
      })
    })
  };
  function endRound(draw, currentPlayer) {
    if (draw) {
      console.log('Its a Tie!');
      winnerCircle.textContent = `Tie Round!`;
      page.appendChild(winnerCircle);
      Gameboard.reset();
      turnCounter = 0;
      Gameboard.init();
      infoBox.textContent = `New Round  its ${players[0].getName()}'s Turn`;
    
    } else {
      console.log(`${currentPlayer.getName()} wins!`);
      winnerCircle.textContent = `${currentPlayer.getName()} wins the round!`;
      page.appendChild(winnerCircle);
      whoWon(currentPlayer);
      Gameboard.reset();
      turnCounter = 0;
      Gameboard.init();
      infoBox.textContent = `New Round  its ${players[0].getName()}'s Turn`;
    }
  }
  function whoWon(currentPlayer) {
    if (currentPlayer === players[0]) {
      player1Wins++
    } else {
      player2Wins++
    }   
  }
  // function isDraw() {
  //   return Gameboard.gameboard.every(index => {
  //     return index.value === 'X' || index.value === 'O'
  //     })
  //   }   
  function isDraw() {
    if (!Gameboard.gameboard.includes('')) {
      return true
    } else {
      return false
    }
  }
  const checkGameWin = () => {
    if( player1Wins === 5) {
      console.log(`${players[0].getName()} Wins!`);
      winnerCircle.textContent = `${players[0].getName()} Wins!`;
      page.append(winnerCircle);
      Gameboard.end();
      }
    else if( player2Wins === 5) {
      console.log(`${players[1].getName()} Wins!`);
      winnerCircle.textContent = `${players[1].getName()} Wins!`;
      page.append(winnerCircle);
      Gameboard.end();
      }
    else return;  
  }   
  const startGameForm = () => {
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
          console.log(`this is the symbol value ${answer}`)
          return answer
          }
        }
      }
      
    const notSymbolValue = function displayRadioValue() {
      let ele = document.getElementsByName('symbol'); 
      for(i = 0; i < ele.length; i++) {
          if(!(ele[i].checked)) {
          let answer = ele[i].value;
          console.log(`this is the notsymbol value ${answer}`)
          return answer
          }
        }
      }
        
    function addBothPlayers(event) {
      event.preventDefault();
      addPlayer(player1Name.value, symbolValue());
      console.log(player1Name.value);
      vsPlayer1.textContent = `${player1Name.value}`;
      addPlayer(player2Name.value, notSymbolValue());
      vsPlayer2.textContent = `${player2Name.value}`;
      infoBox.removeChild(form);
      Gameboard.init();
      infoBox.textContent = `${players[0].getName()}'s Turn`;
      };
        
    form.append(player1Label, player1Name, player2Label, player2Name, xSymbolLabel, xSymbol, oSymbolLabel, oSymbol, formButton);
    
    const whichButton = () => {
      if(infoBox.children[0] === startGameButton) {
        infoBox.removeChild(startGameButton);
      }
      else{
        infoBox.removeChild(newGameButton)
      }
    };
    whichButton();
    infoBox.append(form); 
  }; 
  const startGame = () => {
    // playerCounter = 0;
    // turnCounter = 0;
    // players = [];
    // player1Wins = 0;
    // player2Wins = 0;
    // Gameboard.gameboard = [,,,,,,,,,];
    startGameForm();
    };

  const newGame = () => {
    playerCounter = 0;
    turnCounter = 0;
    players = [];
    player1Wins = 0;
    player2Wins = 0;
    Gameboard.gameboard = [,,,,,,,,,];
    winnerCircle.textContent = '';
    page.removeChild(winnerCircle);
    startGameForm();
  }  
  return {addPlayer, whosTurn, makeMove, startGame, newGame, players};
})();    

const Gameboard = (() => {
  let gameboard = ['','','','','','','','','',];
  const init = () => {
    removeAllChildNodes(gameBox);
    for (let i=0; i<gameboard.length; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.textContent = gameboard[i];
      box.dataset.index = i;
      box.addEventListener('click', function(event){
        Game.makeMove(event.target.dataset.index);
      });
      gameBox.appendChild(box);
      }
  }
  const end = () => {
    for (let i=0; i<gameboard.length; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.textContent = gameboard[i];
      box.dataset.index = i;
      gameBox.appendChild(box);
      infoBox.textContent = '';
      newGameButton.classList.add('startGameButton');
      newGameButton.textContent = 'New Game';
      newGameButton.addEventListener('click', Game.newGame);
      infoBox.append(newGameButton);
      }
  }
  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }
  const reset = () => {
    gameboard = [,,,,,,,,,];
    removeAllChildNodes(gameBox);
  }
  // const makeMove = x => {
  //   let currentPlayer = Game.whosTurn();
  //   currentPlayer.select(x);
  // };    
  return {gameboard, init, end, reset, removeAllChildNodes};
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

startGameButton.classList.add('startGameButton');
startGameButton.textContent = 'Start';
startGameButton.addEventListener('click', Game.startGame);
infoBox.appendChild(startGameButton);


// Gameboard.init();
