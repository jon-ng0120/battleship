export const createDOMGrid = (container) => {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      const grid = document.createElement('div');
      grid.setAttribute('xy-coord', `${j}-${i}`);
      container.appendChild(grid);
    }
  }
};

export const addDOMDragEvents = (container, player) => {
  const grid = container.querySelectorAll('[xy-coord]');
  grid.forEach((ele) => {
    ele.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    ele.addEventListener('drop', (e) => {
      const shipName = e.dataTransfer.getData('ShipName');
      const shipAxis = e.dataTransfer.getData('ShipAxis');
      const shipColor = e.dataTransfer.getData('ShipColor');
      const ship = findShip(shipName, player);
      const [xCoord, yCoord] = ele.getAttribute('xy-coord').split('-');
      if (player.gameboard.placeShip(ship, yCoord, xCoord, shipAxis)) {
        colorShipPlacement(container, player);
        document.querySelector('.dragging').style.display = 'none';
        showPlayer2Board();
      }
    });
  });
};

export const findShip = (name, player) => {
  const shipObj = player.gameboard.ships.find((ship) => ship.name == name);
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

export const colorAttackedCell = (x, y, player, container) => {
  const selectedCell = container.querySelector(`[xy-coord="${x}-${y}"]`);
  const xCoord = x - 1;
  const yCoord = y - 1;
  if (typeof player.gameboard.grid[yCoord][xCoord] == 'object') {
    selectedCell.style.backgroundColor = '#FF7760';
  } else {
    // Mark board as not hit
    selectedCell.style.backgroundColor = '#0082FF';
  }
};

export const rotateShips = () => {
  const rotateBtn = document.querySelector('#rotate-btn');
  if (rotateBtn.getAttribute('data-rotation') == 'x') {
    rotateY();
    rotateBtn.setAttribute('data-rotation', 'y');
  } else {
    rotateX();
    rotateBtn.setAttribute('data-rotation', 'x');
  }
};

export const rotateY = () => {
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

export const rotateX = () => {
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

export const displayGameOver = (name) => {
  const overlay = document.querySelector('#gameover-overlay');
  const winnerText = document.querySelector('#winner-text');
  overlay.style.display = 'flex';
  winnerText.textContent = `${name} wins!`;
};

const colorShipPlacement = (container, player) => {
  const gameboard = player.gameboard.grid;
  for (let i = 0; i < gameboard.length; i++) {
    for (let j = 0; j < gameboard[i].length; j++) {
      if (typeof gameboard[i][j] == 'object') {
        container.querySelector(
          `[xy-coord="${j + 1}-${i + 1}"]`
        ).style.backgroundColor = '#ecfbff';
      }
    }
  }
};

const showPlayer2Board = () => {
  const player2Board = document.querySelector('#gameboard-2');
  const shipsContainer = document.querySelector('#drag-item-container');
  const shipsArr = Array.from(shipsContainer.querySelectorAll('.drag-item'));

  if (shipsArr.every((ship) => ship.style.display == 'none')) {
    const rotateBtn = document.querySelector('#rotate-btn');
    shipsContainer.style.display = 'none';
    player2Board.style.display = 'grid';
    rotateBtn.style.display = 'none';
  }
};
