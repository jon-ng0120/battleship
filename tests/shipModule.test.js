import Ship from '../src/shipModule';

test('returns ship name', () => {
  expect(new Ship('Cruiser', 4).name).toBe('Cruiser');
});

test('returns ship length', () => {
  expect(new Ship('Cruiser', 7).length).toBe(7);
});

test('returns ship sections hit', () => {
  expect(new Ship('Cruiser', 3).sectionsHit).toEqual(['', '', '']);
});

test('Test if hit function marks proper section on sectionsHit', () => {
  const ship = new Ship('Cruiser', 3);
  ship.hit(1);
  expect(ship.sectionsHit).toEqual(['x', '', '']);
});

test('Test if hit function marks multiple sections on sectionsHit', () => {
  const ship = new Ship('Cruiser', 3);
  ship.hit(2);
  ship.hit(3);
  expect(ship.sectionsHit).toEqual(['', 'x', 'x']);
});

test('returns if ship is sunk', () => {
  const ship = new Ship('Cruiser', 2);
  ship.hit(1);
  ship.hit(2);
  ship.isSunk();
  expect(ship.sunk).toEqual(true);
});
