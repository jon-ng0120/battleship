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

DOM.createDOMGrid(document.querySelector('#gameboard-1'));
DOM.createDOMGrid(document.querySelector('#gameboard-2'));
DOM.addDOMDragEvents(document.querySelector('#gameboard-1'), player1);
DOM.addDOMAttackEvent(player2, document.querySelector('#gameboard-2'));

document.querySelector('#rotate-btn').addEventListener('click', () => {
  DOM.rotateShips();
});

player2Grid.querySelectorAll('[xy-coord]').forEach((ele) => {
  ele.addEventListener('click', () => {
    const [x, y] = player1.randomAttack();
    player1.gameboard.receiveAttack(x, y);
    DOM.colorAttackedCell(
      x,
      y,
      player1,
      document.querySelector('#gameboard-1')
    );
    console.log(x, y);
    console.log(player1);
    if (player1.gameboard.checkAllShipsSunk()) alert('Player 1 lost');
    if (player2.gameboard.checkAllShipsSunk()) alert('Player 2 lost');
  });
});
