import Ship from './shipModule';

class Gameboard {
  constructor() {
    this.grid = this.createGrid();
    this.ships = this.createShips();
  }

  createShips = () => {
    const shipList = [
      {
        name: 'Carrier',
        length: 5,
      },
      {
        name: 'Battleship',
        length: 4,
      },
      {
        name: 'Destroyer',
        length: 3,
      },
      {
        name: 'Submarine',
        length: 3,
      },
      {
        name: 'Patrol Boat',
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
          } else if (axis == 'y') {
            this.grid[y + i][x] = {
              ship,
              position: i + 1,
            };
          }
        }
        ship.placed = true;
      }
    }
  };

  // checks if the spot the ship is being placed is in a valid spot
  checkForExistingShip = (xCoord, yCoord, length, axis) => {
    if (axis == 'x') {
      const xAxisSelection = this.grid[yCoord].slice(xCoord, xCoord + length);
      console.log(xAxisSelection);
      console.log(xAxisSelection.every((index) => index == ''));
      return xAxisSelection.every((index) => index == '');
    } else if (axis == 'y') {
      const yAxisSelection = [];
      for (let i = 0; i < length; i++) {
        yAxisSelection.push(this.grid[yCoord + i][xCoord]);
      }
      console.log(yAxisSelection);
      return yAxisSelection.every((index) => index == '');
    }
  };

  checkForEnoughSpace = (xCoord, yCoord, length, axis) => {
    if (axis == 'x') {
      // returns the subarray of the selection and return true if the total length of it is equal passed in length
      const xAxisSelection = this.grid[yCoord].slice(xCoord, xCoord + length);
      return xAxisSelection.length == length;
    } else if (axis == 'y') {
      // if the sum of the Y axis location and length is > 10, that means it's spilling out the board
      return yCoord + length <= 10;
    }
  };

  // receives coordinate on grid and attacks it
  receiveAttack = (xCoord, yCoord) => {
    const x = yCoord - 1;
    const y = xCoord - 1;
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
