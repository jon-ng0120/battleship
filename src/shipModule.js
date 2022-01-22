class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.sunk = false;
    this.sectionsHit = Array(length).fill('');
    this.placed = false;
  }
  hit = (int) => {
    this.sectionsHit[int - 1] = 'x'; // takes number and subtracts 1 for matching array position
    this.isSunk();
  };
  isSunk = () => {
    if (this.sectionsHit.every((section) => section == 'x')) {
      this.sunk = true;
    }
  };
}

export default Ship;
