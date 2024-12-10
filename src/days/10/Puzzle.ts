let hits: Set<string>;
let ratings = new Set<string>();
const first = (input: string) => {
  const trail = input.split('\n').map((x) => x.split('').map((x) => +x));
  // Find all starting positions
  const start: { x: number; y: number }[] = [];
  for (let i = 0; i < trail.length; i++) {
    for (let j = 0; j < trail[0].length; j++) {
      if (trail[i][j] === 0) {
        start.push({ x: i, y: j });
      }
    }
  }

  let tots = 0;
  for (let s = 0; s < start.length; s++) {
    // for each path attack the positions they can enter
    hits = new Set<string>();
    getNextPath(trail, start[s].x, start[s].y, start[s].x, start[s].y, '');
    console.log(hits.size);
    tots += hits.size;
  }

  console.log(`total ${tots}`);
  return 'solution 1';
};

function getNextPath(
  trail: number[][],
  prevX: number,
  prevY: number,
  startX: number,
  startY: number,
  path: string
) {
  path += `${startX}_${startY}|`;
  const nextNumber = trail[startX][startY] + 1;
  if (nextNumber === 10) {
    hits.add(`${startX}_${startY}`);
    ratings.add(path);
    return false;
  }

  let move = false;
  // UP
  if (
    prevX !== startX - 1 &&
    startX > 0 &&
    trail[startX - 1][startY] === nextNumber
  ) {
    move = true;
    getNextPath(trail, startX, startY, startX - 1, startY, path);
  }

  // DOWN
  if (
    prevX !== startX + 1 &&
    startX < trail.length - 1 &&
    trail[startX + 1][startY] === nextNumber
  ) {
    move = true;
    getNextPath(trail, startX, startY, startX + 1, startY, path);
  }

  // LEFT
  if (
    prevY !== startY - 1 &&
    startY > 0 &&
    trail[startX][startY - 1] === nextNumber
  ) {
    move = true;
    getNextPath(trail, startX, startY, startX, startY - 1, path);
  }

  // RIGHT
  if (
    prevY !== startY + 1 &&
    prevY < trail[0].length - 1 &&
    trail[startX][startY + 1] === nextNumber
  ) {
    move = true;
    getNextPath(trail, startX, startY, startX, startY + 1, path);
  }

  if (!move) {
    return;
  }
}

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const trail = input.split('\n').map((x) => x.split('').map((x) => +x));
  // Find all starting positions
  const start: { x: number; y: number }[] = [];
  for (let i = 0; i < trail.length; i++) {
    for (let j = 0; j < trail[0].length; j++) {
      if (trail[i][j] === 0) {
        start.push({ x: i, y: j });
      }
    }
  }

  let tots = 0;
  for (let s = 0; s < start.length; s++) {
    // for each path attack the positions they can enter
    ratings = new Set<string>();
    getNextPath(trail, start[s].x, start[s].y, start[s].x, start[s].y, '');
    console.log(ratings.size);
    tots += ratings.size;
  }

  console.log(`total ${tots}`);
  return 'solution 1';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
