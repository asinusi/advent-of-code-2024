enum Direction {
  'UP' = 'UP',
  'DOWN' = 'DOWN',
  'LEFT' = 'LEFT',
  'RIGHT' = 'RIGHT',
}
const steps = new Set<string>();

const first = (input: string) => {
  const area = input.split('\n').map((x) => x.split(''));
  // Assume starting position is facing up
  let direction: Direction = Direction.UP;
  const pos = getStartPosition(area);
  steps.add(`${pos.x}_${pos.y}`);

  while (area[pos.x][pos.y] !== '#') {
    // steps.add(`${x}_${y}`);
    const res = walk(area, pos, direction);
    if (res.valid) {
      direction = res.direction;
      steps.add(`${pos.x}_${pos.y}`);
    } else {
      break;
    }
  }

  return steps.size;
};

function walk(
  area: string[][],
  position: { x: number; y: number },
  direction: Direction
): {
  valid: boolean;
  direction?: Direction;
} {
  const coords = getDirectionAsCoords(direction);
  const nextX = position.x + coords.x;
  const nextY = position.y + coords.y;

  // out of bounds
  if (
    nextX > area.length - 1 ||
    nextX < 0 ||
    nextY > area[0].length - 1 ||
    nextY < 0
  ) {
    return { valid: false };
  }

  // Turn 90deg
  if (area[nextX][nextY] === '#') {
    direction = coords.direction;
  } else {
    area[position.x][position.y] = '.';
    position.x = nextX;
    position.y = nextY;
    area[nextX][nextY] = '^';
  }

  return { valid: true, direction };
}

function getDirectionAsCoords(direction: Direction) {
  switch (direction) {
    case Direction.UP:
      return { x: -1, y: 0, direction: Direction.RIGHT };
    case Direction.DOWN:
      return { x: 1, y: 0, direction: Direction.LEFT };
    case Direction.LEFT:
      return { x: 0, y: -1, direction: Direction.UP };
    case Direction.RIGHT:
      return { x: 0, y: 1, direction: Direction.DOWN };
    default:
      throw Error('Invalid direction');
  }
}

function getStartPosition(area: string[][]) {
  for (let i = 0; i < area.length; i++) {
    for (let j = 0; j < area[0].length; j++) {
      if (area[i][j] === '^') {
        return {
          x: i,
          y: j,
        };
      }
    }
  }

  throw Error('Starting position not found');
}

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const area = input.split('\n').map((x) => x.split(''));
  const startingArea = structuredClone(area);
  // Assume starting position is facing up
  let direction: Direction = Direction.UP;
  const pos = getStartPosition(area);
  const startPos = getStartPosition(area);

  const looped = new Set<string>();
  while (area[pos.x][pos.y] !== '#') {
    // add a block in each direction except if there is already one there
    const positions = getBlockedArea(startingArea, pos.x, pos.y);
    for (const block of positions) {
      if (walkIsLooped(block.area, startPos.x, startPos.y, Direction.UP)) {
        looped.add(`${block.x}_${block.y}`);
        // loops++;
      }
    }

    const res = walk(area, pos, direction);
    if (res.valid) {
      direction = res.direction;
    } else {
      break;
    }
  }

  return looped.size;
};

function getBlockedArea(area: string[][], startX: number, startY: number) {
  const positions: {
    area: string[][];
    x: number;
    y: number;
  }[] = [];
  // TOP
  if (startX - 1 >= 0 && area[startX - 1][startY] !== '#') {
    const clone = structuredClone(area);
    clone[startX - 1][startY] = '#';
    positions.push({
      area: clone,
      x: startX - 1,
      y: startY,
    });
  }

  // BOTTOM
  if (startX + 1 < area.length && area[startX + 1][startY] !== '#') {
    const clone = structuredClone(area);
    clone[startX + 1][startY] = '#';
    positions.push({
      area: clone,
      x: startX + 1,
      y: startY,
    });
  }

  // LEFT
  if (startY - 1 >= 0 && area[startX][startY - 1] !== '#') {
    const clone = structuredClone(area);
    clone[startX][startY - 1] = '#';
    positions.push({
      area: clone,
      x: startX,
      y: startY - 1,
    });
  }

  // RIGHT
  if (startY + 1 < area[0].length && area[startX][startY + 1] !== '#') {
    const clone = structuredClone(area);
    clone[startX][startY + 1] = '#';
    positions.push({
      area: clone,
      x: startX,
      y: startY + 1,
    });
  }

  return positions;
}

function walkIsLooped(
  area: string[][],
  startX: number,
  startY: number,
  startDirection: Direction
) {
  const pos = {
    x: startX,
    y: startY,
  };

  let direction = startDirection;

  // Mark down where it's been stepped and exit if it's there a high step rate
  const steps = new Map<string, number>();
  while (area[pos.x][pos.y] !== '#') {
    // steps.add(`${x}_${y}`);
    const res = walk(area, pos, direction);
    if (stop) {
      // debugger;
    }
    if (res.valid) {
      if (
        pos.x === startX &&
        pos.y === startY &&
        res.direction === startDirection
      ) {
        return true;
      } else if (!steps.has(`${pos.x}_${pos.y}`)) {
        steps.set(`${pos.x}_${pos.y}`, 0);
        // dumbest brute force hack
      } else if (steps.get(`${pos.x}_${pos.y}`) >= 5) {
        return true;
      }
      steps.set(`${pos.x}_${pos.y}`, steps.get(`${pos.x}_${pos.y}`) + 1);
      direction = res.direction;
    } else {
      break;
    }
  }

  return false;
}

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
