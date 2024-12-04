const totalXmas = new Set<string>();

const first = (input: string) => {
  // Look for start or end of 'XMAS'
  // For each variation look in all directions and note down the start and end indexes for later
  const rows = input.split('\n');

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] !== 'X') {
        continue;
      }
      // LINEAR
      canWalkXmas(rows, i, j, -1, 0); // UP
      canWalkXmas(rows, i, j, 1, 0); // DOWN
      canWalkXmas(rows, i, j, 0, -1); // LEFT
      canWalkXmas(rows, i, j, 0, 1); // RIGHT

      // DIAGONAL
      canWalkXmas(rows, i, j, -1, -1); // TOP LEFT
      canWalkXmas(rows, i, j, -1, 1); // TOP RIGHT
      canWalkXmas(rows, i, j, 1, -1); // BOTTOM LEFT
      canWalkXmas(rows, i, j, 1, 1); // BOTTOM RIGHT
    }
  }

  return totalXmas.size;
};

function canWalkXmas(
  rows: string[],
  startX: number,
  startY: number,
  addX: number,
  addY: number
) {
  let word = '';
  let i = 0;
  let currX = startX;
  let currY = startY;

  while (i++ < 4) {
    word += rows[currX][currY];
    currX += addX;
    currY += addY;
    if (currX < 0 || currX > rows.length - 1) {
      break;
    }
    if (currY < 0 || currY > rows[0].length - 1) {
      break;
    }
  }

  if (word === 'XMAS') {
    totalXmas.add(`${startX}_${currX}_${startY}_${currY}`);
  }
}

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  // Look for start or end of 'XMAS'
  // For each variation look in all directions and note down the start and end indexes for later
  const rows = input.split('\n');

  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] !== 'A') {
        continue;
      }

      if (isXmas(rows, i, j)) {
        sum++;
      }
    }
  }

  return sum.toString();
};

function isXmas(rows: string[], startX: number, startY: number) {
  // Check for boundaries
  if (startX - 1 < 0 || startX + 1 > rows.length - 1) {
    return;
  }

  if (startY - 1 < 0 || startY + 1 > rows[0].length - 1) {
    return;
  }

  // Compile letters and then compare
  // top left + bottom right
  const first = `${rows[startX - 1][startY - 1]}A${rows[startX + 1][startY + 1]}`;
  // top right + bottom left
  const second = `${rows[startX - 1][startY + 1]}A${rows[startX + 1][startY - 1]}`;

  if (
    (first === 'MAS' || first === 'SAM') &&
    (second === 'MAS' || second === 'SAM')
  ) {
    return true;
  }
}

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
