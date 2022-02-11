'use strict';

import Ship from './shipModule';
import Gameboard from './gameboardModule';
import * as DOM from './domModule';
import Player from './playerModule';

const player1Grid = document.querySelector('#gameboard-1');
const player2Grid = document.querySelector('#gameboard-2');

const player1 = new Player('Jon');
const player2 = new Player('Cpu');

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
      DOM.colorAttackedCell(x, y, player1, player1Grid);
      // DOM.colorShipPlacement(player1, player1Grid);
      if (player1.gameboard.checkAllShipsSunk()) {
        DOM.displayGameOver('CPU');
      } else if (player2.gameboard.checkAllShipsSunk()) {
        DOM.displayGameOver('Player 1');
      }
    }
  });
});
