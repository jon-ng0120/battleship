class Gameboard {
  constructor() {
    this.grid = this.createGrid();
  }

  // creates 10x10 grid
  createGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      grid.push([]);
      for (let j = 0; j < 10; j++) {
        grid[i].push([]);
      }
    }
    return grid;
  };

  placeShip = (ship, xCoord, yCoord, axis) => {
    // check if position placed
    for (let i = 0; i < ship.length; i++) {
      this.grid[yCoord][xCoord + i] = {
        // creates object that references ship object being placed and the section of ship being placed on the grid
        ship,
        position: i + 1,
      };
    }
  };

  // checks if the spot the ship is being placed is in a valid spot
  checkSpace = (xCoord, yCoord, length) => {
    const selectedSection = this.grid[yCoord].slice(
      xCoord - 1,
      xCoord + length - 1
    );
    console.log(selectedSection.every((index) => index == ''));
  };

  receiveAttack = (xCoord, yCoord) => {
    if (this.grid[yCoord][xCoord] !== '') {
      const ship = this.grid[yCoord][xCoord].ship;
      const shipPosition = this.grid[yCoord][xCoord].position;
      ship.hit(shipPosition);
    } else {
      console.log('nope');
    }
  };
}

export default Gameboard;
