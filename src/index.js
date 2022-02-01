"use strict";

import Ship from "./shipModule";
import Gameboard from "./gameboardModule";
import * as DOM from "./domModule";
import Player from "./playerModule";

const player1 = new Player("Jon");
const player2 = new Player("CPU");
player2.randomShipPlacement();

DOM.createDOMGrid(document.querySelector("#gameboard-1"), player1);
DOM.createDOMGrid(document.querySelector("#gameboard-2"));

document.querySelector("#rotate-btn").addEventListener("click", () => {
  DOM.rotateShips();
});
