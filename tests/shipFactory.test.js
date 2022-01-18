import Ship from '../src/shipFactory';

test('returns ship name', () => {
  expect(Ship('Cruiser', 4).shipName).toBe('Cruiser');
});

test('returns ship length', () => {
  expect(Ship('Cruiser', 7).shipLength).toBe(7);
});

test('returns ship sections hit', () => {
  expect(Ship('Cruiser', 3).sectionsHit).toEqual(['', '', '']);
});

test('returns ship section hit after hit', () => {
  const cruiser = Ship('Cruiser', 3).hit(1);
  expect(cruiser.sectionsHit).toEqual(['x', '', '']);
});
