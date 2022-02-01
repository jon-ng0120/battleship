import Ship from './shipModule';
import Gameboard from './gameboardModule';
import Player from './playerModule';

const createDOMGrid = (container) => {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      const grid = document.createElement('div');
      grid.setAttribute('xy-coord', `${j}-${i}`);
      grid.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      grid.addEventListener('drop', (e) => {
        const shipName = e.dataTransfer.getData('ShipName');
        const shipAxis = e.dataTransfer.getData('ShipAxis');
        const ship = findShip(shipName);
        const [xCoord, yCoord] = grid.getAttribute('xy-coord').split('-');
        if (player1.gameboard.placeShip(ship, yCoord, xCoord, shipAxis)) {
          const draggable = document.querySelector('.dragging');
          grid.appendChild(draggable);
        }
      });

      container.appendChild(grid);
    }
  }
};

const findShip = (name) => {
  const shipObj = player1.gameboard.ships.find((ship) => ship.name == name);
  return shipObj;
};

document.querySelectorAll('.drag-item').forEach((item) => {
  item.addEventListener('dragstart', (e) => {
    item.classList.add('dragging');
    e.dataTransfer.setData('ShipName', e.target.id);
    e.dataTransfer.setData('ShipAxis', e.target.getAttribute('data-axis'));
  });
});

document.querySelectorAll('.drag-item').forEach((item) => {
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
  });
});

const colorAttackedCell = (x, y, gameboard, container) => {
  const selectedCell = document.querySelector(
    `${container} [xy-coord="${x}-${y}"]`
  );
  const xCoord = x - 1;
  const yCoord = y - 1;
  if (typeof gameboard.grid[yCoord][xCoord] == 'object') {
    selectedCell.style.backgroundColor = 'green';
  } else {
    // Mark board as not hit
    selectedCell.style.backgroundColor = 'yellow';
  }
};

const rotateShips = () => {
  const rotateBtn = document.querySelector('#rotate-btn');
  if (rotateBtn.getAttribute('data-rotation') == 'x') {
    rotateY();
    rotateBtn.setAttribute('data-rotation', 'y');
  } else {
    rotateX();
    rotateBtn.setAttribute('data-rotation', 'x');
  }
};

const rotateY = () => {
  const shipsContainer = document.querySelector('#ships-container');
  shipsContainer.querySelectorAll('.drag-item').forEach((item) => {
    const width = item.offsetWidth;
    item.style.height = `${width / 16}rem`;
    item.style.width = `2.5rem`;
    item.style.flexDirection = 'column';
    item.setAttribute('data-axis', 'y');
  });
  shipsContainer.style.flexDirection = 'row';
};

const rotateX = () => {
  const shipsContainer = document.querySelector('#ships-container');
  shipsContainer.querySelectorAll('.drag-item').forEach((item) => {
    const height = item.offsetHeight;
    item.style.height = `2.5rem`;
    item.style.width = `${height / 16}rem`;
    item.style.flexDirection = 'row';
    item.setAttribute('data-axis', 'x');
  });
  shipsContainer.style.flexDirection = 'column';
};

document.querySelector('#rotate-btn').addEventListener('click', () => {
  rotateShips();
});

export { createDOMGrid, colorAttackedCell };
