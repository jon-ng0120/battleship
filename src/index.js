'use strict';

import Ship from './shipModule';
import Gameboard from './gameboardModule';
import Player from './playerModule';
// const cruiser = new Ship('Cruiser', 4);
// const patrolBoat = new Ship('Patrolboat', 2);
// const gameboard = new Gameboard();
// gameboard.placeShip(
//   {
//     name: 'Destroyer',
//     length: 4,
//   },
//   1,
//   1,
//   'x'
// );
// console.log(gameboard);

const player = new Player('Jon');
player.randomShipPlacement();
console.log(player.gameboard);

// gameboard.placeShip(gameboard.ships[0], 1, 1, 'y');
// gameboard.receiveAttack(1, 1);
// gameboard.receiveAttack(3, 1);
// gameboard.receiveAttack(2, 1);
// gameboard.receiveAttack(4, 1);
// gameboard.receiveAttack(5, 1);
// gameboard.placeShip(patrolBoat, 1, 3, 'y');

// gameboard.receiveAttack(7, 3);
// gameboard.receiveAttack(3, 5);
// console.log(gameboard.checkAllShipsSunk());
// console.log(gameboard);
// console.log(gameboard.grid);
