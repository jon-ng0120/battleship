'use strict';

import Ship from '../src/shipFactory';
import Gameboard from '../src/gameboardFactory';
const cruiser = new Ship('Cruiser', 4);
const gameboard = new Gameboard();

gameboard.placeShip(cruiser, 1, 2, 4);
gameboard.checkSpace(3, 2, 5);
gameboard.receiveAttack(3, 2);
gameboard.receiveAttack(4, 2);
console.log(gameboard);
