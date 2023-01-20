const page = document.querySelector(".main");
const gameBox = document.querySelector('.play');

const Gameboard = (() => {
  const gameboard = ["X","O",,,,,,"O",,];
  function init() {
    for (let i=0; i<gameboard.length; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.textContent = gameboard[i];
      box.dataset.index = i;
      gameBox.appendChild(box);
      }
  }
  return {gameboard, init};
})();
   
const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {getName, getSymbol};
};


Gameboard.init();