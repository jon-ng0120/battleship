'use strict';

import Ship from './shipModule';
import Gameboard from './gameboardModule';
import * as DOM from './domModule';
import Player from './playerModule';

const startGame = document.querySelector('#start-game');
const player1Grid = document.querySelector('#gameboard-1');
const player2Grid = document.querySelector('#gameboard-2');

const player1 = new Player('Jon');
const player2 = new Player('CPU');

player2.randomShipPlacement();

DOM.createDOMGrid(player1Grid);
DOM.createDOMGrid(player2Grid);

const gridOptions = Array.from(player1Grid.querySelectorAll('div')).map(
  (item) => item.getAttribute('xy-coord')
);

DOM.addDOMDragEvents(player1Grid, player1);

document.querySelector('#rotate-btn').addEventListener('click', () => {
  DOM.rotateShips();
});

player2Grid.querySelectorAll('[xy-coord]').forEach((ele) => {
  ele.addEventListener('click', (e) => {
    if (e.target.style.backgroundColor == '') {
      // attack player 2 board on click
      const [xCoord, yCoord] = e.target.getAttribute('xy-coord').split('-');
      DOM.colorAttackedCell(xCoord, yCoord, player2, player2Grid);
      player2.gameboard.receiveAttack(xCoord, yCoord);
      // randomly attack player 1 board
      const randomCoord =
        gridOptions[Math.floor(Math.random() * gridOptions.length)];
      const randomCoordIndex = gridOptions.findIndex(
        (coord) => coord == randomCoord
      );
      const [x, y] = randomCoord.split('-');
      player1.gameboard.receiveAttack(x, y);
      gridOptions.splice(randomCoordIndex, 1);
      console.log(randomCoord);
      console.log(gridOptions);
      DOM.colorAttackedCell(x, y, player1, player1Grid);
      console.log(x, y);
      console.log(player1);
      // DOM.colorShipPlacement(player1, player1Grid);
      if (player1.gameboard.checkAllShipsSunk()) {
        alert('Player 1 lost');
      } else if (player2.gameboard.checkAllShipsSunk()) {
        alert('Player 2 lost');
      }
    }
  });
});

// export const addDOMAttackEvent = (player, container) => {
//   const grid = container.querySelectorAll('[xy-coord]');
//   grid.forEach((ele) => {
//     ele.addEventListener('click', (e) => {
//       const [x, y] = e.target.getAttribute('xy-coord').split('-');
//       colorAttackedCell(x, y, player, container);
//       player.gameboard.receiveAttack(x, y);
//       console.log(player);
//     });
//   });
// };
