import Gameboard from '../src/gameboardModule';

test('Tests if all ships are sunk', () => {
  const gameboard = new Gameboard();
  // Create mock array of objects with sunk status
  gameboard.ships = [
    {
      name: 'Cruiser',
      length: 5,
      sunk: true,
    },
    {
      name: 'Destroyer',
      length: 6,
      sunk: true,
    },
  ];
  expect(gameboard.checkAllShipsSunk()).toBe(true);
});
