import Gameboard from './gameboardModule';

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  randomShipPlacement = () => {
    const ships = this.gameboard.ships;
    ships.forEach((ship) => {
      let randomX = Math.floor(Math.random() * 10) + 1;
      let randomY = Math.floor(Math.random() * 10) + 1;
      let rotation = Math.random() > 0.5 ? 'x' : 'y';

      while (ship.placed === false) {
        this.gameboard.placeShip(ship, randomX, randomY, rotation);
        randomX = Math.floor(Math.random() * 10) + 1;
        randomY = Math.floor(Math.random() * 10) + 1;
        rotation = Math.random() > 0.5 ? 'x' : 'y';
      }
    });
  };

  randomAttack = () => {
    const x = Math.floor(Math.random() * 10) + 1;
    const y = Math.floor(Math.random() * 10) + 1;
    return [x, y];
  };
}

export default Player;
