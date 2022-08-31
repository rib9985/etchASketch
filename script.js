let click = false;
document.querySelector('body').addEventListener('click', () => {
  click = !click;
});

const DEFAULT_SIZE = 20;
let currentSize = DEFAULT_SIZE;
const sizeDisplay = document.getElementById('sizeDisplay');
sizeDisplay.innerHTML = `Grid Size: ${currentSize}X${currentSize}`;
const sizePicker = document.getElementById('gridRange');
sizePicker.onchange = (e) => changeSize(e.target.value);

createCanvas(currentSize);

function createCanvas(size) {
  let grid = document.querySelector('.grid');
  let squares = grid.querySelectorAll('div');
  squares.forEach((div) => div.remove());
  grid.style.gridTemplateColumns = `repeat(${size} , 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size} , 1fr)`;
  let amountOfSquares = size ** 2;
  for (let i = 0; i < amountOfSquares; i++) {
    let square = document.createElement('div');
    square.addEventListener('mouseover', colorSquare);
    square.style.backgroundColor = 'white';
    grid.insertAdjacentElement('beforeend', square);
  }
}

function changeSize(value) {
  currentSize = value;
  reloadCanvas(value);
  sizeDisplay.innerHTML = `Grid Size: ${value}X${value}`;
}

function reloadCanvas(size) {
  clearCanvas();
  createCanvas(size);
}

function clearCanvas() {
  let grid = document.querySelector('.grid');
  let squares = grid.querySelectorAll('div');
  squares.forEach((div) => (div.style.backgroundColor = 'white'));
}

const DEFAULT_COLOR = '#333333';
let currentColor = DEFAULT_COLOR;
const colorPicker = document.getElementById('colorPicker');
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
function setCurrentColor(newColor) {
  currentColor = newColor;
}

const brushMode = document.getElementById('brushMode');

function colorSquare() {
  if (click) {
    (this.style.backgroundColor = currentColor) &&
      (this.style.cursor = 'crosshair') &&
      (brushMode.innerHTML = 'Brush On');
  } else {
    (this.style.cursor = 'pointer') && (brushMode.innerHTML = 'Brush Off');
  }
}

function eraseSquare() {
  currentColor = 'white';
}
