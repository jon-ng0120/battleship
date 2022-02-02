import Ship from './shipModule';
import { colorShipPlacement } from './domModule';

class Gameboard {
  constructor() {
    this.grid = this.createGrid();
    this.ships = this.createShips();
  }

  createShips = () => {
    const shipList = [
      {
        name: 'carrier',
        length: 5,
      },
      {
        name: 'battleship',
        length: 4,
      },
      {
        name: 'destroyer',
        length: 3,
      },
      {
        name: 'submarine',
        length: 3,
      },
      {
        name: 'patrol-boat',
        length: 2,
      },
    ];

    const shipObjList = shipList.map(
      (ship) => new Ship(ship.name, ship.length)
    );
    return shipObjList;
  };

  // creates 10x10 grid
  createGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      grid.push([]);
      for (let j = 0; j < 10; j++) {
        grid[i].push('');
      }
    }
    return grid;
  };

  placeShip = (ship, xCoord, yCoord, axis) => {
    const x = yCoord - 1;
    const y = xCoord - 1;
    // check if position placed
    if (this.checkForEnoughSpace(x, y, ship.length, axis)) {
      if (this.checkForExistingShip(x, y, ship.length, axis)) {
        for (let i = 0; i < ship.length; i++) {
          if (axis == 'x') {
            this.grid[y][x + i] = {
              ship,
              position: i + 1,
            };
            // if (cpu !== true) colorShipPlacement(x + i + 1, y + 1);
          } else if (axis == 'y') {
            this.grid[y + i][x] = {
              ship,
              position: i + 1,
            };
            // if (cpu !== true) colorShipPlacement(x + 1, y + i + 1);
          }
        }
        ship.placed = true;
        return true;
      }
    }
  };

  // checks if the spot the ship is being placed is in a valid spot
  checkForExistingShip = (x, y, length, axis) => {
    if (axis == 'x') {
      const xAxisSelection = this.grid[y].slice(x, x + length);
      return xAxisSelection.every((index) => index == '');
    } else if (axis == 'y') {
      const yAxisSelection = [];
      for (let i = 0; i < length; i++) {
        yAxisSelection.push(this.grid[y + i][x]);
      }
      return yAxisSelection.every((index) => index == '');
    }
  };

  checkForEnoughSpace = (x, y, length, axis) => {
    if (axis == 'x') {
      // returns the subarray of the selection and return true if the total length of it is equal passed in length
      const xAxisSelection = this.grid[y].slice(x, x + length);
      return xAxisSelection.length == length;
    } else if (axis == 'y') {
      // if the sum of the Y axis location and length is > 10, that means it's spilling out the board
      return y + length <= 10;
    }
  };

  // receives coordinate on grid and attacks it
  receiveAttack = (xCoord, yCoord) => {
    const x = xCoord - 1;
    const y = yCoord - 1;
    if (typeof this.grid[y][x] == 'object') {
      const ship = this.grid[y][x].ship;
      // attacks the ship object's sections hit based on position key saved in the object within the array
      const shipPosition = this.grid[y][x].position;
      ship.hit(shipPosition);
    } else {
      // Mark board as not hit
      this.grid[y][x] = 'x';
    }
  };

  checkAllShipsSunk = () => {
    return this.ships.every((ship) => ship.sunk);
  };
}

export default Gameboard;
